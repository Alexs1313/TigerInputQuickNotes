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

import QuickNotesLayout from '../QuickNotescmpnts/QuickNotesLayout';
import { QuickNotesRoutesList } from '../[Notesrttnvgts]/QuickNotesStack';

type NavigationProp = StackNavigationProp<
  QuickNotesRoutesList,
  'QuickNotesOnboard'
>;

const tggOnboardImges: ImageSourcePropType[] = [
  require('../QuickNotesAssets/images/wlcm/on1.png'),
  require('../QuickNotesAssets/images/wlcm/on2.png'),
  require('../QuickNotesAssets/images/wlcm/on3.png'),
  require('../QuickNotesAssets/images/wlcm/on4.png'),
];

const tggOnboardTxts: ImageSourcePropType[] = [
  require('../QuickNotesAssets/images/wlcm/text1.png'),
  require('../QuickNotesAssets/images/wlcm/text2.png'),
  require('../QuickNotesAssets/images/wlcm/text3.png'),
  require('../QuickNotesAssets/images/wlcm/text4.png'),
];

const QuickNotesOnboard: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation<NavigationProp>();

  const tggBrtnNext = useCallback(() => {
    setCurrentIndex(prev => {
      const next = prev + 1;
      if (next > 3) navigation.navigate('QuickNotesHome');
      return Math.min(next, 3);
    });
  }, [navigation]);

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
          style={styles.tgrTextboard}
        >
          <Image source={tggOnboardTxts[currentIndex]} />
        </ImageBackground>
        <Image
          source={tggOnboardImges[currentIndex]}
          style={[
            styles.tgrOnboardImage,
            currentIndex === 1 && { marginTop: 70 },
            currentIndex === 2 && { marginTop: 60 },
            currentIndex === 3 && { marginTop: 80 },
          ]}
        />

        <TouchableOpacity onPress={tggBrtnNext} activeOpacity={0.8}>
          <ImageBackground
            source={require('../QuickNotesAssets/images/wlcm/btn.png')}
            style={styles.tgrButton}
          >
            <Text style={styles.tgrButtonText}>Next</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </QuickNotesLayout>
  );
};

const styles = StyleSheet.create({
  tgrBackground: {
    flex: 1,
  },
  tgrTextboard: {
    width: 355,
    height: 241,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  },
  tgrOnboardImage: {
    marginBottom: 38,
  },
  tgrButton: {
    width: 236,
    height: 74,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  },
  tgrTextboardText: {
    fontSize: 13,
    fontFamily: 'Manrope-Bold',
    color: '#fff',
    paddingHorizontal: 90,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  tgrButtonText: {
    fontSize: 20,
    fontFamily: 'Manrope-ExtraBold',
    color: '#fff',
    bottom: 4,
  },
});

export default QuickNotesOnboard;
