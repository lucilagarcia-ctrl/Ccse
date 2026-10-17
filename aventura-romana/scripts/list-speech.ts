// Lista todas las frases fijas que la app lee en voz alta, para grabarlas con voces neuronales
// (scripts/make-voice.py). Las frases con números (problemas, cuentas) cambian en cada partida
// y las lee la voz del teléfono. Uso: npx tsx --require ./scripts/asset-stub.cjs scripts/list-speech.ts > /tmp/frases.json
import { L, LANGS, Lang, PLAYER_NAME, ui } from '../src/i18n';
import { handWritten } from '../src/questions/content';
import { facts } from '../src/questions/facts';
import { languageGenerators } from '../src/questions/languages';
import { mathGenerators } from '../src/questions/math';
import { Choice, Question } from '../src/questions/types';
import { colorsVocab, numbersVocab, spellWords, vocab } from '../src/questions/vocab';
import { speechText } from '../src/voiceKey';

const out = new Map<string, { lang: Lang; text: string }>();
let generated = false; // las frases generadas con números cambian cada partida: las lee la voz del teléfono
const add = (text: string, lang: Lang) => {
  const clean = speechText(text);
  if (!clean || (generated && /\d/.test(clean))) return;
  out.set(`${lang}:${clean}`, { lang, text: clean });
};
const addL = (l: L) => LANGS.forEach((lang) => add(l[lang], lang));
const addChoice = (c: Choice) => {
  if (c.speakAs && typeof c.label === 'string') add(c.label, c.speakAs);
};
const addQuestion = (q: Question) => {
  addL(q.prompt);
  if (q.word) add(q.word.text, q.word.lang);
  if (q.kind === 'choice' || q.kind === 'video') q.choices.forEach(addChoice);
  if (q.kind === 'memory') q.pairs.flat().forEach(addChoice);
  if (q.kind === 'order') q.items.forEach(addChoice);
  if (q.kind === 'spell') add(q.answer.toLowerCase(), q.lang);
};

handWritten.forEach(addQuestion);
generated = true;
for (let i = 0; i < 4000; i++) {
  mathGenerators.forEach((g) => addQuestion(g.gen()));
  languageGenerators.forEach((g) => (['en', 'ca'] as const).forEach((t) => addQuestion(g.gen(t))));
}
generated = false;
facts.forEach((f) => addL(f.text));
const named = (l: L): L => ({ es: l.es.replace('{name}', PLAYER_NAME), en: l.en.replace('{name}', PLAYER_NAME), ca: l.ca.replace('{name}', PLAYER_NAME) });
[ui.didYouKnow, ui.hello, ui.winTitle, ui.winText, ui.loseTitle, ui.loseText, ui.wellDone].forEach((l) => addL(named(l)));
LANGS.forEach((lang) => add(named(ui.hello)[lang], lang));
[...vocab, ...colorsVocab].forEach((w) => (['en', 'ca'] as const).forEach((t) => add(w[t], t)));
numbersVocab.forEach((n) => (['en', 'ca'] as const).forEach((t) => add(n[t], t)));
spellWords.forEach((w) => (['en', 'ca'] as const).forEach((t) => add(w[t].toLowerCase(), t)));

process.stdout.write(JSON.stringify([...out.values()], null, 1));
