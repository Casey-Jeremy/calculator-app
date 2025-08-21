// components/Button.js

import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../constants/colors';

// The only change is adding default values here, making theme and size optional
export default function Button({ text, onPress, theme = '', size = '' }) {
  const buttonStyles = [styles.button];
  const textStyles = [styles.text];

  if (theme === 'secondary') {
    buttonStyles.push(styles.buttonSecondary);
    textStyles.push(styles.textDark);
  } else if (theme === 'accent') {
    buttonStyles.push(styles.buttonAccent);
  }

  if (size === 'double') {
    buttonStyles.push(styles.buttonDouble);
  }

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles}>
      <Text style={textStyles}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    flex: 1,
    height: 60,
    margin: 8,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDouble: {
    flex: 2,
    alignItems: 'flex-start',
    paddingLeft: 35,
  },
  buttonSecondary: {
    backgroundColor: colors.secondary,
  },
  buttonAccent: {
    backgroundColor: colors.accent,
  },
  text: {
    color: colors.textLight,
    fontSize: 32,
  },
  textDark: {
    color: colors.textDark,
  },
});