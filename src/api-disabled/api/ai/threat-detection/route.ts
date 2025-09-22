// =====================================================
// LOGISTICS LYNX SUPER ADMIN - AI THREAT DETECTION API
// Created by MCP 302 Agents - Phase 2C AI Integration
// Timestamp: 2025-01-20T22:00:00.000Z
// =====================================================

import { NextRequest, NextResponse } from 'next/server';
import { AIService } from '@/lib/ai/openai';
import { withAuth, createResponse, createErrorResponse, parsePagination } from '../../middleware/auth';
import { APIDatabaseService } from '../../lib/database';

export interface ThreatDetectionRequest {
  time_range?: {
    start: string;
    end: string;
  };
  include_analysis?: boolean;
  auto_create_incidents?: boolean;
}

export interface ThreatDetectionResponse {
  threats: Array<{
    id: string;
    is_threat: boolean;
    threat_type: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    confidence: number;
    description: string;
    recommended_actions: string[];
    source_indicators: string[];
    risk_mitigation: string[];
    detected_at: string;
    status: 'new' | 'investigating' | 'resolved';
  }>;
  summary: {
    total_threats: number;
    critical_threats: number;
    high_threats: number;
    medium_threats: number;
    low_threats: number;
    confidence_avg: number;
    top_threat_types: Array<{
      type: string;
      count: number;
      severity: string;
    }>;
  };
  recommendations: {
    immediate_actions: string[];
    monitoring_improvements: string[];
    security_hardening: string[];
  };
}

/**
 * POST /api/ai/threat-detection
 * Run AI-powered threat detection analysis
 */
export const POST = withAuth(
  async (request) => {
    try {
      const body: ThreatDetectionRequest = await request.json();

      // Parse time range (default to last 24 hours)
      const now = new Date();
      const defaultStart = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      
      const startTime = body.time_range?.start ? new Date(body.time_range.start) : defaultStart;
      const endTime = body.time_range?.end ? new Date(body.time_range.end) : now;

      // Get audit logs and system alerts for analysis
      const [auditLogs, systemAlerts] = await Promise.all([
        getAuditLogsForAnalysis(request.organizationId, startTime, endTime),
        getSystemAlertsForAnalysis(request.organizationId, startTime, endTime)
      ]);

      // Run AI threat detection
      const detectedThreats = await AIService.detectSecurityThreats(
        auditLogs,
        systemAlerts,
        request.organizationId
      );

      // Process and enhance threats with additional context
      const processedThreats = await processDetectedThreats(
        detectedThreats,
        request.organizationId,
        body.auto_create_incidents || false
      );

      // Generate summary statistics
      const summary = generateThreatSummary(processedThreats);

      // Generate recommendations
      const recommendations = await generateThreatRecommendations(
        processedThreats,
        auditLogs,
        systemAlerts,
        request.organizationId
      );

      const response: ThreatDetectionResponse = {
        threats: processedThreats,
        summary,
        recommendations
      };

      return createResponse(
        response,
        `Threat detection completed. Found ${processedThreats.length} potential threats.`
      );

    } catch (error) {
      console.error('AI threat detection error:', error);
      return createErrorResponse('Failed to run threat detection analysis', 500);
    }
  },
  {
    permission: 'security.manage',
    rateLimit: { requests: 10, windowMs: 300000 }, // 10 requests per 5 minutes
    audit: { action: 'threat_detection', resourceType: 'security_analysis' }
  }
);

/**
 * GET /api/ai/threat-detection
 * Get recent threat detection results
 */
export const GET = withAuth(
  async (request) => {
    try {
      const { page, limit } = parsePagination(request);

      // Get recent threat detection results from database
      const threats = await APIDatabaseService.getPaginatedData(
        'security_incidents',
        request,
        {
          page,
          limit,
          orderBy: 'created_at',
          orderDirection: 'desc',
          filters: {
            incident_type: 'ai_detected_threat'
          },
          select: `
            *,
            reported_by_user:users!reported_by(
              id,
              first_name,
              last_name,
              email
            ),
            assigned_to_user:users!assigned_to(
              id,
              first_name,
              last_name,
              email
            )
          `
        }
      );

      // Get summary statistics
      const stats = await APIDatabaseService.getAggregatedData(
        'security_incidents',
        'severity, status, count(*) as count',
        'severity, status',
        request.organizationId,
        {
          incident_type: 'ai_detected_threat',
          created_at: `gte.${new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()}`
        }
      );

      const summary = {
        total_threats: threats.count,
        critical_threats: stats.filter((s: any) => s.severity === 'critical').reduce((sum: number, s: any) => sum + parseInt(s.count), 0),
        high_threats: stats.filter((s: any) => s.severity === 'high').reduce((sum: number, s: any) => sum + parseInt(s.count), 0),
        medium_threats: stats.filter((s: any) => s.severity === 'medium').reduce((sum: number, s: any) => sum + parseInt(s.count), 0),
        low_threats: stats.filter((s: any) => s.severity === 'low').reduce((sum: number, s: any) => sum + parseInt(s.count), 0),
        active_threats: stats.filter((s: any) => s.status === 'open').reduce((sum: number, s: any) => sum + parseInt(s.count), 0)
      };

      return createResponse(
        {
          threats: threats.data,
          summary,
          pagination: threats.pagination
        },
        'Threat detection results retrieved successfully'
      );

    } catch (error) {
      console.error('Get threat detection results error:', error);
      return createErrorResponse('Failed to retrieve threat detection results', 500);
    }
  },
  {
    permission: 'security.view',
    rateLimit: { requests: 50, windowMs: 60000 },
    audit: { action: 'view', resourceType: 'threat_detection' }
  }
);

