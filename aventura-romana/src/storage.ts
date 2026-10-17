import AsyncStorage from '@react-native-async-storage/async-storage';
import { Lang } from './i18n';

export type Progress = { lang: Lang | null; coins: number; crowns: number; seenFacts: number[] };
const KEY = 'aventura-romana/v1';
const empty: Progress = { lang: null, coins: 0, crowns: 0, seenFacts: [] };

export async function loadProgress(): Promise<Progress> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? { ...empty, ...JSON.parse(raw) } : empty;
  } catch {
    return empty;
  }
}

export async function saveProgress(p: Progress) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    // ignorar: el progreso es un extra
  }
}
