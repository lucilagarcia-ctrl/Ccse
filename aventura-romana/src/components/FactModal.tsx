import { useEffect, useState } from 'react';
import { Animated, Modal, StyleSheet, Text, View } from 'react-native';
import { Lang, ui } from '../i18n';
import { Fact } from '../questions/facts';
import { play, say } from '../sound';
import { colors, fonts, shadow } from '../theme';
import { BigButton } from './BigButton';
import { Romanito } from './Romanito';

/** Un romanito aparece de un salto con una curiosidad corta de Roma. */
export function FactModal({ fact, lang, muted, onClose }: { fact: Fact | null; lang: Lang; muted: boolean; onClose: () => void }) {
  const [pop] = useState(() => new Animated.Value(0));
  useEffect(() => {
    if (!fact) return;
    pop.setValue(0);
    play('fact');
    Animated.spring(pop, { toValue: 1, useNativeDriver: true, speed: 10, bounciness: 14 }).start();
    if (!muted) setTimeout(() => say(`${ui.didYouKnow[lang]} ${fact.text[lang]}`, lang), 400);
  }, [fact, lang, muted, pop]);

  return (
    <Modal visible={!!fact} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        {fact && (
          <Animated.View style={[styles.card, { transform: [{ scale: pop }] }]}>
            <View style={styles.ribbon}>
              <Text style={styles.ribbonText}>💡 {ui.didYouKnow[lang]}</Text>
            </View>
            <Text style={styles.emoji}>{fact.emoji}</Text>
            <Text style={styles.text}>{fact.text[lang]}</Text>
            <View style={styles.bottom}>
              <Romanito kind={fact.kind} mood="talk" size={96} />
              <BigButton label={`${ui.gotIt[lang]} 👍`} color={colors.purple} shade={colors.purpleDark} onPress={onClose} style={{ flex: 1 }} />
            </View>
          </Animated.View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(40,20,10,0.55)', alignItems: 'center', justifyContent: 'center', padding: 16 },
  card: { width: '100%', maxWidth: 420, backgroundColor: colors.marble, borderRadius: 28, borderWidth: 5, borderColor: colors.gold, padding: 18, paddingTop: 30, alignItems: 'center', gap: 8, ...shadow },
  ribbon: { position: 'absolute', top: -20, backgroundColor: colors.red, paddingHorizontal: 18, paddingVertical: 6, borderRadius: 14, borderWidth: 3, borderColor: colors.gold },
  ribbonText: { fontFamily: fonts.bodyBold, color: colors.white, fontSize: 20 },
  emoji: { fontSize: 64, lineHeight: 78 },
  text: { fontFamily: fonts.body, fontSize: 22, color: colors.ink, textAlign: 'center', lineHeight: 30 },
  bottom: { flexDirection: 'row', alignItems: 'flex-end', gap: 10, width: '100%' },
});
