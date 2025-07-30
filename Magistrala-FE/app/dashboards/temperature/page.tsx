'use client';

import { PrivateRoute } from '@/shared/components/auth/PrivateRoute';
import { UserRole } from '@/shared/types/user';
import { Sidebar } from '@/components/ui/sidebar';
import { PageHeader } from '@/components/ui/page-header';
import { TemperatureChart } from '@/shared/components/charts/TemperatureChart';
import { TemperatureGauge } from '@/components/ui/temperature-gauge';
import { DeviceStatusTable } from '@/components/ui/device-status-table';
import { AlertsList } from '@/components/ui/alerts-list';
import { TemperatureHeatmap } from '@/components/ui/temperature-heatmap';

export default function TemperatureDashboard() {
  return (
    <PrivateRoute allowedRoles={[UserRole.ADMIN, UserRole.USER]}>
      <div className="flex h-screen bg-gray-50">
        <div className="w-64 flex-shrink-0">
          <Sidebar />
        </div>
        
        <div className="flex-1 overflow-auto">
          <PageHeader 
            title="Temperature Monitor" 
            breadcrumbs={[
              { label: 'Choovio' },
              { label: 'Home', href: '/' },
              { label: 'Dashboards', href: '/dashboards' },
              { label: 'Temperature Monitor' }
            ]} 
          />

          {/* Main Content */}
          <main className="p-6 space-y-6">
            {/* Top Row - Chart and Gauge */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <TemperatureChart />
              </div>
              <div>
                <TemperatureGauge temperature={23.5} status="normal" />
              </div>
            </div>

            {/* Middle Row - Device Status and Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DeviceStatusTable />
              <AlertsList />
            </div>

            {/* Bottom Row - Heatmap */}
            <div>
              <TemperatureHeatmap />
            </div>
          </main>
        </div>
      </div>
    </PrivateRoute>
  );
}