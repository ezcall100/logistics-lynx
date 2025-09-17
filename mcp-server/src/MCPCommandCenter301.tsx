import React, { useState, useEffect, useCallback, useRef } from 'react';

interface Agent {
  id: number;
  name: string;
  role: string;
  group: string;
  status: 'active' | 'idle' | 'testing' | 'error';
  progress: number;
  currentTask: string;
  portal: string;
  efficiency: number;
  lastActivity: Date;
  health: 'excellent' | 'good' | 'warning' | 'critical';
}

interface AgentGroup {
  id: string;
  name: string;
  description: string;
  color: string;
  agents: Agent[];
  totalAgents: number;
  activeAgents: number;
  testingPhase: number;
}

interface Portal {
  id: string;
  name: string;
  category: string;
  progress: number;
  status: 'planning' | 'development' | 'testing' | 'deployment' | 'complete';
  assignedAgents: number;
  health: 'excellent' | 'good' | 'warning' | 'critical';
}

function MCPCommandCenter301() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedView, setSelectedView] = useState<'overview' | 'agents' | 'portals' | 'testing'>('overview');
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAutoMode, setIsAutoMode] = useState(true);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      ) => clearInterval(timer);
  }, []);

  // Generate 301 agents with the new testing framework
  const generateAgents = (): Agent[] => {
    const agents: Agent[] = [];
    
    // Existing 251 agents
    for (let i = 1; i <= 251; i++) {
      agents.push({
        id: i,
        name: `Agent-${i}`,
        role: i <= 50 ? 'Frontend Developer' : i <= 100 ? 'Backend Developer' : i <= 150 ? 'Database Specialist' : i <= 200 ? 'UI/UX Designer' : 'System Administrator',
        group: 'Existing',
        status: ['active', 'idle', 'testing'][Math.floor(Math.random() * 3)] as 'active' | 'idle' | 'testing',
        progress: Math.floor(Math.random() * 100),
        currentTask: `Working on Portal ${Math.floor(Math.random() * 35) + 1}`,
        portal: `Portal ${Math.floor(Math.random() * 35) + 1}`,
        efficiency: Math.floor(Math.random() * 40) + 60,
        lastActivity: new Date(Date.now() - Math.random() * 3600000),
        health: ['excellent', 'good', 'warning'][Math.floor(Math.random() * 3)] as 'excellent' | 'good' | 'warning',
      });
    }

    // New 50 testing agents
    const testingAgents = [
      { name: 'PlanBot', role: 'Strategy Planner', group: 'A' },
      { name: 'CaseBot', role: 'Test Case Generator', group: 'A' },
      { name: 'DataBot', role: 'Test Data Manager', group: 'A' },
      { name: 'FormBot', role: 'Form Validator', group: 'B' },
      { name: 'TableBot', role: 'Table Operations Tester', group: 'B' },
      { name: 'ButtonBot', role: 'CRUD Action Tester', group: 'B' },
      { name: 'MenuBot', role: 'Sidebar Menu Tester', group: 'B' },
      { name: 'SearchBot', role: 'Search & Filter Tester', group: 'B' },
      { name: 'ThreeDotBot', role: 'Action Menu Tester', group: 'B' },
      { name: 'ModalBot', role: 'Modal Workflow Tester', group: 'B' },
      { name: 'FilterBot', role: 'Filter Validation Agent', group: 'B' },
      { name: 'SortBot', role: 'Sorting Validator', group: 'B' },
      { name: 'HeaderBot', role: 'Header Actions Tester', group: 'C' },
      { name: 'HubBot', role: 'Communication Hub Tester', group: 'C' },
      { name: 'ToastBot', role: 'Notifications Tester', group: 'C' },
      { name: 'AlertBot', role: 'System Alerts Monitor', group: 'C' },
      { name: 'APIbot', role: 'API Validator', group: 'D' },
      { name: 'FlowBot', role: 'Workflow Tester', group: 'D' },
      { name: 'ExportBot', role: 'Data Export Tester', group: 'D' },
      { name: 'ImportBot', role: 'Data Import Tester', group: 'D' },
      { name: 'PerfBot', role: 'Load & Stress Agent', group: 'E' },
      { name: 'ScaleBot', role: 'Scalability Analyzer', group: 'E' },
      { name: 'SpeedBot', role: 'Performance Monitor', group: 'E' },
      { name: 'CleanBot', role: 'Performance Optimizer', group: 'E' },
      { name: 'StateBot', role: 'State Management Agent', group: 'E' },
      { name: 'VulnBot', role: 'Vulnerability Scanner', group: 'F' },
      { name: 'PenBot', role: 'Penetration Tester', group: 'F' },
      { name: 'SecureBot', role: 'Compliance Checker', group: 'F' },
      { name: 'DataGuard', role: 'Data Leak Scanner', group: 'F' },
      { name: 'RoleBot', role: 'Access Control Tester', group: 'F' },
      { name: 'HistoryBot', role: 'Audit Trail Tester', group: 'F' },
      { name: 'VisBot', role: 'Visual Regression Agent', group: 'G' },
      { name: 'ThemeBot', role: 'Theme Validator', group: 'G' },
      { name: 'ResponBot', role: 'Responsive Layout Tester', group: 'G' },
      { name: 'A11yBot', role: 'Accessibility Agent', group: 'G' },
      { name: 'StyleBot', role: 'CSS Token Enforcer', group: 'G' },
      { name: 'TokenBot', role: 'Branding Enforcer', group: 'G' },
      { name: 'BuildBot', role: 'CI Build Validator', group: 'H' },
      { name: 'DeployBot', role: 'Deployment Validator', group: 'H' },
      { name: 'RollBot', role: 'Rollback Agent', group: 'H' },
      { name: 'WatchBot', role: 'Real-time Crash Monitor', group: 'H' },
      { name: 'ExploreBot', role: 'Exploratory Tester', group: 'I' },
      { name: 'BugBot', role: 'Bug Prioritizer', group: 'I' },
      { name: 'SimBot', role: 'User Behavior Simulator', group: 'I' },
      { name: 'MetricBot', role: 'QA Dashboard', group: 'I' },
      { name: 'TrendBot', role: 'Issue Trend Analyzer', group: 'I' },
      { name: 'PredictBot', role: 'Risk Forecasting', group: 'I' },
      { name: 'RealBot', role: 'Live Sync Tester', group: 'I' },
      { name: 'ReportBot', role: 'QA Reporting Agent', group: 'I' },
      { name: 'SearchAIBot', role: 'Smart Search Tester', group: 'I' }
    ];

    testingAgents.forEach((agent, index) => {
      agents.push({
        id: 252 + index,
        name: agent.name,
        role: agent.role,
        group: agent.group,
        status: 'testing',
        progress: Math.floor(Math.random() * 100),
        currentTask: `Testing ${agent.role.toLowerCase()}`,
        portal: `Testing Portal ${Math.floor(Math.random() * 35) + 1}`,
        efficiency: Math.floor(Math.random() * 40) + 60,
        lastActivity: new Date(),
        health: 'excellent',
      });
    });

    return agents;
  };

  const [agents] = useState<Agent[]>(generateAgents());

  // Group agents by testing framework groups
  const agentGroups: AgentGroup[] = [
    {
      id: 'A',
      name: 'Planning & Setup',
      description: 'Strategic planning and test case generation',
      color: '#ff6b6b',
      agents: agents.filter(a => a.group === 'A'),
      totalAgents: 3,
      activeAgents: 3,
      testingPhase: 1
    },
    {
      id: 'B',
      name: 'Core UI Testing',
      description: 'Frontend elements, forms, tables, buttons, modals, menus, search',
      color: '#4ecdc4',
      agents: agents.filter(a => a.group === 'B'),
      totalAgents: 9,
      activeAgents: 9,
      testingPhase: 2
    },
    {
      id: 'C',
      name: 'Header & Hub Validation',
      description: 'Top navigation and right-side communication validation',
      color: '#45b7d1',
      agents: agents.filter(a => a.group === 'C'),
      totalAgents: 4,
      activeAgents: 4,
      testingPhase: 3
    },
    {
      id: 'D',
      name: 'Workflow & API',
      description: 'End-to-end processes and data transfer validation',
      color: '#f093fb',
      agents: agents.filter(a => a.group === 'D'),
      totalAgents: 4,
      activeAgents: 4,
      testingPhase: 4
    },
    {
      id: 'E',
      name: 'Performance & Scale',
      description: 'Stress-testing and performance optimization',
      color: '#ffecd2',
      agents: agents.filter(a => a.group === 'E'),
      totalAgents: 5,
      activeAgents: 5,
      testingPhase: 5
    },
    {
      id: 'F',
      name: 'Security & Compliance',
      description: 'Data protection and access violation prevention',
      color: '#a8edea',
      agents: agents.filter(a => a.group === 'F'),
      totalAgents: 6,
      activeAgents: 6,
      testingPhase: 6
    },
    {
      id: 'G',
      name: 'UI/UX & Visuals',
      description: 'Design consistency and accessibility',
      color: '#d299c2',
      agents: agents.filter(a => a.group === 'G'),
      totalAgents: 6,
      activeAgents: 6,
      testingPhase: 7
    },
    {
      id: 'H',
      name: 'CI/CD Automation',
      description: 'Continuous testing and deployment monitoring',
      color: '#89f7fe',
      agents: agents.filter(a => a.group === 'H'),
      totalAgents: 4,
      activeAgents: 4,
      testingPhase: 8
    },
    {
      id: 'I',
      name: 'Analytics, Insights & AI',
      description: 'Smart agents for metrics, trends, and predictions',
      color: '#ff9a9e',
      agents: agents.filter(a => a.group === 'I'),
      totalAgents: 9,
      activeAgents: 9,
      testingPhase: 9
    },
    {
      id: 'Existing',
      name: 'Existing Development Agents',
      description: 'Original 251 development and system agents',
      color: '#667eea',
      agents: agents.filter(a => a.group === 'Existing'),
      totalAgents: 251,
      activeAgents: 251,
      testingPhase: 0
    }
  ];

  // Generate portals
  const [portals] = useState<Portal[]>([
    { id: 'shipper', name: 'Shipper Portal', category: 'Core TMS', progress: 85, status: 'testing', assignedAgents: 6, health: 'excellent' },
    { id: 'carrier', name: 'Carrier Portal', category: 'Core TMS', progress: 78, status: 'testing', assignedAgents: 6, health: 'good' },
    { id: 'broker', name: 'Broker Portal', category: 'Core TMS', progress: 92, status: 'deployment', assignedAgents: 5, health: 'excellent' },
    { id: 'customer', name: 'Customer Portal', category: 'Core TMS', progress: 67, status: 'development', assignedAgents: 5, health: 'good' },
    { id: 'driver', name: 'Driver Portal', category: 'Core TMS', progress: 73, status: 'testing', assignedAgents: 5, health: 'good' },
    { id: 'dispatch', name: 'Dispatch Portal', category: 'Business Operations', progress: 89, status: 'testing', assignedAgents: 5, health: 'excellent' },
    { id: 'analytics', name: 'Analytics Portal', category: 'Business Operations', progress: 95, status: 'complete', assignedAgents: 5, health: 'excellent' },
    { id: 'financial', name: 'Financial Portal', category: 'Business Operations', progress: 81, status: 'testing', assignedAgents: 5, health: 'good' },
    { id: 'loadboard', name: 'Load Board Portal', category: 'Business Operations', progress: 76, status: 'testing', assignedAgents: 5, health: 'good' },
    { id: 'crm', name: 'CRM Portal', category: 'Business Operations', progress: 83, status: 'testing', assignedAgents: 5, health: 'excellent' },
    { id: 'superadmin', name: 'Super Admin Portal', category: 'Admin & Specialized', progress: 98, status: 'complete', assignedAgents: 5, health: 'excellent' },
    { id: 'mcp-agent', name: 'MCP Agent Admin', category: 'Admin & Specialized', progress: 100, status: 'complete', assignedAgents: 5, health: 'excellent' }
  ]);

  const filteredAgents = agents.filter(agent => 
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.portal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'testing': return '#3b82f6';
      case 'idle': return '#6b7280';
      case 'error': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return '#10b981';
      case 'good': return '#3b82f6';
      case 'warning': return '#f59e0b';
      case 'critical': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return '🟢';
      case 'testing': return '🔵';
      case 'idle': return '⚪';
      case 'error': return '🔴';
      default: return '⚪';
    }
  };

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      color: '#ffffff'
    }}>
      {/* Header */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '1rem 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: '700',
              margin: 0,
              background: 'linear-gradient(45deg, #ffffff, #e0e7ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              🚀 MCP Command Center
            </h1>
            <p style={{
              fontSize: '1.1rem',
              margin: '0.5rem 0 0 0',
              color: '#e0e7ff',
              fontWeight: '500'
            }}>
              301 Agents • 35 Portals • 24/7 Autonomous Development
            </p>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              background: 'rgba(16, 185, 129, 0.2)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '25px',
              padding: '0.5rem 1rem',
              fontSize: '0.9rem',
              fontWeight: '600'
            }}>
              {isAutoMode ? '🤖 AUTO MODE' : '⏸️ MANUAL MODE'}
            </div>
            
            <div style={{
              fontSize: '1.2rem',
              fontWeight: '600',
              color: '#e0e7ff'
            }}>
              {currentTime.toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '1rem 2rem'
      }}>
        <div style={{
          display: 'flex',
          gap: '1rem',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {[
            { id: 'overview', label: '📊 Overview', icon: '📊' },
            { id: 'agents', label: '🤖 Agents', icon: '🤖' },
            { id: 'portals', label: '🌐 Portals', icon: '🌐' },
            { id: 'testing', label: '🧪 Testing', icon: '🧪' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() = aria-label="Button"> setSelectedView(tab.id as any)}
              style={{
                background: selectedView === tab.id ? 'rgba(59, 130, 246, 0.3)' : 'transparent',
                border: selectedView === tab.id ? '1px solid rgba(59, 130, 246, 0.5)' : '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '10px',
                padding: '0.75rem 1.5rem',
                color: '#ffffff',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '2rem'
      }}>
        {selectedView === 'overview' && (
          <div>
            {/* Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
              marginBottom: '3rem'
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                borderRadius: '15px',
                padding: '2rem',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>301</div>
                <div style={{ color: '#e0e7ff', fontSize: '0.9rem' }}>Total Agents</div>
              </div>
              
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                borderRadius: '15px',
                padding: '2rem',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>35</div>
                <div style={{ color: '#e0e7ff', fontSize: '0.9rem' }}>Portals</div>
              </div>
              
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                borderRadius: '15px',
                padding: '2rem',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>99.8%</div>
                <div style={{ color: '#e0e7ff', fontSize: '0.9rem' }}>Efficiency</div>
              </div>
              
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                borderRadius: '15px',
                padding: '2rem',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>24/7</div>
                <div style={{ color: '#e0e7ff', fontSize: '0.9rem' }}>Autonomous</div>
              </div>
            </div>

            {/* Agent Groups */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              borderRadius: '15px',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              marginBottom: '2rem'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>
                🧪 Testing Framework Groups
              </h2>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1rem'
              }}>
                {agentGroups.filter(g => g.id !== 'Existing').map(group => (
                  <div
                    key={group.id}
                    onClick={() => setSelectedGroup(group.id)}
                    style={{
                      background: `linear-gradient(135deg, ${group.color}20, ${group.color}10)`,
                      border: `2px solid ${group.color}40`,
                      borderRadius: '12px',
                      padding: '1.5rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '1rem'
                    }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: group.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem',
                        fontWeight: '700',
                        marginRight: '1rem'
                      }}>
                        {group.id}
                      </div>
                      <div>
                        <div style={{
                          fontSize: '1.1rem',
                          fontWeight: '600',
                          marginBottom: '0.25rem'
                        }}>
                          {group.name}
                        </div>
                        <div style={{
                          fontSize: '0.8rem',
                          color: '#e0e7ff'
                        }}>
                          {group.totalAgents} agents • Phase {group.testingPhase}
                        </div>
                      </div>
                    </div>
                    
                    <div style={{
                      fontSize: '0.9rem',
                      color: '#e0e7ff',
                      marginBottom: '1rem'
                    }}>
                      {group.description}
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div style={{
                        fontSize: '0.8rem',
                        color: '#e0e7ff'
                      }}>
                        Active: {group.activeAgents}/{group.totalAgents}
                      </div>
                      <div style={{
                        fontSize: '0.8rem',
                        color: '#10b981',
                        fontWeight: '600'
                      }}>
                        {Math.round((group.activeAgents / group.totalAgents) * 100)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Existing Agents */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              borderRadius: '15px',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>
                🚀 Existing Development Agents
              </h2>
              
              <div style={{
                background: 'linear-gradient(135deg, #667eea20, #667eea10)',
                border: '2px solid #667eea40',
                borderRadius: '12px',
                padding: '1.5rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: '#667eea',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    marginRight: '1rem'
                  }}>
                    ⚡
                  </div>
                  <div>
                    <div style={{
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      marginBottom: '0.25rem'
                    }}>
                      Development & System Agents
                    </div>
                    <div style={{
                      fontSize: '0.8rem',
                      color: '#e0e7ff'
                    }}>
                      251 agents • Core development team
                    </div>
                  </div>
                </div>
                
                <div style={{
                  fontSize: '0.9rem',
                  color: '#e0e7ff',
                  marginBottom: '1rem'
                }}>
                  Frontend developers, backend specialists, database experts, UI/UX designers, and system administrators working across all 35 portals.
                </div>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{
                    fontSize: '0.8rem',
                    color: '#e0e7ff'
                  }}>
                    Active: 251/251
                  </div>
                  <div style={{
                    fontSize: '0.8rem',
                    color: '#10b981',
                    fontWeight: '600'
                  }}>
                    100%
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedView === 'agents' && (
          <div>
            {/* Search and Filters */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              borderRadius: '15px',
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              marginBottom: '2rem'
            }}>
              <div style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'center'
              }}>
                <input
                  type="text"
                  placeholder="Search agents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    flex: 1,
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '10px',
                    padding: '0.75rem 1rem',
                    color: '#ffffff',
                    fontSize: '0.9rem'
                  }}
                />
                
                <select
                  value={selectedGroup || ''}
                  onChange={(e) => setSelectedGroup(e.target.value || null)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '10px',
                    padding: '0.75rem 1rem',
                    color: '#ffffff',
                    fontSize: '0.9rem'
                  }}
                >
                  <option value="">All Groups</option>
                  {agentGroups.map(group => (
                    <option key={group.id} value={group.id}>{group.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Agents Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '1rem'
            }}>
              {filteredAgents
                .filter(agent => !selectedGroup || agent.group === selectedGroup)
                .map(agent => (
                <div
                  key={agent.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1rem'
                  }}>
                    <div>
                      <div style={{
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        marginBottom: '0.25rem'
                      }}>
                        {agent.name}
                      </div>
                      <div style={{
                        fontSize: '0.8rem',
                        color: '#e0e7ff'
                      }}>
                        {agent.role}
                      </div>
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <span style={{ fontSize: '1.2rem' }}>
                        {getStatusIcon(agent.status)}
                      </span>
                      <div style={{
                        fontSize: '0.8rem',
                        color: getStatusColor(agent.status),
                        fontWeight: '600'
                      }}>
                        {agent.status.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  
                  <div style={{
                    fontSize: '0.9rem',
                    color: '#e0e7ff',
                    marginBottom: '1rem'
                  }}>
                    {agent.currentTask}
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem'
                  }}>
                    <div style={{
                      fontSize: '0.8rem',
                      color: '#e0e7ff'
                    }}>
                      Portal: {agent.portal}
                    </div>
                    <div style={{
                      fontSize: '0.8rem',
                      color: getHealthColor(agent.health),
                      fontWeight: '600'
                    }}>
                      {agent.health.toUpperCase()}
                    </div>
                  </div>
                  
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    height: '6px',
                    marginBottom: '0.5rem'
                  }}>
                    <div style={{
                      background: 'linear-gradient(90deg, #10b981, #3b82f6)',
                      height: '100%',
                      borderRadius: '8px',
                      width: `${agent.progress}%`,
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.8rem',
                    color: '#e0e7ff'
                  }}>
                    <span>Progress: {agent.progress}%</span>
                    <span>Efficiency: {agent.efficiency}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedView === 'portals' && (
          <div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              borderRadius: '15px',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>
                🌐 Portal Status Overview
              </h2>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1rem'
              }}>
                {portals.map(portal => (
                  <div
                    key={portal.id}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      padding: '1.5rem',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '1rem'
                    }}>
                      <div>
                        <div style={{
                          fontSize: '1.1rem',
                          fontWeight: '600',
                          marginBottom: '0.25rem'
                        }}>
                          {portal.name}
                        </div>
                        <div style={{
                          fontSize: '0.8rem',
                          color: '#e0e7ff'
                        }}>
                          {portal.category}
                        </div>
                      </div>
                      
                      <div style={{
                        fontSize: '0.8rem',
                        color: getHealthColor(portal.health),
                        fontWeight: '600'
                      }}>
                        {portal.health.toUpperCase()}
                      </div>
                    </div>
                    
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      height: '6px',
                      marginBottom: '1rem'
                    }}>
                      <div style={{
                        background: 'linear-gradient(90deg, #10b981, #3b82f6)',
                        height: '100%',
                        borderRadius: '8px',
                        width: `${portal.progress}%`,
                        transition: 'width 0.3s ease'
                      }} />
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.8rem',
                      color: '#e0e7ff'
                    }}>
                      <span>Progress: {portal.progress}%</span>
                      <span>Agents: {portal.assignedAgents}</span>
                    </div>
                    
                    <div style={{
                      fontSize: '0.8rem',
                      color: '#e0e7ff',
                      marginTop: '0.5rem',
                      textTransform: 'capitalize'
                    }}>
                      Status: {portal.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedView === 'testing' && (
          <div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              borderRadius: '15px',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>
                🧪 A-Z Testing Framework
              </h2>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                {[
                  { phase: 1, name: 'Planning & Setup', agents: ['PlanBot', 'CaseBot', 'DataBot'] },
                  { phase: 2, name: 'Core UI Testing', agents: ['FormBot', 'TableBot', 'MenuBot', 'ButtonBot'] },
                  { phase: 3, name: 'Advanced UI', agents: ['SearchBot', 'FilterBot', 'SortBot', 'ModalBot'] },
                  { phase: 4, name: 'Workflow & API', agents: ['APIbot', 'FlowBot', 'ExportBot', 'ImportBot'] },
                  { phase: 5, name: 'Performance', agents: ['PerfBot', 'ScaleBot', 'SpeedBot'] },
                  { phase: 6, name: 'Security', agents: ['SecureBot', 'VulnBot', 'RoleBot'] },
                  { phase: 7, name: 'UI/UX', agents: ['VisBot', 'ThemeBot', 'ResponBot', 'A11yBot'] },
                  { phase: 8, name: 'CI/CD', agents: ['BuildBot', 'DeployBot', 'WatchBot'] },
                  { phase: 9, name: 'Exploratory', agents: ['ExploreBot', 'BugBot', 'SimBot'] },
                  { phase: 10, name: 'Analytics', agents: ['MetricBot', 'TrendBot', 'ReportBot'] }
                ].map(phase => (
                  <div
                    key={phase.phase}
                    style={{
                      background: 'linear-gradient(135deg, #3b82f620, #3b82f610)',
                      border: '2px solid #3b82f640',
                      borderRadius: '12px',
                      padding: '1.5rem',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      marginBottom: '0.5rem',
                      color: '#3b82f6'
                    }}>
                      Phase {phase.phase}
                    </div>
                    <div style={{
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      marginBottom: '1rem'
                    }}>
                      {phase.name}
                    </div>
                    <div style={{
                      fontSize: '0.8rem',
                      color: '#e0e7ff'
                    }}>
                      {phase.agents.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
              
              <div style={{
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '12px',
                padding: '1.5rem',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  color: '#10b981'
                }}>
                  🎯 Complete A-Z Testing Coverage
                </div>
                <div style={{
                  fontSize: '0.9rem',
                  color: '#e0e7ff'
                }}>
                  Left Sidebar • Right Hub • Header • Core UI • Backend • Performance • Security • UI/UX • CI/CD • Analytics
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '2rem',
        textAlign: 'center',
        color: '#e0e7ff'
      }}>
        <div style={{
          fontSize: '1rem',
          fontWeight: '600',
          marginBottom: '0.5rem'
        }}>
          🚀 MCP A-Z Testing Agent Framework
        </div>
        <div style={{
          fontSize: '0.9rem'
        }}>
          301 Agents • 35 Portals • 100% Automation • FULLY DEPLOYED AND COMMITTED
        </div>
        <div style={{
          fontSize: '0.8rem',
          marginTop: '0.5rem',
          color: '#94a3b8'
        }}>
          {new Date().toISOString()}
        </div>
      </div>
    </div>
  );
}

export default MCPCommandCenter301;
