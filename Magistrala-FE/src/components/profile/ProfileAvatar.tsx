import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera } from 'lucide-react';
import { User } from '@/types/user';

interface ProfileAvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
  showUploadButton?: boolean;
  onUpload?: (file: File) => void;
  className?: string;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  user,
  size = 'md',
  showUploadButton = false,
  onUpload,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-20 w-20'
  };

  const uploadButtonSize = {
    sm: 'h-2 w-2',
    md: 'h-3 w-3',
    lg: 'h-4 w-4'
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onUpload) {
      onUpload(file);
    }
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <Avatar className={sizeClasses[size]}>
        <AvatarImage src={user.profilePicture} alt={`${user.firstName} ${user.lastName}`} />
        <AvatarFallback className="bg-[#474dff] text-white font-medium">
          {user.firstName.charAt(0)}{user.lastName.charAt(0)}
        </AvatarFallback>
      </Avatar>
      
      {showUploadButton && onUpload && (
        <label className="absolute bottom-0 right-0 bg-[#474dff] text-white p-1 rounded-full cursor-pointer hover:bg-[#3a3fcc] transition-colors">
          <Camera className={uploadButtonSize[size]} />
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
      )}
    </div>
  );
}; 