# 🔍 Análisis de Aventura Romana: requisitos, incoherencias y preguntas

## 1. Requisitos y cómo se cumplen

| Pedido | Cómo está resuelto |
|---|---|
| Para un niño de 7 años y medio en 2.º de primaria en Cataluña | Contenidos de *cicle inicial* (Decret 175/2022), ver punto 2 |
| Didáctica, académica y lúdica | Cada reto es un minijuego. Monedas por acierto, coronas por partida ganada, personajes animados, sonidos y vibración |
| Mates, historia de España, Argentina y Roma, inglés y catalán | 5 + 3 + 2 + 3 + 2 retos por partida; historia siempre con al menos 1 de Argentina y 1 de España/Cataluña |
| Ambientada en la antigua Roma | Fondo con Coliseo y columnas, tipografía romana (Cinzel), paleta mármol/terracota/oro/púrpura, personajes (legionario, senadora, emperador), escudos, monedas, SPQR |
| Captar la atención más de 15 minutos | Ver incoherencia **B** |
| Cada vez que se entra, una sesión nueva de 15 preguntas | Mates y vocabulario se generan al azar en cada partida; las preguntas escritas a mano no se repiten en partidas seguidas |
| Mínimo 10 bien | 10 o más aciertos = partida ganada |
| Más visual que escrito | Emojis grandes, banderas y relojes dibujados, frases cortas y **todo se lee en voz alta** |
| Verdadero/falso, opción múltiple, vídeos, cuentas, juegos | 8 tipos de reto: V/F, opciones, cuentas (con dibujos o teclado), "vídeos" animados, memoria, ordenar, tocar todos, deletrear (+ escuchar) |
| 10 bien → romano felicitando | Legionario y emperador saltando, confeti, trofeo y fanfarria: «¡Ave, Tiano!» |
| Más de 5 mal → romano triste que anima | En el 6.º fallo la partida termina y sale el legionario triste (con lagrimita) con mensaje de ánimo y botón grande "Jugar otra vez" |
| Romanitos con curiosidades de Roma | 22 curiosidades (garum, testudo, termas, Tarraco…); salen 3 por partida y se evita repetir las ya vistas |
| iOS y Android | Expo / React Native: el mismo código genera las dos apps |
| En mi GitHub | Carpeta `aventura-romana/` + flujos de GitHub Actions que generan el APK y el IPA |
| Selector de idioma al inicio | Tres banderas en la pantalla de inicio; recuerda la última elección |
| Funcionar localmente y sin conexión | Todo va dentro de la app (fuentes, sonidos, dibujos, preguntas). En Android ni siquiera tiene permiso de internet |

## 2. Adaptación al currículo de 2.º (cicle inicial, Decret 175/2022)

- **Matemàtiques**: números hasta el 100, decenas y unidades, comparar (incluida la trampa 47/74),
  sumas y restas con y sin llevar, iniciación a la multiplicación como grupos, dobles y mitades,
  series de 2 en 2, de 5 en 5 y de 10 en 10, monedas y billetes en euros, la hora (en punto e "y media"),
  figuras planas y lados, números romanos del I al XII.
- **Coneixement del medi (historia)**: el paso del tiempo (antes/ahora, línea del tiempo dinosaurios →
  romanos → castillos → coches), tradiciones catalanas (Sant Jordi, castellers, Castanyada),
  la Tarraco y la Barcino romanas, símbolos de Cataluña, España y Argentina.
- **Llengua anglesa**: vocabulario típico de 2.º (animales, comida, cuerpo, ropa, colores, números,
  familia, tiempo, escuela), saludos y frases de clase ("How old are you?").
- **Llengua catalana**: vocabulario, ortografía de 2.º (ny, ll, ç, ss) y fórmulas de cortesía.

No pude abrir el texto completo de los "sabers" de 2.º en el portal del Departament, así que el nivel se
basa en el marco del Decret 175/2022 y en los materiales habituales de *cicle inicial*. **Lo ideal es
comparar con los temas que le mandan del cole** (ver preguntas).

## 3. Incoherencias o puntos ambiguos detectados (y qué decidí)

