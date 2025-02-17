import React from "react";
import { Box, TextField, Button, Alert } from "@mui/material";
import { Comment } from "../types/comment";

interface CommentFormProps {
  onSubmit: (
    comment: Omit<Comment, "id" | "rating" | "isCollapsed" | "timestamp">
  ) => void;
}

export default function CommentForm({ onSubmit }: CommentFormProps) {
  const [author, setAuthor] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [text, setText] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!author.trim() || !email.trim() || !text.trim()) {
      setError("Пожалуйста, заполните все поля");
      return;
    }

    if (!validateEmail(email)) {
      setError("Пожалуйста, введите корректный email");
      return;
    }

    onSubmit({
      author: author.trim(),
      email: email.trim(),
      text: text.trim(),
    });

    setAuthor("");
    setEmail("");
    setText("");
    setError(null);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 600,
        mx: "auto",
        p: 3,
        backgroundColor: "background.paper",
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <TextField
        label="Имя"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        fullWidth
        variant="outlined"
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        variant="outlined"
      />
      <TextField
        label="Комментарий"
        value={text}
        onChange={(e) => setText(e.target.value)}
        fullWidth
        multiline
        rows={4}
        variant="outlined"
      />
      {error && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {error}
        </Alert>
      )}
      <Button
        type="submit"
        variant="contained"
        sx={{
          mt: 2,
          bgcolor: "primary.main",
          "&:hover": {
            bgcolor: "primary.dark",
          },
        }}
      >
        Отправить
      </Button>
    </Box>
  );
}
