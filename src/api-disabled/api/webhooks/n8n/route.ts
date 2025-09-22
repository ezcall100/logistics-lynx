// =====================================================
// LOGISTICS LYNX SUPER ADMIN - N8N WEBHOOK HANDLER
// Created by MCP 302 Agents - Phase 2D n8n Integration
// Timestamp: 2025-01-20T22:30:00.000Z
// =====================================================

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { createResponse, createErrorResponse, validateRequired } from '../../../middleware/auth';

export interface N8NWebhookPayload {
  event: string;
  data: any;
  timestamp: string;
  source: string;
  organization_id: string;
  workflow_id?: string;
  execution_id?: string;
}

/**
 * POST /api/webhooks/n8n
 * Handle webhook callbacks from n8n workflows
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: N8NWebhookPayload = await request.json();

    // Validate required fields
    const missing = validateRequired(body, ['event', 'data', 'organization_id']);
    if (missing.length > 0) {
      return createErrorResponse(
        `Missing required fields: ${missing.join(', ')}`,
        400
      );
    }

    // Verify organization exists
    const { data: organization, error: orgError } = await supabase
      .from('organizations')
      .select('id')
      .eq('id', body.organization_id)
      .single();

    if (orgError || !organization) {
      return createErrorResponse('Invalid organization ID', 400);
    }

    // Process webhook based on event type
    const result = await processWebhookEvent(body);

    // Log webhook event
    await logWebhookEvent(body, result);

    return createResponse(
      result,
      'Webhook processed successfully'
    );

  } catch (error) {
    console.error('N8N webhook processing error:', error);
    return createErrorResponse('Failed to process webhook', 500);
  }
}

/**
 * Process webhook event based on event type
 */
async function processWebhookEvent(payload: N8NWebhookPayload): Promise<any> {
  const { event, data, organization_id, workflow_id, execution_id } = payload;

  switch (event) {
    case 'workflow_started':
      return await handleWorkflowStarted(data, organization_id, workflow_id, execution_id);

    case 'workflow_completed':
      return await handleWorkflowCompleted(data, organization_id, workflow_id, execution_id);

    case 'workflow_failed':
      return await handleWorkflowFailed(data, organization_id, workflow_id, execution_id);

    case 'security_alert_created':
      return await handleSecurityAlertCreated(data, organization_id);

    case 'system_optimization_completed':
      return await handleSystemOptimizationCompleted(data, organization_id);

    case 'deployment_started':
      return await handleDeploymentStarted(data, organization_id);

    case 'deployment_completed':
      return await handleDeploymentCompleted(data, organization_id);

    case 'deployment_failed':
      return await handleDeploymentFailed(data, organization_id);

    case 'ai_analysis_completed':
      return await handleAIAnalysisCompleted(data, organization_id);

    case 'notification_sent':
      return await handleNotificationSent(data, organization_id);

    default:
      console.warn(`Unknown webhook event type: ${event}`);
      return { status: 'ignored', reason: 'Unknown event type' };
  }
}

/**
 * Handle workflow started event
 */
