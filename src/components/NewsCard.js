import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, RADIUS } from '../utils/theme';

export default function NewsCard({ article }) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85}>
      {/* Emoji Thumbnail */}
      <View style={styles.thumbnail}>
        <Text style={styles.thumbnailEmoji}>{article.emoji}</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.topRow}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{article.category}</Text>
          </View>
          {article.hot && (
            <View style={styles.hotBadge}>
              <Text style={styles.hotText}>🔥 HOT</Text>
            </View>
          )}
        </View>

        <Text style={styles.title} numberOfLines={2}>{article.title}</Text>
        <Text style={styles.summary} numberOfLines={2}>{article.summary}</Text>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={11} color={COLORS.textMuted} />
            <Text style={styles.metaText}>{article.time}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="book-outline" size={11} color={COLORS.textMuted} />
            <Text style={styles.metaText}>{article.readTime}</Text>
          </View>
          <TouchableOpacity style={styles.readBtn}>
            <Text style={styles.readBtnText}>Read</Text>
            <Ionicons name="arrow-forward" size={11} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    gap: SPACING.md,
    alignItems: 'flex-start',
  },
  thumbnail: {
    width: 64, height: 64,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.bgCardLight,
    borderWidth: 1, borderColor: COLORS.border,
    justifyContent: 'center', alignItems: 'center',
  },
  thumbnailEmoji: { fontSize: 28 },
  content: { flex: 1, gap: 5 },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  categoryBadge: {
    backgroundColor: 'rgba(0,200,81,0.1)',
    borderRadius: RADIUS.full,
    paddingHorizontal: 8, paddingVertical: 2,
    borderWidth: 1, borderColor: 'rgba(0,200,81,0.15)',
  },
  categoryText: { fontSize: 9, color: COLORS.primary, fontWeight: '700', letterSpacing: 0.3 },
  hotBadge: {
    backgroundColor: 'rgba(255,107,53,0.1)',
    borderRadius: RADIUS.full,
    paddingHorizontal: 6, paddingVertical: 2,
    borderWidth: 1, borderColor: 'rgba(255,107,53,0.2)',
  },
  hotText: { fontSize: 9, color: COLORS.accentOrange, fontWeight: '700' },
  title: {
    fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.bold,
    color: COLORS.textPrimary, lineHeight: 18,
  },
  summary: {
    fontSize: FONTS.sizes.xs, color: COLORS.textSecondary,
    lineHeight: 17,
  },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, marginTop: 2 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  metaText: { fontSize: 10, color: COLORS.textMuted },
  readBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    marginLeft: 'auto',
  },
  readBtnText: { fontSize: 10, color: COLORS.primary, fontWeight: '700' },
});
