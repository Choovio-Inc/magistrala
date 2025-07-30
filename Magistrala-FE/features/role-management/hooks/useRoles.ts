import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/shared/hooks/use-toast';
import { rolesService } from '@/features/role-management/services/roles';
import { 
  Role, 
  Organization, 
  CreateRoleRequest, 
  UpdateRoleRequest, 
  RoleSearchParams,
  RolesListResponse 
} from '@/features/role-management/types';

export const useRoles = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalRoles, setTotalRoles] = useState(0);
  const [searchParams, setSearchParams] = useState<RoleSearchParams>({
    limit: 10,
    offset: 0,
    orderBy: 'createdAt',
    orderDir: 'desc'
  });
  const { toast } = useToast();

  // Load organizations
  const loadOrganizations = useCallback(async () => {
    try {
      setLoading(true);
      const orgs = await rolesService.getOrganizations();
      setOrganizations(orgs);
      if (orgs.length > 0 && !selectedOrganization) {
        setSelectedOrganization(orgs[0]);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load organizations",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [selectedOrganization, toast]);

  // Load roles for selected organization
  const loadRoles = useCallback(async () => {
    if (!selectedOrganization) return;

    try {
      setLoading(true);
      const params = {
        ...searchParams,
        organizationId: selectedOrganization.id
      };
      const response = await rolesService.getRoles(params);
      setRoles(response.roles);
      setTotalRoles(response.total);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load roles",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [selectedOrganization, searchParams, toast]);

  // Create new role
  const createRole = useCallback(async (roleData: CreateRoleRequest) => {
    try {
      setLoading(true);
      const newRole = await rolesService.createRole(roleData);
      setRoles(prev => [newRole, ...prev]);
      setTotalRoles(prev => prev + 1);
      toast({
        title: "Success",
        description: "Role created successfully"
      });
      return newRole;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create role",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Update existing role
  const updateRole = useCallback(async (roleData: UpdateRoleRequest) => {
    try {
      setLoading(true);
      const updatedRole = await rolesService.updateRole(roleData);
      setRoles(prev => prev.map(role => 
        role.id === updatedRole.id ? updatedRole : role
      ));
      toast({
        title: "Success",
        description: "Role updated successfully"
      });
      return updatedRole;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update role",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Delete role
  const deleteRole = useCallback(async (roleId: string) => {
    try {
      setLoading(true);
      await rolesService.deleteRole(roleId);
      setRoles(prev => prev.filter(role => role.id !== roleId));
      setTotalRoles(prev => prev - 1);
      toast({
        title: "Success",
        description: "Role deleted successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete role",
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Update search parameters
  const updateSearchParams = useCallback((newParams: Partial<RoleSearchParams>) => {
    setSearchParams(prev => ({
      ...prev,
      ...newParams,
      offset: 0 // Reset to first page when search changes
    }));
  }, []);

  // Load data on mount and when dependencies change
  useEffect(() => {
    loadOrganizations();
  }, [loadOrganizations]);

  useEffect(() => {
    loadRoles();
  }, [loadRoles]);

  return {
    // State
    organizations,
    selectedOrganization,
    roles,
    loading,
    totalRoles,
    searchParams,
    
    // Actions
    setSelectedOrganization,
    createRole,
    updateRole,
    deleteRole,
    updateSearchParams,
    loadRoles,
    
    // Computed values
    hasRoles: roles.length > 0,
    totalPages: Math.ceil(totalRoles / (searchParams.limit || 10))
  };
}; 