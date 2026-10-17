/** Texto tal como se pronuncia (sin emojis ni espacios de más) y su clave para buscar la grabación. */
export function speechText(text: string) {
  return text
    .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}\u{20E3}]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** FNV-1a de 32 bits en hexadecimal: el mismo cálculo se hace en scripts/make-voice.py. */
export function voiceKey(lang: string, text: string) {
  const s = `${lang}:${speechText(text)}`;
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, '0');
}
