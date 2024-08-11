
import { getToken } from "@/apisetup/securedToken";
import { universalContext } from "@/statecontext/contextProvider";
import { Href, Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";

export default function AuthPageLayout() {
    const router = useRouter()
    const {userData, appToken} = universalContext()
  
    useEffect( () => {
        const callToken = async () => {
               const token: any = await getToken();
               if ( token ) {
                     router.replace('/product' as Href<string>)
             }
             console.log(userData, appToken,token)
        }
        callToken();
      },[])


    return (
     <PaperProvider>
        <Stack
          screenOptions={{
            headerStyle: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',             },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerTitle: 'welcome'
          }}
        >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
        </Stack>
    </PaperProvider>
    )
}