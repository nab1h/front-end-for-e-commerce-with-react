import {
  Box,
  Container,
  Grid,
  Heading,
  SimpleGrid,
  VStack,
  Text,
} from "@chakra-ui/react";
import ProductCard from "../ProductCard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import SkeletonProducts from "../SkeletonProducts";
import type { IProduct, IProductsResponse } from "@/interfaces/interfaces";
import { useDispatch } from "react-redux";
import { showProduct } from "@/features/globalSlice";
import { useNavigate } from "react-router-dom";
import { useThemeColors } from "@/hooks/useThemeColors";

const ProductsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const colors = useThemeColors();
  const API_URL = import.meta.env.VITE_SERVER_URL;
  const getProductsList = async (): Promise<IProduct[]> => {
    const { data } = await axios.get<IProductsResponse>(
      `${import.meta.env.VITE_SERVER_URL}/api/products`,
    );
    return data.products;
  };
  const { isLoading, data } = useQuery({
    queryKey: ["products"],
    queryFn: getProductsList,
  });
  console.log(data);
  if (isLoading)
    return (
      <div>
        <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap="6">
          {Array.from({ length: 8 }, (_, idx) => (
            <SkeletonProducts key={idx} />
          ))}
        </Grid>
      </div>
    );
  return (
    <>
      <Box bg={colors.pageBg} minH="100vh" py={20}>
        <Container maxW="container.xl">
          <VStack gap={4} textAlign="center" mb={16}>
            <Text
              fontSize="sm"
              fontWeight="bold"
              color={colors.accent}
              textTransform="uppercase"
              letterSpacing="wider"
            >
              Our Coffee Products
            </Text>

            <Heading
              size={{ base: "2xl", md: "3xl" }}
              color={colors.textPrimary}
            >
              Discover the Perfect Blend for Every Taste{" "}
              <Text as="span" color={colors.accent}>
                Story
              </Text>
            </Heading>

            <Text fontSize="lg" color={colors.textSecondary} maxW="2xl">
              Explore our wide selection of premium coffee products, carefully
              crafted to suit every coffee lover. From rich espresso beans to
              smooth medium roasts and flavored blends, each product is selected
              with quality and freshness in mind. Whether you brew at home or on
              the go, our coffee is made to elevate your daily experience.
            </Text>
          </VStack>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={6}>
            {data?.map((product) => (
              <Box minW="200px" maxW={"350"}>
                <ProductCard
                  id={product.id}
                  onClick={() => {
                    dispatch(showProduct(product));
                    navigate(`/product/${product.id}`);
                  }}
                  key={product.id}
                  name={product.name}
                  img={
                    product.images?.[0]
                      ? `${API_URL}/storage/${product.images[0].image_path}`
                      : "https://via.placeholder.com/300"
                  }
                  desc={product.description}
                  price={product.price}
                />
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    </>
  );
};
export default ProductsPage;
