"""
Importa grabaciones caseras (Notas de voz del iPhone) y las usa como voz de la app.

Cada archivo es una tanda de grabaciones/frases-es.json leída en orden, con ~2 s de silencio
entre frases. El script corta por los silencios, comprueba que salgan tantas frases como debe,
normaliza el volumen y guarda cada frase como assets/voice/<clave>.m4a (sustituye la voz sintética).

Uso:
  python3 scripts/import-recordings.py carpeta_con_tandas [--repetidas 3:12,5:7]

  - Los archivos se llaman tanda-1.m4a … tanda-6.m4a (o .wav/.mp3/.caf).
  - --repetidas: frases que se leyeron dos veces (tanda:número). Se usa la última toma.
  - --prueba: solo comprueba los cortes, no escribe nada.
  - --forzar: guarda aunque la comprobación de duraciones encuentre algo raro.
"""
import glob
import json
import os
import re
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SILENCE_DB = -35   # por debajo de esto se considera silencio
MIN_PAUSE = 0.9    # silencio mínimo para cortar (segundos); se pide dejar ~2 s entre frases
PAD = 0.15         # margen que se deja antes y después de cada frase

args = [a for a in sys.argv[1:] if not a.startswith('--')]
folder = args[0]
dry = '--prueba' in sys.argv
force = '--forzar' in sys.argv
repeats = {}
if '--repetidas' in sys.argv:
    for item in sys.argv[sys.argv.index('--repetidas') + 1].split(','):
        t, n = item.split(':')
        repeats.setdefault(int(t), []).append(int(n))

phrases = json.load(open(os.path.join(ROOT, 'grabaciones', 'frases-es.json'), encoding='utf-8'))


def duration(path):
    return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', path], capture_output=True, text=True).stdout)


def speech_segments(path):
    """Tramos con voz, a partir de los silencios que detecta ffmpeg."""
    log = subprocess.run(
        ['ffmpeg', '-hide_banner', '-i', path, '-af', f'silencedetect=noise={SILENCE_DB}dB:d={MIN_PAUSE}', '-f', 'null', '-'],
        capture_output=True, text=True,
    ).stderr
    starts = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', log)]
    ends = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', log)]
    total = duration(path)
    segments, pos = [], 0.0
    for s, e in zip(starts, ends + [total] * (len(starts) - len(ends))):
        if s - pos > 0.25:
            segments.append((max(0, pos - PAD), s + PAD))
        pos = e
    if total - pos > 0.25:
        segments.append((max(0, pos - PAD), total))
    return segments


ok = True
for tanda in sorted({p['tanda'] for p in phrases}):
    files = [f for f in glob.glob(os.path.join(folder, f'tanda-{tanda}.*')) if not f.endswith('.json')]
    if not files:
        print(f'tanda {tanda}: falta el archivo')
        ok = False
        continue
    items = [p for p in phrases if p['tanda'] == tanda]
    # Con repeticiones, la frase repetida ocupa dos tramos: nos quedamos con el último.
    expected = []
    for p in items:
        expected += [None] * repeats.get(tanda, []).count(p['n']) + [p]
    segments = speech_segments(files[0])
    # Las pausas dentro de una frase (comas, "…") son más cortas que las de entre frases:
    # si sobran tramos, se juntan los separados por la pausa más corta.
    while len(segments) > len(expected):
        gaps = [segments[i + 1][0] - segments[i][1] for i in range(len(segments) - 1)]
        i = gaps.index(min(gaps))
        segments[i:i + 2] = [(segments[i][0], segments[i + 1][1])]
    if len(segments) != len(expected):
        print(f'tanda {tanda}: se esperaban {len(expected)} frases y salieron {len(segments)} tramos — revisa pausas o repeticiones')
        print('   duraciones:', ' '.join(f'{e - s:.1f}' for s, e in segments))
        ok = False
        continue
    # Comprobación: cada trozo debe durar más o menos lo que dura esa frase en la voz sintética
    # (escalado al ritmo de quien lee). Si no, probablemente hay una repetición sin avisar.
    pairs = [((e - s), p) for (s, e), p in zip(segments, expected) if p is not None]
    ref = {p['key']: duration(os.path.join(ROOT, 'assets', 'voice', f"{p['key']}.m4a")) for _, p in pairs}
    ratios = sorted(d / ref[p['key']] for d, p in pairs)
    pace = ratios[len(ratios) // 2]
    odd = [p['n'] for d, p in pairs if not 0.45 < d / (ref[p['key']] * pace) < 2.0]
    if odd and not force:
        print(f'tanda {tanda}: los cortes no encajan cerca de las frases {odd} — ¿alguna repetida sin avisar? (o usa --forzar)')
        ok = False
        continue
    print(f'tanda {tanda}: {len(items)} frases ✓')
    if dry:
        continue
    for (s, e), p in zip(segments, expected):
        if p is None:
            continue
        out = os.path.join(ROOT, 'assets', 'voice', f"{p['key']}.m4a")
        subprocess.run(
            ['ffmpeg', '-loglevel', 'error', '-y', '-ss', f'{s:.3f}', '-to', f'{e:.3f}', '-i', files[0],
             '-af', 'highpass=f=80,loudnorm=I=-16:TP=-1.5:LRA=11,afade=t=in:d=0.05', '-ac', '1', '-ar', '22050', '-c:a', 'aac', '-b:a', '48k', out],
            check=True,
        )
sys.exit(0 if ok else 1)
