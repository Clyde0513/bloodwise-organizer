
import { useState } from 'react';
import Header from '../components/Header';
import FileUpload from '../components/FileUpload';
import ProcessingStatus from '../components/ProcessingStatus';
import DataDisplay from '../components/DataDisplay';
import Footer from '../components/Footer';
import { ProcessedData, UploadStatus } from '../lib/types';
import { toast } from "sonner";
import { BarChart, FileCheck, ClipboardList, ArrowRight, LayoutTemplate } from 'lucide-react';

const Index = () => {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const [processedData, setProcessedData] = useState<ProcessedData | null>(null);

  const handleFileUpload = async (file: File) => {
    try {
      setUploadStatus('uploading');
      
      // Create FormData
      const formData = new FormData();
      formData.append('file', file);
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setUploadStatus('processing');
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Mock API response with sample data
      // In a real application, this would come from your Python backend
      const sampleData: ProcessedData = {
        readings: [
          { systolic: 122, diastolic: 81, pulse: 72, date: '2023-04-01', time: '08:30 AM' },
          { systolic: 125, diastolic: 82, pulse: 74, date: '2023-04-02', time: '08:45 AM' },
          { systolic: 118, diastolic: 79, pulse: 70, date: '2023-04-03', time: '09:00 AM' },
          { systolic: 130, diastolic: 85, pulse: 76, date: '2023-04-04', time: '08:15 AM' },
          { systolic: 124, diastolic: 83, pulse: 73, date: '2023-04-05', time: '08:30 AM' },
        ],
        averageSystolic: 124,
        averageDiastolic: 82,
        averagePulse: 73,
      };
      
      setProcessedData(sampleData);
      setUploadStatus('success');
      toast.success('Your blood pressure data has been processed successfully!');
      
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('error');
      toast.error('Error processing your blood pressure data. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-ucla-lightGrey">
      <Header />
      
      {/* Hero Section */}
      <section id="home" className="UCLA-section pt-28 md:pt-32 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 space-y-6 text-center md:text-left animate-fade-in">
              <h1 className="heading-xl text-balance">
                Organize Your <span className="text-ucla-blue">Blood Pressure</span> Data Effortlessly
              </h1>
              <p className="text-lg text-gray-600 max-w-xl mx-auto md:mx-0">
                Upload your blood pressure readings and let our AI convert them into organized, clean data for better health monitoring.
              </p>
              <div className="pt-4">
                <a 
                  href="#upload" 
                  className="UCLA-button inline-flex items-center"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
            
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute -left-6 -top-6 w-24 h-24 bg-ucla-blue/10 rounded-full animate-float"></div>
                <div className="absolute -right-10 -bottom-8 w-32 h-32 bg-ucla-gold/10 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
                <div className="glass-card relative z-10 p-8 max-w-lg animate-scale-in">
                  <div className="aspect-video bg-ucla-lightBlue/20 rounded-lg mb-6 flex items-center justify-center">
                    <BarChart className="text-ucla-blue h-16 w-16" />
                  </div>
                  <div className="space-y-4">
                    <div className="h-6 bg-ucla-lightBlue/20 rounded-md w-3/4"></div>
                    <div className="h-4 bg-ucla-lightBlue/10 rounded-md"></div>
                    <div className="h-4 bg-ucla-lightBlue/10 rounded-md w-5/6"></div>
                    <div className="h-10 bg-ucla-blue/80 rounded-md w-1/3 mt-6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="UCLA-section bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="heading-lg">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our advanced technology simplifies the process of organizing and analyzing your blood pressure data.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center p-6 glass-card hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-ucla-blue/10 flex items-center justify-center mb-6">
                <FileCheck className="text-ucla-blue" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Upload & Process</h3>
              <p className="text-gray-600">
                Simply upload an image of your blood pressure readings and our AI will process the data.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 glass-card hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-ucla-blue/10 flex items-center justify-center mb-6">
                <LayoutTemplate className="text-ucla-blue" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Organize & Clean</h3>
              <p className="text-gray-600">
                We automatically organize the extracted data into a clean, structured format for easy analysis.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 glass-card hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-ucla-blue/10 flex items-center justify-center mb-6">
                <ClipboardList className="text-ucla-blue" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Analyze & Download</h3>
              <p className="text-gray-600">
                View your data in intuitive charts and tables, and download it for sharing with your healthcare provider.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Upload Section */}
      <section id="upload" className="UCLA-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="heading-lg">Upload Your Blood Pressure Data</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Upload an image of your blood pressure readings and let our AI handle the rest.
            </p>
          </div>
          
          <FileUpload onFileUpload={handleFileUpload} status={uploadStatus} />
          <ProcessingStatus status={uploadStatus} />
          {processedData && <DataDisplay data={processedData} />}
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="UCLA-section bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="heading-lg">About BP Organizer</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're on a mission to make blood pressure monitoring easier and more accessible for everyone.
            </p>
          </div>
          
          <div className="glass-card p-8 max-w-3xl mx-auto">
            <p className="text-gray-700 mb-4">
              BP Organizer was developed in collaboration with UCLA Health to help patients better manage and understand their blood pressure data. Our technology uses advanced image recognition and natural language processing to extract readings from photos of blood pressure monitors or handwritten notes.
            </p>
            <p className="text-gray-700 mb-4">
              Regular monitoring of blood pressure is essential for those with hypertension, heart disease, or other cardiovascular conditions. However, keeping track of these readings manually can be tedious and error-prone.
            </p>
            <p className="text-gray-700">
              Our tool makes this process simple and efficient, allowing patients to maintain better records and share accurate data with their healthcare providers for improved treatment decisions.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
