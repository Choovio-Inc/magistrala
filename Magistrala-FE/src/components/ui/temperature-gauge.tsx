'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TemperatureGaugeProps {
  temperature: number;
  unit?: string;
  status?: 'normal' | 'warning' | 'critical';
}

export function TemperatureGauge({ 
  temperature, 
  unit = '°C', 
  status = 'normal' 
}: TemperatureGaugeProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'warning':
        return '#F59E0B';
      case 'critical':
        return '#EF4444';
      default:
        return '#474dff';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'warning':
        return 'Warning';
      case 'critical':
        return 'Critical';
      default:
        return 'Normal';
    }
  };

  const circumference = 2 * Math.PI * 40; // radius = 40
  const percentage = Math.min(Math.max((temperature - 10) / 40, 0), 1); // Scale 10-50°C to 0-1
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage * circumference);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Temperature</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <div className="relative">
          <svg width="120" height="120" className="transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="60"
              cy="60"
              r="40"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <circle
              cx="60"
              cy="60"
              r="40"
              fill="none"
              stroke={getStatusColor()}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-500 ease-in-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold">{temperature}{unit}</span>
            <span className="text-sm text-muted-foreground">{getStatusText()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}