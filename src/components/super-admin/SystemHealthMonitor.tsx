import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Server, 
  Database, 
  Cpu, 
  HardDrive, 
  Network, 
  MemoryStick,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart3,
  Monitor
} from 'lucide-react';

interface SystemMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'healthy' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  change: number;
  threshold: {
    warning: number;
    critical: number;
  };
}

interface ServiceStatus {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'error' | 'maintenance';
  uptime: string;
  lastCheck: string;
  responseTime: number;
  description: string;
}

interface Alert {
  id: string;
  type: 'cpu' | 'memory' | 'disk' | 'network' | 'service';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: string;
  resolved: boolean;
}

const SystemHealthMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<SystemMetric[]>([]);
  const [services, setServices] = useState<ServiceStatus[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  useEffect(() => {
    const fetchSystemHealth = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockMetrics: SystemMetric[] = [
          {
            id: '1',
            name: 'CPU Usage',
            value: 45,
            unit: '%',
            status: 'healthy',
            trend: 'up',
            change: 5.2,
            threshold: { warning: 70, critical: 90 }
          },
          {
            id: '2',
            name: 'Memory Usage',
            value: 67,
            unit: '%',
            status: 'warning',
            trend: 'up',
            change: 8.1,
            threshold: { warning: 75, critical: 90 }
          },
          {
            id: '3',
            name: 'Disk Usage',
            value: 34,
            unit: '%',
            status: 'healthy',
            trend: 'stable',
            change: 1.2,
            threshold: { warning: 80, critical: 95 }
          },
          {
            id: '4',
            name: 'Network I/O',
            value: 23,
            unit: 'Mbps',
            status: 'healthy',
            trend: 'down',
            change: -3.4,
            threshold: { warning: 100, critical: 200 }
          },
          {
            id: '5',
            name: 'Database Connections',
            value: 12,
            unit: 'connections',
            status: 'healthy',
            trend: 'stable',
            change: 0,
            threshold: { warning: 50, critical: 80 }
          },
          {
            id: '6',
            name: 'Response Time',
            value: 145,
            unit: 'ms',
            status: 'healthy',
            trend: 'down',
            change: -12.5,
            threshold: { warning: 500, critical: 1000 }
          }
        ];

        const mockServices: ServiceStatus[] = [
          {
            id: '1',
            name: 'Web Server',
            status: 'running',
            uptime: '15 days, 3 hours',
            lastCheck: '2024-01-15 10:30:00',
            responseTime: 45,
            description: 'Main web application server'
          },
          {
            id: '2',
            name: 'Database Server',
            status: 'running',
            uptime: '15 days, 3 hours',
            lastCheck: '2024-01-15 10:30:00',
            responseTime: 12,
            description: 'Primary database server'
          },
          {
            id: '3',
            name: 'API Gateway',
            status: 'running',
            uptime: '8 days, 12 hours',
            lastCheck: '2024-01-15 10:30:00',
            responseTime: 89,
            description: 'API gateway and load balancer'
          },
          {
            id: '4',
            name: 'Cache Server',
            status: 'running',
            uptime: '15 days, 3 hours',
            lastCheck: '2024-01-15 10:30:00',
            responseTime: 5,
            description: 'Redis cache server'
          },
          {
            id: '5',
            name: 'File Storage',
            status: 'maintenance',
            uptime: '0 days, 0 hours',
            lastCheck: '2024-01-15 10:30:00',
            responseTime: 0,
            description: 'File storage service'
          },
          {
            id: '6',
            name: 'Email Service',
            status: 'error',
            uptime: '0 days, 0 hours',
            lastCheck: '2024-01-15 10:30:00',
            responseTime: 0,
            description: 'SMTP email service'
          }
        ];

        const mockAlerts: Alert[] = [
          {
            id: '1',
            type: 'memory',
            severity: 'medium',
            message: 'Memory usage is above 65%',
            timestamp: '2024-01-15 10:25:00',
            resolved: false
          },
          {
            id: '2',
            type: 'service',
            severity: 'high',
            message: 'Email service is down',
            timestamp: '2024-01-15 09:45:00',
            resolved: false
          },
          {
            id: '3',
            type: 'service',
            severity: 'low',
            message: 'File storage service in maintenance',
            timestamp: '2024-01-15 08:30:00',
            resolved: true
          },
          {
            id: '4',
            type: 'cpu',
            severity: 'low',
            message: 'CPU usage spike detected',
            timestamp: '2024-01-14 23:15:00',
            resolved: true
          }
        ];

        setMetrics(mockMetrics);
        setServices(mockServices);
        setAlerts(mockAlerts);
        setLastUpdate(new Date().toLocaleString());
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching system health:', error);
        setIsLoading(false);
      }
    };

    fetchSystemHealth();
    
    // Set up auto-refresh every 30 seconds
    const interval = setInterval(fetchSystemHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'running':
        return 'text-green-600 bg-green-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      case 'critical':
      case 'error':
        return 'text-red-600 bg-red-100';
      case 'maintenance':
        return 'text-blue-600 bg-blue-100';
      case 'stopped':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'running':
        return <CheckCircle className="w-4 h-4" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4" />;
      case 'critical':
      case 'error':
        return <XCircle className="w-4 h-4" />;
      case 'maintenance':
        return <Clock className="w-4 h-4" />;
      case 'stopped':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-red-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-green-500" />;
      case 'stable':
        return <Minus className="w-4 h-4 text-gray-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getMetricIcon = (name: string) => {
    if (name.includes('CPU')) return <Cpu className="w-5 h-5" />;
    if (name.includes('Memory')) return <MemoryStick className="w-5 h-5" />;
    if (name.includes('Disk')) return <HardDrive className="w-5 h-5" />;
    if (name.includes('Network')) return <Network className="w-5 h-5" />;
    if (name.includes('Database')) return <Database className="w-5 h-5" />;
    if (name.includes('Response')) return <Activity className="w-5 h-5" />;
    return <Monitor className="w-5 h-5" />;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="text-gray-600">Loading system health...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Health Monitor</h1>
          <p className="text-gray-600">Real-time system performance and health monitoring</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500">
            Last updated: {lastUpdate}
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* System Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">System Status</p>
              <p className="text-2xl font-bold text-green-600">Healthy</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-lg border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Services</p>
              <p className="text-2xl font-bold text-blue-600">
                {services.filter(s => s.status === 'running').length}/{services.length}
              </p>
            </div>
            <Server className="w-8 h-8 text-blue-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-lg border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Alerts</p>
              <p className="text-2xl font-bold text-red-600">
                {alerts.filter(a => !a.resolved).length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-lg border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Uptime</p>
              <p className="text-2xl font-bold text-gray-600">99.9%</p>
            </div>
            <Clock className="w-8 h-8 text-gray-600" />
          </div>
        </motion.div>
      </div>

      {/* System Metrics */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">System Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {getMetricIcon(metric.name)}
                  <h3 className="font-medium text-gray-900">{metric.name}</h3>
                </div>
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                  {getStatusIcon(metric.status)}
                  <span className="capitalize">{metric.status}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {metric.value.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-600">{metric.unit}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  {getTrendIcon(metric.trend)}
                  <span className={`text-sm font-medium ${
                    metric.trend === 'up' ? 'text-red-600' : 
                    metric.trend === 'down' ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    {Math.abs(metric.change)}%
                  </span>
                  <span className="text-xs text-gray-500">vs last hour</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      metric.status === 'healthy' ? 'bg-green-500' :
                      metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(metric.value, 100)}%` }}
                  ></div>
                </div>
                
                <div className="text-xs text-gray-500">
                  Warning: {metric.threshold.warning}{metric.unit} | Critical: {metric.threshold.critical}{metric.unit}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Services Status */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Services Status</h2>
        <div className="space-y-4">
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getStatusColor(service.status)}`}>
                    <Server className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{service.name}</h3>
                    <p className="text-sm text-gray-500">{service.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {service.responseTime}ms
                    </div>
                    <div className="text-xs text-gray-500">Response time</div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {service.uptime}
                    </div>
                    <div className="text-xs text-gray-500">Uptime</div>
                  </div>
                  
                  <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(service.status)}`}>
                    {getStatusIcon(service.status)}
                    <span className="capitalize">{service.status}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Active Alerts */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Active Alerts</h2>
        <div className="space-y-4">
          {alerts.filter(alert => !alert.resolved).map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${getSeverityColor(alert.severity)}`}>
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{alert.message}</h3>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                      <span>Type: {alert.type}</span>
                      <span>Time: {alert.timestamp}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                    {alert.severity}
                  </span>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm">
                    Resolve
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          
          {alerts.filter(alert => !alert.resolved).length === 0 && (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Alerts</h3>
              <p className="text-gray-500">All systems are running normally.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemHealthMonitor;