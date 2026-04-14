"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  FaArrowRight,
  FaTruck,
  FaShieldAlt,
  FaStar,
  FaShoppingBag,
} from "react-icons/fa";
import { useThemeColors } from "@/hooks/useThemeColors";

export default function Hero() {
  const colors = useThemeColors();
  return (
    <Box
      bgImage={`url(${colors.pageBgImage})`}
      bgSize="cover"
      position="relative"
      backgroundPosition="center"
      bgRepeat="no-repeat"
      minH="90vh"
    >
      <Box
        position="absolute"
        inset={0}
        bg={colors.primaryColor}
        opacity={0.15}
        zIndex={1}
        pointerEvents="none"
      />
      <Container maxW="container.xl">
        <VStack
          align={{ base: "center", lg: "flex-start" }}
          justifyContent={"center"}
          flex={1}
          gap={6}
          h="100vh"
        >
          <Heading
            size={{ base: "2xl", md: "3xl", lg: "5xl" }}
            color={colors.textPrimary}
            fontWeight="bold"
          >
            Fresh Coffee{" "}
            <Text as="span" color={colors.textSecondary}>
              Every Morning
            </Text>
          </Heading>

          <Text
            fontSize="lg"
            color={colors.textSecondary}
            maxW="lg"
            textAlign={{ base: "center", lg: "left" }}
          >
            Shop from thousands of premium products at the best prices. Fast
            shipping and quality guaranteed.
          </Text>

          <HStack gap={4}>
            <Link href="/products">
              <Button
                as="a"
                size="lg"
                bg={colors.primaryBg}
                color={colors.textPrimary}
                _hover={{ opacity: 0.4 }}
                fontWeight="bold"
                rounded="full"
              >
                Shop Now <FaArrowRight />
              </Button>
            </Link>

            <Link href="/about">
              <Button
                as="a"
                size="lg"
                variant="outline"
                borderColor={colors.border}
                color={colors.textPrimary}
                _hover={{ bg: "whiteAlpha.200" }}
                fontWeight="bold"
                rounded="full"
              >
                <FaShoppingBag /> About Us
              </Button>
            </Link>
          </HStack>

          <HStack gap={6} pt={4}>
            <Flex align="center" gap={2}>
              <Icon as={FaTruck} color={colors.primaryColor} />
              <Text color={colors.textSecondary} fontSize="sm">
                Free Shipping
              </Text>
            </Flex>

            <Flex align="center" gap={2}>
              <Icon as={FaShieldAlt} color={colors.primaryColor} />
              <Text color={colors.textSecondary} fontSize="sm">
                Secure Payment
              </Text>
            </Flex>

            <Flex align="center" gap={2}>
              <Icon as={FaStar} color={colors.primaryColor} />
              <Text color={colors.textSecondary} fontSize="sm">
                4.9 Rating
              </Text>
            </Flex>
          </HStack>
        </VStack>
        <Box flex={1} maxW="500px"></Box>
      </Container>
    </Box>
  );
}
