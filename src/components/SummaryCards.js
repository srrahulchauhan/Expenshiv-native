import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { COLORS } from '../constants/theme';

export default function SummaryCards({ totalBalance = 12500, income = 15000, expense = 2500 }) {
  const formatCurrency = (amount) => {
    return '₹' + Number(amount).toLocaleString('en-IN');
  };

  return (
    <View style={styles.container}>
      <View style={[styles.card, styles.totalCard]}>
        <Text style={styles.totalAmount}>{formatCurrency(totalBalance)}</Text>
        <Text style={styles.totalLabel}>Total Balance</Text>
      </View>

      <View style={styles.row}>
        <View style={[styles.card, styles.halfCard, styles.incomeBorder]}>
          <Text style={[styles.amount, styles.incomeAmount]}>
            {formatCurrency(income)}
          </Text>
          <Text style={styles.label}>Income</Text>
        </View>

        <View style={[styles.card, styles.halfCard, styles.expenseBorder]}>
          <Text style={[styles.amount, styles.expenseAmount]}>
            {formatCurrency(expense)}
          </Text>
          <Text style={styles.label}>Expense</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 16,
    marginBottom: 8,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...(Platform.OS === 'web'
      ? { boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)' }
      : {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 1,
        }),
  },
  totalCard: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 4,
    borderTopColor: COLORS.primary,
    marginBottom: 12,
  },
  totalAmount: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  totalLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '500',
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  halfCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
  },
  incomeBorder: {
    borderTopWidth: 3,
    borderTopColor: COLORS.income,
  },
  expenseBorder: {
    borderTopWidth: 3,
    borderTopColor: COLORS.expense,
  },
  amount: {
    fontSize: 19,
    fontWeight: '700',
  },
  incomeAmount: {
    color: COLORS.income,
  },
  expenseAmount: {
    color: COLORS.expense,
  },
  label: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '500',
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
