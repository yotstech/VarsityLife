import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { User, Bell, Shield, CreditCard, MapPin, Moon, Globe, CircleHelp as HelpCircle, ChevronRight, Star, Heart } from 'lucide-react-native';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function SettingsTab() {
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [locationSharing, setLocationSharing] = useState(true);

  const settingsGroups = [
    {
      title: 'Account',
      items: [
        {
          icon: <User size={20} color="#374151" />,
          title: 'Profile',
          subtitle: 'Edit your personal information',
          action: () => console.log('Profile pressed')
        },
        {
          icon: <Shield size={20} color="#374151" />,
          title: 'Student Verification',
          subtitle: user?.isVerified ? 'Verified' : 'Verify your student status',
          action: () => console.log('Verification pressed')
        },
        {
          icon: <CreditCard size={20} color="#374151" />,
          title: 'Payment Methods',
          subtitle: 'Manage your payment options',
          action: () => console.log('Payment pressed')
        }
      ]
    },
    {
      title: 'Preferences',
      items: [
        {
          icon: <Bell size={20} color="#374151" />,
          title: 'Notifications',
          subtitle: 'Push notifications and alerts',
          toggle: true,
          value: notifications,
          onToggle: setNotifications
        },
        {
          icon: <Moon size={20} color="#374151" />,
          title: 'Dark Mode',
          subtitle: 'Switch to dark theme',
          toggle: true,
          value: darkMode,
          onToggle: setDarkMode
        },
        {
          icon: <MapPin size={20} color="#374151" />,
          title: 'Location Sharing',
          subtitle: 'Share location for better service',
          toggle: true,
          value: locationSharing,
          onToggle: setLocationSharing
        },
        {
          icon: <Globe size={20} color="#374151" />,
          title: 'Language',
          subtitle: 'English',
          action: () => console.log('Language pressed')
        }
      ]
    },
    {
      title: 'Support',
      items: [
        {
          icon: <Star size={20} color="#374151" />,
          title: 'Rate App',
          subtitle: 'Rate us on the app store',
          action: () => console.log('Rate pressed')
        },
        {
          icon: <HelpCircle size={20} color="#374151" />,
          title: 'Help & Support',
          subtitle: 'Get help and contact support',
          action: () => console.log('Help pressed')
        },
        {
          icon: <Heart size={20} color="#374151" />,
          title: 'About',
          subtitle: 'App version and information',
          action: () => console.log('About pressed')
        }
      ]
    }
  ];

  const SettingItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.settingItem}
      onPress={item.action}
      disabled={item.toggle}
    >
      <View style={styles.settingItemLeft}>
        <View style={styles.settingIcon}>
          {item.icon}
        </View>
        <View style={styles.settingInfo}>
          <Text style={styles.settingTitle}>{item.title}</Text>
          <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
        </View>
      </View>
      <View style={styles.settingItemRight}>
        {item.toggle ? (
          <Switch
            value={item.value}
            onValueChange={item.onToggle}
            trackColor={{ false: '#f3f4f6', true: '#3b82f6' }}
            thumbColor={item.value ? '#ffffff' : '#ffffff'}
          />
        ) : (
          <ChevronRight size={20} color="#9ca3af" />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {/* User Info Card */}
      <View style={styles.userCard}>
        <View style={styles.userAvatar}>
          <Text style={styles.userInitial}>
            {user?.email?.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user?.email}</Text>
          <View style={styles.verificationBadge}>
            <Text style={styles.verificationText}>
              {user?.isVerified ? '✓ Verified Student' : '⚠ Unverified'}
            </Text>
          </View>
        </View>
      </View>

      {/* Settings Groups */}
      <ScrollView style={styles.settingsContainer}>
        {settingsGroups.map((group, groupIndex) => (
          <View key={groupIndex} style={styles.settingsGroup}>
            <Text style={styles.groupTitle}>{group.title}</Text>
            <View style={styles.groupItems}>
              {group.items.map((item, itemIndex) => (
                <SettingItem key={itemIndex} item={item} />
              ))}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={logout}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
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
    backgroundColor: 'white',
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  userCard: {
    backgroundColor: 'white',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userAvatar: {
    width: 60,
    height: 60,
    backgroundColor: '#3b82f6',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userInitial: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  verificationBadge: {
    alignSelf: 'flex-start',
  },
  verificationText: {
    fontSize: 14,
    color: '#10b981',
    fontWeight: '500',
  },
  settingsContainer: {
    flex: 1,
  },
  settingsGroup: {
    marginBottom: 24,
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
    marginHorizontal: 16,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  groupItems: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  settingItemRight: {
    marginLeft: 12,
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    marginHorizontal: 16,
    marginTop: 24,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  versionText: {
    fontSize: 14,
    color: '#9ca3af',
  },
});