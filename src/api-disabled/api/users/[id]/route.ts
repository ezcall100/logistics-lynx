// =====================================================
// LOGISTICS LYNX SUPER ADMIN - USER BY ID API
// Created by MCP 302 Agents - Phase 2B API Development
// Timestamp: 2025-01-20T21:30:00.000Z
// =====================================================

import { NextRequest, NextResponse } from 'next/server';
import { APIDatabaseService } from '../../lib/database';
import { withAuth, createResponse, createErrorResponse } from '../../middleware/auth';

/**
 * GET /api/users/[id]
 * Get user by ID
 */
export const GET = withAuth(
  async (request) => {
    try {
      const userId = request.nextUrl.pathname.split('/').pop();

      if (!userId) {
        return createErrorResponse('User ID is required', 400);
      }

      const user = await APIDatabaseService.getById(
        'users',
        userId,
        request.organizationId,
        `
          *,
          roles:user_roles(
            role:roles(
              id,
              name,
              description,
              color,
              permissions:role_permissions(
                permission:permissions(
                  name,
                  module,
                  action,
                  resource
                )
              )
            )
          )
        `
      );

      if (!user) {
        return createErrorResponse('User not found', 404);
      }

      return createResponse(
        user,
        'User retrieved successfully'
      );

    } catch (error) {
      console.error('Get user error:', error);
      return createErrorResponse('Failed to retrieve user', 500);
    }
  },
  {
    permission: 'users.view',
    rateLimit: { requests: 200, windowMs: 60000 },
    audit: { action: 'view', resourceType: 'users' }
  }
);

/**
 * PUT /api/users/[id]
 * Update user
 */
export const PUT = withAuth(
  async (request) => {
    try {
      const userId = request.nextUrl.pathname.split('/').pop();
      const body = await request.json();

      if (!userId) {
        return createErrorResponse('User ID is required', 400);
      }

      // Check if user exists
      const existingUser = await APIDatabaseService.getById(
        'users',
        userId,
        request.organizationId,
        'id'
      );

      if (!existingUser) {
        return createErrorResponse('User not found', 404);
      }

      // Sanitize input data
      const updateData = {
        first_name: body.first_name,
        last_name: body.last_name,
        phone: body.phone,
        title: body.title,
        department: body.department,
        timezone: body.timezone,
        locale: body.locale,
        preferences: body.preferences,
        is_active: body.is_active
      };

      // Remove undefined values
      Object.keys(updateData).forEach(key => {
        if (updateData[key as keyof typeof updateData] === undefined) {
          delete updateData[key as keyof typeof updateData];
        }
      });

      const updatedUser = await APIDatabaseService.update(
        'users',
        userId,
        updateData,
        request.organizationId
      );

      // Get complete user data with roles
      const completeUser = await APIDatabaseService.getById(
        'users',
        userId,
        request.organizationId,
        `
          *,
          roles:user_roles(
            role:roles(
              id,
              name,
              color
            )
          )
        `
      );

      return createResponse(
        completeUser,
        'User updated successfully'
      );

    } catch (error) {
      console.error('Update user error:', error);
      return createErrorResponse('Failed to update user', 500);
    }
  },
  {
    permission: 'users.edit',
    rateLimit: { requests: 50, windowMs: 60000 },
    audit: { action: 'update', resourceType: 'users' }
  }
);

/**
 * DELETE /api/users/[id]
 * Delete user (soft delete by setting is_active to false)
 */
export const DELETE = withAuth(
  async (request) => {
    try {
      const userId = request.nextUrl.pathname.split('/').pop();

      if (!userId) {
        return createErrorResponse('User ID is required', 400);
      }

      // Prevent self-deletion
      if (userId === request.user.id) {
        return createErrorResponse('Cannot delete your own account', 400);
      }

      // Check if user exists
      const existingUser = await APIDatabaseService.getById(
        'users',
        userId,
        request.organizationId,
        'id'
      );

      if (!existingUser) {
        return createErrorResponse('User not found', 404);
      }

      // Soft delete by setting is_active to false
      await APIDatabaseService.update(
        'users',
        userId,
        { is_active: false },
        request.organizationId
      );

      return createResponse(
        { id: userId },
        'User deactivated successfully'
      );

    } catch (error) {
      console.error('Delete user error:', error);
      return createErrorResponse('Failed to delete user', 500);
    }
  },
  {
    permission: 'users.delete',
    rateLimit: { requests: 20, windowMs: 60000 },
    audit: { action: 'delete', resourceType: 'users' }
  }
);
