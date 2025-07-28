import { api } from '@/lib/api';
import { Device } from '@/types';

export const devicesService = {
  getDevices: async (): Promise<Device[]> => {
    const response = await api<{ things: Device[] }>('/things');
    return response.things || [];
  },

  getDeviceById: async (id: string): Promise<Device> => {
    return api<Device>(`/things/${id}`);
  },

  createDevice: async (device: Partial<Device>): Promise<Device> => {
    return api<Device>('/things', {
      method: 'POST',
      body: JSON.stringify(device),
    });
  },

  updateDevice: async (id: string, device: Partial<Device>): Promise<Device> => {
    return api<Device>(`/things/${id}`, {
      method: 'PUT',
      body: JSON.stringify(device),
    });
  },

  deleteDevice: async (id: string): Promise<void> => {
    return api(`/things/${id}`, {
      method: 'DELETE',
    });
  },
};