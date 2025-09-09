import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Download,
  Upload,
  CheckCircle,
  BarChart3,
  Users,
  X,
  Save,
  MoreVertical,
  Play,
  Pause,
} from 'lucide-react';

import { Button } from '../../design-system/components/Button';
import { Card, CardContent } from '../../design-system/components/Card';
import { Input } from '../../design-system/components/Input';
import { cn, formatNumber, formatRelativeTime } from '../../lib/utils';

interface Portal {
  id: number;
  name: string;
  description: string;
  companyId: number;
  companyName: string;
  enabled: boolean;
  features: string[];
  settings: {
    theme: string;
    notifications: boolean;
    autoMatch: boolean;
    gpsEnabled: boolean;
    maintenanceAlerts: boolean;
    customBranding: boolean;
    ssoEnabled: boolean;
    auditLogs: boolean;
  };
  usage: {
    activeUsers: number;
    apiCalls: number;
    storageUsed: number;
    lastActivity: string;
  };
  subscription: {
    plan: string;
    status: string;
    expiresAt: string;
    features: string[];
  };
  performance: {
    uptime: number;
    responseTime: number;
    errorRate: number;
    throughput: number;
  };
}

interface PortalFormData {
  name: string;
  description: string;
  companyId: number;
  enabled: boolean;
  features: string[];
  settings: {
    theme: string;
    notifications: boolean;
    autoMatch: boolean;
    gpsEnabled: boolean;
    maintenanceAlerts: boolean;
    customBranding: boolean;
    ssoEnabled: boolean;
    auditLogs: boolean;
  };
}

