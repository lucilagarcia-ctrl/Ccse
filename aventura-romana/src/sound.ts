import { createAudioPlayer, setAudioModeAsync, AudioPlayer } from 'expo-audio';
import * as Haptics from 'expo-haptics';
import * as Speech from 'expo-speech';
import { Platform } from 'react-native';
import { Lang, speechLocale } from './i18n';
import { voiceClips } from './voiceClips';
import { speechText, voiceKey } from './voiceKey';

const sources = {
  correct: require('../assets/sounds/correct.wav'),
  wrong: require('../assets/sounds/wrong.wav'),
  pop: require('../assets/sounds/pop.wav'),
  fanfare: require('../assets/sounds/fanfare.wav'),
  sad: require('../assets/sounds/sad.wav'),
  fact: require('../assets/sounds/fact.wav'),
};
export type SoundName = keyof typeof sources;

const players: Partial<Record<SoundName, AudioPlayer>> = {};
let ready = false;

function init() {
  if (ready) return;
  ready = true;
  setAudioModeAsync({ playsInSilentMode: true }).catch(() => {});
}

export function play(name: SoundName) {
  try {
    init();
    let p = players[name];
    if (!p) {
      p = createAudioPlayer(sources[name]);
      players[name] = p;
    }
    p.seekTo(0);
    p.play();
  } catch {
    // Sin sonido no pasa nada: el juego sigue.
  }
  if (Platform.OS !== 'web') {
    if (name === 'correct' || name === 'fanfare') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    else if (name === 'wrong') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
    else if (name === 'pop') Haptics.selectionAsync().catch(() => {});
  }
}

// ───────────── Voz ─────────────
// Las frases fijas suenan con grabaciones de voces neuronales (scripts/make-voice.py). Lo demás
// (por ejemplo problemas con números que cambian cada partida) lo lee la mejor voz del teléfono.

type Line = { text: string; lang: Lang };
let lines: Line[] = [];
let speaking = false;
let turn = 0; // cambia al parar: las frases de una lectura anterior ya no continúan
let voicePlayer: AudioPlayer | null = null;
const bestVoice: Partial<Record<Lang, string>> = {};
let voicesLoaded = false;

/** Elige la voz del sistema de más calidad para cada idioma (y en Android, una que no necesite internet). */
function loadVoices() {
  if (voicesLoaded) return;
  voicesLoaded = true;
  Speech.getAvailableVoicesAsync()
    .then((voices) => {
      for (const lang of ['es', 'en', 'ca'] as Lang[]) {
        const locale = speechLocale[lang].toLowerCase();
        const candidates = voices.filter((v) => v.language.toLowerCase().replace('_', '-').startsWith(locale.slice(0, 2)) && !/network/i.test(v.identifier));
        candidates.sort(
          (a, b) =>
            Number(b.quality === Speech.VoiceQuality.Enhanced) - Number(a.quality === Speech.VoiceQuality.Enhanced) ||
            Number(b.language.toLowerCase().replace('_', '-') === locale) - Number(a.language.toLowerCase().replace('_', '-') === locale),
        );
        if (candidates[0]) bestVoice[lang] = candidates[0].identifier;
      }
    })
    .catch(() => {});
}

function nextLine() {
  const line = lines.shift();
  if (!line) {
    speaking = false;
    return;
  }
  speaking = true;
  const mine = turn;
  const done = () => {
    if (mine === turn) nextLine();
  };
  const clip = voiceClips[voiceKey(line.lang, line.text)];
  if (clip) {
    try {
      init();
      if (!voicePlayer) {
        voicePlayer = createAudioPlayer(clip);
        voicePlayer.addListener('playbackStatusUpdate', (status) => {
          if (status.didJustFinish) voiceFinished?.();
        });
      } else {
        voicePlayer.replace(clip);
      }
      voiceFinished = done;
      voicePlayer.play();
      return;
    } catch {
      // si falla la grabación, se usa la voz del teléfono
    }
  }
  Speech.speak(line.text, { language: speechLocale[line.lang], voice: bestVoice[line.lang], rate: 0.92, pitch: 1.0, onDone: done, onError: done, onStopped: () => {} });
}
let voiceFinished: (() => void) | null = null;

/** Lee el texto en voz alta en el idioma indicado. Con `queue`, espera a que termine lo anterior. */
export function say(text: string, lang: Lang, queue = false) {
  loadVoices();
  if (!queue) stopSpeech();
  const clean = speechText(text);
  if (!clean) return;
  lines.push({ text: clean, lang });
  if (!speaking) nextLine();
}

export function stopSpeech() {
  turn++;
  lines = [];
  speaking = false;
  voiceFinished = null;
  try {
    voicePlayer?.pause();
  } catch {
    // nada
  }
  Speech.stop();
}
