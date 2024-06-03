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
import { deletePost, fetchPosts } from "../../services/Post";
import Post from "../../interfaces/Post";

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState<number | null>(null);
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);

      const data = await fetchPosts();
      setPosts(data);

      setIsLoading(false);
    };

    getPosts();
  }, []);

  const onClose = () => setIsOpen(false);

  const handleDelete = async (id: number) => {
    setIsOpen(false);
    await deletePost(id);
    setPosts(posts.filter((post) => post.id !== id));
  };

  const onDeleteClick = (id: number) => {
    setPostIdToDelete(id);
    setIsOpen(true);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" mb={4}>
        <Button as={Link} to="create" colorScheme="blue" size="sm">
          Create Post
        </Button>
      </Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Title</Th>
            <Th>Content</Th>
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
            posts.map((post) => (
              <Tr key={post.id}>
                <Td>{post.id}</Td>
                <Td>{post.title}</Td>
                <Td>{post.content}</Td>
                <Td>
                  <Button
                    as={Link}
                    to={`${post.id}`}
                    colorScheme="teal"
                    size="xs"
                    mr={2}
                  >
                    View
                  </Button>
                  <Button
                    as={Link}
                    to={`${post.id}/edit`}
                    colorScheme="yellow"
                    size="xs"
                    mr={2}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => onDeleteClick(post.id)}
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
          <AlertDialogHeader>Delete Post</AlertDialogHeader>
          <AlertDialogBody>
            Are you sure you want to delete this post?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              colorScheme="red"
              onClick={() => handleDelete(postIdToDelete as number)}
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

export default PostList;
