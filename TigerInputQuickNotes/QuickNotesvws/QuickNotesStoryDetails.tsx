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
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RouteProp } from '@react-navigation/native';

import QuickNotesLayout from '../QuickNotescmpnts/QuickNotesLayout';
import QuickNotesScreenHeader from '../QuickNotescmpnts/QuickNotesScreenHeader';
import { QuickNotesRoutesList } from '../[Notesrttnvgts]/QuickNotesStack';
import LinearGradient from 'react-native-linear-gradient';

type NavigationProp = StackNavigationProp<
  QuickNotesRoutesList,
  'QuickNotesStoryDetails'
>;

type RouteProps = RouteProp<QuickNotesRoutesList, 'QuickNotesStoryDetails'>;

const QuickNotesStoryDetails: React.FC = () => {
  const tggNav = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const { story } = route.params;

  const tggShareStory = async () => {
    try {
      const result = await Share.share({
        message: `${story.title}\n\n${story.content}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.error('Error sharing story:', error);
    }
  };

  return (
    <ImageBackground
      source={require('../QuickNotesAssets/images/darkBg.png')}
      style={styles.darkScreen}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => tggNav.goBack()}
            style={styles.backButton}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Image
              source={require('../QuickNotesAssets/images/backbutton.png')}
              style={styles.backButtonImage}
            />
          </TouchableOpacity>

          <Text style={styles.tgrStoryHeadTitle}>{story.title}</Text>
        </View>

        <View style={{ paddingHorizontal: 20 }}>
          <View style={styles.tgrStoryCard}>
            <Image source={story.image} style={styles.tgrStoryImage} />

            <View style={styles.storyCont}>
              <ScrollView
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
              >
                <Text style={styles.tgrStoryContent}>{story.content}</Text>
              </ScrollView>
            </View>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={tggShareStory}
          style={{ alignSelf: 'center', marginTop: 20 }}
        >
          <ImageBackground
            source={require('../QuickNotesAssets/images/saveBtn.png')}
            style={styles.saveButton}
          >
            <Text style={styles.saveButtonText}>Share</Text>
          </ImageBackground>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  darkScreen: {
    flex: 1,
  },
  backButton: {
    padding: 4,
    position: 'absolute',
    left: 20,
    top: 50,
    zIndex: 1,
  },
  saveButton: {
    width: 140,
    height: 66,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
    marginTop: 20,
    alignSelf: 'center',
  },
  saveButtonText: {
    fontSize: 18,
    fontFamily: 'Manrope-ExtraBold',
    color: '#fff',
    textTransform: 'uppercase',
    bottom: 4,
  },
  storyCont: {
    padding: 16,
    backgroundColor: '#f73408',
    borderRadius: 12,
    height: 300,
    paddingBottom: 0,
  },
  backButtonImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  shareButton: {
    position: 'absolute',
    right: 20,
    top: 40,
    zIndex: 1,
  },
  shareButtonImage: {
    width: 120,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  },
  shareButtonText: {
    fontSize: 16,
    fontFamily: 'Manrope-ExtraBold',
    color: '#fff',
    textTransform: 'uppercase',
    bottom: 2,
  },
  tgrStoryHeadTitle: {
    fontSize: 20,
    fontFamily: 'Manrope-ExtraBold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 60,
    marginBottom: 30,
  },
  tgrStoryCard: {},
  tgrStoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  tgrStoryTitle: {
    fontSize: 18,
    fontFamily: 'Manrope-ExtraBold',
    color: '#fff',
    flex: 1,
  },
  tgrPawEmoji: {
    fontSize: 20,
    marginLeft: 10,
  },
  tgrStoryImage: {
    width: '100%',
    height: 220,
    marginVertical: 15,
    borderRadius: 12,
  },
  tgrStoryContent: {
    fontSize: 14,
    fontFamily: 'Manrope-Regular',
    color: '#fff',
    lineHeight: 22,
  },
});

export default QuickNotesStoryDetails;
