import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { deleteUser, fetchUsers } from "../../services/User";
import User from "../../interfaces/User";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      setIsLoading(true);

      const data = await fetchUsers();
      setUsers(data);

      setIsLoading(false);
    };

    getUsers();
  }, []);

  const onClose = () => setIsOpen(false);

  const handleDelete = async (id: number) => {
    setIsOpen(false);
    await deleteUser(id);
    setUsers(users.filter((user) => user.id !== id));
  };

  const onDeleteClick = (id: number) => {
    setUserIdToDelete(id);
    setIsOpen(true);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" mb={4}>
        <Button as={Link} to="create" colorScheme="blue" size="sm">
          Create User
        </Button>
      </Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Roles</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {isLoading ? (
            <Tr>
              <Td colSpan={4} textAlign="center">
                <Spinner />
              </Td>
            </Tr>
          ) : (
            users.map((user) => (
              <Tr key={user.id}>
                <Td>{user.id}</Td>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.roles.join(",")}</Td>
                <Td>
                  <Button
                    as={Link}
                    to={`${user.id}`}
                    colorScheme="teal"
                    size="xs"
                    mr={2}
                  >
                    View
                  </Button>
                  <Button
                    as={Link}
                    to={`${user.id}/edit`}
                    colorScheme="yellow"
                    size="xs"
                    mr={2}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => onDeleteClick(user.id)}
                    colorScheme="red"
                    size="xs"
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Delete User</AlertDialogHeader>
          <AlertDialogBody>
            Are you sure you want to delete this user?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              colorScheme="red"
              onClick={() => handleDelete(userIdToDelete as number)}
              marginRight={2}
            >
              Delete
            </Button>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
};

export default UserList;
