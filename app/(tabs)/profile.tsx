import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const COLORS = {
  primary: '#D8A7B1',       // Ana toz pembe
  primaryLight: '#E8C7CF',  // Açık toz pembe
  primaryDark: '#C895A3',   // Koyu toz pembe
  background: '#FFFFFF',    // Beyaz arkaplan
  backgroundLight: '#FDF6F8', // Çok açık pembe arkaplan
  text: '#2D3748',          // Koyu gri metin
  textLight: '#6B7280',     // Açık gri metin
  border: '#F0E1E5',        // Pembe tonlu border
};

type MenuItem = {
  id: string;
  icon: string;
  title: string;
  description: string;
  route: any; // Expo Router'ın kabul ettiği route tipi
}

const menuItems: MenuItem[] = [
  {
    id: '1',
    icon: 'person',
    title: 'Profil Bilgileri',
    description: 'Kişisel bilgilerinizi düzenleyin',
    route: '/(tabs)/profile/edit' // Geçerli bir route pattern
  },
  {
    id: '2',
    icon: 'medical',
    title: 'Cilt Analizi',
    description: 'Cilt tipiniz ve ihtiyaçlarınız',
    route: '/(tabs)/skin-analysis'
  },
  {
    id: '3',
    icon: 'heart',
    title: 'Beğendiklerim',
    description: 'Favori ürünleriniz',
    route: '/(tabs)/favorites'
  },
  {
    id: '4',
    icon: 'cart',
    title: 'Sipariş Geçmişi',
    description: 'Önceki alışverişleriniz',
    route: '/(tabs)/orders'
  },
  {
    id: '5',
    icon: 'notifications',
    title: 'Bildirim Ayarları',
    description: 'Tercihlerinizi özelleştirin',
    route: '/(tabs)/notifications'
  },
  {
    id: '6',
    icon: 'lock-closed',
    title: 'Gizlilik & Güvenlik',
    description: 'Hesap güvenliğiniz',
    route: '/(tabs)/privacy'
  },
  {
    id: '7',
    icon: 'help-circle',
    title: 'Yardım Merkezi',
    description: 'Sık sorulan sorular ve destek',
    route: '/(tabs)/help'
  },
  {
    id: '8',
    icon: 'information',
    title: 'Uygulama Hakkında',
    description: 'Sürüm ve detaylar',
    route: '/(tabs)/about'
  },
];

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/(auth)/login');
  };

  const handleMenuItemPress = (route: any) => {
    router.push(route);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: COLORS.background }]}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={[styles.profileHeader, { backgroundColor: COLORS.backgroundLight }]}>
          <View style={[styles.avatar, { backgroundColor: COLORS.primary }]}>
            <Ionicons name="person" size={40} color="#FFFFFF" />
          </View>
          <Text style={[styles.greeting, { color: COLORS.text }]}>
            Cilt Bakım Yolculuğunuz
          </Text>
          <Text style={[styles.subtitle, { color: COLORS.textLight }]}>
            Kişiselleştirilmiş cilt bakım önerileri için{'\n'}hesabınıza giriş yapın
          </Text>
          <TouchableOpacity 
            style={[styles.loginButton, { backgroundColor: COLORS.primary }]}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>Giriş Yap veya Kayıt Ol</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.menuItem, { 
                backgroundColor: COLORS.background,
                borderColor: COLORS.border 
              }]}
              onPress={() => handleMenuItemPress(item.route)}
            >
              <View style={[styles.menuIcon, { backgroundColor: COLORS.backgroundLight }]}>
                <Ionicons name={item.icon as any} size={22} color={COLORS.primary} />
              </View>
              <View style={styles.menuContent}>
                <Text style={[styles.menuTitle, { color: COLORS.text }]}>
                  {item.title}
                </Text>
                <Text style={[styles.menuDescription, { color: COLORS.textLight }]}>
                  {item.description}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={COLORS.primaryLight} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    padding: 40,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 10,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  greeting: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 22,
  },
  loginButton: {
    paddingHorizontal: 35,
    paddingVertical: 14,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  menuContainer: {
    padding: 20,
    paddingTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  menuDescription: {
    fontSize: 13,
  },
});