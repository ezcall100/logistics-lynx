import React, { useState, useEffect } from 'react';
import { ThemeToggle } from '../../../components/common/ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Activity,
  Settings,
  BarChart3,
  Users,
  Shield,
  Zap,
  Play,
  Plus,
  Search,
  RefreshCw,
  Bell,
  Home,
  Menu,
  ChevronDown,
  ChevronRight,
  Star,
  Cpu,
  Database,
  Network,
  Server,
  Monitor,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Globe,
  Lock,
  FileText,
  Calendar,
  User,
} from 'lucide-react';

interface MCPAgent {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'maintenance' | 'error';
  performance: number;
  lastActivity: string;
  tasksCompleted: number;
  currentTask?: string;
  location: string;
  version: string;
  uptime: string;
  cpu: number;
  memory: number;
  network: number;
}

const MCPAgentsPortal: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['dashboard']);
  const [searchQuery, setSearchQuery] = useState('');
  const [agents, setAgents] = useState<MCPAgent[]>([]);

  // Mock MCP Agents data - All 251 agents
  useEffect(() => {
    const mockAgents: MCPAgent[] = Array.from({ length: 251 }, (_, i) => ({
      id: `mcp-agent-${i + 1}`,
      name: `MCP Agent ${i + 1}`,
      type: ['Development', 'Testing', 'Deployment', 'Monitoring', 'Security', 'Analytics'][i % 6],
      status: ['active', 'inactive', 'maintenance', 'error'][Math.floor(Math.random() * 4)] as
        | 'active'
        | 'inactive'
        | 'maintenance'
        | 'error',
      performance: Math.floor(Math.random() * 40) + 60,
      lastActivity: `${Math.floor(Math.random() * 60)} minutes ago`,
      tasksCompleted: Math.floor(Math.random() * 1000) + 100,
      currentTask: Math.random() > 0.5 ? `Task ${Math.floor(Math.random() * 100)}` : undefined,
      location: ['US-East', 'US-West', 'EU-Central', 'Asia-Pacific'][i % 4],
      version: `v2.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`,
      uptime: `${Math.floor(Math.random() * 30) + 1} days`,
      cpu: Math.floor(Math.random() * 100),
      memory: Math.floor(Math.random() * 100),
      network: Math.floor(Math.random() * 100),
    }));
    setAgents(mockAgents);
  }, []);

  const user = {
    name: 'MCP Administrator',
    role: 'Super Admin',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
  };

  // Comprehensive MCP Agents Menu Structure - 88+ Pages
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      color: 'text-blue-500',
      path: '/mcp-agents/dashboard',
      subMenus: [
        {
          id: 'overview',
          label: 'Overview',
          icon: BarChart3,
          color: 'text-blue-400',
          path: '/mcp-agents/dashboard/overview',
        },
        {
          id: 'real-time-status',
          label: 'Real-time Status',
          icon: Activity,
          color: 'text-green-400',
          path: '/mcp-agents/dashboard/real-time',
        },
        {
          id: 'performance-metrics',
          label: 'Performance Metrics',
          icon: TrendingUp,
          color: 'text-purple-400',
          path: '/mcp-agents/dashboard/performance',
        },
      ],
    },
    {
      id: 'agent-management',
      label: 'Agent Management',
      icon: Bot,
      color: 'text-purple-500',
      path: '/mcp-agents/management',
      subMenus: [
        {
          id: 'all-agents',
          label: 'All Agents',
          icon: Users,
          color: 'text-purple-400',
          path: '/mcp-agents/management/all',
          subSubMenus: [
            {
              id: 'active-agents',
              label: 'Active Agents',
              path: '/mcp-agents/management/all/active',
            },
            {
              id: 'inactive-agents',
              label: 'Inactive Agents',
              path: '/mcp-agents/management/all/inactive',
            },
            {
              id: 'maintenance-agents',
              label: 'Maintenance Mode',
              path: '/mcp-agents/management/all/maintenance',
            },
            { id: 'error-agents', label: 'Error Status', path: '/mcp-agents/management/all/error' },
          ],
        },
        {
          id: 'agent-types',
          label: 'Agent Types',
          icon: Cpu,
          color: 'text-indigo-400',
          path: '/mcp-agents/management/types',
          subSubMenus: [
            {
              id: 'development-agents',
              label: 'Development Agents',
              path: '/mcp-agents/management/types/development',
            },
            {
              id: 'testing-agents',
              label: 'Testing Agents',
              path: '/mcp-agents/management/types/testing',
            },
            {
              id: 'deployment-agents',
              label: 'Deployment Agents',
              path: '/mcp-agents/management/types/deployment',
            },
            {
              id: 'monitoring-agents',
              label: 'Monitoring Agents',
              path: '/mcp-agents/management/types/monitoring',
            },
            {
              id: 'security-agents',
              label: 'Security Agents',
              path: '/mcp-agents/management/types/security',
            },
            {
              id: 'analytics-agents',
              label: 'Analytics Agents',
              path: '/mcp-agents/management/types/analytics',
            },
          ],
        },
        {
          id: 'agent-creation',
          label: 'Create New Agent',
          icon: Plus,
          color: 'text-green-400',
          path: '/mcp-agents/management/create',
        },
        {
          id: 'agent-configuration',
          label: 'Agent Configuration',
          icon: Settings,
          color: 'text-orange-400',
          path: '/mcp-agents/management/configuration',
        },
      ],
    },
    {
      id: 'monitoring',
      label: 'Monitoring & Analytics',
      icon: Monitor,
      color: 'text-green-500',
      path: '/mcp-agents/monitoring',
      subMenus: [
        {
          id: 'performance-metrics',
          label: 'Performance Metrics',
          icon: TrendingUp,
          color: 'text-green-400',
          path: '/mcp-agents/monitoring/performance',
        },
        {
          id: 'system-health',
          label: 'System Health',
          icon: Activity,
          color: 'text-emerald-400',
          path: '/mcp-agents/monitoring/health',
        },
        {
          id: 'resource-usage',
          label: 'Resource Usage',
          icon: Database,
          color: 'text-teal-400',
          path: '/mcp-agents/monitoring/resources',
        },
        {
          id: 'network-monitoring',
          label: 'Network Monitoring',
          icon: Network,
          color: 'text-cyan-400',
          path: '/mcp-agents/monitoring/network',
        },
        {
          id: 'alerts-notifications',
          label: 'Alerts & Notifications',
          icon: Bell,
          color: 'text-yellow-400',
          path: '/mcp-agents/monitoring/alerts',
        },
      ],
    },
    {
      id: 'configuration',
      label: 'Configuration',
      icon: Settings,
      color: 'text-orange-500',
      path: '/mcp-agents/configuration',
      subMenus: [
        {
          id: 'agent-settings',
          label: 'Agent Settings',
          icon: Bot,
          color: 'text-orange-400',
          path: '/mcp-agents/configuration/agents',
        },
        {
          id: 'system-config',
          label: 'System Configuration',
          icon: Server,
          color: 'text-amber-400',
          path: '/mcp-agents/configuration/system',
        },
        {
          id: 'security-settings',
          label: 'Security Settings',
          icon: Shield,
          color: 'text-red-400',
          path: '/mcp-agents/configuration/security',
        },
        {
          id: 'backup-restore',
          label: 'Backup & Restore',
          icon: Database,
          color: 'text-purple-400',
          path: '/mcp-agents/configuration/backup',
        },
        {
          id: 'api-settings',
          label: 'API Settings',
          icon: Globe,
          color: 'text-blue-400',
          path: '/mcp-agents/configuration/api',
        },
      ],
    },
    {
      id: 'tasks',
      label: 'Task Management',
      icon: Zap,
      color: 'text-yellow-500',
      path: '/mcp-agents/tasks',
      subMenus: [
        {
          id: 'active-tasks',
          label: 'Active Tasks',
          icon: Play,
          color: 'text-yellow-400',
          path: '/mcp-agents/tasks/active',
        },
        {
          id: 'task-queue',
          label: 'Task Queue',
          icon: Clock,
          color: 'text-amber-400',
          path: '/mcp-agents/tasks/queue',
        },
        {
          id: 'task-history',
          label: 'Task History',
          icon: BarChart3,
          color: 'text-orange-400',
          path: '/mcp-agents/tasks/history',
        },
        {
          id: 'task-scheduling',
          label: 'Task Scheduling',
          icon: Calendar,
          color: 'text-red-400',
          path: '/mcp-agents/tasks/scheduling',
        },
        {
          id: 'task-templates',
          label: 'Task Templates',
          icon: FileText,
          color: 'text-purple-400',
          path: '/mcp-agents/tasks/templates',
        },
      ],
    },
    {
      id: 'security',
      label: 'Security & Compliance',
      icon: Shield,
      color: 'text-red-500',
      path: '/mcp-agents/security',
      subMenus: [
        {
          id: 'access-control',
          label: 'Access Control',
          icon: Lock,
          color: 'text-red-400',
          path: '/mcp-agents/security/access',
        },
        {
          id: 'audit-logs',
          label: 'Audit Logs',
          icon: FileText,
          color: 'text-pink-400',
          path: '/mcp-agents/security/audit',
        },
        {
          id: 'threat-detection',
          label: 'Threat Detection',
          icon: AlertTriangle,
          color: 'text-orange-400',
          path: '/mcp-agents/security/threats',
        },
        {
          id: 'compliance-reports',
          label: 'Compliance Reports',
          icon: Shield,
          color: 'text-blue-400',
          path: '/mcp-agents/security/compliance',
        },
      ],
    },
    {
      id: 'profile-settings',
      label: 'Profile & Settings',
      icon: User,
      color: 'text-indigo-500',
      path: '/mcp-agents/profile',
      subMenus: [
        {
          id: 'user-profile',
          label: 'User Profile',
          icon: User,
          color: 'text-indigo-400',
          path: '/mcp-agents/profile/user',
        },
        {
          id: 'account-settings',
          label: 'Account Settings',
          icon: Settings,
          color: 'text-blue-400',
          path: '/mcp-agents/profile/account',
        },
        {
          id: 'notifications',
          label: 'Notifications',
          icon: Bell,
          color: 'text-yellow-400',
          path: '/mcp-agents/profile/notifications',
        },
        {
          id: 'preferences',
          label: 'Preferences',
          icon: Star,
          color: 'text-purple-400',
          path: '/mcp-agents/profile/preferences',
        },
      ],
    },
  ];

  const handleMenuToggle = (menuId: string) => {
    setExpandedMenus(prev =>
      prev.includes(menuId) ? prev.filter(id => id !== menuId) : [...prev, menuId]
    );
  };

  const handleMenuItemClick = (id: string, path: string) => {
    setActiveMenuItem(id);
    console.log(`Navigating to: ${path}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'inactive':
        return 'text-gray-600 dark:text-gray-300 bg-gray-50 border-gray-200 dark:border-slate-700';
      case 'maintenance':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'error':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 dark:text-gray-300 bg-gray-50 border-gray-200 dark:border-slate-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return CheckCircle;
      case 'inactive':
        return XCircle;
      case 'maintenance':
        return Clock;
      case 'error':
        return AlertTriangle;
      default:
        return XCircle;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-indigo-50/20">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-800/80backdrop-blur-lg shadow-lg border-b border-gray-200 dark:border-slate-700/50sticky top-0 z-40">
        <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="md:hidden p-2 rounded-xl bg-white/70 dark:bg-slate-700/70 hover:bg-white/90 dark:hover:bg-slate-600/90 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:text-gray-200 transition-all duration-300 shadow-sm hover:shadow-md backdrop-blur-sm"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
                  <Bot className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                    TransBot AI
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium">
                    MCP 251 Agents Portal
                  </p>
                </div>
                <div className="sm:hidden">
                  <h1 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                    MCP Agents
                  </h1>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-1 sm:space-x-2">
              {/* Search Bar */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search agents, tasks, logs..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2.5 w-48 lg:w-80 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm shadow-sm"
                />
              </div>

              {/* Action Icons */}
              <div className="flex items-center space-x-1">
                <button className="p-2 sm:p-2.5 text-gray-400 hover:text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-xl hover:bg-gray-100 transition-colors">
                  <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <button className="p-2.5 text-gray-400 hover:text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-xl hover:bg-gray-100 transition-colors">
                  <Bell className="h-5 w-5" />
                </button>
                <button className="p-2.5 text-gray-400 hover:text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-xl hover:bg-gray-100 transition-colors">
                  <Settings className="h-5 w-5" />
                </button>
              </div>

              {/* User Profile */}
              <div className="flex items-center space-x-2 pl-2 border-l border-gray-200 dark:border-slate-700">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-8 w-8 rounded-full border-2 border-white shadow-sm"
                />
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white/70 dark:bg-slate-800/70backdrop-blur-lg shadow-lg border-r border-gray-200 dark:border-slate-700/50transition-all duration-300 fixed md:relative h-screen z-30`}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              {!sidebarCollapsed && (
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                    <Menu className="h-4 w-4 text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Navigation</h2>
                </div>
              )}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden md:block p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {sidebarCollapsed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
            </div>

            <nav className="space-y-2">
              {menuItems.map(item => {
                const Icon = item.icon;
                const isActive = activeMenuItem === item.id;
                const isExpanded = expandedMenus.includes(item.id);

                return (
                  <div key={item.id}>
                    <button
                      onClick={() => {
                        if (item.subMenus) {
                          handleMenuToggle(item.id);
                        } else {
                          handleMenuItemClick(item.id, item.path);
                        }
                      }}
                      className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100'
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${isActive ? 'text-white' : item.color}`} />
                      {!sidebarCollapsed && (
                        <>
                          <span className="font-medium">{item.label}</span>
                          {item.subMenus && (
                            <ChevronRight
                              className={`h-4 w-4 ml-auto transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                            />
                          )}
                        </>
                      )}
                    </button>

                    {/* Sub-menus */}
                    <AnimatePresence>
                      {item.subMenus && isExpanded && !sidebarCollapsed && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="ml-6 mt-2 space-y-1"
                        >
                          {item.subMenus.map(subItem => {
                            const SubIcon = subItem.icon;
                            return (
                              <div key={subItem.id}>
                                <button
                                  onClick={() => handleMenuItemClick(subItem.id, subItem.path)}
                                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 text-gray-600 dark:text-gray-300 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-100"
                                >
                                  <SubIcon className={`h-4 w-4 ${subItem.color}`} />
                                  <span>{subItem.label}</span>
                                  {subItem.subSubMenus && (
                                    <ChevronRight className="h-3 w-3 ml-auto" />
                                  )}
                                </button>

                                {/* Sub-sub-menus */}
                                {subItem.subSubMenus && (
                                  <div className="ml-6 mt-1 space-y-1">
                                    {subItem.subSubMenus.map(subSubItem => (
                                      <button
                                        key={subSubItem.id}
                                        onClick={() =>
                                          handleMenuItemClick(subSubItem.id, subSubItem.path)
                                        }
                                        className="w-full flex items-center space-x-3 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-300"
                                      >
                                        <div className="h-2 w-2 bg-gray-300 rounded-full"></div>
                                        <span>{subSubItem.label}</span>
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            {/* MCP Status Widget */}
            <div className="mt-8 p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                {!sidebarCollapsed && (
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      MCP 251 Agents
                    </p>
                    <p className="text-xs text-gray-500">24/7 Active</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
          {/* Dashboard Header */}
          <div className="bg-white/70 dark:bg-slate-800/70backdrop-blur-lg rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-slate-700/50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                  MCP Agents Dashboard
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1">
                  Monitor and manage all 251 MCP agents across the system.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">Live</span>
              </div>
            </div>
          </div>

          {/* MCP Connection Status */}
          <div className="bg-gradient-to-r from-purple-50/80 to-indigo-50/80 border border-purple-200/50 rounded-lg px-3 py-2 shadow-sm">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-purple-700">
                Connecting to MCP agents...
              </span>
              <div className="flex space-x-1 ml-auto">
                <div className="h-1.5 w-1.5 bg-purple-400 rounded-full animate-bounce"></div>
                <div
                  className="h-1.5 w-1.5 bg-purple-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.1s' }}
                ></div>
                <div
                  className="h-1.5 w-1.5 bg-purple-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                ></div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                label: 'Active Agents',
                value: '248',
                change: '+12',
                color: 'green',
                icon: CheckCircle,
              },
              { label: 'Tasks Running', value: '1,247', change: '+8%', color: 'blue', icon: Play },
              {
                label: 'System Health',
                value: '99.9%',
                change: '+0.1%',
                color: 'purple',
                icon: Activity,
              },
              { label: 'Alerts', value: '3', change: '-2', color: 'yellow', icon: AlertTriangle },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`bg-white/70 dark:bg-slate-800/70backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-slate-700/50hover:shadow-xl transition-all duration-300`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        {stat.label}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                        {stat.value}
                      </p>
                      <p
                        className={`text-xs font-medium mt-1 ${
                          stat.color === 'green'
                            ? 'text-green-600'
                            : stat.color === 'blue'
                              ? 'text-blue-600'
                              : stat.color === 'purple'
                                ? 'text-purple-600'
                                : 'text-yellow-600'
                        }`}
                      >
                        {stat.change}
                      </p>
                    </div>
                    <div
                      className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                        stat.color === 'green'
                          ? 'bg-green-100'
                          : stat.color === 'blue'
                            ? 'bg-blue-100'
                            : stat.color === 'purple'
                              ? 'bg-purple-100'
                              : 'bg-yellow-100'
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 ${
                          stat.color === 'green'
                            ? 'text-green-600'
                            : stat.color === 'blue'
                              ? 'text-blue-600'
                              : stat.color === 'purple'
                                ? 'text-purple-600'
                                : 'text-yellow-600'
                        }`}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Agents Grid */}
          <div className="bg-white/70 dark:bg-slate-800/70backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-slate-700/50">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  MCP Agents Overview
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Real-time status of all 251 agents
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  <Plus className="h-4 w-4 mr-2 inline" />
                  Add Agent
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {agents.slice(0, 12).map((agent, index) => {
                const StatusIcon = getStatusIcon(agent.status);
                return (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md cursor-pointer ${getStatusColor(agent.status)}`}
                    onClick={() => console.log('Agent clicked:', agent.id)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Bot className="h-5 w-5" />
                        <span className="font-semibold text-sm">{agent.name}</span>
                      </div>
                      <StatusIcon className="h-4 w-4" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Type:</span>
                        <span className="font-medium">{agent.type}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Performance:</span>
                        <span className="font-medium">{agent.performance}%</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Tasks:</span>
                        <span className="font-medium">{agent.tasksCompleted}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Location:</span>
                        <span className="font-medium">{agent.location}</span>
                      </div>
                    </div>

                    {agent.currentTask && (
                      <div className="mt-3 p-2 bg-white/50 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-300">Current Task:</p>
                        <p className="text-xs font-medium text-gray-800 dark:text-gray-200">
                          {agent.currentTask}
                        </p>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-6 text-center">
              <button className="px-6 py-2 bg-gray-100 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 transition-colors">
                View All 251 Agents
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MCPAgentsPortal;
