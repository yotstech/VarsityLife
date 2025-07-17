
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import * as Location from 'expo-location';
import Constants from 'expo-constants';

const MAPBOX_TOKEN = Constants?.manifest?.extra?.MAPBOX_TOKEN || '';
MapboxGL.setAccessToken(MAPBOX_TOKEN);

const mockDrivers = [
  { id: '1', coords: [28.2293, -25.482] },
  { id: '2', coords: [28.2300, -25.483] },
];

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') throw new Error('Location permission denied');
        const { coords } = await Location.getCurrentPositionAsync({});
        setLocation([coords.longitude, coords.latitude]);
      } catch (err) {
        setErrorMsg(err.message);
        setLocation([28.2293, -25.482]); // Fallback
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <ActivityIndicator style={styles.loader} size="large" />;
  if (!location) return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>Unable to access location: {errorMsg}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <MapboxGL.MapView style={styles.map}>
        <MapboxGL.Camera
          zoomLevel={14}
          centerCoordinate={location}
          animationMode="flyTo"
          animationDuration={1000}
        />
        <MapboxGL.PointAnnotation id="rider" coordinate={location}>
          <View style={styles.riderMarker} />
        </MapboxGL.PointAnnotation>
        {mockDrivers.map(driver => (
          <MapboxGL.PointAnnotation
            key={driver.id}
            id={driver.id}
            coordinate={driver.coords}
          >
            <View style={styles.driverMarker} />
          </MapboxGL.PointAnnotation>
        ))}
      </MapboxGL.MapView>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Request Ride</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  riderMarker: {
    width: 20,
    height: 20,
    backgroundColor: '#0f0',
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 2,
  },
  driverMarker: {
    width: 16,
    height: 16,
    backgroundColor: '#00f',
    borderRadius: 8,
    borderColor: '#fff',
    borderWidth: 2,
  },
  button: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 40 : 20,
    left: '10%',
    right: '10%',
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 18 },
  loader: { flex: 1, justifyContent: 'center' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: '#f00', fontSize: 16 },
});
