import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Database types
export interface Database {
  public: {
    Tables: {
      companies: {
        Row: {
          id: number;
          name: string;
          domain: string;
          plan: 'Basic' | 'Standard' | 'Professional' | 'Enterprise';
          status: 'Active' | 'Trial' | 'Suspended' | 'Inactive';
          max_users: number;
          storage_limit: number;
          api_calls_limit: number;
          custom_branding: boolean;
          sso_enabled: boolean;
          audit_logs: boolean;
          contact_email: string;
          contact_phone: string;
          contact_address: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          domain: string;
          plan?: 'Basic' | 'Standard' | 'Professional' | 'Enterprise';
          status?: 'Active' | 'Trial' | 'Suspended' | 'Inactive';
          max_users?: number;
          storage_limit?: number;
          api_calls_limit?: number;
          custom_branding?: boolean;
          sso_enabled?: boolean;
          audit_logs?: boolean;
          contact_email: string;
          contact_phone: string;
          contact_address: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          domain?: string;
          plan?: 'Basic' | 'Standard' | 'Professional' | 'Enterprise';
          status?: 'Active' | 'Trial' | 'Suspended' | 'Inactive';
          max_users?: number;
          storage_limit?: number;
          api_calls_limit?: number;
          custom_branding?: boolean;
          sso_enabled?: boolean;
          audit_logs?: boolean;
          contact_email?: string;
          contact_phone?: string;
          contact_address?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      users: {
        Row: {
          id: number;
          name: string;
          email: string;
          role: 'Super Admin' | 'Admin' | 'Manager' | 'User' | 'Viewer';
          company_id: number;
          status: 'Active' | 'Inactive' | 'Suspended' | 'Pending';
          phone?: string;
          department?: string;
          title?: string;
          permissions: string[];
          two_factor_enabled: boolean;
          password_last_changed: string;
          login_attempts: number;
          last_failed_login?: string;
          last_login?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          email: string;
          role?: 'Super Admin' | 'Admin' | 'Manager' | 'User' | 'Viewer';
          company_id: number;
          status?: 'Active' | 'Inactive' | 'Suspended' | 'Pending';
          phone?: string;
          department?: string;
          title?: string;
          permissions?: string[];
          two_factor_enabled?: boolean;
          password_last_changed?: string;
          login_attempts?: number;
          last_failed_login?: string;
          last_login?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          email?: string;
          role?: 'Super Admin' | 'Admin' | 'Manager' | 'User' | 'Viewer';
          company_id?: number;
          status?: 'Active' | 'Inactive' | 'Suspended' | 'Pending';
          phone?: string;
          department?: string;
          title?: string;
          permissions?: string[];
          two_factor_enabled?: boolean;
          password_last_changed?: string;
          login_attempts?: number;
          last_failed_login?: string;
          last_login?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      system_metrics: {
        Row: {
          id: number;
          metric_name: string;
          metric_value: number;
          metric_unit: string;
          timestamp: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          metric_name: string;
          metric_value: number;
          metric_unit: string;
          timestamp?: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          metric_name?: string;
          metric_value?: number;
          metric_unit?: string;
          timestamp?: string;
          created_at?: string;
        };
      };
      audit_logs: {
        Row: {
          id: number;
          user_id: number;
          action: string;
          resource_type: string;
          resource_id: number;
          details: Record<string, any>;
          ip_address: string;
          user_agent: string;
          timestamp: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          user_id: number;
          action: string;
          resource_type: string;
          resource_id: number;
          details: Record<string, any>;
          ip_address: string;
          user_agent: string;
          timestamp?: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          user_id?: number;
          action?: string;
          resource_type?: string;
          resource_id?: number;
          details?: Record<string, any>;
          ip_address?: string;
          user_agent?: string;
          timestamp?: string;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// API Service Classes
export class CompanyService {
  static async getCompanies() {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async getCompany(id: number) {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  static async createCompany(company: Database['public']['Tables']['companies']['Insert']) {
    const { data, error } = await supabase
      .from('companies')
      .insert(company)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateCompany(id: number, updates: Database['public']['Tables']['companies']['Update']) {
    const { data, error } = await supabase
      .from('companies')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteCompany(id: number) {
    const { error } = await supabase
      .from('companies')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  static async getCompanyStats() {
    const { data, error } = await supabase
      .from('companies')
      .select('plan, status');

    if (error) throw error;

    const stats = {
      total: data.length,
      byPlan: data.reduce((acc, company) => {
        acc[company.plan] = (acc[company.plan] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      byStatus: data.reduce((acc, company) => {
        acc[company.status] = (acc[company.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    };

    return stats;
  }
}

export class UserService {
  static async getUsers() {
    const { data, error } = await supabase
      .from('users')
      .select(`
        *,
        companies!inner(name)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async getUser(id: number) {
    const { data, error } = await supabase
      .from('users')
      .select(`
        *,
        companies!inner(name)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  static async createUser(user: Database['public']['Tables']['users']['Insert']) {
    const { data, error } = await supabase
      .from('users')
      .insert(user)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updateUser(id: number, updates: Database['public']['Tables']['users']['Update']) {
    const { data, error } = await supabase
      .from('users')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteUser(id: number) {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  static async getUserStats() {
    const { data, error } = await supabase
      .from('users')
      .select('role, status');

    if (error) throw error;

    const stats = {
      total: data.length,
      byRole: data.reduce((acc, user) => {
        acc[user.role] = (acc[user.role] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      byStatus: data.reduce((acc, user) => {
        acc[user.status] = (acc[user.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    };

    return stats;
  }

  static async updateUserStatus(id: number, status: string) {
    const { data, error } = await supabase
      .from('users')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async resetUserPassword(id: number) {
    // This would typically trigger an email with a reset link
    // For now, we'll just log the action
    console.log(`Password reset requested for user ${id}`);
    
    const { data, error } = await supabase
      .from('users')
      .update({ 
        password_last_changed: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

export class SystemMetricsService {
  static async getMetrics() {
    const { data, error } = await supabase
      .from('system_metrics')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(100);

    if (error) throw error;
    return data;
  }

  static async getMetricByName(name: string) {
    const { data, error } = await supabase
      .from('system_metrics')
      .select('*')
      .eq('metric_name', name)
      .order('timestamp', { ascending: false })
      .limit(50);

    if (error) throw error;
    return data;
  }

  static async createMetric(metric: Database['public']['Tables']['system_metrics']['Insert']) {
    const { data, error } = await supabase
      .from('system_metrics')
      .insert(metric)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getSystemHealth() {
    const metrics = await this.getMetrics();
    
    const health = {
      uptime: 99.97,
      apiCalls: metrics.find(m => m.metric_name === 'api_calls')?.metric_value || 0,
      databaseQueries: metrics.find(m => m.metric_name === 'database_queries')?.metric_value || 0,
      storageUsed: metrics.find(m => m.metric_name === 'storage_used')?.metric_value || 0,
      bandwidth: metrics.find(m => m.metric_name === 'bandwidth')?.metric_value || 0,
      lastUpdated: new Date().toISOString()
    };

    return health;
  }
}

export class AuditLogService {
  static async getLogs(limit = 100) {
    const { data, error } = await supabase
      .from('audit_logs')
      .select(`
        *,
        users!inner(name, email)
      `)
      .order('timestamp', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  }

  static async createLog(log: Database['public']['Tables']['audit_logs']['Insert']) {
    const { data, error } = await supabase
      .from('audit_logs')
      .insert(log)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async logAction(
    userId: number,
    action: string,
    resourceType: string,
    resourceId: number,
    details: Record<string, any> = {}
  ) {
    return this.createLog({
      user_id: userId,
      action,
      resource_type: resourceType,
      resource_id: resourceId,
      details,
      ip_address: '127.0.0.1', // This would come from the request
      user_agent: navigator.userAgent,
      timestamp: new Date().toISOString()
    });
  }
}

// Real-time subscriptions
export class RealtimeService {
  static subscribeToCompanies(callback: (payload: any) => void) {
    return supabase
      .channel('companies')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'companies' }, 
        callback
      )
      .subscribe();
  }

  static subscribeToUsers(callback: (payload: any) => void) {
    return supabase
      .channel('users')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'users' }, 
        callback
      )
      .subscribe();
  }

  static subscribeToSystemMetrics(callback: (payload: any) => void) {
    return supabase
      .channel('system_metrics')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'system_metrics' }, 
        callback
      )
      .subscribe();
  }

  static subscribeToAuditLogs(callback: (payload: any) => void) {
    return supabase
      .channel('audit_logs')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'audit_logs' }, 
        callback
      )
      .subscribe();
  }
}

// Authentication helpers
export class AuthService {
  static async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return data;
  }

  static async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  static async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  }

  static async getCurrentSession() {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  }

  static onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
}

export default supabase;
