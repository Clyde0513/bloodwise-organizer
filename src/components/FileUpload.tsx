
import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { Upload, X, Check, AlertCircle, Image } from 'lucide-react';
import { toast } from "sonner";
import { UploadStatus } from '../lib/types';

interface FileUploadProps {
  onFileUpload: (file: File) => Promise<void>;
  status: UploadStatus;
}

const FileUpload = ({ onFileUpload, status }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      validateAndSetFile(files[0]);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }
    
    setSelectedFile(file);
  };

  const handleUploadClick = async () => {
    if (!selectedFile) {
      toast.error('Please select a file first');
      return;
    }

    try {
      await onFileUpload(selectedFile);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload file');
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const isUploading = status === 'uploading' || status === 'processing';
  const isSuccess = status === 'success';
  const isError = status === 'error';

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!selectedFile ? (
        <div
          className={`border-2 border-dashed rounded-xl p-8 transition-all duration-300 text-center ${
            isDragging 
              ? 'border-ucla-blue bg-ucla-blue/5' 
              : 'border-gray-300 hover:border-ucla-blue/50 hover:bg-gray-50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full bg-ucla-blue/10 flex items-center justify-center">
              <Upload
                className="text-ucla-blue"
                size={28}
              />
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-lg">Upload Blood Pressure Image</h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                Drag and drop your blood pressure reading image here, or click to browse your files
              </p>
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="UCLA-button mt-2"
            >
              Browse Files
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileInputChange}
            />
          </div>
        </div>
      ) : (
        <div className="border rounded-xl p-6 bg-white shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-ucla-lightBlue/20 rounded-lg flex items-center justify-center shrink-0">
              <Image size={28} className="text-ucla-blue" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900 truncate">{selectedFile.name}</h4>
                {!isUploading && !isSuccess && (
                  <button 
                    onClick={handleRemoveFile}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                    disabled={isUploading}
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
              <p className="text-sm text-gray-500">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </p>
              
              {isUploading && (
                <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-ucla-blue h-1.5 rounded-full animate-pulse-subtle"
                    style={{ width: '70%' }} 
                  ></div>
                </div>
              )}
              
              {isSuccess && (
                <div className="mt-2 flex items-center text-green-600 text-sm">
                  <Check size={16} className="mr-1" />
                  <span>Processing successful</span>
                </div>
              )}
              
              {isError && (
                <div className="mt-2 flex items-center text-red-500 text-sm">
                  <AlertCircle size={16} className="mr-1" />
                  <span>Processing failed</span>
                </div>
              )}
            </div>
          </div>
          
          {!isUploading && !isSuccess && !isError && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleUploadClick}
                className="UCLA-button"
                disabled={isUploading}
              >
                Process Image
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
