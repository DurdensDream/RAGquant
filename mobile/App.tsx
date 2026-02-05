import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import {
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.78;

const palette = {
  hotPink: '#FF69B4',
  babyPink: '#FFC0CB',
  softWhite: '#FFF7FB',
  glitterGold: '#FFD700',
  rosy: '#FFE4F0',
  lilac: '#FCE7FF',
  roseAccent: '#FF9FC9',
  text: '#5A3D5C',
};

type Sticker = {
  id: string;
  name: string;
  uri: string;
  prompt: string;
};

type HomeCard = {
  id: string;
  title: string;
  description: string;
  stickerId: string;
  badge: string;
};

type TabKey = 'home' | 'profile' | 'settings';

type SettingItem = {
  id: string;
  title: string;
  description: string;
  tooltip: string;
};

const sanitizeLabel = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#39;');

const createStickerUri = (label: string, color: string) => {
  const safeLabel = sanitizeLabel(label);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="360" height="480">
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${color}" />
          <stop offset="100%" stop-color="#FFF7FB" />
        </linearGradient>
      </defs>
      <rect width="360" height="480" fill="url(#grad)" rx="28" />
      <text x="50%" y="45%" text-anchor="middle" font-size="28" fill="#5A3D5C" font-family="Arial">
        ${safeLabel}
      </text>
      <text x="50%" y="58%" text-anchor="middle" font-size="20" fill="#FF69B4" font-family="Arial">
        Sticker Placeholder
      </text>
    </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const createPatternUri = () => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160">
      <rect width="160" height="160" fill="#FFEFF8" />
      <circle cx="24" cy="30" r="6" fill="#FFC0CB" />
      <circle cx="80" cy="20" r="4" fill="#FF9FC9" />
      <circle cx="120" cy="70" r="5" fill="#FFD1E8" />
      <circle cx="40" cy="120" r="5" fill="#FFC0CB" />
      <circle cx="110" cy="120" r="4" fill="#FFB6D9" />
      <path d="M70 90c5-6 14-6 19 0 6 7-3 15-9 19-6-4-15-12-10-19z" fill="#FF69B4" />
    </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const FALLBACK_STICKER: Sticker = {
  id: 'sticker-fallback',
  name: 'Cheerful Placeholder',
  uri: createStickerUri('Cheerful', '#FFE4F0'),
  prompt: 'Fallback sticker placeholder.',
};

// Placeholder sticker data. Swap each URI with royalty-free SFW anime sticker art or generate using the prompt text.
const STICKERS: Sticker[] = [
  {
    id: 'sticker-1',
    name: 'Sunny Wave',
    uri: createStickerUri('Sunny Wave', '#FFC0CB'),
    prompt: 'Curvy anime girl waving happily, SFW, pastel dress with bows, joyful smile',
  },
  {
    id: 'sticker-2',
    name: 'Confidence Pose',
    uri: createStickerUri('Confidence Pose', '#FFB6D9'),
    prompt: 'Curvy anime girl standing tall with hands on hips, modest outfit, friendly grin',
  },
  {
    id: 'sticker-3',
    name: 'Cheer Sparkle',
    uri: createStickerUri('Cheer Sparkle', '#FFD1E8'),
    prompt: 'Curvy anime girl holding sparkly wand, pastel sweater, SFW and cute',
  },
  {
    id: 'sticker-4',
    name: 'Rainbow Thumbs',
    uri: createStickerUri('Rainbow Thumbs', '#FCE7FF'),
    prompt: 'Curvy anime girl giving thumbs-up, ruffled skirt, playful sneakers',
  },
  {
    id: 'sticker-5',
    name: 'Joyful Bloom',
    uri: createStickerUri('Joyful Bloom', '#FFE4F0'),
    prompt: 'Curvy anime girl smiling with hands clasped, floral dress, SFW and empowering',
  },
  {
    id: 'sticker-6',
    name: 'Sparkle Stretch',
    uri: createStickerUri('Sparkle Stretch', '#FFD7F1'),
    prompt: 'Curvy anime girl stretching happily, cozy cardigan, modest outfit',
  },
  {
    id: 'sticker-7',
    name: 'Heart Hopper',
    uri: createStickerUri('Heart Hopper', '#FFCCE0'),
    prompt: 'Curvy anime girl jumping with hearts, pastel hoodie, bright smile',
  },
  {
    id: 'sticker-8',
    name: 'Ribbon Glow',
    uri: createStickerUri('Ribbon Glow', '#FFC6E5'),
    prompt: 'Curvy anime girl with ribbon bow, skirt and leggings, friendly pose',
  },
  {
    id: 'sticker-9',
    name: 'Sweet Spark',
    uri: createStickerUri('Sweet Spark', '#FFD3EC'),
    prompt: 'Curvy anime girl with glossy lips, cheerful wave, modest frilly dress',
  },
  {
    id: 'sticker-10',
    name: 'Bubbly Cheer',
    uri: createStickerUri('Bubbly Cheer', '#FFF0F8'),
    prompt: 'Curvy anime girl with big doe eyes, pastel sneakers, SFW friendly pose',
  },
  {
    id: 'sticker-11',
    name: 'Glow Guide',
    uri: createStickerUri('Glow Guide', '#FFD9EE'),
    prompt: 'Curvy anime girl holding heart sign, modest outfit, confident smile',
  },
  {
    id: 'sticker-12',
    name: 'Petal Peace',
    uri: createStickerUri('Petal Peace', '#FFEBF6'),
    prompt: 'Curvy anime girl twirling in pastel dress, SFW and joyful',
  },
];

const DEFAULT_STICKER = STICKERS[0] ?? FALLBACK_STICKER;

const HOME_CARDS: HomeCard[] = [
  {
    id: 'card-1',
    title: 'Sparkle Swipe',
    description: 'Swipe through the sparkle squad for daily confidence boosts.',
    stickerId: 'sticker-1',
    badge: 'Glow Up',
  },
  {
    id: 'card-2',
    title: 'Joy Journal',
    description: 'Track your wins, gratitude notes, and empowering reminders.',
    stickerId: 'sticker-4',
    badge: 'New',
  },
  {
    id: 'card-3',
    title: 'Cheerful Challenges',
    description: 'Complete gentle challenges and unlock glitter confetti.',
    stickerId: 'sticker-7',
    badge: 'Daily',
  },
];

const SETTINGS: SettingItem[] = [
  {
    id: 'setting-1',
    title: 'Sparkle Notifications',
    description: 'Receive uplifting reminders with heart confetti.',
    tooltip: 'Turn this on to get joyful affirmations during the day.',
  },
  {
    id: 'setting-2',
    title: 'Glow Accessibility',
    description: 'Increase contrast and font size for extra comfort.',
    tooltip: 'Helps keep the interface easy to read while staying cute.',
  },
  {
    id: 'setting-3',
    title: 'Sticker Magic Mode',
    description: 'Let stickers wave and sparkle in the background.',
    tooltip: 'Adds gentle motion to make the app feel lively.',
  },
];

const floralPattern = {
  uri: createPatternUri(),
};

const AppHeader = () => (
  <View style={styles.headerWrapper}>
    <Text style={styles.appTitle}>Pinkpilled Joy</Text>
    <Text style={styles.appSubtitle}>A cozy, empowering space to celebrate confidence ✨</Text>
  </View>
);

const SparkleButton = ({
  label,
  onPress,
  sticker,
}: {
  label: string;
  onPress: () => void;
  sticker: Sticker;
}) => {
  const scaleAnim = useMemo(() => new Animated.Value(1), []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.96, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();
  };

  return (
    <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={[styles.sparkleButton, { transform: [{ scale: scaleAnim }] }]}>
        <Text style={styles.sparkleButtonText}>{label}</Text>
        <Image
          source={{ uri: sticker.uri }}
          style={styles.buttonSticker}
          accessibilityLabel={sticker.name}
        />
      </Animated.View>
    </Pressable>
  );
};

const FloatingHearts = () => {
  const floatAnim = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 3600,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 3600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [floatAnim]);

  const hearts = ['💖', '💞', '💗', '💘', '💓', '💕'];

  return (
    <View style={[styles.heartLayer, { pointerEvents: 'none' }]}>
      {hearts.map((heart, index) => {
        const translateY = floatAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -18 - index * 2],
        });
        return (
          <Animated.Text
            key={`heart-${index}`}
            style={[
              styles.heart,
              {
                left: `${8 + index * 14}%`,
                transform: [{ translateY }],
              },
            ]}
          >
            {heart}
          </Animated.Text>
        );
      })}
    </View>
  );
};

