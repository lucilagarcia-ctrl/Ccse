import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BigButton } from '../components/BigButton';
import { Flag } from '../components/Flags';
import { Romanito } from '../components/Romanito';
import { Lang, LANGS, t, ui } from '../i18n';
import { play, say } from '../sound';
import { colors, fonts, shadow } from '../theme';
import { Emoji } from '../components/Emoji';

type Props = { lang: Lang; coins: number; crowns: number; onLang: (l: Lang) => void; onPlay: () => void };


export function HomeScreen({ lang, coins, crowns, onLang, onPlay }: Props) {
  return (
    <View style={styles.wrap}>
      <View style={styles.stats}>
        <View style={styles.chip}>
          <Emoji char="🪙" size={26} />
          <Text style={styles.chipNum}>{coins}</Text>
        </View>
        <View style={styles.chip}>
          <Emoji char="🏆" size={26} />
          <Text style={styles.chipNum}>{crowns}</Text>
        </View>
      </View>

      <View style={styles.banner}>
        <Text style={styles.spqr}>S · P · Q · R</Text>
        <Text style={styles.title}>{ui.appTitle[lang]}</Text>
        <Text style={styles.hello}>{t('hello', lang)} 👋</Text>
      </View>

      <View style={styles.heroes}>
        <Romanito kind="senadora" mood="talk" size={92} />
        <Romanito kind="legionario" mood="happy" size={130} />
        <Romanito kind="emperador" mood="neutral" size={92} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🌍 {ui.chooseLang[lang]}</Text>
        <View style={styles.flags}>
          {LANGS.map((l) => (
            <Pressable
              key={l}
              accessibilityRole="button"
              accessibilityLabel={ui.langName[l]}
              onPress={() => {
                play('pop');
                onLang(l);
                say(t('hello', l), l);
              }}
              style={[styles.flagBtn, l === lang && styles.flagOn]}
            >
              <View style={styles.flagFrame}>
                <Flag lang={l} width={72} />
              </View>
              <Text style={[styles.flagName, l === lang && { color: colors.redDark }]}>{ui.langName[l]}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <BigButton label={`⚔️  ${ui.play[lang]}`} big onPress={onPlay} color={colors.red} shade={colors.redDark} style={styles.play} />
      <Text style={styles.goal}>{ui.goal[lang]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', paddingHorizontal: 16, paddingTop: 8, gap: 10, justifyContent: 'center' },
  stats: { flexDirection: 'row', gap: 10, alignSelf: 'flex-end' },
  chip: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.85)', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4, gap: 6, ...shadow },
  chipNum: { fontFamily: fonts.bodyBold, fontSize: 20, color: colors.ink },
  banner: { backgroundColor: colors.marble, borderRadius: 20, borderWidth: 4, borderColor: colors.gold, paddingHorizontal: 22, paddingVertical: 10, alignItems: 'center', ...shadow },
  spqr: { fontFamily: fonts.titleBold, color: colors.red, fontSize: 14, letterSpacing: 3 },
  title: { fontFamily: fonts.title, color: colors.purpleDark, fontSize: 32, textAlign: 'center' },
  hello: { fontFamily: fonts.bodyBold, color: colors.terracottaDark, fontSize: 22, textAlign: 'center' },
  heroes: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: 0 },
  card: { backgroundColor: 'rgba(251,246,236,0.95)', borderRadius: 24, padding: 14, width: '100%', maxWidth: 440, ...shadow },
  cardTitle: { fontFamily: fonts.bodyBold, fontSize: 20, color: colors.ink, textAlign: 'center', marginBottom: 10 },
  flags: { flexDirection: 'row', justifyContent: 'space-around', gap: 8 },
  flagBtn: { alignItems: 'center', padding: 8, borderRadius: 18, borderWidth: 4, borderColor: 'transparent', flex: 1 },
  flagOn: { borderColor: colors.gold, backgroundColor: '#FFF3CC', transform: [{ scale: 1.06 }] },
  flagFrame: { borderRadius: 8, overflow: 'hidden', borderWidth: 2, borderColor: '#0002' },
  flagName: { fontFamily: fonts.bodyBold, fontSize: 16, color: colors.inkSoft, marginTop: 6 },
  play: { width: '100%', maxWidth: 440 },
  goal: { fontFamily: fonts.body, fontSize: 15, color: colors.ink, textAlign: 'center', backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4, overflow: 'hidden' },
});
