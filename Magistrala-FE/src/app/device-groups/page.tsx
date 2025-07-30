'use client';

import React from 'react';
import { PrivateRoute } from '@/components/auth/PrivateRoute';
import { UserRole } from '@/types/user';
import { Sidebar } from '@/components/ui/sidebar';
import { PageHeader } from '@/components/ui/page-header';

// Simple fallback component in case of import errors
const DeviceGroupsFallback = () => (
  <div className="p-6 border rounded-lg">
    <h2 className="text-lg font-semibold mb-4">Device Groups</h2>
    <p className="text-gray-600 mb-4">
      Manage your device groups in a hierarchical structure. Create, edit, and organize your devices into logical groups.
    </p>
    <div className="space-y-4">
      <div className="p-4 border rounded-lg">
        <h3 className="font-medium">Production Environment</h3>
        <p className="text-sm text-gray-500">All production devices and systems</p>
        <div className="flex items-center gap-2 mt-2">
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">enabled</span>
        </div>
      </div>
      <div className="p-4 border rounded-lg ml-6">
        <h3 className="font-medium">Manufacturing Floor</h3>
        <p className="text-sm text-gray-500">IoT devices on the manufacturing floor</p>
        <div className="flex items-center gap-2 mt-2">
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">enabled</span>
        </div>
      </div>
    </div>
  </div>
);

export default function DeviceGroupsPage() {
  const [hasError, setHasError] = React.useState(false);
  const [DeviceGroupsDemo, setDeviceGroupsDemo] = React.useState<React.ComponentType | null>(null);

  React.useEffect(() => {
    // Dynamic import to handle potential import errors
    import('@/features/device-management/components/DeviceGroupsDemo')
      .then((module) => {
        setDeviceGroupsDemo(() => module.DeviceGroupsDemo);
      })
      .catch((error) => {
        console.error('Failed to load DeviceGroupsDemo component:', error);
        setHasError(true);
      });
  }, []);

  return (
    <PrivateRoute allowedRoles={[UserRole.ADMIN, UserRole.USER]}>
      <div className="flex h-screen bg-gray-50">
        <div className="w-64 flex-shrink-0">
          <Sidebar />
        </div>
        
        <div className="flex-1 overflow-auto">
          <PageHeader 
            title="Device Groups" 
            breadcrumbs={[
              { label: 'Choovio' },
              { label: 'Home', href: '/' },
              { label: 'Device Groups' }
            ]} 
          />

          {/* Main Content */}
          <main className="p-6 space-y-6">
            <div className="text-gray-600 mb-6">
              Manage your device groups in a hierarchical structure. Create, edit, and organize your devices into logical groups.
            </div>
            
            {hasError ? (
              <DeviceGroupsFallback />
            ) : DeviceGroupsDemo ? (
              <DeviceGroupsDemo />
            ) : (
              <div className="p-6 border rounded-lg">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-12 bg-gray-200 rounded"></div>
                    <div className="h-12 bg-gray-200 rounded ml-6"></div>
                    <div className="h-12 bg-gray-200 rounded ml-6"></div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </PrivateRoute>
  );
} 