import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Colors } from '@/constants/Colors';

type Props = {
  children: React.ReactNode;
};

const Header = ({ children }: Props) => (
  <Text style={styles.header}>{children}</Text>
);

const styles = StyleSheet.create({
  header: {
    fontSize: 26,
    color: Colors.dark.text,
    fontWeight: 'bold',
    paddingVertical: 14,
  },
});

export default memo(Header);