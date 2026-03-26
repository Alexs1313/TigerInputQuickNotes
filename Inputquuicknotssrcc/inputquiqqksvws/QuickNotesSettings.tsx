// Settings
import { QuickNotesRoutesList } from '../[Notesrttnvgts]/QuickNotesStack';

import { useQuickNotesStore } from '../inptquiqqssttrg/quickNotesCntxt';

import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import {
  Animated,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { StackNavigationProp } from '@react-navigation/stack';

import QuickNotesLayout from '../inptquqkkcmpnts/QuickNotesLayout';
import QuickNotesScreenHeader from '../inptquqkkcmpnts/QuickNotesScreenHeader';

type QuickInputNavigationProp = StackNavigationProp<
  QuickNotesRoutesList,
  'QuickNotesSettings'
>;

const quickInputBgOptions = [
  { id: 'bg', source: require('../QuickNotesAssets/images/secbg.png') },
  { id: 'bg2', source: require('../QuickNotesAssets/images/bg.png') },
] as const;

function CustomSwitch({
  value,
  onValueChange,
}: {
  value: boolean;
  onValueChange: (v: boolean) => void;
}) {
  const quickInputAnim = React.useRef(
    new Animated.Value(value ? 1 : 0),
  ).current;

  React.useEffect(() => {
    Animated.timing(quickInputAnim, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [value, quickInputAnim]);

  const quickInputTranslateX = quickInputAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 32],
  });

  const quickInputThumbColor = value ? '#90EE90' : '#FFA07A';

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => onValueChange(!value)}
      style={styles.quickInputSwitchTrack}
    >
      <Animated.View
        style={[
          styles.quickInputSwitchThumb,
          {
            backgroundColor: quickInputThumbColor,
            transform: [{ translateX: quickInputTranslateX }],
          },
        ]}
      />
    </TouchableOpacity>
  );
}

const QuickNotesSettings: React.FC = () => {
  const quickInputNav = useNavigation<QuickInputNavigationProp>();

  const {
    quickNotesSoundEnabled,
    setQuickNotesSoundEnabled,
    backgroundId,
    setBackgroundId,
  } = useQuickNotesStore();

  const quickInputToggleSound = useCallback(
    async (selectedValue: boolean): Promise<void> => {
      try {
        await AsyncStorage.setItem(
          'bgMusicIsOn',
          JSON.stringify(selectedValue),
        );
        setQuickNotesSoundEnabled(selectedValue);
      } catch (error) {
        console.log('Error', error);
      }
    },
    [setQuickNotesSoundEnabled],
  );

  return (
    <QuickNotesLayout>
      <View style={styles.quickInputContainer}>
        <QuickNotesScreenHeader
          onBack={() => quickInputNav.goBack()}
          titleImage={require('../QuickNotesAssets/images/settttl.png')}
        />

        {Platform.OS === 'ios' && (
          <LinearGradient
            colors={['#F74408', '#DF1503']}
            style={styles.quickInputGradientSection}
          >
            <View style={styles.quickInputSection}>
              <View style={styles.quickInputSectionRow}>
                <Text style={styles.quickInputSectionLabel}>
                  BACKGROUND MELODY:
                </Text>
                <CustomSwitch
                  value={quickNotesSoundEnabled}
                  onValueChange={value => quickInputToggleSound(value)}
                />
              </View>
            </View>
          </LinearGradient>
        )}

        <LinearGradient
          colors={['#F74408', '#DF1503']}
          style={styles.quickInputGradientSection}
        >
          <View style={styles.quickInputSection}>
            <Text style={[styles.quickInputSectionLabel, { marginBottom: 24 }]}>
              BACKGROUNDS:
            </Text>

            <View style={styles.quickInputBackgroundsRow}>
              {quickInputBgOptions.map(({ id, source }) => {
                const selected = backgroundId === id;

                return (
                  <TouchableOpacity
                    key={id}
                    style={styles.quickInputBackgroundOption}
                    onPress={() => setBackgroundId(id)}
                    activeOpacity={0.8}
                  >
                    <Image
                      source={source}
                      style={styles.quickInputBackgroundPreview}
                      resizeMode="cover"
                    />

                    <View
                      style={[
                        styles.quickInputCheckmark,
                        {
                          backgroundColor: selected ? '#32CD32' : '#fff',
                        },
                      ]}
                    />

                    {selected && (
                      <View style={styles.quickInputCheckmark}>
                        <Image
                          source={require('../QuickNotesAssets/images/selected.png')}
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
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

  quickInputGradientSection: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 22,
    marginBottom: 16,
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

  quickInputSection: {
    paddingHorizontal: 5,
    paddingVertical: 26,
    marginHorizontal: 24,
  },

  quickInputSectionLabel: {
    fontSize: 16,
    fontFamily: 'Manrope-ExtraBold',
    color: '#fff',
    textTransform: 'uppercase',
  },

  quickInputSectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  quickInputSectionFill: {
    flex: 1,
  },

  quickInputSwitchTrack: {
    width: 64,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#eee',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },

  quickInputSwitchThumb: {
    width: 24,
    height: 24,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },

  quickInputBackgroundsRow: {
    flexDirection: 'column',
    gap: 24,
  },

  quickInputBackgroundOption: {
    width: '100%',
    height: 160,
    borderRadius: 22,
    overflow: 'hidden',
  },

  quickInputBackgroundPreview: {
    width: '100%',
    height: '100%',
  },

  quickInputCheckmark: {
    position: 'absolute',
    bottom: 14,
    right: 16,
    width: 43,
    height: 43,
    borderRadius: 12,
    backgroundColor: '#32CD32',
    alignItems: 'center',
    justifyContent: 'center',
  },

  quickInputCheckmarkText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default QuickNotesSettings;
