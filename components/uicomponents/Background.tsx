import { Colors } from "@/constants/Colors";
import { memo, ReactNode } from "react"
import { ImageBackground, KeyboardAvoidingView, StyleSheet, View } from "react-native";


type Props = {
    children: ReactNode;
}


const Background = ({ children}: Props) => {
   return (

   <ImageBackground
    source={require('../../assets/images/background_dot.png')}
    resizeMode="repeat"
    style={styles.background}
     >
    <KeyboardAvoidingView style={styles.container} behavior="padding">
           {children}
       </KeyboardAvoidingView> 
    </ImageBackground>   
   )
}

const styles = StyleSheet.create({
    background: {
      //  backgroundColor: Colors.dark.background,
        flex: 1,
        width: '100%',
      },
      container: {
        flex: 1,
        padding: 20,
        width: '100%',
        maxWidth: 340,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      },
})

export default memo(Background);