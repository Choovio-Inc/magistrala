import { api } from '@/shared/services/api';
import { User, UpdateUserRequest } from '@/shared/types/user';

export interface ProfileUpdateRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  location?: string;
  timezone?: string;
  language?: string;
  theme?: 'light' | 'dark' | 'auto';
  notifications?: {
    email: boolean;
    push: boolean;
    sms: boolean;
    marketing: boolean;
  };
}

export interface ProfileResponse {
  user: User;
  preferences: {
    theme: string;
    language: string;
    timezone: string;
    notifications: {
      email: boolean;
      push: boolean;
      sms: boolean;
      marketing: boolean;
    };
  };
  security: {
    twoFactorEnabled: boolean;
    lastPasswordChange: string;
    lastLogin: string;
    loginHistory: Array<{
      date: string;
      location: string;
      device: string;
    }>;
  };
}

export const profileService = {
  // Get current user's profile
  getProfile: async (): Promise<ProfileResponse> => {
    // Mock implementation - replace with actual API call
    const mockProfile: ProfileResponse = {
      user: {
        id: 'user-1',
        firstName: 'Sri',
        lastName: 'Inakollu',
        email: 'sri@choovio.com',
        role: 1, // ADMIN
        status: 1, // ENABLED
        credentials: { username: 'sri', secret: '' },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        organizationId: 'org-123',
        profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      },
      preferences: {
        theme: 'light',
        language: 'English',
        timezone: 'America/Los_Angeles',
        notifications: {
          email: true,
          push: true,
          sms: false,
          marketing: false
        }
      },
      security: {
        twoFactorEnabled: false,
        lastPasswordChange: '2024-01-15',
        lastLogin: new Date().toISOString(),
        loginHistory: [
          { date: new Date().toISOString(), location: 'San Francisco, CA', device: 'Chrome on Mac' },
          { date: new Date(Date.now() - 86400000).toISOString(), location: 'San Francisco, CA', device: 'Mobile Safari' },
          { date: new Date(Date.now() - 172800000).toISOString(), location: 'New York, NY', device: 'Chrome on Windows' }
        ]
      }
    };

    return mockProfile;

    // Uncomment when backend is ready:
    // return api<ProfileResponse>('/users/profile');
  },

  // Update user profile
  updateProfile: async (data: ProfileUpdateRequest): Promise<ProfileResponse> => {
    // Mock implementation - replace with actual API call
    const mockProfile: ProfileResponse = {
      user: {
        id: 'user-1',
        firstName: data.firstName || 'Sri',
        lastName: data.lastName || 'Inakollu',
        email: data.email || 'sri@choovio.com',
        role: 1, // ADMIN
        status: 1, // ENABLED
        credentials: { username: 'sri', secret: '' },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        organizationId: 'org-123',
        profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      },
      preferences: {
        theme: data.theme || 'light',
        language: data.language || 'English',
        timezone: data.timezone || 'America/Los_Angeles',
        notifications: data.notifications || {
          email: true,
          push: true,
          sms: false,
          marketing: false
        }
      },
      security: {
        twoFactorEnabled: false,
        lastPasswordChange: '2024-01-15',
        lastLogin: new Date().toISOString(),
        loginHistory: [
          { date: new Date().toISOString(), location: 'San Francisco, CA', device: 'Chrome on Mac' },
          { date: new Date(Date.now() - 86400000).toISOString(), location: 'San Francisco, CA', device: 'Mobile Safari' },
          { date: new Date(Date.now() - 172800000).toISOString(), location: 'New York, NY', device: 'Chrome on Windows' }
        ]
      }
    };

    return mockProfile;

    // Uncomment when backend is ready:
    // return api<ProfileResponse>('/users/profile', {
    //   method: 'PUT',
    //   body: JSON.stringify(data),
    // });
  },

  // Change password
  changePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    // Mock implementation - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Uncomment when backend is ready:
    // return api('/users/password', {
    //   method: 'PUT',
    //   body: JSON.stringify({ currentPassword, newPassword }),
    // });
  },

  // Upload profile picture
  uploadProfilePicture: async (file: File): Promise<{ profilePicture: string }> => {
    // Mock implementation - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { profilePicture: '/avatar.jpg' };

    // Uncomment when backend is ready:
    // const formData = new FormData();
    // formData.append('profilePicture', file);
    // return api<{ profilePicture: string }>('/users/profile/picture', {
    //   method: 'POST',
    //   body: formData,
    // });
  },

  // Enable/disable two-factor authentication
  toggleTwoFactor: async (enabled: boolean): Promise<void> => {
    // Mock implementation - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Uncomment when backend is ready:
    // return api('/users/2fa', {
    //   method: 'PUT',
    //   body: JSON.stringify({ enabled }),
    // });
  }
}; 