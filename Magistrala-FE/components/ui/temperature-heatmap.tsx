'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface HeatmapCell {
  temperature: number;
  position: string;
}

const mockHeatmapData: HeatmapCell[] = [
  { temperature: 22, position: '0-0' }, { temperature: 24, position: '0-1' }, { temperature: 26, position: '0-2' }, { temperature: 27, position: '0-3' },
  { temperature: 28, position: '1-0' }, { temperature: 29, position: '1-1' }, { temperature: 23, position: '1-2' }, { temperature: 25, position: '1-3' },
  { temperature: 24, position: '2-0' }, { temperature: 26, position: '2-1' }, { temperature: 27, position: '2-2' }, { temperature: 28, position: '2-3' },
  { temperature: 30, position: '3-0' }, { temperature: 28, position: '3-1' }, { temperature: 26, position: '3-2' }, { temperature: 24, position: '3-3' },
];

const getTemperatureColor = (temp: number) => {
  if (temp <= 24) return 'bg-blue-200 text-blue-800'; // Cool
  if (temp <= 27) return 'bg-green-200 text-green-800'; // Normal
  if (temp <= 29) return 'bg-yellow-200 text-yellow-800'; // Warm
  return 'bg-red-200 text-red-800'; // Hot
};

const temperatureRanges = [
  { label: 'Cool (20-24°C)', color: 'bg-blue-200' },
  { label: 'Normal (25-27°C)', color: 'bg-green-200' },
  { label: 'Warm (28-29°C)', color: 'bg-yellow-200' },
  { label: 'Hot (30°C+)', color: 'bg-red-200' },
];

export function TemperatureHeatmap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Temperature Heatmap - Building Layout</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-2">
            {mockHeatmapData.map((cell) => (
              <div
                key={cell.position}
                className={cn(
                  'h-16 rounded-lg flex items-center justify-center font-medium transition-all duration-200 hover:scale-105',
                  getTemperatureColor(cell.temperature)
                )}
              >
                {cell.temperature}°C
              </div>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center mt-6">
            {temperatureRanges.map((range) => (
              <div key={range.label} className="flex items-center">
                <div className={cn('w-4 h-4 rounded mr-2', range.color)} />
                <span className="text-sm">{range.label}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}