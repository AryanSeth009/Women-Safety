import React, { useState, useEffect } from 'react';
import { HeadphonesIcon, Phone } from 'lucide-react';

export const HelplineConnectionStep: React.FC<{
  onComplete: () => void;
}> = ({ onComplete }) => {
  const [connecting, setConnecting] = useState(true);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Simulate connection process
    const timer = setTimeout(() => {
      setConnecting(false);
      setConnected(true);
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold flex items-center mb-6">
          <HeadphonesIcon className="mr-2" /> Helpline Connection
        </h3>

        <div className="text-center space-y-6">
          {connecting ? (
            <div className="animate-pulse space-y-4">
              <Phone className="w-16 h-16 mx-auto text-orange-500" />
              <p className="text-lg">Connecting to helpline...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <Phone className="w-16 h-16 mx-auto text-green-500" />
              <p className="text-lg text-green-600">Connected to helpline</p>
              <p className="text-gray-600">
                Emergency responders have been notified and are on their way.
                Stay on the line for further instructions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};