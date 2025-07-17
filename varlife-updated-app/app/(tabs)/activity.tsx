import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Clock, MapPin, Star } from 'lucide-react-native';

export default function ActivityTab() {
  const recentRides = [
    {
      id: 1,
      from: 'University of Mpumalanga',
      to: 'Riverside Mall',
      date: '2024-01-15',
      price: 'R25.50',
      rating: 4.8,
    },
    {
      id: 2,
      from: 'Nelspruit CBD',
      to: 'White River',
      date: '2024-01-14',
      price: 'R32.00',
      rating: 4.9,
    },
    {
      id: 3,
      from: 'Ilanga Mall',
      to: 'University of Mpumalanga',
      date: '2024-01-13',
      price: 'R18.75',
      rating: 5.0,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ride Activity</Text>
        <Text style={styles.subtitle}>Your recent trips</Text>
      </View>
      
      <ScrollView style={styles.content}>
        {recentRides.map((ride) => (
          <View key={ride.id} style={styles.rideCard}>
            <View style={styles.rideHeader}>
              <View style={styles.routeInfo}>
                <View style={styles.locationRow}>
                  <View style={styles.dot} />
                  <Text style={styles.locationText}>{ride.from}</Text>
                </View>
                <View style={styles.line} />
                <View style={styles.locationRow}>
                  <MapPin size={12} color="#666" />
                  <Text style={styles.locationText}>{ride.to}</Text>
                </View>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>{ride.price}</Text>
                <View style={styles.ratingContainer}>
                  <Star size={12} color="#fbbf24" fill="#fbbf24" />
                  <Text style={styles.rating}>{ride.rating}</Text>
                </View>
              </View>
            </View>
            <View style={styles.rideFooter}>
              <Clock size={14} color="#9ca3af" />
              <Text style={styles.date}>{ride.date}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  rideCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  rideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  routeInfo: {
    flex: 1,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981',
    marginRight: 12,
  },
  line: {
    width: 1,
    height: 20,
    backgroundColor: '#d1d5db',
    marginLeft: 4,
    marginRight: 12,
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
  },
  rideFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  date: {
    fontSize: 12,
    color: '#9ca3af',
    marginLeft: 6,
  },
});