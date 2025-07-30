'use client';

import { useState } from 'react';
import { PrivateRoute } from '@/shared/components/auth/PrivateRoute';
import { UserRole } from '@/shared/types/user';
import { Sidebar } from '@/components/ui/sidebar';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useRecentDashboards } from '@/shared/hooks/useDashboard';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dashboardService } from '@/shared/services/dashboard';
import { DashboardConfig, DashboardWidget } from '@/shared/types';
import { BarChart3, Plus, Thermometer, Zap, Activity, MapPin, List, Gauge } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useNotifications } from '@/contexts/NotificationContext';

export default function UserDashboard() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [dashboardConfig, setDashboardConfig] = useState<DashboardConfig>({
    name: '',
    description: '',
    widgets: [],
  });
  const [selectedWidgetType, setSelectedWidgetType] = useState<DashboardWidget['type']>('line_chart');
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);

  const { data: dashboards, isLoading } = useRecentDashboards();
  const queryClient = useQueryClient();
  const { unreadCount } = useNotifications();

  const createDashboardMutation = useMutation({
    mutationFn: dashboardService.createDashboardMock,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recent-dashboards'] });
      setIsCreateDialogOpen(false);
      setDashboardConfig({ name: '', description: '', widgets: [] });
    },
  });

  const widgetTypes = [
    { type: 'line_chart', label: 'Line Chart', icon: BarChart3 },
    { type: 'gauge', label: 'Gauge', icon: Gauge },
    { type: 'table', label: 'Table', icon: List },
    { type: 'map', label: 'Map', icon: MapPin },
    { type: 'event_log', label: 'Event Log', icon: Activity },
  ];

  const mockDevices = [
    { id: 'device-1', name: 'Temperature Sensor 1' },
    { id: 'device-2', name: 'Temperature Sensor 2' },
    { id: 'device-3', name: 'Energy Monitor 1' },
    { id: 'device-4', name: 'Energy Monitor 2' },
  ];

  const addWidget = () => {
    const newWidget: DashboardWidget = {
      id: Math.random().toString(36).substr(2, 9),
      type: selectedWidgetType,
      title: `${selectedWidgetType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} Widget`,
      config: {},
      device_ids: selectedDevices,
    };

    setDashboardConfig(prev => ({
      ...prev,
      widgets: [...prev.widgets, newWidget],
    }));

    setSelectedWidgetType('line_chart');
    setSelectedDevices([]);
  };

  const removeWidget = (widgetId: string) => {
    setDashboardConfig(prev => ({
      ...prev,
      widgets: prev.widgets.filter(w => w.id !== widgetId),
    }));
  };

  const handleCreateDashboard = () => {
    if (dashboardConfig.name && dashboardConfig.widgets.length > 0) {
      createDashboardMutation.mutate(dashboardConfig);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <PrivateRoute allowedRoles={[UserRole.USER]}>
      <div className="flex h-screen bg-gray-50">
        <div className="w-64 flex-shrink-0">
          <Sidebar />
        </div>
        
        <div className="flex-1 overflow-auto">
          <PageHeader 
            title="User Dashboard" 
            breadcrumbs={[
              { label: 'Choovio' },
              { label: 'Dashboard' }
            ]}
            notificationCount={unreadCount}
            onNotificationClick={() => {
              // You can add navigation to notifications page or open a modal here
              console.log('Notification clicked');
            }}
          />

          {/* Main Content */}
          <main className="p-6 space-y-6">
            {/* Header with Create Button */}
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">My Dashboards</h1>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Create Dashboard
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New Dashboard</DialogTitle>
                  </DialogHeader>
                  
                  <Tabs defaultValue="basic" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="basic">Basic Info</TabsTrigger>
                      <TabsTrigger value="widgets">Widgets</TabsTrigger>
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="basic" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Dashboard Name</Label>
                        <Input
                          id="name"
                          value={dashboardConfig.name}
                          onChange={(e) => setDashboardConfig(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Enter dashboard name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                          id="description"
                          value={dashboardConfig.description}
                          onChange={(e) => setDashboardConfig(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Enter dashboard description"
                        />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="widgets" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Widget Type</Label>
                          <Select value={selectedWidgetType} onValueChange={(value: DashboardWidget['type']) => setSelectedWidgetType(value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {widgetTypes.map((widget) => {
                                const Icon = widget.icon;
                                return (
                                  <SelectItem key={widget.type} value={widget.type}>
                                    <div className="flex items-center gap-2">
                                      <Icon className="h-4 w-4" />
                                      {widget.label}
                                    </div>
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Select Devices</Label>
                          <div className="space-y-2 max-h-32 overflow-y-auto">
                            {mockDevices.map((device) => (
                              <div key={device.id} className="flex items-center space-x-2">
                                <Checkbox
                                  id={device.id}
                                  checked={selectedDevices.includes(device.id)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setSelectedDevices(prev => [...prev, device.id]);
                                    } else {
                                      setSelectedDevices(prev => prev.filter(id => id !== device.id));
                                    }
                                  }}
                                />
                                <Label htmlFor={device.id} className="text-sm">{device.name}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <Button onClick={addWidget} className="w-full">
                        Add Widget
                      </Button>
                      
                      {/* Widget List */}
                      <div className="space-y-2">
                        <Label>Added Widgets</Label>
                        <div className="space-y-2">
                          {dashboardConfig.widgets.map((widget) => (
                            <div key={widget.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center gap-2">
                                {(() => {
                                  const WidgetIcon = widgetTypes.find(w => w.type === widget.type)?.icon || BarChart3;
                                  return <WidgetIcon className="h-4 w-4" />;
                                })()}
                                <span className="text-sm font-medium">{widget.title}</span>
                                <span className="text-xs text-gray-500">
                                  ({widget.device_ids?.length || 0} devices)
                                </span>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeWidget(widget.id)}
                              >
                                Remove
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="preview" className="space-y-4">
                      <div className="space-y-4">
                        <h3 className="font-semibold">Dashboard Preview</h3>
                        <div className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-2">{dashboardConfig.name || 'Untitled Dashboard'}</h4>
                          <p className="text-sm text-gray-600 mb-4">{dashboardConfig.description || 'No description'}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {dashboardConfig.widgets.map((widget) => (
                              <div key={widget.id} className="p-3 border rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                  {(() => {
                                    const WidgetIcon = widgetTypes.find(w => w.type === widget.type)?.icon || BarChart3;
                                    return <WidgetIcon className="h-4 w-4" />;
                                  })()}
                                  <span className="text-sm font-medium">{widget.title}</span>
                                </div>
                                <div className="h-20 bg-gray-100 rounded flex items-center justify-center">
                                  <span className="text-xs text-gray-500">Widget Preview</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleCreateDashboard}
                      disabled={!dashboardConfig.name || dashboardConfig.widgets.length === 0 || createDashboardMutation.isPending}
                    >
                      {createDashboardMutation.isPending ? 'Creating...' : 'Create Dashboard'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Existing Dashboards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <motion.div key={i} variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: i * 0.1 }}>
                    <Card className="animate-pulse">
                      <CardHeader className="pb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-300 rounded-lg"></div>
                          <div className="space-y-2">
                            <div className="h-4 bg-gray-300 rounded w-32"></div>
                            <div className="h-3 bg-gray-300 rounded w-24"></div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="h-3 bg-gray-300 rounded w-20"></div>
                          <div className="h-3 bg-gray-300 rounded w-16"></div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              ) : (
                dashboards?.map((dashboard, index) => (
                  <motion.div key={dashboard.id} variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: index * 0.1 }}>
                    <Link href={dashboard.type === 'temperature' ? '/dashboards/temperature' : '#'}>
                      <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200 border-2 hover:border-[#474dff]">
                        <CardHeader className="pb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-[#474dff] rounded-lg flex items-center justify-center">
                              <BarChart3 className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{dashboard.name}</CardTitle>
                              <p className="text-sm text-gray-500">Last edited {new Date(dashboard.created_at).toLocaleDateString()}</p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">3 active devices</span>
                            <span className="text-xs text-gray-400">Updated 2 min ago</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))
              )}
            </div>

            {/* Recent Dashboards Section */}
            <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Dashboards</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#474dff]"></div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {dashboards?.map((dashboard) => (
                        <div key={dashboard.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-[#474dff] rounded-lg flex items-center justify-center">
                              <BarChart3 className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <p className="font-medium">{dashboard.name}</p>
                              <p className="text-sm text-gray-500">
                                Created {new Date(dashboard.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <Link 
                            href={dashboard.type === 'temperature' ? '/dashboards/temperature' : '#'}
                            className="text-[#474dff] hover:underline text-sm font-medium"
                          >
                            View
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </main>
        </div>
      </div>
    </PrivateRoute>
  );
} 