// =====================================================
// LOGISTICS LYNX SUPER ADMIN - TOKEN REFRESH API
// Created by MCP 302 Agents - Phase 2B API Development
// Timestamp: 2025-01-20T21:30:00.000Z
// =====================================================

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { createResponse, createErrorResponse, validateRequired } from '../../middleware/auth';

export interface RefreshRequest {
  refresh_token: string;
}

export interface RefreshResponse {
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

/**
 * POST /api/auth/refresh
 * Refresh access token using refresh token
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: RefreshRequest = await request.json();

    // Validate required fields
    const missing = validateRequired(body, ['refresh_token']);
    if (missing.length > 0) {
      return createErrorResponse(
        `Missing required fields: ${missing.join(', ')}`,
        400
      );
    }

    // Refresh session with Supabase
    const { data: sessionData, error: refreshError } = await supabase.auth.refreshSession({
      refresh_token: body.refresh_token
    });

    if (refreshError) {
      console.error('Token refresh error:', refreshError);
      return createErrorResponse('Invalid or expired refresh token', 401);
    }

    if (!sessionData.session) {
      return createErrorResponse('Failed to refresh session', 401);
    }

    // Update session in database
    await supabase
      .from('sessions')
      .update({
        session_token: sessionData.session.access_token,
        last_activity_at: new Date().toISOString(),
        expires_at: new Date(sessionData.session.expires_at * 1000).toISOString()
      })
      .eq('session_token', sessionData.session.access_token);

    const response: RefreshResponse = {
      access_token: sessionData.session.access_token,
      refresh_token: sessionData.session.refresh_token,
      expires_at: sessionData.session.expires_at
    };

    return createResponse<RefreshResponse>(
      response,
      'Token refreshed successfully'
    );

  } catch (error) {
    console.error('Token refresh error:', error);
    return createErrorResponse('Internal server error', 500);
  }
}
