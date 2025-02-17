import React, { useState, useCallback } from "react";
import { Box, TextField, Button, Alert } from "@mui/material";
import { Comment } from "../types/comment";

interface CommentFormProps {
  onSubmit: (
    comment: Omit<Comment, "id" | "rating" | "isCollapsed" | "timestamp">
  ) => void;
}

export default function CommentForm({ onSubmit }: CommentFormProps) {
  const [formData, setFormData] = useState({ author: "", email: "", text: "" });
  const [error, setError] = useState<string | null>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const { author, email, text } = formData;

      if (!author || !email || !text) {
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

      setFormData({ author: "", email: "", text: "" });
      setError(null);
    },
    [formData, onSubmit]
  );

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
        name="author"
        value={formData.author}
        onChange={handleChange}
        fullWidth
        variant="outlined"
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        variant="outlined"
      />
      <TextField
        label="Комментарий"
        name="text"
        value={formData.text}
        onChange={handleChange}
        fullWidth
        multiline
        rows={4}
        variant="outlined"
      />
      {error && <Alert severity="error">{error}</Alert>}
      <Button
        type="submit"
        variant="contained"
        sx={{
          mt: 2,
          bgcolor: "primary.main",
          "&:hover": { bgcolor: "primary.dark" },
        }}
      >
        Отправить
      </Button>
    </Box>
  );
}
