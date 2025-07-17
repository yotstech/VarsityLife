import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MapPin, Menu } from 'lucide-react-native';
import { NavigationParams, Location } from '../types';
import { MapView } from '../components/MapView';
import { Button } from '../components/Button';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useLocation } from '../hooks/useLocation';
import { useRideFlow } from '../hooks/useRideFlow';
import { mockDriverService } from '../services/mockDriverService';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '../constants/theme';

type Props = NativeStackScreenProps<NavigationParams, 'Home'>;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { location, error: locationError, loading: locationLoading } = useLocation();
  const { requestRide, currentStatus, isLoading: rideLoading } = useRideFlow();
  const [drivers, setDrivers] = useState(mockDriverService.getAllDrivers());

  useEffect(() => {
    if (currentStatus === 'SEARCHING') {
      navigation.navigate('FindingDriver', { 
        rideRequest: { 
          id: 'temp', 
          pickup: location!, 
          status: 'SEARCHING', 
          createdAt: new Date() 
        } 
      });
    }
  }, [currentStatus, navigation, location]);

  const handleRequestRide = async () => {
    if (!location) {
      Alert.alert('Location Required', 'Please enable location services to request a ride.');
      return;
    }

    try {
      await requestRide(location);
    } catch (error) {
      Alert.alert('Request Failed', 'Unable to request ride. Please try again.');
    }
  };

  if (locationLoading) {
    return <LoadingSpinner message="Getting your location..." />;
  }

  if (locationError && !location) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <MapPin size={48} color={COLORS.text.muted} />
          <Text style={styles.errorTitle}>Location Required</Text>
          <Text style={styles.errorMessage}>{locationError}</Text>
          <Button
            title="Try Again"
            onPress={() => window.location.reload()}
            variant="outline"
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Menu size={24} color={COLORS.text.primary} />
        </TouchableOpacity>
        <View style={styles.locationInfo}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Nelspruit • Available</Text>
        </View>
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        <MapView
          userLocation={location}
          drivers={drivers}
          showUserLocation={true}
        />
      </View>

      {/* Bottom Panel */}
      <View style={styles.bottomPanel}>
        <View style={styles.rideInfo}>
          <Text style={styles.rideTitle}>Where to?</Text>
          <Text style={styles.rideSubtitle}>
            {drivers.length} drivers nearby
          </Text>
        </View>

        <Button
          title="Request Ride"
          onPress={handleRequestRide}
          loading={rideLoading}
          size="large"
        />

        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickAction}>
            <Text style={styles.quickActionText}>🏫 University</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <Text style={styles.quickActionText}>🏪 Mall</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <Text style={styles.quickActionText}>🏠 Home</Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuButton: {
    padding: SPACING.sm,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.secondary,
    marginRight: SPACING.sm,
  },
  statusText: {
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.text.primary,
  },
  mapContainer: {
    flex: 1,
  },
  bottomPanel: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: BORDER_RADIUS.xl,
    borderTopRightRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    ...SHADOWS.lg,
  },
  rideInfo: {
    marginBottom: SPACING.lg,
  },
  rideTitle: {
    fontSize: TYPOGRAPHY.sizes.xxl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  rideSubtitle: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text.secondary,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: SPACING.lg,
  },
  quickAction: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  quickActionText: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.text.primary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  errorTitle: {
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.text.primary,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  errorMessage: {
    fontSize: TYPOGRAPHY.sizes.md,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: SPACING.lg,
    lineHeight: 22,
  },
});