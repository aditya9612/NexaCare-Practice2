import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, RADIUS } from '../utils/theme';
import { LIVE_MATCHES, UPCOMING_MATCHES } from '../utils/mockData';
import LiveMatchCard from '../components/LiveMatchCard';
import UpcomingMatchCard from '../components/UpcomingMatchCard';

const TABS = ['Live', 'Upcoming', 'Results'];

const COMPLETED_MATCHES = [
  {
    id: 'c1',
    team1: { name: 'India', shortName: 'IND', flag: '🇮🇳', score: '287/4', overs: '50' },
    team2: { name: 'Pakistan', shortName: 'PAK', flag: '🇵🇰', score: '245/9', overs: '50' },
    matchType: 'ODI', venue: 'Sharjah Cricket Stadium',
    date: 'Apr 25', status: 'completed',
    series: 'Asia Cup 2025',
    resultSummary: 'India won by 42 runs',
  },
  {
    id: 'c2',
    team1: { name: 'Australia', shortName: 'AUS', flag: '🇦🇺', score: '156/8', overs: '20' },
    team2: { name: 'New Zealand', shortName: 'NZ', flag: '🇳🇿', score: '158/5', overs: '19.2' },
    matchType: 'T20I', venue: 'MCG, Melbourne',
    date: 'Apr 24', status: 'completed',
    series: 'AUS vs NZ T20I',
    resultSummary: 'New Zealand won by 5 wickets',
  },
];

