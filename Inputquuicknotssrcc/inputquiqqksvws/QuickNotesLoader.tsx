import type { StackNavigationProp } from '@react-navigation/stack';
import { QuickNotesRoutesList } from '../[Notesrttnvgts]/QuickNotesStack';

import QuickNotesLayout from '../inptquqkkcmpnts/QuickNotesLayout';

import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';

type QuickInputNavigationProp = StackNavigationProp<
  QuickNotesRoutesList,
  'QuickNotesLoader'
>;

const QuickNotesLoader: React.FC = () => {
  const quickInputNav = useNavigation<QuickInputNavigationProp>();
  const quickInputMirrorAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const quickInputLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(quickInputMirrorAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(quickInputMirrorAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    );

    quickInputLoop.start();
    return () => quickInputLoop.stop();
  }, [quickInputMirrorAnim]);

  useEffect(() => {
    const quickInputTimeout = setTimeout(() => {
      quickInputNav.replace('QuickNotesOnboard');
    }, 5000);

    return () => clearTimeout(quickInputTimeout);
  }, [quickInputNav]);

  const quickInputScaleX = quickInputMirrorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, -1],
  });

  return (
    <QuickNotesLayout>
      <View style={styles.quickInputCentered}>
        <Animated.View
          style={[
            styles.quickInputHorseshoeWrap,
            { transform: [{ scaleX: quickInputScaleX }] },
          ]}
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
  quickInputBackground: {
    flex: 1,
  },
  quickInputCentered: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 120,
  },
  quickInputHorseshoeWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickInputHorseshoe: {
    width: 180,
    height: 280,
  },
});

export default QuickNotesLoader;
