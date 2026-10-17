"""
Graba las frases fijas de la app con voces neuronales de Piper (https://github.com/rhasspy/piper),
para que la lectura en voz alta suene natural y funcione sin internet.

1. npx tsx --require ./scripts/asset-stub.cjs scripts/list-speech.ts > /tmp/frases.json
2. Descarga las voces (v0.0.2 de rhasspy/piper en GitHub), p. ej.
   voice-ca-upc_ona-x-low, voice-es-carlfm-x-low, voice-en-gb-southern_english_female-low
   (las voces es-mls_* balbucean con piper-tts 1.3: no usarlas)
3. pip install piper-tts   (y ffmpeg instalado)
4. python3 scripts/make-voice.py /tmp/frases.json /carpeta/con/voces [idiomas]
   (con idiomas, p. ej. "es", solo regraba ese idioma; las demás grabaciones se conservan)

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
ONLY = set(sys.argv[3].split(',')) if len(sys.argv) > 3 else None
MODELS = {
    'ca': 'voice-ca-upc_ona-x-low',
    'es': 'voice-es-carlfm-x-low',
    'en': 'voice-en-gb-southern_english_female-low',
}
# Un poco más despacio que lo normal: es para un niño de 7 años (la voz castellana es más rápida).
CONFIG = {
    'ca': SynthesisConfig(length_scale=1.12),
    'en': SynthesisConfig(length_scale=1.12),
    'es': SynthesisConfig(length_scale=1.22),
}


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
wanted = {voice_key(p['lang'], p['text']) for p in phrases}
for f in glob.glob(os.path.join(out_dir, '*.m4a')):
    if os.path.basename(f)[:-4] not in wanted:
        os.remove(f)  # frases que ya no existen
todo = [p for p in phrases if (ONLY is None or p['lang'] in ONLY) or not os.path.exists(os.path.join(out_dir, voice_key(p['lang'], p['text']) + '.m4a'))]
voices = {lang: PiperVoice.load(glob.glob(os.path.join(VOICES, name, '*.onnx'))[0]) for lang, name in MODELS.items()}
slow = []


def record(item):
    key = voice_key(item['lang'], item['text'])
    with tempfile.NamedTemporaryFile(suffix='.wav') as tmp:
        with wave.open(tmp.name, 'wb') as w:
            voices[item['lang']].synthesize_wav(item['text'], w, syn_config=CONFIG[item['lang']])
        with wave.open(tmp.name) as r:
            seconds = r.getnframes() / r.getframerate()
        # Una voz sana dice unos 12-18 caracteres por segundo; muy por debajo suele ser balbuceo.
        if len(item['text']) > 12 and len(item['text']) / seconds < 8:
            slow.append(f"{item['lang']}: {item['text']} ({len(item['text']) / seconds:.1f} c/s)")
        subprocess.run(
            ['ffmpeg', '-loglevel', 'error', '-y', '-i', tmp.name, '-ac', '1', '-c:a', 'aac', '-b:a', '32k', os.path.join(out_dir, f'{key}.m4a')],
            check=True,
        )
    return key


with ThreadPoolExecutor(max_workers=4) as pool:
    list(pool.map(record, todo))
keys = sorted(wanted)

with open(os.path.join(ROOT, 'src', 'voiceClips.ts'), 'w', encoding='utf-8') as f:
    f.write('// Generado por scripts/make-voice.py — no editar a mano.\n')
    f.write('// Voces neuronales Piper: ca-upc_ona, es-carlfm, en-gb-southern_english_female.\n')
    f.write('export const voiceClips: Record<string, number> = {\n')
    f.write('\n'.join(f"  '{k}': require('../assets/voice/{k}.m4a')," for k in keys))
    f.write('\n};\n')
print(f'{len(keys)} grabaciones ({len(todo)} nuevas)')
if slow:
    print('AVISO, posibles balbuceos:\n  ' + '\n  '.join(slow))
    sys.exit(1)
