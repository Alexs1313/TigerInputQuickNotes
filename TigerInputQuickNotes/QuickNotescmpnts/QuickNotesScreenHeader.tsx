import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';

export interface QuickNotesScreenHeaderProps {
  onBack: () => void;
  titleImage: ImageSourcePropType;
}

const QuickNotesScreenHeader: React.FC<QuickNotesScreenHeaderProps> = ({
  onBack,
  titleImage,
}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={onBack}
        style={styles.backButton}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      >
        <Image
          source={require('../QuickNotesAssets/images/backbutton.png')}
          style={styles.backButtonImage}
        />
      </TouchableOpacity>
      <Image source={titleImage} style={styles.titleImage} resizeMode="contain" />
      <View style={styles.headerSpacer} />
    </View>
  );
};

const styles = StyleSheet.create({
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
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  titleImage: {
    maxHeight: 32,
  },
  headerSpacer: {
    width: 40,
  },
});

export default QuickNotesScreenHeader;
