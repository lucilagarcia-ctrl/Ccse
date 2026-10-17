import { extraQuestions } from './content-extra';
import { Question } from './types';

/**
 * Preguntas escritas a mano de historia (España, Cataluña, Argentina), Roma y algunas de lengua.
 * Nivel: 2.º de primaria (cicle inicial). Se apoyan en dibujos/emojis y frases cortas.
 * Reglas: en 'choice', `correct` es el índice de la opción buena (se barajan al mostrar).
 */
const firstBatch: Question[] = [
  // ───────────── ROMA ─────────────
  {
    id: 'rome-wolf', subject: 'rome', kind: 'choice', scene: '👶👶',
    prompt: { es: 'Rómulo y Remo, los fundadores de Roma, fueron cuidados por un animal. ¿Cuál?', en: 'Romulus and Remus, who founded Rome, were cared for by an animal. Which one?', ca: 'En Ròmul i en Rem, els fundadors de Roma, els va cuidar un animal. Quin?' },
    choices: [{ emoji: '🐺' }, { emoji: '🐻' }, { emoji: '🦁' }, { emoji: '🐶' }], correct: 0,
  },
  {
    id: 'rome-aqueduct', subject: 'rome', kind: 'choice', scene: '🌉',
    prompt: { es: 'Los acueductos romanos llevaban… ¿qué?', en: 'Roman aqueducts carried… what?', ca: 'Els aqüeductes romans portaven… què?' },
    choices: [{ emoji: '💧' }, { emoji: '🍕' }, { emoji: '🚗' }, { emoji: '🔥' }], correct: 0,
  },
  {
    id: 'rome-latin', subject: 'rome', kind: 'choice', scene: '🏛️🗣️',
    prompt: { es: '¿Qué idioma hablaban los romanos?', en: 'What language did the Romans speak?', ca: 'Quina llengua parlaven els romans?' },
    choices: [{ label: { es: 'Latín', en: 'Latin', ca: 'Llatí' } }, { label: { es: 'Inglés', en: 'English', ca: 'Anglès' } }, { label: { es: 'Chino', en: 'Chinese', ca: 'Xinès' } }], correct: 0,
  },
  {
    id: 'rome-pizza', subject: 'rome', kind: 'tf', scene: '🏛️🍕🍅',
    prompt: { es: 'Los romanos comían pizza con tomate.', en: 'The Romans ate pizza with tomato.', ca: 'Els romans menjaven pizza amb tomàquet.' },
    answer: false,
  },
  {
    id: 'rome-cars', subject: 'rome', kind: 'tf', scene: '🏛️🚗',
    prompt: { es: 'Los romanos iban en coche.', en: 'The Romans travelled by car.', ca: 'Els romans anaven en cotxe.' },
    answer: false,
  },
  {
    id: 'rome-baths', subject: 'rome', kind: 'tf', scene: '🏛️🛁',
    prompt: { es: 'Los romanos iban a baños públicos llamados termas.', en: 'The Romans went to public baths called "thermae".', ca: 'Els romans anaven a banys públics anomenats termes.' },
    answer: true,
  },
  {
    id: 'rome-gladiators', subject: 'rome', kind: 'tf', scene: '🏟️🛡️⚔️',
    prompt: { es: 'En el Coliseo luchaban los gladiadores.', en: 'Gladiators fought in the Colosseum.', ca: 'Al Colosseu hi lluitaven els gladiadors.' },
    answer: true,
  },
  {
    id: 'rome-volcano', subject: 'rome', kind: 'choice', scene: '🏘️',
    prompt: { es: 'La ciudad romana de Pompeya quedó tapada por… ¿qué?', en: 'The Roman city of Pompeii was covered by… what?', ca: 'La ciutat romana de Pompeia va quedar coberta per… què?' },
    choices: [{ emoji: '🌋' }, { emoji: '🌊' }, { emoji: '❄️' }, { emoji: '🌪️' }], correct: 0,
  },
  {
    id: 'rome-colosseum', subject: 'rome', kind: 'choice',
    prompt: { es: '¿Cuál es el Coliseo de Roma?', en: 'Which one is the Colosseum in Rome?', ca: 'Quin és el Colosseu de Roma?' },
    choices: [{ emoji: '🏟️' }, { emoji: '🗽' }, { emoji: '🗼' }, { emoji: '🏯' }], correct: 0,
  },
  {
    id: 'rome-italy', subject: 'rome', kind: 'choice',
    prompt: { es: 'Roma está en Italia. ¿Cuál es la bandera de Italia?', en: 'Rome is in Italy. Which is the flag of Italy?', ca: 'Roma és a Itàlia. Quina és la bandera d’Itàlia?' },
    choices: [{ flag: 'it' }, { flag: 'fr' }, { flag: 'es' }, { flag: 'ar' }], correct: 0,
  },
  {
    id: 'rome-numeral-order', subject: 'rome', kind: 'order',
    prompt: { es: 'Ordena los números romanos de menor a mayor', en: 'Put the Roman numerals in order, smallest first', ca: 'Ordena els nombres romans de més petit a més gran' },
    items: [{ label: 'I' }, { label: 'III' }, { label: 'V' }, { label: 'X' }],
  },
  {
    id: 'rome-memory', subject: 'rome', kind: 'memory',
    prompt: { es: 'Une cada número romano con su número', en: 'Match each Roman numeral with its number', ca: 'Uneix cada nombre romà amb el seu nombre' },
    pairs: [[{ label: 'I' }, { label: '1' }], [{ label: 'V' }, { label: '5' }], [{ label: 'X' }, { label: '10' }], [{ label: 'III' }, { label: '3' }]],
  },
  {
    id: 'rome-shields', subject: 'rome', kind: 'tap', target: '🛡️', others: ['🍇', '🏺', '🪙', '🌿'], count: 5,
    prompt: { es: '¡Ayuda al legionario! Toca todos los escudos', en: 'Help the legionary! Tap all the shields', ca: 'Ajuda el legionari! Toca tots els escuts' },
  },

  // ───────────── HISTORIA: TIEMPO, ESPAÑA Y CATALUÑA ─────────────
  {
    id: 'hist-timeline', subject: 'history', kind: 'order',
    prompt: { es: 'Ordena del más antiguo al más moderno', en: 'Put them in order, oldest first', ca: 'Ordena del més antic al més modern' },
    items: [{ emoji: '🦕' }, { emoji: '🏛️' }, { emoji: '🏰' }, { emoji: '🚗' }],
  },
  {
    id: 'hist-dinos', subject: 'history', kind: 'tf', scene: '🦖🤝🏛️',
    prompt: { es: 'Los dinosaurios vivían con los romanos.', en: 'Dinosaurs lived with the Romans.', ca: 'Els dinosaures vivien amb els romans.' },
    answer: false,
  },
  {
    id: 'hist-castles', subject: 'history', kind: 'tf', scene: '🏰🤴⚔️',
    prompt: { es: 'En la Edad Media, los reyes vivían en castillos.', en: 'In the Middle Ages, kings lived in castles.', ca: 'A l’edat mitjana, els reis vivien en castells.' },
    answer: true,
  },
  {
    id: 'hist-columbus', subject: 'history', kind: 'choice', scene: '🧭🌎',
    prompt: { es: '¿Cómo viajó Colón a América en 1492?', en: 'How did Columbus travel to America in 1492?', ca: 'Com va viatjar Colom a Amèrica el 1492?' },
    choices: [{ emoji: '⛵' }, { emoji: '✈️' }, { emoji: '🚂' }, { emoji: '🚀' }], correct: 0,
  },
  {
    id: 'hist-spain-flag', subject: 'history', kind: 'choice',
    prompt: { es: '¿Cuál es la bandera de España?', en: 'Which is the flag of Spain?', ca: 'Quina és la bandera d’Espanya?' },
    choices: [{ flag: 'es' }, { flag: 'it' }, { flag: 'ca' }, { flag: 'pt' }], correct: 0,
  },
  {
    id: 'hist-cat-flag', subject: 'history', kind: 'choice',
    prompt: { es: '¿Cuál es la bandera de Cataluña?', en: 'Which is the flag of Catalonia?', ca: 'Quina és la bandera de Catalunya?' },
    choices: [{ flag: 'ca' }, { flag: 'es' }, { flag: 'ar' }, { flag: 'fr' }], correct: 0,
  },
  {
    id: 'hist-madrid', subject: 'history', kind: 'choice', scene: '🇪🇸🏙️',
    prompt: { es: '¿Cuál es la capital de España?', en: 'What is the capital of Spain?', ca: 'Quina és la capital d’Espanya?' },
    choices: [{ label: 'Madrid' }, { label: 'Roma' }, { label: 'Buenos Aires' }], correct: 0,
  },
  {
    id: 'hist-barcelona', subject: 'history', kind: 'choice', scene: '⛪🌊',
    prompt: { es: '¿Cuál es la capital de Cataluña?', en: 'What is the capital of Catalonia?', ca: 'Quina és la capital de Catalunya?' },
    choices: [{ label: 'Barcelona' }, { label: 'Madrid' }, { label: 'Lisboa' }], correct: 0,
  },
  {
    id: 'hist-tarraco', subject: 'history', kind: 'choice', scene: '🏛️🏟️',
    prompt: { es: 'Los romanos construyeron Tarraco, en Cataluña. ¿Cómo se llama hoy?', en: 'The Romans built Tarraco, in Catalonia. What is it called today?', ca: 'Els romans van construir Tàrraco, a Catalunya. Com es diu avui?' },
    choices: [{ label: 'Tarragona' }, { label: 'Toledo' }, { label: 'Tokio' }], correct: 0,
  },
  {
    id: 'hist-barcino', subject: 'history', kind: 'tf', scene: '🏛️➡️🏙️',
    prompt: { es: 'Barcelona empezó siendo una ciudad romana llamada Barcino.', en: 'Barcelona started as a Roman town called Barcino.', ca: 'Barcelona va començar sent una ciutat romana anomenada Barcino.' },
    answer: true,
  },
  {
    id: 'hist-hispania', subject: 'history', kind: 'choice', scene: '🏛️🗺️',
    prompt: { es: '¿Cómo llamaban los romanos a España?', en: 'What did the Romans call Spain?', ca: 'Com anomenaven els romans Espanya?' },
    choices: [{ label: 'Hispania' }, { label: 'Egipto' }, { label: 'Japón' }], correct: 0,
  },
  {
    id: 'hist-santjordi', subject: 'history', kind: 'choice', scene: '🐉🛡️',
    prompt: { es: 'En Sant Jordi se regalan libros y… ¿qué?', en: 'On Sant Jordi’s Day people give books and… what?', ca: 'Per Sant Jordi es regalen llibres i… què?' },
    choices: [{ emoji: '🌹' }, { emoji: '🎃' }, { emoji: '🎄' }, { emoji: '🥚' }], correct: 0,
  },
  {
    id: 'hist-castells', subject: 'history', kind: 'tf', scene: '🧍‍♂️🧍🧍‍♀️⬆️',
    prompt: { es: 'Los castellers hacen torres con personas.', en: 'Castellers build towers made of people.', ca: 'Els castellers fan torres de persones.' },
    answer: true,
  },
  {
    id: 'hist-castanyada', subject: 'history', kind: 'choice', scene: '🍂🔥',
    prompt: { es: 'En la Castanyada, en otoño, comemos castañas y… ¿qué dulces?', en: 'At the Castanyada, in autumn, we eat chestnuts and… which sweets?', ca: 'A la Castanyada, a la tardor, mengem castanyes i… quins dolços?' },
    choices: [{ label: { es: 'Panellets', en: 'Panellets', ca: 'Panellets' } }, { label: { es: 'Helado', en: 'Ice-cream', ca: 'Gelat' } }, { label: { es: 'Pizza', en: 'Pizza', ca: 'Pizza' } }], correct: 0,
  },
  {
    id: 'hist-quijote', subject: 'history', kind: 'choice', scene: '🐴🛡️📖',
    prompt: { es: 'Don Quijote creía que unos gigantes eran en realidad… ¿qué?', en: 'Don Quixote thought some giants were really… what?', ca: 'En Quixot creia que uns gegants eren en realitat… què?' },
    choices: [{ label: { es: 'Molinos 🌬️', en: 'Windmills 🌬️', ca: 'Molins 🌬️' } }, { label: { es: 'Árboles 🌳', en: 'Trees 🌳', ca: 'Arbres 🌳' } }, { label: { es: 'Elefantes 🐘', en: 'Elephants 🐘', ca: 'Elefants 🐘' } }], correct: 0,
  },
  {
    id: 'hist-old-new', subject: 'history', kind: 'memory',
    prompt: { es: 'Une lo de antes con lo de ahora', en: 'Match old things with new things', ca: 'Uneix el d’abans amb el d’ara' },
    pairs: [[{ emoji: '🕯️' }, { emoji: '💡' }], [{ emoji: '🐎' }, { emoji: '🚗' }], [{ emoji: '✉️' }, { emoji: '📱' }], [{ emoji: '📜' }, { emoji: '📕' }]],
  },

  // ───────────── HISTORIA: ARGENTINA ─────────────
  {
    id: 'arg-flag', subject: 'history', kind: 'choice',
    prompt: { es: '¿Cuál es la bandera de Argentina?', en: 'Which is the flag of Argentina?', ca: 'Quina és la bandera de l’Argentina?' },
    choices: [{ flag: 'ar' }, { flag: 'it' }, { flag: 'es' }, { flag: 'fr' }], correct: 0,
  },
  {
    id: 'arg-sun', subject: 'history', kind: 'tf', scene: '☀️', sceneFlag: 'ar',
    prompt: { es: 'La bandera argentina tiene un sol: el Sol de Mayo.', en: 'The Argentine flag has a sun: the Sun of May.', ca: 'La bandera argentina té un sol: el Sol de Maig.' },
    answer: true,
  },
  {
    id: 'arg-capital', subject: 'history', kind: 'choice', scene: '🇦🇷🏙️',
    prompt: { es: '¿Cuál es la capital de Argentina?', en: 'What is the capital of Argentina?', ca: 'Quina és la capital de l’Argentina?' },
    choices: [{ label: 'Buenos Aires' }, { label: 'Barcelona' }, { label: 'Roma' }], correct: 0,
  },
  {
    id: 'arg-belgrano', subject: 'history', kind: 'tf', scene: '👨🏻‍✈️🏳️',
    prompt: { es: 'Manuel Belgrano creó la bandera argentina.', en: 'Manuel Belgrano created the Argentine flag.', ca: 'Manuel Belgrano va crear la bandera argentina.' },
    answer: true,
  },
  {
    id: 'arg-sanmartin', subject: 'history', kind: 'choice', scene: '🏔️🏔️',
    prompt: { es: 'El general San Martín cruzó la montaña de los Andes. ¿Cómo?', en: 'General San Martín crossed the Andes mountains. How?', ca: 'El general San Martín va creuar les muntanyes dels Andes. Com?' },
    choices: [{ emoji: '🐴' }, { emoji: '✈️' }, { emoji: '🚗' }, { emoji: '🚁' }], correct: 0,
  },
  {
    id: 'arg-independence', subject: 'history', kind: 'choice', scene: '🇦🇷🎉',
    prompt: { es: '¿Qué día es la Independencia de Argentina?', en: 'When is Argentina’s Independence Day?', ca: 'Quin dia és la Independència de l’Argentina?' },
    choices: [{ label: { es: '9 de julio', en: '9th July', ca: '9 de juliol' } }, { label: { es: '25 de diciembre', en: '25th December', ca: '25 de desembre' } }, { label: { es: '1 de enero', en: '1st January', ca: '1 de gener' } }], correct: 0,
  },
  {
    id: 'arg-mate', subject: 'history', kind: 'tf', scene: '🧉',
    prompt: { es: 'En Argentina se toma mate, una infusión.', en: 'In Argentina people drink mate, a herbal drink.', ca: 'A l’Argentina es pren mate, una infusió.' },
    answer: true,
  },
  {
    id: 'arg-penguins', subject: 'history', kind: 'choice', scene: '🇦🇷🧊',
    prompt: { es: 'En la Patagonia argentina viven muchos… ¿qué animales?', en: 'In Argentine Patagonia there are lots of… which animals?', ca: 'A la Patagònia argentina hi viuen molts… quins animals?' },
    choices: [{ emoji: '🐧' }, { emoji: '🐫' }, { emoji: '🦒' }, { emoji: '🐼' }], correct: 0,
  },
  {
    id: 'arg-tango', subject: 'history', kind: 'choice', scene: '🇦🇷🎶',
    prompt: { es: '¿Qué baile nació en Argentina?', en: 'Which dance was born in Argentina?', ca: 'Quin ball va néixer a l’Argentina?' },
    choices: [{ label: { es: 'Tango 💃', en: 'Tango 💃', ca: 'Tango 💃' } }, { label: { es: 'Sardana 👐', en: 'Sardana 👐', ca: 'Sardana 👐' } }, { label: { es: 'Ballet 🩰', en: 'Ballet 🩰', ca: 'Ballet 🩰' } }], correct: 0,
  },
  {
    id: 'arg-iguazu', subject: 'history', kind: 'choice',
    prompt: { es: 'Las Cataratas del Iguazú, en Argentina, son de… ¿qué?', en: 'The Iguazú Falls, in Argentina, are made of… what?', ca: 'Les Cascades de l’Iguazú, a l’Argentina, són d’… què?' },
    choices: [{ emoji: '💦' }, { emoji: '🔥' }, { emoji: '🍫' }, { emoji: '🏜️' }], correct: 0,
  },

  // ───────────── CATALÁN (ortografía de 2.º) ─────────────
  {
    id: 'cat-ny', subject: 'catalan', kind: 'choice', scene: '⛰️',
    prompt: { es: '¿Cómo se escribe en catalán?', en: 'How do you write it in Catalan?', ca: 'Com s’escriu en català?' },
    choices: [{ label: 'muntanya', speakAs: 'ca' }, { label: 'muntaña' }, { label: 'muntania' }], correct: 0,
  },
  {
    id: 'cat-ll', subject: 'catalan', kind: 'choice', scene: '🌙',
    prompt: { es: '¿Cómo se escribe en catalán?', en: 'How do you write it in Catalan?', ca: 'Com s’escriu en català?' },
    choices: [{ label: 'lluna', speakAs: 'ca' }, { label: 'luna' }, { label: 'yuna' }], correct: 0,
  },
  {
    id: 'cat-c', subject: 'catalan', kind: 'choice', scene: '💪',
    prompt: { es: '¿Cómo se escribe "brazo" en catalán?', en: 'How do you write "arm" in Catalan?', ca: 'Com s’escriu «braç» en català?' },
    choices: [{ label: 'braç', speakAs: 'ca' }, { label: 'bras' }, { label: 'brac' }], correct: 0,
  },
  {
    id: 'cat-rr', subject: 'catalan', kind: 'choice', scene: '🐕',
    prompt: { es: 'Un perro pequeño en catalán es un… ¿cómo se escribe?', en: 'A small dog in Catalan is a… how is it written?', ca: 'Un gos petit és un… com s’escriu?' },
    choices: [{ label: 'gosset', speakAs: 'ca' }, { label: 'goset' }, { label: 'gozet' }], correct: 0,
  },
  {
    id: 'cat-greet', subject: 'catalan', kind: 'choice', scene: '🌅👋',
    prompt: { es: '¿Cómo se dice "buenos días" en catalán?', en: 'How do you say "good morning" in Catalan?', ca: 'Com es diu quan arribes a l’escola al matí?' },
    choices: [{ label: 'Bon dia', speakAs: 'ca' }, { label: 'Bona nit', speakAs: 'ca' }, { label: 'Adéu', speakAs: 'ca' }], correct: 0,
  },
  {
    id: 'cat-thanks', subject: 'catalan', kind: 'choice', scene: '🎁😊',
    prompt: { es: '¿Cómo se dice "gracias" en catalán?', en: 'How do you say "thank you" in Catalan?', ca: 'Què dius quan et fan un regal?' },
    choices: [{ label: 'Gràcies', speakAs: 'ca' }, { label: 'Hola', speakAs: 'ca' }, { label: 'Perdó', speakAs: 'ca' }], correct: 0,
  },

  // ───────────── INGLÉS (frases de clase) ─────────────
  {
    id: 'en-hello', subject: 'english', kind: 'choice', scene: '👋😀',
    prompt: { es: '¿Cómo se saluda en inglés?', en: 'How do you say hi?', ca: 'Com se saluda en anglès?' },
    choices: [{ label: 'Hello!', speakAs: 'en' }, { label: 'Goodbye!', speakAs: 'en' }, { label: 'Thank you!', speakAs: 'en' }], correct: 0,
  },
  {
    id: 'en-night', subject: 'english', kind: 'choice', scene: '🌙😴',
    prompt: { es: '¿Qué dices en inglés antes de dormir?', en: 'What do you say before bed?', ca: 'Què dius en anglès abans d’anar a dormir?' },
    choices: [{ label: 'Good night!', speakAs: 'en' }, { label: 'Good morning!', speakAs: 'en' }, { label: 'Happy birthday!', speakAs: 'en' }], correct: 0,
  },
  {
    id: 'en-howold', subject: 'english', kind: 'choice', scene: '🎂7️⃣',
    word: { text: 'How old are you?', lang: 'en' },
    prompt: { es: '¿Qué respondes?', en: 'What do you answer?', ca: 'Què respons?' },
    choices: [{ label: "I'm seven.", speakAs: 'en' }, { label: "I'm fine.", speakAs: 'en' }, { label: "I'm a dog.", speakAs: 'en' }], correct: 0,
  },
  {
    id: 'en-weather', subject: 'english', kind: 'choice', scene: '🌧️☂️',
    prompt: { es: '¿Qué tiempo hace?', en: "What's the weather like?", ca: 'Quin temps fa?' },
    choices: [{ label: "It's rainy.", speakAs: 'en' }, { label: "It's sunny.", speakAs: 'en' }, { label: "It's snowy.", speakAs: 'en' }], correct: 0,
  },
];

export const handWritten: Question[] = [...firstBatch, ...extraQuestions];