const PortalManagement: React.FC = () => {
  const [portals, setPortals] = useState<Portal[]>([]);
  const [filteredPortals, setFilteredPortals] = useState<Portal[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [companyFilter, setCompanyFilter] = useState<string>('all');
  const [showPortalModal, setShowPortalModal] = useState(false);
  const [editingPortal, setEditingPortal] = useState<Portal | null>(null);
  const [formData, setFormData] = useState<PortalFormData>({
    name: '',
    description: '',
    companyId: 1,
    enabled: true,
    features: [],
    settings: {
      theme: 'light',
      notifications: true,
      autoMatch: false,
      gpsEnabled: false,
      maintenanceAlerts: false,
      customBranding: false,
      ssoEnabled: false,
      auditLogs: false
    }
  });
  const [loading, setLoading] = useState(false);
  const [bulkSelected, setBulkSelected] = useState<number[]>([]);

  const companies = [
    { id: 1, name: 'Global Logistics Corp' },
    { id: 2, name: 'Swift Transport Ltd' },
    { id: 3, name: 'Metro Freight Inc' },
    { id: 4, name: 'Coastal Shipping Co' }
  ];

  const availableFeatures = [
    'load_management',
    'fleet_tracking',
    'analytics',
    'load_posting',
    'carrier_matching',
    'vehicle_tracking',
    'maintenance',
    'driver_app',
    'api_access',
    'custom_reports',
    'real_time_tracking',
    'document_management'
  ];


  // Mock data initialization
  useEffect(() => {
    const mockPortals: Portal[] = [
      {
        id: 1,
        name: 'TMS Core',
        description: 'Transportation Management System',
        companyId: 1,
        companyName: 'Global Logistics Corp',
        enabled: true,
        features: ['load_management', 'fleet_tracking', 'analytics'],
        settings: {
          theme: 'dark',
          notifications: true,
          autoMatch: true,
          gpsEnabled: true,
          maintenanceAlerts: true,
          customBranding: true,
          ssoEnabled: true,
          auditLogs: true
        },
        usage: {
          activeUsers: 1250,
          apiCalls: 45000,
          storageUsed: 2.5,
          lastActivity: '2024-01-15T10:30:00Z'
        },
        subscription: {
          plan: 'Enterprise',
          status: 'Active',
          expiresAt: '2024-12-15T00:00:00Z',
          features: ['unlimited_users', 'advanced_analytics', 'api_access']
        },
        performance: {
          uptime: 99.9,
          responseTime: 120,
          errorRate: 0.1,
          throughput: 1500
        }
      },
      {
        id: 2,
        name: 'Load Board',
        description: 'Load posting and carrier matching',
        companyId: 1,
        companyName: 'Global Logistics Corp',
        enabled: true,
        features: ['load_posting', 'carrier_matching'],
        settings: {
          theme: 'light',
          notifications: true,
          autoMatch: true,
          gpsEnabled: false,
          maintenanceAlerts: false,
          customBranding: true,
          ssoEnabled: false,
          auditLogs: true
        },
        usage: {
          activeUsers: 890,
          apiCalls: 25000,
          storageUsed: 1.2,
          lastActivity: '2024-01-15T09:15:00Z'
        },
        subscription: {
          plan: 'Professional',
          status: 'Active',
          expiresAt: '2024-12-15T00:00:00Z',
          features: ['load_posting', 'carrier_matching']
        },
        performance: {
          uptime: 99.8,
          responseTime: 95,
          errorRate: 0.2,
          throughput: 800
        }
      },
      {
        id: 3,
        name: 'Fleet Management',
        description: 'Vehicle and driver management',
        companyId: 1,
        companyName: 'Global Logistics Corp',
        enabled: true,
        features: ['vehicle_tracking', 'maintenance', 'driver_app'],
        settings: {
          theme: 'dark',
          notifications: true,
          autoMatch: false,
          gpsEnabled: true,
          maintenanceAlerts: true,
          customBranding: true,
          ssoEnabled: true,
          auditLogs: true
        },
        usage: {
          activeUsers: 456,
          apiCalls: 18000,
          storageUsed: 3.1,
          lastActivity: '2024-01-15T08:45:00Z'
        },
        subscription: {
          plan: 'Enterprise',
          status: 'Active',
          expiresAt: '2024-12-15T00:00:00Z',
          features: ['vehicle_tracking', 'maintenance', 'driver_app']
        },
        performance: {
          uptime: 99.7,
          responseTime: 150,
          errorRate: 0.3,
          throughput: 600
        }
      },
      {
        id: 4,
        name: 'TMS Core',
        description: 'Transportation Management System',
        companyId: 2,
        companyName: 'Swift Transport Ltd',
        enabled: true,
        features: ['load_management', 'basic_analytics'],
        settings: {
          theme: 'light',
          notifications: true,
          autoMatch: false,
          gpsEnabled: false,
          maintenanceAlerts: false,
          customBranding: false,
          ssoEnabled: false,
          auditLogs: false
        },
        usage: {
          activeUsers: 890,
          apiCalls: 22000,
          storageUsed: 1.8,
          lastActivity: '2024-01-15T09:15:00Z'
        },
        subscription: {
          plan: 'Professional',
          status: 'Active',
          expiresAt: '2024-02-15T00:00:00Z',
          features: ['load_management', 'basic_analytics']
        },
        performance: {
          uptime: 99.5,
          responseTime: 180,
          errorRate: 0.5,
          throughput: 400
        }
      }
    ];

    setPortals(mockPortals);
    setFilteredPortals(mockPortals);
  }, []);

  // Filter and search portals
  useEffect(() => {
    let filtered = portals;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(portal =>
        portal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        portal.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        portal.companyName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(portal => 
        statusFilter === 'enabled' ? portal.enabled : !portal.enabled
      );
    }

    // Company filter
    if (companyFilter !== 'all') {
      filtered = filtered.filter(portal => portal.companyId === parseInt(companyFilter));
    }

    // Sort by name
    filtered.sort((a, b) => {
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });

    setFilteredPortals(filtered);
  }, [portals, searchQuery, statusFilter, companyFilter]);

  const handleCreatePortal = async () => {
    setLoading(true);
    try {
      const newPortal: Portal = {
        id: Math.max(...portals.map(p => p.id)) + 1,
        name: formData.name,
        description: formData.description,
        companyId: formData.companyId,
        companyName: companies.find(c => c.id === formData.companyId)?.name || '',
        enabled: formData.enabled,
        features: formData.features,
        settings: formData.settings,
        usage: {
          activeUsers: 0,
          apiCalls: 0,
          storageUsed: 0,
          lastActivity: new Date().toISOString()
        },
        subscription: {
          plan: 'Basic',
          status: 'Active',
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          features: formData.features
        },
        performance: {
          uptime: 100,
          responseTime: 0,
          errorRate: 0,
          throughput: 0
        }
      };

      setPortals(prev => [...prev, newPortal]);
      setShowPortalModal(false);
      resetForm();
    } catch (error) {
      console.error('Error creating portal:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePortal = async () => {
    if (!editingPortal) return;

    setLoading(true);
    try {
      const updatedPortal: Portal = {
        ...editingPortal,
        name: formData.name,
        description: formData.description,
        companyId: formData.companyId,
        companyName: companies.find(c => c.id === formData.companyId)?.name || '',
        enabled: formData.enabled,
        features: formData.features,
        settings: formData.settings
      };

      setPortals(prev => prev.map(p => p.id === editingPortal.id ? updatedPortal : p));
      setEditingPortal(null);
      setShowPortalModal(false);
      resetForm();
    } catch (error) {
      console.error('Error updating portal:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePortal = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this portal?')) {
      setPortals(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleTogglePortal = async (id: number) => {
    setPortals(prev => prev.map(p => 
      p.id === id ? { ...p, enabled: !p.enabled } : p
    ));
  };

  const handleBulkAction = (action: string) => {
    switch (action) {
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${bulkSelected.length} portals?`)) {
          setPortals(prev => prev.filter(p => !bulkSelected.includes(p.id)));
          setBulkSelected([]);
        }
        break;
      case 'enable':
        setPortals(prev => prev.map(p => 
          bulkSelected.includes(p.id) ? { ...p, enabled: true } : p
        ));
        setBulkSelected([]);
        break;
      case 'disable':
        setPortals(prev => prev.map(p => 
          bulkSelected.includes(p.id) ? { ...p, enabled: false } : p
        ));
        setBulkSelected([]);
        break;
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      companyId: 1,
      enabled: true,
      features: [],
      settings: {
        theme: 'light',
        notifications: true,
        autoMatch: false,
        gpsEnabled: false,
        maintenanceAlerts: false,
        customBranding: false,
        ssoEnabled: false,
        auditLogs: false
      }
    });
  };

  const openEditModal = (portal: Portal) => {
    setEditingPortal(portal);
    setFormData({
      name: portal.name,
      description: portal.description,
      companyId: portal.companyId,
      enabled: portal.enabled,
      features: portal.features,
      settings: portal.settings
    });
    setShowPortalModal(true);
  };

  const PortalModal = () => (
    <AnimatePresence>
      {showPortalModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingPortal ? 'Edit Portal' : 'Add New Portal'}
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setShowPortalModal(false);
                    setEditingPortal(null);
                    resetForm();
                  }}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Portal Name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter portal name"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <select
                    value={formData.companyId}
                    onChange={(e) => setFormData(prev => ({ ...prev, companyId: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {companies.map(company => (
                      <option key={company.id} value={company.id}>{company.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <Input
                  label="Description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter portal description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                <div className="grid grid-cols-2 gap-2">
                  {availableFeatures.map(feature => (
                    <label key={feature} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.features.includes(feature)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData(prev => ({
                              ...prev,
                              features: [...prev.features, feature]
                            }));
                          } else {
                            setFormData(prev => ({
                              ...prev,
                              features: prev.features.filter(f => f !== feature)
                            }));
                          }
                        }}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700 capitalize">
                        {feature.replace('_', ' ')}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-medium text-gray-900">Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                    <select
                      value={formData.settings.theme}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        settings: { ...prev.settings, theme: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    {[
                      { key: 'notifications', label: 'Notifications' },
                      { key: 'autoMatch', label: 'Auto Match' },
                      { key: 'gpsEnabled', label: 'GPS Enabled' },
                      { key: 'maintenanceAlerts', label: 'Maintenance Alerts' },
                      { key: 'customBranding', label: 'Custom Branding' },
                      { key: 'ssoEnabled', label: 'SSO Enabled' },
                      { key: 'auditLogs', label: 'Audit Logs' }
                    ].map((setting) => (
                      <label key={setting.key} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.settings[setting.key as keyof typeof formData.settings] as boolean}
                          onChange={(e) => setFormData(prev => ({ 
                            ...prev, 
                            settings: { 
                              ...prev.settings, 
                              [setting.key]: e.target.checked 
                            }
                          }))}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700">{setting.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.enabled}
                  onChange={(e) => setFormData(prev => ({ ...prev, enabled: e.target.checked }))}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">Enable Portal</span>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowPortalModal(false);
                  setEditingPortal(null);
                  resetForm();
                }}
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={editingPortal ? handleUpdatePortal : handleCreatePortal}
                loading={loading}
              >
                <Save className="w-4 h-4 mr-2" />
                {editingPortal ? 'Update Portal' : 'Create Portal'}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Portal Management</h2>
          <p className="text-gray-600">Configure and manage portal access across companies</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button onClick={() => setShowPortalModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Portal
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Total Portals', count: formatNumber(portals.length), icon: Globe, color: 'text-blue-500' },
          { title: 'Active Portals', count: formatNumber(portals.filter(p => p.enabled).length), icon: CheckCircle, color: 'text-green-500' },
          { title: 'Total Users', count: formatNumber(portals.reduce((sum, p) => sum + p.usage.activeUsers, 0)), icon: Users, color: 'text-purple-500' },
          { title: 'Avg Uptime', count: `${(portals.reduce((sum, p) => sum + p.performance.uptime, 0) / portals.length).toFixed(1)}%`, icon: BarChart3, color: 'text-orange-500' }
        ].map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-xl bg-gray-50`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stat.count}</div>
                  <div className="text-gray-600 text-sm">{stat.title}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search portals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="w-4 h-4" />}
              />
            </div>
            <div className="flex gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="enabled">Enabled</option>
                <option value="disabled">Disabled</option>
              </select>
              <select
                value={companyFilter}
                onChange={(e) => setCompanyFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Companies</option>
                {companies.map(company => (
                  <option key={company.id} value={company.id}>{company.name}</option>
                ))}
              </select>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {bulkSelected.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {bulkSelected.length} portals selected
              </span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('enable')}>
                  <Play className="w-4 h-4 mr-2" />
                  Enable
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('disable')}>
                  <Pause className="w-4 h-4 mr-2" />
                  Disable
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleBulkAction('delete')}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Portals Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={bulkSelected.length === filteredPortals.length && filteredPortals.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setBulkSelected(filteredPortals.map(p => p.id));
                        } else {
                          setBulkSelected([]);
                        }
                      }}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Portal
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Users
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Activity
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPortals.map((portal) => (
                  <tr key={portal.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={bulkSelected.includes(portal.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setBulkSelected(prev => [...prev, portal.id]);
                          } else {
                            setBulkSelected(prev => prev.filter(id => id !== portal.id));
                          }
                        }}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-600 flex items-center justify-center">
                          <Globe className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{portal.name}</div>
                          <div className="text-sm text-gray-500">{portal.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {portal.companyName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleTogglePortal(portal.id)}
                          className={cn(
                            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                            portal.enabled ? 'bg-primary-600' : 'bg-gray-200'
                          )}
                        >
                          <span
                            className={cn(
                              'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                              portal.enabled ? 'translate-x-6' : 'translate-x-1'
                            )}
                          />
                        </button>
                        <span className={cn(
                          'text-xs font-medium',
                          portal.enabled ? 'text-green-600' : 'text-gray-500'
                        )}>
                          {portal.enabled ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatNumber(portal.usage.activeUsers)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <div className="text-gray-900">{portal.performance.uptime}% uptime</div>
                        <div className="text-gray-500">{portal.performance.responseTime}ms avg</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatRelativeTime(portal.usage.lastActivity)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => openEditModal(portal)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeletePortal(portal.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <PortalModal />
    </div>
  );
};

export default PortalManagement;
