export interface Portal {
  id: string
  name: string
  description: string
  category: 'Core TMS' | 'Business Operations' | 'Admin'
  icon: string
  color: string
  features: string[]
}

export const portals: Portal[] = [
  // Core TMS Portals (10)
  {
    id: 'broker',
    name: 'Broker Portal',
    description: 'Load posting, carrier matching, and margin optimization',
    category: 'Core TMS',
    icon: '📊',
    color: 'from-blue-500 to-cyan-500',
    features: ['Load Management', 'Carrier Matching', 'Margin Analytics', 'Rate Optimization']
  },
  {
    id: 'carrier',
    name: 'Carrier Portal',
    description: 'Fleet management, route optimization, and driver coordination',
    category: 'Core TMS',
    icon: '🚛',
    color: 'from-green-500 to-emerald-500',
    features: ['Fleet Management', 'Route Planning', 'Driver Dispatch', 'Performance Tracking']
  },
  {
    id: 'shipper',
    name: 'Shipper Portal',
    description: 'Shipment tracking, compliance, and delivery management',
    category: 'Core TMS',
    icon: '📦',
    color: 'from-purple-500 to-violet-500',
    features: ['Shipment Tracking', 'Compliance Docs', 'Delivery Scheduling', 'Cost Analysis']
  },
  {
    id: 'driver',
    name: 'Driver Portal',
    description: 'Mobile dispatch, HOS tracking, and communication hub',
    category: 'Core TMS',
    icon: '👨‍💼',
    color: 'from-orange-500 to-red-500',
    features: ['Mobile Dispatch', 'HOS Tracking', 'Real-time Chat', 'Document Capture']
  },
  {
    id: 'owner-operator',
    name: 'Owner-Operator Portal',
    description: 'Independent contractor management and settlement tracking',
    category: 'Core TMS',
    icon: '🏢',
    color: 'from-indigo-500 to-blue-500',
    features: ['Load Booking', 'Settlement Tracking', 'Expense Management', 'Performance Analytics']
  },
  {
    id: 'yms',
    name: 'YMS Portal',
    description: 'Yard management, dock scheduling, and trailer tracking',
    category: 'Core TMS',
    icon: '🏭',
    color: 'from-teal-500 to-cyan-500',
    features: ['Gate Management', 'Dock Scheduling', 'Yard Visibility', 'Move Requests']
  },
  {
    id: 'analytics',
    name: 'Analytics Portal',
    description: 'Business intelligence, KPIs, and performance insights',
    category: 'Core TMS',
    icon: '📈',
    color: 'from-pink-500 to-rose-500',
    features: ['Real-time KPIs', 'Performance Dashboards', 'Predictive Analytics', 'Custom Reports']
  },
  {
    id: 'autonomous',
    name: 'Autonomous Portal',
    description: 'AI-driven automation and intelligent decision making',
    category: 'Core TMS',
    icon: '🤖',
    color: 'from-cyan-500 to-blue-500',
    features: ['AI Automation', 'Smart Routing', 'Predictive Maintenance', 'Autonomous Optimization']
  },
  {
    id: 'admin',
    name: 'Admin Portal',
    description: 'System administration, user management, and configuration',
    category: 'Core TMS',
    icon: '⚙️',
    color: 'from-gray-500 to-slate-500',
    features: ['User Management', 'System Config', 'Security Settings', 'Audit Logs']
  },
  {
    id: 'super-admin',
    name: 'Super Admin Portal',
    description: 'Enterprise administration and multi-tenant management',
    category: 'Core TMS',
    icon: '👑',
    color: 'from-yellow-500 to-orange-500',
    features: ['Multi-tenant Management', 'Enterprise Settings', 'Global Analytics', 'System Health']
  },

  // Business Operations Portals (12)
  {
    id: 'crm',
    name: 'CRM Portal',
    description: 'Customer relationship management and sales pipeline',
    category: 'Business Operations',
    icon: '👥',
    color: 'from-emerald-500 to-green-500',
    features: ['Lead Management', 'Sales Pipeline', 'Customer Analytics', 'Marketing Automation']
  },
  {
    id: 'financials',
    name: 'Financials Portal',
    description: 'Complete accounting and financial management system',
    category: 'Business Operations',
    icon: '💰',
    color: 'from-green-500 to-teal-500',
    features: ['General Ledger', 'AP/AR Management', 'Payroll', 'Financial Reporting']
  },
  {
    id: 'edi',
    name: 'EDI Portal',
    description: 'Electronic data interchange and integration hub',
    category: 'Business Operations',
    icon: '🔗',
    color: 'from-blue-500 to-indigo-500',
    features: ['EDI Processing', 'API Integration', 'Data Mapping', 'Transaction Monitoring']
  },
  {
    id: 'marketplace',
    name: 'Marketplace Portal',
    description: 'Load board and freight marketplace platform',
    category: 'Business Operations',
    icon: '🏪',
    color: 'from-purple-500 to-pink-500',
    features: ['Load Board', 'Bidding System', 'Market Analytics', 'Carrier Network']
  },
  {
    id: 'factoring',
    name: 'Factoring Portal',
    description: 'Invoice factoring and cash flow management',
    category: 'Business Operations',
    icon: '💳',
    color: 'from-red-500 to-pink-500',
    features: ['Invoice Factoring', 'Cash Flow Management', 'Credit Analysis', 'Payment Processing']
  },
  {
    id: 'workers',
    name: 'Workers Portal',
    description: 'Human resources and workforce management',
    category: 'Business Operations',
    icon: '👷',
    color: 'from-orange-500 to-yellow-500',
    features: ['HR Management', 'Payroll Processing', 'Compliance Tracking', 'Performance Reviews']
  },
  {
    id: 'rates',
    name: 'Rates Portal',
    description: 'Dynamic pricing and rate management system',
    category: 'Business Operations',
    icon: '📊',
    color: 'from-cyan-500 to-teal-500',
    features: ['Dynamic Pricing', 'Rate Analytics', 'Market Intelligence', 'Pricing Optimization']
  },
  {
    id: 'onboarding',
    name: 'Onboarding Portal',
    description: 'Customer and carrier onboarding automation',
    category: 'Business Operations',
    icon: '🚀',
    color: 'from-violet-500 to-purple-500',
    features: ['Automated Onboarding', 'Document Collection', 'Compliance Checks', 'Welcome Workflows']
  },
  {
    id: 'directory',
    name: 'Directory Portal',
    description: 'Business directory and contact management',
    category: 'Business Operations',
    icon: '📋',
    color: 'from-slate-500 to-gray-500',
    features: ['Business Directory', 'Contact Management', 'Network Building', 'Relationship Tracking']
  },
  {
    id: 'load-board',
    name: 'Load Board Portal',
    description: 'Public load board and freight marketplace',
    category: 'Business Operations',
    icon: '📋',
    color: 'from-amber-500 to-orange-500',
    features: ['Public Load Board', 'Real-time Listings', 'Bidding System', 'Market Intelligence']
  },
  {
    id: 'tms-admin',
    name: 'TMS Admin Portal',
    description: 'TMS configuration and system administration',
    category: 'Business Operations',
    icon: '🔧',
    color: 'from-stone-500 to-neutral-500',
    features: ['System Configuration', 'Workflow Management', 'Integration Setup', 'Performance Tuning']
  },
  {
    id: 'track-trace',
    name: 'Track & Trace Portal',
    description: 'Comprehensive tracking system for trucks, trailers, containers, chassis and equipment',
    category: 'Business Operations',
    icon: '📍',
    color: 'from-emerald-500 to-green-500',
    features: ['Real-time Tracking', 'Equipment Monitoring', 'Location History', 'Status Alerts']
  },

  // Admin Sub-Ports (4)
  {
    id: 'monitoring',
    name: 'Monitoring Portal',
    description: 'System monitoring and health management',
    category: 'Admin',
    icon: '📡',
    color: 'from-red-500 to-rose-500',
    features: ['System Health', 'Performance Monitoring', 'Alert Management', 'Incident Response']
  },
  {
    id: 'security',
    name: 'Security Portal',
    description: 'Security management and threat monitoring',
    category: 'Admin',
    icon: '🔒',
    color: 'from-gray-500 to-slate-500',
    features: ['Threat Monitoring', 'Access Control', 'Security Audits', 'Compliance Management']
  },
  {
    id: 'backup',
    name: 'Backup Portal',
    description: 'Data backup and disaster recovery management',
    category: 'Admin',
    icon: '💾',
    color: 'from-blue-500 to-indigo-500',
    features: ['Automated Backups', 'Disaster Recovery', 'Data Archiving', 'Recovery Testing']
  },
  {
    id: 'logs',
    name: 'Logs Portal',
    description: 'System logs and audit trail management',
    category: 'Admin',
    icon: '📝',
    color: 'from-green-500 to-emerald-500',
    features: ['System Logs', 'Audit Trails', 'Log Analysis', 'Compliance Reporting']
  }
]