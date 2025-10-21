import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const username = "OnSkinuser_mqiu4";

  const handleLocationRequest = () => {
    Alert.alert(
      'Konum Erişimi',
      'Bulunduğunuz bölgedeki UV indeksini öğrenmek için lütfen ayarlardan konum erişimine izin verin.',
      [
        { text: 'İptal', style: 'cancel' },
        { text: 'Ayarlar', onPress: () => console.log('Ayarlara yönlendir') }
      ]
    );
  };

  const handleCreateRoutine = () => {
    router.push('/(tabs)/skincare-routine' as any);
  };

  const handleScanner = () => {
    router.push('/(tabs)/scanner' as any);
  };

  const handleSearch = () => {
    router.push('/(tabs)/search' as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Hoş Geldiniz Bölümü */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Merhaba,</Text>
          <Text style={styles.username}>{username}!</Text>
        </View>

        {/* UV Index Bölümü */}
        <TouchableOpacity style={styles.uvCard} onPress={handleLocationRequest}>
          <Ionicons name="sunny" size={24} color="#FF9500" />
          <View style={styles.uvTextContainer}>
            <Text style={styles.uvTitle}>UV İndeksi Bilinmiyor</Text>
            <Text style={styles.uvDescription}>
              Bölgenizdeki UV indeksini öğrenmek için lütfen Ayarlar'dan konum erişimine izin verin.
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
        </TouchableOpacity>

        {/* Cilt Bakım Rutini Bölümü */}
        <View style={styles.routineSection}>
          <Text style={styles.sectionTitle}>Cilt Bakım Rutinin</Text>
          <Text style={styles.sectionSubtitle}>
            Cildine hak ettiği özeni göster!
          </Text>
          <TouchableOpacity style={styles.createButton} onPress={handleCreateRoutine}>
            <Text style={styles.createButtonText}>Şimdi Oluştur</Text>
          </TouchableOpacity>
        </View>

        {/* Keşfet Bölümü */}
        <View style={styles.exploreSection}>
          <Text style={styles.sectionTitle}>Keşfet</Text>
          
          <TouchableOpacity style={styles.exploreCard} onPress={handleScanner}>
            <View style={styles.exploreIconContainer}>
              <Ionicons name="scan" size={24} color="#007AFF" />
            </View>
            <View style={styles.exploreTextContainer}>
              <Text style={styles.exploreTitle}>Tarayıcı</Text>
              <Text style={styles.exploreDescription}>
                Fotoğraf veya barkod ile ürün analizi yapın.
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.exploreCard} onPress={handleSearch}>
            <View style={styles.exploreIconContainer}>
              <Ionicons name="search" size={24} color="#007AFF" />
            </View>
            <View style={styles.exploreTextContainer}>
              <Text style={styles.exploreTitle}>Arama</Text>
              <Text style={styles.exploreDescription}>
                Bir ürün yazın ve cildinize uygun olup olmadığını görün.
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  welcomeSection: {
    padding: 20,
    paddingBottom: 10,
  },
  welcomeText: {
    fontSize: 16,
    color: '#666666',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 4,
  },
  uvCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    margin: 20,
    marginTop: 10,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9500',
  },
  uvTextContainer: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  uvTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  uvDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 18,
  },
  routineSection: {
    backgroundColor: '#007AFF',
    margin: 20,
    padding: 20,
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 16,
  },
  createButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  createButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  exploreSection: {
    padding: 20,
  },
  exploreCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  exploreIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  exploreTextContainer: {
    flex: 1,
  },
  exploreTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  exploreDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 18,
  },
});