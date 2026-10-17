/** Vocabulario de 2.º de primaria (colores, números, animales, comida, cuerpo, ropa, familia, tiempo, escuela). */
export type Word = { emoji: string; es: string; en: string; ca: string; topic: string };

export const vocab: Word[] = [
  // animales
  { emoji: '🐶', es: 'perro', en: 'dog', ca: 'gos', topic: 'animal' },
  { emoji: '🐱', es: 'gato', en: 'cat', ca: 'gat', topic: 'animal' },
  { emoji: '🐴', es: 'caballo', en: 'horse', ca: 'cavall', topic: 'animal' },
  { emoji: '🐮', es: 'vaca', en: 'cow', ca: 'vaca', topic: 'animal' },
  { emoji: '🐷', es: 'cerdo', en: 'pig', ca: 'porc', topic: 'animal' },
  { emoji: '🐔', es: 'gallina', en: 'hen', ca: 'gallina', topic: 'animal' },
  { emoji: '🐟', es: 'pez', en: 'fish', ca: 'peix', topic: 'animal' },
  { emoji: '🐦', es: 'pájaro', en: 'bird', ca: 'ocell', topic: 'animal' },
  { emoji: '🐭', es: 'ratón', en: 'mouse', ca: 'ratolí', topic: 'animal' },
  { emoji: '🐘', es: 'elefante', en: 'elephant', ca: 'elefant', topic: 'animal' },
  { emoji: '🦁', es: 'león', en: 'lion', ca: 'lleó', topic: 'animal' },
  { emoji: '🐸', es: 'rana', en: 'frog', ca: 'granota', topic: 'animal' },
  { emoji: '🐺', es: 'lobo', en: 'wolf', ca: 'llop', topic: 'animal' },
  { emoji: '🐰', es: 'conejo', en: 'rabbit', ca: 'conill', topic: 'animal' },
  // comida
  { emoji: '🍎', es: 'manzana', en: 'apple', ca: 'poma', topic: 'food' },
  { emoji: '🍌', es: 'plátano', en: 'banana', ca: 'plàtan', topic: 'food' },
  { emoji: '🍞', es: 'pan', en: 'bread', ca: 'pa', topic: 'food' },
  { emoji: '🥛', es: 'leche', en: 'milk', ca: 'llet', topic: 'food' },
  { emoji: '🥚', es: 'huevo', en: 'egg', ca: 'ou', topic: 'food' },
  { emoji: '🧀', es: 'queso', en: 'cheese', ca: 'formatge', topic: 'food' },
  { emoji: '🍇', es: 'uvas', en: 'grapes', ca: 'raïm', topic: 'food' },
  { emoji: '🍊', es: 'naranja', en: 'orange', ca: 'taronja', topic: 'food' },
  { emoji: '💧', es: 'agua', en: 'water', ca: 'aigua', topic: 'food' },
  // cuerpo
  { emoji: '👁️', es: 'ojo', en: 'eye', ca: 'ull', topic: 'body' },
  { emoji: '👃', es: 'nariz', en: 'nose', ca: 'nas', topic: 'body' },
  { emoji: '👂', es: 'oreja', en: 'ear', ca: 'orella', topic: 'body' },
  { emoji: '✋', es: 'mano', en: 'hand', ca: 'mà', topic: 'body' },
  { emoji: '🦶', es: 'pie', en: 'foot', ca: 'peu', topic: 'body' },
  { emoji: '👄', es: 'boca', en: 'mouth', ca: 'boca', topic: 'body' },
  // ropa
  { emoji: '👕', es: 'camiseta', en: 'T-shirt', ca: 'samarreta', topic: 'clothes' },
  { emoji: '👖', es: 'pantalones', en: 'trousers', ca: 'pantalons', topic: 'clothes' },
  { emoji: '👟', es: 'zapatillas', en: 'trainers', ca: 'sabatilles', topic: 'clothes' },
  { emoji: '🧢', es: 'gorra', en: 'cap', ca: 'gorra', topic: 'clothes' },
  { emoji: '🧦', es: 'calcetines', en: 'socks', ca: 'mitjons', topic: 'clothes' },
  // tiempo y naturaleza
  { emoji: '☀️', es: 'sol', en: 'sun', ca: 'sol', topic: 'nature' },
  { emoji: '🌙', es: 'luna', en: 'moon', ca: 'lluna', topic: 'nature' },
  { emoji: '⭐', es: 'estrella', en: 'star', ca: 'estrella', topic: 'nature' },
  { emoji: '🌧️', es: 'lluvia', en: 'rain', ca: 'pluja', topic: 'nature' },
  { emoji: '❄️', es: 'nieve', en: 'snow', ca: 'neu', topic: 'nature' },
  { emoji: '🌳', es: 'árbol', en: 'tree', ca: 'arbre', topic: 'nature' },
  { emoji: '🌸', es: 'flor', en: 'flower', ca: 'flor', topic: 'nature' },
  // escuela y casa
  { emoji: '📕', es: 'libro', en: 'book', ca: 'llibre', topic: 'school' },
  { emoji: '✏️', es: 'lápiz', en: 'pencil', ca: 'llapis', topic: 'school' },
  { emoji: '🎒', es: 'mochila', en: 'bag', ca: 'motxilla', topic: 'school' },
  { emoji: '🏠', es: 'casa', en: 'house', ca: 'casa', topic: 'school' },
  { emoji: '⚽', es: 'pelota', en: 'ball', ca: 'pilota', topic: 'school' },
  { emoji: '🪑', es: 'silla', en: 'chair', ca: 'cadira', topic: 'school' },
  // familia
  { emoji: '👩', es: 'mamá', en: 'mum', ca: 'mare', topic: 'family' },
  { emoji: '👨', es: 'papá', en: 'dad', ca: 'pare', topic: 'family' },
  { emoji: '👵', es: 'abuela', en: 'grandma', ca: 'àvia', topic: 'family' },
  { emoji: '👴', es: 'abuelo', en: 'grandpa', ca: 'avi', topic: 'family' },
  { emoji: '👶', es: 'bebé', en: 'baby', ca: 'nadó', topic: 'family' },
];

