import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import type { StackNavigationProp } from '@react-navigation/stack';
import QuickNotesLayout from '../QuickNotescmpnts/QuickNotesLayout';
import { QuickNotesRoutesList } from '../[Notesrttnvgts]/QuickNotesStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sound from 'react-native-sound';
import { useQuickNotesStore } from '../QuickNotessttrg/quickNotesCntxt';

type NavigationProp = StackNavigationProp<
  QuickNotesRoutesList,
  'QuickNotesHome'
>;

const tggFrameBtn = require('../QuickNotesAssets/images/wlcm/btn.png');
const tggFrameBox = require('../QuickNotesAssets/images/wlcm/onboardframe.png');

const tggTps = [
  'Short notes work better than long ones - they are easier to remember.',
  'A number written down right away is less likely to be lost.',
  'Memory gets overloaded with trifles faster than important ones.',
  'One note at the right time saves time later.',
  'Not everything needs to be structured, sometimes it is enough to just save it.',
  'Fixing the moment relieves unnecessary stress.',
  'A note without explanations is often the most accurate.',
  'A simple list is more reliable than a complex system.',
  'Data stored locally remains under control.',
  'Short text is read faster than it seems.',
  'Time is also information.',
  'What is not written down is easy to confuse.',
  'One action is better than a deferred decision.',
  'Fewer steps - fewer mistakes.',
  'Not every note makes sense, and that is normal.',
  'Fixation frees up attention for other things.',
  'Numbers are easier to remember if they are saved.',
  'Writing "for later" often saves "now."',
  'Simple tools last longer.',
  'A short note is sometimes more important than a long text.',
  "You don't need to go back to everything you wrote down.",
  'Writing is not an obligation.',
  'Fewer functions mean less noise.',
  'What is at hand is used more often.',
  'The habit of recording emerges quickly.',
  'Data without interpretation is just facts.',
  'The time of recording is sometimes more important than the content.',
  'Writing down means not keeping it in your head.',
  'Simplicity reduces the number of errors.',
  'If something is important, it is worth one line.',
];

function pickRandomTip(): string {
  return tggTps[Math.floor(Math.random() * tggTps.length)];
}

export const tggHmGridIcn: Record<string, ImageSourcePropType | undefined> = {
  number: undefined,
  text: undefined,
  marknow: undefined,
  award: undefined,
  settings: undefined,
  history: undefined,
};

const tggRtsBtnS: {
  key: string;
  label: string;
  image: ImageSourcePropType | undefined;
}[] = [
  {
    key: 'number',
    label: 'Number',
    image: require('../QuickNotesAssets/images/num.png'),
  },
  {
    key: 'text',
    label: 'Text',
    image: require('../QuickNotesAssets/images/text.png'),
  },
  {
    key: 'marknow',
    label: 'Mark now',
    image: require('../QuickNotesAssets/images/nw.png'),
  },
  {
    key: 'award',
    label: 'Award',
    image: require('../QuickNotesAssets/images/rew.png'),
  },
  {
    key: 'settings',
    label: 'Settings',
    image: require('../QuickNotesAssets/images/sett.png'),
  },
  {
    key: 'history',
    label: 'History',
    image: require('../QuickNotesAssets/images/hist.png'),
  },
];

