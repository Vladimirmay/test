import { Container, Typography } from "@mui/material";
import { useState } from "react";
import CommentForm from "./components/CommentForm";
import CommentList from "./components/CommentList";
import { Comment } from "./types/comment";

export default function App() {
  const [comments, setComments] = useState<Comment[]>([]);

  const handleCommentSubmit = (
    newComment: Omit<Comment, "id" | "rating" | "isCollapsed" | "timestamp">
  ) => {
    const comment: Comment = {
      ...newComment,
      id: Date.now().toString(),
      rating: 0,
      isCollapsed: false,
      timestamp: new Date(),
    };

    setComments((prev) => [comment, ...prev]);
  };

  const handleRatingChange = (id: string, change: number) => {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === id) {
          if (change === 0) {
            return { ...comment, isCollapsed: false };
          }
          const newRating = comment.rating + change;
          return {
            ...comment,
            rating: newRating,
            isCollapsed: newRating <= -10,
          };
        }
        return comment;
      })
    );
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        textAlign="center"
        sx={{ mb: 4, fontWeight: "bold" }}
      >
        Комментарии
      </Typography>
      <CommentForm onSubmit={handleCommentSubmit} />
      <CommentList comments={comments} onRatingChange={handleRatingChange} />
    </Container>
  );
}
