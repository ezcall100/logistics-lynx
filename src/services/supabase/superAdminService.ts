import { supabase } from '../supabase';
import { RealtimeChannel } from '@supabase/supabase-js';

// Types for Super Admin data
export interface SystemMetric {
  id: string;
  label: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: string;
  color: string;
  bgColor: string;
  trend?: number[];
  lastUpdated: string;
  category: 'users' | 'revenue' | 'performance' | 'system';
}

export interface SystemAlert {
  id: string;
  type: 'warning' | 'error' | 'info' | 'success';
  title: string;
  message: string;
  source: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'acknowledged' | 'resolved';
  assignedTo?: string;
  resolution?: string;
  tags: string[];
  metadata?: Record<string, unknown>;
}

export interface SystemHealth {
  id: string;
  status: 'healthy' | 'warning' | 'critical';
  uptime: string;
  responseTime: number;
  errorRate: number;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  networkLatency: number;
  activeConnections: number;
  throughput: number;
  lastHealthCheck: string;
  serverId: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  company: string;
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
  permissions: string[];
  metadata?: Record<string, unknown>;
}

export interface Company {
  id: string;
  name: string;
  domain: string;
  plan: string;
  status: 'active' | 'inactive' | 'suspended';
  users: number;
  revenue: number;
  growth: number;
  lastActive: string;
  features: string[];
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  details: Record<string, unknown>;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

class SuperAdminService {
  private channels: Map<string, RealtimeChannel> = new Map();

