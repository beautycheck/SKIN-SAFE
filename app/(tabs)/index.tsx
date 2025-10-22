import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Animated,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Toz pembe tonları
const COLORS = {
  primary: '#D8A7B1', // Ana toz pembe
  primaryLight: '#E8C7CF', // Açık toz pembe
  primaryDark: '#C895A2', // Koyu toz pembe
  background: '#FFFFFF',
  backgroundLight: '#FDF6F8', // Çok açık pembe arkaplan
  text: '#4A4A4A', // Yumuşak gri-siyah
  textLight: '#8B7D7F', // Sıcak gri
  border: '#F0E6E8', // Pembe tonlu border
  accent: '#EFBBCF', // Vurgu için biraz daha canlı pembe
  success: '#A8D5BA', // Yumuşak yeşil
};

export default function WelcomeScreen() {
  const router = useRouter();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(50)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();
  }, [fadeAnim, slideAnim]);

  const navigateToLogin = () => router.push('/login');
  const navigateToRegister = () => router.push('/register');
  const navigateToScanner = () => router.push('/(tabs)/scanner');
  const navigateToSearch = () => router.push('/search');

  const features = [
    {
      id: '1',
      icon: 'barcode-outline',
      title: 'Barkod Tara',
      description: 'Ürün barkodunu tarayarak anında içerik analizi',
      color: '#F8F0F5', // Çok açık pembe
      iconColor: COLORS.primary,
      onPress: navigateToScanner
    },
    {
      id: '3',
      icon: 'camera-outline',
      title: 'Fotoğraf ile Ara',
      description: 'Ürün fotoğrafı çek, içerikleri anında oku',
      color: '#F0F8F5', // Hafif yeşilimsi pembe
      iconColor: COLORS.primary,
      onPress: navigateToSearch
    }
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: COLORS.background }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          style={[
            styles.content, 
            { 
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <View style={[styles.logoCircle, { backgroundColor: COLORS.primary }]}>
                <Ionicons name="leaf" size={32} color="#FFFFFF" />
              </View>
              <Text style={[styles.logoText, { color: COLORS.primary }]}>SkinSafe</Text>
            </View>
            <Text style={[styles.tagline, { color: COLORS.text }]}>
              Cildiniz için en iyi seçim
            </Text>
            <Text style={[styles.subtitle, { color: COLORS.textLight }]}>
              Cilt bakım ürünlerinizi analiz edin, güvenle kullanın. Sağlıklı cilt için doğru adımları birlikte atalım.
            </Text>
          </View>

          {/* Features Grid */}
          <View style={styles.featuresSection}>
            <Text style={[styles.sectionTitle, { color: COLORS.text }]}>
              Hızlı Başlayın
            </Text>
            <Text style={[styles.sectionSubtitle, { color: COLORS.textLight }]}>
              SkinSafe ile ürünlerinizi kolayca analiz edin
            </Text>
            
            <View style={styles.featuresGrid}>
              {features.map((feature, index) => (
                <Animated.View
                  key={feature.id}
                  style={[
                    styles.featureCard,
                    {
                      opacity: fadeAnim,
                      transform: [
                        { 
                          translateY: slideAnim.interpolate({
                            inputRange: [0, 50],
                            outputRange: [0, 20 + index * 10]
                          })
                        }
                      ]
                    }
                  ]}
                >
                  <TouchableOpacity 
                    style={[styles.featureTouchable, { 
                      backgroundColor: COLORS.background,
                      borderColor: COLORS.border 
                    }]}
                    onPress={feature.onPress}
                  >
                    <View style={[styles.featureIconContainer, { backgroundColor: feature.color }]}>
                      <Ionicons name={feature.icon as any} size={28} color={feature.iconColor} />
                    </View>
                    <View style={styles.featureContent}>
                      <Text style={[styles.featureTitle, { color: COLORS.text }]}>
                        {feature.title}
                      </Text>
                      <Text style={[styles.featureDescription, { color: COLORS.textLight }]}>
                        {feature.description}
                      </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color={COLORS.border} />
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Fixed Auth Buttons */}
      <Animated.View 
        style={[
          styles.authContainer,
          { 
            backgroundColor: COLORS.background,
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <View style={styles.authButtons}>
          <TouchableOpacity 
            style={[styles.loginButton, { backgroundColor: COLORS.primary }]}
            onPress={navigateToLogin}
          >
            <Text style={styles.loginButtonText}>Giriş Yap</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.registerButton, { borderColor: COLORS.primary }]}
            onPress={navigateToRegister}
          >
            <Text style={[styles.registerButtonText, { color: COLORS.primary }]}>
              Hesap Oluştur
            </Text>
          </TouchableOpacity>
        </View>
        
        <Text style={[styles.footerText, { color: COLORS.textLight }]}>
          Hesap oluşturarak kişiselleştirilmiş öneriler alın
        </Text>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 120, // Auth butonları için boşluk
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#D8A7B1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  featuresSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  featuresGrid: {
    gap: 16,
  },
  featureCard: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  featureTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
  },
  featureIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 24,
    borderRadius: 20,
    marginHorizontal: 8,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
  },
  authContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: 40,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  authButtons: {
    gap: 12,
    marginBottom: 16,
  },
  loginButton: {
    paddingVertical: 16,
    borderRadius: 16,
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
    fontWeight: '600',
  },
  registerButton: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    backgroundColor: '#FFFFFF',
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
  },
});