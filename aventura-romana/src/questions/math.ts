import { numberChoices, pick, randInt, sample, shuffle } from './random';
import { Choice, Question } from './types';

/**
 * Matemáticas de 2.º de primaria (cicle inicial, Decret 175/2022): números hasta el 100,
 * sumas y restas (con y sin llevar), iniciación a la multiplicación, dobles y mitades,
 * decenas y unidades, monedas, series, la hora (en punto / y media), formas y números romanos.
 * Cada partida genera números nuevos.
 */
type Gen = () => Question;
let seq = 0;
const id = (p: string) => `math-${p}-${++seq}`;

/** Opciones con números como texto + índice de la buena. */
function labelChoices(answer: number, spread = 3) {
  const nums = numberChoices(answer, 3, spread);
  return { choices: nums.map((n): Choice => ({ label: String(n) })), correct: nums.indexOf(answer) };
}

const items = ['🍎', '🪙', '🍇', '🛡️', '🏺', '🐟', '⭐', '🌰'];

const addSmall: Gen = () => {
  const a = randInt(2, 9), b = randInt(1, 9), emoji = pick(items);
  return {
    id: id('add'), subject: 'math', kind: 'math', expr: `${a} + ${b}`, answer: a + b, choices: numberChoices(a + b),
    visual: { type: 'objects', op: '+', groups: [{ emoji, n: a }, { emoji, n: b }] },
    prompt: { es: '¿Cuántos hay en total?', en: 'How many are there altogether?', ca: 'Quants n’hi ha en total?' },
  };
};

const subSmall: Gen = () => {
  const a = randInt(6, 15), b = randInt(1, Math.min(9, a - 1)), emoji = pick(items);
  return {
    id: id('sub'), subject: 'math', kind: 'math', expr: `${a} − ${b}`, answer: a - b, choices: numberChoices(a - b),
    visual: { type: 'objects', op: '-', groups: [{ emoji, n: a }, { emoji, n: b }] },
    prompt: { es: 'Si quitamos los tachados, ¿cuántos quedan?', en: 'If we take away the crossed ones, how many are left?', ca: 'Si traiem els ratllats, quants en queden?' },
  };
};

const addBig: Gen = () => {
  const a = randInt(11, 59), b = randInt(5, 39);
  return {
    id: id('add100'), subject: 'math', kind: 'math', expr: `${a} + ${b}`, answer: a + b,
    visual: { type: 'none' },
    prompt: { es: 'Escribe el resultado', en: 'Type the answer', ca: 'Escriu el resultat' },
  };
};

const subBig: Gen = () => {
  const a = randInt(30, 99), b = randInt(5, a - 10);
  return {
    id: id('sub100'), subject: 'math', kind: 'math', expr: `${a} − ${b}`, answer: a - b,
    visual: { type: 'none' },
    prompt: { es: 'Escribe el resultado', en: 'Type the answer', ca: 'Escriu el resultat' },
  };
};

const groups: Gen = () => {
  const g = randInt(2, 5), n = randInt(2, 5), emoji = pick(items);
  return {
    id: id('mul'), subject: 'math', kind: 'math', expr: `${g} × ${n}`, answer: g * n, choices: numberChoices(g * n),
    visual: { type: 'objects', op: '×', groups: Array.from({ length: g }, () => ({ emoji, n })) },
    prompt: { es: `${g} grupos de ${n}. ¿Cuántos son?`, en: `${g} groups of ${n}. How many?`, ca: `${g} grups de ${n}. Quants són?` },
  };
};

const doubleHalf: Gen = () => {
  const double = Math.random() < 0.5;
  const n = double ? randInt(2, 15) : randInt(2, 10) * 2;
  const answer = double ? n * 2 : n / 2;
  return {
    id: id('dbl'), subject: 'math', kind: 'math', expr: double ? `${n} × 2` : `${n} ÷ 2`, answer, choices: numberChoices(answer),
    visual: { type: 'none' },
    prompt: double
      ? { es: `¿Cuál es el doble de ${n}?`, en: `What is double ${n}?`, ca: `Quin és el doble de ${n}?` }
      : { es: `¿Cuál es la mitad de ${n}?`, en: `What is half of ${n}?`, ca: `Quina és la meitat de ${n}?` },
  };
};

const placeValue: Gen = () => {
  const tens = randInt(1, 9), units = randInt(0, 9), answer = tens * 10 + units;
  return {
    id: id('tens'), subject: 'math', kind: 'math', expr: '?', answer, choices: shuffle([answer, units * 10 + tens === answer ? answer + 1 : units * 10 + tens, answer + 10 > 99 ? answer - 10 : answer + 10]),
    visual: { type: 'tens', tens, units },
    prompt: { es: 'Cada barra son 10. ¿Qué número es?', en: 'Each bar is 10. What number is it?', ca: 'Cada barra són 10. Quin nombre és?' },
  };
};

