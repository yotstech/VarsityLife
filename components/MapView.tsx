import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import { Location, Driver } from '../types';
import { COLORS } from '../constants/theme';

// Set your Mapbox access token
MapboxGL.setAccessToken(process.env.MAPBOX_TOKEN || 'pk.your_token_here');

interface MapViewProps {
  userLocation: Location | null;
  drivers?: Driver[];
  showUserLocation?: boolean;
  onMapPress?: (location: Location) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  userLocation,
  drivers = [],
  showUserLocation = true,
  onMapPress,
}) => {
  const mapRef = useRef<MapboxGL.MapView>(null);
  const cameraRef = useRef<MapboxGL.Camera>(null);

  useEffect(() => {
    if (userLocation && cameraRef.current) {
      cameraRef.current.setCamera({
        centerCoordinate: [userLocation.longitude, userLocation.latitude],
        zoomLevel: 14,
        animationDuration: 1000,
      });
    }
  }, [userLocation]);

  const handleMapPress = (feature: any) => {
    if (onMapPress && feature.geometry) {
      const [longitude, latitude] = feature.geometry.coordinates;
      onMapPress({ latitude, longitude });
    }
  };

  if (!userLocation) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <MapboxGL.MapView
        ref={mapRef}
        style={styles.map}
        onPress={handleMapPress}
        compassEnabled={true}
        logoEnabled={false}
        attributionEnabled={false}
      >
        <MapboxGL.Camera
          ref={cameraRef}
          centerCoordinate={[userLocation.longitude, userLocation.latitude]}
          zoomLevel={14}
        />

        {/* User Location */}
        {showUserLocation && (
          <MapboxGL.PointAnnotation
            id="user-location"
            coordinate={[userLocation.longitude, userLocation.latitude]}
          >
            <View style={styles.userLocationMarker}>
              <View style={styles.userLocationDot} />
            </View>
          </MapboxGL.PointAnnotation>
        )}

        {/* Driver Locations */}
        {drivers.map((driver) => (
          <MapboxGL.PointAnnotation
            key={driver.id}
            id={driver.id}
            coordinate={[driver.location.longitude, driver.location.latitude]}
          >
            <View style={styles.driverMarker}>
              <View style={styles.driverIcon} />
            </View>
          </MapboxGL.PointAnnotation>
        ))}
      </MapboxGL.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  map: {
    flex: 1,
  },
  userLocationMarker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.accent,
    borderWidth: 3,
    borderColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userLocationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.background,
  },
  driverMarker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.background,
  },
  driverIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.background,
  },
});