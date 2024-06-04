export interface Comment {
  id: number;
  content: string;
  post_id: number;
  created_at: Date;
  updated_at: Date;
}

export default Comment;
