import React, { useState } from 'react';
import { FileQuestion } from 'lucide-react';

export const QuestionnaireStep: React.FC<{
  onComplete: (answers: { needsEmergencyHelp: boolean }) => void;
}> = ({ onComplete }) => {
  const [answer, setAnswer] = useState<boolean | null>(null);

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold flex items-center mb-6">
          <FileQuestion className="mr-2" /> Emergency Verification
        </h3>

        <div className="space-y-6">
          <p className="text-lg text-gray-700">Do you need immediate emergency assistance?</p>

          <div className="space-y-4">
            <button
              onClick={() => setAnswer(true)}
              className={`w-full p-4 rounded-lg border-2 ${
                answer === true ? 'border-red-500 bg-red-50' : 'border-gray-200'
              }`}
            >
              Yes, I need immediate help
            </button>

            <button
              onClick={() => setAnswer(false)}
              className={`w-full p-4 rounded-lg border-2 ${
                answer === false ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
              }`}
            >
              No, I'm seeking information only
            </button>
          </div>

          {answer !== null && (
            <button
              onClick={() => onComplete({ needsEmergencyHelp: answer })}
              className="w-full mt-6 bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600"
            >
              Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
};