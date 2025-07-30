'use client';

import { PrivateRoute } from '@/shared/components/auth/PrivateRoute';
import { Sidebar } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/shared/types/user';
import { 
  Shield, 
  Users, 
  Settings, 
  Database,
  Plus,
  Trash2,
  Edit
} from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const { user } = useAuth();

  return (
    <PrivateRoute allowedRoles={[UserRole.ADMIN]}>
      <div className="flex h-screen bg-gray-50">
        <div className="w-64 flex-shrink-0">
          <Sidebar />
        </div>
        
        <div className="flex-1 overflow-auto">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <nav className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>Choovio</span>
                  <span>›</span>
                  <span>Admin</span>
                </nav>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#474dff] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user?.firstName?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium">{user ? `${user.firstName} ${user.lastName}` : 'Admin'}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-6 space-y-6">
            {/* Admin Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#474dff] rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <CardTitle className="text-lg">User Management</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Manage user accounts and permissions</p>
                  <div className="space-y-2">
                    <Button size="sm" className="w-full bg-[#474dff] hover:bg-[#3b41e6]">
                      <Plus className="w-4 h-4 mr-2" />
                      Add User
                    </Button>
                    <Link href="/admin/roles">
                      <Button size="sm" variant="outline" className="w-full">
                        <Shield className="w-4 h-4 mr-2" />
                        User Roles
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <Database className="w-5 h-5 text-white" />
                    </div>
                    <CardTitle className="text-lg">Device Control</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Full device management capabilities</p>
                  <div className="space-y-2">
                    <Button size="sm" className="w-full bg-green-500 hover:bg-green-600">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Device
                    </Button>
                    <Button size="sm" variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Device
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                      <Settings className="w-5 h-5 text-white" />
                    </div>
                    <CardTitle className="text-lg">System Settings</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Configure system-wide settings</p>
                  <div className="space-y-2">
                    <Button size="sm" className="w-full bg-orange-500 hover:bg-orange-600">
                      <Settings className="w-4 h-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <CardTitle className="text-lg">Security</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Security and access control</p>
                  <div className="space-y-2">
                    <Button size="sm" className="w-full bg-red-500 hover:bg-red-600">
                      <Shield className="w-4 h-4 mr-2" />
                      Audit Logs
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Admin Notice */}
            <Card className="border-[#474dff] bg-[#474dff]/5">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-[#474dff]" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Administrator Access</h3>
                    <p className="text-sm text-gray-600">
                      You have full administrative privileges. Use these controls responsibly to manage the IoT platform.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </PrivateRoute>
  );
}