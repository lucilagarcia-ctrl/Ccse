/// <reference types="node" />
// Prepara la lista numerada de frases en castellano para grabarlas a mano, en 6 tandas.
// Uso: npx tsx --require ./scripts/asset-stub.cjs scripts/list-speech.ts > /tmp/frases.json
//      npx tsx --require ./scripts/asset-stub.cjs scripts/make-recording-list.ts /tmp/frases.json
// Genera grabaciones/frases-es.json (orden exacto: lo usa scripts/import-recordings.py).
import fs from 'fs';
import { PLAYER_NAME, ui } from '../src/i18n';
import { facts } from '../src/questions/facts';
import { speechText, voiceKey } from '../src/voiceKey';

const all: string[] = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'))
  .filter((x: { lang: string }) => x.lang === 'es')
  .map((x: { text: string }) => x.text);
// Primero las frases de la app (las que más se oyen), al final las curiosidades.
const uiTexts = [ui.hello, ui.wellDone, ui.didYouKnow, ui.winTitle, ui.winText, ui.loseTitle, ui.loseText].map((l) => speechText(l.es.replace('{name}', PLAYER_NAME)));
const factTexts = facts.map((f) => speechText(f.text.es));
const first = uiTexts.filter((t) => all.includes(t));
const last = factTexts.filter((t) => all.includes(t));
const ordered = [...first, ...all.filter((t) => !first.includes(t) && !last.includes(t)), ...last];
const per = Math.ceil(ordered.length / 6);
const list = ordered.map((text, i) => ({ n: i + 1, tanda: Math.floor(i / per) + 1, key: voiceKey('es', text), text }));
fs.mkdirSync('grabaciones', { recursive: true });
fs.writeFileSync('grabaciones/frases-es.json', JSON.stringify(list, null, 1) + '\n');
console.log(`${list.length} frases, ${per} por tanda`);
