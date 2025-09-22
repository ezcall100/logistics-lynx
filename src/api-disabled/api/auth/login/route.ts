// =====================================================
// LOGISTICS LYNX SUPER ADMIN - AUTHENTICATION API
// Created by MCP 302 Agents - Phase 2B API Development
// Timestamp: 2025-01-20T21:30:00.000Z
// =====================================================

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { createResponse, createErrorResponse, validateRequired } from '../../middleware/auth';

export interface LoginRequest {
  email: string;
  password: string;
  remember?: boolean;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    first_name?: string;
    last_name?: string;
    avatar_url?: string;
    organization_id: string;
    organization_name: string;
    roles: Array<{
      id: string;
      name: string;
      permissions: string[];
    }>;
  };
  session: {
    access_token: string;
    refresh_token: string;
    expires_at: number;
  };
}

/**
 * POST /api/auth/login
 * Authenticate user and return session
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: LoginRequest = await request.json();

    // Validate required fields
    const missing = validateRequired(body, ['email', 'password']);
    if (missing.length > 0) {
      return createErrorResponse(
        `Missing required fields: ${missing.join(', ')}`,
        400
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return createErrorResponse('Invalid email format', 400);
    }

    // Authenticate with Supabase
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: body.email,
      password: body.password
    });

    if (authError) {
      console.error('Authentication error:', authError);
      
      // Don't expose specific error details for security
      if (authError.message.includes('Invalid login credentials')) {
        return createErrorResponse('Invalid email or password', 401);
      }
      
      return createErrorResponse('Authentication failed', 401);
    }

    if (!authData.user || !authData.session) {
      return createErrorResponse('Authentication failed', 401);
    }

    // Get user details with organization and roles
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
      .eq('id', authData.user.id)
      .single();

    if (userError || !userData) {
      console.error('User data fetch error:', userError);
      return createErrorResponse('User data not found', 404);
    }

    // Check if user is active
    if (!userData.is_active) {
      return createErrorResponse('Account is inactive', 403);
    }

    // Check if organization is active
    if (!userData.organization_name) {
      return createErrorResponse('Organization not found or inactive', 403);
    }

    // Update last login time
    await supabase
      .from('users')
      .update({ last_login_at: new Date().toISOString() })
      .eq('id', authData.user.id);

    // Create session record
    await supabase
      .from('sessions')
      .insert({
        user_id: authData.user.id,
        session_token: authData.session.access_token,
        device_info: {
          userAgent: request.headers.get('user-agent'),
          platform: request.headers.get('sec-ch-ua-platform'),
          language: request.headers.get('accept-language')
        },
        ip_address: request.ip || request.headers.get('x-forwarded-for'),
        user_agent: request.headers.get('user-agent'),
        expires_at: new Date(authData.session.expires_at * 1000).toISOString()
      });

    // Transform user data
    const userResponse = {
      id: userData.id,
      email: userData.email,
      first_name: userData.first_name,
      last_name: userData.last_name,
      avatar_url: userData.avatar_url,
      organization_id: userData.organization_id,
      organization_name: userData.organization_name,
      roles: userData.roles?.map((role: any) => ({
        id: role.id,
        name: role.name,
        permissions: role.permissions?.map((rp: any) => rp.permission.name) || []
      })) || []
    };

    const sessionResponse = {
      access_token: authData.session.access_token,
      refresh_token: authData.session.refresh_token,
      expires_at: authData.session.expires_at
    };

    // Log successful login
    await supabase
      .from('audit_logs')
      .insert({
        organization_id: userData.organization_id,
        user_id: userData.id,
        action: 'login',
        resource_type: 'authentication',
        details: {
          method: 'password',
          remember: body.remember || false
        },
        ip_address: request.ip || request.headers.get('x-forwarded-for'),
        user_agent: request.headers.get('user-agent')
      });

    return createResponse<LoginResponse>(
      {
        user: userResponse,
        session: sessionResponse
      },
      'Login successful'
    );

  } catch (error) {
    console.error('Login error:', error);
    return createErrorResponse('Internal server error', 500);
  }
}
