import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();

  // TypeScript hatasını çözmek için route'ları bu şekilde kullan
  const navigateToLogin = () => {
    router.push('/login');
  };

  const navigateToRegister = () => {
    router.push('/register');
  };

  const navigateToScanner = () => {
    router.push('/scanner');
  };

  const navigateToSearch = () => {
    router.push('/search');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo ve Başlık */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>SkinSafe</Text>
        </View>
        <Text style={styles.tagline}>SAĞLIKLI CİLT,</Text>
        <Text style={styles.tagline}>GÜVENLİ SEÇİM</Text>
      </View>

      {/* Ana İşlev Butonları */}
      <View style={styles.featuresContainer}>
        <TouchableOpacity 
          style={styles.featureCard}
          onPress={navigateToScanner}
        >
          <View style={styles.featureIcon}>
            <Ionicons name="barcode" size={32} color="#8B5FBF" />
          </View>
          <Text style={styles.featureTitle}>Barkod Tara</Text>
          <Text style={styles.featureDescription}>
            Ürün barkodunu tarayarak içerik analizi yap
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.featureCard}
          onPress={navigateToSearch}
        >
          <View style={styles.featureIcon}>
            <Ionicons name="search" size={32} color="#8B5FBF" />
          </View>
          <Text style={styles.featureTitle}>Ürün Ara</Text>
          <Text style={styles.featureDescription}>
            Ürün ismiyle arama yap ve analiz et
          </Text>
        </TouchableOpacity>
      </View>

      {/* Giriş/Kayıt Butonları */}
      <View style={styles.authContainer}>
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={navigateToLogin}
        >
          <Text style={styles.loginButtonText}>Giriş Yap</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.registerButton}
          onPress={navigateToRegister}
        >
          <Text style={styles.registerButtonText}>Hesap Oluştur</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#8B5FBF',
    textAlign: 'center',
  },
  tagline: {
    fontSize: 18,
    color: '#6A4A9A',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresContainer: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  featureCard: {
    backgroundColor: '#F8F7FA',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#8B5FBF',
  },
  featureIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#8B5FBF',
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: '#718096',
    lineHeight: 20,
  },
  authContainer: {
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
  },
  loginButton: {
    backgroundColor: '#8B5FBF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#8B5FBF',
  },
  registerButtonText: {
    color: '#8B5FBF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});