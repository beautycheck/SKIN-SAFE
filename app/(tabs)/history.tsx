import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
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
  success: '#10B981',       // Yeşil (güvenli)
  warning: '#F59E0B',       // Turuncu (orta risk)
  danger: '#EF4444',        // Kırmızı (yüksek risk)
};

// API'den gelecek ürün tipi
type ScanHistoryItem = {
  id: string;
  productName: string;
  brand: string;
  scannedAt: string;
  safetyStatus: 'safe' | 'medium_risk' | 'high_risk';
  safetyScore: number;
  ingredients: string[];
};

export default function HistoryScreen() {
  const [scanHistory, setScanHistory] = useState<ScanHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Backend'den tarama geçmişini çek
  const fetchScanHistory = async () => {
    try {
      // TODO: Backend API endpoint'inizi buraya ekleyin
      const response = await fetch('https://your-backend-api.com/api/scan-history', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer your-token-here', // Gerekirse auth token
        },
      });

      if (!response.ok) {
        throw new Error('Geçmiş yüklenirken hata oluştu');
      }

      const data: ScanHistoryItem[] = await response.json();
      setScanHistory(data);
    } catch (error) {
      console.error('Geçmiş yükleme hatası:', error);
      Alert.alert('Hata', 'Tarama geçmişi yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchScanHistory();
  }, []);

  // Yenileme fonksiyonu
  const handleRefresh = () => {
    setRefreshing(true);
    fetchScanHistory();
  };

  // Güvenlik durumuna göre renk ve metin belirle
  const getSafetyInfo = (status: string) => {
    switch (status) {
      case 'safe':
        return { color: COLORS.success, text: 'Güvenli', bgColor: '#10B98120' };
      case 'medium_risk':
        return { color: COLORS.warning, text: 'Orta Risk', bgColor: '#F59E0B20' };
      case 'high_risk':
        return { color: COLORS.danger, text: 'Yüksek Risk', bgColor: '#EF444420' };
      default:
        return { color: COLORS.textLight, text: 'Bilinmiyor', bgColor: '#6B728020' };
    }
  };

  // Tarihi formatla
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins} dakika önce`;
    } else if (diffHours < 24) {
      return `${diffHours} saat önce`;
    } else if (diffDays < 7) {
      return `${diffDays} gün önce`;
    } else {
      return date.toLocaleDateString('tr-TR');
    }
  };

  // Ürün detayına git
  const handleProductPress = (product: ScanHistoryItem) => {
    // TODO: Ürün detay sayfasına yönlendirme
    // router.push(`/product-detail/${product.id}`);
    Alert.alert('Ürün Detayı', `${product.productName} - ${product.brand}`);
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: COLORS.background }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={[styles.loadingText, { color: COLORS.textLight }]}>
            Geçmiş yükleniyor...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: COLORS.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: COLORS.backgroundLight }]}>
        <Text style={[styles.title, { color: COLORS.text }]}>Tarama Geçmişi</Text>
        <Text style={[styles.subtitle, { color: COLORS.textLight }]}>
          Daha önce analiz ettiğiniz ürünler
        </Text>
        
        {/* İstatistikler */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: COLORS.primary }]}>
              {scanHistory.length}
            </Text>
            <Text style={[styles.statLabel, { color: COLORS.textLight }]}>
              Toplam Tarama
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { color: COLORS.success }]}>
              {scanHistory.filter(item => item.safetyStatus === 'safe').length}
            </Text>
            <Text style={[styles.statLabel, { color: COLORS.textLight }]}>
              Güvenli
            </Text>
          </View>
        </View>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
      >
        {scanHistory.length > 0 ? (
          scanHistory.map((item) => {
            const safetyInfo = getSafetyInfo(item.safetyStatus);
            
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.historyItem, { 
                  backgroundColor: COLORS.background,
                  borderColor: COLORS.border 
                }]}
                onPress={() => handleProductPress(item)}
              >
                <View style={styles.historyContent}>
                  <Text style={[styles.productName, { color: COLORS.text }]}>
                    {item.productName}
                  </Text>
                  <Text style={[styles.brand, { color: COLORS.textLight }]}>
                    {item.brand}
                  </Text>
                  <View style={styles.ingredientsPreview}>
                    <Text style={[styles.ingredientsText, { color: COLORS.textLight }]}>
                      {item.ingredients.slice(0, 3).join(', ')}
                      {item.ingredients.length > 3 && '...'}
                    </Text>
                  </View>
                  <Text style={[styles.date, { color: COLORS.textLight }]}>
                    {formatDate(item.scannedAt)}
                  </Text>
                </View>
                <View style={styles.resultContainer}>
                  <View 
                    style={[
                      styles.resultBadge, 
                      { backgroundColor: safetyInfo.bgColor }
                    ]}
                  >
                    <Text style={[styles.resultText, { color: safetyInfo.color }]}>
                      {safetyInfo.text}
                    </Text>
                  </View>
                  <View style={styles.scoreContainer}>
                    <Text style={[styles.scoreText, { color: COLORS.textLight }]}>
                      %{item.safetyScore}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={COLORS.primaryLight} />
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <View style={[styles.emptyState, { backgroundColor: COLORS.backgroundLight }]}>
            <Ionicons name="time-outline" size={64} color={COLORS.primaryLight} />
            <Text style={[styles.emptyStateTitle, { color: COLORS.text }]}>
              Henüz tarama geçmişiniz yok
            </Text>
            <Text style={[styles.emptyStateText, { color: COLORS.textLight }]}>
              Ürün taramaya başladığınızda{'\n'}burada görünecek
            </Text>
            <TouchableOpacity 
              style={[styles.scanButton, { backgroundColor: COLORS.primary }]}
              onPress={() => {/* Scanner'a yönlendir */}}
            >
              <Text style={styles.scanButtonText}>İlk Taramayı Yap</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 16,
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
  historyContent: {
    flex: 1,
    marginRight: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  brand: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '500',
  },
  ingredientsPreview: {
    marginBottom: 6,
  },
  ingredientsText: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  date: {
    fontSize: 11,
    fontWeight: '500',
  },
  resultContainer: {
    alignItems: 'flex-end',
    gap: 8,
  },
  resultBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  resultText: {
    fontSize: 12,
    fontWeight: '600',
  },
  scoreContainer: {
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 11,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    padding: 40,
    borderRadius: 20,
    minHeight: 300,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  scanButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  scanButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
});

// RefreshControl import etmeyi unutmayın
import { RefreshControl } from 'react-native';
