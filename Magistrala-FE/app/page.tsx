'use client';

import { PrivateRoute } from '@/components/auth/PrivateRoute';
import { UserRole } from '@/contexts/AuthContext';
import { Sidebar } from '@/components/ui/sidebar';
import { StatCard } from '@/components/ui/stat-card';
import { EntityStatusChart } from '@/components/charts/EntityStatusChart';
import { RecentDashboards } from '@/components/ui/recent-dashboards';
import { useOrganizationStats } from '@/hooks/useDashboard';
import { Users, Smartphone, Radio, FolderOpen } from 'lucide-react';

export default function HomePage() {
  const { data: stats, isLoading } = useOrganizationStats();

  return (
    <PrivateRoute allowedRoles={[UserRole.ADMIN, UserRole.CUSTOMER]}>
      <div className="flex h-screen bg-gray-50">
        <div className="w-64 flex-shrink-0">
          <Sidebar />
        </div>
        
        <div className="flex-1 overflow-auto">
          <PageHeader 
            title="Home Page" 
            breadcrumbs={[
              { label: 'Choovio' },
              { label: 'Home' },
              { label: 'Device ABC' }
            ]} 
          />

          {/* Main Content */}
          <main className="p-6 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Organization Members"
                value={stats?.members.total || 0}
                icon={Users}
                enabled={stats?.members.enabled || 0}
                disabled={stats?.members.disabled || 0}
              />
              <StatCard
                title="Devices"
                value={stats?.devices.total || 0}
                icon={Smartphone}
                enabled={stats?.devices.enabled || 0}
                disabled={stats?.devices.disabled || 0}
              />
              <StatCard
                title="Device Feeds"
                value={stats?.device_feeds.total || 0}
                icon={Radio}
                active={stats?.device_feeds.active || 0}
                inactive={stats?.device_feeds.inactive || 0}
              />
              <StatCard
                title="Projects"
                value={stats?.projects.total || 0}
                icon={FolderOpen}
                active={stats?.projects.active || 0}
                inactive={stats?.projects.inactive || 0}
              />
            </div>

            {/* Charts and Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EntityStatusChart />
              <RecentDashboards />
            </div>
          </main>
        </div>
      </div>
    </PrivateRoute>
  );
}