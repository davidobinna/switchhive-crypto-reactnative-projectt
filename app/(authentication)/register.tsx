import { confirmPasswordValidator, emailValidator, nameValidator, passwordValidator } from "@/authvalidator/authvalidation";
import { BackButton } from "@/components/uicomponents/BackButton";
import Background from "@/components/uicomponents/Background";
import Button from "@/components/uicomponents/Button";
import DialogPop from "@/components/uicomponents/dialogPop";
import Header from "@/components/uicomponents/Header";
import TextInput from "@/components/uicomponents/TextInput";
import { Colors } from "@/constants/Colors";
import { universalContext } from "@/statecontext/contextProvider";
import { Href, useNavigation, useRouter } from "expo-router";
import {  useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


interface RegisterProps {
    name: string | null,
    email: string | null,
    password: string | null,
}



export default function Register() {
  const router = useRouter();
  const navigation = useNavigation();
  const {userData, setUserData} = universalContext()
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dialog, setDialog] = useState<{ visibility: boolean, title: string, message: string }>({ visibility: false, title: '', message: '' });



  const handleValidationErrors = (nameError: string, emailError: string, passwordError: string, confirmPasswordError: string) => {
    setName(prev => ({ ...prev, error: nameError }));
    setEmail(prev => ({ ...prev, error: emailError }));
    setPassword(prev => ({ ...prev, error: passwordError }));
    setConfirmPassword(prev => ({ ...prev, error: confirmPasswordError }));
  };

  const _onSignUpPressed = async () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const confirmPasswordError = confirmPasswordValidator(confirmPassword.value, password.value);

    if (nameError || emailError || passwordError || confirmPasswordError) {
      handleValidationErrors(nameError, emailError, passwordError, confirmPasswordError);
      return;
    }

    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('email', email.value);
    formData.append('password', password.value);

    setIsLoading(true);
    try {
      
         const updateUserData: RegisterProps = {
            name: name.value,
            email: email.value,
            password: password.value
         }   
         setUserData({...userData, ...updateUserData})

        setDialog({
          visibility: true,
          title: 'welcome',
          message: `hello ${userData?.name || null}, you're sucessfully logged in, we need to verify this device` 
        })
         
    } catch (error: any) {
      console.log(error);
      setDialog({ visibility: true, title: 'Oops!', message: `${error.message}, please try again.` })
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const closePop = () => {
    setDialog({ visibility: false, title: '', message: '' });
  };

  const takeAction = (label: string) => {
    if (label === 'home') {
      setDialog({ visibility: false, title: '', message: '' })
      router.replace('/product' as Href<string>)
  };
}

  return (
    <Background>
      <BackButton goBack={handleGoBack} />
      <Header>Create Account</Header>

      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={text => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />

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

      <TextInput
        label="Confirm Password"
        returnKeyType="done"
        value={confirmPassword.value}
        onChangeText={text => setConfirmPassword({ value: text, error: '' })}
        error={!!confirmPassword.error}
        errorText={confirmPassword.error}
        secureTextEntry
      />

      <Button mode="outlined" loading={isLoading} onPress={_onSignUpPressed} style={styles.button}>
        Sign Up
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push('auth/login' as Href<string>)}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>

      <DialogPop
        title={dialog.title}
        message={dialog.message}
        visibility={dialog.visibility}
        cancel={closePop}
        actionName="Got it!"
        action={() => takeAction('home')}
      />
    </Background>
  );
}

const styles = StyleSheet.create({
  label: {
    color: Colors.dark.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: Colors.dark.primary,
  },
});
