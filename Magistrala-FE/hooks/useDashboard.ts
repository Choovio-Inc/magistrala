import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '@/services/dashboard';

export const useOrganizationStats = () => {
  return useQuery({
    queryKey: ['organization-stats'],
    queryFn: dashboardService.getOrganizationStats,
    refetchInterval: 60000, // Refetch every minute
  });
};

export const useRecentDashboards = () => {
  return useQuery({
    queryKey: ['recent-dashboards'],
    queryFn: dashboardService.getRecentDashboards,
  });
};

export const useAlerts = () => {
  return useQuery({
    queryKey: ['alerts'],
    queryFn: dashboardService.getAlerts,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};