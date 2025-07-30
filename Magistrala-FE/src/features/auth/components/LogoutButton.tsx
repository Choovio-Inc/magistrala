'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

interface LogoutButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  children?: React.ReactNode;
}

export function LogoutButton({ 
  variant = 'outline', 
  size = 'default', 
  className = '',
  children 
}: LogoutButtonProps) {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    // Redirect to login page
    window.location.href = '/auth/login';
  };

  return (
    <Button 
      variant={variant} 
      size={size} 
      onClick={handleLogout}
      className={className}
    >
      <LogOut className="h-4 w-4 mr-2" />
      {children || 'Logout'}
    </Button>
  );
} 