import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService } from '@/shared/services/admin';
import { Organization } from '@/shared/types';

export const useOrganizations = (params?: { status?: string; search?: string }) => {
  return useQuery({
    queryKey: ['organizations', params],
    queryFn: () => adminService.getOrganizationsMock(params),
    refetchInterval: 300000, // Refetch every 5 minutes
  });
};

export const useCreateOrganization = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: adminService.createOrganizationMock,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
    },
  });
};

export const useUpdateOrganization = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Organization> }) => 
      adminService.updateOrganizationMock(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
    },
  });
};

export const useDeleteOrganization = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: adminService.deleteOrganizationMock,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
    },
  });
};

export const useAnalyticsSummary = () => {
  return useQuery({
    queryKey: ['analytics-summary'],
    queryFn: adminService.getAnalyticsSummaryMock,
    refetchInterval: 60000, // Refetch every minute
  });
}; 