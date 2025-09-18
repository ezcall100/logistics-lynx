// ===== API CONFIGURATION =====
// Configuration for API endpoints and settings

export const API_CONFIG = {
  // Base API URL
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  
  // API Key for authentication
  API_KEY: process.env.REACT_APP_API_KEY || 'super-admin-key',
  
  // Request timeout (in milliseconds)
  TIMEOUT: 30000,
  
  // Retry configuration
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
  
  // Endpoints
  ENDPOINTS: {
    // Settings endpoints
    SETTINGS: '/settings',
    SETTINGS_BY_ID: (id: number) => `/settings/${id}`,
    SETTINGS_BULK_DELETE: '/settings/bulk-delete',
    SETTINGS_BULK_UPDATE: '/settings/bulk-update',
    SETTINGS_RESET_DEFAULTS: '/settings/reset-defaults',
    SETTINGS_EXPORT: '/settings/export',
    SETTINGS_IMPORT: '/settings/import',
    SETTINGS_VALIDATE: '/settings/validate',
    SETTINGS_DEPENDENCIES: (id: number) => `/settings/${id}/dependencies`,
    SETTINGS_STATS: '/settings/stats',
    
    // Templates endpoints
    TEMPLATES: '/settings/templates',
    TEMPLATES_BY_ID: (id: number) => `/settings/templates/${id}`,
    TEMPLATES_APPLY: (id: number) => `/settings/templates/${id}/apply`,
    
    // Backups endpoints
    BACKUPS: '/settings/backups',
    BACKUPS_BY_ID: (id: number) => `/settings/backups/${id}`,
    BACKUPS_RESTORE: (id: number) => `/settings/backups/${id}/restore`,
    BACKUPS_DOWNLOAD: (id: number) => `/settings/backups/${id}/download`,
    
    // Audit logs endpoints
    AUDIT_LOGS: '/settings/audit-logs',
    SETTING_AUDIT_LOGS: (id: number) => `/settings/${id}/audit-logs`,
    
    // Health check
    HEALTH: '/health',
  },
  
  // Default pagination
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  
  // Cache configuration
  CACHE_TTL: 5 * 60 * 1000, // 5 minutes
  
  // Real-time update interval
  REALTIME_INTERVAL: 10000, // 10 seconds
  
  // Auto-save interval
  AUTOSAVE_INTERVAL: 30000, // 30 seconds
};

// Environment-specific configurations
export const getApiConfig = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isProduction = process.env.NODE_ENV === 'production';
  
  return {
    ...API_CONFIG,
    // Override settings for different environments
    BASE_URL: isDevelopment 
      ? 'http://localhost:3001/api'
      : isProduction 
        ? 'https://api.transbotai.com/api'
        : API_CONFIG.BASE_URL,
    
    // Enable/disable features based on environment
    ENABLE_REALTIME: isDevelopment || isProduction,
    ENABLE_AUTOSAVE: isDevelopment || isProduction,
    ENABLE_CACHING: isProduction,
    
    // Debug settings
    DEBUG_MODE: isDevelopment,
    LOG_REQUESTS: isDevelopment,
    LOG_RESPONSES: isDevelopment,
  };
};

export default API_CONFIG;