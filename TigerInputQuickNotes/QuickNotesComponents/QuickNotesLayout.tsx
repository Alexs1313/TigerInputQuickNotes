import React from 'react';
import { ImageBackground, ScrollView } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { useQuickNotesStore } from '../QuickNotesStore/quickNotesCntxt';

const BACKGROUNDS: Record<string, ImageSourcePropType> = {
  bg: require('../QuickNotesAssets/images/bg.png'),
  bg2: require('../QuickNotesAssets/images/secbg.png'),
};

const QuickNotesLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { backgroundId } = useQuickNotesStore();
  const source = BACKGROUNDS[backgroundId] ?? BACKGROUNDS.bg;

  return (
    <ImageBackground source={source} style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </ImageBackground>
  );
};

export default QuickNotesLayout;
