import React, { useEffect, useState } from "react";
import { Box, Text, Heading, Button } from "@chakra-ui/react";
import { useParams, Link } from "react-router-dom";
import { fetchUser } from "../../services/User";
import User from "../../interfaces/User";

const UserDetail: React.FC = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const data = await fetchUser(Number(id));
      setUser(data);
    };

    getUser();
  }, [id]);

  if (!user) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box>
      <Heading as="h3" size="md" mb={4}>
        View Detail of User
      </Heading>
      <Box bg="gray.100" p={4} borderRadius="md" boxShadow="md" mb={4}>
        <Text my={4}>
          <strong>ID:</strong> {user.id}
        </Text>
        <Text my={4}>
          <strong>Name:</strong> {user.name}
        </Text>
        <Text my={4}>
          <strong>Email:</strong> {user.email}
        </Text>
        <Text my={4}>
          <strong>Roles:</strong> {user.roles.join(",")}
        </Text>
        <Text my={4}>
          <strong>Created At:</strong>{" "}
          {new Date(user.created_at).toLocaleString()}
        </Text>
        <Text my={4}>
          <strong>Updated At:</strong>{" "}
          {new Date(user.updated_at).toLocaleString()}
        </Text>
      </Box>
      <Box display="flex" justifyContent="flex-end" mb={4}>
        <Button as={Link} to="/dashboard/users" colorScheme="blue" size="sm">
          Back
        </Button>
      </Box>
    </Box>
  );
};

export default UserDetail;
