// CustomStepper.tsx
import React from 'react';
import { Stepper, Step, StepLabel, styled } from '@mui/material';

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.grey[300],
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

interface StepItem {
  label: string;
  icon: React.ReactNode;
}

interface CustomStepperProps {
  steps: StepItem[];
  activeStep: number;
}

export const CustomStepper: React.FC<CustomStepperProps> = ({ steps, activeStep }) => {
  return (
    <Stepper alternativeLabel activeStep={activeStep}>
      {steps.map((step, index) => (
        <Step key={step.label}>
          <StepLabel
            StepIconComponent={(props) => (
              <ColorlibStepIconRoot ownerState={{ completed: props.completed, active: props.active }}>
                {step.icon}
              </ColorlibStepIconRoot>
            )}
          >
            {step.label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};