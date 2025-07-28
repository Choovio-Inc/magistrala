'use client';

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useOrganizationStats } from '@/hooks/useDashboard';

const COLORS = {
  enabled: '#5B5FE3',
  disabled: '#E5E7EB',
};

export function EntityStatusChart() {
  const { data: stats, isLoading } = useOrganizationStats();

  if (isLoading || !stats) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Entity Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#474dff]"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const data = [
    {
      name: 'Organization Members',
      enabled: stats.members.enabled,
      disabled: stats.members.disabled,
    },
    {
      name: 'Devices',
      enabled: stats.devices.enabled,
      disabled: stats.devices.disabled,
    },
    {
      name: 'Device Feeds',
      enabled: stats.device_feeds.active,
      disabled: stats.device_feeds.inactive,
    },
    {
      name: 'Projects',
      enabled: stats.projects.active,
      disabled: stats.projects.inactive,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Entity Status Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Bar dataKey="enabled" stackId="status" fill={COLORS.enabled} />
              <Bar dataKey="disabled" stackId="status" fill={COLORS.disabled} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center space-x-6 mt-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#474dff] rounded mr-2" />
            <span className="text-sm">Enabled</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-300 rounded mr-2" />
            <span className="text-sm">Disabled</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}