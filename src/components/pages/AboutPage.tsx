"use client";

import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  FaCheckCircle,
  FaUsers,
  FaAward,
  FaHeart,
  FaRocket,
  FaGlobe,
} from "react-icons/fa";
import { useState } from "react";
import { useThemeColors } from "@/hooks/useThemeColors";
export default function AboutPage() {
  const [imgError, setImgError] = useState(false);
  const colors = useThemeColors();
  return (
    <Box bg={colors.pageBg} minH="100vh" py={20} id="about">
      <Container maxW="container.xl">
        <VStack gap={4} textAlign="center" mb={16}>
          <Text
            fontSize="sm"
            fontWeight="bold"
            color={colors.accent}
            textTransform="uppercase"
            letterSpacing="wider"
          >
            About Our Coffee Store
          </Text>

          <Heading size={{ base: "2xl", md: "3xl" }} color={colors.textPrimary}>
            Crafting Moments, One Cup at a Time{" "}
            <Text as="span" color={colors.accent}>
              Story
            </Text>
          </Heading>

          <Text fontSize="lg" color={colors.textSecondary} maxW="2xl">
            We are passionate about bringing you the finest coffee experience.
            Our beans are carefully selected from the best farms around the
            world and roasted to perfection. Every cup we serve is made to
            create a warm and memorable moment for you. Whether you love strong
            espresso or smooth latte, we have something special for every coffee
            lover.
          </Text>
        </VStack>

        <Flex
          direction={{ base: "column", lg: "row" }}
          gap={12}
          mb={20}
          align="center"
        >
          <Box flex={1}>
            {imgError ? (
              <Box
                w="full"
                h="400px"
                bg={colors.drawerBg}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon
                  as={FaGlobe}
                  boxSize={24}
                  color={colors.accent}
                  opacity={0.5}
                />
              </Box>
            ) : (
              <Image
                src="/images/about.jpg"
                alt="Our Store"
                w="full"
                h="400px"
                objectFit="contain"
                onError={() => setImgError(true)}
              />
            )}
          </Box>

          <VStack align="start" gap={6} flex={1}>
            <Heading size="xl" color={colors.textPrimary}>
              Who We Are
            </Heading>

            <Text
              color={colors.textSecondary}
              fontSize="md"
              lineHeight="taller"
            >
              Founded in 2020, ShopStyle has grown from a small boutique to a
              leading online fashion destination. We believe that everyone
              deserves access to quality, stylish clothing without breaking the
              bank.
            </Text>

            <Text
              color={colors.textSecondary}
              fontSize="md"
              lineHeight="taller"
            >
              Our team of fashion experts carefully curates each collection to
              ensure you get the latest trends with unmatched quality and
              service.
            </Text>

            <HStack gap={6} pt={4}>
              {["Quality Products", "Fast Shipping", "24/7 Support"].map(
                (item) => (
                  <Flex key={item} align="center" gap={2}>
                    <Icon
                      as={FaCheckCircle}
                      color={colors.accent}
                      boxSize={5}
                    />
                    <Text color={colors.textPrimary} fontWeight="medium">
                      {item}
                    </Text>
                  </Flex>
                ),
              )}
            </HStack>
          </VStack>
        </Flex>

        <Box
          bg={colors.drawerBg}
          rounded="2xl"
          p={10}
          mb={20}
          border="1px solid"
          borderColor={colors.border}
        >
          <SimpleGrid columns={{ base: 2, md: 4 }} gap={8}>
            {[
              { icon: FaUsers, number: "50K+", label: "Happy Customers" },
              { icon: FaAward, number: "500+", label: "Products" },
              { icon: FaGlobe, number: "30+", label: "Countries" },
              { icon: FaHeart, number: "99%", label: "Satisfaction" },
            ].map((stat) => (
              <VStack key={stat.label} gap={3} textAlign="center">
                <Icon as={stat.icon} boxSize={8} color={colors.accent} />
                <Heading size="2xl" color={colors.textPrimary}>
                  {stat.number}
                </Heading>
                <Text
                  color={colors.textSecondary}
                  fontSize="sm"
                  fontWeight="medium"
                >
                  {stat.label}
                </Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} mb={20}>
          <Box
            bg={colors.drawerBg}
            rounded="2xl"
            p={8}
            border="1px solid"
            borderColor={colors.border}
          >
            <VStack gap={4} align="start">
              <Box
                w={14}
                h={14}
                rounded="xl"
                bg={`${colors.accent}20`}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={FaRocket} boxSize={7} color={colors.accent} />
              </Box>

              <Heading size="lg" color={colors.textPrimary}>
                Our Vision
              </Heading>

              <Text color={colors.textSecondary} lineHeight="taller">
                To become the world's most customer-centric fashion brand, where
                everyone can find their unique style.
              </Text>
            </VStack>
          </Box>

          <Box
            bg={colors.drawerBg}
            rounded="2xl"
            p={8}
            border="1px solid"
            borderColor={colors.border}
          >
            <VStack gap={4} align="start">
              <Box
                w={14}
                h={14}
                rounded="xl"
                bg={`${colors.accent}20`}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={FaHeart} boxSize={7} color={colors.accent} />
              </Box>

              <Heading size="lg" color={colors.textPrimary}>
                Our Mission
              </Heading>

              <Text color={colors.textSecondary} lineHeight="taller">
                To provide high-quality, affordable fashion while building a
                community that celebrates individuality and creativity.
              </Text>
            </VStack>
          </Box>
        </SimpleGrid>

        <VStack gap={8}>
          <Heading size="xl" color={colors.textPrimary} textAlign="center">
            Our Values
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
            {[
              {
                title: "Quality First",
                desc: "We never compromise on quality. Every product is tested and curated.",
                icon: FaAward,
              },
              {
                title: "Customer Love",
                desc: "Your satisfaction is our priority. We go above and beyond for you.",
                icon: FaHeart,
              },
              {
                title: "Innovation",
                desc: "We constantly evolve to bring you the latest in fashion.",
                icon: FaRocket,
              },
            ].map((value) => (
              <Box
                key={value.title}
                bg={colors.drawerBg}
                rounded="xl"
                p={6}
                border="1px solid"
                borderColor={colors.border}
                _hover={{
                  transform: "translateY(-4px)",
                  shadow: "lg",
                  transition: "all 0.3s",
                }}
              >
                <VStack gap={3} align="start">
                  <Icon as={value.icon} boxSize={6} color={colors.accent} />
                  <Heading size="md" color={colors.textPrimary}>
                    {value.title}
                  </Heading>
                  <Text color={colors.textSecondary} fontSize="sm">
                    {value.desc}
                  </Text>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}
