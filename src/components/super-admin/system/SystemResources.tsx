import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Server,
  Cpu,
  HardDrive,
  MemoryStick,
  Wifi,
  Database,
  Globe,
  Activity,
  CheckCircle,
  AlertTriangle,
  X,
  Clock,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Settings,
  Eye,
  Download,
  Filter,
  Search,
  Zap,
  Users,
  Shield,
} from 'lucide-react';

const SystemResources = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [filterType, setFilterType] = useState('all');

  const resourceStats = [
    {
      name: 'CPU Cores',
      total: 16,
      used: 7.2,
      available: 8.8,
      usage: 45,
      status: 'good',
      icon: Cpu,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      name: 'Memory (RAM)',
      total: 64,
      used: 39.7,
      available: 24.3,
      usage: 62,
      status: 'good',
      icon: MemoryStick,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      name: 'Storage (SSD)',
      total: 2000,
      used: 1560,
      available: 440,
      usage: 78,
      status: 'warning',
      icon: HardDrive,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
    },
    {
      name: 'Network Bandwidth',
      total: 1000,
      used: 280,
      available: 720,
      usage: 28,
      status: 'good',
      icon: Wifi,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
  ];

  const servers = [
    {
      id: 'server-001',
      name: 'Web Server 1',
      type: 'Web',
      status: 'healthy',
      cpu: 45,
      memory: 62,
      disk: 78,
      network: 28,
      uptime: '99.9%',
      lastCheck: '2 minutes ago',
      location: 'US-East',
    },
    {
      id: 'server-002',
      name: 'Database Server',
      type: 'Database',
      status: 'healthy',
      cpu: 38,
      memory: 75,
      disk: 65,
      network: 15,
      uptime: '99.8%',
      lastCheck: '1 minute ago',
      location: 'US-East',
    },
    {
      id: 'server-003',
      name: 'Cache Server',
      type: 'Cache',
      status: 'warning',
      cpu: 78,
      memory: 85,
      disk: 45,
      network: 35,
      uptime: '98.5%',
      lastCheck: '5 minutes ago',
      location: 'US-West',
    },
    {
      id: 'server-004',
      name: 'API Gateway',
      type: 'API',
      status: 'healthy',
      cpu: 25,
      memory: 45,
      disk: 35,
      network: 55,
      uptime: '99.7%',
      lastCheck: '30 seconds ago',
      location: 'EU-Central',
    },
    {
      id: 'server-005',
      name: 'Load Balancer',
      type: 'Load Balancer',
      status: 'healthy',
      cpu: 15,
      memory: 25,
      disk: 20,
      network: 85,
      uptime: '99.9%',
      lastCheck: '1 minute ago',
      location: 'Asia-Pacific',
    },
  ];

  const resourceAlerts = [
    { resource: 'Storage (SSD)', message: 'Disk usage exceeded 75%', time: '2 hours ago', severity: 'warning' },
    { resource: 'Cache Server', message: 'High memory usage detected', time: '4 hours ago', severity: 'warning' },
    { resource: 'Database Server', message: 'CPU usage spike detected', time: '6 hours ago', severity: 'info' },
    { resource: 'Web Server 1', message: 'Network latency increased', time: '8 hours ago', severity: 'info' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200';
      case 'critical': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200';
      case 'good': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
      case 'info': return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-200';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'good': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'critical': return <X className="w-4 h-4" />;
      case 'info': return <Clock className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getUsageColor = (usage: number) => {
    if (usage > 80) return 'bg-red-500';
    if (usage > 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const filteredServers = servers.filter(server => 
    filterType === 'all' || server.type.toLowerCase().includes(filterType.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">System Resources</h1>
          <p className="text-gray-600 dark:text-gray-400">Monitor and manage system resource utilization</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="all">All Types</option>
            <option value="web">Web</option>
            <option value="database">Database</option>
            <option value="cache">Cache</option>
            <option value="api">API</option>
            <option value="load balancer">Load Balancer</option>
          </select>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <RefreshCw className="w-4 h-4 mr-2 inline" />
            Refresh
          </button>
        </div>
      </div>

      {/* Resource Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {resourceStats.map((resource, index) => (
          <motion.div
            key={resource.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${resource.bgColor} dark:bg-gray-700`}>
                  <resource.icon className={`w-5 h-5 ${resource.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{resource.name}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(resource.status)}`}>
                    {getStatusIcon(resource.status)}
                    <span className="ml-1 capitalize">{resource.status}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Used</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {resource.name === 'Storage (SSD)' ? `${resource.used}GB` : 
                   resource.name === 'Network Bandwidth' ? `${resource.used}Mbps` : 
                   resource.name === 'Memory (RAM)' ? `${resource.used}GB` : `${resource.used}`}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Available</span>
                <span className="text-sm text-gray-900 dark:text-white">
                  {resource.name === 'Storage (SSD)' ? `${resource.available}GB` : 
                   resource.name === 'Network Bandwidth' ? `${resource.available}Mbps` : 
                   resource.name === 'Memory (RAM)' ? `${resource.available}GB` : `${resource.available}`}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Total</span>
                <span className="text-sm text-gray-900 dark:text-white">
                  {resource.name === 'Storage (SSD)' ? `${resource.total}GB` : 
                   resource.name === 'Network Bandwidth' ? `${resource.total}Mbps` : 
                   resource.name === 'Memory (RAM)' ? `${resource.total}GB` : `${resource.total}`}
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getUsageColor(resource.usage)}`}
                  style={{ width: `${resource.usage}%` }}
                />
              </div>
              <div className="text-center">
                <span className="text-sm font-medium text-gray-900 dark:text-white">{resource.usage}% Used</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Server Resources */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Server Resources</h3>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search servers..."
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServers.map((server, index) => (
            <motion.div
              key={server.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    <Server className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{server.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{server.type}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{server.location}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(server.status)}`}>
                  {getStatusIcon(server.status)}
                  <span className="ml-1 capitalize">{server.status}</span>
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">CPU</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getUsageColor(server.cpu)}`}
                        style={{ width: `${server.cpu}%` }}
                      />
                    </div>
                    <span className="text-gray-900 dark:text-white">{server.cpu}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Memory</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getUsageColor(server.memory)}`}
                        style={{ width: `${server.memory}%` }}
                      />
                    </div>
                    <span className="text-gray-900 dark:text-white">{server.memory}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Disk</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getUsageColor(server.disk)}`}
                        style={{ width: `${server.disk}%` }}
                      />
                    </div>
                    <span className="text-gray-900 dark:text-white">{server.disk}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Network</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getUsageColor(server.network)}`}
                        style={{ width: `${server.network}%` }}
                      />
                    </div>
                    <span className="text-gray-900 dark:text-white">{server.network}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Uptime</span>
                  <span className="text-gray-900 dark:text-white">{server.uptime}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Last Check</span>
                  <span className="text-gray-900 dark:text-white">{server.lastCheck}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {server.status === 'healthy' ? 'All systems operational' : 'Issues detected'}
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Resource Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Resource Alerts</h3>
        <div className="space-y-3">
          {resourceAlerts.map((alert, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(alert.severity)}`}>
                {getStatusIcon(alert.severity)}
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{alert.resource}</p>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{alert.time}</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">{alert.message}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SystemResources;
