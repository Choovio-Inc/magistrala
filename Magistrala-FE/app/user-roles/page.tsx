'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { PrivateRoute } from '@/shared/components/auth/PrivateRoute';
import { Sidebar } from '@/components/ui/sidebar';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Search, 
  Shield,
  Plus,
  RefreshCw,
  Settings,
  Activity,
  Building2,
  Users
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/shared/types/user';
import { useNotifications } from '@/contexts/NotificationContext';
import { 
  useRoles, 
  useDebouncedSearch, 
  usePerformanceMonitor,
  RoleEditor,
  DeleteRoleDialog,
  VirtualizedRoleList,
  RolePagination,
  OrganizationSelector,
  Role,
  Organization
} from '@/features/role-management';

// Performance Metrics Display Component
const PerformanceMetrics = React.memo(({ metrics }: { metrics: any }) => (
  <div className="flex items-center gap-4 text-xs text-gray-500">
    <div className="flex items-center gap-1">
      <Activity className="h-3 w-3" />
      <span>Render: {metrics.renderTime?.toFixed(1)}ms</span>
    </div>
    <div className="flex items-center gap-1">
      <Search className="h-3 w-3" />
      <span>Search: {metrics.searchTime?.toFixed(1)}ms</span>
    </div>
    {metrics.memoryUsage && (
      <div className="flex items-center gap-1">
        <Settings className="h-3 w-3" />
        <span>Memory: {metrics.memoryUsage.toFixed(1)}MB</span>
      </div>
    )}
  </div>
));

PerformanceMetrics.displayName = 'PerformanceMetrics';

