import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Heart, 
  HeartOff, 
  Zap, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  Cpu, 
  MemoryStick, 
  Database, 
  Server, 
  Network, 
  Globe, 
  Users, 
  BarChart3, 
  PieChart, 
  LineChart, 
  RefreshCw, 
  Settings, 
  Play, 
  Pause, 
  RotateCcw, 
  Power, 
  PowerOff, 
  Eye, 
  EyeOff, 
  Maximize2, 
  Minimize2, 
  Download, 
  Upload, 
  Filter, 
  Search, 
  Calendar, 
  Bell, 
  BellOff, 
  Volume2, 
  VolumeX, 
  Wifi, 
  WifiOff, 
  Signal, 
  SignalZero, 
  SignalLow, 
  SignalMedium, 
  SignalHigh, 
  Target, 
  Brain, 
  Bot, 
  Command, 
  Terminal, 
  ExternalLink, 
  Copy, 
  Share, 
  Star, 
  StarOff, 
  Heart as HeartIcon, 
  HeartOff as HeartOffIcon
} from 'lucide-react';

interface SystemComponent {
  id: string;
  name: string;
  type: 'server' | 'database' | 'network' | 'service' | 'portal';
  status: 'healthy' | 'warning' | 'critical' | 'offline';
  health: number;
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  uptime: number;
  lastCheck: string;
  location: string;
  version: string;
  alerts: number;
  autoHealing: boolean;
  dependencies: string[];
}

interface HealthMetric {
  id: string;
  name: string;
  value: number;
  threshold: number;
  status: 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  unit: string;
  description: string;
}

interface HealingAction {
  id: string;
  component: string;
  action: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  startedAt: string;
  completedAt?: string;
  result?: string;
  automated: boolean;
}

