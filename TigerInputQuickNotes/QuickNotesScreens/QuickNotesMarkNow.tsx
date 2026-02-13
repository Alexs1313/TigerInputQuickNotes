import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { StackNavigationProp } from '@react-navigation/stack';
import QuickNotesLayout from '../QuickNotesComponents/QuickNotesLayout';
import { QuickNotesRoutesList } from '../NotesNavigation/QuickNotesStack';
import { useQuickNotesStore } from '../QuickNotesStore/quickNotesCntxt';
import LinearGradient from 'react-native-linear-gradient';

type NavigationProp = StackNavigationProp<
  QuickNotesRoutesList,
  'QuickNotesMarkNow'
>;

const FRAME_BTN = require('../QuickNotesAssets/images/wlcm/btn.png');

function formatTime(date: Date): string {
  const h = date.getHours().toString().padStart(2, '0');
  const m = date.getMinutes().toString().padStart(2, '0');
  const s = date.getSeconds().toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

const QuickNotesMarkNow: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { addMark, marks } = useQuickNotesStore();
  const [now, setNow] = useState(() => formatTime(new Date()));
  const [success, setSuccess] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setNow(formatTime(new Date()));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleMark = useCallback(() => {
    const timeStr = formatTime(new Date());
    addMark(timeStr);
    setLastSavedTime(timeStr);
    setSuccess(true);
  }, [addMark]);

  const handleShare = useCallback(async () => {
    const text =
      lastSavedTime ??
      (marks.length > 0 ? marks[marks.length - 1].timeString : now);
    try {
      await Share.share({
        message: `Mark now: ${text}`,
        title: 'Mark now',
      });
    } catch {
      // user cancelled
    }
  }, [lastSavedTime, marks, now]);

  const header = (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={goBack}
        style={styles.backButton}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      >
        <Image
          source={require('../QuickNotesAssets/images/backbutton.png')}
          style={styles.backButtonImage}
        />
      </TouchableOpacity>
      <Image source={require('../QuickNotesAssets/images/marktitle.png')} />
      <View style={styles.headerSpacer} />
    </View>
  );

  if (success) {
    return (
      <ImageBackground
        source={require('../QuickNotesAssets/images/darkBg.png')}
        style={styles.darkScreen}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {header}
          <View style={styles.successContent}>
            <Text style={styles.successText}>Successfully!</Text>
            <Image
              source={require('../QuickNotesAssets/images/loadertiger.png')}
            />

            <TouchableOpacity onPress={handleShare} activeOpacity={0.8}>
              <ImageBackground source={FRAME_BTN} style={styles.shareButton}>
                <Text style={styles.shareButtonText}>SHARE</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }

  return (
    <QuickNotesLayout>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {header}
          <View style={styles.content}>
            <LinearGradient
              colors={['#DF1503', '#DF1503']}
              style={styles.timeBox}
            >
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 24,
                  alignItems: 'center',
                }}
              >
                <Text style={styles.timeLabel}>Now:</Text>
                <Text style={styles.timeValue}>{now}</Text>
              </View>
            </LinearGradient>
            <TouchableOpacity onPress={handleMark} activeOpacity={0.8}>
              <ImageBackground source={FRAME_BTN} style={styles.markButton}>
                <Text style={styles.markButtonText}>MARK</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </QuickNotesLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  darkScreen: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 80,
    paddingBottom: 16,
  },
  backButton: {
    padding: 4,
  },
  backButtonImage: {
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Manrope-ExtraBold',
    color: '#fff',
    textTransform: 'uppercase',
  },
  headerSpacer: {
    width: 50,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  timeBox: {
    width: '85%',
    backgroundColor: '#DF1503',
    borderRadius: 22,
    marginBottom: 32,
  },
  timeLabel: {
    fontSize: 15,
    fontFamily: 'Manrope-Regular',
    color: '#fff',
    marginBottom: 8,
  },
  timeValue: {
    fontSize: 32,
    fontFamily: 'Manrope-ExtraBold',
    color: '#fff',
  },
  markButton: {
    width: 263,
    height: 89,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  markButtonText: {
    fontSize: 20,
    fontFamily: 'Manrope-ExtraBold',
    color: '#fff',
    textTransform: 'uppercase',
    bottom: 4,
  },
  successContent: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
  },
  successText: {
    fontSize: 28,
    fontFamily: 'Manrope-ExtraBold',
    color: '#fff',
    marginBottom: 40,
  },
  shareButton: {
    width: 236,
    height: 74,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  shareButtonText: {
    fontSize: 18,
    fontFamily: 'Manrope-ExtraBold',
    color: '#fff',
    textTransform: 'uppercase',
    bottom: 4,
  },
});

export default QuickNotesMarkNow;
