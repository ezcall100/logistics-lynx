// =====================================================
// LOGISTICS LYNX SUPER ADMIN - AI AGENTS MANAGEMENT API
// Created by MCP 302 Agents - Phase 2C AI Integration
// Timestamp: 2025-01-20T22:00:00.000Z
// =====================================================

import { NextRequest, NextResponse } from 'next/server';
import { AIAgentManager } from '@/lib/ai/openai';
import { withAuth, createResponse, createErrorResponse, validateRequired, parsePagination } from '../../middleware/auth';
import { APIDatabaseService } from '../../lib/database';

export interface AgentRegistrationRequest {
  agent_id: string;
  name: string;
  description: string;
  type: 'threat_detection' | 'system_analysis' | 'optimization' | 'incident_response' | 'custom';
  capabilities: string[];
  configuration: Record<string, any>;
  permissions: string[];
  schedule?: {
    enabled: boolean;
    interval: string;
    timezone: string;
  };
}

export interface AgentTaskRequest {
  task: string;
  context: Record<string, any>;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  timeout?: number;
}

export interface AgentStatusResponse {
  agents: Array<{
    id: string;
    name: string;
    type: string;
    status: 'active' | 'inactive' | 'processing' | 'error';
    last_active: string;
    capabilities: string[];
    tasks_completed: number;
    success_rate: number;
    avg_response_time: number;
    error_count: number;
    configuration: Record<string, any>;
  }>;
  summary: {
    total_agents: number;
    active_agents: number;
    processing_agents: number;
    error_agents: number;
    total_tasks_completed: number;
    overall_success_rate: number;
  };
}

/**
 * GET /api/ai/agents
 * Get AI agents status and information
 */
export const GET = withAuth(
  async (request) => {
    try {
      const { page, limit } = parsePagination(request);
      const queryParams = new URL(request.url).searchParams;

      // Get agents from database
      const agents = await APIDatabaseService.getPaginatedData(
        'ai_agents',
        request,
        {
          page,
          limit,
          orderBy: 'last_active_at',
          orderDirection: 'desc',
          filters: {
            is_active: queryParams.get('active_only') === 'true' ? true : undefined
          },
          select: `
            *,
            tasks:ai_agent_tasks(
              id,
              task_type,
              status,
              started_at,
              completed_at,
              result
            )
          `
        }
      );

      // Get agent statistics
      const stats = await APIDatabaseService.getAggregatedData(
        'ai_agents',
        'status, count(*) as count',
        'status',
        request.organizationId,
        { is_active: true }
      );

      const taskStats = await APIDatabaseService.getAggregatedData(
        'ai_agent_tasks',
        'status, count(*) as count',
        'status',
        request.organizationId
      );

      // Calculate summary statistics
      const summary = {
        total_agents: agents.count,
        active_agents: stats.find((s: any) => s.status === 'active')?.count || 0,
        processing_agents: stats.find((s: any) => s.status === 'processing')?.count || 0,
        error_agents: stats.find((s: any) => s.status === 'error')?.count || 0,
        total_tasks_completed: taskStats.find((s: any) => s.status === 'completed')?.count || 0,
        overall_success_rate: calculateOverallSuccessRate(taskStats)
      };

      // Enhance agent data with runtime statistics
      const enhancedAgents = agents.data.map((agent: any) => {
        const tasks = agent.tasks || [];
        const completedTasks = tasks.filter((t: any) => t.status === 'completed');
        const failedTasks = tasks.filter((t: any) => t.status === 'failed');
        
        return {
          id: agent.id,
          name: agent.name,
          type: agent.type,
          status: agent.status,
          last_active: agent.last_active_at,
          capabilities: agent.capabilities,
          tasks_completed: completedTasks.length,
          success_rate: tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0,
          avg_response_time: calculateAvgResponseTime(completedTasks),
          error_count: failedTasks.length,
          configuration: agent.configuration
        };
      });

      const response: AgentStatusResponse = {
        agents: enhancedAgents,
        summary
      };

      return createResponse(
        response,
        'AI agents status retrieved successfully',
        { pagination: agents.pagination }
      );

    } catch (error) {
      console.error('Get AI agents error:', error);
      return createErrorResponse('Failed to retrieve AI agents status', 500);
    }
  },
  {
    permission: 'ai.view',
    rateLimit: { requests: 100, windowMs: 60000 },
    audit: { action: 'view', resourceType: 'ai_agents' }
  }
);

