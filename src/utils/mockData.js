export const UPCOMING_MATCHES = [
  {
    id: '1',
    team1: { name: 'India', shortName: 'IND', flag: '🇮🇳', score: null },
    team2: { name: 'Australia', shortName: 'AUS', flag: '🇦🇺', score: null },
    matchType: 'T20I',
    venue: 'Wankhede Stadium, Mumbai',
    date: 'Today, 7:30 PM',
    status: 'upcoming',
    series: 'IND vs AUS T20I Series',
  },
  {
    id: '2',
    team1: { name: 'England', shortName: 'ENG', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', score: null },
    team2: { name: 'Pakistan', shortName: 'PAK', flag: '🇵🇰', score: null },
    matchType: 'ODI',
    venue: 'Lord\'s, London',
    date: 'Tomorrow, 3:30 PM',
    status: 'upcoming',
    series: 'ENG vs PAK ODI Series',
  },
  {
    id: '3',
    team1: { name: 'South Africa', shortName: 'SA', flag: '🇿🇦', score: null },
    team2: { name: 'New Zealand', shortName: 'NZ', flag: '🇳🇿', score: null },
    matchType: 'Test',
    venue: 'Newlands, Cape Town',
    date: 'May 02, 10:00 AM',
    status: 'upcoming',
    series: 'SA vs NZ Test Series',
  },
];

export const LIVE_MATCHES = [
  {
    id: 'l1',
    team1: { name: 'India', shortName: 'IND', flag: '🇮🇳', score: '186/4', overs: '18.2' },
    team2: { name: 'Sri Lanka', shortName: 'SL', flag: '🇱🇰', score: '142/7', overs: '20' },
    matchType: 'T20I',
    venue: 'R. Premadasa Stadium, Colombo',
    status: 'live',
    currentBatsman: 'Virat Kohli 67* (42)',
    currentBowler: 'Hasaranga 3/28',
    crr: '10.12',
    rrr: '18.60',
    series: 'Asia Cup 2025',
    result: 'IND need 43 runs off 10 balls',
  },
  {
    id: 'l2',
    team1: { name: 'West Indies', shortName: 'WI', flag: '🏝️', score: '234/6', overs: '45.3' },
    team2: { name: 'Bangladesh', shortName: 'BAN', flag: '🇧🇩', score: '198/8', overs: '43.0' },
    matchType: 'ODI',
    venue: 'Sabina Park, Kingston',
    status: 'live',
    currentBatsman: 'Shakib Al Hasan 45* (60)',
    currentBowler: 'Holder 2/41',
    crr: '4.60',
    rrr: '9.82',
    series: 'WI vs BAN ODI Series',
    result: 'BAN need 37 runs off 42 balls',
  },
];

export const NEWS_ARTICLES = [
  {
    id: 'n1',
    title: 'Rohit Sharma announces retirement from T20 Internationals',
    summary: 'Indian captain steps down from T20Is after a stellar career, focusing on Tests and ODIs.',
    category: 'Breaking News',
    time: '2 hours ago',
    readTime: '3 min read',
    emoji: '🏏',
    hot: true,
  },
  {
    id: 'n2',
    title: 'IPL 2025: Mumbai Indians clinch last-ball thriller against CSK',
    summary: 'Hardik Pandya\'s explosive 6 off the last ball seals a dramatic win for MI in the El Clasico of IPL.',
    category: 'IPL 2025',
    time: '5 hours ago',
    readTime: '5 min read',
    emoji: '🏟️',
    hot: true,
  },
  {
    id: 'n3',
    title: 'ICC announces new Test Championship cycle with prize money hike',
    summary: 'The International Cricket Council reveals a bumper prize pool for the new WTC cycle starting June 2025.',
    category: 'ICC News',
    time: '1 day ago',
    readTime: '4 min read',
    emoji: '🏆',
    hot: false,
  },
  {
    id: 'n4',
    title: 'Jasprit Bumrah named ICC Player of the Year for 2025',
    summary: 'India\'s pace spearhead wins the prestigious award for the second consecutive year after a record-breaking season.',
    category: 'Awards',
    time: '2 days ago',
    readTime: '2 min read',
    emoji: '🎖️',
    hot: false,
  },
];

export const RANKINGS = {
  batting: [
    { rank: 1, name: 'Babar Azam', country: '🇵🇰 Pakistan', rating: 892, format: 'ODI' },
    { rank: 2, name: 'Virat Kohli', country: '🇮🇳 India', rating: 879, format: 'ODI' },
    { rank: 3, name: 'Joe Root', country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 England', rating: 861, format: 'ODI' },
    { rank: 4, name: 'Rohit Sharma', country: '🇮🇳 India', rating: 845, format: 'ODI' },
    { rank: 5, name: 'Steve Smith', country: '🇦🇺 Australia', rating: 832, format: 'ODI' },
  ],
};

export const MOCK_OTP = '123456';
