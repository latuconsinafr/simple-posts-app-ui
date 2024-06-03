import React from "react";
import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const APP_NAME = process.env.REACT_APP_NAME;

const Home: React.FC = () => {
  return (
    <Box bg="gray.100" minHeight="100vh">
      <Navbar withAuthNav={true} />

      <Center minHeight="80vh" px={4}>
        <Container maxW="container.md" textAlign="center">
          <Heading as="h1" size="2xl" mb={4}>
            Welcome to {APP_NAME}
          </Heading>
          <Text fontSize="xl" mb={8}>
            Your journey to better organization starts here.
          </Text>
          <Box display="flex" justifyContent="center">
            <Link to="/dashboard">
              <Button colorScheme="blue" size="lg" mr={4}>
                Get Started
              </Button>
            </Link>
            <Button colorScheme="blue" size="lg">
              Learn More
            </Button>
          </Box>
        </Container>
      </Center>
    </Box>
  );
};

export default Home;
