// HelpDialog.tsx
import React from 'react';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, Typography, List, ListItem, ListItemIcon, ListItemText, 
  Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon, Info as InfoIcon } from '@mui/icons-material';

interface HelpDialogProps {
  open: boolean;
  onClose: () => void;
}
export const HelpDialog: React.FC<HelpDialogProps> = ({ open, onClose }) => {
    const helpSections = [
      {
        title: 'Getting Started',
        content: [
          'Fill out the form step by step',
          'Navigate through sections using the Next and Back buttons',
          'Ensure all required fields are completed',
          'Generate your property description when finished'
        ]
      },
      {
        title: 'Form Sections',
        content: [
          'Basic Information: Enter general property details',
          'Features: Specify property condition and special features',
          'Location & Environment: Describe the property\'s surroundings',
          'Price & Conditions: Set pricing and additional terms'
        ]
      },
      {
        title: 'Generating Descriptions',
        content: [
          'Click "Generate Description" on the final step',
          'Review the generated description',
          'Edit the description if needed',
          'Copy the description to your clipboard'
        ]
      },
      {
        title: 'Saving and Loading Forms',
        content: [
          'Save your form progress using the Save button',
          'Give your saved form a unique name',
          'Load previously saved forms to continue editing',
          'Update saved forms as needed'
        ]
      }
    ];
  
    return (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="help-dialog-title"
        aria-describedby="help-dialog-description"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle id="help-dialog-title">Help & Instructions</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Welcome to the Property Description Generator! Here's a quick guide on how to use it:
          </Typography>
          {helpSections.map((section, index) => (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}a-content`}
                id={`panel${index}a-header`}
              >
                <Typography>{section.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {section.content.map((item, itemIndex) => (
                    <ListItem key={itemIndex}>
                      <ListItemIcon>
                        <InfoIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary" variant="contained">
            Got it
          </Button>
        </DialogActions>
      </Dialog>
    );
  };