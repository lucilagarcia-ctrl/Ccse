// Comprueba que las partidas generadas son válidas: 15 preguntas, respuestas correctas existentes,
// variedad de juegos y sin opciones repetidas. Uso: npx tsx scripts/check-sessions.ts
import { buildSession, PASS_MARK, SESSION_SIZE } from '../src/questions/session';
import { handWritten } from '../src/questions/content';

let problems = 0;
const fail = (msg: string) => { problems++; if (problems < 20) console.error('✗', msg); };
const kinds: Record<string, number> = {};
const subjects: Record<string, number> = {};

for (let s = 0; s < 3000; s++) {
  const { questions, facts } = buildSession([]);
  if (questions.length !== SESSION_SIZE) fail(`sesión con ${questions.length} preguntas`);
  if (Object.keys(facts).length !== 3) fail('no hay 3 curiosidades');
  for (const q of questions) {
    kinds[q.kind] = (kinds[q.kind] ?? 0) + 1;
    subjects[q.subject] = (subjects[q.subject] ?? 0) + 1;
    if (q.kind === 'choice' || q.kind === 'video') {
      if (q.correct < 0 || q.correct >= q.choices.length) fail(`${q.id}: correct fuera de rango`);
      const keys = q.choices.map((c) => JSON.stringify(c));
      if (new Set(keys).size !== keys.length) fail(`${q.id}: opciones repetidas ${keys.join(' ')}`);
      if (q.choices.length < 2) fail(`${q.id}: menos de 2 opciones`);
    }
    if (q.kind === 'math') {
      if (!Number.isInteger(q.answer) || q.answer < 0) fail(`${q.id}: respuesta rara ${q.answer}`);
      if (q.choices && !q.choices.includes(q.answer)) fail(`${q.id}: la respuesta no está entre las opciones`);
      if (q.choices && new Set(q.choices).size !== q.choices.length) fail(`${q.id}: opciones repetidas`);
    }
    if (q.kind === 'memory' && new Set(q.pairs.flat().map((c) => JSON.stringify(c))).size !== 8) fail(`${q.id}: cartas repetidas`);
  }
}
const ids = handWritten.map((q) => q.id);
if (new Set(ids).size !== ids.length) fail('ids repetidos en content.ts');

console.log('tipos de juego:', kinds);
console.log('materias:', subjects);
console.log(`aprobado con ${PASS_MARK}/${SESSION_SIZE}`);
console.log(problems ? `✗ ${problems} problemas` : '✓ 3000 partidas sin problemas');
process.exit(problems ? 1 : 0);