export default function UserRolesPage() {
  const { user } = useAuth();
  const { unreadCount } = useNotifications();
  const [selectedRole, setSelectedRole] = useState<Role | undefined>(undefined);
  const [isRoleEditorOpen, setIsRoleEditorOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  const {
    organizations,
    selectedOrganization,
    roles,
    loading,
    totalRoles,
    searchParams,
    setSelectedOrganization,
    createRole,
    updateRole,
    deleteRole,
    updateSearchParams,
    loadRoles
  } = useRoles();

  // Performance monitoring
  const { measureSearch, measureRender, getMetrics } = usePerformanceMonitor({
    enabled: process.env.NODE_ENV === 'development',
    logToConsole: true
  });

  // Debounced search
  const { searchTerm, debouncedSearchTerm, handleSearch, clearSearch } = useDebouncedSearch({
    delay: 300,
    minLength: 2
  });

  // Memoized filtered roles for better performance
  const filteredRoles = useMemo(() => {
    if (!debouncedSearchTerm) return roles;
    
    const searchLower = debouncedSearchTerm.toLowerCase();
    return roles.filter(role => 
      role.name.toLowerCase().includes(searchLower) ||
      role.members?.some(member => member.toLowerCase().includes(searchLower)) ||
      role.actions?.some(action => action.toLowerCase().includes(searchLower))
    );
  }, [roles, debouncedSearchTerm]);

  // Memoized paginated roles
  const paginatedRoles = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredRoles.slice(startIndex, endIndex);
  }, [filteredRoles, currentPage, pageSize]);

  // Memoized total pages
  const totalPages = useMemo(() => {
    return Math.ceil(filteredRoles.length / pageSize);
  }, [filteredRoles.length, pageSize]);

  // Performance-optimized search handler
  const handleSearchChange = useCallback((value: string) => {
    measureSearch(() => {
      handleSearch(value);
      updateSearchParams({ search: value });
    });
  }, [measureSearch, handleSearch, updateSearchParams]);

  // Performance-optimized page change handler
  const handlePageChange = useCallback((page: number) => {
    measureRender(() => {
      setCurrentPage(page);
    });
  }, [measureRender]);

  const handleEditRole = useCallback((role: Role) => {
    setSelectedRole(role);
    setIsRoleEditorOpen(true);
  }, []);

  const handleDeleteRole = useCallback((roleId: string) => {
    setRoleToDelete(roleId);
    setIsDeleteDialogOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (roleToDelete) {
      try {
        await deleteRole(roleToDelete);
        setIsDeleteDialogOpen(false);
        setRoleToDelete(null);
      } catch (error) {
        console.error('Failed to delete role:', error);
      }
    }
  }, [deleteRole, roleToDelete]);

  const handleCreateRole = useCallback(() => {
    setSelectedRole(undefined);
    setIsRoleEditorOpen(true);
  }, []);

  const handleRoleSave = useCallback(async (roleData: any) => {
    try {
      if (selectedRole) {
        await updateRole({ id: selectedRole.id, ...roleData });
      } else {
        await createRole(roleData);
      }
      setIsRoleEditorOpen(false);
      setSelectedRole(undefined);
    } catch (error) {
      console.error('Failed to save role:', error);
    }
  }, [selectedRole, createRole, updateRole]);

  // Performance metrics
  const metrics = getMetrics();

  return (
    <PrivateRoute allowedRoles={[UserRole.ADMIN]}>
      <div className="flex h-screen bg-gray-50">
        <div className="w-64 flex-shrink-0">
          <Sidebar />
        </div>
        
        <div className="flex-1 overflow-auto">
          {/* Header */}
          <PageHeader
            title="User Roles Management"
            breadcrumbs={[
              { label: 'Choovio' },
              { label: 'Admin' },
              { label: 'User Roles' }
            ]}
            notificationCount={unreadCount}
            onNotificationClick={() => {
              console.log('Notification clicked');
            }}
          />

          {/* Main Content */}
          <main className="p-6 space-y-6">
            {/* Organization Selector */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Organization Selection
                  </CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => loadRoles()}
                    disabled={loading}
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <OrganizationSelector
                  organizations={organizations}
                  selectedOrganization={selectedOrganization}
                  onOrganizationChange={setSelectedOrganization}
                  loading={loading}
                />
              </CardContent>
            </Card>

            {/* Roles Management */}
            {selectedOrganization && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        User Roles ({filteredRoles.length} of {totalRoles})
                      </CardTitle>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {selectedOrganization.name}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          placeholder="Search roles, members, or actions..."
                          value={searchTerm}
                          onChange={(e) => handleSearchChange(e.target.value)}
                          className="pl-10 w-64"
                        />
                      </div>
                      <Dialog open={isRoleEditorOpen} onOpenChange={setIsRoleEditorOpen}>
                        <DialogTrigger asChild>
                          <Button onClick={handleCreateRole}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Role
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>
                              {selectedRole ? 'Edit User Role' : 'Create New User Role'}
                            </DialogTitle>
                            <DialogDescription>
                              {selectedRole 
                                ? 'Modify the role permissions and members.'
                                : 'Create a new role with specific permissions and members.'
                              }
                            </DialogDescription>
                          </DialogHeader>
                          <RoleEditor
                            role={selectedRole}
                            organizationId={selectedOrganization.id}
                            onSave={handleRoleSave}
                            onCancel={() => setIsRoleEditorOpen(false)}
                          />
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <VirtualizedRoleList
                    roles={paginatedRoles}
                    loading={loading}
                    onEditRole={handleEditRole}
                    onDeleteRole={handleDeleteRole}
                    pageSize={pageSize}
                    currentPage={currentPage}
                  />
                  
                  <RolePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    className="mt-4"
                  />
                </CardContent>
              </Card>
            )}

            {/* Empty State */}
            {!selectedOrganization && !loading && (
              <Card>
                <CardContent className="text-center py-12">
                  <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Organization Selected</h3>
                  <p className="text-gray-500">Please select an organization to view and manage user roles.</p>
                </CardContent>
              </Card>
            )}
          </main>
        </div>

        {/* Delete Confirmation Dialog */}
        <DeleteRoleDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onConfirm={handleConfirmDelete}
          roleName={roles.find(r => r.id === roleToDelete)?.name || ''}
        />
      </div>
    </PrivateRoute>
  );
} 