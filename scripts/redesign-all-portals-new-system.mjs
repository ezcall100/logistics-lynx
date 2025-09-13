import fs from 'fs';
import path from 'path';

// List of all portal files
const portalFiles = [
  'src/pages/portals/customer/CustomerPortal.tsx',
  'src/pages/portals/partner/PartnerPortal.tsx',
  'src/pages/portals/developer/DeveloperPortal.tsx',
  'src/pages/portals/admin/AdminPortal.tsx',
  'src/pages/portals/mcp-agents/MCPAgentsPortal.tsx',
  'src/pages/portals/autonomous/AutonomousPortal.tsx',
  'src/pages/portals/broker/BrokerPortal.tsx',
  'src/pages/portals/carrier/CarrierPortal.tsx',
  'src/pages/portals/driver/DriverPortal.tsx',
  'src/pages/portals/shipper/ShipperPortal.tsx',
  'src/pages/portals/analytics/AnalyticsPortal.tsx',
  'src/pages/portals/yms/YMSPortal.tsx',
  'src/pages/portals/directory/DirectoryPortal.tsx',
  'src/pages/portals/rates/RatesPortal.tsx',
  'src/pages/portals/marketplace/MarketplacePortal.tsx',
  'src/pages/portals/financials/FinancialsPortal.tsx',
  'src/pages/portals/load-board/LoadBoardPortal.tsx',
  'src/pages/portals/crm/CRMPortal.tsx',
  'src/pages/portals/edi/EDIPortal.tsx',
  'src/pages/portals/owner-operator/OwnerOperatorPortal.tsx',
  'src/pages/portals/workers/WorkersPortal.tsx',
  'src/pages/portals/factoring/FactoringPortal.tsx',
  'src/pages/portals/warehouse/WarehousePortal.tsx',
  'src/pages/portals/fleet/FleetPortal.tsx',
  'src/pages/portals/dispatch/DispatchPortal.tsx',
  'src/pages/portals/maintenance/MaintenancePortal.tsx',
  'src/pages/portals/fuel/FuelPortal.tsx',
  'src/pages/portals/insurance/InsurancePortal.tsx',
  'src/pages/portals/compliance/CompliancePortal.tsx'
];

