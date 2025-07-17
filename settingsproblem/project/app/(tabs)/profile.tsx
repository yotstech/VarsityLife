import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { 
  User, 
  CreditCard, 
  Clock, 
  GraduationCap, 
  Users, 
  Heart, 
  Shield, 
  Star, 
  Settings,
  ChevronRight,
  Check
} from 'lucide-react-native';

export default function ProfileTab() {
  const menuItems = [
    {
      id: 1,
      title: 'Payment Methods',
      subtitle: 'Manage cards & wallets',
      icon: <CreditCard size={20} color="#3b82f6" />,
      bgColor: '#dbeafe',
    },
    {
      id: 2,
      title: 'Ride History',
      subtitle: 'View past trips',
      icon: <Clock size={20} color="#8b5cf6" />,
      bgColor: '#ede9fe',
    },
    {
      id: 3,
      title: 'Student Verification',
      subtitle: 'University of Mpumalanga',
      icon: <GraduationCap size={20} color="#10b981" />,
      bgColor: '#d1fae5',
      verified: true,
    },
    {
      id: 4,
      title: 'Refer Friends',
      subtitle: 'Earn R50 credit per referral',
      icon: <Users size={20} color="#f59e0b" />,
      bgColor: '#fef3c7',
    },
    {
      id: 5,
      title: 'Favorite Places',
      subtitle: '3 saved locations',
      icon: <Heart size={20} color="#ef4444" />,
      bgColor: '#fee2e2',
    },
    {
      id: 6,
      title: 'Safety Center',
      subtitle: 'Emergency contacts & features',
      icon: <Shield size={20} color="#6b7280" />,
      bgColor: '#f3f4f6',
    },
    {
      id: 7,
      title: 'Rate Your Experience',
      subtitle: 'Help us improve VAR LIFE',
      icon: <Star size={20} color="#fbbf24" />,
      bgColor: '#fef3c7',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView style={styles.content}>
        {/* Profile Info */}
        <View style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <View style={styles.avatar}>
              <User size={40} color="#6b7280" />
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>John Doe</Text>
              <Text style={styles.userEmail}>john.doe@ump.ac.za</Text>
              <View style={styles.verificationBadge}>
                <View style={styles.verificationDot} />
                <Text style={styles.verificationText}>Verified UMP Student</Text>
              </View>
            </View>
          </View>
          
          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>47</Text>
              <Text style={styles.statLabel}>Rides</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>4.8</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumberGreen}>R342</Text>
              <Text style={styles.statLabel}>Saved</Text>
            </View>
          </View>
        </View>
        
        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuIcon, { backgroundColor: item.bgColor }]}>
                  {item.icon}
                </View>
                <View style={styles.menuText}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
              <View style={styles.menuItemRight}>
                {item.verified && (
                  <View style={styles.verifiedContainer}>
                    <Check size={16} color="#10b981" />
                    <Text style={styles.verifiedText}>Verified</Text>
                  </View>
                )}
                <ChevronRight size={20} color="#9ca3af" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Student Perks */}
        <View style={styles.perksContainer}>
          <Text style={styles.perksTitle}>Student Perks</Text>
          <Text style={styles.perksSubtitle}>Enjoy exclusive benefits as a verified student</Text>
          
          <View style={styles.perksGrid}>
            <View style={styles.perkItem}>
              <View style={styles.perkIcon}>
                <GraduationCap size={24} color="#10b981" />
              </View>
              <Text style={styles.perkTitle}>15% Discount</Text>
              <Text style={styles.perkDescription}>On all rides</Text>
            </View>
            <View style={styles.perkItem}>
              <View style={styles.perkIcon}>
                <Users size={24} color="#3b82f6" />
              </View>
              <Text style={styles.perkTitle}>Group Rides</Text>
              <Text style={styles.perkDescription}>Split with friends</Text>
            </View>
          </View>
        </View>
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
    backgroundColor: '#111827',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  settingsButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  content: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 8,
  },
  verificationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verificationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981',
    marginRight: 8,
  },
  verificationText: {
    fontSize: 14,
    color: '#10b981',
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  statNumberGreen: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  menuContainer: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  verifiedText: {
    fontSize: 14,
    color: '#10b981',
    fontWeight: '600',
    marginLeft: 4,
  },
  perksContainer: {
    backgroundColor: '#f0f9ff',
    margin: 16,
    borderRadius: 16,
    padding: 20,
  },
  perksTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  perksSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  perksGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  perkItem: {
    alignItems: 'center',
    flex: 1,
  },
  perkIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  perkTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  perkDescription: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
});