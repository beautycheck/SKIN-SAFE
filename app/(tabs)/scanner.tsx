import { Ionicons } from '@expo/vector-icons';
import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  SafeAreaView,
  StyleSheet,
  Text,
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
  error: '#E8A3B5',
  warning: '#F5D0C5',
};

export default function ScannerScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(false);
  const [cameraType, setCameraType] = useState<'back' | 'front'>('back');
  const [scanAnimation] = useState(new Animated.Value(0));

  // Kamera aç/kapa
  const toggleCamera = async () => {
    if (!permission?.granted) {
      await requestPermission();
      return;
    }
    
    setIsScanning(!isScanning);
    
    if (!isScanning) {
      // Tarama animasyonunu başlat
      startScanAnimation();
    }
  };

  const startScanAnimation = () => {
    scanAnimation.setValue(0);
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scanAnimation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const scanLineStyle = {
    transform: [
      {
        translateY: scanAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 250],
        }),
      },
    ],
  };

  // Galeriden resim seçme
  const pickImageFromGallery = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('İzin gerekli', 'Galeriye erişim için izin gerekiyor.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        Alert.alert(
          '✨ Resim Seçildi',
          'Resim başarıyla seçildi. Yakında bu resimdeki barkod otomatik olarak taranacak!',
          [{ text: 'Harika!', style: 'default' }]
        );
      }
    } catch (error) {
      console.error('Galeriden resim seçme hatası:', error);
      Alert.alert('Hata', 'Resim seçilirken bir hata oluştu.');
    }
  };

  // Barkod tarandığında
  const handleBarcodeScanned = (scanningResult: BarcodeScanningResult) => {
    // Animasyonu durdur
    scanAnimation.stopAnimation();
    
    Alert.alert(
      '🎉 Barkod Tarandı!',
      `**Barkod Tipi:** ${scanningResult.type}\n**Veri:** ${scanningResult.data}\n\nBu barkod bilgisi ürün analizi için kaydedildi.`,
      [
        {
          text: 'Yeni Tara',
          onPress: () => {
            setIsScanning(false);
            setTimeout(() => setIsScanning(true), 500);
          },
        },
        {
          text: 'Tamam',
          onPress: () => setIsScanning(false),
        },
      ]
    );
  };

  // Kamera ön/arka değiştirme
  const switchCamera = () => {
    setCameraType(current => (current === 'back' ? 'front' : 'back'));
  };

  // İzin durumu kontrolü
  if (!permission) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: COLORS.background }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={[styles.loadingText, { color: COLORS.text }]}>
            Kamera izinleri kontrol ediliyor...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: COLORS.background }]}>
        <View style={styles.permissionContainer}>
          <View style={[styles.permissionIcon, { backgroundColor: COLORS.backgroundLight }]}>
            <Ionicons name="camera" size={64} color={COLORS.primary} />
          </View>
          <Text style={[styles.permissionTitle, { color: COLORS.text }]}>
            Kameraya Erişim İzni Gerekli
          </Text>
          <Text style={[styles.permissionText, { color: COLORS.textLight }]}>
            SkinSafe'in barkod tarama özelliğini kullanabilmek için kameranıza erişim izni vermeniz gerekiyor.
          </Text>
          <TouchableOpacity 
            style={[styles.permissionButton, { backgroundColor: COLORS.primary }]}
            onPress={requestPermission}
          >
            <Ionicons name="camera" size={20} color="#FFFFFF" />
            <Text style={styles.permissionButtonText}>Kameraya İzin Ver</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: COLORS.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: COLORS.background }]}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={[styles.backButton, { backgroundColor: COLORS.backgroundLight }]}
        >
          <Ionicons name="chevron-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: COLORS.text }]}>Barkod Tarayıcı</Text>
          <Text style={[styles.subtitle, { color: COLORS.textLight }]}>
            Ürünleri hızlıca tarayın
          </Text>
        </View>
        <View style={styles.placeholder} />
      </View>

      {/* Scanner Area */}
      <View style={styles.scannerContainer}>
        {isScanning ? (
          <View style={styles.cameraContainer}>
            <CameraView
              style={styles.camera}
              facing={cameraType}
              onBarcodeScanned={handleBarcodeScanned}
              barcodeScannerSettings={{
                barcodeTypes: [
                  'aztec',
                  'ean13',
                  'ean8',
                  'qr',
                  'pdf417',
                  'upc_e',
                  'datamatrix',
                  'code39',
                  'code93',
                  'itf14',
                  'codabar',
                  'code128',
                  'upc_a'
                ],
              }}
            />
            
            {/* Tarama çerçevesi */}
            <View style={styles.scannerOverlay}>
              <View style={[styles.scannerFrame, { borderColor: COLORS.primary }]}>
                <Animated.View 
                  style={[
                    styles.scanLine, 
                    { backgroundColor: COLORS.primary },
                    scanLineStyle
                  ]} 
                />
              </View>
              <View style={styles.cornerTL} />
              <View style={styles.cornerTR} />
              <View style={styles.cornerBL} />
              <View style={styles.cornerBR} />
              <Text style={[styles.scannerGuideText, { color: '#FFFFFF' }]}>
                Barkodu çerçeve içine getirin
              </Text>
            </View>

            {/* Kamera kontrolleri */}
            <View style={styles.cameraControls}>
              <TouchableOpacity 
                style={[styles.cameraControlButton, { backgroundColor: 'rgba(216, 167, 177, 0.8)' }]}
                onPress={switchCamera}
              >
                <Ionicons name="camera-reverse" size={20} color="#FFFFFF" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.cameraControlButton, { backgroundColor: 'rgba(232, 163, 181, 0.8)' }]}
                onPress={toggleCamera}
              >
                <Ionicons name="stop" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={[styles.scannerPlaceholder, { backgroundColor: COLORS.backgroundLight }]}>
            <View style={[styles.scannerIcon, { backgroundColor: COLORS.card }]}>
              <Ionicons name="barcode-outline" size={80} color={COLORS.primary} />
            </View>
            <Text style={[styles.scannerTitle, { color: COLORS.text }]}>
              Barkod Tarayıcı Hazır
            </Text>
            <Text style={[styles.scannerText, { color: COLORS.textLight }]}>
              Ürün barkodunu taramak için başlat butonuna basın veya galeriden barkod fotoğrafı yükleyin
            </Text>
          </View>
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        {!isScanning ? (
          <TouchableOpacity 
            style={[styles.primaryButton, { backgroundColor: COLORS.primary }]}
            onPress={toggleCamera}
          >
            <Ionicons name="scan" size={24} color="#FFFFFF" />
            <Text style={styles.primaryButtonText}>
              Taramayı Başlat
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={[styles.secondaryButton, { backgroundColor: COLORS.background }]}
            onPress={toggleCamera}
          >
            <Ionicons name="stop" size={24} color={COLORS.error} />
            <Text style={[styles.secondaryButtonText, { color: COLORS.error }]}>
              Taramayı Durdur
            </Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={[styles.tertiaryButton, { backgroundColor: COLORS.backgroundLight }]}
          onPress={pickImageFromGallery}
          disabled={isScanning}
        >
          <Ionicons name="image" size={24} color={COLORS.primary} />
          <Text style={[styles.tertiaryButtonText, { color: COLORS.primary }]}>
            Galeriden Yükle
          </Text>
        </TouchableOpacity>
      </View>

      {/* Features Grid */}
      <View style={styles.featuresContainer}>
        <Text style={[styles.featuresTitle, { color: COLORS.text }]}>
          Neler Yapabilirsiniz?
        </Text>
        <View style={styles.featuresGrid}>
          <View style={[styles.featureItem, { backgroundColor: COLORS.backgroundLight }]}>
            <Ionicons name="camera" size={20} color={COLORS.primary} />
            <Text style={[styles.featureText, { color: COLORS.text }]}>
              Gerçek Zamanlı Tarama
            </Text>
          </View>
          <View style={[styles.featureItem, { backgroundColor: COLORS.backgroundLight }]}>
            <Ionicons name="images" size={20} color={COLORS.primary} />
            <Text style={[styles.featureText, { color: COLORS.text }]}>
              Galeriden Yükleme
            </Text>
          </View>
          <View style={[styles.featureItem, { backgroundColor: COLORS.backgroundLight }]}>
            <Ionicons name="flash" size={20} color={COLORS.primary} />
            <Text style={[styles.featureText, { color: COLORS.text }]}>
              Hızlı Sonuç
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0E6E8',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  placeholder: {
    width: 40,
  },
  scannerContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scannerPlaceholder: {
    width: '100%',
    height: 300,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F0E6E8',
    borderStyle: 'dashed',
    padding: 20,
  },
  scannerIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  scannerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  scannerText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  cameraContainer: {
    width: '100%',
    height: 300,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  scannerFrame: {
    width: 250,
    height: 150,
    borderWidth: 2,
    borderRadius: 16,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  scanLine: {
    width: '100%',
    height: 2,
    backgroundColor: '#D8A7B1',
  },
  cornerTL: {
    position: 'absolute',
    top: 75,
    left: 75,
    width: 20,
    height: 20,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#D8A7B1',
  },
  cornerTR: {
    position: 'absolute',
    top: 75,
    right: 75,
    width: 20,
    height: 20,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: '#D8A7B1',
  },
  cornerBL: {
    position: 'absolute',
    bottom: 75,
    left: 75,
    width: 20,
    height: 20,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#D8A7B1',
  },
  cornerBR: {
    position: 'absolute',
    bottom: 75,
    right: 75,
    width: 20,
    height: 20,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: '#D8A7B1',
  },
  scannerGuideText: {
    marginTop: 100,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  cameraControls: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    flexDirection: 'row',
    gap: 12,
  },
  cameraControlButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionContainer: {
    padding: 20,
    gap: 12,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
    shadowColor: '#D8A7B1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
    borderWidth: 2,
    borderColor: '#E8A3B5',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  tertiaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
  },
  tertiaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  featuresContainer: {
    padding: 20,
    paddingTop: 0,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  featuresGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  featureItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 8,
  },
  featureText: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  permissionIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  permissionText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  permissionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
    shadowColor: '#D8A7B1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  permissionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});