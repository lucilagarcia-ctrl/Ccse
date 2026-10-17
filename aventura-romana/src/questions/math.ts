import { numberChoices, pick, randInt, sample, shuffle } from './random';
import { Choice, Question } from './types';

/**
 * Matemáticas de 2.º de primaria (cicle inicial, Decret 175/2022), nivel de final de curso:
 * números hasta el 999, sumas y restas llevando, iniciación a la multiplicación (grupos y tablas
 * del 2, 5 y 10), dobles y mitades, decenas y unidades, euros, series hacia delante y hacia atrás,
 * la hora (en punto, y cuarto, y media, menos cuarto), formas, números romanos y problemas.
 * Cada partida genera números nuevos.
 */
type Gen = () => Question;
let seq = 0;
const id = (p: string) => `math-${p}-${++seq}`;

/** Opciones con números como texto (4 opciones) + índice de la buena. */
function labelChoices(answer: number, spread = 3) {
  const nums = numberChoices(answer, 4, spread);
  return { choices: nums.map((n): Choice => ({ label: String(n) })), correct: nums.indexOf(answer) };
}

const items = ['🍎', '🪙', '🍇', '🛡️', '🏺', '🐟', '⭐', '🌰'];
const typeIt = { es: 'Escribe el resultado', en: 'Type the answer', ca: 'Escriu el resultat' };

const addSmall: Gen = () => {
  const a = randInt(6, 13), b = randInt(4, 9), emoji = pick(items);
  return {
    id: id('add'), subject: 'math', kind: 'math', expr: `${a} + ${b}`, answer: a + b, choices: numberChoices(a + b, 4),
    visual: { type: 'objects', op: '+', groups: [{ emoji, n: a }, { emoji, n: b }] },
    prompt: { es: '¿Cuántos hay en total?', en: 'How many are there altogether?', ca: 'Quants n’hi ha en total?' },
  };
};

const subSmall: Gen = () => {
  const a = randInt(11, 20), b = randInt(3, 9), emoji = pick(items);
  return {
    id: id('sub'), subject: 'math', kind: 'math', expr: `${a} − ${b}`, answer: a - b, choices: numberChoices(a - b, 4),
    visual: { type: 'objects', op: '-', groups: [{ emoji, n: a }, { emoji, n: b }] },
    prompt: { es: 'Si quitamos los tachados, ¿cuántos quedan?', en: 'If we take away the crossed ones, how many are left?', ca: 'Si traiem els ratllats, quants en queden?' },
  };
};

/** Suma de dos cifras, casi siempre llevando (las unidades suman 10 o más). */
const addBig: Gen = () => {
  const carry = Math.random() < 0.8;
  const ua = randInt(2, 9), ub = carry ? randInt(10 - ua, 9) : randInt(0, 9 - ua);
  const a = randInt(1, 6) * 10 + ua, b = randInt(1, 2) * 10 + ub;
  return { id: id('add100'), subject: 'math', kind: 'math', expr: `${a} + ${b}`, answer: a + b, visual: { type: 'none' }, prompt: typeIt };
};

/** Resta de dos cifras, casi siempre "pidiendo prestado" (unidades de arriba menores). */
const subBig: Gen = () => {
  const tensA = randInt(4, 9), unitsA = randInt(0, 6);
  const a = tensA * 10 + unitsA;
  const unitsB = randInt(unitsA + 1, 9), tensB = randInt(1, tensA - 2);
  const b = tensB * 10 + unitsB;
  return { id: id('sub100'), subject: 'math', kind: 'math', expr: `${a} − ${b}`, answer: a - b, visual: { type: 'none' }, prompt: typeIt };
};

/** Sumas con centenas: 300 + 40, 250 + 100… */
const hundreds: Gen = () => {
  const a = randInt(1, 8) * 100 + pick([0, 50, randInt(1, 9) * 10]), b = pick([100, 200, 10, 20, 50]);
  return { id: id('add1000'), subject: 'math', kind: 'math', expr: `${a} + ${b}`, answer: a + b, visual: { type: 'none' }, prompt: typeIt };
};

/** Encontrar el número que falta: 8 + ? = 15 */
const missing: Gen = () => {
  const a = randInt(5, 15), b = randInt(4, 12);
  return {
    id: id('missing'), subject: 'math', kind: 'math', expr: `${a} + ❓ = ${a + b}`, answer: b, choices: numberChoices(b, 4),
    visual: { type: 'none' },
    prompt: { es: '¿Qué número falta?', en: 'Which number is missing?', ca: 'Quin nombre falta?' },
  };
};

