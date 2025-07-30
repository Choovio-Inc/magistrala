import React, { useMemo, useCallback } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Users, 
  Calendar,
  User
} from 'lucide-react';
import { Role } from '@/features/role-management/types';
import { formatDistanceToNow } from 'date-fns';
import { getRoleType, getRoleTypeColor, getRoleTypeLabel, formatActions } from '@/features/role-management/utils/roleUtils';

interface VirtualizedRoleListProps {
  roles: Role[];
  loading: boolean;
  onEditRole: (role: Role) => void;
  onDeleteRole: (roleId: string) => void;
  pageSize?: number;
  currentPage?: number;
}

// Optimized Role Row Component
const RoleRow = React.memo(({ 
  role, 
  onEditRole, 
  onDeleteRole 
}: {
  role: Role;
  onEditRole: (role: Role) => void;
  onDeleteRole: (roleId: string) => void;
}) => {
  const handleEdit = useCallback(() => {
    onEditRole(role);
  }, [role, onEditRole]);

  const handleDelete = useCallback(() => {
    onDeleteRole(role.id);
  }, [role.id, onDeleteRole]);

  // Memoized role type info
  const roleTypeInfo = useMemo(() => {
    const type = getRoleType(role);
    return {
      label: getRoleTypeLabel(type),
      color: getRoleTypeColor(type)
    };
  }, [role]);

  // Memoized formatted actions
  const formattedActions = useMemo(() => {
    return formatActions(role.actions || []);
  }, [role.actions]);

  // Memoized time info
  const timeInfo = useMemo(() => {
    const time = role.updatedAt || role.createdAt;
    return formatDistanceToNow(new Date(time), { addSuffix: true });
  }, [role.updatedAt, role.createdAt]);

  return (
    <TableRow className="hover:bg-gray-50">
      <TableCell>
        <div className="font-medium">{role.name}</div>
        <div className="text-sm text-gray-500">ID: {role.id}</div>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className={roleTypeInfo.color}>
          {roleTypeInfo.label}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4 text-gray-400" />
          <span>{role.members?.length || 0} members</span>
        </div>
        {role.members && role.members.length > 0 && (
          <div className="text-sm text-gray-500 mt-1">
            {role.members.slice(0, 2).join(', ')}
            {role.members.length > 2 && ` +${role.members.length - 2} more`}
          </div>
        )}
      </TableCell>
      <TableCell>
        <div className="max-w-xs truncate" title={formattedActions}>
          {formattedActions}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span className="text-sm">{timeInfo}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          <User className="h-4 w-4 text-gray-400" />
          <span className="text-sm">{role.createdBy}</span>
        </div>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleEdit}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Role
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={handleDelete}
              className="text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Role
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
});

RoleRow.displayName = 'RoleRow';

// Loading Skeleton Component
const LoadingSkeleton = React.memo(() => (
  <div className="space-y-2">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-32"></div>
        <div className="h-4 bg-gray-200 rounded w-20"></div>
        <div className="h-4 bg-gray-200 rounded w-24"></div>
        <div className="h-4 bg-gray-200 rounded w-40"></div>
        <div className="h-4 bg-gray-200 rounded w-24"></div>
        <div className="h-4 bg-gray-200 rounded w-20"></div>
        <div className="h-4 bg-gray-200 rounded w-8"></div>
      </div>
    ))}
  </div>
));

LoadingSkeleton.displayName = 'LoadingSkeleton';

// Empty State Component
const EmptyState = React.memo(() => (
  <div className="text-center py-8">
    <div className="text-gray-500">
      <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">No roles found</h3>
      <p className="text-gray-500">Create your first role to get started.</p>
    </div>
  </div>
));

EmptyState.displayName = 'EmptyState';

const VirtualizedRoleList: React.FC<VirtualizedRoleListProps> = ({
  roles,
  loading,
  onEditRole,
  onDeleteRole,
  pageSize = 10,
  currentPage = 1
}) => {
  // Memoized paginated roles
  const paginatedRoles = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return roles.slice(startIndex, endIndex);
  }, [roles, currentPage, pageSize]);

  // Memoized edit handler
  const handleEditRole = useCallback((role: Role) => {
    onEditRole(role);
  }, [onEditRole]);

  // Memoized delete handler
  const handleDeleteRole = useCallback((roleId: string) => {
    onDeleteRole(roleId);
  }, [onDeleteRole]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (roles.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Role Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Members</TableHead>
            <TableHead>Actions</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Created By</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedRoles.map((role) => (
            <RoleRow
              key={role.id}
              role={role}
              onEditRole={handleEditRole}
              onDeleteRole={handleDeleteRole}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default React.memo(VirtualizedRoleList); 