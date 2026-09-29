import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/theme';

export default function TransactionItem({ item, onDelete, compact = false }) {
  const isIncome = item.type === 'income';
  const formattedAmount = Number(item.amount).toLocaleString('en-IN');

  return (
    <View style={styles.card}>
      <View style={styles.leftSection}>
        <View style={[styles.iconContainer, isIncome ? styles.incomeIconBg : styles.expenseIconBg]}>
          <Text style={styles.iconText}>{item.icon || (isIncome ? '💰' : '📦')}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.categoryText}>{item.category}</Text>
          {item.note ? (
            <Text style={styles.noteText} numberOfLines={1}>
              {item.note}
            </Text>
          ) : null}
          {!compact && item.date ? (
            <Text style={styles.dateText}>{item.date}</Text>
          ) : null}
        </View>
      </View>

      <View style={styles.rightSection}>
        <Text style={[styles.amountText, isIncome ? styles.incomeText : styles.expenseText]}>
          {isIncome ? `+₹${formattedAmount}` : `-₹${formattedAmount}`}
        </Text>

        {onDelete ? (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => onDelete(item.id)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.deleteText}>✕</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  incomeIconBg: {
    backgroundColor: COLORS.incomeLight,
  },
  expenseIconBg: {
    backgroundColor: '#F3F4F6',
  },
  iconText: {
    fontSize: 20,
  },
  infoContainer: {
    flex: 1,
  },
  categoryText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
  },
  noteText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  dateText: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
  rightSection: {
    alignItems: 'flex-end',
    marginLeft: 10,
  },
  amountText: {
    fontSize: 15,
    fontWeight: '700',
  },
  incomeText: {
    color: COLORS.income,
  },
  expenseText: {
    color: COLORS.expense,
  },
  deleteButton: {
    marginTop: 4,
    padding: 2,
  },
  deleteText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});