const groups: Gen = () => {
  const g = randInt(3, 5), n = randInt(3, 6), emoji = pick(items);
  return {
    id: id('mul'), subject: 'math', kind: 'math', expr: `${g} × ${n}`, answer: g * n, choices: numberChoices(g * n, 4),
    visual: { type: 'objects', op: '×', groups: Array.from({ length: g }, () => ({ emoji, n })) },
    prompt: { es: `${g} grupos de ${n}. ¿Cuántos son?`, en: `${g} groups of ${n}. How many?`, ca: `${g} grups de ${n}. Quants són?` },
  };
};

/** Tablas del 2, del 5 y del 10, sin dibujos. */
const tables: Gen = () => {
  const t = pick([2, 5, 10]), n = randInt(2, 10);
  return { id: id('table'), subject: 'math', kind: 'math', expr: `${n} × ${t}`, answer: n * t, visual: { type: 'none' }, prompt: typeIt };
};

const doubleHalf: Gen = () => {
  const double = Math.random() < 0.5;
  const n = double ? randInt(8, 25) : randInt(6, 25) * 2;
  const answer = double ? n * 2 : n / 2;
  return {
    id: id('dbl'), subject: 'math', kind: 'math', expr: double ? `${n} × 2` : `${n} ÷ 2`, answer, choices: numberChoices(answer, 4),
    visual: { type: 'none' },
    prompt: double
      ? { es: `¿Cuál es el doble de ${n}?`, en: `What is double ${n}?`, ca: `Quin és el doble de ${n}?` }
      : { es: `¿Cuál es la mitad de ${n}?`, en: `What is half of ${n}?`, ca: `Quina és la meitat de ${n}?` },
  };
};

const placeValue: Gen = () => {
  const tens = randInt(2, 9), units = randInt(0, 9), answer = tens * 10 + units;
  const swapped = units * 10 + tens === answer || units === 0 ? answer + 1 : units * 10 + tens;
  return {
    id: id('tens'), subject: 'math', kind: 'math', expr: '?', answer,
    choices: shuffle([answer, swapped, answer + 10 > 99 ? answer - 10 : answer + 10, tens + units === answer ? answer - 1 : tens + units]),
    visual: { type: 'tens', tens, units },
    prompt: { es: 'Cada barra son 10. ¿Qué número es?', en: 'Each bar is 10. What number is it?', ca: 'Cada barra són 10. Quin nombre és?' },
  };
};

const money: Gen = () => {
  const coins = Array.from({ length: randInt(3, 5) }, () => pick([1, 2, 2, 5, 10, 20]));
  const answer = coins.reduce((s, c) => s + c, 0);
  return {
    id: id('coins'), subject: 'math', kind: 'math', expr: '? €', answer, choices: numberChoices(answer, 4),
    visual: { type: 'coins', coins },
    prompt: { es: '¿Cuántos euros hay en la bolsa?', en: 'How many euros are in the bag?', ca: 'Quants euros hi ha a la bossa?' },
  };
};

/** Problemas cortos (se leen en voz alta). */
const story: Gen = () => {
  const kind = randInt(0, 2);
  if (kind === 0) {
    const a = randInt(15, 45), b = randInt(8, 25);
    return {
      id: id('story'), subject: 'math', kind: 'math', expr: `${a} + ${b}`, answer: a + b, visual: { type: 'none' },
      prompt: { es: `Tiano tiene ${a} monedas y el emperador le da ${b} más. ¿Cuántas tiene ahora?`, en: `Tiano has ${a} coins and the emperor gives him ${b} more. How many does he have now?`, ca: `En Tiano té ${a} monedes i l’emperador li’n dona ${b} més. Quantes en té ara?` },
    };
  }
  if (kind === 1) {
    const a = randInt(30, 60), b = randInt(9, 25);
    return {
      id: id('story'), subject: 'math', kind: 'math', expr: `${a} − ${b}`, answer: a - b, visual: { type: 'none' },
      prompt: { es: `En el barco hay ${a} legionarios y bajan ${b}. ¿Cuántos quedan en el barco?`, en: `There are ${a} legionaries on the ship and ${b} get off. How many are left?`, ca: `Al vaixell hi ha ${a} legionaris i en baixen ${b}. Quants en queden?` },
    };
  }
  const g = randInt(3, 6), n = pick([2, 5, 10]);
  return {
    id: id('story'), subject: 'math', kind: 'math', expr: `${g} × ${n}`, answer: g * n, visual: { type: 'none' },
    prompt: { es: `Hay ${g} carros y cada carro lleva ${n} ánforas. ¿Cuántas ánforas hay?`, en: `There are ${g} carts and each one carries ${n} amphorae. How many amphorae?`, ca: `Hi ha ${g} carros i cada carro porta ${n} àmfores. Quantes àmfores hi ha?` },
  };
};

