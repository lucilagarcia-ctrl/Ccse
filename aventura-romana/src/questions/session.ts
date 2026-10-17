import { handWritten } from './content';
import { Fact, facts } from './facts';
import { languageGenerators } from './languages';
import { mathGenerators } from './math';
import { pick, sample, shuffle } from './random';
import { Question, QuestionKind } from './types';

export type { Question } from './types';
export type Session = { questions: Question[]; facts: Record<number, Fact> };

export const SESSION_SIZE = 15;
export const PASS_MARK = 10;
/** Al 6.º fallo la partida termina y sale el romano triste. */
export const MAX_WRONG = 5;

/** Reparto por partida: 5 mates, 3 historia (≥1 Argentina, ≥1 España/Cataluña), 2 Roma, 3 inglés, 2 catalán. */
const PLAN = { math: 5, history: 3, rome: 2, english: 3, catalan: 2 };

// Para no repetir las mismas preguntas escritas a mano en partidas seguidas.
const recent: string[] = [];

function weighted<T extends { weight: number }>(list: T[], n: number): T[] {
  const bag = list.flatMap((g) => Array<T>(g.weight).fill(g));
  const out: T[] = [];
  while (out.length < n) {
    const g = pick(bag);
    if (!out.includes(g)) out.push(g);
  }
  return out;
}

function fresh(list: Question[], n: number): Question[] {
  const unseen = list.filter((q) => !recent.includes(q.id));
  const chosen = sample(unseen.length >= n ? unseen : list, n);
  return chosen;
}

/** "Vídeo" de Roma: carrera de cuadrigas con los 4 equipos del Circo Máximo. */
function raceQuestion(): Question {
  const winner = Math.floor(Math.random() * 4);
  return {
    id: `rome-race-${Date.now()}`, subject: 'rome', kind: 'video', video: { type: 'race', winner },
    choices: [{ emoji: '🔴' }, { emoji: '🔵' }, { emoji: '🟢' }, { emoji: '⚪' }], correct: winner,
    prompt: { es: '¡Carrera de cuadrigas! ¿Qué equipo gana?', en: 'Chariot race! Which team wins?', ca: 'Cursa de quadrigues! Quin equip guanya?' },
  };
}

function draft(): Question[] {
  const hist = handWritten.filter((q) => q.subject === 'history');
  const arg = hist.filter((q) => q.id.startsWith('arg-'));
  const spain = hist.filter((q) => !q.id.startsWith('arg-'));
  const extraCat = handWritten.filter((q) => q.subject === 'catalan');
  const extraEn = handWritten.filter((q) => q.subject === 'english');

  const h1 = fresh(arg, 1);
  const h2 = fresh(spain, 1);
  const h3 = fresh(hist.filter((q) => q !== h1[0] && q !== h2[0]), PLAN.history - 2);

  const qs: Question[] = [
    ...weighted(mathGenerators, PLAN.math).map((g) => g.gen()),
    ...h1,
    ...h2,
    ...h3,
    ...(Math.random() < 0.4
      ? [raceQuestion(), ...fresh(handWritten.filter((q) => q.subject === 'rome'), PLAN.rome - 1)]
      : fresh(handWritten.filter((q) => q.subject === 'rome'), PLAN.rome)),
    ...weighted(languageGenerators, PLAN.english - 1).map((g) => g.gen('en')),
    ...fresh(extraEn, 1),
    ...weighted(languageGenerators, PLAN.catalan - 1).map((g) => g.gen('ca')),
    ...(Math.random() < 0.5 ? fresh(extraCat, 1) : weighted(languageGenerators, 1).map((g) => g.gen('ca'))),
  ];
  return qs;
}

/** ¿Tiene la variedad de juegos que queremos en cada partida? */
function varied(qs: Question[]): boolean {
  const kinds = new Set<QuestionKind>(qs.map((q) => q.kind));
  return (
    qs.length === SESSION_SIZE &&
    kinds.has('video') && kinds.has('tf') && kinds.has('math') && kinds.has('choice') &&
    (kinds.has('memory') || kinds.has('spell')) &&
    (kinds.has('order') || kinds.has('tap'))
  );
}

/** Ordena para que no salgan dos juegos del mismo tipo (ni de la misma materia, si se puede) seguidos. */
function arrange(qs: Question[]): Question[] {
  for (let attempt = 0; attempt < 200; attempt++) {
    const s = shuffle(qs);
    const ok = s.every((q, i) => i === 0 || (q.kind !== s[i - 1].kind && (attempt > 100 || q.subject !== s[i - 1].subject)));
    if (ok) return s;
  }
  return shuffle(qs);
}

export function buildSession(seenFacts: number[]): Session {
  let qs = draft();
  for (let i = 0; i < 60 && !varied(qs); i++) qs = draft();
  const questions = arrange(qs).slice(0, SESSION_SIZE);

  recent.push(...questions.map((q) => q.id));
  recent.splice(0, Math.max(0, recent.length - 30));

  // 3 curiosidades romanas repartidas por la partida (después de la pregunta n.º X).
  const unseen = facts.filter((f) => !seenFacts.includes(f.id));
  const chosen = sample(unseen.length >= 3 ? unseen : facts, 3);
  const slots = [3 + Math.floor(Math.random() * 2), 7 + Math.floor(Math.random() * 2), 11 + Math.floor(Math.random() * 2)];
  const factMap: Record<number, Fact> = {};
  slots.forEach((s, i) => (factMap[s] = chosen[i]));

  return { questions, facts: factMap };
}