const SystemHealthMonitor: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<SystemComponent | null>(null);
  const [viewMode, setViewMode] = useState<'overview' | 'components' | 'healing' | 'metrics'>('overview');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [autoHealing, setAutoHealing] = useState(true);
  const [selectedAction, setSelectedAction] = useState<HealingAction | null>(null);

  // Mock data for system components
  const [components, setComponents] = useState<SystemComponent[]>([
    {
      id: 'web-server-1',
      name: 'Web Server Cluster 1',
      type: 'server',
      status: 'healthy',
      health: 98,
      cpu: 45,
      memory: 62,
      disk: 38,
      network: 78,
      uptime: 99.9,
      lastCheck: '30 seconds ago',
      location: 'US-East-1',
      version: 'v2.4.1',
      alerts: 0,
      autoHealing: true,
      dependencies: ['load-balancer', 'database-cluster']
    },
    {
      id: 'database-cluster',
      name: 'Database Cluster',
      type: 'database',
      status: 'warning',
      health: 85,
      cpu: 78,
      memory: 89,
      disk: 65,
      network: 45,
      uptime: 99.7,
      lastCheck: '1 minute ago',
      location: 'US-East-1',
      version: 'v3.2.0',
      alerts: 2,
      autoHealing: true,
      dependencies: ['backup-service', 'monitoring-service']
    },
    {
      id: 'load-balancer',
      name: 'Load Balancer',
      type: 'network',
      status: 'healthy',
      health: 96,
      cpu: 32,
      memory: 28,
      disk: 15,
      network: 92,
      uptime: 99.8,
      lastCheck: '45 seconds ago',
      location: 'Global',
      version: 'v1.8.2',
      alerts: 0,
      autoHealing: true,
      dependencies: ['dns-service']
    },
    {
      id: 'broker-portal',
      name: 'Broker Portal',
      type: 'portal',
      status: 'healthy',
      health: 94,
      cpu: 56,
      memory: 48,
      disk: 42,
      network: 67,
      uptime: 99.6,
      lastCheck: '2 minutes ago',
      location: 'US-West-2',
      version: 'v2.4.1',
      alerts: 1,
      autoHealing: false,
      dependencies: ['web-server-1', 'database-cluster']
    },
    {
      id: 'api-gateway',
      name: 'API Gateway',
      type: 'service',
      status: 'critical',
      health: 72,
      cpu: 89,
      memory: 95,
      disk: 78,
      network: 56,
      uptime: 98.5,
      lastCheck: '3 minutes ago',
      location: 'EU-Central-1',
      version: 'v2.1.5',
      alerts: 5,
      autoHealing: true,
      dependencies: ['auth-service', 'rate-limiter']
    }
  ]);

  const [metrics, setMetrics] = useState<HealthMetric[]>([
    {
      id: 'response-time',
      name: 'Response Time',
      value: 245,
      threshold: 500,
      status: 'good',
      trend: 'stable',
      unit: 'ms',
      description: 'Average API response time'
    },
    {
      id: 'error-rate',
      name: 'Error Rate',
      value: 0.8,
      threshold: 5,
      status: 'good',
      trend: 'down',
      unit: '%',
      description: 'Percentage of failed requests'
    },
    {
      id: 'throughput',
      name: 'Throughput',
      value: 1250,
      threshold: 1000,
      status: 'good',
      trend: 'up',
      unit: 'req/s',
      description: 'Requests per second'
    },
    {
      id: 'availability',
      name: 'Availability',
      value: 99.7,
      threshold: 99.5,
      status: 'good',
      trend: 'stable',
      unit: '%',
      description: 'System uptime percentage'
    }
  ]);

  const [healingActions, setHealingActions] = useState<HealingAction[]>([
    {
      id: 'heal-1',
      component: 'database-cluster',
      action: 'Restart Database Service',
      status: 'completed',
      startedAt: '5 minutes ago',
      completedAt: '3 minutes ago',
      result: 'Database service restarted successfully',
      automated: true
    },
    {
      id: 'heal-2',
      component: 'api-gateway',
      action: 'Scale Up Resources',
      status: 'running',
      startedAt: '2 minutes ago',
      automated: true
    },
    {
      id: 'heal-3',
      component: 'web-server-1',
      action: 'Clear Cache',
      status: 'pending',
      startedAt: '1 minute ago',
      automated: false
    }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setComponents(prevComponents => 
        prevComponents.map(component => ({
          ...component,
          health: Math.max(0, Math.min(100, component.health + (Math.random() - 0.5) * 5)),
          cpu: Math.max(0, Math.min(100, component.cpu + (Math.random() - 0.5) * 10)),
          memory: Math.max(0, Math.min(100, component.memory + (Math.random() - 0.5) * 8)),
          lastCheck: 'Just now'
        }))
      );

      setMetrics(prevMetrics => 
        prevMetrics.map(metric => ({
          ...metric,
          value: Math.max(0, metric.value + (Math.random() - 0.5) * (metric.value * 0.1))
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-400 bg-green-400/20';
      case 'warning': return 'text-yellow-400 bg-yellow-400/20';
      case 'critical': return 'text-red-400 bg-red-400/20';
      case 'offline': return 'text-gray-400 bg-gray-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'text-green-400';
    if (health >= 70) return 'text-yellow-400';
    if (health >= 50) return 'text-orange-400';
    return 'text-red-400';
  };

  const getMetricStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-400 bg-green-400/20';
      case 'warning': return 'text-yellow-400 bg-yellow-400/20';
      case 'critical': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getActionStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-400/20';
      case 'running': return 'text-blue-400 bg-blue-400/20';
      case 'pending': return 'text-yellow-400 bg-yellow-400/20';
      case 'failed': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'server': return <Server className="w-4 h-4" />;
      case 'database': return <Database className="w-4 h-4" />;
      case 'network': return <Network className="w-4 h-4" />;
      case 'service': return <Zap className="w-4 h-4" />;
      case 'portal': return <Globe className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const totalComponents = components.length;
  const healthyComponents = components.filter(c => c.status === 'healthy').length;
  const criticalComponents = components.filter(c => c.status === 'critical').length;
  const averageHealth = Math.round(components.reduce((sum, c) => sum + c.health, 0) / components.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              💚 System Health Monitor
            </h1>
            <p className="text-gray-300 text-lg">
              Autonomous system monitoring and self-healing capabilities
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-white font-medium">
                {autoRefresh ? 'Live Monitoring' : 'Paused'}
              </span>
            </div>
            <button 
              onClick={() => setAutoHealing(!autoHealing)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                autoHealing ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'
              } text-white flex items-center space-x-2`}
            >
              <Heart className="w-4 h-4" />
              <span>{autoHealing ? 'Auto-Healing ON' : 'Auto-Healing OFF'}</span>
            </button>
            <button 
              onClick={() => setAutoRefresh(!autoRefresh)}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
              <span>{autoRefresh ? 'Pause' : 'Resume'}</span>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex space-x-2 mb-8">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'components', label: 'Components', icon: Server },
            { id: 'healing', label: 'Healing', icon: Heart },
            { id: 'metrics', label: 'Metrics', icon: Activity }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setViewMode(id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                viewMode === id 
                  ? 'bg-cyan-600 text-white' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* System Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">System Health</p>
                <p className="text-3xl font-bold text-white">{averageHealth}%</p>
                <p className="text-xs text-gray-400">Average across all components</p>
              </div>
              <Heart className="w-8 h-8 text-cyan-400" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Healthy Components</p>
                <p className="text-3xl font-bold text-green-400">{healthyComponents}</p>
                <p className="text-xs text-gray-400">of {totalComponents} total</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Critical Issues</p>
                <p className="text-3xl font-bold text-red-400">{criticalComponents}</p>
                <p className="text-xs text-gray-400">Require immediate attention</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Auto-Healing</p>
                <p className="text-3xl font-bold text-purple-400">
                  {healingActions.filter(a => a.automated).length}
                </p>
                <p className="text-xs text-gray-400">Active healing actions</p>
              </div>
              <Zap className="w-8 h-8 text-purple-400" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      {viewMode === 'components' && (
        <div className="space-y-6">
          {components.map((component, index) => (
            <motion.div
              key={component.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedComponent(component)}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:scale-105 transition-transform cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-cyan-600 rounded-lg flex items-center justify-center">
                    {getTypeIcon(component.type)}
                  </div>
                  <div>
                    <h3 className="text-white font-bold">{component.name}</h3>
                    <p className="text-sm text-gray-300">{component.type} • {component.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`px-3 py-1 rounded-full text-xs ${getStatusColor(component.status)}`}>
                    {component.status}
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${getHealthColor(component.health)}`}>
                      {component.health}%
                    </p>
                    <p className="text-xs text-gray-400">{component.lastCheck}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-xs text-gray-400">CPU</p>
                  <p className="text-sm text-white">{component.cpu}%</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400">Memory</p>
                  <p className="text-sm text-white">{component.memory}%</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400">Disk</p>
                  <p className="text-sm text-white">{component.disk}%</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400">Network</p>
                  <p className="text-sm text-white">{component.network}%</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Uptime</p>
                      <p className="text-sm text-white">{component.uptime}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Alerts</p>
                      <p className="text-sm text-white">{component.alerts}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Auto-Healing</p>
                      <p className="text-sm text-white">{component.autoHealing ? 'ON' : 'OFF'}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm">
                      Heal
                    </button>
                    <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm">
                      Restart
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {viewMode === 'healing' && (
        <div className="space-y-6">
          {healingActions.map((action, index) => (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedAction(action)}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:scale-105 transition-transform cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">{action.action}</h3>
                    <p className="text-sm text-gray-300">Component: {action.component}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`px-3 py-1 rounded-full text-xs ${getActionStatusColor(action.status)}`}>
                    {action.status}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white">Started {action.startedAt}</p>
                    {action.completedAt && (
                      <p className="text-xs text-gray-400">Completed {action.completedAt}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <p className="text-xs text-gray-400">Automated</p>
                    <p className="text-sm text-white">{action.automated ? 'Yes' : 'No'}</p>
                  </div>
                  {action.result && (
                    <div className="flex-1">
                      <p className="text-xs text-gray-400">Result</p>
                      <p className="text-sm text-white">{action.result}</p>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm">
                    View Details
                  </button>
                  {action.status === 'running' && (
                    <button className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm">
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {viewMode === 'metrics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-white font-bold">{metric.name}</h3>
                  <p className="text-sm text-gray-300">{metric.description}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs ${getMetricStatusColor(metric.status)}`}>
                  {metric.status}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-white">
                    {metric.value}{metric.unit}
                  </span>
                  <div className="flex items-center space-x-1">
                    {metric.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    ) : metric.trend === 'down' ? (
                      <TrendingDown className="w-4 h-4 text-red-400" />
                    ) : (
                      <Activity className="w-4 h-4 text-gray-400" />
                    )}
                    <span className="text-sm text-gray-400 capitalize">{metric.trend}</span>
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Threshold</span>
                  <span className="text-white">{metric.threshold}{metric.unit}</span>
                </div>

                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      metric.status === 'good' ? 'bg-green-400' :
                      metric.status === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
                    }`}
                    style={{ width: `${Math.min(100, (metric.value / metric.threshold) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Component Detail Modal */}
      <AnimatePresence>
        {selectedComponent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50"
            onClick={() => setSelectedComponent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-2xl w-full border border-white/20"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-cyan-600 rounded-lg flex items-center justify-center">
                    {getTypeIcon(selectedComponent.type)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedComponent.name}</h3>
                    <p className="text-gray-300">{selectedComponent.type} • {selectedComponent.location}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedComponent(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-400">Health Score</label>
                    <p className={`text-2xl font-bold ${getHealthColor(selectedComponent.health)}`}>
                      {selectedComponent.health}%
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Status</label>
                    <div className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(selectedComponent.status)}`}>
                      {selectedComponent.status}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Resource Usage</label>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">CPU</span>
                          <span className="text-white">{selectedComponent.cpu}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-blue-400 h-2 rounded-full"
                            style={{ width: `${selectedComponent.cpu}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Memory</span>
                          <span className="text-white">{selectedComponent.memory}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-green-400 h-2 rounded-full"
                            style={{ width: `${selectedComponent.memory}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Disk</span>
                          <span className="text-white">{selectedComponent.disk}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-purple-400 h-2 rounded-full"
                            style={{ width: `${selectedComponent.disk}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Network</span>
                          <span className="text-white">{selectedComponent.network}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-orange-400 h-2 rounded-full"
                            style={{ width: `${selectedComponent.network}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Dependencies</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedComponent.dependencies.map((dep, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-cyan-600/20 text-cyan-300 rounded-full text-sm"
                      >
                        {dep}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2">
                    <Heart className="w-4 h-4" />
                    <span>Heal Component</span>
                  </button>
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2">
                    <RotateCcw className="w-4 h-4" />
                    <span>Restart Component</span>
                  </button>
                  <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2">
                    <Settings className="w-4 h-4" />
                    <span>Configure</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SystemHealthMonitor;
