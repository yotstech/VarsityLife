import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GraduationCap } from 'lucide-react-native';
import { NavigationParams } from '../types';
import { Button } from '../components/Button';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../constants/theme';

type Props = NativeStackScreenProps<NavigationParams, 'Welcome'>;

export const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <GraduationCap size={56} color={COLORS.primary} />
        </View>
        
        <Text style={styles.title}>Varlife</Text>
        <Text style={styles.subtitle}>Student rides, verified and safe</Text>
        <Text style={styles.location}>Nelspruit • White River • Mpumalanga</Text>
        
        <View style={styles.features}>
          <View style={styles.feature}>
            <Text style={styles.featureTitle}>✓ Student Verified</Text>
            <Text style={styles.featureText}>Only verified students can ride</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureTitle}>✓ Affordable Rates</Text>
            <Text style={styles.featureText}>Special student pricing</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureTitle}>✓ Safe & Reliable</Text>
            <Text style={styles.featureText}>Vetted drivers, tracked rides</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.buttons}>
        <Button
          title="Get Started"
          onPress={() => navigation.navigate('Signup')}
          size="large"
        />
        <Button
          title="I already have an account"
          onPress={() => navigation.navigate('Login')}
          variant="outline"
          size="large"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  logoContainer: {
    width: 112,
    height: 112,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xl,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  title: {
    fontSize: 48,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.xl,
    color: COLORS.text.secondary,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  location: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text.muted,
    textAlign: 'center',
    marginBottom: SPACING.xxl,
  },
  features: {
    width: '100%',
    gap: SPACING.lg,
  },
  feature: {
    alignItems: 'center',
  },
  featureTitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.secondary,
    marginBottom: SPACING.xs,
  },
  featureText: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
  buttons: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
    gap: SPACING.md,
  },
});