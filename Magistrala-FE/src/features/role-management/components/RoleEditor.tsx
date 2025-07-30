import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter 
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from '@/components/ui/command';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { 
  X, 
  ChevronsUpDown, 
  Check, 
  Shield, 
  Users, 
  Settings,
  Calendar,
  User,
  Search
} from 'lucide-react';
import { Role, CreateRoleRequest, UpdateRoleRequest, ROLE_ACTIONS } from '@/features/role-management/types';
import { rolesService } from '@/features/role-management/services/roles';
import { formatDistanceToNow } from 'date-fns';
import { getActionCategories } from '@/features/role-management/utils/roleUtils';

interface RoleEditorProps {
  role?: Role;
  organizationId: string;
  onSave: (roleData: CreateRoleRequest | UpdateRoleRequest) => Promise<void>;
  onCancel: () => void;
}

// Optimized Action Selector Component
const ActionSelector = React.memo(({ 
  selectedActions, 
  onActionToggle 
}: {
  selectedActions: string[];
  onActionToggle: (action: string) => void;
}) => {
  const [actionsOpen, setActionsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [availableActions, setAvailableActions] = useState<string[]>([]);

  // Load available actions
  useEffect(() => {
    const loadActions = async () => {
      try {
        const actions = await rolesService.getAvailableActions();
        setAvailableActions(actions);
      } catch (error) {
        console.error('Failed to load actions:', error);
      }
    };
    loadActions();
  }, []);

  // Memoized filtered actions
  const filteredActions = useMemo(() => {
    if (!searchTerm) return availableActions;
    return availableActions.filter(action => 
      action.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [availableActions, searchTerm]);

  const actionCategories = useMemo(() => getActionCategories(), []);

  return (
    <Popover open={actionsOpen} onOpenChange={setActionsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={actionsOpen}
          className="w-full justify-between"
        >
          {selectedActions.length > 0
            ? `${selectedActions.length} permission(s) selected`
            : "Select permissions..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command>
          <CommandInput 
            placeholder="Search permissions..." 
            value={searchTerm}
            onValueChange={setSearchTerm}
          />
          <CommandList>
            <CommandEmpty>No permissions found.</CommandEmpty>
            {Object.entries(actionCategories).map(([category, actions]) => (
              <CommandGroup key={category} heading={category}>
                {actions.map((action) => (
                  <CommandItem
                    key={action}
                    onSelect={() => onActionToggle(action)}
                  >
                    <Checkbox
                      checked={selectedActions.includes(action)}
                      onChange={() => onActionToggle(action)}
                      className="mr-2"
                    />
                    {action}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
});

ActionSelector.displayName = 'ActionSelector';

// Optimized Member Selector Component
const MemberSelector = React.memo(({ 
  selectedMembers, 
  onMemberToggle,
  onMemberRemove 
}: {
  selectedMembers: string[];
  onMemberToggle: (memberId: string) => void;
  onMemberRemove: (memberId: string) => void;
}) => {
  const [membersOpen, setMembersOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [availableUsers, setAvailableUsers] = useState<Array<{ id: string; email: string; name: string }>>([]);

  // Load available users
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const users = await rolesService.getUsersForSelection();
        setAvailableUsers(users);
      } catch (error) {
        console.error('Failed to load users:', error);
      }
    };
    loadUsers();
  }, []);

  // Memoized filtered users
  const filteredUsers = useMemo(() => {
    if (!searchTerm) return availableUsers;
    return availableUsers.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [availableUsers, searchTerm]);

  // Memoized selected users
  const selectedUsers = useMemo(() => {
    return availableUsers.filter(user => selectedMembers.includes(user.id));
  }, [availableUsers, selectedMembers]);

  return (
    <>
      <Popover open={membersOpen} onOpenChange={setMembersOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={membersOpen}
            className="w-full justify-between"
          >
            {selectedMembers.length > 0
              ? `${selectedMembers.length} member(s) selected`
              : "Select members..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0">
          <Command>
            <CommandInput 
              placeholder="Search users..." 
              value={searchTerm}
              onValueChange={setSearchTerm}
            />
            <CommandList>
              <CommandEmpty>No users found.</CommandEmpty>
              <CommandGroup>
                {filteredUsers.map((user) => (
                  <CommandItem
                    key={user.id}
                    onSelect={() => onMemberToggle(user.id)}
                  >
                    <Checkbox
                      checked={selectedMembers.includes(user.id)}
                      onChange={() => onMemberToggle(user.id)}
                      className="mr-2"
                    />
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedMembers.length > 0 && (
        <div className="mt-4">
          <Label>Selected Members:</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedUsers.map((user) => (
              <Badge key={user.id} variant="secondary">
                {user.name}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 ml-1"
                  onClick={() => onMemberRemove(user.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </>
  );
});

MemberSelector.displayName = 'MemberSelector';

// Optimized Role Metadata Component
const RoleMetadata = React.memo(({ role }: { role: Role }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg flex items-center gap-2">
        <Calendar className="h-5 w-5" />
        Role Information
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <Label className="text-gray-500">Created By</Label>
          <div className="flex items-center gap-1 mt-1">
            <User className="h-4 w-4 text-gray-400" />
            {role.createdBy}
          </div>
        </div>
        <div>
          <Label className="text-gray-500">Created</Label>
          <div className="mt-1">
            {formatDistanceToNow(new Date(role.createdAt), { addSuffix: true })}
          </div>
        </div>
        {role.updatedBy && (
          <div>
            <Label className="text-gray-500">Last Updated By</Label>
            <div className="flex items-center gap-1 mt-1">
              <User className="h-4 w-4 text-gray-400" />
              {role.updatedBy}
            </div>
          </div>
        )}
        {role.updatedAt && (
          <div>
            <Label className="text-gray-500">Last Updated</Label>
            <div className="mt-1">
              {formatDistanceToNow(new Date(role.updatedAt), { addSuffix: true })}
            </div>
          </div>
        )}
      </div>
    </CardContent>
  </Card>
));

RoleMetadata.displayName = 'RoleMetadata';

const RoleEditor: React.FC<RoleEditorProps> = ({
  role,
  organizationId,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    name: '',
    entityId: '',
    actions: [] as string[],
    members: [] as string[]
  });
  const [loading, setLoading] = useState(false);

  const isEditing = !!role;

  // Initialize form data when role changes
  useEffect(() => {
    if (role) {
      setFormData({
        name: role.name,
        entityId: role.entityId,
        actions: role.actions || [],
        members: role.members || []
      });
    } else {
      setFormData({
        name: '',
        entityId: '',
        actions: [],
        members: []
      });
    }
  }, [role]);

  // Memoized action toggle handler
  const handleActionToggle = useCallback((action: string) => {
    setFormData(prev => ({
      ...prev,
      actions: prev.actions.includes(action)
        ? prev.actions.filter(a => a !== action)
        : [...prev.actions, action]
    }));
  }, []);

  // Memoized member toggle handler
  const handleMemberToggle = useCallback((memberId: string) => {
    setFormData(prev => ({
      ...prev,
      members: prev.members.includes(memberId)
        ? prev.members.filter(m => m !== memberId)
        : [...prev.members, memberId]
    }));
  }, []);

  // Memoized member remove handler
  const handleMemberRemove = useCallback((memberId: string) => {
    setFormData(prev => ({
      ...prev,
      members: prev.members.filter(m => m !== memberId)
    }));
  }, []);

  // Memoized form submission handler
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    try {
      if (isEditing && role) {
        await onSave({
          id: role.id,
          ...formData
        } as UpdateRoleRequest);
      } else {
        await onSave({
          ...formData,
          entityId: formData.entityId || organizationId
        } as CreateRoleRequest);
      }
    } catch (error) {
      console.error('Failed to save role:', error);
    } finally {
      setLoading(false);
    }
  }, [formData, isEditing, role, onSave, organizationId]);

  // Memoized selected actions badges
  const selectedActionsBadges = useMemo(() => {
    if (formData.actions.length === 0) return null;
    
    return (
      <div className="mt-4">
        <Label>Selected Permissions:</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.actions.map((action) => (
            <Badge key={action} variant="secondary">
              {action}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1"
                onClick={() => handleActionToggle(action)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      </div>
    );
  }, [formData.actions, handleActionToggle]);

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Role Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter role name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="entityId">Entity ID</Label>
              <Input
                id="entityId"
                value={formData.entityId}
                onChange={(e) => setFormData(prev => ({ ...prev, entityId: e.target.value }))}
                placeholder="User ID (optional)"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions/Permissions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Permissions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ActionSelector
            selectedActions={formData.actions}
            onActionToggle={handleActionToggle}
          />
          {selectedActionsBadges}
        </CardContent>
      </Card>

      {/* Members */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5" />
            Members
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MemberSelector
            selectedMembers={formData.members}
            onMemberToggle={handleMemberToggle}
            onMemberRemove={handleMemberRemove}
          />
        </CardContent>
      </Card>

      {/* Role Metadata (Read-only for editing) */}
      {isEditing && role && <RoleMetadata role={role} />}

      {/* Form Actions */}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          type="submit" 
          onClick={handleSubmit}
          disabled={loading || !formData.name}
        >
          {loading ? 'Saving...' : (isEditing ? 'Update Role' : 'Create Role')}
        </Button>
      </div>
    </div>
  );
};

export default React.memo(RoleEditor); 