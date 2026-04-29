import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, RADIUS } from '../utils/theme';

const TABS = ['Scorecard', 'Commentary', 'Info'];

const MOCK_SCORECARD = {
  batting: [
    { name: 'Virat Kohli', status: 'batting', runs: 67, balls: 42, fours: 6, sixes: 3, sr: 159.5 },
    { name: 'Rohit Sharma', status: 'c Maxwell b Hazlewood', runs: 45, balls: 30, fours: 5, sixes: 2, sr: 150.0 },
    { name: 'KL Rahul', status: 'b Starc', runs: 28, balls: 22, fours: 3, sixes: 0, sr: 127.3 },
    { name: 'Suryakumar Yadav', status: 'lbw b Cummins', runs: 19, balls: 11, fours: 1, sixes: 2, sr: 172.7 },
    { name: 'Hardik Pandya', status: 'not out', runs: 21, balls: 12, fours: 1, sixes: 2, sr: 175.0 },
  ],
  bowling: [
    { name: 'M Starc', overs: 4, maidens: 0, runs: 42, wickets: 1, economy: 10.5 },
    { name: 'P Cummins', overs: 4, maidens: 0, runs: 38, wickets: 1, economy: 9.5 },
    { name: 'J Hazlewood', overs: 3.2, maidens: 0, runs: 29, wickets: 1, economy: 8.7 },
    { name: 'A Zampa', overs: 4, maidens: 0, runs: 44, wickets: 0, economy: 11.0 },
  ],
};

const MOCK_COMMENTARY = [
  { over: '18.2', text: 'Kohli steps across and flicks it over fine leg for a SIX! What a shot!', type: 'six' },
  { over: '18.1', text: 'Full delivery, Kohli drives it straight down the ground. FOUR!', type: 'four' },
  { over: '17.6', text: 'Pandya hits it hard but finds the fielder at long-on. Dot ball.', type: 'dot' },
  { over: '17.5', text: 'Short ball, Pandya pulls it away for a boundary. FOUR!', type: 'four' },
  { over: '17.4', text: 'Fuller delivery, clipped away for a single. 1 run.', type: 'run' },
  { over: '17.3', text: 'Good length ball outside off, left alone. Dot ball.', type: 'dot' },
  { over: '17.2', text: 'WICKET! Suryakumar Yadav is trapped LBW. Great delivery from Cummins! OUT 19 (11)', type: 'wicket' },
  { over: '17.1', text: 'Short of length, Suryakumar pulls it for a maximum! SIX!', type: 'six' },
];

