// ProgressBar.tsx
import React from 'react';
import { Box, Typography, LinearProgress, styled } from '@mui/material';

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.MuiLinearProgress-colorPrimary`]: {
    backgroundColor: theme.palette.grey[200],
  },
  [`& .MuiLinearProgress-bar`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.secondary.main,
  },
}));

interface ProgressBarProps {
  completion: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ completion }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="h6">Progress</Typography>
        <Typography variant="body2" color="text.secondary">
          {`${Math.round(completion)}% completed`}
        </Typography>
      </Box>
      <StyledLinearProgress variant="determinate" value={completion} />
    </Box>
  );
};