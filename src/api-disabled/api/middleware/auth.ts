// =====================================================
// LOGISTICS LYNX SUPER ADMIN - API AUTHENTICATION MIDDLEWARE
// Created by MCP 302 Agents - Phase 2B API Development
// Timestamp: 2025-01-20T21:30:00.000Z
// =====================================================

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { AuthUser } from '@/lib/supabase';

export interface AuthenticatedRequest extends NextRequest {
  user: AuthUser;
  organizationId: string;
}

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Authentication middleware for API routes
 */
export async function authenticateRequest(
  request: NextRequest
): Promise<{ user: AuthUser; organizationId: string } | NextResponse> {
  try {
    // Get authorization header
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Missing or invalid authorization header' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];

    // Verify JWT token with Supabase
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !authUser) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Get user details with roles and permissions
    const { data: userData, error: userError } = await supabase
      .from('user_with_roles')
      .select(`
        *,
        roles:roles(
          id,
          name,
          permissions:role_permissions(
            permission:permissions(name)
          )
        )
      `)
      .eq('id', authUser.id)
      .single();

    if (userError || !userData) {
      return NextResponse.json(
        { success: false, error: 'User not found or inactive' },
        { status: 401 }
      );
    }

    // Check if user is active
    if (!userData.is_active) {
      return NextResponse.json(
        { success: false, error: 'User account is inactive' },
        { status: 401 }
      );
    }

    // Transform the data
    const user: AuthUser = {
      id: userData.id,
      email: userData.email,
      organization_id: userData.organization_id,
      first_name: userData.first_name,
      last_name: userData.last_name,
      avatar_url: userData.avatar_url,
      roles: userData.roles?.map((role: any) => ({
        id: role.id,
        name: role.name,
        permissions: role.permissions?.map((rp: any) => rp.permission.name) || []
      })) || []
    };

    // Update last login time
    await supabase
      .from('users')
      .update({ last_login_at: new Date().toISOString() })
      .eq('id', authUser.id);

    return {
      user,
      organizationId: userData.organization_id
    };

  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Permission check middleware
 */
export async function checkPermission(
  user: AuthUser,
  permission: string
): Promise<boolean> {
  try {
    // Check if user has the required permission
    const hasPermission = user.roles.some(role => 
      role.permissions.includes(permission)
    );

    return hasPermission;
  } catch (error) {
    console.error('Permission check error:', error);
    return false;
  }
}

/**
 * Require permission middleware
 */
export function requirePermission(permission: string) {
  return async function (
    request: AuthenticatedRequest,
    handler: (request: AuthenticatedRequest) => Promise<NextResponse>
  ): Promise<NextResponse> {
    try {
      const hasPermission = await checkPermission(request.user, permission);
      
      if (!hasPermission) {
        return NextResponse.json(
          { success: false, error: 'Insufficient permissions' },
          { status: 403 }
        );
      }

      return handler(request);
    } catch (error) {
      console.error('Permission middleware error:', error);
      return NextResponse.json(
        { success: false, error: 'Permission check failed' },
        { status: 500 }
      );
    }
  };
}

/**
 * Rate limiting middleware
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(requests: number, windowMs: number) {
  return function (
    request: AuthenticatedRequest,
    handler: (request: AuthenticatedRequest) => Promise<NextResponse>
  ): Promise<NextResponse> {
    const clientId = `${request.user.id}:${request.ip}`;
    const now = Date.now();
    const windowStart = now - windowMs;

    // Clean up old entries
    for (const [key, value] of rateLimitMap.entries()) {
      if (value.resetTime < now) {
        rateLimitMap.delete(key);
      }
    }

    const current = rateLimitMap.get(clientId);

    if (!current) {
      rateLimitMap.set(clientId, {
        count: 1,
        resetTime: now + windowMs
      });
      return handler(request);
    }

    if (current.resetTime < now) {
      rateLimitMap.set(clientId, {
        count: 1,
        resetTime: now + windowMs
      });
      return handler(request);
    }

    if (current.count >= requests) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Rate limit exceeded',
          retryAfter: Math.ceil((current.resetTime - now) / 1000)
        },
        { status: 429 }
      );
    }

    current.count++;
    return handler(request);
  };
}

/**
 * Audit logging middleware
 */
export async function logAuditAction(
  user: AuthUser,
  action: string,
  resourceType: string,
  resourceId?: string,
  details?: Record<string, any>,
  request?: NextRequest
): Promise<void> {
  try {
    await supabase
      .from('audit_logs')
      .insert({
        organization_id: user.organization_id,
        user_id: user.id,
        action,
        resource_type: resourceType,
        resource_id: resourceId,
        details,
        ip_address: request?.ip || null,
        user_agent: request?.headers.get('user-agent') || null
      });
  } catch (error) {
    console.error('Audit logging error:', error);
  }
}

/**
 * API response helper
 */
export function createResponse<T>(
  data?: T,
  message?: string,
  options: {
    success?: boolean;
    status?: number;
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  } = {}
): NextResponse {
  const { success = true, status = 200, pagination } = options;
  
  const response: APIResponse<T> = {
    success,
    data,
    message,
    ...(pagination && { pagination })
  };

  return NextResponse.json(response, { status });
}

/**
 * Error response helper
 */
export function createErrorResponse(
  error: string,
  status: number = 500,
  details?: any
): NextResponse {
  return NextResponse.json(
    {
      success: false,
      error,
      ...(details && { details })
    },
    { status }
  );
}

/**
 * Validation helper
 */
export function validateRequired(
  data: Record<string, any>,
  requiredFields: string[]
): string[] {
  const missing: string[] = [];
  
  requiredFields.forEach(field => {
    if (data[field] === undefined || data[field] === null || data[field] === '') {
      missing.push(field);
    }
  });
  
  return missing;
}

/**
 * Pagination helper
 */
export function parsePagination(request: NextRequest) {
  const url = new URL(request.url);
  const page = Math.max(1, parseInt(url.searchParams.get('page') || '1'));
  const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get('limit') || '20')));
  
  return { page, limit };
}