const SparkleBurst = ({ visible }: { visible: boolean }) => {
  const sparkleAnim = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    if (visible) {
      sparkleAnim.setValue(0);
      Animated.timing(sparkleAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, sparkleAnim]);

  if (!visible) return null;

  const scale = sparkleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 1.2],
  });
  const opacity = sparkleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return (
    <Animated.View style={[styles.sparkleBurst, { opacity, transform: [{ scale }] }]}>
      <Text style={styles.sparkleBurstText}>✨💖✨</Text>
      <Text style={styles.sparkleBurstText}>🎀🌸🎀</Text>
    </Animated.View>
  );
};

const StickerCard = ({ card }: { card: HomeCard }) => {
  const sticker = STICKERS.find((item) => item.id === card.stickerId) ?? DEFAULT_STICKER;
  return (
    <View style={styles.card}>
      <View style={styles.cardBadge}>
        <Text style={styles.cardBadgeText}>{card.badge}</Text>
      </View>
      <Image
        source={{ uri: sticker.uri }}
        style={styles.cardSticker}
        accessibilityLabel={sticker.name}
      />
      <Text style={styles.cardTitle}>{card.title}</Text>
      <Text style={styles.cardDescription}>{card.description}</Text>
    </View>
  );
};

const LoadingScreen = ({ sticker }: { sticker: Sticker }) => {
  const spinAnim = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 2600,
        useNativeDriver: true,
      })
    ).start();
  }, [spinAnim]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <LinearGradient colors={[palette.babyPink, palette.softWhite]} style={styles.loadingContainer}>
      <Animated.Image
        source={{ uri: sticker.uri }}
        style={[styles.loadingSticker, { transform: [{ rotate: spin }] }]}
        accessibilityLabel={sticker.name}
      />
      <Text style={styles.loadingText}>Sprinkling glitter magic...</Text>
    </LinearGradient>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Pacifico_400Regular,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_600SemiBold,
  });
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [selectedSticker, setSelectedSticker] = useState(DEFAULT_STICKER);
  const [showModal, setShowModal] = useState(false);
  const [showCheer, setShowCheer] = useState(false);
  const [tooltipId, setTooltipId] = useState<string | null>(null);

  useEffect(() => {
    if (showCheer) {
      const timer = setTimeout(() => setShowCheer(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [showCheer]);

  const profileStickers = useMemo(() => STICKERS.slice(0, 8), []);

  if (!fontsLoaded) {
    return <LoadingScreen sticker={STICKERS[2] ?? DEFAULT_STICKER} />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <LinearGradient colors={[palette.babyPink, palette.softWhite, palette.lilac]} style={styles.container}>
        <ImageBackground source={floralPattern} resizeMode="repeat" style={styles.pattern}>
          <FloatingHearts />
          <SparkleBurst visible={showCheer} />
          <AppHeader />

          {activeTab === 'home' && (
            <View style={styles.screenBody}>
              <Text style={styles.sectionTitle}>Swipe the sparkle cards</Text>
              <FlatList
                data={HOME_CARDS}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                snapToInterval={CARD_WIDTH + 20}
                decelerationRate="fast"
                contentContainerStyle={styles.cardList}
                pagingEnabled
                onScrollBeginDrag={() => setShowCheer(true)}
                renderItem={({ item }) => <StickerCard card={item} />}
              />

              <View style={styles.homeActions}>
                <SparkleButton
                  label="Open Cheerful Modal"
                  onPress={() => setShowModal(true)}
                  sticker={STICKERS[5]}
                />
                <View style={styles.homeMessageBox}>
                  <Text style={styles.homeMessageTitle}>Sparkle Spotlight</Text>
                  <Text style={styles.homeMessageText}>
                    Tap the button to see a sweet sticker pop-up with a joyful spin.
                  </Text>
                </View>
              </View>

              <View style={styles.stickerRow}>
                {STICKERS.slice(8, 12).map((sticker) => (
                  <Image
                    key={sticker.id}
                    source={{ uri: sticker.uri }}
                    style={styles.miniSticker}
                    accessibilityLabel={sticker.name}
                  />
                ))}
              </View>
            </View>
          )}

          {activeTab === 'profile' && (
            <ScrollView contentContainerStyle={styles.screenBody} showsVerticalScrollIndicator={false}>
              <Text style={styles.sectionTitle}>Customize your avatar</Text>
              <View style={styles.profileCard}>
                <Image
                  source={{ uri: selectedSticker.uri }}
                  style={styles.profileAvatar}
                  accessibilityLabel={selectedSticker.name}
                />
                <Text style={styles.profileName}>Glitter Guardian</Text>
                <Text style={styles.profileTagline}>Soft, strong, and confidently cute.</Text>
              </View>

              <Text style={styles.sectionSubtitle}>Pick a sticker hero</Text>
              <View style={styles.avatarGrid}>
                {profileStickers.map((sticker) => (
                  <Pressable
                    key={sticker.id}
                    onPress={() => setSelectedSticker(sticker)}
                    style={[
                      styles.avatarOption,
                      selectedSticker.id === sticker.id && styles.avatarOptionActive,
                    ]}
                  >
                    <Image
                      source={{ uri: sticker.uri }}
                      style={styles.avatarImage}
                      accessibilityLabel={sticker.name}
                    />
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          )}

          {activeTab === 'settings' && (
            <ScrollView contentContainerStyle={styles.screenBody} showsVerticalScrollIndicator={false}>
              <Text style={styles.sectionTitle}>Settings & sparkles</Text>
              {SETTINGS.map((item) => (
                <View key={item.id} style={styles.settingCard}>
                  <View style={styles.settingHeader}>
                    <Text style={styles.settingTitle}>{item.title}</Text>
                    <Pressable onPress={() => setTooltipId(tooltipId === item.id ? null : item.id)}>
                      <Text style={styles.tooltipIcon}>?</Text>
                    </Pressable>
                  </View>
                  <Text style={styles.settingDescription}>{item.description}</Text>
                  {tooltipId === item.id && (
                    <View style={styles.tooltipBubble}>
                      <Text style={styles.tooltipText}>{item.tooltip}</Text>
                    </View>
                  )}
                </View>
              ))}
            </ScrollView>
          )}

          <View style={styles.bottomNav}>
            {[
              { key: 'home', label: 'Home', sticker: STICKERS[0] },
              { key: 'profile', label: 'Profile', sticker: STICKERS[1] },
              { key: 'settings', label: 'Settings', sticker: STICKERS[2] },
            ].map((tab) => (
              <Pressable key={tab.key} onPress={() => setActiveTab(tab.key as TabKey)}>
                <View style={styles.navItem}>
                  <Image
                    source={{ uri: tab.sticker.uri }}
                    style={styles.navSticker}
                    accessibilityLabel={tab.sticker.name}
                  />
                  <Text
                    style={[
                      styles.navLabel,
                      activeTab === tab.key && styles.navLabelActive,
                    ]}
                  >
                    {tab.label}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </ImageBackground>
      </LinearGradient>

      <Modal transparent visible={showModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <Animated.View style={styles.modalCard}>
            <Image
              source={{ uri: STICKERS[3].uri }}
              style={styles.modalSticker}
              accessibilityLabel={STICKERS[3].name}
            />
            <Text style={styles.modalTitle}>Cheerful Spin!</Text>
            <Text style={styles.modalText}>
              Keep shining. You are powerful, joyful, and wonderfully you.
            </Text>
            <SparkleButton
              label="Close"
              onPress={() => setShowModal(false)}
              sticker={STICKERS[6]}
            />
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.softWhite,
  },
  container: {
    flex: 1,
  },
  pattern: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerWrapper: {
    marginTop: 16,
    marginBottom: 10,
  },
  appTitle: {
    fontFamily: 'Pacifico_400Regular',
    fontSize: 34,
    color: palette.hotPink,
    textAlign: 'center',
  },
  appSubtitle: {
    fontFamily: 'Poppins_400Regular_Italic',
    fontSize: 14,
    color: palette.text,
    textAlign: 'center',
    marginTop: 6,
  },
  screenBody: {
    flexGrow: 1,
    paddingBottom: 90,
  },
  sectionTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 20,
    color: palette.text,
    marginTop: 12,
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: palette.text,
    marginTop: 18,
    marginBottom: 10,
  },
  cardList: {
    paddingBottom: 10,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: palette.softWhite,
    borderRadius: 28,
    marginRight: 20,
    padding: 16,
    shadowColor: palette.hotPink,
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
    borderWidth: 2,
    borderColor: palette.babyPink,
  },
  cardBadge: {
    alignSelf: 'flex-start',
    backgroundColor: palette.glitterGold,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  cardBadgeText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 12,
    color: palette.text,
  },
  cardSticker: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    marginVertical: 12,
  },
  cardTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: palette.text,
  },
  cardDescription: {
    fontFamily: 'Poppins_400Regular_Italic',
    fontSize: 14,
    color: palette.text,
    marginTop: 6,
  },
  homeActions: {
    marginTop: 18,
    gap: 14,
  },
  sparkleButton: {
    backgroundColor: palette.hotPink,
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 22,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: palette.glitterGold,
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  sparkleButtonText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: palette.softWhite,
  },
  buttonSticker: {
    position: 'absolute',
    right: -6,
    top: -10,
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 2,
    borderColor: palette.softWhite,
  },
  homeMessageBox: {
    backgroundColor: palette.rosy,
    borderRadius: 24,
    padding: 16,
  },
  homeMessageTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: palette.text,
  },
  homeMessageText: {
    fontFamily: 'Poppins_400Regular_Italic',
    fontSize: 14,
    color: palette.text,
    marginTop: 6,
  },
  stickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  miniSticker: {
    width: 64,
    height: 86,
    borderRadius: 18,
  },
  profileCard: {
    backgroundColor: palette.softWhite,
    borderRadius: 30,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: palette.babyPink,
  },
  profileAvatar: {
    width: 160,
    height: 200,
    borderRadius: 26,
  },
  profileName: {
    fontFamily: 'Pacifico_400Regular',
    fontSize: 24,
    color: palette.hotPink,
    marginTop: 10,
  },
  profileTagline: {
    fontFamily: 'Poppins_400Regular_Italic',
    fontSize: 14,
    color: palette.text,
    marginTop: 6,
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  avatarOption: {
    width: (width - 64) / 3,
    height: 110,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  avatarOptionActive: {
    borderColor: palette.hotPink,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  settingCard: {
    backgroundColor: palette.softWhite,
    borderRadius: 24,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: palette.babyPink,
  },
  settingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: palette.text,
  },
  settingDescription: {
    fontFamily: 'Poppins_400Regular_Italic',
    fontSize: 13,
    color: palette.text,
    marginTop: 6,
  },
  tooltipIcon: {
    backgroundColor: palette.roseAccent,
    color: palette.softWhite,
    width: 24,
    height: 24,
    textAlign: 'center',
    borderRadius: 12,
    overflow: 'hidden',
    fontFamily: 'Poppins_600SemiBold',
  },
  tooltipBubble: {
    marginTop: 10,
    backgroundColor: palette.lilac,
    borderRadius: 18,
    padding: 12,
  },
  tooltipText: {
    fontFamily: 'Poppins_400Regular_Italic',
    fontSize: 12,
    color: palette.text,
  },
  bottomNav: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: palette.softWhite,
    paddingVertical: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: palette.babyPink,
  },
  navItem: {
    alignItems: 'center',
  },
  navSticker: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginBottom: 4,
  },
  navLabel: {
    fontFamily: 'Poppins_400Regular_Italic',
    fontSize: 12,
    color: palette.text,
  },
  navLabelActive: {
    color: palette.hotPink,
  },
  heartLayer: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  heart: {
    fontSize: 18,
    color: palette.hotPink,
  },
  sparkleBurst: {
    position: 'absolute',
    top: 120,
    right: 20,
    backgroundColor: palette.rosy,
    borderRadius: 20,
    padding: 12,
    zIndex: 2,
  },
  sparkleBurstText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 12,
    color: palette.hotPink,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 182, 193, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    backgroundColor: palette.softWhite,
    borderRadius: 30,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: palette.babyPink,
  },
  modalSticker: {
    width: 160,
    height: 200,
    borderRadius: 24,
    marginBottom: 12,
  },
  modalTitle: {
    fontFamily: 'Pacifico_400Regular',
    fontSize: 24,
    color: palette.hotPink,
  },
  modalText: {
    fontFamily: 'Poppins_400Regular_Italic',
    fontSize: 14,
    color: palette.text,
    textAlign: 'center',
    marginVertical: 10,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingSticker: {
    width: 180,
    height: 240,
    borderRadius: 28,
  },
  loadingText: {
    fontFamily: 'Pacifico_400Regular',
    fontSize: 20,
    color: palette.hotPink,
    marginTop: 14,
  },
});