export default function MatchesScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('Live');

  const renderContent = () => {
    switch (activeTab) {
      case 'Live':
        return (
          <View style={styles.listContainer}>
            {LIVE_MATCHES.length > 0 ? (
              LIVE_MATCHES.map((match) => (
                <LiveMatchCard key={match.id} match={match} fullWidth />
              ))
            ) : (
              <EmptyState icon="📡" message="No live matches right now" sub="Check back later!" />
            )}
          </View>
        );
      case 'Upcoming':
        return (
          <View style={styles.listContainer}>
            {UPCOMING_MATCHES.map((match) => (
              <UpcomingMatchCard key={match.id} match={match} />
            ))}
          </View>
        );
      case 'Results':
        return (
          <View style={styles.listContainer}>
            {COMPLETED_MATCHES.map((match) => (
              <CompletedMatchCard key={match.id} match={match} />
            ))}
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🏏 Matches</Text>
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="options-outline" size={20} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsWrapper}>
        <View style={styles.tabs}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
            >
              {tab === 'Live' && activeTab === 'Live' && (
                <View style={styles.liveTabDot} />
              )}
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab}
              </Text>
              {tab === 'Live' && (
                <View style={styles.liveCount}>
                  <Text style={styles.liveCountText}>{LIVE_MATCHES.length}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {renderContent()}
        <View style={{ height: SPACING.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function CompletedMatchCard({ match }) {
  const isWinner1 = match.resultSummary?.includes(match.team1.name);
  return (
    <View style={styles.completedCard}>
      <View style={styles.completedTop}>
        <Text style={styles.completedSeries}>{match.series}</Text>
        <View style={styles.completedBadge}>
          <Text style={styles.completedBadgeText}>{match.matchType}</Text>
        </View>
      </View>
      <View style={styles.teamsRow}>
        <View style={[styles.teamBlock, isWinner1 && styles.winnerBlock]}>
          <Text style={styles.teamFlagLg}>{match.team1.flag}</Text>
          <Text style={styles.teamNameLg}>{match.team1.shortName}</Text>
          <Text style={styles.scoreText}>{match.team1.score}</Text>
          <Text style={styles.oversText}>{match.team1.overs} ov</Text>
        </View>
        <View style={styles.vsBlock}>
          <Text style={styles.vsText}>VS</Text>
        </View>
        <View style={[styles.teamBlock, !isWinner1 && styles.winnerBlock]}>
          <Text style={styles.teamFlagLg}>{match.team2.flag}</Text>
          <Text style={styles.teamNameLg}>{match.team2.shortName}</Text>
          <Text style={styles.scoreText}>{match.team2.score}</Text>
          <Text style={styles.oversText}>{match.team2.overs} ov</Text>
        </View>
      </View>
      <View style={styles.resultBanner}>
        <Ionicons name="trophy" size={13} color={COLORS.accent} />
        <Text style={styles.resultText}>{match.resultSummary}</Text>
      </View>
    </View>
  );
}

function EmptyState({ icon, message, sub }) {
  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>{icon}</Text>
      <Text style={styles.emptyMessage}>{message}</Text>
      <Text style={styles.emptySub}>{sub}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgDark },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md,
  },
  headerTitle: { fontSize: FONTS.sizes.xl, fontWeight: FONTS.weights.heavy, color: COLORS.textPrimary },
  filterBtn: {
    width: 40, height: 40, borderRadius: RADIUS.md,
    backgroundColor: COLORS.bgCard, borderWidth: 1, borderColor: COLORS.border,
    justifyContent: 'center', alignItems: 'center',
  },
  tabsWrapper: { paddingHorizontal: SPACING.lg, marginBottom: SPACING.md },
  tabs: {
    flexDirection: 'row',
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.md,
    padding: 4,
    borderWidth: 1, borderColor: COLORS.border,
  },
  tab: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingVertical: 10, borderRadius: RADIUS.sm - 2, gap: 6,
  },
  tabActive: { backgroundColor: COLORS.primary },
  tabText: { fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.semibold, color: COLORS.textMuted },
  tabTextActive: { color: '#fff' },
  liveTabDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#fff' },
  liveCount: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10, paddingHorizontal: 6, paddingVertical: 1,
  },
  liveCountText: { fontSize: 10, color: '#fff', fontWeight: '700' },
  listContainer: { paddingHorizontal: SPACING.lg, gap: SPACING.md },

  // Completed card
  completedCard: {
    backgroundColor: COLORS.bgCard, borderRadius: RADIUS.lg,
    borderWidth: 1, borderColor: COLORS.border,
    padding: SPACING.md, marginBottom: SPACING.md,
  },
  completedTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.md },
  completedSeries: { fontSize: FONTS.sizes.xs, color: COLORS.textSecondary, flex: 1 },
  completedBadge: {
    backgroundColor: COLORS.bgCardLight, borderRadius: RADIUS.sm,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  completedBadgeText: { fontSize: 10, color: COLORS.textSecondary, fontWeight: '600' },
  teamsRow: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.sm },
  teamBlock: { flex: 1, alignItems: 'center', gap: 4, opacity: 0.6 },
  winnerBlock: { opacity: 1 },
  teamFlagLg: { fontSize: 28 },
  teamNameLg: { fontSize: FONTS.sizes.md, fontWeight: FONTS.weights.bold, color: COLORS.textPrimary },
  scoreText: { fontSize: FONTS.sizes.lg, fontWeight: FONTS.weights.heavy, color: COLORS.textPrimary },
  oversText: { fontSize: FONTS.sizes.xs, color: COLORS.textSecondary },
  vsBlock: { paddingHorizontal: SPACING.md },
  vsText: { fontSize: FONTS.sizes.xs, color: COLORS.textMuted, fontWeight: '700' },
  resultBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(255, 215, 0, 0.08)',
    borderRadius: RADIUS.sm, paddingHorizontal: SPACING.sm, paddingVertical: 6,
    borderWidth: 1, borderColor: 'rgba(255, 215, 0, 0.15)',
  },
  resultText: { fontSize: FONTS.sizes.xs, color: COLORS.accent, fontWeight: FONTS.weights.semibold, flex: 1 },

  emptyState: { alignItems: 'center', paddingVertical: 60, gap: SPACING.sm },
  emptyIcon: { fontSize: 48 },
  emptyMessage: { fontSize: FONTS.sizes.lg, fontWeight: FONTS.weights.bold, color: COLORS.textPrimary },
  emptySub: { fontSize: FONTS.sizes.sm, color: COLORS.textSecondary },
});
