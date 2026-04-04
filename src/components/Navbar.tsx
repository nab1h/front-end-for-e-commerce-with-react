/*eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Flex,
  HStack,
  Button,
  Text,
  IconButton,
  VStack,
  useBreakpointValue,
  Image,
  Heading,
  Menu,
  Portal
} from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "./ui/color-mode";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import { FaMoon, FaSun, FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/authSlice";



const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userImage = "https://api.dicebear.com/7.x/avataaars/svg?seed=user";

  const isMobile = useBreakpointValue({ base: true, md: false });
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const hoverBg = useColorModeValue("gray.100", "gray.700");
  const menuBg = useColorModeValue("white", "gray.900");
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const handleLogout = () => {
    dispatch(logout());
  }
  return (
    <Box
      px={{ base: 4, md: 8 }}
      py={4}
      boxShadow="sm"
      bg={bgColor}
      position="sticky"
      top="0"
      zIndex="1000"
    >
      <Flex justify="space-between" align="center" maxW="1400px" mx="auto">
        {/* Logo - Left */}
        <RouterLink to="/">
          <Heading
            as="h1"
            fontSize="2xl"
            fontWeight="700"
            color={textColor}
            cursor="pointer"
            _hover={{ color: "blue.500" }}
            transition="color 0.2s"
            fontFamily="'Poppins', sans-serif"
          >
            MyStore
          </Heading>
        </RouterLink>

        {/* Navigation Links - Center (Desktop) */}
        {!isMobile && (
          <HStack gap={2}>
            <RouterLink to="/">
              <Button
                variant="ghost"
                color={textColor}
                _hover={{ bg: hoverBg }}
                fontWeight="500"
                fontFamily="'Poppins', sans-serif"
              >
                Home
              </Button>
            </RouterLink>
            <RouterLink to="/products">
              <Button
                variant="ghost"
                color={textColor}
                _hover={{ bg: hoverBg }}
                fontWeight="500"
                fontFamily="'Poppins', sans-serif"
              >
                Products
              </Button>
            </RouterLink>
            <RouterLink to="/about">
              <Button
                variant="ghost"
                color={textColor}
                _hover={{ bg: hoverBg }}
                fontWeight="500"
                fontFamily="'Poppins', sans-serif"
              >
                About
              </Button>
            </RouterLink>
            <RouterLink to="/contact">
              <Button
                variant="ghost"
                color={textColor}
                _hover={{ bg: hoverBg }}
                fontWeight="500"
                fontFamily="'Poppins', sans-serif"
              >
                Contact
              </Button>
            </RouterLink>
          </HStack>
        )}

        {/* Right Side - Dark Mode & User */}
        <HStack gap={3}>
          {/* Dark Mode Toggle */}
          <IconButton
            aria-label="Toggle dark mode"
            onClick={toggleColorMode}
            variant="ghost"
            color={textColor}
            _hover={{ bg: hoverBg }}
            size="md"
          >
            {colorMode === "light" ? <FaMoon /> : <FaSun />}
          </IconButton>

          {/* Cart Button */}
          <RouterLink to="/cart">
            <IconButton
              aria-label="Cart"
              variant="ghost"
              color={textColor}
              _hover={{ bg: hoverBg }}
              size="md"
              position="relative"
            >
              <FaShoppingCart />
              <Box
                position="absolute"
                top="0"
                right="0"
                bg="red.500"
                color="white"
                borderRadius="full"
                fontSize="10px"
                w="4"
                h="4"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontWeight="600"
              >
                0
              </Box>
            </IconButton>
          </RouterLink>

          {/* User Button */}
          {isAuthenticated ? (
            <Menu.Root>
              <Menu.Trigger asChild>
                <Box
                  w="40px"
                  h="40px"
                  borderRadius="full"
                  overflow="hidden"
                  cursor="pointer"
                  _hover={{
                    ring: "2px",
                    ringColor: "blue.500",
                    ringOffset: "2px",
                  }}
                >
                  <Image
                    src={userImage}
                    alt="User"
                    w="full"
                    h="full"
                    objectFit="cover"
                  />
                </Box>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value="profile">
                      <RouterLink to="/profile">Profile</RouterLink>
                    </Menu.Item>
                    <Menu.Item value="setting">
                      <RouterLink to="/setting">settings</RouterLink>
                    </Menu.Item>
                    <Menu.Item value="orders">
                      <RouterLink to="/orders">
                      My Orders
                      </RouterLink>
                    </Menu.Item>
                    <Menu.Item
                      value="delete"
                      color="fg.error"
                      _hover={{ bg: "bg.error", color: "fg.error" }}
                      onClick={handleLogout}
                    >
                      Logout
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          ) : (
            <RouterLink to="/login">
              <Button
                variant="solid"
                colorScheme="blue"
                fontWeight="600"
                fontFamily="'Poppins', sans-serif"
              >
                Login
              </Button>
            </RouterLink>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              aria-label="Open menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant="ghost"
              color={textColor}
              _hover={{ bg: hoverBg }}
              size="md"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </IconButton>
          )}
        </HStack>
      </Flex>

      {/* Mobile Menu Dropdown */}
      {isMobile && isMenuOpen && (
        <Box
          position="absolute"
          top="full"
          left={0}
          right={0}
          bg={menuBg}
          boxShadow="xl"
          p={4}
          zIndex={999}
          borderWidth="1px"
          // eslint-disable-next-line react-hooks/rules-of-hooks
          borderColor={useColorModeValue("gray.200", "gray.700")}
        >
          <Text
            color={textColor}
            fontWeight="600"
            mb={3}
            fontFamily="'Poppins', sans-serif"
          >
            Menu
          </Text>
          <VStack gap={2} align="stretch">
            <RouterLink to="/" onClick={() => setIsMenuOpen(false)}>
              <Button
                w="full"
                variant="ghost"
                justifyContent="flex-start"
                color={textColor}
                _hover={{ bg: hoverBg }}
                fontWeight="500"
                fontFamily="'Poppins', sans-serif"
              >
                Home
              </Button>
            </RouterLink>
            <RouterLink to="/products" onClick={() => setIsMenuOpen(false)}>
              <Button
                w="full"
                variant="ghost"
                justifyContent="flex-start"
                color={textColor}
                _hover={{ bg: hoverBg }}
                fontWeight="500"
                fontFamily="'Poppins', sans-serif"
              >
                Products
              </Button>
            </RouterLink>
            <RouterLink to="/about" onClick={() => setIsMenuOpen(false)}>
              <Button
                w="full"
                variant="ghost"
                justifyContent="flex-start"
                color={textColor}
                _hover={{ bg: hoverBg }}
                fontWeight="500"
                fontFamily="'Poppins', sans-serif"
              >
                About
              </Button>
            </RouterLink>
            <RouterLink to="/contact" onClick={() => setIsMenuOpen(false)}>
              <Button
                w="full"
                variant="ghost"
                justifyContent="flex-start"
                color={textColor}
                _hover={{ bg: hoverBg }}
                fontWeight="500"
                fontFamily="'Poppins', sans-serif"
              >
                Contact
              </Button>
            </RouterLink>
            {isAuthenticated ? (
              <>
                <RouterLink to="/profile" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    w="full"
                    variant="ghost"
                    justifyContent="flex-start"
                    color={textColor}
                    _hover={{ bg: hoverBg }}
                    fontWeight="500"
                    fontFamily="'Poppins', sans-serif"
                  >
                    Profile
                  </Button>
                </RouterLink>
                <RouterLink to="/cart" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    w="full"
                    variant="ghost"
                    justifyContent="flex-start"
                    color={textColor}
                    _hover={{ bg: hoverBg }}
                    fontWeight="500"
                    fontFamily="'Poppins', sans-serif"
                  >
                    Cart
                  </Button>
                </RouterLink>
                <RouterLink to="/orders" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    w="full"
                    variant="ghost"
                    justifyContent="flex-start"
                    color={textColor}
                    _hover={{ bg: hoverBg }}
                    fontWeight="500"
                    fontFamily="'Poppins', sans-serif"
                  >
                    My Orders
                  </Button>
                </RouterLink>
              </>
            ) : (
              <RouterLink to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button
                  w="full"
                  variant="solid"
                  colorScheme="blue"
                  fontWeight="600"
                  fontFamily="'Poppins', sans-serif"
                >
                  Login
                </Button>
              </RouterLink>
            )}
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
