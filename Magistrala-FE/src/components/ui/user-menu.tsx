'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Settings, 
  LogOut, 
  ChevronDown, 
  Key, 
  Bell, 
  Shield, 
  CreditCard,
  HelpCircle,
  UserCog,
  Palette
} from 'lucide-react';
import { getUserFullName, getUserInitials, getRoleLabel } from '@/types/user';

export function UserMenu() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  const getDisplayName = () => {
    if (user) {
      return getUserFullName(user);
    }
    return 'User';
  };

  const getDisplayInitials = () => {
    if (user) {
      return getUserInitials(user);
    }
    return 'U';
  };

  const getUserRole = () => {
    return user ? getRoleLabel(user.role) : 'user';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-3 hover:bg-white/10 p-2 rounded-lg">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">{getDisplayInitials()}</span>
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-white">{getDisplayName()}</p>
            <p className="text-xs text-white/80">{user?.email || 'user@example.com'}</p>
          </div>
          <ChevronDown className="w-4 h-4 text-white/60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        {/* User Info Header */}
        <DropdownMenuLabel>
          <div className="flex items-center space-x-3 py-2">
            <div className="w-12 h-12 bg-[#474dff] rounded-full flex items-center justify-center">
              <span className="text-white font-medium">{getDisplayInitials()}</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{getDisplayName()}</p>
              <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
              <Badge variant="secondary" className="mt-1 text-xs capitalize">
                {getUserRole()}
              </Badge>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* Profile Management */}
        <div className="px-2 py-1">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Profile</p>
        </div>
        
        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex items-center cursor-pointer">
            <User className="w-4 h-4 mr-3" />
            <div className="flex-1">
              <p className="text-sm">Manage Profile</p>
              
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile/password" className="flex items-center cursor-pointer">
            <Key className="w-4 h-4 mr-3" />
            <div className="flex-1">
              <p className="text-sm">Change Password</p>
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile/preferences" className="flex items-center cursor-pointer">
            <Palette className="w-4 h-4 mr-3" />
            <div className="flex-1">
              <p className="text-sm">Preferences</p>
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile/security" className="flex items-center cursor-pointer">
            <Shield className="w-4 h-4 mr-3" />
            <div className="flex-1">
              <p className="text-sm">Security Settings</p>
            </div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* Logout */}
        <DropdownMenuItem 
          onClick={handleLogout}
          className="flex items-center cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
        >
          <LogOut className="w-4 h-4 mr-3" />
          <div className="flex-1">
            <p className="text-sm font-medium">Sign Out</p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 