import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Database,
  Server,
  Activity,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Search,
  Filter,
  Plus,
  Settings,
  Shield,
  HardDrive,
  Cpu,
  MemoryStick,
  RefreshCw,
  BarChart3,
  Clock,
  Code,
} from 'lucide-react';

/**
 * Database Management - Advanced Database Operations Center
 * Created by MCP 301 Agents with Creative Design Logic
 * Timestamp: 2025-09-14T18:30:00.000Z
 */

interface DatabaseInstance {
  id: string;
  name: string;
  type: 'PostgreSQL' | 'MySQL' | 'MongoDB' | 'Redis' | 'Elasticsearch';
  status: 'online' | 'offline' | 'maintenance' | 'error';
  version: string;
  host: string;
  port: number;
  size: number;
  connections: number;
  maxConnections: number;
  cpuUsage: number;
  memoryUsage: number;
  lastBackup: string;
  uptime: string;
  environment: 'production' | 'staging' | 'development';
  region: string;
  ssl: boolean;
  replication: boolean;
}

interface DatabaseQuery {
  id: string;
  query: string;
  duration: number;
  status: 'success' | 'error' | 'running';
  timestamp: string;
  user: string;
  database: string;
  rowsAffected: number;
  executionPlan?: string;
}

interface DatabaseBackup {
  id: string;
  name: string;
  database: string;
  size: number;
  type: 'full' | 'incremental' | 'differential';
  status: 'completed' | 'running' | 'failed' | 'scheduled';
  createdAt: string;
  expiresAt: string;
  location: string;
  compression: boolean;
  encryption: boolean;
}

interface DatabaseMetric {
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  threshold: number;
  status: 'normal' | 'warning' | 'critical';
}