  // System Metrics
  async getSystemMetrics(): Promise<SystemMetric[]> {
    const { data, error } = await supabase
      .from('system_metrics')
      .select('*')
      .order('last_updated', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async updateSystemMetric(id: string, updates: Partial<SystemMetric>): Promise<SystemMetric> {
    const { data, error } = await supabase
      .from('system_metrics')
      .update({ ...updates, last_updated: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  subscribeToSystemMetrics(callback: (metrics: SystemMetric[]) => void): RealtimeChannel {
    const channel = supabase
      .channel('system_metrics')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'system_metrics' },
        async () => {
          const metrics = await this.getSystemMetrics();
          callback(metrics);
        }
      )
      .subscribe();

    this.channels.set('system_metrics', channel);
    return channel;
  }

  // System Alerts
  async getSystemAlerts(filters?: {
    type?: string;
    severity?: string;
    status?: string;
    limit?: number;
  }): Promise<SystemAlert[]> {
    let query = supabase.from('system_alerts').select('*');

    if (filters?.type) {
      query = query.eq('type', filters.type);
    }
    if (filters?.severity) {
      query = query.eq('severity', filters.severity);
    }
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    const { data, error } = await query.order('timestamp', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async createSystemAlert(alert: Omit<SystemAlert, 'id' | 'timestamp'>): Promise<SystemAlert> {
    const { data, error } = await supabase
      .from('system_alerts')
      .insert({
        ...alert,
        timestamp: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateSystemAlert(id: string, updates: Partial<SystemAlert>): Promise<SystemAlert> {
    const { data, error } = await supabase
      .from('system_alerts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteSystemAlert(id: string): Promise<void> {
    const { error } = await supabase
      .from('system_alerts')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  subscribeToSystemAlerts(callback: (alerts: SystemAlert[]) => void): RealtimeChannel {
    const channel = supabase
      .channel('system_alerts')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'system_alerts' },
        async () => {
          const alerts = await this.getSystemAlerts();
          callback(alerts);
        }
      )
      .subscribe();

    this.channels.set('system_alerts', channel);
    return channel;
  }

  // System Health
  async getSystemHealth(): Promise<SystemHealth[]> {
    const { data, error } = await supabase
      .from('system_health')
      .select('*')
      .order('last_health_check', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async updateSystemHealth(id: string, updates: Partial<SystemHealth>): Promise<SystemHealth> {
    const { data, error } = await supabase
      .from('system_health')
      .update({ 
        ...updates, 
        last_health_check: new Date().toISOString() 
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  subscribeToSystemHealth(callback: (health: SystemHealth[]) => void): RealtimeChannel {
    const channel = supabase
      .channel('system_health')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'system_health' },
        async () => {
          const health = await this.getSystemHealth();
          callback(health);
        }
      )
      .subscribe();

    this.channels.set('system_health', channel);
    return channel;
  }

  // Users Management
  async getUsers(filters?: {
    role?: string;
    status?: string;
    company?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ users: User[]; total: number }> {
    let query = supabase.from('users').select('*', { count: 'exact' });

    if (filters?.role) {
      query = query.eq('role', filters.role);
    }
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.company) {
      query = query.eq('company', filters.company);
    }
    if (filters?.search) {
      query = query.or(`name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`);
    }
    if (filters?.limit) {
      query = query.limit(filters.limit);
    }
    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
    }

    const { data, error, count } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return { users: data || [], total: count || 0 };
  }

  async createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .insert({
        ...user,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update({ 
        ...updates, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteUser(id: string): Promise<void> {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  async bulkUpdateUsers(ids: string[], updates: Partial<User>): Promise<User[]> {
    const { data, error } = await supabase
      .from('users')
      .update({ 
        ...updates, 
        updated_at: new Date().toISOString() 
      })
      .in('id', ids)
      .select();

    if (error) throw error;
    return data || [];
  }

  subscribeToUsers(callback: (users: User[]) => void): RealtimeChannel {
    const channel = supabase
      .channel('users')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'users' },
        async () => {
          const { users } = await this.getUsers();
          callback(users);
        }
      )
      .subscribe();

    this.channels.set('users', channel);
    return channel;
  }

  // Companies Management
  async getCompanies(filters?: {
    status?: string;
    plan?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ companies: Company[]; total: number }> {
    let query = supabase.from('companies').select('*', { count: 'exact' });

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.plan) {
      query = query.eq('plan', filters.plan);
    }
    if (filters?.search) {
      query = query.or(`name.ilike.%${filters.search}%,domain.ilike.%${filters.search}%`);
    }
    if (filters?.limit) {
      query = query.limit(filters.limit);
    }
    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
    }

    const { data, error, count } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return { companies: data || [], total: count || 0 };
  }

  async createCompany(company: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>): Promise<Company> {
    const { data, error } = await supabase
      .from('companies')
      .insert({
        ...company,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateCompany(id: string, updates: Partial<Company>): Promise<Company> {
    const { data, error } = await supabase
      .from('companies')
      .update({ 
        ...updates, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteCompany(id: string): Promise<void> {
    const { error } = await supabase
      .from('companies')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  subscribeToCompanies(callback: (companies: Company[]) => void): RealtimeChannel {
    const channel = supabase
      .channel('companies')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'companies' },
        async () => {
          const { companies } = await this.getCompanies();
          callback(companies);
        }
      )
      .subscribe();

    this.channels.set('companies', channel);
    return channel;
  }

  // Audit Logs
  async getAuditLogs(filters?: {
    userId?: string;
    action?: string;
    resource?: string;
    severity?: string;
    startDate?: string;
    endDate?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ logs: AuditLog[]; total: number }> {
    let query = supabase.from('audit_logs').select('*', { count: 'exact' });

    if (filters?.userId) {
      query = query.eq('user_id', filters.userId);
    }
    if (filters?.action) {
      query = query.eq('action', filters.action);
    }
    if (filters?.resource) {
      query = query.eq('resource', filters.resource);
    }
    if (filters?.severity) {
      query = query.eq('severity', filters.severity);
    }
    if (filters?.startDate) {
      query = query.gte('timestamp', filters.startDate);
    }
    if (filters?.endDate) {
      query = query.lte('timestamp', filters.endDate);
    }
    if (filters?.limit) {
      query = query.limit(filters.limit);
    }
    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
    }

    const { data, error, count } = await query.order('timestamp', { ascending: false });

    if (error) throw error;
    return { logs: data || [], total: count || 0 };
  }

  async createAuditLog(log: Omit<AuditLog, 'id' | 'timestamp'>): Promise<AuditLog> {
    const { data, error } = await supabase
      .from('audit_logs')
      .insert({
        ...log,
        timestamp: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  subscribeToAuditLogs(callback: (logs: AuditLog[]) => void): RealtimeChannel {
    const channel = supabase
      .channel('audit_logs')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'audit_logs' },
        async () => {
          const { logs } = await this.getAuditLogs();
          callback(logs);
        }
      )
      .subscribe();

    this.channels.set('audit_logs', channel);
    return channel;
  }

  // Cleanup subscriptions
  unsubscribe(channelName: string): void {
    const channel = this.channels.get(channelName);
    if (channel) {
      supabase.removeChannel(channel);
      this.channels.delete(channelName);
    }
  }

  unsubscribeAll(): void {
    this.channels.forEach((channel) => {
      supabase.removeChannel(channel);
    });
    this.channels.clear();
  }
}

export const superAdminService = new SuperAdminService();
