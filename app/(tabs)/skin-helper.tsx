import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function SkinHelperScreen() {
  return (
    <View style={styles.container}>
      <Text>Cilt Yardımcısı Sayfası</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});