/**
 * POST /api/ai/agents
 * Register new AI agent
 */
export const POST = withAuth(
  async (request) => {
    try {
      const body: AgentRegistrationRequest = await request.json();

      // Validate required fields
      const missing = validateRequired(body, ['agent_id', 'name', 'type', 'capabilities']);
      if (missing.length > 0) {
        return createErrorResponse(
          `Missing required fields: ${missing.join(', ')}`,
          400
        );
      }

      // Check if agent already exists
      const existingAgent = await APIDatabaseService.getById(
        'ai_agents',
        body.agent_id,
        request.organizationId,
        'id'
      );

      if (existingAgent) {
        return createErrorResponse('Agent with this ID already exists', 409);
      }

      // Validate agent type
      const validTypes = ['threat_detection', 'system_analysis', 'optimization', 'incident_response', 'custom'];
      if (!validTypes.includes(body.type)) {
        return createErrorResponse('Invalid agent type', 400);
      }

      // Create agent record
      const agentData = {
        agent_id: body.agent_id,
        name: body.name,
        description: body.description,
        type: body.type,
        capabilities: body.capabilities,
        configuration: body.configuration,
        permissions: body.permissions,
        schedule: body.schedule || { enabled: false },
        status: 'active',
        is_active: true
      };

      const newAgent = await APIDatabaseService.create(
        'ai_agents',
        agentData,
        request.organizationId
      );

      // Register agent with AIAgentManager
      AIAgentManager.registerAgent(body.agent_id, {
        type: body.type,
        description: body.description,
        capabilities: body.capabilities,
        configuration: body.configuration
      });

      return createResponse(
        newAgent,
        'AI agent registered successfully',
        undefined,
        201
      );

    } catch (error) {
      console.error('Register AI agent error:', error);
      return createErrorResponse('Failed to register AI agent', 500);
    }
  },
  {
    permission: 'ai.manage',
    rateLimit: { requests: 20, windowMs: 60000 },
    audit: { action: 'create', resourceType: 'ai_agents' }
  }
);

/**
 * PUT /api/ai/agents/{id}/task
 * Execute task on specific AI agent
 */
export const PUT = withAuth(
  async (request) => {
    try {
      const agentId = request.nextUrl.pathname.split('/').pop();
      const body: AgentTaskRequest = await request.json();

      if (!agentId) {
        return createErrorResponse('Agent ID is required', 400);
      }

      // Validate required fields
      const missing = validateRequired(body, ['task', 'context']);
      if (missing.length > 0) {
        return createErrorResponse(
          `Missing required fields: ${missing.join(', ')}`,
          400
        );
      }

      // Check if agent exists and is active
      const agent = await APIDatabaseService.getById(
        'ai_agents',
        agentId,
        request.organizationId,
        '*'
      );

      if (!agent) {
        return createErrorResponse('Agent not found', 404);
      }

      if (!agent.is_active || agent.status !== 'active') {
        return createErrorResponse('Agent is not active', 400);
      }

      // Create task record
      const taskData = {
        agent_id: agentId,
        task_type: 'manual',
        task_description: body.task,
        context: body.context,
        priority: body.priority || 'medium',
        status: 'pending',
        created_by: request.user.id
      };

      const task = await APIDatabaseService.create(
        'ai_agent_tasks',
        taskData,
        request.organizationId
      );

      // Execute task asynchronously
      executeAgentTaskAsync(agentId, body, request.organizationId, task.id);

      return createResponse(
        {
          task_id: task.id,
          agent_id: agentId,
          status: 'pending',
          message: 'Task submitted successfully'
        },
        'Task submitted to AI agent successfully'
      );

    } catch (error) {
      console.error('Execute AI agent task error:', error);
      return createErrorResponse('Failed to execute AI agent task', 500);
    }
  },
  {
    permission: 'ai.manage',
    rateLimit: { requests: 50, windowMs: 60000 },
    audit: { action: 'execute_task', resourceType: 'ai_agents' }
  }
);

