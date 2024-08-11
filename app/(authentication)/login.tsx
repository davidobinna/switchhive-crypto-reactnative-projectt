
import axiosClient from "@/apisetup/apiClient";
import { saveToken } from "@/apisetup/securedToken";
import { generateRandomToken } from "@/apisetup/tokenGen";
import { emailValidator, passwordValidator } from "@/authvalidator/authvalidation";
import { BackButton } from "@/components/uicomponents/BackButton";
import Background from "@/components/uicomponents/Background";
import Button from "@/components/uicomponents/Button";
import DialogPop from "@/components/uicomponents/dialogPop";
import Header from "@/components/uicomponents/Header";
import TextInput from "@/components/uicomponents/TextInput";
import { Colors } from "@/constants/Colors";
import { universalContext } from "@/statecontext/contextProvider";
import { Href, useNavigation, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


interface LoginDataProps {
    email: string | null;
    password: string | null;
  }


export default function Login(){
const router = useRouter();
const navigation = useNavigation();
const {userData, setUserData} = universalContext()
const [email, setEmail] = useState({ value: '', error: '' });
const [password, setPassword] = useState({ value: '', error: '' });
const [isLoading, setIsLoading] = useState<boolean>(false);
const [dialog, setDialog] = useState<{ visibility: boolean, title: string, message: string }>({ visibility: false, title: '', message: '' });


const handleValidationErrors = (emailError: string, passwordError: string) => {
  setEmail(prev => ({  ...prev, error: emailError }));
  setPassword(prev => ({ ...prev, error: passwordError }));
}

const _onLoginPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      handleValidationErrors(emailError, passwordError);
      return;
    }


    const formData = new FormData();
    formData.append('email', email.value);
    formData.append('password', password.value);
    try {
    setIsLoading(true)

        const updatedBookingData: LoginDataProps = {
            email: email.value,
            password: password.value,
        };

        console.log(password.value, userData?.password)

         if (password.value) {
            if (password.value !== (userData?.password)) {
              setDialog({ visibility: true, title: 'Oops!', message:'Invalid credentials please sign up try again.' })
            } else { 
          setDialog({
            visibility: true,
            title: 'welcome back!',
            message: `hello ${userData?.name || null}, you're sucessfully logged in, you will be redirected.`
          })
          setUserData({ ...userData, ...updatedBookingData });
         }
    }
   } catch (error: any) {
      console.log(error)
      setDialog({ visibility: true, title: 'Oops!', message: `${error.message}, please try again.` })
    } finally {
      setIsLoading(false)
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const closeDialog = () => {
        setDialog({ visibility: false, title: '', message: '' });
  }

  const takeAction  = async (label: string) => {
     if (label === 'done') {
        setDialog({ visibility: false, title: '', message: '' })
        await saveToken(generateRandomToken(30))
        router.replace('/product' as Href<string>)
     } 
     if (label === 'Oops!') {
      setDialog({ visibility: false, title: '', message: '' })
     }
  }

    return (
        <Background>
        <BackButton goBack={handleGoBack} />
  

        <Header>Welcome back! {userData?.name || null} </Header>
  
        <TextInput
          label="Email"
          returnKeyType="next"
          value={email.value}
          onChangeText={text => setEmail({ value: text, error: '' })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
  
        <TextInput
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={text => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
  
        <View style={styles.forgotPassword}>
          <TouchableOpacity
            onPress={() => router.push('/' as Href<string>)}
          >
            <Text style={styles.label}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
  
        <Button mode="outlined" loading={isLoading} onPress={_onLoginPressed}>
          Login
        </Button>
  
        <View style={styles.row}>
          <Text style={styles.label}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/(authentication)/register' as Href<string>)}>
            <Text style={styles.link}>Sign up</Text>
          </TouchableOpacity>
        </View>
        <DialogPop
        title={dialog.title}
        message={dialog.message}
        visibility={dialog.visibility}
        cancel={closeDialog}
        actionName="Got it!"
        action={() => takeAction(dialog.title === 'welcome back!' ? 'done' : 'Oops!')}
      />
      </Background>
    )
}

const styles = StyleSheet.create({
    forgotPassword: {
      width: '100%',
      alignItems: 'flex-end',
      marginBottom: 24,
    },
    row: {
      flexDirection: 'row',
      marginTop: 4,
    },
    label: {
      color: Colors.dark.tint,
    },
    link: {
      fontWeight: 'bold',
      color: Colors.light.primary,
    },
  });
  