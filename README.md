# 🏏 Cricket App — React Native (Expo)

A fully-featured Cricket mobile app built with React Native + Expo, featuring live scores, upcoming matches, news, and user profiles.

---

## 📁 Folder Structure

```
CricketApp/
├── App.js                          ← Entry point
├── app.json                        ← Expo config
├── package.json
├── babel.config.js
└── src/
    ├── screens/
    │   ├── LoginScreen.js          ← Mobile number login
    │   ├── OtpScreen.js            ← 6-digit OTP verification
    │   ├── HomeScreen.js           ← Main dashboard
    │   ├── MatchesScreen.js        ← Live/Upcoming/Results tabs
    │   ├── MatchDetailsScreen.js   ← Scorecard, Commentary, Info
    │   └── ProfileScreen.js        ← User profile + settings
    ├── components/
    │   ├── LiveMatchCard.js        ← Pulsing live match card
    │   ├── UpcomingMatchCard.js    ← Upcoming match card
    │   ├── NewsCard.js             ← News article card
    │   └── QuickStatCard.js        ← Dashboard stat widget
    ├── navigation/
    │   ├── RootNavigator.js        ← Auth flow + main app
    │   └── MainTabNavigator.js     ← Bottom tab bar
    ├── utils/
    │   ├── theme.js                ← Colors, fonts, spacing
    │   └── mockData.js             ← All mock cricket data
    └── assets/                     ← Images, icons
```

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
cd CricketApp
npm install
```

### 2. Start the Expo development server

```bash
npx expo start
```

### 3. Run on device or emulator

- **iOS Simulator**: Press `i`
- **Android Emulator**: Press `a`
- **Physical device**: Scan QR code with the **Expo Go** app

---

## 📱 App Flow

```
LoginScreen
    ↓ (Enter mobile number)
OtpScreen
    ↓ (Enter OTP: 123456)
MainTabNavigator
    ├── Home Tab → HomeScreen → MatchDetailsScreen
    ├── Matches Tab → MatchesScreen
    └── Profile Tab → ProfileScreen
```

### Demo OTP
> Use **`123456`** to verify and log in.

---

## ✨ Features

| Feature | Details |
|--------|---------|
| 🔐 Login | Mobile number + OTP (mock: `123456`) |
| 📺 Live Scores | Pulsing live match cards with CRR/RRR |
| 📅 Upcoming | Match schedule with venue & time |
| 🏆 Results | Completed match results |
| 📰 News | Cricket news with categories |
| 📊 Scorecard | Batting & bowling tables |
| 💬 Commentary | Ball-by-ball commentary |
| 👤 Profile | Stats, team preferences, settings |
| 🌙 Dark Mode | Full dark theme throughout |
| 🔔 Notifications | Toggle settings (UI) |

---

## 🛠️ Tech Stack

| Package | Version | Purpose |
|---------|---------|---------|
| `expo` | ~51.0.0 | Build & run toolchain |
| `react-native` | 0.74.5 | Core framework |
| `@react-navigation/native` | ^6.x | Navigation container |
| `@react-navigation/native-stack` | ^6.x | Stack navigator |
| `@react-navigation/bottom-tabs` | ^6.x | Tab bar navigator |
| `react-native-safe-area-context` | 4.10.5 | Safe area handling |
| `react-native-screens` | 3.31.1 | Native screen optimization |
| `@expo/vector-icons` | ^14.x | Ionicons icon set |

---

## 🎨 Design System

All design tokens are in `src/utils/theme.js`:

- **Primary**: `#00C851` (cricket green)
- **Accent**: `#FFD700` (gold)
- **Live**: `#FF3D3D` (red)
- **Background**: `#0a1628` (deep navy)
- **Card**: `#0f2044`

---

## 📝 Notes

- No backend required — all data is mocked in `src/utils/mockData.js`
- OTP logic is simulated — enter `123456` to proceed
- Navigation state is managed in `RootNavigator.js` via `useState`
- All screens use `SafeAreaView` from `react-native-safe-area-context`
