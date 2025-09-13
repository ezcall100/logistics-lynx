import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Brain,
  Globe,
  Shield,
  BarChart3,
  Activity,
  Settings,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Bell,
  Search,
  X,
  Command,
  Monitor,
  Database,
  Network,
  Cpu,
  HardDrive,
  Zap,
  Eye,
  Lock,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  Target,
  Layers,
  Grid3X3,
  Maximize2,
  Minimize2,
  Filter,
  Download,
  Upload,
  Play,
  Pause,
  Square,
  RotateCcw,
  Power,
  Wifi,
  WifiOff,
  Signal,
  SignalHigh,
  SignalLow,
  SignalZero,
  Sun,
  Moon,
} from 'lucide-react';

// Enhanced color system for dark/light modes
const colorSystem = {
  light: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    secondary: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7c3aed',
      800: '#6b21a8',
      900: '#581c87',
    },
    accent: {
      50: '#f0fdfa',
      100: '#ccfbf1',
      200: '#99f6e4',
      300: '#5eead4',
      400: '#2dd4bf',
      500: '#14b8a6',
      600: '#0d9488',
      700: '#0f766e',
      800: '#115e59',
      900: '#134e4a',
    },
    neutral: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
  },
  dark: {
    primary: {
      50: '#0c4a6e',
      100: '#075985',
      200: '#0369a1',
      300: '#0284c7',
      400: '#0ea5e9',
      500: '#38bdf8',
      600: '#7dd3fc',
      700: '#bae6fd',
      800: '#e0f2fe',
      900: '#f0f9ff',
    },
    secondary: {
      50: '#581c87',
      100: '#6b21a8',
      200: '#7c3aed',
      300: '#9333ea',
      400: '#a855f7',
      500: '#c084fc',
      600: '#d8b4fe',
      700: '#e9d5ff',
      800: '#f3e8ff',
      900: '#faf5ff',
    },
    accent: {
      50: '#134e4a',
      100: '#115e59',
      200: '#0f766e',
      300: '#0d9488',
      400: '#14b8a6',
      500: '#2dd4bf',
      600: '#5eead4',
      700: '#99f6e4',
      800: '#ccfbf1',
      900: '#f0fdfa',
    },
    neutral: {
      50: '#0f172a',
      100: '#1e293b',
      200: '#334155',
      300: '#475569',
      400: '#64748b',
      500: '#94a3b8',
      600: '#cbd5e1',
      700: '#e2e8f0',
      800: '#f1f5f9',
      900: '#f8fafc',
    },
    success: {
      50: '#14532d',
      100: '#166534',
      200: '#15803d',
      300: '#16a34a',
      400: '#22c55e',
      500: '#4ade80',
      600: '#86efac',
      700: '#bbf7d0',
      800: '#dcfce7',
      900: '#f0fdf4',
    },
    warning: {
      50: '#78350f',
      100: '#92400e',
      200: '#b45309',
      300: '#d97706',
      400: '#f59e0b',
      500: '#fbbf24',
      600: '#fcd34d',
      700: '#fde68a',
      800: '#fef3c7',
      900: '#fffbeb',
    },
    error: {
      50: '#7f1d1d',
      100: '#991b1b',
      200: '#b91c1c',
      300: '#dc2626',
      400: '#ef4444',
      500: '#f87171',
      600: '#fca5a5',
      700: '#fecaca',
      800: '#fee2e2',
      900: '#fef2f2',
    },
  },
};

interface SystemModule {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  status: 'online' | 'offline' | 'maintenance' | 'warning' | 'error';
  priority: 'critical' | 'high' | 'medium' | 'low';
  metrics: {
    value: number;
    unit: string;
    trend: 'up' | 'down' | 'stable';
    change: string;
  };
  lastUpdate: string;
  uptime: string;
}

interface CommandCenterProps {
  theme?: 'light' | 'dark';
}

