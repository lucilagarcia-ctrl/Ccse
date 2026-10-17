import { Image, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { emojiImages } from '../emojiImages';

/**
 * Dibuja emojis como ilustraciones 3D (Microsoft Fluent Emoji, ver scripts/make-emoji-images.py).
 * Si un emoji no tiene imagen, se muestra el emoji del sistema.
 */
const norm = (s: string) => s.replace(/️/g, '');
const maxLen = Math.max(1, ...Object.keys(emojiImages).map((k) => k.length));

type Token = { img: number; key: string } | { text: string };

/** Separa un texto en trozos: imágenes para los emojis conocidos y texto para el resto. */
export function splitEmoji(input: string): Token[] {
  const s = norm(input);
  const out: Token[] = [];
  let buf = '';
  for (let i = 0; i < s.length; ) {
    let hit = '';
    for (let n = Math.min(maxLen, s.length - i); n > 0; n--) {
      const piece = s.slice(i, i + n);
      if (emojiImages[piece]) {
        hit = piece;
        break;
      }
    }
    if (hit) {
      if (buf) out.push({ text: buf });
      buf = '';
      out.push({ img: emojiImages[hit], key: hit });
      i += hit.length;
    } else {
      buf += s[i];
      i += 1;
    }
  }
  if (buf) out.push({ text: buf });
  return out;
}

export const hasEmojiImage = (s: string) => splitEmoji(s).some((t) => 'img' in t);

/** Un emoji suelto como imagen. */
export function Emoji({ char, size, style }: { char: string; size: number; style?: StyleProp<ViewStyle> }) {
  const img = emojiImages[norm(char)];
  if (!img) return <Text style={{ fontSize: size * 0.85, lineHeight: size * 1.05, textAlign: 'center' }}>{char}</Text>;
  return (
    <View style={style}>
      <Image source={img} style={{ width: size, height: size }} resizeMode="contain" />
    </View>
  );
}

/** Texto que puede mezclar palabras/números y emojis (los emojis salen como imágenes). */
export function EmojiText({ text, size, textStyle, style }: { text: string; size: number; textStyle?: StyleProp<TextStyle>; style?: StyleProp<ViewStyle> }) {
  return (
    <View style={[styles.row, style]}>
      {splitEmoji(text).map((t, i) =>
        'img' in t ? (
          <Image key={i} source={t.img} style={{ width: size, height: size }} resizeMode="contain" />
        ) : t.text.trim() ? (
          <Text key={i} style={textStyle}>
            {t.text}
          </Text>
        ) : (
          <View key={i} style={{ width: size * 0.15 * t.text.length }} />
        ),
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 2 },
});
