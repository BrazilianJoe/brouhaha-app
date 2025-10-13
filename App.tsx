import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  console.log('App component rendering');
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Brouhaha</Text>
      <Text style={styles.subtitle}>Media Platform</Text>
      <Text style={styles.description}>
        Cross-platform media consumption for webtoons, books, and videos
      </Text>
      <Text style={styles.status}>
        ✅ App is running successfully!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#667eea',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  status: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 15,
    borderRadius: 8,
  },
});