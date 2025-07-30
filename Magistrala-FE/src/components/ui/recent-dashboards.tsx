'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Thermometer } from 'lucide-react';
import { useRecentDashboards } from '@/hooks/useDashboard';
import { formatDistanceToNow } from 'date-fns';

const getDashboardIcon = (type: string) => {
  switch (type) {
    case 'temperature':
      return <Thermometer className="h-4 w-4" />;
    default:
      return <BarChart3 className="h-4 w-4" />;
  }
};

export function RecentDashboards() {
  const { data: dashboards, isLoading } = useRecentDashboards();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Dashboards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="animate-pulse h-20 bg-gray-200 rounded"></div>
            <div className="animate-pulse h-20 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Dashboards</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Dashboard Name</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dashboards?.map((dashboard) => (
              <TableRow key={dashboard.id}>
                <TableCell className="flex items-center space-x-2">
                  {getDashboardIcon(dashboard.type)}
                  <span className="font-medium">{dashboard.name}</span>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDistanceToNow(new Date(dashboard.created_at), { addSuffix: true })}
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}