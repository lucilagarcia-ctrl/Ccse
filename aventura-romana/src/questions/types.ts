import { L, Lang } from '../i18n';

export type Subject = 'math' | 'history' | 'rome' | 'english' | 'catalan';
export type FlagCode = Lang | 'ar' | 'it' | 'fr' | 'pt';

/** Una opción visual: emoji grande, texto corto, bandera o reloj. */
export type Choice = {
  emoji?: string;
  /** Texto: traducible (L) o fijo (una palabra en inglés/catalán, un número...). */
  label?: L | string;
  flag?: FlagCode;
  clock?: { h: number; m: number };
  /** Si es una palabra de otro idioma, se pronuncia en ese idioma al tocarla. */
  speakAs?: Lang;
};

/** "Vídeos": escenas animadas cortas que hay que mirar antes de responder. */
export type VideoScene =
  | { type: 'march'; count: number }
  | { type: 'coins'; start: number; add: number; remove: number }
  | { type: 'race'; winner: number }
  | { type: 'clock'; h: number; m: number }
  | { type: 'pattern'; seq: string[] };

type Base = {
  id: string;
  subject: Subject;
  prompt: L;
  /** Palabra o frase grande que se muestra (y pronuncia) en el idioma que se está aprendiendo. */
  word?: { text: string; lang: Lang };
};

export type Question = Base &
  (
    | { kind: 'tf'; scene: string; sceneFlag?: FlagCode; answer: boolean }
    | { kind: 'choice'; scene?: string; listen?: boolean; choices: Choice[]; correct: number }
    | { kind: 'math'; visual: MathVisual; expr: string; answer: number; choices?: number[] }
    | { kind: 'video'; video: VideoScene; choices: Choice[]; correct: number }
    | { kind: 'memory'; pairs: [Choice, Choice][] }
    | { kind: 'order'; items: Choice[] }
    | { kind: 'tap'; target: string; others: string[]; count: number }
    | { kind: 'spell'; emoji: string; answer: string; lang: Lang; extra: string[] }
  );

export type MathVisual =
  | { type: 'objects'; groups: { emoji: string; n: number }[]; op: '+' | '-' | '×' }
  | { type: 'tens'; tens: number; units: number }
  | { type: 'coins'; coins: number[] }
  | { type: 'none' };

export type QuestionKind = Question['kind'];
