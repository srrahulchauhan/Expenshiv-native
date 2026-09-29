import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { COLORS, CATEGORIES } from '../constants/theme';
import CategoryBar from '../components/CategoryBar';

export default function SummaryScreen({ transactions, totalExpense }) {
  const expenseTransactions = transactions.filter((t) => t.type === 'expense');

  const categoryTotals = {};
  expenseTransactions.forEach((tx) => {
    let cat = tx.category;
    if (cat === 'Grocery') {
      cat = 'Food';
    } else if (cat === 'Recharge') {
      cat = 'Other';
    }

    if (!categoryTotals[cat]) {
      categoryTotals[cat] = 0;
    }
    categoryTotals[cat] += Number(tx.amount);
  });

  const summaryList = Object.keys(categoryTotals)
    .map((catName) => {
      const catConfig = CATEGORIES.find((c) => c.label === catName) || {
        icon: '📦',
      };
      return {
        category: catName,
        icon: catConfig.icon,
        amount: categoryTotals[catName],
      };
    })
    .sort((a, b) => b.amount - a.amount);

  const formatCurrency = (amt) => '₹' + Number(amt).toLocaleString('en-IN');

  const barColors = [
    COLORS.primary,
    '#0284C7',
    '#0D9488',
    '#6366F1',
    '#8B5CF6',
    '#F59E0B',
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📊 Summary</Text>
        <Text style={styles.headerSubtitle}>Category-wise spending</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.monthCard}>
          <Text style={styles.monthTitle}>This Month</Text>
          <Text style={styles.monthTotalAmount}>{formatCurrency(totalExpense)}</Text>
          <Text style={styles.monthSubtitle}>Total Expenses</Text>
        </View>

        <Text style={styles.sectionTitle}>Breakdown</Text>

        {summaryList.length > 0 ? (
          summaryList.map((item, index) => (
            <CategoryBar
              key={item.category}
              category={item.category}
              icon={item.icon}
              amount={item.amount}
              totalExpense={totalExpense}
              color={barColors[index % barColors.length]}
            />
          ))
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No expenses recorded yet.</Text>
          </View>
        )}

        <View style={styles.simpleTextCard}>
          <Text style={styles.simpleTextTitle}>Quick View</Text>
          {summaryList.map((item) => {
            const blocksCount = totalExpense > 0 ? Math.round((item.amount / totalExpense) * 12) : 1;
            const blocks = '█'.repeat(Math.max(blocksCount, 1));
            return (
              <View key={'text-' + item.category} style={styles.textRow}>
                <Text style={styles.textCategory}>{item.category}</Text>
                <Text style={styles.textBlocks}>{blocks}</Text>
                <Text style={styles.textAmount}>{formatCurrency(item.amount)}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.primary,
  },
  headerSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 30,
  },
  monthCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  monthTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  monthTotalAmount: {
    fontSize: 30,
    fontWeight: '700',
    color: COLORS.expense,
    marginTop: 6,
  },
  monthSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 12,
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
  simpleTextCard: {
    backgroundColor: COLORS.card,
    borderRadius: 10,
    padding: 16,
    marginTop: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  simpleTextTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  textCategory: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    width: 80,
  },
  textBlocks: {
    flex: 1,
    fontSize: 13,
    color: COLORS.primary,
    letterSpacing: 1,
    marginHorizontal: 8,
  },
  textAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },
});
