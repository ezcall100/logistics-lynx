// =====================================================
// LOGISTICS LYNX SUPER ADMIN - SYSTEM ALERTS API
// Created by MCP 302 Agents - Phase 2B API Development
// Timestamp: 2025-01-20T21:30:00.000Z
// =====================================================

import { NextRequest, NextResponse } from 'next/server';
import { APIDatabaseService, APIUtils } from '../lib/database';
import { withAuth, createResponse, createErrorResponse, validateRequired, parsePagination } from '../middleware/auth';

export interface CreateAlertRequest {
  title: string;
  description?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  alert_type: string;
  source_system?: string;
  metric_name?: string;
  threshold_value?: number;
  current_value?: number;
  metadata?: Record<string, any>;
}

export interface UpdateAlertRequest {
  status?: 'active' | 'acknowledged' | 'resolved';
  acknowledged_by?: string;
  resolution_notes?: string;
}

/**
 * GET /api/system/alerts
 * Get system alerts with filtering
 */
export const GET = withAuth(
  async (request) => {
    try {
      const { page, limit } = parsePagination(request);
      const queryParams = APIUtils.parseQueryParams(request);

      // Build filters
      const filters: Record<string, any> = {};

      if (queryParams.status) {
        filters.status = queryParams.status;
      }
      if (queryParams.severity) {
        filters.severity = queryParams.severity;
      }
      if (queryParams.alert_type) {
        filters.alert_type = queryParams.alert_type;
      }
      if (queryParams.source_system) {
        filters.source_system = queryParams.source_system;
      }
      if (queryParams.acknowledged_by) {
        filters.acknowledged_by = queryParams.acknowledged_by;
      }

      // Date range filtering
      if (queryParams.start_date) {
        filters.created_at = `gte.${queryParams.start_date}`;
      }
      if (queryParams.end_date) {
        filters.created_at = filters.created_at 
          ? `${filters.created_at},lte.${queryParams.end_date}`
          : `lte.${queryParams.end_date}`;
      }

      const result = await APIDatabaseService.getPaginatedData(
        'system_alerts',
        request,
        {
          page,
          limit,
          orderBy: queryParams.orderBy || 'created_at',
          orderDirection: queryParams.orderDirection || 'desc',
          filters,
          select: `
            *,
            acknowledged_by_user:users!acknowledged_by(
              id,
              first_name,
              last_name,
              email
            )
          `
        }
      );

      // Get alert statistics
      const stats = await APIDatabaseService.getAggregatedData(
        'system_alerts',
        'severity, status, count(*) as count',
        'severity, status',
        request.organizationId,
        queryParams.start_date ? { created_at: `gte.${queryParams.start_date}` } : {}
      );

      const response = {
        alerts: result.data,
        statistics: stats.reduce((acc: any, stat: any) => {
          const key = `${stat.severity}_${stat.status}`;
          acc[key] = parseInt(stat.count);
          return acc;
        }, {}),
        pagination: result.pagination
      };

      return createResponse(
        response,
        'System alerts retrieved successfully'
      );

    } catch (error) {
      console.error('Get system alerts error:', error);
      return createErrorResponse('Failed to retrieve system alerts', 500);
    }
  },
  {
    permission: 'system.view',
    rateLimit: { requests: 200, windowMs: 60000 },
    audit: { action: 'view', resourceType: 'system_alerts' }
  }
);

/**
 * POST /api/system/alerts
 * Create new system alert
 */
export const POST = withAuth(
  async (request) => {
    try {
      const body: CreateAlertRequest = await request.json();

      // Validate required fields
      const missing = validateRequired(body, ['title', 'severity', 'alert_type']);
      if (missing.length > 0) {
        return createErrorResponse(
          `Missing required fields: ${missing.join(', ')}`,
          400
        );
      }

      // Validate severity
      const validSeverities = ['low', 'medium', 'high', 'critical'];
      if (!validSeverities.includes(body.severity)) {
        return createErrorResponse('Invalid severity level', 400);
      }

      const alertData = {
        title: body.title,
        description: body.description,
        severity: body.severity,
        status: 'active',
        alert_type: body.alert_type,
        source_system: body.source_system,
        metric_name: body.metric_name,
        threshold_value: body.threshold_value,
        current_value: body.current_value
      };

      const newAlert = await APIDatabaseService.create(
        'system_alerts',
        alertData,
        request.organizationId
      );

      // TODO: Trigger real-time notification
      // TODO: Send email/SMS notifications for critical alerts
      // TODO: Update n8n workflow for alert processing

      return createResponse(
        newAlert,
        'System alert created successfully',
        undefined,
        201
      );

    } catch (error) {
      console.error('Create system alert error:', error);
      return createErrorResponse('Failed to create system alert', 500);
    }
  },
  {
    permission: 'system.manage',
    rateLimit: { requests: 100, windowMs: 60000 },
    audit: { action: 'create', resourceType: 'system_alerts' }
  }
);

/**
 * PUT /api/system/alerts/bulk
 * Bulk update alerts (acknowledge, resolve, etc.)
 */
export const PUT = withAuth(
  async (request) => {
    try {
      const body = await request.json();

      if (!body.alert_ids || !Array.isArray(body.alert_ids) || body.alert_ids.length === 0) {
        return createErrorResponse('alert_ids array is required', 400);
      }

      if (!body.action || !['acknowledge', 'resolve', 'reactivate'].includes(body.action)) {
        return createErrorResponse('Valid action is required (acknowledge, resolve, reactivate)', 400);
      }

      const updateData: any = {};

      switch (body.action) {
        case 'acknowledge':
          updateData.status = 'acknowledged';
          updateData.acknowledged_by = request.user.id;
          updateData.acknowledged_at = new Date().toISOString();
          break;
        case 'resolve':
          updateData.status = 'resolved';
          updateData.resolved_at = new Date().toISOString();
          if (body.resolution_notes) {
            updateData.resolution_notes = body.resolution_notes;
          }
          break;
        case 'reactivate':
          updateData.status = 'active';
          updateData.acknowledged_by = null;
          updateData.acknowledged_at = null;
          updateData.resolved_at = null;
          break;
      }

      // Bulk update alerts
      const updates = body.alert_ids.map((id: string) => ({ id, data: updateData }));
      const results = await APIDatabaseService.bulkUpdate(
        'system_alerts',
        updates,
        request.organizationId
      );

      return createResponse(
        { 
          updated_count: results.length,
          alert_ids: body.alert_ids,
          action: body.action
        },
        `Successfully ${body.action}d ${results.length} alerts`
      );

    } catch (error) {
      console.error('Bulk update alerts error:', error);
      return createErrorResponse('Failed to update alerts', 500);
    }
  },
  {
    permission: 'system.manage',
    rateLimit: { requests: 50, windowMs: 60000 },
    audit: { action: 'bulk_update', resourceType: 'system_alerts' }
  }
);
