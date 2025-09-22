import { supabase } from './supabase';

// Types for Super Admin Service
export interface SuperAdminUser {
  id: number;
  uuid: string;
  auth_user_id?: string;
  company_id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  phone?: string;
  department?: string;
  title?: string;
  permissions: string[];
  two_factor_enabled: boolean;
  password_last_changed: string;
  login_attempts: number;
  last_failed_login?: string;
  last_login?: string;
  avatar_url?: string;
  timezone: string;
  language: string;
  created_at: string;
  updated_at: string;
}

export interface Company {
  id: number;
  uuid: string;
  name: string;
  domain: string;
  plan: string;
  status: string;
  max_users: number;
  storage_limit: number;
  api_calls_limit: number;
  custom_branding: boolean;
  sso_enabled: boolean;
  audit_logs: boolean;
  contact_email: string;
  contact_phone?: string;
  contact_address?: string;
  billing_email?: string;
  billing_address?: string;
  created_at: string;
  updated_at: string;
}

export interface PortalConfig {
  id: number;
  uuid: string;
  company_id: number;
  portal_type: string;
  name: string;
  description?: string;
  is_active: boolean;
  config: any;
  theme_config: any;
  header_config: any;
  sidebar_config: any;
  dashboard_config: any;
  permissions: any;
  created_by?: number;
  created_at: string;
  updated_at: string;
}

export interface AIAgent {
  id: number;
  uuid: string;
  company_id: number;
  name: string;
  description?: string;
  agent_type: string;
  status: string;
  config: any;
  model_config: any;
  training_data: any;
  performance_metrics: any;
  permissions: any;
  created_by?: number;
  last_trained?: string;
  last_deployed?: string;
  created_at: string;
  updated_at: string;
}

export interface SystemMetric {
  id: number;
  timestamp: string;
  metric_type: string;
  metric_name: string;
  metric_value: number;
  metric_unit?: string;
  tags: any;
  created_at: string;
}

export interface SystemAlert {
  id: number;
  uuid: string;
  alert_type: string;
  severity: string;
  title: string;
  description?: string;
  status: string;
  source?: string;
  metadata: any;
  assigned_to?: number;
  resolved_at?: string;
  resolved_by?: number;
  created_at: string;
  updated_at: string;
}

export interface SecurityEvent {
  id: number;
  uuid: string;
  event_type: string;
  severity: string;
  description: string;
  ip_address?: string;
  user_agent?: string;
  user_id?: number;
  company_id?: number;
  metadata: any;
  created_at: string;
}

export interface SupportTicket {
  id: number;
  uuid: string;
  company_id: number;
  user_id?: number;
  title: string;
  description: string;
  category?: string;
  status: string;
  priority: string;
  assigned_to?: number;
  metadata: any;
  resolved_at?: string;
  resolved_by?: number;
  created_at: string;
  updated_at: string;
}

export interface APIKey {
  id: number;
  uuid: string;
  company_id: number;
  name: string;
  key_hash: string;
  permissions: string[];
  rate_limit: number;
  expires_at?: string;
  last_used?: string;
  is_active: boolean;
  created_by?: number;
  created_at: string;
  updated_at: string;
}

export interface CRMContact {
  id: number;
  uuid: string;
  company_id: number;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  title?: string;
  department?: string;
  lead_source?: string;
  status: string;
  notes?: string;
  metadata: any;
  assigned_to?: number;
  created_by?: number;
  created_at: string;
  updated_at: string;
}

