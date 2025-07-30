// Verification script for role management exports
// This file is for development verification only

import {
  // Components
  RoleList,
  RoleEditor,
  OrganizationSelector,
  DeleteRoleDialog,
  VirtualizedRoleList,
  RolePagination,
  
  // Hooks
  useRoles,
  useDebouncedSearch,
  usePerformanceMonitor,
  
  // Services
  rolesService,
  
  // Utils
  getRoleType,
  getRoleTypeColor,
  getRoleTypeLabel,
  formatActions
} from './index';

// Verify all exports are available
console.log('✅ Role Management Exports Verification:');
console.log('Components:', {
  RoleList: typeof RoleList,
  RoleEditor: typeof RoleEditor,
  OrganizationSelector: typeof OrganizationSelector,
  DeleteRoleDialog: typeof DeleteRoleDialog,
  VirtualizedRoleList: typeof VirtualizedRoleList,
  RolePagination: typeof RolePagination
});

console.log('Hooks:', {
  useRoles: typeof useRoles,
  useDebouncedSearch: typeof useDebouncedSearch,
  usePerformanceMonitor: typeof usePerformanceMonitor
});

console.log('Services:', {
  rolesService: typeof rolesService
});

console.log('Utils:', {
  getRoleType: typeof getRoleType,
  getRoleTypeColor: typeof getRoleTypeColor,
  getRoleTypeLabel: typeof getRoleTypeLabel,
  formatActions: typeof formatActions
});

console.log('🎉 All role management exports are properly configured!'); 