'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/utils/utils';

interface DeviceStatus {
  device: string;
  status: 'online' | 'offline';
  temperature: string;
}

const mockDevices: DeviceStatus[] = [
  { device: 'Sensor-001', status: 'online', temperature: '24.2°C' },
  { device: 'Sensor-002', status: 'online', temperature: '23.8°C' },
  { device: 'Sensor-003', status: 'offline', temperature: '--' },
];

export function DeviceStatusTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Device Status</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Device</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Temperature</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockDevices.map((device) => (
              <TableRow key={device.device}>
                <TableCell className="font-medium">{device.device}</TableCell>
                <TableCell>
                  <Badge
                    variant={device.status === 'online' ? 'default' : 'secondary'}
                    className={cn(
                      device.status === 'online' 
                        ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-100'
                    )}
                  >
                    <div className={cn(
                      'w-2 h-2 rounded-full mr-2',
                      device.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                    )} />
                    {device.status === 'online' ? 'Online' : 'Offline'}
                  </Badge>
                </TableCell>
                <TableCell>{device.temperature}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}