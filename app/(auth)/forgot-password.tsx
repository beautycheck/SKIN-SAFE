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

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    alert('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.');
    router.push('/login');
  };

  const navigateToLogin = () => {
    router.push('/login');
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
            <Text style={[styles.title, { color: COLORS.text }]}>Şifremi Unuttum</Text>
          </View>

          {/* Logo */}
          <View style={styles.logoContainer}>
            <View style={[styles.logoCircle, { backgroundColor: COLORS.primary }]}>
              <Ionicons name="key" size={40} color="#FFFFFF" />
            </View>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Text style={[styles.description, { color: COLORS.text }]}>
              Şifrenizi sıfırlamak için e-posta adresinizi girin. Size şifre sıfırlama bağlantısı göndereceğiz.
            </Text>
            
            <View style={styles.inputContainer}>
              <Ionicons name="mail" size={20} color={COLORS.placeholder} style={styles.inputIcon} />
              <TextInput
                style={[
                  styles.input, 
                  { 
                    backgroundColor: COLORS.backgroundLight,
                    borderColor: COLORS.border,
                    color: COLORS.text
                  }
                ]}
                placeholder="E-posta"
                placeholderTextColor={COLORS.placeholder}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            
            <TouchableOpacity 
              style={[styles.resetButton, { backgroundColor: COLORS.primary }]} 
              onPress={handleResetPassword}
            >
              <Text style={styles.resetButtonText}>Şifremi Sıfırla</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.backToLogin} onPress={navigateToLogin}>
              <Text style={[styles.backToLoginText, { color: COLORS.primary }]}>
                Giriş Sayfasına Dön
              </Text>
            </TouchableOpacity>
          </View>

          {/* Success Message */}
          <View style={[styles.successCard, { backgroundColor: COLORS.backgroundLight }]}>
            <View style={styles.successContent}>
              <View style={[styles.successIcon, { backgroundColor: `${COLORS.primary}20` }]}>
                <Ionicons name="mail" size={24} color={COLORS.primary} />
              </View>
              <View style={styles.successText}>
                <Text style={[styles.successTitle, { color: COLORS.text }]}>
                  Kontrol Et!
                </Text>
                <Text style={[styles.successDescription, { color: COLORS.textLight }]}>
                  E-posta adresinize bir şifre sıfırlama bağlantısı gönderildi. Gelen kutunuzu ve spam klasörünüzü kontrol etmeyi unutmayın.
                </Text>
              </View>
            </View>
          </View>

          {/* Footer */}
          <View style={[styles.footer, { borderTopColor: COLORS.border }]}>
            <Text style={[styles.footerText, { color: COLORS.text }]}>Hesabın var mı? </Text>
            <TouchableOpacity onPress={navigateToLogin}>
              <Text style={[styles.footerLink, { color: COLORS.primary }]}>Giriş Yap</Text>
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
    paddingBottom: 20,
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
    marginVertical: 40,
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
  form: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 30,
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
  resetButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#D8A7B1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backToLogin: {
    alignItems: 'center',
    marginTop: 20,
  },
  backToLoginText: {
    fontSize: 14,
    fontWeight: '500',
  },
  successCard: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F0E6E8',
  },
  successContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  successIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  successText: {
    flex: 1,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  successDescription: {
    fontSize: 14,
    lineHeight: 20,
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