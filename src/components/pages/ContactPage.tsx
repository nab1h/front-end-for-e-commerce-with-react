/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Input,
  Text,
  Textarea,
  VStack,

} from "@chakra-ui/react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaPaperPlane,
  FaCheckCircle,
} from "react-icons/fa";
import { useState } from "react";
import { useColorModeValue } from "../ui/color-mode";
import { useThemeColors } from "@/hooks/useThemeColors";

export default function ContactPage() {
const colors = useThemeColors();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
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
            Get in Touch With Us
          </Text>

          <Heading size={{ base: "2xl", md: "3xl" }} color={colors.textPrimary}>
            We’re Here to Help You Enjoy Every Sip{" "}
            <Text as="span" color={colors.accent}>
              Us
            </Text>
          </Heading>

          <Text fontSize="lg" color={colors.textSecondary} maxW="2xl">
            Have a question, suggestion, or need support? We’d love to hear from
            you. Whether it’s about our coffee products, your order, or general
            inquiries, our team is always ready to assist you. Reach out anytime
            and we’ll get back to you as soon as possible.
          </Text>
        </VStack>

        <Flex direction={{ base: "column", lg: "row" }} gap={12}>
          <Box flex={1.2}>
            <Box
              bg={colors.drawerBg}
              rounded="2xl"
              p={8}
              border="1px solid"
              borderColor={colors.border}
              shadow="lg"
            >
              <Heading size="lg" color={colors.textPrimary} mb={6}>
                Send us a message
              </Heading>

              {isSubmitted ? (
                <VStack gap={4} py={10} textAlign="center">
                  <Icon as={FaCheckCircle} boxSize={16} color="green.500" />
                  <Heading size="md" color={colors.textPrimary}>
                    Message Sent!
                  </Heading>
                  <Text color={colors.textSecondary}>
                    We'll get back to you as soon as possible.
                  </Text>
                  <Button
                    mt={4}
                    variant="outline"
                    borderColor={colors.accent}
                    color={colors.accent}
                    onClick={() => setIsSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </VStack>
              ) : (
                <form onSubmit={handleSubmit}>
                  <VStack gap={5}>
                    <VStack align="start" gap={2} w="full">
                      <Text
                        color={colors.textPrimary}
                        fontSize="sm"
                        fontWeight="medium"
                      >
                        Full Name *
                      </Text>
                      <Input
                        placeholder="John Doe"
                        bg={colors.drawerBg}
                        border="1px solid"
                        borderColor={colors.border}
                        color={colors.textPrimary}
                        _placeholder={{ color: colors.textSecondary }}
                        _focus={{
                          borderColor: colors.accent,
                          boxShadow: `0 0 0 1px ${colors.accent}`,
                        }}
                        rounded="lg"
                        px={4}
                        py={6}
                        required
                      />
                    </VStack>

                    <VStack align="start" gap={2} w="full">
                      <Text
                        color={colors.textPrimary}
                        fontSize="sm"
                        fontWeight="medium"
                      >
                        Email Address *
                      </Text>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        bg={colors.drawerBg}
                        border="1px solid"
                        borderColor={colors.border}
                        color={colors.textPrimary}
                        _placeholder={{ color: colors.textSecondary }}
                        _focus={{
                          borderColor: colors.accent,
                          boxShadow: `0 0 0 1px ${colors.accent}`,
                        }}
                        rounded="lg"
                        px={4}
                        py={6}
                        required
                      />
                    </VStack>

                    <VStack align="start" gap={2} w="full">
                      <Text
                        color={colors.textPrimary}
                        fontSize="sm"
                        fontWeight="medium"
                      >
                        Subject
                      </Text>
                      <Input
                        placeholder="How can we help?"
                        bg={colors.drawerBg}
                        border="1px solid"
                        borderColor={colors.border}
                        color={colors.textPrimary}
                        _placeholder={{ color: colors.textSecondary }}
                        _focus={{
                          borderColor: colors.accent,
                          boxShadow: `0 0 0 1px ${colors.accent}`,
                        }}
                        rounded="lg"
                        px={4}
                        py={6}
                      />
                    </VStack>

                    <VStack align="start" gap={2} w="full">
                      <Text
                        color={colors.textPrimary}
                        fontSize="sm"
                        fontWeight="medium"
                      >
                        Message *
                      </Text>
                      <Textarea
                        placeholder="Tell us more about your inquiry..."
                        bg={colors.drawerBg}
                        border="1px solid"
                        borderColor={colors.border}
                        color={colors.textPrimary}
                        _placeholder={{ color: colors.textSecondary }}
                        _focus={{
                          borderColor: colors.accent,
                          boxShadow: `0 0 0 1px ${colors.accent}`,
                        }}
                        rounded="lg"
                        px={4}
                        py={6}
                        rows={5}
                        resize="vertical"
                        required
                      />
                    </VStack>

                    <Button
                      type="submit"
                      width="full"
                      size="lg"
                      bg={colors.accent}
                      color={useColorModeValue("white", "gray.900")}
                      _hover={{ opacity: 0.9 }}
                      _active={{ transform: "scale(0.98)" }}
                      fontWeight="bold"
                      py={7}
                      rounded="lg"
                      mt={2}
                    >
                      <FaPaperPlane />
                      Send Message
                    </Button>
                  </VStack>
                </form>
              )}
            </Box>
          </Box>

          <VStack flex={0.8} gap={6} align="stretch">
            <Box
              bg={colors.drawerBg}
              rounded="2xl"
              p={8}
              border="1px solid"
              borderColor={colors.border}
            >
              <Heading size="lg" color={colors.textPrimary} mb={6}>
                Contact Information
              </Heading>

              <VStack gap={6}>
                <Flex gap={4} align="start">
                  <Box
                    w={12}
                    h={12}
                    rounded="xl"
                    bg={`${colors.accent}20`}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                  >
                    <Icon
                      as={FaMapMarkerAlt}
                      boxSize={5}
                      color={colors.accent}
                    />
                  </Box>
                  <VStack align="start" gap={1}>
                    <Text color={colors.textPrimary} fontWeight="medium">
                      Address
                    </Text>
                    <Text color={colors.textSecondary} fontSize="sm">
                      Tanta
                      <br />
                      Elgharbya
                      <br />
                      Egypt
                    </Text>
                  </VStack>
                </Flex>

                <Flex gap={4} align="start">
                  <Box
                    w={12}
                    h={12}
                    rounded="xl"
                    bg={`${colors.accent}20`}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                  >
                    <Icon as={FaPhoneAlt} boxSize={5} color={colors.accent} />
                  </Box>
                  <VStack align="start" gap={1}>
                    <Text color={colors.textPrimary} fontWeight="medium">
                      Phone
                    </Text>
                    <Text color={colors.textSecondary} fontSize="sm">
                      +20 (11) 54424837
                      <br />
                      Mon-Fri: 9am-6pm EST
                    </Text>
                  </VStack>
                </Flex>

                <Flex gap={4} align="start">
                  <Box
                    w={12}
                    h={12}
                    rounded="xl"
                    bg={`${colors.accent}20`}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                  >
                    <Icon as={FaEnvelope} boxSize={5} color={colors.accent} />
                  </Box>
                  <VStack align="start" gap={1}>
                    <Text color={colors.textPrimary} fontWeight="medium">
                      Email
                    </Text>
                    <Text color={colors.textSecondary} fontSize="sm">
                      info@nabih.online
                      <br />
                      We reply within 24 hours
                    </Text>
                  </VStack>
                </Flex>

                <Flex gap={4} align="start">
                  <Box
                    w={12}
                    h={12}
                    rounded="xl"
                    bg={`${colors.accent}20`}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                  >
                    <Icon as={FaClock} boxSize={5} color={colors.accent} />
                  </Box>
                  <VStack align="start" gap={1}>
                    <Text color={colors.textPrimary} fontWeight="medium">
                      Working Hours
                    </Text>
                    <Text color={colors.textSecondary} fontSize="sm">
                      Monday - Friday: 9am - 6pm
                      <br />
                      Saturday: 10am - 4pm
                      <br />
                      Sunday: Closed
                    </Text>
                  </VStack>
                </Flex>
              </VStack>
            </Box>

            <Box
              bg={colors.drawerBg}
              rounded="2xl"
              p={8}
              border="1px solid"
              borderColor={colors.border}
            >
              <Heading size="md" color={colors.textPrimary} mb={4}>
                Why Contact Us?
              </Heading>

              <VStack gap={3} align="start">
                {[
                  "Product inquiries & custom orders",
                  "Shipping & delivery questions",
                  "Returns & exchanges",
                  "Partnership opportunities",
                  "General feedback & suggestions",
                ].map((item) => (
                  <HStack key={item} gap={2}>
                    <Icon
                      as={FaCheckCircle}
                      color={colors.accent}
                      boxSize={4}
                      flexShrink={0}
                    />
                    <Text color={colors.textSecondary} fontSize="sm">
                      {item}
                    </Text>
                  </HStack>
                ))}
              </VStack>
            </Box>
          </VStack>
        </Flex>
      </Container>
    </Box>
  );
}
