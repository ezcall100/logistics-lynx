import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Create Supabase client
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
          id: string;
          name: string;
          subdomain: string;
          status: 'active' | 'inactive' | 'suspended';
          plan: 'basic' | 'standard' | 'professional' | 'enterprise';
          created_at: string;
          updated_at: string;
          settings: Record<string, any>;
          contact_email: string;
          contact_phone: string;
          address: string;
          logo_url?: string;
        };
        Insert: {
          id?: string;
          name: string;
          subdomain: string;
          status?: 'active' | 'inactive' | 'suspended';
          plan?: 'basic' | 'standard' | 'professional' | 'enterprise';
          created_at?: string;
          updated_at?: string;
          settings?: Record<string, any>;
          contact_email: string;
          contact_phone: string;
          address: string;
          logo_url?: string;
        };
        Update: {
          id?: string;
          name?: string;
          subdomain?: string;
          status?: 'active' | 'inactive' | 'suspended';
          plan?: 'basic' | 'standard' | 'professional' | 'enterprise';
          created_at?: string;
          updated_at?: string;
          settings?: Record<string, any>;
          contact_email?: string;
          contact_phone?: string;
          address?: string;
          logo_url?: string;
        };
      };
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: 'superadmin' | 'admin' | 'user';
          company_id?: string;
          status: 'active' | 'inactive' | 'suspended';
          created_at: string;
          updated_at: string;
          last_login?: string;
          avatar_url?: string;
          permissions: Record<string, any>;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          role: 'superadmin' | 'admin' | 'user';
          company_id?: string;
          status?: 'active' | 'inactive' | 'suspended';
          created_at?: string;
          updated_at?: string;
          last_login?: string;
          avatar_url?: string;
          permissions?: Record<string, any>;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          role?: 'superadmin' | 'admin' | 'user';
          company_id?: string;
          status?: 'active' | 'inactive' | 'suspended';
          created_at?: string;
          updated_at?: string;
          last_login?: string;
          avatar_url?: string;
          permissions?: Record<string, any>;
        };
      };
      portals: {
        Row: {
          id: string;
          name: string;
          company_id: string;
          type: 'tms' | 'loadboard' | 'fleet' | 'broker' | 'driver';
          status: 'active' | 'inactive' | 'maintenance';
          created_at: string;
          updated_at: string;
          settings: Record<string, any>;
          url?: string;
          api_key?: string;
        };
        Insert: {
          id?: string;
          name: string;
          company_id: string;
          type: 'tms' | 'loadboard' | 'fleet' | 'broker' | 'driver';
          status?: 'active' | 'inactive' | 'maintenance';
          created_at?: string;
          updated_at?: string;
          settings?: Record<string, any>;
          url?: string;
          api_key?: string;
        };
        Update: {
          id?: string;
          name?: string;
          company_id?: string;
          type?: 'tms' | 'loadboard' | 'fleet' | 'broker' | 'driver';
          status?: 'active' | 'inactive' | 'maintenance';
          created_at?: string;
          updated_at?: string;
          settings?: Record<string, any>;
          url?: string;
          api_key?: string;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          company_id: string;
          plan: 'basic' | 'standard' | 'professional' | 'enterprise';
          status: 'active' | 'cancelled' | 'expired' | 'trial';
          start_date: string;
          end_date?: string;
          amount: number;
          currency: string;
          payment_method: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          company_id: string;
          plan: 'basic' | 'standard' | 'professional' | 'enterprise';
          status?: 'active' | 'cancelled' | 'expired' | 'trial';
          start_date: string;
          end_date?: string;
          amount: number;
          currency?: string;
          payment_method: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          company_id?: string;
          plan?: 'basic' | 'standard' | 'professional' | 'enterprise';
          status?: 'active' | 'cancelled' | 'expired' | 'trial';
          start_date?: string;
          end_date?: string;
          amount?: number;
          currency?: string;
          payment_method?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      system_analytics: {
        Row: {
          id: string;
          metric_name: string;
          metric_value: number;
          metric_type: 'counter' | 'gauge' | 'histogram';
          timestamp: string;
          metadata: Record<string, any>;
        };
        Insert: {
          id?: string;
          metric_name: string;
          metric_value: number;
          metric_type: 'counter' | 'gauge' | 'histogram';
          timestamp?: string;
          metadata?: Record<string, any>;
        };
        Update: {
          id?: string;
          metric_name?: string;
          metric_value?: number;
          metric_type?: 'counter' | 'gauge' | 'histogram';
          timestamp?: string;
          metadata?: Record<string, any>;
        };
      };
      activity_logs: {
        Row: {
          id: string;
          user_id?: string;
          company_id?: string;
          action: string;
          resource_type: string;
          resource_id?: string;
          details: Record<string, any>;
          ip_address?: string;
          user_agent?: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string;
          company_id?: string;
          action: string;
          resource_type: string;
          resource_id?: string;
          details?: Record<string, any>;
          ip_address?: string;
          user_agent?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          company_id?: string;
          action?: string;
          resource_type?: string;
          resource_id?: string;
          details?: Record<string, any>;
          ip_address?: string;
          user_agent?: string;
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

// Type-safe database client
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];

// Helper functions for common operations
export const db = {
  // Companies
  companies: {
    async getAll() {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },

    async getById(id: string) {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },

    async create(company: Database['public']['Tables']['companies']['Insert']) {
      const { data, error } = await supabase
        .from('companies')
        .insert(company)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },

    async update(id: string, updates: Database['public']['Tables']['companies']['Update']) {
      const { data, error } = await supabase
        .from('companies')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },

    async delete(id: string) {
      const { error } = await supabase
        .from('companies')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    }
  },

  // Users
  users: {
    async getAll() {
      const { data, error } = await supabase
        .from('users')
        .select(`
          *,
          companies (
            id,
            name,
            subdomain
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },

    async getById(id: string) {
      const { data, error } = await supabase
        .from('users')
        .select(`
          *,
          companies (
            id,
            name,
            subdomain
          )
        `)
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },

    async create(user: Database['public']['Tables']['users']['Insert']) {
      const { data, error } = await supabase
        .from('users')
        .insert(user)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },

    async update(id: string, updates: Database['public']['Tables']['users']['Update']) {
      const { data, error } = await supabase
        .from('users')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },

    async delete(id: string) {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    }
  },

  // Portals
  portals: {
    async getAll() {
      const { data, error } = await supabase
        .from('portals')
        .select(`
          *,
          companies (
            id,
            name,
            subdomain
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },

    async getByCompany(companyId: string) {
      const { data, error } = await supabase
        .from('portals')
        .select('*')
        .eq('company_id', companyId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },

    async create(portal: Database['public']['Tables']['portals']['Insert']) {
      const { data, error } = await supabase
        .from('portals')
        .insert(portal)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },

    async update(id: string, updates: Database['public']['Tables']['portals']['Update']) {
      const { data, error } = await supabase
        .from('portals')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },

    async delete(id: string) {
      const { error } = await supabase
        .from('portals')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    }
  },

  // Subscriptions
  subscriptions: {
    async getAll() {
      const { data, error } = await supabase
        .from('subscriptions')
        .select(`
          *,
          companies (
            id,
            name,
            subdomain
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },

    async getByCompany(companyId: string) {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('company_id', companyId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },

    async create(subscription: Database['public']['Tables']['subscriptions']['Insert']) {
      const { data, error } = await supabase
        .from('subscriptions')
        .insert(subscription)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },

    async update(id: string, updates: Database['public']['Tables']['subscriptions']['Update']) {
      const { data, error } = await supabase
        .from('subscriptions')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    }
  },

  // Analytics
  analytics: {
    async getMetrics(timeRange: 'hour' | 'day' | 'week' | 'month' = 'day') {
      const { data, error } = await supabase
        .from('system_analytics')
        .select('*')
        .gte('timestamp', new Date(Date.now() - this.getTimeRangeMs(timeRange)).toISOString())
        .order('timestamp', { ascending: false });
      
      if (error) throw error;
      return data;
    },

    async recordMetric(metric: Database['public']['Tables']['system_analytics']['Insert']) {
      const { data, error } = await supabase
        .from('system_analytics')
        .insert(metric)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },

    getTimeRangeMs(range: 'hour' | 'day' | 'week' | 'month'): number {
      const ranges = {
        hour: 60 * 60 * 1000,
        day: 24 * 60 * 60 * 1000,
        week: 7 * 24 * 60 * 60 * 1000,
        month: 30 * 24 * 60 * 60 * 1000
      };
      return ranges[range];
    }
  },

  // Activity Logs
  activity: {
    async getRecent(limit: number = 50) {
      const { data, error } = await supabase
        .from('activity_logs')
        .select(`
          *,
          users (
            id,
            name,
            email
          ),
          companies (
            id,
            name,
            subdomain
          )
        `)
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      return data;
    },

    async log(activity: Database['public']['Tables']['activity_logs']['Insert']) {
      const { data, error } = await supabase
        .from('activity_logs')
        .insert(activity)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    }
  }
};

// Authentication helpers
export const auth = {
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    return data;
  },

  async signUp(email: string, password: string, userData?: any) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });
    
    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  },

  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  }
};

// Real-time subscriptions
export const realtime = {
  subscribeToCompanies(callback: (payload: any) => void) {
    return supabase
      .channel('companies')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'companies' }, 
        callback
      )
      .subscribe();
  },

  subscribeToUsers(callback: (payload: any) => void) {
    return supabase
      .channel('users')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'users' }, 
        callback
      )
      .subscribe();
  },

  subscribeToActivity(callback: (payload: any) => void) {
    return supabase
      .channel('activity_logs')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'activity_logs' }, 
        callback
      )
      .subscribe();
  }
};

export default supabase;
