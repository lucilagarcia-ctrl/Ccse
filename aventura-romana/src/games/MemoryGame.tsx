import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { ChoiceView } from '../components/ChoiceView';
import { shuffle } from '../questions/random';
import { play, say } from '../sound';
import { colors, fonts, shadow } from '../theme';
import { GameProps } from './types';

/** Juego de parejas: 8 cartas boca abajo. Gana si termina con 6 fallos o menos. */
export const MEMORY_MAX_MISSES = 6;

export function MemoryGame({ q, lang, onAnswer }: GameProps<'memory'>) {
  const cards = useMemo(() => shuffle(q.pairs.flatMap((p, pair) => p.map((c) => ({ c, pair })))), [q]);
  const [open, setOpen] = useState<number[]>([]);
  const [done, setDone] = useState<number[]>([]);
  const [misses, setMisses] = useState(0);
  const finished = useRef(false);

  useEffect(() => {
    if (!finished.current && done.length === cards.length) {
      finished.current = true;
      const ok = misses <= MEMORY_MAX_MISSES;
      play(ok ? 'correct' : 'wrong');
      onAnswer(ok);
    }
  }, [done, cards.length, misses, onAnswer]);

  const flip = (i: number) => {
    if (open.length === 2 || open.includes(i) || done.includes(i)) return;
    const card = cards[i].c;
    if (card.speakAs && typeof card.label === 'string') say(card.label, card.speakAs);
    else play('pop');
    const next = [...open, i];
    setOpen(next);
    if (next.length === 2) {
      const [a, b] = next;
      if (cards[a].pair === cards[b].pair) {
        setTimeout(() => {
          setDone((d) => [...d, a, b]);
          setOpen([]);
        }, 350);
      } else {
        setMisses((m) => m + 1);
        setTimeout(() => setOpen([]), 900);
      }
    }
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.grid}>
        {cards.map((card, i) => (
          <Card key={i} faceUp={open.includes(i) || done.includes(i)} matched={done.includes(i)} onPress={() => flip(i)}>
            <ChoiceView choice={card.c} lang={lang} size={40} />
          </Card>
        ))}
      </View>
      <Text style={styles.misses}>{'❌'.repeat(Math.min(misses, 10)) || ' '}</Text>
    </View>
  );
}

function Card({ faceUp, matched, onPress, children }: { faceUp: boolean; matched: boolean; onPress: () => void; children: React.ReactNode }) {
  const [turn] = useState(() => new Animated.Value(faceUp ? 1 : 0));
  useEffect(() => {
    Animated.spring(turn, { toValue: faceUp ? 1 : 0, useNativeDriver: true, speed: 14, bounciness: 6 }).start();
  }, [faceUp, turn]);
  const front = turn.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 0, 1] });
  const back = turn.interpolate({ inputRange: [0, 0.5, 1], outputRange: [1, 0, 0] });
  const scaleX = turn.interpolate({ inputRange: [0, 0.5, 1], outputRange: [1, 0.05, 1] });

  return (
    <Pressable onPress={onPress} style={styles.cardSlot}>
      <Animated.View style={[styles.card, styles.back, { opacity: back, transform: [{ scaleX }] }]}>
        <Text style={styles.backText}>SPQR</Text>
        <Text style={{ fontSize: 26 }}>🏛️</Text>
      </Animated.View>
      <Animated.View style={[styles.card, styles.front, matched && styles.matched, { opacity: front, transform: [{ scaleX }] }]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { width: '100%', alignItems: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10, maxWidth: 420 },
  cardSlot: { width: '22%', minWidth: 74, aspectRatio: 0.8 },
  card: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 16, borderWidth: 3, alignItems: 'center', justifyContent: 'center', padding: 4, ...shadow },
  back: { backgroundColor: colors.red, borderColor: colors.gold },
  backText: { fontFamily: fonts.titleBold, color: colors.gold, fontSize: 14 },
  front: { backgroundColor: colors.marble, borderColor: colors.gold },
  matched: { backgroundColor: '#C9F2C7', borderColor: colors.ok },
  misses: { marginTop: 10, fontSize: 16, minHeight: 22 },
});
