"use client";
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
  Heading,
} from "@chakra-ui/react";
import {
  FaShoppingCart,
  FaHeart,
  FaShareAlt,
  FaTruck,
  FaShieldAlt,
  FaUndo,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { useColorModeValue } from "../ui/color-mode";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { addToCart } from "@/features/cartSlice";
import { useThemeColors } from "@/hooks/useThemeColors";

const c = (light: string, dark: string) =>
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useColorModeValue(light, dark) as string;
const ProductDetail = () => {
  const API_URL = import.meta.env.VITE_SERVER_URL;
  // ====== States ======
  const [imgError, setImgError] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const colors = useThemeColors();
  const detailsProduct = useSelector(
    (state: RootState) => state.global.detailProduct,
  );
  const dispatch = useDispatch();
  const addToCartHandler = () => {
    const firstImage = detailsProduct?.images?.[0]?.image_path;
    const item = {
      id: detailsProduct.id,
      name: detailsProduct.name,
      price: Number(detailsProduct.price),
      image: firstImage
        ? `${API_URL}/storage/${firstImage}`
        : "https://via.placeholder.com/300",
      quantity: 1,
    };
    dispatch(addToCart(item));
  };
  useEffect(() => {
    if (detailsProduct?.images?.length) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedImage(detailsProduct.images[0].image_path);
    }
  }, [detailsProduct]);

  if (!detailsProduct || !detailsProduct.images) {
    return <Text>Loading...</Text>;
  }
  return (
    <Box bg={colors.pageBg} minH="100vh" py={10}>
      <Container maxW="container.xl">
        <Flex direction={{ base: "column", lg: "row" }} gap={10} align="start">
          <Box flex={1.2} w="full">
            <VStack gap={4}>
              <Box
                rounded="2xl"
                overflow="hidden"
                border="1px solid"
                borderColor={colors.border}
                bg={colors.drawerBg}
                shadow="lg"
              >
                {imgError ? (
                  <Box
                    w="full"
                    h={{ base: "350px", md: "450px", lg: "550px" }}
                    bg={c("purple.50", "purple.900")}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <VStack gap={4}>
                      <Icon
                        as={FaShoppingCart}
                        boxSize={20}
                        color={colors.accent}
                        opacity={0.4}
                      />
                      <Text color={colors.textMuted}>Product Image</Text>
                    </VStack>
                  </Box>
                ) : (
                  <Image
                    src={
                      selectedImage
                        ? `${API_URL}/storage/${selectedImage}`
                        : "https://via.placeholder.com/500"
                    }
                    alt={detailsProduct?.name}
                    w="full"
                    h={{ base: "350px", md: "450px", lg: "550px" }}
                    objectFit="cover"
                    onError={() => setImgError(true)}
                  />
                )}
              </Box>

              <HStack gap={3} justify="center">
                {detailsProduct?.images?.map((i) => (
                  <Box
                    key={i.image_path}
                    w="80px"
                    h="80px"
                    rounded="lg"
                    border="2px solid"
                    cursor="pointer"
                    onClick={() => setSelectedImage(i.image_path)}
                    _hover={{ borderColor: colors.accent }}
                  >
                    <Image
                      src={`${API_URL}/storage/${i.image_path}`}
                      w="full"
                      h="full"
                      objectFit="cover"
                    />
                  </Box>
                ))}
              </HStack>
            </VStack>
          </Box>

          <VStack flex={1} align="start" gap={6} w="full">
            <VStack align="start" gap={2}>
              <Heading
                size={{ base: "xl", md: "2xl" }}
                color={colors.textPrimary}
                lineHeight="shorter"
              >
                {detailsProduct?.name}
              </Heading>
            </VStack>

            <VStack align="start" gap={1}>
              <HStack align="baseline" gap={4}>
                <Text
                  fontSize="3xl"
                  fontWeight="black"
                  color={colors.priceColor}
                >
                  ${detailsProduct?.price}
                </Text>
              </HStack>
            </VStack>

            <Text color={colors.textPrimary} fontSize="md" lineHeight="taller">
              {detailsProduct?.description}
            </Text>

            <Box w="full" h="1px" bg={colors.border} />

            <VStack gap={3} w="full">
              <Button
                width="full"
                size="lg"
                bg={colors.primaryBg}
                color={colors.primaryText}
                _hover={{ opacity: 0.9 }}
                _active={{ transform: "scale(0.98)" }}
                fontWeight="bold"
                rounded="xl"
                py={7}
                shadow="md"
              >
                <FaShoppingCart /> Buy Now
              </Button>

              <Button
                width="full"
                size="lg"
                variant="outline"
                borderColor={colors.accent}
                color={colors.accent}
                _hover={{ bg: c("purple.50", "purple.900") }}
                fontWeight="bold"
                rounded="xl"
                py={7}
                onClick={addToCartHandler}
              >
                <FaShoppingCart />
                Add to Cart
              </Button>

              <HStack gap={3} w="full">
                <Button
                  flex={1}
                  size="md"
                  variant="ghost"
                  color={colors.textPrimary}
                  _hover={{ color: "red.500", bg: c("red.50", "red.900") }}
                  rounded="xl"
                >
                  <FaHeart /> Wishlist
                </Button>

                <Button
                  flex={1}
                  size="md"
                  variant="ghost"
                  color={colors.textPrimary}
                  _hover={{
                    color: colors.accent,
                    bg: c("purple.50", "purple.900"),
                  }}
                  rounded="xl"
                >
                  <FaShareAlt />
                  Share
                </Button>
              </HStack>
            </VStack>

            <VStack gap={3} w="full" pt={4}>
              <Flex align="center" gap={3} w="full">
                <Icon as={FaTruck} boxSize={5} color={colors.accent} />
                <Text fontSize="sm" color={colors.textPrimary}>
                  Free shipping on orders over $100
                </Text>
              </Flex>

              <Flex align="center" gap={3} w="full">
                <Icon as={FaShieldAlt} boxSize={5} color={colors.accent} />
                <Text fontSize="sm" color={colors.textPrimary}>
                  2-year warranty included
                </Text>
              </Flex>

              <Flex align="center" gap={3} w="full">
                <Icon as={FaUndo} boxSize={5} color={colors.accent} />
                <Text fontSize="sm" color={colors.textPrimary}>
                  30-day return policy
                </Text>
              </Flex>
            </VStack>
          </VStack>
        </Flex>
      </Container>
    </Box>
  );
};
export default ProductDetail;