/**
 * Get audit logs for threat analysis
 */
async function getAuditLogsForAnalysis(
  organizationId: string,
  startTime: Date,
  endTime: Date
): Promise<any[]> {
  try {
    const { data, error } = await supabase
      .from('audit_logs')
      .select('*')
      .eq('organization_id', organizationId)
      .gte('created_at', startTime.toISOString())
      .lte('created_at', endTime.toISOString())
      .order('created_at', { ascending: false })
      .limit(1000); // Limit for performance

    if (error) {
      console.error('Error fetching audit logs:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    return [];
  }
}

/**
 * Get system alerts for threat analysis
 */
async function getSystemAlertsForAnalysis(
  organizationId: string,
  startTime: Date,
  endTime: Date
): Promise<any[]> {
  try {
    const { data, error } = await supabase
      .from('system_alerts')
      .select('*')
      .eq('organization_id', organizationId)
      .gte('created_at', startTime.toISOString())
      .lte('created_at', endTime.toISOString())
      .order('created_at', { ascending: false })
      .limit(500); // Limit for performance

    if (error) {
      console.error('Error fetching system alerts:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching system alerts:', error);
    return [];
  }
}

/**
 * Process detected threats and create incidents if requested
 */
async function processDetectedThreats(
  threats: any[],
  organizationId: string,
  autoCreateIncidents: boolean
): Promise<any[]> {
  const processedThreats = [];

  for (const threat of threats) {
    const threatId = `threat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const processedThreat = {
      id: threatId,
      is_threat: threat.is_threat,
      threat_type: threat.threat_type,
      severity: threat.severity,
      confidence: threat.confidence,
      description: threat.description,
      recommended_actions: threat.recommended_actions,
      source_indicators: threat.source_indicators,
      risk_mitigation: threat.risk_mitigation,
      detected_at: new Date().toISOString(),
      status: 'new' as const
    };

    processedThreats.push(processedThreat);

    // Create security incident if auto-create is enabled and threat is significant
    if (autoCreateIncidents && threat.is_threat && 
        (threat.severity === 'high' || threat.severity === 'critical') &&
        threat.confidence > 0.7) {
      
      try {
        await APIDatabaseService.create(
          'security_incidents',
          {
            title: `AI Detected: ${threat.threat_type}`,
            description: threat.description,
            severity: threat.severity,
            status: 'open',
            incident_type: 'ai_detected_threat',
            affected_systems: threat.source_indicators,
            reported_by: null, // AI-detected
            resolution_notes: `AI Confidence: ${(threat.confidence * 100).toFixed(1)}%`
          },
          organizationId
        );
      } catch (error) {
        console.error('Error creating security incident:', error);
      }
    }
  }

  return processedThreats;
}

/**
 * Generate threat summary statistics
 */
function generateThreatSummary(threats: any[]): any {
  const summary = {
    total_threats: threats.length,
    critical_threats: threats.filter(t => t.severity === 'critical').length,
    high_threats: threats.filter(t => t.severity === 'high').length,
    medium_threats: threats.filter(t => t.severity === 'medium').length,
    low_threats: threats.filter(t => t.severity === 'low').length,
    confidence_avg: threats.length > 0 ? 
      threats.reduce((sum, t) => sum + t.confidence, 0) / threats.length : 0,
    top_threat_types: []
  };

  // Calculate top threat types
  const threatTypeCounts: Record<string, { count: number; severity: string }> = {};
  threats.forEach(threat => {
    if (!threatTypeCounts[threat.threat_type]) {
      threatTypeCounts[threat.threat_type] = { count: 0, severity: threat.severity };
    }
    threatTypeCounts[threat.threat_type].count++;
  });

  summary.top_threat_types = Object.entries(threatTypeCounts)
    .map(([type, data]) => ({ type, ...data }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return summary;
}

/**
 * Generate threat recommendations
 */
async function generateThreatRecommendations(
  threats: any[],
  auditLogs: any[],
  systemAlerts: any[],
  organizationId: string
): Promise<any> {
  const recommendations = {
    immediate_actions: [],
    monitoring_improvements: [],
    security_hardening: []
  };

  // Analyze threats and generate recommendations
  const criticalThreats = threats.filter(t => t.severity === 'critical' || t.severity === 'high');
  
  if (criticalThreats.length > 0) {
    recommendations.immediate_actions.push(
      'Review and investigate all critical and high-severity threats immediately',
      'Implement emergency security measures if data breach is suspected',
      'Notify security team and management of potential security incidents'
    );
  }

  // Check for patterns in audit logs
  const failedLogins = auditLogs.filter(log => 
    log.action === 'login_failed' || log.action === 'authentication_failed'
  );
  
  if (failedLogins.length > 10) {
    recommendations.monitoring_improvements.push(
      'Increase monitoring for failed login attempts',
      'Consider implementing account lockout policies',
      'Review and strengthen password policies'
    );
  }

  // Check for unusual access patterns
  const accessLogs = auditLogs.filter(log => 
    log.action.includes('access') || log.action.includes('view')
  );
  
  if (accessLogs.length > 100) {
    recommendations.security_hardening.push(
      'Implement additional access controls',
      'Review user permissions and role assignments',
      'Consider implementing multi-factor authentication'
    );
  }

  return recommendations;
}
