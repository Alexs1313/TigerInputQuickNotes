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

import QuickNotesLayout from '../QuickNotescmpnts/QuickNotesLayout';
import QuickNotesScreenHeader from '../QuickNotescmpnts/QuickNotesScreenHeader';
import { QuickNotesRoutesList } from '../[Notesrttnvgts]/QuickNotesStack';
import LinearGradient from 'react-native-linear-gradient';

type NavigationProp = StackNavigationProp<
  QuickNotesRoutesList,
  'QuickNotesStories'
>;

const tggStories = [
  {
    title: 'The Number on the Door',
    image: require('../QuickNotesAssets/images/tigerstory1.png'),
    content: `Today I stopped by an old door in the courtyard. It had been there for a long time, and most people no longer paid attention to it. The surface of the wood was warm from the sun, and the metal element in the middle reflected the light slightly. A number was carved on it. A simple number, without explanation, without a caption, without context.

I looked at it for a few seconds. Not because I was trying to understand something. But because sometimes just noticing it was enough. The number had no history that I knew. But I knew something else - if you leave it only in your memory, it will gradually disappear. Not immediately. Not abruptly. It will simply become less clear, less precise, less real over time.

I raised my paw and saved it.

No comments. No explanations. No meaning to invent.

Now it exists here. It does not depend on whether I remember it or not. It does not change and does not disappear. It just is.

Nothing around me has changed. The sun has moved on. The air has remained just as warm and calm. I took a few steps forward and left the door behind me. I didn't need to turn around or check to see if I had forgotten. Because that's not my job now.

There are things that don't need explaining. They just need to be recorded. Without judgment, without conclusions, without decisions. It doesn't change the world. But it does change the sense of order inside.

I don't add up the numbers. I just don't let them disappear.

And that's enough.`,
  },
  {
    title: 'One Line',
    image: require('../QuickNotesAssets/images/tigerstory2.png'),
    content: `Today was quiet. Not because nothing was happening, but because everything was in its place. The air was still, and even the light fell evenly, without harsh shadows. I stood at the edge of the courtyard and looked ahead, not looking for anything in particular.

I stopped not because I was tired, but because the moment was clear enough to notice.

There is a difference between time that passes and time that is recorded.

I did not change this moment. I did not interfere with it. I simply marked it.

Now it does not depend on memory. It does not disappear or distort. It does not become less precise.

It simply exists.

The world continued to move. The light changed its angle. The space remained the same.

I did not turn back and check anything.

Because now there is no need to check.

The moment has its place.

And that is enough.`,
  },

  {
    title: 'The Present Moment',
    image: require('../QuickNotesAssets/images/tigerstory3.png'),
    content: `I was not in a hurry. There was no reason to be in a hurry here. The space around me remained stable, and even the sound of footsteps dissolved quickly, leaving nothing behind.

I stopped not because I was tired, but because the moment was clear enough to notice.

There is a difference between time that passes and time that is recorded.

I did not change this moment. I did not interfere with it. I simply marked it.

Now it does not depend on memory. It does not disappear or distort. It does not become less precise.

It simply exists.

The world continued to move. The light changed its angle. The space remained the same.

I did not turn back and check anything.

Because now there is no need to check.

The moment has its place.

And that is enough.`,
  },
  {
    title: 'Effortless',
    image: require('../QuickNotesAssets/images/tigerstory4.png'),
    content: `There are things that don't require effort. They don't require attention or control. They just happen, and all you have to do is let them be.

I saw a number. It had no context that would matter to others. But for me, the fact that it was there was enough.

I didn't evaluate it or try to understand it.

I just kept it.

It was an action without consequences and without expectations.

I didn't go back to it and check if it was still there.

Because I knew it was there.

Not every action has to change something. Some actions simply create stability.

Sometimes that's enough to move on without too much fuss.`,
  },
  {
    title: 'A Simple Place',
    image: require('../QuickNotesAssets/images/tigerstory5.png'),
    content: `I don't look for complicated things. Complexity comes by itself, uninvited. But simplicity needs a place.

There is a place here.

I can leave a number and it will remain a number. I can leave a line and it will remain a line. Without change, without interpretation, without noise.

It doesn't change the world. But it changes the distance between thought and silence.

I don't go back to every entry. I don't have to.

It's not important to remember everything. It's important to know that nothing will be lost.

I don't hold on to things. I just give them a place.

And that's enough.`,
  },
];

const QuickNotesStories: React.FC = () => {
  const tggNav = useNavigation<NavigationProp>();

  return (
    <QuickNotesLayout>
      <View style={styles.tgrContainer}>
        <QuickNotesScreenHeader
          onBack={() => tggNav.goBack()}
          titleImage={require('../QuickNotesAssets/images/strsttl.png')}
        />

        <ScrollView
          style={styles.tgrScrollView}
          contentContainerStyle={styles.tgrScrollContent}
          showsVerticalScrollIndicator={false}
        >
          {tggStories.map((story, index) => (
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
              <View key={index} style={styles.tgrStoryContainer}>
                <View style={styles.tgrStoryHeader}>
                  <Text style={styles.tgrStoryTitle}>{story.title}</Text>
                </View>
                <View style={styles.storyCont}>
                  <Image source={story.image} style={styles.tgrStoryImage} />
                  <Text style={styles.tgrStoryContent} numberOfLines={3}>
                    {story.content}
                  </Text>
                </View>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    tggNav.navigate('QuickNotesStoryDetails', { story })
                  }
                >
                  <ImageBackground
                    source={require('../QuickNotesAssets/images/saveBtn.png')}
                    style={styles.saveButton}
                  >
                    <Text style={styles.saveButtonText}>READ</Text>
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
  tgrContainer: {
    flex: 1,
  },
  tgrScrollView: {
    flex: 1,
  },
  tgrScrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  tgrStoryContainer: {
    padding: 20,
    paddingVertical: 20,
  },
  tgrStoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  storyCont: { padding: 10, backgroundColor: '#f73408', borderRadius: 12 },
  tgrStoryTitle: {
    fontSize: 18,
    fontFamily: 'Manrope-ExtraBold',
    color: '#fff',
    flex: 1,
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
  tgrPawEmoji: {
    fontSize: 20,
    marginLeft: 10,
  },
  tgrStoryContent: {
    fontSize: 14,
    fontFamily: 'Manrope-Regular',
    color: '#fff',
    lineHeight: 20,
  },
  tgrStoryImage: {
    width: '100%',
    height: 142,
    marginVertical: 15,
    borderRadius: 12,
  },

  tgrSeparator: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginTop: 30,
  },
});

export default QuickNotesStories;
