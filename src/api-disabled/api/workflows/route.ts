// =====================================================
// LOGISTICS LYNX SUPER ADMIN - N8N WORKFLOW MANAGEMENT API
// Created by MCP 302 Agents - Phase 2D n8n Integration
// Timestamp: 2025-01-20T22:30:00.000Z
// =====================================================

import { NextRequest, NextResponse } from 'next/server';
import { N8NClient, N8NWorkflowTemplates } from '@/lib/n8n/client';
import { withAuth, createResponse, createErrorResponse, validateRequired, parsePagination } from '../../middleware/auth';
import { APIDatabaseService } from '../../lib/database';

export interface CreateWorkflowRequest {
  name: string;
  description?: string;
  template?: 'security_alert' | 'system_optimization' | 'deployment' | 'custom';
  nodes?: any[];
  connections?: Record<string, any[]>;
  settings?: Record<string, any>;
  triggers?: Array<{
    type: 'webhook' | 'schedule' | 'supabase' | 'ai' | 'manual';
    config: Record<string, any>;
  }>;
}

export interface ExecuteWorkflowRequest {
  workflow_id: string;
  data?: any;
  trigger_type?: 'manual' | 'webhook' | 'schedule';
  priority?: 'low' | 'medium' | 'high' | 'critical';
}

/**
 * GET /api/workflows
 * Get all workflows for organization
 */
export const GET = withAuth(
  async (request) => {
    try {
      const { page, limit } = parsePagination(request);
      const queryParams = new URL(request.url).searchParams;

      // Get workflows from database
      const workflows = await APIDatabaseService.getPaginatedData(
        'workflows',
        request,
        {
          page,
          limit,
          orderBy: 'updated_at',
          orderDirection: 'desc',
          filters: {
            is_active: queryParams.get('active_only') === 'true' ? true : undefined,
            workflow_type: queryParams.get('type') || undefined
          },
          select: `
            *,
            executions:workflow_executions(
              id,
              status,
              started_at,
              completed_at,
              error_message
            )
          `
        }
      );

      // Enhance workflow data with execution statistics
      const enhancedWorkflows = workflows.data.map((workflow: any) => {
        const executions = workflow.executions || [];
        const successful = executions.filter((e: any) => e.status === 'success').length;
        const failed = executions.filter((e: any) => e.status === 'error').length;
        const total = executions.length;

        return {
          ...workflow,
          statistics: {
            total_executions: total,
            successful_executions: successful,
            failed_executions: failed,
            success_rate: total > 0 ? (successful / total) * 100 : 0,
            last_execution: executions.length > 0 ? 
              executions.sort((a: any, b: any) => new Date(b.started_at).getTime() - new Date(a.started_at).getTime())[0] : null
          }
        };
      });

      // Get workflow statistics
      const stats = await APIDatabaseService.getAggregatedData(
        'workflows',
        'workflow_type, is_active, count(*) as count',
        'workflow_type, is_active',
        request.organizationId
      );

      const summary = {
        total_workflows: workflows.count,
        active_workflows: stats.filter((s: any) => s.is_active).reduce((sum: number, s: any) => sum + parseInt(s.count), 0),
        inactive_workflows: stats.filter((s: any) => !s.is_active).reduce((sum: number, s: any) => sum + parseInt(s.count), 0),
        workflow_types: stats.reduce((acc: any, stat: any) => {
          if (!acc[stat.workflow_type]) acc[stat.workflow_type] = { active: 0, inactive: 0 };
          if (stat.is_active) acc[stat.workflow_type].active += parseInt(stat.count);
          else acc[stat.workflow_type].inactive += parseInt(stat.count);
          return acc;
        }, {})
      };

      return createResponse(
        {
          workflows: enhancedWorkflows,
          summary,
          pagination: workflows.pagination
        },
        'Workflows retrieved successfully'
      );

    } catch (error) {
      console.error('Get workflows error:', error);
      return createErrorResponse('Failed to retrieve workflows', 500);
    }
  },
  {
    permission: 'workflows.view',
    rateLimit: { requests: 100, windowMs: 60000 },
    audit: { action: 'view', resourceType: 'workflows' }
  }
);

/**
 * POST /api/workflows
 * Create new workflow
 */
