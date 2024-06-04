import React from "react";
import { Box } from "@chakra-ui/react";
import Comment from "../../../interfaces/Comment";
import CommentDetail from "./CommentDetail";

interface CommentListProps {
  comments: Comment[];
  onDeleteComment: (id: number) => void;
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  onDeleteComment,
}) => {
  return (
    <Box mt={4}>
      {comments.map((comment) => (
        <CommentDetail
          key={comment.id}
          {...comment}
          onDeleteComment={() => onDeleteComment(comment.id)}
        />
      ))}
    </Box>
  );
};

export default CommentList;
