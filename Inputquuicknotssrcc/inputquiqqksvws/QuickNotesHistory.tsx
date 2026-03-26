// History

import {
  useQuickNotesStore,
  type MarkItem,
  type SavedNumberItem,
  type SavedNoteItem,
} from '../inptquiqqssttrg/quickNotesCntxt';

import LinearGradient from 'react-native-linear-gradient';

import { useNavigation } from '@react-navigation/native';

import React, { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { StackNavigationProp } from '@react-navigation/stack';

import QuickNotesLayout from '../inptquqkkcmpnts/QuickNotesLayout';

import QuickNotesScreenHeader from '../inptquqkkcmpnts/QuickNotesScreenHeader';
import { QuickNotesRoutesList } from '../[Notesrttnvgts]/QuickNotesStack';

type QuickInputNavigationProp = StackNavigationProp<
  QuickNotesRoutesList,
  'QuickNotesHistory'
>;

type TabKey = 'numbers' | 'text' | 'mark';

function formatDateFromTimestamp(ts: number): string {
  const date = new Date(ts);
  const dday = date.getDate().toString().padStart(2, '0');
  const mmonth = (date.getMonth() + 1).toString().padStart(2, '0');
  const yyear = date.getFullYear();
  return `${dday}.${mmonth}.${yyear}`;
}

const QuickNotesHistory: React.FC = () => {
  const quickInputNav = useNavigation<QuickInputNavigationProp>();
  const { savedNumbers, savedNotes, marks } = useQuickNotesStore();
  const [quickInputActiveTab, setQuickInputActiveTab] =
    useState<TabKey>('numbers');

  const quickInputTabs: { key: TabKey; label: string }[] = [
    { key: 'numbers', label: 'NUMBERS' },
    { key: 'text', label: 'TEXT' },
    { key: 'mark', label: 'MARK' },
  ];

  const quickInputListData = useMemo(() => {
    if (quickInputActiveTab === 'numbers') {
      return [...savedNumbers].reverse();
    }
    if (quickInputActiveTab === 'text') {
      return [...savedNotes].reverse();
    }
    return [...marks].reverse();
  }, [quickInputActiveTab, savedNumbers, savedNotes, marks]);

  const renderCard = useCallback(
    ({ item }: { item: SavedNumberItem | SavedNoteItem | MarkItem }) => {
      if (quickInputActiveTab === 'numbers') {
        const n = item as SavedNumberItem;
        return (
          <ImageBackground
            source={require('../QuickNotesAssets/images/smboard.png')}
            style={styles.quickInputCardBackground}
          >
            <View style={{ padding: 30, alignItems: 'center' }}>
              <Text style={styles.quickInputCardDate}>{n.date}</Text>
              <Text style={styles.quickInputCardContent}>{n.value}</Text>
            </View>
          </ImageBackground>
        );
      }

      if (quickInputActiveTab === 'text') {
        const n = item as SavedNoteItem;
        return (
          <LinearGradient
            colors={['#F74408', '#DF1503']}
            style={styles.quickInputGradientBlock}
          >
            <View style={{ padding: 25, justifyContent: 'center' }}>
              <Text style={[styles.quickInputCardDate, { color: '#fff' }]}>
                {n.date}
              </Text>
              <Text style={styles.quickInputCardContentText}>{n.text}</Text>
            </View>
          </LinearGradient>
        );
      }

      const m = item as MarkItem;
      return (
        <ImageBackground
          source={require('../QuickNotesAssets/images/smboard.png')}
          style={styles.quickInputCardBackground}
        >
          <View
            style={{
              padding: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={styles.quickInputCardDate}>
              {formatDateFromTimestamp(m.timestamp)}
            </Text>
            <Text style={styles.quickInputCardContent}>{m.timeString}</Text>
          </View>
        </ImageBackground>
      );
    },
    [quickInputActiveTab],
  );

  const keyExtractor = useCallback(
    (item: SavedNumberItem | SavedNoteItem | MarkItem) => String(item.id),
    [],
  );

  return (
    <QuickNotesLayout>
      <View style={styles.quickInputContainer}>
        <QuickNotesScreenHeader
          onBack={() => quickInputNav.goBack()}
          titleImage={require('../QuickNotesAssets/images/historyttl.png')}
        />

        <View style={styles.quickInputTabsRow}>
          {quickInputTabs.map(({ key, label }) => (
            <LinearGradient
              key={key}
              colors={['#F74408', '#DF1503']}
              style={[
                styles.quickInputGradientTab,
                { opacity: quickInputActiveTab === key ? 1 : 0.8 },
              ]}
            >
              <TouchableOpacity
                style={styles.quickInputTab}
                onPress={() => setQuickInputActiveTab(key)}
                activeOpacity={0.8}
              >
                <Text style={styles.quickInputTabText}>{label}</Text>
              </TouchableOpacity>
            </LinearGradient>
          ))}
        </View>

        <FlatList
          data={quickInputListData}
          scrollEnabled={false}
          renderItem={renderCard}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.quickInputListContent}
          ListEmptyComponent={
            <View style={styles.quickInputEmptyWrap}>
              <Text style={styles.quickInputEmptyText}>No entries yet</Text>
            </View>
          }
        />
      </View>
    </QuickNotesLayout>
  );
};

const styles = StyleSheet.create({
  quickInputContainer: { flex: 1 },

  quickInputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 10,
  },

  quickInputGradientTab: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 30,
    borderRadius: 22,
  },

  quickInputGradientBlock: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 30,
    borderRadius: 22,
  },

  quickInputCardBackground: {
    width: 262,
    height: 180,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },

  quickInputBackButton: { padding: 4 },

  quickInputBackButtonImage: { resizeMode: 'contain' },

  quickInputTitle: {
    fontSize: 20,
    fontFamily: 'Manrope-ExtraBold',
    color: '#fff',
    textTransform: 'uppercase',
  },

  quickInputHeaderSpacer: { width: 50 },

  quickInputTabsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 10,
  },

  quickInputTab: {
    paddingVertical: 12,
    borderRadius: 16,
    minHeight: 60,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  quickInputTabText: {
    fontSize: 14,
    fontFamily: 'Manrope-ExtraBold',
    color: '#fff',
    textTransform: 'uppercase',
  },

  quickInputListContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },

  quickInputCard: {
    backgroundColor: '#DF1503',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#FABF1D',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 12,
  },

  quickInputCardDate: {
    fontSize: 14,
    fontFamily: 'PaytoneOne-Regular',
    color: '#45000A',
    marginBottom: 8,
  },

  quickInputCardContent: {
    fontSize: 32,
    fontFamily: 'Manrope-ExtraBold',
    color: '#fff',
  },

  quickInputCardContentText: {
    fontSize: 14,
    fontFamily: 'Manrope-Regular',
    color: '#fff',
  },

  quickInputEmptyWrap: {
    paddingVertical: 40,
    alignItems: 'center',
  },

  quickInputEmptyText: {
    fontSize: 16,
    fontFamily: 'Manrope-Bold',
    color: 'rgba(255,255,255,0.7)',
  },
});

export default QuickNotesHistory;
