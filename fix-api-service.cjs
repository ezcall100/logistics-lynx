const fs = require('fs');

console.log('🔧 Completely rewriting src/services/api.ts...');

const apiContent = `import { supabase } from '@/integrations/supabase/client';

// 🚀 MCP API Service - Complete Integration for All 88 Pages

// Types for all MCP pages
export interface User {
  id: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  created_at: string;
  last_login?: string;
  company_id?: string;
}

export interface SystemMetrics {
  uptime: number;
  cpu_usage: number;
  memory_usage: number;
  active_connections: number;
  response_time: number;
  status: 'healthy' | 'warning' | 'critical';
}

export interface SecurityAudit {
  id: string;
  type: 'login' | 'permission_change' | 'data_access' | 'system_change';
  user_id: string;
  action: string;
  timestamp: string;
  ip_address: string;
  success: boolean;
}

export interface Portal {
  id: string;
  name: string;
  domain: string;
  status: 'active' | 'inactive' | 'maintenance';
  users_count: number;
  created_at: string;
}

export interface MCPAgent {
  id: string;
  name: string;
  type: 'monitoring' | 'automation' | 'analytics' | 'security';
  status: 'active' | 'inactive' | 'error';
  last_activity: string;
  performance_score: number;
}

export interface AnalyticsReport {
  id: string;
  type: 'business' | 'user' | 'performance' | 'security' | 'financial';
  title: string;
  data: any;
  generated_at: string;
  status: 'completed' | 'processing' | 'failed';
}

// 🎯 Dashboard APIs
export const dashboardAPI = {
  // System Overview
  getSystemOverview: async () => {
    const { data, error } = await supabase
      .from('system_metrics')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1);
    
    if (error) throw error;
    return data?.[0] || null;
  },

  // Revenue Metrics
  getRevenueMetrics: async (period: string = 'month') => {
    const { data, error } = await supabase
      .from('revenue_metrics')
      .select('*')
      .eq('period', period)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  // System Alerts
  getSystemAlerts: async () => {
    const { data, error } = await supabase
      .from('system_alerts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);
    
    if (error) throw error;
    return data || [];
  }
};

// 👥 User Management APIs
export const userManagementAPI = {
  getUserRoles: async () => {
    const { data, error } = await supabase
      .from('user_roles')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getUserGroups: async () => {
    const { data, error } = await supabase
      .from('user_groups')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getAccessControl: async () => {
    const { data, error } = await supabase
      .from('access_control')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getUserAnalytics: async () => {
    const { data, error } = await supabase
      .from('user_analytics')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getBillingData: async () => {
    const { data, error } = await supabase
      .from('billing_data')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getSupportTickets: async () => {
    const { data, error } = await supabase
      .from('support_tickets')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getOnboardingData: async () => {
    const { data, error } = await supabase
      .from('onboarding_data')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }
};

// 🔧 System Administration APIs
export const systemAdminAPI = {
  getServerMetrics: async () => {
    const { data, error } = await supabase
      .from('server_metrics')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getDeployments: async () => {
    const { data, error } = await supabase
      .from('deployments')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getSystemConfig: async () => {
    const { data, error } = await supabase
      .from('system_config')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getBackupStatus: async () => {
    const { data, error } = await supabase
      .from('backup_status')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getSecuritySettings: async () => {
    const { data, error } = await supabase
      .from('security_settings')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getIntegrations: async () => {
    const { data, error } = await supabase
      .from('integrations')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getStorageMetrics: async () => {
    const { data, error } = await supabase
      .from('storage_metrics')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getEmailMetrics: async () => {
    const { data, error } = await supabase
      .from('email_metrics')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }
};

// 🔒 Security Center APIs
export const securityCenterAPI = {
  getAccessLogs: async () => {
    const { data, error } = await supabase
      .from('access_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);
    if (error) throw error;
    return data || [];
  },

  getDataProtection: async () => {
    const { data, error } = await supabase
      .from('data_protection')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getAPISecurity: async () => {
    const { data, error } = await supabase
      .from('api_security')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getUserPermissions: async () => {
    const { data, error } = await supabase
      .from('user_permissions')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getSecurityPolicies: async () => {
    const { data, error } = await supabase
      .from('security_policies')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getIncidents: async () => {
    const { data, error } = await supabase
      .from('security_incidents')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getComplianceData: async () => {
    const { data, error } = await supabase
      .from('compliance_data')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }
};

// 📊 System Monitoring APIs
export const systemMonitoringAPI = {
  getErrorLogs: async () => {
    const { data, error } = await supabase
      .from('error_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);
    if (error) throw error;
    return data || [];
  },

  getLogAnalytics: async () => {
    const { data, error } = await supabase
      .from('log_analytics')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getAlerts: async () => {
    const { data, error } = await supabase
      .from('system_alerts')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getUptimeData: async () => {
    const { data, error } = await supabase
      .from('uptime_data')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getResourceUsage: async () => {
    const { data, error } = await supabase
      .from('resource_usage')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getNetworkMetrics: async () => {
    const { data, error } = await supabase
      .from('network_metrics')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getHealthChecks: async () => {
    const { data, error } = await supabase
      .from('health_checks')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }
};

// 🏢 Portal Management APIs
export const portalManagementAPI = {
  getPortalUsers: async (portalId: string) => {
    const { data, error } = await supabase
      .from('portal_users')
      .select('*')
      .eq('portal_id', portalId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getPortalFeatures: async (portalId: string) => {
    const { data, error } = await supabase
      .from('portal_features')
      .select('*')
      .eq('portal_id', portalId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getPortalAnalytics: async (portalId: string) => {
    const { data, error } = await supabase
      .from('portal_analytics')
      .select('*')
      .eq('portal_id', portalId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getPortalBilling: async (portalId: string) => {
    const { data, error } = await supabase
      .from('portal_billing')
      .select('*')
      .eq('portal_id', portalId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getPortalSupport: async (portalId: string) => {
    const { data, error } = await supabase
      .from('portal_support')
      .select('*')
      .eq('portal_id', portalId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getPortalIntegrations: async (portalId: string) => {
    const { data, error } = await supabase
      .from('portal_integrations')
      .select('*')
      .eq('portal_id', portalId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getPortalBackups: async (portalId: string) => {
    const { data, error } = await supabase
      .from('portal_backups')
      .select('*')
      .eq('portal_id', portalId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getPortalSecurity: async (portalId: string) => {
    const { data, error } = await supabase
      .from('portal_security')
      .select('*')
      .eq('portal_id', portalId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getPortalCompliance: async (portalId: string) => {
    const { data, error } = await supabase
      .from('portal_compliance')
      .select('*')
      .eq('portal_id', portalId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getPortalDeployments: async (portalId: string) => {
    const { data, error } = await supabase
      .from('portal_deployments')
      .select('*')
      .eq('portal_id', portalId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }
};

// 📈 Analytics Reports APIs
export const analyticsReportsAPI = {
  getPerformanceReports: async () => {
    const { data, error } = await supabase
      .from('performance_reports')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getSecurityReports: async () => {
    const { data, error } = await supabase
      .from('security_reports')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getFinancialReports: async () => {
    const { data, error } = await supabase
      .from('financial_reports')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getOperationalReports: async () => {
    const { data, error } = await supabase
      .from('operational_reports')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getCustomReports: async () => {
    const { data, error } = await supabase
      .from('custom_reports')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getDataExports: async () => {
    const { data, error } = await supabase
      .from('data_exports')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getDashboardTemplates: async () => {
    const { data, error } = await supabase
      .from('dashboard_templates')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getScheduledReports: async () => {
    const { data, error } = await supabase
      .from('scheduled_reports')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }
};

// 🤖 MCP Control Center APIs
export const mcpControlCenterAPI = {
  getAIModels: async () => {
    const { data, error } = await supabase
      .from('ai_models')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getDataPipeline: async () => {
    const { data, error } = await supabase
      .from('data_pipeline')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getMachineLearning: async () => {
    const { data, error } = await supabase
      .from('machine_learning')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getAIAnalytics: async () => {
    const { data, error } = await supabase
      .from('ai_analytics')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getAutomationRules: async () => {
    const { data, error } = await supabase
      .from('automation_rules')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getAIIntegrations: async () => {
    const { data, error } = await supabase
      .from('ai_integrations')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getAIMonitoring: async () => {
    const { data, error } = await supabase
      .from('ai_monitoring')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getAICompliance: async () => {
    const { data, error } = await supabase
      .from('ai_compliance')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getAIDocumentation: async () => {
    const { data, error } = await supabase
      .from('ai_documentation')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getAISupport: async () => {
    const { data, error } = await supabase
      .from('ai_support')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }
};

// 💼 Business Operations APIs
export const businessOperationsAPI = {
  getBillingInvoices: async () => {
    const { data, error } = await supabase
      .from('billing_invoices')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getSupportManagement: async () => {
    const { data, error } = await supabase
      .from('support_management')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getDocumentation: async () => {
    const { data, error } = await supabase
      .from('documentation')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getMarketingTools: async () => {
    const { data, error } = await supabase
      .from('marketing_tools')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getPartners: async () => {
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getLegalCompliance: async () => {
    const { data, error } = await supabase
      .from('legal_compliance')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }
};

// 🛠️ Development & DevOps APIs
export const developmentDevOpsAPI = {
  getTestingSuite: async () => {
    const { data, error } = await supabase
      .from('testing_suite')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getEnvironments: async () => {
    const { data, error } = await supabase
      .from('environments')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getPerformanceTesting: async () => {
    const { data, error } = await supabase
      .from('performance_testing')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getSecurityTesting: async () => {
    const { data, error } = await supabase
      .from('security_testing')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getDevDocumentation: async () => {
    const { data, error } = await supabase
      .from('dev_documentation')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  getReleases: async () => {
    const { data, error } = await supabase
      .from('releases')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }
};

// 🚀 MCP APIs - Main Export
export const mcpAPIs = {
  dashboard: dashboardAPI,
  userManagement: userManagementAPI,
  systemAdmin: systemAdminAPI,
  securityCenter: securityCenterAPI,
  systemMonitoring: systemMonitoringAPI,
  portalManagement: portalManagementAPI,
  analyticsReports: analyticsReportsAPI,
  mcpControlCenter: mcpControlCenterAPI,
  businessOperations: businessOperationsAPI,
  developmentDevOps: developmentDevOpsAPI
};

export default mcpAPIs;
`;

fs.writeFileSync('src/services/api.ts', apiContent, 'utf8');
console.log('✅ Successfully rewrote src/services/api.ts');