export interface AuditLog {
  id: number;
  uuid: string;
  user_id?: number;
  company_id?: number;
  action: string;
  resource_type: string;
  resource_id?: string;
  old_values?: any;
  new_values?: any;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

export interface SystemHealth {
  total_companies: number;
  total_users: number;
  active_users: number;
  total_ai_agents: number;
  active_ai_agents: number;
  open_tickets: number;
  critical_alerts: number;
  system_uptime: number;
  last_updated: string;
}

// Super Admin Service Class
export class SuperAdminService {
  // User Management
  static async getAllUsers(page = 1, limit = 50, filters: any = {}): Promise<{ data: SuperAdminUser[], total: number }> {
    try {
      let query = supabase
        .from('users')
        .select('*', { count: 'exact' })
        .range((page - 1) * limit, page * limit - 1)
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters.search) {
        query = query.textSearch('name,email', filters.search);
      }
      if (filters.role) {
        query = query.eq('role', filters.role);
      }
      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      if (filters.company_id) {
        query = query.eq('company_id', filters.company_id);
      }

      const { data, error, count } = await query;
      if (error) throw error;

      return { data: data || [], total: count || 0 };
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  static async getUserById(id: number): Promise<SuperAdminUser | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  static async createUser(userData: Partial<SuperAdminUser>): Promise<SuperAdminUser> {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert(userData)
        .select()
        .single();

      if (error) throw error;

      // Create audit log
      await this.createAuditLog({
        action: 'CREATE',
        resource_type: 'user',
        resource_id: data.id.toString(),
        new_values: data
      });

      return data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  static async updateUser(id: number, updates: Partial<SuperAdminUser>): Promise<SuperAdminUser> {
    try {
      // Get old values for audit log
      const oldData = await this.getUserById(id);
      
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      // Create audit log
      await this.createAuditLog({
        action: 'UPDATE',
        resource_type: 'user',
        resource_id: id.toString(),
        old_values: oldData,
        new_values: data
      });

      return data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  static async deleteUser(id: number): Promise<void> {
    try {
      // Get old values for audit log
      const oldData = await this.getUserById(id);

      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Create audit log
      await this.createAuditLog({
        action: 'DELETE',
        resource_type: 'user',
        resource_id: id.toString(),
        old_values: oldData
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  // Company Management
  static async getAllCompanies(page = 1, limit = 50, filters: any = {}): Promise<{ data: Company[], total: number }> {
    try {
      let query = supabase
        .from('companies')
        .select('*', { count: 'exact' })
        .range((page - 1) * limit, page * limit - 1)
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters.search) {
        query = query.textSearch('name,domain', filters.search);
      }
      if (filters.plan) {
        query = query.eq('plan', filters.plan);
      }
      if (filters.status) {
        query = query.eq('status', filters.status);
      }

      const { data, error, count } = await query;
      if (error) throw error;

      return { data: data || [], total: count || 0 };
    } catch (error) {
      console.error('Error fetching companies:', error);
      throw error;
    }
  }

  static async getCompanyById(id: number): Promise<Company | null> {
    try {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching company:', error);
      return null;
    }
  }

  static async updateCompany(id: number, updates: Partial<Company>): Promise<Company> {
    try {
      // Get old values for audit log
      const oldData = await this.getCompanyById(id);

      const { data, error } = await supabase
        .from('companies')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      // Create audit log
      await this.createAuditLog({
        action: 'UPDATE',
        resource_type: 'company',
        resource_id: id.toString(),
        old_values: oldData,
        new_values: data
      });

      return data;
    } catch (error) {
      console.error('Error updating company:', error);
      throw error;
    }
  }

  // AI Agents Management
  static async getAllAIAgents(page = 1, limit = 50, filters: any = {}): Promise<{ data: AIAgent[], total: number }> {
    try {
      let query = supabase
        .from('ai_agents')
        .select('*', { count: 'exact' })
        .range((page - 1) * limit, page * limit - 1)
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters.search) {
        query = query.textSearch('name,description', filters.search);
      }
      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      if (filters.agent_type) {
        query = query.eq('agent_type', filters.agent_type);
      }
      if (filters.company_id) {
        query = query.eq('company_id', filters.company_id);
      }

      const { data, error, count } = await query;
      if (error) throw error;

      return { data: data || [], total: count || 0 };
    } catch (error) {
      console.error('Error fetching AI agents:', error);
      throw error;
    }
  }

  static async createAIAgent(agentData: Partial<AIAgent>): Promise<AIAgent> {
    try {
      const { data, error } = await supabase
        .from('ai_agents')
        .insert(agentData)
        .select()
        .single();

      if (error) throw error;

      // Create audit log
      await this.createAuditLog({
        action: 'CREATE',
        resource_type: 'ai_agent',
        resource_id: data.id.toString(),
        new_values: data
      });

      return data;
    } catch (error) {
      console.error('Error creating AI agent:', error);
      throw error;
    }
  }

  static async updateAIAgent(id: number, updates: Partial<AIAgent>): Promise<AIAgent> {
    try {
      // Get old values for audit log
      const { data: oldData, error: oldError } = await supabase
        .from('ai_agents')
        .select('*')
        .eq('id', id)
        .single();

      const { data, error } = await supabase
        .from('ai_agents')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      // Create audit log
      await this.createAuditLog({
        action: 'UPDATE',
        resource_type: 'ai_agent',
        resource_id: id.toString(),
        old_values: oldData,
        new_values: data
      });

      return data;
    } catch (error) {
      console.error('Error updating AI agent:', error);
      throw error;
    }
  }

  // System Health & Monitoring
  static async getSystemHealth(): Promise<SystemHealth> {
    try {
      const { data, error } = await supabase.rpc('get_system_health');
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching system health:', error);
      throw error;
    }
  }

  static async getSystemMetrics(
    metricType?: string,
    startDate?: string,
    endDate?: string,
    limit = 1000
  ): Promise<SystemMetric[]> {
    try {
      let query = supabase
        .from('system_metrics')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(limit);

      if (metricType) {
        query = query.eq('metric_type', metricType);
      }
      if (startDate) {
        query = query.gte('timestamp', startDate);
      }
      if (endDate) {
        query = query.lte('timestamp', endDate);
      }

      const { data, error } = await query;
      if (error) throw error;

      return data || [];
    } catch (error) {
      console.error('Error fetching system metrics:', error);
      throw error;
    }
  }

  static async getSystemAlerts(
    page = 1,
    limit = 50,
    filters: any = {}
  ): Promise<{ data: SystemAlert[], total: number }> {
    try {
      let query = supabase
        .from('system_alerts')
        .select('*', { count: 'exact' })
        .range((page - 1) * limit, page * limit - 1)
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters.severity) {
        query = query.eq('severity', filters.severity);
      }
      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      if (filters.alert_type) {
        query = query.eq('alert_type', filters.alert_type);
      }

      const { data, error, count } = await query;
      if (error) throw error;

      return { data: data || [], total: count || 0 };
    } catch (error) {
      console.error('Error fetching system alerts:', error);
      throw error;
    }
  }

  static async updateAlert(id: number, updates: Partial<SystemAlert>): Promise<SystemAlert> {
    try {
      const { data, error } = await supabase
        .from('system_alerts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      // Create audit log
      await this.createAuditLog({
        action: 'UPDATE',
        resource_type: 'system_alert',
        resource_id: id.toString(),
        new_values: updates
      });

      return data;
    } catch (error) {
      console.error('Error updating alert:', error);
      throw error;
    }
  }

  // Security Events
  static async getSecurityEvents(
    page = 1,
    limit = 50,
    filters: any = {}
  ): Promise<{ data: SecurityEvent[], total: number }> {
    try {
      let query = supabase
        .from('security_events')
        .select('*', { count: 'exact' })
        .range((page - 1) * limit, page * limit - 1)
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters.event_type) {
        query = query.eq('event_type', filters.event_type);
      }
      if (filters.severity) {
        query = query.eq('severity', filters.severity);
      }
      if (filters.user_id) {
        query = query.eq('user_id', filters.user_id);
      }
      if (filters.company_id) {
        query = query.eq('company_id', filters.company_id);
      }

      const { data, error, count } = await query;
      if (error) throw error;

      return { data: data || [], total: count || 0 };
    } catch (error) {
      console.error('Error fetching security events:', error);
      throw error;
    }
  }

  // Support Tickets
  static async getAllTickets(
    page = 1,
    limit = 50,
    filters: any = {}
  ): Promise<{ data: SupportTicket[], total: number }> {
    try {
      let query = supabase
        .from('support_tickets')
        .select('*', { count: 'exact' })
        .range((page - 1) * limit, page * limit - 1)
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters.search) {
        query = query.textSearch('title,description', filters.search);
      }
      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      if (filters.priority) {
        query = query.eq('priority', filters.priority);
      }
      if (filters.category) {
        query = query.eq('category', filters.category);
      }
      if (filters.assigned_to) {
        query = query.eq('assigned_to', filters.assigned_to);
      }

      const { data, error, count } = await query;
      if (error) throw error;

      return { data: data || [], total: count || 0 };
    } catch (error) {
      console.error('Error fetching tickets:', error);
      throw error;
    }
  }

  static async updateTicket(id: number, updates: Partial<SupportTicket>): Promise<SupportTicket> {
    try {
      const { data, error } = await supabase
        .from('support_tickets')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      // Create audit log
      await this.createAuditLog({
        action: 'UPDATE',
        resource_type: 'support_ticket',
        resource_id: id.toString(),
        new_values: updates
      });

      return data;
    } catch (error) {
      console.error('Error updating ticket:', error);
      throw error;
    }
  }

  // API Keys Management
  static async getAllAPIKeys(
    page = 1,
    limit = 50,
    filters: any = {}
  ): Promise<{ data: APIKey[], total: number }> {
    try {
      let query = supabase
        .from('api_keys')
        .select('*', { count: 'exact' })
        .range((page - 1) * limit, page * limit - 1)
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters.company_id) {
        query = query.eq('company_id', filters.company_id);
      }
      if (filters.is_active !== undefined) {
        query = query.eq('is_active', filters.is_active);
      }

      const { data, error, count } = await query;
      if (error) throw error;

      return { data: data || [], total: count || 0 };
    } catch (error) {
      console.error('Error fetching API keys:', error);
      throw error;
    }
  }

  static async createAPIKey(keyData: Partial<APIKey>): Promise<APIKey> {
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .insert(keyData)
        .select()
        .single();

      if (error) throw error;

      // Create audit log
      await this.createAuditLog({
        action: 'CREATE',
        resource_type: 'api_key',
        resource_id: data.id.toString(),
        new_values: { ...data, key_hash: '[HIDDEN]' }
      });

      return data;
    } catch (error) {
      console.error('Error creating API key:', error);
      throw error;
    }
  }

  static async revokeAPIKey(id: number): Promise<void> {
    try {
      const { error } = await supabase
        .from('api_keys')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;

      // Create audit log
      await this.createAuditLog({
        action: 'REVOKE',
        resource_type: 'api_key',
        resource_id: id.toString()
      });
    } catch (error) {
      console.error('Error revoking API key:', error);
      throw error;
    }
  }

  // CRM Management
  static async getAllContacts(
    page = 1,
    limit = 50,
    filters: any = {}
  ): Promise<{ data: CRMContact[], total: number }> {
    try {
      let query = supabase
        .from('crm_contacts')
        .select('*', { count: 'exact' })
        .range((page - 1) * limit, page * limit - 1)
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters.search) {
        query = query.textSearch('name,email,company', filters.search);
      }
      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      if (filters.company_id) {
        query = query.eq('company_id', filters.company_id);
      }
      if (filters.assigned_to) {
        query = query.eq('assigned_to', filters.assigned_to);
      }

      const { data, error, count } = await query;
      if (error) throw error;

      return { data: data || [], total: count || 0 };
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  }

  // Audit Logs
  static async getAuditLogs(
    page = 1,
    limit = 50,
    filters: any = {}
  ): Promise<{ data: AuditLog[], total: number }> {
    try {
      let query = supabase
        .from('audit_logs')
        .select('*', { count: 'exact' })
        .range((page - 1) * limit, page * limit - 1)
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters.action) {
        query = query.eq('action', filters.action);
      }
      if (filters.resource_type) {
        query = query.eq('resource_type', filters.resource_type);
      }
      if (filters.user_id) {
        query = query.eq('user_id', filters.user_id);
      }
      if (filters.company_id) {
        query = query.eq('company_id', filters.company_id);
      }
      if (filters.start_date) {
        query = query.gte('created_at', filters.start_date);
      }
      if (filters.end_date) {
        query = query.lte('created_at', filters.end_date);
      }

      const { data, error, count } = await query;
      if (error) throw error;

      return { data: data || [], total: count || 0 };
    } catch (error) {
      console.error('Error fetching audit logs:', error);
      throw error;
    }
  }

  // Audit Log Creation (Internal)
  private static async createAuditLog(logData: {
    action: string;
    resource_type: string;
    resource_id?: string;
    old_values?: any;
    new_values?: any;
    user_id?: number;
    company_id?: number;
  }): Promise<void> {
    try {
      // Get current user info
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;

      const { data: currentUser } = await supabase
        .from('users')
        .select('id, company_id')
        .eq('auth_user_id', user.id)
        .single();

      await supabase
        .from('audit_logs')
        .insert({
          user_id: logData.user_id || currentUser?.id,
          company_id: logData.company_id || currentUser?.company_id,
          action: logData.action,
          resource_type: logData.resource_type,
          resource_id: logData.resource_id,
          old_values: logData.old_values,
          new_values: logData.new_values,
          ip_address: null, // Will be set by database function
          user_agent: null  // Will be set by database function
        });
    } catch (error) {
      console.error('Error creating audit log:', error);
      // Don't throw error for audit log failures
    }
  }

  // Portal Management
  static async getAllPortals(
    page = 1,
    limit = 50,
    filters: any = {}
  ): Promise<{ data: PortalConfig[], total: number }> {
    try {
      let query = supabase
        .from('portal_configs')
        .select('*', { count: 'exact' })
        .range((page - 1) * limit, page * limit - 1)
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters.search) {
        query = query.textSearch('name,description', filters.search);
      }
      if (filters.portal_type) {
        query = query.eq('portal_type', filters.portal_type);
      }
      if (filters.is_active !== undefined) {
        query = query.eq('is_active', filters.is_active);
      }
      if (filters.company_id) {
        query = query.eq('company_id', filters.company_id);
      }

      const { data, error, count } = await query;
      if (error) throw error;

      return { data: data || [], total: count || 0 };
    } catch (error) {
      console.error('Error fetching portals:', error);
      throw error;
    }
  }

