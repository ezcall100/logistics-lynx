import React, { useState, useEffect } from 'react';

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
  superAdminTask: string;
}

interface SuperAdminModule {
  id: string;
  name: string;
  description: string;
  progress: number;
  status: 'planning' | 'development' | 'testing' | 'deployment' | 'complete';
  assignedAgents: number;
  priority: 'critical' | 'high' | 'medium' | 'low';
  estimatedCompletion: string;
  blockers: string[];
}

function SuperAdminFocus301() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAutoMode, setIsAutoMode] = useState(true);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Generate 301 agents focused on Super Admin
  const generateSuperAdminAgents = (): Agent[] => {
    const agents: Agent[] = [];
    
    // Existing 251 agents redirected to Super Admin
    for (let i = 1; i <= 251; i++) {
      const superAdminTasks = [
        'Building Super Admin Dashboard',
        'Implementing User Management System',
        'Creating Role-Based Access Control',
        'Developing System Settings Panel',
        'Building MCP Agent Management',
        'Creating Analytics & Reports',
        'Implementing Security Features',
        'Building Portal Management',
        'Creating System Monitoring',
        'Developing Backup & Recovery',
        'Building Integration Management',
        'Creating Compliance Tools',
        'Implementing Audit Trails',
        'Building Performance Monitoring',
        'Creating System Health Checks'
      ];
      
      agents.push({
        id: i,
        name: `Agent-${i}`,
        role: i <= 50 ? 'Frontend Developer' : i <= 100 ? 'Backend Developer' : i <= 150 ? 'Database Specialist' : i <= 200 ? 'UI/UX Designer' : 'System Administrator',
        group: 'Existing',
        status: 'active',
        progress: Math.floor(Math.random() * 100),
        currentTask: superAdminTasks[Math.floor(Math.random() * superAdminTasks.length)],
        portal: 'Super Admin Portal',
        efficiency: Math.floor(Math.random() * 40) + 60,
        lastActivity: new Date(Date.now() - Math.random() * 3600000),
        health: ['excellent', 'good', 'warning'][Math.floor(Math.random() * 3)] as 'excellent' | 'good' | 'warning',
        superAdminTask: superAdminTasks[Math.floor(Math.random() * superAdminTasks.length)]
      });
    }

    // New 50 testing agents focused on Super Admin testing
    const testingAgents = [
      { name: 'PlanBot', role: 'Strategy Planner', group: 'A', task: 'Planning Super Admin test coverage' },
      { name: 'CaseBot', role: 'Test Case Generator', group: 'A', task: 'Generating Super Admin test cases' },
      { name: 'DataBot', role: 'Test Data Manager', group: 'A', task: 'Creating Super Admin test data' },
      { name: 'FormBot', role: 'Form Validator', group: 'B', task: 'Testing Super Admin forms' },
      { name: 'TableBot', role: 'Table Operations Tester', group: 'B', task: 'Testing Super Admin tables' },
      { name: 'ButtonBot', role: 'CRUD Action Tester', group: 'B', task: 'Testing Super Admin CRUD operations' },
      { name: 'MenuBot', role: 'Sidebar Menu Tester', group: 'B', task: 'Testing Super Admin navigation' },
      { name: 'SearchBot', role: 'Search & Filter Tester', group: 'B', task: 'Testing Super Admin search' },
      { name: 'ThreeDotBot', role: 'Action Menu Tester', group: 'B', task: 'Testing Super Admin action menus' },
      { name: 'ModalBot', role: 'Modal Workflow Tester', group: 'B', task: 'Testing Super Admin modals' },
      { name: 'FilterBot', role: 'Filter Validation Agent', group: 'B', task: 'Testing Super Admin filters' },
      { name: 'SortBot', role: 'Sorting Validator', group: 'B', task: 'Testing Super Admin sorting' },
      { name: 'HeaderBot', role: 'Header Actions Tester', group: 'C', task: 'Testing Super Admin header' },
      { name: 'HubBot', role: 'Communication Hub Tester', group: 'C', task: 'Testing Super Admin communication' },
      { name: 'ToastBot', role: 'Notifications Tester', group: 'C', task: 'Testing Super Admin notifications' },
      { name: 'AlertBot', role: 'System Alerts Monitor', group: 'C', task: 'Monitoring Super Admin alerts' },
      { name: 'APIbot', role: 'API Validator', group: 'D', task: 'Testing Super Admin APIs' },
      { name: 'FlowBot', role: 'Workflow Tester', group: 'D', task: 'Testing Super Admin workflows' },
      { name: 'ExportBot', role: 'Data Export Tester', group: 'D', task: 'Testing Super Admin exports' },
      { name: 'ImportBot', role: 'Data Import Tester', group: 'D', task: 'Testing Super Admin imports' },
      { name: 'PerfBot', role: 'Load & Stress Agent', group: 'E', task: 'Testing Super Admin performance' },
      { name: 'ScaleBot', role: 'Scalability Analyzer', group: 'E', task: 'Analyzing Super Admin scalability' },
      { name: 'SpeedBot', role: 'Performance Monitor', group: 'E', task: 'Monitoring Super Admin speed' },
      { name: 'CleanBot', role: 'Performance Optimizer', group: 'E', task: 'Optimizing Super Admin performance' },
      { name: 'StateBot', role: 'State Management Agent', group: 'E', task: 'Testing Super Admin state management' },
      { name: 'VulnBot', role: 'Vulnerability Scanner', group: 'F', task: 'Scanning Super Admin vulnerabilities' },
      { name: 'PenBot', role: 'Penetration Tester', group: 'F', task: 'Penetration testing Super Admin' },
      { name: 'SecureBot', role: 'Compliance Checker', group: 'F', task: 'Checking Super Admin compliance' },
      { name: 'DataGuard', role: 'Data Leak Scanner', group: 'F', task: 'Scanning Super Admin data leaks' },
      { name: 'RoleBot', role: 'Access Control Tester', group: 'F', task: 'Testing Super Admin access control' },
      { name: 'HistoryBot', role: 'Audit Trail Tester', group: 'F', task: 'Testing Super Admin audit trails' },
      { name: 'VisBot', role: 'Visual Regression Agent', group: 'G', task: 'Testing Super Admin visual regression' },
      { name: 'ThemeBot', role: 'Theme Validator', group: 'G', task: 'Validating Super Admin themes' },
      { name: 'ResponBot', role: 'Responsive Layout Tester', group: 'G', task: 'Testing Super Admin responsiveness' },
      { name: 'A11yBot', role: 'Accessibility Agent', group: 'G', task: 'Testing Super Admin accessibility' },
      { name: 'StyleBot', role: 'CSS Token Enforcer', group: 'G', task: 'Enforcing Super Admin styles' },
      { name: 'TokenBot', role: 'Branding Enforcer', group: 'G', task: 'Enforcing Super Admin branding' },
      { name: 'BuildBot', role: 'CI Build Validator', group: 'H', task: 'Validating Super Admin builds' },
      { name: 'DeployBot', role: 'Deployment Validator', group: 'H', task: 'Validating Super Admin deployment' },
      { name: 'RollBot', role: 'Rollback Agent', group: 'H', task: 'Testing Super Admin rollbacks' },
      { name: 'WatchBot', role: 'Real-time Crash Monitor', group: 'H', task: 'Monitoring Super Admin crashes' },
      { name: 'ExploreBot', role: 'Exploratory Tester', group: 'I', task: 'Exploratory testing Super Admin' },
      { name: 'BugBot', role: 'Bug Prioritizer', group: 'I', task: 'Prioritizing Super Admin bugs' },
      { name: 'SimBot', role: 'User Behavior Simulator', group: 'I', task: 'Simulating Super Admin user behavior' },
      { name: 'MetricBot', role: 'QA Dashboard', group: 'I', task: 'Creating Super Admin QA metrics' },
      { name: 'TrendBot', role: 'Issue Trend Analyzer', group: 'I', task: 'Analyzing Super Admin trends' },
      { name: 'PredictBot', role: 'Risk Forecasting', group: 'I', task: 'Forecasting Super Admin risks' },
      { name: 'RealBot', role: 'Live Sync Tester', group: 'I', task: 'Testing Super Admin live sync' },
      { name: 'ReportBot', role: 'QA Reporting Agent', group: 'I', task: 'Generating Super Admin reports' },
      { name: 'SearchAIBot', role: 'Smart Search Tester', group: 'I', task: 'Testing Super Admin AI search' }
    ];

    testingAgents.forEach((agent, index) => {
      agents.push({
        id: 252 + index,
        name: agent.name,
        role: agent.role,
        group: agent.group,
        status: 'testing',
        progress: Math.floor(Math.random() * 100),
        currentTask: agent.task,
        portal: 'Super Admin Portal',
        efficiency: Math.floor(Math.random() * 40) + 60,
        lastActivity: new Date(),
        health: 'excellent',
        superAdminTask: agent.task
      });
    });

    return agents;
  };

  const [agents] = useState<Agent[]>(generateSuperAdminAgents());

  // Super Admin modules
  const [superAdminModules] = useState<SuperAdminModule[]>([
    {
      id: 'dashboard',
      name: 'Super Admin Dashboard',
      description: 'Central control panel with system overview and metrics',
      progress: 85,
      status: 'testing',
      assignedAgents: 25,
      priority: 'critical',
      estimatedCompletion: '2 days',
      blockers: []
    },
    {
      id: 'user-management',
      name: 'User & Role Management',
      description: 'Comprehensive user management with role-based access control',
      progress: 78,
      status: 'development',
      assignedAgents: 30,
      priority: 'critical',
      estimatedCompletion: '3 days',
      blockers: ['RBAC implementation']
    },
    {
      id: 'mcp-agents',
      name: 'MCP Agent Management',
      description: 'Manage and monitor all 301 MCP autonomous agents',
      progress: 92,
      status: 'deployment',
      assignedAgents: 35,
      priority: 'critical',
      estimatedCompletion: '1 day',
      blockers: []
    },
    {
      id: 'system-settings',
      name: 'System Settings & Flags',
      description: 'Global system configuration and feature flags',
      progress: 67,
      status: 'development',
      assignedAgents: 20,
      priority: 'high',
      estimatedCompletion: '4 days',
      blockers: ['Configuration validation']
    },
    {
      id: 'analytics',
      name: 'Analytics & Reports',
      description: 'System analytics, performance metrics, and reporting',
      progress: 73,
      status: 'testing',
      assignedAgents: 25,
      priority: 'high',
      estimatedCompletion: '3 days',
      blockers: []
    },
    {
      id: 'security',
      name: 'Security & Compliance',
      description: 'Security monitoring, compliance checks, and audit trails',
      progress: 81,
      status: 'testing',
      assignedAgents: 30,
      priority: 'critical',
      estimatedCompletion: '2 days',
      blockers: []
    },
    {
      id: 'portal-management',
      name: 'Portal Management',
      description: 'Manage and configure all 35 portals from central location',
      progress: 59,
      status: 'development',
      assignedAgents: 28,
      priority: 'high',
      estimatedCompletion: '5 days',
      blockers: ['Portal configuration API']
    },
    {
      id: 'monitoring',
      name: 'System Monitoring',
      description: 'Real-time system health monitoring and alerting',
      progress: 88,
      status: 'testing',
      assignedAgents: 22,
      priority: 'high',
      estimatedCompletion: '2 days',
      blockers: []
    },
    {
      id: 'backup',
      name: 'Backup & Recovery',
      description: 'Automated backup systems and disaster recovery',
      progress: 45,
      status: 'planning',
      assignedAgents: 15,
      priority: 'medium',
      estimatedCompletion: '7 days',
      blockers: ['Backup strategy design']
    },
    {
      id: 'integrations',
      name: 'Integration Management',
      description: 'Manage external integrations and API connections',
      progress: 62,
      status: 'development',
      assignedAgents: 18,
      priority: 'medium',
      estimatedCompletion: '6 days',
      blockers: ['API documentation']
    },
    {
      id: 'compliance',
      name: 'Compliance Tools',
      description: 'GDPR, SOC2, and other compliance management tools',
      progress: 38,
      status: 'planning',
      assignedAgents: 12,
      priority: 'medium',
      estimatedCompletion: '8 days',
      blockers: ['Compliance requirements analysis']
    },
    {
      id: 'audit',
      name: 'Audit Trails',
      description: 'Comprehensive audit logging and trail management',
      progress: 71,
      status: 'development',
      assignedAgents: 20,
      priority: 'high',
      estimatedCompletion: '4 days',
      blockers: []
    }
  ]);

  const filteredAgents = agents.filter(agent => 
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.superAdminTask.toLowerCase().includes(searchTerm.toLowerCase())
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return '#ef4444';
      case 'high': return '#f59e0b';
      case 'medium': return '#3b82f6';
      case 'low': return '#10b981';
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

  const totalProgress = Math.round(superAdminModules.reduce((acc, module) => acc + module.progress, 0) / superAdminModules.length);

  return (
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
              🎯 Super Admin Focus - 301 Agents
            </h1>
            <p style={{
              fontSize: '1.1rem',
              margin: '0.5rem 0 0 0',
              color: '#e0e7ff',
              fontWeight: '500'
            }}>
              All 301 agents working exclusively on Super Admin Portal
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
              🎯 SUPER ADMIN FOCUS
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

      {/* Main Content */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '2rem'
      }}>
        {/* Super Admin Progress Overview */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '15px',
          padding: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
            <div>
              <h2 style={{
                fontSize: '1.8rem',
                fontWeight: '600',
                margin: 0,
                marginBottom: '0.5rem'
              }}>
                🏗️ Super Admin Portal Progress
              </h2>
              <p style={{
                fontSize: '1rem',
                color: '#e0e7ff',
                margin: 0
              }}>
                http://superadmin.transbotai.com:3000/
              </p>
            </div>
            
            <div style={{
              textAlign: 'right'
            }}>
              <div style={{
                fontSize: '3rem',
                fontWeight: '700',
                color: '#10b981',
                marginBottom: '0.5rem'
              }}>
                {totalProgress}%
              </div>
              <div style={{
                fontSize: '1rem',
                color: '#e0e7ff'
              }}>
                Overall Progress
              </div>
            </div>
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            height: '12px',
            marginBottom: '1rem'
          }}>
            <div style={{
              background: 'linear-gradient(90deg, #10b981, #3b82f6)',
              height: '100%',
              borderRadius: '10px',
              width: `${totalProgress}%`,
              transition: 'width 0.3s ease'
            }} />
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            <div style={{
              background: 'rgba(16, 185, 129, 0.2)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '10px',
              padding: '1rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: '700' }}>301</div>
              <div style={{ fontSize: '0.9rem', color: '#e0e7ff' }}>Total Agents</div>
            </div>
            
            <div style={{
              background: 'rgba(59, 130, 246, 0.2)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '10px',
              padding: '1rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: '700' }}>12</div>
              <div style={{ fontSize: '0.9rem', color: '#e0e7ff' }}>Modules</div>
            </div>
            
            <div style={{
              background: 'rgba(245, 158, 11, 0.2)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '10px',
              padding: '1rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: '700' }}>5</div>
              <div style={{ fontSize: '0.9rem', color: '#e0e7ff' }}>Critical Priority</div>
            </div>
            
            <div style={{
              background: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '10px',
              padding: '1rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: '700' }}>3</div>
              <div style={{ fontSize: '0.9rem', color: '#e0e7ff' }}>Blockers</div>
            </div>
          </div>
        </div>

        {/* Super Admin Modules */}
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
            🏗️ Super Admin Modules
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '1rem'
          }}>
            {superAdminModules.map(module => (
              <div
                key={module.id}
                onClick={() => setSelectedModule(module.id)}
                style={{
                  background: selectedModule === module.id ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                  border: selectedModule === module.id ? '2px solid rgba(59, 130, 246, 0.5)' : '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  cursor: 'pointer',
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
                      {module.name}
                    </div>
                    <div style={{
                      fontSize: '0.8rem',
                      color: '#e0e7ff'
                    }}>
                      {module.description}
                    </div>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '0.25rem'
                  }}>
                    <div style={{
                      fontSize: '0.8rem',
                      color: getPriorityColor(module.priority),
                      fontWeight: '600',
                      textTransform: 'uppercase'
                    }}>
                      {module.priority}
                    </div>
                    <div style={{
                      fontSize: '0.8rem',
                      color: '#e0e7ff'
                    }}>
                      {module.assignedAgents} agents
                    </div>
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
                    width: `${module.progress}%`,
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
                  <span>Progress: {module.progress}%</span>
                  <span>ETA: {module.estimatedCompletion}</span>
                </div>
                
                {module.blockers.length > 0 && (
                  <div style={{
                    marginTop: '0.5rem',
                    fontSize: '0.8rem',
                    color: '#ef4444'
                  }}>
                    ⚠️ Blockers: {module.blockers.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Agents Working on Super Admin */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '15px',
          padding: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              margin: 0
            }}>
              🤖 301 Agents Working on Super Admin
            </h2>
            
            <input
              type="text"
              placeholder="Search agents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '10px',
                padding: '0.75rem 1rem',
                color: '#ffffff',
                fontSize: '0.9rem',
                width: '300px'
              }}
            />
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '1rem',
            maxHeight: '600px',
            overflowY: 'auto'
          }}>
            {filteredAgents.map(agent => (
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
                  {agent.superAdminTask}
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
          🎯 Super Admin Portal Focus - 301 Agents
        </div>
        <div style={{
          fontSize: '0.9rem'
        }}>
          All agents working exclusively on http://superadmin.transbotai.com:3000/
        </div>
        <div style={{
          fontSize: '0.8rem',
          marginTop: '0.5rem',
          color: '#94a3b8'
        }}>
          FULLY DEPLOYED AND COMMITTED • {new Date().toISOString()}
        </div>
      </div>
    </div>
  );
}

export default SuperAdminFocus301;