const EnhancedSuperAdminCommandCenter: React.FC<CommandCenterProps> = ({ 
  theme = 'dark' 
}) => {
  const [activeView, setActiveView] = useState<'overview' | 'modules' | 'analytics' | 'settings'>('overview');
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [notifications, setNotifications] = useState(12);
  const [currentTheme, setCurrentTheme] = useState(theme);

  const colors = colorSystem[currentTheme];

  // System modules data
  const systemModules: SystemModule[] = [
    {
      id: 'mcp-agents',
      name: 'MCP Agents',
      description: 'Multi-Context Processing Agents',
      icon: Bot,
      color: 'primary',
      status: 'online',
      priority: 'critical',
      metrics: { value: 247, unit: 'Active', trend: 'up', change: '+12%' },
      lastUpdate: '2 min ago',
      uptime: '99.9%',
    },
    {
      id: 'ai-command',
      name: 'AI Command Center',
      description: 'Artificial Intelligence Operations',
      icon: Brain,
      color: 'secondary',
      status: 'online',
      priority: 'high',
      metrics: { value: 89, unit: 'Processes', trend: 'stable', change: '0%' },
      lastUpdate: '1 min ago',
      uptime: '99.7%',
    },
    {
      id: 'security',
      name: 'Security War Room',
      description: 'Cybersecurity Operations',
      icon: Shield,
      color: 'error',
      status: 'warning',
      priority: 'critical',
      metrics: { value: 3, unit: 'Threats', trend: 'up', change: '+1' },
      lastUpdate: '30 sec ago',
      uptime: '100%',
    },
    {
      id: 'analytics',
      name: 'Business Intelligence',
      description: 'Data Analytics & Reporting',
      icon: BarChart3,
      color: 'accent',
      status: 'online',
      priority: 'medium',
      metrics: { value: 156, unit: 'Reports', trend: 'up', change: '+8%' },
      lastUpdate: '5 min ago',
      uptime: '99.5%',
    },
    {
      id: 'infrastructure',
      name: 'Infrastructure',
      description: 'System Infrastructure',
      icon: Database,
      color: 'neutral',
      status: 'online',
      priority: 'high',
      metrics: { value: 24, unit: 'Servers', trend: 'stable', change: '0%' },
      lastUpdate: '1 min ago',
      uptime: '99.8%',
    },
    {
      id: 'network',
      name: 'Network Operations',
      description: 'Network Management',
      icon: Network,
      color: 'primary',
      status: 'online',
      priority: 'high',
      metrics: { value: 1.2, unit: 'TB/s', trend: 'up', change: '+5%' },
      lastUpdate: '30 sec ago',
      uptime: '99.9%',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return colors.success[500];
      case 'warning': return colors.warning[500];
      case 'error': return colors.error[500];
      case 'maintenance': return colors.neutral[500];
      case 'offline': return colors.error[700];
      default: return colors.neutral[500];
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'error': return <X className="w-4 h-4" />;
      case 'maintenance': return <Settings className="w-4 h-4" />;
      case 'offline': return <Power className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      case 'stable': return <Activity className="w-4 h-4 text-blue-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getModuleColor = (color: string) => {
    const colorMap: Record<string, Record<string, string>> = {
      primary: colors.primary,
      secondary: colors.secondary,
      accent: colors.accent,
      error: colors.error,
      neutral: colors.neutral,
    };
    return colorMap[color] || colors.neutral;
  };

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        // Simulate data refresh
        console.log('Refreshing system data...');
      }, refreshInterval * 1000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval]);

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      currentTheme === 'dark' 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100'
    }`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-lg border-b transition-all duration-300 ${
        currentTheme === 'dark'
          ? 'bg-slate-900/80 border-slate-700'
          : 'bg-white/80 border-slate-200'
      }`}>
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  currentTheme === 'dark'
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  currentTheme === 'dark' ? 'bg-blue-600' : 'bg-blue-500'
                }`}>
                  <Command className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className={`text-xl font-bold ${
                    currentTheme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    Super Admin Command Center
                  </h1>
                  <p className={`text-sm ${
                    currentTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    Enterprise System Control Hub
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className={`relative ${
                currentTheme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'
              } rounded-lg`}>
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                  currentTheme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                }`} />
                <input
                  type="text"
                  placeholder="Search systems..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-10 pr-4 py-2 bg-transparent border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    currentTheme === 'dark' 
                      ? 'text-white placeholder-slate-400' 
                      : 'text-slate-900 placeholder-slate-500'
                  }`}
                />
              </div>

              {/* Notifications */}
              <button className={`relative p-2 rounded-lg transition-all duration-200 ${
                currentTheme === 'dark'
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}>
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>

              {/* Theme Toggle */}
              <button
                onClick={() => setCurrentTheme(currentTheme === 'dark' ? 'light' : 'dark')}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  currentTheme === 'dark'
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {currentTheme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              {/* Auto Refresh */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    autoRefresh
                      ? currentTheme === 'dark'
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-green-500 hover:bg-green-600 text-white'
                      : currentTheme === 'dark'
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  <RefreshCw className={`w-5 h-5 ${autoRefresh ? 'animate-spin' : ''}`} />
                </button>
                <span className={`text-sm ${
                  currentTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {refreshInterval}s
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {!sidebarCollapsed && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className={`border-r transition-all duration-300 ${
                currentTheme === 'dark'
                  ? 'bg-slate-800 border-slate-700'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="p-6">
                <nav className="space-y-2">
                  {[
                    { id: 'overview', name: 'Overview', icon: Monitor },
                    { id: 'modules', name: 'System Modules', icon: Layers },
                    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
                    { id: 'settings', name: 'Settings', icon: Settings },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveView(item.id as any)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        activeView === item.id
                          ? currentTheme === 'dark'
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-500 text-white'
                          : currentTheme === 'dark'
                            ? 'text-slate-300 hover:bg-slate-700'
                            : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <AnimatePresence mode="wait">
            {activeView === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* System Status Overview */}
                <div className={`rounded-xl p-6 ${
                  currentTheme === 'dark'
                    ? 'bg-slate-800 border border-slate-700'
                    : 'bg-white border border-slate-200'
                }`}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className={`text-2xl font-bold ${
                      currentTheme === 'dark' ? 'text-white' : 'text-slate-900'
                    }`}>
                      System Status Overview
                    </h2>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className={`text-sm ${
                          currentTheme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                        }`}>
                          All Systems Operational
                        </span>
                      </div>
                      <span className={`text-sm ${
                        currentTheme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        Last updated: {new Date().toLocaleTimeString()}
                      </span>
                    </div>
                  </div>

                  {/* System Modules Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {systemModules.map((module) => {
                      const moduleColors = getModuleColor(module.color);
                      return (
                        <motion.div
                          key={module.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`rounded-lg p-6 cursor-pointer transition-all duration-200 ${
                            currentTheme === 'dark'
                              ? 'bg-slate-700 hover:bg-slate-600 border border-slate-600'
                              : 'bg-slate-50 hover:bg-slate-100 border border-slate-200'
                          }`}
                          onClick={() => setSelectedModule(module.id)}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div
                                className="p-3 rounded-lg"
                                style={{ backgroundColor: `${moduleColors[500]}20` }}
                              >
                                <module.icon
                                  className="w-6 h-6"
                                  style={{ color: moduleColors[500] }}
                                />
                              </div>
                              <div>
                                <h3 className={`font-semibold ${
                                  currentTheme === 'dark' ? 'text-white' : 'text-slate-900'
                                }`}>
                                  {module.name}
                                </h3>
                                <p className={`text-sm ${
                                  currentTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                                }`}>
                                  {module.description}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div
                                className="p-1 rounded-full"
                                style={{ backgroundColor: getStatusColor(module.status) }}
                              >
                                {getStatusIcon(module.status)}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className={`text-sm ${
                                currentTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                              }`}>
                                Current Load
                              </span>
                              <div className="flex items-center space-x-2">
                                <span className={`font-semibold ${
                                  currentTheme === 'dark' ? 'text-white' : 'text-slate-900'
                                }`}>
                                  {module.metrics.value} {module.metrics.unit}
                                </span>
                                {getTrendIcon(module.metrics.trend)}
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className={`text-sm ${
                                currentTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                              }`}>
                                Uptime
                              </span>
                              <span className={`font-semibold ${
                                currentTheme === 'dark' ? 'text-white' : 'text-slate-900'
                              }`}>
                                {module.uptime}
                              </span>
                            </div>

                            <div className="flex items-center justify-between">
                              <span className={`text-sm ${
                                currentTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                              }`}>
                                Last Update
                              </span>
                              <span className={`text-sm ${
                                currentTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                              }`}>
                                {module.lastUpdate}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className={`rounded-xl p-6 ${
                  currentTheme === 'dark'
                    ? 'bg-slate-800 border border-slate-700'
                    : 'bg-white border border-slate-200'
                }`}>
                  <h3 className={`text-xl font-bold mb-4 ${
                    currentTheme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: 'System Restart', icon: RotateCcw, color: 'warning' },
                      { name: 'Backup Now', icon: Download, color: 'primary' },
                      { name: 'Deploy Update', icon: Upload, color: 'accent' },
                      { name: 'Emergency Stop', icon: Square, color: 'error' },
                    ].map((action) => (
                      <button
                        key={action.name}
                        className={`p-4 rounded-lg transition-all duration-200 ${
                          currentTheme === 'dark'
                            ? 'bg-slate-700 hover:bg-slate-600 border border-slate-600'
                            : 'bg-slate-50 hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        <action.icon className={`w-6 h-6 mx-auto mb-2 ${
                          currentTheme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                        }`} />
                        <span className={`text-sm font-medium ${
                          currentTheme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                        }`}>
                          {action.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default EnhancedSuperAdminCommandCenter;
