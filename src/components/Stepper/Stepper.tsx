import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import styles from './Stepper.module.scss';

type StepIndicatorProps = {
  steps: number[];
  currentStep: number;
};

const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
}) => {
  return (
    <div className={styles.stepIndicatorContainer}>
      {steps.map((step, index) => (
        <div key={step} className={styles.stepWrapper}>
          <div
            className={clsx(
              styles.stepNumber,
              currentStep >= step ? styles.active : styles.inactive,
              currentStep === step ? styles.current : styles.notCurrent
            )}
          >
            {step}
          </div>
          {index < steps.length - 1 && (
            <div
              className={clsx(
                styles.stepLine,
                currentStep > step ? styles.activeLine : ''
              )}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

interface StepperProps {
  steps: {
    disable?: boolean;
    content: React.ReactNode;
  }[];
  startStep?: number;
}

export const Stepper = ({ steps, startStep }: StepperProps) => {
  const totalSteps = steps.length;
  const [activeStep, setActiveStep] = useState<number>(startStep || 1);

  useEffect(() => {
    if (startStep) {
      setActiveStep(startStep);
    }
  }, [startStep]);

  const handleNext = (): void => {
    if (activeStep < totalSteps) {
      setActiveStep((currentStep) => currentStep + 1);
    }
  };

  const handleBack = (): void => {
    if (activeStep > 1) {
      setActiveStep((currentStep) => currentStep - 1);
    }
  };

  return (
    <div className={styles.stepperContainer}>
      <StepIndicator
        steps={steps.map((_, i) => i + 1)}
        currentStep={activeStep}
      />
      <div className={styles.stepContent}>{steps[activeStep - 1].content}</div>
      <div className={styles.stepperControls}>
        <button
          className={styles.stepperButton}
          onClick={handleBack}
          disabled={activeStep === 1}
        >
          Vissza
        </button>
        <button
          className={styles.stepperButton}
          onClick={handleNext}
          disabled={activeStep === totalSteps || steps[activeStep - 1].disable}
        >
          Következő
        </button>
      </div>
    </div>
  );
};
