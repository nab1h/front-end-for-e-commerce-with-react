 
import {
  Box,
  Flex,
  HStack,
  Button,
  Text,
  IconButton,
  useBreakpointValue,
  Image,
  Menu,
  Portal
} from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "../ui/color-mode";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import type { AppDispatch } from "@/app/store";

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
;

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
      <Flex justify="end" align="center" maxW="1400px" mx="auto">
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

          {/* User Button */}
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
              </>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
