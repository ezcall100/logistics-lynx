// =====================================================
// LOGISTICS LYNX SUPER ADMIN - USERS API
// Created by MCP 302 Agents - Phase 2B API Development
// Timestamp: 2025-01-20T21:30:00.000Z
// =====================================================

import { NextRequest, NextResponse } from 'next/server';
import { APIDatabaseService, APIUtils } from '../lib/database';
import { withAuth, createResponse, createErrorResponse, validateRequired, parsePagination } from '../middleware/auth';
import { Tables } from '../../../supabase/types';

export interface CreateUserRequest {
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  title?: string;
  department?: string;
  roles: string[];
  send_invitation?: boolean;
}

export interface UpdateUserRequest {
  first_name?: string;
  last_name?: string;
  phone?: string;
  title?: string;
  department?: string;
  timezone?: string;
  locale?: string;
  preferences?: Record<string, any>;
  is_active?: boolean;
}

/**
 * GET /api/users
 * Get paginated list of users
 */
export const GET = withAuth(
  async (request) => {
    try {
      const { page, limit } = parsePagination(request);
      const queryParams = APIUtils.parseQueryParams(request);

      // Build filters
      const filters: Record<string, any> = {};
      
      if (queryParams.search) {
        // For search, we'll use a custom query since we need to search across multiple fields
        const searchResult = await APIDatabaseService.search(
          'users',
          queryParams.search,
          ['first_name', 'last_name', 'email', 'title', 'department'],
          request.organizationId,
          {
            page,
            limit,
            orderBy: queryParams.orderBy || 'created_at',
            orderDirection: queryParams.orderDirection || 'desc',
            select: `
              *,
              roles:user_roles(
                role:roles(
                  id,
                  name,
                  color
                )
              )
            `
          }
        );

        return createResponse(
          searchResult.data,
          'Users retrieved successfully',
          { pagination: searchResult.pagination }
        );
      }

      // Apply other filters
      if (queryParams.is_active !== undefined) {
        filters.is_active = queryParams.is_active === 'true';
      }
      if (queryParams.department) {
        filters.department = queryParams.department;
      }
      if (queryParams.role_id) {
        // Filter by role - this requires a join
        const usersWithRole = await APIDatabaseService.getRelated(
          'user_roles',
          queryParams.role_id,
          'user',
          request.organizationId,
          {
            select: '*',
            filters: { is_active: true }
          }
        );
        
        const userIds = usersWithRole.map((ur: any) => ur.user_id);
        if (userIds.length === 0) {
          return createResponse(
            [],
            'No users found with this role',
            { pagination: { page, limit, total: 0, totalPages: 0 } }
          );
        }
        
        filters.id = userIds;
      }

      const result = await APIDatabaseService.getPaginatedData(
        'users',
        request,
        {
          page,
          limit,
          orderBy: queryParams.orderBy || 'created_at',
          orderDirection: queryParams.orderDirection || 'desc',
          filters,
          select: `
            *,
            roles:user_roles(
              role:roles(
                id,
                name,
                color
              )
            )
          `
        }
      );

      return createResponse(
        result.data,
        'Users retrieved successfully',
        { pagination: result.pagination }
      );

    } catch (error) {
      console.error('Get users error:', error);
      return createErrorResponse('Failed to retrieve users', 500);
    }
  },
  {
    permission: 'users.view',
    rateLimit: { requests: 100, windowMs: 60000 },
    audit: { action: 'view', resourceType: 'users' }
  }
);

/**
 * POST /api/users
 * Create new user
 */
export const POST = withAuth(
  async (request) => {
    try {
      const body: CreateUserRequest = await request.json();

      // Validate required fields
      const missing = validateRequired(body, ['email', 'roles']);
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

      // Check if user already exists
      const existingUser = await APIDatabaseService.getById(
        'users',
        body.email, // Using email as identifier for check
        request.organizationId,
        'id'
      );

      if (existingUser) {
        return createErrorResponse('User with this email already exists', 409);
      }

      // Validate roles exist and are accessible
      const { data: validRoles, error: rolesError } = await request.supabase
        .from('roles')
        .select('id, name')
        .in('id', body.roles)
        .eq('organization_id', request.organizationId);

      if (rolesError || !validRoles || validRoles.length !== body.roles.length) {
        return createErrorResponse('One or more roles are invalid', 400);
      }

      // Create user in Supabase Auth (this would typically be done through an admin function)
      // For now, we'll create the user record and let them set password via invitation
      const userData = {
        email: body.email,
        first_name: body.first_name,
        last_name: body.last_name,
        phone: body.phone,
        title: body.title,
        department: body.department,
        timezone: 'UTC',
        locale: 'en-US',
        preferences: {},
        is_active: true
      };

      const newUser = await APIDatabaseService.create(
        'users',
        userData,
        request.organizationId
      );

      // Assign roles
      const roleAssignments = body.roles.map(roleId => ({
        user_id: newUser.id,
        role_id: roleId,
        assigned_by: request.user.id,
        is_active: true
      }));

      await APIDatabaseService.bulkCreate(
        'user_roles',
        roleAssignments,
        request.organizationId
      );

      // Get the complete user data with roles
      const completeUser = await APIDatabaseService.getById(
        'users',
        newUser.id,
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

      // TODO: Send invitation email if requested
      if (body.send_invitation) {
        // Implement email invitation logic here
        console.log('Sending invitation to:', body.email);
      }

      return createResponse(
        completeUser,
        'User created successfully',
        undefined,
        201
      );

    } catch (error) {
      console.error('Create user error:', error);
      return createErrorResponse('Failed to create user', 500);
    }
  },
  {
    permission: 'users.create',
    rateLimit: { requests: 20, windowMs: 60000 },
    audit: { action: 'create', resourceType: 'users' }
  }
);
