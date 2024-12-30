import React, { useState } from 'react';
import { LocationStep } from './steps/LocationStep';
import { QuestionnaireStep } from './steps/QuestionnaireStep';
import { VoiceVerificationStep } from './steps/VoiceVerificationStep';
import { ImageVerificationStep } from './steps/ImageVerificationStep';
import { HelplineConnectionStep } from './steps/HelplineConnectionStep';

export const EmergencyProcess: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [emergencyData, setEmergencyData] = useState<any>({});

  const handleStepComplete = (stepData: any) => {
    setEmergencyData((prev: any) => ({ ...prev, ...stepData }));
    setCurrentStep((prev) => prev + 1);
  };

  const steps = [
    {
      component: LocationStep,
      title: 'Location Selection'
    },
    {
      component: QuestionnaireStep,
      title: 'Emergency Verification'
    },
    {
      component: VoiceVerificationStep,
      title: 'Voice Recording'
    },
    {
      component: ImageVerificationStep,
      title: 'Image Verification'
    },
    {
      component: HelplineConnectionStep,
      title: 'Helpline Connection'
    }
  ];

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="w-full">
      <div className="mb-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  index !== steps.length - 1 ? 'flex-1' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index <= currentStep
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {index + 1}
                </div>
                {index !== steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      index < currentStep ? 'bg-orange-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <CurrentStepComponent onComplete={handleStepComplete} />
    </div>
  );
};