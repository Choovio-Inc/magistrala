import { api } from '@/shared/services/api';
import { User, UserRole, UserStatus, UserCredentials } from '@/shared/types/user';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

// Temporary mock function for testing - remove when backend is ready
const createMockJWT = (email: string, role: UserRole): string => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(JSON.stringify({
    user_id: "123",
    role: role,
    organization_id: "org-123",
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
    iat: Math.floor(Date.now() / 1000)
  }));
  const signature = "mock-signature";
  return `${header}.${payload}.${signature}`;
};

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    // Temporary mock implementation - replace with actual API call when backend is ready
    const validCredentials = [
      { email: "sri@choovio.com", password: "admin123", role: UserRole.ADMIN, name: "Sri Inakollu" },
      { email: "user@choovio.com", password: "user123", role: UserRole.USER, name: "Test User" },
      { email: "admin@test.com", password: "admin", role: UserRole.ADMIN, name: "Admin User" }
    ];

    const matchedUser = validCredentials.find(
      cred => cred.email.toLowerCase() === credentials.email.toLowerCase() && 
             cred.password === credentials.password
    );

    if (!matchedUser) {
      throw new Error("Invalid credentials");
    }

    // Create mock User object matching the backend schema
    const mockUser: User = {
      id: matchedUser.role === UserRole.ADMIN ? "admin-123" : "user-456",
      firstName: matchedUser.name.split(' ')[0],
      lastName: matchedUser.name.split(' ')[1] || '',
      email: matchedUser.email,
      credentials: {
        username: matchedUser.email.split('@')[0],
        secret: 'hashed_password'
      },
      status: UserStatus.ENABLED,
      role: matchedUser.role,
      tags: matchedUser.role === UserRole.ADMIN ? ['admin', 'founder'] : ['user'],
      permissions: matchedUser.role === UserRole.ADMIN ? 
        ['user.create', 'user.read', 'user.update', 'user.delete', 'admin.all'] : 
        ['dashboard.read', 'device.read'],
      metadata: { department: 'Development' },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      organizationId: 'org-123'
    };

    // Return mock response with valid JWT
    return {
      access_token: createMockJWT(credentials.email, matchedUser.role),
      token_type: "Bearer",
      user: mockUser
    };

    // Uncomment this when backend is ready:
    // return api<LoginResponse>('/tokens', {
    //   method: 'POST',
    //   body: JSON.stringify(credentials),
    // });
  },

  register: async (userData: RegisterRequest): Promise<User> => {
    // Temporary mock implementation
    const mockUser: User = {
      id: "new-user-123",
      firstName: userData.name?.split(' ')[0] || "New",
      lastName: userData.name?.split(' ')[1] || "User",
      email: userData.email,
      credentials: {
        username: userData.email.split('@')[0],
        secret: 'hashed_password'
      },
      status: UserStatus.ENABLED,
      role: UserRole.USER, // Default new users to USER role
      tags: ['new-user'],
      permissions: ['dashboard.read', 'device.read'],
      metadata: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      organizationId: 'org-123'
    };

    return mockUser;

    // Uncomment this when backend is ready:
    // return api<User>('/users', {
    //   method: 'POST',
    //   body: JSON.stringify(userData),
    // });
  },

  logout: async (): Promise<void> => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        await api('/tokens', {
          method: 'DELETE',
        });
      } catch (error) {
        console.error('Logout error:', error);
      }
      localStorage.removeItem('access_token');
    }
  },

  getCurrentUser: async (): Promise<User> => {
    return api<User>('/users/profile');
  },
};