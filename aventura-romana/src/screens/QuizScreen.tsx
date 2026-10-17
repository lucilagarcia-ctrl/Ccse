import { useCallback, useEffect, useState } from 'react';
import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BigButton } from '../components/BigButton';
import { FactModal } from '../components/FactModal';
import { Mood, Romanito } from '../components/Romanito';
import { SpeechBubble } from '../components/SpeechBubble';
import { ChoiceGrid } from '../games/ChoiceGame';
import { MathGame } from '../games/MathGame';
import { MemoryGame } from '../games/MemoryGame';
import { OrderGame } from '../games/OrderGame';
import { SpellGame } from '../games/SpellGame';
import { TapGame } from '../games/TapGame';
import { TrueFalseGame } from '../games/TrueFalseGame';
import { VideoGame } from '../games/VideoGame';
import { Lang, subjectName, ui } from '../i18n';
import { Fact } from '../questions/facts';
import { Session } from '../questions/session';
import { Question } from '../questions/types';
import { say, stopSpeech } from '../sound';
import { colors, fonts, shadow } from '../theme';

type Props = {
  lang: Lang;
  session: Session;
  onFactSeen: (id: number) => void;
  onQuit: () => void;
  onFinish: (correct: number) => void;
};

const subjectIcon: Record<string, string> = { math: '🔢', history: '📜', rome: '🏛️', english: '🇬🇧', catalan: '🗣️' };
const subjectColor: Record<string, string> = { math: colors.skyDeep, history: colors.terracotta, rome: colors.purple, english: '#2F5DB0', catalan: '#D4A20C' };

