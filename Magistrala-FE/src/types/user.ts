// User roles (matching backend numeric values)
export enum UserRole {
  USER = 0,
  ADMIN = 1,
}

// User status
export enum UserStatus {
  DISABLED = 0,
  ENABLED = 1,
}

// User credentials
export interface UserCredentials {
  username: string;
  secret: string;
}

// Complete user interface matching backend schema
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  tags?: string[];
  credentials: UserCredentials;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  updatedBy?: string;
  status: UserStatus;
  role: UserRole;
  profilePicture?: string;
  permissions?: string[];
  organizationId: string;
}

// For creating new users
export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  role: UserRole;
  tags?: string[];
  metadata?: Record<string, any>;
  permissions?: string[];
}

// For updating existing users
export interface UpdateUserRequest {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  tags?: string[];
  metadata?: Record<string, any>;
  status?: UserStatus;
  role?: UserRole;
  profilePicture?: string;
  permissions?: string[];
}

// For user listing with pagination
export interface UsersListResponse {
  users: User[];
  total: number;
  offset: number;
  limit: number;
}

// User search/filter parameters
export interface UserSearchParams {
  search?: string;
  role?: UserRole;
  status?: UserStatus;
  tags?: string[];
  limit?: number;
  offset?: number;
  orderBy?: 'firstName' | 'lastName' | 'email' | 'createdAt' | 'updatedAt';
  orderDir?: 'asc' | 'desc';
}

// Helper functions
export const getUserFullName = (user: User): string => {
  return `${user.firstName} ${user.lastName}`.trim();
};

export const getUserInitials = (user: User): string => {
  return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
};

export const getRoleLabel = (role: UserRole): string => {
  return role === UserRole.ADMIN ? 'Admin' : 'User';
};

export const getStatusLabel = (status: UserStatus): string => {
  return status === UserStatus.ENABLED ? 'Enabled' : 'Disabled';
};

export const isUserAdmin = (user: User): boolean => {
  return user.role === UserRole.ADMIN;
};

export const isUserEnabled = (user: User): boolean => {
  return user.status === UserStatus.ENABLED;
}; 