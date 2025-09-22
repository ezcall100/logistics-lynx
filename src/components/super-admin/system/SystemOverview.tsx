import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Server,
  Database,
  Cpu,
  HardDrive,
  Wifi,
  CheckCircle,
  AlertTriangle,
  X,
  Clock,
  LineChart,
  RefreshCw,
  Search,
  Download,
  Plus,
  Edit,
  Trash2,
  Settings,
  Bell,
  TrendingUp,
  TrendingDown,
  Pause,
  RotateCcw,
  BarChart3,
} from 'lucide-react';

const SystemOverview = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddComponent, setShowAddComponent] = useState(false);
  const [, setEditingComponent] = useState<{ id: string; name: string; type: string; status: string } | null>(null);
  const [notifications, setNotifications] = useState<{ id: string; message: string; type: string; timestamp: string }[]>([]);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Enhanced system stats with real-time data
  const [systemStats, setSystemStats] = useState([
    {
      id: 'uptime',
      title: 'System Uptime',
      value: '99.9%',
      change: '+0.1%',
      changeType: 'positive',
      icon: Activity,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      trend: [99.8, 99.9, 99.9, 99.9, 99.9, 99.9, 99.9],
    },
    {
      id: 'cpu',
      title: 'CPU Usage',
      value: '45%',
      change: '-5%',
      changeType: 'positive',
      icon: Cpu,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      trend: [50, 48, 46, 45, 44, 45, 45],
    },
    {
      id: 'memory',
      title: 'Memory Usage',
      value: '62%',
      change: '+2%',
      changeType: 'neutral',
      icon: HardDrive,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      trend: [60, 61, 62, 62, 61, 62, 62],
    },
    {
      id: 'disk',
      title: 'Disk Usage',
      value: '78%',
      change: '+3%',
      changeType: 'negative',
      icon: Database,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      trend: [75, 76, 77, 78, 78, 78, 78],
    },
  ]);

  // Enhanced system components with full CRUD data
  const [systemComponents, setSystemComponents] = useState([
    { 
      id: 'web-1', 
      name: 'Web Server 1', 
      type: 'Web Server',
      status: 'healthy', 
      uptime: '99.9%', 
      responseTime: '120ms', 
      lastCheck: '2 minutes ago',
      cpu: 45,
      memory: 62,
      disk: 78,
      network: 28,
      location: 'US-East',
      version: '2.4.1',
      port: 80,
      ssl: true,
    },
    { 
      id: 'db-1', 
      name: 'Database Server', 
      type: 'Database',
      status: 'healthy', 
      uptime: '99.8%', 
      responseTime: '45ms', 
      lastCheck: '1 minute ago',
      cpu: 38,
      memory: 75,
      disk: 65,
      network: 15,
      location: 'US-East',
      version: '13.4',
      port: 5432,
      ssl: true,
    },
    { 
      id: 'api-1', 
      name: 'API Gateway', 
      type: 'API Gateway',
      status: 'healthy', 
      uptime: '99.7%', 
      responseTime: '85ms', 
      lastCheck: '30 seconds ago',
      cpu: 25,
      memory: 45,
      disk: 35,
      network: 55,
      location: 'US-West',
      version: '3.2.1',
      port: 8080,
      ssl: true,
    },
    { 
      id: 'cache-1', 
      name: 'Cache Server', 
      type: 'Cache',
      status: 'warning', 
      uptime: '98.5%', 
      responseTime: '200ms', 
      lastCheck: '5 minutes ago',
      cpu: 78,
      memory: 85,
      disk: 45,
      network: 35,
      location: 'EU-Central',
      version: '6.2.7',
      port: 6379,
      ssl: false,
    },
    { 
      id: 'lb-1', 
      name: 'Load Balancer', 
      type: 'Load Balancer',
      status: 'healthy', 
      uptime: '99.9%', 
      responseTime: '15ms', 
      lastCheck: '1 minute ago',
      cpu: 15,
      memory: 25,
      disk: 20,
      network: 85,
      location: 'Asia-Pacific',
      version: '2.4.7',
      port: 443,
      ssl: true,
    },
    { 
      id: 'mq-1', 
      name: 'Message Queue', 
      type: 'Message Queue',
      status: 'healthy', 
      uptime: '99.6%', 
      responseTime: '25ms', 
      lastCheck: '2 minutes ago',
      cpu: 20,
      memory: 35,
      disk: 30,
      network: 25,
      location: 'US-Central',
      version: '3.11.2',
      port: 5672,
      ssl: true,
    },
  ]);

  // Enhanced alerts with more details
  const [recentAlerts] = useState([
    { 
      id: 'alert-1',
      component: 'Cache Server', 
      message: 'High memory usage detected', 
      time: '5 minutes ago', 
      severity: 'warning',
      type: 'Performance',
      resolved: false,
      actions: ['Restart Service', 'Scale Up', 'Investigate'],
    },
    { 
      id: 'alert-2',
      component: 'Database Server', 
      message: 'Connection pool near capacity', 
      time: '12 minutes ago', 
      severity: 'info',
      type: 'Capacity',
      resolved: false,
      actions: ['Increase Pool Size', 'Monitor'],
    },
    { 
      id: 'alert-3',
      component: 'Web Server', 
      message: 'Response time increased', 
      time: '18 minutes ago', 
      severity: 'warning',
      type: 'Performance',
      resolved: true,
      actions: ['Resolved'],
    },
    { 
      id: 'alert-4',
      component: 'API Gateway', 
      message: 'Rate limit threshold reached', 
      time: '25 minutes ago', 
      severity: 'info',
      type: 'Rate Limiting',
      resolved: false,
      actions: ['Adjust Limits', 'Monitor'],
    },
    { 
      id: 'alert-5',
      component: 'Load Balancer', 
      message: 'Health check passed', 
      time: '30 minutes ago', 
      severity: 'success',
      type: 'Health Check',
      resolved: true,
      actions: ['Completed'],
    },
  ]);

  // Notification system
  const addNotification = useCallback((message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    const notification = {
      id: Date.now().toString(),
      message,
      type,
      timestamp: new Date().toISOString(),
    };
    setNotifications(prev => [notification, ...prev.slice(0, 4)]);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 5000);
  }, []);

  // Simulate real-time data updates
  const handleRefresh = useCallback(async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update stats with slight variations
    setSystemStats(prev => prev.map(stat => ({
      ...stat,
      value: stat.id === 'cpu' ? `${Math.floor(Math.random() * 20) + 30}%` :
             stat.id === 'memory' ? `${Math.floor(Math.random() * 20) + 50}%` :
             stat.id === 'disk' ? `${Math.floor(Math.random() * 10) + 70}%` : stat.value
    })));
    
    setIsLoading(false);
    addNotification('System data refreshed successfully', 'success');
  }, [addNotification]);

  // Auto-refresh functionality
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        handleRefresh();
      }, 30000); // Refresh every 30 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh, handleRefresh]);

  // CRUD Operations
  const handleAddComponent = (componentData: { name: string; type: string; description: string; location: string; version: string; port: number; ssl: boolean }) => {
    const newComponent = {
      id: `comp-${Date.now()}`,
      name: componentData.name,
      type: componentData.type,
      status: 'healthy',
      uptime: '100%',
      responseTime: '50ms',
      lastCheck: 'Just now',
      cpu: 20,
      memory: 30,
      disk: 25,
      network: 15,
      location: componentData.location,
      version: componentData.version,
      port: componentData.port,
      ssl: componentData.ssl,
    };
    setSystemComponents(prev => [...prev, newComponent]);
    setShowAddComponent(false);
    addNotification('Component added successfully', 'success');
  };

  // const handleEditComponent = (id: string, componentData: any) => {
  //   setSystemComponents(prev => prev.map(comp => 
  //     comp.id === id ? { ...comp, ...componentData } : comp
  //   ));
  //   setEditingComponent(null);
  //   addNotification('Component updated successfully', 'success');
  // };

  const handleDeleteComponent = (id: string) => {
    setSystemComponents(prev => prev.filter(comp => comp.id !== id));
    addNotification('Component deleted successfully', 'success');
  };

  const handleBulkAction = (action: string) => {
    if (action === 'restart') {
      selectedComponents.forEach(id => {
        const component = systemComponents.find(c => c.id === id);
        if (component) {
          addNotification(`${component.name} restarted`, 'success');
        }
      });
    } else if (action === 'stop') {
      selectedComponents.forEach(id => {
        const component = systemComponents.find(c => c.id === id);
        if (component) {
          addNotification(`${component.name} stopped`, 'warning');
        }
      });
    }
    setSelectedComponents([]);
  };

  // Filter and search functionality
  const filteredComponents = systemComponents.filter(component => {
    const matchesSearch = component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         component.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || component.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredAlerts = recentAlerts.filter(alert => 
    alert.component.toLowerCase().includes(searchQuery.toLowerCase()) ||
    alert.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200';
      case 'critical': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200';
      case 'info': return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-200';
      case 'success': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'success': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'critical': return <X className="w-4 h-4" />;
      case 'info': return <Clock className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Notifications */}
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
              notification.type === 'success' ? 'bg-green-500 text-white' :
              notification.type === 'error' ? 'bg-red-500 text-white' :
              notification.type === 'warning' ? 'bg-yellow-500 text-white' :
              'bg-blue-500 text-white'
            }`}
          >
            <div className="flex items-center space-x-2">
              {notification.type === 'success' && <CheckCircle className="w-4 h-4" />}
              {notification.type === 'error' && <X className="w-4 h-4" />}
              {notification.type === 'warning' && <AlertTriangle className="w-4 h-4" />}
              {notification.type === 'info' && <Clock className="w-4 h-4" />}
              <span className="text-sm font-medium">{notification.message}</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">System Health Overview</h1>
          <p className="text-gray-600 dark:text-gray-400">Monitor and manage your system health</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600 dark:text-gray-400">Auto-refresh</label>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                autoRefresh ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  autoRefresh ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
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
          <button 
            onClick={handleRefresh}
            disabled={isLoading}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-4 h-4 mr-2 inline ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Refreshing...' : 'Refresh'}
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4 mr-2 inline" />
            Export
          </button>
        </div>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${stat.bgColor} dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer`}
            onClick={() => {
              // Navigate to detailed view
              addNotification(`Viewing detailed ${stat.title} metrics`, 'info');
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <div className="flex items-center space-x-1">
                  {stat.changeType === 'positive' ? (
                    <TrendingUp className="w-3 h-3 text-green-600" />
                  ) : stat.changeType === 'negative' ? (
                    <TrendingDown className="w-3 h-3 text-red-600" />
                  ) : (
                    <Activity className="w-3 h-3 text-gray-600" />
                  )}
                  <p className={`text-sm ${stat.changeType === 'positive' ? 'text-green-600' : stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'}`}>
                    {stat.change} from last period
                  </p>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor} dark:bg-gray-700`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
            
            {/* Mini trend chart */}
            <div className="h-12 flex items-end space-x-1">
              {stat.trend.map((value, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-t ${
                    stat.id === 'uptime' ? 'bg-green-400' :
                    stat.id === 'cpu' ? 'bg-blue-400' :
                    stat.id === 'memory' ? 'bg-orange-400' :
                    'bg-red-400'
                  }`}
                  style={{ height: `${(value / 100) * 100}%` }}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Search and Filter Controls */}
      <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">All Status</option>
            <option value="healthy">Healthy</option>
            <option value="warning">Warning</option>
            <option value="critical">Critical</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          {selectedComponents.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {selectedComponents.length} selected
              </span>
              <button
                onClick={() => handleBulkAction('restart')}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
              >
                <RotateCcw className="w-3 h-3 mr-1 inline" />
                Restart
              </button>
              <button
                onClick={() => handleBulkAction('stop')}
                className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
              >
                <Pause className="w-3 h-3 mr-1 inline" />
                Stop
              </button>
            </div>
          )}
          <button
            onClick={() => setShowAddComponent(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2 inline" />
            Add Component
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Components */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">System Components</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSelectedComponents(filteredComponents.map(c => c.id))}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Select All
              </button>
              <button
                onClick={() => setSelectedComponents([])}
                className="text-sm text-gray-600 hover:text-gray-700"
              >
                Clear
              </button>
            </div>
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredComponents.map((component) => (
              <div 
                key={component.id} 
                className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                  selectedComponents.includes(component.id) 
                    ? 'bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700' 
                    : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedComponents.includes(component.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedComponents(prev => [...prev, component.id]);
                      } else {
                        setSelectedComponents(prev => prev.filter(id => id !== component.id));
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(component.status)}`}>
                    {getStatusIcon(component.status)}
                    <span className="ml-1 capitalize">{component.status}</span>
                  </span>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">{component.name}</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {component.type} • {component.location} • v{component.version}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{component.responseTime}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{component.lastCheck}</div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => setEditingComponent(component)}
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Edit Component"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteComponent(component.id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete Component"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => addNotification(`${component.name} restarted`, 'success')}
                      className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                      title="Restart Component"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Alerts */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Alerts</h3>
            <div className="flex items-center space-x-2">
              <button className="text-sm text-blue-600 hover:text-blue-700">
                View All
              </button>
              <button className="text-sm text-gray-600 hover:text-gray-700">
                <Bell className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredAlerts.map((alert) => (
              <div key={alert.id} className={`p-3 rounded-lg border transition-all ${
                alert.resolved 
                  ? 'bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700' 
                  : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
              }`}>
                <div className="flex items-start space-x-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(alert.severity)}`}>
                    {getStatusIcon(alert.severity)}
                    <span className="ml-1 capitalize">{alert.severity}</span>
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{alert.component}</p>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{alert.time}</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{alert.message}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">{alert.type}</span>
                      <div className="flex items-center space-x-1">
                        {alert.actions.map((action, i) => (
                          <button
                            key={i}
                            onClick={() => addNotification(`${action} action triggered for ${alert.component}`, 'info')}
                            className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* System Health Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">System Health Metrics</h3>
          <div className="flex items-center space-x-2">
            <button className="text-sm text-blue-600 hover:text-blue-700">
              <BarChart3 className="w-4 h-4 mr-1 inline" />
              Analytics
            </button>
            <button className="text-sm text-gray-600 hover:text-gray-700">
              <Settings className="w-4 h-4 mr-1 inline" />
              Configure
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer">
            <Server className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900 dark:text-white">Server Health</p>
            <p className="text-xs text-green-600 mb-2">Excellent</p>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
            </div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer">
            <Database className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900 dark:text-white">Database Health</p>
            <p className="text-xs text-green-600 mb-2">Good</p>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '88%' }}></div>
            </div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer">
            <Wifi className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900 dark:text-white">Network Health</p>
            <p className="text-xs text-green-600 mb-2">Excellent</p>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Performance Chart with Interactive Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Performance Trends</h3>
          <div className="flex items-center space-x-2">
            <select className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option>CPU Usage</option>
              <option>Memory Usage</option>
              <option>Disk Usage</option>
              <option>Network I/O</option>
            </select>
            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              <Download className="w-3 h-3 mr-1 inline" />
              Export
            </button>
          </div>
        </div>
        <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg relative">
          <div className="text-center">
            <LineChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 dark:text-gray-400 mb-2">Interactive Performance Chart</p>
            <p className="text-xs text-gray-400">Click on metrics above to view detailed trends</p>
          </div>
          {/* Simulated chart overlay */}
          <div className="absolute inset-4 flex items-end space-x-1">
            {[65, 70, 68, 75, 72, 78, 80, 76, 82, 85, 88, 90].map((height, i) => (
              <div
                key={i}
                className="bg-blue-500 rounded-t opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                style={{ height: `${height}%`, width: '8%' }}
                title={`Point ${i + 1}: ${height}%`}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Add Component Modal */}
      <AnimatePresence>
        {showAddComponent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowAddComponent(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add New Component</h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                handleAddComponent({
                  name: formData.get('name') as string || '',
                  type: formData.get('type') as string || '',
                  description: formData.get('description') as string || '',
                  location: formData.get('location') as string || '',
                  version: formData.get('version') as string || '',
                  port: parseInt(formData.get('port') as string || '8080'),
                  ssl: formData.get('ssl') === 'on',
                });
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Component Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Type
                    </label>
                    <select
                      name="type"
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="Web Server">Web Server</option>
                      <option value="Database">Database</option>
                      <option value="API Gateway">API Gateway</option>
                      <option value="Cache">Cache</option>
                      <option value="Load Balancer">Load Balancer</option>
                      <option value="Message Queue">Message Queue</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Version
                      </label>
                      <input
                        type="text"
                        name="version"
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Port
                      </label>
                      <input
                        type="number"
                        name="port"
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="ssl"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Enable SSL
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddComponent(false)}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add Component
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SystemOverview;
