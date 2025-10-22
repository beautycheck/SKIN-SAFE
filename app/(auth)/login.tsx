import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// Toz pembe tonları
const COLORS = {
  primary: '#D8A7B1',
  primaryLight: '#E8C7CF',
  primaryDark: '#C895A2',
  background: '#FFFFFF',
  backgroundLight: '#FDF6F8',
  card: '#F8F0F5',
  text: '#4A4A4A',
  textLight: '#8B7D7F',
  border: '#F0E6E8',
  placeholder: '#B8A9AC',
  accent: '#EFBBCF',
  success: '#A8D5BA',
};

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    router.push('/(tabs)');
  };

  const navigateToRegister = () => {
    router.push('/register');
  };

  const navigateToForgotPassword = () => {
    router.push('/forgot-password');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: COLORS.background }]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
            </TouchableOpacity>
            <Text style={[styles.title, { color: COLORS.text }]}>Giriş Yap</Text>
          </View>

          {/* Logo */}
          <View style={styles.logoContainer}>
            <View style={[styles.logoCircle, { backgroundColor: COLORS.primary }]}>
              <Ionicons name="leaf" size={40} color="#FFFFFF" />
            </View>
          </View>

          <Text style={[styles.welcomeText, { color: COLORS.text }]}>
            Tekrar Hoş Geldin!
          </Text>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Ionicons name="person" size={20} color={COLORS.placeholder} style={styles.inputIcon} />
              <TextInput
                style={[
                  styles.input, 
                  { 
                    backgroundColor: COLORS.backgroundLight,
                    borderColor: COLORS.border,
                    color: COLORS.text
                  }
                ]}
                placeholder="E-posta veya Kullanıcı Adı"
                placeholderTextColor={COLORS.placeholder}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed" size={20} color={COLORS.placeholder} style={styles.inputIcon} />
              <TextInput
                style={[
                  styles.input, 
                  { 
                    backgroundColor: COLORS.backgroundLight,
                    borderColor: COLORS.border,
                    color: COLORS.text,
                    flex: 1
                  }
                ]}
                placeholder="Şifre"
                placeholderTextColor={COLORS.placeholder}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={togglePasswordVisibility} style={styles.visibilityButton}>
                <Ionicons 
                  name={showPassword ? "eye-off" : "eye"} 
                  size={20} 
                  color={COLORS.placeholder} 
                />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity style={styles.forgotPassword} onPress={navigateToForgotPassword}>
              <Text style={[styles.forgotPasswordText, { color: COLORS.primary }]}>
                Şifremi Unuttum?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.loginButton, { backgroundColor: COLORS.primary }]} 
              onPress={handleLogin}
            >
              <Text style={styles.loginButtonText}>Giriş Yap</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={[styles.dividerContainer, { marginVertical: 24 }]}>
              <View style={[styles.divider, { backgroundColor: COLORS.border }]} />
              <Text style={[styles.dividerText, { color: COLORS.placeholder }]}>
                veya şunlarla devam et
              </Text>
              <View style={[styles.divider, { backgroundColor: COLORS.border }]} />
            </View>

            {/* Social Login Buttons */}
            <View style={styles.socialButtons}>
              <TouchableOpacity style={[styles.socialButton, { 
                backgroundColor: COLORS.backgroundLight,
                borderColor: COLORS.border 
              }]}>
                <Ionicons name="logo-google" size={20} color={COLORS.text} />
                <Text style={[styles.socialButtonText, { color: COLORS.text }]}>
                  Google ile Giriş Yap
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.socialButton, { 
                backgroundColor: COLORS.backgroundLight,
                borderColor: COLORS.border 
              }]}>
                <Ionicons name="logo-apple" size={20} color={COLORS.text} />
                <Text style={[styles.socialButtonText, { color: COLORS.text }]}>
                  Apple ile Giriş Yap
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View style={[styles.footer, { borderTopColor: COLORS.border }]}>
            <Text style={[styles.footerText, { color: COLORS.text }]}>Hesabın yok mu? </Text>
            <TouchableOpacity onPress={navigateToRegister}>
              <Text style={[styles.footerLink, { color: COLORS.primary }]}>Kayıt Ol</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#D8A7B1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  form: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  input: {
    padding: 16,
    paddingLeft: 48,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    flex: 1,
  },
  visibilityButton: {
    position: 'absolute',
    right: 16,
    padding: 8,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#D8A7B1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: 14,
    paddingHorizontal: 16,
  },
  socialButtons: {
    gap: 12,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
    borderTopWidth: 1,
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
  },
  footerLink: {
    fontWeight: 'bold',
  },
});