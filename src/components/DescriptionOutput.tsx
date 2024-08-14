// src/components/DescriptionOutput.tsx
import { Typography, Box } from "@mui/material";
import { motion } from "framer-motion";

interface DescriptionOutputProps {
  description: string;
}

export default function DescriptionOutput({
  description,
}: DescriptionOutputProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ marginTop: "30px" }}
    >
      <Box mt={4}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
          Generierte Beschreibung
        </Typography>
        <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
          {description || "Keine Beschreibung verfügbar."}
        </Typography>
      </Box>
    </motion.div>
  );
}
