// =====================================================
// LOGISTICS LYNX SUPER ADMIN - AI SYSTEM OPTIMIZATION API
// Created by MCP 302 Agents - Phase 2C AI Integration
// Timestamp: 2025-01-20T22:00:00.000Z
// =====================================================

import { NextRequest, NextResponse } from 'next/server';
import { AIService } from '@/lib/ai/openai';
import { withAuth, createResponse, createErrorResponse, parsePagination } from '../../middleware/auth';
import { APIDatabaseService } from '../../lib/database';

export interface OptimizationRequest {
  analysis_type?: 'performance' | 'security' | 'cost' | 'comprehensive';
  time_range?: {
    start: string;
    end: string;
  };
  include_recommendations?: boolean;
  priority_focus?: 'performance' | 'security' | 'cost' | 'user_experience';
}

export interface OptimizationResponse {
  insights: Array<{
    insight_type: 'performance' | 'security' | 'usage' | 'anomaly';
    title: string;
    description: string;
    impact: 'positive' | 'negative' | 'neutral';
    confidence: number;
    actionable: boolean;
    recommendations: string[];
    metrics: Record<string, number>;
    priority: 'low' | 'medium' | 'high' | 'critical';
  }>;
  recommendations: Array<{
    category: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    title: string;
    description: string;
    impact: string;
    effort: 'low' | 'medium' | 'high';
    roi_estimate: string;
    steps: string[];
    automation_possible: boolean;
  }>;
  summary: {
    overall_health: number;
    key_improvements: string[];
    risk_factors: string[];
    performance_score: number;
    security_score: number;
    efficiency_score: number;
  };
  metrics: {
    current_performance: Record<string, number>;
    historical_trends: Record<string, any[]>;
    benchmarks: Record<string, number>;
  };
}

/**
 * POST /api/ai/optimization
 * Run AI-powered system optimization analysis
 */
export const POST = withAuth(
  async (request) => {
    try {
      const body: OptimizationRequest = await request.json();

      // Parse time range (default to last 7 days)
      const now = new Date();
      const defaultStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      
      const startTime = body.time_range?.start ? new Date(body.time_range.start) : defaultStart;
      const endTime = body.time_range?.end ? new Date(body.time_range.end) : now;

      // Collect system data for analysis
      const systemData = await collectSystemData(
        request.organizationId,
        startTime,
        endTime,
        body.analysis_type || 'comprehensive'
      );

      // Run AI optimization analysis
      const optimizationResult = await AIService.generateOptimizationRecommendations(
        systemData,
        request.organizationId
      );

      // Get system insights
      const insights = await AIService.analyzeSystemMetrics(
        systemData.metrics,
        request.organizationId
      );

      // Enhance insights with priority and metrics
      const enhancedInsights = await enhanceInsights(insights, systemData, request.organizationId);

      // Calculate system health scores
      const healthScores = calculateHealthScores(systemData, insights);

      // Get performance metrics and trends
      const performanceMetrics = await getPerformanceMetrics(
        request.organizationId,
        startTime,
        endTime
      );

      const response: OptimizationResponse = {
        insights: enhancedInsights,
        recommendations: optimizationResult.recommendations,
        summary: {
          ...optimizationResult.summary,
          ...healthScores
        },
        metrics: performanceMetrics
      };

      return createResponse(
        response,
        'System optimization analysis completed successfully'
      );

    } catch (error) {
      console.error('AI optimization analysis error:', error);
      return createErrorResponse('Failed to run optimization analysis', 500);
    }
  },
  {
    permission: 'system.view',
    rateLimit: { requests: 5, windowMs: 600000 }, // 5 requests per 10 minutes
    audit: { action: 'optimization_analysis', resourceType: 'system_optimization' }
  }
);

/**
 * GET /api/ai/optimization
 * Get optimization recommendations and system health status
 */
export const GET = withAuth(
  async (request) => {
    try {
      const { page, limit } = parsePagination(request);

      // Get recent optimization insights from database
      const insights = await APIDatabaseService.getPaginatedData(
        'system_metrics',
        request,
        {
          page,
          limit,
          orderBy: 'timestamp',
          orderDirection: 'desc',
          filters: {
            metric_type: 'optimization_insight'
          },
          select: '*'
        }
      );

      // Get current system health metrics
      const healthMetrics = await getCurrentHealthMetrics(request.organizationId);

      // Get optimization recommendations
      const recommendations = await getStoredRecommendations(request.organizationId);

      return createResponse(
        {
          insights: insights.data,
          recommendations,
          health_metrics: healthMetrics,
          pagination: insights.pagination
        },
        'Optimization data retrieved successfully'
      );

    } catch (error) {
      console.error('Get optimization data error:', error);
      return createErrorResponse('Failed to retrieve optimization data', 500);
    }
  },
  {
    permission: 'system.view',
    rateLimit: { requests: 50, windowMs: 60000 },
    audit: { action: 'view', resourceType: 'system_optimization' }
  }
);

