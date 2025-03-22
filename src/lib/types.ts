
export interface BloodPressureReading {
  systolic: number;
  diastolic: number;
  pulse?: number;
  date?: string;
  time?: string;
}

export interface ProcessedData {
  readings: BloodPressureReading[];
  averageSystolic: number;
  averageDiastolic: number;
  averagePulse?: number;
}

export type UploadStatus = 'idle' | 'uploading' | 'processing' | 'success' | 'error';
