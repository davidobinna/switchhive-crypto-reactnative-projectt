import Background from "@/components/uicomponents/Background"
import Header from "@/components/uicomponents/Header"
import Paragraph from "@/components/uicomponents/Paragraph"
import ViewBox from "@/components/uicomponents/viewBox"
import { Colors } from "@/constants/Colors"
import { ActivityIndicator } from "react-native-paper"

const ProductDetails = () => {
    return (
        <Background>
            <Header>Products Details</Header>
            <ActivityIndicator size='large' animating={true} color={Colors.dark.icon} />
            <ViewBox>
                <Paragraph>
                    Details
                </Paragraph>
            </ViewBox>
        </Background>
    )
}

export default ProductDetails;