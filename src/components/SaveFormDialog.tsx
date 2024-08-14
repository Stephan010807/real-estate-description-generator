// SaveFormDialog.tsx
import React, { useState } from 'react';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, TextField, Typography
} from '@mui/material';

interface SaveFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
}

export const SaveFormDialog: React.FC<SaveFormDialogProps> = ({
  open,
  onClose,
  onSave
}) => {
  const [formName, setFormName] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (formName.trim() === '') {
      setError('Please enter a name for your form');
      return;
    }
    onSave(formName);
    setFormName('');
    setError('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Save Form</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="textSecondary" paragraph>
          Save your current form data for future use. You can load it later to continue where you left off.
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Form Name"
          type="text"
          fullWidth
          value={formName}
          onChange={(e) => {
            setFormName(e.target.value);
            setError('');
          }}
          error={!!error}
          helperText={error}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};