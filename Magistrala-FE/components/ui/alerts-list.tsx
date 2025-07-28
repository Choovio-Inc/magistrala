'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Info, XCircle } from 'lucide-react';
import { useAlerts } from '@/hooks/useDashboard';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

const getAlertIcon = (type: string) => {
  switch (type) {
    case 'warning':
      return <AlertTriangle className="h-4 w-4" />;
    case 'error':
      return <XCircle className="h-4 w-4" />;
    default:
      return <Info className="h-4 w-4" />;
  }
};

const getAlertColor = (type: string) => {
  switch (type) {
    case 'warning':
      return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
    case 'error':
      return 'bg-red-100 text-red-800 hover:bg-red-100';
    default:
      return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
  }
};

export function AlertsList() {
  const { data: alerts, isLoading } = useAlerts();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts?.map((alert) => (
            <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg border">
              <Badge variant="secondary" className={cn('mt-0.5', getAlertColor(alert.type))}>
                {getAlertIcon(alert.type)}
              </Badge>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{alert.title}</p>
                <p className="text-sm text-muted-foreground">{alert.message}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}