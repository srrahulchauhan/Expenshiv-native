import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from './src/constants/theme';
import { INITIAL_TRANSACTIONS } from './src/data/mockData';
import HomeScreen from './src/screens/HomeScreen';
import TransactionsScreen from './src/screens/TransactionsScreen';
import SummaryScreen from './src/screens/SummaryScreen';
import AddTransactionModal from './src/components/AddTransactionModal';

const STORAGE_KEY = '@my_expense_tracker_transactions';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const loadStoredTransactions = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setTransactions(JSON.parse(stored));
        }
      } catch (err) {
        console.log(err);
      }
    };
    loadStoredTransactions();
  }, []);

  const saveTransactions = async (newTransactions) => {
    setTransactions(newTransactions);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTransactions));
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddTransaction = (newTx) => {
    const updated = [newTx, ...transactions];
    saveTransactions(updated);
  };

  const handleDeleteTransaction = (id) => {
    const updated = transactions.filter((t) => t.id !== id);
    saveTransactions(updated);
  };

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalBalance = totalIncome - totalExpense;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.appContainer}>
        <View style={styles.content}>
          {activeTab === 'home' && (
            <HomeScreen
              transactions={transactions}
              totalBalance={totalBalance}
              income={totalIncome}
              expense={totalExpense}
              onOpenAddModal={() => setIsAddModalOpen(true)}
              onNavigateToTransactions={() => setActiveTab('transactions')}
              onDeleteTransaction={handleDeleteTransaction}
            />
          )}

          {activeTab === 'transactions' && (
            <TransactionsScreen
              transactions={transactions}
              onDeleteTransaction={handleDeleteTransaction}
              onOpenAddModal={() => setIsAddModalOpen(true)}
            />
          )}

          {activeTab === 'summary' && (
            <SummaryScreen
              transactions={transactions}
              totalExpense={totalExpense}
            />
          )}
        </View>

        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => setActiveTab('home')}
          >
            <Text style={[styles.navIcon, activeTab === 'home' && styles.navIconActive]}>
              🏠
            </Text>
            <Text
              style={[
                styles.navLabel,
                activeTab === 'home' && styles.navLabelActive,
              ]}
            >
              Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => setActiveTab('transactions')}
          >
            <Text
              style={[
                styles.navIcon,
                activeTab === 'transactions' && styles.navIconActive,
              ]}
            >
              📋
            </Text>
            <Text
              style={[
                styles.navLabel,
                activeTab === 'transactions' && styles.navLabelActive,
              ]}
            >
              Transactions
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => setActiveTab('summary')}
          >
            <Text
              style={[
                styles.navIcon,
                activeTab === 'summary' && styles.navIconActive,
              ]}
            >
              📊
            </Text>
            <Text
              style={[
                styles.navLabel,
                activeTab === 'summary' && styles.navLabelActive,
              ]}
            >
              Summary
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <AddTransactionModal
        visible={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddTransaction}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  appContainer: {
    flex: 1,
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 480 : '100%',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    ...(Platform.OS === 'web'
      ? {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderColor: '#E5E7EB',
        }
      : {}),
  },
  content: {
    flex: 1,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingVertical: 8,
    paddingBottom: Platform.OS === 'ios' ? 16 : 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 2,
    opacity: 0.6,
  },
  navIconActive: {
    opacity: 1,
  },
  navLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  navLabelActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
});
