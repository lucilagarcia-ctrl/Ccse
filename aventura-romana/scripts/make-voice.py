"""
Graba las frases fijas de la app con voces neuronales de Piper (https://github.com/rhasspy/piper),
para que la lectura en voz alta suene natural y funcione sin internet.

1. npx tsx --require ./scripts/asset-stub.cjs scripts/list-speech.ts > /tmp/frases.json
2. Descarga las voces (v0.0.2 de rhasspy/piper en GitHub), p. ej.
   voice-ca-upc_ona-x-low, voice-es-mls_9972-low, voice-en-gb-southern_english_female-low
3. pip install piper-tts   (y ffmpeg instalado)
4. python3 scripts/make-voice.py /tmp/frases.json /carpeta/con/voces

Genera assets/voice/<clave>.m4a y src/voiceClips.ts (clave = voiceKey() de src/voiceKey.ts).
"""
import glob
import json
import os
import subprocess
import sys
import tempfile
import wave
from concurrent.futures import ThreadPoolExecutor

from piper import PiperVoice
from piper.config import SynthesisConfig

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PHRASES, VOICES = sys.argv[1], sys.argv[2]
MODELS = {
    'ca': 'voice-ca-upc_ona-x-low',
    'es': 'voice-es-mls_9972-low',
    'en': 'voice-en-gb-southern_english_female-low',
}
# Un poco más despacio que lo normal: es para un niño de 7 años.
CONFIG = SynthesisConfig(length_scale=1.12)


def voice_key(lang, text):
    """FNV-1a 32 bits sobre unidades UTF-16, igual que voiceKey() en src/voiceKey.ts."""
    data = f'{lang}:{text}'.encode('utf-16-le')
    h = 0x811C9DC5
    for i in range(0, len(data), 2):
        h ^= data[i] | (data[i + 1] << 8)
        h = (h * 0x01000193) & 0xFFFFFFFF
    return f'{h:08x}'


phrases = json.load(open(PHRASES, encoding='utf-8'))
out_dir = os.path.join(ROOT, 'assets', 'voice')
os.makedirs(out_dir, exist_ok=True)
for f in glob.glob(os.path.join(out_dir, '*.m4a')):
    os.remove(f)
voices = {lang: PiperVoice.load(glob.glob(os.path.join(VOICES, name, '*.onnx'))[0]) for lang, name in MODELS.items()}


def record(item):
    key = voice_key(item['lang'], item['text'])
    with tempfile.NamedTemporaryFile(suffix='.wav') as tmp:
        with wave.open(tmp.name, 'wb') as w:
            voices[item['lang']].synthesize_wav(item['text'], w, syn_config=CONFIG)
        subprocess.run(
            ['ffmpeg', '-loglevel', 'error', '-y', '-i', tmp.name, '-ac', '1', '-c:a', 'aac', '-b:a', '32k', os.path.join(out_dir, f'{key}.m4a')],
            check=True,
        )
    return key


with ThreadPoolExecutor(max_workers=4) as pool:
    keys = sorted(set(pool.map(record, phrases)))

with open(os.path.join(ROOT, 'src', 'voiceClips.ts'), 'w', encoding='utf-8') as f:
    f.write('// Generado por scripts/make-voice.py — no editar a mano.\n')
    f.write('// Voces neuronales Piper: ca-upc_ona, es-mls_9972, en-gb-southern_english_female.\n')
    f.write('export const voiceClips: Record<string, number> = {\n')
    f.write('\n'.join(f"  '{k}': require('../assets/voice/{k}.m4a')," for k in keys))
    f.write('\n};\n')
print(f'{len(keys)} grabaciones')
