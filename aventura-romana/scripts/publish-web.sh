#!/bin/sh
# Genera la versión web y la deja en ../jugar, que GitHub Pages sirve en
# https://lucilagarcia-ctrl.github.io/Ccse/jugar/  (después: commit + push a main).
set -e
cd "$(dirname "$0")/.."
rm -rf dist
npx expo export -p web --output-dir dist
rm -rf ../jugar
mv dist ../jugar
touch ../.nojekyll  # sin esto, GitHub Pages ignora la carpeta _expo
echo "Listo: ../jugar"
