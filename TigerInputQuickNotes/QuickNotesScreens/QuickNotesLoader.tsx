import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { QuickNotesRoutesList } from '../NotesNavigation/QuickNotesStack';
import QuickNotesLayout from '../QuickNotesComponents/QuickNotesLayout';

type NavigationProp = StackNavigationProp<
  QuickNotesRoutesList,
  'QuickNotesLoader'
>;

const LOADER_DURATION_MS = 5000;

const MIRROR_INTERVAL_MS = 500;

const QuickNotesLoader: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const mirrorAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(mirrorAnim, {
          toValue: 1,
          duration: MIRROR_INTERVAL_MS,
          useNativeDriver: true,
        }),
        Animated.timing(mirrorAnim, {
          toValue: 0,
          duration: MIRROR_INTERVAL_MS,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [mirrorAnim]);

  useEffect(() => {
    const t = setTimeout(() => {
      navigation.replace('QuickNotesOnboard');
    }, LOADER_DURATION_MS);
    return () => clearTimeout(t);
  }, [navigation]);

  const scaleX = mirrorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, -1],
  });

  return (
    <QuickNotesLayout>
      <View style={styles.centered}>
        <Animated.View
          style={[styles.horseshoeWrap, { transform: [{ scaleX }] }]}
        >
          <Image
            source={require('../QuickNotesAssets/images/loadertiger.png')}
          />
        </Animated.View>
      </View>
    </QuickNotesLayout>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 120,
  },
  horseshoeWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  horseshoe: {
    width: 180,
    height: 280,
  },
});

export default QuickNotesLoader;
