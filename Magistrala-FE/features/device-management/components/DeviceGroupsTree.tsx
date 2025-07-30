'use client';

import React, { useState, useMemo } from 'react';
import { ChevronRight, ChevronDown, Plus, Edit, Trash2, MoreHorizontal } from 'lucide-react';
import { DeviceGroup } from '@/shared/types';
import { useDeviceGroups } from '@/shared/hooks/useDeviceGroups';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { DeviceGroupForm } from './DeviceGroupForm';
import { formatDistanceToNow } from 'date-fns';

interface DeviceGroupNodeProps {
  group: DeviceGroup;
  level: number;
  onEdit: (group: DeviceGroup) => void;
  onDelete: (id: string) => void;
  onAddChild: (parentId: string) => void;
  onToggleStatus: (id: string, status: 'enabled' | 'disabled') => void;
  expandedNodes: Set<string>;
  onToggleExpanded: (id: string) => void;
  isLoadingChildren: boolean;
}

const DeviceGroupNode: React.FC<DeviceGroupNodeProps> = ({
  group,
  level,
  onEdit,
  onDelete,
  onAddChild,
  onToggleStatus,
  expandedNodes,
  onToggleExpanded,
  isLoadingChildren,
}) => {
  const hasChildren = group.children && group.children.length > 0;
  const isExpanded = expandedNodes.has(group.id);
  const canExpand = hasChildren || group.children === undefined; // undefined means we haven't loaded children yet

  const handleToggleExpand = () => {
    if (canExpand) {
      onToggleExpanded(group.id);
    }
  };

  return (
    <div className="w-full">
      <div
        className={`
          flex items-center gap-2 p-3 rounded-lg border transition-colors
          ${group.status === 'enabled' ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-gray-100'}
          ${level > 0 ? 'ml-6' : ''}
        `}
        style={{ marginLeft: `${level * 24}px` }}
      >
        {/* Expand/Collapse Button */}
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0"
          onClick={handleToggleExpand}
          disabled={!canExpand}
        >
          {isLoadingChildren ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
          ) : canExpand ? (
            isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )
          ) : null}
        </Button>

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
          <div className="flex items-center gap-4 text-xs text-gray-400 mt-1">
            <span>Created {formatDistanceToNow(new Date(group.createdAt), { addSuffix: true })}</span>
            {group.updatedAt && (
              <span>Updated {formatDistanceToNow(new Date(group.updatedAt), { addSuffix: true })}</span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => onAddChild(group.id)}
            title="Add child group"
          >
            <Plus className="h-4 w-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(group)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onToggleStatus(group.id, group.status === 'enabled' ? 'disabled' : 'enabled')}
              >
                {group.status === 'enabled' ? 'Disable' : 'Enable'}
              </DropdownMenuItem>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Device Group</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{group.name}"? This action cannot be undone.
                      {hasChildren && ' All child groups will also be deleted.'}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => onDelete(group.id)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Children */}
      {isExpanded && (
        <div className="mt-2">
          {isLoadingChildren ? (
            <div className="ml-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-2 p-3 mb-2">
                  <Skeleton className="h-6 w-6" />
                  <Skeleton className="h-3 w-3 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-32 mb-1" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            group.children?.map((child) => (
              <DeviceGroupNode
                key={child.id}
                group={child}
                level={level + 1}
                onEdit={onEdit}
                onDelete={onDelete}
                onAddChild={onAddChild}
                onToggleStatus={onToggleStatus}
                expandedNodes={expandedNodes}
                onToggleExpanded={onToggleExpanded}
                isLoadingChildren={isLoadingChildren}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export const DeviceGroupsTree: React.FC = () => {
  const {
    deviceGroups,
    isLoading,
    error,
    createGroup,
    updateGroup,
    deleteGroup,
    toggleStatus,
    getChildren,
    isCreating,
    isUpdating,
    isDeleting,
    isToggling,
    isLoadingChildren,
  } = useDeviceGroups();

  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [editingGroup, setEditingGroup] = useState<DeviceGroup | null>(null);
  const [addingChildTo, setAddingChildTo] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Build hierarchical structure
  const hierarchicalGroups = useMemo(() => {
    const groupsMap = new Map<string, DeviceGroup>();
    const rootGroups: DeviceGroup[] = [];

    // First pass: create map of all groups
    deviceGroups.forEach((group) => {
      groupsMap.set(group.id, { ...group, children: [] });
    });

    // Second pass: build hierarchy
    deviceGroups.forEach((group) => {
      const groupWithChildren = groupsMap.get(group.id)!;
      if (group.parentId && groupsMap.has(group.parentId)) {
        const parent = groupsMap.get(group.parentId)!;
        parent.children!.push(groupWithChildren);
      } else {
        rootGroups.push(groupWithChildren);
      }
    });

    return rootGroups;
  }, [deviceGroups]);

  const handleToggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
      // Load children if not already loaded
      const group = deviceGroups.find((g) => g.id === id);
      if (group && !group.children) {
        getChildren(id);
      }
    }
    setExpandedNodes(newExpanded);
  };

  const handleEdit = (group: DeviceGroup) => {
    setEditingGroup(group);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    deleteGroup(id);
  };

  const handleAddChild = (parentId: string) => {
    setAddingChildTo(parentId);
    setShowForm(true);
  };

  const handleToggleStatus = (id: string, status: 'enabled' | 'disabled') => {
    toggleStatus({ id, status });
  };

  const handleFormSubmit = (groupData: Partial<DeviceGroup>) => {
    if (editingGroup) {
      updateGroup({ id: editingGroup.id, group: groupData });
    } else {
      createGroup({
        ...groupData,
        parentId: addingChildTo || undefined,
        status: groupData.status || 'enabled',
      });
    }
    setShowForm(false);
    setEditingGroup(null);
    setAddingChildTo(null);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingGroup(null);
    setAddingChildTo(null);
  };

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            Failed to load device groups. Please try again.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Device Groups</CardTitle>
            <Button onClick={() => setShowForm(true)} disabled={isCreating}>
              <Plus className="h-4 w-4 mr-2" />
              Add Root Group
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-2 p-3">
                  <Skeleton className="h-6 w-6" />
                  <Skeleton className="h-3 w-3 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-32 mb-1" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              ))}
            </div>
          ) : hierarchicalGroups.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No device groups found. Create your first group to get started.
            </div>
          ) : (
            <div className="space-y-2">
              {hierarchicalGroups.map((group) => (
                <DeviceGroupNode
                  key={group.id}
                  group={group}
                  level={0}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onAddChild={handleAddChild}
                  onToggleStatus={handleToggleStatus}
                  expandedNodes={expandedNodes}
                  onToggleExpanded={handleToggleExpanded}
                  isLoadingChildren={isLoadingChildren}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Form Dialog */}
      {showForm && (
        <DeviceGroupForm
          group={editingGroup}
          parentId={addingChildTo}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
          isLoading={isCreating || isUpdating}
        />
      )}
    </div>
  );
}; 