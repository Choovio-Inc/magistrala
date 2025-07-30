'use client';

import { Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface PageHeaderProps {
  title: string;
  breadcrumbs?: Array<{
    label: string;
    href?: string;
  }>;
  children?: React.ReactNode;
  notificationCount?: number;
  onNotificationClick?: () => void;
}

export function PageHeader({ 
  title, 
  breadcrumbs = [], 
  children, 
  notificationCount = 0,
  onNotificationClick 
}: PageHeaderProps) {
  return (
    <header className="bg-[#474dff] px-6 py-4 h-24 flex items-center">
      <div className="flex items-center justify-between w-full">
        <div>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          {breadcrumbs.length > 0 && (
            <nav className="flex items-center space-x-2 text-sm text-white/80 mt-1">
              {breadcrumbs.map((breadcrumb, index) => (
                <span key={index}>
                  {index > 0 && <span className="mx-2">›</span>}
                  {breadcrumb.href ? (
                    <a href={breadcrumb.href} className="hover:text-white">
                      {breadcrumb.label}
                    </a>
                  ) : (
                    <span>{breadcrumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}
          {children}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-white hover:bg-white/10"
          onClick={onNotificationClick}
        >
          <Bell className="h-6 w-6" />
          {notificationCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {notificationCount > 9 ? '9+' : notificationCount}
            </Badge>
          )}
        </Button>
      </div>
    </header>
  );
} 