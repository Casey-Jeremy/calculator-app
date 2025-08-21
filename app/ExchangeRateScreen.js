// app/exchangeRate.js

import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../constants/colors';

// As of August 2025, using USD as base currency for conversion
const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';

export default function ExchangeRateScreen() {
  const [rates, setRates] = useState(null);
  const [amount, setAmount] = useState('1');
  const [currency, setCurrency] = useState('UGX'); // Default to Ugandan Shilling
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        if (data.rates) {
          setRates(data.rates);
        } else {
          setError('Could not fetch rates.');
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to connect to the server.');
        setLoading(false);
      });
  }, []);

  const getConvertedAmount = () => {
    if (!rates || !amount) return '...';

    const targetRate = rates[currency.toUpperCase()];
    if (!targetRate) return 'Invalid Currency';

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) return 'Invalid Amount';
    
    const value = numericAmount * targetRate;
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>USD to Any Currency</Text>
      
      <View style={styles.inputRow}>
        <Text style={styles.currencyLabel}>Amount in USD</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="Enter amount"
          placeholderTextColor={colors.primary}
        />
      </View>

      <View style={styles.inputRow}>
        <Text style={styles.currencyLabel}>Target Currency (e.g., EUR, KES)</Text>
        <TextInput
          style={styles.input}
          value={currency}
          onChangeText={setCurrency}
          autoCapitalize="characters"
          maxLength={3}
        />
      </View>

      <View style={styles.resultContainer}>
        <Text style={styles.resultLabel}>Result:</Text>
        <Text style={styles.resultText}>
          {getConvertedAmount()} {currency.toUpperCase()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: 'bold',
  },
  inputRow: {
    marginBottom: 25,
  },
  input: {
    backgroundColor: '#2C2C2E',
    color: colors.textLight,
    padding: 15,
    borderRadius: 10,
    fontSize: 20,
    marginTop: 5,
  },
  currencyLabel: {
    color: colors.secondary,
    fontSize: 16,
    marginLeft: 5,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 22,
    color: colors.secondary,
  },
  resultText: {
    fontSize: 36,
    color: colors.textLight,
    fontWeight: 'bold',
    marginTop: 10,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 18,
  },
});