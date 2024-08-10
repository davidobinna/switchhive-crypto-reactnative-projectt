import { Colors } from "@/constants/Colors";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

type Props = {
    goBack: () => void;
  };
  
  export function BackButton({ goBack }: Props) {
    return (
        <TouchableOpacity onPress={goBack} style={styles.container}>
        <Image style={styles.image} source={require('../../assets/images/arrow_back.png')} />
      </TouchableOpacity>
    )
  };
  
  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 15 + getStatusBarHeight(),
      left: 10,
    },
    image: {
      width: 24,
      height: 24,
    },
  });
  