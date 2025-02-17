import { Box, Typography, IconButton, Avatar, Collapse, Button } from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { Comment } from "../types/comment";
import { formatTimeAgo } from "../utils/timeUtils";

interface CommentItemProps {
  comment: Comment;
  onRatingChange: (id: string, change: number) => void;
}

export default function CommentItem({ comment, onRatingChange }: CommentItemProps) {
  const handleRatingChange = (change: number) => {
    onRatingChange(comment.id, change);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 2,
        mb: 2,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 1,
        transition: "all 0.3s ease",
      }}
    >
      {comment.rating < -10 && comment.isCollapsed ? (
        <Button
          onClick={() => onRatingChange(comment.id, 0)}
          sx={{ textAlign: "left", justifyContent: "flex-start" }}
        >
          Открыть комментарий
        </Button>
      ) : (
        <Collapse in={true}>
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
            <Avatar sx={{ bgcolor: "primary.main" }}>
              {comment.author[0].toUpperCase()}
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <Typography variant="subtitle1" component="span" fontWeight="bold">
                  {comment.author}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatTimeAgo(comment.timestamp)}
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {comment.text}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => handleRatingChange(1)}
                  sx={{ color: "success.main" }}
                >
                  <AddIcon />
                </IconButton>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    color:
                      comment.rating > 0
                        ? "success.main"
                        : comment.rating < 0
                        ? "error.main"
                        : "text.primary",
                  }}
                >
                  {comment.rating}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => handleRatingChange(-1)}
                  sx={{ color: "error.main" }}
                >
                  <RemoveIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Collapse>
      )}
    </Box>
  );
}
