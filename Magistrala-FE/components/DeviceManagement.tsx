'use client';

import { useState, useEffect } from 'react';
import { useAuth, UserRole, AdminOnly, AuthorizedOnly } from '@/contexts/AuthContext';
import { apiService, Device, CreateDeviceRequest } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Edit, Trash2, Eye } from 'lucide-react';

export function DeviceManagement() {
  const { user, isAdmin, isCustomer } = useAuth();
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingDevice, setEditingDevice] = useState<Device | null>(null);

  // Load devices on component mount
  useEffect(() => {
    loadDevices();
  }, [user]);

  const loadDevices = async () => {
    try {
      setLoading(true);
      
      // Admin can see all devices, customer only their organization's devices
      const organizationFilter = isCustomer ? user?.organizationId : undefined;
      const data = await apiService.getDevices(organizationFilter);
      
      setDevices(data);
    } catch (error) {
      console.error('Error loading devices:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDevice = async (deviceData: CreateDeviceRequest) => {
    try {
      const newDevice = await apiService.createDevice(deviceData);
      setDevices([...devices, newDevice]);
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error creating device:', error);
    }
  };

  const handleUpdateDevice = async (deviceId: string, deviceData: Partial<CreateDeviceRequest>) => {
    try {
      const updatedDevice = await apiService.updateDevice(deviceId, deviceData);
      setDevices(devices.map(d => d.id === deviceId ? updatedDevice : d));
      setEditingDevice(null);
    } catch (error) {
      console.error('Error updating device:', error);
    }
  };

  const handleDeleteDevice = async (deviceId: string) => {
    if (!confirm('Are you sure you want to delete this device?')) return;
    
    try {
      await apiService.deleteDevice(deviceId);
      setDevices(devices.filter(d => d.id !== deviceId));
    } catch (error) {
      console.error('Error deleting device:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with role-based controls */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Device Management</h1>
          <p className="text-gray-600">
            {isAdmin ? 'Manage all devices across organizations' : 'Manage your organization\'s devices'}
          </p>
        </div>
        
        {/* Create Device button - Admin only */}
        <AdminOnly>
          <Button 
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Create Device
          </Button>
        </AdminOnly>
      </div>

      {/* Organization filter for admin */}
      {isAdmin && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Admin Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600">
              <p>You have admin access and can see devices from all organizations.</p>
              <p>Total devices: {devices.length}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Create Device Form - Admin only */}
      {showCreateForm && (
        <AdminOnly>
          <CreateDeviceForm 
            onSubmit={handleCreateDevice}
            onCancel={() => setShowCreateForm(false)}
          />
        </AdminOnly>
      )}

      {/* Edit Device Form - Admin only */}
      {editingDevice && (
        <AdminOnly>
          <EditDeviceForm 
            device={editingDevice}
            onSubmit={(data) => handleUpdateDevice(editingDevice.id, data)}
            onCancel={() => setEditingDevice(null)}
          />
        </AdminOnly>
      )}

      {/* Devices List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {devices.map((device) => (
          <DeviceCard 
            key={device.id}
            device={device}
            onEdit={setEditingDevice}
            onDelete={handleDeleteDevice}
          />
        ))}
      </div>

      {devices.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">No devices found</p>
            <AdminOnly>
              <Button 
                onClick={() => setShowCreateForm(true)}
                className="mt-4"
                variant="outline"
              >
                Create your first device
              </Button>
            </AdminOnly>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Device Card Component with role-based actions
function DeviceCard({ 
  device, 
  onEdit, 
  onDelete 
}: { 
  device: Device;
  onEdit: (device: Device) => void;
  onDelete: (deviceId: string) => void;
}) {
  const { isAdmin } = useAuth();

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg truncate">{device.name}</CardTitle>
          <Badge 
            variant={device.status === 'active' ? 'default' : 'secondary'}
            className="ml-2"
          >
            {device.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm text-gray-600">
          <p><strong>ID:</strong> {device.id}</p>
          <p><strong>Organization:</strong> {device.organization_id}</p>
          <p><strong>Created:</strong> {new Date(device.created_at).toLocaleDateString()}</p>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          {/* View details - available to all authenticated users */}
          <AuthorizedOnly>
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-1" />
              View
            </Button>
          </AuthorizedOnly>
          
          {/* Edit and Delete - Admin only */}
          <AdminOnly>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onEdit(device)}
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => onDelete(device.id)}
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </div>
          </AdminOnly>
        </div>
      </CardContent>
    </Card>
  );
}

// Create Device Form Component
function CreateDeviceForm({ 
  onSubmit, 
  onCancel 
}: { 
  onSubmit: (data: CreateDeviceRequest) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<CreateDeviceRequest>({
    name: '',
    status: 'active'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSubmit(formData);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Device</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Device Name
            </label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter device name"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              Create Device
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

// Edit Device Form Component
function EditDeviceForm({ 
  device,
  onSubmit, 
  onCancel 
}: { 
  device: Device;
  onSubmit: (data: Partial<CreateDeviceRequest>) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<CreateDeviceRequest>({
    name: device.name,
    status: device.status
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Device</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Device Name
            </label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter device name"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              Update Device
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 