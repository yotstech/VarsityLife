import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GraduationCap } from 'lucide-react-native';
import { router } from 'expo-router';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <GraduationCap size={56} color="#000" />
        </View>
        <Text style={styles.title}>VAR LIFE</Text>
        <Text style={styles.subtitle}>Student rides, verified and safe</Text>
        <Text style={styles.location}>Nelspruit • White River • Mpumalanga</Text>
      </View>
      
      <View style={styles.buttons}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => router.push('/auth?mode=signup')}
        >
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => router.push('/auth?mode=login')}
        >
          <Text style={styles.secondaryButtonText}>I already have an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'space-between',
    padding: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 112,
    height: 112,
    backgroundColor: 'white',
    borderRadius: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    color: '#d1d5db',
    marginBottom: 8,
    textAlign: 'center',
  },
  location: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
  },
  buttons: {
    gap: 16,
  },
  primaryButton: {
    backgroundColor: 'white',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: '#6b7280',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});