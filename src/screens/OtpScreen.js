import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform,
  Animated, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, RADIUS } from '../utils/theme';
import { MOCK_OTP } from '../utils/mockData';

export default function OtpScreen({ route, navigation, onLoginSuccess }) {
  const { mobile } = route.params;
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef([]);
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const successAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    inputRefs.current[0]?.focus();
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (value, index) => {
    const cleaned = value.replace(/[^0-9]/g, '');
    const newOtp = [...otp];

    if (cleaned.length > 1) {
      // Handle paste
      const digits = cleaned.slice(0, 6 - index).split('');
      digits.forEach((d, i) => {
        if (index + i < 6) newOtp[index + i] = d;
      });
      setOtp(newOtp);
      const nextIndex = Math.min(index + digits.length, 5);
      inputRefs.current[nextIndex]?.focus();
    } else {
      newOtp[index] = cleaned;
      setOtp(newOtp);
      if (cleaned && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
    setError('');
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const shakeError = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start();
  };

  const verifyOtp = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 6) {
      setError('Please enter the complete 6-digit OTP');
      shakeError();
      return;
    }

    setLoading(true);
    setTimeout(() => {
      if (enteredOtp === MOCK_OTP) {
        Animated.spring(successAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 50,
          friction: 5,
        }).start(() => {
          setTimeout(() => onLoginSuccess(), 400);
        });
      } else {
        setLoading(false);
        setError('Invalid OTP. Try 123456 for demo.');
        shakeError();
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    }, 1000);
  };

  const handleResend = () => {
    if (!canResend) return;
    setCanResend(false);
    setResendTimer(30);
    setOtp(['', '', '', '', '', '']);
    setError('');
    inputRefs.current[0]?.focus();
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) { clearInterval(interval); setCanResend(true); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const otpFilled = otp.every(d => d !== '');
  const successScale = successAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.05] });

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={styles.inner}>
          {/* Back Button */}
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color={COLORS.textPrimary} />
          </TouchableOpacity>

          {/* Icon */}
          <View style={styles.iconWrap}>
            <Text style={styles.iconEmoji}>📲</Text>
          </View>

          <Text style={styles.title}>Verify Your Number</Text>
          <Text style={styles.subtitle}>
            We've sent a 6-digit OTP to{'\n'}
            <Text style={styles.mobileHighlight}>{mobile}</Text>
          </Text>

          {/* Demo hint */}
          <View style={styles.demoHint}>
            <Ionicons name="information-circle" size={14} color={COLORS.accent} />
            <Text style={styles.demoHintText}>Demo OTP: <Text style={{ color: COLORS.accent, fontWeight: '700' }}>123456</Text></Text>
          </View>

          {/* OTP Boxes */}
          <Animated.View
            style={[
              styles.otpRow,
              { transform: [{ translateX: shakeAnim }, { scale: successScale }] },
            ]}
          >
            {otp.map((digit, index) => (
              <View
                key={index}
                style={[
                  styles.otpBox,
                  digit && styles.otpBoxFilled,
                  error && styles.otpBoxError,
                  loading && otpFilled && styles.otpBoxSuccess,
                ]}
              >
                <TextInput
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  style={styles.otpInput}
                  value={digit}
                  onChangeText={(val) => handleOtpChange(val, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  keyboardType="number-pad"
                  maxLength={6}
                  selectTextOnFocus
                  caretHidden
                />
                {!digit && <View style={styles.cursor} />}
              </View>
            ))}
          </Animated.View>

          {/* Error */}
          {error ? (
            <View style={styles.errorRow}>
              <Ionicons name="alert-circle" size={14} color="#FF5252" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* Verify Button */}
          <TouchableOpacity
            style={[styles.verifyBtn, otpFilled && !loading && styles.verifyBtnActive]}
            onPress={verifyOtp}
            disabled={loading || !otpFilled}
            activeOpacity={0.85}
          >
            {loading ? (
              <Text style={styles.verifyBtnText}>Verifying...</Text>
            ) : (
              <>
                <Ionicons name="checkmark-circle" size={20} color="#fff" />
                <Text style={styles.verifyBtnText}>Verify OTP</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Resend */}
          <View style={styles.resendRow}>
            <Text style={styles.resendLabel}>Didn't receive the OTP? </Text>
            <TouchableOpacity onPress={handleResend} disabled={!canResend}>
              <Text style={[styles.resendBtn, canResend && styles.resendBtnActive]}>
                {canResend ? 'Resend OTP' : `Resend in ${resendTimer}s`}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Security note */}
          <View style={styles.securityNote}>
            <Ionicons name="shield-checkmark" size={14} color={COLORS.primary} />
            <Text style={styles.securityText}>Your number is safe & never shared</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgDark },
  inner: { flex: 1, paddingHorizontal: SPACING.lg, paddingTop: SPACING.sm },
  backBtn: {
    width: 40, height: 40,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1, borderColor: COLORS.border,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  iconWrap: {
    width: 72, height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.bgCard,
    borderWidth: 1.5, borderColor: COLORS.primary,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: SPACING.md,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3, shadowRadius: 12, elevation: 8,
  },
  iconEmoji: { fontSize: 32 },
  title: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: FONTS.weights.heavy,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    lineHeight: 24,
    marginBottom: SPACING.md,
  },
  mobileHighlight: {
    color: COLORS.primary,
    fontWeight: FONTS.weights.bold,
  },
  demoHint: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(255, 215, 0, 0.08)',
    borderWidth: 1, borderColor: 'rgba(255, 215, 0, 0.2)',
    borderRadius: RADIUS.sm, paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm, marginBottom: SPACING.xl,
  },
  demoHintText: { fontSize: FONTS.sizes.xs, color: COLORS.textSecondary },
  otpRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginBottom: SPACING.md, gap: 8,
  },
  otpBox: {
    flex: 1, height: 60,
    backgroundColor: COLORS.bgCard,
    borderRadius: RADIUS.md,
    borderWidth: 1.5, borderColor: COLORS.border,
    justifyContent: 'center', alignItems: 'center',
    position: 'relative',
  },
  otpBoxFilled: {
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(0, 200, 81, 0.08)',
  },
  otpBoxError: { borderColor: '#FF5252', backgroundColor: 'rgba(255, 82, 82, 0.08)' },
  otpBoxSuccess: { borderColor: COLORS.primary, backgroundColor: 'rgba(0, 200, 81, 0.15)' },
  otpInput: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    textAlign: 'center',
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.heavy,
    color: COLORS.textPrimary,
    letterSpacing: 2,
  },
  cursor: {
    width: 2, height: 24,
    backgroundColor: COLORS.primary,
    borderRadius: 1,
    opacity: 0.7,
  },
  errorRow: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    marginBottom: SPACING.md,
  },
  errorText: { color: '#FF5252', fontSize: FONTS.sizes.xs },
  verifyBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: COLORS.bgCardLight,
    borderRadius: RADIUS.md, paddingVertical: 16,
    borderWidth: 1, borderColor: COLORS.border,
    marginBottom: SPACING.lg,
  },
  verifyBtnActive: {
    backgroundColor: COLORS.primary, borderColor: COLORS.primary,
    shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4, shadowRadius: 12, elevation: 8,
  },
  verifyBtnText: {
    color: COLORS.textPrimary,
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.bold, letterSpacing: 0.5,
  },
  resendRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  resendLabel: { fontSize: FONTS.sizes.sm, color: COLORS.textSecondary },
  resendBtn: { fontSize: FONTS.sizes.sm, color: COLORS.textMuted, fontWeight: FONTS.weights.semibold },
  resendBtnActive: { color: COLORS.primary },
  securityNote: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
  },
  securityText: { fontSize: FONTS.sizes.xs, color: COLORS.textMuted },
});
