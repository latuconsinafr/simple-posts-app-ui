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
import { register } from "../../services/Auth";

interface ErrorMessages {
  name?: string[];
  email?: string[];
  password?: string[];
  passwordConfirmation?: string[];
}

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorMessages>({});
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setErrors({});

    try {
      const data = await register(name, email, password);

      console.log("data :>> ", data);

      toast({
        title: "Registration successful",
        description: "You have successfully registered",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      navigate("/login");
    } catch (error: any) {
      if (error.response && error.response.data) {
        const { message, data } = error.response.data;

        if (typeof message === "object" && message !== null) {
          setErrors(message);
        } else {
          toast({
            title: "Error",
            description: message || data?.error || "An unknown error occurred",
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
            Register
          </Heading>
          <Box
            bg="white"
            p={6}
            borderRadius="xl"
            boxShadow="md"
            textAlign="left"
          >
            <form onSubmit={handleSubmit}>
              <FormControl id="name" mb={4} isInvalid={!!errors.name}>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  variant="filled"
                  size="md"
                />
                {errors.name && (
                  <FormErrorMessage>{errors.name[0]}</FormErrorMessage>
                )}
              </FormControl>
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
              <FormControl id="password" mb={4} isInvalid={!!errors.password}>
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
              <FormControl
                id="passwordConfirmation"
                mb={6}
                isInvalid={password !== passwordConfirmation}
              >
                <FormLabel>Password Confirmation</FormLabel>
                <Input
                  type="password"
                  placeholder="Confirm your password"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  variant="filled"
                  size="md"
                />
                {password !== passwordConfirmation && (
                  <FormErrorMessage>Passwords do not match</FormErrorMessage>
                )}
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                width="100%"
                isLoading={isLoading}
              >
                Register
              </Button>
            </form>
          </Box>
          <Text mt={4} fontSize="sm" color="gray">
            Already have an account?{" "}
            <Link to="/login" style={{ color: "black" }}>
              Login
            </Link>
          </Text>
        </Container>
      </Center>
    </Box>
  );
};

export default Register;