const compare: Gen = () => {
  // Números de tres cifras; a veces con las mismas cifras cambiadas (472 / 427): la trampa típica.
  const a = randInt(102, 989);
  const digits = String(a).split('');
  const b = Math.random() < 0.5 ? Number(digits[0] + digits[2] + digits[1]) : randInt(100, 999);
  const c = Number(digits[1] === '0' ? digits[0] + digits[2] + digits[1] : digits[1] + digits[0] + digits[2]);
  const nums = [a, b, c, randInt(100, 999)].filter((v, i, arr) => arr.indexOf(v) === i);
  const max = Math.max(...nums);
  const choices: Choice[] = nums.map((n) => ({ label: String(n) }));
  return {
    id: id('cmp'), subject: 'math', kind: 'choice', scene: '⚖️', choices, correct: nums.indexOf(max),
    prompt: { es: '¿Cuál es el número más grande?', en: 'Which is the biggest number?', ca: 'Quin és el nombre més gran?' },
  };
};

const series: Gen = () => {
  const step = pick([2, 3, 5, 10, 100]);
  const down = Math.random() < 0.35;
  // Hacia atrás se empieza 5 pasos más arriba para no llegar nunca a números negativos.
  const start = (step === 100 ? randInt(1, 4) * 100 : step * randInt(1, 6) + (step === 10 ? randInt(1, 9) : 0)) + (down ? step * 5 : 0);
  const list = Array.from({ length: 5 }, (_, i) => start + (down ? -i : i) * step);
  const hole = randInt(1, 3);
  const answer = list[hole];
  const shown = list.map((n, i) => (i === hole ? '❓' : String(n))).join('  ');
  return {
    id: id('series'), subject: 'math', kind: 'choice', scene: shown, ...labelChoices(answer),
    prompt: { es: '¿Qué número falta?', en: 'Which number is missing?', ca: 'Quin nombre falta?' },
  };
};

const ROMANS: [string, number][] = [
  ['II', 2], ['III', 3], ['IV', 4], ['V', 5], ['VI', 6], ['VII', 7], ['VIII', 8], ['IX', 9], ['X', 10],
  ['XI', 11], ['XII', 12], ['XIV', 14], ['XV', 15], ['XVI', 16], ['XIX', 19], ['XX', 20],
];

