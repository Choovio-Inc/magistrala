'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';
import { Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/utils/utils';

type ToasterProps = React.ComponentProps<typeof Sonner>;

// Notification Bell Component
interface NotificationBellProps {
  unreadCount?: number;
  className?: string;
  onClick?: () => void;
}

export function NotificationBell({ unreadCount = 0, className, onClick }: NotificationBellProps) {
  return (
    <div 
      className={cn(
        'flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity',
        className
      )}
      onClick={onClick}
    >
      <Bell className="h-5 w-5" />
      <span className="text-sm font-medium">Notifications</span>
      {unreadCount > 0 && (
        <Badge 
          variant="secondary" 
          className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-white/20 text-white hover:bg-white/30"
        >
          {unreadCount > 9 ? '9+' : unreadCount}
        </Badge>
      )}
    </div>
  );
}

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
