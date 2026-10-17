import { ReactNode, useEffect, useState } from 'react';
import { Animated, Easing, StyleSheet, View, useWindowDimensions } from 'react-native';
import Svg, { Circle, Defs, G, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { colors } from '../theme';

/** Fondo de escena romana: cielo, sol, nubes que se mueven, Coliseo y columnas. */
export function RomanBackground({ children, dim = false }: { children: ReactNode; dim?: boolean }) {
  const { width, height } = useWindowDimensions();
  const [cloud] = useState(() => new Animated.Value(0));

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(cloud, { toValue: 1, duration: 40000, easing: Easing.linear, useNativeDriver: true }),
    );
    loop.start();
    return () => loop.stop();
  }, [cloud]);

  const tx = cloud.interpolate({ inputRange: [0, 1], outputRange: [-width * 0.3, width * 1.1] });
  const tx2 = cloud.interpolate({ inputRange: [0, 1], outputRange: [width * 0.6, -width * 0.6] });

  return (
    <View style={styles.root}>
      <Svg style={StyleSheet.absoluteFill} width={width} height={height} viewBox="0 0 400 800" preserveAspectRatio="xMidYMax slice">
        <Defs>
          <LinearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={colors.skyDeep} />
            <Stop offset="0.7" stopColor={colors.sky} />
            <Stop offset="1" stopColor="#FCE7B8" />
          </LinearGradient>
        </Defs>
        <Rect width="400" height="800" fill="url(#sky)" />
        <Circle cx="330" cy="110" r="46" fill="#FFE27A" opacity={0.6} />
        <Circle cx="330" cy="110" r="34" fill="#FFD23F" />
        {/* colinas */}
        <Path d="M0 640 Q100 580 200 630 Q300 580 400 620 V800 H0 Z" fill="#9BC46A" />
        {/* Coliseo */}
        <G transform="translate(70 520)">
          <Path d="M0 120 V40 Q130 -10 260 40 V120 Z" fill={colors.stone} />
          <Path d="M200 120 V30 Q235 30 260 40 V120 Z" fill={colors.marbleDark} />
          {[0, 1, 2].map((row) =>
            Array.from({ length: 9 }).map((_, i) => (
              <Rect key={`${row}-${i}`} x={12 + i * 27} y={52 + row * 22} width="14" height="16" rx="7" fill="#B59E73" />
            )),
          )}
          <Path d="M0 46 Q130 -4 260 46" stroke="#B59E73" strokeWidth={3} fill="none" />
        </G>
        {/* suelo */}
        <Path d="M0 680 Q200 650 400 680 V800 H0 Z" fill="#E9D3A0" />
        <Path d="M0 720 H400" stroke="#D9BF85" strokeWidth={2} />
        {/* columnas laterales */}
        {[8, 352].map((x) => (
          <G key={x} transform={`translate(${x} 420)`}>
            <Rect x="-6" y="0" width="52" height="16" rx="3" fill={colors.marble} stroke={colors.marbleDark} strokeWidth={2} />
            <Rect x="2" y="16" width="36" height="330" fill={colors.marble} />
            {[10, 20, 30].map((sx) => (
              <Rect key={sx} x={sx} y="16" width="3" height="330" fill={colors.marbleDark} />
            ))}
            <Rect x="-6" y="340" width="52" height="16" rx="3" fill={colors.marble} stroke={colors.marbleDark} strokeWidth={2} />
          </G>
        ))}
      </Svg>
      <Animated.View style={[styles.cloud, { top: height * 0.06, transform: [{ translateX: tx }] }]}>
        <Cloud />
      </Animated.View>
      <Animated.View style={[styles.cloud, { top: height * 0.22, transform: [{ translateX: tx2 }, { scale: 0.7 }] }]}>
        <Cloud />
      </Animated.View>
      {dim && <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(58,36,22,0.25)' }]} />}
      {children}
    </View>
  );
}

function Cloud() {
  return (
    <Svg width={140} height={60} viewBox="0 0 140 60">
      <Circle cx="40" cy="38" r="20" fill="#fff" opacity={0.9} />
      <Circle cx="70" cy="28" r="26" fill="#fff" opacity={0.9} />
      <Circle cx="100" cy="38" r="20" fill="#fff" opacity={0.9} />
      <Rect x="40" y="38" width="60" height="20" fill="#fff" opacity={0.9} />
    </Svg>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.sky, overflow: 'hidden' },
  cloud: { position: 'absolute', left: 0 },
});
