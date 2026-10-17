import { useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { shuffle } from '../questions/random';
import { play, say } from '../sound';
import { colors, fonts } from '../theme';
import { Tile } from './Tile';
import { GameProps } from './types';
import { Emoji } from '../components/Emoji';

/** Construir la palabra letra a letra. Si toca una letra equivocada, tiembla y no se coloca. Vale 1 error. */
export function SpellGame({ q, onAnswer }: GameProps<'spell'>) {
  const letters = useMemo(() => shuffle([...q.answer.split(''), ...q.extra].map((ch, i) => ({ ch, i }))), [q]);
  const [used, setUsed] = useState<number[]>([]);
  const [shaking, setShaking] = useState<number | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const ended = useRef(false);
  const typed = used.map((i) => letters.find((l) => l.i === i)!.ch).join('');

  const tap = (l: { ch: string; i: number }) => {
    if (ended.current || used.includes(l.i)) return;
    const expected = q.answer[typed.length];
    if (l.ch === expected) {
      play('pop');
      const next = [...used, l.i];
      setUsed(next);
      if (next.length === q.answer.length) {
        ended.current = true;
        const ok = mistakes <= 1;
        say(q.answer.toLowerCase(), q.lang);
        setTimeout(() => {
          play(ok ? 'correct' : 'wrong');
          onAnswer(ok);
        }, 300);
      }
    } else {
      setMistakes((m) => m + 1);
      setShaking(l.i);
      play('wrong');
      setTimeout(() => setShaking(null), 400);
    }
  };

  return (
    <View style={styles.wrap}>
      <Emoji char={q.emoji} size={110} />
      <View style={styles.slots}>
        {q.answer.split('').map((_, k) => (
          <View key={k} style={[styles.slot, k < typed.length && styles.filled]}>
            <Text style={styles.slotText}>{typed[k] ?? ''}</Text>
          </View>
        ))}
      </View>
      <View style={styles.letters}>
        {letters.map((l, k) =>
          used.includes(l.i) ? (
            <View key={l.i} style={[styles.letter, styles.ghost]} />
          ) : (
            <Tile key={l.i} delay={k * 50} style={styles.letter} state={shaking === l.i ? 'wrong' : 'idle'} onPress={() => tap(l)}>
              <Text style={styles.letterText}>{l.ch}</Text>
            </Tile>
          ),
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: '100%', alignItems: 'center', gap: 14 },
  slots: { flexDirection: 'row', gap: 6 },
  slot: { width: 46, height: 56, borderBottomWidth: 5, borderColor: colors.purple, alignItems: 'center', justifyContent: 'flex-end', backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: 8 },
  filled: { backgroundColor: '#C9F2C7' },
  slotText: { fontFamily: fonts.bodyBold, fontSize: 36, color: colors.ink },
  letters: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8, maxWidth: 360 },
  letter: { width: 62, height: 66 },
  ghost: { borderRadius: 18, backgroundColor: 'rgba(0,0,0,0.06)' },
  letterText: { fontFamily: fonts.bodyBold, fontSize: 32, color: colors.ink },
});
