import { useEffect, useState } from "react";
import Background from "@/components/uicomponents/Background";
import Header from "@/components/uicomponents/Header";
import Paragraph from "@/components/uicomponents/Paragraph";
import ViewBox from "@/components/uicomponents/viewBox";
import { Colors } from "@/constants/Colors";
import { ActivityIndicator } from "react-native-paper";
import axiosClient from "@/apisetup/apiClient";
import Button from "@/components/uicomponents/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { universalContext } from "@/statecontext/contextProvider";
import { deleteToken } from "@/apisetup/securedToken";
import { useRouter } from "expo-router";

// Define the types for the product data
interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  returnPolicy: string;
}

const ProductDetails = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<Product | null>(null);
  const { setAppToken, setUserData } = universalContext();
  const router = useRouter()

  const handleLogout = async () => {
      await setAppToken(null);
      await setUserData({});
      await deleteToken();
      await AsyncStorage.removeItem('ACCESS_APP_TOKEN');
      await AsyncStorage.removeItem('ACCESS_USER_DATA');
      router.replace('/')
  };


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosClient.get<Product>('https://dummyjson.com/products/1');
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  if (loading) {
    return (
      <Background>
        <ActivityIndicator size="large" animating={true} color={Colors.dark.icon} />
      </Background>
    );
  }

  if (!product) {
    return (
      <Background>
        <Paragraph>No product found</Paragraph>
      </Background>
    );
  }

  return (
    <Background>
      <Header>{product.title}</Header>
      <ViewBox style={{ padding: 16, borderRadius: 8, borderColor: Colors.light.primary, borderWidth: 1 }}>
        <Paragraph style={{ fontSize: 16, color: Colors.dark.text }}>
          {product.description}
        </Paragraph>
        <Paragraph style={{ fontSize: 14, color: Colors.dark.text, marginVertical: 8 }}>
          Category: {product.category}
        </Paragraph>
        <Paragraph style={{ fontSize: 16, fontWeight: "bold", color: Colors.dark.primary }}>
          Price: N{product.price}
        </Paragraph>
        <Paragraph style={{ fontSize: 10, color: Colors.dark.text }}>
          Discount: {product.discountPercentage}%
        </Paragraph>
        <Paragraph style={{ fontSize: 14, color: Colors.dark.text, marginVertical: 8 }}>
          Stock: {product.stock}
        </Paragraph>
        <Paragraph style={{ fontSize: 14, color: Colors.dark.text }}>
          Rating: {product.rating}
        </Paragraph>
        <Paragraph style={{ fontSize: 12, color: Colors.dark.error, marginVertical: 8 }}>
          Warranty: {product.warrantyInformation}
        </Paragraph>
        <Paragraph style={{ fontSize: 12, color: Colors.dark.text }}>
          Shipping Info: {product.shippingInformation}
        </Paragraph>
        <Paragraph style={{ fontSize: 12, color: Colors.dark.text }}>
          Availability: {product.availabilityStatus}
        </Paragraph>
        <Paragraph style={{ fontSize: 12, color: Colors.dark.secondary, marginTop: 12 }}>
          Return Policy: {product.returnPolicy}
        </Paragraph>
        <Button mode="outlined" onPress={handleLogout} color="#FF0000">
            Logout
        </Button>
      </ViewBox>
    </Background>
  );
};

export default ProductDetails;