export const DatabaseManagement: React.FC = () => {
  const [databases, setDatabases] = useState<DatabaseInstance[]>([]);
  const [queries, setQueries] = useState<DatabaseQuery[]>([]);
  const [backups, setBackups] = useState<DatabaseBackup[]>([]);
  const [metrics, setMetrics] = useState<DatabaseMetric[]>([]);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'instances' | 'queries' | 'backups' | 'monitoring'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  // const [selectedDatabase, setSelectedDatabase] = useState<DatabaseInstance | null>(null);
  // const [isQueryRunning, setIsQueryRunning] = useState(false);

  useEffect(() => {
    const mockDatabases: DatabaseInstance[] = [
      {
        id: '1',
        name: 'Primary PostgreSQL',
        type: 'PostgreSQL',
        status: 'online',
        version: '15.4',
        host: 'db-primary.transbotai.com',
        port: 5432,
        size: 125000000000, // 125GB
        connections: 45,
        maxConnections: 100,
        cpuUsage: 23.5,
        memoryUsage: 67.8,
        lastBackup: '2025-09-14T06:00:00Z',
        uptime: '45 days, 12 hours',
        environment: 'production',
        region: 'us-east-1',
        ssl: true,
        replication: true,
      },
      {
        id: '2',
        name: 'Analytics MongoDB',
        type: 'MongoDB',
        status: 'online',
        version: '7.0.2',
        host: 'mongo-analytics.transbotai.com',
        port: 27017,
        size: 89000000000, // 89GB
        connections: 12,
        maxConnections: 50,
        cpuUsage: 15.2,
        memoryUsage: 45.3,
        lastBackup: '2025-09-14T05:30:00Z',
        uptime: '23 days, 8 hours',
        environment: 'production',
        region: 'us-west-2',
        ssl: true,
        replication: false,
      },
      {
        id: '3',
        name: 'Cache Redis',
        type: 'Redis',
        status: 'online',
        version: '7.2.1',
        host: 'redis-cache.transbotai.com',
        port: 6379,
        size: 2100000000, // 2.1GB
        connections: 8,
        maxConnections: 20,
        cpuUsage: 8.7,
        memoryUsage: 34.1,
        lastBackup: '2025-09-14T04:00:00Z',
        uptime: '12 days, 3 hours',
        environment: 'production',
        region: 'us-east-1',
        ssl: false,
        replication: true,
      },
      {
        id: '4',
        name: 'Search Elasticsearch',
        type: 'Elasticsearch',
        status: 'maintenance',
        version: '8.11.0',
        host: 'elasticsearch.transbotai.com',
        port: 9200,
        size: 156000000000, // 156GB
        connections: 0,
        maxConnections: 200,
        cpuUsage: 0,
        memoryUsage: 0,
        lastBackup: '2025-09-13T22:00:00Z',
        uptime: '0 days, 0 hours',
        environment: 'production',
        region: 'eu-west-1',
        ssl: true,
        replication: true,
      },
    ];

    const mockQueries: DatabaseQuery[] = [
      {
        id: '1',
        query: 'SELECT * FROM users WHERE created_at > NOW() - INTERVAL \'7 days\'',
        duration: 245,
        status: 'success',
        timestamp: '2025-09-14T12:30:00Z',
        user: 'admin@transbotai.com',
        database: 'Primary PostgreSQL',
        rowsAffected: 1250,
      },
      {
        id: '2',
        query: 'UPDATE shipments SET status = \'delivered\' WHERE id IN (1,2,3,4,5)',
        duration: 89,
        status: 'success',
        timestamp: '2025-09-14T12:25:00Z',
        user: 'system@transbotai.com',
        database: 'Primary PostgreSQL',
        rowsAffected: 5,
      },
      {
        id: '3',
        query: 'db.analytics.find({"event": "user_login"}).limit(100)',
        duration: 156,
        status: 'running',
        timestamp: '2025-09-14T12:28:00Z',
        user: 'analyst@transbotai.com',
        database: 'Analytics MongoDB',
        rowsAffected: 0,
      },
    ];

    const mockBackups: DatabaseBackup[] = [
      {
        id: '1',
        name: 'postgresql_full_20250914_060000',
        database: 'Primary PostgreSQL',
        size: 125000000000,
        type: 'full',
        status: 'completed',
        createdAt: '2025-09-14T06:00:00Z',
        expiresAt: '2025-10-14T06:00:00Z',
        location: 's3://transbot-backups/db/',
        compression: true,
        encryption: true,
      },
      {
        id: '2',
        name: 'mongodb_incremental_20250914_053000',
        database: 'Analytics MongoDB',
        size: 8900000000,
        type: 'incremental',
        status: 'completed',
        createdAt: '2025-09-14T05:30:00Z',
        expiresAt: '2025-09-21T05:30:00Z',
        location: 's3://transbot-backups/db/',
        compression: true,
        encryption: true,
      },
      {
        id: '3',
        name: 'redis_full_20250914_040000',
        database: 'Cache Redis',
        size: 2100000000,
        type: 'full',
        status: 'running',
        createdAt: '2025-09-14T04:00:00Z',
        expiresAt: '2025-10-14T04:00:00Z',
        location: 's3://transbot-backups/db/',
        compression: false,
        encryption: false,
      },
    ];

    const mockMetrics: DatabaseMetric[] = [
      { name: 'Query Response Time', value: 245, unit: 'ms', trend: 'down', threshold: 500, status: 'normal' },
      { name: 'Connection Pool Usage', value: 45, unit: '%', trend: 'up', threshold: 80, status: 'normal' },
      { name: 'Cache Hit Rate', value: 94.2, unit: '%', trend: 'up', threshold: 90, status: 'normal' },
      { name: 'Disk Usage', value: 78.5, unit: '%', trend: 'up', threshold: 85, status: 'warning' },
      { name: 'Memory Usage', value: 67.8, unit: '%', trend: 'stable', threshold: 90, status: 'normal' },
      { name: 'CPU Usage', value: 23.5, unit: '%', trend: 'down', threshold: 80, status: 'normal' },
    ];

    setDatabases(mockDatabases);
    setQueries(mockQueries);
    setBackups(mockBackups);
    setMetrics(mockMetrics);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'offline':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="w-4 h-4" />;
      case 'offline':
        return <AlertTriangle className="w-4 h-4" />;
      case 'maintenance':
        return <Clock className="w-4 h-4" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getDatabaseIcon = (type: string) => {
    switch (type) {
      case 'PostgreSQL':
        return <Database className="w-5 h-5 text-blue-600" />;
      case 'MySQL':
        return <Database className="w-5 h-5 text-orange-600" />;
      case 'MongoDB':
        return <Database className="w-5 h-5 text-green-600" />;
      case 'Redis':
        return <Database className="w-5 h-5 text-red-600" />;
      case 'Elasticsearch':
        return <Database className="w-5 h-5 text-purple-600" />;
      default:
        return <Database className="w-5 h-5 text-gray-600" />;
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'instances', label: 'Instances', icon: Server },
    { id: 'queries', label: 'Queries', icon: Code },
    { id: 'backups', label: 'Backups', icon: HardDrive },
    { id: 'monitoring', label: 'Monitoring', icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Database Management</h1>
            <p className="text-slate-600 dark:text-slate-400">Advanced database operations and monitoring center</p>
          </div>
          
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search databases..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl"
              />
            </div>
            <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 flex items-center space-x-2">
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Database</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Databases</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{databases.length}</p>
                <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  {databases.filter(db => db.status === 'online').length} online
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Storage</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {formatBytes(databases.reduce((sum, db) => sum + db.size, 0))}
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400 flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +12% this month
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <HardDrive className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Queries</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {queries.filter(q => q.status === 'running').length}
                </p>
                <p className="text-sm text-purple-600 dark:text-purple-400 flex items-center mt-1">
                  <Activity className="w-4 h-4 mr-1" />
                  {queries.length} total today
                </p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <Code className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Backup Status</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {backups.filter(b => b.status === 'completed').length}/{backups.length}
                </p>
                <p className="text-sm text-orange-600 dark:text-orange-400 flex items-center mt-1">
                  <Clock className="w-4 h-4 mr-1" />
                  {backups.filter(b => b.status === 'running').length} running
                </p>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <Shield className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl shadow-xl mb-8">
          <div className="flex border-b border-slate-200 dark:border-slate-700 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`flex-shrink-0 px-6 py-4 text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                  selectedTab === tab.id
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {selectedTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {/* Database Instances Grid */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Database Instances</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {databases.map((db) => (
                        <motion.div
                          key={db.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all duration-200 cursor-pointer"
                          onClick={() => console.log('Database clicked:', db.id)}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              {getDatabaseIcon(db.type)}
                              <div>
                                <h4 className="font-semibold text-slate-900 dark:text-white">{db.name}</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">{db.type} {db.version}</p>
                              </div>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(db.status)}`}>
                              {getStatusIcon(db.status)}
                              <span className="ml-1 capitalize">{db.status}</span>
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-slate-600 dark:text-slate-400">Size</p>
                              <p className="font-medium text-slate-900 dark:text-white">{formatBytes(db.size)}</p>
                            </div>
                            <div>
                              <p className="text-slate-600 dark:text-slate-400">Connections</p>
                              <p className="font-medium text-slate-900 dark:text-white">{db.connections}/{db.maxConnections}</p>
                            </div>
                            <div>
                              <p className="text-slate-600 dark:text-slate-400">CPU Usage</p>
                              <p className="font-medium text-slate-900 dark:text-white">{db.cpuUsage}%</p>
                            </div>
                            <div>
                              <p className="text-slate-600 dark:text-slate-400">Memory</p>
                              <p className="font-medium text-slate-900 dark:text-white">{db.memoryUsage}%</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Performance Metrics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {metrics.map((metric) => (
                        <motion.div
                          key={metric.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-slate-900 dark:text-white">{metric.name}</h4>
                            <div className="flex items-center space-x-1">
                              {metric.trend === 'up' ? (
                                <TrendingUp className="w-4 h-4 text-green-500" />
                              ) : metric.trend === 'down' ? (
                                <TrendingDown className="w-4 h-4 text-red-500" />
                              ) : (
                                <Activity className="w-4 h-4 text-blue-500" />
                              )}
                            </div>
                          </div>
                          <div className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                            {metric.value} {metric.unit}
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                metric.status === 'critical' ? 'bg-red-500' :
                                metric.status === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${Math.min((metric.value / metric.threshold) * 100, 100)}%` }}
                            ></div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedTab === 'instances' && (
                <motion.div
                  key="instances"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {databases.map((db, index) => (
                    <motion.div
                      key={db.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                            {getDatabaseIcon(db.type)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">{db.name}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {db.host}:{db.port} • {db.environment} • {db.region}
                            </p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                                {formatBytes(db.size)}
                              </span>
                              <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                                {db.connections} connections
                              </span>
                              <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                                Uptime: {db.uptime}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(db.status)}`}>
                            {getStatusIcon(db.status)}
                            <span className="ml-1 capitalize">{db.status}</span>
                          </span>
                          <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors">
                            <Settings className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {selectedTab === 'queries' && (
                <motion.div
                  key="queries"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {queries.map((query, index) => (
                    <motion.div
                      key={query.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                            <Code className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">Query #{query.id}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {query.user} • {query.database} • {new Date(query.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            query.status === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                            query.status === 'error' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                          }`}>
                            {query.status === 'success' ? <CheckCircle className="w-4 h-4" /> :
                             query.status === 'error' ? <AlertTriangle className="w-4 h-4" /> :
                             <Clock className="w-4 h-4" />}
                            <span className="ml-1 capitalize">{query.status}</span>
                          </span>
                          <span className="text-sm text-slate-600 dark:text-slate-400">
                            {query.duration}ms
                          </span>
                        </div>
                      </div>
                      
                      <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mb-4">
                        <code className="text-sm text-slate-800 dark:text-slate-200 font-mono">
                          {query.query}
                        </code>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                        <span>Rows affected: {query.rowsAffected}</span>
                        <span>Duration: {query.duration}ms</span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {selectedTab === 'backups' && (
                <motion.div
                  key="backups"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {backups.map((backup, index) => (
                    <motion.div
                      key={backup.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6 hover:bg-slate-100 dark:hover:bg-slate-700/70 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                            <HardDrive className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">{backup.name}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {backup.database} • {backup.type} backup
                            </p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                                {formatBytes(backup.size)}
                              </span>
                              <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                                {backup.compression ? 'Compressed' : 'Uncompressed'}
                              </span>
                              <span className="text-xs bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 px-2 py-1 rounded">
                                {backup.encryption ? 'Encrypted' : 'Unencrypted'}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            backup.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                            backup.status === 'running' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                            backup.status === 'failed' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                            'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                          }`}>
                            {backup.status === 'completed' ? <CheckCircle className="w-4 h-4" /> :
                             backup.status === 'running' ? <Clock className="w-4 h-4" /> :
                             backup.status === 'failed' ? <AlertTriangle className="w-4 h-4" /> :
                             <Clock className="w-4 h-4" />}
                            <span className="ml-1 capitalize">{backup.status}</span>
                          </span>
                          <span className="text-sm text-slate-600 dark:text-slate-400">
                            {new Date(backup.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {selectedTab === 'monitoring' && (
                <motion.div
                  key="monitoring"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {/* Real-time Monitoring Dashboard */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">CPU Usage</h3>
                      <div className="h-64 flex items-center justify-center">
                        <div className="text-center">
                          <Cpu className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                          <p className="text-slate-500 dark:text-slate-400">Real-time CPU monitoring chart</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Memory Usage</h3>
                      <div className="h-64 flex items-center justify-center">
                        <div className="text-center">
                          <MemoryStick className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                          <p className="text-slate-500 dark:text-slate-400">Real-time memory monitoring chart</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Connection Monitoring */}
                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Connection Monitoring</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {databases.map((db) => (
                        <div key={db.id} className="bg-white dark:bg-slate-800 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-slate-900 dark:text-white">{db.name}</h4>
                            <span className="text-sm text-slate-600 dark:text-slate-400">
                              {db.connections}/{db.maxConnections}
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div
                              className="h-2 rounded-full bg-blue-500"
                              style={{ width: `${(db.connections / db.maxConnections) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseManagement;
