'use client';

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';

interface TemperatureDataPoint {
  time: string;
  sensorA: number;
  sensorB: number;
}

// Mock data - replace with real data from API
const mockData: TemperatureDataPoint[] = [
  { time: '00:00', sensorA: 22.1, sensorB: 21.8 },
  { time: '04:00', sensorA: 21.9, sensorB: 21.5 },
  { time: '08:00', sensorA: 22.5, sensorB: 22.2 },
  { time: '12:00', sensorA: 24.1, sensorB: 23.8 },
  { time: '16:00', sensorA: 25.2, sensorB: 24.9 },
  { time: '20:00', sensorA: 24.8, sensorB: 24.5 },
  { time: '24:00', sensorA: 23.5, sensorB: 23.2 },
];

export function TemperatureChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Temperature Trends
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-[#474dff] rounded-full mr-2" />
              <span>Sensor A</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-400 rounded-full mr-2" />
              <span>Sensor B</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="time" tick={{ fontSize: 12 }} />
              <YAxis 
                tick={{ fontSize: 12 }}
                domain={['dataMin - 1', 'dataMax + 1']}
                label={{ value: '°C', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                formatter={(value: number) => [`${value}°C`, '']}
                labelFormatter={(label) => `Time: ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="sensorA" 
                stroke="#474dff" 
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="sensorB" 
                stroke="#9CA3AF" 
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}