const money: Gen = () => {
  const coins = Array.from({ length: randInt(3, 5) }, () => pick([1, 2, 2, 5, 10]));
  const answer = coins.reduce((s, c) => s + c, 0);
  return {
    id: id('coins'), subject: 'math', kind: 'math', expr: '? €', answer, choices: numberChoices(answer),
    visual: { type: 'coins', coins },
    prompt: { es: '¿Cuántos euros hay en la bolsa?', en: 'How many euros are in the bag?', ca: 'Quants euros hi ha a la bossa?' },
  };
};

const compare: Gen = () => {
  let a = randInt(12, 98), b = randInt(12, 98);
  if (a === b) b = a + 1;
  // A veces con las mismas cifras al revés (47 / 74): la trampa típica.
  if (Math.random() < 0.4 && a % 10 !== 0 && a % 11 !== 0) b = (a % 10) * 10 + Math.floor(a / 10);
  const nums = [a, b, randInt(10, 99)].filter((v, i, arr) => arr.indexOf(v) === i);
  const max = Math.max(...nums);
  const choices: Choice[] = nums.map((n) => ({ label: String(n) }));
  return {
    id: id('cmp'), subject: 'math', kind: 'choice', scene: '⚖️', choices, correct: nums.indexOf(max),
    prompt: { es: '¿Cuál es el número más grande?', en: 'Which is the biggest number?', ca: 'Quin és el nombre més gran?' },
  };
};

const series: Gen = () => {
  const step = pick([2, 5, 10]), start = step * randInt(0, 4) + (step === 10 ? randInt(0, 9) : 0);
  const list = Array.from({ length: 5 }, (_, i) => start + i * step);
  const hole = randInt(1, 3);
  const answer = list[hole];
  const shown = list.map((n, i) => (i === hole ? '❓' : String(n))).join('  ');
  return {
    id: id('series'), subject: 'math', kind: 'choice', scene: shown, ...labelChoices(answer),
    prompt: { es: '¿Qué número falta?', en: 'Which number is missing?', ca: 'Quin nombre falta?' },
  };
};

const roman: Gen = () => {
  const romans: [string, number][] = [['I', 1], ['II', 2], ['III', 3], ['IV', 4], ['V', 5], ['VI', 6], ['VII', 7], ['VIII', 8], ['IX', 9], ['X', 10], ['XI', 11], ['XII', 12]];
  const [r, n] = pick(romans.slice(1));
  return {
    id: id('roman'), subject: 'math', kind: 'math', expr: r, answer: n, choices: numberChoices(n, 3, 2).filter((x) => x > 0 && x <= 20),
    visual: { type: 'none' },
    prompt: { es: 'Número romano: ¿qué número es?', en: 'Roman numeral: which number is it?', ca: 'Nombre romà: quin nombre és?' },
  };
};

const shapes: Gen = () => {
  const all: { emoji: string; sides: number; name: { es: string; en: string; ca: string } }[] = [
    { emoji: '🔺', sides: 3, name: { es: 'triángulo', en: 'triangle', ca: 'triangle' } },
    { emoji: '🟥', sides: 4, name: { es: 'cuadrado', en: 'square', ca: 'quadrat' } },
    { emoji: '🔵', sides: 0, name: { es: 'círculo', en: 'circle', ca: 'cercle' } },
    { emoji: '🔶', sides: 4, name: { es: 'rombo', en: 'diamond', ca: 'rombe' } },
  ];
  if (Math.random() < 0.5) {
    const s = pick(all.filter((x) => x.sides > 0));
    return {
      id: id('sides'), subject: 'math', kind: 'choice', scene: s.emoji, choices: [3, 4, 5].map((n) => ({ label: String(n) })), correct: s.sides - 3,
      prompt: { es: `¿Cuántos lados tiene el ${s.name.es}?`, en: `How many sides does a ${s.name.en} have?`, ca: `Quants costats té el ${s.name.ca}?` },
    };
  }
  const target = pick(all);
  const choices = shuffle(all);
  return {
    id: id('shape'), subject: 'math', kind: 'choice', choices: choices.map((c) => ({ emoji: c.emoji })), correct: choices.indexOf(target),
    prompt: { es: `¿Dónde está el ${target.name.es}?`, en: `Where is the ${target.name.en}?`, ca: `On és el ${target.name.ca}?` },
  };
};

