// Para los scripts de Node: los require() de imágenes y audios devuelven solo el nombre del archivo.
for (const ext of ['.png', '.m4a', '.wav']) require.extensions[ext] = (m, filename) => (m.exports = filename);
