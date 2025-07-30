'use client';

import * as React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/user';
import { useRouter } from 'next/navigation';

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  redirectTo?: string;
  showUnauthorized?: boolean;
}

export function PrivateRoute({ 
  children, 
  allowedRoles = [UserRole.ADMIN, UserRole.USER],
  redirectTo = '/auth/login',
  showUnauthorized = true
}: PrivateRouteProps) {
  const { isAuthenticated, hasRole, user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Wait a bit for authentication state to be properly initialized
    const timer = setTimeout(() => {
      // Check authentication status
      if (!isAuthenticated) {
        router.push(redirectTo);
        return;
      }

      // Check role permissions
      if (!hasRole(allowedRoles)) {
        if (showUnauthorized) {
          router.push('/unauthorized');
        } else {
          router.push(redirectTo);
        }
        return;
      }

      setIsLoading(false);
    }, 100); // Small delay to ensure auth state is loaded

    return () => clearTimeout(timer);
  }, [isAuthenticated, hasRole, allowedRoles, router, redirectTo, showUnauthorized]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#474dff]"></div>
      </div>
    );
  }

  // Show unauthorized page for insufficient permissions
  if (!hasRole(allowedRoles)) {
    if (showUnauthorized) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
            <p className="text-gray-600 mb-4">
              You don't have permission to access this page.
            </p>
            <div className="text-sm text-gray-500 space-y-1">
              <p>Required roles: {allowedRoles.join(', ')}</p>
              <p>Your role: {user?.role || 'unknown'}</p>
            </div>
            <button
              onClick={() => router.push('/dashboard')}
              className="mt-4 px-4 py-2 bg-[#474dff] text-white rounded-md hover:bg-[#474dff]/90 transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      );
    }
    return null;
  }

  return <>{children}</>;
}

// Specific route guards for common use cases
export function AdminRoute({ children }: { children: React.ReactNode }) {
  return (
    <PrivateRoute allowedRoles={[UserRole.ADMIN]}>
      {children}
    </PrivateRoute>
  );
}

export function CustomerRoute({ children }: { children: React.ReactNode }) {
  return (
    <PrivateRoute allowedRoles={[UserRole.USER]}>
      {children}
    </PrivateRoute>
  );
}

export function AuthenticatedRoute({ children }: { children: React.ReactNode }) {
  return (
    <PrivateRoute allowedRoles={[UserRole.ADMIN, UserRole.USER]}>
      {children}
    </PrivateRoute>
  );
}