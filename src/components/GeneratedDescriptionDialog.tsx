import React, { useState, useEffect, useRef } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, IconButton, styled, Paper,
  Tabs, Tab, Box, Tooltip, Divider,
  Menu, MenuItem, ListItemIcon, ListItemText,
  useTheme, useMediaQuery
} from '@mui/material';
import { 
  Close as CloseIcon, 
  ContentCopy as ContentCopyIcon, 
  Edit as EditIcon,
  Save as SaveIcon,
  History as HistoryIcon,
  CompareArrows as CompareIcon,
  GetApp as ExportIcon,
  Undo as UndoIcon,
  Redo as RedoIcon,
  Share as ShareIcon,
  Print as PrintIcon,
  Delete as DeleteIcon,
  DriveFileRenameOutline as RenameIcon,
  Assessment as AssessmentIcon  
} from '@mui/icons-material';
import { jsPDF } from "jspdf";
import DOMPurify from 'dompurify';
import { Editor } from '@tinymce/tinymce-react';
import { AnimatePresence, motion } from 'framer-motion';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2),},
}));

const DescriptionPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  transition: 'box-shadow 0.3s',
  '&:hover': {
    boxShadow: theme.shadows[8],
  },
  '& h2': {
    marginTop: 0,
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  '& ul': {
    paddingLeft: theme.spacing(4),
  },
}));

interface DescriptionVersion {
  id: number;
  content: string;
  timestamp: Date;
  author?: string;
  notes?: string;
}

interface GeneratedDescriptionDialogProps {
  open: boolean;
  onClose: () => void;
  description: string;
  onCopy: () => void;
  onSave: (description: string) => void;
}

