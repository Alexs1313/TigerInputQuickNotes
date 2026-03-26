// Story Details

import type { StackNavigationProp } from '@react-navigation/stack';

import type { RouteProp } from '@react-navigation/native';

import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { QuickNotesRoutesList } from '../[Notesrttnvgts]/QuickNotesStack';

type QuickInputNavigationProp = StackNavigationProp<
  QuickNotesRoutesList,
  'QuickNotesStoryDetails'
>;

type QuickInputRouteProps = RouteProp<
  QuickNotesRoutesList,
  'QuickNotesStoryDetails'
>;

const QuickNotesStoryDetails: React.FC = () => {
  const quickInputNav = useNavigation<QuickInputNavigationProp>();
  const route = useRoute<QuickInputRouteProps>();
  const { story } = route.params;

  const quickInputShareStory = async () => {
    try {
      await Share.share({
        message: `${story.title}\n\n${story.content}`,
      });
    } catch (error) {
      console.error('Error sharing story:', error);
    }
  };

  return (
    <ImageBackground
      source={require('../QuickNotesAssets/images/darkBg.png')}
      style={styles.quickInputDarkScreen}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.quickInputHeaderWrap}>
          <TouchableOpacity
            onPress={() => quickInputNav.goBack()}
            style={styles.quickInputBackButton}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Image
              source={require('../QuickNotesAssets/images/backbutton.png')}
              style={styles.quickInputBackButtonImage}
            />
          </TouchableOpacity>

          <Text style={styles.quickInputStoryHeadTitle}>{story.title}</Text>
        </View>

        <View style={styles.quickInputContentWrap}>
          <View style={styles.quickInputStoryCard}>
            <Image source={story.image} style={styles.quickInputStoryImage} />

            <View style={styles.quickInputStoryContentWrap}>
              <ScrollView
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
              >
                <Text style={styles.quickInputStoryContent}>
                  {story.content}
                </Text>
              </ScrollView>
            </View>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={quickInputShareStory}
          style={styles.quickInputShareWrap}
        >
          <ImageBackground
            source={require('../QuickNotesAssets/images/saveBtn.png')}
            style={styles.quickInputSaveButton}
          >
            <Text style={styles.quickInputSaveButtonText}>Share</Text>
          </ImageBackground>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  quickInputDarkScreen: {
    flex: 1,
  },

  quickInputHeaderWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  quickInputBackButton: {
    padding: 4,
    position: 'absolute',
    left: 20,
    top: 50,
    zIndex: 1,
  },

  quickInputBackButtonImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },

  quickInputStoryHeadTitle: {
    fontSize: 20,
    fontFamily: 'Manrope-ExtraBold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 60,
    marginBottom: 30,
  },

  quickInputContentWrap: {
    paddingHorizontal: 20,
  },

  quickInputStoryCard: {},

  quickInputStoryContentWrap: {
    padding: 16,
    backgroundColor: '#f73408',
    borderRadius: 12,
    height: 300,
    paddingBottom: 0,
  },

  quickInputStoryImage: {
    width: '100%',
    height: 220,
    marginVertical: 15,
    borderRadius: 12,
  },

  quickInputStoryContent: {
    fontSize: 14,
    fontFamily: 'Manrope-Regular',
    color: '#fff',
    lineHeight: 22,
  },

  quickInputShareWrap: {
    alignSelf: 'center',
    marginTop: 20,
  },

  quickInputSaveButton: {
    width: 140,
    height: 66,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
    marginTop: 20,
    alignSelf: 'center',
  },

  quickInputSaveButtonText: {
    fontSize: 18,
    fontFamily: 'Manrope-ExtraBold',
    color: '#fff',
    textTransform: 'uppercase',
    bottom: 4,
  },
});

export default QuickNotesStoryDetails;
