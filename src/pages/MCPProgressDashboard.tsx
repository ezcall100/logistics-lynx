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
}

interface AgentStatus {
  total: number;
  active: number;
  maintenance: number;
  error: number;
}

function MCPProgressDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [overallProgress, setOverallProgress] = useState(68.2);
  const [agentStatus, setAgentStatus] = useState<AgentStatus>({
    total: 250,
    active: 238,
    maintenance: 7,
    error: 5,
  });

  // All 35+ portals with real-time simulation
  const [portals, setPortals] = useState<Portal[]>([
    // Core TMS Portals (11) - 100% Complete
    {
      id: 'customer',
      name: 'Customer Portal',
      category: 'Core TMS',
      progress: 100,
      status: 'complete',
      agentsAssigned: 0,
      estimatedCompletion: 'Complete',
      blockers: [],
      lastUpdate: '2 hours ago',
    },
    {
      id: 'broker',
      name: 'Broker Portal',
      category: 'Core TMS',
      progress: 100,
      status: 'complete',
      agentsAssigned: 0,
      estimatedCompletion: 'Complete',
      blockers: [],
      lastUpdate: '1 hour ago',
    },
    {
      id: 'carrier',
      name: 'Carrier Portal',
      category: 'Core TMS',
      progress: 100,
      status: 'complete',
      agentsAssigned: 0,
      estimatedCompletion: 'Complete',
      blockers: [],
      lastUpdate: '3 hours ago',
    },
    {
      id: 'driver',
      name: 'Driver Portal',
      category: 'Core TMS',
      progress: 100,
      status: 'complete',
      agentsAssigned: 0,
      estimatedCompletion: 'Complete',
      blockers: [],
      lastUpdate: '4 hours ago',
    },
    {
      id: 'shipper',
      name: 'Shipper Portal',
      category: 'Core TMS',
      progress: 100,
      status: 'complete',
      agentsAssigned: 0,
      estimatedCompletion: 'Complete',
      blockers: [],
      lastUpdate: '5 hours ago',
    },
    {
      id: 'analytics',
      name: 'Analytics Portal',
      category: 'Core TMS',
      progress: 100,
      status: 'complete',
      agentsAssigned: 0,
      estimatedCompletion: 'Complete',
      blockers: [],
      lastUpdate: '6 hours ago',
    },
    {
      id: 'autonomous',
      name: 'Autonomous Portal',
      category: 'Core TMS',
      progress: 100,
      status: 'complete',
      agentsAssigned: 0,
      estimatedCompletion: 'Complete',
      blockers: [],
      lastUpdate: '7 hours ago',
    },
    {
      id: 'yard',
      name: 'YMS Portal',
      category: 'Core TMS',
      progress: 100,
      status: 'complete',
      agentsAssigned: 0,
      estimatedCompletion: 'Complete',
      blockers: [],
      lastUpdate: '8 hours ago',
    },
    {
      id: 'directory',
      name: 'Directory Portal',
      category: 'Core TMS',
      progress: 100,
      status: 'complete',
      agentsAssigned: 0,
      estimatedCompletion: 'Complete',
      blockers: [],
      lastUpdate: '9 hours ago',
    },
    {
      id: 'rates',
      name: 'Rates Portal',
      category: 'Core TMS',
      progress: 100,
      status: 'complete',
      agentsAssigned: 0,
      estimatedCompletion: 'Complete',
      blockers: [],
      lastUpdate: '10 hours ago',
    },
    {
      id: 'marketplace',
      name: 'Marketplace Portal',
      category: 'Core TMS',
      progress: 100,
      status: 'complete',
      agentsAssigned: 0,
      estimatedCompletion: 'Complete',
      blockers: [],
      lastUpdate: '11 hours ago',
    },

    // Business Operations Portals (16) - In Progress
    {
      id: 'financial',
      name: 'Financial Portal',
      category: 'Business Operations',
      progress: 85,
      status: 'development',
      agentsAssigned: 12,
      estimatedCompletion: '3 days',
      blockers: [],
      lastUpdate: '2 minutes ago',
    },
    {
      id: 'load-board',
      name: 'Load Board Portal',
      category: 'Business Operations',
      progress: 90,
      status: 'testing',
      agentsAssigned: 8,
      estimatedCompletion: '2 days',
      blockers: [],
      lastUpdate: '1 minute ago',
    },
    {
      id: 'crm',
      name: 'CRM Portal',
      category: 'Business Operations',
      progress: 75,
      status: 'development',
      agentsAssigned: 15,
      estimatedCompletion: '5 days',
      blockers: ['API integration'],
      lastUpdate: '3 minutes ago',
    },
    {
      id: 'fleet',
      name: 'Fleet Portal',
      category: 'Business Operations',
      progress: 90,
      status: 'testing',
      agentsAssigned: 10,
      estimatedCompletion: '2 days',
      blockers: [],
      lastUpdate: '4 minutes ago',
    },
    {
      id: 'dispatch',
      name: 'Dispatch Portal',
      category: 'Business Operations',
      progress: 85,
      status: 'development',
      agentsAssigned: 14,
      estimatedCompletion: '3 days',
      blockers: [],
      lastUpdate: '5 minutes ago',
    },
    {
      id: 'warehouse',
      name: 'Warehouse Portal',
      category: 'Business Operations',
      progress: 71,
      status: 'development',
      agentsAssigned: 9,
      estimatedCompletion: '4 days',
      blockers: [],
      lastUpdate: '6 minutes ago',
    },
    {
      id: 'maintenance',
      name: 'Maintenance Portal',
      category: 'Business Operations',
      progress: 68,
      status: 'development',
      agentsAssigned: 11,
      estimatedCompletion: '6 days',
      blockers: ['Parts inventory'],
      lastUpdate: '7 minutes ago',
    },
    {
      id: 'fuel',
      name: 'Fuel Portal',
      category: 'Business Operations',
      progress: 72,
      status: 'development',
      agentsAssigned: 7,
      estimatedCompletion: '5 days',
      blockers: [],
      lastUpdate: '8 minutes ago',
    },
    {
      id: 'insurance',
      name: 'Insurance Portal',
      category: 'Business Operations',
      progress: 65,
      status: 'development',
      agentsAssigned: 6,
      estimatedCompletion: '7 days',
      blockers: ['Policy integration'],
      lastUpdate: '9 minutes ago',
    },
    {
      id: 'compliance',
      name: 'Compliance Portal',
      category: 'Business Operations',
      progress: 58,
      status: 'development',
      agentsAssigned: 8,
      estimatedCompletion: '8 days',
      blockers: ['Regulatory updates'],
      lastUpdate: '10 minutes ago',
    },
    {
      id: 'partner',
      name: 'Partner Portal',
      category: 'Business Operations',
      progress: 80,
      status: 'development',
      agentsAssigned: 13,
      estimatedCompletion: '4 days',
      blockers: [],
      lastUpdate: '11 minutes ago',
    },
    {
      id: 'developer',
      name: 'Developer Portal',
      category: 'Business Operations',
      progress: 77,
      status: 'development',
      agentsAssigned: 16,
      estimatedCompletion: '5 days',
      blockers: ['API documentation'],
      lastUpdate: '12 minutes ago',
    },
    {
      id: 'track-trace',
      name: 'Track & Trace Portal',
      category: 'Business Operations',
      progress: 82,
      status: 'development',
      agentsAssigned: 10,
      estimatedCompletion: '3 days',
      blockers: [],
      lastUpdate: '13 minutes ago',
    },
    {
      id: 'document',
      name: 'Document Portal',
      category: 'Business Operations',
      progress: 69,
      status: 'development',
      agentsAssigned: 5,
      estimatedCompletion: '6 days',
      blockers: ['File storage'],
      lastUpdate: '14 minutes ago',
    },
    {
      id: 'communication',
      name: 'Communication Portal',
      category: 'Business Operations',
      progress: 73,
      status: 'development',
      agentsAssigned: 7,
      estimatedCompletion: '5 days',
      blockers: [],
      lastUpdate: '15 minutes ago',
    },
    {
      id: 'reporting',
      name: 'Reporting Portal',
      category: 'Business Operations',
      progress: 66,
      status: 'development',
      agentsAssigned: 9,
      estimatedCompletion: '7 days',
      blockers: ['Data visualization'],
      lastUpdate: '16 minutes ago',
    },

    // Admin & Specialized Portals (4) - In Progress
    {
      id: 'super-admin',
      name: 'Super Admin Portal',
      category: 'Admin & Specialized',
      progress: 30,
      status: 'development',
      agentsAssigned: 20,
      estimatedCompletion: '15 days',
      blockers: ['Complex permissions'],
      lastUpdate: '17 minutes ago',
    },
    {
      id: 'mcp-agent-admin',
      name: 'MCP Agent Admin',
      category: 'Admin & Specialized',
      progress: 40,
      status: 'development',
      agentsAssigned: 18,
      estimatedCompletion: '12 days',
      blockers: ['Agent orchestration'],
      lastUpdate: '18 minutes ago',
    },
    {
      id: 'human-dev-admin',
      name: 'Human Developer Admin',
      category: 'Admin & Specialized',
      progress: 35,
      status: 'development',
      agentsAssigned: 15,
      estimatedCompletion: '13 days',
      blockers: ['Code review system'],
      lastUpdate: '19 minutes ago',
    },
    {
      id: 'system-admin',
      name: 'System Admin Portal',
      category: 'Admin & Specialized',
      progress: 45,
      status: 'development',
      agentsAssigned: 12,
      estimatedCompletion: '10 days',
      blockers: [],
      lastUpdate: '20 minutes ago',
    },
  ]);

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());

      // Simulate progress updates
      setPortals(prevPortals =>
        prevPortals.map(portal => {
          if (portal.status === 'complete') return portal;

          // Random progress increase for active portals
          const progressIncrease = Math.random() * 0.5;
          const newProgress = Math.min(100, portal.progress + progressIncrease);

          // Update status based on progress
          let newStatus = portal.status;
          if (newProgress >= 100) {
            newStatus = 'complete';
          } else if (newProgress >= 90) {
            newStatus = 'testing';
          } else if (newProgress >= 70) {
            newStatus = 'development';
          }

          return {
            ...portal,
            progress: Math.round(newProgress * 10) / 10,
            status: newStatus,
            lastUpdate: 'Just now',
          };
        })
      );

      // Update overall progress
      const completedPortals = portals.filter(p => p.status === 'complete').length;
      const newOverallProgress = (completedPortals / portals.length) * 100;
      setOverallProgress(Math.round(newOverallProgress * 10) / 10);
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [portals]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete':
        return { bg: 'rgba(16, 185, 129, 0.2)', color: '#10b981' };
      case 'testing':
        return { bg: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6' };
      case 'development':
        return { bg: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b' };
      case 'deployment':
        return { bg: 'rgba(139, 92, 246, 0.2)', color: '#8b5cf6' };
      default:
        return { bg: 'rgba(107, 114, 128, 0.2)', color: '#6b7280' };
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return '#10b981';
    if (progress >= 70) return '#3b82f6';
    if (progress >= 50) return '#f59e0b';
    return '#ef4444';
  };

  const completedPortals = portals.filter(p => p.status === 'complete').length;
  const activePortals = portals.filter(p => p.status !== 'complete').length;

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#1e293b',
        padding: '24px',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
          }}
        >
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              🚀 MCP Agent Progress Dashboard
            </h1>
            <p style={{ color: '#94a3b8', marginBottom: '0' }}>
              Real-time monitoring of 250 autonomous agents building 35+ portals
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(16, 185, 129, 0.2)',
              color: '#10b981',
              padding: '8px 16px',
              borderRadius: '8px',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                backgroundColor: '#10b981',
                borderRadius: '50%',
                animation: 'pulse 2s infinite',
              }}
            ></div>
            <span>Live Updates Active</span>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '16px' }}>
              Mission Timeline
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Started:</span>
                <span>September 9, 2025</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Deadline:</span>
                <span>October 28, 2025</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Days Remaining:</span>
                <span style={{ color: '#f59e0b' }}>49 days</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Status:</span>
                <span style={{ color: '#10b981' }}>Active</span>
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '16px' }}>
              Overall Progress
            </h3>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '8px' }}>
                {overallProgress}%
              </div>
              <div
                style={{
                  width: '100%',
                  backgroundColor: '#374151',
                  borderRadius: '9999px',
                  height: '12px',
                  marginBottom: '8px',
                }}
              >
                <div
                  style={{
                    background: 'linear-gradient(to right, #3b82f6, #10b981)',
                    height: '12px',
                    borderRadius: '9999px',
                    width: `${overallProgress}%`,
                    transition: 'width 0.5s ease',
                  }}
                ></div>
              </div>
              <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
                {completedPortals} of {portals.length} portals complete
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '16px' }}>
              Agent Status
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: '12px',
                      height: '12px',
                      backgroundColor: '#10b981',
                      borderRadius: '50%',
                    }}
                  ></div>
                  <span style={{ color: '#94a3b8' }}>Active</span>
                </div>
                <span style={{ fontWeight: '600' }}>{agentStatus.active}</span>
              </div>
              <div
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: '12px',
                      height: '12px',
                      backgroundColor: '#f59e0b',
                      borderRadius: '50%',
                    }}
                  ></div>
                  <span style={{ color: '#94a3b8' }}>Maintenance</span>
                </div>
                <span style={{ fontWeight: '600' }}>{agentStatus.maintenance}</span>
              </div>
              <div
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: '12px',
                      height: '12px',
                      backgroundColor: '#ef4444',
                      borderRadius: '50%',
                    }}
                  ></div>
                  <span style={{ color: '#94a3b8' }}>Error Recovery</span>
                </div>
                <span style={{ fontWeight: '600' }}>{agentStatus.error}</span>
              </div>
              <div style={{ paddingTop: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94a3b8' }}>Total Agents</span>
                  <span style={{ fontWeight: '600' }}>{agentStatus.total}</span>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '16px' }}>
              Portal Status
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Completed:</span>
                <span style={{ color: '#10b981', fontWeight: '600' }}>{completedPortals}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>In Progress:</span>
                <span style={{ color: '#f59e0b', fontWeight: '600' }}>{activePortals}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Total Portals:</span>
                <span style={{ fontWeight: '600' }}>{portals.length}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Last Update:</span>
                <span style={{ fontSize: '0.875rem' }}>{currentTime.toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            marginBottom: '32px',
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
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>
              Individual Portal Details & Real-Time Status
            </h3>
            <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
              Auto-refresh every 5 seconds
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '16px',
            }}
          >
            {portals.map(portal => {
              const statusColors = getStatusColor(portal.status);
              return (
                <div
                  key={portal.id}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '8px',
                    padding: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '12px',
                    }}
                  >
                    <div>
                      <h4 style={{ fontWeight: '600', marginBottom: '4px' }}>{portal.name}</h4>
                      <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{portal.category}</p>
                    </div>
                    <div
                      style={{
                        padding: '4px 12px',
                        borderRadius: '9999px',
                        fontSize: '0.875rem',
                        backgroundColor: statusColors.bg,
                        color: statusColors.color,
                      }}
                    >
                      {portal.status}
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '0.875rem',
                      }}
                    >
                      <span style={{ color: '#94a3b8' }}>Progress</span>
                      <span style={{ fontWeight: '500' }}>{portal.progress}%</span>
                    </div>
                    <div
                      style={{
                        width: '100%',
                        backgroundColor: '#374151',
                        borderRadius: '9999px',
                        height: '8px',
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: getProgressColor(portal.progress),
                          height: '8px',
                          borderRadius: '9999px',
                          width: `${portal.progress}%`,
                          transition: 'width 0.5s ease',
                        }}
                      ></div>
                    </div>

                    {portal.status !== 'complete' && (
                      <>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '0.875rem',
                          }}
                        >
                          <span style={{ color: '#94a3b8' }}>Agents Assigned</span>
                          <span style={{ fontWeight: '500' }}>{portal.agentsAssigned}</span>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '0.875rem',
                          }}
                        >
                          <span style={{ color: '#94a3b8' }}>ETA</span>
                          <span style={{ fontWeight: '500' }}>{portal.estimatedCompletion}</span>
                        </div>
                        {portal.blockers.length > 0 && (
                          <div style={{ fontSize: '0.875rem' }}>
                            <span style={{ color: '#ef4444' }}>Blockers: </span>
                            <span style={{ color: '#fca5a5' }}>{portal.blockers.join(', ')}</span>
                          </div>
                        )}
                      </>
                    )}

                    <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '4px' }}>
                      Last update: {portal.lastUpdate}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(16, 185, 129, 0.2)',
              color: '#10b981',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
            }}
          >
            <div
              style={{
                width: '10px',
                height: '10px',
                backgroundColor: '#10b981',
                borderRadius: '50%',
                animation: 'pulse 2s infinite',
              }}
            ></div>
            <span>
              All 250 agents are autonomously working on {activePortals} remaining portals
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MCPProgressDashboard;
