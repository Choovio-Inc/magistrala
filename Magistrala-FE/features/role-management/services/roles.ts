import { api } from '@/shared/services/api';
import { 
  Role, 
  Organization, 
  CreateRoleRequest, 
  UpdateRoleRequest, 
  RoleSearchParams, 
  RolesListResponse,
  ROLE_ACTIONS 
} from '@/features/role-management/types';

// Mock data for development
const mockOrganizations: Organization[] = [
  {
    id: 'org-1',
    name: 'Main Organization',
    description: 'Primary organization for all users',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'org-2',
    name: 'Development Team',
    description: 'Organization for development team members',
    status: 'active',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: 'org-3',
    name: 'Sales Team',
    description: 'Organization for sales team members',
    status: 'active',
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z'
  }
];

const mockRoles: Role[] = [
  {
    id: 'role-1',
    name: 'System Administrator',
    entityId: 'user-1',
    createdBy: 'admin-123',
    createdAt: '2024-01-01T00:00:00Z',
    updatedBy: 'admin-123',
    updatedAt: '2024-01-15T00:00:00Z',
    actions: [ROLE_ACTIONS.ADMIN_ALL],
    members: ['admin-123', 'user-1']
  },
  {
    id: 'role-2',
    name: 'Device Manager',
    entityId: 'user-2',
    createdBy: 'admin-123',
    createdAt: '2024-01-10T00:00:00Z',
    updatedBy: 'admin-123',
    updatedAt: '2024-01-20T00:00:00Z',
    actions: [
      ROLE_ACTIONS.DEVICE_CREATE,
      ROLE_ACTIONS.DEVICE_READ,
      ROLE_ACTIONS.DEVICE_UPDATE,
      ROLE_ACTIONS.DASHBOARD_READ
    ],
    members: ['user-2', 'user-3', 'user-4']
  },
  {
    id: 'role-3',
    name: 'Viewer',
    entityId: 'user-3',
    createdBy: 'admin-123',
    createdAt: '2024-01-05T00:00:00Z',
    actions: [
      ROLE_ACTIONS.DEVICE_READ,
      ROLE_ACTIONS.DASHBOARD_READ,
      ROLE_ACTIONS.USER_READ
    ],
    members: ['user-5', 'user-6', 'user-7']
  },
  {
    id: 'role-4',
    name: 'Editor',
    entityId: 'user-4',
    createdBy: 'admin-123',
    createdAt: '2024-01-12T00:00:00Z',
    updatedBy: 'admin-123',
    updatedAt: '2024-01-25T00:00:00Z',
    actions: [
      ROLE_ACTIONS.DEVICE_CREATE,
      ROLE_ACTIONS.DEVICE_READ,
      ROLE_ACTIONS.DEVICE_UPDATE,
      ROLE_ACTIONS.DASHBOARD_CREATE,
      ROLE_ACTIONS.DASHBOARD_READ,
      ROLE_ACTIONS.DASHBOARD_UPDATE
    ],
    members: ['user-8', 'user-9']
  }
];

