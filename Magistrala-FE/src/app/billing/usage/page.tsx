'use client';

import React from 'react';
import { PrivateRoute } from '@/components/auth/PrivateRoute';
import { Sidebar } from '@/components/ui/sidebar';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Activity,
  HardDrive,
  Zap,
  Users,
  Smartphone
} from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationContext';

// Mock usage data
const usageData = {
  devices: {
    used: 45,
    limit: 100,
    trend: 'up',
    percentage: 45
  },
  storage: {
    used: 75,
    limit: 100,
    trend: 'up',
    percentage: 75
  },
  apiCalls: {
    used: 85000,
    limit: 100000,
    trend: 'up',
    percentage: 85
  },
  users: {
    used: 12,
    limit: 25,
    trend: 'stable',
    percentage: 48
  },
  dataTransfer: {
    used: 45,
    limit: 100,
    trend: 'down',
    percentage: 45
  }
};

export default function UsagePage() {
  const { unreadCount } = useNotifications();

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Activity className="h-4 w-4 text-[#474dff]" />;
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getUsageStatus = (percentage: number) => {
    if (percentage >= 90) return 'Critical';
    if (percentage >= 75) return 'Warning';
    return 'Good';
  };

  return (
    <PrivateRoute allowedRoles={[0, 1]}>
      <div className="flex h-screen bg-gray-50">
        <div className="w-64 flex-shrink-0">
          <Sidebar />
        </div>
        
        <div className="flex-1 overflow-auto">
          <PageHeader
            title="Usage & Limits"
            breadcrumbs={[
              { label: 'Choovio' },
              { label: 'Billing' },
              { label: 'Usage & Limits' }
            ]}
            notificationCount={unreadCount}
            onNotificationClick={() => {
              console.log('Notification clicked');
            }}
          />

          {/* Main Content */}
          <main className="p-6 space-y-6">
            {/* Usage Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Devices */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Smartphone className="h-5 w-5" />
                      Devices
                    </CardTitle>
                    {getTrendIcon(usageData.devices.trend)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">
                        {usageData.devices.used}
                      </span>
                      <span className="text-sm text-gray-500">
                        / {usageData.devices.limit}
                      </span>
                    </div>
                    <Progress 
                      value={usageData.devices.percentage} 
                      className="h-2"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        {usageData.devices.percentage}% used
                      </span>
                      <Badge 
                        variant={usageData.devices.percentage >= 75 ? 'destructive' : 'secondary'}
                      >
                        {getUsageStatus(usageData.devices.percentage)}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Storage */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <HardDrive className="h-5 w-5" />
                      Storage
                    </CardTitle>
                    {getTrendIcon(usageData.storage.trend)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">
                        {usageData.storage.used}GB
                      </span>
                      <span className="text-sm text-gray-500">
                        / {usageData.storage.limit}GB
                      </span>
                    </div>
                    <Progress 
                      value={usageData.storage.percentage} 
                      className="h-2"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        {usageData.storage.percentage}% used
                      </span>
                      <Badge 
                        variant={usageData.storage.percentage >= 75 ? 'destructive' : 'secondary'}
                      >
                        {getUsageStatus(usageData.storage.percentage)}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* API Calls */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      API Calls
                    </CardTitle>
                    {getTrendIcon(usageData.apiCalls.trend)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">
                        {usageData.apiCalls.used.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500">
                        / {usageData.apiCalls.limit.toLocaleString()}
                      </span>
                    </div>
                    <Progress 
                      value={usageData.apiCalls.percentage} 
                      className="h-2"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        {usageData.apiCalls.percentage}% used
                      </span>
                      <Badge 
                        variant={usageData.apiCalls.percentage >= 75 ? 'destructive' : 'secondary'}
                      >
                        {getUsageStatus(usageData.apiCalls.percentage)}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Users */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Users
                    </CardTitle>
                    {getTrendIcon(usageData.users.trend)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">
                        {usageData.users.used}
                      </span>
                      <span className="text-sm text-gray-500">
                        / {usageData.users.limit}
                      </span>
                    </div>
                    <Progress 
                      value={usageData.users.percentage} 
                      className="h-2"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        {usageData.users.percentage}% used
                      </span>
                      <Badge 
                        variant={usageData.users.percentage >= 75 ? 'destructive' : 'secondary'}
                      >
                        {getUsageStatus(usageData.users.percentage)}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Data Transfer */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Data Transfer
                    </CardTitle>
                    {getTrendIcon(usageData.dataTransfer.trend)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">
                        {usageData.dataTransfer.used}GB
                      </span>
                      <span className="text-sm text-gray-500">
                        / {usageData.dataTransfer.limit}GB
                      </span>
                    </div>
                    <Progress 
                      value={usageData.dataTransfer.percentage} 
                      className="h-2"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        {usageData.dataTransfer.percentage}% used
                      </span>
                      <Badge 
                        variant={usageData.dataTransfer.percentage >= 75 ? 'destructive' : 'secondary'}
                      >
                        {getUsageStatus(usageData.dataTransfer.percentage)}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Usage Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  Usage Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <div>
                      <p className="font-medium text-yellow-800">Storage Usage High</p>
                      <p className="text-sm text-yellow-700">
                        You're using 75% of your storage limit. Consider upgrading your plan.
                      </p>
                    </div>
                  </div>
                          <div className="flex items-center gap-3 p-3 bg-[#474dff]/5 border border-[#474dff]/20 rounded-lg">
          <Activity className="h-4 w-4 text-[#474dff]" />
          <div>
            <p className="font-medium text-[#474dff]">API Usage Trending Up</p>
            <p className="text-sm text-[#474dff]/80">
                        Your API call usage is increasing. Monitor your usage to avoid hitting limits.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Usage History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Usage History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium">Usage Analytics</p>
                  <p className="text-sm">Detailed usage charts and analytics will be displayed here.</p>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </PrivateRoute>
  );
} 