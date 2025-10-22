import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// Toz pembe renk paleti
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
  warning: '#F4D03F',
  error: '#E6A4B4',
};

// Backend'den gelecek ürün tipi
type Product = {
  id: string;
  name: string;
  brand: string;
  safetyScore: number;
  safetyStatus: 'safe' | 'medium_risk' | 'high_risk';
  ingredients: string[];
  imageUrl?: string;
};

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Backend'den popüler ürünleri çek
  useEffect(() => {
    fetchPopularProducts();
    fetchRecentSearches();
  }, []);

  const fetchPopularProducts = async () => {
    try {
      // TODO: Backend API endpoint
      // Şimdilik mock data kullanıyoruz
      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'Niacinamide Serum',
          brand: 'The Ordinary',
          safetyScore: 85,
          safetyStatus: 'safe',
          ingredients: ['Niacinamide', 'Zinc', 'Water']
        },
        {
          id: '2',
          name: 'Hydrating Cleanser',
          brand: 'CeraVe',
          safetyScore: 92,
          safetyStatus: 'safe',
          ingredients: ['Ceramides', 'Hyaluronic Acid', 'Glycerin']
        }
      ];
      setPopularProducts(mockProducts);
    } catch (error) {
      console.error('Popüler ürünler yüklenirken hata:', error);
    }
  };

  const fetchRecentSearches = async () => {
    try {
      // TODO: Backend'den kullanıcının son aramalarını çek
      // Şimdilik mock data
      const mockSearches = ['Niacinamide', 'CeraVe', 'La Roche Posay'];
      setRecentSearches(mockSearches);
    } catch (error) {
      console.error('Son aramalar yüklenirken hata:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setSearchPerformed(true);

    try {
      // TODO: Backend search endpoint
      // Şimdilik mock search
      setTimeout(() => {
        const mockResults: Product[] = [
          {
            id: '3',
            name: `${searchQuery} Serum`,
            brand: 'Test Marka',
            safetyScore: 78,
            safetyStatus: 'medium_risk',
            ingredients: ['Ingredient1', 'Ingredient2', 'Ingredient3']
          }
        ];
        setSearchResults(mockResults);
        
        // Aramayı geçmişe ekle
        if (mockResults.length > 0) {
          addToRecentSearches(searchQuery);
        }
        setLoading(false);
      }, 1500);

    } catch (error) {
      console.error('Arama hatası:', error);
      Alert.alert('Hata', 'Ürün aranırken bir sorun oluştu');
      setSearchResults([]);
      setLoading(false);
    }
  };

  const addToRecentSearches = async (query: string) => {
    try {
      // Local state'i güncelle
      setRecentSearches(prev => {
        const filtered = prev.filter(item => item !== query);
        return [query, ...filtered.slice(0, 4)];
      });
    } catch (error) {
      console.error('Son arama kaydedilirken hata:', error);
    }
  };

  const removeRecentSearch = async (query: string) => {
    try {
      // Local state'i güncelle
      setRecentSearches(prev => prev.filter(item => item !== query));
    } catch (error) {
      console.error('Son arama silinirken hata:', error);
    }
  };

  const handleProductPress = (product: Product) => {
    // Product detail sayfası olmadığı için alert göster
    Alert.alert(
      product.name,
      `Marka: ${product.brand}\nGüvenlik Skoru: %${product.safetyScore}\nDurum: ${getSafetyInfo(product.safetyStatus).text}\n\nİçerikler: ${product.ingredients.join(', ')}`,
      [
        { text: 'Tamam', style: 'default' },
        { 
          text: 'Tarama Geçmişine Ekle', 
          onPress: () => addToScanHistory(product)
        }
      ]
    );
  };

  const addToScanHistory = async (product: Product) => {
    try {
      // TODO: Backend'e tarama geçmişine ekle
      Alert.alert('Başarılı', `${product.name} tarama geçmişinize eklendi!`);
    } catch (error) {
      console.error('Tarama geçmişine eklenirken hata:', error);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchPerformed(false);
    setSearchResults([]);
  };

  const getSafetyInfo = (status: string) => {
    switch (status) {
      case 'safe':
        return { color: COLORS.success, text: 'Güvenli', bgColor: '#A8D5BA40' };
      case 'medium_risk':
        return { color: COLORS.warning, text: 'Orta Risk', bgColor: '#F4D03F40' };
      case 'high_risk':
        return { color: COLORS.error, text: 'Yüksek Risk', bgColor: '#E6A4B440' };
      default:
        return { color: COLORS.textLight, text: 'Bilinmiyor', bgColor: '#8B7D7F40' };
    }
  };

  const renderProductItem = ({ item }: { item: Product }) => {
    const safetyInfo = getSafetyInfo(item.safetyStatus);
    
    return (
      <TouchableOpacity 
        style={[styles.productCard, { backgroundColor: COLORS.backgroundLight }]}
        onPress={() => handleProductPress(item)}
      >
        <View style={styles.productInfo}>
          <Text style={[styles.productName, { color: COLORS.text }]}>
            {item.name}
          </Text>
          <Text style={[styles.productBrand, { color: COLORS.textLight }]}>
            {item.brand}
          </Text>
          <Text style={[styles.ingredients, { color: COLORS.textLight }]}>
            {item.ingredients.slice(0, 2).join(', ')}...
          </Text>
        </View>
        <View style={styles.productMeta}>
          <View style={[styles.safetyBadge, { backgroundColor: safetyInfo.bgColor }]}>
            <Text style={[styles.safetyText, { color: safetyInfo.color }]}>
              {safetyInfo.text}
            </Text>
          </View>
          <View style={styles.scoreContainer}>
            <Text style={[styles.scoreText, { color: COLORS.primary }]}>
              %{item.safetyScore}
            </Text>
            <Text style={[styles.scoreLabel, { color: COLORS.textLight }]}>
              Skor
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderRecentSearchItem = (search: string, index: number) => (
    <TouchableOpacity 
      key={index} 
      style={styles.recentSearchItem}
      onPress={() => {
        setSearchQuery(search);
        handleSearch();
      }}
    >
      <Ionicons name="time-outline" size={18} color={COLORS.placeholder} />
      <Text style={[styles.recentSearchText, { color: COLORS.text }]}>
        {search}
      </Text>
      <TouchableOpacity onPress={() => removeRecentSearch(search)}>
        <Ionicons name="close" size={18} color={COLORS.placeholder} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: COLORS.background }]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={28} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: COLORS.text }]}>Ürün Ara</Text>
        </View>

        {/* Arama Çubuğu */}
        <View style={styles.searchContainer}>
          <View style={[styles.searchInputContainer, { backgroundColor: COLORS.backgroundLight }]}>
            <Ionicons name="search" size={20} color={COLORS.placeholder} style={styles.searchIcon} />
            <TextInput
              style={[styles.searchInput, { color: COLORS.text }]}
              placeholder="Ürün adı, marka veya içerik ara..."
              placeholderTextColor={COLORS.placeholder}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={clearSearch}>
                <Ionicons name="close-circle" size={20} color={COLORS.placeholder} />
              </TouchableOpacity>
            )}
          </View>
          
          {/* Arama Butonu */}
          <TouchableOpacity 
            style={[styles.searchButton, { backgroundColor: COLORS.primary }]}
            onPress={handleSearch}
            disabled={loading}
          >
            <Text style={styles.searchButtonText}>
              {loading ? 'Aranıyor...' : 'Ara'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* İçerik */}
        <FlatList
          data={[]}
          renderItem={null}
          ListHeaderComponent={
            <>
              {/* Yükleme Durumu */}
              {loading && (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color={COLORS.primary} />
                  <Text style={[styles.loadingText, { color: COLORS.textLight }]}>
                    Ürünler aranıyor...
                  </Text>
                </View>
              )}

              {/* Son Aramalar */}
              {!searchPerformed && !loading && recentSearches.length > 0 && (
                <View style={styles.section}>
                  <Text style={[styles.sectionTitle, { color: COLORS.text }]}>
                    Son Aramalar
                  </Text>
                  {recentSearches.map(renderRecentSearchItem)}
                </View>
              )}

              {/* Popüler Ürünler */}
              {!searchPerformed && !loading && popularProducts.length > 0 && (
                <View style={styles.section}>
                  <Text style={[styles.sectionTitle, { color: COLORS.text }]}>
                    Popüler Ürünler
                  </Text>
                  <FlatList
                    data={popularProducts}
                    renderItem={renderProductItem}
                    keyExtractor={(item) => item.id}
                    scrollEnabled={false}
                  />
                </View>
              )}

              {/* Boş Durum - Hiç arama yapılmamışsa */}
              {!searchPerformed && !loading && recentSearches.length === 0 && popularProducts.length === 0 && (
                <View style={styles.emptyState}>
                  <Ionicons name="search-outline" size={64} color={COLORS.placeholder} />
                  <Text style={[styles.emptyStateText, { color: COLORS.text }]}>
                    Ürün Arayın
                  </Text>
                  <Text style={[styles.emptyStateSubtext, { color: COLORS.textLight }]}>
                    Marka, ürün adı veya içerik girerek{'\n'}güvenlik analizi yapın
                  </Text>
                </View>
              )}

              {/* Arama Sonuçları */}
              {searchPerformed && !loading && (
                <View style={styles.section}>
                  <Text style={[styles.sectionTitle, { color: COLORS.text }]}>
                    "{searchQuery}" için {searchResults.length} sonuç bulundu
                  </Text>
                  {searchResults.length > 0 ? (
                    <FlatList
                      data={searchResults}
                      renderItem={renderProductItem}
                      keyExtractor={(item) => item.id}
                      scrollEnabled={false}
                    />
                  ) : (
                    <View style={styles.emptyState}>
                      <Ionicons name="search-outline" size={48} color={COLORS.placeholder} />
                      <Text style={[styles.emptyStateText, { color: COLORS.text }]}>
                        Ürün bulunamadı
                      </Text>
                      <Text style={[styles.emptyStateSubtext, { color: COLORS.textLight }]}>
                        Farklı bir anahtar kelime deneyin
                      </Text>
                    </View>
                  )}
                </View>
              )}
            </>
          }
          style={styles.list}
          showsVerticalScrollIndicator={false}
        />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  searchContainer: {
    padding: 20,
    paddingTop: 0,
    gap: 12,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: '#F0E6E8',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  searchButton: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  list: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0E6E8',
  },
  recentSearchText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0E6E8',
  },
  productInfo: {
    flex: 1,
    marginRight: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  productBrand: {
    fontSize: 14,
    marginBottom: 4,
  },
  ingredients: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  productMeta: {
    alignItems: 'flex-end',
    gap: 8,
  },
  safetyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  safetyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  scoreContainer: {
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  scoreLabel: {
    fontSize: 10,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});