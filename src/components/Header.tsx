import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  useMediaQuery, 
  useTheme, 
  Box 
} from '@mui/material';
import { 
  Menu as MenuIcon, 
  Home as HomeIcon, 
  Info as InfoIcon, 
  ContactSupport as ContactSupportIcon 
} from '@mui/icons-material';

interface HeaderProps {
  onOpenSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenSidebar }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Toolbar>
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onOpenSidebar}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Immobilien-Beschreibungsgenerator
        </Typography>
        {!isMobile && (
          <Box>
            <Button color="inherit" startIcon={<HomeIcon />}>
              Startseite
            </Button>
            <Button color="inherit" startIcon={<InfoIcon />}>
              Über uns
            </Button>
            <Button color="inherit" startIcon={<ContactSupportIcon />}>
              Kontakt
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;