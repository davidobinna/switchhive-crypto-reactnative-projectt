import { Colors } from '@/constants/Colors';
import React, { memo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput as Input } from 'react-native-paper';


type Props = React.ComponentProps<typeof Input> & { errorText?: string };

const TextInput = ({ errorText, ...props }: Props) => (
  <View style={styles.container}>
    <Input
      style={styles.input}
      selectionColor={Colors.dark.tint}
      underlineColor="transparent"
      mode="outlined"
      textColor={Colors.dark.text}
      {...props}
    />
    {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: Colors.dark.background,
  },
  error: {
    fontSize: 14,
    color: Colors.dark.error,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});

export default memo(TextInput);