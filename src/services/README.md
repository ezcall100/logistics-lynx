# Settings API Integration

## Overview

This directory contains the complete API integration for the Settings Management system. The implementation provides a comprehensive CRUD interface with real-time updates, backup/restore functionality, and audit logging.

## Files

### `settingsApi.ts`
- **Main API service** with complete CRUD operations
- **Authentication** with API key and Bearer token support
- **Error handling** with proper HTTP status codes
- **TypeScript interfaces** for type safety
- **Export/Import** functionality (JSON, CSV, XML)
- **Backup/Restore** operations
- **Template management**
- **Audit logging**

### `useSettings.ts`
- **React hook** for settings management
- **Real-time updates** with configurable intervals
- **Pagination** and filtering
- **Loading states** and error handling
- **Auto-refresh** functionality
- **Bulk operations** support

### `useSettingsBackup.ts`
- **React hook** for backup and template management
- **Template operations** (create, update, delete, apply)
- **Backup operations** (create, restore, delete, download)
- **Audit log** management
- **Loading states** for all operations

## API Endpoints

### Settings CRUD
- `GET /api/settings` - List settings with filters and pagination
- `GET /api/settings/:id` - Get single setting
- `POST /api/settings` - Create new setting
- `PUT /api/settings/:id` - Update setting
- `DELETE /api/settings/:id` - Delete setting
- `DELETE /api/settings/bulk-delete` - Bulk delete settings
- `PUT /api/settings/bulk-update` - Bulk update settings
- `PUT /api/settings/reset-defaults` - Reset settings to default

### Export/Import
- `GET /api/settings/export` - Export settings (JSON, CSV, XML)
- `POST /api/settings/import` - Import settings from file

### Templates
- `GET /api/settings/templates` - List templates
- `POST /api/settings/templates` - Create template
- `PUT /api/settings/templates/:id` - Update template
- `DELETE /api/settings/templates/:id` - Delete template
- `POST /api/settings/templates/:id/apply` - Apply template

### Backups
- `GET /api/settings/backups` - List backups
- `POST /api/settings/backups` - Create backup
- `POST /api/settings/backups/:id/restore` - Restore backup
- `DELETE /api/settings/backups/:id` - Delete backup
- `GET /api/settings/backups/:id/download` - Download backup

### Audit Logs
- `GET /api/settings/audit-logs` - List audit logs
- `GET /api/settings/:id/audit-logs` - Get setting audit logs

## Usage

### Basic Settings Management

```typescript
import { useSettings } from '../hooks/useSettings';

const MyComponent = () => {
  const {
    settings,
    loading,
    error,
    createSetting,
    updateSetting,
    deleteSetting,
    refreshSettings
  } = useSettings();

  // Create a new setting
  const handleCreate = async () => {
    const success = await createSetting({
      key: 'new_setting',
      category: 'General',
      value: 'default_value',
      type: 'text',
      description: 'A new setting'
    });
    
    if (success) {
      console.log('Setting created successfully');
    }
  };

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {settings.map(setting => (
        <div key={setting.id}>{setting.key}: {setting.value}</div>
      ))}
    </div>
  );
};
```

### Backup Management

```typescript
import { useSettingsBackup } from '../hooks/useSettingsBackup';

const BackupComponent = () => {
  const {
    backups,
    createBackup,
    restoreBackup,
    downloadBackup
  } = useSettingsBackup();

  const handleCreateBackup = async () => {
    const success = await createBackup(
      'My Backup',
      'Backup description'
    );
    
    if (success) {
      console.log('Backup created successfully');
    }
  };

  return (
    <div>
      {backups.map(backup => (
        <div key={backup.id}>
          {backup.name}
          <button onClick={() => restoreBackup(backup.id)}>
            Restore
          </button>
        </div>
      ))}
    </div>
  );
};
```

## Configuration

### Environment Variables

```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_API_KEY=your-api-key-here
```

### API Configuration

```typescript
import { getApiConfig } from '../config/api';

const config = getApiConfig();
console.log(config.BASE_URL); // http://localhost:3001/api
```

## Features

### ✅ Complete CRUD Operations
- Create, Read, Update, Delete settings
- Bulk operations for multiple settings
- Real-time data synchronization

### ✅ Advanced Filtering & Search
- Search across all fields
- Filter by category, type, group, tags
- Sortable columns
- Pagination with configurable page sizes

### ✅ Import/Export
- Multiple formats: JSON, CSV, XML
- Bulk export of selected settings
- File import with validation

### ✅ Backup & Restore
- Create named backups
- Restore from any backup
- Download backup files
- Backup management

### ✅ Template System
- Pre-configured setting templates
- Apply templates to create multiple settings
- Template management (CRUD)

### ✅ Audit Logging
- Complete change history
- User tracking
- IP and user agent logging
- Detailed action descriptions

### ✅ Real-time Updates
- Live data synchronization
- Auto-refresh intervals
- Manual refresh capability
- Loading states and error handling

### ✅ TypeScript Support
- Complete type definitions
- Type-safe API calls
- Interface definitions for all data structures

## Error Handling

The API service includes comprehensive error handling:

- **HTTP Status Codes** - Proper error responses
- **Network Errors** - Connection timeout and retry logic
- **Validation Errors** - Input validation with detailed messages
- **Authentication Errors** - API key and token validation
- **Rate Limiting** - Request throttling and backoff

## Performance

- **Debounced Search** - Reduces API calls during typing
- **Pagination** - Efficient data loading
- **Caching** - Configurable cache TTL
- **Auto-save** - Background saving without user interaction
- **Real-time Updates** - Configurable refresh intervals

## Security

- **API Key Authentication** - Secure API access
- **Bearer Token Support** - JWT token authentication
- **Input Validation** - Server-side validation
- **Audit Logging** - Complete change tracking
- **Rate Limiting** - Protection against abuse

This implementation provides a production-ready settings management system with enterprise-grade features and comprehensive API integration.
