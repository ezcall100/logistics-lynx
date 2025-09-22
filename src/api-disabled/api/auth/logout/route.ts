// =====================================================
// LOGISTICS LYNX SUPER ADMIN - LOGOUT API
// Created by MCP 302 Agents - Phase 2B API Development
// Timestamp: 2025-01-20T21:30:00.000Z
// =====================================================

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { authenticateRequest, createResponse, createErrorResponse, logAuditAction } from '../../middleware/auth';

/**
 * POST /api/auth/logout
 * Logout user and invalidate session
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Authenticate request to get user info
    const authResult = await authenticateRequest(request);
    
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const { user } = authResult;

    // Get authorization header for token
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.split(' ')[1];

    if (token) {
      // Sign out from Supabase (this invalidates the token)
      await supabase.auth.signOut();
    }

    // Remove session from database
    await supabase
      .from('sessions')
      .delete()
      .eq('user_id', user.id)
      .eq('session_token', token);

    // Log logout action
    await logAuditAction(
      user,
      'logout',
      'authentication',
      undefined,
      { method: 'api' },
      request
    );

    return createResponse(
      { message: 'Logged out successfully' },
      'Logout successful'
    );

  } catch (error) {
    console.error('Logout error:', error);
    return createErrorResponse('Internal server error', 500);
  }
}
