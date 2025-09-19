import { createClient } from '@supabase/supabase-js';

// Supabase configuration from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://nxwypaojmcowcslytera.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54d3lwYW9qbWNvd2NzbHl0ZXJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyNDg3MDUsImV4cCI6MjA3MzgyNDcwNX0.SCg9_4bOKB8TsewX9x96mP7v_2ntkCp8EoWjc7m_TQI';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Service role client for admin operations
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;
export const supabaseAdmin = supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null;

// Database types for TypeScript
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          role: 'admin' | 'user' | 'super_admin';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: 'admin' | 'user' | 'super_admin';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: 'admin' | 'user' | 'super_admin';
          created_at?: string;
          updated_at?: string;
        };
      };
      mcp_agents: {
        Row: {
          id: string;
          name: string;
          status: 'active' | 'inactive' | 'testing' | 'error';
          type: 'refactoring' | 'security' | 'monitoring' | 'deployment';
          health_score: number;
          last_activity: string;
          assigned_tasks: number;
          cpu_usage: number;
          memory_usage: number;
          disk_usage: number;
          network_latency: number;
          error_rate: number;
          uptime: number;
          location: string;
          ip_address: string;
          version: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          status?: 'active' | 'inactive' | 'testing' | 'error';
          type: 'refactoring' | 'security' | 'monitoring' | 'deployment';
          health_score?: number;
          last_activity?: string;
          assigned_tasks?: number;
          cpu_usage?: number;
          memory_usage?: number;
          disk_usage?: number;
          network_latency?: number;
          error_rate?: number;
          uptime?: number;
          location: string;
          ip_address: string;
          version: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          status?: 'active' | 'inactive' | 'testing' | 'error';
          type?: 'refactoring' | 'security' | 'monitoring' | 'deployment';
          health_score?: number;
          last_activity?: string;
          assigned_tasks?: number;
          cpu_usage?: number;
          memory_usage?: number;
          disk_usage?: number;
          network_latency?: number;
          error_rate?: number;
          uptime?: number;
          location?: string;
          ip_address?: string;
          version?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      system_metrics: {
        Row: {
          id: string;
          total_agents: number;
          active_agents: number;
          inactive_agents: number;
          testing_agents: number;
          error_agents: number;
          average_health_score: number;
          total_tasks_completed: number;
          total_errors_fixed: number;
          system_uptime: number;
          last_update: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          total_agents: number;
          active_agents: number;
          inactive_agents: number;
          testing_agents: number;
          error_agents: number;
          average_health_score: number;
          total_tasks_completed: number;
          total_errors_fixed: number;
          system_uptime: number;
          last_update: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          total_agents?: number;
          active_agents?: number;
          inactive_agents?: number;
          testing_agents?: number;
          error_agents?: number;
          average_health_score?: number;
          total_tasks_completed?: number;
          total_errors_fixed?: number;
          system_uptime?: number;
          last_update?: string;
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

// Typed Supabase client
export type TypedSupabaseClient = typeof supabase;
