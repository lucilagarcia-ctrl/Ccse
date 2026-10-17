import { L, Lang } from '../i18n';
import { pick, sample, shuffle } from './random';
import { colorsVocab, numbersVocab, spellWords, vocab, Word } from './vocab';
import { Choice, Question } from './types';

/**
 * Preguntas de inglés y catalán generadas a partir del vocabulario.
 * La palabra que se aprende siempre aparece (y suena) en el idioma estudiado;
 * la instrucción va en el idioma elegido en la app.
 */
type Target = 'en' | 'ca';
type Gen = (t: Target) => Question;
let seq = 0;
const id = (t: Target, p: string) => `${t}-${p}-${++seq}`;
const subject = (t: Target): 'english' | 'catalan' => (t === 'en' ? 'english' : 'catalan');

const langWord: Record<Target, L> = {
  en: { es: 'en inglés', en: 'in English', ca: 'en anglès' },
  ca: { es: 'en catalán', en: 'in Catalan', ca: 'en català' },
};
const fill = (tpl: L, t: Target): L => ({
  es: tpl.es.replace('{lang}', langWord[t].es),
  en: tpl.en.replace('{lang}', langWord[t].en),
  ca: tpl.ca.replace('{lang}', langWord[t].ca),
});

/** Elige palabras cuyo nombre en el idioma objetivo no se repita (p. ej. "naranja" fruta/color). */
function pickWords(pool: Word[], n: number, t: Target): Word[] {
  const seen = new Set<string>();
  return shuffle(pool).filter((w) => !seen.has(w[t]) && seen.add(w[t])).slice(0, n);
}

const pool = () => (Math.random() < 0.25 ? colorsVocab : vocab);

// Ver la palabra (y oírla) → tocar el dibujo
const wordToPicture: Gen = (t) => {
  const words = pickWords(pool(), 4, t);
  const target = words[0];
  const choices = shuffle(words);
  return {
    id: id(t, 'w2p'), subject: subject(t), kind: 'choice', word: { text: target[t], lang: t },
    choices: choices.map((w): Choice => ({ emoji: w.emoji })), correct: choices.indexOf(target),
    prompt: fill({ es: '¿Qué dibujo es? ({lang})', en: 'Which picture is it? ({lang})', ca: 'Quin dibuix és? ({lang})' }, t),
  };
};

// Sólo escuchar (sin texto) → tocar el dibujo
const listen: Gen = (t) => {
  const words = pickWords(vocab, 4, t);
  const target = words[0];
  const choices = shuffle(words);
  return {
    id: id(t, 'listen'), subject: subject(t), kind: 'choice', listen: true, word: { text: target[t], lang: t },
    choices: choices.map((w): Choice => ({ emoji: w.emoji })), correct: choices.indexOf(target),
    prompt: fill({ es: 'Escucha 🔊 y toca el dibujo', en: 'Listen 🔊 and tap the picture', ca: 'Escolta 🔊 i toca el dibuix' }, t),
  };
};

// Ver el dibujo → elegir la palabra
const pictureToWord: Gen = (t) => {
  const words = pickWords(pool(), 3, t);
  const target = words[0];
  const choices = shuffle(words);
  return {
    id: id(t, 'p2w'), subject: subject(t), kind: 'choice', scene: target.emoji,
    choices: choices.map((w): Choice => ({ label: w[t], speakAs: t })), correct: choices.indexOf(target),
    prompt: fill({ es: '¿Cómo se dice {lang}?', en: 'How do you say it {lang}?', ca: 'Com es diu {lang}?' }, t),
  };
};

// Verdadero o falso: ¿el dibujo y la palabra coinciden?
const trueFalse: Gen = (t) => {
  const [a, b] = pickWords(vocab, 2, t);
  const answer = Math.random() < 0.5;
  return {
    id: id(t, 'tf'), subject: subject(t), kind: 'tf', scene: a.emoji, word: { text: (answer ? a : b)[t], lang: t }, answer,
    prompt: fill({ es: '¿El dibujo y la palabra {lang} son lo mismo?', en: 'Do the picture and the word match?', ca: 'El dibuix i la paraula {lang} són el mateix?' }, t),
  };
};

// Memoria: palabra ↔ dibujo
const memory: Gen = (t) => {
  const words = pickWords(pool(), 4, t);
  return {
    id: id(t, 'mem'), subject: subject(t), kind: 'memory',
    pairs: words.map((w): [Choice, Choice] => [{ emoji: w.emoji }, { label: w[t], speakAs: t }]),
    prompt: fill({ es: 'Une cada dibujo con su palabra {lang}', en: 'Match each picture with its word', ca: 'Uneix cada dibuix amb la seva paraula {lang}' }, t),
  };
};

// Construir la palabra con letras
const spell: Gen = (t) => {
  const w = pick(spellWords);
  const word = w[t];
  const extra = sample('ABCDEFGILMNOPRSTU'.split('').filter((c) => !word.includes(c)), 2);
  return {
    id: id(t, 'spell'), subject: subject(t), kind: 'spell', emoji: w.emoji, answer: word, lang: t, extra,
    prompt: fill({ es: 'Escribe la palabra {lang}', en: 'Spell the word {lang}', ca: 'Escriu la paraula {lang}' }, t),
  };
};

// Números: oír/leer el número en el idioma → tocar la cifra
const numbers: Gen = (t) => {
  const opts = sample(numbersVocab, 3);
  const target = opts[0];
  const choices = shuffle(opts);
  return {
    id: id(t, 'num'), subject: subject(t), kind: 'choice', word: { text: target[t], lang: t },
    choices: choices.map((n): Choice => ({ label: String(n.n) })), correct: choices.indexOf(target),
    prompt: fill({ es: '¿Qué número es?', en: 'Which number is it?', ca: 'Quin nombre és?' }, t),
  };
};

// Toca todos los X (palabra en el idioma estudiado)
const tapWord: Gen = (t) => {
  const [target, ...rest] = pickWords(vocab.filter((w) => w.topic === 'animal' || w.topic === 'food'), 4, t);
  return {
    id: id(t, 'tap'), subject: subject(t), kind: 'tap', word: { text: target[t], lang: t },
    target: target.emoji, others: rest.map((w) => w.emoji), count: 4 + Math.floor(Math.random() * 3),
    prompt: fill({ es: 'Toca todos los que sean…', en: 'Tap all the…', ca: 'Toca tots els que siguin…' }, t),
  };
};

export const languageGenerators: { gen: Gen; weight: number }[] = [
  { gen: wordToPicture, weight: 3 },
  { gen: listen, weight: 2 },
  { gen: pictureToWord, weight: 2 },
  { gen: trueFalse, weight: 2 },
  { gen: memory, weight: 1 },
  { gen: spell, weight: 2 },
  { gen: numbers, weight: 1 },
  { gen: tapWord, weight: 1 },
];
export type { Lang };
