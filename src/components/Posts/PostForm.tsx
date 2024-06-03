import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Heading,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createPost, fetchPost, updatePost } from "../../services/Post";

interface ErrorMessages {
  title?: string[];
  content?: string[];
  general?: string;
}

const PostForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorMessages>({});
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (id) {
      const getPost = async () => {
        const post = await fetchPost(Number(id));
        setTitle(post.title);
        setContent(post.content);
      };

      getPost();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setErrors({});

    try {
      if (id) {
        await updatePost(Number(id), { title, content });

        toast({
          title: "Post updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else {
        await createPost({ title, content });
        toast({
          title: "Post created.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }

      navigate("/dashboard/posts");
    } catch (error: any) {
      console.log("error :>> ", error.response);
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
        Create New Post
      </Heading>
      <Box bg="gray.100" p={5}>
        <Box bg="white" p={6} boxShadow="md" borderRadius="md">
          <form onSubmit={handleSubmit}>
            <FormControl id="title" mb={4} isInvalid={!!errors.title}>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                variant="filled"
                size="md"
              />
              {errors.title && (
                <FormErrorMessage>{errors.title[0]}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl id="content" mb={4} isInvalid={!!errors.content}>
              <FormLabel>Content</FormLabel>
              <Input
                type="content"
                placeholder="Enter content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                variant="filled"
                size="md"
              />
              {errors.content && (
                <FormErrorMessage>{errors.content[0]}</FormErrorMessage>
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
                {id ? "Update Post" : "Create Post"}
              </Button>
              <Button
                as={Link}
                to="/dashboard/posts"
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

export default PostForm;
