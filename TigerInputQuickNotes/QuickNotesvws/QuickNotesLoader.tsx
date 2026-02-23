import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { QuickNotesRoutesList } from '../[Notesrttnvgts]/QuickNotesStack';
import QuickNotesLayout from '../QuickNotescmpnts/QuickNotesLayout';

type NavigationProp = StackNavigationProp<
  QuickNotesRoutesList,
  'QuickNotesLoader'
>;

const QuickNotesLoader: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const mirrorAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(mirrorAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(mirrorAnim, {
          toValue: 0,
          duration: 500,
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
    }, 5000);
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
