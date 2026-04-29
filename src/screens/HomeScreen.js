import React, { useState, useRef } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, RefreshControl, Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, RADIUS } from '../utils/theme';
import { LIVE_MATCHES, UPCOMING_MATCHES, NEWS_ARTICLES } from '../utils/mockData';
import LiveMatchCard from '../components/LiveMatchCard';
import UpcomingMatchCard from '../components/UpcomingMatchCard';
import NewsCard from '../components/NewsCard';
import QuickStatCard from '../components/QuickStatCard';

export default function HomeScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Sticky compact header on scroll */}
      <Animated.View style={[styles.stickyHeader, { opacity: headerOpacity }]}>
        <Text style={styles.stickyTitle}>🏏 CricketApp</Text>
      </Animated.View>

      <Animated.ScrollView
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Header */}
        <View style={styles.heroHeader}>
          <View>
            <Text style={styles.greeting}>Good Evening 👋</Text>
            <Text style={styles.heroTitle}>Welcome to{'\n'}Cricket App</Text>
          </View>
          <TouchableOpacity style={styles.notifBtn}>
            <Ionicons name="notifications-outline" size={22} color={COLORS.textPrimary} />
            <View style={styles.notifDot} />
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsRow}>
          <QuickStatCard icon="🔴" label="Live" value={`${LIVE_MATCHES.length} Matches`} color={COLORS.live} />
          <QuickStatCard icon="📅" label="Today" value="3 Matches" color={COLORS.accent} />
          <QuickStatCard icon="🏆" label="Series" value="8 Active" color={COLORS.primary} />
        </View>

        {/* LIVE SECTION */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.liveIndicator}>
              <View style={styles.liveDot} />
              <Text style={styles.sectionTitle}>LIVE</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
            {LIVE_MATCHES.map((match) => (
              <LiveMatchCard
                key={match.id}
                match={match}
                onPress={() => navigation.navigate('MatchDetails', { match })}
              />
            ))}
          </ScrollView>
        </View>

        {/* UPCOMING MATCHES */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📅 Upcoming Matches</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {UPCOMING_MATCHES.map((match) => (
            <UpcomingMatchCard
              key={match.id}
              match={match}
              onPress={() => navigation.navigate('MatchDetails', { match })}
            />
          ))}
        </View>

        {/* NEWS SECTION */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📰 Cricket News</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {NEWS_ARTICLES.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </View>

        <View style={{ height: SPACING.xl }} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgDark },
  stickyHeader: {
    position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100,
    backgroundColor: COLORS.bgDark,
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
    paddingHorizontal: SPACING.lg, paddingVertical: 12,
    alignItems: 'center',
  },
  stickyTitle: { color: COLORS.textPrimary, fontSize: FONTS.sizes.md, fontWeight: FONTS.weights.bold },
  heroHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
    paddingHorizontal: SPACING.lg, paddingTop: SPACING.lg, paddingBottom: SPACING.md,
  },
  greeting: { fontSize: FONTS.sizes.sm, color: COLORS.textSecondary, marginBottom: 4 },
  heroTitle: {
    fontSize: FONTS.sizes.xxl, fontWeight: FONTS.weights.heavy,
    color: COLORS.textPrimary, lineHeight: 34,
  },
  notifBtn: {
    width: 44, height: 44, borderRadius: RADIUS.md,
    backgroundColor: COLORS.bgCard, borderWidth: 1, borderColor: COLORS.border,
    justifyContent: 'center', alignItems: 'center',
  },
  notifDot: {
    position: 'absolute', top: 8, right: 8,
    width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.live,
    borderWidth: 1.5, borderColor: COLORS.bgDark,
  },
  statsRow: {
    flexDirection: 'row', paddingHorizontal: SPACING.lg,
    gap: SPACING.sm, marginBottom: SPACING.lg,
  },
  section: { marginBottom: SPACING.lg },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: SPACING.lg, marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.lg, fontWeight: FONTS.weights.bold, color: COLORS.textPrimary,
  },
  liveIndicator: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  liveDot: {
    width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.live,
    shadowColor: COLORS.live, shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8, shadowRadius: 4,
  },
  seeAll: { fontSize: FONTS.sizes.sm, color: COLORS.primary, fontWeight: FONTS.weights.semibold },
  horizontalList: { paddingHorizontal: SPACING.lg, gap: SPACING.md },
});
