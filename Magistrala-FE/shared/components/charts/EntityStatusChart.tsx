'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useOrganizationStats } from '@/shared/hooks/useDashboard';

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
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{item.name}</span>
                <span className="text-gray-500">
                  {item.enabled + item.disabled} total
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#474dff] h-2 rounded-full"
                  style={{
                    width: `${((item.enabled + item.disabled) > 0) ? (item.enabled / (item.enabled + item.disabled)) * 100 : 0}%`
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>{item.enabled} enabled</span>
                <span>{item.disabled} disabled</span>
              </div>
            </div>
          ))}
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