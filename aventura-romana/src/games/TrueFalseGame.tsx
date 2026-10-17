import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Flag } from '../components/Flags';
import { ui } from '../i18n';
import { play } from '../sound';
import { colors, fonts } from '../theme';
import { Tile, TileState } from './Tile';
import { GameProps } from './types';
import { Emoji, EmojiText } from '../components/Emoji';

export function TrueFalseGame({ q, lang, onAnswer }: GameProps<'tf'>) {
  const [picked, setPicked] = useState<boolean | null>(null);
  const choose = (v: boolean) => {
    if (picked !== null) return;
    setPicked(v);
    const ok = v === q.answer;
    play(ok ? 'correct' : 'wrong');
    onAnswer(ok);
  };
  const stateOf = (v: boolean): TileState => (picked === null ? 'idle' : v === q.answer ? 'correct' : v === picked ? 'wrong' : 'dim');

  return (
    <View style={styles.wrap}>
      <View style={styles.scene}>
        {q.sceneFlag ? <Flag lang={q.sceneFlag} width={120} /> : null}
        <EmojiText text={q.scene} size={84} textStyle={styles.sceneText} />
      </View>
      <View style={styles.row}>
        <Tile style={styles.btn} state={stateOf(true)} onPress={() => choose(true)}>
          <Emoji char="👍" size={60} />
          <Text style={[styles.label, { color: colors.okDark }]}>{ui.true[lang]}</Text>
        </Tile>
        <Tile style={styles.btn} state={stateOf(false)} onPress={() => choose(false)} delay={100}>
          <Emoji char="👎" size={60} />
          <Text style={[styles.label, { color: colors.badDark }]}>{ui.false[lang]}</Text>
        </Tile>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: '100%', alignItems: 'center', gap: 16 },
  scene: { alignItems: 'center', gap: 8 },
  sceneText: { fontSize: 64, lineHeight: 80, textAlign: 'center', fontFamily: fonts.bodyBold, color: colors.purpleDark },
  row: { flexDirection: 'row', gap: 14, width: '100%', justifyContent: 'center' },
  btn: { flex: 1, maxWidth: 200 },
  label: { fontFamily: fonts.bodyBold, fontSize: 22 },
});
