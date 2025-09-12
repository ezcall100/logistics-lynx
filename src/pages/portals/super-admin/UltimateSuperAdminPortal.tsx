import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Brain,
  Globe,
  Shield,
  BarChart3,
  Activity,
  Heart,
  Settings,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Bell,
  Search,
  X,
} from 'lucide-react';

// Import all the Super Admin components
import MCPAgentOrchestrationCenter from '../../../components/super-admin/MCPAgentOrchestrationCenter';
import AICommandCenter from '../../../components/super-admin/AICommandCenter';
import EnterpriseDashboard from '../../../components/super-admin/EnterpriseDashboard';
import PortalControlHub from '../../../components/super-admin/PortalControlHub';
import SecurityWarRoom from '../../../components/super-admin/SecurityWarRoom';
import BusinessIntelligenceCenter from '../../../components/super-admin/BusinessIntelligenceCenter';
import SystemHealthMonitor from '../../../components/super-admin/SystemHealthMonitor';

interface SuperAdminModule {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  component: React.ComponentType;
  status: 'active' | 'maintenance' | 'development';
  priority: 'critical' | 'high' | 'medium' | 'low';
  features: string[];
  metrics: {
    value: number;
    unit: string;
    trend: 'up' | 'down' | 'stable';
  };
}

const UltimateSuperAdminPortal: React.FC = () => {
  const [activeModule, setActiveModule] = useState<string>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Define all Super Admin modules
  const modules: SuperAdminModule[] = [
    {
      id: 'dashboard',
      name: 'Enterprise Dashboard',
      description: 'Real-time system overview and performance metrics',
      icon: BarChart3,
      color: 'indigo',
      component: EnterpriseDashboard,
      status: 'active',
      priority: 'critical',
      features: ['Live Metrics', 'Performance Charts', 'Portal Status', 'Quick Actions'],
      metrics: { value: 99.7, unit: '%', trend: 'up' },
    },
    {
      id: 'mcp-agents',
      name: 'MCP Agent Orchestration',
      description: 'Manage and monitor all 250 MCP agents',
      icon: Bot,
      color: 'purple',
      component: MCPAgentOrchestrationCenter,
      status: 'active',
      priority: 'critical',
      features: ['Agent Monitoring', 'Cluster Management', 'Performance Tracking', 'Auto-Scaling'],
      metrics: { value: 248, unit: '/250', trend: 'stable' },
    },
    {
      id: 'ai-command',
      name: 'AI Command Center',
      description: 'Real-time AI agent monitoring and autonomous control',
      icon: Brain,
      color: 'blue',
      component: AICommandCenter,
      status: 'active',
      priority: 'high',
      features: [
        'AI Monitoring',
        'Command Terminal',
        'Performance Analytics',
        'Automation Control',
      ],
      metrics: { value: 94.5, unit: '%', trend: 'up' },
    },
    {
      id: 'portal-control',
      name: 'Portal Control Hub',
      description: 'Centralized management of all TMS portals',
      icon: Globe,
      color: 'emerald',
      component: PortalControlHub,
      status: 'active',
      priority: 'high',
      features: ['Portal Management', 'User Analytics', 'Feature Control', 'Deployment'],
      metrics: { value: 10, unit: 'portals', trend: 'stable' },
    },
    {
      id: 'security',
      name: 'Security War Room',
      description: 'Real-time threat detection and security response',
      icon: Shield,
      color: 'red',
      component: SecurityWarRoom,
      status: 'active',
      priority: 'critical',
      features: ['Threat Detection', 'Security Events', 'Auto Response', 'Compliance'],
      metrics: { value: 3, unit: 'threats', trend: 'down' },
    },
    {
      id: 'business-intel',
      name: 'Business Intelligence',
      description: 'Advanced analytics and predictive insights',
      icon: TrendingUp,
      color: 'teal',
      component: BusinessIntelligenceCenter,
      status: 'active',
      priority: 'medium',
      features: ['Predictive Analytics', 'Business Metrics', 'Reports', 'Insights'],
      metrics: { value: 2.4, unit: 'M$', trend: 'up' },
    },
    {
      id: 'health-monitor',
      name: 'System Health Monitor',
      description: 'Autonomous system monitoring and self-healing',
      icon: Heart,
      color: 'cyan',
      component: SystemHealthMonitor,
      status: 'active',
      priority: 'high',
      features: ['Health Monitoring', 'Auto-Healing', 'Component Status', 'Performance'],
      metrics: { value: 94, unit: '%', trend: 'stable' },
    },
  ];

  const getModuleColor = (color: string) => {
    const colors = {
      indigo: 'from-indigo-500/20 to-indigo-600/20 border-indigo-500/30',
      purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
      blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
      emerald: 'from-emerald-500/20 to-emerald-600/20 border-emerald-500/30',
      red: 'from-red-500/20 to-red-600/20 border-red-500/30',
      teal: 'from-teal-500/20 to-teal-600/20 border-teal-500/30',
      cyan: 'from-cyan-500/20 to-cyan-600/20 border-cyan-500/30',
    };
    return colors[color as keyof typeof colors] || colors.indigo;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-400 bg-green-400/20';
      case 'maintenance':
        return 'text-yellow-400 bg-yellow-400/20';
      case 'development':
        return 'text-blue-400 bg-blue-400/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'text-red-500';
      case 'high':
        return 'text-orange-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-400" />;
      case 'stable':
        return <Activity className="w-4 h-4 text-gray-400" />;
      default:
        return <Activity className="w-4 h-4 text-gray-400" />;
    }
  };

  const filteredModules = modules.filter(
    module =>
      module.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeModuleData = modules.find(m => m.id === activeModule);
  const ActiveComponent = activeModuleData?.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: sidebarCollapsed ? -250 : 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed left-0 top-0 h-full bg-white/10 backdrop-blur-sm border-r border-white/20 z-40 ${
          sidebarCollapsed ? 'w-16' : 'w-80'
        }`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            {!sidebarCollapsed && (
              <div>
                <h1 className="text-2xl font-bold text-white mb-2">🚀 Ultimate Super Admin</h1>
                <p className="text-sm text-gray-300">Complete system control center</p>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Search */}
          {!sidebarCollapsed && (
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search modules..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          )}

          {/* System Status */}
          {!sidebarCollapsed && (
            <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">System Status</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400">All Systems Operational</span>
                </div>
              </div>
              <div className="text-xs text-gray-400">
                250 MCP Agents • 10 Portals • 99.7% Uptime
              </div>
            </div>
          )}

          {/* Modules List */}
          <div className="space-y-2">
            {filteredModules.map((module, index) => (
              <motion.button
                key={module.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setActiveModule(module.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                  activeModule === module.id
                    ? 'bg-white/20 text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activeModule === module.id ? 'bg-white/20' : 'bg-white/10'
                  }`}
                >
                  <module.icon className="w-4 h-4" />
                </div>
                {!sidebarCollapsed && (
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{module.name}</span>
                      <div
                        className={`px-2 py-1 rounded-full text-xs ${getStatusColor(module.status)}`}
                      >
                        {module.status}
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{module.description}</p>
                  </div>
                )}
              </motion.button>
            ))}
          </div>

          {/* Quick Actions */}
          {!sidebarCollapsed && (
            <div className="mt-8 pt-6 border-t border-white/20">
              <h3 className="text-sm font-medium text-gray-400 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center space-x-3 p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                  <RefreshCw className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">Refresh All</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                  <Bell className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">Notifications</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                  <Settings className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">Settings</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-80'}`}>
        {/* Top Bar */}
        <div className="bg-white/10 backdrop-blur-sm border-b border-white/20 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-bold text-white">
                {activeModuleData?.name || 'Super Admin Portal'}
              </h2>
              <div
                className={`px-3 py-1 rounded-full text-xs ${getStatusColor(activeModuleData?.status || 'active')}`}
              >
                {activeModuleData?.status || 'active'}
              </div>
              <div className="flex items-center space-x-1">
                {getTrendIcon(activeModuleData?.metrics.trend || 'stable')}
                <span className="text-sm text-gray-300">
                  {activeModuleData?.metrics.value}
                  {activeModuleData?.metrics.unit}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-300">
                  {autoRefresh ? 'Live Updates' : 'Paused'}
                </span>
              </div>
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <RefreshCw className={`w-4 h-4 text-white ${autoRefresh ? 'animate-spin' : ''}`} />
              </button>
              <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                <Bell className="w-4 h-4 text-white" />
              </button>
              <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                <Settings className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Module Content */}
        <div className="h-[calc(100vh-80px)] overflow-auto">
          <AnimatePresence mode="wait">
            {ActiveComponent && (
              <motion.div
                key={activeModule}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <ActiveComponent />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Module Overview Modal */}
      <AnimatePresence>
        {!sidebarCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50"
            onClick={() => setSidebarCollapsed(true)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-4xl w-full border border-white/20 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Super Admin Modules Overview</h3>
                <button
                  onClick={() => setSidebarCollapsed(true)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modules.map((module, index) => (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => {
                      setActiveModule(module.id);
                      setSidebarCollapsed(true);
                    }}
                    className={`bg-gradient-to-br ${getModuleColor(module.color)} backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:scale-105 transition-transform cursor-pointer`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                        <module.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <div
                          className={`px-2 py-1 rounded-full text-xs ${getStatusColor(module.status)}`}
                        >
                          {module.status}
                        </div>
                        <div className={`text-xs ${getPriorityColor(module.priority)}`}>
                          {module.priority}
                        </div>
                      </div>
                    </div>

                    <h4 className="text-white font-bold mb-2">{module.name}</h4>
                    <p className="text-sm text-gray-300 mb-4">{module.description}</p>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Current Status</span>
                        <div className="flex items-center space-x-1">
                          {getTrendIcon(module.metrics.trend)}
                          <span className="text-sm text-white">
                            {module.metrics.value}
                            {module.metrics.unit}
                          </span>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400 mb-2">Key Features</p>
                        <div className="flex flex-wrap gap-1">
                          {module.features.slice(0, 2).map((feature, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-white/10 text-white rounded text-xs"
                            >
                              {feature}
                            </span>
                          ))}
                          {module.features.length > 2 && (
                            <span className="px-2 py-1 bg-white/10 text-white rounded text-xs">
                              +{module.features.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UltimateSuperAdminPortal;
