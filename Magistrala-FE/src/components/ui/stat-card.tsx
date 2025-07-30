'use client';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/utils/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  enabled?: number;
  disabled?: number;
  active?: number;
  inactive?: number;
  className?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  enabled,
  disabled,
  active,
  inactive,
  className,
}: StatCardProps) {
  const positiveCount = enabled ?? active ?? 0;
  const negativeCount = disabled ?? inactive ?? 0;

  return (
    <Card className={cn('transition-all duration-200 hover:shadow-lg', className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-[#474dff] rounded-full mr-2" />
                <span>{positiveCount} {enabled !== undefined ? 'Enabled' : 'Active'}</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gray-300 rounded-full mr-2" />
                <span>{negativeCount} {disabled !== undefined ? 'Disabled' : 'Inactive'}</span>
              </div>
            </div>
          </div>
                  <div className="p-3 bg-[#474dff]/5 rounded-lg">
          <Icon className="h-6 w-6 text-[#474dff]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}