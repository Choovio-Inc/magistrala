// User interface moved to @/types/user.ts to avoid conflicts

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

export interface DeviceGroup {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  level?: number;
  path?: string;
  children?: DeviceGroup[];
  status: 'enabled' | 'disabled';
  createdAt: string;
  updatedAt?: string;
}

export interface Organization {
  id: string;
  name: string;
  metadata?: object;
  tags?: string[];
  alias?: string;
  status: 'enabled' | 'disabled';
  roleId?: string;
  roleName?: string;
  actions?: string[];
  createdBy?: string;
  createdAt: string;
  updatedBy?: string;
  updatedAt: string;
}

export interface AnalyticsSummary {
  total_users: number;
  active_devices: number;
  data_streams: number;
  signup_trends?: {
    date: string;
    count: number;
  }[];
}

export interface DashboardWidget {
  id: string;
  type: 'line_chart' | 'gauge' | 'table' | 'map' | 'event_log';
  title: string;
  config: Record<string, any>;
  device_ids?: string[];
}

export interface DashboardConfig {
  id?: string;
  name: string;
  description?: string;
  widgets: DashboardWidget[];
  created_at?: string;
  updated_at?: string;
}