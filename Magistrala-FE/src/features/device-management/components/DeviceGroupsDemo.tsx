'use client';

import React, { useState } from 'react';
import { DeviceGroup } from '@/types';
import { DeviceGroupsTree } from './DeviceGroupsTree';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Mock data for demonstration
const mockDeviceGroups: DeviceGroup[] = [
  {
    id: '1',
    name: 'Production Environment',
    description: 'All production devices and systems',
    status: 'enabled',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    level: 0,
    path: '/1',
    children: [
      {
        id: '1-1',
        name: 'Manufacturing Floor',
        description: 'IoT devices on the manufacturing floor',
        parentId: '1',
        status: 'enabled',
        createdAt: '2024-01-16T09:00:00Z',
        level: 1,
        path: '/1/1-1',
        children: [
          {
            id: '1-1-1',
            name: 'Assembly Line A',
            description: 'Sensors and controllers for assembly line A',
            parentId: '1-1',
            status: 'enabled',
            createdAt: '2024-01-17T11:00:00Z',
            level: 2,
            path: '/1/1-1/1-1-1',
            children: [],
          },
          {
            id: '1-1-2',
            name: 'Assembly Line B',
            description: 'Sensors and controllers for assembly line B',
            parentId: '1-1',
            status: 'disabled',
            createdAt: '2024-01-17T12:00:00Z',
            level: 2,
            path: '/1/1-1/1-1-2',
            children: [],
          },
        ],
      },
      {
        id: '1-2',
        name: 'Warehouse',
        description: 'Inventory tracking and management systems',
        parentId: '1',
        status: 'enabled',
        createdAt: '2024-01-16T10:00:00Z',
        level: 1,
        path: '/1/1-2',
        children: [],
      },
    ],
  },
  {
    id: '2',
    name: 'Development Environment',
    description: 'Testing and development devices',
    status: 'enabled',
    createdAt: '2024-01-10T08:00:00Z',
    level: 0,
    path: '/2',
    children: [
      {
        id: '2-1',
        name: 'Test Lab',
        description: 'Prototype testing devices',
        parentId: '2',
        status: 'enabled',
        createdAt: '2024-01-11T13:00:00Z',
        level: 1,
        path: '/2/2-1',
        children: [],
      },
    ],
  },
  {
    id: '3',
    name: 'Legacy Systems',
    description: 'Older systems still in operation',
    status: 'disabled',
    createdAt: '2023-06-01T00:00:00Z',
    level: 0,
    path: '/3',
    children: [],
  },
];

export const DeviceGroupsDemo: React.FC = () => {
  const [isDemoMode, setIsDemoMode] = useState(true);

  if (isDemoMode) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  Device Groups Demo
                  <Badge variant="secondary">Mock Data</Badge>
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  This is a demonstration of the Device Groups Tree component with mock data.
                </p>
              </div>
              <Button onClick={() => setIsDemoMode(false)} variant="outline">
                Switch to Real API
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Total Groups</h4>
                  <p className="text-2xl font-bold text-[#474dff]">7</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Enabled</h4>
                  <p className="text-2xl font-bold text-green-600">6</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Disabled</h4>
                  <p className="text-2xl font-bold text-gray-600">1</p>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-medium mb-2">Demo Features:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Hierarchical tree view with expand/collapse functionality</li>
                  <li>• Visual status indicators (green for enabled, gray for disabled)</li>
                  <li>• Action buttons for edit, delete, and add child operations</li>
                  <li>• Responsive design with proper spacing and indentation</li>
                  <li>• Form validation and error handling</li>
                  <li>• Loading states and skeleton components</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mock Tree Component */}
        <div className="space-y-2">
          {mockDeviceGroups.map((group) => (
            <MockDeviceGroupNode key={group.id} group={group} level={0} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Device Groups (Live API)</CardTitle>
            <Button onClick={() => setIsDemoMode(true)} variant="outline">
              Switch to Demo
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Connected to the real backend API. Make sure your backend is running and the API endpoints are available.
          </p>
          <DeviceGroupsTree />
        </CardContent>
      </Card>
    </div>
  );
};

// Mock tree node component for demo
const MockDeviceGroupNode: React.FC<{ group: DeviceGroup; level: number }> = ({
  group,
  level,
}) => {
  const [isExpanded, setIsExpanded] = useState(level === 0);

  return (
    <div className="w-full">
      <div
        className={`
          flex items-center gap-2 p-3 rounded-lg border transition-colors cursor-pointer
          ${group.status === 'enabled' ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-gray-100'}
        `}
        style={{ marginLeft: `${level * 24}px` }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Expand/Collapse Button */}
        {group.children && group.children.length > 0 && (
          <div className="h-6 w-6 flex items-center justify-center">
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </div>
        )}

        {/* Status Indicator */}
        <div
          className={`h-3 w-3 rounded-full ${
            group.status === 'enabled' ? 'bg-green-500' : 'bg-gray-400'
          }`}
        />

        {/* Group Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-sm truncate">{group.name}</h4>
            <Badge variant={group.status === 'enabled' ? 'default' : 'secondary'} className="text-xs">
              {group.status}
            </Badge>
          </div>
          {group.description && (
            <p className="text-xs text-gray-500 truncate mt-1">{group.description}</p>
          )}
        </div>

        {/* Mock Action Buttons */}
        <div className="flex items-center gap-1 opacity-50">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled>
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Children */}
      {isExpanded && group.children && (
        <div className="mt-2">
          {group.children.map((child) => (
            <MockDeviceGroupNode key={child.id} group={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

// Import icons for the mock component
import { ChevronRight, ChevronDown, Plus, MoreHorizontal } from 'lucide-react'; 