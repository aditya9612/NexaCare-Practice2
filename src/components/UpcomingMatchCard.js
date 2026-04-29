import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, RADIUS } from '../utils/theme';

export default function UpcomingMatchCard({ match, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.seriesRow}>
          <View style={styles.upcomingBadge}>
            <Text style={styles.upcomingBadgeText}>{match.matchType}</Text>
          </View>
          <Text style={styles.series} numberOfLines={1}>{match.series}</Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color={COLORS.textMuted} />
      </View>

      {/* Teams */}
      <View style={styles.teamsRow}>
        <View style={styles.teamBlock}>
          <Text style={styles.flag}>{match.team1.flag}</Text>
          <Text style={styles.teamName}>{match.team1.shortName}</Text>
          <Text style={styles.fullName}>{match.team1.name}</Text>
        </View>

        <View style={styles.middleBlock}>
          <Text style={styles.vsText}>VS</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.teamBlock}>
          <Text style={styles.flag}>{match.team2.flag}</Text>
          <Text style={styles.teamName}>{match.team2.shortName}</Text>
          <Text style={styles.fullName}>{match.team2.name}</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.cardFooter}>
        <View style={styles.infoChip}>
          <Ionicons name="time-outline" size={12} color={COLORS.accent} />
          <Text style={styles.infoChipText}>{match.date}</Text>
        </View>
        <View style={styles.infoChip}>
          <Ionicons name="location-outline" size={12} color={COLORS.textMuted} />
          <Text style={styles.infoChipText} numberOfLines={1}>{match.venue.split(',')[0]}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accent,
  },
  cardHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  seriesRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, flex: 1 },
  upcomingBadge: {
    backgroundColor: 'rgba(255,215,0,0.1)',
    borderRadius: RADIUS.sm,
    paddingHorizontal: 8, paddingVertical: 3,
    borderWidth: 1, borderColor: 'rgba(255,215,0,0.2)',
  },
  upcomingBadgeText: { fontSize: 9, color: COLORS.accent, fontWeight: '700', letterSpacing: 0.5 },
  series: { fontSize: FONTS.sizes.xs, color: COLORS.textSecondary, flex: 1 },
  teamsRow: {
    flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.md,
  },
  teamBlock: { flex: 1, alignItems: 'center', gap: 4 },
  flag: { fontSize: 28 },
  teamName: { fontSize: FONTS.sizes.lg, fontWeight: FONTS.weights.heavy, color: COLORS.textPrimary },
  fullName: { fontSize: FONTS.sizes.xs, color: COLORS.textSecondary },
  middleBlock: { alignItems: 'center', paddingHorizontal: SPACING.sm, gap: 4 },
  vsText: { fontSize: FONTS.sizes.xs, color: COLORS.textMuted, fontWeight: '800', letterSpacing: 1 },
  dividerLine: { width: 1, height: 28, backgroundColor: COLORS.border },
  cardFooter: { flexDirection: 'row', gap: SPACING.sm },
  infoChip: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: COLORS.bgDark, borderRadius: RADIUS.full,
    paddingHorizontal: 10, paddingVertical: 5,
    borderWidth: 1, borderColor: COLORS.border, flex: 1,
  },
  infoChipText: { fontSize: FONTS.sizes.xs, color: COLORS.textSecondary, flex: 1 },
});
