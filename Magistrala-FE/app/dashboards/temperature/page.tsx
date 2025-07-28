'use client';

import { PrivateRoute } from '@/components/auth/PrivateRoute';
import { Sidebar } from '@/components/ui/sidebar';
import { TemperatureChart } from '@/components/charts/TemperatureChart';
import { TemperatureGauge } from '@/components/ui/temperature-gauge';
import { DeviceStatusTable } from '@/components/ui/device-status-table';
import { AlertsList } from '@/components/ui/alerts-list';
import { TemperatureHeatmap } from '@/components/ui/temperature-heatmap';

export default function TemperatureDashboard() {
  return (
    <PrivateRoute allowedRoles={[UserRole.ADMIN, UserRole.CUSTOMER]}>
      <div className="flex h-screen bg-gray-50">
        <div className="w-64 flex-shrink-0">
          <Sidebar />
        </div>
        
        <div className="flex-1 overflow-auto">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Temperature Monitor</h1>
                <nav className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>Choovio</span>
                  <span>›</span>
                  <span>Home</span>
                  <span>›</span>
                  <span>Dashboards</span>
                  <span>›</span>
                  <span>Temperature Monitor</span>
                </nav>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#474dff] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">SI</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Sri Inakollu</p>
                  <p className="text-xs text-gray-500">sri@choovio.com</p>
                </div>
              </div>
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
            </div>
            {/* Middle Row - Device Status and Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DeviceStatusTable />
              <AlertsList />
            </div>
          </header>
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