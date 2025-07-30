// Device Management Types

export interface Device {
  id: string;
  name: string;
  status: 'online' | 'offline';
  type: string;
  last_seen: string;
  temperature?: number;
  metadata: Record<string, any>;
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

export interface CreateDeviceGroupRequest {
  name: string;
  description?: string;
  parentId?: string;
  status?: 'enabled' | 'disabled';
}

export interface UpdateDeviceGroupRequest {
  id: string;
  name?: string;
  description?: string;
  parentId?: string;
  status?: 'enabled' | 'disabled';
}

export interface DeviceGroupSearchParams {
  search?: string;
  status?: 'enabled' | 'disabled';
  parentId?: string;
  limit?: number;
  offset?: number;
  orderBy?: 'name' | 'createdAt' | 'updatedAt';
  orderDir?: 'asc' | 'desc';
}

export interface DeviceGroupsListResponse {
  deviceGroups: DeviceGroup[];
  total: number;
  offset: number;
  limit: number;
}

export interface DeviceFeed {
  id: string;
  device_id: string;
  channel_id: string;
  name: string;
  active: boolean;
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