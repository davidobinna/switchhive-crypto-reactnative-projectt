import Background from "@/components/uicomponents/Background";
import Button from "@/components/uicomponents/Button";
import Header from "@/components/uicomponents/Header";
import Paragraph from "@/components/uicomponents/Paragraph";
import { Href, useRouter } from "expo-router";


export default function AuthPageIndex() {
  const router = useRouter()


  const handleNavigate = () => {
    router.push('auth/login' as Href<string>);
  };

  return (
    <Background>
          <Header>Welcom To Switch Hive</Header>
          <Paragraph>
             Your best Crypto Market, login to continue
          </Paragraph>
          <Button mode="outlined" onPress={handleNavigate}>
            Login
          </Button>
    </Background>
  );
}
