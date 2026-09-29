import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { COLORS } from '../constants/theme';
import Header from '../components/Header';
import SummaryCards from '../components/SummaryCards';
import TransactionItem from '../components/TransactionItem';

export default function HomeScreen({
  transactions,
  totalBalance,
  income,
  expense,
  onOpenAddModal,
  onNavigateToTransactions,
  onDeleteTransaction,
}) {
  const recentTransactions = transactions.slice(0, 4);

  return (
    <View style={styles.container}>
      <Header userName="Rahul" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <SummaryCards
          totalBalance={totalBalance}
          income={income}
          expense={expense}
        />

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity onPress={onNavigateToTransactions}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.transactionsList}>
          {recentTransactions.length > 0 ? (
            recentTransactions.map((item) => (
              <TransactionItem
                key={item.id}
                item={item}
                compact={true}
                onDelete={onDeleteTransaction}
              />
            ))
          ) : (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>No recent transactions</Text>
            </View>
          )}
        </View>

        <View style={{ height: 16 }} />
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.8}
          onPress={onOpenAddModal}
        >
          <Text style={styles.addButtonText}>+ Add Transaction</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 18,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
  },
  transactionsList: {
    paddingHorizontal: 20,
  },
  emptyCard: {
    backgroundColor: COLORS.card,
    borderRadius: 10,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  bottomBar: {
    backgroundColor: COLORS.card,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    ...(Platform.OS === 'web'
      ? { boxShadow: '0 2px 6px rgba(25, 118, 210, 0.25)' }
      : {
          shadowColor: COLORS.primary,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.15,
          shadowRadius: 3,
          elevation: 2,
        }),
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
