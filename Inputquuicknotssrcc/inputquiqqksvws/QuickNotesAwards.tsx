// Awards

import { QuickNotesRoutesList } from '../[Notesrttnvgts]/QuickNotesStack';
import LinearGradient from 'react-native-linear-gradient';

import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { StackNavigationProp } from '@react-navigation/stack';
import QuickNotesLayout from '../inptquqkkcmpnts/QuickNotesLayout';
import QuickNotesScreenHeader from '../inptquqkkcmpnts/QuickNotesScreenHeader';

type QuickInputNavigationProp = StackNavigationProp<
  QuickNotesRoutesList,
  'QuickNotesAwards'
>;

const QuickNotesAwards: React.FC = () => {
  const quickInputNav = useNavigation<QuickInputNavigationProp>();

  return (
    <QuickNotesLayout>
      <View style={styles.quickInputContainer}>
        <QuickNotesScreenHeader
          onBack={() => quickInputNav.goBack()}
          titleImage={require('../QuickNotesAssets/images/awardsttl.png')}
        />
        <View style={styles.quickInputContent}>
          <LinearGradient
            colors={['#F74408', '#DF1503']}
            style={styles.quickInputGradientSection}
          >
            <View style={styles.quickInputEmptyBox}>
              <Text style={styles.quickInputEmptyText}>
                It's empty here for now.
              </Text>
            </View>
          </LinearGradient>
        </View>
      </View>
    </QuickNotesLayout>
  );
};

const styles = StyleSheet.create({
  quickInputContainer: {
    flex: 1,
  },
  quickInputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 13,
    paddingTop: 50,
    paddingBottom: 16,
  },
  quickInputBackButtonImage: {
    resizeMode: 'contain',
  },
  quickInputHeaderSpacer: {
    width: 50,
  },
  quickInputContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  quickInputGradientSection: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 22,
    marginBottom: 16,
  },
  quickInputEmptyBox: {
    paddingVertical: 52,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickInputEmptyText: {
    fontSize: 15,
    fontFamily: 'Manrope-Regular',
    color: '#fff',
    textAlign: 'center',
  },
});

export default QuickNotesAwards;
