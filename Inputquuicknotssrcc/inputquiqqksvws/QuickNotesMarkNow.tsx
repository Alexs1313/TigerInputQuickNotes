// Mark Now

import QuickNotesLayout from '../inptquqkkcmpnts/QuickNotesLayout';

import QuickNotesScreenHeader from '../inptquqkkcmpnts/QuickNotesScreenHeader';
import { QuickNotesRoutesList } from '../[Notesrttnvgts]/QuickNotesStack';

import { useQuickNotesStore } from '../inptquiqqssttrg/quickNotesCntxt';
import LinearGradient from 'react-native-linear-gradient';

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

type QuickInputNavigationProp = StackNavigationProp<
  QuickNotesRoutesList,
  'QuickNotesMarkNow'
>;

const quickInputFrameBtn = require('../QuickNotesAssets/images/wlcm/btn.png');

function frmmtTgtime(date: Date): string {
  const hhour = date.getHours().toString().padStart(2, '0');
  const mminute = date.getMinutes().toString().padStart(2, '0');
  const ssecond = date.getSeconds().toString().padStart(2, '0');
  return `${hhour}:${mminute}:${ssecond}`;
}

const QuickNotesMarkNow: React.FC = () => {
  const quickInputNav = useNavigation<QuickInputNavigationProp>();
  const { addMark, marks } = useQuickNotesStore();

  const [quickInputNow, setQuickInputNow] = useState(() =>
    frmmtTgtime(new Date()),
  );
  const [quickInputSuccess, setQuickInputSuccess] = useState(false);
  const [quickInputLastSavedTime, setQuickInputLastSavedTime] = useState<
    string | null
  >(null);

  useEffect(() => {
    const quickInputInterval = setInterval(() => {
      setQuickInputNow(frmmtTgtime(new Date()));
    }, 1000);

    return () => clearInterval(quickInputInterval);
  }, []);

  const quickInputHandleMark = useCallback(() => {
    const timeStr = frmmtTgtime(new Date());

    addMark(timeStr);
    setQuickInputLastSavedTime(timeStr);
    setQuickInputSuccess(true);
  }, [addMark]);

  const quickInputShareMark = useCallback(async () => {
    const text =
      quickInputLastSavedTime ??
      (marks.length > 0 ? marks[marks.length - 1].timeString : quickInputNow);

    try {
      await Share.share({
        message: `Mark now: ${text}`,
        title: 'Mark now',
      });
    } catch {
      console.error('Error => share failed');
    }
  }, [quickInputLastSavedTime, marks, quickInputNow]);

  if (quickInputSuccess) {
    return (
      <ImageBackground
        source={require('../QuickNotesAssets/images/darkBg.png')}
        style={styles.quickInputDarkScreen}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <QuickNotesScreenHeader
            onBack={() => quickInputNav.goBack()}
            titleImage={require('../QuickNotesAssets/images/marktitle.png')}
          />

          <View style={styles.quickInputSuccessContent}>
            <Text style={styles.quickInputSuccessText}>Successfully!</Text>

            <Image
              source={require('../QuickNotesAssets/images/loadertiger.png')}
            />

            <TouchableOpacity onPress={quickInputShareMark} activeOpacity={0.8}>
              <ImageBackground
                source={quickInputFrameBtn}
                style={styles.quickInputShareButton}
              >
                <Text style={styles.quickInputShareButtonText}>SHARE</Text>
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
        <View style={styles.quickInputContainer}>
          <QuickNotesScreenHeader
            onBack={() => quickInputNav.goBack()}
            titleImage={require('../QuickNotesAssets/images/marktitle.png')}
          />

          <View style={styles.quickInputContent}>
            <LinearGradient
              colors={['#DF1503', '#DF1503']}
              style={styles.quickInputTimeBox}
            >
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 24,
                  alignItems: 'center',
                }}
              >
                <Text style={styles.quickInputTimeLabel}>Now:</Text>
                <Text style={styles.quickInputTimeValue}>{quickInputNow}</Text>
              </View>
            </LinearGradient>

            <TouchableOpacity
              onPress={quickInputHandleMark}
              activeOpacity={0.8}
            >
              <ImageBackground
                source={quickInputFrameBtn}
                style={styles.quickInputMarkButton}
              >
                <Text style={styles.quickInputMarkButtonText}>MARK</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </QuickNotesLayout>
  );
};

const styles = StyleSheet.create({
  quickInputContainer: { flex: 1 },

  quickInputDarkScreen: { flex: 1 },

  quickInputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 80,
    paddingBottom: 16,
  },

  quickInputBackButton: { padding: 4 },

  quickInputBackButtonImage: { resizeMode: 'contain' },

  quickInputTitle: {
    fontSize: 20,
    fontFamily: 'Manrope-ExtraBold',
    color: '#fff',
    textTransform: 'uppercase',
  },

  quickInputHeaderSpacer: { width: 50 },

  quickInputContent: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
  },

  quickInputTimeBox: {
    width: '85%',
    backgroundColor: '#DF1503',
    borderRadius: 22,
    marginBottom: 32,
  },

  quickInputTimeLabel: {
    fontSize: 15,
    fontFamily: 'Manrope-Regular',
    color: '#fff',
    marginBottom: 8,
  },

  quickInputTimeValue: {
    fontSize: 32,
    fontFamily: 'Manrope-ExtraBold',
    color: '#fff',
  },

  quickInputMarkButton: {
    width: 263,
    height: 89,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  quickInputMarkButtonText: {
    fontSize: 20,
    fontFamily: 'Manrope-ExtraBold',
    color: '#fff',
    textTransform: 'uppercase',
    bottom: 4,
  },

  quickInputSuccessContent: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
  },

  quickInputSuccessText: {
    fontSize: 28,
    fontFamily: 'Manrope-ExtraBold',
    color: '#fff',
    marginBottom: 40,
  },

  quickInputShareButton: {
    width: 236,
    height: 74,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },

  quickInputShareButtonText: {
    fontSize: 18,
    fontFamily: 'Manrope-ExtraBold',
    color: '#fff',
    textTransform: 'uppercase',
    bottom: 4,
  },
});

export default QuickNotesMarkNow;
