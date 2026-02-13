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
import QuickNotesLayout from '../QuickNotesComponents/QuickNotesLayout';
import { QuickNotesRoutesList } from '../NotesNavigation/QuickNotesStack';
import { useQuickNotesStore } from '../QuickNotesStore/quickNotesCntxt';
import LinearGradient from 'react-native-linear-gradient';

type NavigationProp = StackNavigationProp<
  QuickNotesRoutesList,
  'QuickNotesNumbers'
>;

function formatDate(date: Date): string {
  const d = date.getDate().toString().padStart(2, '0');
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const y = date.getFullYear();
  return `${d}.${m}.${y}`;
}

const KEYPAD_TOP = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
];

const QuickNotesNumbers: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { addSavedNumber } = useQuickNotesStore();
  const [value, setValue] = useState('');

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onDigit = useCallback((digit: string) => {
    setValue(prev => prev + digit);
  }, []);

  const onBackspace = useCallback(() => {
    setValue(prev => prev.slice(0, -1));
  }, []);

  const onSave = useCallback(() => {
    const trimmed = value.trim();
    if (trimmed === '') return;
    const dateStr = formatDate(new Date());
    addSavedNumber(trimmed, dateStr);
    setValue('');
  }, [value, addSavedNumber]);

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
      <Image source={require('../QuickNotesAssets/images/numberstitle.png')} />
      <View style={styles.headerSpacer} />
    </View>
  );

  return (
    <QuickNotesLayout>
      <View style={styles.container}>
        {header}

        <ImageBackground
          source={require('../QuickNotesAssets/images/smboard.png')}
          style={styles.introBoard}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.boardText}>
              This is where numbers are stored that you may need later.
            </Text>
            <Image
              source={require('../QuickNotesAssets/images/smalltiger.png')}
            />
          </View>
        </ImageBackground>

        <LinearGradient
          colors={['#6A0001', '#8B0202', '#5c1a1a']}
          style={styles.gradientBlock}
        >
          <View style={styles.gradientContent}>
            <View style={styles.displayWrap}>
              <View style={styles.display}>
                <Text style={styles.displayText} numberOfLines={1}>
                  {value || ''}
                </Text>
              </View>
            </View>

            <View style={styles.keypad}>
              {KEYPAD_TOP.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.keypadRow}>
                  {row.map(digit => (
                    <TouchableOpacity
                      key={digit}
                      style={styles.keypadBtn}
                      onPress={() => onDigit(digit)}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.keypadBtnText}>{digit}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
              <View style={styles.keypadRow}>
                <TouchableOpacity
                  style={styles.keypadBtn}
                  onPress={() => onDigit('0')}
                  activeOpacity={0.8}
                >
                  <Text style={styles.keypadBtnText}>0</Text>
                </TouchableOpacity>
                {value.trim() !== '' && (
                  <TouchableOpacity onPress={onSave} activeOpacity={0.8}>
                    <ImageBackground
                      source={require('../QuickNotesAssets/images/saveBtn.png')}
                      style={styles.saveButton}
                    >
                      <Text style={styles.saveButtonText}>SAVE</Text>
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
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  gradientBlock: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 22,
  },
  gradientContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
  },
  backButton: {
    padding: 4,
  },
  backButtonImage: {
    resizeMode: 'contain',
  },
  boardText: {
    fontSize: 12,
    fontFamily: 'PaytoneOne-Regular',
    color: '#45000A',
    textAlign: 'center',
    width: '50%',
    paddingHorizontal: 10,
  },
  introBoard: {
    width: 262,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
    marginBottom: 20,
    alignSelf: 'center',
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
  displayWrap: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  display: {
    backgroundColor: '#DF1503',
    borderRadius: 22,
    paddingHorizontal: 20,
    paddingVertical: 20,
    minHeight: 72,
    justifyContent: 'center',
    textAlign: 'center',
  },
  displayText: {
    fontSize: 32,
    fontFamily: 'Manrope-ExtraBold',
    color: '#fff',
  },
  keypad: {
    paddingHorizontal: 24,
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 12,
  },
  keypadBtn: {
    width: 63,
    height: 65,
    backgroundColor: '#DF1503',
    borderRadius: 18,
    borderWidth: 1.4,
    borderColor: '#FABF1D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backspaceBtn: {
    width: 72,
  },
  keypadBtnText: {
    fontSize: 32,
    fontFamily: 'Manrope-ExtraBold',
    color: '#fff',
  },
  saveButton: {
    width: 140,
    height: 66,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  },
  saveButtonText: {
    fontSize: 18,
    fontFamily: 'Manrope-ExtraBold',
    color: '#fff',
    textTransform: 'uppercase',
    bottom: 4,
  },
});

export default QuickNotesNumbers;
