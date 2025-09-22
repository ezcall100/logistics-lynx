// =====================================================
// LOGISTICS LYNX SUPER ADMIN - SYSTEM METRICS API
// Created by MCP 302 Agents - Phase 2B API Development
// Timestamp: 2025-01-20T21:30:00.000Z
// =====================================================

import { NextRequest, NextResponse } from 'next/server';
import { APIDatabaseService, APIUtils } from '../lib/database';
import { withAuth, createResponse, createErrorResponse, parsePagination } from '../middleware/auth';

export interface SystemMetricsResponse {
  metrics: Array<{
    id: string;
    metric_type: string;
    metric_name: string;
    value: number;
    unit: string;
    tags: Record<string, any>;
    timestamp: string;
  }>;
  summary: {
    total_metrics: number;
    time_range: {
      start: string;
      end: string;
    };
    metric_types: string[];
  };
}

/**
 * GET /api/system/metrics
 * Get system metrics with filtering and aggregation
 */
export const GET = withAuth(
  async (request) => {
    try {
      const { page, limit } = parsePagination(request);
      const queryParams = APIUtils.parseQueryParams(request);

      // Parse time range (default to last 24 hours)
      const now = new Date();
      const defaultStart = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      
      const startTime = queryParams.start_time ? new Date(queryParams.start_time) : defaultStart;
      const endTime = queryParams.end_time ? new Date(queryParams.end_time) : now;

      // Build filters
      const filters: Record<string, any> = {
        timestamp: `gte.${startTime.toISOString()},lte.${endTime.toISOString()}`
      };

      if (queryParams.metric_type) {
        filters.metric_type = queryParams.metric_type;
      }
      if (queryParams.metric_name) {
        filters.metric_name = queryParams.metric_name;
      }
      if (queryParams.tags) {
        // Handle tag filtering - this would need custom query logic
        filters.tags = queryParams.tags;
      }

      // Get metrics data
      const result = await APIDatabaseService.getPaginatedData(
        'system_metrics',
        request,
        {
          page,
          limit,
          orderBy: queryParams.orderBy || 'timestamp',
          orderDirection: queryParams.orderDirection || 'desc',
          filters,
          select: '*'
        }
      );

      // Get aggregated summary data
      const summaryData = await APIDatabaseService.getAggregatedData(
        'system_metrics',
        'metric_type, count(*) as count, avg(value) as avg_value, min(value) as min_value, max(value) as max_value',
        'metric_type',
        request.organizationId,
        {
          timestamp: `gte.${startTime.toISOString()},lte.${endTime.toISOString()}`
        }
      );

      // Get unique metric types
      const metricTypes = [...new Set(result.data.map((m: any) => m.metric_type))];

      const response: SystemMetricsResponse = {
        metrics: result.data,
        summary: {
          total_metrics: result.count,
          time_range: {
            start: startTime.toISOString(),
            end: endTime.toISOString()
          },
          metric_types: metricTypes
        }
      };

      return createResponse(
        response,
        'System metrics retrieved successfully',
        { pagination: result.pagination }
      );

    } catch (error) {
      console.error('Get system metrics error:', error);
      return createErrorResponse('Failed to retrieve system metrics', 500);
    }
  },
  {
    permission: 'system.view',
    rateLimit: { requests: 200, windowMs: 60000 },
    audit: { action: 'view', resourceType: 'system_metrics' }
  }
);

/**
 * POST /api/system/metrics
 * Create new system metric (for external integrations)
 */
export const POST = withAuth(
  async (request) => {
    try {
      const body = await request.json();

      // Validate required fields
      if (!body.metric_type || !body.metric_name || body.value === undefined) {
        return createErrorResponse('Missing required fields: metric_type, metric_name, value', 400);
      }

      // Validate metric value is numeric
      if (typeof body.value !== 'number' || isNaN(body.value)) {
        return createErrorResponse('Metric value must be a valid number', 400);
      }

      const metricData = {
        metric_type: body.metric_type,
        metric_name: body.metric_name,
        value: body.value,
        unit: body.unit || null,
        tags: body.tags || {},
        timestamp: body.timestamp || new Date().toISOString()
      };

      const newMetric = await APIDatabaseService.create(
        'system_metrics',
        metricData,
        request.organizationId
      );

      return createResponse(
        newMetric,
        'System metric created successfully',
        undefined,
        201
      );

    } catch (error) {
      console.error('Create system metric error:', error);
      return createErrorResponse('Failed to create system metric', 500);
    }
  },
  {
    permission: 'system.manage',
    rateLimit: { requests: 1000, windowMs: 60000 },
    audit: { action: 'create', resourceType: 'system_metrics' }
  }
);
