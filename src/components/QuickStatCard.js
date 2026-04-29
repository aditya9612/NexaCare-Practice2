import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, RADIUS } from '../utils/theme';

export default function QuickStatCard({ icon, label, value, color }) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { color }]}>{value}</Text>
      <View style={[styles.dot, { backgroundColor: color }]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    alignItems: 'center',
    gap: 3,
    position: 'relative',
    overflow: 'hidden',
  },
  icon: { fontSize: 20 },
  label: { fontSize: 9, color: COLORS.textMuted, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  value: { fontSize: FONTS.sizes.xs, fontWeight: FONTS.weights.bold, textAlign: 'center' },
  dot: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    height: 2, borderRadius: 1,
  },
});
