export interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
  created_at: string;
  updated_at: string;
}

export interface Device {
  id: string;
  name: string;
  status: 'online' | 'offline';
  type: string;
  last_seen: string;
  temperature?: number;
  metadata: Record<string, any>;
}

export interface DeviceFeed {
  id: string;
  device_id: string;
  channel_id: string;
  name: string;
  active: boolean;
  created_at: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  device_count: number;
  created_at: string;
}

export interface TelemetryMessage {
  id: string;
  channel: string;
  publisher: string;
  protocol: string;
  name: string;
  unit: string;
  value: number;
  time: string;
}

export interface Dashboard {
  id: string;
  name: string;
  created_at: string;
  type: string;
}

export interface Alert {
  id: string;
  type: 'warning' | 'error' | 'info';
  title: string;
  message: string;
  device_id?: string;
  timestamp: string;
}

export interface OrganizationStats {
  members: {
    total: number;
    enabled: number;
    disabled: number;
  };
  devices: {
    total: number;
    enabled: number;
    disabled: number;
  };
  device_feeds: {
    total: number;
    active: number;
    inactive: number;
  };
  projects: {
    total: number;
    active: number;
    inactive: number;
  };
}