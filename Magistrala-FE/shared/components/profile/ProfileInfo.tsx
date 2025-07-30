import React from 'react';
import { Badge } from '@/components/ui/badge';
import { User, getRoleLabel, getStatusLabel } from '@/shared/types/user';

interface ProfileInfoProps {
  user: User;
  showRole?: boolean;
  showStatus?: boolean;
  className?: string;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({
  user,
  showRole = true,
  showStatus = true,
  className = ''
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          {user.firstName} {user.lastName}
        </h3>
        <p className="text-gray-600">{user.email}</p>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {showRole && (
          <Badge variant="secondary" className="bg-[#474dff]/10 text-[#474dff]">
            {getRoleLabel(user.role)}
          </Badge>
        )}
        {showStatus && (
          <Badge variant={user.status === 1 ? 'default' : 'destructive'}>
            {getStatusLabel(user.status)}
          </Badge>
        )}
      </div>
    </div>
  );
}; 