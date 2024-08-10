import { Colors } from "@/constants/Colors";
import { memo } from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

type Props = React.ComponentProps<typeof Button>;

const AuthButton = ({ mode, style, children, ...props }: Props) => {
  return (
    <Button
      style={[
        styles.button,
        mode === 'outlined' && { backgroundColor: Colors.dark.primary },
        style,
      ]}
      labelStyle={styles.text}
      mode={mode}
      {...props}
    >
      {children}
    </Button>
  )
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
    color: Colors.dark.text
  },
});

export default memo(AuthButton);
