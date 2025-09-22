// =====================================================
// LOGISTICS LYNX SUPER ADMIN - AI CHAT API
// Created by MCP 302 Agents - Phase 2C AI Integration
// Timestamp: 2025-01-20T22:00:00.000Z
// =====================================================

import { NextRequest, NextResponse } from 'next/server';
import { AIService } from '@/lib/ai/openai';
import { withAuth, createResponse, createErrorResponse, validateRequired } from '../../middleware/auth';
import { APIDatabaseService } from '../../lib/database';

export interface ChatRequest {
  message: string;
  context?: {
    module?: string;
    filters?: Record<string, any>;
    include_data?: boolean;
  };
}

export interface ChatResponse {
  response: string;
  intent: string;
  entities: string[];
  actions: Array<{
    type: 'query' | 'action' | 'alert';
    description: string;
    parameters: Record<string, any>;
  }>;
  data?: any;
  suggestions?: string[];
}

/**
 * POST /api/ai/chat
 * Process natural language queries with AI
 */
export const POST = withAuth(
  async (request) => {
    try {
      const body: ChatRequest = await request.json();

      // Validate required fields
      const missing = validateRequired(body, ['message']);
      if (missing.length > 0) {
        return createErrorResponse(
          `Missing required fields: ${missing.join(', ')}`,
          400
        );
      }

      // Get available data sources based on user permissions
      const availableData = await getAvailableDataSources(request.user);

      // Process the natural language query
      const aiResponse = await AIService.processNaturalLanguageQuery(
        body.message,
        {
          user: request.user,
          organizationId: request.organizationId,
          availableData
        }
      );

      // Execute any suggested actions if requested
      let actionResults = {};
      if (body.context?.include_data && aiResponse.actions.length > 0) {
        actionResults = await executeAIActions(
          aiResponse.actions,
          request.organizationId,
          request.user
        );
      }

      // Generate follow-up suggestions
      const suggestions = await generateFollowUpSuggestions(aiResponse.intent, aiResponse.entities);

      const response: ChatResponse = {
        response: aiResponse.response,
        intent: aiResponse.intent,
        entities: aiResponse.entities,
        actions: aiResponse.actions,
        data: actionResults,
        suggestions
      };

      return createResponse(
        response,
        'AI query processed successfully'
      );

    } catch (error) {
      console.error('AI chat error:', error);
      return createErrorResponse('Failed to process AI query', 500);
    }
  },
  {
    permission: 'ai.view',
    rateLimit: { requests: 100, windowMs: 60000 },
    audit: { action: 'ai_chat', resourceType: 'ai_assistant' }
  }
);

/**
 * Get available data sources based on user permissions
 */
async function getAvailableDataSources(user: any): Promise<string[]> {
  const dataSources = [];

  // Check permissions and add available data sources
  if (user.roles.some((role: any) => role.permissions.includes('users.view'))) {
    dataSources.push('users', 'user_roles', 'sessions');
  }
  if (user.roles.some((role: any) => role.permissions.includes('system.view'))) {
    dataSources.push('system_metrics', 'system_alerts', 'system_logs');
  }
  if (user.roles.some((role: any) => role.permissions.includes('security.view'))) {
    dataSources.push('security_incidents', 'security_policies', 'audit_logs');
  }
  if (user.roles.some((role: any) => role.permissions.includes('crm.view'))) {
    dataSources.push('contacts', 'opportunities');
  }
  if (user.roles.some((role: any) => role.permissions.includes('tickets.view'))) {
    dataSources.push('support_tickets');
  }

  return dataSources;
}

/**
 * Execute AI-suggested actions
 */
async function executeAIActions(
  actions: Array<{
    type: 'query' | 'action' | 'alert';
    description: string;
    parameters: Record<string, any>;
  }>,
  organizationId: string,
  user: any
): Promise<Record<string, any>> {
  const results: Record<string, any> = {};

  for (const action of actions) {
    try {
      switch (action.type) {
        case 'query':
          if (action.parameters.table) {
            const data = await APIDatabaseService.getPaginatedData(
              action.parameters.table,
              { organizationId, user } as any,
              {
                page: 1,
                limit: 20,
                filters: action.parameters.filters || {},
                select: action.parameters.select || '*'
              }
            );
            results[action.description] = data.data;
          }
          break;

        case 'action':
          // Execute specific actions based on parameters
          if (action.parameters.action === 'create_alert') {
            // Create system alert
            const alertData = {
              title: action.parameters.title,
              description: action.parameters.description,
              severity: action.parameters.severity || 'medium',
              alert_type: action.parameters.alert_type || 'manual',
              source_system: 'ai_assistant'
            };

            const alert = await APIDatabaseService.create(
              'system_alerts',
              alertData,
              organizationId
            );
            results[action.description] = alert;
          }
          break;

        case 'alert':
          // Handle alert-based actions
          if (action.parameters.alert_action === 'acknowledge') {
            // Acknowledge alerts
            const alertIds = action.parameters.alert_ids || [];
            if (alertIds.length > 0) {
              const updates = alertIds.map((id: string) => ({
                id,
                data: {
                  status: 'acknowledged',
                  acknowledged_by: user.id,
                  acknowledged_at: new Date().toISOString()
                }
              }));

              const updatedAlerts = await APIDatabaseService.bulkUpdate(
                'system_alerts',
                updates,
                organizationId
              );
              results[action.description] = updatedAlerts;
            }
          }
          break;

        default:
          console.warn(`Unknown action type: ${action.type}`);
      }
    } catch (error) {
      console.error(`Error executing AI action: ${action.description}`, error);
      results[action.description] = { error: 'Action execution failed' };
    }
  }

  return results;
}

/**
 * Generate follow-up suggestions based on intent and entities
 */
async function generateFollowUpSuggestions(intent: string, entities: string[]): Promise<string[]> {
  const suggestions: string[] = [];

  // Intent-based suggestions
  switch (intent) {
    case 'view_users':
      suggestions.push(
        'Show me users with high activity',
        'List users by department',
        'Find inactive users'
      );
      break;

    case 'view_system_health':
      suggestions.push(
        'Show me system performance trends',
        'What are the current system alerts?',
        'Analyze resource utilization'
      );
      break;

    case 'security_analysis':
      suggestions.push(
        'Check for security incidents',
        'Review recent login attempts',
        'Analyze user access patterns'
      );
      break;

    case 'performance_analysis':
      suggestions.push(
        'Show me slow queries',
        'Analyze database performance',
        'Check API response times'
      );
      break;

    default:
      suggestions.push(
        'What can you help me with?',
        'Show me system overview',
        'Analyze recent activity'
      );
  }

  // Entity-based suggestions
  if (entities.includes('users')) {
    suggestions.push('Show user activity summary');
  }
  if (entities.includes('alerts')) {
    suggestions.push('Acknowledge all critical alerts');
  }
  if (entities.includes('performance')) {
    suggestions.push('Generate performance report');
  }

  return suggestions.slice(0, 5); // Limit to 5 suggestions
}
