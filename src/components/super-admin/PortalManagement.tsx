import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Settings, 
  Users, 
  Shield, 
  Activity, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  MoreVertical,
  CheckCircle,
  AlertTriangle,
  Clock,
  Database,
  Server,
  Lock,
  Unlock
} from 'lucide-react';

interface Portal {
  id: string;
  name: string;
  url: string;
  type: 'admin' | 'user' | 'public' | 'api';
  status: 'active' | 'inactive' | 'maintenance';
  users: number;
  lastActivity: string;
  version: string;
  ssl: boolean;
  description: string;
  created: string;
  updated: string;
}

const PortalManagement: React.FC = () => {
  const [portals, setPortals] = useState<Portal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPortal, setSelectedPortal] = useState<Portal | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    const fetchPortals = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockPortals: Portal[] = [
          {
            id: '1',
            name: 'Super Admin Portal',
            url: 'https://admin.company.com',
            type: 'admin',
            status: 'active',
            users: 25,
            lastActivity: '2024-01-15 10:30',
            version: '2.1.0',
            ssl: true,
            description: 'Main administrative portal for system management',
            created: '2023-06-15',
            updated: '2024-01-10'
          },
          {
            id: '2',
            name: 'User Portal',
            url: 'https://portal.company.com',
            type: 'user',
            status: 'active',
            users: 1247,
            lastActivity: '2024-01-15 10:25',
            version: '1.8.2',
            ssl: true,
            description: 'Customer-facing portal for end users',
            created: '2023-05-20',
            updated: '2024-01-08'
          },
          {
            id: '3',
            name: 'Public Website',
            url: 'https://company.com',
            type: 'public',
            status: 'active',
            users: 0,
            lastActivity: '2024-01-15 10:20',
            version: '3.0.1',
            ssl: true,
            description: 'Public marketing website',
            created: '2023-03-10',
            updated: '2024-01-05'
          },
          {
            id: '4',
            name: 'API Gateway',
            url: 'https://api.company.com',
            type: 'api',
            status: 'active',
            users: 0,
            lastActivity: '2024-01-15 10:15',
            version: '1.5.3',
            ssl: true,
            description: 'REST API gateway for third-party integrations',
            created: '2023-07-01',
            updated: '2024-01-12'
          },
          {
            id: '5',
            name: 'Legacy Portal',
            url: 'https://legacy.company.com',
            type: 'user',
            status: 'maintenance',
            users: 45,
            lastActivity: '2024-01-14 16:30',
            version: '0.9.5',
            ssl: false,
            description: 'Legacy portal scheduled for decommission',
            created: '2022-12-01',
            updated: '2023-11-20'
          }
        ];

        setPortals(mockPortals);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching portals:', error);
        setIsLoading(false);
      }
    };

    fetchPortals();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'inactive': return <AlertTriangle className="w-4 h-4 text-gray-600" />;
      case 'maintenance': return <Clock className="w-4 h-4 text-yellow-600" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'user': return 'bg-blue-100 text-blue-800';
      case 'public': return 'bg-green-100 text-green-800';
      case 'api': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'admin': return <Shield className="w-4 h-4" />;
      case 'user': return <Users className="w-4 h-4" />;
      case 'public': return <Globe className="w-4 h-4" />;
      case 'api': return <Server className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="text-gray-600">Loading portals...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Portal Management</h1>
          <p className="text-gray-600">Manage and monitor all your organization's portals</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Portal</span>
        </button>
      </div>

      {/* Portal Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Portals</p>
              <p className="text-2xl font-bold text-gray-900">{portals.length}</p>
            </div>
            <Globe className="w-8 h-8 text-blue-600" />
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
              <p className="text-sm font-medium text-gray-600">Active Portals</p>
              <p className="text-2xl font-bold text-green-600">
                {portals.filter(p => p.status === 'active').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
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
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">
                {portals.reduce((sum, portal) => sum + portal.users, 0)}
              </p>
            </div>
            <Users className="w-8 h-8 text-purple-600" />
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
              <p className="text-sm font-medium text-gray-600">SSL Enabled</p>
              <p className="text-2xl font-bold text-green-600">
                {portals.filter(p => p.ssl).length}
              </p>
            </div>
            <Lock className="w-8 h-8 text-green-600" />
          </div>
        </motion.div>
      </div>

      {/* Portals Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Portal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Users
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Version
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SSL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {portals.map((portal) => (
                <motion.tr
                  key={portal.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        {getTypeIcon(portal.type)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{portal.name}</div>
                        <div className="text-sm text-gray-500">{portal.url}</div>
                        <div className="text-xs text-gray-400">{portal.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(portal.type)}`}>
                      {portal.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(portal.status)}
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(portal.status)}`}>
                        {portal.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{portal.users.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-900 font-mono text-sm">{portal.version}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1">
                      {portal.ssl ? (
                        <>
                          <Lock className="w-4 h-4 text-green-600" />
                          <span className="text-green-600 text-sm">Enabled</span>
                        </>
                      ) : (
                        <>
                          <Unlock className="w-4 h-4 text-red-600" />
                          <span className="text-red-600 text-sm">Disabled</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1">
                      <Activity className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900 text-sm">{portal.lastActivity}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => setSelectedPortal(portal)}
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-600 transition-colors" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors" title="More">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Portal Details Modal */}
      {selectedPortal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedPortal(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Portal Details</h2>
              <button
                onClick={() => setSelectedPortal(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <p className="text-gray-900">{selectedPortal.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">URL</label>
                  <p className="text-gray-900">{selectedPortal.url}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(selectedPortal.type)}`}>
                    {selectedPortal.type}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedPortal.status)}`}>
                    {selectedPortal.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Version</label>
                  <p className="text-gray-900 font-mono">{selectedPortal.version}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">SSL</label>
                  <p className="text-gray-900">{selectedPortal.ssl ? 'Enabled' : 'Disabled'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Users</label>
                  <p className="text-gray-900">{selectedPortal.users.toLocaleString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Activity</label>
                  <p className="text-gray-900">{selectedPortal.lastActivity}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <p className="text-gray-900">{selectedPortal.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Created</label>
                  <p className="text-gray-900">{selectedPortal.created}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Updated</label>
                  <p className="text-gray-900">{selectedPortal.updated}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setSelectedPortal(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Edit Portal
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default PortalManagement;