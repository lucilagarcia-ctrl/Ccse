import { useEffect, useState } from 'react';
import { Animated, Easing, ViewStyle } from 'react-native';
import Svg, { Circle, Ellipse, G, Path, Rect } from 'react-native-svg';
import { colors } from '../theme';

export type Mood = 'happy' | 'sad' | 'neutral' | 'talk' | 'wow';
export type RomanKind = 'legionario' | 'senadora' | 'emperador';

type Props = {
  mood?: Mood;
  kind?: RomanKind;
  size?: number;
  /** Animación continua: salta (feliz), se balancea (normal) o tiembla un poco (triste). */
  animate?: boolean;
  style?: ViewStyle;
};

/** El personaje romano de la app, dibujado en SVG para que se vea nítido en cualquier pantalla. */
export function Romanito({ mood = 'neutral', kind = 'legionario', size = 160, animate = true, style }: Props) {
  const [anim] = useState(() => new Animated.Value(0));
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    if (!animate) return;
    const duration = mood === 'happy' ? 420 : mood === 'sad' ? 1600 : 1100;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [mood, animate, anim]);

  useEffect(() => {
    const id = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 140);
    }, 3200 + Math.random() * 1500);
    return () => clearInterval(id);
  }, []);

  const transform =
    mood === 'happy'
      ? [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [0, -size * 0.12] }) }]
      : mood === 'sad'
        ? [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [0, size * 0.02] }) }]
        : [{ rotate: anim.interpolate({ inputRange: [0, 1], outputRange: ['-3deg', '3deg'] }) }];

  return (
    <Animated.View style={[{ width: size, height: size * 1.3, transform }, style]}>
      <Svg width="100%" height="100%" viewBox="0 0 200 260">
        <Ellipse cx="100" cy="252" rx="52" ry="7" fill="#000" opacity={0.15} />
        <Body kind={kind} mood={mood} />
        <Head kind={kind} mood={mood} blink={blink} />
      </Svg>
    </Animated.View>
  );
}

function Arms({ mood, sleeve }: { mood: Mood; sleeve: string }) {
  // Brazos arriba cuando está contento, caídos cuando está triste.
  if (mood === 'happy' || mood === 'wow') {
    return (
      <G>
        <Path d="M66 160 L38 118" stroke={sleeve} strokeWidth={18} strokeLinecap="round" />
        <Path d="M134 160 L162 118" stroke={sleeve} strokeWidth={18} strokeLinecap="round" />
        <Circle cx="36" cy="112" r="11" fill={colors.skin} />
        <Circle cx="164" cy="112" r="11" fill={colors.skin} />
      </G>
    );
  }
  if (mood === 'sad') {
    return (
      <G>
        <Path d="M66 160 L60 205" stroke={sleeve} strokeWidth={18} strokeLinecap="round" />
        <Path d="M134 160 L140 205" stroke={sleeve} strokeWidth={18} strokeLinecap="round" />
        <Circle cx="59" cy="211" r="10" fill={colors.skin} />
        <Circle cx="141" cy="211" r="10" fill={colors.skin} />
      </G>
    );
  }
  // neutral / talk: una mano saluda
  return (
    <G>
      <Path d="M66 160 L50 200" stroke={sleeve} strokeWidth={18} strokeLinecap="round" />
      <Path d="M134 160 L158 130" stroke={sleeve} strokeWidth={18} strokeLinecap="round" />
      <Circle cx="48" cy="206" r="10" fill={colors.skin} />
      <Circle cx="161" cy="124" r="11" fill={colors.skin} />
    </G>
  );
}

