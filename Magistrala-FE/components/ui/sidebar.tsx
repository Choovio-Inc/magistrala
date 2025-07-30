'use client';

import { UserRole } from '@/shared/types/user';
import { RoleGuard } from '@/components/ui/role-guard';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/shared/utils/utils';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { NotificationBell } from '@/components/ui/sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import {
  Home,
  BarChart3,
  Building2,
  UserCheck,
  FolderOpen,
  Radio,
  Smartphone,
  Zap,
  AlertTriangle,
  FileText,
  Shield,
  CreditCard,
  DollarSign,
  Receipt,
  Settings,
  User,
  Key,
  Bell,
  Palette,
  LogOut,
  ChevronDown
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getUserFullName, getUserInitials, getRoleLabel } from '@/shared/types/user';


const adminNavigationItems = [
  {
    title: 'GENERAL',
    items: [
      { name: 'Admin Dashboard', href: '/', icon: Home },
    ],
  },
  {
    title: 'ORGANIZATION MANAGEMENT',
    items: [
      { name: 'Organization', href: '/organization-management', icon: Building2 },
      { name: 'User Roles', href: '/user-roles', icon: UserCheck },
    ],
  },
  {
    title: 'BILLING & PAYMENTS',
    items: [
      { name: 'Billing Overview', href: '/billing', icon: CreditCard },
      { name: 'Payment Methods', href: '/billing/payment-methods', icon: DollarSign },
      { name: 'Invoices', href: '/billing/invoices', icon: Receipt },
      { name: 'Usage & Limits', href: '/billing/usage', icon: BarChart3 },
    ],
  },
  {
    title: 'DEVICE MANAGEMENT',
    items: [
      { name: 'Device Groups', href: '/device-groups', icon: FolderOpen },
      { name: 'Devices', href: '/devices', icon: Smartphone },
      { name: 'Automations', href: '/automations', icon: Zap },
      { name: 'Alerts', href: '/alerts', icon: AlertTriangle },
      { name: 'Reports', href: '/reports', icon: FileText },
    ],
  },
];

const userNavigationItems = [
  {
    title: 'GENERAL',
    items: [
      { name: 'User Dashboard', href: '/user-dashboard', icon: Home },
      { name: 'My Dashboards', href: '/dashboards', icon: BarChart3 },
    ],
  },
  {
    title: 'BILLING & PAYMENTS',
    items: [
      { name: 'Billing Overview', href: '/billing', icon: CreditCard },
      { name: 'Payment Methods', href: '/billing/payment-methods', icon: DollarSign },
      { name: 'Invoices', href: '/billing/invoices', icon: Receipt },
    ],
  },
  {
    title: 'DEVICE MANAGEMENT',
    items: [
      { name: 'Device Groups', href: '/device-groups', icon: FolderOpen },
      { name: 'Devices', href: '/devices', icon: Smartphone },
      { name: 'Automations', href: '/automations', icon: Zap },
      { name: 'Alerts', href: '/alerts', icon: AlertTriangle },
      { name: 'Reports', href: '/reports', icon: FileText },
    ],
  },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

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

  // Choose navigation items based on user role
  const navigationItems = user?.role === UserRole.ADMIN ? adminNavigationItems : userNavigationItems;

  return (
    <div className={cn('flex flex-col h-full bg-[#474dff] text-white', className)}>
      {/* Header - Aligned with main page header */}
      <div className="flex items-center px-6 py-4 h-24">
        <div className="w-40 h-12 pl-8">
          <Image
            src="/logo1.png"
            alt="Choovio Logo"
            width={160}
            height={48}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <Separator className="bg-white/20" />

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-6 py-4">
          {navigationItems.map((section) => {
            if (section.title === 'ORGANIZATION MANAGEMENT' || section.title === 'ADMIN') {
              return (
                <RoleGuard key={section.title} allowedRoles={[UserRole.ADMIN]}>
                  <div className="space-y-2">
                    <h3 className="px-3 text-xs font-semibold text-white uppercase tracking-wider">
                      {section.title}
                    </h3>
                    <div className="space-y-1">
                      {section.items.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                              'sidebar-pill w-full flex items-center text-white hover:text-white cursor-pointer text-sm',
                              isActive && 'active'
                            )}
                          >
                            <item.icon className="h-3 w-3 mr-2" />
                            {item.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </RoleGuard>
              );
            }
            
            return (
              <div key={section.title} className="space-y-2">
                <h3 className="px-3 text-xs font-semibold text-white uppercase tracking-wider">
                  {section.title}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          'sidebar-pill w-full flex items-center text-white hover:text-white cursor-pointer text-sm',
                          isActive && 'active'
                        )}
                      >
                        <item.icon className="h-3 w-3 mr-2" />
                        {item.name}
                        {item.name === 'Devices' && (
                          <RoleGuard allowedRoles={[UserRole.USER]} fallback={null}>
                            <span className="ml-auto text-xs bg-white/20 px-2 py-1 rounded text-white">Read Only</span>
                          </RoleGuard>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Profile Section - Bottom with UserMenu functionality */}
      <div className="mt-auto border-t border-white/20">
        <div className="px-6 py-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="w-full flex items-center space-x-3 hover:bg-white/10 p-2 rounded-lg"
              >
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">{getDisplayInitials()}</span>
                </div>
                <div className="text-left">
                  <p className="text-white">{getDisplayName()}</p>
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
        </div>
      </div>
    </div>
  );
}