export const colorsVocab: Word[] = [
  { emoji: '🔴', es: 'rojo', en: 'red', ca: 'vermell', topic: 'color' },
  { emoji: '🔵', es: 'azul', en: 'blue', ca: 'blau', topic: 'color' },
  { emoji: '🟢', es: 'verde', en: 'green', ca: 'verd', topic: 'color' },
  { emoji: '🟡', es: 'amarillo', en: 'yellow', ca: 'groc', topic: 'color' },
  { emoji: '🟠', es: 'naranja', en: 'orange', ca: 'taronja', topic: 'color' },
  { emoji: '🟣', es: 'morado', en: 'purple', ca: 'lila', topic: 'color' },
  { emoji: '⚫', es: 'negro', en: 'black', ca: 'negre', topic: 'color' },
  { emoji: '⚪', es: 'blanco', en: 'white', ca: 'blanc', topic: 'color' },
  { emoji: '🟤', es: 'marrón', en: 'brown', ca: 'marró', topic: 'color' },
];

export const numbersVocab: { n: number; en: string; ca: string }[] = [
  { n: 1, en: 'one', ca: 'u' }, { n: 2, en: 'two', ca: 'dos' }, { n: 3, en: 'three', ca: 'tres' },
  { n: 4, en: 'four', ca: 'quatre' }, { n: 5, en: 'five', ca: 'cinc' }, { n: 6, en: 'six', ca: 'sis' },
  { n: 7, en: 'seven', ca: 'set' }, { n: 8, en: 'eight', ca: 'vuit' }, { n: 9, en: 'nine', ca: 'nou' },
  { n: 10, en: 'ten', ca: 'deu' }, { n: 11, en: 'eleven', ca: 'onze' }, { n: 12, en: 'twelve', ca: 'dotze' },
  { n: 13, en: 'thirteen', ca: 'tretze' }, { n: 14, en: 'fourteen', ca: 'catorze' }, { n: 15, en: 'fifteen', ca: 'quinze' },
  { n: 16, en: 'sixteen', ca: 'setze' }, { n: 17, en: 'seventeen', ca: 'disset' }, { n: 18, en: 'eighteen', ca: 'divuit' },
  { n: 19, en: 'nineteen', ca: 'dinou' }, { n: 20, en: 'twenty', ca: 'vint' }, { n: 30, en: 'thirty', ca: 'trenta' },
  { n: 40, en: 'forty', ca: 'quaranta' }, { n: 50, en: 'fifty', ca: 'cinquanta' }, { n: 100, en: 'one hundred', ca: 'cent' },
];

/** Palabras cortas para el juego de "construir la palabra" con letras. */
export const spellWords: { emoji: string; en: string; ca: string }[] = [
  { emoji: '🐱', en: 'CAT', ca: 'GAT' },
  { emoji: '🐶', en: 'DOG', ca: 'GOS' },
  { emoji: '☀️', en: 'SUN', ca: 'SOL' },
  { emoji: '🥚', en: 'EGG', ca: 'OU' },
  { emoji: '🐷', en: 'PIG', ca: 'PORC' },
  { emoji: '🐟', en: 'FISH', ca: 'PEIX' },
  { emoji: '🌙', en: 'MOON', ca: 'LLUNA' },
  { emoji: '📕', en: 'BOOK', ca: 'LLIBRE' },
  { emoji: '🍞', en: 'BREAD', ca: 'PA' },
  { emoji: '🐮', en: 'COW', ca: 'VACA' },
  { emoji: '🏠', en: 'HOUSE', ca: 'CASA' },
  { emoji: '🌳', en: 'TREE', ca: 'ARBRE' },
  { emoji: '✋', en: 'HAND', ca: 'MÀ' },
  { emoji: '🐸', en: 'FROG', ca: 'GRANOTA' },
  { emoji: '⭐', en: 'STAR', ca: 'ESTEL' },
  { emoji: '🍎', en: 'APPLE', ca: 'POMA' },
  { emoji: '🐴', en: 'HORSE', ca: 'CAVALL' },
  { emoji: '🌸', en: 'FLOWER', ca: 'FLOR' },
  { emoji: '🐭', en: 'MOUSE', ca: 'RATOLÍ' },
  { emoji: '🧀', en: 'CHEESE', ca: 'FORMATGE' },
  { emoji: '🍊', en: 'ORANGE', ca: 'TARONJA' },
  { emoji: '🐦', en: 'BIRD', ca: 'OCELL' },
  { emoji: '🌧️', en: 'RAIN', ca: 'PLUJA' },
];