export function QuizScreen({ lang, session, onFactSeen, onQuit, onFinish }: Props) {
  const { questions } = session;
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [fact, setFact] = useState<Fact | null>(null);
  const [muted, setMuted] = useState(false);
  const [confirmQuit, setConfirmQuit] = useState(false);
  const [coinUp] = useState(() => new Animated.Value(0));
  const q = questions[index];
  const answered = results.length > index;
  const lastOk = results[index];

  // Leer la pregunta en voz alta (y la palabra en el idioma que se aprende).
  const speak = useCallback(
    (question: Question) => {
      say(question.prompt[lang], lang);
      if (question.word) say(question.word.text, question.word.lang, true);
    },
    [lang],
  );
  useEffect(() => {
    if (!muted) {
      const t = setTimeout(() => speak(q), 350);
      return () => clearTimeout(t);
    }
  }, [q, muted, speak]);
  useEffect(() => () => stopSpeech(), []);

  const next = useCallback(() => {
    if (fact) return;
    const done = index + 1;
    if (done >= questions.length) {
      onFinish(results.filter(Boolean).length);
      return;
    }
    const f = session.facts[done];
    if (f) {
      setFact(f);
      onFactSeen(f.id);
    } else {
      setIndex(done);
    }
  }, [fact, index, questions.length, results, session.facts, onFinish, onFactSeen]);

  const onAnswer = useCallback(
    (ok: boolean) => {
      setResults((r) => (r.length > index ? r : [...r, ok]));
      if (ok) {
        coinUp.setValue(0);
        Animated.timing(coinUp, { toValue: 1, duration: 1100, useNativeDriver: true }).start();
      }
    },
    [index, coinUp],
  );

  // Si acierta, pasa solo a la siguiente; si falla, se queda para ver la respuesta correcta.
  useEffect(() => {
    if (answered && lastOk) {
      const t = setTimeout(next, 1700);
      return () => clearTimeout(t);
    }
  }, [answered, lastOk, next]);

  const mood: Mood = !answered ? 'talk' : lastOk ? 'happy' : 'sad';
  const correctCount = results.filter(Boolean).length;

  return (
    <View style={styles.fill}>
      {/* barra superior */}
      <View style={styles.top}>
        <Pressable style={styles.iconBtn} onPress={() => setConfirmQuit(true)} accessibilityLabel={ui.home[lang]}>
          <Text style={styles.iconText}>✖️</Text>
        </Pressable>
        <View style={styles.progress}>
          {questions.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === index && styles.dotNow,
                results[i] === true && { backgroundColor: colors.ok, borderColor: colors.okDark },
                results[i] === false && { backgroundColor: colors.bad, borderColor: colors.badDark },
              ]}
            />
          ))}
        </View>
        <Pressable style={styles.iconBtn} onPress={() => (muted ? (setMuted(false), speak(q)) : (setMuted(true), stopSpeech()))}>
          <Text style={styles.iconText}>{muted ? '🔇' : '🔊'}</Text>
        </Pressable>
      </View>

      <View style={styles.meta}>
        <View style={[styles.badge, { backgroundColor: subjectColor[q.subject] }]}>
          <Text style={styles.badgeText}>
            {subjectIcon[q.subject]} {subjectName[q.subject][lang]}
          </Text>
        </View>
        <Text style={styles.counter}>
          {ui.question[lang]} {index + 1}/{questions.length} · ✅ {correctCount}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} key={q.id}>
        <View style={styles.promptRow}>
          <Romanito kind="legionario" mood={mood} size={74} />
          <SpeechBubble>
            <Pressable onPress={() => speak(q)}>
              <Text style={styles.prompt}>
                {q.prompt[lang]} <Text style={styles.speaker}>🔊</Text>
              </Text>
            </Pressable>
          </SpeechBubble>
        </View>

        {q.word && (q.kind !== 'choice' || !q.listen) && (
          <Pressable style={styles.word} onPress={() => say(q.word!.text, q.word!.lang)}>
            <Text style={styles.wordText}>{q.word.text}</Text>
            <Text style={styles.wordSpeaker}>🔊</Text>
          </Pressable>
        )}
        {q.kind === 'choice' && q.listen && q.word && (
          <Pressable style={styles.listen} onPress={() => say(q.word!.text, q.word!.lang)}>
            <Text style={{ fontSize: 56, lineHeight: 66 }}>🔊</Text>
            {answered && <Text style={styles.wordText}>{q.word.text}</Text>}
          </Pressable>
        )}
        {q.kind === 'choice' && q.scene && <Text style={styles.scene}>{q.scene}</Text>}

        <View style={styles.game}>
          <Game q={q} lang={lang} onAnswer={onAnswer} />
        </View>
      </ScrollView>

      {answered && (
        <View style={[styles.feedback, { backgroundColor: lastOk ? colors.ok : colors.terracotta }]}>
          <Text style={styles.feedbackText}>{lastOk ? `🎉 ${ui.wellDone[lang]}` : `💪 ${ui.oops[lang]}`}</Text>
          <BigButton label={`${ui.next[lang]} ➜`} color={colors.gold} shade={colors.goldDark} textColor={colors.ink} onPress={next} />
        </View>
      )}

      <Animated.Text
        pointerEvents="none"
        style={[
          styles.coinUp,
          {
            opacity: coinUp.interpolate({ inputRange: [0, 0.1, 0.8, 1], outputRange: [0, 1, 1, 0] }),
            transform: [{ translateY: coinUp.interpolate({ inputRange: [0, 1], outputRange: [0, -120] }) }],
          },
        ]}
      >
        +1 🪙
      </Animated.Text>

      {confirmQuit && (
        <View style={styles.quitBackdrop}>
          <View style={styles.quitCard}>
            <Romanito kind="legionario" mood="wow" size={90} />
            <Text style={styles.quitText}>{ui.quit[lang]}</Text>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <BigButton label="🏠" color={colors.terracotta} shade={colors.terracottaDark} onPress={onQuit} style={{ width: 100 }} />
              <BigButton label="⚔️" color={colors.ok} shade={colors.okDark} onPress={() => setConfirmQuit(false)} style={{ width: 100 }} />
            </View>
          </View>
        </View>
      )}

      <FactModal
        fact={fact}
        lang={lang}
        muted={muted}
        onClose={() => {
          stopSpeech();
          setFact(null);
          setIndex((i) => i + 1);
        }}
      />
    </View>
  );
}

