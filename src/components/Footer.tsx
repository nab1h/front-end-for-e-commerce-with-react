/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Link,
  Stack,
  Text,
  VStack,
  Input,
  Button,
} from "@chakra-ui/react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaTruck,
  FaShieldAlt,
  FaHeadset,
  FaEnvelope,
} from "react-icons/fa";
import { useColorModeValue } from "./ui/color-mode";
import { useThemeColors } from "@/hooks/useThemeColors";
import { navLinks } from "@/data";

export default function Footer() {
  const colors = useThemeColors();
  return (
    <Box
      bg={colors.pageBg}
      py={16}
      borderTop="4px solid"
      borderColor={colors.accent}
    >
      <Container maxW="container.xl">
        <VStack gap={12}>
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            gap={10}
            w="full"
          >
            <VStack align="start" gap={4} flex={1}>
              <Heading size="lg" color={colors.textPrimary}>
                Shop<span color={colors.accent}>Style</span>
              </Heading>

              <Text color={colors.textSecondary} fontSize="sm" maxW="300px">
                Your premium destination for the latest fashion trends.
              </Text>

              <HStack gap={4}>
                {[
                  { icon: FaFacebookF, label: "Facebook", url: "/" },
                  { icon: FaTwitter, label: "Twitter", url: "/" },
                  { icon: FaInstagram, label: "Instagram", url: "/" },
                  { icon: FaYoutube, label: "YouTube", url: "/" },
                ].map((social) => (
                  <Box
                    key={social.label}
                    as={Link}
                    w={10}
                    h={10}
                    rounded="full"
                    bg={useColorModeValue("gray.200", "whiteAlpha.200")}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    _hover={{
                      bg: colors.accent,
                      color: useColorModeValue("white", "gray.900"),
                    }}
                    transition="all 0.3s"
                  >
                    <Icon
                      as={social.icon}
                      color={colors.textPrimary}
                      boxSize={4}
                    />
                  </Box>
                ))}
              </HStack>
            </VStack>

            <VStack align="start" gap={3}>
              <Heading size="sm" color={colors.accent} fontWeight="bold">
                Quick Links
              </Heading>

              <Stack gap={2}>
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    color={colors.textSecondary}
                    _hover={{ color: colors.accent }}
                    fontSize="sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </Stack>
            </VStack>

            <VStack align="start" gap={3}>
              <Heading size="sm" color={colors.accent} fontWeight="bold">
                Customer Service
              </Heading>

              <Stack gap={2}>
                <Link
                  href="#"
                  color={colors.textSecondary}
                  _hover={{ color: colors.accent }}
                  fontSize="sm"
                >
                  FAQ
                </Link>
                <Link
                  href="#"
                  color={colors.textSecondary}
                  _hover={{ color: colors.accent }}
                  fontSize="sm"
                >
                  Shipping Info
                </Link>
                <Link
                  href="#"
                  color={colors.textSecondary}
                  _hover={{ color: colors.accent }}
                  fontSize="sm"
                >
                  Returns
                </Link>
                <Link
                  href="#"
                  color={colors.textSecondary}
                  _hover={{ color: colors.accent }}
                  fontSize="sm"
                >
                  Track Order
                </Link>
                <Link
                  href="#"
                  color={colors.textSecondary}
                  _hover={{ color: colors.accent }}
                  fontSize="sm"
                >
                  Size Guide
                </Link>
              </Stack>
            </VStack>

            <VStack align="start" gap={3} flex={1}>
              <Heading size="sm" color={colors.accent} fontWeight="bold">
                Newsletter
              </Heading>
              <Text color={colors.textSecondary} fontSize="sm">
                Subscribe for exclusive deals
              </Text>
              <HStack w="full">
                <Input
                  placeholder="Your email"
                  bg={useColorModeValue("white", "whiteAlpha.100")}
                  border="1px solid"
                  borderColor={useColorModeValue("gray.300", "whiteAlpha.300")}
                  color={colors.textPrimary}
                  _placeholder={{ color: colors.textSecondary }}
                  rounded="lg"
                  px={4}
                  flex={1}
                />
                <Button
                  bg={colors.accent}
                  color={useColorModeValue("white", "gray.900")}
                  _hover={{ opacity: 0.9 }}
                  px={6}
                  rounded="lg"
                  fontWeight="bold"
                >
                  <FaEnvelope /> Join
                </Button>
              </HStack>
            </VStack>
          </Flex>

          <Box
            w="full"
            h="1px"
            bg={useColorModeValue("gray.300", "whiteAlpha.200")}
          />
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align="center"
            gap={6}
            w="full"
          >
            <HStack gap={1} color={colors.textSecondary} fontSize="sm">
              <Text>© 2026 ShopStyle.</Text>
              <Text>All rights reserved.</Text>
              <Text>Made with</Text>
              <Link href="https://nabih.online">Nabih Alashmawy</Link>
            </HStack>

            <HStack gap={8}>
              <Flex align="center" gap={2} color={colors.primaryColor}>
                <Icon as={FaTruck} color={colors.primaryColor} />
                <Text color="gray.400" fontSize="sm">
                  Free Shipping
                </Text>
              </Flex>

              <Flex align="center" gap={2}>
                <Icon as={FaShieldAlt} color={colors.primaryColor} />
                <Text color="gray.400" fontSize="sm">
                  Secure Payment
                </Text>
              </Flex>

              <Flex align="center" gap={2}>
                <Icon as={FaHeadset} color={colors.primaryColor} />
                <Text color="gray.400" fontSize="sm">
                  24/7 Support
                </Text>
              </Flex>
            </HStack>
          </Flex>
        </VStack>
      </Container>
    </Box>
  );
}
