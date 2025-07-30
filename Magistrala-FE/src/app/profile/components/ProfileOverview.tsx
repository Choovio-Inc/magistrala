import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ProfileAvatar } from '@/components/profile/ProfileAvatar';
import { ProfileInfo } from '@/components/profile/ProfileInfo';
import { ProfileResponse } from '@/services/profile';
import { Edit, Save, X } from 'lucide-react';

interface ProfileOverviewProps {
  profile: ProfileResponse;
  isEditing: boolean;
  isLoading: boolean;
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    timezone: string;
    language: string;
  };
  onInputChange: (field: string, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  onEdit: () => void;
  onAvatarUpload: (file: File) => void;
}

export const ProfileOverview: React.FC<ProfileOverviewProps> = ({
  profile,
  isEditing,
  isLoading,
  formData,
  onInputChange,
  onSave,
  onCancel,
  onEdit,
  onAvatarUpload
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Profile Card */}
      <Card className="pill-card lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-4">
            <ProfileAvatar
              user={profile.user}
              size="lg"
              showUploadButton={true}
              onUpload={onAvatarUpload}
            />
            <ProfileInfo user={profile.user} />
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={isEditing ? formData.firstName : profile.user.firstName}
                  onChange={(e) => onInputChange('firstName', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={isEditing ? formData.lastName : profile.user.lastName}
                  onChange={(e) => onInputChange('lastName', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={isEditing ? formData.email : profile.user.email}
                onChange={(e) => onInputChange('email', e.target.value)}
                disabled={!isEditing}
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={isEditing ? formData.phone : formData.phone}
                onChange={(e) => onInputChange('phone', e.target.value)}
                disabled={!isEditing}
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={isEditing ? formData.location : formData.location}
                onChange={(e) => onInputChange('location', e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Info */}
      <Card className="pill-card lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Account Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">User ID</Label>
                <p className="text-sm">{profile.user.id}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Organization</Label>
                <p className="text-sm">Choovio Inc.</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Status</Label>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {profile.user.status === 1 ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">Timezone</Label>
                <p className="text-sm">{profile.preferences.timezone}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Language</Label>
                <p className="text-sm">{profile.preferences.language}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Member Since</Label>
                <p className="text-sm">{new Date(profile.user.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 