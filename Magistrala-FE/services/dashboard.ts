import { api } from '@/lib/api';
import { Dashboard, OrganizationStats, Alert } from '@/types';

export const dashboardService = {
  getOrganizationStats: async (): Promise<OrganizationStats> => {
    // Mock data for now - replace with actual API calls
    return {
      members: { total: 32, enabled: 28, disabled: 4 },
      devices: { total: 125, enabled: 98, disabled: 27 },
      device_feeds: { total: 87, active: 75, inactive: 12 },
      projects: { total: 18, active: 15, inactive: 3 },
    };
  },

  getRecentDashboards: async (): Promise<Dashboard[]> => {
    // Mock data for now - replace with actual API calls
    return [
      {
        id: '1',
        name: 'Temperature Monitor',
        created_at: new Date(Date.now() - 23 * 60 * 60 * 1000 - 44 * 60 * 1000).toISOString(),
        type: 'temperature',
      },
      {
        id: '2',
        name: 'Energy Consumption',
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 - 12 * 60 * 60 * 1000).toISOString(),
        type: 'energy',
      },
    ];
  },

  getAlerts: async (): Promise<Alert[]> => {
    // Mock data for now - replace with actual API calls
    return [
      {
        id: '1',
        type: 'warning',
        title: 'High Temperature Alert',
        message: 'Sensor-001 exceeded 28°C threshold',
        device_id: 'sensor-001',
        timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      },
      {
        id: '2',
        type: 'error',
        title: 'Device Offline',
        message: 'Sensor-003 lost connection',
        device_id: 'sensor-003',
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      },
      {
        id: '3',
        type: 'info',
        title: 'Normal Operation',
        message: 'All systems functioning normally',
        timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      },
    ];
  },
};