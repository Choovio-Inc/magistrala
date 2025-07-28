'use client';

import { useAuth, UserRole } from '@/contexts/AuthContext';
import { RoleGuard } from '@/components/ui/role-guard';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Home,
  BarChart3,
  Building2,
  Users,
  UserCheck,
  UserPlus,
  FolderOpen,
  Radio,
  Smartphone,
  Zap,
  AlertTriangle,
  FileText,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const navigationItems = [
  {
    title: 'NAVIGATION',
    items: [
      { name: 'Home', href: '/', icon: Home },
      { name: 'Dashboards', href: '/dashboards', icon: BarChart3 },
    ],
  },
  {
    title: 'ORGANIZATION MANAGEMENT',
    items: [
      { name: 'Organization', href: '/organization', icon: Building2 },
      { name: 'Members', href: '/members', icon: Users },
      { name: 'User Roles', href: '/user-roles', icon: UserCheck },
      { name: 'Invite User', href: '/invite-user', icon: UserPlus },
    ],
  },
  {
    title: 'DEVICE MANAGEMENT',
    items: [
      { name: 'Projects', href: '/projects', icon: FolderOpen },
      { name: 'Device Feeds', href: '/device-feeds', icon: Radio },
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
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/auth/login';
  };

  return (
    <div className={cn('flex flex-col h-full bg-[#474dff] text-white', className)}>
      {/* Header */}
      <div className="flex items-center justify-center p-6">
        <div className="w-20 h-16">
          <Image
            src="/logo.png"
            alt="Choovio Logo"
            width={80}
            height={64}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <Separator className="bg-white/20" />

      {/* User Info */}
      <div className="p-4 border-b border-white/20">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium">{user?.name || 'User'}</p>
            <p className="text-xs text-white/70 capitalize">{user?.role || 'customer'}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-6 py-4">
          {navigationItems.map((section) => {
            if (section.title === 'ORGANIZATION MANAGEMENT') {
              return (
                <RoleGuard key={section.title} allowedRoles={[UserRole.ADMIN]}>
                  <div className="space-y-2">
                    <h3 className="px-3 text-xs font-semibold text-white/70 uppercase tracking-wider">
                      {section.title}
                    </h3>
                    <div className="space-y-1">
                      {section.items.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                          <Button
                            key={item.name}
                            asChild
                            variant="ghost"
                            className={cn(
                              'w-full justify-start px-3 py-2 text-white/80 hover:text-white hover:bg-white/10',
                              isActive && 'bg-white/20 text-white font-medium'
                            )}
                          >
                            <Link href={item.href}>
                              <item.icon className="h-4 w-4 mr-3" />
                              {item.name}
                            </Link>
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                </RoleGuard>
              );
            }
            
            return (
              <div key={section.title} className="space-y-2">
                <h3 className="px-3 text-xs font-semibold text-white/70 uppercase tracking-wider">
                  {section.title}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Button
                        key={item.name}
                        asChild
                        variant="ghost"
                        className={cn(
                          'w-full justify-start px-3 py-2 text-white/80 hover:text-white hover:bg-white/10',
                          isActive && 'bg-white/20 text-white font-medium'
                        )}
                      >
                        <Link href={item.href}>
                          <item.icon className="h-4 w-4 mr-3" />
                          {item.name}
                          {item.name === 'Devices' && (
                            <RoleGuard allowedRoles={[UserRole.CUSTOMER]} fallback={null}>
                              <span className="ml-auto text-xs bg-white/20 px-2 py-1 rounded">Read Only</span>
                            </RoleGuard>
                          )}
                        </Link>
                      </Button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Logout Button */}
      <div className="p-4 border-t border-white/20">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-3 py-2 text-sm rounded-lg hover:bg-white/10 transition-colors text-white/90 hover:text-white"
        >
          <LogOut className="w-4 h-4 mr-3" />
          Sign Out
        </button>
      </div>
    </div>
  );
}