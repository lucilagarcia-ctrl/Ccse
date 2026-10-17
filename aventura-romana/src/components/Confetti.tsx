import { useEffect, useState } from 'react';
import { Animated, Easing, StyleSheet, useWindowDimensions, View } from 'react-native';
import { colors } from '../theme';

const PALETTE = [colors.gold, colors.red, colors.purple, colors.olive, colors.skyDeep, '#fff'];

/** Lluvia de confeti y hojas de laurel para celebrar. */
export function Confetti({ count = 40 }: { count?: number }) {
  const { width, height } = useWindowDimensions();
  const [pieces] = useState(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        size: 8 + Math.random() * 10,
        color: PALETTE[i % PALETTE.length],
        delay: Math.random() * 1500,
        duration: 2500 + Math.random() * 2000,
        spin: Math.random() < 0.5 ? 1 : -1,
        leaf: i % 5 === 0,
      })),
  );
  const [anims] = useState(() => pieces.map(() => new Animated.Value(0)));

  useEffect(() => {
    const loops = anims.map((a, i) =>
      Animated.loop(Animated.timing(a, { toValue: 1, duration: pieces[i].duration, delay: pieces[i].delay, easing: Easing.linear, useNativeDriver: true })),
    );
    loops.forEach((l) => l.start());
    return () => loops.forEach((l) => l.stop());
  }, [anims, pieces]);

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {pieces.map((p, i) => (
        <Animated.View
          key={i}
          style={{
            position: 'absolute',
            left: p.x,
            top: -20,
            width: p.size,
            height: p.leaf ? p.size * 1.8 : p.size * 0.6,
            borderRadius: p.leaf ? p.size : 2,
            backgroundColor: p.leaf ? colors.olive : p.color,
            transform: [
              { translateY: anims[i].interpolate({ inputRange: [0, 1], outputRange: [0, height + 40] }) },
              { rotate: anims[i].interpolate({ inputRange: [0, 1], outputRange: ['0deg', `${p.spin * 540}deg`] }) },
            ],
          }}
        />
      ))}
    </View>
  );
}