/**
 * Combined middleware wrapper
 */
export function withAuth(
  handler: (request: AuthenticatedRequest) => Promise<NextResponse>,
  options: {
    permission?: string;
    rateLimit?: { requests: number; windowMs: number };
    audit?: { action: string; resourceType: string };
  } = {}
) {
  return async function (request: NextRequest): Promise<NextResponse> {
    try {
      // Authenticate request
      const authResult = await authenticateRequest(request);
      
      if (authResult instanceof NextResponse) {
        return authResult;
      }

      const { user, organizationId } = authResult;
      const authenticatedRequest = request as AuthenticatedRequest;
      authenticatedRequest.user = user;
      authenticatedRequest.organizationId = organizationId;

      // Check permission if required
      if (options.permission) {
        const hasPermission = await checkPermission(user, options.permission);
        if (!hasPermission) {
          return createErrorResponse('Insufficient permissions', 403);
        }
      }

      // Apply rate limiting if configured
      if (options.rateLimit) {
        const rateLimitResult = rateLimit(options.rateLimit.requests, options.rateLimit.windowMs)(
          authenticatedRequest,
          handler
        );
        
        if (rateLimitResult instanceof NextResponse && rateLimitResult.status === 429) {
          return rateLimitResult;
        }
      }

      // Execute handler
      const response = await handler(authenticatedRequest);

      // Log audit action if configured
      if (options.audit && response.status < 400) {
        await logAuditAction(
          user,
          options.audit.action,
          options.audit.resourceType,
          undefined,
          { status: response.status },
          request
        );
      }

      return response;

    } catch (error) {
      console.error('Middleware error:', error);
      return createErrorResponse('Internal server error', 500);
    }
  };
}

export default {
  authenticateRequest,
  checkPermission,
  requirePermission,
  rateLimit,
  logAuditAction,
  createResponse,
  createErrorResponse,
  validateRequired,
  parsePagination,
  withAuth
};
