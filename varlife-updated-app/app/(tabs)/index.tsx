import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Modal } from 'react-native';
import { 
  MapPin, 
  Search, 
  Menu, 
  Heart, 
  Car, 
  Users, 
  GraduationCap, 
  Moon, 
  Zap,
  Navigation,
  ArrowUpDown,
  Clock,
  Star
} from 'lucide-react-native';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function HomeTab() {
  const { user, logout } = useAuth();
  const [pickupQuery, setPickupQuery] = useState<string>('');
  const [destinationQuery, setDestinationQuery] = useState<string>('');
  const [activeSearch, setActiveSearch] = useState<'pickup' | 'destination' | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showHamburgerMenu, setShowHamburgerMenu] = useState<boolean>(false);

  const localAreas = [
    "University of Mpumalanga",
    "Nelspruit CBD", 
    "White River",
    "Mbombela Stadium",
    "Riverside Mall",
    "Ilanga Mall",
    "Lowveld High School",
    "Nelspruit Hospital",
    "Kruger Mpumalanga Airport",
    "Nelspruit Plaza",
    "Crossing Shopping Centre",
    "Mediclinic Nelspruit",
    "Rob Ferreira Hospital",
    "Nelspruit Nature Reserve",
    "Sudwala Caves",
    "Barberton",
    "Hazyview",
    "Sabie",
    "Graskop"
  ];

  const recentSearches = [
    "University of Mpumalanga",
    "Riverside Mall",
    "Nelspruit CBD"
  ];

  const popularDestinations = [
    { name: "University of Mpumalanga", type: "Education", distance: "2.1 km" },
    { name: "Riverside Mall", type: "Shopping", distance: "3.5 km" },
    { name: "Nelspruit CBD", type: "Business", distance: "4.2 km" },
    { name: "Mbombela Stadium", type: "Sports", distance: "6.8 km" }
  ];

  const rideOptions = [
    {
      id: 'standard',
      name: 'Standard Ride',
      icon: <Car size={24} color="white" />,
      price: 'R25.50',
      time: '5 min',
      description: 'Reliable rides for students',
      discount: '15% student discount'
    },
    {
      id: 'campus',
      name: 'Campus Shuttle',
      icon: <GraduationCap size={24} color="white" />,
      price: 'R12.75',
      time: '8 min',
      description: 'Shared rides around campus',
      discount: '50% campus special'
    },
    {
      id: 'group',
      name: 'Group Ride',
      icon: <Users size={24} color="white" />,
      price: 'R38.25',
      time: '6 min',
      description: 'Split fare with friends (up to 4)',
      discount: '20% group discount'
    },
    {
      id: 'latenight',
      name: 'Safe Night Ride',
      icon: <Moon size={24} color="white" />,
      price: 'R28.50',
      time: '4 min',
      description: '24/7 safe transportation',
      discount: 'Priority verified drivers'
    },
    {
      id: 'express',
      name: 'Express Ride',
      icon: <Zap size={24} color="white" />,
      price: 'R35.00',
      time: '3 min',
      description: 'Fastest available ride',
      discount: '10% student discount'
    }
  ];

  const addToFavorites = (location: string) => {
    setFavorites(prev => {
      if (prev.includes(location)) return prev;
      return [...prev, location];
    });
  };

  const currentQuery = activeSearch === 'pickup' ? pickupQuery : destinationQuery;
  const filteredAreas = currentQuery 
    ? localAreas.filter(area => 
        area.toLowerCase().includes(currentQuery.toLowerCase())
      )
    : [];

  const handleLocationSelect = (location: string) => {
    if (activeSearch === 'pickup') {
      setPickupQuery(location);
    } else if (activeSearch === 'destination') {
      setDestinationQuery(location);
    }
    setActiveSearch(null);
  };

  const swapLocations = () => {
    const temp = pickupQuery;
    setPickupQuery(destinationQuery);
    setDestinationQuery(temp);
  };

  const HamburgerMenu = () => (
    <Modal
      visible={showHamburgerMenu}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowHamburgerMenu(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.hamburgerMenu}>
          <View style={styles.menuHeader}>
            <Text style={styles.menuTitle}>Menu</Text>
            <TouchableOpacity 
              onPress={() => setShowHamburgerMenu(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.userInfo}>
            <View style={styles.userAvatar}>
              <Text style={styles.userInitial}>{user?.email?.charAt(0).toUpperCase()}</Text>
            </View>
            <View>
              <Text style={styles.userName}>{user?.email}</Text>
              <Text style={styles.userStatus}>
                {user?.isVerified ? 'Verified Student' : 'Unverified'}
              </Text>
            </View>
          </View>

          <View style={styles.menuItems}>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Your Trips</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Payment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Help</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuItemText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => {
                setShowHamburgerMenu(false);
                logout();
              }}
            >
              <Text style={[styles.menuItemText, styles.logoutText]}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <HamburgerMenu />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity 
            style={styles.menuButton}
            onPress={() => setShowHamburgerMenu(true)}
          >
            <Menu size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.statusContainer}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>
              {user?.isVerified ? 'Verified Student' : 'Unverified'} • Nelspruit
            </Text>
          </View>
        </View>
        
        <View style={styles.searchContainer}>
          {/* Pickup Search Bar */}
          <TouchableOpacity 
            style={[styles.searchBar, activeSearch === 'pickup' && styles.searchBarActive]}
            onPress={() => setActiveSearch('pickup')}
          >
            <View style={styles.pickupDot} />
            <TextInput 
              style={styles.searchInput}
              placeholder="Pickup location"
              placeholderTextColor="#9ca3af"
              value={pickupQuery}
              onChangeText={setPickupQuery}
              onFocus={() => setActiveSearch('pickup')}
            />
          </TouchableOpacity>
          
          {/* Swap Button */}
          <View style={styles.swapContainer}>
            <TouchableOpacity style={styles.swapButton} onPress={swapLocations}>
              <ArrowUpDown size={16} color="#6b7280" />
            </TouchableOpacity>
          </View>
          
          {/* Destination Search Bar */}
          <TouchableOpacity 
            style={[styles.searchBar, activeSearch === 'destination' && styles.searchBarActive]}
            onPress={() => setActiveSearch('destination')}
          >
            <MapPin size={20} color="#ef4444" />
            <TextInput 
              style={styles.searchInput}
              placeholder="Where to in Nelspruit/White River?"
              placeholderTextColor="#9ca3af"
              value={destinationQuery}
              onChangeText={setDestinationQuery}
              onFocus={() => setActiveSearch('destination')}
            />
          </TouchableOpacity>
          
          {/* Search Suggestions */}
          {activeSearch && (
            <View style={styles.suggestionsContainer}>
              {/* Recent Searches */}
              {!currentQuery && (
                <View>
                  <Text style={styles.sectionTitle}>Recent</Text>
                  {recentSearches.map((search, index) => (
                    <TouchableOpacity 
                      key={index}
                      style={styles.suggestionItem}
                      onPress={() => handleLocationSelect(search)}
                    >
                      <Clock size={16} color="#9ca3af" />
                      <Text style={styles.suggestionText}>{search}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
              
              {/* Popular Destinations */}
              {!currentQuery && (
                <View style={styles.sectionSpacing}>
                  <Text style={styles.sectionTitle}>Popular destinations</Text>
                  {popularDestinations.map((dest, index) => (
                    <TouchableOpacity 
                      key={index}
                      style={styles.suggestionItem}
                      onPress={() => handleLocationSelect(dest.name)}
                    >
                      <Star size={16} color="#9ca3af" />
                      <View style={styles.destinationInfo}>
                        <Text style={styles.suggestionText}>{dest.name}</Text>
                        <Text style={styles.destinationType}>{dest.type} • {dest.distance}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
              
              {/* Filtered Results */}
              {currentQuery && filteredAreas.map((area, index) => (
                <TouchableOpacity 
                  key={index}
                  style={styles.suggestionItem}
                  onPress={() => handleLocationSelect(area)}
                >
                  <MapPin size={16} color="#9ca3af" />
                  <Text style={styles.suggestionText}>{area}</Text>
                  <TouchableOpacity 
                    onPress={() => addToFavorites(area)}
                  >
                    <Heart size={16} color="#9ca3af" />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
          )}
          
          {favorites.length > 0 && !activeSearch && (
            <View style={styles.favoritesContainer}>
              <Text style={styles.favoritesTitle}>Favorites</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {favorites.map((fav, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.favoriteChip}
                    onPress={() => handleLocationSelect(fav)}
                  >
                    <Text style={styles.favoriteText}>{fav}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </View>
      
      {/* Map */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <MapPin size={48} color="#9ca3af" />
          <Text style={styles.mapPlaceholderText}>Map will be integrated here</Text>
        </View>
        
        <View style={styles.mapOverlay}>
          <TouchableOpacity style={styles.currentLocationButton}>
            <Navigation size={20} color="white" />
            <Text style={styles.currentLocationText}>Current Location</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Rides */}
      <View style={styles.ridesContainer}>
        <View style={styles.ridesHeader}>
          <Text style={styles.ridesTitle}>Choose a ride</Text>
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>Student Discounts Active</Text>
          </View>
        </View>
        
        <ScrollView>
          {rideOptions.map((ride) => (
            <TouchableOpacity 
              key={ride.id}
              style={styles.rideOption}
            >
              <View style={styles.rideOptionLeft}>
                <View style={styles.rideIcon}>
                  {ride.icon}
                </View>
                <View style={styles.rideInfo}>
                  <Text style={styles.rideName}>{ride.name}</Text>
                  <Text style={styles.rideDescription}>{ride.description}</Text>
                  <Text style={styles.rideDiscount}>{ride.discount}</Text>
                </View>
              </View>
              <View style={styles.rideOptionRight}>
                <Text style={styles.ridePrice}>{ride.price}</Text>
                <Text style={styles.rideTime}>{ride.time}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    padding: 24,
    paddingTop: 60,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  menuButton: {
    padding: 8,
    borderRadius: 20,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    backgroundColor: '#10b981',
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  searchContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  searchBarActive: {
    borderColor: '#3b82f6',
    backgroundColor: 'white',
  },
  pickupDot: {
    width: 12,
    height: 12,
    backgroundColor: '#10b981',
    borderRadius: 6,
    marginRight: 12,
  },
  swapContainer: {
    alignItems: 'center',
    marginVertical: 4,
  },
  swapButton: {
    padding: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#000',
  },
  suggestionsContainer: {
    maxHeight: 300,
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
    marginTop: 8,
  },
  sectionSpacing: {
    marginTop: 16,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  suggestionText: {
    color: '#374151',
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
  },
  destinationInfo: {
    flex: 1,
    marginLeft: 12,
  },
  destinationType: {
    color: '#6b7280',
    fontSize: 14,
    marginTop: 2,
  },
  favoritesContainer: {
    marginTop: 16,
  },
  favoritesTitle: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  favoriteChip: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  favoriteText: {
    color: '#374151',
    fontSize: 14,
  },
  mapContainer: {
    height: 300,
    position: 'relative',
  },
  mapPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPlaceholderText: {
    color: '#6b7280',
    marginTop: 8,
    fontSize: 16,
  },
  mapOverlay: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  currentLocationButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  currentLocationText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 6,
    fontWeight: '500',
  },
  ridesContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  ridesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  ridesTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  discountBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  discountText: {
    color: '#166534',
    fontSize: 12,
    fontWeight: 'bold',
  },
  rideOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderWidth: 2,
    borderColor: '#f3f4f6',
    borderRadius: 12,
    marginBottom: 12,
  },
  rideOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rideIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#000',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  rideInfo: {
    flex: 1,
  },
  rideName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  rideDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  rideDiscount: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '500',
  },
  rideOptionRight: {
    alignItems: 'flex-end',
  },
  ridePrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 4,
  },
  rideTime: {
    fontSize: 14,
    color: '#6b7280',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
  },
  hamburgerMenu: {
    backgroundColor: 'white',
    width: '80%',
    height: '100%',
    paddingTop: 60,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#6b7280',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  userAvatar: {
    width: 48,
    height: 48,
    backgroundColor: '#3b82f6',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userInitial: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  userStatus: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  menuItems: {
    paddingTop: 16,
  },
  menuItem: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  menuItemText: {
    fontSize: 16,
    color: '#374151',
  },
  logoutText: {
    color: '#ef4444',
  },
});