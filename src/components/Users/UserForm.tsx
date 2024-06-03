import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  useToast,
  Heading,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createUser, fetchUser, updateUser } from "../../services/User";
import { UserRole } from "../../interfaces/User";

interface ErrorMessages {
  name?: string[];
  email?: string[];
  password?: string[];
  roles?: string[];
  general?: string;
}

const UserForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorMessages>({});
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (id) {
      const getUser = async () => {
        const user = await fetchUser(Number(id));
        setName(user.name);
        setEmail(user.email);
        setRoles(user.roles);
      };

      getUser();
    }
  }, [id]);

  const handleRoleChange = (role: UserRole) => {
    setRoles((prevRoles) =>
      prevRoles.includes(role)
        ? prevRoles.filter((r) => r !== role)
        : [...prevRoles, role]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setErrors({});

    try {
      if (id) {
        await updateUser(Number(id), { name, email, roles });

        toast({
          title: "User updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else {
        await createUser({ name, email, roles, password });
        toast({
          title: "User created.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }

      navigate("/dashboard/users");
    } catch (error: any) {
        console.log('error :>> ', error.response);
      if (
        error.response &&
        error.response.data &&
        typeof error.response.data.message === "object" &&
        error.response.data.message !== null
      ) {
        setErrors(error.response.data.message);
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
    <Box>
      <Heading as="h3" size="md" mb={4}>
        Create New User
      </Heading>
      <Box bg="gray.100" p={5}>
        <Box bg="white" p={6} boxShadow="md" borderRadius="md">
          <form onSubmit={handleSubmit}>
            <FormControl id="name" mb={4} isInvalid={!!errors.name}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter name"
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
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="filled"
                size="md"
              />
              {errors.email && (
                <FormErrorMessage>{errors.email[0]}</FormErrorMessage>
              )}
            </FormControl>
            {!id && (
              <FormControl id="password" mb={4} isInvalid={!!errors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="filled"
                  size="md"
                />
                {errors.password && (
                  <FormErrorMessage>{errors.password[0]}</FormErrorMessage>
                )}
              </FormControl>
            )}
            <FormControl id="roles" mb={4} isInvalid={!!errors.roles}>
              <FormLabel>Roles</FormLabel>
              <Stack direction="row">
                <Checkbox
                  isChecked={roles.includes("user")}
                  onChange={() => handleRoleChange("user")}
                >
                  User
                </Checkbox>
                <Checkbox
                  isChecked={roles.includes("admin")}
                  onChange={() => handleRoleChange("admin")}
                >
                  Admin
                </Checkbox>
              </Stack>
              {errors.roles && (
                <FormErrorMessage>{errors.roles[0]}</FormErrorMessage>
              )}
            </FormControl>
            <Box display="flex" justifyContent="flex-end" mb={4}>
              <Button
                type="submit"
                colorScheme="blue"
                marginRight={2}
                size="sm"
                isLoading={isLoading}
              >
                {id ? "Update User" : "Create User"}
              </Button>
              <Button
                as={Link}
                to="/dashboard/users"
                colorScheme="red"
                size="sm"
              >
                Back
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default UserForm;
