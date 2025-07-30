'use client';

import { useState } from 'react';
import { PrivateRoute } from '@/shared/components/auth/PrivateRoute';
import { UserRole } from '@/shared/types/user';
import { Sidebar } from '@/components/ui/sidebar';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useOrganizations, useCreateOrganization, useUpdateOrganization, useDeleteOrganization } from '@/shared/hooks/useAdmin';
import { Organization } from '@/shared/types';
import { 
  Building2, 
  Plus, 
  Calendar, 
  MoreHorizontal,
  Settings,
  Edit,
  Trash2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

// Mock data for organizations
const mockOrganizations = [
  {
    id: 'org-1',
    name: 'Main Organization',
    description: 'Primary organization for all users',
    status: 'active' as const,
    createdAt: '2023-12-31T00:00:00Z',
    updatedAt: '2023-12-31T00:00:00Z',
    userCount: 12,
    roleCount: 4
  },
  {
    id: 'org-2',
    name: 'Development Team',
    description: 'Organization for development team',
    status: 'active' as const,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    userCount: 8,
    roleCount: 2
  },
  {
    id: 'org-3',
    name: 'Marketing Department',
    description: 'Organization for marketing team',
    status: 'active' as const,
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z',
    userCount: 6,
    roleCount: 2
  }
];

export default function OrganizationManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingOrganization, setEditingOrganization] = useState<Organization | null>(null);

  const { data: organizations, isLoading } = useOrganizations({
    search: searchTerm || undefined,
  });

  const createMutation = useCreateOrganization();
  const updateMutation = useUpdateOrganization();
  const deleteMutation = useDeleteOrganization();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: true,
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      status: true,
    });
  };

  const handleCreateOrganization = async () => {
    if (!formData.name.trim()) {
      toast.error('Organization name is required');
      return;
    }

    try {
      await createMutation.mutateAsync({
        name: formData.name,
        status: formData.status ? 'enabled' : 'disabled',
      });
      
      toast.success('Organization created successfully');
      setIsCreateDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error('Failed to create organization');
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <PrivateRoute allowedRoles={[UserRole.ADMIN]}>
      <div className="flex h-screen bg-gray-50">
        <div className="w-64 flex-shrink-0">
          <Sidebar />
        </div>
        
        <div className="flex-1 overflow-auto">
          <PageHeader 
            title="Organization Management" 
            breadcrumbs={[
              { label: 'Choovio' },
              { label: 'Admin' },
              { label: 'Organization Management' }
            ]} 
          />

          {/* Main Content */}
          <main className="p-6 space-y-6">
            {/* Create Organization Button */}
            <motion.div variants={cardVariants} initial="hidden" animate="visible" className="flex justify-end">
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    New Organization
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create New Organization</DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter organization name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        value={formData.description}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Enter organization description"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="status"
                        checked={formData.status}
                        onCheckedChange={(checked: boolean) => setFormData(prev => ({ ...prev, status: checked }))}
                      />
                      <Label htmlFor="status">Active</Label>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleCreateOrganization}
                      disabled={createMutation.isPending}
                    >
                      {createMutation.isPending ? 'Creating...' : 'Create'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>

            {/* Summary Cards */}
            <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Organizations</p>
                      <p className="text-2xl font-bold">{mockOrganizations.length}</p>
                    </div>
                    <Building2 className="h-8 w-8 text-[#474dff]" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Organizations</p>
                      <p className="text-2xl font-bold">{mockOrganizations.filter(org => org.status === 'active').length}</p>
                    </div>
                    <Building2 className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Users</p>
                      <p className="text-2xl font-bold">{mockOrganizations.reduce((acc, org) => acc + org.userCount, 0)}</p>
                    </div>
                    <Building2 className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Organizations Table */}
            <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Organizations</CardTitle>
                    <div className="relative">
                      <Input
                        placeholder="Search organizations..."
                        value={searchTerm}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                        className="w-64"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Organization</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Users</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockOrganizations.map((org) => (
                        <TableRow key={org.id}>
                          <TableCell>
                            <div className="font-medium">{org.name}</div>
                            <div className="text-sm text-gray-500">ID: {org.id}</div>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-xs truncate" title={org.description}>
                              {org.description}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(org.status)}>
                              {org.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{org.userCount}</span>
                              <span className="text-sm text-gray-500">users</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              <span className="text-sm">{new Date(org.createdAt).toLocaleDateString()}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Settings className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          </main>
        </div>
      </div>
    </PrivateRoute>
  );
} 