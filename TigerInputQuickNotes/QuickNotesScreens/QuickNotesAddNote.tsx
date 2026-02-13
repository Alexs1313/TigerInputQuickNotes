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
import QuickNotesLayout from '../QuickNotesComponents/QuickNotesLayout';
import { QuickNotesRoutesList } from '../NotesNavigation/QuickNotesStack';
import { useQuickNotesStore } from '../QuickNotesStore/quickNotesCntxt';

function formatDate(date: Date): string {
  const d = date.getDate().toString().padStart(2, '0');
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const y = date.getFullYear();
  return `${d}.${m}.${y}`;
}

type NavigationProp = StackNavigationProp<
  QuickNotesRoutesList,
  'QuickNotesAddNote'
>;

const FRAME_BTN = require('../QuickNotesAssets/images/wlcm/btn.png');

const DARK_BG = '#45000ADB';

const QuickNotesAddNote: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { addSavedNote } = useQuickNotesStore();
  const [showForm, setShowForm] = useState(false);
  const [text, setText] = useState('');

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleAddNewNote = useCallback(() => {
    setShowForm(true);
  }, []);

  const handleSave = useCallback(() => {
    const trimmed = text.trim();
    if (trimmed) {
      addSavedNote(trimmed, formatDate(new Date()));
    }
    goBack();
  }, [text, addSavedNote, goBack]);

  const header = (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={goBack}
        style={styles.backButton}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      >
        <Image source={require('../QuickNotesAssets/images/backbutton.png')} />
      </TouchableOpacity>
      <Image source={require('../QuickNotesAssets/images/texttitle.png')} />
      <View style={styles.headerSpacer} />
    </View>
  );

  if (!showForm) {
    return (
      <QuickNotesLayout>
        <View style={styles.container}>
          {header}
          <View style={styles.initialContent}>
            <View>
              <ImageBackground
                source={require('../QuickNotesAssets/images/smboard.png')}
                style={styles.introBoard}
              >
                <View>
                  <Text style={styles.boardText}>
                    You can leave a short note here.
                  </Text>
                </View>
              </ImageBackground>
              <Image
                source={require('../QuickNotesAssets/images/noteimg.png')}
                style={styles.noteImage}
              />
            </View>
            <Image
              source={require('../QuickNotesAssets/images/loadertiger.png')}
              style={styles.loaderTiger}
            />
            <TouchableOpacity onPress={handleAddNewNote} activeOpacity={0.8}>
              <ImageBackground source={FRAME_BTN} style={styles.addButton}>
                <Text style={styles.addButtonText}>ADD NEW NOTE</Text>
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
          {header}
          <View style={styles.formContent}>
            <View style={styles.cardFrame}>
              <Text style={styles.cardLabel}>ADD NEW NOTE</Text>
              <TextInput
                style={styles.input}
                placeholder={'Write text'}
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                value={text}
                onChangeText={setText}
                multiline
                textAlignVertical="top"
              />
            </View>
            <TouchableOpacity onPress={handleSave} activeOpacity={0.8}>
              <ImageBackground
                source={require('../QuickNotesAssets/images/saveBtn.png')}
                style={styles.saveButton}
              >
                <Text style={styles.saveButtonText}>SAVE</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  darkScreen: {
    flex: 1,
    backgroundColor: DARK_BG,
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
  backButtonText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
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
  initialContent: {
    flex: 1,
    alignItems: 'center',
  },
  boardText: {
    fontSize: 15,
    fontFamily: 'PaytoneOne-Regular',
    color: '#45000A',
    textAlign: 'center',
    paddingHorizontal: 35,
  },
  introBoard: {
    width: 262,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  },
  noteImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: -45,
    alignSelf: 'center',
  },
  loaderTiger: {
    width: 215,
    height: 264,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 40,
  },
  addButton: {
    width: 236,
    height: 74,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 18,
    fontFamily: 'Manrope-ExtraBold',
    color: '#fff',
    textTransform: 'uppercase',
    bottom: 4,
  },
  formContent: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingTop: 8,
  },
  cardFrame: {
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
  cardLabel: {
    fontSize: 20,
    fontFamily: 'Manrope-ExtraBold',
    color: '#fff',
    textTransform: 'uppercase',
    marginBottom: 20,
  },
  input: {
    minHeight: 270,
    fontSize: 14,
    fontFamily: 'Manrope-Regular',
    color: '#fff',
    backgroundColor: '#DF1503',
    borderRadius: 22,
    padding: 27,
  },
  saveButton: {
    width: 140,
    height: 66,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
    marginTop: 30,
  },
  saveButtonText: {
    fontSize: 18,
    fontFamily: 'Manrope-ExtraBold',
    color: '#fff',
    textTransform: 'uppercase',
    bottom: 4,
  },
});

export default QuickNotesAddNote;
