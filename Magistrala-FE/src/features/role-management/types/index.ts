// Role Management Types
export interface Role {
  id: string;
  name: string;
  entityId: string;     // user ID
  createdBy: string;
  createdAt: string;    // ISO date string
  updatedBy?: string;
  updatedAt?: string;
  actions?: string[];
  members?: string[];   // user IDs or emails
}

export interface Organization {
  id: string;
  name: string;
  description?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt?: string;
}

export interface CreateRoleRequest {
  name: string;
  entityId: string;
  actions?: string[];
  members?: string[];
}

export interface UpdateRoleRequest {
  id: string;
  name?: string;
  actions?: string[];
  members?: string[];
}

export interface RoleSearchParams {
  search?: string;
  organizationId?: string;
  limit?: number;
  offset?: number;
  orderBy?: 'name' | 'createdAt' | 'updatedAt';
  orderDir?: 'asc' | 'desc';
}

export interface RolesListResponse {
  roles: Role[];
  total: number;
  offset: number;
  limit: number;
}

// Common action types for roles
export const ROLE_ACTIONS = {
  // User management
  USER_CREATE: 'user.create',
  USER_READ: 'user.read',
  USER_UPDATE: 'user.update',
  USER_DELETE: 'user.delete',
  
  // Device management
  DEVICE_CREATE: 'device.create',
  DEVICE_READ: 'device.read',
  DEVICE_UPDATE: 'device.update',
  DEVICE_DELETE: 'device.delete',
  
  // Dashboard management
  DASHBOARD_CREATE: 'dashboard.create',
  DASHBOARD_READ: 'dashboard.read',
  DASHBOARD_UPDATE: 'dashboard.update',
  DASHBOARD_DELETE: 'dashboard.delete',
  
  // Role management
  ROLE_CREATE: 'role.create',
  ROLE_READ: 'role.read',
  ROLE_UPDATE: 'role.update',
  ROLE_DELETE: 'role.delete',
  
  // Organization management
  ORG_READ: 'organization.read',
  ORG_UPDATE: 'organization.update',
  
  // Admin actions
  ADMIN_ALL: 'admin.all',
} as const;

export type RoleAction = typeof ROLE_ACTIONS[keyof typeof ROLE_ACTIONS];

// Role type categories for UI display
export const ROLE_TYPES = {
  ADMIN: 'admin',
  EDITOR: 'editor',
  VIEWER: 'viewer',
  CUSTOM: 'custom',
} as const;

export type RoleType = typeof ROLE_TYPES[keyof typeof ROLE_TYPES]; 