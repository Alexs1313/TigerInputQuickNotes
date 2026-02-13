import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { StackNavigationProp } from '@react-navigation/stack';
import QuickNotesLayout from '../QuickNotesComponents/QuickNotesLayout';
import { QuickNotesRoutesList } from '../NotesNavigation/QuickNotesStack';
import LinearGradient from 'react-native-linear-gradient';

type NavigationProp = StackNavigationProp<
  QuickNotesRoutesList,
  'QuickNotesAwards'
>;

const QuickNotesAwards: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const header = (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={goBack}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      >
        <Image
          source={require('../QuickNotesAssets/images/backbutton.png')}
          style={styles.backButtonImage}
        />
      </TouchableOpacity>
      <Image source={require('../QuickNotesAssets/images/awardsttl.png')} />
      <View style={styles.headerSpacer} />
    </View>
  );

  return (
    <QuickNotesLayout>
      <View style={styles.container}>
        {header}
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