const roman: Gen = () => {
  const [r, n] = pick(ROMANS);
  return {
    id: id('roman'), subject: 'math', kind: 'math', expr: r, answer: n, choices: numberChoices(n, 4, 2).filter((x) => x > 0),
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
      id: id('sides'), subject: 'math', kind: 'choice', scene: s.emoji, choices: [3, 4, 5, 6].map((n) => ({ label: String(n) })), correct: s.sides - 3,
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

/** Memoria de 6 parejas: suma (o multiplicación) ↔ resultado. */
const memory: Gen = () => {
  const used = new Set<number>();
  const pairs: [Choice, Choice][] = [];
  const mult = Math.random() < 0.35;
  while (pairs.length < 6) {
    const a = mult ? randInt(2, 5) : randInt(4, 15), b = mult ? pick([2, 5, 10]) : randInt(3, 9);
    const r = mult ? a * b : a + b;
    if (used.has(r)) continue;
    used.add(r);
    pairs.push([{ label: mult ? `${a}×${b}` : `${a}+${b}` }, { label: String(r) }]);
  }
  return {
    id: id('mem'), subject: 'math', kind: 'memory', pairs,
    prompt: mult
      ? { es: 'Une cada multiplicación con su resultado', en: 'Match each multiplication with its answer', ca: 'Uneix cada multiplicació amb el seu resultat' }
      : { es: 'Une cada suma con su resultado', en: 'Match each sum with its answer', ca: 'Uneix cada suma amb el seu resultat' },
  };
};

const order: Gen = () => {
  const big = Math.random() < 0.5;
  const nums = sample(Array.from({ length: big ? 900 : 90 }, (_, i) => i + (big ? 100 : 10)), 4).sort((x, y) => x - y);
  return {
    id: id('order'), subject: 'math', kind: 'order', items: nums.map((n) => ({ label: String(n) })),
    prompt: { es: 'Ordena de menor a mayor', en: 'Put them in order, smallest first', ca: 'Ordena de més petit a més gran' },
  };
};

const tapCount: Gen = () => {
  const target = pick(['🪙', '🛡️', '🏺']);
  const count = randInt(5, 9);
  return {
    id: id('tap'), subject: 'math', kind: 'tap', target, others: ['🍇', '🌿', '🍎', '🐟'].filter((e) => e !== target), count,
    prompt: { es: `¡Encuentra los ${count}! Tócalos todos`, en: `Find all ${count}! Tap them`, ca: `Troba’ls tots ${count}! Toca’ls` },
  };
};

const videoMarch: Gen = () => {
  const count = randInt(5, 11);
  return {
    id: id('march'), subject: 'math', kind: 'video', video: { type: 'march', count },
    ...labelChoices(count, 1),
    prompt: { es: '¿Cuántos legionarios han desfilado?', en: 'How many legionaries marched past?', ca: 'Quants legionaris han desfilat?' },
  };
};

const videoCoins: Gen = () => {
  const start = randInt(5, 10), add = randInt(2, 6), remove = randInt(2, start);
  const answer = start + add - remove;
  return {
    id: id('vcoins'), subject: 'math', kind: 'video', video: { type: 'coins', start, add, remove },
    ...labelChoices(answer, 2),
    prompt: { es: '¿Cuántas monedas quedan en el cofre?', en: 'How many coins are left in the chest?', ca: 'Quantes monedes queden al cofre?' },
  };
};

const videoClock: Gen = () => {
  const h = randInt(1, 12), m = pick([0, 15, 30, 45]);
  const pad = (n: number) => String(n).padStart(2, '0');
  const fmt = (t: { h: number; m: number }) => `${t.h}:${pad(t.m)}`;
  // Distractores típicos: la hora siguiente, minutos cambiados y agujas confundidas.
  const candidates = [
    { h: (h % 12) + 1, m },
    { h, m: (m + 30) % 60 },
    { h, m: m === 15 ? 45 : m === 45 ? 15 : (m + 15) % 60 },
    { h: m === 0 ? 12 : Math.max(1, Math.round(m / 5)), m: h === 12 ? 0 : (h * 5) % 60 },
  ];
  const opts = [{ h, m }];
  for (const c of candidates) if (opts.length < 4 && !opts.some((o) => o.h === c.h && o.m === c.m)) opts.push(c);
  const shuffled = shuffle(opts);
  return {
    id: id('clock'), subject: 'math', kind: 'video', video: { type: 'clock', h, m },
    choices: shuffled.map((t) => ({ label: fmt(t) })), correct: shuffled.findIndex((t) => t.h === h && t.m === m),
    prompt: { es: '¿Qué hora marca el reloj?', en: 'What time does the clock show?', ca: 'Quina hora marca el rellotge?' },
  };
};

const videoPattern: Gen = () => {
  const [a, b, c, d] = sample(['🛡️', '⚔️', '🏺', '🪙', '🍇', '🌿'], 4);
  const base = pick([[a, b, c], [a, a, b], [a, b, b, c], [a, b, c, b]]);
  const seq = Array.from({ length: 7 }, (_, i) => base[i % base.length]);
  const next = base[7 % base.length];
  const choices = shuffle([a, b, c, d]).map((e) => ({ emoji: e }));
  return {
    id: id('pattern'), subject: 'math', kind: 'video', video: { type: 'pattern', seq },
    choices, correct: choices.findIndex((ch) => ch.emoji === next),
    prompt: { es: '¿Qué viene después?', en: 'What comes next?', ca: 'Què ve després?' },
  };
};

export const mathGenerators: { gen: Gen; weight: number }[] = [
  { gen: addSmall, weight: 1 },
  { gen: subSmall, weight: 1 },
  { gen: addBig, weight: 2 },
  { gen: subBig, weight: 2 },
  { gen: hundreds, weight: 1 },
  { gen: missing, weight: 1 },
  { gen: groups, weight: 1 },
  { gen: tables, weight: 2 },
  { gen: doubleHalf, weight: 1 },
  { gen: placeValue, weight: 1 },
  { gen: money, weight: 1 },
  { gen: story, weight: 2 },
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