function Body({ kind, mood }: { kind: RomanKind; mood: Mood }) {
  const legs = (
    <G>
      <Rect x="80" y="214" width="14" height="30" rx="6" fill={colors.skin} />
      <Rect x="106" y="214" width="14" height="30" rx="6" fill={colors.skin} />
      <Path d="M78 228 h18 M78 236 h18 M104 228 h18 M104 236 h18" stroke="#7A4A22" strokeWidth={3} />
      <Ellipse cx="86" cy="246" rx="12" ry="6" fill="#7A4A22" />
      <Ellipse cx="114" cy="246" rx="12" ry="6" fill="#7A4A22" />
    </G>
  );

  if (kind === 'legionario') {
    return (
      <G>
        {legs}
        <Arms mood={mood} sleeve={colors.red} />
        {/* túnica roja */}
        <Path d="M66 150 Q100 138 134 150 L140 205 Q100 214 60 205 Z" fill={colors.red} />
        {/* faldón de tiras de cuero */}
        {[66, 78, 90, 102, 114, 126].map((x) => (
          <Rect key={x} x={x} y="196" width="10" height="22" rx="3" fill="#8B5A2B" stroke="#5E3A17" strokeWidth={1.5} />
        ))}
        {/* coraza dorada (lorica segmentata) */}
        <Rect x="70" y="150" width="60" height="48" rx="12" fill={colors.gold} stroke={colors.goldDark} strokeWidth={3} />
        <Path d="M72 164 h56 M72 176 h56 M72 188 h56" stroke={colors.goldDark} strokeWidth={2.5} />
        <Rect x="68" y="194" width="64" height="8" rx="3" fill="#6B3E1A" />
        <Circle cx="100" cy="198" r="5" fill={colors.gold} />
        {/* escudo (scutum) */}
        {mood !== 'happy' && mood !== 'wow' && (
          <G>
            <Rect x="20" y="158" width="38" height="58" rx="8" fill={colors.red} stroke={colors.gold} strokeWidth={4} />
            <Circle cx="39" cy="187" r="8" fill={colors.gold} />
            <Path d="M26 168 l10 6 M52 168 l-10 6 M26 206 l10 -6 M52 206 l-10 -6" stroke={colors.gold} strokeWidth={3} />
          </G>
        )}
      </G>
    );
  }

  if (kind === 'senadora') {
    return (
      <G>
        {legs}
        <Arms mood={mood} sleeve="#E7D8F2" />
        {/* stola larga */}
        <Path d="M68 148 Q100 136 132 148 L148 238 Q100 248 52 238 Z" fill="#E7D8F2" />
        <Path d="M120 146 Q96 190 64 236" stroke={colors.purple} strokeWidth={12} fill="none" />
        <Path d="M60 230 Q100 240 140 230" stroke={colors.gold} strokeWidth={4} fill="none" />
        {/* collar */}
        <Path d="M84 150 Q100 162 116 150" stroke={colors.gold} strokeWidth={4} fill="none" />
        <Circle cx="100" cy="160" r="5" fill={colors.red} stroke={colors.gold} strokeWidth={2} />
      </G>
    );
  }

  // emperador: toga blanca con banda púrpura
  return (
    <G>
      {legs}
      <Arms mood={mood} sleeve={colors.marble} />
      <Path d="M64 150 Q100 136 136 150 L142 222 Q100 232 58 222 Z" fill={colors.marble} stroke={colors.marbleDark} strokeWidth={2} />
      <Path d="M130 148 Q104 186 70 222" stroke={colors.purple} strokeWidth={14} fill="none" />
      <Path d="M76 168 Q96 180 120 172 M74 196 Q100 206 132 196" stroke={colors.marbleDark} strokeWidth={2} fill="none" />
    </G>
  );
}

function Laurel({ y = 72 }: { y?: number }) {
  const leaves = [-50, -38, -26, -14, 14, 26, 38, 50];
  return (
    <G>
      <Path d={`M52 ${y + 22} Q100 ${y - 14} 148 ${y + 22}`} stroke={colors.oliveDark} strokeWidth={3} fill="none" />
      {leaves.map((dx) => {
        const x = 100 + dx * 0.96;
        const yy = y + 4 + Math.abs(dx) * 0.36;
        return <Ellipse key={dx} cx={x} cy={yy} rx="9" ry="5" fill={colors.olive} transform={`rotate(${dx > 0 ? 35 : -35} ${x} ${yy})`} />;
      })}
    </G>
  );
}

