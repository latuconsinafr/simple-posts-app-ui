import React from "react";
import { Box, Text, Link } from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <Box
      bg="gray.800"
      color="white"
      width="250px"
      p={4}
      minHeight="100vh"
      position="fixed"
      top="0"
      left="0"
      pt="80px"
    >
      <Text fontSize="lg" mb={6} mx={2} fontWeight="bold">
        Menu
      </Text>
      <Box>
        <Link
          as={NavLink}
          to="/dashboard/users"
          display="block"
          mb={2}
          p={2}
          mx={2}
          borderRadius="md"
          _hover={{ bg: "gray.700" }}
          bg={
            location.pathname.startsWith("/dashboard/users")
              ? "blue.500"
              : "inherit"
          }
          color={
            location.pathname.startsWith("/dashboard/users")
              ? "white"
              : "inherit"
          }
        >
          Users
        </Link>
        <Link
          as={NavLink}
          to="/dashboard/posts"
          display="block"
          mb={2}
          p={2}
          mx={2}
          borderRadius="md"
          _hover={{ bg: "gray.700" }}
          bg={
            location.pathname.startsWith("/dashboard/posts")
              ? "blue.500"
              : "inherit"
          }
          color={
            location.pathname.startsWith("/dashboard/posts")
              ? "white"
              : "inherit"
          }
        >
          Posts
        </Link>
      </Box>
    </Box>
  );
};

export default Sidebar;
