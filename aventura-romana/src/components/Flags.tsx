import Svg, { Circle, G, Path, Rect } from 'react-native-svg';
import { FlagCode } from '../questions/types';

/** Banderas dibujadas (castellano → España, inglés → Reino Unido, catalán → senyera). */
export function Flag({ lang, width = 90 }: { lang: FlagCode; width?: number }) {
  const height = (width * 2) / 3;
  return (
    <Svg width={width} height={height} viewBox="0 0 60 40">
      {lang === 'es' && (
        <G>
          <Rect width="60" height="40" fill="#C60B1E" />
          <Rect y="10" width="60" height="20" fill="#FFC400" />
        </G>
      )}
      {lang === 'ca' && (
        <G>
          <Rect width="60" height="40" fill="#FCDD09" />
          {[0, 1, 2, 3].map((i) => (
            <Rect key={i} y={4.44 + i * 8.88} width="60" height="4.44" fill="#DA121A" />
          ))}
        </G>
      )}
      {lang === 'ar' && (
        <G>
          <Rect width="60" height="40" fill="#74ACDF" />
          <Rect y="13.33" width="60" height="13.34" fill="#fff" />
          <Circle cx="30" cy="20" r="4.6" fill="#F6B40E" stroke="#85340A" strokeWidth={0.6} />
        </G>
      )}
      {lang === 'it' && (
        <G>
          <Rect width="20" height="40" fill="#009246" />
          <Rect x="20" width="20" height="40" fill="#fff" />
          <Rect x="40" width="20" height="40" fill="#CE2B37" />
        </G>
      )}
      {lang === 'fr' && (
        <G>
          <Rect width="20" height="40" fill="#0055A4" />
          <Rect x="20" width="20" height="40" fill="#fff" />
          <Rect x="40" width="20" height="40" fill="#EF4135" />
        </G>
      )}
      {lang === 'pt' && (
        <G>
          <Rect width="24" height="40" fill="#006600" />
          <Rect x="24" width="36" height="40" fill="#FF0000" />
          <Circle cx="24" cy="20" r="7" fill="#FFCC00" />
        </G>
      )}
      {lang === 'en' && (
        <G>
          <Rect width="60" height="40" fill="#012169" />
          <Path d="M0 0 L60 40 M60 0 L0 40" stroke="#fff" strokeWidth={8} />
          <Path d="M0 0 L60 40 M60 0 L0 40" stroke="#C8102E" strokeWidth={3} />
          <Path d="M30 0 V40 M0 20 H60" stroke="#fff" strokeWidth={12} />
          <Path d="M30 0 V40 M0 20 H60" stroke="#C8102E" strokeWidth={7} />
        </G>
      )}
    </Svg>
  );
}