export const POST = withAuth(
  async (request) => {
    try {
      const body: CreateWorkflowRequest = await request.json();

      // Validate required fields
      const missing = validateRequired(body, ['name']);
      if (missing.length > 0) {
        return createErrorResponse(
          `Missing required fields: ${missing.join(', ')}`,
          400
        );
      }

      // Create N8N client
      const n8nClient = new N8NClient(request.organizationId);

      let workflowData: any;

      // Use template if specified
      if (body.template && body.template !== 'custom') {
        switch (body.template) {
          case 'security_alert':
            workflowData = N8NWorkflowTemplates.createSecurityAlertWorkflow();
            break;
          case 'system_optimization':
            workflowData = N8NWorkflowTemplates.createSystemOptimizationWorkflow();
            break;
          case 'deployment':
            workflowData = N8NWorkflowTemplates.createDeploymentWorkflow();
            break;
          default:
            return createErrorResponse('Invalid workflow template', 400);
        }

        // Override template data with provided values
        workflowData = {
          ...workflowData,
          name: body.name,
          settings: {
            ...workflowData.settings,
            ...body.settings
          }
        };
      } else {
        // Custom workflow
        workflowData = {
          name: body.name,
          nodes: body.nodes || [],
          connections: body.connections || {},
          settings: body.settings || {},
          active: false
        };
      }

      // Create workflow in N8N
      const n8nWorkflow = await n8nClient.createWorkflow(workflowData);

      // Save workflow to database
      const workflowRecord = {
        workflow_id: n8nWorkflow.id,
        name: body.name,
        description: body.description,
        workflow_type: body.template || 'custom',
        n8n_workflow_data: n8nWorkflow,
        triggers: body.triggers || [],
        is_active: n8nWorkflow.active || false,
        created_by: request.user.id
      };

      const savedWorkflow = await APIDatabaseService.create(
        'workflows',
        workflowRecord,
        request.organizationId
      );

      return createResponse(
        {
          ...savedWorkflow,
          n8n_workflow: n8nWorkflow
        },
        'Workflow created successfully',
        undefined,
        201
      );

    } catch (error) {
      console.error('Create workflow error:', error);
      return createErrorResponse('Failed to create workflow', 500);
    }
  },
  {
    permission: 'workflows.create',
    rateLimit: { requests: 20, windowMs: 60000 },
    audit: { action: 'create', resourceType: 'workflows' }
  }
);

/**
 * PUT /api/workflows/execute
 * Execute workflow manually
 */
export const PUT = withAuth(
  async (request) => {
    try {
      const body: ExecuteWorkflowRequest = await request.json();

      // Validate required fields
      const missing = validateRequired(body, ['workflow_id']);
      if (missing.length > 0) {
        return createErrorResponse(
          `Missing required fields: ${missing.join(', ')}`,
          400
        );
      }

      // Get workflow from database
      const workflow = await APIDatabaseService.getById(
        'workflows',
        body.workflow_id,
        request.organizationId,
        '*'
      );

      if (!workflow) {
        return createErrorResponse('Workflow not found', 404);
      }

      if (!workflow.is_active) {
        return createErrorResponse('Workflow is not active', 400);
      }

      // Create N8N client
      const n8nClient = new N8NClient(request.organizationId);

      // Create execution record
      const executionData = {
        workflow_id: workflow.workflow_id,
        trigger_type: body.trigger_type || 'manual',
        priority: body.priority || 'medium',
        input_data: body.data || {},
        started_by: request.user.id,
        status: 'pending'
      };

      const execution = await APIDatabaseService.create(
        'workflow_executions',
        executionData,
        request.organizationId
      );

      // Execute workflow asynchronously
      executeWorkflowAsync(n8nClient, workflow, body.data, execution.id, request.organizationId);

      return createResponse(
        {
          execution_id: execution.id,
          workflow_id: workflow.workflow_id,
          status: 'pending',
          message: 'Workflow execution started'
        },
        'Workflow execution initiated successfully'
      );

    } catch (error) {
      console.error('Execute workflow error:', error);
      return createErrorResponse('Failed to execute workflow', 500);
    }
  },
  {
    permission: 'workflows.execute',
    rateLimit: { requests: 50, windowMs: 60000 },
    audit: { action: 'execute', resourceType: 'workflows' }
  }
);

/**
 * Execute workflow asynchronously
 */
async function executeWorkflowAsync(
  n8nClient: N8NClient,
  workflow: any,
  data: any,
  executionId: string,
  organizationId: string
) {
  try {
    // Update execution status to running
    await APIDatabaseService.update(
      'workflow_executions',
      executionId,
      {
        status: 'running',
        started_at: new Date().toISOString()
      },
      organizationId
    );

    // Execute workflow in N8N
    const result = await n8nClient.executeWorkflow(workflow.workflow_id, data);

    // Update execution status to completed
    await APIDatabaseService.update(
      'workflow_executions',
      executionId,
      {
        status: 'success',
        completed_at: new Date().toISOString(),
        n8n_execution_id: result.id,
        output_data: result.data,
        execution_time: new Date().getTime() - new Date(result.startedAt).getTime()
      },
      organizationId
    );

  } catch (error) {
    console.error(`Error executing workflow ${executionId}:`, error);

    // Update execution status to failed
    try {
      await APIDatabaseService.update(
        'workflow_executions',
        executionId,
        {
          status: 'error',
          completed_at: new Date().toISOString(),
          error_message: error instanceof Error ? error.message : 'Unknown error',
          execution_time: new Date().getTime() - new Date().getTime()
        },
        organizationId
      );
    } catch (updateError) {
      console.error('Error updating failed execution status:', updateError);
    }
  }
}
