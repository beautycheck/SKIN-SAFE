import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
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
  userMessageBg: '#F0E6E8',
  botMessageBg: '#F8F0F5',
};

// Yapay Zeka Yanıtları Veritabanı
const AI_RESPONSES = {
  'kuru cilt': {
    title: 'Kuru Cilt Bakım Önerileri',
    content: 'Kuru ciltler için nemlendirme çok önemli. Hyaluronik asit, seramid ve gliserin içeren ürünler kullanın. Temizleyici olarak yağ bazlı temizleyicileri tercih edin ve peeling işlemlerini haftada 1 kez ile sınırlayın.'
  },
  'yağlı cilt': {
    title: 'Yağlı Cilt Bakım Önerileri',
    content: 'Yağlı ciltlerde temizlik ve dengeleme ön planda. Salısilik asit, niacinamide ve çay ağacı yağı içeren ürünler kullanın. Su bazlı, oil-free nemlendiriciler tercih edin ve cildinizi aşırı kurutmaktan kaçının.'
  },
  'karma cilt': {
    title: 'Karma Cilt Bakım Önerileri',
    content: 'Karma ciltlerde T bölgesi ve yanaklar için farklı bakım gerekebilir. Çift taraflı nemlendirme önemli. Yağlı bölgelerde salısilik asit, kuru bölgelerde hyaluronik asit içeren ürünler kullanabilirsiniz.'
  },
  'hassas cilt': {
    title: 'Hassas Cilt Bakım Önerileri',
    content: 'Hassas ciltlerde minimal içerikli, parfümsüz ürünler tercih edin. Centella asiatica, panthenol ve aloe vera gibi yatıştırıcı içerikler kullanın. Yeni ürünleri öncelikle kulak arkasında test edin.'
  },
  'akne': {
    title: 'Akne ve Sivilce Bakımı',
    content: 'Akne tedavisinde sabırlı olun. Salısilik asit, benzoyl peroxide ve retinoid içeren ürünler kullanın. Cildinizi aşırı kurutmayın ve mutlaka güneş koruyucu kullanın. Profesyonel yardım almayı düşünün.'
  },
  'lekeler': {
    title: 'Leke ve Renk Eşitsizliği',
    content: 'Leke tedavisinde vitamin C, niacinamide, azelaic acid ve retinoid içeren ürünler etkili. Güneş koruyucu kullanmadan asla güneşe çıkmayın. Tedavi süreci 3-6 ay sürebilir.'
  },
  'anti aging': {
    title: 'Yaşlanma Karşıtı Bakım',
    content: 'Retinol, vitamin C, peptid ve hyaluronik asit içeren ürünler kullanın. Güneş koruyucu en iyi anti-aging üründür. Cilt bariyerini güçlendiren içeriklere öncelik verin.'
  },
  'güneş koruyucu': {
    title: 'Güneş Koruyucu Seçimi',
    content: 'En az SPF 30, geniş spektrumlu güneş koruyucu kullanın. Mineral (çinko oksit, titanyum dioksit) veya kimyasal filtreli olabilir. Her 2 saatte bir yenileyin ve bulutlu havalarda da kullanın.'
  },
  'rutin': {
    title: 'Temel Cilt Bakım Rutini',
    content: 'Temel rutin: Sabah - temizleyici, serum, nemlendirici, güneş koruyucu. Akşam - çift temizleme, serum, nemlendirici. Haftada 1-2 kez peeling ve maske uygulayın.'
  }
};

