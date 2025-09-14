import { useState, useEffect, useCallback } from 'react';
import { settingsApi } from '../services/settingsApi';
import {
  Setting,
  SettingsFilters,
  CreateSettingRequest,
  UpdateSettingRequest
} from '../types/settings';

export interface UseSettingsOptions {
  autoFetch?: boolean;
  initialFilters?: SettingsFilters;
  refreshInterval?: number;
}

export const useSettings = (options: UseSettingsOptions = {}) => {
  const {
    autoFetch = true,
    initialFilters = {},
    refreshInterval = 30000
  } = options;

  // State
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Filters and pagination
  const [filters, setFilters] = useState<SettingsFilters>({
    page: 1,
    limit: 10,
    ...initialFilters
  });
  
  const [sortBy, setSortBy] = useState<string>('key');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
  // Selection and view
  const [selectedSettings, setSelectedSettings] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  
  // Real-time updates
  const [isRealTime, setIsRealTime] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  // Loading states for operations
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  // Fetch settings
  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await settingsApi.fetchSettings(filters);
      
      if (response.success) {
        setSettings(response.data.data);
        setTotalCount(response.data.total);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.page);
        setLastUpdated(new Date().toISOString());
      } else {
        setError(response.error || 'Failed to fetch settings');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch settings');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // CRUD operations
  const createSetting = useCallback(async (settingData: Partial<Setting>) => {
    try {
      setIsCreating(true);
      setError(null);
      
      // Ensure required fields are present
      const createData: CreateSettingRequest = {
        key: settingData.key || '',
        category: settingData.category || 'General',
        value: settingData.value || '',
        type: settingData.type || 'text',
        description: settingData.description || '',
        isRequired: settingData.isRequired || false,
        isEditable: settingData.isEditable !== undefined ? settingData.isEditable : true,
        isVisible: settingData.isVisible !== undefined ? settingData.isVisible : true,
        defaultValue: settingData.defaultValue || '',
        options: settingData.options || [],
        validation: settingData.validation || {},
        tags: settingData.tags || [],
        group: settingData.group || 'General',
        order: settingData.order || 0,
        dependencies: settingData.dependencies || [],
        conflicts: settingData.conflicts || [],
        metadata: settingData.metadata || {}
      };
      
      const response = await settingsApi.createSetting(createData);
      
      if (response.success) {
        setSettings(prev => [response.data, ...prev]);
        setTotalCount(prev => prev + 1);
        setLastUpdated(new Date().toISOString());
      } else {
        setError(response.error || 'Failed to create setting');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create setting');
    } finally {
      setIsCreating(false);
    }
  }, []);

  const updateSetting = useCallback(async (id: number, settingData: Partial<Setting>) => {
    try {
      setIsUpdating(true);
      setError(null);
      
      const updateData: UpdateSettingRequest = {
        key: settingData.key,
        category: settingData.category,
        value: settingData.value,
        type: settingData.type,
        description: settingData.description,
        isRequired: settingData.isRequired,
        isEditable: settingData.isEditable,
        isVisible: settingData.isVisible,
        defaultValue: settingData.defaultValue,
        options: settingData.options,
        validation: settingData.validation,
        tags: settingData.tags,
        group: settingData.group,
        order: settingData.order,
        dependencies: settingData.dependencies,
        conflicts: settingData.conflicts,
        metadata: settingData.metadata
      };
      
      const response = await settingsApi.updateSetting(id, updateData);
      
      if (response.success) {
        setSettings(prev => prev.map(setting => 
          setting.id === id ? response.data : setting
        ));
        setLastUpdated(new Date().toISOString());
      } else {
        setError(response.error || 'Failed to update setting');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update setting');
    } finally {
      setIsUpdating(false);
    }
  }, []);

  const deleteSetting = useCallback(async (id: number) => {
    try {
      setIsDeleting(true);
      setError(null);
      
      const response = await settingsApi.deleteSetting(id);
      
      if (response.success) {
        setSettings(prev => prev.filter(setting => setting.id !== id));
        setTotalCount(prev => prev - 1);
        setLastUpdated(new Date().toISOString());
      } else {
        setError(response.error || 'Failed to delete setting');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete setting');
    } finally {
      setIsDeleting(false);
    }
  }, []);

  const bulkUpdateSettings = useCallback(async (ids: number[], updates: Partial<Setting>) => {
    try {
      setIsUpdating(true);
      setError(null);
      
      const updateData = ids.map(id => ({
        id: id,
        updates: updates as UpdateSettingRequest
      }));
      
      const response = await settingsApi.bulkUpdateSettings(updateData);
      
      if (response.success) {
        // Update the settings in state
        setSettings(prev => prev.map(setting => {
          const updated = response.data.find(updated => updated.id === setting.id);
          return updated || setting;
        }));
        setLastUpdated(new Date().toISOString());
      } else {
        setError(response.error || 'Failed to bulk update settings');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to bulk update settings');
    } finally {
      setIsUpdating(false);
    }
  }, []);

  const bulkDeleteSettings = useCallback(async (ids: number[]) => {
    try {
      setIsDeleting(true);
      setError(null);
      
      const response = await settingsApi.bulkDeleteSettings(ids);
      
      if (response.success) {
        setSettings(prev => prev.filter(setting => !ids.includes(setting.id)));
        setTotalCount(prev => prev - ids.length);
        setSelectedSettings([]);
        setLastUpdated(new Date().toISOString());
      } else {
        setError(response.error || 'Failed to bulk delete settings');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to bulk delete settings');
    } finally {
      setIsDeleting(false);
    }
  }, []);

  const resetSettingsToDefault = useCallback(async (ids: number[]) => {
    try {
      setIsUpdating(true);
      setError(null);
      
      const response = await settingsApi.resetSettingsToDefault(ids);
      
      if (response.success) {
        // Update the settings in state
        setSettings(prev => prev.map(setting => {
          const reset = response.data.find(reset => reset.id === setting.id);
          return reset || setting;
        }));
        setLastUpdated(new Date().toISOString());
      } else {
        setError(response.error || 'Failed to reset settings to default');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to reset settings to default');
    } finally {
      setIsUpdating(false);
    }
  }, []);

  const applyTemplate = useCallback(async (templateId: number) => {
    try {
      setIsUpdating(true);
      setError(null);
      
      const response = await settingsApi.applyTemplate(templateId);
      
      if (response.success) {
        // Refresh settings after applying template
        await fetchSettings();
      } else {
        setError(response.error || 'Failed to apply template');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to apply template');
    } finally {
      setIsUpdating(false);
    }
  }, [fetchSettings]);

  const restoreBackup = useCallback(async (backupId: number) => {
    try {
      setIsUpdating(true);
      setError(null);
      
      const response = await settingsApi.restoreBackup(backupId);
      
      if (response.success) {
        // Refresh settings after restoring backup
        await fetchSettings();
      } else {
        setError(response.error || 'Failed to restore backup');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to restore backup');
    } finally {
      setIsUpdating(false);
    }
  }, [fetchSettings]);

  const exportSettings = useCallback(async (format: 'json' | 'csv' | 'xml' = 'json', ids?: number[]) => {
    try {
      setIsExporting(true);
      setError(null);
      
      const blob = await settingsApi.exportSettings(format, ids?.map(id => id.toString()));
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `settings-export-${new Date().toISOString().split('T')[0]}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to export settings');
    } finally {
      setIsExporting(false);
    }
  }, []);

  const importSettings = useCallback(async (file: File, format: 'json' | 'csv' | 'xml' = 'json') => {
    try {
      setIsImporting(true);
      setError(null);
      
      const response = await settingsApi.importSettings(file, format);
      
      if (response.success) {
        // Refresh settings after import
        await fetchSettings();
      } else {
        setError(response.error || 'Failed to import settings');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to import settings');
    } finally {
      setIsImporting(false);
    }
  }, [fetchSettings]);

  // Auto-fetch on mount and when filters change
  useEffect(() => {
    if (autoFetch) {
      fetchSettings();
    }
  }, [autoFetch, fetchSettings]);

  // Real-time updates
  useEffect(() => {
    if (isRealTime && refreshInterval > 0) {
      const interval = setInterval(() => {
        fetchSettings();
      }, refreshInterval);

      return () => clearInterval(interval);
    }
  }, [isRealTime, refreshInterval, fetchSettings]);

  return {
    // Data
    settings,
    loading,
    error,
    
    // Filters and pagination
    filters,
    setFilters,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    currentPage,
    setCurrentPage,
    limit,
    setLimit,
    totalCount,
    totalPages,
    
    // Selection and view
    selectedSettings,
    setSelectedSettings,
    viewMode,
    setViewMode,
    
    // Real-time updates
    isRealTime,
    setIsRealTime,
    lastUpdated,
    setLastUpdated,
    
    // Operations
    fetchSettings,
    createSetting,
    updateSetting,
    deleteSetting,
    bulkUpdateSettings,
    bulkDeleteSettings,
    resetSettingsToDefault,
    applyTemplate,
    restoreBackup,
    exportSettings,
    importSettings,
    
    // Loading states
    isCreating,
    isUpdating,
    isDeleting,
    isExporting,
    isImporting
  };
};