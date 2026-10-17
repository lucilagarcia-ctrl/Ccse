import { useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { pick, shuffle } from '../questions/random';
import { play } from '../sound';
import { colors, fonts } from '../theme';
import { Tile } from './Tile';
import { GameProps } from './types';

/** Toca todos los objetos buscados. Se permite 1 error; al 3.º fallo termina. */
export const TAP_MAX_MISTAKES = 1;

export function TapGame({ q, onAnswer }: GameProps<'tap'>) {
  const cells = useMemo(() => {
    const total = 15;
    const list = [...Array(q.count).fill(q.target), ...Array.from({ length: total - q.count }, () => pick(q.others))];
    return shuffle(list);
  }, [q]);
  const [found, setFound] = useState<number[]>([]);
  const [wrong, setWrong] = useState<number[]>([]);
  const ended = useRef(false);
  const [over, setOver] = useState(false);

  const finish = (ok: boolean) => {
    if (ended.current) return;
    ended.current = true;
    setOver(true);
    play(ok ? 'correct' : 'wrong');
    onAnswer(ok);
  };

  const tap = (i: number) => {
    if (ended.current || found.includes(i) || wrong.includes(i)) return;
    if (cells[i] === q.target) {
      play('pop');
      const next = [...found, i];
      setFound(next);
      if (next.length === q.count) setTimeout(() => finish(wrong.length <= TAP_MAX_MISTAKES), 200);
    } else {
      const next = [...wrong, i];
      setWrong(next);
      play('wrong');
      if (next.length > 2) finish(false);
    }
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.header}>
        <Text style={styles.target}>{q.target}</Text>
        <Text style={styles.counter}>
          {found.length} / {q.count}
        </Text>
      </View>
      <View style={styles.grid}>
        {cells.map((e, i) => (
          <Tile key={i} delay={i * 30} style={styles.cell} onPress={() => tap(i)} state={found.includes(i) ? 'correct' : wrong.includes(i) ? 'wrong' : over && e === q.target ? 'selected' : 'idle'}>
            <Text style={styles.emoji}>{e}</Text>
          </Tile>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: '100%', alignItems: 'center', gap: 10 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: colors.marble, borderRadius: 20, paddingHorizontal: 16, borderWidth: 3, borderColor: colors.gold },
  target: { fontSize: 40, lineHeight: 50 },
  counter: { fontFamily: fonts.bodyBold, fontSize: 30, color: colors.purpleDark },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8, maxWidth: 380 },
  cell: { width: 66, height: 66 },
  emoji: { fontSize: 34, lineHeight: 42 },
});
