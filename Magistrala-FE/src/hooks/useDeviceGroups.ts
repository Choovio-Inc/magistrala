import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deviceGroupsService } from '@/services/device-groups';
import { DeviceGroup } from '@/types';
import { toast } from 'sonner';

export const useDeviceGroups = () => {
  const queryClient = useQueryClient();

  const {
    data: deviceGroups = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['device-groups'],
    queryFn: deviceGroupsService.getDeviceGroups,
  });

  const createGroupMutation = useMutation({
    mutationFn: deviceGroupsService.createDeviceGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['device-groups'] });
      toast.success('Device group created successfully');
    },
    onError: (error) => {
      toast.error('Failed to create device group');
      console.error('Create group error:', error);
    },
  });

  const updateGroupMutation = useMutation({
    mutationFn: ({ id, group }: { id: string; group: Partial<DeviceGroup> }) =>
      deviceGroupsService.updateDeviceGroup(id, group),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['device-groups'] });
      toast.success('Device group updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update device group');
      console.error('Update group error:', error);
    },
  });

  const deleteGroupMutation = useMutation({
    mutationFn: deviceGroupsService.deleteDeviceGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['device-groups'] });
      toast.success('Device group deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete device group');
      console.error('Delete group error:', error);
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'enabled' | 'disabled' }) =>
      deviceGroupsService.toggleDeviceGroupStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['device-groups'] });
      toast.success('Device group status updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update device group status');
      console.error('Toggle status error:', error);
    },
  });

  const getChildrenMutation = useMutation({
    mutationFn: deviceGroupsService.getDeviceGroupChildren,
  });

  return {
    deviceGroups,
    isLoading,
    error,
    refetch,
    createGroup: createGroupMutation.mutate,
    updateGroup: updateGroupMutation.mutate,
    deleteGroup: deleteGroupMutation.mutate,
    toggleStatus: toggleStatusMutation.mutate,
    getChildren: getChildrenMutation.mutate,
    isCreating: createGroupMutation.isPending,
    isUpdating: updateGroupMutation.isPending,
    isDeleting: deleteGroupMutation.isPending,
    isToggling: toggleStatusMutation.isPending,
    isLoadingChildren: getChildrenMutation.isPending,
  };
}; 