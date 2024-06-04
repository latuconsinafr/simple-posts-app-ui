import React, { useEffect, useState } from "react";
import { Box, Spinner, Heading, Flex } from "@chakra-ui/react";
import { fetchPostComments } from "../../../services/Post";
import Comment from "../../../interfaces/Comment";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import { deleteComment } from "../../../services/Comment";

interface CommentsSectionProps {
  postId: number;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getComments = async () => {
      setIsLoading(true);
      const data = await fetchPostComments(postId);
      setComments(data);
      setIsLoading(false);
    };

    getComments();
  }, [postId]);

  const handleAddComment = (comment: Comment) => {
    setComments((prevComments) => [...prevComments, comment]);
  };

  const handleDeleteComment = async (id: number) => {
    setIsLoading(true);

    await deleteComment(id);

    const updatedComments = comments.filter((comment) => comment.id !== id);
    setComments(updatedComments);

    setIsLoading(false);
  };

  return (
    <Box>
      <Heading as="h4" size="sm" mb={4}>
        Comment Sections
      </Heading>
      <CommentForm postId={postId} onAddComment={handleAddComment} />
      {isLoading ? (
        <Flex justify="center">
          <Spinner />
        </Flex>
      ) : (
        <CommentList
          comments={comments}
          onDeleteComment={handleDeleteComment}
        />
      )}
    </Box>
  );
};

export default CommentsSection;
