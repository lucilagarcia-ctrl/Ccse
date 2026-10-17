import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { play } from '../sound';
import { colors, fonts, shadow } from '../theme';

/** Teclado numérico grande para escribir resultados de cuentas. */
export function NumberPad({ onSubmit, disabled, result }: { onSubmit: (n: number) => void; disabled?: boolean; result?: 'ok' | 'bad' }) {
  const [value, setValue] = useState('');
  const press = (k: string) => {
    if (disabled) return;
    play('pop');
    if (k === '⌫') setValue((v) => v.slice(0, -1));
    else if (k === '✔') {
      if (value) onSubmit(Number(value));
    } else if (value.length < 3) setValue((v) => (v === '0' ? k : v + k));
  };
  return (
    <View style={styles.wrap}>
      <View style={[styles.display, result === 'ok' && styles.ok, result === 'bad' && styles.bad]}>
        <Text style={styles.displayText}>{value || ' '}</Text>
      </View>
      <View style={styles.keys}>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '⌫', '0', '✔'].map((k) => (
          <Pressable
            key={k}
            onPress={() => press(k)}
            style={({ pressed }) => [styles.key, k === '✔' && styles.go, k === '⌫' && styles.del, pressed && { transform: [{ scale: 0.92 }] }]}
          >
            <Text style={[styles.keyText, (k === '✔' || k === '⌫') && { color: colors.white }]}>{k}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: '100%', alignItems: 'center', gap: 10 },
  display: { minWidth: 140, paddingHorizontal: 20, paddingVertical: 4, borderRadius: 18, borderWidth: 4, borderColor: colors.gold, backgroundColor: colors.white, alignItems: 'center' },
  ok: { borderColor: colors.ok, backgroundColor: '#C9F2C7' },
  bad: { borderColor: colors.bad, backgroundColor: '#FFD0D0' },
  displayText: { fontFamily: fonts.bodyBold, fontSize: 44, color: colors.ink, minHeight: 54 },
  keys: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8, maxWidth: 300 },
  key: { width: 84, height: 56, borderRadius: 16, backgroundColor: colors.marble, borderWidth: 3, borderColor: colors.gold, alignItems: 'center', justifyContent: 'center', ...shadow },
  go: { backgroundColor: colors.ok, borderColor: colors.okDark },
  del: { backgroundColor: colors.terracotta, borderColor: colors.terracottaDark },
  keyText: { fontFamily: fonts.bodyBold, fontSize: 28, color: colors.ink },
});
