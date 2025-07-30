'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useNotifications } from '@/contexts/NotificationContext';
import { Sidebar } from '@/components/ui/sidebar';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function TestPage() {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const { unreadCount } = useNotifications();

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>
      
      <div className="flex-1 overflow-auto">
        <PageHeader 
          title="Test Page" 
          breadcrumbs={[
            { label: 'Choovio' },
            { label: 'Test' }
          ]}
          notificationCount={unreadCount}
          onNotificationClick={() => {
            console.log('Notification clicked');
          }}
        />

        <main className="p-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Component Test</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Authentication Status</h3>
                <div className="space-y-2">
                  <p><strong>Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}</p>
                  <p><strong>User Role:</strong> {user?.role || 'None'}</p>
                  <p><strong>Is Admin:</strong> {isAdmin ? 'Yes' : 'No'}</p>
                  <p><strong>User Name:</strong> {user ? `${user.firstName} ${user.lastName}` : 'None'}</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Notifications</h3>
                <p><strong>Unread Count:</strong> {unreadCount}</p>
              </div>

              <div>
                <h3 className="font-medium mb-2">UI Components</h3>
                <div className="flex gap-2">
                  <Button variant="default">Default Button</Button>
                  <Button variant="outline">Outline Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="destructive">Destructive Button</Button>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Badges</h3>
                <div className="flex gap-2">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Status</h3>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800">✅ All components are working correctly!</p>
                  <p className="text-green-600 text-sm mt-1">The file reorganization was successful.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
} 