/**
 * Collect comprehensive system data for analysis
 */
async function collectSystemData(
  organizationId: string,
  startTime: Date,
  endTime: Date,
  analysisType: string
): Promise<any> {
  try {
    // Collect metrics data
    const metricsData = await APIDatabaseService.getAggregatedData(
      'system_metrics',
      'metric_type, metric_name, avg(value) as avg_value, min(value) as min_value, max(value) as max_value, count(*) as data_points',
      'metric_type, metric_name',
      organizationId,
      {
        timestamp: `gte.${startTime.toISOString()},lte.${endTime.toISOString()}`
      }
    );

    // Collect alerts data
    const alertsData = await APIDatabaseService.getPaginatedData(
      'system_alerts',
      { organizationId, user: {} } as any,
      {
        page: 1,
        limit: 100,
        filters: {
          created_at: `gte.${startTime.toISOString()},lte.${endTime.toISOString()}`
        },
        select: '*'
      }
    );

    // Collect user activity data
    const userData = await APIDatabaseService.getAggregatedData(
      'users',
      'count(*) as total_users, count(case when is_active then 1 end) as active_users',
      null,
      organizationId
    );

    // Collect audit logs for activity analysis
    const auditData = await APIDatabaseService.getAggregatedData(
      'audit_logs',
      'action, count(*) as action_count',
      'action',
      organizationId,
      {
        created_at: `gte.${startTime.toISOString()},lte.${endTime.toISOString()}`
      }
    );

    // Collect performance data
    const performanceData = await getPerformanceData(organizationId, startTime, endTime);

    return {
      metrics: metricsData,
      alerts: alertsData.data,
      users: userData,
      audit_logs: auditData,
      performance: performanceData,
      analysis_type: analysisType,
      time_range: {
        start: startTime.toISOString(),
        end: endTime.toISOString()
      }
    };
  } catch (error) {
    console.error('Error collecting system data:', error);
    return {
      metrics: [],
      alerts: [],
      users: [],
      audit_logs: [],
      performance: {},
      analysis_type: analysisType,
      time_range: {
        start: startTime.toISOString(),
        end: endTime.toISOString()
      }
    };
  }
}

/**
 * Enhance insights with priority and additional metrics
 */
async function enhanceInsights(
  insights: any[],
  systemData: any,
  organizationId: string
): Promise<any[]> {
  return insights.map(insight => {
    // Calculate priority based on impact and confidence
    let priority = 'low';
    if (insight.impact === 'negative' && insight.confidence > 0.8) {
      priority = 'critical';
    } else if (insight.impact === 'negative' && insight.confidence > 0.6) {
      priority = 'high';
    } else if (insight.impact === 'negative' || insight.confidence > 0.7) {
      priority = 'medium';
    }

    // Add additional metrics based on insight type
    const enhancedMetrics = { ...insight.metrics };
    
    if (insight.insight_type === 'performance') {
      enhancedMetrics.cpu_usage = systemData.metrics.find((m: any) => m.metric_name === 'cpu_usage')?.avg_value || 0;
      enhancedMetrics.memory_usage = systemData.metrics.find((m: any) => m.metric_name === 'memory_usage')?.avg_value || 0;
      enhancedMetrics.response_time = systemData.metrics.find((m: any) => m.metric_name === 'response_time')?.avg_value || 0;
    }

    if (insight.insight_type === 'security') {
      enhancedMetrics.failed_logins = systemData.audit_logs.find((a: any) => a.action === 'login_failed')?.action_count || 0;
      enhancedMetrics.security_alerts = systemData.alerts.filter((a: any) => a.alert_type === 'security').length;
    }

    return {
      ...insight,
      priority,
      metrics: enhancedMetrics
    };
  });
}

/**
 * Calculate system health scores
 */
function calculateHealthScores(systemData: any, insights: any[]): any {
  let performanceScore = 100;
  let securityScore = 100;
  let efficiencyScore = 100;

  // Calculate performance score based on metrics
  const cpuUsage = systemData.metrics.find((m: any) => m.metric_name === 'cpu_usage')?.avg_value || 0;
  const memoryUsage = systemData.metrics.find((m: any) => m.metric_name === 'memory_usage')?.avg_value || 0;
  const responseTime = systemData.metrics.find((m: any) => m.metric_name === 'response_time')?.avg_value || 0;

  if (cpuUsage > 80) performanceScore -= 20;
  else if (cpuUsage > 60) performanceScore -= 10;

  if (memoryUsage > 85) performanceScore -= 20;
  else if (memoryUsage > 70) performanceScore -= 10;

  if (responseTime > 2000) performanceScore -= 15;
  else if (responseTime > 1000) performanceScore -= 8;

  // Calculate security score based on alerts and insights
  const securityAlerts = systemData.alerts.filter((a: any) => a.alert_type === 'security').length;
  const securityInsights = insights.filter(i => i.insight_type === 'security' && i.impact === 'negative').length;

  securityScore -= securityAlerts * 5;
  securityScore -= securityInsights * 10;

  // Calculate efficiency score based on user activity and system usage
  const totalUsers = systemData.users[0]?.total_users || 0;
  const activeUsers = systemData.users[0]?.active_users || 0;
  const userActivityRatio = totalUsers > 0 ? activeUsers / totalUsers : 1;

  efficiencyScore = userActivityRatio * 100;
  efficiencyScore -= securityAlerts * 3;
  efficiencyScore -= insights.filter(i => i.insight_type === 'anomaly').length * 5;

  return {
    performance_score: Math.max(0, Math.min(100, performanceScore)),
    security_score: Math.max(0, Math.min(100, securityScore)),
    efficiency_score: Math.max(0, Math.min(100, efficiencyScore))
  };
}

