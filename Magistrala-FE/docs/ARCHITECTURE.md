# Architecture Overview

## 🏗️ File Structure Refactoring

The Magistrala Frontend has been refactored to follow a **Feature-Based Architecture** that promotes:

- **Modularity**: Each feature is self-contained
- **Scalability**: Easy to add new features
- **Maintainability**: Clear separation of concerns
- **Reusability**: Shared components and utilities
- **Type Safety**: Full TypeScript implementation

## 📁 New Directory Structure

```
Magistrala-FE/
├── app/                          # Next.js App Router
│   ├── admin/                    # Admin pages
│   │   ├── roles/               # Role management page
│   │   └── users/               # User management page
│   ├── auth/                    # Authentication pages
│   ├── dashboards/              # Dashboard pages
│   ├── device-groups/           # Device group pages
│   └── layout.tsx               # Root layout
├── components/                   # UI Components (shadcn/ui)
│   └── ui/                      # Base UI components
├── features/                     # Feature-based modules
│   ├── role-management/         # Role management feature
│   │   ├── components/          # Feature-specific components
│   │   │   ├── RoleList.tsx
│   │   │   ├── RoleEditor.tsx
│   │   │   ├── OrganizationSelector.tsx
│   │   │   └── DeleteRoleDialog.tsx
│   │   ├── hooks/              # Feature-specific hooks
│   │   │   └── useRoles.ts
│   │   ├── services/           # Feature-specific services
│   │   │   └── roles.ts
│   │   ├── types/              # Feature-specific types
│   │   │   └── index.ts
│   │   ├── utils/              # Feature-specific utilities
│   │   │   └── roleUtils.ts
│   │   └── index.ts            # Feature exports
│   └── device-management/       # Device management feature
│       ├── components/          # Feature-specific components
│       │   ├── DeviceGroupForm.tsx
│       │   ├── DeviceGroupsDemo.tsx
│       │   ├── DeviceGroupsTree.tsx
│       │   └── DeviceManagement.tsx
│       ├── types/              # Feature-specific types
│       │   └── index.ts
│       └── index.ts            # Feature exports
├── shared/                       # Shared utilities and components
│   ├── components/              # Shared components
│   │   ├── auth/               # Authentication components
│   │   ├── charts/             # Chart components
│   │   └── providers/          # Context providers
│   ├── hooks/                   # Shared hooks
│   │   ├── use-toast.ts
│   │   ├── useDashboard.ts
│   │   └── useDeviceGroups.ts
│   ├── services/                # Shared services
│   │   ├── api.ts              # Base API client
│   │   ├── auth.ts             # Authentication service
│   │   ├── dashboard.ts        # Dashboard service
│   │   └── device-groups.ts    # Device groups service
│   ├── types/                   # Shared types
│   │   ├── index.ts            # Common interfaces
│   │   └── user.ts             # User-related types
│   ├── utils/                   # Shared utilities
│   │   └── utils.ts            # Common utility functions
│   ├── constants/               # Application constants
│   │   └── index.ts            # Routes, API endpoints, etc.
│   └── index.ts                 # Shared exports
├── contexts/                     # React contexts
├── stores/                       # State management
├── docs/                         # Documentation
│   ├── ARCHITECTURE.md          # This file
│   ├── ROLE_MANAGEMENT.md       # Role management docs
│   └── README-DeviceGroups.md   # Device groups docs
└── public/                       # Static assets
```

## 🎯 Architecture Principles

### 1. **Feature-Based Organization**
Each feature is a self-contained module with its own:
- **Components**: UI components specific to the feature
- **Hooks**: Custom hooks for feature-specific logic
- **Services**: API calls and data management
- **Types**: TypeScript interfaces and types
- **Utils**: Feature-specific utility functions

### 2. **Shared Resources**
Common functionality is centralized in the `shared/` directory:
- **Components**: Reusable UI components
- **Hooks**: Common React hooks
- **Services**: Base API client and common services
- **Types**: Shared TypeScript interfaces
- **Utils**: Common utility functions
- **Constants**: Application-wide constants

### 3. **Clean Imports**
- Feature-specific imports use relative paths within the feature
- Shared imports use the `@/shared` alias
- UI components use the `@/components/ui` alias

### 4. **Type Safety**
- Full TypeScript implementation
- Feature-specific types are co-located with the feature
- Shared types are centralized for consistency

