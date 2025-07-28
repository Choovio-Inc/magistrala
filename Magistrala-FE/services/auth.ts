import { api } from '@/lib/api';
import { User } from '@/types';

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
const createMockJWT = (email: string): string => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(JSON.stringify({
    user_id: "123",
    role: email.includes("Sri@choovio.com") ? "admin" : "customer",
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
      { email: "Sri@choovio.com", password: "Choovio@2025" },
      { email: "User@gmail.com", password: "User@2025" }
    ];

    const isValid = validCredentials.some(
      cred => cred.email === credentials.email && cred.password === credentials.password
    );

    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    // Return mock response with valid JWT
    return {
      access_token: createMockJWT(credentials.email),
      token_type: "Bearer",
      user: {
        id: "123",
        email: credentials.email,
        name: credentials.email.includes("Sri@choovio.com") ? "Sri Inakollu" : "Test User",
        role: credentials.email.includes("Sri@choovio.com") ? "admin" : "customer",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    };

    // Uncomment this when backend is ready:
    // return api<LoginResponse>('/tokens', {
    //   method: 'POST',
    //   body: JSON.stringify(credentials),
    // });
  },

  register: async (userData: RegisterRequest): Promise<User> => {
    // Temporary mock implementation
    return {
      id: "new-user-123",
      email: userData.email,
      name: userData.name || "New User",
      role: "customer",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

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