export const rolesService = {
  // Get all organizations
  getOrganizations: async (): Promise<Organization[]> => {
    // Mock implementation - replace with actual API call when backend is ready
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockOrganizations), 500);
    });

    // Uncomment this when backend is ready:
    // return api<Organization[]>('/organizations');
  },

  // Get roles for a specific organization
  getRoles: async (params: RoleSearchParams): Promise<RolesListResponse> => {
    // Mock implementation - replace with actual API call when backend is ready
    let filteredRoles = [...mockRoles];
    
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filteredRoles = filteredRoles.filter(role => 
        role.name.toLowerCase().includes(searchLower) ||
        role.members?.some(member => member.toLowerCase().includes(searchLower))
      );
    }

    const total = filteredRoles.length;
    const offset = params.offset || 0;
    const limit = params.limit || 10;
    const paginatedRoles = filteredRoles.slice(offset, offset + limit);

    return new Promise((resolve) => {
      setTimeout(() => resolve({
        roles: paginatedRoles,
        total,
        offset,
        limit
      }), 500);
    });

    // Uncomment this when backend is ready:
    // return api<RolesListResponse>('/roles', {
    //   method: 'GET',
    //   params: params
    // });
  },

  // Get a specific role by ID
  getRole: async (id: string): Promise<Role> => {
    // Mock implementation - replace with actual API call when backend is ready
    const role = mockRoles.find(r => r.id === id);
    if (!role) {
      throw new Error('Role not found');
    }

    return new Promise((resolve) => {
      setTimeout(() => resolve(role), 300);
    });

    // Uncomment this when backend is ready:
    // return api<Role>(`/roles/${id}`);
  },

  // Create a new role
  createRole: async (roleData: CreateRoleRequest): Promise<Role> => {
    // Mock implementation - replace with actual API call when backend is ready
    const newRole: Role = {
      id: `role-${Date.now()}`,
      name: roleData.name,
      entityId: roleData.entityId,
      createdBy: 'admin-123', // This should come from auth context
      createdAt: new Date().toISOString(),
      actions: roleData.actions || [],
      members: roleData.members || []
    };

    mockRoles.push(newRole);

    return new Promise((resolve) => {
      setTimeout(() => resolve(newRole), 500);
    });

    // Uncomment this when backend is ready:
    // return api<Role>('/roles', {
    //   method: 'POST',
    //   body: JSON.stringify(roleData),
    // });
  },

  // Update an existing role
  updateRole: async (roleData: UpdateRoleRequest): Promise<Role> => {
    // Mock implementation - replace with actual API call when backend is ready
    const roleIndex = mockRoles.findIndex(r => r.id === roleData.id);
    if (roleIndex === -1) {
      throw new Error('Role not found');
    }

    const updatedRole: Role = {
      ...mockRoles[roleIndex],
      ...roleData,
      updatedBy: 'admin-123', // This should come from auth context
      updatedAt: new Date().toISOString()
    };

    mockRoles[roleIndex] = updatedRole;

    return new Promise((resolve) => {
      setTimeout(() => resolve(updatedRole), 500);
    });

    // Uncomment this when backend is ready:
    // return api<Role>(`/roles/${roleData.id}`, {
    //   method: 'PUT',
    //   body: JSON.stringify(roleData),
    // });
  },

  // Delete a role
  deleteRole: async (id: string): Promise<void> => {
    // Mock implementation - replace with actual API call when backend is ready
    const roleIndex = mockRoles.findIndex(r => r.id === id);
    if (roleIndex === -1) {
      throw new Error('Role not found');
    }

    mockRoles.splice(roleIndex, 1);

    return new Promise((resolve) => {
      setTimeout(() => resolve(), 500);
    });

    // Uncomment this when backend is ready:
    // return api(`/roles/${id}`, {
    //   method: 'DELETE',
    // });
  },

  // Get available actions for roles
  getAvailableActions: async (): Promise<string[]> => {
    // Mock implementation - replace with actual API call when backend is ready
    return Object.values(ROLE_ACTIONS);
  },

  // Get users for member selection
  getUsersForSelection: async (): Promise<Array<{ id: string; email: string; name: string }>> => {
    // Mock implementation - replace with actual API call when backend is ready
    return [
      { id: 'user-1', email: 'admin@example.com', name: 'Admin User' },
      { id: 'user-2', email: 'manager@example.com', name: 'Manager User' },
      { id: 'user-3', email: 'editor@example.com', name: 'Editor User' },
      { id: 'user-4', email: 'viewer@example.com', name: 'Viewer User' },
      { id: 'user-5', email: 'user1@example.com', name: 'User One' },
      { id: 'user-6', email: 'user2@example.com', name: 'User Two' },
      { id: 'user-7', email: 'user3@example.com', name: 'User Three' },
      { id: 'user-8', email: 'user4@example.com', name: 'User Four' },
      { id: 'user-9', email: 'user5@example.com', name: 'User Five' }
    ];
  }
}; 