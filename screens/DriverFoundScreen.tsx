import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Star, Phone, MessageCircle, Car } from 'lucide-react-native';
import { NavigationParams } from '../types';
import { Button } from '../components/Button';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '../constants/theme';

type Props = NativeStackScreenProps<NavigationParams, 'DriverFound'>;

export const DriverFoundScreen: React.FC<Props> = ({ navigation, route }) => {
  const { rideRequest, driver } = route.params;
  const [eta, setEta] = useState(driver.eta);

  useEffect(() => {
    // Simulate ETA countdown
    const interval = setInterval(() => {
      setEta(prev => Math.max(1, prev - 1));
    }, 60000); // Update every minute

    // Auto-navigate to ride in progress after ETA
    const timeout = setTimeout(() => {
      navigation.replace('RideInProgress', { rideRequest, driver });
    }, eta * 60 * 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [eta, navigation, rideRequest, driver]);

  const handleStartRide = () => {
    navigation.replace('RideInProgress', { rideRequest, driver });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.statusContainer}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Driver Found</Text>
        </View>

        <View style={styles.driverCard}>
          <View style={styles.driverHeader}>
            <View style={styles.driverAvatar}>
              <Text style={styles.driverInitial}>
                {driver.name.charAt(0)}
              </Text>
            </View>
            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>{driver.name}</Text>
              <View style={styles.ratingContainer}>
                <Star size={16} color={COLORS.warning} fill={COLORS.warning} />
                <Text style={styles.rating}>{driver.rating}</Text>
              </View>
            </View>
            <View style={styles.etaContainer}>
              <Text style={styles.etaNumber}>{eta}</Text>
              <Text style={styles.etaLabel}>min</Text>
            </View>
          </View>

          <View style={styles.vehicleInfo}>
            <Car size={20} color={COLORS.text.secondary} />
            <Text style={styles.vehicleText}>
              {driver.vehicle.color} {driver.vehicle.make} {driver.vehicle.model}
            </Text>
            <Text style={styles.licensePlate}>{driver.vehicle.licensePlate}</Text>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Phone size={20} color={COLORS.accent} />
              <Text style={styles.actionButtonText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <MessageCircle size={20} color={COLORS.accent} />
              <Text style={styles.actionButtonText}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.rideDetails}>
          <Text style={styles.rideDetailsTitle}>Ride Details</Text>
          <View style={styles.rideDetailsItem}>
            <Text style={styles.rideDetailsLabel}>Pickup</Text>
            <Text style={styles.rideDetailsValue}>Current Location</Text>
          </View>
          {rideRequest.destination && (
            <View style={styles.rideDetailsItem}>
              <Text style={styles.rideDetailsLabel}>Destination</Text>
              <Text style={styles.rideDetailsValue}>Selected Location</Text>
            </View>
          )}
          {rideRequest.estimatedFare && (
            <View style={styles.rideDetailsItem}>
              <Text style={styles.rideDetailsLabel}>Estimated Fare</Text>
              <Text style={styles.fareValue}>R{rideRequest.estimatedFare}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          title="Start Ride"
          onPress={handleStartRide}
          size="large"
        />
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel Ride</Text>
        </TouchableOpacity>
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
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.secondary,
    marginRight: SPACING.sm,
  },
  statusText: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.secondary,
  },
  driverCard: {
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.md,
  },
  driverHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  driverAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  driverInitial: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.inverse,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text.secondary,
    marginLeft: SPACING.xs,
  },
  etaContainer: {
    alignItems: 'center',
  },
  etaNumber: {
    fontSize: TYPOGRAPHY.sizes.xxl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.secondary,
  },
  etaLabel: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.secondary,
  },
  vehicleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    marginBottom: SPACING.md,
  },
  vehicleText: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text.primary,
    marginLeft: SPACING.sm,
    flex: 1,
  },
  licensePlate: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.secondary,
    fontWeight: TYPOGRAPHY.weights.semibold,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  actionButtonText: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.accent,
    marginLeft: SPACING.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  rideDetails: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
  },
  rideDetailsTitle: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
  },
  rideDetailsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  rideDetailsLabel: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text.secondary,
  },
  rideDetailsValue: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text.primary,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
  fareValue: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.secondary,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  footer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
    gap: SPACING.md,
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  cancelButtonText: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.error,
    fontWeight: TYPOGRAPHY.weights.medium,
  },
});