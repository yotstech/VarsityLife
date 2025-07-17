import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { X, MapPin } from 'lucide-react-native';
import { NavigationParams } from '../types';
import { Button } from '../components/Button';
import { mockDriverService } from '../services/mockDriverService';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../constants/theme';

type Props = NativeStackScreenProps<NavigationParams, 'FindingDriver'>;

export const FindingDriverScreen: React.FC<Props> = ({ navigation, route }) => {
  const { rideRequest } = route.params;
  const [searchAnimation] = useState(new Animated.Value(0));
  const [dots, setDots] = useState('');

  useEffect(() => {
    // Animate search indicator
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(searchAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(searchAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();

    // Animate dots
    const dotsInterval = setInterval(() => {
      setDots(prev => {
        if (prev === '...') return '';
        return prev + '.';
      });
    }, 500);

    // Simulate finding driver after 3 seconds
    const findDriverTimeout = setTimeout(async () => {
      try {
        const driver = await mockDriverService.findNearbyDriver(rideRequest.pickup);
        if (driver) {
          navigation.replace('DriverFound', { rideRequest, driver });
        } else {
          // Handle no driver found
          navigation.goBack();
        }
      } catch (error) {
        console.error('Error finding driver:', error);
        navigation.goBack();
      }
    }, 3000);

    return () => {
      animation.stop();
      clearInterval(dotsInterval);
      clearTimeout(findDriverTimeout);
    };
  }, [searchAnimation, rideRequest, navigation]);

  const handleCancel = () => {
    navigation.goBack();
  };

  const scale = searchAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  const opacity = searchAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={handleCancel}>
          <X size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.animationContainer}>
          <Animated.View
            style={[
              styles.searchIndicator,
              {
                transform: [{ scale }],
                opacity,
              },
            ]}
          >
            <MapPin size={48} color={COLORS.primary} />
          </Animated.View>
          
          <View style={styles.ripple1} />
          <View style={styles.ripple2} />
          <View style={styles.ripple3} />
        </View>

        <Text style={styles.title}>Finding your ride{dots}</Text>
        <Text style={styles.subtitle}>
          We're connecting you with nearby verified student drivers
        </Text>

        <View style={styles.statusContainer}>
          <View style={styles.statusItem}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Searching for drivers</Text>
          </View>
          <View style={styles.statusItem}>
            <View style={[styles.statusDot, styles.statusDotInactive]} />
            <Text style={[styles.statusText, styles.statusTextInactive]}>
              Driver found
            </Text>
          </View>
          <View style={styles.statusItem}>
            <View style={[styles.statusDot, styles.statusDotInactive]} />
            <Text style={[styles.statusText, styles.statusTextInactive]}>
              Driver en route
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          title="Cancel Request"
          onPress={handleCancel}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  closeButton: {
    padding: SPACING.sm,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  animationContainer: {
    position: 'relative',
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  searchIndicator: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
    zIndex: 3,
  },
  ripple1: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: COLORS.primary,
    opacity: 0.3,
  },
  ripple2: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: COLORS.primary,
    opacity: 0.2,
  },
  ripple3: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.primary,
    opacity: 0.1,
  },
  title: {
    fontSize: TYPOGRAPHY.sizes.xxl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: SPACING.xxl,
  },
  statusContainer: {
    width: '100%',
    gap: SPACING.lg,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.secondary,
    marginRight: SPACING.md,
  },
  statusDotInactive: {
    backgroundColor: COLORS.border,
  },
  statusText: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text.primary,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  statusTextInactive: {
    color: COLORS.text.muted,
    fontWeight: TYPOGRAPHY.weights.normal,
  },
  footer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
});