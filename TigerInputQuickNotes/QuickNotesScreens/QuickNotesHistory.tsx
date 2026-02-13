import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { StackNavigationProp } from '@react-navigation/stack';
import QuickNotesLayout from '../QuickNotesComponents/QuickNotesLayout';
import { QuickNotesRoutesList } from '../NotesNavigation/QuickNotesStack';
import {
  useQuickNotesStore,
  type MarkItem,
  type SavedNumberItem,
  type SavedNoteItem,
} from '../QuickNotesStore/quickNotesCntxt';
import LinearGradient from 'react-native-linear-gradient';

type NavigationProp = StackNavigationProp<
  QuickNotesRoutesList,
  'QuickNotesHistory'
>;

type TabKey = 'numbers' | 'text' | 'mark';

function formatDateFromTimestamp(ts: number): string {
  const date = new Date(ts);
  const d = date.getDate().toString().padStart(2, '0');
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const y = date.getFullYear();
  return `${d}.${m}.${y}`;
}

const QuickNotesHistory: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { savedNumbers, savedNotes, marks } = useQuickNotesStore();
  const [activeTab, setActiveTab] = useState<TabKey>('numbers');

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const header = (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={goBack}
        style={styles.backButton}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      >
        <Image
          source={require('../QuickNotesAssets/images/backbutton.png')}
          style={styles.backButtonImage}
        />
      </TouchableOpacity>
      <Image source={require('../QuickNotesAssets/images/historyttl.png')} />
      <View style={styles.headerSpacer} />
    </View>
  );

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'numbers', label: 'NUMBERS' },
    { key: 'text', label: 'TEXT' },
    { key: 'mark', label: 'MARK' },
  ];

  const listData = useMemo(() => {
    if (activeTab === 'numbers') {
      return [...savedNumbers].reverse();
    }
    if (activeTab === 'text') {
      return [...savedNotes].reverse();
    }
    return [...marks].reverse();
  }, [activeTab, savedNumbers, savedNotes, marks]);

  const renderCard = useCallback(
    ({ item }: { item: SavedNumberItem | SavedNoteItem | MarkItem }) => {
      if (activeTab === 'numbers') {
        const n = item as SavedNumberItem;
        return (
          <ImageBackground
            source={require('../QuickNotesAssets/images/smboard.png')}
            style={styles.cardBackground}
          >
            <View
              style={{
                padding: 30,
                alignItems: 'center',
              }}
            >
              <Text style={styles.cardDate}>{n.date}</Text>
              <Text style={styles.cardContent}>{n.value}</Text>
            </View>
          </ImageBackground>
        );
      }
      if (activeTab === 'text') {
        const n = item as SavedNoteItem;
        return (
          <LinearGradient
            colors={['#F74408', '#DF1503']}
            style={styles.gradientBlock}
          >
            <View
              style={{
                padding: 25,
                justifyContent: 'center',
              }}
            >
              <Text style={[styles.cardDate, { color: '#fff' }]}>{n.date}</Text>
              <Text style={styles.cardContentText}>{n.text}</Text>
            </View>
          </LinearGradient>
        );
      }
      const m = item as MarkItem;
      return (
        <ImageBackground
          source={require('../QuickNotesAssets/images/smboard.png')}
          style={styles.cardBackground}
        >
          <View
            style={{
              padding: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={styles.cardDate}>
              {formatDateFromTimestamp(m.timestamp)}
            </Text>
            <Text style={styles.cardContent}>{m.timeString}</Text>
          </View>
        </ImageBackground>
      );
    },
    [activeTab],
  );

  const keyExtractor = useCallback(
    (item: SavedNumberItem | SavedNoteItem | MarkItem) => String(item.id),
    [],
  );

  return (
    <QuickNotesLayout>
      <View style={styles.container}>
        {header}

        <View style={styles.tabsRow}>
          {tabs.map(({ key, label }) => (
            <LinearGradient
              key={key}
              colors={['#F74408', '#DF1503']}
              style={[
                styles.gradientTab,
                { opacity: activeTab === key ? 1 : 0.8 },
              ]}
            >
              <TouchableOpacity
                style={[styles.tab]}
                onPress={() => setActiveTab(key)}
                activeOpacity={0.8}
              >
                <Text style={styles.tabText}>{label}</Text>
              </TouchableOpacity>
            </LinearGradient>
          ))}
        </View>

        <FlatList
          data={listData}
          scrollEnabled={false}
          renderItem={renderCard}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyWrap}>
              <Text style={styles.emptyText}>No entries yet</Text>
            </View>
          }
        />
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
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 10,
  },
  gradientTab: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 30,
    borderRadius: 22,
  },
  gradientBlock: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 30,
    borderRadius: 22,
  },
  cardBackground: {
    width: 262,
    height: 180,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  backButton: {
    padding: 4,
  },
  backButtonImage: {
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Manrope-ExtraBold',
    color: '#fff',
    textTransform: 'uppercase',
  },
  headerSpacer: {
    width: 50,
  },
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 10,
  },
  tab: {
    paddingVertical: 12,
    borderRadius: 16,
    minHeight: 60,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Manrope-ExtraBold',
    color: '#fff',
    textTransform: 'uppercase',
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#DF1503',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#FABF1D',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 12,
  },
  cardDate: {
    fontSize: 14,
    fontFamily: 'PaytoneOne-Regular',
    color: '#45000A',
    marginBottom: 8,
  },
  cardContent: {
    fontSize: 32,
    fontFamily: 'Manrope-ExtraBold',
    color: '#fff',
  },
  cardContentText: {
    fontSize: 14,
    fontFamily: 'Manrope-Regular',
    color: '#fff',
  },
  emptyWrap: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Manrope-Bold',
    color: 'rgba(255,255,255,0.7)',
  },
});

export default QuickNotesHistory;