function Head({ kind, mood, blink }: { kind: RomanKind; mood: Mood; blink: boolean }) {
  return (
    <G>
      {/* pelo de la senadora detrás de la cabeza */}
      {kind === 'senadora' && (
        <G>
          <Circle cx="100" cy="58" r="20" fill="#5A3418" />
          <Ellipse cx="100" cy="104" rx="50" ry="48" fill="#6B3E1F" />
        </G>
      )}
      {/* orejas y cara */}
      <Circle cx="56" cy="108" r="9" fill={colors.skinShade} />
      <Circle cx="144" cy="108" r="9" fill={colors.skinShade} />
      <Circle cx="100" cy="106" r="44" fill={colors.skin} />
      <Face mood={mood} blink={blink} />

      {kind === 'legionario' && (
        <G>
          {/* penacho rojo */}
          <Path d="M60 62 Q100 4 140 62 Z" fill={colors.red} />
          {[70, 82, 94, 106, 118, 130].map((x) => (
            <Path key={x} d={`M${x} 60 Q${(x + 100) / 2} 30 100 22`} stroke={colors.redDark} strokeWidth={2} fill="none" />
          ))}
          {/* casco */}
          <Path d="M54 96 Q54 50 100 50 Q146 50 146 96 Q100 82 54 96 Z" fill={colors.gold} stroke={colors.goldDark} strokeWidth={3} />
          <Path d="M54 92 Q100 78 146 92" stroke={colors.goldDark} strokeWidth={5} fill="none" />
          <Rect x="94" y="52" width="12" height="34" rx="4" fill={colors.goldDark} opacity={0.5} />
          {/* carrilleras */}
          <Path d="M52 94 Q48 120 60 134 Q68 120 66 96 Z" fill={colors.gold} stroke={colors.goldDark} strokeWidth={2.5} />
          <Path d="M148 94 Q152 120 140 134 Q132 120 134 96 Z" fill={colors.gold} stroke={colors.goldDark} strokeWidth={2.5} />
        </G>
      )}

      {kind === 'senadora' && (
        <G>
          <Path d="M56 100 Q58 60 100 60 Q142 60 144 100 Q124 78 100 80 Q76 78 56 100 Z" fill="#6B3E1F" />
          <Laurel y={64} />
        </G>
      )}

      {kind === 'emperador' && (
        <G>
          <Path d="M56 98 Q56 58 100 58 Q144 58 144 98 Q138 80 126 82 Q118 72 100 76 Q82 72 74 82 Q62 80 56 98 Z" fill="#8A5A2E" />
          {[68, 82, 96, 110, 124].map((x) => (
            <Circle key={x} cx={x + 4} cy={78} r="6" fill="#8A5A2E" />
          ))}
          <Laurel y={66} />
        </G>
      )}
    </G>
  );
}

function Face({ mood, blink }: { mood: Mood; blink: boolean }) {
  const ink = colors.ink;
  let eyes;
  if (blink && mood !== 'happy') {
    eyes = <Path d="M74 106 q8 4 16 0 M110 106 q8 4 16 0" stroke={ink} strokeWidth={3.5} strokeLinecap="round" fill="none" />;
  } else if (mood === 'happy') {
    eyes = <Path d="M73 108 q9 -12 18 0 M109 108 q9 -12 18 0" stroke={ink} strokeWidth={4.5} strokeLinecap="round" fill="none" />;
  } else if (mood === 'wow') {
    eyes = (
      <G>
        <Circle cx="82" cy="104" r="9" fill={ink} />
        <Circle cx="118" cy="104" r="9" fill={ink} />
        <Circle cx="85" cy="100" r="3.5" fill="#fff" />
        <Circle cx="121" cy="100" r="3.5" fill="#fff" />
      </G>
    );
  } else {
    eyes = (
      <G>
        <Ellipse cx="82" cy="105" rx="6.5" ry="8" fill={ink} />
        <Ellipse cx="118" cy="105" rx="6.5" ry="8" fill={ink} />
        <Circle cx="84" cy="102" r="2.5" fill="#fff" />
        <Circle cx="120" cy="102" r="2.5" fill="#fff" />
      </G>
    );
  }

  let mouth;
  if (mood === 'happy') {
    mouth = (
      <G>
        <Path d="M80 122 Q100 148 120 122 Z" fill="#8E2A2A" />
        <Path d="M90 134 Q100 142 110 134 Q100 130 90 134 Z" fill="#F07C7C" />
      </G>
    );
  } else if (mood === 'sad') {
    mouth = <Path d="M86 134 Q100 122 114 134" stroke={ink} strokeWidth={4} strokeLinecap="round" fill="none" />;
  } else if (mood === 'talk' || mood === 'wow') {
    mouth = <Ellipse cx="100" cy="129" rx="8" ry="9" fill="#8E2A2A" />;
  } else {
    mouth = <Path d="M86 124 Q100 136 114 124" stroke={ink} strokeWidth={4} strokeLinecap="round" fill="none" />;
  }

  return (
    <G>
      {mood === 'sad' && (
        <G>
          <Path d="M72 92 L90 96 M128 92 L110 96" stroke={ink} strokeWidth={3.5} strokeLinecap="round" />
          <Path d="M76 116 q-5 10 0 14 q5 -4 0 -14 Z" fill="#5BB8F0" />
        </G>
      )}
      {eyes}
      <Ellipse cx="70" cy="120" rx="8" ry="5" fill="#F29A9A" opacity={0.6} />
      <Ellipse cx="130" cy="120" rx="8" ry="5" fill="#F29A9A" opacity={0.6} />
      {mouth}
    </G>
  );
}
