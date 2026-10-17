export type Lang = 'es' | 'en' | 'ca';
export type L = Record<Lang, string>;

export const LANGS: Lang[] = ['es', 'en', 'ca'];

/** Locale para la voz que lee las preguntas en voz alta. */
export const speechLocale: Record<Lang, string> = { es: 'es-ES', en: 'en-GB', ca: 'ca-ES' };

export const ui = {
  appTitle: { es: 'Aventura Romana', en: 'Roman Adventure', ca: 'Aventura Romana' },
  chooseLang: { es: 'Elige tu idioma', en: 'Choose your language', ca: 'Tria el teu idioma' },
  langName: { es: 'Castellano', en: 'English', ca: 'Català' },
  play: { es: '¡A jugar!', en: "Let's play!", ca: 'A jugar!' },
  goal: {
    es: '15 retos · ¡acierta 10 para ganar la corona de laurel!',
    en: '15 challenges · get 10 right to win the laurel crown!',
    ca: '15 reptes · encerta’n 10 per guanyar la corona de llorer!',
  },
  question: { es: 'Reto', en: 'Challenge', ca: 'Repte' },
  next: { es: 'Seguir', en: 'Next', ca: 'Endavant' },
  true: { es: 'Verdadero', en: 'True', ca: 'Veritat' },
  false: { es: 'Falso', en: 'False', ca: 'Fals' },
  wellDone: { es: '¡Muy bien!', en: 'Well done!', ca: 'Molt bé!' },
  oops: { es: '¡Casi!', en: 'Almost!', ca: 'Gairebé!' },
  theAnswerWas: { es: 'La respuesta era:', en: 'The answer was:', ca: 'La resposta era:' },
  didYouKnow: { es: '¿Sabías que…?', en: 'Did you know…?', ca: 'Sabies que…?' },
  gotIt: { es: '¡Qué curioso!', en: 'Cool!', ca: 'Que curiós!' },
  watch: { es: 'Mira con atención…', en: 'Watch carefully…', ca: 'Mira amb atenció…' },
  replay: { es: 'Ver otra vez', en: 'Watch again', ca: 'Tornar-ho a veure' },
  ready: { es: '¡Ya lo vi!', en: 'I saw it!', ca: 'Ja ho he vist!' },
  check: { es: 'Comprobar', en: 'Check', ca: 'Comprovar' },
  winTitle: { es: '¡AVE, CAMPEÓN!', en: 'AVE, CHAMPION!', ca: 'AVE, CAMPIÓ!' },
  winText: {
    es: '¡Eres un auténtico legionario del saber! El emperador te regala la corona de laurel.',
    en: 'You are a true legionary of knowledge! The emperor gives you the laurel crown.',
    ca: 'Ets un autèntic legionari del saber! L’emperador et regala la corona de llorer.',
  },
  loseTitle: { es: '¡No te desanimes!', en: "Don't give up!", ca: 'No et desanimis!' },
  loseText: {
    es: 'Hasta los mejores legionarios entrenan muchas veces. ¡Inténtalo otra vez, tú puedes!',
    en: 'Even the best legionaries train many times. Try again, you can do it!',
    ca: 'Fins i tot els millors legionaris entrenen moltes vegades. Torna-ho a provar, tu pots!',
  },
  score: { es: 'Aciertos', en: 'Correct', ca: 'Encerts' },
  playAgain: { es: 'Jugar otra vez', en: 'Play again', ca: 'Tornar a jugar' },
  home: { es: 'Inicio', en: 'Home', ca: 'Inici' },
  coins: { es: 'Monedas de oro', en: 'Gold coins', ca: 'Monedes d’or' },
  crowns: { es: 'Coronas', en: 'Crowns', ca: 'Corones' },
  memoryHint: { es: 'Busca las parejas', en: 'Find the pairs', ca: 'Troba les parelles' },
  tapAll: { es: 'Toca todos', en: 'Tap all', ca: 'Toca tots' },
  quit: { es: '¿Salir?', en: 'Quit?', ca: 'Sortir?' },
} satisfies Record<string, L>;

export const subjectName: Record<string, L> = {
  math: { es: 'Mates', en: 'Maths', ca: 'Mates' },
  history: { es: 'Historia', en: 'History', ca: 'Història' },
  rome: { es: 'Roma', en: 'Rome', ca: 'Roma' },
  english: { es: 'Inglés', en: 'English', ca: 'Anglès' },
  catalan: { es: 'Catalán', en: 'Catalan', ca: 'Català' },
};
