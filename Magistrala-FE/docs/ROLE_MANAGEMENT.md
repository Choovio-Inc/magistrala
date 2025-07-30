# Role Management System

This document describes the Role Management UI implementation for administrators to manage user roles across multiple organizations.

## Overview

The Role Management system provides a comprehensive interface for administrators to:
- View and manage roles across different organizations
- Create, edit, and delete roles
- Assign permissions and members to roles
- Search and filter roles
- View role metadata and statistics

## Features

### 1. Admin Dashboard
- **Organization Selector**: Choose from available organizations
- **Role Statistics**: View total roles, active organizations, and total members
- **Quick Actions**: Add new roles with a single click

### 2. Role List View
- **Table Display**: Shows roles with name, type, members, actions, and metadata
- **Search & Filter**: Search by role name or user, filter by organization
- **Pagination**: Navigate through large lists of roles
- **Inline Actions**: Edit or delete roles directly from the table

### 3. Role Editor
- **Create/Edit Modes**: Single interface for both creating and editing roles
- **Permission Management**: Multi-select permissions organized by category
- **Member Assignment**: Search and select users to assign to roles
- **Validation**: Form validation with error handling
- **Metadata Display**: Show creation/update information for existing roles

### 4. Admin Actions
- **Add New Role**: Create roles with custom permissions
- **Edit Role**: Modify existing role properties
- **Delete Role**: Remove roles with confirmation dialog
- **Bulk Operations**: Future enhancement for bulk role management

## Technical Implementation

### File Structure
```
Magistrala-FE/
├── app/admin/roles/
│   └── page.tsx                 # Main role management page
├── components/
│   ├── RoleList.tsx            # Role table component
│   ├── RoleEditor.tsx          # Role creation/editing dialog
│   ├── OrganizationSelector.tsx # Organization selection sidebar
│   └── DeleteRoleDialog.tsx    # Delete confirmation dialog
├── hooks/
│   └── useRoles.ts             # Custom hook for role management
├── services/
│   └── roles.ts                # API service for role operations
├── types/
│   └── index.ts                # TypeScript interfaces and types
└── utils/
    └── roleUtils.ts            # Utility functions for role operations
```

### Key Components

#### RoleList Component
- Displays roles in a responsive table format
- Implements search, pagination, and sorting
- Shows role type badges with color coding
- Provides inline edit/delete actions

#### RoleEditor Component
- Modal dialog for creating and editing roles
- Multi-select permission picker with categories
- User search and selection for role members
- Form validation and error handling

#### OrganizationSelector Component
- Sidebar for organization selection
- Shows organization details and statistics
- Displays organization status and metadata

#### DeleteRoleDialog Component
- Confirmation dialog for role deletion
- Shows role details before deletion
- Prevents accidental deletions

### Data Models

#### Role Interface
```typescript
interface Role {
  id: string;
  name: string;
  entityId: string;     // user ID
  createdBy: string;
  createdAt: string;    // ISO date string
  updatedBy?: string;
  updatedAt?: string;
  actions?: string[];   // permissions
  members?: string[];   // user IDs or emails
}
```

#### Permission Actions
The system supports the following permission categories:
- **User Management**: Create, read, update, delete users
- **Device Management**: Create, read, update, delete devices
- **Dashboard Management**: Create, read, update, delete dashboards
- **Role Management**: Create, read, update, delete roles
- **Organization Management**: Read, update organization settings
- **Admin Actions**: Full administrative access

### Role Types
Roles are automatically categorized based on their permissions:
- **Admin**: Has full administrative access
- **Editor**: Can create, update, and delete resources
- **Viewer**: Read-only access to resources

## Usage

### Accessing Role Management
1. Navigate to the admin section
2. Click on "Role Management" in the sidebar
3. Select an organization from the sidebar
4. View and manage roles for the selected organization

### Creating a New Role
1. Click "Add New Role" button
2. Fill in the role name and entity ID (optional)
3. Select permissions from the categorized list
4. Add members by searching and selecting users
5. Click "Create Role" to save

### Editing a Role
1. Click the edit button (pencil icon) next to a role
2. Modify the role properties as needed
3. Update permissions and members
4. Click "Update Role" to save changes

### Deleting a Role
1. Click the delete button (trash icon) next to a role
2. Review the confirmation dialog
3. Click "Delete Role" to confirm

## API Integration

### Current Implementation
The system currently uses mock data for development. The service layer is designed to be easily replaced with real API calls.

### Backend Integration
To integrate with the backend:
1. Update the service functions in `services/roles.ts`
2. Replace mock implementations with actual API calls
3. Update error handling for real API responses
4. Test with real data

### API Endpoints (Expected)
- `GET /organizations` - List organizations
- `GET /roles` - List roles with filtering
- `GET /roles/:id` - Get specific role
- `POST /roles` - Create new role
- `PUT /roles/:id` - Update role
- `DELETE /roles/:id` - Delete role
- `GET /users` - List users for member selection

## Styling and UI

### Design System
- Uses TailwindCSS for styling
- Implements shadcn/ui components
- Follows the existing design patterns
- Responsive design for mobile and desktop

### Color Coding
- **Admin Roles**: Red badges
- **Editor Roles**: Blue badges
- **Viewer Roles**: Green badges
- **Active Organizations**: Green status
- **Inactive Organizations**: Red status

### Icons
- Uses Lucide React icons throughout
- Consistent iconography for actions and status
- Semantic icon usage for better UX

## Future Enhancements

### Planned Features
1. **Bulk Operations**: Select multiple roles for bulk actions
2. **Role Templates**: Predefined role templates for common use cases
3. **Permission Inheritance**: Hierarchical permission system
4. **Audit Log**: Track role changes and assignments
5. **Role Analytics**: Usage statistics and insights
6. **Advanced Filtering**: Filter by permission type, member count, etc.

### Technical Improvements
1. **Real-time Updates**: WebSocket integration for live updates
2. **Offline Support**: Service worker for offline functionality
3. **Performance Optimization**: Virtual scrolling for large role lists
4. **Accessibility**: Enhanced keyboard navigation and screen reader support

## Testing

### Manual Testing Checklist
- [ ] Organization selection works correctly
- [ ] Role list displays properly
- [ ] Search functionality works
- [ ] Pagination works for large lists
- [ ] Create role form validation
- [ ] Edit role pre-populates data correctly
- [ ] Delete confirmation works
- [ ] Responsive design on mobile
- [ ] Error handling displays appropriate messages

### Automated Testing
- Unit tests for utility functions
- Component tests for UI components
- Integration tests for service layer
- E2E tests for complete workflows

## Security Considerations

### Access Control
- Role management is restricted to admin users only
- Role-based access control (RBAC) implementation
- Audit logging for all role changes

### Data Validation
- Input validation on all forms
- Sanitization of user inputs
- Type safety with TypeScript

### API Security
- Authentication required for all endpoints
- Authorization checks for role operations
- Rate limiting for API calls

## Troubleshooting

### Common Issues
1. **Roles not loading**: Check organization selection
2. **Search not working**: Verify search parameters
3. **Form validation errors**: Check required fields
4. **Permission issues**: Ensure user has admin access

### Debug Information
- Check browser console for errors
- Verify API responses in network tab
- Review component state in React DevTools

## Support

For issues or questions about the Role Management system:
1. Check this documentation
2. Review the code comments
3. Contact the development team
4. Create an issue in the project repository 