const memory: Gen = () => {
  const used = new Set<number>();
  const pairs: [Choice, Choice][] = [];
  while (pairs.length < 4) {
    const a = randInt(1, 9), b = randInt(1, 9);
    if (used.has(a + b)) continue;
    used.add(a + b);
    pairs.push([{ label: `${a}+${b}` }, { label: String(a + b) }]);
  }
  return {
    id: id('mem'), subject: 'math', kind: 'memory', pairs,
    prompt: { es: 'Une cada suma con su resultado', en: 'Match each sum with its answer', ca: 'Uneix cada suma amb el seu resultat' },
  };
};

const order: Gen = () => {
  const nums = sample(Array.from({ length: 90 }, (_, i) => i + 5), 4).sort((x, y) => x - y);
  return {
    id: id('order'), subject: 'math', kind: 'order', items: nums.map((n) => ({ label: String(n) })),
    prompt: { es: 'Ordena de menor a mayor', en: 'Put them in order, smallest first', ca: 'Ordena de més petit a més gran' },
  };
};

const tapCount: Gen = () => {
  const target = pick(['🪙', '🛡️', '🏺']);
  const count = randInt(4, 7);
  return {
    id: id('tap'), subject: 'math', kind: 'tap', target, others: ['🍇', '🌿', '🍎', '🐟'].filter((e) => e !== target), count,
    prompt: { es: `¡Encuentra los ${count}! Tócalos todos`, en: `Find all ${count}! Tap them`, ca: `Troba’ls tots ${count}! Toca’ls` },
  };
};

const videoMarch: Gen = () => {
  const count = randInt(3, 8);
  return {
    id: id('march'), subject: 'math', kind: 'video', video: { type: 'march', count },
    ...labelChoices(count, 1),
    prompt: { es: '¿Cuántos legionarios han desfilado?', en: 'How many legionaries marched past?', ca: 'Quants legionaris han desfilat?' },
  };
};

const videoCoins: Gen = () => {
  const start = randInt(3, 7), add = randInt(1, 5), remove = randInt(1, start);
  const answer = start + add - remove;
  return {
    id: id('vcoins'), subject: 'math', kind: 'video', video: { type: 'coins', start, add, remove },
    ...labelChoices(answer, 2),
    prompt: { es: '¿Cuántas monedas quedan en el cofre?', en: 'How many coins are left in the chest?', ca: 'Quantes monedes queden al cofre?' },
  };
};

const videoClock: Gen = () => {
  const h = randInt(1, 12), m = pick([0, 30]);
  const opts = shuffle([
    { h, m },
    { h: (h % 12) + 1, m },
    { h, m: m === 0 ? 30 : 0 },
  ]);
  const fmt = (t: { h: number; m: number }) => `${t.h}:${t.m === 0 ? '00' : '30'}`;
  return {
    id: id('clock'), subject: 'math', kind: 'video', video: { type: 'clock', h, m },
    choices: opts.map((t) => ({ label: fmt(t) })), correct: opts.findIndex((t) => t.h === h && t.m === m),
    prompt: { es: '¿Qué hora marca el reloj?', en: 'What time does the clock show?', ca: 'Quina hora marca el rellotge?' },
  };
};

const videoPattern: Gen = () => {
  const [a, b, c] = sample(['🛡️', '⚔️', '🏺', '🪙', '🍇', '🌿'], 3);
  const base = Math.random() < 0.5 ? [a, b] : [a, b, c];
  const seq = Array.from({ length: 6 }, (_, i) => base[i % base.length]);
  const next = base[6 % base.length];
  const choices = shuffle([a, b, c]).map((e) => ({ emoji: e }));
  return {
    id: id('pattern'), subject: 'math', kind: 'video', video: { type: 'pattern', seq },
    choices, correct: choices.findIndex((ch) => ch.emoji === next),
    prompt: { es: '¿Qué viene después?', en: 'What comes next?', ca: 'Què ve després?' },
  };
};

export const mathGenerators: { gen: Gen; weight: number }[] = [
  { gen: addSmall, weight: 2 },
  { gen: subSmall, weight: 2 },
  { gen: addBig, weight: 2 },
  { gen: subBig, weight: 1 },
  { gen: groups, weight: 2 },
  { gen: doubleHalf, weight: 1 },
  { gen: placeValue, weight: 1 },
  { gen: money, weight: 1 },
  { gen: compare, weight: 1 },
  { gen: series, weight: 1 },
  { gen: roman, weight: 1 },
  { gen: shapes, weight: 1 },
  { gen: memory, weight: 1 },
  { gen: order, weight: 1 },
  { gen: tapCount, weight: 1 },
  { gen: videoMarch, weight: 1 },
  { gen: videoCoins, weight: 1 },
  { gen: videoClock, weight: 1 },
  { gen: videoPattern, weight: 1 },
];
