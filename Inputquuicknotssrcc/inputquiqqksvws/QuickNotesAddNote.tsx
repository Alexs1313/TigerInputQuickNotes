// Add Note

import { QuickNotesRoutesList } from '../[Notesrttnvgts]/QuickNotesStack';

import { useQuickNotesStore } from '../inptquiqqssttrg/quickNotesCntxt';

import { useNavigation } from '@react-navigation/native';

import React, { useCallback, useState } from 'react';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import type { StackNavigationProp } from '@react-navigation/stack';
import QuickNotesLayout from '../inptquqkkcmpnts/QuickNotesLayout';
import QuickNotesScreenHeader from '../inptquqkkcmpnts/QuickNotesScreenHeader';

function frmmtTgdate(date: Date): string {
  const dday = date.getDate().toString().padStart(2, '0');
  const mmonth = (date.getMonth() + 1).toString().padStart(2, '0');
  const yyear = date.getFullYear();
  return `${dday}.${mmonth}.${yyear}`;
}

type QuickInputNavigationProp = StackNavigationProp<
  QuickNotesRoutesList,
  'QuickNotesAddNote'
>;

const FRAME_BTN = require('../QuickNotesAssets/images/wlcm/btn.png');
const DARK_BG = '#45000ADB';

const QuickNotesAddNote: React.FC = () => {
  const quickInputNav = useNavigation<QuickInputNavigationProp>();
  const { addSavedNote } = useQuickNotesStore();

  const [quickInputShowForm, setQuickInputShowForm] = useState(false);
  const [quickInputText, setQuickInputText] = useState('');

  const quickInputAddNewNote = () => {
    setQuickInputShowForm(true);
  };

  const quickInputSaveNote = useCallback(() => {
    const trimmed = quickInputText.trim();

    if (trimmed) {
      addSavedNote(trimmed, frmmtTgdate(new Date()));
    }

    quickInputNav.goBack();
  }, [quickInputText, addSavedNote]);

  if (!quickInputShowForm) {
    return (
      <QuickNotesLayout>
        <View style={styles.quickInputContainer}>
          <QuickNotesScreenHeader
            onBack={() => quickInputNav.goBack()}
            titleImage={require('../QuickNotesAssets/images/texttitle.png')}
          />

          <View style={styles.quickInputInitialContent}>
            <View>
              <ImageBackground
                source={require('../QuickNotesAssets/images/smboard.png')}
                style={styles.quickInputIntroBoard}
              >
                <View>
                  <Text style={styles.quickInputBoardText}>
                    You can leave a short note here.
                  </Text>
                </View>
              </ImageBackground>

              <Image
                source={require('../QuickNotesAssets/images/noteimg.png')}
                style={styles.quickInputNoteImage}
              />
            </View>

            <Image
              source={require('../QuickNotesAssets/images/loadertiger.png')}
              style={styles.quickInputLoaderTiger}
            />

            <TouchableOpacity
              onPress={quickInputAddNewNote}
              activeOpacity={0.8}
            >
              <ImageBackground
                source={FRAME_BTN}
                style={styles.quickInputAddButton}
              >
                <Text style={styles.quickInputAddButtonText}>ADD NEW NOTE</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
      </QuickNotesLayout>
    );
  }

  return (
    <ImageBackground
      source={require('../QuickNotesAssets/images/darkBg.png')}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        >
          <QuickNotesScreenHeader
            onBack={() => quickInputNav.goBack()}
            titleImage={require('../QuickNotesAssets/images/texttitle.png')}
          />

          <View style={styles.quickInputFormContent}>
            <View style={styles.quickInputCardFrame}>
              <Text style={styles.quickInputCardLabel}>ADD NEW NOTE</Text>

              <TextInput
                style={styles.quickInputInput}
                placeholder={'Write text'}
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                value={quickInputText}
                onChangeText={setQuickInputText}
                multiline
                textAlignVertical="top"
              />
            </View>

            <TouchableOpacity onPress={quickInputSaveNote} activeOpacity={0.8}>
              <ImageBackground
                source={require('../QuickNotesAssets/images/saveBtn.png')}
                style={styles.quickInputSaveButton}
              >
                <Text style={styles.quickInputSaveButtonText}>SAVE</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  quickInputContainer: {
    flex: 1,
    paddingBottom: 21,
  },

  quickInputDarkScreen: {
    flex: 1,
    backgroundColor: DARK_BG,
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

  quickInputBackButtonText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
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

  quickInputInitialContent: {
    flex: 1,
    alignItems: 'center',
  },

  quickInputBoardText: {
    fontSize: 15,
    fontFamily: 'PaytoneOne-Regular',
    color: '#45000A',
    textAlign: 'center',
    paddingHorizontal: 35,
  },

  quickInputIntroBoard: {
    width: 262,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  },

  quickInputNoteImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: -45,
    alignSelf: 'center',
  },

  quickInputLoaderTiger: {
    width: 215,
    height: 264,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 40,
  },

  quickInputAddButton: {
    width: 236,
    height: 74,
    justifyContent: 'center',
    alignItems: 'center',
  },

  quickInputAddButtonText: {
    fontSize: 18,
    fontFamily: 'Manrope-ExtraBold',
    color: '#fff',
    textTransform: 'uppercase',
    bottom: 4,
  },

  quickInputFormContent: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingTop: 8,
  },

  quickInputCardFrame: {
    width: '95%',
    minHeight: 280,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    marginBottom: 24,
    backgroundColor: 'rgba(144, 3, 2, 1)',
    borderWidth: 1,
    borderRadius: 22,
    borderColor: '#FABF1D',
  },

  quickInputCardLabel: {
    fontSize: 20,
    fontFamily: 'Manrope-ExtraBold',
    color: '#fff',
    textTransform: 'uppercase',
    marginBottom: 20,
  },

  quickInputInput: {
    minHeight: 270,
    fontSize: 14,
    fontFamily: 'Manrope-Regular',
    color: '#fff',
    backgroundColor: '#DF1503',
    borderRadius: 22,
    padding: 27,
  },

  quickInputSaveButton: {
    width: 140,
    height: 66,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
    marginTop: 30,
  },

  quickInputSaveButtonText: {
    fontSize: 18,
    fontFamily: 'Manrope-ExtraBold',
    color: '#fff',
    textTransform: 'uppercase',
    bottom: 4,
  },
});

export default QuickNotesAddNote;
