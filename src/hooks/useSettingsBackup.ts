import { useState, useCallback } from 'react';
import { settingsApi } from '../services/settingsApi';
import type {
  SettingsTemplate,
  SettingsBackup,
  SettingsAuditLog,
  CreateTemplateRequest
} from '../types/settings';

export const useSettingsBackup = () => {
  // Templates state
  const [templates, setTemplates] = useState<SettingsTemplate[]>([]);
  const [loadingTemplates, setLoadingTemplates] = useState(false);
  const [errorTemplates, setErrorTemplates] = useState<string | null>(null);
  const [isCreatingTemplate, setIsCreatingTemplate] = useState(false);
  const [isApplyingTemplate, setIsApplyingTemplate] = useState(false);

  // Backups state
  const [backups, setBackups] = useState<SettingsBackup[]>([]);
  const [loadingBackups, setLoadingBackups] = useState(false);
  const [errorBackups, setErrorBackups] = useState<string | null>(null);
  const [isCreatingBackup, setIsCreatingBackup] = useState(false);
  const [isRestoringBackup, setIsRestoringBackup] = useState(false);
  const [isDeletingBackup, setIsDeletingBackup] = useState(false);
  const [isDownloadingBackup, setIsDownloadingBackup] = useState(false);

  // Audit logs state
  const [auditLogs, setAuditLogs] = useState<SettingsAuditLog[]>([]);
  const [loadingAuditLogs, setLoadingAuditLogs] = useState(false);
  const [errorAuditLogs, setErrorAuditLogs] = useState<string | null>(null);

  // Templates functions
  const fetchTemplates = useCallback(async () => {
    try {
      setLoadingTemplates(true);
      setErrorTemplates(null);
      const response = await settingsApi.fetchTemplates();
      if (response.success) {
        setTemplates(response.data);
      }
    } catch (err) {
      setErrorTemplates(err instanceof Error ? err.message : 'Failed to fetch templates');
    } finally {
      setLoadingTemplates(false);
    }
  }, []);

  const createTemplate = useCallback(async (templateData: CreateTemplateRequest) => {
    try {
      setIsCreatingTemplate(true);
      setErrorTemplates(null);
      const response = await settingsApi.createTemplate(templateData);
      if (response.success) {
        setTemplates(prev => [response.data, ...prev]);
      }
      return response.success ? response.data : null;
    } catch (err) {
      setErrorTemplates(err instanceof Error ? err.message : 'Failed to create template');
      return null;
    } finally {
      setIsCreatingTemplate(false);
    }
  }, []);

  const applyTemplate = useCallback(async (templateId: number) => {
    try {
      setIsApplyingTemplate(true);
      setErrorTemplates(null);
      const response = await settingsApi.applyTemplate(templateId);
      return response.success;
    } catch (err) {
      setErrorTemplates(err instanceof Error ? err.message : 'Failed to apply template');
      return false;
    } finally {
      setIsApplyingTemplate(false);
    }
  }, []);

  // Backups functions
  const fetchBackups = useCallback(async () => {
    try {
      setLoadingBackups(true);
      setErrorBackups(null);
      const response = await settingsApi.fetchBackups();
      if (response.success) {
        setBackups(response.data);
      }
    } catch (err) {
      setErrorBackups(err instanceof Error ? err.message : 'Failed to fetch backups');
    } finally {
      setLoadingBackups(false);
    }
  }, []);

  const createBackup = useCallback(async (backupData: Partial<SettingsBackup>) => {
    try {
      setIsCreatingBackup(true);
      setErrorBackups(null);
      const response = await settingsApi.createBackup(
        backupData.name || 'Backup',
        backupData.description || 'Settings backup'
      );
      if (response.success) {
        setBackups(prev => [response.data, ...prev]);
      }
      return response.success ? response.data : null;
    } catch (err) {
      setErrorBackups(err instanceof Error ? err.message : 'Failed to create backup');
      return null;
    } finally {
      setIsCreatingBackup(false);
    }
  }, []);

  const restoreBackup = useCallback(async (backupId: number) => {
    try {
      setIsRestoringBackup(true);
      setErrorBackups(null);
      const response = await settingsApi.restoreBackup(backupId);
      return response.success;
    } catch (err) {
      setErrorBackups(err instanceof Error ? err.message : 'Failed to restore backup');
      return false;
    } finally {
      setIsRestoringBackup(false);
    }
  }, []);

  const deleteBackup = useCallback(async (backupId: number) => {
    try {
      setIsDeletingBackup(true);
      setErrorBackups(null);
      const response = await settingsApi.deleteBackup(backupId);
      if (!response.success) {
        throw new Error(response.error || 'Failed to delete backup');
      }
      setBackups(prev => prev.filter(b => b.id !== backupId));
      return true;
    } catch (err) {
      setErrorBackups(err instanceof Error ? err.message : 'Failed to delete backup');
      return false;
    } finally {
      setIsDeletingBackup(false);
    }
  }, []);

  const downloadBackup = useCallback(async (backupId: number) => {
    try {
      setIsDownloadingBackup(true);
      setErrorBackups(null);
      const response = await settingsApi.downloadBackup(backupId);
      return response;
    } catch (err) {
      setErrorBackups(err instanceof Error ? err.message : 'Failed to download backup');
      return null;
    } finally {
      setIsDownloadingBackup(false);
    }
  }, []);

  // Audit logs functions
  const fetchAuditLogs = useCallback(async (filters?: any) => {
    try {
      setLoadingAuditLogs(true);
      setErrorAuditLogs(null);
      const response = await settingsApi.fetchAuditLogs(filters);
      if (response.success) {
        setAuditLogs(response.data.data);
      }
    } catch (err) {
      setErrorAuditLogs(err instanceof Error ? err.message : 'Failed to fetch audit logs');
    } finally {
      setLoadingAuditLogs(false);
    }
  }, []);

  return {
    // Templates
    templates,
    loadingTemplates,
    errorTemplates,
    fetchTemplates,
    createTemplate,
    applyTemplate,
    isCreatingTemplate,
    isApplyingTemplate,

    // Backups
    backups,
    loadingBackups,
    errorBackups,
    fetchBackups,
    createBackup,
    restoreBackup,
    deleteBackup,
    downloadBackup,
    isCreatingBackup,
    isRestoringBackup,
    isDeletingBackup,
    isDownloadingBackup,

    // Audit logs
    auditLogs,
    loadingAuditLogs,
    errorAuditLogs,
    fetchAuditLogs
  };
};