/**
 * Get performance metrics and trends
 */
async function getPerformanceMetrics(
  organizationId: string,
  startTime: Date,
  endTime: Date
): Promise<any> {
  try {
    // Get current performance metrics
    const currentMetrics = await APIDatabaseService.getAggregatedData(
      'system_metrics',
      'metric_name, avg(value) as current_value',
      'metric_name',
      organizationId,
      {
        timestamp: `gte.${new Date(Date.now() - 60 * 60 * 1000).toISOString()}`
      }
    );

    // Get historical trends (hourly averages)
    const trends = await APIDatabaseService.getAggregatedData(
      'system_metrics',
      'metric_name, date_trunc(\'hour\', timestamp) as hour, avg(value) as avg_value',
      'metric_name, hour',
      organizationId,
      {
        timestamp: `gte.${startTime.toISOString()},lte.${endTime.toISOString()}`
      }
    );

    // Define benchmarks
    const benchmarks = {
      cpu_usage: 70,
      memory_usage: 80,
      response_time: 1000,
      error_rate: 1,
      throughput: 1000
    };

    return {
      current_performance: currentMetrics.reduce((acc: any, metric: any) => {
        acc[metric.metric_name] = metric.current_value;
        return acc;
      }, {}),
      historical_trends: trends.reduce((acc: any, trend: any) => {
        if (!acc[trend.metric_name]) acc[trend.metric_name] = [];
        acc[trend.metric_name].push({
          timestamp: trend.hour,
          value: trend.avg_value
        });
        return acc;
      }, {}),
      benchmarks
    };
  } catch (error) {
    console.error('Error getting performance metrics:', error);
    return {
      current_performance: {},
      historical_trends: {},
      benchmarks: {}
    };
  }
}

/**
 * Get current health metrics
 */
async function getCurrentHealthMetrics(organizationId: string): Promise<any> {
  try {
    const metrics = await APIDatabaseService.getAggregatedData(
      'system_metrics',
      'metric_type, count(*) as count, avg(value) as avg_value',
      'metric_type',
      organizationId,
      {
        timestamp: `gte.${new Date(Date.now() - 60 * 60 * 1000).toISOString()}`
      }
    );

    return metrics.reduce((acc: any, metric: any) => {
      acc[metric.metric_type] = {
        count: metric.count,
        avg_value: metric.avg_value
      };
      return acc;
    }, {});
  } catch (error) {
    console.error('Error getting current health metrics:', error);
    return {};
  }
}

/**
 * Get stored recommendations
 */
async function getStoredRecommendations(organizationId: string): Promise<any[]> {
  try {
    // This would typically come from a recommendations table
    // For now, return a placeholder
    return [
      {
        category: 'Performance',
        priority: 'high',
        title: 'Optimize Database Queries',
        description: 'Several slow queries detected that could be optimized',
        impact: 'Reduce response time by 30%',
        effort: 'medium',
        roi_estimate: 'High ROI - 2-3 weeks payback',
        steps: [
          'Identify slow queries in system logs',
          'Add database indexes for frequently accessed columns',
          'Optimize query structure and joins',
          'Implement query result caching'
        ],
        automation_possible: true
      }
    ];
  } catch (error) {
    console.error('Error getting stored recommendations:', error);
    return [];
  }
}

/**
 * Get performance data
 */
async function getPerformanceData(
  organizationId: string,
  startTime: Date,
  endTime: Date
): Promise<any> {
  try {
    const performanceMetrics = await APIDatabaseService.getAggregatedData(
      'system_metrics',
      'metric_name, avg(value) as avg_value, max(value) as max_value, min(value) as min_value',
      'metric_name',
      organizationId,
      {
        timestamp: `gte.${startTime.toISOString()},lte.${endTime.toISOString()}`,
        metric_type: 'performance'
      }
    );

    return performanceMetrics.reduce((acc: any, metric: any) => {
      acc[metric.metric_name] = {
        avg: metric.avg_value,
        max: metric.max_value,
        min: metric.min_value
      };
      return acc;
    }, {});
  } catch (error) {
    console.error('Error getting performance data:', error);
    return {};
  }
}
