'use client';

import * as React from 'react';
import { jwtDecode } from 'jwt-decode';
import { authService } from '@/services/auth';

// Define user roles
export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

// Define JWT token payload interface
interface JWTPayload {
  user_id: string;
  role: string;
  organization_id: string;
  exp: number;
  iat: number;
  name?: string;
  email?: string;
}

// Define user interface
export interface User {
  id: string;
  name?: string;
  role: UserRole;
  organizationId: string;
}

// Define auth context interface
interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isCustomer: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  hasRole: (roles: UserRole[]) => boolean;
  checkTokenExpiry: () => boolean;
}

// Create auth context
const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [token, setToken] = React.useState<string | null>(null);

  // Initialize auth state from localStorage on mount
  React.useEffect(() => {
    const savedToken = localStorage.getItem('auth_token');
    if (savedToken) {
      const isValid = validateAndSetToken(savedToken);
      if (!isValid) {
        // Clear invalid token
        localStorage.removeItem('auth_token');
      }
    }
  }, []);

  // Validate and decode JWT token
  const validateAndSetToken = (tokenString: string): boolean => {
    try {
      const decoded = jwtDecode<JWTPayload>(tokenString);
      
      // Check if token is expired
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp < currentTime) {
        console.warn('Token has expired');
        return false;
      }

      // Validate required claims
      if (!decoded.user_id || !decoded.role || !decoded.organization_id) {
        console.error('Invalid token: missing required claims');
        return false;
      }

      // Validate role
      if (!Object.values(UserRole).includes(decoded.role as UserRole)) {
        console.error('Invalid token: invalid role');
        return false;
      }

      // Set user and token
      const userData: User = {
        id: decoded.user_id,
        name: decoded.name || decoded.email || undefined,
        role: decoded.role as UserRole,
        organizationId: decoded.organization_id,
      };

      setUser(userData);
      setToken(tokenString);
      return true;
    } catch (error) {
      console.error('Error decoding token:', error);
      return false;
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string, role: string) => {
    try {
      // Register the user
      await authService.register({
        name,
        email,
        password,
      });
      
      // After successful registration, automatically log in the user
      const loginResponse = await authService.login({
        email,
        password,
      });
      
      // Use the login function to set the user state
      const isValid = validateAndSetToken(loginResponse.access_token);
      if (!isValid) {
        throw new Error('Failed to login after registration');
      }
      
      // Store the token in localStorage
      localStorage.setItem('auth_token', loginResponse.access_token);
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  };

  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    try {
      // Call the auth service to authenticate
      const loginResponse = await authService.login({
        email,
        password,
      });
      
      // Validate and set the token from the response
      const isValid = validateAndSetToken(loginResponse.access_token);
      if (!isValid) {
        throw new Error('Invalid token received from server');
      }
      
      // Store the token in localStorage
      localStorage.setItem('auth_token', loginResponse.access_token);
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_token');
    // Redirect to login page
    window.location.href = '/login';
  };

  // Check if user has any of the specified roles
  const hasRole = (roles: UserRole[]): boolean => {
    return user ? roles.includes(user.role) : false;
  };

  // Check if token is about to expire (within 5 minutes)
  const checkTokenExpiry = (): boolean => {
    if (!token) return false;

    try {
      const decoded = jwtDecode<JWTPayload>(token);
      const currentTime = Math.floor(Date.now() / 1000);
      const timeUntilExpiry = decoded.exp - currentTime;
      
      // Return true if token expires within 5 minutes
      return timeUntilExpiry < 300;
    } catch (error) {
      return true; // Consider expired if can't decode
    }
  };

  // Auto-logout on token expiry
  React.useEffect(() => {
    if (!token) return;

    const checkExpiry = () => {
      try {
        const decoded = jwtDecode<JWTPayload>(token);
        const currentTime = Math.floor(Date.now() / 1000);
        
        if (decoded.exp < currentTime) {
          console.warn('Token expired, logging out');
          logout();
        }
      } catch (error) {
        console.error('Error checking token expiry:', error);
        logout();
      }
    };

    // Check expiry every minute
    const interval = setInterval(checkExpiry, 60000);
    return () => clearInterval(interval);
  }, [token]);

  const contextValue: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isAdmin: user?.role === UserRole.ADMIN,
    isCustomer: user?.role === UserRole.CUSTOMER,
    login,
    register,
    logout,
    hasRole,
    checkTokenExpiry,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth(): AuthContextType {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Higher-order component for role-based access
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  allowedRoles?: UserRole[]
) {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, hasRole, user } = useAuth();

    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return <div>Redirecting to login...</div>;
    }

    if (allowedRoles && !hasRole(allowedRoles)) {
      // Show unauthorized message if user doesn't have required role
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
            <p className="text-gray-600 mb-4">
              You don't have permission to access this page.
            </p>
            <p className="text-sm text-gray-500">
              Required roles: {allowedRoles.join(', ')}
            </p>
            <p className="text-sm text-gray-500">
              Your role: {user?.role || 'unknown'}
            </p>
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
}

// Role-based component visibility
export function RoleGuard({ 
  children, 
  allowedRoles, 
  fallback = null 
}: { 
  children: React.ReactNode;
  allowedRoles: UserRole[];
  fallback?: React.ReactNode;
}) {
  const { hasRole } = useAuth();

  if (!hasRole(allowedRoles)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

// Admin-only component wrapper
export function AdminOnly({ 
  children, 
  fallback = null 
}: { 
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRoles={[UserRole.ADMIN]} fallback={fallback}>
      {children}
    </RoleGuard>
  );
}

// Customer-only component wrapper
export function CustomerOnly({ 
  children, 
  fallback = null 
}: { 
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRoles={[UserRole.CUSTOMER]} fallback={fallback}>
      {children}
    </RoleGuard>
  );
}

// Admin or Customer component wrapper
export function AuthorizedOnly({ 
  children, 
  fallback = null 
}: { 
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRoles={[UserRole.ADMIN, UserRole.CUSTOMER]} fallback={fallback}>
      {children}
    </RoleGuard>
  );
}