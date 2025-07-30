import { api } from '@/shared/services/api';
import { DeviceGroup } from '@/shared/types';

export const deviceGroupsService = {
  getDeviceGroups: async (): Promise<DeviceGroup[]> => {
    const response = await api<{ groups: DeviceGroup[] }>('/groups');
    return response.groups || [];
  },

  getDeviceGroupById: async (id: string): Promise<DeviceGroup> => {
    return api<DeviceGroup>(`/groups/${id}`);
  },

  getDeviceGroupChildren: async (parentId: string): Promise<DeviceGroup[]> => {
    const response = await api<{ groups: DeviceGroup[] }>(`/groups/${parentId}/children`);
    return response.groups || [];
  },

  createDeviceGroup: async (group: Partial<DeviceGroup>): Promise<DeviceGroup> => {
    return api<DeviceGroup>('/groups', {
      method: 'POST',
      body: JSON.stringify(group),
    });
  },

  updateDeviceGroup: async (id: string, group: Partial<DeviceGroup>): Promise<DeviceGroup> => {
    return api<DeviceGroup>(`/groups/${id}`, {
      method: 'PUT',
      body: JSON.stringify(group),
    });
  },

  deleteDeviceGroup: async (id: string): Promise<void> => {
    return api(`/groups/${id}`, {
      method: 'DELETE',
    });
  },

  toggleDeviceGroupStatus: async (id: string, status: 'enabled' | 'disabled'): Promise<DeviceGroup> => {
    return api<DeviceGroup>(`/groups/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },
}; 