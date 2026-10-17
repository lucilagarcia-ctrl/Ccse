import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ChoiceView, choiceText } from '../components/ChoiceView';
import { Lang } from '../i18n';
import { shuffle } from '../questions/random';
import { Choice } from '../questions/types';
import { play, say } from '../sound';
import { Tile, TileState } from './Tile';

type Props = { choices: Choice[]; correct: number; lang: Lang; onAnswer: (ok: boolean) => void };

/** Opciones grandes. Si son sólo dibujos van en cuadrícula 2×2; si llevan texto, en columna. */
export function ChoiceGrid({ choices, correct, lang, onAnswer }: Props) {
  const order = useMemo(() => shuffle(choices.map((_, i) => i)), [choices]);
  const [picked, setPicked] = useState<number | null>(null);
  // Dibujos o textos cortos (números, horas…) en cuadrícula 2×2; frases en columna.
  const visualOnly = choices.every((c) => !c.label || choiceText(c, lang).length <= 7);

  const choose = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    const ok = i === correct;
    const c = choices[i];
    if (c.speakAs && typeof c.label === 'string') say(c.label, c.speakAs);
    play(ok ? 'correct' : 'wrong');
    onAnswer(ok);
  };

  const stateOf = (i: number): TileState => {
    if (picked === null) return 'idle';
    if (i === correct) return 'correct';
    if (i === picked) return 'wrong';
    return 'dim';
  };

  return (
    <View style={[styles.wrap, visualOnly ? styles.grid : styles.column]}>
      {order.map((i, k) => (
        <Tile key={i} delay={k * 90} state={stateOf(i)} onPress={() => choose(i)} style={visualOnly ? styles.cell : styles.row}>
          <ChoiceView choice={choices[i]} lang={lang} size={visualOnly ? 58 : 34} />
        </Tile>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: '100%', gap: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  column: {},
  cell: { width: '46%', minWidth: 130 },
  row: { width: '100%' },
});
