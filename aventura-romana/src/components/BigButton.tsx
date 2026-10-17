import { ReactNode, useState } from 'react';
import { Animated, Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors, fonts } from '../theme';

type Props = {
  label?: string;
  children?: ReactNode;
  onPress?: () => void;
  color?: string;
  shade?: string;
  textColor?: string;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  big?: boolean;
};

/** Botón "3D" gordito que se hunde al tocarlo — pensado para dedos de 7 años. */
export function BigButton({ label, children, onPress, color = colors.terracotta, shade = colors.terracottaDark, textColor = colors.white, style, disabled, big }: Props) {
  const [press] = useState(() => new Animated.Value(0));
  const to = (v: number) => Animated.spring(press, { toValue: v, useNativeDriver: true, speed: 40, bounciness: 8 }).start();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      onPressIn={() => to(1)}
      onPressOut={() => to(0)}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={[{ opacity: disabled ? 0.5 : 1 }, style]}
    >
      <Animated.View style={[styles.shade, { backgroundColor: shade, borderRadius: big ? 28 : 22 }]}>
        <Animated.View
          style={[
            styles.face,
            { backgroundColor: color, borderRadius: big ? 28 : 22, paddingVertical: big ? 18 : 12 },
            { transform: [{ translateY: press.interpolate({ inputRange: [0, 1], outputRange: [-6, 0] }) }] },
          ]}
        >
          {children}
          {label ? <Text style={[styles.label, { color: textColor, fontSize: big ? 30 : 22 }]}>{label}</Text> : null}
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  shade: { marginTop: 6 },
  face: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 18, flexDirection: 'row', gap: 10 },
  label: { fontFamily: fonts.bodyBold, textAlign: 'center' },
});