const QUICK_QUESTIONS = [
  'Kuru cilt bakımı nasıl olmalı?',
  'Yağlı cilt için önerileriniz neler?',
  'Akne tedavisinde ne kullanmalıyım?',
  'Lekeler için etkili içerikler neler?',
  'Güneş koruyucu nasıl seçmeliyim?',
  'Temel cilt bakım rutini nedir?'
];

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function SkinHelperScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Merhaba! Ben SkinSafe AI asistanıyım. Cilt bakımı hakkında sorularınızı yanıtlayabilirim. Aşağıdaki hızlı sorulardan birini seçebilir veya kendi sorunuzu yazabilirsiniz.',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Anahtar kelime eşleştirme
    for (const [keyword, response] of Object.entries(AI_RESPONSES)) {
      if (lowerMessage.includes(keyword)) {
        return `**${response.title}**\n\n${response.content}`;
      }
    }

    // Genel yanıtlar
    if (lowerMessage.includes('merhaba') || lowerMessage.includes('selam')) {
      return 'Merhaba! Cilt bakımı hakkında nasıl yardımcı olabilirim? Hızlı sorulardan birini seçebilir veya kendi sorunuzu yazabilirsiniz.';
    }

    if (lowerMessage.includes('teşekkür') || lowerMessage.includes('sağ ol')) {
      return 'Rica ederim! Başka sorunuz varsa yardımcı olmaktan mutluluk duyarım.';
    }

    return `Sorunuzu anladım: "${userMessage}". Cilt bakımı konusunda size yardımcı olabilmek için daha spesifik bilgiler verebilirim. Lütfen cilt tipiniz (kuru/yağlı/karma/hassas), yaşadığınız sorunlar (akne/lekeler/kırışıklık) veya kullanmak istediğiniz ürün türleri hakkında daha detaylı bilgi verebilir misiniz?`;
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Yapay zeka yanıtı simülasyonu
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    setInputText(question);
    // Otomatik gönder
    setTimeout(() => handleSendMessage(), 100);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageContainer,
      item.isUser ? styles.userMessage : styles.botMessage
    ]}>
      <View style={[
        styles.messageBubble,
        { 
          backgroundColor: item.isUser ? COLORS.userMessageBg : COLORS.botMessageBg,
          alignSelf: item.isUser ? 'flex-end' : 'flex-start'
        }
      ]}>
        <Text style={[
          styles.messageText,
          { color: COLORS.text }
        ]}>
          {item.text}
        </Text>
        <Text style={[
          styles.timestamp,
          { color: COLORS.textLight }
        ]}>
          {item.timestamp.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    </View>
  );

  const renderQuickQuestion = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[styles.quickQuestion, { backgroundColor: COLORS.card }]}
      onPress={() => handleQuickQuestion(item)}
    >
      <Text style={[styles.quickQuestionText, { color: COLORS.text }]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: COLORS.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: COLORS.background }]}>
        <View style={styles.headerContent}>
          <View style={[styles.aiIcon, { backgroundColor: COLORS.primary }]}>
            <Ionicons name="sparkles" size={24} color="#FFFFFF" />
          </View>
          <View>
            <Text style={[styles.title, { color: COLORS.text }]}>Cilt Bakım Asistanı</Text>
            <Text style={[styles.subtitle, { color: COLORS.textLight }]}>
              AI destekli kişisel cilt bakım rehberiniz
            </Text>
          </View>
        </View>
      </View>

      {/* Chat Messages */}
      <View style={styles.chatContainer}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
          ListFooterComponent={
            isTyping ? (
              <View style={[styles.messageContainer, styles.botMessage]}>
                <View style={[styles.messageBubble, { backgroundColor: COLORS.botMessageBg }]}>
                  <View style={styles.typingContainer}>
                    <ActivityIndicator size="small" color={COLORS.primary} />
                    <Text style={[styles.typingText, { color: COLORS.textLight }]}>
                      Cevap yazılıyor...
                    </Text>
                  </View>
                </View>
              </View>
            ) : null
          }
        />
      </View>

      {/* Quick Questions */}
      {messages.length === 1 && (
        <View style={styles.quickQuestionsSection}>
          <Text style={[styles.quickQuestionsTitle, { color: COLORS.text }]}>
            Hızlı Sorular
          </Text>
          <FlatList
            data={QUICK_QUESTIONS}
            renderItem={renderQuickQuestion}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickQuestionsList}
          />
        </View>
      )}

      {/* Input Area */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.inputContainer, { backgroundColor: COLORS.background }]}
      >
        <View style={[styles.inputWrapper, { backgroundColor: COLORS.backgroundLight }]}>
          <TextInput
            style={[styles.textInput, { color: COLORS.text }]}
            placeholder="Cilt bakımı hakkında soru sorun..."
            placeholderTextColor={COLORS.placeholder}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />
          <TouchableOpacity 
            style={[
              styles.sendButton, 
              { backgroundColor: inputText.trim() ? COLORS.primary : COLORS.border }
            ]}
            onPress={handleSendMessage}
            disabled={!inputText.trim()}
          >
            <Ionicons name="send" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0E6E8',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
  },
  chatContainer: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  messageContainer: {
    marginVertical: 4,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 18,
    marginHorizontal: 8,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  botMessage: {
    alignItems: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  timestamp: {
    fontSize: 11,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typingText: {
    fontSize: 14,
    marginLeft: 8,
    fontStyle: 'italic',
  },
  quickQuestionsSection: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0E6E8',
  },
  quickQuestionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  quickQuestionsList: {
    gap: 8,
  },
  quickQuestion: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#F0E6E8',
  },
  quickQuestionText: {
    fontSize: 14,
    textAlign: 'center',
  },
  inputContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0E6E8',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});