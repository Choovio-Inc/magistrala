# Magistrala Frontend

A modern, feature-rich IoT management platform built with Next.js, TypeScript, and TailwindCSS.

## 🏗️ Project Structure

The project follows a **Feature-Based Architecture** with clear separation of concerns and modular organization.

```
Magistrala-FE/
├── app/                          # Next.js App Router
│   ├── admin/                    # Admin pages
│   │   ├── roles/               # Role management
│   │   └── users/               # User management
│   ├── auth/                    # Authentication pages
│   ├── dashboards/              # Dashboard pages
│   ├── device-groups/           # Device group pages
│   └── layout.tsx               # Root layout
├── components/                   # UI Components (shadcn/ui)
│   └── ui/                      # Base UI components
├── features/                     # Feature-based modules
│   ├── role-management/         # Role management feature
│   │   ├── components/          # Feature-specific components
│   │   ├── hooks/              # Feature-specific hooks
│   │   ├── services/           # Feature-specific services
│   │   ├── types/              # Feature-specific types
│   │   ├── utils/              # Feature-specific utilities
│   │   └── index.ts            # Feature exports
│   └── device-management/       # Device management feature
│       ├── components/          # Feature-specific components
│       ├── hooks/              # Feature-specific hooks
│       ├── services/           # Feature-specific services
│       ├── types/              # Feature-specific types
│       ├── utils/              # Feature-specific utilities
│       └── index.ts            # Feature exports
├── shared/                       # Shared utilities and components
│   ├── components/              # Shared components
│   ├── hooks/                   # Shared hooks
│   ├── services/                # Shared services
│   ├── types/                   # Shared types
│   ├── utils/                   # Shared utilities
│   ├── constants/               # Application constants
│   └── index.ts                 # Shared exports
├── contexts/                     # React contexts
├── stores/                       # State management
├── public/                       # Static assets
└── docs/                         # Documentation
```

## 🎯 Architecture Principles

### 1. **Feature-Based Organization**
- Each feature is self-contained with its own components, hooks, services, and types
- Features can be developed, tested, and deployed independently
- Clear boundaries between different business domains

### 2. **Shared Resources**
- Common utilities, types, and services are shared across features
- No duplication of common functionality
- Centralized configuration and constants

### 3. **Clean Imports**
- Feature-specific imports use relative paths within the feature
- Shared imports use the `@/shared` alias
- UI components use the `@/components/ui` alias

### 4. **Type Safety**
- Full TypeScript implementation
- Feature-specific types are co-located with the feature
- Shared types are centralized for consistency

## 📁 Directory Structure Details

### `/app` - Next.js App Router
- **admin/**: Administrative pages (roles, users, etc.)
- **auth/**: Authentication pages (login, register, etc.)
- **dashboards/**: Dashboard and analytics pages
- **device-groups/**: Device management pages
- **layout.tsx**: Root layout with navigation and providers

### `/components/ui` - Base UI Components
- shadcn/ui components (Button, Card, Dialog, etc.)
- Consistent design system
- Reusable across all features

### `/features` - Feature Modules

#### `/features/role-management`
- **components/**: Role-specific UI components
  - `RoleList.tsx` - Role table with search and pagination
  - `RoleEditor.tsx` - Create/edit role dialog
  - `OrganizationSelector.tsx` - Organization selection
  - `DeleteRoleDialog.tsx` - Delete confirmation
- **hooks/**: Feature-specific hooks
  - `useRoles.ts` - Role management state and logic
- **services/**: API services
  - `roles.ts` - Role management API calls
- **types/**: TypeScript interfaces
  - `index.ts` - Role, Organization, and related types
- **utils/**: Utility functions
  - `roleUtils.ts` - Role-specific utilities
- **index.ts**: Feature exports

#### `/features/device-management`
- **components/**: Device-specific UI components
  - `DeviceGroupForm.tsx` - Device group creation/editing
  - `DeviceGroupsDemo.tsx` - Device groups demonstration
  - `DeviceGroupsTree.tsx` - Hierarchical device group tree
  - `DeviceManagement.tsx` - Main device management interface
- **types/**: Device-specific TypeScript interfaces
- **index.ts**: Feature exports

### `/shared` - Shared Resources

#### `/shared/components`
- Reusable components used across multiple features

#### `/shared/hooks`
- `use-toast.ts` - Toast notification hook
- `useDashboard.ts` - Dashboard data hook
- `useDeviceGroups.ts` - Device groups hook

#### `/shared/services`
- `api.ts` - Base API client
- `auth.ts` - Authentication service
- `dashboard.ts` - Dashboard service
- `device-groups.ts` - Device groups service

#### `/shared/types`
- Common interfaces used across features
- User, Device, Project, etc.

#### `/shared/utils`
- `utils.ts` - Common utility functions
- String formatting, date helpers, etc.

#### `/shared/constants`
- `index.ts` - Application constants
- Routes, API endpoints, pagination settings, etc.

## 🔧 Development Guidelines

### Adding New Features

1. **Create Feature Directory**
   ```bash
   mkdir -p features/new-feature/{components,hooks,services,types,utils}
   ```

2. **Create Feature Types**
   ```typescript
   // features/new-feature/types/index.ts
   export interface NewFeature {
     id: string;
     name: string;
     // ... other properties
   }
   ```

3. **Create Feature Components**
   ```typescript
   // features/new-feature/components/NewFeatureComponent.tsx
   import { NewFeature } from '../types';
   ```

4. **Create Feature Hook**
   ```typescript
   // features/new-feature/hooks/useNewFeature.ts
   import { NewFeature } from '../types';
   ```

5. **Create Feature Service**
   ```typescript
   // features/new-feature/services/newFeature.ts
   import { api } from '@/shared/services/api';
   ```

6. **Export Feature**
   ```typescript
   // features/new-feature/index.ts
   export * from './components';
   export * from './hooks';
   export * from './services';
   export * from './types';
   ```

### Import Patterns

#### Feature-Specific Imports
```typescript
// Within a feature
import { Role } from '../types';
import { useRoles } from '../hooks/useRoles';
import { rolesService } from '../services/roles';
```

#### Shared Imports
```typescript
// From shared resources
import { useToast } from '@/shared/hooks/use-toast';
import { api } from '@/shared/services/api';
import { User } from '@/shared/types';
```

#### UI Component Imports
```typescript
// UI components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
```

### Type Safety

- All components should have proper TypeScript interfaces
- Use feature-specific types for feature components
- Use shared types for common entities
- Avoid `any` types - use proper interfaces

### State Management

- Use React hooks for local state
- Use custom hooks for complex state logic
- Keep state as close to where it's used as possible
- Use contexts for global state when necessary

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

### Environment Variables
```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
```

## 📚 Available Features

### Role Management
- **Location**: `/admin/roles`
- **Features**: Create, edit, delete roles with permissions
- **Components**: RoleList, RoleEditor, OrganizationSelector

### Device Management
- **Location**: `/device-groups`
- **Features**: Hierarchical device group management
- **Components**: DeviceGroupsTree, DeviceGroupForm



### Dashboards
- **Location**: `/dashboards`
- **Features**: Analytics and monitoring dashboards

## 🧪 Testing

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

## 📦 Build and Deployment

```bash
# Build for production
pnpm build

# Analyze bundle
pnpm analyze

# Start production server
pnpm start
```

## 🤝 Contributing

1. Follow the feature-based architecture
2. Use TypeScript for all new code
3. Write tests for new features
4. Update documentation
5. Follow the established import patterns

## 📄 License

This project is licensed under the MIT License. 