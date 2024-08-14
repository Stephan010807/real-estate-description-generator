// FeatureCard.tsx
import React from 'react';
import { Paper, Typography, styled } from '@mui/material';
import { SpeedOutlined, AutoAwesomeOutlined, EditOutlined } from '@mui/icons-material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1), 0 15px 12px rgba(0,0,0,0.08)',
  },
}));

const IconWrapper = styled('div')(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: '50%',
  backgroundColor: theme.palette.secondary.light,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
    transform: 'scale(1.1)',
  },
}));

interface FeatureCardProps {
  title: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ title }) => {
  const getIcon = (title: string) => {
    switch (title) {
      case 'Fast Generation':
        return <SpeedOutlined fontSize="large" />;
      case 'AI-Powered':
        return <AutoAwesomeOutlined fontSize="large" />;
      case 'Customizable':
        return <EditOutlined fontSize="large" />;
      default:
        return '';
    }
  };

  const getDescription = (title: string) => {
    switch (title) {
      case 'Fast Generation':
        return 'Get professional property descriptions in seconds';
      case 'AI-Powered':
        return 'Leverage cutting-edge AI technology for compelling descriptions';
      case 'Customizable':
        return 'Edit and refine generated descriptions to your liking';
      default:
        return '';
    }
  };

  return (
    <StyledPaper elevation={3}>
      <IconWrapper>
        {getIcon(title)}
      </IconWrapper>
      <Typography variant="h6" component="h3" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {getDescription(title)}
      </Typography>
    </StyledPaper>
  );
};
