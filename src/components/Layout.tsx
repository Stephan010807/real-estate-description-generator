'use client'

// src/components/Layout.tsx
import { Box, Container } from "@mui/material";
import { ReactNode } from "react";
import { motion } from "framer-motion";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#F5F5F5",
        display: "flex",
        flexDirection: "column",
        color: "#333333",
      }}
    >
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundColor: "#3A506B",
          padding: "20px",
          color: "#FFFFFF",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "32px", margin: 0 }}>Immobilienbeschreibung Generator</h1>
      </motion.header>
      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
        {children}
      </Container>
      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundColor: "#333333",
          padding: "20px",
          color: "#FFFFFF",
          textAlign: "center",
        }}
      >
        © 2024 Immobilien Tool
      </motion.footer>
    </Box>
  );
}
