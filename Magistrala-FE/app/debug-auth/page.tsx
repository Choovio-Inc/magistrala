'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function DebugAuthPage() {
  const { user, isAuthenticated, token, isAdmin, isUser } = useAuth();
  const router = useRouter();

  const checkLocalStorage = () => {
    const authToken = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    console.log('LocalStorage auth_token:', authToken);
    console.log('LocalStorage user_data:', userData);
    return { authToken, userData };
  };

  const { authToken, userData } = checkLocalStorage();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Authentication Debug Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Auth Context State:</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>isAuthenticated:</strong> {isAuthenticated ? 'true' : 'false'}</p>
                  <p><strong>isAdmin:</strong> {isAdmin ? 'true' : 'false'}</p>
                  <p><strong>isUser:</strong> {isUser ? 'true' : 'false'}</p>
                  <p><strong>Token exists:</strong> {token ? 'true' : 'false'}</p>
                  <p><strong>User exists:</strong> {user ? 'true' : 'false'}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">LocalStorage State:</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>auth_token exists:</strong> {authToken ? 'true' : 'false'}</p>
                  <p><strong>user_data exists:</strong> {userData ? 'true' : 'false'}</p>
                </div>
              </div>
            </div>

            {user && (
              <div>
                <h3 className="font-semibold mb-2">User Details:</h3>
                <div className="bg-gray-100 p-3 rounded text-sm">
                  <pre>{JSON.stringify(user, null, 2)}</pre>
                </div>
              </div>
            )}

            {authToken && (
              <div>
                <h3 className="font-semibold mb-2">Auth Token:</h3>
                <div className="bg-gray-100 p-3 rounded text-sm break-all">
                  {authToken}
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button 
                onClick={() => router.push('/auth/login')}
                variant="outline"
              >
                Go to Login
              </Button>
              <Button 
                onClick={() => router.push('/')}
                variant="outline"
              >
                Go to Homepage
              </Button>
              <Button 
                onClick={() => window.location.reload()}
                variant="outline"
              >
                Reload Page
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 