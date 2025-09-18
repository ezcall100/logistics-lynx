// Unified Settings Types
// This file contains all the shared types for the Settings system

export interface Setting {
  id: number;
  key: string;
  category: string;
  value: string;
  type: 'text' | 'number' | 'boolean' | 'select' | 'multiselect' | 'json' | 'file' | 'password' | 'email' | 'url' | 'date' | 'time' | 'datetime' | 'textarea' | 'color';
  description: string;
  isRequired: boolean;
  isEditable: boolean;
  isVisible: boolean;
  defaultValue: string;
  options?: string[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
  tags: string[];
  group: string;
  order: number;
  lastModified: string;
  modifiedBy: string;
  version: number;
  isActive: boolean;
  isSystem: boolean;
  isEncrypted: boolean;
  isBackedUp: boolean;
  backupCount: number;
  accessCount: number;
  lastAccessed?: string;
  dependencies: string[];
  conflicts: string[];
  metadata: Record<string, any>;
}

export interface SettingsTemplate {
  id: number;
  name: string;
  description: string;
  category: string;
  settings: Partial<Setting>[];
  isDefault: boolean;
  version: string;
  tags: string[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface SettingsBackup {
  id: number;
  name: string;
  description: string;
  settings: Setting[];
  version: string;
  isEncrypted: boolean;
  createdAt: string;
  createdBy: string;
  size: number;
  checksum: string;
}

export interface SettingsAuditLog {
  id: number;
  settingId: string;
  action: 'create' | 'update' | 'delete' | 'view' | 'export' | 'import';
  oldValue?: string;
  newValue?: string;
  userName: string;
  userEmail: string;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
  metadata: Record<string, any>;
}

export interface SettingsFilters {
  search?: string;
  category?: string;
  type?: string;
  group?: string;
  tag?: string;
  status?: 'active' | 'inactive' | 'system' | 'user';
  required?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateSettingRequest {
  key: string;
  category: string;
  value: string;
  type: Setting['type'];
  description: string;
  isRequired?: boolean;
  isEditable?: boolean;
  isVisible?: boolean;
  defaultValue?: string;
  options?: string[];
  validation?: Setting['validation'];
  tags?: string[];
  group?: string;
  order?: number;
  dependencies?: string[];
  conflicts?: string[];
  metadata?: Record<string, unknown>;
}

export interface UpdateSettingRequest {
  key?: string;
  category?: string;
  value?: string;
  type?: Setting['type'];
  description?: string;
  isRequired?: boolean;
  isEditable?: boolean;
  isVisible?: boolean;
  defaultValue?: string;
  options?: string[];
  validation?: Setting['validation'];
  tags?: string[];
  group?: string;
  order?: number;
  dependencies?: string[];
  conflicts?: string[];
  metadata?: Record<string, unknown>;
}

export interface CreateTemplateRequest {
  name: string;
  description: string;
  category: string;
  settings: Partial<Setting>[];
  isDefault?: boolean;
  tags?: string[];
  isPublic?: boolean;
}

export interface CreateBackupRequest {
  name: string;
  description: string;
  isEncrypted?: boolean;
}