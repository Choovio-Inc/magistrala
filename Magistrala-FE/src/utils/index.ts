// Application Constants

export const APP_CONFIG = {
  NAME: 'Magistrala',
  VERSION: '1.0.0',
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000',
} as const;

export const ROUTES = {
  HOME: '/',
  DASHBOARDS: '/dashboards',
  DEVICE_GROUPS: '/device-groups',
  ADMIN: {
    ROLES: '/admin/roles',
  },
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
  },
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/tokens',
    LOGOUT: '/tokens',
    PROFILE: '/users/profile',
  },
  ORGANIZATIONS: '/organizations',
  ROLES: '/roles',
  DEVICES: '/devices',
  DASHBOARDS: '/dashboards',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;

export const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  ENABLED: 'enabled',
  DISABLED: 'disabled',
  ONLINE: 'online',
  OFFLINE: 'offline',
} as const;

export const ALERT_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const; 