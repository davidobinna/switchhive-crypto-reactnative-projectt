import axiosClient from "@/apisetup/apiClient";
import Background from "@/components/uicomponents/Background";
import Button from "@/components/uicomponents/Button";
import Header from "@/components/uicomponents/Header";
import Paragraph from "@/components/uicomponents/Paragraph";
import ViewBox from "@/components/uicomponents/viewBox";
import { Colors } from "@/constants/Colors";
import { Href, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";

const ProductList = () => {
  const [loading, setLoading] = useState<Boolean>(true);
  const [products, setProducts] = useState([]);
  const router = useRouter()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosClient.get('https://dummyjson.com/products');
        setProducts(response.data.products);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const renderProduct = ({ item }: any) => (
    <ViewBox style={{ marginBottom: 16, padding: 16, borderRadius: 8, borderColor: Colors.light.primary, borderWidth: 1 }}>
      <Paragraph style={{ fontSize: 18, fontWeight: "bold", color: Colors.dark.text }}>
        {item.title}
      </Paragraph>
      <Paragraph style={{ fontSize: 14, color: Colors.dark.text, marginVertical: 8 }}>
        {item.description}
      </Paragraph>
      <Paragraph style={{ fontSize: 16, fontWeight: "bold", color: Colors.dark.text }}>
        N{item.price}
      </Paragraph>
      <Paragraph style={{ fontSize: 10, color: Colors.dark.error, marginBottom: 12 }}>
        Discount: {item.discountPercentage}%
      </Paragraph>
      <Button mode="contained" onPress={() => router.push('/product/productdetails' as Href<string> )}>Buy now!</Button>
    </ViewBox>
  );

  if (loading) {
    return (
      <Background>
        <ActivityIndicator size="large" animating={true} color={Colors.dark.icon} />
      </Background>
    );
  }

  return (
    <Background>
      <Header>Select Products</Header>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item : any) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
      />
    </Background>
  );
};

export default ProductList;
