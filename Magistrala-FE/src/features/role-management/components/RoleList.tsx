import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Users, 
  Shield,
  Calendar,
  User
} from 'lucide-react';
import { Role, ROLE_ACTIONS } from '@/features/role-management/types';
import { formatDistanceToNow } from 'date-fns';
import { getRoleType, getRoleTypeColor, getRoleTypeLabel, formatActions } from '@/features/role-management/utils/roleUtils';

interface RoleListProps {
  roles: Role[];
  loading: boolean;
  totalRoles: number;
  currentPage: number;
  pageSize: number;
  onSearch: (search: string) => void;
  onPageChange: (page: number) => void;
  onEditRole: (role: Role) => void;
  onDeleteRole: (roleId: string) => void;
}

const RoleList: React.FC<RoleListProps> = ({
  roles,
  loading,
  totalRoles,
  currentPage,
  pageSize,
  onSearch,
  onPageChange,
  onEditRole,
  onDeleteRole
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onSearch(value);
  };



  const totalPages = Math.ceil(totalRoles / pageSize);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Roles ({totalRoles})
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search roles..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
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
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                      Loading roles...
                    </div>
                  </TableCell>
                </TableRow>
              ) : roles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    No roles found
                  </TableCell>
                </TableRow>
              ) : (
                roles.map((role) => (
                  <TableRow key={role.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="font-medium">{role.name}</div>
                      <div className="text-sm text-gray-500">ID: {role.id}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getRoleTypeColor(getRoleType(role))}>
                        {getRoleTypeLabel(getRoleType(role))}
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
                      <div className="max-w-xs truncate" title={formatActions(role.actions || [])}>
                        {formatActions(role.actions || [])}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">
                          {role.updatedAt 
                            ? formatDistanceToNow(new Date(role.updatedAt), { addSuffix: true })
                            : formatDistanceToNow(new Date(role.createdAt), { addSuffix: true })
                          }
                        </span>
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
                          <DropdownMenuItem onClick={() => onEditRole(role)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Role
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => onDeleteRole(role.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Role
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => onPageChange(currentPage - 1)}
                    className={currentPage <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => onPageChange(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => onPageChange(currentPage + 1)}
                    className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RoleList; 