export default function MatchDetailsScreen({ route, navigation }) {
  const { match } = route.params;
  const [activeTab, setActiveTab] = useState('Scorecard');
  const isLive = match.status === 'live';

  const renderScorecard = () => (
    <View>
      {/* Batting Table */}
      <View style={styles.tableCard}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableTitle}>🏏 Batting — {match.team1.shortName}</Text>
        </View>
        <View style={styles.tableRow}>
          {['Batter', 'R', 'B', '4s', '6s', 'SR'].map((h, i) => (
            <Text key={i} style={[styles.tableHead, i === 0 && styles.tableHeadFirst]}>{h}</Text>
          ))}
        </View>
        {MOCK_SCORECARD.batting.map((b, i) => (
          <View key={i} style={[styles.tableRow, i % 2 === 0 && styles.tableRowAlt]}>
            <View style={styles.batterInfo}>
              <Text style={styles.batterName}>{b.name}</Text>
              <Text style={styles.batterStatus} numberOfLines={1}>{b.status}</Text>
            </View>
            <Text style={[styles.tableCell, styles.runsCell]}>{b.runs}</Text>
            <Text style={styles.tableCell}>{b.balls}</Text>
            <Text style={styles.tableCell}>{b.fours}</Text>
            <Text style={styles.tableCell}>{b.sixes}</Text>
            <Text style={styles.tableCell}>{b.sr}</Text>
          </View>
        ))}
      </View>

      {/* Bowling Table */}
      <View style={styles.tableCard}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableTitle}>🎳 Bowling — {match.team2.shortName}</Text>
        </View>
        <View style={styles.tableRow}>
          {['Bowler', 'O', 'M', 'R', 'W', 'Eco'].map((h, i) => (
            <Text key={i} style={[styles.tableHead, i === 0 && styles.tableHeadFirst]}>{h}</Text>
          ))}
        </View>
        {MOCK_SCORECARD.bowling.map((b, i) => (
          <View key={i} style={[styles.tableRow, i % 2 === 0 && styles.tableRowAlt]}>
            <Text style={[styles.tableCell, styles.tableHeadFirst, { color: COLORS.textPrimary }]}>{b.name}</Text>
            <Text style={styles.tableCell}>{b.overs}</Text>
            <Text style={styles.tableCell}>{b.maidens}</Text>
            <Text style={styles.tableCell}>{b.runs}</Text>
            <Text style={[styles.tableCell, b.wickets > 0 && styles.wicketsCell]}>{b.wickets}</Text>
            <Text style={styles.tableCell}>{b.economy}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderCommentary = () => (
    <View style={styles.commentaryContainer}>
      {MOCK_COMMENTARY.map((c, i) => (
        <View key={i} style={styles.commentaryItem}>
          <View style={[styles.overBadge, c.type === 'six' && styles.sixBadge, c.type === 'four' && styles.fourBadge, c.type === 'wicket' && styles.wicketBadge]}>
            <Text style={styles.overBadgeText}>{c.over}</Text>
          </View>
          <View style={styles.commentaryRight}>
            {c.type === 'six' && <Text style={styles.commentaryTag}>🔥 SIX</Text>}
            {c.type === 'four' && <Text style={[styles.commentaryTag, { color: COLORS.accent }]}>⚡ FOUR</Text>}
            {c.type === 'wicket' && <Text style={[styles.commentaryTag, { color: '#FF5252' }]}>🎯 WICKET</Text>}
            <Text style={styles.commentaryText}>{c.text}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderInfo = () => (
    <View style={styles.infoContainer}>
      {[
        { label: 'Match Type', value: match.matchType },
        { label: 'Venue', value: match.venue },
        { label: 'Series', value: match.series },
        { label: 'Status', value: match.status.toUpperCase() },
        { label: 'Toss', value: `${match.team1.name} won the toss and elected to bat` },
        { label: 'Umpires', value: 'Aleem Dar, Kumar Dharmasena' },
        { label: 'Match Referee', value: 'Ranjan Madugalle' },
      ].map((row, i) => (
        <View key={i} style={styles.infoRow}>
          <Text style={styles.infoLabel}>{row.label}</Text>
          <Text style={styles.infoValue}>{row.value}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerSeries} numberOfLines={1}>{match.series}</Text>
          {isLive && (
            <View style={styles.liveChip}>
              <View style={styles.liveDot} />
              <Text style={styles.liveChipText}>LIVE</Text>
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.shareBtn}>
          <Ionicons name="share-outline" size={20} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Score Hero */}
        <View style={styles.scoreHero}>
          <View style={styles.teamScoreBlock}>
            <Text style={styles.teamFlagHero}>{match.team1.flag}</Text>
            <Text style={styles.teamNameHero}>{match.team1.shortName}</Text>
            {match.team1.score ? (
              <>
                <Text style={styles.scoreHeroText}>{match.team1.score}</Text>
                <Text style={styles.oversHeroText}>{match.team1.overs} overs</Text>
              </>
            ) : (
              <Text style={styles.yetToBat}>Yet to bat</Text>
            )}
          </View>

          <View style={styles.vsSeparator}>
            <Text style={styles.vsHeroText}>VS</Text>
            <Text style={styles.matchTypeBadge}>{match.matchType}</Text>
          </View>

          <View style={styles.teamScoreBlock}>
            <Text style={styles.teamFlagHero}>{match.team2.flag}</Text>
            <Text style={styles.teamNameHero}>{match.team2.shortName}</Text>
            {match.team2.score ? (
              <>
                <Text style={styles.scoreHeroText}>{match.team2.score}</Text>
                <Text style={styles.oversHeroText}>{match.team2.overs} overs</Text>
              </>
            ) : (
              <Text style={styles.yetToBat}>Yet to bat</Text>
            )}
          </View>
        </View>

        {/* Match Status Banner */}
        {isLive && match.result && (
          <View style={styles.statusBanner}>
            <Ionicons name="radio" size={13} color={COLORS.live} />
            <Text style={styles.statusBannerText}>{match.result}</Text>
          </View>
        )}

        {/* Live Players */}
        {isLive && (
          <View style={styles.livePlayersRow}>
            <View style={styles.livePlayerChip}>
              <Text style={styles.livePlayerLabel}>🏏 Batting</Text>
              <Text style={styles.livePlayerValue}>{match.currentBatsman}</Text>
            </View>
            <View style={styles.livePlayerChip}>
              <Text style={styles.livePlayerLabel}>🎳 Bowling</Text>
              <Text style={styles.livePlayerValue}>{match.currentBowler}</Text>
            </View>
          </View>
        )}

        {/* Run Rates */}
        {isLive && (
          <View style={styles.rrRow}>
            <View style={styles.rrBox}>
              <Text style={styles.rrLabel}>CRR</Text>
              <Text style={styles.rrValue}>{match.crr}</Text>
            </View>
            <View style={[styles.rrBox, styles.rrBoxCenter]}>
              <Text style={styles.rrLabel}>Required</Text>
              <Text style={[styles.rrValue, { color: COLORS.live }]}>{match.rrr}</Text>
            </View>
            <View style={styles.rrBox}>
              <Text style={styles.rrLabel}>Venue</Text>
              <Text style={styles.rrValue} numberOfLines={1}>{match.venue?.split(',')[0]}</Text>
            </View>
          </View>
        )}

        {/* Tabs */}
        <View style={styles.tabsWrapper}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.tabContent}>
          {activeTab === 'Scorecard' && renderScorecard()}
          {activeTab === 'Commentary' && renderCommentary()}
          {activeTab === 'Info' && renderInfo()}
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgDark },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, gap: SPACING.sm,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: RADIUS.md,
    backgroundColor: COLORS.bgCard, borderWidth: 1, borderColor: COLORS.border,
    justifyContent: 'center', alignItems: 'center',
  },
  headerCenter: { flex: 1, alignItems: 'center', gap: 4 },
  headerSeries: { fontSize: FONTS.sizes.sm, color: COLORS.textSecondary, fontWeight: '500', textAlign: 'center' },
  liveChip: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: 'rgba(255,61,61,0.15)', borderRadius: RADIUS.full,
    paddingHorizontal: 8, paddingVertical: 2,
    borderWidth: 1, borderColor: 'rgba(255,61,61,0.3)',
  },
  liveDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: COLORS.live },
  liveChipText: { fontSize: 9, color: COLORS.live, fontWeight: '800', letterSpacing: 1 },
  shareBtn: {
    width: 40, height: 40, borderRadius: RADIUS.md,
    backgroundColor: COLORS.bgCard, borderWidth: 1, borderColor: COLORS.border,
    justifyContent: 'center', alignItems: 'center',
  },
  scoreHero: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.bgCard, marginHorizontal: SPACING.md,
    borderRadius: RADIUS.xl, padding: SPACING.lg,
    borderWidth: 1, borderColor: COLORS.border,
    marginBottom: SPACING.sm,
  },
  teamScoreBlock: { flex: 1, alignItems: 'center', gap: 4 },
  teamFlagHero: { fontSize: 36 },
  teamNameHero: { fontSize: FONTS.sizes.md, fontWeight: FONTS.weights.bold, color: COLORS.textPrimary },
  scoreHeroText: { fontSize: FONTS.sizes.xl, fontWeight: FONTS.weights.heavy, color: COLORS.textPrimary },
  oversHeroText: { fontSize: FONTS.sizes.xs, color: COLORS.textSecondary },
  yetToBat: { fontSize: FONTS.sizes.xs, color: COLORS.textMuted, fontStyle: 'italic' },
  vsSeparator: { alignItems: 'center', gap: 4, paddingHorizontal: SPACING.md },
  vsHeroText: { fontSize: FONTS.sizes.xs, color: COLORS.textMuted, fontWeight: '700' },
  matchTypeBadge: {
    fontSize: 10, color: COLORS.primary, fontWeight: '700',
    backgroundColor: 'rgba(0,200,81,0.1)', borderRadius: RADIUS.full,
    paddingHorizontal: 8, paddingVertical: 2,
  },
  statusBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(255,61,61,0.08)', marginHorizontal: SPACING.md,
    borderRadius: RADIUS.sm, paddingHorizontal: SPACING.md, paddingVertical: 8,
    borderWidth: 1, borderColor: 'rgba(255,61,61,0.2)', marginBottom: SPACING.sm,
  },
  statusBannerText: { fontSize: FONTS.sizes.sm, color: COLORS.live, fontWeight: '600', flex: 1 },
  livePlayersRow: {
    flexDirection: 'row', marginHorizontal: SPACING.md, gap: SPACING.sm, marginBottom: SPACING.sm,
  },
  livePlayerChip: {
    flex: 1, backgroundColor: COLORS.bgCard, borderRadius: RADIUS.md,
    borderWidth: 1, borderColor: COLORS.border, padding: SPACING.sm,
  },
  livePlayerLabel: { fontSize: 10, color: COLORS.textMuted, fontWeight: '600', marginBottom: 2 },
  livePlayerValue: { fontSize: FONTS.sizes.xs, color: COLORS.textPrimary, fontWeight: '600' },
  rrRow: {
    flexDirection: 'row', marginHorizontal: SPACING.md, marginBottom: SPACING.md,
    backgroundColor: COLORS.bgCard, borderRadius: RADIUS.md,
    borderWidth: 1, borderColor: COLORS.border, overflow: 'hidden',
  },
  rrBox: { flex: 1, alignItems: 'center', paddingVertical: SPACING.sm },
  rrBoxCenter: { borderLeftWidth: 1, borderRightWidth: 1, borderColor: COLORS.border },
  rrLabel: { fontSize: 10, color: COLORS.textMuted, fontWeight: '600', marginBottom: 2 },
  rrValue: { fontSize: FONTS.sizes.md, color: COLORS.textPrimary, fontWeight: FONTS.weights.bold },
  tabsWrapper: {
    flexDirection: 'row', marginHorizontal: SPACING.md, marginBottom: SPACING.md,
    backgroundColor: COLORS.bgCard, borderRadius: RADIUS.md,
    borderWidth: 1, borderColor: COLORS.border, padding: 4,
  },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: RADIUS.sm - 2 },
  tabActive: { backgroundColor: COLORS.primary },
  tabText: { fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.semibold, color: COLORS.textMuted },
  tabTextActive: { color: '#fff' },
  tabContent: { paddingHorizontal: SPACING.md },
  tableCard: {
    backgroundColor: COLORS.bgCard, borderRadius: RADIUS.lg,
    borderWidth: 1, borderColor: COLORS.border, overflow: 'hidden', marginBottom: SPACING.md,
  },
  tableHeader: { padding: SPACING.md, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  tableTitle: { fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.bold, color: COLORS.textPrimary },
  tableRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: SPACING.sm },
  tableRowAlt: { backgroundColor: 'rgba(255,255,255,0.02)' },
  tableHead: { flex: 0.6, textAlign: 'center', fontSize: 10, color: COLORS.textMuted, fontWeight: '700' },
  tableHeadFirst: { flex: 2, textAlign: 'left', paddingLeft: 4 },
  tableCell: { flex: 0.6, textAlign: 'center', fontSize: FONTS.sizes.xs, color: COLORS.textSecondary, fontWeight: '500' },
  batterInfo: { flex: 2, paddingLeft: 4 },
  batterName: { fontSize: FONTS.sizes.xs, color: COLORS.textPrimary, fontWeight: '600' },
  batterStatus: { fontSize: 9, color: COLORS.textMuted, marginTop: 1 },
  runsCell: { color: COLORS.textPrimary, fontWeight: FONTS.weights.bold },
  wicketsCell: { color: COLORS.primary, fontWeight: FONTS.weights.bold },
  commentaryContainer: { gap: SPACING.sm },
  commentaryItem: {
    flexDirection: 'row', gap: SPACING.sm, alignItems: 'flex-start',
    backgroundColor: COLORS.bgCard, borderRadius: RADIUS.md,
    borderWidth: 1, borderColor: COLORS.border, padding: SPACING.md,
  },
  overBadge: {
    minWidth: 44, height: 28, borderRadius: RADIUS.sm,
    backgroundColor: COLORS.bgCardLight, justifyContent: 'center', alignItems: 'center',
    paddingHorizontal: 6,
  },
  sixBadge: { backgroundColor: 'rgba(0,200,81,0.2)' },
  fourBadge: { backgroundColor: 'rgba(255,215,0,0.15)' },
  wicketBadge: { backgroundColor: 'rgba(255,61,61,0.2)' },
  overBadgeText: { fontSize: 10, color: COLORS.textSecondary, fontWeight: '700' },
  commentaryRight: { flex: 1, gap: 2 },
  commentaryTag: { fontSize: 10, color: COLORS.primary, fontWeight: '800' },
  commentaryText: { fontSize: FONTS.sizes.xs, color: COLORS.textSecondary, lineHeight: 18 },
  infoContainer: {
    backgroundColor: COLORS.bgCard, borderRadius: RADIUS.lg,
    borderWidth: 1, borderColor: COLORS.border, overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: SPACING.md, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
    gap: SPACING.sm,
  },
  infoLabel: { fontSize: FONTS.sizes.xs, color: COLORS.textMuted, fontWeight: '600', flex: 1 },
  infoValue: { fontSize: FONTS.sizes.xs, color: COLORS.textPrimary, fontWeight: '500', flex: 2, textAlign: 'right' },
});
