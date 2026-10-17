import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { ChoiceView } from '../components/ChoiceView';
import { shuffle } from '../questions/random';
import { play, say } from '../sound';
import { colors, fonts, shadow } from '../theme';
import { GameProps } from './types';
import { Emoji } from '../components/Emoji';

/** Juego de parejas (4 o 6 parejas). Gana si termina con como mucho 1,5 fallos por pareja (6 o 9). */
const maxMisses = (pairs: number) => Math.round(pairs * 1.5);

const GAP = 10;

export function MemoryGame({ q, lang, onAnswer }: GameProps<'memory'>) {
  // Tamaño en píxeles (4 columnas): con porcentajes + aspectRatio, Android dejaba las cartas con altura 0.
  const { width } = useWindowDimensions();
  const gridW = Math.min(width - 28, 420);
  const cardW = Math.floor((gridW - GAP * 3) / 4);
  const size = { width: cardW, height: Math.round(cardW * 1.2) };
  const cards = useMemo(() => shuffle(q.pairs.flatMap((p, pair) => p.map((c) => ({ c, pair })))), [q]);
  const [open, setOpen] = useState<number[]>([]);
  const [done, setDone] = useState<number[]>([]);
  const [misses, setMisses] = useState(0);
  const finished = useRef(false);

  useEffect(() => {
    if (!finished.current && done.length === cards.length) {
      finished.current = true;
      const ok = misses <= maxMisses(q.pairs.length);
      play(ok ? 'correct' : 'wrong');
      onAnswer(ok);
    }
  }, [done, cards.length, misses, onAnswer, q.pairs.length]);

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
      <View style={[styles.grid, { width: gridW }]}>
        {cards.map((card, i) => (
          <Card key={i} size={size} faceUp={open.includes(i) || done.includes(i)} matched={done.includes(i)} onPress={() => flip(i)}>
            <ChoiceView choice={card.c} lang={lang} size={Math.min(40, cardW * 0.45)} compact />
          </Card>
        ))}
      </View>
      <Text style={styles.misses}>{'❌'.repeat(Math.min(misses, 10)) || ' '}</Text>
    </View>
  );
}

type CardProps = { size: { width: number; height: number }; faceUp: boolean; matched: boolean; onPress: () => void; children: React.ReactNode };

function Card({ size, faceUp, matched, onPress, children }: CardProps) {
  const [turn] = useState(() => new Animated.Value(faceUp ? 1 : 0));
  useEffect(() => {
    Animated.spring(turn, { toValue: faceUp ? 1 : 0, useNativeDriver: true, speed: 14, bounciness: 6 }).start();
  }, [faceUp, turn]);
  const front = turn.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 0, 1] });
  const back = turn.interpolate({ inputRange: [0, 0.5, 1], outputRange: [1, 0, 0] });
  const scaleX = turn.interpolate({ inputRange: [0, 0.5, 1], outputRange: [1, 0.05, 1] });

  return (
    <Pressable onPress={onPress} style={size}>
      <Animated.View style={[styles.card, styles.back, { opacity: back, transform: [{ scaleX }] }]}>
        <Text style={styles.backText}>SPQR</Text>
        <Emoji char="🏛️" size={30} />
      </Animated.View>
      <Animated.View style={[styles.card, styles.front, matched && styles.matched, { opacity: front, transform: [{ scaleX }] }]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { width: '100%', alignItems: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: GAP },
  card: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 16, borderWidth: 3, alignItems: 'center', justifyContent: 'center', padding: 4, ...shadow },
  back: { backgroundColor: colors.red, borderColor: colors.gold },
  backText: { fontFamily: fonts.titleBold, color: colors.gold, fontSize: 14 },
  front: { backgroundColor: colors.marble, borderColor: colors.gold },
  matched: { backgroundColor: '#C9F2C7', borderColor: colors.ok },
  misses: { marginTop: 10, fontSize: 16, minHeight: 22 },
});
