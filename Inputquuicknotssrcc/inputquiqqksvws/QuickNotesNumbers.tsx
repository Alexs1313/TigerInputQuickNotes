// Numbers

import QuickNotesScreenHeader from '../inptquqkkcmpnts/QuickNotesScreenHeader';

import { QuickNotesRoutesList } from '../[Notesrttnvgts]/QuickNotesStack';

import { useQuickNotesStore } from '../inptquiqqssttrg/quickNotesCntxt';

import LinearGradient from 'react-native-linear-gradient';

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
import type { StackNavigationProp } from '@react-navigation/stack';
import QuickNotesLayout from '../inptquqkkcmpnts/QuickNotesLayout';

type QuickInputNavigationProp = StackNavigationProp<
  QuickNotesRoutesList,
  'QuickNotesNumbers'
>;

function frmmtTgdate(date: Date): string {
  const dday = date.getDate().toString().padStart(2, '0');
  const mmonth = (date.getMonth() + 1).toString().padStart(2, '0');
  const yyear = date.getFullYear();
  return `${dday}.${mmonth}.${yyear}`;
}

const quickInputKeypadTop = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
];

const QuickNotesNumbers: React.FC = () => {
  const quickInputNav = useNavigation<QuickInputNavigationProp>();
  const { addSavedNumber } = useQuickNotesStore();
  const [quickInputValue, setQuickInputValue] = useState('');

  const quickInputOnDigit = useCallback((digit: string) => {
    setQuickInputValue(prev => prev + digit);
  }, []);

  const quickInputSaveNumbers = useCallback(() => {
    const trimmed = quickInputValue.trim();
    if (trimmed === '') return;

    const dateStr = frmmtTgdate(new Date());
    addSavedNumber(trimmed, dateStr);
    setQuickInputValue('');
  }, [quickInputValue, addSavedNumber]);

  return (
    <QuickNotesLayout>
      <View style={styles.quickInputContainer}>
        <QuickNotesScreenHeader
          onBack={() => quickInputNav.goBack()}
          titleImage={require('../QuickNotesAssets/images/numberstitle.png')}
        />

        <ImageBackground
          source={require('../QuickNotesAssets/images/smboard.png')}
          style={styles.quickInputIntroBoard}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.quickInputBoardText}>
              This is where numbers are stored that you may need later.
            </Text>
            <Image
              source={require('../QuickNotesAssets/images/smalltiger.png')}
            />
          </View>
        </ImageBackground>

        <LinearGradient
          colors={['#6A0001', '#8B0202', '#5c1a1a']}
          style={styles.quickInputGradientBlock}
        >
          <View style={styles.quickInputGradientContent}>
            <View style={styles.quickInputDisplayWrap}>
              <View style={styles.quickInputDisplay}>
                <Text style={styles.quickInputDisplayText} numberOfLines={1}>
                  {quickInputValue || ''}
                </Text>
              </View>
            </View>

            <View style={styles.quickInputKeypad}>
              {quickInputKeypadTop.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.quickInputKeypadRow}>
                  {row.map(digit => (
                    <TouchableOpacity
                      key={digit}
                      style={styles.quickInputKeypadBtn}
                      onPress={() => quickInputOnDigit(digit)}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.quickInputKeypadBtnText}>
                        {digit}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}

              <View style={styles.quickInputKeypadRow}>
                <TouchableOpacity
                  style={styles.quickInputKeypadBtn}
                  onPress={() => quickInputOnDigit('0')}
                  activeOpacity={0.8}
                >
                  <Text style={styles.quickInputKeypadBtnText}>0</Text>
                </TouchableOpacity>

                {quickInputValue.trim() !== '' && (
                  <TouchableOpacity
                    onPress={quickInputSaveNumbers}
                    activeOpacity={0.8}
                  >
                    <ImageBackground
                      source={require('../QuickNotesAssets/images/saveBtn.png')}
                      style={styles.quickInputSaveButton}
                    >
                      <Text style={styles.quickInputSaveButtonText}>SAVE</Text>
                    </ImageBackground>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    </QuickNotesLayout>
  );
};

const styles = StyleSheet.create({
  quickInputContainer: {
    flex: 1,
    paddingBottom: 20,
  },

  quickInputGradientBlock: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 22,
  },

  quickInputGradientContent: {
    padding: 20,
  },

  quickInputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
  },

  quickInputBackButton: {
    padding: 4,
  },

  quickInputBackButtonImage: {
    resizeMode: 'contain',
  },

  quickInputBoardText: {
    fontSize: 12,
    fontFamily: 'PaytoneOne-Regular',
    color: '#45000A',
    textAlign: 'center',
    width: '50%',
    paddingHorizontal: 10,
  },

  quickInputIntroBoard: {
    width: 262,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
    marginBottom: 20,
    alignSelf: 'center',
  },

  quickInputTitle: {
    fontSize: 20,
    fontFamily: 'Manrope-ExtraBold',
    color: '#fff',
    textTransform: 'uppercase',
  },

  quickInputHeaderSpacer: {
    width: 50,
  },

  quickInputDisplayWrap: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },

  quickInputDisplay: {
    backgroundColor: '#DF1503',
    borderRadius: 22,
    paddingHorizontal: 20,
    paddingVertical: 20,
    minHeight: 72,
    justifyContent: 'center',
    textAlign: 'center',
  },

  quickInputDisplayText: {
    fontSize: 32,
    fontFamily: 'Manrope-ExtraBold',
    color: '#fff',
  },

  quickInputKeypad: {
    paddingHorizontal: 24,
  },

  quickInputKeypadRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 12,
  },

  quickInputKeypadBtn: {
    width: 63,
    height: 65,
    backgroundColor: '#DF1503',
    borderRadius: 18,
    borderWidth: 1.4,
    borderColor: '#FABF1D',
    justifyContent: 'center',
    alignItems: 'center',
  },

  quickInputBackspaceBtn: {
    width: 72,
  },

  quickInputKeypadBtnText: {
    fontSize: 32,
    fontFamily: 'Manrope-ExtraBold',
    color: '#fff',
  },

  quickInputSaveButton: {
    width: 140,
    height: 66,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  },

  quickInputSaveButtonText: {
    fontSize: 18,
    fontFamily: 'Manrope-ExtraBold',
    color: '#fff',
    textTransform: 'uppercase',
    bottom: 4,
  },
});

export default QuickNotesNumbers;