## 🔄 Migration Summary

### Files Moved

#### Role Management Feature
```
Old Location → New Location
components/RoleList.tsx → features/role-management/components/RoleList.tsx
components/RoleEditor.tsx → features/role-management/components/RoleEditor.tsx
components/OrganizationSelector.tsx → features/role-management/components/OrganizationSelector.tsx
components/DeleteRoleDialog.tsx → features/role-management/components/DeleteRoleDialog.tsx
hooks/useRoles.ts → features/role-management/hooks/useRoles.ts
services/roles.ts → features/role-management/services/roles.ts
utils/roleUtils.ts → features/role-management/utils/roleUtils.ts
types/index.ts (role types) → features/role-management/types/index.ts
```

#### Device Management Feature
```
Old Location → New Location
components/DeviceGroupForm.tsx → features/device-management/components/DeviceGroupForm.tsx
components/DeviceGroupsDemo.tsx → features/device-management/components/DeviceGroupsDemo.tsx
components/DeviceGroupsTree.tsx → features/device-management/components/DeviceGroupsTree.tsx
components/DeviceManagement.tsx → features/device-management/components/DeviceManagement.tsx
```

#### Shared Resources
```
Old Location → New Location
hooks/use-toast.ts → shared/hooks/use-toast.ts
hooks/useDashboard.ts → shared/hooks/useDashboard.ts
hooks/useDeviceGroups.ts → shared/hooks/useDeviceGroups.ts
services/auth.ts → shared/services/auth.ts
services/dashboard.ts → shared/services/dashboard.ts
services/device-groups.ts → shared/services/device-groups.ts
lib/api.ts → shared/services/api.ts
lib/utils.ts → shared/utils/utils.ts
types/index.ts (shared types) → shared/types/index.ts
types/user.ts → shared/types/user.ts
components/charts/ → shared/components/charts/
components/providers/ → shared/components/providers/
components/auth/ → shared/components/auth/
```

#### Documentation
```
Old Location → New Location
ROLE_MANAGEMENT.md → docs/ROLE_MANAGEMENT.md
components/README-DeviceGroups.md → docs/README-DeviceGroups.md
```

### Import Updates

All import statements have been updated to reflect the new structure:

#### Before
```typescript
import { useRoles } from '@/hooks/useRoles';
import { Role } from '@/types';
import { rolesService } from '@/services/roles';
import { getRoleType } from '@/utils/roleUtils';
```

#### After
```typescript
import { useRoles } from '@/features/role-management/hooks/useRoles';
import { Role } from '@/features/role-management/types';
import { rolesService } from '@/features/role-management/services/roles';
import { getRoleType } from '@/features/role-management/utils/roleUtils';
```

## 🚀 Benefits of the New Structure

### 1. **Improved Developer Experience**
- Clear file organization makes it easy to find code
- Feature-based structure reduces cognitive load
- Consistent import patterns across the project

### 2. **Better Scalability**
- New features can be added without affecting existing code
- Each feature is self-contained and can be developed independently
- Shared resources prevent code duplication

### 3. **Enhanced Maintainability**
- Clear separation of concerns
- Feature-specific code is co-located
- Shared utilities are centralized

### 4. **Type Safety**
- Feature-specific types are close to their usage
- Shared types are centralized for consistency
- Full TypeScript coverage

### 5. **Team Collaboration**
- Multiple developers can work on different features simultaneously
- Clear boundaries reduce merge conflicts
- Consistent patterns across the codebase

## 📋 Development Guidelines

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

## 🔧 Configuration

### TypeScript Path Mapping

The `tsconfig.json` includes path mappings for clean imports:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@/shared/*": ["./shared/*"],
      "@/features/*": ["./features/*"],
      "@/components/*": ["./components/*"]
    }
  }
}
```

### Next.js Configuration

The `next.config.js` is configured to work with the new structure:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig
```

## 📚 Documentation

- **README.md**: Main project documentation
- **docs/ARCHITECTURE.md**: This architecture overview
- **docs/ROLE_MANAGEMENT.md**: Role management feature documentation
- **docs/README-DeviceGroups.md**: Device management feature documentation

## 🎉 Conclusion

The refactored file structure provides a solid foundation for scalable, maintainable, and type-safe development. The feature-based architecture makes it easy to add new features while keeping the codebase organized and developer-friendly. 