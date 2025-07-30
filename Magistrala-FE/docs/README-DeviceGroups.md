# Device Groups Tree Component

A React component for managing hierarchical device groups with a tree view interface, built with TypeScript, TailwindCSS, and shadcn/ui components.

## Features

### Core Functionality
- **Hierarchical Tree View**: Display device groups in a nested structure
- **Expand/Collapse**: Lazy-loading children with expand/collapse functionality
- **CRUD Operations**: Create, read, update, and delete device groups
- **Status Management**: Enable/disable groups with visual indicators
- **Form Validation**: Client-side validation using Zod schema
- **Responsive Design**: Works on desktop and mobile devices

### UI Components
- **Visual Status Indicators**: Green dots for enabled, gray for disabled
- **Action Buttons**: Edit, delete, add child, and toggle status
- **Loading States**: Skeleton components and loading spinners
- **Error Handling**: Toast notifications and error states
- **Accessibility**: Proper ARIA labels and keyboard navigation

## Architecture

### Components Structure
```
components/
├── DeviceGroupsTree.tsx      # Main tree view component
├── DeviceGroupForm.tsx       # Form for creating/editing groups
├── DeviceGroupsDemo.tsx      # Demo component with mock data
└── README-DeviceGroups.md    # This documentation
```

### Data Flow
1. **API Service** (`services/device-groups.ts`): Handles REST API calls
2. **Custom Hook** (`hooks/useDeviceGroups.ts`): Manages state and mutations
3. **Tree Component**: Renders hierarchical data and handles user interactions
4. **Form Component**: Handles group creation and editing

### State Management
- **React Query**: For server state management and caching
- **Local State**: For UI state (expanded nodes, form visibility)
- **Zustand**: For global state (if needed)

## Usage

### Basic Implementation
```tsx
import { DeviceGroupsTree } from '@/components/DeviceGroupsTree';

function MyPage() {
  return (
    <div>
      <h1>Device Groups</h1>
      <DeviceGroupsTree />
    </div>
  );
}
```

### With Demo Mode
```tsx
import { DeviceGroupsDemo } from '@/components/DeviceGroupsDemo';

function MyPage() {
  return (
    <div>
      <h1>Device Groups</h1>
      <DeviceGroupsDemo />
    </div>
  );
}
```

## API Endpoints

The component expects the following REST API endpoints:

### GET /groups
Returns all device groups
```json
{
  "groups": [
    {
      "id": "string",
      "name": "string",
      "description": "string?",
      "parentId": "string?",
      "level": "number?",
      "path": "string?",
      "status": "enabled" | "disabled",
      "createdAt": "string",
      "updatedAt": "string?"
    }
  ]
}
```

### GET /groups/{id}/children
Returns children of a specific group
```json
{
  "groups": [...]
}
```

### POST /groups
Creates a new device group
```json
{
  "name": "string",
  "description": "string?",
  "parentId": "string?",
  "status": "enabled" | "disabled"
}
```

### PUT /groups/{id}
Updates an existing device group

### DELETE /groups/{id}
Deletes a device group

### PATCH /groups/{id}/status
Toggles group status
```json
{
  "status": "enabled" | "disabled"
}
```

## Data Structure

### DeviceGroup Interface
```typescript
interface DeviceGroup {
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
```

## Styling

The component uses TailwindCSS classes and follows the design system:
- **Cards**: For grouping content
- **Buttons**: Primary, secondary, and ghost variants
- **Badges**: For status indicators
- **Icons**: Lucide React icons
- **Colors**: Consistent with the application theme

## Accessibility Features

- **Keyboard Navigation**: Tab through interactive elements
- **ARIA Labels**: Proper labeling for screen readers
- **Focus Management**: Logical tab order
- **Color Contrast**: Meets WCAG guidelines
- **Screen Reader Support**: Descriptive text and labels

## Performance Considerations

- **Lazy Loading**: Children are loaded only when expanded
- **Virtualization**: For large datasets (can be implemented)
- **Memoization**: React.memo for expensive components
- **Debouncing**: For search and filter operations
- **Caching**: React Query for API response caching

## Testing

### Unit Tests
- Component rendering
- User interactions
- Form validation
- API calls

### Integration Tests
- End-to-end workflows
- Data persistence
- Error handling

### Accessibility Tests
- Screen reader compatibility
- Keyboard navigation
- Color contrast

## Future Enhancements

- **Drag & Drop**: Reorder groups by dragging
- **Bulk Operations**: Select multiple groups for batch actions
- **Search & Filter**: Find groups quickly
- **Export/Import**: Backup and restore functionality
- **Real-time Updates**: WebSocket integration
- **Advanced Permissions**: Role-based access control

## Dependencies

- React 18+
- TypeScript
- TailwindCSS
- shadcn/ui components
- React Query
- React Hook Form
- Zod (validation)
- date-fns (date formatting)
- Lucide React (icons)
- Sonner (toast notifications) 