function Game({ q, lang, onAnswer }: { q: Question; lang: Lang; onAnswer: (ok: boolean) => void }) {
  switch (q.kind) {
    case 'tf':
      return <TrueFalseGame q={q} lang={lang} onAnswer={onAnswer} />;
    case 'choice':
      return <ChoiceGrid choices={q.choices} correct={q.correct} lang={lang} onAnswer={onAnswer} />;
    case 'math':
      return <MathGame q={q} lang={lang} onAnswer={onAnswer} />;
    case 'video':
      return <VideoGame q={q} lang={lang} onAnswer={onAnswer} />;
    case 'memory':
      return <MemoryGame q={q} lang={lang} onAnswer={onAnswer} />;
    case 'order':
      return <OrderGame q={q} lang={lang} onAnswer={onAnswer} />;
    case 'tap':
      return <TapGame q={q} lang={lang} onAnswer={onAnswer} />;
    case 'spell':
      return <SpellGame q={q} lang={lang} onAnswer={onAnswer} />;
  }
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  top: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingTop: 6, gap: 8 },
  iconBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.85)', alignItems: 'center', justifyContent: 'center', ...shadow },
  iconText: { fontSize: 22 },
  progress: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 3 },
  dot: { width: 11, height: 16, borderRadius: 6, backgroundColor: 'rgba(255,255,255,0.8)', borderWidth: 2, borderColor: colors.marbleDark },
  dotNow: { width: 15, height: 22, backgroundColor: colors.gold, borderColor: colors.goldDark },
  meta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 14, paddingTop: 8 },
  badge: { borderRadius: 14, paddingHorizontal: 12, paddingVertical: 4 },
  badgeText: { fontFamily: fonts.bodyBold, color: colors.white, fontSize: 16 },
  counter: { fontFamily: fonts.bodyBold, fontSize: 16, color: colors.ink, backgroundColor: 'rgba(255,255,255,0.75)', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 3, overflow: 'hidden' },
  scroll: { paddingHorizontal: 14, paddingBottom: 140, gap: 12, alignItems: 'center' },
  promptRow: { flexDirection: 'row', alignItems: 'center', width: '100%', maxWidth: 480, marginTop: 4 },
  prompt: { fontFamily: fonts.bodyBold, fontSize: 21, color: colors.ink, lineHeight: 27 },
  speaker: { fontSize: 18 },
  word: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colors.white, borderRadius: 20, paddingHorizontal: 22, paddingVertical: 6, borderWidth: 4, borderColor: colors.purple, ...shadow },
  wordText: { fontFamily: fonts.bodyBold, fontSize: 36, color: colors.purpleDark },
  wordSpeaker: { fontSize: 26 },
  listen: { alignItems: 'center', backgroundColor: colors.white, borderRadius: 60, padding: 16, borderWidth: 5, borderColor: colors.purple, ...shadow },
  scene: { fontSize: 64, lineHeight: 78, textAlign: 'center', fontFamily: fonts.bodyBold, color: colors.ink },
  game: { width: '100%', maxWidth: 480, alignItems: 'center' },
  feedback: { position: 'absolute', left: 0, right: 0, bottom: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, paddingTop: 10, paddingBottom: 26, borderTopLeftRadius: 26, borderTopRightRadius: 26, ...shadow },
  feedbackText: { fontFamily: fonts.bodyBold, fontSize: 26, color: colors.white, flexShrink: 1 },
  coinUp: { position: 'absolute', top: 70, alignSelf: 'center', fontFamily: fonts.bodyBold, fontSize: 30, color: colors.goldDark },
  quitBackdrop: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(40,20,10,0.55)', alignItems: 'center', justifyContent: 'center' },
  quitCard: { backgroundColor: colors.marble, borderRadius: 26, borderWidth: 4, borderColor: colors.gold, padding: 20, alignItems: 'center', gap: 10 },
  quitText: { fontFamily: fonts.bodyBold, fontSize: 26, color: colors.ink },
});
