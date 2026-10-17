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

/**
 * Grupos de preguntas escritas a mano. Una pregunta no se repite hasta que han salido
 * todas las de su grupo (la lista de vistas se guarda en el teléfono).
 */
type Group = 'arg' | 'spain' | 'rome' | 'catalan' | 'english';
const groupOf = (q: Question): Group =>
  q.subject === 'history' ? (q.id.startsWith('arg-') ? 'arg' : 'spain') : (q.subject as Group);
const bank = new Map(handWritten.map((q) => [q.id, q]));

/** Apunta una pregunta como vista; si ya salieron todas las de su grupo, el grupo vuelve a empezar. */
export function markSeen(seen: string[], id: string): string[] {
  const q = bank.get(id);
  if (!q || seen.includes(id)) return seen;
  const next = [...seen, id];
  const group = handWritten.filter((x) => groupOf(x) === groupOf(q));
  if (group.every((x) => next.includes(x.id))) {
    return next.filter((s) => s === id || !group.some((x) => x.id === s));
  }
  return next;
}

function weighted<T extends { weight: number }>(list: T[], n: number): T[] {
  const bag = list.flatMap((g) => Array<T>(g.weight).fill(g));
  const out: T[] = [];
  while (out.length < n) {
    const g = pick(bag);
    if (!out.includes(g)) out.push(g);
  }
  return out;
}

/** Elige n preguntas no vistas; si no quedan suficientes, completa con las vistas hace más tiempo. */
function fresh(list: Question[], n: number, seen: string[]): Question[] {
  const unseen = list.filter((q) => !seen.includes(q.id));
  if (unseen.length >= n) return sample(unseen, n);
  const oldest = list.filter((q) => seen.includes(q.id)).sort((a, b) => seen.indexOf(a.id) - seen.indexOf(b.id));
  return [...unseen, ...oldest.slice(0, n - unseen.length)];
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

function draft(seen: string[]): Question[] {
  const hist = handWritten.filter((q) => q.subject === 'history');
  const arg = hist.filter((q) => q.id.startsWith('arg-'));
  const spain = hist.filter((q) => !q.id.startsWith('arg-'));
  const extraCat = handWritten.filter((q) => q.subject === 'catalan');
  const extraEn = handWritten.filter((q) => q.subject === 'english');

  const h1 = fresh(arg, 1, seen);
  const h2 = fresh(spain, 1, seen);
  const h3 = fresh(hist.filter((q) => q !== h1[0] && q !== h2[0]), PLAN.history - 2, seen);

  const qs: Question[] = [
    ...weighted(mathGenerators, PLAN.math).map((g) => g.gen()),
    ...h1,
    ...h2,
    ...h3,
    ...(Math.random() < 0.4
      ? [raceQuestion(), ...fresh(handWritten.filter((q) => q.subject === 'rome'), PLAN.rome - 1, seen)]
      : fresh(handWritten.filter((q) => q.subject === 'rome'), PLAN.rome, seen)),
    ...weighted(languageGenerators, PLAN.english - 1).map((g) => g.gen('en')),
    ...fresh(extraEn, 1, seen),
    ...weighted(languageGenerators, PLAN.catalan - 1).map((g) => g.gen('ca')),
    ...(Math.random() < 0.5 ? fresh(extraCat, 1, seen) : weighted(languageGenerators, 1).map((g) => g.gen('ca'))),
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

export function buildSession(seenFacts: number[], seenQuestions: string[] = []): Session {
  let qs = draft(seenQuestions);
  for (let i = 0; i < 60 && !varied(qs); i++) qs = draft(seenQuestions);
  const questions = arrange(qs).slice(0, SESSION_SIZE);


  // 3 curiosidades romanas repartidas por la partida (después de la pregunta n.º X).
  // Primero las curiosidades no vistas; si quedan menos de 3, se completa con las vistas hace más tiempo.
  const unseen = facts.filter((f) => !seenFacts.includes(f.id));
  const oldest = facts.filter((f) => seenFacts.includes(f.id)).sort((a, b) => seenFacts.indexOf(a.id) - seenFacts.indexOf(b.id));
  const chosen = unseen.length >= 3 ? sample(unseen, 3) : [...unseen, ...oldest.slice(0, 3 - unseen.length)];
  const slots = [3 + Math.floor(Math.random() * 2), 7 + Math.floor(Math.random() * 2), 11 + Math.floor(Math.random() * 2)];
  const factMap: Record<number, Fact> = {};
  slots.forEach((s, i) => (factMap[s] = chosen[i]));

  return { questions, facts: factMap };
}
