"""
Sustituye los emojis por las ilustraciones 3D de Microsoft Fluent Emoji (licencia MIT).

1. Busca todos los emojis que aparecen en src/.
2. Copia su imagen 3D desde un clon de https://github.com/microsoft/fluentui-emoji
   (reducida a 160 px) a assets/emoji/.
3. Genera src/emojiImages.ts con la tabla emoji -> imagen.

Uso:
  git clone --depth 1 --filter=blob:none --sparse https://github.com/microsoft/fluentui-emoji.git /tmp/fluent
  python3 scripts/make-emoji-images.py /tmp/fluent
"""
import glob
import json
import os
import subprocess
import sys

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FLUENT = sys.argv[1]
SIZE = 160
norm = lambda s: s.replace('️', '')

subprocess.run(['git', '-C', FLUENT, 'sparse-checkout', 'set', '--no-cone', 'assets/*/metadata.json'], check=True)
glyphs = {}
for meta in glob.glob(os.path.join(FLUENT, 'assets', '*', 'metadata.json')):
    data = json.load(open(meta, encoding='utf-8'))
    glyphs[norm(data['glyph'])] = os.path.dirname(meta)

# Emojis usados en el código (el más largo primero, para secuencias como 🧑‍🚀).
source = ''.join(open(f, encoding='utf-8').read() for f in glob.glob(os.path.join(ROOT, 'src', '**', '*.ts*'), recursive=True))
source = norm(source)
longest = max(len(g) for g in glyphs)
used, i = set(), 0
while i < len(source):
    for n in range(longest, 0, -1):
        if source[i:i + n] in glyphs:
            used.add(source[i:i + n])
            i += n
            break
    else:
        i += 1

tree = subprocess.run(['git', '-C', FLUENT, 'ls-tree', '-r', '--name-only', 'HEAD', 'assets'], capture_output=True, text=True, check=True).stdout.split('\n')
wanted = {}
for g in sorted(used):
    folder = os.path.relpath(glyphs[g], FLUENT)
    pngs = [p for p in tree if p.startswith(folder + '/') and p.endswith('_3d.png') or p.startswith(folder + '/') and p.endswith('_3d_default.png')]
    pngs.sort(key=lambda p: ('Default' not in p and '/3D/' not in p, len(p)))
    if pngs:
        wanted[g] = pngs[0]
subprocess.run(['git', '-C', FLUENT, 'sparse-checkout', 'add'] + list(wanted.values()), check=True)

out_dir = os.path.join(ROOT, 'assets', 'emoji')
os.makedirs(out_dir, exist_ok=True)
for f in glob.glob(os.path.join(out_dir, '*.png')):
    os.remove(f)
lines = []
for g, path in sorted(wanted.items(), key=lambda kv: kv[1]):
    name = '-'.join(f'{ord(c):x}' for c in g)
    im = Image.open(os.path.join(FLUENT, path)).convert('RGBA')
    im.thumbnail((SIZE, SIZE), Image.LANCZOS)
    im.save(os.path.join(out_dir, f'{name}.png'), optimize=True)
    lines.append(f"  {json.dumps(g, ensure_ascii=False)}: require('../assets/emoji/{name}.png'),")

with open(os.path.join(ROOT, 'src', 'emojiImages.ts'), 'w', encoding='utf-8') as f:
    f.write('// Generado por scripts/make-emoji-images.py — no editar a mano.\n')
    f.write('// Ilustraciones 3D de Microsoft Fluent Emoji (MIT): https://github.com/microsoft/fluentui-emoji\n')
    f.write('export const emojiImages: Record<string, number> = {\n' + '\n'.join(lines) + '\n};\n')

missing = sorted(used - set(wanted))
print(f'{len(wanted)} imágenes; sin imagen: {" ".join(missing) or "ninguno"}')
