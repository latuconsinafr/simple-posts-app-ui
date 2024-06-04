import React, { useEffect, useState } from "react";
import { Box, Text, Heading, Button, Divider } from "@chakra-ui/react";
import { useParams, Link } from "react-router-dom";
import { fetchPost } from "../../services/Post";
import Post from "../../interfaces/Post";
import CommentsSection from "./Comments/CommentSection";

const PostDetail: React.FC = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const getPost = async () => {
      const data = await fetchPost(Number(id));
      setPost(data);
    };

    getPost();
  }, [id]);

  if (!post) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box>
      <Heading as="h3" size="md" mb={4}>
        View Detail of Post
      </Heading>
      <Box bg="gray.100" p={4} borderRadius="md" boxShadow="md" mb={4}>
        <Text my={4}>
          <strong>ID:</strong> {post.id}
        </Text>
        <Text my={4}>
          <strong>Title:</strong> {post.title}
        </Text>
        <Text my={4}>
          <strong>Content:</strong> {post.content}
        </Text>
        <Text my={4}>
          <strong>Created At:</strong> {new Date(post.created_at).toLocaleString()}
        </Text>
        <Text my={4}>
          <strong>Updated At:</strong> {new Date(post.updated_at).toLocaleString()}
        </Text>
      </Box>
      <Divider my={8} />
      <CommentsSection postId={post.id} />
      <Box display="flex" justifyContent="flex-end" mb={4}>
        <Button as={Link} to="/dashboard/posts" colorScheme="blue" size="sm">
          Back
        </Button>
      </Box>
    </Box>
  );
};

export default PostDetail;
