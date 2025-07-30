'use client';

import { UserRole } from '@/types/user';
import { Sidebar } from '@/components/ui/sidebar';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useOrganizations, useAnalyticsSummary } from '@/hooks/useAdmin';
import { Building2, Users, Smartphone, Radio, TrendingUp, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useNotifications } from '@/contexts/NotificationContext';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminDashboard() {
  const { data: organizations, isLoading: orgsLoading, error: orgsError } = useOrganizations();
  const { data: newOrganizations } = useOrganizations({ status: 'enabled' });
  const { data: analytics, isLoading: analyticsLoading, error: analyticsError } = useAnalyticsSummary();
  const { unreadCount } = useNotifications();
  const { user, isAuthenticated } = useAuth();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Handle loading states
  if (!isAuthenticated) {
    return (
      <div className="flex h-screen bg-gray-50">
        <div className="w-64 flex-shrink-0">
          <Sidebar />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h2>
            <p className="text-gray-600">Please log in to access the dashboard.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>
      
      <div className="flex-1 overflow-auto">
        <PageHeader 
          title="Admin Dashboard" 
          breadcrumbs={[
            { label: 'Choovio' },
            { label: 'Admin' },
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
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Organizations</CardTitle>
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {orgsLoading ? '...' : (organizations?.length || 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Active organizations in the platform
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">New This Month</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {orgsLoading ? '...' : (newOrganizations?.length || 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Organizations created this month
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {analyticsLoading ? '...' : (analytics?.total_users || 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Registered users in the platform
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Devices</CardTitle>
                  <Smartphone className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {analyticsLoading ? '...' : (analytics?.active_devices || 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Connected IoT devices
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Error Display */}
          {(orgsError || analyticsError) && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-red-800 font-medium">Data Loading Error</h3>
              <p className="text-red-600 text-sm mt-1">
                {orgsError?.message || analyticsError?.message || 'Failed to load dashboard data'}
              </p>
            </div>
          )}

          {/* Recent Activity */}
          <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {organizations?.slice(0, 5).map((org) => (
                    <div key={org.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Building2 className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">{org.name}</p>
                          <p className="text-sm text-gray-500">{org.alias}</p>
                        </div>
                      </div>
                      <Badge variant={org.status === 'enabled' ? 'default' : 'secondary'}>
                        {org.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    </div>
  );
}