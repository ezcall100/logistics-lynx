// 250 Agents Registry for 9-Day Project Timeline
export const ALL_250_AGENTS = [
  // ===== PHASE 1: CORE INFRASTRUCTURE (Days 1-3) =====
  
  // === FRONTEND DEVELOPMENT AGENTS (80 agents) ===
  {
    id: 'frontend-001',
    name: 'Frontend Development Agent 001',
    jobTitle: 'Senior React Component Architect',
    jobDuties: [
      'Design and implement reusable React components',
      'Create responsive UI layouts using Tailwind CSS',
      'Implement component state management with hooks',
      'Optimize component rendering performance',
      'Ensure accessibility compliance (WCAG 2.1)'
    ],
    type: 'frontend_development',
    priority: 'critical',
    permissions: ['create_components', 'modify_ui', 'optimize_performance'],
    category: 'frontend',
    phase: 1,
    estimatedCompletion: 'Day 1 - 14:00',
    dependencies: [],
    performanceMetrics: { successRate: 98.5, avgResponseTime: 150, taskCapacity: 25 }
  },
  {
    id: 'frontend-002',
    name: 'Frontend Development Agent 002',
    jobTitle: 'UI/UX Design Specialist',
    jobDuties: [
      'Create modern, enterprise-grade UI designs',
      'Implement design systems and component libraries',
      'Ensure consistent visual hierarchy and spacing',
      'Design responsive breakpoints for all devices',
      'Create interactive prototypes and animations'
    ],
    type: 'ui_design',
    priority: 'critical',
    permissions: ['create_designs', 'modify_layouts', 'optimize_visuals'],
    category: 'frontend',
    phase: 1,
    estimatedCompletion: 'Day 1 - 16:00',
    dependencies: [],
    performanceMetrics: { successRate: 97.8, avgResponseTime: 200, taskCapacity: 20 }
  },
  {
    id: 'frontend-003',
    name: 'Frontend Development Agent 003',
    jobTitle: 'Responsive Design Engineer',
    jobDuties: [
      'Implement mobile-first responsive design',
      'Create adaptive layouts for all screen sizes',
      'Optimize touch interactions for mobile devices',
      'Ensure cross-browser compatibility',
      'Implement progressive enhancement strategies'
    ],
    type: 'responsive_design',
    priority: 'high',
    permissions: ['modify_layouts', 'optimize_mobile', 'test_compatibility'],
    category: 'frontend',
    phase: 1,
    estimatedCompletion: 'Day 1 - 18:00',
    dependencies: ['frontend-001', 'frontend-002'],
    performanceMetrics: { successRate: 96.9, avgResponseTime: 180, taskCapacity: 22 }
  },

  // === BACKEND DEVELOPMENT AGENTS (60 agents) ===
  {
    id: 'backend-001',
    name: 'Backend Development Agent 001',
    jobTitle: 'API Architecture Lead',
    jobDuties: [
      'Design RESTful API endpoints',
      'Implement API versioning and documentation',
      'Create middleware for authentication and authorization',
      'Design API response schemas and validation',
      'Implement rate limiting and security measures'
    ],
    type: 'api_development',
    priority: 'critical',
    permissions: ['create_apis', 'modify_endpoints', 'manage_security'],
    category: 'backend',
    phase: 1,
    estimatedCompletion: 'Day 1 - 15:00',
    dependencies: [],
    performanceMetrics: { successRate: 98.7, avgResponseTime: 100, taskCapacity: 30 }
  },
  {
    id: 'backend-002',
    name: 'Backend Development Agent 002',
    jobTitle: 'Business Logic Engineer',
    jobDuties: [
      'Implement core business rules and workflows',
      'Create service layer architecture',
      'Implement transaction management',
      'Design error handling and logging systems',
      'Create business validation rules'
    ],
    type: 'business_logic',
    priority: 'critical',
    permissions: ['create_services', 'modify_business_logic', 'manage_workflows'],
    category: 'backend',
    phase: 1,
    estimatedCompletion: 'Day 1 - 17:00',
    dependencies: ['backend-001'],
    performanceMetrics: { successRate: 97.9, avgResponseTime: 140, taskCapacity: 25 }
  },

  // === DATABASE MANAGEMENT AGENTS (30 agents) ===
  {
    id: 'database-001',
    name: 'Database Management Agent 001',
    jobTitle: 'Database Schema Architect',
    jobDuties: [
      'Design normalized database schemas',
      'Create database indexes for performance',
      'Implement data validation constraints',
      'Design data relationships and foreign keys',
      'Create database migration scripts'
    ],
    type: 'database_architecture',
    priority: 'critical',
    permissions: ['create_schemas', 'modify_structure', 'manage_migrations'],
    category: 'database',
    phase: 1,
    estimatedCompletion: 'Day 1 - 13:00',
    dependencies: [],
    performanceMetrics: { successRate: 99.2, avgResponseTime: 80, taskCapacity: 35 }
  },

  // === RESEARCH AGENTS (50 agents) ===
  {
    id: 'research-001',
    name: 'Market Research Agent 001',
    jobTitle: 'Competitive Intelligence Analyst',
    jobDuties: [
      'Analyze competitor features and pricing',
      'Research market trends and opportunities',
      'Identify customer pain points and needs',
      'Conduct user research and surveys',
      'Create market positioning strategies'
    ],
    type: 'market_research',
    priority: 'medium',
    permissions: ['conduct_research', 'analyze_data', 'create_reports'],
    category: 'research',
    phase: 2,
    estimatedCompletion: 'Day 4 - 14:00',
    dependencies: ['frontend-001', 'backend-001'],
    performanceMetrics: { successRate: 96.8, avgResponseTime: 300, taskCapacity: 15 }
  },

  // === TESTING AGENTS (20 agents) ===
  {
    id: 'testing-001',
    name: 'Quality Assurance Agent 001',
    jobTitle: 'Test Automation Engineer',
    jobDuties: [
      'Create automated test suites',
      'Implement CI/CD testing pipelines',
      'Design test data and scenarios',
      'Create performance test scripts',
      'Implement test reporting and analytics'
    ],
    type: 'test_automation',
    priority: 'high',
    permissions: ['create_tests', 'run_automation', 'manage_pipelines'],
    category: 'testing',
    phase: 2,
    estimatedCompletion: 'Day 5 - 12:00',
    dependencies: ['frontend-001', 'backend-001'],
    performanceMetrics: { successRate: 98.9, avgResponseTime: 180, taskCapacity: 22 }
  },

  // === DEPLOYMENT AGENTS (10 agents) ===
  {
    id: 'deployment-001',
    name: 'Deployment Agent 001',
    jobTitle: 'CI/CD Pipeline Engineer',
    jobDuties: [
      'Create automated deployment pipelines',
      'Implement blue-green deployment strategies',
      'Create rollback procedures',
      'Monitor deployment health and metrics',
      'Implement deployment security measures'
    ],
    type: 'ci_cd_engineering',
    priority: 'critical',
    permissions: ['manage_pipelines', 'deploy_systems', 'monitor_deployments'],
    category: 'deployment',
    phase: 2,
    estimatedCompletion: 'Day 6 - 10:00',
    dependencies: ['testing-001'],
    performanceMetrics: { successRate: 99.5, avgResponseTime: 120, taskCapacity: 25 }
  },


];