**A. "10 bien" frente a "más de 5 mal".** Con 15 preguntas las dos reglas son exactamente
complementarias: 10 bien = 5 mal → romano feliz; 9 bien = 6 mal → romano triste. No hay ningún
resultado que quede sin respuesta ni que active las dos. Entendí "si responde bien 10" como
**"10 o más"**.

**B. "Más de 15 minutos" con solo 15 preguntas.** Un niño responde una pregunta sencilla en 10-30 segundos:
15 preguntas son unos **6-10 minutos**. Para alargar sin aburrir, metí juegos más largos (memoria,
deletrear, vídeos con "ver otra vez"), 3 curiosidades por partida y premios (monedas y coronas) que invitan
a "Jugar otra vez". Pero 15 retos no van a llegar siempre a 15 minutos. Ver pregunta 1.

**C. "Más visual que escrito" frente a historia.** La historia necesita algo de texto ("¿Qué día es la
Independencia de Argentina?"). Lo compensé con frases muy cortas, dibujos y la **voz que lee todo**.
Aun así, algunas preguntas de historia piden leer un poco.

**D. "Vídeos" frente a "sin conexión".** Los vídeos reales (YouTube) necesitan internet, tienen derechos de
autor y anuncios, y Apple y Google son estrictos con eso en apps infantiles. Por eso los "vídeos" son
**escenas animadas propias**, dentro de la app: desfile de legionarios, cofre de monedas con un águila
que roba, carrera de cuadrigas, reloj que gira y series que aparecen.

**E. Selector de idioma frente a asignaturas de inglés y catalán.** Si eligen **inglés** como idioma, las
preguntas "de inglés" dejan de ser un reto. Lo resolví así: la instrucción va en el idioma elegido, pero
**la palabra que se aprende siempre va en inglés o catalán** (y suena con voz inglesa o catalana). Ver
pregunta 3.

**F. Historia de Argentina.** No está en el currículo catalán. La incluí (supongo que por familia) con
contenidos básicos y simpáticos: bandera, Sol de Mayo, Belgrano, San Martín, 9 de julio, mate, tango,
pingüinos, Iguazú.

**G. "Historia de España" en 2.º.** En *cicle inicial* no se estudian reyes ni fechas, sino el paso del
tiempo y el entorno. Por eso la historia es de "antes y ahora", tradiciones y la Hispania romana.
Colón (1492) y Don Quijote son lo más "de libro".

**H. "Cada vez que entres, sesión nueva".** ✅ Decidido: si cierra la app a mitad de partida, el progreso se
pierde y empieza de nuevo. (Si solo cambia de app un momento sin cerrarla, sigue donde estaba.)

**I. "Romano triste si responde más de 5 mal".** ✅ Decidido: **en el 6.º fallo** la partida termina en ese
momento (después de ver la respuesta correcta) y sale el romano triste.

**J. App iOS "instalable".** Para instalar en un iPhone sin pasar por el App Store, Apple obliga a firmar
la app: con Apple ID gratis caduca cada 7 días, y con cuenta de desarrollador cuesta 99 €/año. Está
explicado en `INSTALAR.md`.

**K. Voz en catalán.** iOS trae voz catalana. En algunos Android hay que descargar la voz catalana
una vez (luego funciona sin internet).

## 4. Decisiones técnicas

- **Expo + React Native + TypeScript**: un solo código para iOS y Android, con animaciones fluidas.
- **Personajes y escenarios en SVG** dibujados en código: nítidos en cualquier pantalla y sin depender de
  imágenes con derechos.
- **Sonidos generados por un script** (`scripts/make-sounds.js`): sin archivos de terceros.
- **Sin servidor, sin cuentas, sin anuncios, sin recogida de datos.** Solo guarda en el móvil el idioma,
  las monedas y las coronas.
- **Calidad**: tipos (`tsc`), lint, un script que genera **3000 partidas** y valida cada pregunta
  (respuesta correcta presente, opciones sin repetir, variedad), y un robot que juega partidas completas
  en el navegador en los 3 idiomas, con internet bloqueado.

## 5. Preguntas sobre la lógica de la app

**Respuestas recibidas:** se pasa a `main` ✅ · 15 retos por partida, sin modo libre ✅ · los romanos le llaman
**Tiano** ✅ · no hay temario del cole (se mantiene el currículo general) ✅ · si cierra la app se pierde la partida ✅ ·
romano triste en el 6.º fallo ✅.

Preguntas originales:

1. **Duración**: ¿prefieres **más retos** por partida (por ejemplo 20) o mantener 15? ¿O un modo
   "entrenamiento" sin límite después de terminar?
2. **Dificultad**: ¿lo ajusto según cómo le va (si acierta mucho, cuentas más difíciles)? ¿Qué tal va con
   las sumas y restas llevando y con la hora?
3. **Idioma inglés**: si elige inglés como idioma de la app, ¿quito las preguntas de inglés y pongo más de
   catalán y castellano? (Y lo mismo con catalán.)
4. **Temas del cole**: ¿tienes el listado de temas de este trimestre (libro de mates, proyecto de medi,
   unidad de inglés)? Así ajusto el contenido exacto.
5. **Su nombre**: ¿quieres que los romanos le llamen por su nombre ("¡Ave, Martín!")?
6. **Salir a mitad**: si cierra la app a mitad de partida, ¿debe continuar donde estaba o empezar una nueva?
7. **Romano triste**: ¿al final de la partida (como está ahora) o justo al sexto fallo?
8. **Segunda oportunidad**: si falla, ¿le dejo intentarlo otra vez antes de mostrar la respuesta correcta?
   (Ahora se marca la correcta en verde y sigue.)
9. **Premios**: ¿quieres una "colección" que se desbloquee con las monedas (cascos, escudos, animales del
   Coliseo) para que tenga ganas de volver?
10. **Control para adultos**: ¿una pantalla con su historial (qué materias falla más) protegida con una
    cuenta sencilla?
11. **Castellano de Argentina o de España** en los textos (por ejemplo "vos/tú")? Ahora está en castellano
    de España, por el cole.
12. **Tiempo de pantalla**: ¿un límite (por ejemplo 2 partidas al día) o un aviso de descanso?

## 6. Cambios de la versión 1.1

- **Menos repeticiones**: antes había solo 49 preguntas escritas a mano y la app olvidaba las ya vistas al
  cerrarse. Ahora hay 157 y el teléfono recuerda las vistas: no se repite ninguna hasta agotar su grupo
  (Argentina, España/Cataluña, Roma, inglés, catalán). En una simulación de 20 partidas seguidas no se
  repitió ninguna.
- **Curiosidades**: de 22 a 102 (Roma, España/Cataluña y Argentina), sin repetir hasta verlas todas.
- **Más difícil**: 4 opciones en lugar de 3; sumas y restas de dos cifras llevando; números de tres cifras;
  tablas del 2, 5 y 10; problemas con Tiano; número que falta (8 + ? = 15); series hacia atrás y de 100 en 100;
  la hora con cuartos; números romanos hasta el XX; memoria de 6 parejas; deletreo con más letras falsas.
- **Imágenes 3D** (Microsoft Fluent Emoji, licencia MIT) en lugar de emojis. No se usan fotos de internet
  porque casi todas tienen derechos de autor y no tendrían un estilo uniforme.

## 7. Cambios de la versión 1.2

- **Voz más natural**: 1.075 frases grabadas con voces neuronales Piper (catalán "ona", castellano "mls_9972",
  inglés británico), dentro de la app y sin internet. El catalán ya lo pronuncia una voz catalana, no una
  castellana. Las frases que cambian cada partida (problemas con números) las lee la mejor voz del teléfono.
  Si se añaden preguntas, hay que volver a ejecutar `scripts/list-speech.ts` y `scripts/make-voice.py`
  (las pruebas avisan si falta alguna grabación).
- **Carrera de cuadrigas**: los caballos empiezan alineados en la salida y, al llegar el ganador, los demás se
  quedan donde están (antes acababan todos en la meta y no se veía quién había ganado).
- **Memoria en iPhone**: ajuste del tamaño del texto de las cartas. Pendiente de confirmar con una captura.

