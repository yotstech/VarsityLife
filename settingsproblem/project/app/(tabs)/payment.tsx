import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { CreditCard, Plus, Smartphone, Wallet, ChevronRight } from 'lucide-react-native';

export default function PaymentTab() {
  const paymentMethods = [
    {
      id: 1,
      type: 'card',
      name: 'Visa •••• 4242',
      icon: <CreditCard size={24} color="#1f2937" />,
      isDefault: true,
    },
    {
      id: 2,
      type: 'wallet',
      name: 'VAR LIFE Wallet',
      balance: 'R125.50',
      icon: <Wallet size={24} color="#10b981" />,
      isDefault: false,
    },
    {
      id: 3,
      type: 'mobile',
      name: 'Mobile Money',
      icon: <Smartphone size={24} color="#3b82f6" />,
      isDefault: false,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Payment Methods</Text>
        <Text style={styles.subtitle}>Manage your payment options</Text>
      </View>
      
      <ScrollView style={styles.content}>
        {/* Student Discount Banner */}
        <View style={styles.discountBanner}>
          <Text style={styles.discountTitle}>Student Discount Active</Text>
          <Text style={styles.discountText}>Save 15% on all rides with verified student status</Text>
        </View>

        {/* Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Methods</Text>
          
          {paymentMethods.map((method) => (
            <TouchableOpacity key={method.id} style={styles.paymentCard}>
              <View style={styles.paymentInfo}>
                <View style={styles.iconContainer}>
                  {method.icon}
                </View>
                <View style={styles.methodDetails}>
                  <Text style={styles.methodName}>{method.name}</Text>
                  {method.balance && (
                    <Text style={styles.balance}>Balance: {method.balance}</Text>
                  )}
                  {method.isDefault && (
                    <Text style={styles.defaultLabel}>Default</Text>
                  )}
                </View>
              </View>
              <ChevronRight size={20} color="#9ca3af" />
            </TouchableOpacity>
          ))}
          
          <TouchableOpacity style={styles.addPaymentButton}>
            <Plus size={20} color="#3b82f6" />
            <Text style={styles.addPaymentText}>Add Payment Method</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          
          <View style={styles.transactionCard}>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionTitle}>Ride to Riverside Mall</Text>
              <Text style={styles.transactionDate}>Jan 15, 2024</Text>
            </View>
            <Text style={styles.transactionAmount}>-R25.50</Text>
          </View>
          
          <View style={styles.transactionCard}>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionTitle}>Wallet Top-up</Text>
              <Text style={styles.transactionDate}>Jan 14, 2024</Text>
            </View>
            <Text style={styles.transactionAmountPositive}>+R100.00</Text>
          </View>
          
          <View style={styles.transactionCard}>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionTitle}>Ride to White River</Text>
              <Text style={styles.transactionDate}>Jan 13, 2024</Text>
            </View>
            <Text style={styles.transactionAmount}>-R32.00</Text>
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
  discountBanner: {
    backgroundColor: '#dcfce7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  discountTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#166534',
    marginBottom: 4,
  },
  discountText: {
    fontSize: 14,
    color: '#15803d',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  paymentCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  methodDetails: {
    flex: 1,
  },
  methodName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  balance: {
    fontSize: 14,
    color: '#10b981',
    fontWeight: '500',
  },
  defaultLabel: {
    fontSize: 12,
    color: '#3b82f6',
    fontWeight: '500',
  },
  addPaymentButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
  },
  addPaymentText: {
    fontSize: 16,
    color: '#3b82f6',
    fontWeight: '600',
    marginLeft: 8,
  },
  transactionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 14,
    color: '#6b7280',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ef4444',
  },
  transactionAmountPositive: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981',
  },
});