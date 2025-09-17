import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Database,
  Play,
  Pause,
  RefreshCw,
  Download,
  Trash2,
  Plus,
  Edit,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  Table,
  X,
  FileText,
  Archive,
} from 'lucide-react';

interface DatabaseConnection {
  id: string;
  name: string;
  host: string;
  port: number;
  database: string;
  username: string;
  status: 'connected' | 'disconnected' | 'error';
  lastConnected: string;
  queryCount: number;
  responseTime: number;
}

interface DatabaseTable {
  name: string;
  rows: number;
  size: string;
  lastModified: string;
  indexes: number;
  constraints: number;
}

interface DatabaseBackup {
  id: string;
  name: string;
  size: string;
  createdAt: string;
  type: 'full' | 'incremental' | 'differential';
  status: 'completed' | 'in_progress' | 'failed';
  location: string;
}

interface DatabaseQuery {
  id: string;
  query: string;
  executedAt: string;
  duration: number;
  rowsAffected: number;
  status: 'success' | 'error';
  error?: string;
}

const DatabaseManagement: React.FC = () => {
  const [connections, setConnections] = useState<DatabaseConnection[]>([]);
  const [tables, setTables] = useState<DatabaseTable[]>([]);
  const [backups, setBackups] = useState<DatabaseBackup[]>([]);
  const [queries, setQueries] = useState<DatabaseQuery[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('connections');
  const [showCreateConnection, setShowCreateConnection] = useState(false);
  const [selectedConnection, setSelectedConnection] = useState<string>('');
  const [queryText, setQueryText] = useState('');
  const [executingQuery, setExecutingQuery] = useState(false);

  const [newConnection, setNewConnection] = useState<Partial<DatabaseConnection>>({
    name: '',
    host: '',
    port: 5432,
    database: '',
    username: '',
  });

  // Mock data
  const mockConnections: DatabaseConnection[] = [
      {
        id: '1',
      name: 'Primary Database',
      host: 'localhost',
        port: 5432,
      database: 'logistics_lynx',
      username: 'postgres',
      status: 'connected',
      lastConnected: '2024-01-15T10:00:00Z',
      queryCount: 12547,
      responseTime: 12.5,
      },
      {
        id: '2',
      name: 'Analytics Database',
      host: 'analytics-db.company.com',
      port: 5432,
      database: 'analytics',
      username: 'analytics_user',
      status: 'connected',
      lastConnected: '2024-01-15T09:45:00Z',
      queryCount: 8932,
      responseTime: 8.3,
      },
      {
        id: '3',
      name: 'Backup Database',
      host: 'backup-db.company.com',
      port: 5432,
      database: 'backup',
      username: 'backup_user',
      status: 'disconnected',
      lastConnected: '2024-01-14T18:30:00Z',
      queryCount: 0,
      responseTime: 0,
    },
  ];

  const mockTables: DatabaseTable[] = [
    { name: 'users', rows: 1247, size: '2.3 MB', lastModified: '2024-01-15T10:00:00Z', indexes: 3, constraints: 2 },
    { name: 'companies', rows: 156, size: '1.1 MB', lastModified: '2024-01-15T09:45:00Z', indexes: 2, constraints: 1 },
    { name: 'orders', rows: 8932, size: '15.7 MB', lastModified: '2024-01-15T10:15:00Z', indexes: 5, constraints: 3 },
    { name: 'products', rows: 2341, size: '4.2 MB', lastModified: '2024-01-15T08:30:00Z', indexes: 4, constraints: 2 },
    { name: 'transactions', rows: 45678, size: '89.3 MB', lastModified: '2024-01-15T10:20:00Z', indexes: 6, constraints: 4 },
    ];

    const mockBackups: DatabaseBackup[] = [
      {
        id: '1',
      name: 'full_backup_20240115',
      size: '2.3 GB',
      createdAt: '2024-01-15T02:00:00Z',
        type: 'full',
        status: 'completed',
      location: '/backups/full_backup_20240115.sql',
      },
      {
        id: '2',
      name: 'incremental_backup_20240115',
      size: '156 MB',
      createdAt: '2024-01-15T14:00:00Z',
        type: 'incremental',
        status: 'completed',
      location: '/backups/incremental_backup_20240115.sql',
      },
      {
        id: '3',
      name: 'full_backup_20240114',
      size: '2.1 GB',
      createdAt: '2024-01-14T02:00:00Z',
        type: 'full',
      status: 'completed',
      location: '/backups/full_backup_20240114.sql',
    },
  ];

  const mockQueries: DatabaseQuery[] = [
    {
      id: '1',
      query: 'SELECT * FROM users WHERE status = "active"',
      executedAt: '2024-01-15T10:20:00Z',
      duration: 45.2,
      rowsAffected: 892,
      status: 'success',
    },
    {
      id: '2',
      query: 'UPDATE orders SET status = "completed" WHERE id = 12345',
      executedAt: '2024-01-15T10:18:00Z',
      duration: 12.8,
      rowsAffected: 1,
      status: 'success',
    },
    {
      id: '3',
      query: 'SELECT COUNT(*) FROM transactions WHERE date > "2024-01-01"',
      executedAt: '2024-01-15T10:15:00Z',
      duration: 234.5,
      rowsAffected: 1,
      status: 'success',
    },
  ];

  // Fetch data
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setRefreshing(true);
    
    try {
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      setConnections(mockConnections);
      setTables(mockTables);
      setBackups(mockBackups);
    setQueries(mockQueries);
    } catch (error) {
      console.error('Failed to fetch database data:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreateConnection = async () => {
    if (!newConnection.name || !newConnection.host || !newConnection.database) return;

    try {
      const connection: DatabaseConnection = {
        id: Date.now().toString(),
        name: newConnection.name,
        host: newConnection.host,
        port: newConnection.port || 5432,
        database: newConnection.database,
        username: newConnection.username || '',
        status: 'disconnected',
        lastConnected: new Date().toISOString(),
        queryCount: 0,
        responseTime: 0,
      };

      setConnections(prev => [...prev, connection]);
      setShowCreateConnection(false);
      setNewConnection({ name: '', host: '', port: 5432, database: '', username: '' });
    } catch (error) {
      console.error('Failed to create connection:', error);
    }
  };

  const handleTestConnection = async (id: string) => {
    try {
      setConnections(prev => prev.map(conn => 
        conn.id === id 
          ? { 
              ...conn, 
              status: 'connected',
              lastConnected: new Date().toISOString(),
              responseTime: Math.random() * 20 + 5
            }
          : conn
      ));
    } catch (error) {
      console.error('Failed to test connection:', error);
    }
  };

  const handleExecuteQuery = async () => {
    if (!queryText.trim() || !selectedConnection) return;

    setExecutingQuery(true);
    
    try {
      // Simulate query execution
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const query: DatabaseQuery = {
        id: Date.now().toString(),
        query: queryText,
        executedAt: new Date().toISOString(),
        duration: Math.random() * 100 + 10,
        rowsAffected: Math.floor(Math.random() * 1000),
        status: 'success',
      };

      setQueries(prev => [query, ...prev]);
      setQueryText('');
    } catch (error) {
      console.error('Failed to execute query:', error);
    } finally {
      setExecutingQuery(false);
    }
  };


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'disconnected':
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
      case 'error':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      case 'completed':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'in_progress':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      case 'failed':
        return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      case 'success':
        return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return CheckCircle;
      case 'disconnected':
        return Pause;
      case 'error':
        return AlertTriangle;
      case 'completed':
        return CheckCircle;
      case 'in_progress':
        return Clock;
      case 'failed':
        return AlertTriangle;
      case 'success':
        return CheckCircle;
      default:
        return Clock;
    }
  };

  if (isLoading) {
    return (
    <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="animate-pulse responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6 responsive-container sm:flex-col md:flex-row lg:grid"></div>
          <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="p-6 space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
        {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 responsive-container sm:flex-col md:flex-row lg:grid">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
            Database Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">
            Manage database connections, tables, and backups
          </p>
          </div>
        <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
          <button
            onClick={fetchData}
            disabled={refreshing}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 responsive-container sm:flex-col md:flex-row lg:grid"
           aria-label="Button">
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="border-b border-gray-200 dark:border-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">
          <nav className="flex space-x-8 px-6 responsive-container sm:flex-col md:flex-row lg:grid">
            {[
              { id: 'connections', name: 'Connections', icon: Database },
              { id: 'tables', name: 'Tables', icon: Table },
              { id: 'backups', name: 'Backups', icon: Archive },
              { id: 'queries', name: 'Query Editor', icon: FileText },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
              <button
                key={tab.id}
                  onClick={() = aria-label="Button"> setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                  <span>{tab.name}</span>
              </button>
              );
            })}
          </nav>
          </div>

          <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid">
          {/* Connections Tab */}
          {activeTab === 'connections' && (
            <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                  Database Connections
                </h3>
                <button
                  onClick={() = aria-label="Button"> setShowCreateConnection(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  <Plus className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                  <span>Add Connection</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
                {connections.map((connection) => {
                  const StatusIcon = getStatusIcon(connection.status);
                  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
                        <motion.div
                      key={connection.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container sm:flex-col md:flex-row lg:grid"
                        >
                          <div className="flex items-center justify-between mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
                            <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
                            <Database className="h-6 w-6 text-blue-600 responsive-container sm:flex-col md:flex-row lg:grid" />
                            </div>
                            <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                              {connection.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
                              {connection.host}:{connection.port}
                            </p>
                            </div>
                          </div>
                        <div className="flex items-center space-x-1 responsive-container sm:flex-col md:flex-row lg:grid">
                          <button
                            onClick={() = aria-label="Button"> handleTestConnection(connection.id)}
                            className="p-1 text-gray-400 hover:text-blue-600 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                            title="Test Connection"
                          >
                            <Play className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-green-600 transition-colors responsive-container sm:flex-col md:flex-row lg:grid" title="Edit" aria-label="Button">
                            <Edit className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-red-600 transition-colors responsive-container sm:flex-col md:flex-row lg:grid" title="Delete" aria-label="Button">
                            <Trash2 className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                          </button>
                    </div>
                  </div>

                      <div className="space-y-3 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                          <span className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Status</span>
                          <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                            <StatusIcon className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(connection.status)}`}>
                              {connection.status.charAt(0).toUpperCase() + connection.status.slice(1)}
                            </span>
                            </div>
                          </div>

                        <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                          <span className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Database</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                            {connection.database}
                          </span>
                          </div>

                        <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                          <span className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Queries</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                            {connection.queryCount.toLocaleString()}
                          </span>
                          </div>

                        <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                          <span className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Response Time</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                            {connection.responseTime.toFixed(1)}ms
                          </span>
                    </div>
                  </div>
                </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tables Tab */}
          {activeTab === 'tables' && (
            <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                  Database Tables
                </h3>
                <div className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
                  {tables.length} tables
                </div>
                          </div>

              <div className="overflow-x-auto responsive-container sm:flex-col md:flex-row lg:grid">
                <table className="w-full responsive-container sm:flex-col md:flex-row lg:grid">
                  <thead className="bg-gray-50 dark:bg-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                        Table Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                        Rows
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                        Size
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                        Indexes
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                        Constraints
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                        Last Modified
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">
                    {tables.map((table) => (
                      <motion.tr
                        key={table.name}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                      >
                        <td className="px-6 py-4 responsive-container sm:flex-col md:flex-row lg:grid">
                          <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                            <Table className="h-5 w-5 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                            <span className="font-medium text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                              {table.name}
                              </span>
                            </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                          {table.rows.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                          {table.size}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                          {table.indexes}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                          {table.constraints}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                          {new Date(table.lastModified).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-right responsive-container sm:flex-col md:flex-row lg:grid">
                          <div className="flex items-center justify-end space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                            <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors responsive-container sm:flex-col md:flex-row lg:grid" title="View" aria-label="Button">
                              <Eye className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-green-600 transition-colors responsive-container sm:flex-col md:flex-row lg:grid" title="Edit" aria-label="Button">
                              <Edit className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                          </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
                        </div>
                      </div>
          )}

          {/* Backups Tab */}
          {activeTab === 'backups' && (
            <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                  Database Backups
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
                {backups.map((backup) => {
                  const StatusIcon = getStatusIcon(backup.status);
                  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
                <motion.div
                      key={backup.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 responsive-container sm:flex-col md:flex-row lg:grid"
                    >
                      <div className="flex items-center justify-between mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                          <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
                            <Archive className="h-6 w-6 text-purple-600 responsive-container sm:flex-col md:flex-row lg:grid" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                              {backup.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
                              {backup.type.charAt(0).toUpperCase() + backup.type.slice(1)} Backup
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 responsive-container sm:flex-col md:flex-row lg:grid">
                          <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors responsive-container sm:flex-col md:flex-row lg:grid" title="Download" aria-label="Button">
                            <Download className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-red-600 transition-colors responsive-container sm:flex-col md:flex-row lg:grid" title="Delete" aria-label="Button">
                            <Trash2 className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-3 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                          <span className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Status</span>
                        <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                            <StatusIcon className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(backup.status)}`}>
                              {backup.status.charAt(0).toUpperCase() + backup.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      
                        <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                          <span className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Size</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                            {backup.size}
                          </span>
                      </div>
                      
                      <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                          <span className="text-sm text-gray-600 dark:text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Created</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                            {new Date(backup.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Query Editor Tab */}
          {activeTab === 'queries' && (
            <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                  Query Editor
                </h3>
                <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
                  <select
                    value={selectedConnection}
                    onChange={(e) => setSelectedConnection(e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid"
                  >
                    <option value="">Select Connection</option>
                    {connections.map(conn => (
                      <option key={conn.id} value={conn.id}>{conn.name}</option>
                    ))}
                  </select>
                  <button
                    onClick={handleExecuteQuery}
                    disabled={!queryText.trim() || !selectedConnection || executingQuery}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 responsive-container sm:flex-col md:flex-row lg:grid"
                   aria-label="Button">
                    <Play className={`h-4 w-4 ${executingQuery ? 'animate-pulse' : ''}`} />
                    <span>{executingQuery ? 'Executing...' : 'Execute'}</span>
                  </button>
                      </div>
                    </div>
                    
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    SQL Query
                  </label>
                  <textarea
                    value={queryText}
                    onChange={(e) => setQueryText(e.target.value)}
                    className="w-full h-64 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm responsive-container sm:flex-col md:flex-row lg:grid"
                    placeholder="Enter your SQL query here..."
                  />
                  </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    Recent Queries
                  </label>
                  <div className="h-64 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">
                    {queries.map((query) => (
                      <div key={query.id} className="p-3 border-b border-gray-200 dark:border-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">
                          <div className="flex items-center justify-between mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
                          <span className="text-xs text-gray-500 dark:text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
                            {new Date(query.executedAt).toLocaleString()}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(query.status)}`}>
                            {query.status}
                            </span>
                          </div>
                        <div className="text-sm font-mono text-gray-900 dark:text-white mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
                          {query.query}
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
                          <span>Duration: {query.duration.toFixed(1)}ms</span>
                          <span>Rows: {query.rowsAffected}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Connection Modal */}
      <AnimatePresence>
        {showCreateConnection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md mx-4 responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <div className="flex items-center justify-between mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid">
                  Add Database Connection
                </h3>
                <button
                  onClick={() = aria-label="Button"> setShowCreateConnection(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  <X className="h-5 w-5 responsive-container sm:flex-col md:flex-row lg:grid" />
                </button>
              </div>
              
              <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container sm:flex-col md:flex-row lg:grid">
                    Connection Name
                  </label>
                  <input
                    type="text"
                    value={newConnection.name || ''}
                    onChange={(e) => setNewConnection({ ...newConnection, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid"
                    placeholder="Enter connection name"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container sm:flex-col md:flex-row lg:grid">
                      Host
                    </label>
                    <input
                      type="text"
                      value={newConnection.host || ''}
                      onChange={(e) => setNewConnection({ ...newConnection, host: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid"
                      placeholder="localhost"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container sm:flex-col md:flex-row lg:grid">
                      Port
                    </label>
                    <input
                      type="number"
                      value={newConnection.port || 5432}
                      onChange={(e) => setNewConnection({ ...newConnection, port: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid"
                      placeholder="5432"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container sm:flex-col md:flex-row lg:grid">
                    Database Name
                  </label>
                  <input
                    type="text"
                    value={newConnection.database || ''}
                    onChange={(e) => setNewConnection({ ...newConnection, database: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid"
                    placeholder="Enter database name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 responsive-container sm:flex-col md:flex-row lg:grid">
                    Username
                  </label>
                  <input
                    type="text"
                    value={newConnection.username || ''}
                    onChange={(e) => setNewConnection({ ...newConnection, username: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white responsive-container sm:flex-col md:flex-row lg:grid"
                    placeholder="Enter username"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 mt-6 responsive-container sm:flex-col md:flex-row lg:grid">
                <button
                  onClick={() = aria-label="Button"> setShowCreateConnection(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateConnection}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                 aria-label="Button">
                  Create Connection
                </button>
              </div>
            </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
    </div>
  );
};

export default DatabaseManagement;
