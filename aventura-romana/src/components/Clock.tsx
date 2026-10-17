import { useEffect, useState } from 'react';
import { Animated, Easing } from 'react-native';
import Svg, { Circle, G, Line, Text as SvgText } from 'react-native-svg';
import { colors } from '../theme';

type Props = { h: number; m: number; size?: number; spin?: boolean; onDone?: () => void };

/** Reloj de agujas. Con `spin`, las agujas dan vueltas y se paran en la hora pedida (para las escenas animadas). */
export function Clock({ h, m, size = 120, spin = false, onDone }: Props) {
  const target = (h % 12) * 60 + m;
  const [minutes, setMinutes] = useState(spin ? 0 : target);
  const [anim] = useState(() => new Animated.Value(0));

  useEffect(() => {
    if (!spin) return;
    anim.setValue(0);
    const end = target + 12 * 60;
    const listener = anim.addListener(({ value }) => setMinutes(value * end));
    Animated.timing(anim, { toValue: 1, duration: 2800, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start(() => onDone?.());
    return () => anim.removeListener(listener);
  }, [spin, target, anim, onDone]);

  const shown = spin ? minutes : target;
  const minAngle = ((shown % 60) / 60) * 360;
  const hourAngle = ((shown / 60) % 12) * 30;
  const hand = (angle: number, len: number) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return { x2: 50 + Math.cos(rad) * len, y2: 50 + Math.sin(rad) * len };
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Circle cx="50" cy="50" r="47" fill={colors.marble} stroke={colors.goldDark} strokeWidth={5} />
      {Array.from({ length: 12 }).map((_, i) => {
        const rad = ((i * 30 - 90) * Math.PI) / 180;
        const n = i === 0 ? 12 : i;
        return (
          <G key={i}>
            <SvgText x={50 + Math.cos(rad) * 35} y={50 + Math.sin(rad) * 35 + 4} fontSize={i % 3 === 0 ? 12 : 9} fontWeight="bold" fill={colors.ink} textAnchor="middle">
              {n}
            </SvgText>
          </G>
        );
      })}
      <Line x1="50" y1="50" {...hand(hourAngle, 22)} stroke={colors.red} strokeWidth={6} strokeLinecap="round" />
      <Line x1="50" y1="50" {...hand(minAngle, 34)} stroke={colors.ink} strokeWidth={4} strokeLinecap="round" />
      <Circle cx="50" cy="50" r="4" fill={colors.gold} />
    </Svg>
  );
}
