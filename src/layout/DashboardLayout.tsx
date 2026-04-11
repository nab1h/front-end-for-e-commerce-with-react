"use client";

import { useState } from "react";
import { Box, Flex, Text, Drawer, VStack, CloseButton } from "@chakra-ui/react";
import { FiHome, FiShoppingCart, FiUsers, FiSettings } from "react-icons/fi";
import NavbarDashboard from "@/components/dashboard/NavbarDashboard";
import { useColorModeValue } from "@/components/ui/color-mode";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const SidebarContent = () => {
    //   const bgColor = useColorModeValue("white", "gray.800");
const location = useLocation();
  const textColor = useColorModeValue("gray.700", "gray.200");
  const activeBg = useColorModeValue("teal.500", "teal.300");
  const activeColor = useColorModeValue("white", "gray.900");
  const hoverBg = useColorModeValue("gray.100", "gray.700");

  const navItems = [
    { name: "Dashboard", icon: <FiHome />, link: "/dashboard" },
    {
      name: "Products",
      icon: <FiShoppingCart />,
      link: "/dashboard/products",
    },
    { name: "Orders", icon: <FiUsers />, link: "/dashboard/orders" },
    { name: "Settings", icon: <FiSettings />, link: "/settings" },
  ];

  return (
    
    <VStack gap={4} align="stretch" p={4}>
      <Text fontSize="xl" fontWeight="bold" mb={4} color="teal.500">
        DASHBOARD
      </Text>
      {navItems.map((item) => {
        const isActive = location.pathname === item.link;
        return (
          <NavLink
            key={item.name}
            to={item.link}
            style={{ textDecoration: "none" }}
          >
            <Flex
              align="center"
              p={3}
              borderRadius="md"
              cursor="pointer"
              bg={isActive ? activeBg : undefined}
              color={isActive ? activeColor : textColor}
              _hover={{ bg: hoverBg, color: "teal.500" }}
            >
              {item.icon}
              <Text ml={3}>{item.name}</Text>
            </Flex>
          </NavLink>
        );
      })}
    </VStack>
  );
};

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);

  const sidebarBg = useColorModeValue("white", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.50", "gray.800")}>
      {/* Mobile Drawer */}
      <Drawer.Root
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        placement="start"
      >
        <Drawer.Backdrop />
        <Drawer.Content bg={sidebarBg}>
          {" "}
          <Flex
            justify="space-between"
            align="center"
            p={4}
            borderBottom="1px"
            borderColor={borderColor}
          >
            <Text fontWeight="bold" fontSize="lg">
              Menu
            </Text>
            <CloseButton size="sm" onClick={() => setOpen(false)} />
          </Flex>
          <Drawer.Body bg={sidebarBg} p={0}>
            <SidebarContent />
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>

      {/* Desktop Sidebar */}
      <Box
        display={{ base: "none", md: "block" }}
        position="fixed"
        left={0}
        top={0}
        w="250px"
        h="100vh"
        bg={sidebarBg}
        borderRight="1px"
        borderColor={borderColor}
      >
        <SidebarContent />
      </Box>

      {/* Main Content Area */}
      <Box ml={{ base: 0, md: "250px" }}>
        <NavbarDashboard />
        <Box p={4}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
