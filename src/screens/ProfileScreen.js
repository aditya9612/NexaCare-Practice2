import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Switch, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, RADIUS } from '../utils/theme';
import { RANKINGS } from '../utils/mockData';

const FAVORITE_TEAMS = [
  { name: 'India', flag: '🇮🇳', active: true },
  { name: 'Australia', flag: '🇦🇺', active: false },
  { name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', active: false },
];

export default function ProfileScreen() {
  const [notifications, setNotifications] = useState(true);
  const [liveAlerts, setLiveAlerts] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.settingsBtn}>
            <Ionicons name="settings-outline" size={22} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarWrap}>
            <Text style={styles.avatarEmoji}>🧑‍💻</Text>
            <View style={styles.avatarBadge}>
              <Ionicons name="checkmark" size={10} color="#fff" />
            </View>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Cricket Fan</Text>
            <Text style={styles.profileMobile}>+91 98765 43210</Text>
            <View style={styles.memberBadge}>
              <Ionicons name="star" size={10} color={COLORS.accent} />
              <Text style={styles.memberText}>Premium Member</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <Ionicons name="pencil" size={16} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* Stats Row */}
        <View style={styles.statsGrid}>
          {[
            { label: 'Matches Watched', value: '248' },
            { label: 'Predictions Won', value: '67%' },
            { label: 'Fav Teams', value: '3' },
          ].map((s, i) => (
            <View key={i} style={styles.statBox}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Favorite Teams */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Favourite Teams</Text>
          <View style={styles.teamsList}>
            {FAVORITE_TEAMS.map((team, i) => (
              <TouchableOpacity key={i} style={[styles.teamChip, team.active && styles.teamChipActive]}>
                <Text style={styles.teamChipFlag}>{team.flag}</Text>
                <Text style={[styles.teamChipName, team.active && styles.teamChipNameActive]}>
                  {team.name}
                </Text>
                {team.active && <Ionicons name="heart" size={12} color={COLORS.primary} />}
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.addTeamChip}>
              <Ionicons name="add" size={16} color={COLORS.textSecondary} />
              <Text style={styles.addTeamText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ICC Rankings Preview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ICC ODI Batting Rankings</Text>
          <View style={styles.rankingsCard}>
            {RANKINGS.batting.map((player) => (
              <View key={player.rank} style={styles.rankRow}>
                <Text style={[styles.rankNum, player.rank === 1 && styles.rankNumGold]}>
                  {player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : player.rank === 3 ? '🥉' : `#${player.rank}`}
                </Text>
                <View style={styles.rankInfo}>
                  <Text style={styles.rankName}>{player.name}</Text>
                  <Text style={styles.rankCountry}>{player.country}</Text>
                </View>
                <View style={styles.ratingBar}>
                  <View style={[styles.ratingFill, { width: `${(player.rating / 1000) * 100}%` }]} />
                </View>
                <Text style={styles.ratingNum}>{player.rating}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsCard}>
            <SettingRow
              icon="notifications-outline"
              label="Push Notifications"
              value={notifications}
              onToggle={() => setNotifications(!notifications)}
            />
            <View style={styles.divider} />
            <SettingRow
              icon="radio-outline"
              label="Live Match Alerts"
              value={liveAlerts}
              onToggle={() => setLiveAlerts(!liveAlerts)}
            />
            <View style={styles.divider} />
            <SettingRow
              icon="moon-outline"
              label="Dark Mode"
              value={darkMode}
              onToggle={() => setDarkMode(!darkMode)}
            />
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.section}>
          {[
            { icon: 'help-circle-outline', label: 'Help & Support' },
            { icon: 'information-circle-outline', label: 'About CricketApp' },
            { icon: 'star-outline', label: 'Rate the App' },
            { icon: 'share-social-outline', label: 'Share with Friends' },
          ].map((item, i) => (
            <TouchableOpacity key={i} style={styles.menuItem}>
              <View style={styles.menuIconWrap}>
                <Ionicons name={item.icon} size={20} color={COLORS.primary} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={16} color={COLORS.textMuted} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => Alert.alert('Logout', 'Are you sure you want to logout?')}
        >
          <Ionicons name="log-out-outline" size={18} color="#FF5252" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.version}>CricketApp v1.0.0</Text>
        <View style={{ height: SPACING.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function SettingRow({ icon, label, value, onToggle }) {
  return (
    <View style={styles.settingRow}>
      <Ionicons name={icon} size={20} color={COLORS.textSecondary} />
      <Text style={styles.settingLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: COLORS.bgCardLight, true: COLORS.primary }}
        thumbColor="#fff"
        ios_backgroundColor={COLORS.bgCardLight}
      />
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
  settingsBtn: {
    width: 40, height: 40, borderRadius: RADIUS.md,
    backgroundColor: COLORS.bgCard, borderWidth: 1, borderColor: COLORS.border,
    justifyContent: 'center', alignItems: 'center',
  },
  profileCard: {
    flexDirection: 'row', alignItems: 'center',
    marginHorizontal: SPACING.lg, marginBottom: SPACING.lg,
    backgroundColor: COLORS.bgCard, borderRadius: RADIUS.xl,
    padding: SPACING.md, borderWidth: 1, borderColor: COLORS.border,
    gap: SPACING.md,
  },
  avatarWrap: { position: 'relative' },
  avatarEmoji: {
    fontSize: 40, width: 64, height: 64, textAlign: 'center',
    lineHeight: 64, backgroundColor: COLORS.bgCardLight,
    borderRadius: 32, borderWidth: 2, borderColor: COLORS.primary,
    overflow: 'hidden',
  },
  avatarBadge: {
    position: 'absolute', bottom: 0, right: 0,
    width: 18, height: 18, borderRadius: 9,
    backgroundColor: COLORS.primary, borderWidth: 2, borderColor: COLORS.bgCard,
    justifyContent: 'center', alignItems: 'center',
  },
  profileInfo: { flex: 1, gap: 3 },
  profileName: { fontSize: FONTS.sizes.lg, fontWeight: FONTS.weights.bold, color: COLORS.textPrimary },
  profileMobile: { fontSize: FONTS.sizes.sm, color: COLORS.textSecondary },
  memberBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: 'rgba(255,215,0,0.1)', borderRadius: RADIUS.full,
    paddingHorizontal: 8, paddingVertical: 2, alignSelf: 'flex-start',
    borderWidth: 1, borderColor: 'rgba(255,215,0,0.2)',
  },
  memberText: { fontSize: 10, color: COLORS.accent, fontWeight: '600' },
  editBtn: {
    width: 36, height: 36, borderRadius: RADIUS.sm,
    backgroundColor: 'rgba(0,200,81,0.1)', borderWidth: 1, borderColor: 'rgba(0,200,81,0.2)',
    justifyContent: 'center', alignItems: 'center',
  },
  statsGrid: {
    flexDirection: 'row', marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg, gap: SPACING.sm,
  },
  statBox: {
    flex: 1, backgroundColor: COLORS.bgCard, borderRadius: RADIUS.md,
    borderWidth: 1, borderColor: COLORS.border, padding: SPACING.md, alignItems: 'center', gap: 4,
  },
  statValue: { fontSize: FONTS.sizes.xl, fontWeight: FONTS.weights.heavy, color: COLORS.primary },
  statLabel: { fontSize: 10, color: COLORS.textSecondary, textAlign: 'center', fontWeight: '500' },
  section: { marginHorizontal: SPACING.lg, marginBottom: SPACING.lg },
  sectionTitle: { fontSize: FONTS.sizes.md, fontWeight: FONTS.weights.bold, color: COLORS.textPrimary, marginBottom: SPACING.sm },
  teamsList: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  teamChip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: COLORS.bgCard, borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md, paddingVertical: 8,
    borderWidth: 1, borderColor: COLORS.border,
  },
  teamChipActive: { borderColor: COLORS.primary, backgroundColor: 'rgba(0,200,81,0.08)' },
  teamChipFlag: { fontSize: 16 },
  teamChipName: { fontSize: FONTS.sizes.sm, color: COLORS.textSecondary, fontWeight: '500' },
  teamChipNameActive: { color: COLORS.primary, fontWeight: '600' },
  addTeamChip: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: COLORS.bgCard, borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md, paddingVertical: 8,
    borderWidth: 1, borderColor: COLORS.border, borderStyle: 'dashed',
  },
  addTeamText: { fontSize: FONTS.sizes.sm, color: COLORS.textSecondary },
  rankingsCard: {
    backgroundColor: COLORS.bgCard, borderRadius: RADIUS.lg,
    borderWidth: 1, borderColor: COLORS.border, overflow: 'hidden',
  },
  rankRow: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
    paddingHorizontal: SPACING.md, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  rankNum: { fontSize: FONTS.sizes.md, color: COLORS.textSecondary, fontWeight: '700', width: 28 },
  rankNumGold: { color: COLORS.accent },
  rankInfo: { flex: 1 },
  rankName: { fontSize: FONTS.sizes.sm, fontWeight: FONTS.weights.semibold, color: COLORS.textPrimary },
  rankCountry: { fontSize: FONTS.sizes.xs, color: COLORS.textSecondary },
  ratingBar: {
    width: 60, height: 4, backgroundColor: COLORS.bgCardLight,
    borderRadius: 2, overflow: 'hidden',
  },
  ratingFill: { height: '100%', backgroundColor: COLORS.primary, borderRadius: 2 },
  ratingNum: { fontSize: FONTS.sizes.xs, color: COLORS.textSecondary, fontWeight: '600', width: 32, textAlign: 'right' },
  settingsCard: {
    backgroundColor: COLORS.bgCard, borderRadius: RADIUS.lg,
    borderWidth: 1, borderColor: COLORS.border, overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.md,
    paddingHorizontal: SPACING.md, paddingVertical: 14,
  },
  settingLabel: { flex: 1, fontSize: FONTS.sizes.sm, color: COLORS.textPrimary, fontWeight: '500' },
  divider: { height: 1, backgroundColor: COLORS.border, marginHorizontal: SPACING.md },
  menuItem: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.md,
    backgroundColor: COLORS.bgCard, borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md, paddingVertical: 14,
    borderWidth: 1, borderColor: COLORS.border, marginBottom: SPACING.sm,
  },
  menuIconWrap: {
    width: 36, height: 36, borderRadius: RADIUS.sm,
    backgroundColor: 'rgba(0,200,81,0.1)', justifyContent: 'center', alignItems: 'center',
  },
  menuLabel: { flex: 1, fontSize: FONTS.sizes.sm, color: COLORS.textPrimary, fontWeight: '500' },
  logoutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: SPACING.sm,
    marginHorizontal: SPACING.lg, marginBottom: SPACING.md,
    backgroundColor: 'rgba(255,82,82,0.08)', borderRadius: RADIUS.md,
    paddingVertical: 14, borderWidth: 1, borderColor: 'rgba(255,82,82,0.2)',
  },
  logoutText: { fontSize: FONTS.sizes.md, color: '#FF5252', fontWeight: FONTS.weights.bold },
  version: { textAlign: 'center', fontSize: FONTS.sizes.xs, color: COLORS.textMuted, marginBottom: SPACING.sm },
});
