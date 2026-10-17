import { Question } from './types';

/**
 * Más preguntas escritas a mano (segunda tanda), mismo formato que content.ts.
 * En 'choice', `correct` es el índice de la opción buena (se barajan al mostrar).
 */
export const extraQuestions: Question[] = [
  // ───────────── ARGENTINA ─────────────
  {
    id: 'arg-obelisco', subject: 'history', kind: 'choice', scene: '🇦🇷🏙️',
    prompt: { es: '¿Cuál es el monumento más famoso de Buenos Aires?', en: 'What is the most famous monument in Buenos Aires?', ca: 'Quin és el monument més famós de Buenos Aires?' },
    choices: [{ label: { es: 'El Obelisco', en: 'The Obelisk', ca: 'L’Obelisc' } }, { label: { es: 'La Torre Eiffel', en: 'The Eiffel Tower', ca: 'La Torre Eiffel' } }, { label: { es: 'El Coliseo', en: 'The Colosseum', ca: 'El Colosseu' } }], correct: 0,
  },
  {
    id: 'arg-dulce', subject: 'history', kind: 'tf', scene: '🥛🍯', sceneFlag: 'ar',
    prompt: { es: 'El dulce de leche es muy típico de Argentina.', en: 'Dulce de leche (milk caramel) is very typical of Argentina.', ca: 'El dolç de llet és molt típic de l’Argentina.' },
    answer: true,
  },
  {
    id: 'arg-asado', subject: 'history', kind: 'tf', scene: '🥩🔥', sceneFlag: 'ar',
    prompt: { es: 'En Argentina es típico comer asado con la familia.', en: 'In Argentina families often eat an "asado" (barbecue).', ca: 'A l’Argentina és típic menjar rostit a la brasa amb la família.' },
    answer: true,
  },
  {
    id: 'arg-empanadas', subject: 'history', kind: 'choice', scene: '🇦🇷🍽️',
    prompt: { es: '¿Cuál de estas comidas es típica de Argentina?', en: 'Which of these foods is typical of Argentina?', ca: 'Quin d’aquests menjars és típic de l’Argentina?' },
    choices: [{ label: { es: 'Empanadas 🥟', en: 'Empanadas 🥟', ca: 'Empanades 🥟' } }, { label: { es: 'Sushi 🍣', en: 'Sushi 🍣', ca: 'Sushi 🍣' } }, { label: { es: 'Tacos 🌮', en: 'Tacos 🌮', ca: 'Tacos 🌮' } }], correct: 0,
  },
  {
    id: 'arg-aconcagua', subject: 'history', kind: 'tf', scene: '🏔️', sceneFlag: 'ar',
    prompt: { es: 'La montaña más alta de América, el Aconcagua, está en Argentina.', en: 'The highest mountain in the Americas, Aconcagua, is in Argentina.', ca: 'La muntanya més alta d’Amèrica, l’Aconcagua, és a l’Argentina.' },
    answer: true,
  },
  {
    id: 'arg-colors', subject: 'history', kind: 'choice', scene: '🇦🇷❓',
    prompt: { es: '¿De qué colores es la bandera argentina?', en: 'What colours is the Argentine flag?', ca: 'De quins colors és la bandera argentina?' },
    choices: [{ label: '🔵⚪🔵' }, { label: '🔴🟡🔴' }, { label: '🟢⚪🔴' }], correct: 0,
  },
  {
    id: 'arg-mayo', subject: 'history', kind: 'tf', scene: '📜🎉', sceneFlag: 'ar',
    prompt: { es: 'El 25 de mayo de 1810 fue la Revolución de Mayo en Argentina.', en: 'The May Revolution in Argentina was on 25th May 1810.', ca: 'El 25 de maig de 1810 va ser la Revolució de Maig a l’Argentina.' },
    answer: true,
  },
  {
    id: 'arg-gaucho', subject: 'history', kind: 'choice', scene: '🤠🌾',
    prompt: { es: 'El gaucho es el jinete del campo argentino. ¿En qué animal monta?', en: 'The gaucho is the Argentine countryside rider. Which animal does he ride?', ca: 'El gautxo és el genet del camp argentí. Sobre quin animal munta?' },
    choices: [{ emoji: '🐴' }, { emoji: '🐫' }, { emoji: '🐘' }, { emoji: '🦒' }], correct: 0,
  },
  {
    id: 'arg-whales', subject: 'history', kind: 'tf', scene: '🐋🌊', sceneFlag: 'ar',
    prompt: { es: 'En la Península Valdés, en Argentina, se pueden ver ballenas.', en: 'In Península Valdés, in Argentina, you can see whales.', ca: 'A la Península Valdés, a l’Argentina, s’hi poden veure balenes.' },
    answer: true,
  },
  {
    id: 'arg-glacier', subject: 'history', kind: 'choice', scene: '🇦🇷🏔️',
    prompt: { es: 'El glaciar Perito Moreno es una montaña enorme de… ¿qué?', en: 'The Perito Moreno glacier is a huge mountain of… what?', ca: 'La glacera Perito Moreno és una muntanya enorme de… què?' },
    choices: [{ emoji: '🧊' }, { emoji: '🏖️' }, { emoji: '🌋' }, { emoji: '🌵' }], correct: 0,
  },
  {
    id: 'arg-messi', subject: 'history', kind: 'tf', scene: '⚽🐐', sceneFlag: 'ar',
    prompt: { es: 'Lionel Messi es un futbolista argentino.', en: 'Lionel Messi is an Argentine footballer.', ca: 'Lionel Messi és un futbolista argentí.' },
    answer: true,
  },
  {
    id: 'arg-worldcup', subject: 'history', kind: 'tf', scene: '🏆⚽', sceneFlag: 'ar',
    prompt: { es: 'Argentina ganó el Mundial de fútbol de 2022.', en: 'Argentina won the 2022 football World Cup.', ca: 'L’Argentina va guanyar el Mundial de futbol del 2022.' },
    answer: true,
  },
  {
    id: 'arg-ushuaia', subject: 'history', kind: 'tf', scene: '🐧🌎', sceneFlag: 'ar',
    prompt: { es: 'Ushuaia, en Argentina, es una de las ciudades más al sur del mundo.', en: 'Ushuaia, in Argentina, is one of the southernmost cities in the world.', ca: 'Ushuaia, a l’Argentina, és una de les ciutats més al sud del món.' },
    answer: true,
  },
  {
    id: 'arg-pampa', subject: 'history', kind: 'choice', scene: '🇦🇷🌾',
    prompt: { es: 'En la Pampa argentina, una gran llanura verde, hay muchísimas… ¿qué?', en: 'On the Argentine Pampas, a huge green plain, there are lots of… what?', ca: 'A la Pampa argentina, una gran plana verda, hi ha moltíssimes… què?' },
    choices: [{ emoji: '🐄' }, { emoji: '🐪' }, { emoji: '🐼' }, { emoji: '🦘' }], correct: 0,
  },
  {
    id: 'arg-sarmiento', subject: 'history', kind: 'tf', scene: '🏫✏️', sceneFlag: 'ar',
    prompt: { es: 'A Sarmiento lo llaman "el padre del aula" porque creó muchas escuelas.', en: 'Sarmiento is called "the father of the classroom" because he created many schools.', ca: 'A Sarmiento l’anomenen "el pare de l’aula" perquè va crear moltes escoles.' },
    answer: true,
  },
  {
    id: 'arg-language', subject: 'history', kind: 'choice', scene: '🇦🇷🗣️',
    prompt: { es: '¿Qué idioma se habla en Argentina?', en: 'Which language is spoken in Argentina?', ca: 'Quina llengua es parla a l’Argentina?' },
    choices: [{ label: { es: 'Castellano', en: 'Spanish', ca: 'Castellà' } }, { label: { es: 'Inglés', en: 'English', ca: 'Anglès' } }, { label: { es: 'Chino', en: 'Chinese', ca: 'Xinès' } }], correct: 0,
  },
  {
    id: 'arg-alfajor', subject: 'history', kind: 'tf', scene: '🍪🍫', sceneFlag: 'ar',
    prompt: { es: 'El alfajor es una golosina muy típica de Argentina.', en: 'The alfajor is a very typical Argentine sweet.', ca: 'L’alfajor és una llaminadura molt típica de l’Argentina.' },
    answer: true,
  },
  {
    id: 'arg-hornero', subject: 'history', kind: 'tf', scene: '🐦🏠',
    prompt: { es: 'El hornero, un pájaro argentino, hace su nido con barro.', en: 'The hornero, an Argentine bird, builds its nest out of mud.', ca: 'El forner, un ocell argentí, fa el niu amb fang.' },
    answer: true,
  },
  {
    id: 'arg-condor', subject: 'history', kind: 'choice', scene: '🏔️🏔️',
    prompt: { es: '¿Qué ave enorme vuela sobre los Andes?', en: 'Which huge bird flies over the Andes?', ca: 'Quin ocell enorme vola sobre els Andes?' },
    choices: [{ label: { es: 'El cóndor 🦅', en: 'The condor 🦅', ca: 'El còndor 🦅' } }, { label: { es: 'El pingüino 🐧', en: 'The penguin 🐧', ca: 'El pingüí 🐧' } }, { label: { es: 'La gallina 🐔', en: 'The hen 🐔', ca: 'La gallina 🐔' } }], correct: 0,
  },
  {
    id: 'arg-memory', subject: 'history', kind: 'memory',
    prompt: { es: 'Une cada cosa argentina con su dibujo', en: 'Match each Argentine thing with its picture', ca: 'Uneix cada cosa argentina amb el seu dibuix' },
    pairs: [
      [{ emoji: '🧉' }, { label: { es: 'mate', en: 'mate', ca: 'mate' } }],
      [{ emoji: '🐧' }, { label: { es: 'pingüino', en: 'penguin', ca: 'pingüí' } }],
      [{ emoji: '💃' }, { label: { es: 'tango', en: 'tango', ca: 'tango' } }],
      [{ emoji: '🐴' }, { label: { es: 'gaucho', en: 'gaucho', ca: 'gautxo' } }],
    ],
  },

  // ───────────── HISTORIA: ESPAÑA, CATALUÑA Y EL TIEMPO ─────────────
  {
    id: 'hist-sagrada', subject: 'history', kind: 'tf', scene: '⛪🏗️',
    prompt: { es: 'La Sagrada Familia de Barcelona la diseñó Gaudí.', en: 'The Sagrada Família in Barcelona was designed by Gaudí.', ca: 'La Sagrada Família de Barcelona la va dissenyar Gaudí.' },
    answer: true,
  },
  {
    id: 'hist-guell', subject: 'history', kind: 'choice', scene: '🌳🎨',
    prompt: { es: 'En el Park Güell de Gaudí hay un animal de mosaico muy famoso. ¿Cuál?', en: 'In Gaudí’s Park Güell there is a famous mosaic animal. Which one?', ca: 'Al Park Güell de Gaudí hi ha un animal de mosaic molt famós. Quin?' },
    choices: [{ emoji: '🦎' }, { emoji: '🐘' }, { emoji: '🐧' }, { emoji: '🦒' }], correct: 0,
  },
  {
    id: 'hist-montserrat', subject: 'history', kind: 'tf', scene: '⛰️⛪',
    prompt: { es: 'Montserrat es una montaña de Cataluña con rocas de formas muy curiosas.', en: 'Montserrat is a mountain in Catalonia with strangely shaped rocks.', ca: 'Montserrat és una muntanya de Catalunya amb roques de formes molt curioses.' },
    answer: true,
  },
  {
    id: 'hist-tio', subject: 'history', kind: 'choice', scene: '🪵🎁',
    prompt: { es: 'En Navidad, en Cataluña, los niños golpean un tronco que "caga" regalos. ¿Cómo se llama?', en: 'At Christmas in Catalonia, children hit a log that "poops" presents. What is it called?', ca: 'Per Nadal, a Catalunya, els nens piquen un tronc que "caga" regals. Com es diu?' },
    choices: [{ label: { es: 'Tió', en: 'Tió', ca: 'Tió' } }, { label: { es: 'Papá Noel', en: 'Father Christmas', ca: 'Pare Noel' } }, { label: { es: 'Conejo de Pascua', en: 'Easter Bunny', ca: 'Conill de Pasqua' } }], correct: 0,
  },
  {
    id: 'hist-sardana', subject: 'history', kind: 'tf', scene: '👐⭕🎶',
    prompt: { es: 'La sardana es un baile catalán que se baila en círculo, cogidos de la mano.', en: 'The sardana is a Catalan dance done in a circle, holding hands.', ca: 'La sardana és un ball català que es balla en rotllana, agafats de les mans.' },
    answer: true,
  },
  {
    id: 'hist-santjoan', subject: 'history', kind: 'tf', scene: '🔥🎆',
    prompt: { es: 'La noche de Sant Joan se celebra con hogueras y petardos.', en: 'Sant Joan’s night is celebrated with bonfires and fireworks.', ca: 'La nit de Sant Joan se celebra amb fogueres i petards.' },
    answer: true,
  },
  {
    id: 'hist-diada', subject: 'history', kind: 'choice', scene: '🎗️🎉',
    prompt: { es: '¿Qué día es la Diada, la fiesta de Cataluña?', en: 'When is the Diada, Catalonia’s national day?', ca: 'Quin dia és la Diada de Catalunya?' },
    choices: [{ label: { es: '11 de septiembre', en: '11th September', ca: '11 de setembre' } }, { label: { es: '25 de diciembre', en: '25th December', ca: '25 de desembre' } }, { label: { es: '1 de abril', en: '1st April', ca: '1 d’abril' } }], correct: 0,
  },
  {
    id: 'hist-reyes', subject: 'history', kind: 'tf', scene: '👑👑👑🎁',
    prompt: { es: 'El 6 de enero llegan los Reyes Magos con regalos.', en: 'On 6th January the Three Kings bring presents.', ca: 'El 6 de gener arriben els Reis d’Orient amb regals.' },
    answer: true,
  },
  {
    id: 'hist-correfoc', subject: 'history', kind: 'choice', scene: '🔥🥁',
    prompt: { es: 'En el correfoc de las fiestas catalanas, ¿quién corre con fuego?', en: 'In the Catalan correfoc, who runs with fire?', ca: 'Al correfoc, qui corre amb foc?' },
    choices: [{ emoji: '😈' }, { emoji: '🧜' }, { emoji: '🤖' }, { emoji: '👻' }], correct: 0,
  },
  {
    id: 'hist-altamira', subject: 'history', kind: 'tf', scene: '🦬🎨🪨',
    prompt: { es: 'En la Prehistoria, las personas pintaban animales en las cuevas, como en Altamira.', en: 'In prehistoric times people painted animals in caves, like in Altamira.', ca: 'A la Prehistòria, les persones pintaven animals a les coves, com a Altamira.' },
    answer: true,
  },
  {
    id: 'hist-fire', subject: 'history', kind: 'choice', scene: '🔥🧔',
    prompt: { es: 'En la Prehistoria, ¿con qué hacían fuego?', en: 'In prehistoric times, how did people make fire?', ca: 'A la Prehistòria, amb què feien foc?' },
    choices: [{ emoji: '🪨' }, { emoji: '🔌' }, { emoji: '📱' }, { emoji: '💡' }], correct: 0,
  },
  {
    id: 'hist-transport', subject: 'history', kind: 'order',
    prompt: { es: 'Ordena del más antiguo al más moderno', en: 'Put them in order, oldest first', ca: 'Ordena del més antic al més modern' },
    items: [{ emoji: '🐎' }, { emoji: '🚂' }, { emoji: '🚗' }, { emoji: '🚀' }],
  },
  {
    id: 'hist-light', subject: 'history', kind: 'order',
    prompt: { es: '¿Cómo se iluminaban? Ordena de lo más antiguo a lo más moderno', en: 'How did people get light? Oldest first', ca: 'Com s’il·luminaven? Ordena del més antic al més modern' },
    items: [{ emoji: '🔥' }, { emoji: '🕯️' }, { emoji: '💡' }],
  },
  {
    id: 'hist-life', subject: 'history', kind: 'order',
    prompt: { es: 'Ordena de más pequeño a más mayor', en: 'Put them in order, youngest first', ca: 'Ordena del més petit al més gran' },
    items: [{ emoji: '👶' }, { emoji: '🧒' }, { emoji: '🧑' }, { emoji: '👴' }],
  },
  {
    id: 'hist-caravels', subject: 'history', kind: 'tf', scene: '⛵⛵⛵',
    prompt: { es: 'Los barcos de Colón se llamaban la Pinta, la Niña y la Santa María.', en: 'Columbus’s ships were called the Pinta, the Niña and the Santa María.', ca: 'Els vaixells de Colom es deien la Pinta, la Niña i la Santa María.' },
    answer: true,
  },
  {
    id: 'hist-alhambra', subject: 'history', kind: 'choice', scene: '🕌🌙',
    prompt: { es: 'La Alhambra de Granada es un palacio construido por… ¿quién?', en: 'The Alhambra in Granada is a palace built by… whom?', ca: 'L’Alhambra de Granada és un palau construït per… qui?' },
    choices: [{ label: { es: 'Los musulmanes de al-Ándalus', en: 'The Muslims of al-Andalus', ca: 'Els musulmans d’al-Àndalus' } }, { label: { es: 'Los vikingos', en: 'The Vikings', ca: 'Els víkings' } }, { label: { es: 'Los astronautas', en: 'Astronauts', ca: 'Els astronautes' } }], correct: 0,
  },
  {
    id: 'hist-knights', subject: 'history', kind: 'tf', scene: '🐴🛡️⚔️',
    prompt: { es: 'Los caballeros de la Edad Media llevaban armadura.', en: 'Knights in the Middle Ages wore armour.', ca: 'Els cavallers de l’edat mitjana portaven armadura.' },
    answer: true,
  },
  {
    id: 'hist-moat', subject: 'history', kind: 'choice', scene: '🏰💧',
    prompt: { es: 'Muchos castillos tenían un foso con agua alrededor. ¿Para qué?', en: 'Many castles had a moat full of water around them. What for?', ca: 'Molts castells tenien un fossat amb aigua al voltant. Per a què?' },
    choices: [{ label: { es: 'Para defenderse 🛡️', en: 'For defence 🛡️', ca: 'Per defensar-se 🛡️' } }, { label: { es: 'Para nadar 🏊', en: 'For swimming 🏊', ca: 'Per nedar 🏊' } }, { label: { es: 'Para pescar 🎣', en: 'For fishing 🎣', ca: 'Per pescar 🎣' } }], correct: 0,
  },
  {
    id: 'hist-cervantes', subject: 'history', kind: 'tf', scene: '✍️📖🐴',
    prompt: { es: 'Miguel de Cervantes escribió Don Quijote.', en: 'Miguel de Cervantes wrote Don Quixote.', ca: 'Miguel de Cervantes va escriure el Quixot.' },
    answer: true,
  },
  {
    id: 'hist-flamenco', subject: 'history', kind: 'choice', scene: '🇪🇸💃',
    prompt: { es: '¿Qué baile es típico del sur de España?', en: 'Which dance is typical of southern Spain?', ca: 'Quin ball és típic del sud d’Espanya?' },
    choices: [{ label: 'Flamenco' }, { label: 'Tango' }, { label: 'Sardana' }], correct: 0,
  },
  {
    id: 'hist-paella', subject: 'history', kind: 'tf', scene: '🥘',
    prompt: { es: 'La paella es un plato típico de Valencia hecho con arroz.', en: 'Paella is a typical rice dish from Valencia.', ca: 'La paella és un plat típic de València fet amb arròs.' },
    answer: true,
  },
  {
    id: 'hist-old-new-2', subject: 'history', kind: 'memory',
    prompt: { es: 'Une lo de antes con lo de ahora', en: 'Match old things with new things', ca: 'Uneix el d’abans amb el d’ara' },
    pairs: [[{ emoji: '🪶' }, { emoji: '🖊️' }], [{ emoji: '⛵' }, { emoji: '🚢' }], [{ emoji: '🏰' }, { emoji: '🏢' }], [{ emoji: '🔥' }, { emoji: '♨️' }]],
  },
  {
    id: 'hist-dinos-old', subject: 'history', kind: 'tf', scene: '🦕🦖',
    prompt: { es: 'Los dinosaurios vivieron hace muchísimo tiempo, antes que las personas.', en: 'Dinosaurs lived a very long time ago, before people.', ca: 'Els dinosaures van viure fa moltíssim temps, abans que les persones.' },
    answer: true,
  },
  {
    id: 'hist-moon', subject: 'history', kind: 'tf', scene: '🧑‍🚀🌙',
    prompt: { es: 'Las personas ya han caminado sobre la Luna.', en: 'People have already walked on the Moon.', ca: 'Les persones ja han caminat sobre la Lluna.' },
    answer: true,
  },
  {
    id: 'hist-phone-old', subject: 'history', kind: 'tf', scene: '🏛️📱',
    prompt: { es: 'Los romanos tenían teléfonos móviles.', en: 'The Romans had mobile phones.', ca: 'Els romans tenien telèfons mòbils.' },
    answer: false,
  },

  // ───────────── ROMA ─────────────
  {
    id: 'rome-caesar', subject: 'rome', kind: 'tf', scene: '👑🏛️',
    prompt: { es: 'Julio César fue un famoso líder romano.', en: 'Julius Caesar was a famous Roman leader.', ca: 'Juli Cèsar va ser un famós líder romà.' },
    answer: true,
  },
  {
    id: 'rome-augustus', subject: 'rome', kind: 'tf', scene: '👑1️⃣',
    prompt: { es: 'El primer emperador de Roma fue Augusto.', en: 'The first Roman emperor was Augustus.', ca: 'El primer emperador de Roma va ser August.' },
    answer: true,
  },
  {
    id: 'rome-toga', subject: 'rome', kind: 'choice', scene: '🏛️👔',
    prompt: { es: '¿Qué ropa llevaban los ciudadanos romanos importantes?', en: 'What did important Roman citizens wear?', ca: 'Quina roba portaven els ciutadans romans importants?' },
    choices: [{ label: { es: 'Toga', en: 'Toga', ca: 'Toga' } }, { label: { es: 'Pijama', en: 'Pyjamas', ca: 'Pijama' } }, { label: { es: 'Vaqueros', en: 'Jeans', ca: 'Texans' } }], correct: 0,
  },
  {
    id: 'rome-legionary', subject: 'rome', kind: 'tf', scene: '⚔️🛡️',
    prompt: { es: 'Los soldados romanos se llamaban legionarios.', en: 'Roman soldiers were called legionaries.', ca: 'Els soldats romans s’anomenaven legionaris.' },
    answer: true,
  },
  {
    id: 'rome-roads', subject: 'rome', kind: 'tf', scene: '🛣️🪨',
    prompt: { es: 'Los romanos construyeron muchísimos caminos de piedra llamados calzadas.', en: 'The Romans built lots of stone roads.', ca: 'Els romans van construir moltíssims camins de pedra anomenats calçades.' },
    answer: true,
  },
  {
    id: 'rome-x-10', subject: 'rome', kind: 'tf', scene: 'X',
    prompt: { es: 'En números romanos, X vale 10.', en: 'In Roman numerals, X means 10.', ca: 'En nombres romans, X val 10.' },
    answer: true,
  },
  {
    id: 'rome-v-10', subject: 'rome', kind: 'tf', scene: 'V',
    prompt: { es: 'En números romanos, V vale 10.', en: 'In Roman numerals, V means 10.', ca: 'En nombres romans, V val 10.' },
    answer: false,
  },
  {
    id: 'rome-jupiter', subject: 'rome', kind: 'choice', scene: '👑☁️',
    prompt: { es: 'Júpiter era el rey de los dioses romanos. ¿Qué lanzaba?', en: 'Jupiter was the king of the Roman gods. What did he throw?', ca: 'Júpiter era el rei dels déus romans. Què llançava?' },
    choices: [{ emoji: '⚡' }, { emoji: '🍕' }, { emoji: '⚽' }, { emoji: '🎈' }], correct: 0,
  },
  {
    id: 'rome-neptune', subject: 'rome', kind: 'choice', scene: '🔱',
    prompt: { es: 'Neptuno era el dios romano del… ¿qué?', en: 'Neptune was the Roman god of the… what?', ca: 'Neptú era el déu romà del… què?' },
    choices: [{ emoji: '🌊' }, { emoji: '🔥' }, { emoji: '🌳' }, { emoji: '🌙' }], correct: 0,
  },
  {
    id: 'rome-gods-memory', subject: 'rome', kind: 'memory',
    prompt: { es: 'Une cada dios romano con su dibujo', en: 'Match each Roman god with its picture', ca: 'Uneix cada déu romà amb el seu dibuix' },
    pairs: [
      [{ emoji: '⚡' }, { label: { es: 'Júpiter', en: 'Jupiter', ca: 'Júpiter' } }],
      [{ emoji: '🌊' }, { label: { es: 'Neptuno', en: 'Neptune', ca: 'Neptú' } }],
      [{ emoji: '⚔️' }, { label: { es: 'Marte', en: 'Mars', ca: 'Mart' } }],
      [{ emoji: '💖' }, { label: { es: 'Venus', en: 'Venus', ca: 'Venus' } }],
    ],
  },
  {
    id: 'rome-circus', subject: 'rome', kind: 'choice', scene: '🏟️🏁',
    prompt: { es: 'En el Circo Máximo de Roma se hacían carreras de… ¿qué?', en: 'In Rome’s Circus Maximus there were races of… what?', ca: 'Al Circ Màxim de Roma s’hi feien curses de… què?' },
    choices: [{ emoji: '🐎' }, { emoji: '🚗' }, { emoji: '🚲' }, { emoji: '🛴' }], correct: 0,
  },
  {
    id: 'rome-mosaic', subject: 'rome', kind: 'tf', scene: '🧩🏛️',
    prompt: { es: 'Los romanos decoraban los suelos con mosaicos hechos de piedrecitas.', en: 'The Romans decorated floors with mosaics made of tiny stones.', ca: 'Els romans decoraven els terres amb mosaics fets de pedretes.' },
    answer: true,
  },
  {
    id: 'rome-food', subject: 'rome', kind: 'tf', scene: '🍞🫒🍇',
    prompt: { es: 'Los romanos comían pan, aceitunas y uvas.', en: 'The Romans ate bread, olives and grapes.', ca: 'Els romans menjaven pa, olives i raïm.' },
    answer: true,
  },
  {
    id: 'rome-fries', subject: 'rome', kind: 'tf', scene: '🏛️🍟',
    prompt: { es: 'Los romanos comían patatas fritas.', en: 'The Romans ate chips.', ca: 'Els romans menjaven patates fregides.' },
    answer: false,
  },
  {
    id: 'rome-chocolate', subject: 'rome', kind: 'tf', scene: '🏛️🍫',
    prompt: { es: 'Los romanos tomaban chocolate.', en: 'The Romans ate chocolate.', ca: 'Els romans menjaven xocolata.' },
    answer: false,
  },
  {
    id: 'rome-amphora', subject: 'rome', kind: 'choice', scene: '🫒🍇',
    prompt: { es: '¿Dónde guardaban los romanos el aceite y el vino?', en: 'Where did the Romans keep oil and wine?', ca: 'On guardaven els romans l’oli i el vi?' },
    choices: [{ emoji: '🏺' }, { emoji: '🥫' }, { emoji: '🧃' }, { emoji: '🍼' }], correct: 0,
  },
  {
    id: 'rome-sundial', subject: 'rome', kind: 'choice', scene: '⏳🏛️',
    prompt: { es: 'Los romanos sabían la hora con un reloj que usaba… ¿qué?', en: 'The Romans told the time with a clock that used… what?', ca: 'Els romans sabien l’hora amb un rellotge que feia servir… què?' },
    choices: [{ emoji: '☀️' }, { emoji: '🔋' }, { emoji: '📱' }, { emoji: '💡' }], correct: 0,
  },
  {
    id: 'rome-hills', subject: 'rome', kind: 'tf', scene: '⛰️⛰️⛰️⛰️⛰️⛰️⛰️',
    prompt: { es: 'Roma se construyó sobre siete colinas.', en: 'Rome was built on seven hills.', ca: 'Roma es va construir sobre set turons.' },
    answer: true,
  },
  {
    id: 'rome-tiber', subject: 'rome', kind: 'choice', scene: '🏛️🌊',
    prompt: { es: '¿Qué río pasa por Roma?', en: 'Which river flows through Rome?', ca: 'Quin riu passa per Roma?' },
    choices: [{ label: { es: 'El Tíber', en: 'The Tiber', ca: 'El Tíber' } }, { label: { es: 'El Amazonas', en: 'The Amazon', ca: 'L’Amazones' } }, { label: { es: 'El Nilo', en: 'The Nile', ca: 'El Nil' } }], correct: 0,
  },
  {
    id: 'rome-pantheon', subject: 'rome', kind: 'tf', scene: '🏛️🕳️☀️',
    prompt: { es: 'El Panteón de Roma tiene un gran agujero redondo en el techo.', en: 'The Pantheon in Rome has a big round hole in its roof.', ca: 'El Panteó de Roma té un gran forat rodó al sostre.' },
    answer: true,
  },
  {
    id: 'rome-merida', subject: 'rome', kind: 'choice', scene: '🎭🏛️',
    prompt: { es: '¿En qué ciudad de España hay un gran teatro romano?', en: 'Which Spanish city has a big Roman theatre?', ca: 'A quina ciutat d’Espanya hi ha un gran teatre romà?' },
    choices: [{ label: 'Mérida' }, { label: 'Nueva York' }, { label: 'Londres' }], correct: 0,
  },
  {
    id: 'rome-segovia', subject: 'rome', kind: 'tf', scene: '🌉💧',
    prompt: { es: 'El acueducto de Segovia lo construyeron los romanos.', en: 'The aqueduct of Segovia was built by the Romans.', ca: 'L’aqüeducte de Segòvia el van construir els romans.' },
    answer: true,
  },
  {
    id: 'rome-gladiator-shield', subject: 'rome', kind: 'choice', scene: '🏟️⚔️',
    prompt: { es: '¿Qué usaban los gladiadores para protegerse?', en: 'What did gladiators use to protect themselves?', ca: 'Què feien servir els gladiadors per protegir-se?' },
    choices: [{ emoji: '🛡️' }, { emoji: '☂️' }, { emoji: '🎈' }, { emoji: '🧸' }], correct: 0,
  },
  {
    id: 'rome-amphoras-tap', subject: 'rome', kind: 'tap', target: '🏺', others: ['🍇', '🛡️', '🪙', '🌿'], count: 6,
    prompt: { es: '¡El mercader ha perdido sus ánforas! Tócalas todas', en: 'The merchant lost his amphorae! Tap them all', ca: 'El mercader ha perdut les àmfores! Toca-les totes' },
  },
  {
    id: 'rome-numerals-order-2', subject: 'rome', kind: 'order',
    prompt: { es: 'Ordena los números romanos de menor a mayor', en: 'Put the Roman numerals in order, smallest first', ca: 'Ordena els nombres romans de més petit a més gran' },
    items: [{ label: 'II' }, { label: 'IV' }, { label: 'VI' }, { label: 'IX' }],
  },
  {
    id: 'rome-numerals-memory-2', subject: 'rome', kind: 'memory',
    prompt: { es: 'Une cada número romano con su número', en: 'Match each Roman numeral with its number', ca: 'Uneix cada nombre romà amb el seu nombre' },
    pairs: [[{ label: 'II' }, { label: '2' }], [{ label: 'IV' }, { label: '4' }], [{ label: 'VI' }, { label: '6' }], [{ label: 'XII' }, { label: '12' }]],
  },
  {
    id: 'rome-coins', subject: 'rome', kind: 'tf', scene: '🪙🛒',
    prompt: { es: 'Los romanos usaban monedas para comprar en el mercado.', en: 'The Romans used coins to buy things at the market.', ca: 'Els romans feien servir monedes per comprar al mercat.' },
    answer: true,
  },

  // ───────────── CATALÁN ─────────────
  {
    id: 'cat-days', subject: 'catalan', kind: 'order',
    prompt: { es: 'Ordena los días de la semana en catalán', en: 'Put the days of the week in order (Catalan)', ca: 'Ordena els dies de la setmana' },
    items: [{ label: 'dilluns', speakAs: 'ca' }, { label: 'dimarts', speakAs: 'ca' }, { label: 'dimecres', speakAs: 'ca' }, { label: 'dijous', speakAs: 'ca' }],
  },
  {
    id: 'cat-winter', subject: 'catalan', kind: 'choice', scene: '❄️⛄',
    prompt: { es: '¿Qué estación del año es? (en catalán)', en: 'Which season is it? (in Catalan)', ca: 'Quina estació de l’any és?' },
    choices: [{ label: 'hivern', speakAs: 'ca' }, { label: 'estiu', speakAs: 'ca' }, { label: 'primavera', speakAs: 'ca' }], correct: 0,
  },
  {
    id: 'cat-summer', subject: 'catalan', kind: 'choice', scene: '☀️🏖️',
    prompt: { es: '¿Qué estación del año es? (en catalán)', en: 'Which season is it? (in Catalan)', ca: 'Quina estació de l’any és?' },
    choices: [{ label: 'estiu', speakAs: 'ca' }, { label: 'hivern', speakAs: 'ca' }, { label: 'tardor', speakAs: 'ca' }], correct: 0,
  },
  {
    id: 'cat-autumn', subject: 'catalan', kind: 'choice', scene: '🍂🌰',
    prompt: { es: '¿Qué estación del año es? (en catalán)', en: 'Which season is it? (in Catalan)', ca: 'Quina estació de l’any és?' },
    choices: [{ label: 'tardor', speakAs: 'ca' }, { label: 'estiu', speakAs: 'ca' }, { label: 'primavera', speakAs: 'ca' }], correct: 0,
  },
  {
    id: 'cat-spring', subject: 'catalan', kind: 'choice', scene: '🌸🦋',
    prompt: { es: '¿Qué estación del año es? (en catalán)', en: 'Which season is it? (in Catalan)', ca: 'Quina estació de l’any és?' },
    choices: [{ label: 'primavera', speakAs: 'ca' }, { label: 'hivern', speakAs: 'ca' }, { label: 'tardor', speakAs: 'ca' }], correct: 0,
  },
  {
    id: 'cat-seasons-memory', subject: 'catalan', kind: 'memory',
    prompt: { es: 'Une cada estación con su nombre en catalán', en: 'Match each season with its Catalan name', ca: 'Uneix cada estació amb el seu nom' },
    pairs: [[{ emoji: '❄️' }, { label: 'hivern', speakAs: 'ca' }], [{ emoji: '☀️' }, { label: 'estiu', speakAs: 'ca' }], [{ emoji: '🍂' }, { label: 'tardor', speakAs: 'ca' }], [{ emoji: '🌸' }, { label: 'primavera', speakAs: 'ca' }]],
  },
  {
    id: 'cat-castanya', subject: 'catalan', kind: 'choice', scene: '🌰',
    prompt: { es: '¿Cómo se escribe en catalán?', en: 'How do you write it in Catalan?', ca: 'Com s’escriu?' },
    choices: [{ label: 'castanya', speakAs: 'ca' }, { label: 'castaña' }, { label: 'castania' }], correct: 0,
  },
  {
    id: 'cat-llibre', subject: 'catalan', kind: 'choice', scene: '📕',
    prompt: { es: '¿Cómo se escribe en catalán?', en: 'How do you write it in Catalan?', ca: 'Com s’escriu?' },
    choices: [{ label: 'llibre', speakAs: 'ca' }, { label: 'libre' }, { label: 'yibre' }], correct: 0,
  },
  {
    id: 'cat-canco', subject: 'catalan', kind: 'choice', scene: '🎵',
    prompt: { es: '¿Cómo se escribe "canción" en catalán?', en: 'How do you write "song" in Catalan?', ca: 'Com s’escriu «cançó»?' },
    choices: [{ label: 'cançó', speakAs: 'ca' }, { label: 'cansó' }, { label: 'canció' }], correct: 0,
  },
  {
    id: 'cat-peix', subject: 'catalan', kind: 'choice', scene: '🐟',
    prompt: { es: '¿Cómo se escribe en catalán?', en: 'How do you write it in Catalan?', ca: 'Com s’escriu?' },
    choices: [{ label: 'peix', speakAs: 'ca' }, { label: 'peish' }, { label: 'pex' }], correct: 0,
  },
  {
    id: 'cat-cotxe', subject: 'catalan', kind: 'choice', scene: '🚗',
    prompt: { es: '¿Cómo se escribe en catalán?', en: 'How do you write it in Catalan?', ca: 'Com s’escriu?' },
    choices: [{ label: 'cotxe', speakAs: 'ca' }, { label: 'coche' }, { label: 'cotche' }], correct: 0,
  },
  {
    id: 'cat-aigua', subject: 'catalan', kind: 'choice', scene: '💧',
    prompt: { es: '¿Cómo se escribe en catalán?', en: 'How do you write it in Catalan?', ca: 'Com s’escriu?' },
    choices: [{ label: 'aigua', speakAs: 'ca' }, { label: 'agua' }, { label: 'aiga' }], correct: 0,
  },
  {
    id: 'cat-petit', subject: 'catalan', kind: 'choice', scene: '🐘🐭',
    word: { text: 'Un elefant és gran. Un ratolí és…', lang: 'ca' },
    prompt: { es: 'Completa en catalán', en: 'Complete it in Catalan', ca: 'Completa la frase' },
    choices: [{ label: 'petit', speakAs: 'ca' }, { label: 'llarg', speakAs: 'ca' }, { label: 'blau', speakAs: 'ca' }], correct: 0,
  },
  {
    id: 'cat-plural', subject: 'catalan', kind: 'choice', scene: '🐱🐱',
    word: { text: 'Un gat, dos…', lang: 'ca' },
    prompt: { es: 'Completa en catalán', en: 'Complete it in Catalan', ca: 'Completa la frase' },
    choices: [{ label: 'gats', speakAs: 'ca' }, { label: 'gatos' }, { label: 'gates' }], correct: 0,
  },
  {
    id: 'cat-nena', subject: 'catalan', kind: 'choice', scene: '👦👧',
    word: { text: 'El nen i la…', lang: 'ca' },
    prompt: { es: 'Completa en catalán', en: 'Complete it in Catalan', ca: 'Completa la frase' },
    choices: [{ label: 'nena', speakAs: 'ca' }, { label: 'niña' }, { label: 'nenot' }], correct: 0,
  },
  {
    id: 'cat-bye', subject: 'catalan', kind: 'choice', scene: '👋🚪',
    prompt: { es: '¿Cómo se dice "adiós" en catalán?', en: 'How do you say "goodbye" in Catalan?', ca: 'Què dius quan te’n vas?' },
    choices: [{ label: 'Adéu', speakAs: 'ca' }, { label: 'Hola', speakAs: 'ca' }, { label: 'Bon dia', speakAs: 'ca' }], correct: 0,
  },
  {
    id: 'cat-please', subject: 'catalan', kind: 'choice', scene: '🙏🍪',
    prompt: { es: '¿Cómo se dice "por favor" en catalán?', en: 'How do you say "please" in Catalan?', ca: 'Què dius quan demanes una cosa?' },
    choices: [{ label: 'Si us plau', speakAs: 'ca' }, { label: 'Gràcies', speakAs: 'ca' }, { label: 'Adéu', speakAs: 'ca' }], correct: 0,
  },
  {
    id: 'cat-night', subject: 'catalan', kind: 'choice', scene: '🌙😴',
    prompt: { es: '¿Qué dices en catalán antes de dormir?', en: 'What do you say before bed in Catalan?', ca: 'Què dius abans d’anar a dormir?' },
    choices: [{ label: 'Bona nit', speakAs: 'ca' }, { label: 'Bon dia', speakAs: 'ca' }, { label: 'Bon profit', speakAs: 'ca' }], correct: 0,
  },
  {
    id: 'cat-gos-tf', subject: 'catalan', kind: 'tf', scene: '🐶', word: { text: 'gos', lang: 'ca' },
    prompt: { es: 'En catalán, a este animal se le dice "gos".', en: 'In Catalan, this animal is called "gos".', ca: 'Aquest animal es diu "gos".' },
    answer: true,
  },
  {
    id: 'cat-poma-tf', subject: 'catalan', kind: 'tf', scene: '🍐', word: { text: 'poma', lang: 'ca' },
    prompt: { es: 'En catalán, a esta fruta se le dice "poma".', en: 'In Catalan, this fruit is called "poma".', ca: 'Aquesta fruita es diu "poma".' },
    answer: false,
  },

  // ───────────── INGLÉS ─────────────
  {
    id: 'en-days', subject: 'english', kind: 'order',
    prompt: { es: 'Ordena los días de la semana en inglés', en: 'Put the days of the week in order', ca: 'Ordena els dies de la setmana en anglès' },
    items: [{ label: 'Monday', speakAs: 'en' }, { label: 'Tuesday', speakAs: 'en' }, { label: 'Wednesday', speakAs: 'en' }, { label: 'Thursday', speakAs: 'en' }],
  },
  {
    id: 'en-winter', subject: 'english', kind: 'choice', scene: '❄️⛄',
    prompt: { es: '¿Qué estación es? (en inglés)', en: 'Which season is it?', ca: 'Quina estació és? (en anglès)' },
    choices: [{ label: 'winter', speakAs: 'en' }, { label: 'summer', speakAs: 'en' }, { label: 'spring', speakAs: 'en' }], correct: 0,
  },
  {
    id: 'en-summer', subject: 'english', kind: 'choice', scene: '☀️🏖️',
    prompt: { es: '¿Qué estación es? (en inglés)', en: 'Which season is it?', ca: 'Quina estació és? (en anglès)' },
    choices: [{ label: 'summer', speakAs: 'en' }, { label: 'winter', speakAs: 'en' }, { label: 'autumn', speakAs: 'en' }], correct: 0,
  },
  {
    id: 'en-seasons-memory', subject: 'english', kind: 'memory',
    prompt: { es: 'Une cada estación con su nombre en inglés', en: 'Match each season with its name', ca: 'Uneix cada estació amb el seu nom en anglès' },
    pairs: [[{ emoji: '❄️' }, { label: 'winter', speakAs: 'en' }], [{ emoji: '☀️' }, { label: 'summer', speakAs: 'en' }], [{ emoji: '🍂' }, { label: 'autumn', speakAs: 'en' }], [{ emoji: '🌸' }, { label: 'spring', speakAs: 'en' }]],
  },
  {
    id: 'en-howareyou', subject: 'english', kind: 'choice', scene: '🙂❓',
    word: { text: 'How are you?', lang: 'en' },
    prompt: { es: '¿Qué respondes?', en: 'What do you answer?', ca: 'Què respons?' },
    choices: [{ label: "I'm fine, thank you.", speakAs: 'en' }, { label: "I'm seven.", speakAs: 'en' }, { label: 'Goodbye!', speakAs: 'en' }], correct: 0,
  },
  {
    id: 'en-name', subject: 'english', kind: 'choice', scene: '👦❓',
    word: { text: "What's your name?", lang: 'en' },
    prompt: { es: '¿Qué respondes?', en: 'What do you answer?', ca: 'Què respons?' },
    choices: [{ label: 'My name is Tiano.', speakAs: 'en' }, { label: "It's blue.", speakAs: 'en' }, { label: "I'm a cat.", speakAs: 'en' }], correct: 0,
  },
  {
    id: 'en-sky', subject: 'english', kind: 'choice', scene: '🌤️',
    prompt: { es: '¿De qué color es el cielo? (en inglés)', en: 'What colour is the sky?', ca: 'De quin color és el cel? (en anglès)' },
    choices: [{ label: 'blue', speakAs: 'en' }, { label: 'red', speakAs: 'en' }, { label: 'green', speakAs: 'en' }], correct: 0,
  },
  {
    id: 'en-banana', subject: 'english', kind: 'choice', scene: '🍌',
    prompt: { es: '¿De qué color es? (en inglés)', en: 'What colour is it?', ca: 'De quin color és? (en anglès)' },
    choices: [{ label: 'yellow', speakAs: 'en' }, { label: 'purple', speakAs: 'en' }, { label: 'black', speakAs: 'en' }], correct: 0,
  },
  {
    id: 'en-big', subject: 'english', kind: 'choice', scene: '🐘',
    word: { text: 'The elephant is…', lang: 'en' },
    prompt: { es: 'Completa en inglés', en: 'Complete the sentence', ca: 'Completa en anglès' },
    choices: [{ label: 'big', speakAs: 'en' }, { label: 'small', speakAs: 'en' }, { label: 'blue', speakAs: 'en' }], correct: 0,
  },
  {
    id: 'en-happy', subject: 'english', kind: 'choice', scene: '😀',
    prompt: { es: '¿Cómo se siente? (en inglés)', en: 'How does he feel?', ca: 'Com se sent? (en anglès)' },
    choices: [{ label: 'happy', speakAs: 'en' }, { label: 'sad', speakAs: 'en' }, { label: 'angry', speakAs: 'en' }], correct: 0,
  },
  {
    id: 'en-sad', subject: 'english', kind: 'choice', scene: '😢',
    prompt: { es: '¿Cómo se siente? (en inglés)', en: 'How does he feel?', ca: 'Com se sent? (en anglès)' },
    choices: [{ label: 'sad', speakAs: 'en' }, { label: 'happy', speakAs: 'en' }, { label: 'hungry', speakAs: 'en' }], correct: 0,
  },
  {
    id: 'en-three', subject: 'english', kind: 'choice', scene: '🍎🍎🍎',
    word: { text: 'How many apples?', lang: 'en' },
    prompt: { es: '¿Cuántas hay? (en inglés)', en: 'How many?', ca: 'Quantes n’hi ha? (en anglès)' },
    choices: [{ label: 'three', speakAs: 'en' }, { label: 'five', speakAs: 'en' }, { label: 'one', speakAs: 'en' }], correct: 0,
  },
  {
    id: 'en-standup', subject: 'english', kind: 'choice',
    word: { text: 'Stand up!', lang: 'en' },
    prompt: { es: '¿Qué dibujo es?', en: 'Which picture is it?', ca: 'Quin dibuix és?' },
    choices: [{ emoji: '🧍' }, { emoji: '🪑' }, { emoji: '😴' }, { emoji: '🏊' }], correct: 0,
  },
  {
    id: 'en-swim', subject: 'english', kind: 'choice',
    word: { text: 'I can swim!', lang: 'en' },
    prompt: { es: '¿Qué dibujo es?', en: 'Which picture is it?', ca: 'Quin dibuix és?' },
    choices: [{ emoji: '🏊' }, { emoji: '🚴' }, { emoji: '😴' }, { emoji: '🍽️' }], correct: 0,
  },
  {
    id: 'en-birthday', subject: 'english', kind: 'choice', scene: '🎂🎉',
    prompt: { es: '¿Qué se dice en inglés en un cumpleaños?', en: 'What do you say on a birthday?', ca: 'Què es diu en anglès en un aniversari?' },
    choices: [{ label: 'Happy birthday!', speakAs: 'en' }, { label: 'Good night!', speakAs: 'en' }, { label: 'Sit down!', speakAs: 'en' }], correct: 0,
  },
  {
    id: 'en-red-tf', subject: 'english', kind: 'tf', scene: '🍓', word: { text: 'red', lang: 'en' },
    prompt: { es: 'Las fresas son "red" (rojas en inglés).', en: 'Strawberries are red.', ca: 'Les maduixes són "red" (vermelles en anglès).' },
    answer: true,
  },
];
