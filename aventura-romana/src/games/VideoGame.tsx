import { useCallback, useEffect, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { BigButton } from '../components/BigButton';
import { Clock } from '../components/Clock';
import { Romanito } from '../components/Romanito';
import { ui } from '../i18n';
import { VideoScene } from '../questions/types';
import { play } from '../sound';
import { colors, fonts, shadow } from '../theme';
import { ChoiceGrid } from './ChoiceGame';
import { GameProps } from './types';
import { Emoji } from '../components/Emoji';

const STAGE_W = 340;
const STAGE_H = 210;

/**
 * "Vídeo": una escena animada corta. Primero se mira (se puede repetir) y luego se responde.
 * En el desfile y el cofre la escena se esconde al responder: hay que recordar/contar.
 */
export function VideoGame({ q, lang, onAnswer }: GameProps<'video'>) {
  const [phase, setPhase] = useState<'watch' | 'ended' | 'answer'>('watch');
  const [run, setRun] = useState(0);
  const onEnd = useCallback(() => setPhase((p) => (p === 'watch' ? 'ended' : p)), []);
  const hideOnAnswer = q.video.type === 'march' || q.video.type === 'coins' || q.video.type === 'race';

  return (
    <View style={styles.wrap}>
      {!(phase === 'answer' && hideOnAnswer) && (
        <View style={styles.screen}>
          <View style={styles.stage}>
            <Scene key={run} scene={q.video} onEnd={onEnd} />
          </View>
          <View style={styles.tv}>
            <Text style={styles.tvText}>{phase === 'watch' ? `🎬 ${ui.watch[lang]}` : '🎬'}</Text>
          </View>
        </View>
      )}
      {phase === 'ended' && (
        <View style={styles.buttons}>
          <BigButton
            label={`🔁 ${ui.replay[lang]}`}
            color={colors.purple}
            shade={colors.purpleDark}
            onPress={() => {
              setRun((r) => r + 1);
              setPhase('watch');
            }}
          />
          <BigButton label={`👍 ${ui.ready[lang]}`} color={colors.ok} shade={colors.okDark} onPress={() => setPhase('answer')} />
        </View>
      )}
      {phase === 'answer' && <ChoiceGrid choices={q.choices} correct={q.correct} lang={lang} onAnswer={onAnswer} />}
    </View>
  );
}

function Scene({ scene, onEnd }: { scene: VideoScene; onEnd: () => void }) {
  switch (scene.type) {
    case 'march':
      return <March count={scene.count} onEnd={onEnd} />;
    case 'coins':
      return <CoinChest {...scene} onEnd={onEnd} />;
    case 'race':
      return <Race winner={scene.winner} onEnd={onEnd} />;
    case 'clock':
      return (
        <View style={styles.center}>
          <Clock h={scene.h} m={scene.m} size={180} spin onDone={onEnd} />
        </View>
      );
    case 'pattern':
      return <Pattern seq={scene.seq} onEnd={onEnd} />;
  }
}

/** Los legionarios desfilan uno detrás de otro de derecha a izquierda. */
function March({ count, onEnd }: { count: number; onEnd: () => void }) {
  const [anims] = useState(() => Array.from({ length: count }, () => new Animated.Value(0)));
  useEffect(() => {
    const gap = 650;
    Animated.stagger(
      gap,
      anims.map((a) => Animated.timing(a, { toValue: 1, duration: 2600, easing: Easing.linear, useNativeDriver: true })),
    ).start(() => onEnd());
    const timers = anims.map((_, i) => setTimeout(() => play('pop'), i * gap + 900));
    return () => timers.forEach(clearTimeout);
  }, [anims, onEnd]);

  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={styles.road} />
      {anims.map((a, i) => (
        <Animated.View
          key={i}
          style={[
            styles.marcher,
            { transform: [{ translateX: a.interpolate({ inputRange: [0, 1], outputRange: [STAGE_W + 10, -100] }) }] },
          ]}
        >
          <Romanito kind="legionario" mood="neutral" size={78} />
        </Animated.View>
      ))}
    </View>
  );
}