  static async createPortal(portalData: Partial<PortalConfig>): Promise<PortalConfig> {
    try {
      const { data, error } = await supabase
        .from('portal_configs')
        .insert(portalData)
        .select()
        .single();

      if (error) throw error;

      // Create audit log
      await this.createAuditLog({
        action: 'CREATE',
        resource_type: 'portal_config',
        resource_id: data.id.toString(),
        new_values: data
      });

      return data;
    } catch (error) {
      console.error('Error creating portal:', error);
      throw error;
    }
  }

  static async updatePortal(id: number, updates: Partial<PortalConfig>): Promise<PortalConfig> {
    try {
      // Get old values for audit log
      const { data: oldData, error: oldError } = await supabase
        .from('portal_configs')
        .select('*')
        .eq('id', id)
        .single();

      const { data, error } = await supabase
        .from('portal_configs')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      // Create audit log
      await this.createAuditLog({
        action: 'UPDATE',
        resource_type: 'portal_config',
        resource_id: id.toString(),
        old_values: oldData,
        new_values: data
      });

      return data;
    } catch (error) {
      console.error('Error updating portal:', error);
      throw error;
    }
  }

  // Utility Methods
  static async exportData(tableName: string, filters: any = {}): Promise<any[]> {
    try {
      let query = supabase.from(tableName).select('*');
      
      // Apply basic filters based on table
      if (filters.start_date && filters.end_date) {
        query = query.gte('created_at', filters.start_date).lte('created_at', filters.end_date);
      }
      
      const { data, error } = await query;
      if (error) throw error;

      // Create audit log for export
      await this.createAuditLog({
        action: 'EXPORT',
        resource_type: tableName,
        resource_id: null
      });

      return data || [];
    } catch (error) {
      console.error(`Error exporting ${tableName}:`, error);
      throw error;
    }
  }

  static async bulkUpdate(tableName: string, ids: number[], updates: any): Promise<void> {
    try {
      const { error } = await supabase
        .from(tableName)
        .update(updates)
        .in('id', ids);

      if (error) throw error;

      // Create audit log for bulk update
      await this.createAuditLog({
        action: 'BULK_UPDATE',
        resource_type: tableName,
        resource_id: ids.join(','),
        new_values: updates
      });
    } catch (error) {
      console.error(`Error bulk updating ${tableName}:`, error);
      throw error;
    }
  }
}

export default SuperAdminService;
