import { createAudioPlayer, setAudioModeAsync, AudioPlayer } from 'expo-audio';
import * as Haptics from 'expo-haptics';
import * as Speech from 'expo-speech';
import { Platform } from 'react-native';
import { Lang, speechLocale } from './i18n';

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

/** Lee el texto en voz alta en el idioma elegido, para que no haga falta leer mucho. */
export function say(text: string, lang: Lang, queue = false) {
  if (!queue) Speech.stop();
  const clean = text.replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu, '').trim();
  if (!clean) return;
  Speech.speak(clean, { language: speechLocale[lang], rate: 0.9, pitch: 1.1 });
}

export function stopSpeech() {
  Speech.stop();
}
