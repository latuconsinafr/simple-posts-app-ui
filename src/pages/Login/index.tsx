import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/Auth";

interface ErrorMessages {
  email?: string[];
  password?: string[];
  general?: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorMessages>({});
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setErrors({});

    try {
      const data = await login(email, password);

      console.log("data :>> ", data);

      toast({
        title: "Login successful",
        description: "You have successfully logged in",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      navigate("/dashboard");
    } catch (error: any) {
      if (error.response && error.response.data) {
        const { message } = error.response.data;

        if (typeof message === "object" && message !== null) {
          setErrors(message);
        } else {
          toast({
            title: "Error",
            description: "Invalid email address or password",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
      } else {
        toast({
          title: "Error",
          description: "An unknown error occurred",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box bg="gray.100" minHeight="100vh">
      <Navbar />

      <Center minHeight="80vh" px={4} mt={10}>
        <Container maxW="400px" textAlign="center">
          <Heading as="h1" size="2xl" mb={8}>
            Login
          </Heading>
          <Box
            bg="white"
            p={6}
            borderRadius="xl"
            boxShadow="md"
            textAlign="left"
          >
            <form onSubmit={handleSubmit}>
              <FormControl id="email" mb={4} isInvalid={!!errors.email}>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="filled"
                  size="md"
                />
                {errors.email && (
                  <FormErrorMessage>{errors.email[0]}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl id="password" mb={6} isInvalid={!!errors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="filled"
                  size="md"
                />
                {errors.password && (
                  <FormErrorMessage>{errors.password[0]}</FormErrorMessage>
                )}
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                width="100%"
                isLoading={isLoading}
              >
                Login
              </Button>
            </form>
            {errors.general && (
              <Text color="red.500" mt={4} textAlign="center">
                {errors.general}
              </Text>
            )}
          </Box>
          <Text mt={4} fontSize="sm" color="gray">
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "black" }}>
              Register
            </Link>
          </Text>
        </Container>
      </Center>
    </Box>
  );
};

export default Login;
