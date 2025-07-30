import { useState, useEffect } from 'react';
import { profileService, ProfileResponse, ProfileUpdateRequest } from '@/services/profile';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Load profile data
  const loadProfile = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const profileData = await profileService.getProfile();
      setProfile(profileData);
    } catch (error) {
      console.error('Error loading profile:', error);
      toast.error('Failed to load profile data');
    } finally {
      setIsLoading(false);
    }
  };

  // Update profile
  const updateProfile = async (data: ProfileUpdateRequest) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const updatedProfile = await profileService.updateProfile(data);
      setProfile(updatedProfile);
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  // Change password
  const changePassword = async (currentPassword: string, newPassword: string) => {
    setIsLoading(true);
    try {
      await profileService.changePassword(currentPassword, newPassword);
      toast.success('Password changed successfully');
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error('Failed to change password');
    } finally {
      setIsLoading(false);
    }
  };

  // Upload profile picture
  const uploadProfilePicture = async (file: File) => {
    setIsLoading(true);
    try {
      const result = await profileService.uploadProfilePicture(file);
      if (profile) {
        setProfile({
          ...profile,
          user: {
            ...profile.user,
            profilePicture: result.profilePicture
          }
        });
      }
      toast.success('Profile picture updated successfully');
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      toast.error('Failed to upload profile picture');
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle two-factor authentication
  const toggleTwoFactor = async (enabled: boolean) => {
    setIsLoading(true);
    try {
      await profileService.toggleTwoFactor(enabled);
      if (profile) {
        setProfile({
          ...profile,
          security: {
            ...profile.security,
            twoFactorEnabled: enabled
          }
        });
      }
      toast.success(`Two-factor authentication ${enabled ? 'enabled' : 'disabled'}`);
    } catch (error) {
      console.error('Error toggling two-factor authentication:', error);
      toast.error('Failed to update two-factor authentication');
    } finally {
      setIsLoading(false);
    }
  };

  // Update notification preferences
  const updateNotificationPreferences = async (notifications: ProfileUpdateRequest['notifications']) => {
    if (!notifications) return;
    
    setIsLoading(true);
    try {
      const updatedProfile = await profileService.updateProfile({ notifications });
      setProfile(updatedProfile);
      toast.success('Notification preferences updated');
    } catch (error) {
      console.error('Error updating notification preferences:', error);
      toast.error('Failed to update notification preferences');
    } finally {
      setIsLoading(false);
    }
  };

  // Update theme preference
  const updateTheme = async (theme: 'light' | 'dark' | 'auto') => {
    setIsLoading(true);
    try {
      const updatedProfile = await profileService.updateProfile({ theme });
      setProfile(updatedProfile);
      toast.success(`Theme changed to ${theme}`);
    } catch (error) {
      console.error('Error updating theme:', error);
      toast.error('Failed to update theme');
    } finally {
      setIsLoading(false);
    }
  };

  // Load profile on mount
  useEffect(() => {
    loadProfile();
  }, [user]);

  return {
    profile,
    isLoading,
    isEditing,
    setIsEditing,
    loadProfile,
    updateProfile,
    changePassword,
    uploadProfilePicture,
    toggleTwoFactor,
    updateNotificationPreferences,
    updateTheme
  };
}; 