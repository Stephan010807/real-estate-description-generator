import React, { useState, useEffect } from 'react';
import { 
  Box, Paper, Typography, Button, List, ListItem, ListItemText, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

interface SavedDescription {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const SavedDescriptions: React.FC = () => {
  const [descriptions, setDescriptions] = useState<SavedDescription[]>([]);
  const [selectedDescription, setSelectedDescription] = useState<SavedDescription | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    // Fetch saved descriptions from localStorage or API
    const savedDescriptions = JSON.parse(localStorage.getItem('savedDescriptions') || '[]');
    setDescriptions(savedDescriptions);
  }, []);

  const handleDelete = (id: string) => {
    const updatedDescriptions = descriptions.filter(desc => desc.id !== id);
    setDescriptions(updatedDescriptions);
    localStorage.setItem('savedDescriptions', JSON.stringify(updatedDescriptions));
  };

  const handleEdit = (description: SavedDescription) => {
    setSelectedDescription(description);
    setOpenDialog(true);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>Saved Descriptions</Typography>
      <List>
        {descriptions.map(description => (
          <ListItem key={description.id} sx={{ marginBottom: 2 }}>
            <Paper sx={{ padding: 2, width: '100%' }}>
              <ListItemText 
                primary={description.title}
                secondary={`Created: ${new Date(description.createdAt).toLocaleString()} - Updated: ${new Date(description.updatedAt).toLocaleString()}`}
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton onClick={() => handleEdit(description)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(description.id)} color="secondary">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Paper>
          </ListItem>
        ))}
      </List>

      {/* Dialog for Viewing/Editing Description */}
      {selectedDescription && (
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
          <DialogTitle>{selectedDescription.title}</DialogTitle>
          <DialogContent>
            <Typography variant="body1">{selectedDescription.description}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Close</Button>
            <Button onClick={() => { /* Logic to save the edited description */ }} color="primary">Save</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default SavedDescriptions;
