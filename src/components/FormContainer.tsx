'use client'

import React, { useState, useCallback } from 'react';
import { 
  Box, Button, Typography, ThemeProvider, CssBaseline, 
  Stepper, Step, StepLabel, StepContent, Paper, useMediaQuery,
  CircularProgress, Snackbar, Alert, AlertColor, Fab, Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { 
  ArrowBack as ArrowBackIcon, 
  ArrowForward as ArrowForwardIcon,
  Help as HelpIcon,
  Save as SaveIcon,
  Check as CheckIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

import { theme } from './theme';
import { schema, FormData } from './types';
import { FormStep } from './FormStep';
import { GeneratedDescriptionDialog } from './GeneratedDescriptionDialog';
import { SaveFormDialog } from './SaveFormDialog';
import { HelpDialog } from './HelpDialog';
import Header from './Header';

const steps = [
  { label: 'Grundinformationen', description: 'Geben Sie die grundlegenden Details der Immobilie ein.' },
  { label: 'Merkmale', description: 'Beschreiben Sie die wichtigsten Eigenschaften und Annehmlichkeiten der Immobilie.' },
  { label: 'Lage & Umgebung', description: 'Geben Sie Informationen über die Umgebung der Immobilie an.' },
  { label: 'Preis & Konditionen', description: 'Spezifizieren Sie die finanziellen Aspekte und Bedingungen der Immobilie.' },
];

const StyledStepper = styled(Stepper)(({ theme }) => ({
  '& .MuiStepConnector-line': {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    borderLeftWidth: 3,
    minHeight: 50,
  },
  '& .MuiStepConnector-root.Mui-active .MuiStepConnector-line': {
    borderColor: theme.palette.secondary.main,
  },
  '& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line': {
    borderColor: theme.palette.primary.main,
  },
}));

export const EnhancedPropertyForm: React.FC = () => {
  const methods = useForm<FormData>({
    resolver: yupResolver(schema) as any,
    mode: 'onChange',
    defaultValues: {
      propertyType: '',
      rooms: null,
      size: null,
      location: '',
      yearBuilt: null,
      condition: '',
      furnishing: '',
      specialFeatures: [],
      neighborhood: '',
      energyEfficiency: '',
      orientation: '',
      floor: null,
      parking: '',
      price: null,
      saleOrRent: '',
      transport: '',
      petsAllowed: '',
      balconyOrTerrace: '',
      garden: '',
      additionalInfo: '',
    }
  });

  const { handleSubmit, control } = methods;

  const [activeStep, setActiveStep] = useState(0);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [openDescriptionDialog, setOpenDescriptionDialog] = useState(false);
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [openHelpDialog, setOpenHelpDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as AlertColor });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleNext = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }, []);

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }, []);

  const onSubmit = useCallback(async (data: FormData) => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Netzwerkantwort war nicht in Ordnung');
      }

      const result = await response.json();
      setDescription(result.description.content || '');
      setOpenDescriptionDialog(true);
    } catch (error) {
      console.error('Fehler beim Generieren der Beschreibung:', error);
      setSnackbar({ open: true, message: 'Fehler beim Generieren der Beschreibung. Bitte versuchen Sie es erneut.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSaveForm = useCallback(async (name: string) => {
    try {
      const formData = methods.getValues();
      const response = await fetch("/api/descriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: name, content: description, ...formData }),
      });

      if (!response.ok) {
        throw new Error('Fehler beim Speichern der Beschreibung');
      }

      setSnackbar({ open: true, message: 'Beschreibung erfolgreich gespeichert', severity: 'success' });
      setOpenSaveDialog(false);
    } catch (error) {
      console.error('Fehler beim Speichern der Beschreibung:', error);
      setSnackbar({ open: true, message: 'Fehler beim Speichern der Beschreibung. Bitte versuchen Sie es erneut.', severity: 'error' });
    }
  }, [description, methods]);

  const handleSidebarToggle = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header onOpenSidebar={handleSidebarToggle} />
      <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4, p: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h4" gutterBottom align="center" color="primary" sx={{ mb: 4 }}>
            Immobilien-Informationsformular
          </Typography>
        </motion.div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <StyledStepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel>
                    <Typography variant="h6">{step.label}</Typography>
                  </StepLabel>
                  <StepContent>
                    <Typography>{step.description}</Typography>
                    <Box sx={{ mt: 2 }}>
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.5 }}
                      >
                        <FormStep step={index} control={control} />
                      </motion.div>
                      <Box sx={{ mb: 2, mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                          disabled={index === 0}
                          onClick={handleBack}
                          startIcon={<ArrowBackIcon />}
                        >
                          Zurück
                        </Button>
                        <Button
                          variant="contained"
                          onClick={index === steps.length - 1 ? handleSubmit(onSubmit) : handleNext}
                          endIcon={index === steps.length - 1 ? <CheckIcon /> : <ArrowForwardIcon />}
                        >
                          {index === steps.length - 1 ? 'Fertig' : 'Weiter'}
                        </Button>
                      </Box>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </StyledStepper>
            {activeStep === steps.length && (
              <Paper square elevation={0} sx={{ p: 3 }}>
                <Typography>Alle Schritte abgeschlossen - Sie sind fertig</Typography>
                <Button onClick={handleSubmit(onSubmit)} sx={{ mt: 1, mr: 1 }}>
                  Beschreibung generieren
                </Button>
                <Button onClick={() => setActiveStep(0)} sx={{ mt: 1, mr: 1 }}>
                  Zurücksetzen
                </Button>
              </Paper>
            )}
          </form>
        </FormProvider>

        <GeneratedDescriptionDialog 
          open={openDescriptionDialog}
          onClose={() => setOpenDescriptionDialog(false)}
          description={description}
          onCopy={() => {
            navigator.clipboard.writeText(description);
            setSnackbar({ open: true, message: 'Beschreibung in die Zwischenablage kopiert', severity: 'success' });
          }}
          onSave={(description: string) => {
            setOpenSaveDialog(true);
            setDescription(description);
          }}
        />

        <SaveFormDialog 
          open={openSaveDialog}
          onClose={() => setOpenSaveDialog(false)}
          onSave={handleSaveForm}
        />

        <HelpDialog 
          open={openHelpDialog}
          onClose={() => setOpenHelpDialog(false)}
        />

        <Snackbar 
          open={snackbar.open} 
          autoHideDuration={6000} 
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>

        <Tooltip title="Hilfe">
          <Fab color="primary" aria-label="help" sx={{ position: 'fixed', bottom: isMobile ? 16 : 32, right: isMobile ? 16 : 32 }} onClick={() => setOpenHelpDialog(true)}>
            <HelpIcon />
          </Fab>
        </Tooltip>

        <Tooltip title="Formular speichern">
          <Fab color="secondary" aria-label="save" sx={{ position: 'fixed', bottom: isMobile ? 80 : 96, right: isMobile ? 16 : 32 }} onClick={() => setOpenSaveDialog(true)}>
            <SaveIcon />
          </Fab>
        </Tooltip>
      </Box>

      {loading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
          }}
        >
          <CircularProgress color="primary" size={60} />
        </Box>
      )}
    </ThemeProvider>
  );
};

export default EnhancedPropertyForm;