/** Cofre: se guardan monedas, llegan más, y un águila se lleva algunas. */
function CoinChest({ start, add, remove, onEnd }: { start: number; add: number; remove: number; onEnd: () => void }) {
  const [step, setStep] = useState<'show' | 'store' | 'add' | 'eagle' | 'done'>('show');
  const [moving, setMoving] = useState<{ key: number; dir: 'in' | 'out' } | null>(null);
  const [fly] = useState(() => new Animated.Value(0));
  const [storeAnim] = useState(() => new Animated.Value(0));

  useEffect(() => {
    let cancelled = false;
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const moveCoin = (dir: 'in' | 'out', key: number) =>
      new Promise<void>((resolve) => {
        if (cancelled) return resolve();
        setMoving({ key, dir });
        fly.setValue(0);
        play('pop');
        Animated.timing(fly, { toValue: 1, duration: 650, easing: Easing.inOut(Easing.quad), useNativeDriver: true }).start(() => resolve());
      });
    (async () => {
      await wait(1800);
      if (cancelled) return;
      setStep('store');
      await new Promise<void>((r) => Animated.timing(storeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(() => r()));
      setStep('add');
      for (let i = 0; i < add; i++) {
        await moveCoin('in', i);
        await wait(250);
      }
      setMoving(null);
      setStep('eagle');
      await wait(700);
      for (let i = 0; i < remove; i++) {
        await moveCoin('out', 100 + i);
        await wait(250);
      }
      setMoving(null);
      setStep('done');
      await wait(600);
      if (!cancelled) onEnd();
    })();
    return () => {
      cancelled = true;
    };
  }, [add, remove, fly, storeAnim, onEnd]);

  const coinY = moving?.dir === 'in' ? fly.interpolate({ inputRange: [0, 1], outputRange: [-10, 120] }) : fly.interpolate({ inputRange: [0, 1], outputRange: [120, -10] });
  const coinX = moving?.dir === 'in' ? fly.interpolate({ inputRange: [0, 1], outputRange: [40, 150] }) : fly.interpolate({ inputRange: [0, 1], outputRange: [150, 250] });

  return (
    <View style={StyleSheet.absoluteFill}>
      {(step === 'show' || step === 'store') && (
        <Animated.View
          style={[
            styles.coinRow,
            {
              opacity: storeAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }),
              transform: [{ translateY: storeAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 100] }) }, { scale: storeAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0.4] }) }],
            },
          ]}
        >
          <View style={styles.coinsRow}>
            {Array.from({ length: start }).map((_, i) => (
              <Emoji key={i} char="🪙" size={34} />
            ))}
          </View>
        </Animated.View>
      )}
      {(step === 'eagle' || (step === 'done' && remove > 0)) && <Emoji char="🦅" size={70} style={styles.eagle} />}
      <Emoji char="🧰" size={100} style={styles.chest} />
      {moving && (
        <Animated.View key={moving.key} style={[styles.flyingCoin, { transform: [{ translateX: coinX }, { translateY: coinY }] }]}>
          <Emoji char="🪙" size={40} />
        </Animated.View>
      )}
      {step === 'add' && <Emoji char="➕" size={40} style={styles.plus} />}
      {step === 'eagle' && <Emoji char="➖" size={40} style={styles.minus} />}
    </View>
  );
}

const RACE_COLORS = ['🔴', '🔵', '🟢', '⚪'];

/** Carrera de cuadrigas: 4 equipos (como en el Circo Máximo). Gana el color indicado. */
const RACE_START = 12;
const RACE_END = STAGE_W - 92; // el morro del caballo llega justo a la meta

