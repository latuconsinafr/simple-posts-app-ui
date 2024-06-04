import React from "react";
import { Box, Divider, Text, IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import Comment from "../../../interfaces/Comment";

interface CommentDetailProps extends Comment {
  onDeleteComment: () => void;
}

const CommentDetail: React.FC<CommentDetailProps> = ({
  id,
  content,
  created_at,
  onDeleteComment,
}) => {
  const handleDelete = () => {
    onDeleteComment();
  };

  return (
    <Box
      p={4}
      bg="gray.200"
      borderRadius="md"
      mb={4}
      boxShadow="md"
      position="relative"
    >
      <IconButton
        aria-label="Delete"
        icon={<DeleteIcon />}
        colorScheme="red"
        size="sm"
        position="absolute"
        top={3}
        right={3}
        onClick={handleDelete}
      />
      <Text fontWeight="bold">Anonymous {id}</Text>
      <Text>{content}</Text>
      <Divider marginBottom={1} />
      <Text fontSize="xs" color="gray.600">
        {new Date(created_at).toLocaleString()}
      </Text>
    </Box>
  );
};

export default CommentDetail;
