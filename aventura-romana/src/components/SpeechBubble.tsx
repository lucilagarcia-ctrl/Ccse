import { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { colors, shadow } from '../theme';

/** Bocadillo de cómic con la colita hacia el personaje (a la izquierda). */
export function SpeechBubble({ children, style }: { children: ReactNode; style?: ViewStyle }) {
  return (
    <View style={[styles.wrap, style]}>
      <View style={styles.tail} />
      <View style={styles.bubble}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  tail: { width: 0, height: 0, borderTopWidth: 10, borderBottomWidth: 10, borderRightWidth: 16, borderTopColor: 'transparent', borderBottomColor: 'transparent', borderRightColor: colors.marble, marginRight: -2 },
  bubble: { flex: 1, backgroundColor: colors.marble, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 10, borderWidth: 3, borderColor: colors.gold, ...shadow },
});
