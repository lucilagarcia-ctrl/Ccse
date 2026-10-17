import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MathVisual } from '../questions/types';
import { play } from '../sound';
import { colors, fonts } from '../theme';
import { ChoiceGrid } from './ChoiceGame';
import { NumberPad } from './NumberPad';
import { GameProps } from './types';
import { Emoji } from '../components/Emoji';

export function MathGame({ q, lang, onAnswer }: GameProps<'math'>) {
  const [result, setResult] = useState<'ok' | 'bad' | undefined>();
  const choiceIndex = q.choices ? q.choices.indexOf(q.answer) : -1;

  return (
    <View style={styles.wrap}>
      <Visual v={q.visual} />
      <View style={styles.exprBox}>
        <Text style={styles.expr}>
          {q.expr.includes('?') ? q.expr.replace('?', '❓') : /[+−×÷]/.test(q.expr) ? `${q.expr} = ❓` : q.expr}
        </Text>
      </View>
      {q.choices ? (
        <ChoiceGrid choices={q.choices.map((n) => ({ label: String(n) }))} correct={choiceIndex} lang={lang} onAnswer={onAnswer} />
      ) : (
        <NumberPad
          disabled={!!result}
          result={result}
          onSubmit={(n) => {
            const ok = n === q.answer;
            setResult(ok ? 'ok' : 'bad');
            play(ok ? 'correct' : 'wrong');
            onAnswer(ok);
          }}
        />
      )}
    </View>
  );
}

function Objects({ emoji, n, size, maxWidth }: { emoji: string; n: number; size: number; maxWidth: number }) {
  return (
    <View style={[styles.objRow, { maxWidth }]}>
      {Array.from({ length: n }).map((_, i) => (
        <Emoji key={i} char={emoji} size={size} />
      ))}
    </View>
  );
}

function Visual({ v }: { v: MathVisual }) {
  if (v.type === 'objects') {
    if (v.op === '×') {
      return (
        <View style={styles.groups}>
          {v.groups.map((g, i) => (
            <View key={i} style={styles.bag}>
              <Objects emoji={g.emoji} n={g.n} size={24} maxWidth={110} />
            </View>
          ))}
        </View>
      );
    }
    if (v.op === '-') {
      const [all, gone] = v.groups;
      return (
        <View style={styles.objects}>
          {Array.from({ length: all.n }).map((_, i) => (
            <View key={i}>
              <Emoji char={all.emoji} size={32} style={i >= all.n - gone.n && { opacity: 0.35 }} />
              {i >= all.n - gone.n && <Text style={styles.cross}>✖</Text>}
            </View>
          ))}
        </View>
      );
    }
    return (
      <View style={styles.groups}>
        {v.groups.map((g, i) => (
          <View key={i} style={styles.bag}>
            <Objects emoji={g.emoji} n={g.n} size={30} maxWidth={160} />
          </View>
        ))}
      </View>
    );
  }
  if (v.type === 'tens') {
    return (
      <View style={styles.tensRow}>
        {Array.from({ length: v.tens }).map((_, i) => (
          <View key={i} style={styles.bar}>
            {Array.from({ length: 10 }).map((__, j) => (
              <View key={j} style={styles.cube} />
            ))}
          </View>
        ))}
        <View style={styles.units}>
          {Array.from({ length: v.units }).map((_, i) => (
            <View key={i} style={[styles.cube, styles.unitCube]} />
          ))}
        </View>
      </View>
    );
  }
  if (v.type === 'coins') {
    return (
      <View style={styles.objects}>
        {v.coins.map((c, i) => (
          <View key={i} style={[styles.coin, c >= 5 && styles.bill]}>
            <Text style={[styles.coinText, c >= 5 && { color: colors.white }]}>{c}€</Text>
          </View>
        ))}
      </View>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  wrap: { width: '100%', alignItems: 'center', gap: 12 },
  exprBox: { backgroundColor: colors.marble, borderRadius: 18, paddingHorizontal: 22, paddingVertical: 2, borderWidth: 3, borderColor: colors.gold },
  expr: { fontFamily: fonts.bodyBold, fontSize: 44, color: colors.purpleDark, textAlign: 'center' },
  objects: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 4, maxWidth: 340 },
  groups: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8, maxWidth: 360 },
  bag: { backgroundColor: 'rgba(255,255,255,0.75)', borderRadius: 16, borderWidth: 2, borderColor: colors.gold, padding: 6, maxWidth: 170 },
  objRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 2 },
  cross: { position: 'absolute', top: -2, left: 6, fontSize: 30, color: colors.bad, fontWeight: '900' },
  tensRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 4, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 360 },
  bar: { gap: 1, padding: 2, backgroundColor: colors.terracottaDark, borderRadius: 4 },
  cube: { width: 14, height: 11, backgroundColor: colors.gold, borderRadius: 2 },
  units: { flexDirection: 'row', flexWrap: 'wrap', width: 70, gap: 3, marginLeft: 10 },
  unitCube: { width: 14, height: 14, backgroundColor: colors.gold, borderWidth: 1, borderColor: colors.goldDark },
  coin: { width: 58, height: 58, borderRadius: 29, backgroundColor: colors.gold, borderWidth: 4, borderColor: colors.goldDark, alignItems: 'center', justifyContent: 'center' },
  bill: { width: 80, height: 48, borderRadius: 8, backgroundColor: '#6FA86B', borderColor: '#3F7A3C' },
  coinText: { fontFamily: fonts.bodyBold, fontSize: 20, color: colors.ink },
});
