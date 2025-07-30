'use client';

import { PrivateRoute } from '@/shared/components/auth/PrivateRoute';
import { UserRole } from '@/shared/types/user';
import { Sidebar } from '@/components/ui/sidebar';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useOrganizations, useAnalyticsSummary } from '@/shared/hooks/useAdmin';
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

export default function AdminDashboard() {
  const { data: organizations, isLoading: orgsLoading } = useOrganizations();
  const { data: newOrganizations } = useOrganizations({ status: 'enabled' });
  const { data: analytics, isLoading: analyticsLoading } = useAnalyticsSummary();
  const { unreadCount } = useNotifications();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <PrivateRoute allowedRoles={[UserRole.ADMIN]}>
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
                    <div className="text-2xl font-bold">{organizations?.length || 0}</div>
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
                    <div className="text-2xl font-bold">{newOrganizations?.length || 0}</div>
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
                    <div className="text-2xl font-bold">{analytics?.total_users || 0}</div>
                    <p className="text-xs text-muted-foreground">
                      Across all organizations
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
                    <div className="text-2xl font-bold">{analytics?.active_devices || 0}</div>
                    <p className="text-xs text-muted-foreground">
                      Currently online devices
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Analytics Section */}
            <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.5 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Radio className="h-5 w-5" />
                    Analytics Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#474dff]">{analytics?.total_users || 0}</div>
                      <div className="text-sm text-muted-foreground">Total Users</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">{analytics?.active_devices || 0}</div>
                      <div className="text-sm text-muted-foreground">Active Devices</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">{analytics?.data_streams || 0}</div>
                      <div className="text-sm text-muted-foreground">Data Streams</div>
                    </div>
                  </div>
                  
                  {/* Signup Trends Chart - Temporarily disabled due to TypeScript compatibility issues */}
                  {analytics?.signup_trends && analytics.signup_trends.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold mb-4">Signup Trends (Last 30 Days)</h4>
                      <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-lg">
                        <p className="text-gray-500">Chart temporarily disabled - Data available: {analytics.signup_trends.length} data points</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Organizations Table */}
            <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.6 }}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Organizations</CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search organizations..." className="pl-8 w-64" />
                      </div>
                      <Select>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {orgsLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#474dff]"></div>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Created At</TableHead>
                          <TableHead>Alias</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {organizations?.map((org) => (
                          <TableRow key={org.id}>
                            <TableCell className="font-medium">{org.name}</TableCell>
                            <TableCell>{new Date(org.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell>{org.alias || '-'}</TableCell>
                            <TableCell>
                              <Badge variant={org.status === 'enabled' ? 'default' : 'secondary'}>
                                {org.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
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