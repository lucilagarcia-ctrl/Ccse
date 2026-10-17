import { Cinzel_700Bold, Cinzel_900Black } from '@expo-google-fonts/cinzel';
import { Fredoka_500Medium, Fredoka_700Bold, useFonts } from '@expo-google-fonts/fredoka';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { RomanBackground } from './src/components/RomanBackground';
import { Lang } from './src/i18n';
import { buildSession, Session } from './src/questions/session';
import { HomeScreen } from './src/screens/HomeScreen';
import { QuizScreen } from './src/screens/QuizScreen';
import { ResultScreen } from './src/screens/ResultScreen';
import { loadProgress, Progress, saveProgress } from './src/storage';
import { colors } from './src/theme';

/** Sólo en desarrollo web: ?demo=video pone primero un reto de ese tipo (para capturas y pruebas). */
function newSession(seenFacts: number[]): Session {
  const session = buildSession(seenFacts);
  const demo = __DEV__ && Platform.OS === 'web' ? new URLSearchParams(window.location.search).get('demo') : null;
  const i = demo ? session.questions.findIndex((q) => q.kind === demo || q.id.startsWith(demo)) : -1;
  if (i > 0) session.questions.unshift(...session.questions.splice(i, 1));
  // y la primera curiosidad justo después del primer reto
  if (demo) session.facts[1] = Object.values(session.facts)[0];
  return session;
}

/** Sólo en desarrollo web: ?demo=win / ?demo=lose abre directamente la pantalla final. */
function initialScreen(): Screen {
  const demo = __DEV__ && Platform.OS === 'web' ? new URLSearchParams(window.location.search).get('demo') : null;
  if (demo === 'win') return { name: 'result', correct: 12, total: 15 };
  if (demo === 'lose') return { name: 'result', correct: 7, total: 15 };
  return { name: 'home' };
}

type Screen = { name: 'home' } | { name: 'quiz'; session: Session; round: number } | { name: 'result'; correct: number; total: number };

export default function App() {
  const [fontsLoaded] = useFonts({ Cinzel_700Bold, Cinzel_900Black, Fredoka_500Medium, Fredoka_700Bold });
  const [progress, setProgress] = useState<Progress | null>(null);
  const [screen, setScreen] = useState<Screen>(initialScreen);

  useEffect(() => {
    loadProgress().then(setProgress);
  }, []);

  const update = (patch: Partial<Progress>) => {
    setProgress((p) => {
      const next = { ...(p as Progress), ...patch };
      saveProgress(next);
      return next;
    });
  };

  if (!fontsLoaded || !progress) {
    return (
      <View style={[styles.fill, { alignItems: 'center', justifyContent: 'center', backgroundColor: colors.sky }]}>
        <ActivityIndicator size="large" color={colors.red} />
      </View>
    );
  }

  const lang: Lang = progress.lang ?? 'es';

  return (
    <SafeAreaProvider>
    <RomanBackground>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.fill}>
        {screen.name === 'home' && (
          <HomeScreen
            lang={lang}
            coins={progress.coins}
            crowns={progress.crowns}
            onLang={(l) => update({ lang: l })}
            onPlay={() => setScreen({ name: 'quiz', session: newSession(progress.seenFacts), round: Date.now() })}
          />
        )}
        {screen.name === 'quiz' && (
          <QuizScreen
            key={screen.round}
            lang={lang}
            session={screen.session}
            onFactSeen={(id) => update({ seenFacts: [...progress.seenFacts, id].slice(-18) })}
            onQuit={() => setScreen({ name: 'home' })}
            onFinish={(correct) => {
              update({ coins: progress.coins + correct, crowns: progress.crowns + (correct >= 10 ? 1 : 0) });
              setScreen({ name: 'result', correct, total: screen.session.questions.length });
            }}
          />
        )}
        {screen.name === 'result' && (
          <ResultScreen
            lang={lang}
            correct={screen.correct}
            total={screen.total}
            onAgain={() => setScreen({ name: 'quiz', session: newSession(progress.seenFacts), round: Date.now() })}
            onHome={() => setScreen({ name: 'home' })}
          />
        )}
      </SafeAreaView>
    </RomanBackground>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({ fill: { flex: 1 } });
