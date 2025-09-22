// =====================================================
// LOGISTICS LYNX SUPER ADMIN - WORKFLOW BY ID API
// Created by MCP 302 Agents - Phase 2D n8n Integration
// Timestamp: 2025-01-20T22:30:00.000Z
// =====================================================

import { NextRequest, NextResponse } from 'next/server';
import { N8NClient } from '@/lib/n8n/client';
import { withAuth, createResponse, createErrorResponse, parsePagination } from '../../middleware/auth';
import { APIDatabaseService } from '../../lib/database';

/**
 * GET /api/workflows/[id]
 * Get specific workflow details
 */
export const GET = withAuth(
  async (request) => {
    try {
      const workflowId = request.nextUrl.pathname.split('/').pop();

      if (!workflowId) {
        return createErrorResponse('Workflow ID is required', 400);
      }

      // Get workflow from database
      const workflow = await APIDatabaseService.getById(
        'workflows',
        workflowId,
        request.organizationId,
        `
          *,
          executions:workflow_executions(
            id,
            status,
            trigger_type,
            priority,
            started_at,
            completed_at,
            execution_time,
            error_message,
            started_by_user:users!started_by(
              id,
              first_name,
              last_name,
              email
            )
          )
        `
      );

      if (!workflow) {
        return createErrorResponse('Workflow not found', 404);
      }

      // Get execution statistics
      const executions = workflow.executions || [];
      const successful = executions.filter((e: any) => e.status === 'success').length;
      const failed = executions.filter((e: any) => e.status === 'error').length;
      const total = executions.length;

      const statistics = {
        total_executions: total,
        successful_executions: successful,
        failed_executions: failed,
        success_rate: total > 0 ? (successful / total) * 100 : 0,
        avg_execution_time: executions.length > 0 ? 
          executions.reduce((sum: number, e: any) => sum + (e.execution_time || 0), 0) / executions.length : 0,
        last_execution: executions.length > 0 ? 
          executions.sort((a: any, b: any) => new Date(b.started_at).getTime() - new Date(a.started_at).getTime())[0] : null
      };

      // Get recent executions
      const recentExecutions = executions
        .sort((a: any, b: any) => new Date(b.started_at).getTime() - new Date(a.started_at).getTime())
        .slice(0, 10);

      return createResponse(
        {
          ...workflow,
          statistics,
          recent_executions: recentExecutions
        },
        'Workflow details retrieved successfully'
      );

    } catch (error) {
      console.error('Get workflow error:', error);
      return createErrorResponse('Failed to retrieve workflow details', 500);
    }
  },
  {
    permission: 'workflows.view',
    rateLimit: { requests: 200, windowMs: 60000 },
    audit: { action: 'view', resourceType: 'workflows' }
  }
);

/**
 * PUT /api/workflows/[id]
 * Update workflow
 */
export const PUT = withAuth(
  async (request) => {
    try {
      const workflowId = request.nextUrl.pathname.split('/').pop();
      const body = await request.json();

      if (!workflowId) {
        return createErrorResponse('Workflow ID is required', 400);
      }

      // Check if workflow exists
      const existingWorkflow = await APIDatabaseService.getById(
        'workflows',
        workflowId,
        request.organizationId,
        'id'
      );

      if (!existingWorkflow) {
        return createErrorResponse('Workflow not found', 404);
      }

      // Create N8N client
      const n8nClient = new N8NClient(request.organizationId);

      // Prepare update data
      const updateData: any = {};
      
      if (body.name) updateData.name = body.name;
      if (body.description !== undefined) updateData.description = body.description;
      if (body.nodes) updateData.nodes = body.nodes;
      if (body.connections) updateData.connections = body.connections;
      if (body.settings) updateData.settings = body.settings;
      if (body.is_active !== undefined) updateData.active = body.is_active;

      // Update workflow in N8N
      let n8nWorkflow = null;
      if (Object.keys(updateData).length > 0) {
        const workflow = await APIDatabaseService.getById(
          'workflows',
          workflowId,
          request.organizationId,
          'workflow_id'
        );

        n8nWorkflow = await n8nClient.updateWorkflow(workflow.workflow_id, updateData);
      }

      // Update workflow in database
      const dbUpdateData: any = {
        updated_by: request.user.id
      };

      if (body.name) dbUpdateData.name = body.name;
      if (body.description !== undefined) dbUpdateData.description = body.description;
      if (body.nodes) dbUpdateData.nodes = body.nodes;
      if (body.connections) dbUpdateData.connections = body.connections;
      if (body.settings) dbUpdateData.settings = body.settings;
      if (body.is_active !== undefined) dbUpdateData.is_active = body.is_active;
      if (body.triggers) dbUpdateData.triggers = body.triggers;
      if (n8nWorkflow) dbUpdateData.n8n_workflow_data = n8nWorkflow;

      const updatedWorkflow = await APIDatabaseService.update(
        'workflows',
        workflowId,
        dbUpdateData,
        request.organizationId
      );

      return createResponse(
        {
          ...updatedWorkflow,
          n8n_workflow: n8nWorkflow
        },
        'Workflow updated successfully'
      );

    } catch (error) {
      console.error('Update workflow error:', error);
      return createErrorResponse('Failed to update workflow', 500);
    }
  },
  {
    permission: 'workflows.edit',
    rateLimit: { requests: 50, windowMs: 60000 },
    audit: { action: 'update', resourceType: 'workflows' }
  }
);

/**
 * DELETE /api/workflows/[id]
 * Delete workflow
 */
export const DELETE = withAuth(
  async (request) => {
    try {
      const workflowId = request.nextUrl.pathname.split('/').pop();

      if (!workflowId) {
        return createErrorResponse('Workflow ID is required', 400);
      }

      // Get workflow details
      const workflow = await APIDatabaseService.getById(
        'workflows',
        workflowId,
        request.organizationId,
        'workflow_id'
      );

      if (!workflow) {
        return createErrorResponse('Workflow not found', 404);
      }

      // Create N8N client
      const n8nClient = new N8NClient(request.organizationId);

      // Delete workflow from N8N
      const n8nDeleted = await n8nClient.deleteWorkflow(workflow.workflow_id);

      if (!n8nDeleted) {
        console.warn(`Failed to delete workflow ${workflow.workflow_id} from N8N`);
      }

      // Soft delete workflow from database
      await APIDatabaseService.update(
        'workflows',
        workflowId,
        { 
          is_active: false,
          deleted_at: new Date().toISOString(),
          deleted_by: request.user.id
        },
        request.organizationId
      );

      return createResponse(
        { workflow_id: workflowId },
        'Workflow deleted successfully'
      );

    } catch (error) {
      console.error('Delete workflow error:', error);
      return createErrorResponse('Failed to delete workflow', 500);
    }
  },
  {
    permission: 'workflows.delete',
    rateLimit: { requests: 20, windowMs: 60000 },
    audit: { action: 'delete', resourceType: 'workflows' }
  }
);
