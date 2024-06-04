import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { createComment } from "../../../services/Comment";
import Comment from "../../../interfaces/Comment";

interface CommentFormProps {
  postId: number;
  onAddComment: (comment: Comment) => void;
}

interface ErrorMessages {
  content?: string[];
  general?: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId, onAddComment }) => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorMessages>({});
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setErrors({});

    try {
      const newComment = await createComment({ content, post_id: postId });

      onAddComment(newComment);
      setContent("");
    } catch (error: any) {
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
    <Box mb={4}>
      <form onSubmit={handleSubmit}>
        <FormControl isInvalid={!!errors.content}>
          <FormLabel htmlFor="content">Comment</FormLabel>
          <Textarea
            id="content"
            placeholder="Content of comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {errors.content && (
            <FormErrorMessage>{errors.content[0]}</FormErrorMessage>
          )}
        </FormControl>
        <Button
          colorScheme="teal"
          type="submit"
          isLoading={isLoading}
          size="sm"
          w="100%"
          marginTop={3}
        >
          Add Comment
        </Button>
      </form>
    </Box>
  );
};

export default CommentForm;
