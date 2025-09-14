// ===== SETTINGS API SERVICE =====
// Complete API integration for Settings Management

import {
  Setting,
  SettingsTemplate,
  SettingsBackup,
  SettingsAuditLog,
  SettingsFilters,
  ApiResponse,
  PaginatedResponse,
  CreateSettingRequest,
  UpdateSettingRequest,
  CreateTemplateRequest,
  CreateBackupRequest
} from '../types/settings';

class SettingsApiService {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
    this.apiKey = process.env.REACT_APP_API_KEY || 'your-super-secret-api-key';
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
      'X-API-Key': this.apiKey,
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          data: data as T,
          error: data.message || `HTTP ${response.status}: ${response.statusText}`,
        };
      }

      return {
        success: true,
        data: data as T,
        message: data.message,
      };
    } catch (error) {
      return {
        success: false,
        data: {} as T,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  // Settings CRUD operations
  async fetchSettings(filters: SettingsFilters = {}): Promise<ApiResponse<PaginatedResponse<Setting>>> {
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value.toString());
      }
    });

    const endpoint = `/settings${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.makeRequest<PaginatedResponse<Setting>>(endpoint);
  }

  async getSetting(id: string): Promise<ApiResponse<Setting>> {
    return this.makeRequest<Setting>(`/settings/${id}`);
  }

  async createSetting(settingData: CreateSettingRequest): Promise<ApiResponse<Setting>> {
    return this.makeRequest<Setting>('/settings', {
      method: 'POST',
      body: JSON.stringify(settingData),
    });
  }

  async updateSetting(id: number, settingData: UpdateSettingRequest): Promise<ApiResponse<Setting>> {
    return this.makeRequest<Setting>(`/settings/${id}`, {
      method: 'PUT',
      body: JSON.stringify(settingData),
    });
  }

  async deleteSetting(id: number): Promise<ApiResponse<void>> {
    return this.makeRequest<void>(`/settings/${id}`, {
      method: 'DELETE',
    });
  }

  async bulkUpdateSettings(updates: { id: number; updates: UpdateSettingRequest }[]): Promise<ApiResponse<Setting[]>> {
    return this.makeRequest<Setting[]>('/settings/bulk-update', {
      method: 'PUT',
      body: JSON.stringify({ updates }),
    });
  }

  async bulkDeleteSettings(ids: number[]): Promise<ApiResponse<void>> {
    return this.makeRequest<void>('/settings/bulk-delete', {
      method: 'DELETE',
      body: JSON.stringify({ ids }),
    });
  }

  async resetSettingsToDefault(ids: number[]): Promise<ApiResponse<Setting[]>> {
    return this.makeRequest<Setting[]>('/settings/reset-defaults', {
      method: 'POST',
      body: JSON.stringify({ ids }),
    });
  }

  // Templates
  async fetchTemplates(): Promise<ApiResponse<SettingsTemplate[]>> {
    return this.makeRequest<SettingsTemplate[]>('/settings/templates');
  }

  async getTemplate(id: number): Promise<ApiResponse<SettingsTemplate>> {
    return this.makeRequest<SettingsTemplate>(`/settings/templates/${id}`);
  }

  async createTemplate(templateData: CreateTemplateRequest): Promise<ApiResponse<SettingsTemplate>> {
    return this.makeRequest<SettingsTemplate>('/settings/templates', {
      method: 'POST',
      body: JSON.stringify(templateData),
    });
  }

  async updateTemplate(id: number, templateData: Partial<CreateTemplateRequest>): Promise<ApiResponse<SettingsTemplate>> {
    return this.makeRequest<SettingsTemplate>(`/settings/templates/${id}`, {
      method: 'PUT',
      body: JSON.stringify(templateData),
    });
  }

  async deleteTemplate(id: number): Promise<ApiResponse<void>> {
    return this.makeRequest<void>(`/settings/templates/${id}`, {
      method: 'DELETE',
    });
  }

  async applyTemplate(templateId: number): Promise<ApiResponse<Setting[]>> {
    return this.makeRequest<Setting[]>(`/settings/templates/${templateId}/apply`, {
      method: 'POST',
    });
  }

  // Backups
  async fetchBackups(): Promise<ApiResponse<SettingsBackup[]>> {
    return this.makeRequest<SettingsBackup[]>('/settings/backups');
  }

  async getBackup(id: number): Promise<ApiResponse<SettingsBackup>> {
    return this.makeRequest<SettingsBackup>(`/settings/backups/${id}`);
  }

  async createBackup(name: string, description: string): Promise<ApiResponse<SettingsBackup>> {
    return this.makeRequest<SettingsBackup>('/settings/backups', {
      method: 'POST',
      body: JSON.stringify({ name, description }),
    });
  }

  async restoreBackup(backupId: number): Promise<ApiResponse<Setting[]>> {
    return this.makeRequest<Setting[]>(`/settings/backups/${backupId}/restore`, {
      method: 'POST',
    });
  }

  async deleteBackup(id: number): Promise<ApiResponse<void>> {
    return this.makeRequest<void>(`/settings/backups/${id}`, {
      method: 'DELETE',
    });
  }

  async downloadBackup(id: number): Promise<Blob> {
    const url = `${this.baseUrl}/settings/backups/${id}/download`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'X-API-Key': this.apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to download backup: ${response.statusText}`);
    }

    return response.blob();
  }

  // Audit Logs
  async fetchAuditLogs(filters: SettingsFilters = {}): Promise<ApiResponse<PaginatedResponse<SettingsAuditLog>>> {
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value.toString());
      }
    });

    const endpoint = `/settings/audit-logs${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.makeRequest<PaginatedResponse<SettingsAuditLog>>(endpoint);
  }

  // Export/Import
  async exportSettings(format: 'json' | 'csv' | 'xml' = 'json', ids?: string[]): Promise<Blob> {
    const queryParams = new URLSearchParams();
    queryParams.append('format', format);
    
    if (ids && ids.length > 0) {
      queryParams.append('ids', ids.join(','));
    }

    const url = `${this.baseUrl}/settings/export?${queryParams.toString()}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'X-API-Key': this.apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to export settings: ${response.statusText}`);
    }

    return response.blob();
  }

  async importSettings(file: File, format: 'json' | 'csv' | 'xml' = 'json'): Promise<ApiResponse<Setting[]>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('format', format);

    const url = `${this.baseUrl}/settings/import`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'X-API-Key': this.apiKey,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        data: data as Setting[],
        error: data.message || `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    return {
      success: true,
      data: data as Setting[],
      message: data.message,
    };
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<{ status: string; timestamp: string }>> {
    return this.makeRequest<{ status: string; timestamp: string }>('/settings/health');
  }
}

// Export the service instance
export const settingsApi = new SettingsApiService();

// Export types for use in other files
export type {
  Setting,
  SettingsTemplate,
  SettingsBackup,
  SettingsAuditLog,
  SettingsFilters,
  ApiResponse,
  PaginatedResponse,
  CreateSettingRequest,
  UpdateSettingRequest,
  CreateTemplateRequest,
  CreateBackupRequest
};