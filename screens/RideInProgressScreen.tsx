import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Phone, MessageCircle, Shield, Navigation } from 'lucide-react-native';
import { NavigationParams } from '../types';
import { MapView } from '../components/MapView';
import { Button } from '../components/Button';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '../constants/theme';

type Props = NativeStackScreenProps<NavigationParams, 'RideInProgress'>;

export const RideInProgressScreen: React.FC<Props> = ({ navigation, route }) => {
  const { rideRequest, driver } = route.params;
  const [rideStatus, setRideStatus] = useState<'arriving' | 'in_progress' | 'completed'>('arriving');
  const [eta, setEta] = useState(15); // 15 minutes ride duration

  useEffect(() => {
    // Simulate ride progression
    const statusTimeout = setTimeout(() => {
      setRideStatus('in_progress');
    }, 3000);

    // Simulate ride completion
    const completionTimeout = setTimeout(() => {
      setRideStatus('completed');
      handleRideComplete();
    }, 10000); // Complete after 10 seconds for demo

    return () => {
      clearTimeout(statusTimeout);
      clearTimeout(completionTimeout);
    };
  }, []);

  useEffect(() => {
    if (rideStatus === 'in_progress') {
      const interval = setInterval(() => {
        setEta(prev => Math.max(0, prev - 1));
      }, 60000); // Update every minute

      return () => clearInterval(interval);
    }
  }, [rideStatus]);

  const handleRideComplete = () => {
    Alert.alert(
      'Ride Completed',
      'Thank you for using Varlife! How was your ride?',
      [
        {
          text: 'Rate Driver',
          onPress: () => navigation.navigate('Home'),
        },
        {
          text: 'Done',
          onPress: () => navigation.navigate('Home'),
        },
      ]
    );
  };

  const handleEmergency = () => {
    Alert.alert(
      'Emergency',
      'Are you in an emergency situation?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Call Emergency',
          style: 'destructive',
          onPress: () => {
            // In a real app, this would call emergency services
            Alert.alert('Emergency services contacted');
          },
        },
      ]
    );
  };

  const getStatusText = () => {
    switch (rideStatus) {
      case 'arriving':
        return 'Driver is arriving';
      case 'in_progress':
        return 'Ride in progress';
      case 'completed':
        return 'Ride completed';
      default:
        return 'Ride in progress';
    }
  };

  const getStatusColor = () => {
    switch (rideStatus) {
      case 'arriving':
        return COLORS.warning;
      case 'in_progress':
        return COLORS.secondary;
      case 'completed':
        return COLORS.success;
      default:
        return COLORS.secondary;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Map */}
      <View style={styles.mapContainer}>
        <MapView
          userLocation={rideRequest.pickup}
          drivers={[driver]}
          showUserLocation={true}
        />
        
        {/* Emergency Button */}
        <TouchableOpacity style={styles.emergencyButton} onPress={handleEmergency}>
          <Shield size={24} color={COLORS.error} />
        </TouchableOpacity>
      </View>

      {/* Bottom Panel */}
      <View style={styles.bottomPanel}>
        <View style={styles.statusContainer}>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
          <Text style={styles.statusText}>{getStatusText()}</Text>
          {rideStatus === 'in_progress' && (
            <Text style={styles.etaText}>{eta} min remaining</Text>
          )}
        </View>

        <View style={styles.driverInfo}>
          <View style={styles.driverAvatar}>
            <Text style={styles.driverInitial}>
              {driver.name.charAt(0)}
            </Text>
          </View>
          <View style={styles.driverDetails}>
            <Text style={styles.driverName}>{driver.name}</Text>
            <Text style={styles.vehicleInfo}>
              {driver.vehicle.color} {driver.vehicle.make} • {driver.vehicle.licensePlate}
            </Text>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Phone size={20} color={COLORS.accent} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <MessageCircle size={20} color={COLORS.accent} />
            </TouchableOpacity>
          </View>
        </View>

        {rideStatus === 'in_progress' && (
          <View style={styles.rideProgress}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '60%' }]} />
            </View>
            <Text style={styles.progressText}>En route to destination</Text>
          </View>
        )}

        {rideStatus === 'completed' && (
          <Button
            title="Rate Your Ride"
            onPress={() => navigation.navigate('Home')}
            size="large"
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  emergencyButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.md,
  },
  bottomPanel: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: BORDER_RADIUS.xl,
    borderTopRightRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    ...SHADOWS.lg,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: SPACING.sm,
  },
  statusText: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text.primary,
    flex: 1,
  },
  etaText: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text.secondary,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: SPACING.lg,
  },
  driverAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  driverInitial: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.inverse,
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  vehicleInfo: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.secondary,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  rideProgress: {
    marginBottom: SPACING.lg,
  },
  progressBar: {
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    marginBottom: SPACING.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.secondary,
    borderRadius: 2,
  },
  progressText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.secondary,
    textAlign: 'center',
  },
});