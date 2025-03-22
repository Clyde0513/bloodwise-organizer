
import React from 'react';
import { BloodPressureReading, ProcessedData } from '../lib/types';
import { Download, Calendar, Clock, Heart, Activity, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DataDisplayProps {
  data: ProcessedData | null;
}

const DataDisplay = ({ data }: DataDisplayProps) => {
  if (!data) return null;

  const { readings, averageSystolic, averageDiastolic, averagePulse } = data;

  // Prepare chart data
  const chartData = readings.map((reading, index) => ({
    name: reading.date || `Reading ${index + 1}`,
    systolic: reading.systolic,
    diastolic: reading.diastolic,
    pulse: reading.pulse,
  }));

  // Determine BP category
  const getBPCategory = (sys: number, dia: number) => {
    if (sys < 120 && dia < 80) return { label: 'Normal', color: 'text-green-500' };
    if ((sys >= 120 && sys <= 129) && dia < 80) return { label: 'Elevated', color: 'text-yellow-500' };
    if ((sys >= 130 && sys <= 139) || (dia >= 80 && dia <= 89)) return { label: 'Hypertension Stage 1', color: 'text-orange-500' };
    if (sys >= 140 || dia >= 90) return { label: 'Hypertension Stage 2', color: 'text-red-500' };
    if (sys > 180 || dia > 120) return { label: 'Hypertensive Crisis', color: 'text-red-600' };
    return { label: 'Unknown', color: 'text-gray-500' };
  };

  const bpCategory = getBPCategory(averageSystolic, averageDiastolic);

  // Handle download as CSV
  const downloadCSV = () => {
    const headers = ['Date', 'Time', 'Systolic', 'Diastolic', 'Pulse'];
    const csvContent = readings.map(reading => 
      `${reading.date || 'N/A'},${reading.time || 'N/A'},${reading.systolic},${reading.diastolic},${reading.pulse || 'N/A'}`
    );
    
    const csv = [headers.join(','), ...csvContent].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'blood_pressure_readings.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Average Systolic */}
        <div className="glass-card p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-full bg-ucla-blue/10 flex items-center justify-center mr-3">
              <TrendingUp className="text-ucla-blue" size={20} />
            </div>
            <h3 className="font-medium">Average Systolic</h3>
          </div>
          <p className="text-3xl font-bold text-ucla-darkBlue">{averageSystolic} <span className="text-sm font-normal text-gray-500">mmHg</span></p>
        </div>
        
        {/* Average Diastolic */}
        <div className="glass-card p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-full bg-ucla-blue/10 flex items-center justify-center mr-3">
              <TrendingDown className="text-ucla-blue" size={20} />
            </div>
            <h3 className="font-medium">Average Diastolic</h3>
          </div>
          <p className="text-3xl font-bold text-ucla-darkBlue">{averageDiastolic} <span className="text-sm font-normal text-gray-500">mmHg</span></p>
        </div>
        
        {/* Average Pulse */}
        <div className="glass-card p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-full bg-ucla-blue/10 flex items-center justify-center mr-3">
              <Activity className="text-ucla-blue" size={20} />
            </div>
            <h3 className="font-medium">Average Pulse</h3>
          </div>
          <p className="text-3xl font-bold text-ucla-darkBlue">{averagePulse || 'N/A'} {averagePulse && <span className="text-sm font-normal text-gray-500">BPM</span>}</p>
        </div>
      </div>

      {/* BP Category Alert */}
      <div className={`glass-card p-6 border-l-4 ${
        bpCategory.label === 'Normal' ? 'border-l-green-500' :
        bpCategory.label === 'Elevated' ? 'border-l-yellow-500' :
        bpCategory.label === 'Hypertension Stage 1' ? 'border-l-orange-500' :
        'border-l-red-500'
      }`}>
        <div className="flex items-start">
          <div className="mr-4">
            <AlertTriangle className={
              bpCategory.label === 'Normal' ? 'text-green-500' :
              bpCategory.label === 'Elevated' ? 'text-yellow-500' :
              bpCategory.label === 'Hypertension Stage 1' ? 'text-orange-500' :
              'text-red-500'
            } size={24} />
          </div>
          <div>
            <h3 className={`font-medium text-lg ${bpCategory.color}`}>{bpCategory.label}</h3>
            <p className="text-gray-600 mt-1">
              {bpCategory.label === 'Normal' && 'Your blood pressure is within the normal range. Keep maintaining a healthy lifestyle!'}
              {bpCategory.label === 'Elevated' && 'Your blood pressure is slightly elevated. Consider lifestyle changes to prevent progression to hypertension.'}
              {bpCategory.label === 'Hypertension Stage 1' && 'You have Stage 1 Hypertension. Consult with your healthcare provider about lifestyle changes and possible medication.'}
              {bpCategory.label === 'Hypertension Stage 2' && 'You have Stage 2 Hypertension. It\'s important to consult with your healthcare provider as soon as possible.'}
              {bpCategory.label === 'Hypertensive Crisis' && 'Your readings indicate a hypertensive crisis. Seek immediate medical attention if these readings are current.'}
            </p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-medium mb-6">Blood Pressure Trends</h3>
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="systolic" 
                stroke="#2774AE"
                strokeWidth={2}
                dot={{ r: 4, fill: "#2774AE" }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="diastolic" 
                stroke="#005587" 
                strokeWidth={2}
                dot={{ r: 4, fill: "#005587" }}
                activeDot={{ r: 6 }}
              />
              {averagePulse && (
                <Line 
                  type="monotone" 
                  dataKey="pulse" 
                  stroke="#FFD100" 
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#FFD100" }}
                  activeDot={{ r: 6 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Readings Table */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium">Detailed Readings</h3>
          <button 
            onClick={downloadCSV}
            className="inline-flex items-center text-sm text-ucla-blue hover:text-ucla-darkBlue transition-colors"
          >
            <Download size={16} className="mr-1" />
            Download CSV
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-ucla-lightGrey">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Systolic</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diastolic</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pulse</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {readings.map((reading, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {reading.date || 'N/A'}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {reading.time || 'N/A'}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {reading.systolic} mmHg
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {reading.diastolic} mmHg
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {reading.pulse ? `${reading.pulse} BPM` : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataDisplay;