/**
 * DELETE /api/ai/agents/{id}
 * Deactivate AI agent
 */
export const DELETE = withAuth(
  async (request) => {
    try {
      const agentId = request.nextUrl.pathname.split('/').pop();

      if (!agentId) {
        return createErrorResponse('Agent ID is required', 400);
      }

      // Check if agent exists
      const agent = await APIDatabaseService.getById(
        'ai_agents',
        agentId,
        request.organizationId,
        'id'
      );

      if (!agent) {
        return createErrorResponse('Agent not found', 404);
      }

      // Deactivate agent
      await APIDatabaseService.update(
        'ai_agents',
        agentId,
        { is_active: false, status: 'inactive' },
        request.organizationId
      );

      return createResponse(
        { agent_id: agentId },
        'AI agent deactivated successfully'
      );

    } catch (error) {
      console.error('Deactivate AI agent error:', error);
      return createErrorResponse('Failed to deactivate AI agent', 500);
    }
  },
  {
    permission: 'ai.manage',
    rateLimit: { requests: 20, windowMs: 60000 },
    audit: { action: 'deactivate', resourceType: 'ai_agents' }
  }
);

/**
 * Execute agent task asynchronously
 */
async function executeAgentTaskAsync(
  agentId: string,
  taskRequest: AgentTaskRequest,
  organizationId: string,
  taskId: string
) {
  try {
    // Update task status to processing
    await APIDatabaseService.update(
      'ai_agent_tasks',
      taskId,
      {
        status: 'processing',
        started_at: new Date().toISOString()
      },
      organizationId
    );

    // Execute task using AIAgentManager
    const result = await AIAgentManager.executeAgentTask(
      agentId,
      taskRequest.task,
      taskRequest.context
    );

    // Update task status to completed
    await APIDatabaseService.update(
      'ai_agent_tasks',
      taskId,
      {
        status: 'completed',
        completed_at: new Date().toISOString(),
        result: result
      },
      organizationId
    );

    // Update agent last active time
    await APIDatabaseService.update(
      'ai_agents',
      agentId,
      { last_active_at: new Date().toISOString() },
      organizationId
    );

  } catch (error) {
    console.error(`Error executing agent task ${taskId}:`, error);

    // Update task status to failed
    try {
      await APIDatabaseService.update(
        'ai_agent_tasks',
        taskId,
        {
          status: 'failed',
          completed_at: new Date().toISOString(),
          error_message: error instanceof Error ? error.message : 'Unknown error'
        },
        organizationId
      );
    } catch (updateError) {
      console.error('Error updating failed task status:', updateError);
    }
  }
}

/**
 * Calculate overall success rate
 */
function calculateOverallSuccessRate(taskStats: any[]): number {
  const completed = taskStats.find((s: any) => s.status === 'completed')?.count || 0;
  const failed = taskStats.find((s: any) => s.status === 'failed')?.count || 0;
  const total = completed + failed;
  
  return total > 0 ? (completed / total) * 100 : 0;
}

/**
 * Calculate average response time
 */
function calculateAvgResponseTime(completedTasks: any[]): number {
  if (completedTasks.length === 0) return 0;

  const totalTime = completedTasks.reduce((sum: number, task: any) => {
    if (task.started_at && task.completed_at) {
      const start = new Date(task.started_at).getTime();
      const end = new Date(task.completed_at).getTime();
      return sum + (end - start);
    }
    return sum;
  }, 0);

  return totalTime / completedTasks.length; // Average time in milliseconds
}
