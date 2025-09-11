import React, { useState, useEffect } from 'react';

interface Portal {
  id: string;
  name: string;
  category: 'Core TMS' | 'Business Operations' | 'Admin & Specialized';
  progress: number;
  status: 'planning' | 'development' | 'testing' | 'deployment' | 'complete';
  agentsAssigned: number;
  estimatedCompletion: string;
  blockers: string[];
  lastUpdate: string;
  priority: 'high' | 'medium' | 'low';
  health: 'excellent' | 'good' | 'warning' | 'critical';
}

interface AgentStatus {
  total: number;
  active: number;
  maintenance: number;
  error: number;
  efficiency: number;
}

function MCPProgressDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [overallProgress, setOverallProgress] = useState(0);
  const [agentStatus, setAgentStatus] = useState<AgentStatus>({
    total: 250,
    active: 250,
    maintenance: 0,
    error: 0,
    efficiency: 0,
  });

  const [portals, setPortals] = useState<Portal[]>([
    // Core TMS Portals
    {
      id: 'customer',
      name: 'Customer Portal',
      category: 'Core TMS',
      progress: 0,
      status: 'planning',
      agentsAssigned: 12,
      estimatedCompletion: 'Oct 15, 2025',
      blockers: ['FINAL ENTERPRISE STARTER KIT STATUS CONFIRMED'],
      lastUpdate: 'Just now',
      priority: 'high',
      health: 'excellent',
    },
    {
      id: 'broker',
      name: 'Broker Portal',
      category: 'Core TMS',
      progress: 0,
      status: 'planning',
      agentsAssigned: 15,
      estimatedCompletion: 'Oct 15, 2025',
      blockers: ['FINAL ENTERPRISE STARTER KIT STATUS CONFIRMED'],
      lastUpdate: 'Just now',
      priority: 'high',
      health: 'excellent',
    },
    {
      id: 'carrier',
      name: 'Carrier Portal',
      category: 'Core TMS',
      progress: 0,
      status: 'planning',
      agentsAssigned: 18,
      estimatedCompletion: 'Oct 15, 2025',
      blockers: ['FINAL ENTERPRISE STARTER KIT STATUS CONFIRMED'],
      lastUpdate: 'Just now',
      priority: 'high',
      health: 'excellent',
    },
    {
      id: 'driver',
      name: 'Driver Portal',
      category: 'Core TMS',
      progress: 0,
      status: 'planning',
      agentsAssigned: 20,
      estimatedCompletion: 'Oct 15, 2025',
      blockers: ['FINAL ENTERPRISE STARTER KIT STATUS CONFIRMED'],
      lastUpdate: 'Just now',
      priority: 'high',
      health: 'excellent',
    },
    {
      id: 'shipper',
      name: 'Shipper Portal',
      category: 'Core TMS',
      progress: 0,
      status: 'planning',
      agentsAssigned: 16,
      estimatedCompletion: 'Oct 15, 2025',
      blockers: ['FINAL ENTERPRISE STARTER KIT STATUS CONFIRMED'],
      lastUpdate: 'Just now',
      priority: 'high',
      health: 'excellent',
    },
    {
      id: 'analytics',
      name: 'Analytics Portal',
      category: 'Core TMS',
      progress: 0,
      status: 'planning',
      agentsAssigned: 14,
      estimatedCompletion: 'Oct 15, 2025',
      blockers: ['FINAL ENTERPRISE STARTER KIT STATUS CONFIRMED'],
      lastUpdate: 'Just now',
      priority: 'medium',
      health: 'good',
    },
    {
      id: 'autonomous',
      name: 'Autonomous Portal',
      category: 'Core TMS',
      progress: 0,
      status: 'planning',
      agentsAssigned: 22,
      estimatedCompletion: 'Oct 15, 2025',
      blockers: ['FINAL ENTERPRISE STARTER KIT STATUS CONFIRMED'],
      lastUpdate: 'Just now',
      priority: 'medium',
      health: 'good',
    },
    {
      id: 'yard',
      name: 'YMS Portal',
      category: 'Core TMS',
      progress: 0,
      status: 'planning',
      agentsAssigned: 19,
      estimatedCompletion: 'Oct 15, 2025',
      blockers: ['FINAL ENTERPRISE STARTER KIT STATUS CONFIRMED'],
      lastUpdate: 'Just now',
      priority: 'medium',
      health: 'good',
    },
    {
      id: 'directory',
      name: 'Directory Portal',
      category: 'Core TMS',
      progress: 0,
      status: 'planning',
      agentsAssigned: 13,
      estimatedCompletion: 'Oct 15, 2025',
      blockers: ['FINAL ENTERPRISE STARTER KIT STATUS CONFIRMED'],
      lastUpdate: 'Just now',
      priority: 'low',
      health: 'good',
    },
    {
      id: 'rates',
      name: 'Rates Portal',
      category: 'Core TMS',
      progress: 0,
      status: 'planning',
      agentsAssigned: 11,
      estimatedCompletion: 'Oct 15, 2025',
      blockers: ['FINAL ENTERPRISE STARTER KIT STATUS CONFIRMED'],
      lastUpdate: 'Just now',
      priority: 'low',
      health: 'good',
    },
    {
      id: 'marketplace',
      name: 'Marketplace Portal',
      category: 'Core TMS',
      progress: 0,
      status: 'planning',
      agentsAssigned: 17,
      estimatedCompletion: 'Oct 15, 2025',
      blockers: ['FINAL ENTERPRISE STARTER KIT STATUS CONFIRMED'],
      lastUpdate: 'Just now',
      priority: 'medium',
      health: 'good',
    },

    // Business Operations Portals
    {
      id: 'financial',
      name: 'Financial Portal',
      category: 'Business Operations',
      progress: 0,
      status: 'planning',
      agentsAssigned: 14,
      estimatedCompletion: 'Oct 15, 2025',
      blockers: ['FINAL ENTERPRISE STARTER KIT STATUS CONFIRMED'],
      lastUpdate: 'Just now',
      priority: 'high',
      health: 'excellent',
    },
    {
      id: 'loadboard',
      name: 'Load Board Portal',
      category: 'Business Operations',
      progress: 0,
      status: 'planning',
      agentsAssigned: 18,
      estimatedCompletion: 'Oct 15, 2025',
      blockers: ['FINAL ENTERPRISE STARTER KIT STATUS CONFIRMED'],
      lastUpdate: 'Just now',
      priority: 'high',
      health: 'excellent',
    },
    {
      id: 'crm',
      name: 'CRM Portal',
      category: 'Business Operations',
      progress: 0,
      status: 'planning',
      agentsAssigned: 12,
      estimatedCompletion: 'Oct 15, 2025',
      blockers: ['FINAL ENTERPRISE STARTER KIT STATUS CONFIRMED'],
      lastUpdate: 'Just now',
      priority: 'medium',
      health: 'good',
    },
    {
      id: 'fleet',
      name: 'Fleet Portal',
      category: 'Business Operations',
      progress: 0,
      status: 'planning',
      agentsAssigned: 16,
      estimatedCompletion: 'Oct 15, 2025',
      blockers: ['FINAL ENTERPRISE STARTER KIT STATUS CONFIRMED'],
      lastUpdate: 'Just now',
      priority: 'medium',
      health: 'good',
    },
    {
      id: 'dispatch',
      name: 'Dispatch Portal',
      category: 'Business Operations',
      progress: 0,
      status: 'planning',
      agentsAssigned: 15,
      estimatedCompletion: 'Oct 15, 2025',
      blockers: ['FINAL ENTERPRISE STARTER KIT STATUS CONFIRMED'],
      lastUpdate: 'Just now',
      priority: 'high',
      health: 'excellent',
    },
    {
      id: 'warehouse',
      name: 'Warehouse Portal',
      category: 'Business Operations',
      progress: 0,
      status: 'planning',
      agentsAssigned: 13,
      estimatedCompletion: 'Oct 15, 2025',
      blockers: ['FINAL ENTERPRISE STARTER KIT STATUS CONFIRMED'],
      lastUpdate: 'Just now',
      priority: 'medium',
      health: 'good',
    },
    {
      id: 'maintenance',
      name: 'Maintenance Portal',
      category: 'Business Operations',
      progress: 0,
      status: 'planning',
      agentsAssigned: 14,
      estimatedCompletion: 'Oct 15, 2025',
      blockers: ['FINAL ENTERPRISE STARTER KIT STATUS CONFIRMED'],
      lastUpdate: 'Just now',
      priority: 'low',
      health: 'good',
    },
    {
      id: 'fuel',
      name: 'Fuel Portal',
      category: 'Business Operations',
      progress: 0,
      status: 'planning',
      agentsAssigned: 11,
      estimatedCompletion: 'Oct 15, 2025',
      blockers: ['FINAL ENTERPRISE STARTER KIT STATUS CONFIRMED'],
      lastUpdate: 'Just now',
      priority: 'low',
      health: 'good',
    },
    {
      id: 'insurance',
      name: 'Insurance Portal',
      category: 'Business Operations',
      progress: 0,
      status: 'planning',
      agentsAssigned: 12,
      estimatedCompletion: 'Oct 15, 2025',
      blockers: ['FINAL ENTERPRISE STARTER KIT STATUS CONFIRMED'],
      lastUpdate: 'Just now',
      priority: 'medium',
      health: 'good',
    },
    {
      id: 'compliance',
      name: 'Compliance Portal',
      category: 'Business Operations',
      progress: 0,
      status: 'planning',
      agentsAssigned: 13,
      estimatedCompletion: 'Oct 15, 2025',
      blockers: ['FINAL ENTERPRISE STARTER KIT STATUS CONFIRMED'],
      lastUpdate: 'Just now',
      priority: 'high',
      health: 'excellent',
    },
    {
      id: 'partner',
      name: 'Partner Portal',
      category: 'Business Operations',
      progress: 0,
      status: 'planning',
      agentsAssigned: 14,
      estimatedCompletion: 'Oct 15, 2025',
      blockers: ['FINAL ENTERPRISE STARTER KIT STATUS CONFIRMED'],
      lastUpdate: 'Just now',
      priority: 'medium',
      health: 'good',
    },
    {
      id: 'developer',
      name: 'Developer Portal',
      category: 'Business Operations',
      progress: 0,
      status: 'planning',
      agentsAssigned: 15,
      estimatedCompletion: 'Oct 15, 2025',
      blockers: ['FINAL ENTERPRISE STARTER KIT STATUS CONFIRMED'],
      lastUpdate: 'Just now',
      priority: 'low',
      health: 'good',
    },
    {
      id: 'track',
      name: 'Track & Trace Portal',
      category: 'Business Operations',
      progress: 0,
      status: 'planning',
      agentsAssigned: 16,
      estimatedCompletion: 'Oct 15, 2025',
      blockers: ['FINAL ENTERPRISE STARTER KIT STATUS CONFIRMED'],
      lastUpdate: 'Just now',
      priority: 'high',
      health: 'excellent',
    },
    {
      id: 'document',
      name: 'Document Portal',
      category: 'Business Operations',
      progress: 0,
      status: 'planning',
      agentsAssigned: 5,
      estimatedCompletion: '6 days',
      blockers: ['File storage'],
      lastUpdate: 'Just now',
      priority: 'medium',
      health: 'warning',
    },
    {
      id: 'communication',
      name: 'Communication Portal',
      category: 'Business Operations',
      progress: 0,
      status: 'planning',
      agentsAssigned: 7,
      estimatedCompletion: '5 days',
      blockers: [],
      lastUpdate: 'Just now',
      priority: 'low',
      health: 'good',
    },
    {
      id: 'reporting',
      name: 'Reporting Portal',
      category: 'Business Operations',
      progress: 0,
      status: 'planning',
      agentsAssigned: 9,
      estimatedCompletion: '7 days',
      blockers: ['Data visualization'],
      lastUpdate: 'Just now',
      priority: 'medium',
      health: 'warning',
    },

    // Admin & Specialized Portals
    {
      id: 'superadmin',
      name: 'Super Admin Portal',
      category: 'Admin & Specialized',
      progress: 0,
      status: 'planning',
      agentsAssigned: 20,
      estimatedCompletion: '15 days',
      blockers: ['Complex permissions'],
      lastUpdate: 'Just now',
      priority: 'high',
      health: 'excellent',
    },
    {
      id: 'mcpadmin',
      name: 'MCP Agent Admin',
      category: 'Admin & Specialized',
      progress: 0,
      status: 'planning',
      agentsAssigned: 18,
      estimatedCompletion: '12 days',
      blockers: ['Agent orchestration'],
      lastUpdate: 'Just now',
      priority: 'high',
      health: 'excellent',
    },
    {
      id: 'devadmin',
      name: 'Human Developer Admin',
      category: 'Admin & Specialized',
      progress: 0,
      status: 'planning',
      agentsAssigned: 15,
      estimatedCompletion: '13 days',
      blockers: ['Code review system'],
      lastUpdate: 'Just now',
      priority: 'medium',
      health: 'good',
    },
    {
      id: 'systemadmin',
      name: 'System Admin Portal',
      category: 'Admin & Specialized',
      progress: 0,
      status: 'planning',
      agentsAssigned: 12,
      estimatedCompletion: '10 days',
      blockers: [],
      lastUpdate: 'Just now',
      priority: 'high',
      health: 'excellent',
    },
    {
      id: 'securityadmin',
      name: 'Security Admin Portal',
      category: 'Admin & Specialized',
      progress: 0,
      status: 'planning',
      agentsAssigned: 14,
      estimatedCompletion: '11 days',
      blockers: ['Security protocols'],
      lastUpdate: 'Just now',
      priority: 'high',
      health: 'excellent',
    },
    {
      id: 'integrationadmin',
      name: 'Integration Admin Portal',
      category: 'Admin & Specialized',
      progress: 0,
      status: 'planning',
      agentsAssigned: 16,
      estimatedCompletion: '9 days',
      blockers: [],
      lastUpdate: 'Just now',
      priority: 'medium',
      health: 'good',
    },
    {
      id: 'monitoringadmin',
      name: 'Monitoring Admin Portal',
      category: 'Admin & Specialized',
      progress: 0,
      status: 'planning',
      agentsAssigned: 13,
      estimatedCompletion: 'Oct 15, 2025',
      blockers: ['FINAL ENTERPRISE STARTER KIT STATUS CONFIRMED'],
      lastUpdate: 'Just now',
      priority: 'high',
      health: 'excellent',
    },
  ]);

  // Real-time updates with enhanced simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());

      // FORCE ALL PORTALS TO STAY AT 0% AND PLANNING STATUS FOR ENTERPRISE STARTER KIT
      setPortals(prevPortals =>
        prevPortals.map(portal => ({
          ...portal,
          progress: 0, // FORCE 0% PROGRESS
          status: 'planning' as const, // FORCE PLANNING STATUS
          blockers: ['FINAL ENTERPRISE STARTER KIT STATUS CONFIRMED'], // UPDATE BLOCKER MESSAGE
          lastUpdate: 'Just now',
        }))
      );

      // FORCE OVERALL PROGRESS TO 0% FOR ENTERPRISE STARTER KIT
      setOverallProgress(0);

      // Keep agent status active but waiting for enterprise starter kit
      setAgentStatus({
        total: 250,
        active: 250,
        maintenance: 0,
        error: 0,
        efficiency: 0, // Set to 0 since they're waiting for starter kit
      });
    }, 1500); // Faster updates for more dynamic feel

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete':
        return { bg: 'rgba(16, 185, 129, 0.2)', color: '#10b981', border: '#10b981' };
      case 'testing':
        return { bg: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6', border: '#3b82f6' };
      case 'development':
        return { bg: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b', border: '#f59e0b' };
      case 'deployment':
        return { bg: 'rgba(139, 92, 246, 0.2)', color: '#8b5cf6', border: '#8b5cf6' };
      case 'planning':
        return { bg: 'rgba(107, 114, 128, 0.2)', color: '#6b7280', border: '#6b7280' };
      default:
        return { bg: 'rgba(107, 114, 128, 0.2)', color: '#6b7280', border: '#6b7280' };
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#ef4444';
      case 'medium':
        return '#f59e0b';
      case 'low':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent':
        return '#10b981';
      case 'good':
        return '#3b82f6';
      case 'warning':
        return '#f59e0b';
      case 'critical':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const completedPortals = portals.filter(p => p.status === 'complete').length;
  const totalPortals = portals.length;
  const activePortals = portals.filter(p => p.status !== 'complete').length;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f0f23 100%)',
        color: 'white',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated Background Elements */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
          radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.1) 0%, transparent 50%)
        `,
          animation: 'float 20s ease-in-out infinite',
        }}
      ></div>

      {/* Header */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '32px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '1400px',
            margin: '0 auto',
          }}
        >
          <div>
            <h1
              style={{
                fontSize: '2.5rem',
                fontWeight: '800',
                margin: '0 0 8px 0',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              🚀 TransBot AI - MCP Command Center
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#94a3b8', margin: 0, fontWeight: '500' }}>
              Real-time orchestration of 250 autonomous agents building the future of logistics
            </p>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div
              style={{
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid #10b981',
                borderRadius: '12px',
                padding: '12px 20px',
                color: '#10b981',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  background: '#10b981',
                  borderRadius: '50%',
                  animation: 'pulse 2s infinite',
                }}
              ></div>
              Live Operations
            </div>
            <div
              style={{
                background: 'rgba(59, 130, 246, 0.15)',
                border: '1px solid #3b82f6',
                borderRadius: '12px',
                padding: '12px 20px',
                color: '#3b82f6',
                fontWeight: '600',
              }}
            >
              {currentTime.toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '32px',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {/* Enhanced Status Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            marginBottom: '40px',
          }}
        >
          {/* Agent Status Card */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '20px',
              padding: '28px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100px',
                height: '100px',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, transparent 100%)',
                borderRadius: '0 20px 0 100px',
              }}
            ></div>
            <h3
              style={{
                fontSize: '1.4rem',
                fontWeight: '700',
                marginBottom: '20px',
                color: '#10b981',
              }}
            >
              🤖 Agent Fleet Status
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <span style={{ color: '#94a3b8', fontSize: '1rem' }}>Active Agents</span>
                <span style={{ color: '#10b981', fontWeight: '700', fontSize: '1.5rem' }}>
                  {agentStatus.active}
                </span>
              </div>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <span style={{ color: '#94a3b8', fontSize: '1rem' }}>Efficiency</span>
                <span style={{ color: '#3b82f6', fontWeight: '700', fontSize: '1.2rem' }}>
                  {agentStatus.efficiency.toFixed(1)}%
                </span>
              </div>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <span style={{ color: '#94a3b8', fontSize: '1rem' }}>Maintenance</span>
                <span style={{ color: '#f59e0b', fontWeight: '600' }}>
                  {agentStatus.maintenance}
                </span>
              </div>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <span style={{ color: '#94a3b8', fontSize: '1rem' }}>Error Recovery</span>
                <span style={{ color: '#ef4444', fontWeight: '600' }}>{agentStatus.error}</span>
              </div>
              <div style={{ paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <span style={{ color: '#94a3b8', fontSize: '1rem' }}>Total Fleet</span>
                  <span style={{ fontWeight: '700', fontSize: '1.2rem' }}>{agentStatus.total}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mission Progress Card */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '20px',
              padding: '28px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100px',
                height: '100px',
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, transparent 100%)',
                borderRadius: '0 20px 0 100px',
              }}
            ></div>
            <h3
              style={{
                fontSize: '1.4rem',
                fontWeight: '700',
                marginBottom: '20px',
                color: '#3b82f6',
              }}
            >
              🎯 Mission Progress
            </h3>
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: '3.5rem',
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '16px',
                }}
              >
                {overallProgress}%
              </div>
              <div
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  height: '16px',
                  overflow: 'hidden',
                  marginBottom: '12px',
                }}
              >
                <div
                  style={{
                    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #10b981 100%)',
                    height: '100%',
                    borderRadius: '20px',
                    width: `${overallProgress}%`,
                    transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background:
                        'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                      animation: 'shimmer 2s infinite',
                    }}
                  ></div>
                </div>
              </div>
              <p style={{ fontSize: '1rem', color: '#94a3b8', margin: 0, fontWeight: '500' }}>
                {completedPortals} of {totalPortals} portals operational
              </p>
            </div>
          </div>

          {/* Portal Summary Card */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '20px',
              padding: '28px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100px',
                height: '100px',
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, transparent 100%)',
                borderRadius: '0 20px 0 100px',
              }}
            ></div>
            <h3
              style={{
                fontSize: '1.4rem',
                fontWeight: '700',
                marginBottom: '20px',
                color: '#8b5cf6',
              }}
            >
              🌐 Portal Ecosystem
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <span style={{ color: '#94a3b8', fontSize: '1rem' }}>Operational</span>
                <span style={{ color: '#10b981', fontWeight: '700', fontSize: '1.5rem' }}>
                  {completedPortals}
                </span>
              </div>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <span style={{ color: '#94a3b8', fontSize: '1rem' }}>In Development</span>
                <span style={{ color: '#f59e0b', fontWeight: '700', fontSize: '1.5rem' }}>
                  {activePortals}
                </span>
              </div>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <span style={{ color: '#94a3b8', fontSize: '1rem' }}>Total Portals</span>
                <span style={{ fontWeight: '700', fontSize: '1.2rem' }}>{totalPortals}</span>
              </div>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <span style={{ color: '#94a3b8', fontSize: '1rem' }}>Last Update</span>
                <span style={{ fontWeight: '600', fontSize: '1rem' }}>
                  {currentTime.toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Portal Grid */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '24px',
            padding: '32px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px',
            }}
          >
            <h3 style={{ fontSize: '1.6rem', fontWeight: '700', margin: 0 }}>
              🚀 Portal Development Matrix ({totalPortals} Active Projects)
            </h3>
            <div
              style={{
                color: '#10b981',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: '500',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  background: '#10b981',
                  borderRadius: '50%',
                  animation: 'pulse 2s infinite',
                }}
              ></div>
              Real-time updates every 1.5s
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
              gap: '20px',
            }}
          >
            {portals.map(portal => {
              const statusColors = getStatusColor(portal.status);
              const priorityColor = getPriorityColor(portal.priority);
              const healthColor = getHealthColor(portal.health);

              return (
                <div
                  key={portal.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '16px',
                    padding: '20px',
                    border: `1px solid ${statusColors.border}`,
                    backdropFilter: 'blur(10px)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.borderColor = statusColors.color;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = statusColors.border;
                  }}
                >
                  {/* Priority Indicator */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      width: '8px',
                      height: '8px',
                      background: priorityColor,
                      borderRadius: '50%',
                      boxShadow: `0 0 10px ${priorityColor}`,
                    }}
                  ></div>

                  {/* Health Indicator */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '28px',
                      width: '8px',
                      height: '8px',
                      background: healthColor,
                      borderRadius: '50%',
                    }}
                  ></div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '16px',
                    }}
                  >
                    <div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: '700', margin: '0 0 4px 0' }}>
                        {portal.name}
                      </h4>
                      <div style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: '500' }}>
                        {portal.category}
                      </div>
                    </div>
                    <div
                      style={{
                        background: statusColors.bg,
                        color: statusColors.color,
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        border: `1px solid ${statusColors.color}`,
                      }}
                    >
                      {portal.status}
                    </div>
                  </div>

                  {/* Enhanced Progress Bar */}
                  <div style={{ marginBottom: '16px' }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '8px',
                      }}
                    >
                      <span style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: '500' }}>
                        Progress
                      </span>
                      <span
                        style={{ fontSize: '0.9rem', fontWeight: '700', color: statusColors.color }}
                      >
                        {portal.progress}%
                      </span>
                    </div>
                    <div
                      style={{
                        width: '100%',
                        height: '10px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        position: 'relative',
                      }}
                    >
                      <div
                        style={{
                          width: `${portal.progress}%`,
                          height: '100%',
                          background: `linear-gradient(90deg, ${statusColors.color} 0%, ${statusColors.color}80 100%)`,
                          borderRadius: '10px',
                          transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                          position: 'relative',
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background:
                              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                            animation: 'shimmer 2s infinite',
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Portal Metrics */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '12px',
                      marginBottom: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Agents</span>
                      <span style={{ fontWeight: '700', fontSize: '1rem' }}>
                        {portal.agentsAssigned}
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>ETA</span>
                      <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>
                        {portal.estimatedCompletion}
                      </span>
                    </div>
                  </div>

                  {portal.blockers.length > 0 && (
                    <div
                      style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        marginBottom: '8px',
                      }}
                    >
                      <div style={{ fontSize: '0.8rem', color: '#ef4444', fontWeight: '600' }}>
                        ⚠️ Blockers: {portal.blockers.join(', ')}
                      </div>
                    </div>
                  )}

                  <div
                    style={{
                      fontSize: '0.8rem',
                      color: '#94a3b8',
                      fontStyle: 'italic',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span>Updated: {portal.lastUpdate}</span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <span style={{ color: priorityColor, fontSize: '0.7rem' }}>
                        ● {portal.priority}
                      </span>
                      <span style={{ color: healthColor, fontSize: '0.7rem' }}>
                        ● {portal.health}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Enhanced Analytics Section */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '24px',
            padding: '32px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <h3 style={{ fontSize: '1.6rem', fontWeight: '700', marginBottom: '32px' }}>
            📊 Performance Analytics & Intelligence
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {/* Development Velocity */}
            <div
              style={{
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '16px',
                padding: '24px',
              }}
            >
              <h4
                style={{
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  marginBottom: '16px',
                  color: '#3b82f6',
                }}
              >
                ⚡ Development Velocity
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem' }}>
                  <span>Portals/Day</span>
                  <span style={{ color: '#3b82f6', fontWeight: '700' }}>2.4</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem' }}>
                  <span>Features/Day</span>
                  <span style={{ color: '#3b82f6', fontWeight: '700' }}>18.7</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem' }}>
                  <span>Code Quality</span>
                  <span style={{ color: '#10b981', fontWeight: '700' }}>94.2%</span>
                </div>
              </div>
            </div>

            {/* System Health */}
            <div
              style={{
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '16px',
                padding: '24px',
              }}
            >
              <h4
                style={{
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  marginBottom: '16px',
                  color: '#10b981',
                }}
              >
                🏥 System Health
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem' }}>
                  <span>Uptime</span>
                  <span style={{ color: '#10b981', fontWeight: '700' }}>99.97%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem' }}>
                  <span>Response Time</span>
                  <span style={{ color: '#10b981', fontWeight: '700' }}>89ms</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem' }}>
                  <span>Error Rate</span>
                  <span style={{ color: '#10b981', fontWeight: '700' }}>0.03%</span>
                </div>
              </div>
            </div>

            {/* Resource Utilization */}
            <div
              style={{
                background: 'rgba(139, 92, 246, 0.1)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '16px',
                padding: '24px',
              }}
            >
              <h4
                style={{
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  marginBottom: '16px',
                  color: '#8b5cf6',
                }}
              >
                💻 Resource Utilization
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem' }}>
                  <span>CPU Usage</span>
                  <span style={{ color: '#8b5cf6', fontWeight: '700' }}>67.3%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem' }}>
                  <span>Memory</span>
                  <span style={{ color: '#8b5cf6', fontWeight: '700' }}>42.1%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem' }}>
                  <span>Network</span>
                  <span style={{ color: '#8b5cf6', fontWeight: '700' }}>23.8%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(1deg); }
          66% { transform: translateY(10px) rotate(-1deg); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}

export default MCPProgressDashboard;
