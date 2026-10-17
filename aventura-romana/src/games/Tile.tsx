import { ReactNode, useEffect, useState } from 'react';
import { Animated, Easing, Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { colors, shadow } from '../theme';

export type TileState = 'idle' | 'correct' | 'wrong' | 'dim' | 'selected';

type Props = {
  children: ReactNode;
  onPress?: () => void;
  state?: TileState;
  delay?: number;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
};

const bg: Record<TileState, string> = {
  idle: colors.marble,
  selected: '#FFF0BF',
  correct: '#C9F2C7',
  wrong: '#FFD0D0',
  dim: colors.marble,
};
const border: Record<TileState, string> = {
  idle: colors.gold,
  selected: colors.goldDark,
  correct: colors.ok,
  wrong: colors.bad,
  dim: colors.marbleDark,
};

/** Baldosa de mármol que aparece con un "pop", se hunde al tocarla y tiembla si es incorrecta. */
export function Tile({ children, onPress, state = 'idle', delay = 0, style, disabled }: Props) {
  const [enter] = useState(() => new Animated.Value(0));
  const [press] = useState(() => new Animated.Value(1));
  const [shake] = useState(() => new Animated.Value(0));

  useEffect(() => {
    Animated.spring(enter, { toValue: 1, delay, useNativeDriver: true, speed: 12, bounciness: 12 }).start();
  }, [enter, delay]);

  useEffect(() => {
    if (state === 'wrong') {
      Animated.sequence(
        [10, -10, 8, -8, 0].map((v) => Animated.timing(shake, { toValue: v, duration: 60, easing: Easing.linear, useNativeDriver: true })),
      ).start();
    }
    if (state === 'correct') {
      Animated.sequence([
        Animated.spring(press, { toValue: 1.12, useNativeDriver: true, speed: 30 }),
        Animated.spring(press, { toValue: 1, useNativeDriver: true, speed: 20 }),
      ]).start();
    }
  }, [state, shake, press]);

  return (
    <Animated.View
      style={[
        { transform: [{ scale: Animated.multiply(enter, press) }, { translateX: shake }], opacity: state === 'dim' ? 0.45 : 1 },
        style,
      ]}
    >
      <Pressable
        disabled={disabled}
        onPress={onPress}
        onPressIn={() => Animated.spring(press, { toValue: 0.93, useNativeDriver: true, speed: 50 }).start()}
        onPressOut={() => Animated.spring(press, { toValue: 1, useNativeDriver: true, speed: 30 }).start()}
        style={[styles.tile, { backgroundColor: bg[state], borderColor: border[state] }]}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  tile: { borderRadius: 22, borderWidth: 4, padding: 10, alignItems: 'center', justifyContent: 'center', minHeight: 84, ...shadow },
});
