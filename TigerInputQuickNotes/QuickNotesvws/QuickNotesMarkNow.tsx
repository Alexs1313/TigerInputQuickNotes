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
import QuickNotesLayout from '../QuickNotescmpnts/QuickNotesLayout';
import QuickNotesScreenHeader from '../QuickNotescmpnts/QuickNotesScreenHeader';
import { QuickNotesRoutesList } from '../[Notesrttnvgts]/QuickNotesStack';
import { useQuickNotesStore } from '../QuickNotessttrg/quickNotesCntxt';
import LinearGradient from 'react-native-linear-gradient';

type NavigationProp = StackNavigationProp<
  QuickNotesRoutesList,
  'QuickNotesMarkNow'
>;

const tggFrameBtn = require('../QuickNotesAssets/images/wlcm/btn.png');

function frmmtTgtime(date: Date): string {
  const hhour = date.getHours().toString().padStart(2, '0');
  const mminute = date.getMinutes().toString().padStart(2, '0');
  const ssecond = date.getSeconds().toString().padStart(2, '0');
  return `${hhour}:${mminute}:${ssecond}`;
}

const QuickNotesMarkNow: React.FC = () => {
  const tggNav = useNavigation<NavigationProp>();
  const { addMark, marks } = useQuickNotesStore();
  const [now, setNow] = useState(() => frmmtTgtime(new Date()));
  const [success, setSuccess] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);

  useEffect(() => {
    const tggId = setInterval(() => {
      setNow(frmmtTgtime(new Date()));
    }, 1000);

    return () => clearInterval(tggId);
  }, []);

  const handleMark = useCallback(() => {
    const timeStr = frmmtTgtime(new Date());

    addMark(timeStr);

    setLastSavedTime(timeStr);

    setSuccess(true);
  }, [addMark]);

  const shreQnMark = useCallback(async () => {
    const tggTxt =
      lastSavedTime ??
      (marks.length > 0 ? marks[marks.length - 1].timeString : now);

    try {
      await Share.share({
        message: `Mark now: ${tggTxt}`,
        title: 'Mark now',
      });
    } catch {
      console.error('Error => share failed');
    }
  }, [lastSavedTime, marks, now]);

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
          <QuickNotesScreenHeader
            onBack={() => tggNav.goBack()}
            titleImage={require('../QuickNotesAssets/images/marktitle.png')}
          />
          <View style={styles.successContent}>
            <Text style={styles.successText}>Successfully!</Text>
            <Image
              source={require('../QuickNotesAssets/images/loadertiger.png')}
            />

            <TouchableOpacity onPress={shreQnMark} activeOpacity={0.8}>
              <ImageBackground source={tggFrameBtn} style={styles.shareButton}>
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
          <QuickNotesScreenHeader
            onBack={() => tggNav.goBack()}
            titleImage={require('../QuickNotesAssets/images/marktitle.png')}
          />
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
              <ImageBackground source={tggFrameBtn} style={styles.markButton}>
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
