import React, { useState, useRef } from 'react';
import { Camera, Image } from 'lucide-react';

export const ImageVerificationStep: React.FC<{
  onComplete: (imageBlob: Blob) => void;
}> = ({ onComplete }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(videoRef.current, 0, 0);
      
      canvas.toBlob((blob) => {
        if (blob) {
          setImagePreview(URL.createObjectURL(blob));
          onComplete(blob);
          // Stop camera stream
          streamRef.current?.getTracks().forEach(track => track.stop());
        }
      }, 'image/jpeg');
    }
  };

  React.useEffect(() => {
    startCamera();
    return () => {
      streamRef.current?.getTracks().forEach(track => track.stop());
    };
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold flex items-center mb-6">
          <Camera className="mr-2" /> Image Verification
        </h3>

        <div className="space-y-6">
          {!imagePreview ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full rounded-lg"
              />
              <button
                onClick={captureImage}
                className="w-full bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600"
              >
                Capture Image
              </button>
            </>
          ) : (
            <div className="space-y-4">
              <img
                src={imagePreview}
                alt="Captured"
                className="w-full rounded-lg"
              />
              <p className="text-green-600 text-center">Image captured successfully</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};