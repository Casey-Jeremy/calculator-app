// app/index.js

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import { colors } from '../constants/colors';

export default function CalculatorScreen() {
  const [displayValue, setDisplayValue] = useState('0');
  const [expression, setExpression] = useState('');
  
  // 1. Add a new state for the history display
  const [historyValue, setHistoryValue] = useState('');

  // The only change is adding types to the parameters here
  const handlePress = (
    type: 'clear' | 'backspace' | 'number' | 'operator' | 'calculate',
    value?: string | number
  ) => {
    if (type === 'clear') {
      setDisplayValue('0');
      setExpression('');
      // 2. Clear the history value
      setHistoryValue('');
    } else if (type === 'backspace') {
      // For display, just slice the last character
      setDisplayValue(displayValue.slice(0, -1) || '0');
      // For expression, handle spaced operators correctly
      setExpression(prev => {
        if (prev.endsWith(' ')) {
          return prev.slice(0, -3); // Remove operator and spaces
        }
        return prev.slice(0, -1); // Remove number
      });
    } else if (type === 'number' || type === 'operator') {
      const toAppend = type === 'operator' ? ` ${value} ` : value;
      const newValue = `${displayValue}${value}`;
      const newExpression = `${expression}${toAppend}`;

      if (displayValue === '0' && type === 'number') {
        setDisplayValue(`${value}`);
        setExpression(`${value}`);
      } else {
        // Prevent showing operator if the display is just "0"
        if (displayValue === '0' && type === 'operator') return;
        
        setDisplayValue(newValue);
        setExpression(newExpression);
      }
      
      // 3. Update the history display in real-time
      setHistoryValue(newExpression.trim());

    } else if (type === 'calculate') {
      try {
        // A slightly safer way than direct eval by validating the expression
        const sanitizedExpression = expression.replace(/[^-()\d/*+.]/g, '');
        const result = eval(sanitizedExpression);
        
        // 4. Update the history with the full equation and result
        setHistoryValue(`${sanitizedExpression} =`);

        setDisplayValue(result.toString());
        setExpression(result.toString());
      } catch (error) {
        setDisplayValue('Error');
        setExpression('');
        setHistoryValue('');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.displayContainer}>
        {/* 5. Add a Text component for the history display */}
        <Text style={styles.historyText} numberOfLines={1}>
          {historyValue}
        </Text>
        <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>
          {displayValue}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        {/* Note: The 'onPress' calls are now valid because 'value' is optional */}
        <View style={styles.row}>
          <Button text="AC" theme="secondary" onPress={() => handlePress('clear')} />
          <Button text="⌫" theme="secondary" onPress={() => handlePress('backspace')} />
          <Button text="%" theme="secondary" onPress={() => handlePress('operator', '%')} />
          <Button text="/" theme="accent" onPress={() => handlePress('operator', '/')} />
        </View>
        <View style={styles.row}>
          <Button text="7" onPress={() => handlePress('number', 7)} />
          <Button text="8" onPress={() => handlePress('number', 8)} />
          <Button text="9" onPress={() => handlePress('number', 9)} />
          <Button text="*" theme="accent" onPress={() => handlePress('operator', '*')} />
        </View>
        <View style={styles.row}>
          <Button text="4" onPress={() => handlePress('number', 4)} />
          <Button text="5" onPress={() => handlePress('number', 5)} />
          <Button text="6" onPress={() => handlePress('number', 6)} />
          <Button text="-" theme="accent" onPress={() => handlePress('operator', '-')} />
        </View>
        <View style={styles.row}>
          <Button text="1" onPress={() => handlePress('number', 1)} />
          <Button text="2" onPress={() => handlePress('number', 2)} />
          <Button text="3" onPress={() => handlePress('number', 3)} />
          <Button text="+" theme="accent" onPress={() => handlePress('operator', '+')} />
        </View>
        <View style={styles.row}>
          <Button text="0" size="double" onPress={() => handlePress('number', 0)} />
          <Button text="." onPress={() => handlePress('number', '.')} />
          <Button text="=" theme="accent" onPress={() => handlePress('calculate')} />
        </View>
      </View>
    </SafeAreaView>
  );
}

// Styles remain unchanged
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'flex-end',
  },
  displayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 25,
    paddingBottom: 20,
  },
  
  // 6. Add new styles for the history text
  historyText: {
    color: colors.secondaryDisplay, // Use a lighter color for the history
    fontSize: 30,
    fontWeight: '300',
    alignSelf: 'stretch', // Make it fill the width to handle text alignment
    textAlign: 'right', // Align text to the right
  },
  displayText: {
    color: colors.display,
    fontSize: 70,
    fontWeight: '300',
  },
  buttonContainer: {
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});