export const GeneratedDescriptionDialog: React.FC<GeneratedDescriptionDialogProps> = ({
  open,
  onClose,
  description,
  onCopy,
  onSave
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const editorRef = useRef<any>(null);

  const [editMode, setEditMode] = useState(false);
  const [editedDescription, setEditedDescription] = useState('');
  const [versions, setVersions] = useState<DescriptionVersion[]>([]);
  const [currentVersionIndex, setCurrentVersionIndex] = useState(0);
  const [compareMode, setCompareMode] = useState(false);
  const [seoAnalysis, setSeoAnalysis] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    if (description && (!versions.length || versions[0].content !== description)) {
      setVersions(prev => [{
        id: prev.length + 1,
        content: description,
        timestamp: new Date(),
        author: 'AI'
      }, ...prev]);
    }
    setEditedDescription(description || '');
  }, [description]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.getContent().toString();
      const newVersion: DescriptionVersion = {
        id: versions.length + 1,
        content: newContent,
        timestamp: new Date(),
        author: 'User'
      };
      setVersions([newVersion, ...versions]);
      setCurrentVersionIndex(0);
      setEditMode(false);
      onSave(newVersion.content);
    }
  };

  const handleUndo = () => {
    if (currentVersionIndex < versions.length - 1) {
      setCurrentVersionIndex(currentVersionIndex + 1);
      setEditedDescription(versions[currentVersionIndex + 1].content);
    }
  };

  const handleRedo = () => {
    if (currentVersionIndex > 0) {
      setCurrentVersionIndex(currentVersionIndex - 1);
      setEditedDescription(versions[currentVersionIndex - 1].content);
    }
  };

  const handleVersionChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentVersionIndex(newValue);
    setEditedDescription(versions[newValue].content);
  };

  const handleCompareToggle = () => {
    setCompareMode(!compareMode);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const sanitizedContent = DOMPurify.sanitize(editedDescription);
    const lines = doc.splitTextToSize(sanitizedContent, doc.internal.pageSize.getWidth() - 20);
    doc.text(lines, 10, 10);
    doc.save("property_description.pdf");
  };

  const handleExportWord = () => {
    const html = `<html><head><meta charset="UTF-8"></head><body>${editedDescription}</body></html>`;
    const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'property_description.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportHTML = () => {
    const blob = new Blob([editedDescription], { type: 'text/html' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = "property_description.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = () => {
    const url = `${window.location.origin}/property-description/${versions[currentVersionIndex].id}`;
    if (navigator.share) {
      navigator.share({
        title: 'Property Description',
        text: 'Check out this property description',
        url: url
      });
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow?.document.open();
    printWindow?.document.write(`<html><head><title>Print Property Description</title></head><body>${editedDescription}</body></html>`);
    printWindow?.document.close();
    printWindow?.print();
  };

  const handleDeleteVersion = (versionId: number) => {
    setVersions(versions.filter(v => v.id !== versionId));
    setCurrentVersionIndex(0);
  };

  const handleRenameVersion = (versionId: number, newNotes: string) => {
    setVersions(versions.map(v => v.id === versionId ? { ...v, notes: newNotes } : v));
  };

  const handleSEOAnalysis = () => {
    const keywords = editedDescription.toLowerCase().split(' ');
    const keywordCount = keywords.reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const sortedKeywords = Object.entries(keywordCount).sort((a, b) => b[1] - a[1]);
    const topKeywords = sortedKeywords.slice(0, 5).map(([keyword, count]) => `${keyword}: ${count}`).join('\n');
    setSeoAnalysis(`Top 5 keywords:\n${topKeywords}`);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle id="customized-dialog-title">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Generated Property Description
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={currentVersionIndex} onChange={handleVersionChange} variant="scrollable" scrollButtons="auto">
            <AnimatePresence>
              {versions.map((version) => (
                <Tab 
                  key={version.id} 
                  label={
                    <div>
                      <Typography variant="body2">V{version.id}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {new Date(version.timestamp).toLocaleString()} {version.author}
                      </Typography>
                      {version.notes && <Typography variant="caption" color="textSecondary">{version.notes}</Typography>}
                    </div>
                  } 
                  icon={<HistoryIcon />} 
                  component={motion.div}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              ))}
            </AnimatePresence>
          </Tabs>
        </Box>
        {compareMode ? (
          <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} justifyContent="space-between" alignItems="stretch" gap={isMobile ? 2 : 4}>
            <DescriptionPaper elevation={3} sx={{ width: isMobile ? '100%' : '48%' }}>
              <Typography variant="h6" gutterBottom>Original</Typography>
              <Typography variant="body1" style={{ whiteSpace: 'pre-line' }}>
                {versions.length > 0 ? versions[versions.length - 1].content : ''}
              </Typography>
            </DescriptionPaper>
            {!isMobile && <Divider orientation="vertical" flexItem />}
            <DescriptionPaper elevation={3} sx={{ width: isMobile ? '100%' : '48%' }}>
              <Typography variant="h6" gutterBottom>Current</Typography>
              <Typography variant="body1" style={{ whiteSpace: 'pre-line' }}>
                {editedDescription}
              </Typography>
            </DescriptionPaper>
          </Box>
        ) : editMode ? (
          <Editor
            apiKey="your_api_key"
            onInit={(evt, editor) => {
              if (editorRef.current) {
                editorRef.current = editor;
              }
            }}
            initialValue={editedDescription}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
          />
        ) : (
          <DescriptionPaper elevation={3}>
            <Typography variant="body1" style={{ whiteSpace: 'pre-line' }}>
              {editedDescription}
            </Typography>
          </DescriptionPaper>
        )}
        {seoAnalysis && (
          <Paper elevation={3} sx={{ mt: 3, p: 3 }}>
            <Typography variant="h6" gutterBottom>SEO Analysis</Typography>
            <pre>{seoAnalysis}</pre>
          </Paper>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
        {editMode ? (
          <>
            <Button onClick={handleUndo} disabled={currentVersionIndex === versions.length - 1} startIcon={<UndoIcon />}>
              Undo
            </Button>
            <Button onClick={handleRedo} disabled={currentVersionIndex === 0} startIcon={<RedoIcon />}>
              Redo
            </Button>
            <Button onClick={handleSave} variant="contained" color="primary" startIcon={<SaveIcon />}>
              Save
            </Button>
          </>
        ) : (
          <>
            <Button onClick={handleEdit} variant="outlined" color="primary" startIcon={<EditIcon />}>
              Edit
            </Button>
            <Button onClick={handleCompareToggle} variant="outlined" color="primary" startIcon={<CompareIcon />}>
              {compareMode ? 'Exit Compare' : 'Compare'}
            </Button>
            <Button onClick={onCopy} color="secondary" startIcon={<ContentCopyIcon />}>
              Copy
            </Button>
            <Button onClick={handleMenuOpen} variant="outlined" color="primary" startIcon={<ExportIcon />}>
              Export
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => { handleExportPDF(); handleMenuClose(); }}>
                <ListItemIcon>
                  <ExportIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Export as PDF</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => { handleExportWord(); handleMenuClose(); }}>
                <ListItemIcon>
                  <ExportIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Export as Word</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => { handleExportHTML(); handleMenuClose(); }}>
                <ListItemIcon>
                  <ExportIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Export as HTML</ListItemText>
              </MenuItem>
            </Menu>
            <Button onClick={handleShare} variant="outlined" color="primary" startIcon={<ShareIcon />}>
              Share
            </Button>
            <Button onClick={handlePrint} variant="outlined" color="primary" startIcon={<PrintIcon />}>
              Print
            </Button>
            <Button
              onClick={() => handleDeleteVersion(versions[currentVersionIndex].id)}
              variant="outlined"
              color="secondary"
              startIcon={<DeleteIcon />}
              disabled={versions.length === 1}
            >
              Delete Version
            </Button>
            <Button
              onClick={() => {
                const newNotes = prompt('Enter new notes for this version:', versions[currentVersionIndex].notes);
                if (newNotes !== null) {
                  handleRenameVersion(versions[currentVersionIndex].id, newNotes);
                }
              }}
              variant="outlined"
              color="secondary"
              startIcon={<RenameIcon />}
            >
              Rename Version
            </Button>
            <Button onClick={handleSEOAnalysis} variant="contained" color="primary" startIcon={<AssessmentIcon/>}>
              SEO Analysis
            </Button>
          </>
        )}
      </DialogActions>
    </StyledDialog>
  );
};

export default GeneratedDescriptionDialog;