import React, { useState, useEffect } from 'react';
import {
  Box, Drawer, List, ListItem, ListItemText, IconButton, Typography,
  Divider, Button, useTheme, useMediaQuery, Avatar, ListItemAvatar,
  TextField, InputAdornment, Chip, Tooltip, CircularProgress
} from '@mui/material';
import {
  ChevronRight as ChevronRightIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Search as SearchIcon,
  AccessTime as AccessTimeIcon,
  Home as HomeIcon
} from '@mui/icons-material';

interface SavedDescription {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  onEdit: (description: SavedDescription) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose, onEdit, onDelete, onAdd }) => {
  const [descriptions, setDescriptions] = useState<SavedDescription[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchDescriptions = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/descriptions');
        if (!response.ok) {
          throw new Error('Failed to fetch descriptions');
        }
        const data = await response.json();
        setDescriptions(data);
      } catch (error) {
        console.error('Error fetching descriptions:', error);
        setError('Failed to load descriptions. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchDescriptions();
    }
  }, [open]);

  const filteredDescriptions = descriptions.filter(desc =>
    desc.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(diffInSeconds / secondsInUnit);
      if (interval >= 1) {
        return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
      }
    }
    return 'just now';
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      variant={isMobile ? "temporary" : "persistent"}
      sx={{
        width: 350,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 350,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
        <Typography variant="h6">Saved Descriptions</Typography>
        <IconButton onClick={onClose}>
          <ChevronRightIcon />
        </IconButton>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search descriptions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box sx={{ p: 2, color: 'error.main' }}>
          <Typography>{error}</Typography>
        </Box>
      ) : (
        <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
          {filteredDescriptions.map((description) => (
            <ListItem
              key={description._id}
              sx={{
                flexDirection: 'column',
                alignItems: 'stretch',
                mb: 2,
                backgroundColor: theme.palette.background.paper,
                borderRadius: 2,
                boxShadow: 1,
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <ListItemAvatar>
                  <Avatar>
                    <HomeIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={description.title}
                  secondary={
                    <React.Fragment>
                      <Tooltip title={new Date(description.updatedAt).toLocaleString()}>
                        <Chip
                          icon={<AccessTimeIcon />}
                          label={getTimeAgo(description.updatedAt)}
                          size="small"
                          sx={{ mt: 0.5 }}
                        />
                      </Tooltip>
                    </React.Fragment>
                  }
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                <IconButton onClick={() => onEdit(description)} color="primary" size="small">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(description._id)} color="secondary" size="small">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
      )}
      <Divider />
      <Box sx={{ p: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          fullWidth
          onClick={onAdd}
        >
          Add New Description
        </Button>
      </Box>
    </Drawer>
  );
};

export default Sidebar;