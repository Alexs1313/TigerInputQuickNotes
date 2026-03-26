// Onboard

import QuickNotesLayout from '../inptquqkkcmpnts/QuickNotesLayout';
import { QuickNotesRoutesList } from '../[Notesrttnvgts]/QuickNotesStack';

import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import type { StackNavigationProp } from '@react-navigation/stack';

type QuickInputNavigationProp = StackNavigationProp<
  QuickNotesRoutesList,
  'QuickNotesOnboard'
>;

const quickInputOnboardImages: ImageSourcePropType[] = [
  require('../QuickNotesAssets/images/wlcm/on1.png'),
  require('../QuickNotesAssets/images/wlcm/on2.png'),
  require('../QuickNotesAssets/images/wlcm/on3.png'),
  require('../QuickNotesAssets/images/strs.png'),
  require('../QuickNotesAssets/images/wlcm/on4.png'),
];

const quickInputOnboardTexts: ImageSourcePropType[] = [
  require('../QuickNotesAssets/images/wlcm/text1.png'),
  require('../QuickNotesAssets/images/wlcm/text2.png'),
  require('../QuickNotesAssets/images/wlcm/text3.png'),
  require('../QuickNotesAssets/images/strsint.png'),
  require('../QuickNotesAssets/images/wlcm/text4.png'),
];

const quickInputButtonLabel = ['CONTINUE', 'OK', 'NICE', 'NEXT', 'LETS GO'];

const QuickNotesOnboard: React.FC = () => {
  const [quickInputCurrentIndex, setQuickInputCurrentIndex] = useState(0);
  const quickInputNav = useNavigation<QuickInputNavigationProp>();

  const quickInputNextButton = useCallback(() => {
    setQuickInputCurrentIndex(prev => {
      const next = prev + 1;
      if (next > 4) quickInputNav.navigate('QuickNotesHome');
      return Math.min(next, 4);
    });
  }, [quickInputNav]);

  return (
    <QuickNotesLayout>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingBottom: 55,
        }}
      >
        <ImageBackground
          source={require('../QuickNotesAssets/images/wlcm/onboardframe.png')}
          style={styles.quickInputTextboard}
        >
          <Image source={quickInputOnboardTexts[quickInputCurrentIndex]} />
        </ImageBackground>

        <Image
          source={quickInputOnboardImages[quickInputCurrentIndex]}
          style={[
            styles.quickInputOnboardImage,
            quickInputCurrentIndex === 1 && { marginTop: 70 },
            quickInputCurrentIndex === 2 && { marginTop: 60 },
            quickInputCurrentIndex === 3 && { marginTop: 80 },
            quickInputCurrentIndex === 4 && { marginTop: 80 },
          ]}
        />

        <TouchableOpacity onPress={quickInputNextButton} activeOpacity={0.8}>
          <ImageBackground
            source={require('../QuickNotesAssets/images/wlcm/btn.png')}
            style={styles.quickInputButton}
          >
            <Text style={styles.quickInputButtonText}>
              {quickInputButtonLabel[quickInputCurrentIndex]}
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </QuickNotesLayout>
  );
};

const styles = StyleSheet.create({
  quickInputBackground: {
    flex: 1,
  },
  quickInputTextboard: {
    width: 355,
    height: 241,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  },
  quickInputOnboardImage: {
    marginBottom: 38,
  },
  quickInputButton: {
    width: 236,
    height: 74,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  },
  quickInputTextboardText: {
    fontSize: 13,
    fontFamily: 'Manrope-Bold',
    color: '#fff',
    paddingHorizontal: 90,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  quickInputButtonText: {
    fontSize: 20,
    fontFamily: 'Manrope-ExtraBold',
    color: '#fff',
    bottom: 4,
  },
});

export default QuickNotesOnboard;