// Portal configurations
const portalConfigs = {
  'customer': {
    name: 'Customer Portal',
    type: 'Business',
    icon: 'Users',
    color: 'blue',
    description: 'Customer management and support portal'
  },
  'partner': {
    name: 'Partner Portal',
    type: 'Business',
    icon: 'Handshake',
    color: 'green',
    description: 'Partner collaboration and management'
  },
  'developer': {
    name: 'Developer Portal',
    type: 'Development',
    icon: 'Code',
    color: 'purple',
    description: 'Developer tools and API management'
  },
  'admin': {
    name: 'Admin Portal',
    type: 'Administration',
    icon: 'Shield',
    color: 'red',
    description: 'Administrative controls and management'
  },
  'mcpagents': {
    name: 'MCP 251 Agents Portal',
    type: 'AI Management',
    icon: 'Brain',
    color: 'cyan',
    description: 'AI agent management and monitoring'
  },
  'autonomous': {
    name: 'Autonomous Portal',
    type: 'AI',
    icon: 'Bot',
    color: 'pink',
    description: 'Autonomous system management'
  },
  'broker': {
    name: 'Broker Portal',
    type: 'Business',
    icon: 'Building2',
    color: 'blue',
    description: 'Broker operations and management'
  },
  'carrier': {
    name: 'Carrier Portal',
    type: 'Logistics',
    icon: 'Truck',
    color: 'green',
    description: 'Carrier operations and tracking'
  },
  'driver': {
    name: 'Driver Portal',
    type: 'Operations',
    icon: 'User',
    color: 'orange',
    description: 'Driver management and operations'
  },
  'shipper': {
    name: 'Shipper Portal',
    type: 'Logistics',
    icon: 'Package',
    color: 'green',
    description: 'Shipper operations and management'
  },
  'analytics': {
    name: 'Analytics Portal',
    type: 'Analytics',
    icon: 'BarChart3',
    color: 'indigo',
    description: 'Analytics and reporting dashboard'
  },
  'yms': {
    name: 'YMS Portal',
    type: 'Operations',
    icon: 'Warehouse',
    color: 'orange',
    description: 'Yard Management System'
  },
  'directory': {
    name: 'Directory Portal',
    type: 'Business',
    icon: 'BookOpen',
    color: 'blue',
    description: 'Business directory and listings'
  },
  'rates': {
    name: 'Rates Portal',
    type: 'Business',
    icon: 'DollarSign',
    color: 'green',
    description: 'Rate management and pricing'
  },
  'marketplace': {
    name: 'Marketplace Portal',
    type: 'Business',
    icon: 'Store',
    color: 'purple',
    description: 'Marketplace operations and management'
  },
  'financials': {
    name: 'Financials Portal',
    type: 'Finance',
    icon: 'Calculator',
    color: 'green',
    description: 'Financial management and reporting'
  },
  'loadboard': {
    name: 'Load Board Portal',
    type: 'Logistics',
    icon: 'ClipboardList',
    color: 'blue',
    description: 'Load board management and operations'
  },
  'crm': {
    name: 'CRM Portal',
    type: 'Business',
    icon: 'Users',
    color: 'blue',
    description: 'Customer relationship management'
  },
  'edi': {
    name: 'EDI Portal',
    type: 'Integration',
    icon: 'Link',
    color: 'purple',
    description: 'Electronic Data Interchange management'
  },
  'owneroperator': {
    name: 'Owner Operator Portal',
    type: 'Operations',
    icon: 'UserCheck',
    color: 'orange',
    description: 'Owner operator management'
  },
  'workers': {
    name: 'Workers Portal',
    type: 'Operations',
    icon: 'Users',
    color: 'blue',
    description: 'Workforce management and operations'
  },
  'factoring': {
    name: 'Factoring Portal',
    type: 'Finance',
    icon: 'CreditCard',
    color: 'green',
    description: 'Factoring and financial services'
  },
  'warehouse': {
    name: 'Warehouse Portal',
    type: 'Operations',
    icon: 'Warehouse',
    color: 'orange',
    description: 'Warehouse management and operations'
  },
  'fleet': {
    name: 'Fleet Portal',
    type: 'Operations',
    icon: 'Truck',
    color: 'blue',
    description: 'Fleet management and operations'
  },
  'dispatch': {
    name: 'Dispatch Portal',
    type: 'Operations',
    icon: 'Radio',
    color: 'purple',
    description: 'Dispatch operations and management'
  },
  'maintenance': {
    name: 'Maintenance Portal',
    type: 'Operations',
    icon: 'Wrench',
    color: 'orange',
    description: 'Maintenance management and operations'
  },
  'fuel': {
    name: 'Fuel Portal',
    type: 'Operations',
    icon: 'Fuel',
    color: 'yellow',
    description: 'Fuel management and operations'
  },
  'insurance': {
    name: 'Insurance Portal',
    type: 'Finance',
    icon: 'Shield',
    color: 'blue',
    description: 'Insurance management and operations'
  },
  'compliance': {
    name: 'Compliance Portal',
    type: 'Administration',
    icon: 'FileCheck',
    color: 'red',
    description: 'Compliance management and monitoring'
  }
};

