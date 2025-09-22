// =====================================================
// LOGISTICS LYNX SUPER ADMIN - API DATABASE SERVICE
// Created by MCP 302 Agents - Phase 2B API Development
// Timestamp: 2025-01-20T21:30:00.000Z
// =====================================================

import { supabase } from '@/lib/supabase';
import { AuthenticatedRequest } from '../middleware/auth';
import { Tables, Database } from '../../../supabase/types';

export interface PaginationOptions {
  page: number;
  limit: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
}

export interface FilterOptions {
  [key: string]: any;
}

export interface QueryResult<T> {
  data: T[];
  count: number;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Core Database Service for API operations
 */
export class APIDatabaseService {
  /**
   * Get paginated data with filters
   */
  static async getPaginatedData<T extends keyof Database['public']['Tables']>(
    table: T,
    request: AuthenticatedRequest,
    options: PaginationOptions & { filters?: FilterOptions; select?: string } = {}
  ): Promise<QueryResult<Tables<T>>> {
    const {
      page,
      limit,
      orderBy = 'created_at',
      orderDirection = 'desc',
      filters = {},
      select = '*'
    } = options;

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from(table)
      .select(select, { count: 'exact' })
      .eq('organization_id', request.organizationId)
      .range(from, to)
      .order(orderBy, { ascending: orderDirection === 'asc' });

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (Array.isArray(value)) {
          query = query.in(key, value);
        } else if (typeof value === 'string' && value.includes('%')) {
          query = query.ilike(key, value);
        } else {
          query = query.eq(key, value);
        }
      }
    });

    const { data, error, count } = await query;

    if (error) {
      throw new Error(`Database query failed: ${error.message}`);
    }

    const totalPages = Math.ceil((count || 0) / limit);

    return {
      data: (data as Tables<T>[]) || [],
      count: count || 0,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages
      }
    };
  }

  /**
   * Get single record by ID
   */
  static async getById<T extends keyof Database['public']['Tables']>(
    table: T,
    id: string,
    organizationId: string,
    select: string = '*'
  ): Promise<Tables<T> | null> {
    const { data, error } = await supabase
      .from(table)
      .select(select)
      .eq('id', id)
      .eq('organization_id', organizationId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Record not found
      }
      throw new Error(`Database query failed: ${error.message}`);
    }

    return data as Tables<T>;
  }

  /**
   * Create new record
   */
  static async create<T extends keyof Database['public']['Tables']>(
    table: T,
    data: Partial<Tables<T>>,
    organizationId: string
  ): Promise<Tables<T>> {
    const { data: result, error } = await supabase
      .from(table)
      .insert({
        ...data,
        organization_id: organizationId
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Database insert failed: ${error.message}`);
    }

    return result as Tables<T>;
  }

  /**
   * Update record by ID
   */
  static async update<T extends keyof Database['public']['Tables']>(
    table: T,
    id: string,
    data: Partial<Tables<T>>,
    organizationId: string
  ): Promise<Tables<T>> {
    const { data: result, error } = await supabase
      .from(table)
      .update(data)
      .eq('id', id)
      .eq('organization_id', organizationId)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new Error('Record not found');
      }
      throw new Error(`Database update failed: ${error.message}`);
    }

    return result as Tables<T>;
  }

  /**
   * Delete record by ID
   */
  static async delete<T extends keyof Database['public']['Tables']>(
    table: T,
    id: string,
    organizationId: string
  ): Promise<void> {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id)
      .eq('organization_id', organizationId);

    if (error) {
      throw new Error(`Database delete failed: ${error.message}`);
    }
  }

  /**
   * Bulk operations
   */
  static async bulkCreate<T extends keyof Database['public']['Tables']>(
    table: T,
    data: Partial<Tables<T>>[],
    organizationId: string
  ): Promise<Tables<T>[]> {
    const records = data.map(record => ({
      ...record,
      organization_id: organizationId
    }));

    const { data: result, error } = await supabase
      .from(table)
      .insert(records)
      .select();

    if (error) {
      throw new Error(`Bulk insert failed: ${error.message}`);
    }

    return result as Tables<T>[];
  }

  static async bulkUpdate<T extends keyof Database['public']['Tables']>(
    table: T,
    updates: { id: string; data: Partial<Tables<T>> }[],
    organizationId: string
  ): Promise<Tables<T>[]> {
    const results: Tables<T>[] = [];

    for (const { id, data } of updates) {
      try {
        const result = await this.update(table, id, data, organizationId);
        results.push(result);
      } catch (error) {
        console.error(`Failed to update ${table} record ${id}:`, error);
      }
    }

    return results;
  }

  static async bulkDelete<T extends keyof Database['public']['Tables']>(
    table: T,
    ids: string[],
    organizationId: string
  ): Promise<number> {
    const { count, error } = await supabase
      .from(table)
      .delete({ count: 'exact' })
      .in('id', ids)
      .eq('organization_id', organizationId);

    if (error) {
      throw new Error(`Bulk delete failed: ${error.message}`);
    }

    return count || 0;
  }

  /**
   * Search functionality
   */
  static async search<T extends keyof Database['public']['Tables']>(
    table: T,
    searchTerm: string,
    searchFields: string[],
    organizationId: string,
    options: PaginationOptions & { select?: string } = {}
  ): Promise<QueryResult<Tables<T>>> {
    const {
      page,
      limit,
      orderBy = 'created_at',
      orderDirection = 'desc',
      select = '*'
    } = options;

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // Build search query with OR conditions across multiple fields
    let query = supabase
      .from(table)
      .select(select, { count: 'exact' })
      .eq('organization_id', organizationId);

    // Add search conditions for each field
    if (searchFields.length > 0) {
      const searchConditions = searchFields.map(field => `${field}.ilike.%${searchTerm}%`);
      query = query.or(searchConditions.join(','));
    }

    const { data, error, count } = await query
      .range(from, to)
      .order(orderBy, { ascending: orderDirection === 'asc' });

    if (error) {
      throw new Error(`Search failed: ${error.message}`);
    }

    const totalPages = Math.ceil((count || 0) / limit);

    return {
      data: (data as Tables<T>[]) || [],
      count: count || 0,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages
      }
    };
  }

  /**
   * Get related data
   */
  static async getRelated<T extends keyof Database['public']['Tables']>(
    table: T,
    id: string,
    relation: string,
    organizationId: string,
    options: { select?: string; filters?: FilterOptions } = {}
  ): Promise<any[]> {
    const { select = '*', filters = {} } = options;

    let query = supabase
      .from(table)
      .select(`${select}, ${relation}(${select})`)
      .eq('id', id)
      .eq('organization_id', organizationId);

    // Apply filters to relation
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        query = query.eq(`${relation}.${key}`, value);
      }
    });

    const { data, error } = await query;

    if (error) {
      throw new Error(`Related data query failed: ${error.message}`);
    }

    return data?.[0]?.[relation] || [];
  }

  /**
   * Execute custom SQL query (for complex operations)
   */
  static async executeQuery<T = any>(
    query: string,
    params: any[] = []
  ): Promise<T[]> {
    const { data, error } = await supabase.rpc('execute_sql', {
      query,
      params
    });

    if (error) {
      throw new Error(`Custom query failed: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Get aggregated data
   */
  static async getAggregatedData<T extends keyof Database['public']['Tables']>(
    table: T,
    aggregation: string,
    groupBy?: string,
    organizationId?: string,
    filters: FilterOptions = {}
  ): Promise<any[]> {
    let query = supabase
      .from(table)
      .select(aggregation);

    if (organizationId) {
      query = query.eq('organization_id', organizationId);
    }

    if (groupBy) {
      query = query.select(`${aggregation}, ${groupBy}`);
    }

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        query = query.eq(key, value);
      }
    });

    const { data, error } = await query;

    if (error) {
      throw new Error(`Aggregation query failed: ${error.message}`);
    }

    return data || [];
  }

  /**
   * Transaction support (using Supabase RPC)
   */
  static async transaction<T>(
    operations: (() => Promise<any>)[]
  ): Promise<T[]> {
    const results: T[] = [];

    try {
      for (const operation of operations) {
        const result = await operation();
        results.push(result);
      }
      return results;
    } catch (error) {
      // Rollback would need to be implemented based on specific needs
      throw new Error(`Transaction failed: ${error}`);
    }
  }

  /**
   * Health check
   */
  static async healthCheck(): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('organizations')
        .select('id')
        .limit(1);

      return !error;
    } catch (error) {
      return false;
    }
  }
}

