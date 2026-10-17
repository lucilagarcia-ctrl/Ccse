import { StyleSheet, Text, View } from 'react-native';
import { Lang } from '../i18n';
import { Choice } from '../questions/types';
import { colors, fonts } from '../theme';
import { Clock } from './Clock';
import { Flag } from './Flags';

export const choiceText = (c: Choice, lang: Lang) => (typeof c.label === 'string' ? c.label : c.label?.[lang] ?? '');

/** Dibuja una opción: emoji, bandera, reloj y/o texto corto. */
export function ChoiceView({ choice, lang, size = 56, compact = false }: { choice: Choice; lang: Lang; size?: number; compact?: boolean }) {
  const text = choiceText(choice, lang);
  return (
    <View style={styles.wrap}>
      {choice.emoji ? <Text style={{ fontSize: size, lineHeight: size * 1.2, textAlign: 'center' }}>{choice.emoji}</Text> : null}
      {choice.flag ? (
        <View style={styles.flag}>
          <Flag lang={choice.flag} width={size * 1.6} />
        </View>
      ) : null}
      {choice.clock ? <Clock h={choice.clock.h} m={choice.clock.m} size={size * 1.4} /> : null}
      {text ? (
        <Text
          style={[styles.text, { fontSize: compact ? (text.length > 6 ? 15 : 19) : text.length > 12 ? 22 : text.length > 5 ? 26 : 34 }]}
          numberOfLines={2}
          adjustsFontSizeToFit
          minimumFontScale={0.6}
        >
          {text}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center' },
  flag: { borderRadius: 6, overflow: 'hidden', borderWidth: 2, borderColor: '#0002' },
  text: { fontFamily: fonts.bodyBold, color: colors.ink, textAlign: 'center' },
});
