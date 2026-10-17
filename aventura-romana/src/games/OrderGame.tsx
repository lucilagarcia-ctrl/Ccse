import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ChoiceView } from '../components/ChoiceView';
import { shuffle } from '../questions/random';
import { play } from '../sound';
import { colors, fonts } from '../theme';
import { Tile } from './Tile';
import { GameProps } from './types';

/** Tocar en orden: cada toque coloca la pieza en el siguiente hueco. Tocar un hueco la devuelve. */
export function OrderGame({ q, lang, onAnswer }: GameProps<'order'>) {
  const pool = useMemo(() => {
    let s = shuffle(q.items.map((_, i) => i));
    while (s.every((v, i) => v === i)) s = shuffle(s);
    return s;
  }, [q]);
  const [placed, setPlaced] = useState<number[]>([]);
  const [result, setResult] = useState<boolean | null>(null);

  const place = (i: number) => {
    if (result !== null) return;
    play('pop');
    const next = [...placed, i];
    setPlaced(next);
    if (next.length === q.items.length) {
      const ok = next.every((v, k) => v === k);
      setTimeout(() => {
        setResult(ok);
        play(ok ? 'correct' : 'wrong');
        onAnswer(ok);
      }, 250);
    }
  };
  const unplace = (i: number) => {
    if (result !== null) return;
    setPlaced((p) => p.filter((x) => x !== i));
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.slots}>
        {q.items.map((_, k) => {
          const item = placed[k];
          const st = result === null ? 'idle' : item === k ? 'correct' : 'wrong';
          return (
            <View key={k} style={styles.slotCol}>
              <Text style={styles.slotNum}>{k + 1}</Text>
              {item !== undefined ? (
                <Tile style={styles.slot} state={st} onPress={() => unplace(item)}>
                  <ChoiceView choice={q.items[item]} lang={lang} size={38} />
                </Tile>
              ) : (
                <View style={[styles.slot, styles.empty]} />
              )}
            </View>
          );
        })}
      </View>
      <Text style={styles.arrow}>⬆️</Text>
      <View style={styles.pool}>
        {pool.map((i, k) =>
          placed.includes(i) ? (
            <View key={i} style={[styles.poolItem, styles.ghost]} />
          ) : (
            <Tile key={i} delay={k * 80} style={styles.poolItem} onPress={() => place(i)}>
              <ChoiceView choice={q.items[i]} lang={lang} size={38} />
            </Tile>
          ),
        )}
      </View>
      {result === false && (
        <View style={styles.solution}>
          {q.items.map((it, k) => (
            <ChoiceView key={k} choice={it} lang={lang} size={26} />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: '100%', alignItems: 'center', gap: 10 },
  slots: { flexDirection: 'row', gap: 8, justifyContent: 'center' },
  slotCol: { alignItems: 'center', gap: 4 },
  slotNum: { fontFamily: fonts.bodyBold, fontSize: 18, color: colors.white, backgroundColor: colors.purple, borderRadius: 12, width: 24, height: 24, textAlign: 'center', overflow: 'hidden' },
  slot: { width: 78, height: 88 },
  empty: { borderRadius: 18, borderWidth: 3, borderStyle: 'dashed', borderColor: colors.inkSoft, backgroundColor: 'rgba(255,255,255,0.45)' },
  arrow: { fontSize: 26 },
  pool: { flexDirection: 'row', gap: 8, justifyContent: 'center', flexWrap: 'wrap' },
  poolItem: { width: 78, height: 88 },
  ghost: { borderRadius: 18, backgroundColor: 'rgba(0,0,0,0.06)' },
  solution: { flexDirection: 'row', gap: 12, backgroundColor: '#C9F2C7', borderRadius: 14, padding: 8, borderWidth: 3, borderColor: colors.ok },
});
