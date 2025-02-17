import { Box, Typography } from "@mui/material";
import CommentItem from "./CommentItem";
import { Comment } from "../types/comment";

interface CommentListProps {
  comments: Comment[];
  onRatingChange: (id: string, change: number) => void;
}

export default function CommentList({ comments, onRatingChange }: CommentListProps) {
  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      {comments.length === 0 ? (
        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          sx={{ py: 4 }}
        >
          Пока нет комментариев. Будьте первым!
        </Typography>
      ) : (
        comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onRatingChange={onRatingChange}
          />
        ))
      )}
    </Box>
  );
}
