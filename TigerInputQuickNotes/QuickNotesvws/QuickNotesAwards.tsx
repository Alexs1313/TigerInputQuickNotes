import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { StackNavigationProp } from '@react-navigation/stack';
import QuickNotesLayout from '../QuickNotescmpnts/QuickNotesLayout';
import QuickNotesScreenHeader from '../QuickNotescmpnts/QuickNotesScreenHeader';
import { QuickNotesRoutesList } from '../[Notesrttnvgts]/QuickNotesStack';
import LinearGradient from 'react-native-linear-gradient';

type NavigationProp = StackNavigationProp<
  QuickNotesRoutesList,
  'QuickNotesAwards'
>;

const QuickNotesAwards: React.FC = () => {
  const tggNav = useNavigation<NavigationProp>();

  return (
    <QuickNotesLayout>
      <View style={styles.container}>
        <QuickNotesScreenHeader
          onBack={() => tggNav.goBack()}
          titleImage={require('../QuickNotesAssets/images/awardsttl.png')}
        />
        <View style={styles.content}>
          <LinearGradient
            colors={['#F74408', '#DF1503']}
            style={styles.gradientSection}
          >
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>It's empty here for now.</Text>
            </View>
          </LinearGradient>
        </View>
      </View>
    </QuickNotesLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 13,
    paddingTop: 50,
    paddingBottom: 16,
  },
  backButtonImage: {
    resizeMode: 'contain',
  },
  headerSpacer: {
    width: 50,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  gradientSection: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 22,
    marginBottom: 16,
  },
  emptyBox: {
    paddingVertical: 52,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 15,
    fontFamily: 'Manrope-Regular',
    color: '#fff',
    textAlign: 'center',
  },
});

export default QuickNotesAwards;
