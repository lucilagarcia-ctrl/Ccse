export const randInt = (min: number, max: number) => min + Math.floor(Math.random() * (max - min + 1));
export const pick = <T,>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)];
export function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
/** n elementos distintos al azar. */
export const sample = <T,>(arr: readonly T[], n: number) => shuffle(arr).slice(0, n);

/** Opciones numéricas: la respuesta + distractores cercanos y creíbles, sin repetir ni negativos. */
export function numberChoices(answer: number, count = 3, spread = 3): number[] {
  const set = new Set<number>([answer]);
  const near = [answer + 1, answer - 1, answer + 10, answer - 10, answer + 2, answer - 2];
  for (const n of shuffle(near)) {
    if (set.size >= count) break;
    if (n >= 0) set.add(n);
  }
  while (set.size < count) {
    const n = answer + randInt(-spread * 3, spread * 3);
    if (n >= 0) set.add(n);
  }
  return shuffle([...set]);
}
