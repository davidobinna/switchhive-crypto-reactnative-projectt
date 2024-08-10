import { Colors } from '@/constants/Colors';
import React, { memo } from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';

type Props = {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
};

const Paragraph = ({ children, style }: Props) => (
  <Text style={[styles.text, style]}>{children}</Text>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 26,
    color: Colors.dark.text,
    textAlign: 'center',
    marginBottom: 14,
  },
});

export default memo(Paragraph);
