// Genera los efectos de sonido (WAV 22 kHz mono) sin depender de archivos externos.
// Uso: node scripts/make-sounds.js
const fs = require('fs');
const path = require('path');

const RATE = 22050;

function wav(samples) {
  const data = Buffer.alloc(samples.length * 2);
  samples.forEach((s, i) => data.writeInt16LE(Math.max(-1, Math.min(1, s)) * 32767 * 0.8, i * 2));
  const h = Buffer.alloc(44);
  h.write('RIFF', 0); h.writeUInt32LE(36 + data.length, 4); h.write('WAVE', 8);
  h.write('fmt ', 12); h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(1, 22);
  h.writeUInt32LE(RATE, 24); h.writeUInt32LE(RATE * 2, 28); h.writeUInt16LE(2, 32); h.writeUInt16LE(16, 34);
  h.write('data', 36); h.writeUInt32LE(data.length, 40);
  return Buffer.concat([h, data]);
}

// notes: [frequencyHz, startSec, durationSec, wave]
function render(notes, total) {
  const out = new Float32Array(Math.ceil(total * RATE));
  for (const [f, start, dur, kind = 'sine', vol = 0.5] of notes) {
    const s0 = Math.floor(start * RATE);
    const n = Math.floor(dur * RATE);
    for (let i = 0; i < n && s0 + i < out.length; i++) {
      const t = i / RATE;
      const env = Math.min(1, i / (0.01 * RATE)) * Math.pow(1 - i / n, 1.5);
      const ph = 2 * Math.PI * f * t;
      let v = Math.sin(ph);
      if (kind === 'brass') v = 0.6 * Math.sin(ph) + 0.3 * Math.sin(2 * ph) + 0.15 * Math.sin(3 * ph);
      if (kind === 'bell') v = Math.sin(ph) + 0.4 * Math.sin(2.76 * ph) * Math.exp(-t * 6);
      out[s0 + i] += v * env * vol;
    }
  }
  return Array.from(out);
}

const N = { C4: 261.6, D4: 293.7, E4: 329.6, F4: 349.2, G4: 392, A4: 440, B4: 493.9, C5: 523.3, D5: 587.3, E5: 659.3, G5: 784, C6: 1046.5, Eb4: 311.1, Ab3: 207.7, G3: 196 };

const sounds = {
  correct: render([[N.C5, 0, 0.15, 'bell'], [N.E5, 0.09, 0.15, 'bell'], [N.G5, 0.18, 0.35, 'bell']], 0.6),
  wrong: render([[N.Eb4, 0, 0.18, 'brass', 0.4], [N.C4 * 0.75, 0.16, 0.35, 'brass', 0.4]], 0.55),
  pop: render([[N.G5, 0, 0.06, 'sine', 0.5], [N.C6, 0.04, 0.08, 'sine', 0.4]], 0.15),
  // Fanfarria de trompetas romanas
  fanfare: render([
    [N.G4, 0, 0.18, 'brass'], [N.G4, 0.2, 0.12, 'brass'], [N.G4, 0.34, 0.12, 'brass'],
    [N.C5, 0.5, 0.45, 'brass'], [N.E5, 0.5, 0.45, 'brass', 0.3],
    [N.G4, 1.0, 0.15, 'brass'], [N.C5, 1.18, 0.15, 'brass'],
    [N.E5, 1.36, 0.8, 'brass'], [N.G5, 1.36, 0.8, 'brass', 0.3], [N.C5, 1.36, 0.8, 'brass', 0.3],
  ], 2.3),
  sad: render([[N.G4, 0, 0.35, 'sine'], [N.Eb4, 0.35, 0.35, 'sine'], [N.C4, 0.7, 0.35, 'sine'], [N.G3, 1.05, 0.7, 'sine']], 1.9),
  fact: render([[N.C5, 0, 0.1, 'bell', 0.4], [N.G5, 0.08, 0.1, 'bell', 0.4], [N.C6, 0.16, 0.3, 'bell', 0.4]], 0.5),
};

for (const [name, s] of Object.entries(sounds)) {
  fs.writeFileSync(path.join(__dirname, '..', 'assets', 'sounds', `${name}.wav`), wav(s));
}
console.log('ok', Object.keys(sounds).join(', '));
