// Stories

import QuickNotesScreenHeader from '../inptquqkkcmpnts/QuickNotesScreenHeader';

import { QuickNotesRoutesList } from '../[Notesrttnvgts]/QuickNotesStack';

import LinearGradient from 'react-native-linear-gradient';

import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { StackNavigationProp } from '@react-navigation/stack';

import QuickNotesLayout from '../inptquqkkcmpnts/QuickNotesLayout';

type QuickInputNavigationProp = StackNavigationProp<
  QuickNotesRoutesList,
  'QuickNotesStories'
>;

const quickInputStories = [
  {
    title: 'The Number on the Door',
    image: require('../QuickNotesAssets/images/tigerstory1.png'),
    content: `Today I stopped by an old door...`,
  },
  {
    title: 'One Line',
    image: require('../QuickNotesAssets/images/tigerstory2.png'),
    content: `Today was quiet...`,
  },
  {
    title: 'The Present Moment',
    image: require('../QuickNotesAssets/images/tigerstory3.png'),
    content: `I was not in a hurry...`,
  },
  {
    title: 'Effortless',
    image: require('../QuickNotesAssets/images/tigerstory4.png'),
    content: `There are things that don't require effort...`,
  },
  {
    title: 'A Simple Place',
    image: require('../QuickNotesAssets/images/tigerstory5.png'),
    content: `I don't look for complicated things...`,
  },
];

const QuickNotesStories: React.FC = () => {
  const quickInputNav = useNavigation<QuickInputNavigationProp>();

  return (
    <QuickNotesLayout>
      <View style={styles.quickInputContainer}>
        <QuickNotesScreenHeader
          onBack={() => quickInputNav.goBack()}
          titleImage={require('../QuickNotesAssets/images/strsttl.png')}
        />

        <ScrollView
          style={styles.quickInputScrollView}
          contentContainerStyle={styles.quickInputScrollContent}
          showsVerticalScrollIndicator={false}
        >
          {quickInputStories.map((story, index) => (
            <LinearGradient
              key={index}
              colors={['#6A0001', '#900302']}
              style={{
                borderRadius: 22,
                marginBottom: 12,
                borderWidth: 0.7,
                borderColor: '#FABF1D',
              }}
            >
              <View style={styles.quickInputStoryContainer}>
                <View style={styles.quickInputStoryHeader}>
                  <Text style={styles.quickInputStoryTitle}>{story.title}</Text>
                </View>

                <View style={styles.quickInputStoryContentWrap}>
                  <Image
                    source={story.image}
                    style={styles.quickInputStoryImage}
                  />
                  <Text style={styles.quickInputStoryContent} numberOfLines={3}>
                    {story.content}
                  </Text>
                </View>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    quickInputNav.navigate('QuickNotesStoryDetails', {
                      story,
                    })
                  }
                >
                  <ImageBackground
                    source={require('../QuickNotesAssets/images/saveBtn.png')}
                    style={styles.quickInputSaveButton}
                  >
                    <Text style={styles.quickInputSaveButtonText}>READ</Text>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          ))}
        </ScrollView>
      </View>
    </QuickNotesLayout>
  );
};

const styles = StyleSheet.create({
  quickInputContainer: {
    flex: 1,
  },

  quickInputScrollView: {
    flex: 1,
  },

  quickInputScrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  quickInputStoryContainer: {
    padding: 20,
  },

  quickInputStoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  quickInputStoryContentWrap: {
    padding: 10,
    backgroundColor: '#f73408',
    borderRadius: 12,
  },

  quickInputStoryTitle: {
    fontSize: 18,
    fontFamily: 'Manrope-ExtraBold',
    color: '#fff',
    flex: 1,
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

  quickInputStoryContent: {
    fontSize: 14,
    fontFamily: 'Manrope-Regular',
    color: '#fff',
    lineHeight: 20,
  },

  quickInputStoryImage: {
    width: '100%',
    height: 142,
    marginVertical: 15,
    borderRadius: 12,
  },

  quickInputSeparator: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginTop: 30,
  },
});

export default QuickNotesStories;
