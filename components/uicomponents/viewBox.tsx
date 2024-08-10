import { Colors } from "@/constants/Colors";
import { memo } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

// Define the prop types for the component
type CardProps = {
  style?: ViewStyle | ViewStyle[];
  children: React.ReactNode;
};

const ViewBox = ({ style, children }: CardProps) => {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    backgroundColor: Colors.dark.background, // Default dark color
    borderRadius: 8,
    shadowColor: Colors.dark.primary,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5, // For Android shadow
    borderWidth: 1, // Increase the width of the border line
    borderColor: Colors.dark.primary, // Color of the border line
  },
});

export default memo(ViewBox);
