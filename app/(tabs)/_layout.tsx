import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';

// Toz pembe tonları
const COLORS = {
  primary: '#D8A7B1',
  primaryLight: '#E8C7CF',
  primaryDark: '#C895A2',
  background: '#FFFFFF',
  backgroundLight: '#FDF6F8',
  text: '#4A4A4A',
  textLight: '#8B7D7F',
  border: '#F0E6E8',
  accent: '#EFBBCF',
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: '#8E8E93',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          height: 85,
          paddingBottom: 20,
          paddingTop: 12,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ana Sayfa',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.tabIconContainer}>
              <Ionicons name="home" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="scanner"
        options={{
          title: 'Tarayıcı',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.tabIconContainer}>
              <Ionicons name="camera" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="skin-helper"
        options={{
          title: 'Skin Helper',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.tabIconContainer}>
              <Ionicons name="sparkles" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'Geçmiş',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.tabIconContainer}>
              <Ionicons name="time" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.tabIconContainer}>
              <Ionicons name="person" size={size} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabIconContainer: {
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
});