const QuickNotesHome: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [tip] = useState(pickRandomTip);

  const [sound, setSound] = useState<Sound | null>(null);
  const [quickNotesMusicIdx, setQuickNotesMusicIdx] = useState(0);

  const quickNotesTracksCycle: string[] = [
    'music_unlimited-african-cinematic-ethnic-uplifting-background-music-135532.mp3',
    'music_unlimited-african-cinematic-ethnic-uplifting-background-music-135532.mp3',
  ];
  const { quickNotesSoundEnabled, setQuickNotesSoundEnabled } =
    useQuickNotesStore();

  useFocusEffect(
    useCallback(() => {
      loadQuickNotesBgMusic();
    }, []),
  );

  useEffect(() => {
    playQuickNotesMusic(quickNotesMusicIdx);

    return () => {
      if (sound) {
        sound.stop(() => {
          sound.release();
        });
      }
    };
  }, [quickNotesMusicIdx]);

  const playQuickNotesMusic = (index: number): void => {
    if (sound) {
      sound.stop(() => {
        sound.release();
      });
    }
    const quickNotesTrackPath = quickNotesTracksCycle[index];
    const newQuickNotesMusicSound = new Sound(
      quickNotesTrackPath,
      Sound.MAIN_BUNDLE,
      (error: Error | null) => {
        if (error) {
          console.log('Error =>', error);
          return;
        }
        newQuickNotesMusicSound.play((success: boolean) => {
          if (success) {
            setQuickNotesMusicIdx(
              (prevIndex: number) =>
                (prevIndex + 1) % quickNotesTracksCycle.length,
            );
          } else {
            console.log('Error =>');
          }
        });
        setSound(newQuickNotesMusicSound);
      },
    );
  };

  useEffect(() => {
    const setVolumeQuickNotesMusic = async () => {
      try {
        const quickNotesMusicValue = await AsyncStorage.getItem('bgMusicIsOn');

        const isQuickNotesMusicOn = JSON.parse(quickNotesMusicValue ?? 'true');
        setQuickNotesSoundEnabled(!!isQuickNotesMusicOn);
        if (sound) {
          sound.setVolume(isQuickNotesMusicOn ? 1 : 0);
        }
      } catch (error) {
        console.error('Error =>', error);
      }
    };

    setVolumeQuickNotesMusic();
  }, [sound]);

  useEffect(() => {
    if (sound) {
      sound.setVolume(quickNotesSoundEnabled ? 1 : 0);
    }
  }, [quickNotesSoundEnabled]);

  const loadQuickNotesBgMusic = async () => {
    try {
      const quickNotesMusicValue = await AsyncStorage.getItem('bgMusicIsOn');
      const isQuickNotesMusicOn = JSON.parse(quickNotesMusicValue ?? 'true');
      setQuickNotesSoundEnabled(!!isQuickNotesMusicOn);
    } catch (error) {
      console.error('Error =>', error);
    }
  };

  const shreQnHm = async () => {
    try {
      await Share.share({
        message: tip,
        title: 'Quick note tip',
      });
    } catch {
      console.error('Error => share failed');
    }
  };

  return (
    <QuickNotesLayout>
      <View style={styles.container}>
        <ImageBackground source={tggFrameBox} style={styles.messageBox}>
          <Text style={styles.messageText}>{tip}</Text>
        </ImageBackground>

        <TouchableOpacity
          onPress={shreQnHm}
          activeOpacity={0.8}
          style={{ top: -70 }}
        >
          <ImageBackground source={tggFrameBtn} style={styles.shareButton}>
            <Text style={styles.shareButtonText}>SHARE</Text>
          </ImageBackground>
        </TouchableOpacity>

        <View style={styles.grid}>
          {tggRtsBtnS.map(({ key, label, image }) => (
            <TouchableOpacity
              key={key}
              activeOpacity={0.8}
              style={styles.gridItem}
              onPress={() => {
                if (key === 'text') {
                  navigation.navigate('QuickNotesAddNote');
                } else if (key === 'marknow') {
                  navigation.navigate('QuickNotesMarkNow');
                } else if (key === 'number') {
                  navigation.navigate('QuickNotesNumbers');
                } else if (key === 'history') {
                  navigation.navigate('QuickNotesHistory');
                } else if (key === 'settings') {
                  navigation.navigate('QuickNotesSettings');
                } else if (key === 'award') {
                  navigation.navigate('QuickNotesAwards');
                }
              }}
            >
              <ImageBackground source={image} style={styles.gridButtonFrame}>
                <View style={styles.gridButtonIcon}>
                  {tggHmGridIcn[key] ? (
                    <Image
                      source={tggHmGridIcn[key]}
                      style={styles.gridButtonImage}
                      resizeMode="contain"
                    />
                  ) : null}
                </View>
              </ImageBackground>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('QuickNotesStories')}
          >
            <ImageBackground
              source={require('../QuickNotesAssets/images/wlcm/btn.png')}
              style={styles.storiesButton}
            >
              <Text style={styles.storiesButtonText}>STORIES</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
    </QuickNotesLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 24,
    paddingTop: 50,
  },

  messageBox: {
    width: 355,
    minHeight: 240,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    marginBottom: 16,
    resizeMode: 'contain',
  },
  messageText: {
    fontSize: 20,
    fontFamily: 'PaytoneOne-Regular',
    color: '#45000A',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  shareButton: {
    width: 263,
    height: 89,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  shareButtonText: {
    fontSize: 20,
    fontFamily: 'Manrope-ExtraBold',
    color: '#fff',
    bottom: 4,
  },
  storiesButton: {
    width: 277,
    height: 94,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  storiesButtonText: {
    fontSize: 20,
    fontFamily: 'Manrope-ExtraBold',
    color: '#fff',
    bottom: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 16,
  },
  gridItem: {
    alignItems: 'center',
    width: '30%',
    minWidth: 100,
    maxWidth: 120,
  },
  gridButtonFrame: {
    width: 112,
    height: 112,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  gridButtonIcon: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridButtonImage: {
    width: 40,
    height: 40,
  },
  gridButtonLabel: {
    fontSize: 11,
    fontFamily: 'Manrope-Bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default QuickNotesHome;
