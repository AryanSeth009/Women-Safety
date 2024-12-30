import React from 'react';
import { MapPin, FileQuestion, Mic, Video, HeadphonesIcon } from 'lucide-react';

const steps = [
  {
    icon: MapPin,
    title: 'College Map & Location Selection',
    description: 'Select your location from the map'
  },
  {
    icon: FileQuestion,
    title: 'Questionnaire',
    description: 'Answer a few quick questions'
  },
  {
    icon: Mic,
    title: 'Voicemail Verification',
    description: 'Verify your voice for security'
  },
  {
    icon: Video,
    title: 'Video/Fingerprint Verification',
    description: 'Additional security verification'
  },
  {
    icon: HeadphonesIcon,
    title: 'Direct Connection to Helpline',
    description: 'Connect with our support team'
  }
];

export const ProcessFlow: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-12 text-orange-600">
        Helpline Process
      </h2>
      
      <div className="relative">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start mb-8 relative">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-500 rounded-full">
              {React.createElement(step.icon, { className: 'w-6 h-6 text-white' })}
            </div>
            
            <div className="ml-4 flex-1">
              <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
              <p className="text-gray-600 mt-1">{step.description}</p>
            </div>
            
            {index < steps.length - 1 && (
              <div className="absolute left-6 top-12 h-16 w-0.5 bg-orange-300" />
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-orange-50 rounded-lg border border-orange-200">
        <p className="text-gray-700 text-center">
          Every step in the process will be thoroughly verified to ensure authenticity and prevent
          misuse, guaranteeing that the support provided is genuine and reliable.
        </p>
      </div>
    </div>
  );
}