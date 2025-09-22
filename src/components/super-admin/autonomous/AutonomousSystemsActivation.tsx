import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Zap,
  Database,
  Globe,
  Shield,
  Settings,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  Clock,
  Activity,
  Server,
  Cpu,
  HardDrive,
  Wifi,
  GitBranch,
  Webhook,
  Key,
  Eye,
  EyeOff,
  RefreshCw,
  Power,
  PowerOff,
  TrendingUp,
  BarChart3,
  Monitor,
  Bell,
  Lock,
  Unlock
} from 'lucide-react';

interface AutonomousSystem {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'pending' | 'error';
  lastActivated: string;
  uptime: string;
  health: 'healthy' | 'warning' | 'critical';
  dependencies: string[];
  configuration: {
    enabled: boolean;
    autoStart: boolean;
    monitoring: boolean;
    alerts: boolean;
    backup: boolean;
  };
  metrics: {
    requests: number;
    responseTime: number;
    errorRate: number;
    throughput: number;
  };
}

const AutonomousSystemsActivation: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isActivating, setIsActivating] = useState(false);
  const [activationProgress, setActivationProgress] = useState(0);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [lastActivationTime, setLastActivationTime] = useState<string>('2025-09-21 08:25:00');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Autonomous Systems State
  const [autonomousSystems, setAutonomousSystems] = useState<AutonomousSystem[]>([
    {
      id: 'supabase',
      name: 'Supabase Database',
      description: 'Primary database system with real-time capabilities',
      status: 'active',
      lastActivated: '2025-09-21 08:25:00',
      uptime: '99.9%',
      health: 'healthy',
      dependencies: ['network', 'storage'],
      configuration: {
        enabled: true,
        autoStart: true,
        monitoring: true,
        alerts: true,
        backup: true
      },
      metrics: {
        requests: 1250,
        responseTime: 15,
        errorRate: 0.1,
        throughput: 850
      }
    },
    {
      id: 'n8n',
      name: 'N8N Workflow Engine',
      description: 'Automated workflow and integration management',
      status: 'active',
      lastActivated: '2025-09-21 08:25:00',
      uptime: '99.8%',
      health: 'healthy',
      dependencies: ['supabase', 'network'],
      configuration: {
        enabled: true,
        autoStart: true,
        monitoring: true,
        alerts: true,
        backup: true
      },
      metrics: {
        requests: 320,
        responseTime: 45,
        errorRate: 0.2,
        throughput: 180
      }
    },
    {
      id: 'github',
      name: 'GitHub Integration',
      description: 'Version control and CI/CD pipeline management',
      status: 'active',
      lastActivated: '2025-09-21 08:25:00',
      uptime: '99.9%',
      health: 'healthy',
      dependencies: ['network', 'security'],
      configuration: {
        enabled: true,
        autoStart: true,
        monitoring: true,
        alerts: true,
        backup: false
      },
      metrics: {
        requests: 890,
        responseTime: 25,
        errorRate: 0.05,
        throughput: 420
      }
    },
    {
      id: 'ai-agents',
      name: 'AI Agent System',
      description: 'Autonomous AI agents for task automation',
      status: 'active',
      lastActivated: '2025-09-21 08:25:00',
      uptime: '99.7%',
      health: 'healthy',
      dependencies: ['supabase', 'n8n', 'github'],
      configuration: {
        enabled: true,
        autoStart: true,
        monitoring: true,
        alerts: true,
        backup: true
      },
      metrics: {
        requests: 1560,
        responseTime: 120,
        errorRate: 0.3,
        throughput: 95
      }
    },
    {
      id: 'monitoring',
      name: 'System Monitoring',
      description: 'Real-time system health and performance monitoring',
      status: 'active',
      lastActivated: '2025-09-21 08:25:00',
      uptime: '99.9%',
      health: 'healthy',
      dependencies: ['network', 'storage'],
      configuration: {
        enabled: true,
        autoStart: true,
        monitoring: true,
        alerts: true,
        backup: true
      },
      metrics: {
        requests: 2100,
        responseTime: 8,
        errorRate: 0.02,
        throughput: 1200
      }
    },
    {
      id: 'security',
      name: 'Security System',
      description: 'Automated security monitoring and threat detection',
      status: 'active',
      lastActivated: '2025-09-21 08:25:00',
      uptime: '99.9%',
      health: 'healthy',
      dependencies: ['network', 'monitoring'],
      configuration: {
        enabled: true,
        autoStart: true,
        monitoring: true,
        alerts: true,
        backup: true
      },
      metrics: {
        requests: 450,
        responseTime: 35,
        errorRate: 0.1,
        throughput: 280
      }
    }
  ]);

  // System Health Overview
  const [systemHealth] = useState({
    overall: 'healthy',
    uptime: '99.9%',
    totalSystems: 6,
    activeSystems: 6,
    criticalAlerts: 0,
    warnings: 1,
    lastHealthCheck: '2025-09-21 08:47:00'
  });

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      // Simulate real-time metric updates
      setAutonomousSystems(prev => prev.map(system => ({
        ...system,
        metrics: {
          ...system.metrics,
          requests: system.metrics.requests + Math.floor(Math.random() * 10),
          responseTime: Math.max(5, system.metrics.responseTime + (Math.random() - 0.5) * 5),
          errorRate: Math.max(0, system.metrics.errorRate + (Math.random() - 0.5) * 0.1),
          throughput: Math.max(0, system.metrics.throughput + (Math.random() - 0.5) * 20)
        }
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleActivateAllSystems = async () => {
    setIsActivating(true);
    setActivationProgress(0);

    // Simulate activation process
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setActivationProgress(i);
    }

    // Update all systems to active
    setAutonomousSystems(prev => prev.map(system => ({
      ...system,
      status: 'active' as const,
      lastActivated: new Date().toISOString().slice(0, 19).replace('T', ' '),
      health: 'healthy' as const
    })));

    setLastActivationTime(new Date().toISOString().slice(0, 19).replace('T', ' '));
    setIsActivating(false);
  };

  const handleToggleSystem = (systemId: string) => {
    setAutonomousSystems(prev => prev.map(system => 
      system.id === systemId 
        ? { 
            ...system, 
            status: system.status === 'active' ? 'inactive' : 'active',
            lastActivated: system.status === 'active' ? system.lastActivated : new Date().toISOString().slice(0, 19).replace('T', ' ')
          }
        : system
    ));
  };

  const handleUpdateConfiguration = (systemId: string, configKey: string, value: boolean) => {
    setAutonomousSystems(prev => prev.map(system => 
      system.id === systemId 
        ? { 
            ...system, 
            configuration: { ...system.configuration, [configKey]: value }
          }
        : system
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
      case 'inactive': return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-200';
      case 'pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200';
      case 'error': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'healthy': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getSystemIcon = (systemId: string) => {
    switch (systemId) {
      case 'supabase': return Database;
      case 'n8n': return Webhook;
      case 'github': return GitBranch;
      case 'ai-agents': return Brain;
      case 'monitoring': return Monitor;
      case 'security': return Shield;
      default: return Server;
    }
  };

  const TabButton = ({ id, label, icon: Icon, isActive }: { id: string; label: string; icon: React.ComponentType<{ className?: string }>; isActive: boolean }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
        isActive
          ? 'bg-blue-600 text-white'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Overall Health</p>
              <p className="text-2xl font-bold text-green-600">{systemHealth.overall}</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">System Uptime</p>
              <p className="text-2xl font-bold text-blue-600">{systemHealth.uptime}</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Systems</p>
              <p className="text-2xl font-bold text-purple-600">{systemHealth.activeSystems}/{systemHealth.totalSystems}</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Server className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Alerts</p>
              <p className="text-2xl font-bold text-orange-600">{systemHealth.criticalAlerts + systemHealth.warnings}</p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <Bell className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Activation Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">System Activation</h3>
            <p className="text-gray-600 dark:text-gray-400">Activate all autonomous systems with optimized settings</p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Last activated: {lastActivationTime}
            </span>
            <button
              onClick={handleActivateAllSystems}
              disabled={isActivating}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {isActivating ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Power className="w-4 h-4" />
              )}
              <span>{isActivating ? 'Activating...' : 'Activate All Systems'}</span>
            </button>
          </div>
        </div>

        {isActivating && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Activation Progress</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{activationProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                className="bg-green-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${activationProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {autonomousSystems.map((system) => {
            const Icon = getSystemIcon(system.id);
            return (
              <motion.div
                key={system.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{system.name}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{system.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggleSystem(system.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      system.status === 'active'
                        ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
                        : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {system.status === 'active' ? <Power className="w-4 h-4" /> : <PowerOff className="w-4 h-4" />}
                  </button>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(system.status)}`}>
                    {system.status}
                  </span>
                  <span className={`flex items-center space-x-1 ${getHealthColor(system.health)}`}>
                    <div className={`w-2 h-2 rounded-full ${
                      system.health === 'healthy' ? 'bg-green-500' :
                      system.health === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                    <span>{system.health}</span>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderSystemsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Autonomous Systems</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage individual system configurations and status</p>
        </div>
        <button
          onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <Settings className="w-4 h-4" />
          <span>{showAdvancedSettings ? 'Hide' : 'Show'} Advanced Settings</span>
        </button>
      </div>

      <div className="space-y-4">
        {autonomousSystems.map((system) => {
          const Icon = getSystemIcon(system.id);
          return (
            <motion.div
              key={system.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{system.name}</h3>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(system.status)}`}>
                        {system.status}
                      </span>
                      <span className={`flex items-center space-x-1 text-sm ${getHealthColor(system.health)}`}>
                        <div className={`w-2 h-2 rounded-full ${
                          system.health === 'healthy' ? 'bg-green-500' :
                          system.health === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                        }`} />
                        <span>{system.health}</span>
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{system.description}</p>
                    
                    {/* Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Requests</p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">{system.metrics.requests.toLocaleString()}</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Response Time</p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">{system.metrics.responseTime.toFixed(1)}ms</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Error Rate</p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">{system.metrics.errorRate.toFixed(2)}%</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Throughput</p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">{system.metrics.throughput.toLocaleString()}/s</p>
                      </div>
                    </div>

                    {/* System Info */}
                    <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>Last activated: {system.lastActivated}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Activity className="w-4 h-4" />
                        <span>Uptime: {system.uptime}</span>
                      </span>
                    </div>

                    {/* Advanced Settings */}
                    {showAdvancedSettings && (
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Configuration</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {Object.entries(system.configuration).map(([key, value]) => (
                            <label key={key} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={value}
                                onChange={(e) => handleUpdateConfiguration(system.id, key, e.target.checked)}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleToggleSystem(system.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      system.status === 'active'
                        ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {system.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  const renderMonitoringTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">System Monitoring</h2>
          <p className="text-gray-600 dark:text-gray-400">Real-time monitoring and performance metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Live</span>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Current time: {currentTime.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">System Performance</h3>
          <div className="space-y-4">
            {autonomousSystems.map((system) => (
              <div key={system.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{system.name}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>{system.metrics.responseTime.toFixed(1)}ms</span>
                  <span>{system.metrics.requests.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Health Status</h3>
          <div className="space-y-4">
            {autonomousSystems.map((system) => (
              <div key={system.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    system.health === 'healthy' ? 'bg-green-500' :
                    system.health === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{system.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{system.uptime}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    system.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                  }`}>
                    {system.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Autonomous Systems</h1>
                <p className="text-gray-600 dark:text-gray-400">Activate and manage all autonomous systems with optimized settings</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">Activation Time</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">08:25 AM</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">09/21/2025</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div className="flex space-x-2 mb-6">
            <TabButton id="overview" label="Overview" icon={BarChart3} isActive={activeTab === 'overview'} />
            <TabButton id="systems" label="Systems" icon={Server} isActive={activeTab === 'systems'} />
            <TabButton id="monitoring" label="Monitoring" icon={Monitor} isActive={activeTab === 'monitoring'} />
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'systems' && renderSystemsTab()}
          {activeTab === 'monitoring' && renderMonitoringTab()}
        </div>
      </div>
    </div>
  );
};

export default AutonomousSystemsActivation;
