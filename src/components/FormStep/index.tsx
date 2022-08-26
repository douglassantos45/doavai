import { useEffect, useState } from 'react';
import { useForm } from '../../contexts/FormStepContext';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

export default function FormStep() {
  const { state } = useForm();
  const [formStep, setFormStep] = useState(state.currentStep);

  useEffect(() => {
    setFormStep(state.currentStep);
  }, [state.currentStep]);

  switch (formStep) {
    case 1:
      return <Step1 />;
    case 2:
      return <Step2 />;
    case 3:
      return <Step3 />;
    default:
      break;
  }
}
