import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Building2, 
  Shield, 
  Users, 
  CheckCircle, 
  XCircle, 
  AlertCircle 
} from 'lucide-react';
import { Organization } from '@/features/role-management/types';

interface OrganizationSelectorProps {
  organizations: Organization[];
  selectedOrganization: Organization | null;
  onOrganizationChange: (organization: Organization) => void;
  loading?: boolean;
}

const OrganizationSelector: React.FC<OrganizationSelectorProps> = ({
  organizations,
  selectedOrganization,
  onOrganizationChange,
  loading = false
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'inactive':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { variant: 'default' as const, className: 'bg-green-100 text-green-800' },
      inactive: { variant: 'secondary' as const, className: 'bg-red-100 text-red-800' },
      default: { variant: 'outline' as const, className: 'bg-yellow-100 text-yellow-800' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.default;

    return (
      <Badge variant={config.variant} className={config.className}>
        {status === 'active' ? 'Active' : status === 'inactive' ? 'Inactive' : 'Unknown'}
      </Badge>
    );
  };

  return (
    <Card>
      <CardContent className="space-y-4">
        {/* Organization Selection */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Select Organization:</span>
            </div>
            <Select 
              value={selectedOrganization?.id || ''} 
              onValueChange={(value) => {
                const org = organizations.find(o => o.id === value);
                if (org) onOrganizationChange(org);
              }}
              disabled={loading}
            >
              <SelectTrigger className="w-80">
                <SelectValue placeholder={loading ? "Loading organizations..." : "Select an organization"} />
              </SelectTrigger>
              <SelectContent>
                {organizations.map((org) => (
                  <SelectItem key={org.id} value={org.id}>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      {org.name}
                      {getStatusIcon(org.status)}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Selected Organization Details */}
          {selectedOrganization && (
            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    {selectedOrganization.name}
                  </h3>
                  {selectedOrganization.description && (
                    <p className="text-sm text-gray-600">
                      {selectedOrganization.description}
                    </p>
                  )}
                </div>
                {getStatusBadge(selectedOrganization.status)}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Organization ID:</span>
                  <div className="font-mono text-xs bg-gray-100 p-1 rounded mt-1">
                    {selectedOrganization.id}
                  </div>
                </div>
                <div>
                  <span className="text-gray-500">Created:</span>
                  <div className="mt-1">
                    {new Date(selectedOrganization.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {selectedOrganization.updatedAt && (
                <div className="text-sm">
                  <span className="text-gray-500">Last Updated:</span>
                  <div className="mt-1">
                    {new Date(selectedOrganization.updatedAt).toLocaleDateString()}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Organization Stats */}
          {selectedOrganization && (
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-[#474dff]/5 rounded-lg">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Shield className="h-4 w-4 text-[#474dff]" />
                  <span className="text-sm font-medium text-[#474dff]">Roles</span>
                </div>
                <div className="text-2xl font-bold text-[#474dff]">
                  {/* This would come from API */}
                  {organizations.length > 0 ? '4' : '0'}
                </div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Users className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">Members</span>
                </div>
                <div className="text-2xl font-bold text-green-700">
                  {/* This would come from API */}
                  {organizations.length > 0 ? '12' : '0'}
                </div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Building2 className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-600">Status</span>
                </div>
                <div className="text-sm font-medium text-purple-700">
                  {selectedOrganization.status === 'active' ? 'Active' : 'Inactive'}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default React.memo(OrganizationSelector); 