function Race({ winner, onEnd }: { winner: number; onEnd: () => void }) {
  // Cada caballo empieza en la línea de salida (izquierda); sólo se mueven los caballos, no los carriles.
  const [pos] = useState(() => RACE_COLORS.map(() => new Animated.Value(RACE_START)));
  useEffect(() => {
    pos.forEach((p) => p.setValue(RACE_START));
    const durations = RACE_COLORS.map((_, i) => (i === winner ? 3000 : 3400 + Math.random() * 900));
    const runs = pos.map((p, i) =>
      Animated.timing(p, { toValue: RACE_END, duration: durations[i], easing: Easing.inOut(Easing.sin), useNativeDriver: false }),
    );
    // Pequeña pausa en la salida para que se vea a todos alineados antes de arrancar.
    const t = setTimeout(() => {
      runs.forEach((r, i) =>
        r.start(({ finished }) => {
          // Cuando llega el ganador, los demás se quedan donde están: así se ve quién ganó.
          if (i === winner && finished) {
            runs.forEach((other, j) => j !== winner && other.stop());
            onEnd();
          }
        }),
      );
    }, 700);
    return () => {
      clearTimeout(t);
      runs.forEach((r) => r.stop());
    };
  }, [pos, winner, onEnd]);
  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={styles.startLine} />
      <View style={styles.finish} />
      <Emoji char="🏁" size={30} style={styles.flag} />
      {RACE_COLORS.map((c, i) => (
        <View key={i} style={[styles.lane, { top: 8 + i * 50 }]}>
          <Animated.View style={[styles.horseRow, { left: pos[i] }]}>
            <Emoji char={c} size={20} />
            <Emoji char="🐎" size={40} style={styles.horse} />
          </Animated.View>
        </View>
      ))}
    </View>
  );
}

/** Serie: los objetos aparecen uno a uno y al final un hueco con "?". */
function Pattern({ seq, onEnd }: { seq: string[]; onEnd: () => void }) {
  const [anims] = useState(() => [...seq, '❓'].map(() => new Animated.Value(0)));
  useEffect(() => {
    Animated.stagger(
      450,
      anims.map((a) => Animated.spring(a, { toValue: 1, useNativeDriver: true, speed: 12, bounciness: 14 })),
    ).start(() => onEnd());
    const timers = anims.map((_, i) => setTimeout(() => play('pop'), i * 450));
    return () => timers.forEach(clearTimeout);
  }, [anims, onEnd]);
  return (
    <View style={[styles.center, { flexDirection: 'row', flexWrap: 'wrap', gap: 4, paddingHorizontal: 8 }]}>
      {[...seq, '❓'].map((e, i) => (
        <Animated.View key={i} style={[styles.patternCell, i === seq.length && styles.patternHole, { transform: [{ scale: anims[i] }] }]}>
          <Emoji char={e} size={38} />
        </Animated.View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: '100%', alignItems: 'center', gap: 12 },
  screen: { backgroundColor: colors.terracottaDark, borderRadius: 24, padding: 8, ...shadow },
  stage: { width: STAGE_W, height: STAGE_H, borderRadius: 16, overflow: 'hidden', backgroundColor: '#CFEFFF' },
  tv: { alignItems: 'center', paddingTop: 4 },
  tvText: { fontFamily: fonts.bodyBold, color: colors.white, fontSize: 16 },
  buttons: { flexDirection: 'row', gap: 10, flexWrap: 'wrap', justifyContent: 'center' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  road: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 46, backgroundColor: '#C9A36B', borderTopWidth: 4, borderColor: '#A8834D' },
  marcher: { position: 'absolute', bottom: 8, left: 0 },
  coinRow: { position: 'absolute', top: 10, left: 0, right: 0, alignItems: 'center' },
  coinsRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', maxWidth: STAGE_W - 20 },
  chest: { position: 'absolute', bottom: 6, left: STAGE_W / 2 - 50 },
  flyingCoin: { position: 'absolute', top: 0, left: 0 },
  eagle: { position: 'absolute', top: 4, right: 18 },
  plus: { position: 'absolute', top: 10, left: 12, fontSize: 34 },
  minus: { position: 'absolute', top: 10, left: 12, fontSize: 34 },
  startLine: { position: 'absolute', left: 8, top: 0, bottom: 0, width: 3, backgroundColor: '#fff' },
  finish: { position: 'absolute', right: 26, top: 0, bottom: 0, width: 8, backgroundColor: '#222', borderLeftWidth: 4, borderColor: '#fff', borderStyle: 'dashed' },
  flag: { position: 'absolute', right: 2, top: 2 },
  lane: { position: 'absolute', left: 0, right: 0, height: 48, borderBottomWidth: 2, borderColor: '#D9BF85' },
  horseRow: { position: 'absolute', top: 2, flexDirection: 'row', alignItems: 'center', gap: 2 },
  horse: { transform: [{ scaleX: -1 }] },
  patternCell: { width: 48, height: 48, borderRadius: 12, backgroundColor: colors.marble, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: colors.gold },
  patternHole: { borderStyle: 'dashed', borderColor: colors.purple, backgroundColor: '#F3E8FF' },
});
