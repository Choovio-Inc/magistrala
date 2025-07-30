import { api } from '@/shared/services/api';
import { Organization, AnalyticsSummary } from '@/shared/types';

export const adminService = {
  getOrganizations: async (params?: { status?: string; search?: string }): Promise<Organization[]> => {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.search) queryParams.append('search', params.search);
    const queryString = queryParams.toString();
    return api<Organization[]>(`/domains${queryString ? `?${queryString}` : ''}`);
  },

  createOrganization: async (data: Partial<Organization>): Promise<Organization> => {
    return api<Organization>('/domains', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateOrganization: async (id: string, data: Partial<Organization>): Promise<Organization> => {
    return api<Organization>(`/domains/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteOrganization: async (id: string): Promise<void> => {
    return api(`/domains/${id}`, {
      method: 'DELETE',
    });
  },

  getAnalyticsSummary: async (): Promise<AnalyticsSummary> => {
    return api<AnalyticsSummary>('/analytics/org-summary');
  },

  // Mock data for development
  getOrganizationsMock: async (params?: { status?: string; search?: string }): Promise<Organization[]> => {
    const now = new Date();
    
    const organizations: Organization[] = [
      {
        id: '1',
        name: 'TechCorp Solutions',
        alias: 'techcorp',
        status: 'enabled',
        tags: ['technology', 'enterprise'],
        roleId: 'admin',
        roleName: 'Administrator',
        actions: ['read', 'write', 'delete'],
        createdBy: 'admin@choovio.com',
        createdAt: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        updatedBy: 'admin@choovio.com',
        updatedAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '2',
        name: 'Green Energy Co',
        alias: 'greenenergy',
        status: 'enabled',
        tags: ['energy', 'sustainability'],
        roleId: 'user',
        roleName: 'Standard User',
        actions: ['read', 'write'],
        createdBy: 'admin@choovio.com',
        createdAt: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        updatedBy: 'admin@choovio.com',
        updatedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '3',
        name: 'Smart City Initiative',
        alias: 'smartcity',
        status: 'enabled',
        tags: ['government', 'iot'],
        roleId: 'admin',
        roleName: 'Administrator',
        actions: ['read', 'write', 'delete'],
        createdBy: 'admin@choovio.com',
        createdAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updatedBy: 'admin@choovio.com',
        updatedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '4',
        name: 'Industrial IoT Ltd',
        alias: 'industrial-iot',
        status: 'disabled',
        tags: ['manufacturing', 'industrial'],
        roleId: 'user',
        roleName: 'Standard User',
        actions: ['read'],
        createdBy: 'admin@choovio.com',
        createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        updatedBy: 'admin@choovio.com',
        updatedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '5',
        name: 'Healthcare Monitoring',
        alias: 'healthcare',
        status: 'enabled',
        tags: ['healthcare', 'monitoring'],
        roleId: 'admin',
        roleName: 'Administrator',
        actions: ['read', 'write', 'delete'],
        createdBy: 'admin@choovio.com',
        createdAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        updatedBy: 'admin@choovio.com',
        updatedAt: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];

    let filtered = organizations;

    if (params?.status && params.status !== 'all') {
      filtered = filtered.filter(org => org.status === params.status);
    }

    if (params?.search) {
      const searchLower = params.search.toLowerCase();
      filtered = filtered.filter(org => 
        org.name.toLowerCase().includes(searchLower) ||
        org.alias?.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  },

  createOrganizationMock: async (data: Partial<Organization>): Promise<Organization> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const now = new Date();
    return {
      id: Math.random().toString(36).substr(2, 9),
      name: data.name || 'New Organization',
      alias: data.alias,
      status: data.status || 'enabled',
      tags: data.tags || [],
      roleId: data.roleId || 'user',
      roleName: data.roleId === 'admin' ? 'Administrator' : 'Standard User',
      actions: data.roleId === 'admin' ? ['read', 'write', 'delete'] : ['read', 'write'],
      createdBy: 'admin@choovio.com',
      createdAt: now.toISOString(),
      updatedBy: 'admin@choovio.com',
      updatedAt: now.toISOString(),
    };
  },

  updateOrganizationMock: async (id: string, data: Partial<Organization>): Promise<Organization> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const now = new Date();
    return {
      id,
      name: data.name || 'Updated Organization',
      alias: data.alias,
      status: data.status || 'enabled',
      tags: data.tags || [],
      roleId: data.roleId || 'user',
      roleName: data.roleId === 'admin' ? 'Administrator' : 'Standard User',
      actions: data.roleId === 'admin' ? ['read', 'write', 'delete'] : ['read', 'write'],
      createdBy: 'admin@choovio.com',
      createdAt: new Date().toISOString(),
      updatedBy: 'admin@choovio.com',
      updatedAt: now.toISOString(),
    };
  },

  deleteOrganizationMock: async (id: string): Promise<void> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
  },

  getAnalyticsSummaryMock: async (): Promise<AnalyticsSummary> => {
    const now = new Date();
    const signupTrends = Array.from({ length: 30 }, (_, i) => ({
      date: new Date(now.getTime() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      count: Math.floor(Math.random() * 20) + 5,
    }));

    return {
      total_users: 1234,
      active_devices: 567,
      data_streams: 890,
      signup_trends: signupTrends,
    };
  },
}; 