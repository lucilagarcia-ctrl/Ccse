import { Lang } from '../i18n';
import { Question } from '../questions/types';

export type GameProps<K extends Question['kind']> = {
  q: Extract<Question, { kind: K }>;
  lang: Lang;
  /** Se llama una sola vez, cuando el juego termina. */
  onAnswer: (correct: boolean) => void;
};
