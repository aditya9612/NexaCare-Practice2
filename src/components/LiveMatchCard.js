import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, RADIUS } from '../utils/theme';

export default function LiveMatchCard({ match, onPress, fullWidth }) {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 0.4, duration: 800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, []);

  return (
    <TouchableOpacity
      style={[styles.card, fullWidth && styles.cardFull]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {/* Top bar */}
      <View style={styles.topBar}>
        <View style={styles.liveTag}>
          <Animated.View style={[styles.liveDot, { opacity: pulseAnim }]} />
          <Text style={styles.liveTagText}>LIVE</Text>
        </View>
        <Text style={styles.matchType}>{match.matchType}</Text>
        <Ionicons name="chevron-forward" size={14} color={COLORS.textMuted} />
      </View>

      {/* Series */}
      <Text style={styles.series} numberOfLines={1}>{match.series}</Text>

      {/* Teams & Scores */}
      <View style={styles.teamsContainer}>
        <TeamRow team={match.team1} />
        <View style={styles.separator}>
          <Text style={styles.separatorText}>VS</Text>
        </View>
        <TeamRow team={match.team2} />
      </View>

      {/* Status row */}
      {match.result && (
        <View style={styles.resultRow}>
          <Ionicons name="radio" size={11} color={COLORS.live} />
          <Text style={styles.resultText} numberOfLines={1}>{match.result}</Text>
        </View>
      )}

      {/* CRR / RRR */}
      {match.crr && (
        <View style={styles.rrRow}>
          <View style={styles.rrItem}>
            <Text style={styles.rrLabel}>CRR</Text>
            <Text style={styles.rrValue}>{match.crr}</Text>
          </View>
          <View style={[styles.rrItem, styles.rrItemCenter]}>
            <Text style={styles.rrLabel}>RRR</Text>
            <Text style={[styles.rrValue, { color: COLORS.live }]}>{match.rrr}</Text>
          </View>
          <View style={styles.rrItem}>
            <Text style={styles.rrLabel}>Batsman</Text>
            <Text style={styles.rrValue} numberOfLines={1}>{match.currentBatsman?.split(' ').slice(0, 2).join(' ')}</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}

function TeamRow({ team }) {
  return (
    <View style={styles.teamRow}>
      <View style={styles.teamLeft}>
        <Text style={styles.teamFlag}>{team.flag}</Text>
        <Text style={styles.teamName}>{team.shortName}</Text>
      </View>
      <View style={styles.teamRight}>
        {team.score ? (
          <>
            <Text style={styles.teamScore}>{team.score}</Text>
            <Text style={styles.teamOvers}>{team.overs} ov</Text>
          </>
        ) : (
          <Text style={styles.yetToBat}>Yet to bat</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 300,
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.live,
  },
  cardFull: { width: '100%' },
  topBar: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, marginBottom: 6,
  },
  liveTag: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: 'rgba(255,61,61,0.12)',
    borderRadius: RADIUS.full, paddingHorizontal: 8, paddingVertical: 3,
    borderWidth: 1, borderColor: 'rgba(255,61,61,0.25)',
  },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.live },
  liveTagText: { fontSize: 9, color: COLORS.live, fontWeight: '800', letterSpacing: 1 },
  matchType: {
    flex: 1, fontSize: FONTS.sizes.xs, color: COLORS.textMuted,
    fontWeight: FONTS.weights.semibold,
  },
  series: {
    fontSize: FONTS.sizes.xs, color: COLORS.textSecondary, marginBottom: SPACING.sm,
  },
  teamsContainer: { gap: 6, marginBottom: SPACING.sm },
  teamRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  teamLeft: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  teamFlag: { fontSize: 20 },
  teamName: { fontSize: FONTS.sizes.md, fontWeight: FONTS.weights.bold, color: COLORS.textPrimary },
  teamRight: { flexDirection: 'row', alignItems: 'baseline', gap: 6 },
  teamScore: { fontSize: FONTS.sizes.lg, fontWeight: FONTS.weights.heavy, color: COLORS.textPrimary },
  teamOvers: { fontSize: FONTS.sizes.xs, color: COLORS.textMuted },
  yetToBat: { fontSize: FONTS.sizes.xs, color: COLORS.textMuted, fontStyle: 'italic' },
  separator: { height: 1, backgroundColor: COLORS.border, marginVertical: 2 },
  separatorText: { display: 'none' },
  resultRow: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: 'rgba(255,61,61,0.06)',
    borderRadius: RADIUS.sm, paddingHorizontal: 8, paddingVertical: 5,
    borderWidth: 1, borderColor: 'rgba(255,61,61,0.12)', marginBottom: SPACING.sm,
  },
  resultText: { fontSize: FONTS.sizes.xs, color: COLORS.live, fontWeight: '600', flex: 1 },
  rrRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.bgDark,
    borderRadius: RADIUS.sm,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  rrItem: { flex: 1, alignItems: 'center', paddingVertical: 6 },
  rrItemCenter: { borderLeftWidth: 1, borderRightWidth: 1, borderColor: COLORS.border },
  rrLabel: { fontSize: 9, color: COLORS.textMuted, fontWeight: '600', marginBottom: 1 },
  rrValue: { fontSize: FONTS.sizes.xs, color: COLORS.textPrimary, fontWeight: '700' },
});
