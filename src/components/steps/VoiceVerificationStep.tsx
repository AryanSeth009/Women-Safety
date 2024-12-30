import React, { useState, useRef } from 'react';
import { Mic, Square } from 'lucide-react';

export const VoiceVerificationStep: React.FC<{
  onComplete: (audioBlob: Blob) => void;
}> = ({ onComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout>();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        onComplete(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= 10) {
            stopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      clearInterval(timerRef.current);
      setIsRecording(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold flex items-center mb-6">
          <Mic className="mr-2" /> Voice Verification
        </h3>

        <div className="text-center space-y-6">
          <p className="text-lg text-gray-700">
            Please record a 10-second voice message describing your situation
          </p>

          <div className="flex justify-center items-center space-x-4">
            {!isRecording ? (
              <button
                onClick={startRecording}
                className="bg-red-500 text-white p-4 rounded-full hover:bg-red-600"
              >
                <Mic size={24} />
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="bg-gray-500 text-white p-4 rounded-full hover:bg-gray-600"
              >
                <Square size={24} />
              </button>
            )}
          </div>

          <div className="text-2xl font-mono">
            {recordingTime.toString().padStart(2, '0')}s
          </div>

          {isRecording && (
            <p className="text-red-500">Recording in progress...</p>
          )}
        </div>
      </div>
    </div>
  );
};