/**
 * Utility functions for common operations
 */
export class APIUtils {
  /**
   * Parse query parameters from request
   */
  static parseQueryParams(request: Request) {
    const url = new URL(request.url);
    const params: Record<string, any> = {};

    for (const [key, value] of url.searchParams.entries()) {
      // Try to parse as JSON for complex values
      try {
        params[key] = JSON.parse(value);
      } catch {
        // If not JSON, keep as string
        params[key] = value;
      }
    }

    return params;
  }

  /**
   * Validate and sanitize input data
   */
  static sanitizeInput(data: Record<string, any>): Record<string, any> {
    const sanitized: Record<string, any> = {};

    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string') {
        // Basic XSS prevention
        sanitized[key] = value
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#x27;');
      } else {
        sanitized[key] = value;
      }
    }

    return sanitized;
  }

  /**
   * Generate unique ID
   */
  static generateId(): string {
    return crypto.randomUUID();
  }

  /**
   * Format date for database
   */
  static formatDate(date: Date | string): string {
    return new Date(date).toISOString();
  }

  /**
   * Calculate pagination info
   */
  static calculatePagination(page: number, limit: number, total: number) {
    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    return {
      page,
      limit,
      total,
      totalPages,
      hasNext,
      hasPrev
    };
  }
}

export default APIDatabaseService;
