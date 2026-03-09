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
import QuickNotesLayout from '../QuickNotescmpnts/QuickNotesLayout';
import QuickNotesScreenHeader from '../QuickNotescmpnts/QuickNotesScreenHeader';
import { QuickNotesRoutesList } from '../[Notesrttnvgts]/QuickNotesStack';
import { useQuickNotesStore } from '../QuickNotessttrg/quickNotesCntxt';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NavigationProp = StackNavigationProp<
  QuickNotesRoutesList,
  'QuickNotesSettings'
>;

const tggBgOptions = [
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
  const anim = React.useRef(new Animated.Value(value ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(anim, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [value, anim]);

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 32],
  });

  const thumbColor = value ? '#90EE90' : '#FFA07A';

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => onValueChange(!value)}
      style={styles.switchTrack}
    >
      <Animated.View
        style={[
          styles.switchThumb,
          { backgroundColor: thumbColor, transform: [{ translateX }] },
        ]}
      />
    </TouchableOpacity>
  );
}

const QuickNotesSettings: React.FC = () => {
  const tggNav = useNavigation<NavigationProp>();
  const {
    quickNotesSoundEnabled,
    setQuickNotesSoundEnabled,
    backgroundId,
    setBackgroundId,
  } = useQuickNotesStore();

  const tggTglSound = useCallback(
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
      <View style={styles.container}>
        <QuickNotesScreenHeader
          onBack={() => tggNav.goBack()}
          titleImage={require('../QuickNotesAssets/images/settttl.png')}
        />
        {Platform.OS === 'ios' && (
          <LinearGradient
            colors={['#F74408', '#DF1503']}
            style={styles.gradientSection}
          >
            <View style={styles.section}>
              <View style={styles.sectionRow}>
                <Text style={styles.sectionLabel}>BACKGROUND MELODY:</Text>
                <CustomSwitch
                  value={quickNotesSoundEnabled}
                  onValueChange={value => tggTglSound(value)}
                />
              </View>
            </View>
          </LinearGradient>
        )}

        <LinearGradient
          colors={['#F74408', '#DF1503']}
          style={styles.gradientSection}
        >
          <View style={styles.section}>
            <Text style={[styles.sectionLabel, { marginBottom: 24 }]}>
              BACKGROUNDS:
            </Text>
            <View style={styles.backgroundsRow}>
              {tggBgOptions.map(({ id, source }) => {
                const selected = backgroundId === id;
                return (
                  <TouchableOpacity
                    key={id}
                    style={styles.backgroundOption}
                    onPress={() => setBackgroundId(id)}
                    activeOpacity={0.8}
                  >
                    <Image
                      source={source}
                      style={styles.backgroundPreview}
                      resizeMode="cover"
                    />
                    <View
                      style={[
                        styles.checkmark,
                        { backgroundColor: selected ? '#32CD32' : '#fff' },
                      ]}
                    ></View>
                    {selected && (
                      <View style={styles.checkmark}>
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
  container: {
    flex: 1,
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
  gradientSection: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 22,
    marginBottom: 16,
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
  section: {
    paddingHorizontal: 5,
    paddingVertical: 26,
    marginHorizontal: 24,
  },
  sectionLabel: {
    fontSize: 16,
    fontFamily: 'Manrope-ExtraBold',
    color: '#fff',
    textTransform: 'uppercase',
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionFill: {
    flex: 1,
  },
  switchTrack: {
    width: 64,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#eee',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  switchThumb: {
    width: 24,
    height: 24,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  backgroundsRow: {
    flexDirection: 'column',
    gap: 24,
  },
  backgroundOption: {
    width: '100%',
    height: 160,
    borderRadius: 22,
    overflow: 'hidden',
  },
  backgroundPreview: {
    width: '100%',
    height: '100%',
  },
  checkmark: {
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
  checkmarkText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default QuickNotesSettings;
