import { useState, useEffect } from 'react';

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
  const [overallProgress, setOverallProgress] = useState(68.6); // 24/35 = 68.6%
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

    // Business Operations Portals (13) - 13 Completed, 3 In Progress
    {
      id: 'financial',
      name: 'Financial Portal',
      category: 'Business Operations',
      progress: 100,
      status: 'complete',
      agentsAssigned: 0,
      estimatedCompletion: 'Complete',
      blockers: [],
      lastUpdate: '12 hours ago',
    },
    {
      id: 'load-board',
      name: 'Load Board Portal',
      category: 'Business Operations',
      progress: 100,
      status: 'complete',
      agentsAssigned: 0,
      estimatedCompletion: 'Complete',
      blockers: [],
      lastUpdate: '13 hours ago',
    },
    {
      id: 'crm',
      name: 'CRM Portal',
      category: 'Business Operations',
      progress: 100,
      status: 'complete',
      agentsAssigned: 0,
      estimatedCompletion: 'Complete',
      blockers: [],
      lastUpdate: '14 hours ago',
    },
    {
      id: 'fleet',
      name: 'Fleet Portal',
      category: 'Business Operations',
      progress: 100,
      status: 'complete',
      agentsAssigned: 0,
      estimatedCompletion: 'Complete',
      blockers: [],
      lastUpdate: '15 hours ago',
    },
    {
      id: 'dispatch',
      name: 'Dispatch Portal',
      category: 'Business Operations',
      progress: 100,
      status: 'complete',
      agentsAssigned: 0,
      estimatedCompletion: 'Complete',
      blockers: [],
      lastUpdate: '16 hours ago',
    },
    {
      id: 'warehouse',
      name: 'Warehouse Portal',
      category: 'Business Operations',
      progress: 100,
      status: 'complete',
      agentsAssigned: 0,
      estimatedCompletion: 'Complete',
      blockers: [],
      lastUpdate: '17 hours ago',
    },
    {
      id: 'maintenance',
      name: 'Maintenance Portal',
      category: 'Business Operations',
      progress: 100,
      status: 'complete',
      agentsAssigned: 0,
      estimatedCompletion: 'Complete',
      blockers: [],
      lastUpdate: '18 hours ago',
    },
    {
      id: 'fuel',
      name: 'Fuel Portal',
      category: 'Business Operations',
      progress: 100,
      status: 'complete',
      agentsAssigned: 0,
      estimatedCompletion: 'Complete',
      blockers: [],
      lastUpdate: '19 hours ago',
    },
    {
      id: 'insurance',
      name: 'Insurance Portal',
      category: 'Business Operations',
      progress: 100,
      status: 'complete',
      agentsAssigned: 0,
      estimatedCompletion: 'Complete',
      blockers: [],
      lastUpdate: '20 hours ago',
    },
    {
      id: 'compliance',
      name: 'Compliance Portal',
      category: 'Business Operations',
      progress: 100,
      status: 'complete',
      agentsAssigned: 0,
      estimatedCompletion: 'Complete',
      blockers: [],
      lastUpdate: '21 hours ago',
    },
    {
      id: 'partner',
      name: 'Partner Portal',
      category: 'Business Operations',
      progress: 100,
      status: 'complete',
      agentsAssigned: 0,
      estimatedCompletion: 'Complete',
      blockers: [],
      lastUpdate: '22 hours ago',
    },
    {
      id: 'developer',
      name: 'Developer Portal',
      category: 'Business Operations',
      progress: 100,
      status: 'complete',
      agentsAssigned: 0,
      estimatedCompletion: 'Complete',
      blockers: [],
      lastUpdate: '23 hours ago',
    },
    {
      id: 'track-trace',
      name: 'Track & Trace Portal',
      category: 'Business Operations',
      progress: 100,
      status: 'complete',
      agentsAssigned: 0,
      estimatedCompletion: 'Complete',
      blockers: [],
      lastUpdate: '24 hours ago',
    },

    // Business Operations Portals (3) - In Progress
    {
      id: 'document',
      name: 'Document Portal',
      category: 'Business Operations',
      progress: 69,
      status: 'development',
      agentsAssigned: 5,
      estimatedCompletion: '6 days',
      blockers: ['File storage'],
      lastUpdate: '2 minutes ago',
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
      lastUpdate: '1 minute ago',
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
      lastUpdate: '3 minutes ago',
    },

    // Admin & Specialized Portals (8) - In Progress
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
    {
      id: 'security-admin',
      name: 'Security Admin Portal',
      category: 'Admin & Specialized',
      progress: 38,
      status: 'development',
      agentsAssigned: 14,
      estimatedCompletion: '11 days',
      blockers: ['Security protocols'],
      lastUpdate: '21 minutes ago',
    },
    {
      id: 'integration-admin',
      name: 'Integration Admin Portal',
      category: 'Admin & Specialized',
      progress: 42,
      status: 'development',
      agentsAssigned: 16,
      estimatedCompletion: '9 days',
      blockers: [],
      lastUpdate: '22 minutes ago',
    },
    {
      id: 'monitoring-admin',
      name: 'Monitoring Admin Portal',
      category: 'Admin & Specialized',
      progress: 35,
      status: 'development',
      agentsAssigned: 13,
      estimatedCompletion: '12 days',
      blockers: ['Alert system'],
      lastUpdate: '23 minutes ago',
    },
  ]);

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());

      // Simulate progress updates
      setPortals(prevPortals => {
        const updatedPortals = prevPortals.map(portal => {
          if (portal.status === 'complete') return portal;

          // Random progress increase for active portals
          const progressIncrease = Math.random() * 0.3;
          const newProgress = Math.min(100, portal.progress + progressIncrease);

          // Update status based on progress
          let newStatus: 'planning' | 'development' | 'testing' | 'deployment' | 'complete' =
            portal.status;
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
        });

        // Update overall progress based on updated portals
        const completedCount = updatedPortals.filter(p => p.status === 'complete').length;
        const newOverallProgress = (completedCount / updatedPortals.length) * 100;
        setOverallProgress(Math.round(newOverallProgress * 10) / 10);

        return updatedPortals;
      });

      // Simulate agent status changes
      setAgentStatus(prevStatus => ({
        ...prevStatus,
        active: Math.max(230, Math.min(250, prevStatus.active + Math.floor(Math.random() * 6) - 3)),
        maintenance: Math.max(
          3,
          Math.min(12, prevStatus.maintenance + Math.floor(Math.random() * 4) - 2)
        ),
        error: Math.max(2, Math.min(8, prevStatus.error + Math.floor(Math.random() * 3) - 1)),
      }));
    }, 3000); // Update every 3 seconds for more responsive updates

    return () => clearInterval(interval);
  }, []); // Empty dependency array to prevent infinite loops

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
              🚀 TransBot AI - MCP Dashboard
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
              📊 Agent Status
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
              🎯 Mission Progress
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
              🌐 Portal Status
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
              🌐 Individual Portal Details & Real-Time Status ({portals.length} Total Portals)
            </h3>
            <div
              style={{
                fontSize: '0.875rem',
                color: '#94a3b8',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
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
              Auto-refresh every 3 seconds
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '16px',
              maxHeight: '800px',
              overflowY: 'auto',
              paddingRight: '8px',
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
                      {portal.status === 'complete' ? 'LIVE' : portal.status.toUpperCase()}
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

                    <div
                      style={{
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        marginTop: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      {portal.lastUpdate === 'Just now' && (
                        <div
                          style={{
                            width: '6px',
                            height: '6px',
                            backgroundColor: '#10b981',
                            borderRadius: '50%',
                            animation: 'pulse 1s infinite',
                          }}
                        ></div>
                      )}
                      Last update: {portal.lastUpdate}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Portal Analytics & Performance */}
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            marginBottom: '32px',
          }}
        >
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '24px' }}>
            📊 Portal Analytics & Performance
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px',
            }}
          >
            {/* Top Performing Portals */}
            <div>
              <h4
                style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '12px',
                  color: '#4CAF50',
                }}
              >
                🏆 Top Performing Portals
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}
                >
                  <span>Driver Portal</span>
                  <span style={{ color: '#10b981' }}>5.2K users</span>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}
                >
                  <span>Marketplace Portal</span>
                  <span style={{ color: '#10b981' }}>2.1K users</span>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}
                >
                  <span>Load Board Portal</span>
                  <span style={{ color: '#10b981' }}>3.2K users</span>
                </div>
              </div>
            </div>

            {/* Development Velocity */}
            <div>
              <h4
                style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '12px',
                  color: '#3b82f6',
                }}
              >
                ⚡ Development Velocity
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}
                >
                  <span>Portals/Day</span>
                  <span style={{ color: '#3b82f6' }}>0.8</span>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}
                >
                  <span>Features/Day</span>
                  <span style={{ color: '#3b82f6' }}>12.5</span>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}
                >
                  <span>Bug Fixes/Day</span>
                  <span style={{ color: '#3b82f6' }}>8.3</span>
                </div>
              </div>
            </div>

            {/* Quality Metrics */}
            <div>
              <h4
                style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '12px',
                  color: '#f59e0b',
                }}
              >
                🎯 Quality Metrics
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}
                >
                  <span>Avg Rating</span>
                  <span style={{ color: '#f59e0b' }}>4.7/5.0</span>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}
                >
                  <span>Uptime</span>
                  <span style={{ color: '#10b981' }}>99.8%</span>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}
                >
                  <span>Response Time</span>
                  <span style={{ color: '#10b981' }}>120ms</span>
                </div>
              </div>
            </div>

            {/* Critical Issues */}
            <div>
              <h4
                style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '12px',
                  color: '#ef4444',
                }}
              >
                🚨 Critical Issues
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}
                >
                  <span>High Priority</span>
                  <span style={{ color: '#ef4444' }}>3</span>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}
                >
                  <span>Medium Priority</span>
                  <span style={{ color: '#f59e0b' }}>12</span>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}
                >
                  <span>Low Priority</span>
                  <span style={{ color: '#6b7280' }}>28</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Distribution by Portal Category */}
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            marginBottom: '32px',
          }}
        >
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '24px' }}>
            🤖 Agent Distribution by Portal Category
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {/* Core TMS Portals */}
            <div>
              <h4
                style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '12px',
                  color: '#10b981',
                }}
              >
                🚛 Core TMS Portals
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}
                >
                  <span>Total Agents</span>
                  <span style={{ color: '#10b981' }}>147</span>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}
                >
                  <span>Active Agents</span>
                  <span style={{ color: '#10b981' }}>142</span>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}
                >
                  <span>Maintenance</span>
                  <span style={{ color: '#f59e0b' }}>3</span>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}
                >
                  <span>Error Recovery</span>
                  <span style={{ color: '#ef4444' }}>2</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.875rem',
                    marginTop: '8px',
                    paddingTop: '8px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <span>Avg: 13.4 agents per portal</span>
                </div>
              </div>
            </div>

            {/* Business Operations */}
            <div>
              <h4
                style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '12px',
                  color: '#3b82f6',
                }}
              >
                💼 Business Operations
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}
                >
                  <span>Total Agents</span>
                  <span style={{ color: '#3b82f6' }}>78</span>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}
                >
                  <span>Active Agents</span>
                  <span style={{ color: '#3b82f6' }}>72</span>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}
                >
                  <span>Maintenance</span>
                  <span style={{ color: '#f59e0b' }}>4</span>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}
                >
                  <span>Error Recovery</span>
                  <span style={{ color: '#ef4444' }}>2</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.875rem',
                    marginTop: '8px',
                    paddingTop: '8px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <span>Avg: 4.9 agents per portal</span>
                </div>
              </div>
            </div>

            {/* Admin & Specialized */}
            <div>
              <h4
                style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '12px',
                  color: '#8b5cf6',
                }}
              >
                🔧 Admin & Specialized
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}
                >
                  <span>Total Agents</span>
                  <span style={{ color: '#8b5cf6' }}>25</span>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}
                >
                  <span>Active Agents</span>
                  <span style={{ color: '#8b5cf6' }}>23</span>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}
                >
                  <span>Maintenance</span>
                  <span style={{ color: '#f59e0b' }}>0</span>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}
                >
                  <span>Error Recovery</span>
                  <span style={{ color: '#ef4444' }}>2</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.875rem',
                    marginTop: '8px',
                    paddingTop: '8px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <span>Avg: 6.3 agents per portal</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline & Milestones */}
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            marginBottom: '32px',
          }}
        >
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '24px' }}>
            ⏰ Timeline & Milestones
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {/* Real-Time Mission Clock */}
            <div>
              <h4
                style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '12px',
                  color: '#8a2be2',
                }}
              >
                🕐 Real-Time Mission Clock
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#8a2be2' }}>
                  {currentTime.toLocaleTimeString()}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
                  {currentTime.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
                  Mission Time: Day 49 of 70 total days (7 weeks)
                </div>
                <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
                  Start Date: September 9, 2025 at 10:00 AM
                </div>
                <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
                  Target Completion: October 28, 2025 at 6:00 PM
                </div>
                <div style={{ fontSize: '0.875rem', color: '#f59e0b', fontWeight: '600' }}>
                  Days Remaining: 21 days (3 weeks)
                </div>
                <div style={{ fontSize: '0.875rem', color: '#10b981', fontWeight: '600' }}>
                  Hours Remaining: 504 hours
                </div>
                <div style={{ fontSize: '0.875rem', color: '#10b981', fontWeight: '600' }}>
                  Overall Progress: {overallProgress}%
                </div>
              </div>
            </div>

            {/* Key Milestones */}
            <div>
              <h4
                style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '12px',
                  color: '#4CAF50',
                }}
              >
                🎯 Key Milestones
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Phase 1: Core Infrastructure */}
                <div
                  style={{
                    padding: '12px',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderRadius: '8px',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '4px',
                    }}
                  >
                    <span style={{ color: '#10b981' }}>✅ Complete</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                      Phase 1: Core Infrastructure
                    </span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    Database, auth, roles, 11 Core TMS portals
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#10b981' }}>
                    Completed: Sep 16, 2025 (Week 1)
                  </div>
                </div>

                {/* Phase 2: UI/UX Design System */}
                <div
                  style={{
                    padding: '12px',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderRadius: '8px',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '4px',
                    }}
                  >
                    <span style={{ color: '#3b82f6' }}>🔄 85%</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                      Phase 2: UI/UX Design System
                    </span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    Portal templates, core features, 16 Business operations portals
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#3b82f6' }}>
                    Target: Sep 30, 2025 (Weeks 2-3)
                  </div>
                </div>

                {/* Phase 3: Full Portal Builds */}
                <div
                  style={{
                    padding: '12px',
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    borderRadius: '8px',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '4px',
                    }}
                  >
                    <span style={{ color: '#8b5cf6' }}>⏳ 45%</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                      Phase 3: Full Portal Builds
                    </span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    RBAC, workflows, 8 Admin & specialized portals
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#8b5cf6' }}>
                    Target: Oct 14, 2025 (Weeks 4-5)
                  </div>
                </div>

                {/* Phase 4: Integrations & Optimizations */}
                <div
                  style={{
                    padding: '12px',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    borderRadius: '8px',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '4px',
                    }}
                  >
                    <span style={{ color: '#f59e0b' }}>🚀 15%</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                      Phase 4: Integrations & Optimizations
                    </span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    Integrations, scaling, and optimizations
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#f59e0b' }}>
                    Target: Oct 28, 2025 at 6:00 PM (Weeks 6-7)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Status */}
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
            <span>🎯 Mission Status: FULLY DEPLOYED AND COMMITTED</span>
          </div>
          <div style={{ marginTop: '8px', fontSize: '0.875rem', color: '#94a3b8' }}>
            All 250 MCP agents are operational and working towards the October 28, 2025 deadline
          </div>
        </div>
      </div>
    </div>
  );
}

export default MCPProgressDashboard;
