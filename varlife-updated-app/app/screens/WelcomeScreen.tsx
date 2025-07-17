
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GraduationCap } from 'lucide-react-native';
import { router } from 'expo-router';

const WelcomeScreen = () => {
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
          <Text style={styles.secondaryButtonText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    padding: 24,
  },
  content: {
    marginTop: 100,
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    marginTop: 8,
    color: '#555',
  },
  location: {
    fontSize: 14,
    marginTop: 4,
    color: '#777',
  },
  buttons: {
    marginBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  secondaryButton: {
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  secondaryButtonText: {
    color: '#000',
    fontSize: 16,
  },
});

export default WelcomeScreen;
