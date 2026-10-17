import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BigButton } from '../components/BigButton';
import { Confetti } from '../components/Confetti';
import { Romanito } from '../components/Romanito';
import { Lang, t, ui } from '../i18n';
import { PASS_MARK } from '../questions/session';
import { play, say } from '../sound';
import { colors, fonts, shadow } from '../theme';

type Props = { lang: Lang; correct: number; wrong: number; total: number; onAgain: () => void; onHome: () => void };

/**
 * Final de la partida. Se gana con 10 aciertos o más; al 6.º fallo la partida se corta
 * y sale el legionario triste que anima a intentarlo otra vez.
 */
export function ResultScreen({ lang, correct, wrong, total, onAgain, onHome }: Props) {
  const won = correct >= PASS_MARK;

  useEffect(() => {
    play(won ? 'fanfare' : 'sad');
    const timer = setTimeout(() => say(`${won ? t('winTitle', lang) : t('loseTitle', lang)} ${won ? ui.winText[lang] : ui.loseText[lang]}`, lang), 900);
    return () => clearTimeout(timer);
  }, [won, lang]);

  return (
    <View style={styles.wrap}>
      {won && <Confetti />}
      <View style={styles.card}>
        <Text style={[styles.title, { color: won ? colors.purpleDark : colors.terracottaDark }]}>{won ? t('winTitle', lang) : t('loseTitle', lang)}</Text>
        <View style={styles.heroRow}>
          {won ? (
            <>
              <Romanito kind="legionario" mood="happy" size={110} />
              <Romanito kind="emperador" mood="happy" size={130} />
            </>
          ) : (
            <Romanito kind="legionario" mood="sad" size={150} />
          )}
        </View>
        {won && <Text style={styles.trophy}>🏆🌿</Text>}
        <Text style={styles.text}>{won ? ui.winText[lang] : ui.loseText[lang]}</Text>
        <View style={styles.scoreRow}>
          <Text style={styles.score}>
            ✅ {correct}
          </Text>
          <Text style={styles.score}>
            ❌ {wrong}
          </Text>
          <Text style={styles.score}>+{correct} 🪙</Text>
        </View>
        <View style={styles.stars}>
          {Array.from({ length: total }).map((_, i) => (
            <Text key={i} style={{ fontSize: 15, opacity: i < correct ? 1 : 0.25 }}>
              ⭐
            </Text>
          ))}
        </View>
      </View>
      <BigButton label={`🔁 ${ui.playAgain[lang]}`} big color={colors.red} shade={colors.redDark} onPress={onAgain} style={styles.btn} />
      <BigButton label={`🏠 ${ui.home[lang]}`} color={colors.marble} shade={colors.marbleDark} textColor={colors.ink} onPress={onHome} style={styles.btn} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16, gap: 10 },
  card: { width: '100%', maxWidth: 440, backgroundColor: 'rgba(251,246,236,0.97)', borderRadius: 30, borderWidth: 5, borderColor: colors.gold, padding: 18, alignItems: 'center', gap: 6, ...shadow },
  title: { fontFamily: fonts.title, fontSize: 30, textAlign: 'center' },
  heroRow: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center' },
  trophy: { fontSize: 44, lineHeight: 54 },
  text: { fontFamily: fonts.body, fontSize: 20, color: colors.ink, textAlign: 'center', lineHeight: 27 },
  scoreRow: { flexDirection: 'row', gap: 18, marginTop: 4 },
  score: { fontFamily: fonts.bodyBold, fontSize: 28, color: colors.ink },
  stars: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 2 },
  btn: { width: '100%', maxWidth: 440 },
});