// Generate remaining agents programmatically
export function generateRemainingAgents() {
  const remainingAgents = [];
  
  // Generate remaining frontend agents (77 more)
  for (let i = 4; i <= 80; i++) {
    remainingAgents.push({
      id: `frontend-${i.toString().padStart(3, '0')}`,
      name: `Frontend Development Agent ${i}`,
      jobTitle: `Frontend Developer ${i}`,
      jobDuties: [
        'Implement React components and features',
        'Optimize UI performance and responsiveness',
        'Ensure cross-browser compatibility',
        'Implement accessibility features',
        'Create responsive layouts and designs'
      ],
      type: 'frontend_development',
      priority: 'high',
      permissions: ['create_components', 'modify_ui', 'optimize_performance'],
      category: 'frontend',
      phase: 1,
      estimatedCompletion: `Day ${Math.ceil(i / 20)} - ${(i % 20) * 2 + 10}:00`,
      dependencies: [],
      performanceMetrics: { successRate: 97.0 + (i % 3), avgResponseTime: 150 + (i % 50), taskCapacity: 20 + (i % 10) }
    });
  }

  // Generate remaining backend agents (58 more)
  for (let i = 4; i <= 61; i++) {
    remainingAgents.push({
      id: `backend-${i.toString().padStart(3, '0')}`,
      name: `Backend Development Agent ${i}`,
      jobTitle: `Backend Developer ${i}`,
      jobDuties: [
        'Implement API endpoints and services',
        'Create business logic and workflows',
        'Optimize database queries and performance',
        'Implement security and authentication',
        'Create monitoring and logging systems'
      ],
      type: 'backend_development',
      priority: 'high',
      permissions: ['create_apis', 'modify_services', 'manage_security'],
      category: 'backend',
      phase: 1,
      estimatedCompletion: `Day ${Math.ceil(i / 15)} - ${(i % 15) * 2 + 12}:00`,
      dependencies: [],
      performanceMetrics: { successRate: 97.5 + (i % 3), avgResponseTime: 120 + (i % 40), taskCapacity: 25 + (i % 8) }
    });
  }

  // Generate remaining database agents (29 more)
  for (let i = 2; i <= 30; i++) {
    remainingAgents.push({
      id: `database-${i.toString().padStart(3, '0')}`,
      name: `Database Management Agent ${i}`,
      jobTitle: `Database Administrator ${i}`,
      jobDuties: [
        'Manage database schemas and structures',
        'Optimize query performance and indexing',
        'Implement data validation and constraints',
        'Create backup and recovery procedures',
        'Monitor database health and performance'
      ],
      type: 'database_management',
      priority: 'high',
      permissions: ['manage_schemas', 'optimize_performance', 'manage_backups'],
      category: 'database',
      phase: 1,
      estimatedCompletion: `Day ${Math.ceil(i / 10)} - ${(i % 10) * 2 + 14}:00`,
      dependencies: [],
      performanceMetrics: { successRate: 98.0 + (i % 2), avgResponseTime: 90 + (i % 30), taskCapacity: 30 + (i % 10) }
    });
  }

  // Generate remaining research agents (49 more)
  for (let i = 2; i <= 50; i++) {
    remainingAgents.push({
      id: `research-${i.toString().padStart(3, '0')}`,
      name: `Market Research Agent ${i}`,
      jobTitle: `Research Analyst ${i}`,
      jobDuties: [
        'Conduct market research and analysis',
        'Analyze competitor strategies and features',
        'Research technology trends and opportunities',
        'Create research reports and recommendations',
        'Validate product requirements and features'
      ],
      type: 'market_research',
      priority: 'medium',
      permissions: ['conduct_research', 'analyze_data', 'create_reports'],
      category: 'research',
      phase: 2,
      estimatedCompletion: `Day ${4 + Math.ceil(i / 25)} - ${(i % 25) * 2 + 10}:00`,
      dependencies: [],
      performanceMetrics: { successRate: 96.0 + (i % 4), avgResponseTime: 250 + (i % 100), taskCapacity: 15 + (i % 8) }
    });
  }

  // Generate remaining testing agents (19 more)
  for (let i = 2; i <= 20; i++) {
    remainingAgents.push({
      id: `testing-${i.toString().padStart(3, '0')}`,
      name: `Quality Assurance Agent ${i}`,
      jobTitle: `QA Engineer ${i}`,
      jobDuties: [
        'Create and execute test plans',
        'Implement automated testing solutions',
        'Perform manual testing and validation',
        'Create test documentation and reports',
        'Monitor and improve testing processes'
      ],
      type: 'quality_assurance',
      priority: 'high',
      permissions: ['create_tests', 'execute_testing', 'create_reports'],
      category: 'testing',
      phase: 2,
      estimatedCompletion: `Day ${5 + Math.ceil(i / 10)} - ${(i % 10) * 2 + 12}:00`,
      dependencies: [],
      performanceMetrics: { successRate: 98.0 + (i % 2), avgResponseTime: 180 + (i % 60), taskCapacity: 20 + (i % 8) }
    });
  }

  // Generate remaining deployment agents (9 more)
  for (let i = 2; i <= 10; i++) {
    remainingAgents.push({
      id: `deployment-${i.toString().padStart(3, '0')}`,
      name: `Deployment Agent ${i}`,
      jobTitle: `DevOps Engineer ${i}`,
      jobDuties: [
        'Manage deployment pipelines and automation',
        'Implement infrastructure as code',
        'Monitor system health and performance',
        'Create disaster recovery procedures',
        'Optimize deployment processes and efficiency'
      ],
      type: 'deployment_engineering',
      priority: 'critical',
      permissions: ['manage_deployments', 'manage_infrastructure', 'monitor_systems'],
      category: 'deployment',
      phase: 2,
      estimatedCompletion: `Day ${6 + Math.ceil(i / 5)} - ${(i % 5) * 2 + 10}:00`,
      dependencies: [],
      performanceMetrics: { successRate: 99.0 + (i % 1), avgResponseTime: 120 + (i % 40), taskCapacity: 25 + (i % 8) }
    });
  }

  return remainingAgents;
}

// Complete list of all 250 agents
export const ALL_250_AGENTS_COMPLETE = [
  ...ALL_250_AGENTS,
  ...generateRemainingAgents()
];

export default ALL_250_AGENTS;