async function handleWorkflowStarted(
  data: any,
  organizationId: string,
  workflowId?: string,
  executionId?: string
): Promise<any> {
  try {
    // Update workflow execution status
    if (executionId) {
      await supabase
        .from('workflow_executions')
        .update({
          status: 'running',
          started_at: new Date().toISOString(),
          n8n_execution_id: executionId
        })
        .eq('id', executionId)
        .eq('organization_id', organizationId);
    }

    // Create system alert for workflow start
    await supabase
      .from('system_alerts')
      .insert({
        organization_id: organizationId,
        title: `Workflow Started: ${data.workflow_name || 'Unknown'}`,
        description: `Workflow execution started at ${new Date().toISOString()}`,
        severity: 'low',
        status: 'active',
        alert_type: 'workflow',
        source_system: 'n8n',
        metadata: {
          workflow_id: workflowId,
          execution_id: executionId,
          workflow_data: data
        }
      });

    return { status: 'processed', action: 'workflow_started' };
  } catch (error) {
    console.error('Error handling workflow started:', error);
    return { status: 'error', error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Handle workflow completed event
 */
async function handleWorkflowCompleted(
  data: any,
  organizationId: string,
  workflowId?: string,
  executionId?: string
): Promise<any> {
  try {
    // Update workflow execution status
    if (executionId) {
      await supabase
        .from('workflow_executions')
        .update({
          status: 'success',
          completed_at: new Date().toISOString(),
          output_data: data,
          execution_time: data.execution_time || 0
        })
        .eq('id', executionId)
        .eq('organization_id', organizationId);
    }

    // Create system alert for workflow completion
    await supabase
      .from('system_alerts')
      .insert({
        organization_id: organizationId,
        title: `Workflow Completed: ${data.workflow_name || 'Unknown'}`,
        description: `Workflow execution completed successfully in ${data.execution_time || 0}ms`,
        severity: 'low',
        status: 'active',
        alert_type: 'workflow',
        source_system: 'n8n',
        metadata: {
          workflow_id: workflowId,
          execution_id: executionId,
          workflow_data: data
        }
      });

    return { status: 'processed', action: 'workflow_completed' };
  } catch (error) {
    console.error('Error handling workflow completed:', error);
    return { status: 'error', error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Handle workflow failed event
 */
async function handleWorkflowFailed(
  data: any,
  organizationId: string,
  workflowId?: string,
  executionId?: string
): Promise<any> {
  try {
    // Update workflow execution status
    if (executionId) {
      await supabase
        .from('workflow_executions')
        .update({
          status: 'error',
          completed_at: new Date().toISOString(),
          error_message: data.error_message || 'Unknown error',
          execution_time: data.execution_time || 0
        })
        .eq('id', executionId)
        .eq('organization_id', organizationId);
    }

    // Create high-priority system alert for workflow failure
    await supabase
      .from('system_alerts')
      .insert({
        organization_id: organizationId,
        title: `Workflow Failed: ${data.workflow_name || 'Unknown'}`,
        description: `Workflow execution failed: ${data.error_message || 'Unknown error'}`,
        severity: 'high',
        status: 'active',
        alert_type: 'workflow',
        source_system: 'n8n',
        metadata: {
          workflow_id: workflowId,
          execution_id: executionId,
          workflow_data: data,
          error_details: data.error_details
        }
      });

    return { status: 'processed', action: 'workflow_failed' };
  } catch (error) {
    console.error('Error handling workflow failed:', error);
    return { status: 'error', error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Handle security alert created event
 */
async function handleSecurityAlertCreated(data: any, organizationId: string): Promise<any> {
  try {
    // Create security incident
    const { data: incident, error } = await supabase
      .from('security_incidents')
      .insert({
        organization_id: organizationId,
        title: data.title || 'Security Alert Created',
        description: data.description || 'A security alert was created via workflow',
        severity: data.severity || 'medium',
        status: 'open',
        incident_type: 'workflow_generated',
        affected_systems: data.affected_systems || [],
        metadata: {
          workflow_data: data,
          auto_created: true
        }
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating security incident:', error);
      return { status: 'error', error: error.message };
    }

    return { status: 'processed', action: 'security_incident_created', incident_id: incident.id };
  } catch (error) {
    console.error('Error handling security alert created:', error);
    return { status: 'error', error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Handle system optimization completed event
 */
async function handleSystemOptimizationCompleted(data: any, organizationId: string): Promise<any> {
  try {
    // Save optimization report
    const { data: report, error } = await supabase
      .from('system_reports')
      .insert({
        organization_id: organizationId,
        report_type: 'optimization',
        title: 'System Optimization Report',
        data: data,
        generated_at: new Date().toISOString(),
        generated_by: 'workflow'
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving optimization report:', error);
      return { status: 'error', error: error.message };
    }

    // Create system alert for optimization insights
    if (data.insights && data.insights.length > 0) {
      const highPriorityInsights = data.insights.filter((i: any) => 
        i.priority === 'high' || i.priority === 'critical'
      );

      if (highPriorityInsights.length > 0) {
        await supabase
          .from('system_alerts')
          .insert({
            organization_id: organizationId,
            title: `System Optimization: ${highPriorityInsights.length} High Priority Insights`,
            description: `Found ${highPriorityInsights.length} high priority optimization opportunities`,
            severity: 'medium',
            status: 'active',
            alert_type: 'optimization',
            source_system: 'n8n',
            metadata: {
              report_id: report.id,
              insights: highPriorityInsights
            }
          });
      }
    }

    return { status: 'processed', action: 'optimization_completed', report_id: report.id };
  } catch (error) {
    console.error('Error handling system optimization completed:', error);
    return { status: 'error', error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Handle deployment started event
 */
async function handleDeploymentStarted(data: any, organizationId: string): Promise<any> {
  try {
    // Create deployment record
    const { data: deployment, error } = await supabase
      .from('deployments')
      .insert({
        organization_id: organizationId,
        deployment_name: data.deployment_name || 'Workflow Deployment',
        environment: data.environment || 'staging',
        status: 'in_progress',
        started_at: new Date().toISOString(),
        metadata: {
          workflow_data: data,
          triggered_by: 'workflow'
        }
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating deployment record:', error);
      return { status: 'error', error: error.message };
    }

    return { status: 'processed', action: 'deployment_started', deployment_id: deployment.id };
  } catch (error) {
    console.error('Error handling deployment started:', error);
    return { status: 'error', error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Handle deployment completed event
 */
async function handleDeploymentCompleted(data: any, organizationId: string): Promise<any> {
  try {
    // Update deployment record
    const { data: deployment, error } = await supabase
      .from('deployments')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
        metadata: {
          workflow_data: data,
          deployment_successful: true
        }
      })
      .eq('organization_id', organizationId)
      .eq('deployment_name', data.deployment_name)
      .select()
      .single();

    if (error) {
      console.error('Error updating deployment record:', error);
      return { status: 'error', error: error.message };
    }

    return { status: 'processed', action: 'deployment_completed', deployment_id: deployment.id };
  } catch (error) {
    console.error('Error handling deployment completed:', error);
    return { status: 'error', error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Handle deployment failed event
 */
async function handleDeploymentFailed(data: any, organizationId: string): Promise<any> {
  try {
    // Update deployment record
    const { data: deployment, error } = await supabase
      .from('deployments')
      .update({
        status: 'failed',
        completed_at: new Date().toISOString(),
        error_message: data.error_message || 'Deployment failed',
        metadata: {
          workflow_data: data,
          deployment_successful: false
        }
      })
      .eq('organization_id', organizationId)
      .eq('deployment_name', data.deployment_name)
      .select()
      .single();

    if (error) {
      console.error('Error updating deployment record:', error);
      return { status: 'error', error: error.message };
    }

    // Create high-priority alert for deployment failure
    await supabase
      .from('system_alerts')
      .insert({
        organization_id: organizationId,
        title: `Deployment Failed: ${data.deployment_name || 'Unknown'}`,
        description: `Deployment to ${data.environment || 'unknown environment'} failed: ${data.error_message || 'Unknown error'}`,
        severity: 'high',
        status: 'active',
        alert_type: 'deployment',
        source_system: 'n8n',
        metadata: {
          deployment_id: deployment.id,
          workflow_data: data
        }
      });

    return { status: 'processed', action: 'deployment_failed', deployment_id: deployment.id };
  } catch (error) {
    console.error('Error handling deployment failed:', error);
    return { status: 'error', error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Handle AI analysis completed event
 */
async function handleAIAnalysisCompleted(data: any, organizationId: string): Promise<any> {
  try {
    // Save AI analysis results
    const { data: analysis, error } = await supabase
      .from('ai_analysis_results')
      .insert({
        organization_id: organizationId,
        analysis_type: data.analysis_type || 'general',
        results: data.results || {},
        confidence_score: data.confidence_score || 0,
        completed_at: new Date().toISOString(),
        metadata: {
          workflow_data: data
        }
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving AI analysis results:', error);
      return { status: 'error', error: error.message };
    }

    return { status: 'processed', action: 'ai_analysis_completed', analysis_id: analysis.id };
  } catch (error) {
    console.error('Error handling AI analysis completed:', error);
    return { status: 'error', error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Handle notification sent event
 */
async function handleNotificationSent(data: any, organizationId: string): Promise<any> {
  try {
    // Log notification
    await supabase
      .from('notification_logs')
      .insert({
        organization_id: organizationId,
        notification_type: data.notification_type || 'general',
        channel: data.channel || 'unknown',
        recipient: data.recipient || 'unknown',
        message: data.message || '',
        status: data.status || 'sent',
        sent_at: new Date().toISOString(),
        metadata: {
          workflow_data: data
        }
      });

    return { status: 'processed', action: 'notification_sent' };
  } catch (error) {
    console.error('Error handling notification sent:', error);
    return { status: 'error', error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Log webhook event
 */
async function logWebhookEvent(payload: N8NWebhookPayload, result: any): Promise<void> {
  try {
    await supabase
      .from('webhook_logs')
      .insert({
        organization_id: payload.organization_id,
        webhook_type: 'n8n',
        event_type: payload.event,
        payload: payload,
        result: result,
        processed_at: new Date().toISOString(),
        ip_address: null,
        user_agent: null
      });
  } catch (error) {
    console.error('Error logging webhook event:', error);
  }
}
