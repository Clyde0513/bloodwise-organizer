
import { UploadStatus } from '../lib/types';
import { CircleOff, CheckCircle2, Loader2 } from 'lucide-react';

interface ProcessingStatusProps {
  status: UploadStatus;
}

const ProcessingStatus = ({ status }: ProcessingStatusProps) => {
  if (status === 'idle') {
    return null;
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <div className="glass-card p-6">
        <div className="flex flex-col items-center justify-center">
          {/* Status Icon */}
          <div className="mb-4">
            {status === 'uploading' && (
              <div className="w-16 h-16 rounded-full bg-ucla-blue/10 flex items-center justify-center">
                <Loader2 className="text-ucla-blue animate-spin-slow" size={30} />
              </div>
            )}
            
            {status === 'processing' && (
              <div className="w-16 h-16 rounded-full bg-ucla-blue/10 flex items-center justify-center">
                <div className="relative">
                  <Loader2 className="text-ucla-blue animate-spin-slow" size={30} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-ucla-blue rounded-full animate-pulse-subtle"></div>
                  </div>
                </div>
              </div>
            )}
            
            {status === 'success' && (
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
                <CheckCircle2 className="text-green-500" size={30} />
              </div>
            )}
            
            {status === 'error' && (
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
                <CircleOff className="text-red-500" size={30} />
              </div>
            )}
          </div>
          
          {/* Status Text */}
          <h3 className="text-lg font-medium mb-1">
            {status === 'uploading' && 'Uploading Image'}
            {status === 'processing' && 'Processing Your Blood Pressure Data'}
            {status === 'success' && 'Processing Complete'}
            {status === 'error' && 'Processing Failed'}
          </h3>
          
          <p className="text-sm text-gray-500 text-center max-w-md">
            {status === 'uploading' && 'Your image is being uploaded to our servers...'}
            {status === 'processing' && 'Our AI is analyzing and extracting blood pressure readings from your image...'}
            {status === 'success' && 'Your blood pressure data has been successfully processed.'}
            {status === 'error' && 'We encountered an error while processing your image. Please try again with a clearer image.'}
          </p>
          
          {/* Progress Indicator */}
          {(status === 'uploading' || status === 'processing') && (
            <div className="w-full mt-6 bg-gray-200 rounded-full h-1.5">
              <div 
                className={`h-1.5 rounded-full ${
                  status === 'uploading' ? 'w-1/3 bg-ucla-blue/70' : 'w-2/3 bg-ucla-blue'
                } animate-pulse-subtle`}
              ></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProcessingStatus;
