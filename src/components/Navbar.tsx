/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Flex, HStack, Button, Text } from "@chakra-ui/react";
import { Link, Link as RouterLink } from "react-router-dom";
const Navbar = () => {
  return (
    <Box px={6} py={4} boxShadow="sm">
      <Flex justify="space-between" align="center">
        <Text fontSize="xl" fontWeight="bold">
          MyStore
        </Text>

        <HStack spacing={4} {...({} as any)}>
          <Link as={RouterLink} to="/" {...({} as any)}>
            <Button variant="ghost">Home</Button>
          </Link>
          <Link as={RouterLink} to="/product" {...({} as any)}>
            <Button variant="ghost">Product</Button>
          </Link>
          <Button colorScheme="blue">Login</Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
