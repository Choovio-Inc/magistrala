import { Role, ROLE_ACTIONS, ROLE_TYPES, RoleType } from '@/features/role-management/types';

/**
 * Get the role type based on the actions assigned to the role
 */
export const getRoleType = (role: Role): RoleType => {
  if (role.actions?.includes(ROLE_ACTIONS.ADMIN_ALL)) {
    return ROLE_TYPES.ADMIN;
  }
  
  if (role.actions?.some(action => 
    action.includes('create') || 
    action.includes('update') || 
    action.includes('delete')
  )) {
    return ROLE_TYPES.EDITOR;
  }
  
  return ROLE_TYPES.VIEWER;
};

/**
 * Get color classes for role type badges
 */
export const getRoleTypeColor = (roleType: RoleType): string => {
  switch (roleType) {
    case ROLE_TYPES.ADMIN:
      return 'bg-red-100 text-red-800 border-red-200';
    case ROLE_TYPES.EDITOR:
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case ROLE_TYPES.VIEWER:
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

/**
 * Get display label for role type
 */
export const getRoleTypeLabel = (roleType: RoleType): string => {
  switch (roleType) {
    case ROLE_TYPES.ADMIN:
      return 'Admin';
    case ROLE_TYPES.EDITOR:
      return 'Editor';
    case ROLE_TYPES.VIEWER:
      return 'Viewer';
    default:
      return 'Custom';
  }
};

/**
 * Format actions for display
 */
export const formatActions = (actions: string[] = []): string => {
  if (actions.includes(ROLE_ACTIONS.ADMIN_ALL)) {
    return 'All Permissions';
  }
  return actions.slice(0, 3).join(', ') + (actions.length > 3 ? '...' : '');
};

/**
 * Get action categories for grouping in UI
 */
export const getActionCategories = () => {
  return {
    'User Management': [
      ROLE_ACTIONS.USER_CREATE,
      ROLE_ACTIONS.USER_READ,
      ROLE_ACTIONS.USER_UPDATE,
      ROLE_ACTIONS.USER_DELETE
    ],
    'Device Management': [
      ROLE_ACTIONS.DEVICE_CREATE,
      ROLE_ACTIONS.DEVICE_READ,
      ROLE_ACTIONS.DEVICE_UPDATE,
      ROLE_ACTIONS.DEVICE_DELETE
    ],
    'Dashboard Management': [
      ROLE_ACTIONS.DASHBOARD_CREATE,
      ROLE_ACTIONS.DASHBOARD_READ,
      ROLE_ACTIONS.DASHBOARD_UPDATE,
      ROLE_ACTIONS.DASHBOARD_DELETE
    ],
    'Role Management': [
      ROLE_ACTIONS.ROLE_CREATE,
      ROLE_ACTIONS.ROLE_READ,
      ROLE_ACTIONS.ROLE_UPDATE,
      ROLE_ACTIONS.ROLE_DELETE
    ],
    'Organization Management': [
      ROLE_ACTIONS.ORG_READ,
      ROLE_ACTIONS.ORG_UPDATE
    ],
    'Admin Actions': [
      ROLE_ACTIONS.ADMIN_ALL
    ]
  };
};

/**
 * Check if a role has specific permission
 */
export const hasPermission = (role: Role, permission: string): boolean => {
  return role.actions?.includes(permission) || role.actions?.includes(ROLE_ACTIONS.ADMIN_ALL) || false;
};

/**
 * Get member count for a role
 */
export const getMemberCount = (role: Role): number => {
  return role.members?.length || 0;
};

/**
 * Validate role data
 */
export const validateRole = (roleData: Partial<Role>): string[] => {
  const errors: string[] = [];
  
  if (!roleData.name?.trim()) {
    errors.push('Role name is required');
  }
  
  if (roleData.name && roleData.name.length > 100) {
    errors.push('Role name must be less than 100 characters');
  }
  
  return errors;
}; 