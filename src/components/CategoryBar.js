import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

export default function CategoryBar({ category, icon, amount, totalExpense, color = COLORS.primary }) {
  const percentage = totalExpense > 0 ? Math.round((amount / totalExpense) * 100) : 0;
  const formattedAmount = '₹' + Number(amount).toLocaleString('en-IN');

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.categoryLabelRow}>
          <Text style={styles.icon}>{icon}</Text>
          <Text style={styles.categoryName}>{category}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amountText}>{formattedAmount}</Text>
          <Text style={styles.percentageText}>({percentage}%)</Text>
        </View>
      </View>

      <View style={styles.barTrack}>
        <View
          style={[
            styles.barFill,
            {
              width: `${Math.min(Math.max(percentage, 5), 100)}%`,
              backgroundColor: color,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 18,
    marginRight: 8,
  },
  categoryName: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  amountText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },
  percentageText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  barTrack: {
    height: 10,
    backgroundColor: '#F3F4F6',
    borderRadius: 5,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 5,
  },
});
