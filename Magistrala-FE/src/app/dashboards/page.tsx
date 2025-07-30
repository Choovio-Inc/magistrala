'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PrivateRoute } from '@/components/auth/PrivateRoute';
import { UserRole } from '@/types/user';
import { useAuth } from '@/contexts/AuthContext';
import { Sidebar } from '@/components/ui/sidebar';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRecentDashboards } from '@/hooks/useDashboard';
import { Thermometer, Zap, Activity, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function DashboardsPage() {
  const { data: dashboards, isLoading } = useRecentDashboards();
  const { user } = useAuth();
  const router = useRouter();

  // Redirect users based on their role
  useEffect(() => {
    if (user) {
      if (user.role === UserRole.ADMIN) {
        router.push('/');
      } else if (user.role === UserRole.USER) {
        router.push('/user-dashboard');
      }
    }
  }, [user, router]);

  // Show loading while redirecting
  if (user) {
    return (
      <div className="flex h-screen bg-gray-50">
        <div className="w-64 flex-shrink-0">
          <Sidebar />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#474dff] mx-auto mb-4"></div>
            <p className="text-gray-600">Redirecting to your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <PrivateRoute allowedRoles={[UserRole.ADMIN, UserRole.USER]}>
      <div className="flex h-screen bg-gray-50">
        <div className="w-64 flex-shrink-0">
          <Sidebar />
        </div>
        
        <div className="flex-1 overflow-auto">
          <PageHeader 
            title="Dashboards" 
            breadcrumbs={[
              { label: 'Choovio' },
              { label: 'Home', href: '/' },
              { label: 'Dashboards' }
            ]} 
          />

          {/* Main Content */}
          <main className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Temperature Dashboard Card */}
              <Link href="/dashboards/temperature">
                <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200 border-2 hover:border-[#474dff]">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-[#474dff] rounded-lg flex items-center justify-center">
                        <Thermometer className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Temperature Monitor</CardTitle>
                        <p className="text-sm text-gray-500">Real-time temperature tracking</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">3 active sensors</span>
                      <span className="text-xs text-gray-400">Updated 2 min ago</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              {/* Energy Dashboard Card (Coming Soon) */}
              <Card className="opacity-60">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-400 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Energy Consumption</CardTitle>
                      <p className="text-sm text-gray-500">Power usage monitoring</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Coming Soon</span>
                    <span className="text-xs text-gray-400">--</span>
                  </div>
                </CardContent>
              </Card>

              {/* System Health Dashboard Card (Coming Soon) */}
              <Card className="opacity-60">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-400 rounded-lg flex items-center justify-center">
                      <Activity className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">System Health</CardTitle>
                      <p className="text-sm text-gray-500">Overall system monitoring</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Coming Soon</span>
                    <span className="text-xs text-gray-400">--</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Dashboards Section */}
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
          </main>
        </div>
      </div>
    </PrivateRoute>
  );
}