function generatePortalContent(portalKey, config) {
  const portalName = config.name;
  const portalType = config.type;
  const iconName = config.icon;
  const color = config.color;
  const description = config.description;

  return `import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ${iconName},
  Users,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Plus,
  Eye,
  Play,
  Pause,
  Activity,
  Zap,
  Globe,
  Database,
  Server,
  Cpu,
  HardDrive,
  Wifi,
  Lock,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
} from 'lucide-react';
import { PortalLayout } from '../../../design-system/PortalLayout';
import { DashboardCard } from '../../../design-system/DashboardCard';
import { Button } from '../../../design-system/Button';

const ${portalKey.charAt(0).toUpperCase() + portalKey.slice(1).replace(/-/g, '')}Portal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const user = {
    name: 'Demo User',
    email: 'demo@transbotai.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    role: '${portalType} User',
  };

  const notifications = [
    {
      id: '1',
      title: 'New ${portalType.toLowerCase()} activity',
      message: 'Recent activity detected in your portal',
      time: '5 minutes ago',
      type: 'info' as const,
      unread: true,
    },
    {
      id: '2',
      title: 'System update available',
      message: 'New features and improvements available',
      time: '1 hour ago',
      type: 'success' as const,
      unread: false,
    },
  ];

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: ${iconName},
      path: '/dashboard',
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: TrendingUp,
      path: '/analytics',
    },
    {
      id: 'users',
      label: 'Users',
      icon: Users,
      path: '/users',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      path: '/settings',
    },
  ];

  const metrics = [
    {
      title: 'Active Users',
      value: '1,234',
      change: { value: '+12%', type: 'increase' as const },
      icon: Users,
      iconColor: 'text-${color}-600',
      bgColor: 'bg-${color}-100 dark:bg-${color}-900/30',
    },
    {
      title: 'Revenue',
      value: '$45,678',
      change: { value: '+8%', type: 'increase' as const },
      icon: DollarSign,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      title: 'Growth Rate',
      value: '15%',
      change: { value: '+3%', type: 'increase' as const },
      icon: TrendingUp,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      title: 'Alerts',
      value: '3',
      change: { value: '-1', type: 'decrease' as const },
      icon: AlertTriangle,
      iconColor: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    },
  ];

  return (
    <PortalLayout
      portalName="${portalName}"
      portalType="${portalType}"
      user={user}
      menuItems={menuItems}
      notifications={notifications}
    >
      <div className="space-y-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-slate-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Welcome to ${portalName}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                ${description}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700 dark:text-green-300">
                  Online
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <DashboardCard {...metric} />
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700"
        >
          <div className="p-6 border-b border-gray-200 dark:border-slate-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Quick Actions
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Common tasks and operations
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button
                variant="primary"
                icon={Plus}
                onClick={() => console.log('Create new')}
                className="h-20 flex-col space-y-2"
              >
                <span>Create New</span>
              </Button>
              <Button
                variant="outline"
                icon={Eye}
                onClick={() => console.log('View reports')}
                className="h-20 flex-col space-y-2"
              >
                <span>View Reports</span>
              </Button>
              <Button
                variant="secondary"
                icon={Settings}
                onClick={() => console.log('Settings')}
                className="h-20 flex-col space-y-2"
              >
                <span>Settings</span>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700"
        >
          <div className="p-6 border-b border-gray-200 dark:border-slate-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              System Status
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Real-time system health monitoring
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-900 dark:text-green-100">
                    All Systems Operational
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400">
                    99.9% uptime
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Server className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                    Server Load
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">
                    45% average
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <Database className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-purple-900 dark:text-purple-100">
                    Database
                  </p>
                  <p className="text-xs text-purple-600 dark:text-purple-400">
                    Healthy
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <Wifi className="h-8 w-8 text-orange-600" />
                <div>
                  <p className="text-sm font-medium text-orange-900 dark:text-orange-100">
                    Network
                  </p>
                  <p className="text-xs text-orange-600 dark:text-orange-400">
                    Stable
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </PortalLayout>
  );
};

export default ${portalKey.charAt(0).toUpperCase() + portalKey.slice(1).replace(/-/g, '')}Portal;`;
}

async function updatePortalFile(filePath, portalKey) {
  try {
    console.log(`Redesigning ${filePath}...`);
    
    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${filePath}`);
      return;
    }

    const config = portalConfigs[portalKey];
    if (!config) {
      console.log(`No config found for ${portalKey}`);
      return;
    }

    const newContent = generatePortalContent(portalKey, config);
    
    // Write new content
    fs.writeFileSync(filePath, newContent, 'utf8');
    
    console.log(`✅ Redesigned ${filePath}`);
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
  }
}

async function main() {
  console.log('🎨 Redesigning all portals with new design system...\n');
  
  for (const filePath of portalFiles) {
    // Extract portal key from file path
    const pathParts = filePath.split('/');
    const fileName = pathParts[pathParts.length - 1];
    const portalKey = fileName.replace('Portal.tsx', '').toLowerCase();
    
    await updatePortalFile(filePath, portalKey);
  }
  
  console.log('\n🎉 All portals redesigned with new design system!');
}

main().catch(console.error);
