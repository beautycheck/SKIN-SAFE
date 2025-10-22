import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
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
  overlay: 'rgba(0, 0, 0, 0.5)',
};

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<'privacy' | 'terms' | null>(null);

  const handleRegister = () => {
    router.push('/(tabs)');
  };

  const navigateToLogin = () => {
    router.push('/login');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const openPrivacyPolicy = () => {
    setModalContent('privacy');
    setModalVisible(true);
  };

  const openTermsOfUse = () => {
    setModalContent('terms');
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalContent(null);
  };

  const getModalTitle = () => {
    return modalContent === 'privacy' ? 'Gizlilik Politikası' : 'Kullanım Koşulları';
  };

  const getModalContent = () => {
    if (modalContent === 'privacy') {
      return (
        <ScrollView style={styles.modalScrollView} showsVerticalScrollIndicator={false}>
          <Text style={styles.modalSectionTitle}>1. Toplanan Bilgiler</Text>
          <Text style={styles.modalText}>
            SkinSafe olarak, size daha iyi hizmet sunabilmek için şu bilgileri topluyoruz:
            {'\n\n'}• E-posta adresiniz
            {'\n'}• Cilt analiz sonuçlarınız
            {'\n'}• Ürün tarama geçmişiniz
            {'\n'}• Kullanım alışkanlıklarınız
          </Text>

          <Text style={styles.modalSectionTitle}>2. Bilgilerin Kullanımı</Text>
          <Text style={styles.modalText}>
            Topladığımız bilgileri şu amaçlarla kullanıyoruz:
            {'\n\n'}• Kişiselleştirilmiş cilt bakım önerileri sunmak
            {'\n'}• Ürün güvenlik analizlerini iyileştirmek
            {'\n'}• Size özel içerik ve bildirimler göndermek
            {'\n'}• Uygulama deneyimini geliştirmek
          </Text>

          <Text style={styles.modalSectionTitle}>3. Veri Güvenliği</Text>
          <Text style={styles.modalText}>
            Kişisel verilerinizin güvenliği bizim için önceliklidir. Verileriniz:
            {'\n\n'}• Şifrelenmiş sunucularda saklanır
            {'\n'}• Sadece gerekli durumlarda işlenir
            {'\n'}• Üçüncü şahıslarla paylaşılmaz
            {'\n'}• Silme talepleriniz anında işleme alınır
          </Text>

          <Text style={styles.modalSectionTitle}>4. Haklarınız</Text>
          <Text style={styles.modalText}>
            Her zaman şu haklara sahipsiniz:
            {'\n\n'}• Verilerinize erişim
            {'\n'}• Düzeltme talep etme
            {'\n'}• Silinmesini isteme
            {'\n'}• İşlemeyi kısıtlama
            {'\n'}• Veri taşınabilirliği
          </Text>

          <Text style={styles.modalNote}>
            Son güncelleme: 15 Ocak 2024{'\n'}
            Sorularınız için: privacy@skinsafe.com
          </Text>
        </ScrollView>
      );
    } else if (modalContent === 'terms') {
      return (
        <ScrollView style={styles.modalScrollView} showsVerticalScrollIndicator={false}>
          <Text style={styles.modalSectionTitle}>1. Kabul ve Onay</Text>
          <Text style={styles.modalText}>
            SkinSafe uygulamasını kullanarak bu kullanım koşullarını kabul etmiş sayılırsınız.
            Uygulamayı yalnızca yasal amaçlarla ve bu koşullara uygun şekilde kullanabilirsiniz.
          </Text>

          <Text style={styles.modalSectionTitle}>2. Hizmet Açıklaması</Text>
          <Text style={styles.modalText}>
            SkinSafe, kozmetik ürünlerin içerik analizini yapan bir mobil uygulamadır.
            {'\n\n'}Sağladığımız bilgiler:
            {'\n'}• Genel tavsiye niteliğindedir
            {'\n'}• Tıbbi teşhis yerine geçmez
            {'\n'}• Profesyonel dermatolog konsültasyonu yerine kullanılmamalıdır
          </Text>

          <Text style={styles.modalSectionTitle}>3. Kullanıcı Sorumlulukları</Text>
          <Text style={styles.modalText}>
            Kullanıcı olarak siz:
            {'\n\n'}• Doğru ve güncel bilgiler sağlamalısınız
            {'\n'}• Hesap güvenliğinizden sorumlusunuz
            {'\n'}• Uygulamayı kötüye kullanamazsınız
            {'\n'}• Telif hakkı ihlali yapamazsınız
            {'\n'}• Diğer kullanıcıları rahatsız edemezsiniz
          </Text>

          <Text style={styles.modalSectionTitle}>4. Fikri Mülkiyet</Text>
          <Text style={styles.modalText}>
            SkinSafe'e ait tüm içerikler (logo, tasarım, yazılım, marka) telif hakkı ve
            marka kanunlarıyla korunmaktadır. İzinsiz kopyalama, dağıtma veya kullanma yapılamaz.
          </Text>

          <Text style={styles.modalSectionTitle}>5. Sınırlamalar ve Garanti</Text>
          <Text style={styles.modalText}>
            SkinSafe "olduğu gibi" sunulmaktadır. Ürün analiz sonuçları için mutlak doğruluk
            garanti etmiyoruz. Ciddi cilt problemleriniz için mutlaka dermatoloğa başvurunuz.
          </Text>

          <Text style={styles.modalSectionTitle}>6. Hesap Sonlandırma</Text>
          <Text style={styles.modalText}>
            Koşulları ihlal eden hesaplar önceden uyarılmaksızın askıya alınabilir veya
            sonlandırılabilir. Kullanıcılar istedikleri zaman hesabını silebilir.
          </Text>

          <Text style={styles.modalNote}>
            Son güncelleme: 15 Ocak 2024{'\n'}
            İletişim: legal@skinsafe.com
          </Text>
        </ScrollView>
      );
    }
    return null;
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
            <Text style={[styles.title, { color: COLORS.text }]}>Hesap Oluştur</Text>
          </View>

          {/* Logo */}
          <View style={styles.logoContainer}>
            <View style={[styles.logoCircle, { backgroundColor: COLORS.primary }]}>
              <Ionicons name="person-add" size={40} color="#FFFFFF" />
            </View>
          </View>

          <Text style={[styles.subtitle, { color: COLORS.text }]}>
            SkinSafe'e katılarak cildinize en iyi bakımı yapın.
          </Text>

          {/* Form */}
          <View style={styles.form}>
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

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed" size={20} color={COLORS.placeholder} style={styles.inputIcon} />
              <TextInput
                style={[
                  styles.input, 
                  { 
                    backgroundColor: COLORS.backgroundLight,
                    borderColor: COLORS.border,
                    color: COLORS.text,
                  }
                ]}
                placeholder="Şifrenizi oluşturun"
                placeholderTextColor={COLORS.placeholder}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity 
                onPress={togglePasswordVisibility} 
                style={styles.visibilityButton}
              >
                <Ionicons 
                  name={showPassword ? "eye-off" : "eye"} 
                  size={20} 
                  color={COLORS.placeholder} 
                />
              </TouchableOpacity>
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
                  }
                ]}
                placeholder="Şifrenizi doğrulayın"
                placeholderTextColor={COLORS.placeholder}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity 
                onPress={toggleConfirmPasswordVisibility} 
                style={styles.visibilityButton}
              >
                <Ionicons 
                  name={showConfirmPassword ? "eye-off" : "eye"} 
                  size={20} 
                  color={COLORS.placeholder} 
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={[styles.registerButton, { backgroundColor: COLORS.primary }]} 
              onPress={handleRegister}
            >
              <Text style={styles.registerButtonText}>Kayıt Ol</Text>
            </TouchableOpacity>

            <Text style={[styles.termsText, { color: COLORS.textLight }]}>
              Kayıt olarak,{' '}
              <Text style={[styles.termsLink, { color: COLORS.primary }]} onPress={openPrivacyPolicy}>
                Gizlilik Politikamızı
              </Text>{' '}
              ve{' '}
              <Text style={[styles.termsLink, { color: COLORS.primary }]} onPress={openTermsOfUse}>
                Kullanım Koşullarımızı
              </Text>{' '}
              kabul etmiş olursunuz.
            </Text>

            {/* Divider */}
            <View style={[styles.dividerContainer, { marginVertical: 24 }]}>
              <View style={[styles.divider, { backgroundColor: COLORS.border }]} />
              <Text style={[styles.dividerText, { color: COLORS.placeholder }]}>
                veya
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
                  Google ile Devam Et
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.socialButton, { 
                backgroundColor: COLORS.backgroundLight,
                borderColor: COLORS.border 
              }]}>
                <Ionicons name="logo-apple" size={20} color={COLORS.text} />
                <Text style={[styles.socialButtonText, { color: COLORS.text }]}>
                  Apple ile Devam Et
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View style={[styles.footer, { borderTopColor: COLORS.border }]}>
            <Text style={[styles.footerText, { color: COLORS.text }]}>
              Zaten bir hesabın var mı?{' '}
            </Text>
            <TouchableOpacity onPress={navigateToLogin}>
              <Text style={[styles.footerLink, { color: COLORS.primary }]}>Giriş Yap</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modal for Privacy Policy and Terms */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <Pressable style={styles.modalBackground} onPress={closeModal} />
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{getModalTitle()}</Text>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Ionicons name="close" size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>
            {getModalContent()}
          </View>
        </View>
      </Modal>
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
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
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
    flex: 1,
    padding: 16,
    paddingLeft: 48,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
  },
  visibilityButton: {
    position: 'absolute',
    right: 16,
    padding: 8,
  },
  registerButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#D8A7B1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  termsText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 18,
  },
  termsLink: {
    fontWeight: '500',
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
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackground: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  closeButton: {
    padding: 4,
  },
  modalScrollView: {
    padding: 20,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 16,
    marginBottom: 8,
  },
  modalText: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
    marginBottom: 16,
  },
  modalNote: {
    fontSize: 12,
    color: COLORS.textLight,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 16,
  },
});