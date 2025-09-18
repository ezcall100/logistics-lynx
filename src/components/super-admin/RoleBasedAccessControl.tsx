import React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Users,
  Key,
  Globe,
  Plus,
  Edit,
  Trash2,
  UserPlus,
  Save,
  RefreshCw,
} from 'lucide-react';

interface UserRole {
  id: string;
  name: string;
  description: string;
  level: number; // 1-10, higher = more access
  permissions: Permission[];
  portalAccess: PortalAccess[];
  domainAccess: DomainAccess[];
  userCount: number;
  status: 'active' | 'inactive' | 'archived';
  createdAt: string;
  updatedAt: string;
}

interface Permission {
  id: string;
  name: string;
  description: string;
  category: 'portal' | 'system' | 'domain' | 'user';
  level: 'read' | 'write' | 'admin' | 'owner';
}

interface PortalAccess {
  portalId: string;
  portalName: string;
  accessLevel: 'read' | 'write' | 'admin' | 'owner';
  features: string[];
  restrictions?: string[];
}

interface DomainAccess {
  domainType: 'subdomain' | 'custom';
  domainPattern: string;
  allowedPortals: string[];
  customBranding: boolean;
  sslRequired: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: string;
  domain: string;
  portalAccess: string[];
}

export function RoleBasedAccessControl() {
  const [activeTab, setActiveTab] = useState<'roles' | 'users' | 'permissions' | 'domains'>(
    'roles'
  );
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Mock data
  const [roles] = useState<UserRole[]>([
    {
      id: 'super-admin',
      name: 'Super Administrator',
      description: 'Complete system access with all permissions',
      level: 10,
      permissions: [
        {
          id: 'all',
          name: 'All Permissions',
          description: 'Access to all system features',
          category: 'system',
          level: 'owner',
        },
      ],
      portalAccess: [
        { portalId: '*', portalName: 'All Portals', accessLevel: 'owner', features: ['*'] },
      ],
      domainAccess: [
        {
          domainType: 'subdomain',
          domainPattern: '*.transbot.ai',
          allowedPortals: ['*'],
          customBranding: true,
          sslRequired: true,
        },
        {
          domainType: 'custom',
          domainPattern: '*',
          allowedPortals: ['*'],
          customBranding: true,
          sslRequired: true,
        },
      ],
      userCount: 5,
      status: 'active',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T10:30:00Z',
    },
    {
      id: 'enterprise-admin',
      name: 'Enterprise Administrator',
      description: 'Enterprise-level administration with multi-portal access',
      level: 9,
      permissions: [
        {
          id: 'user_management',
          name: 'User Management',
          description: 'Manage users and roles',
          category: 'user',
          level: 'admin',
        },
        {
          id: 'portal_management',
          name: 'Portal Management',
          description: 'Configure portal settings',
          category: 'portal',
          level: 'admin',
        },
        {
          id: 'billing_management',
          name: 'Billing Management',
          description: 'Manage billing and subscriptions',
          category: 'system',
          level: 'admin',
        },
      ],
      portalAccess: [
        {
          portalId: 'admin',
          portalName: 'Admin Portal',
          accessLevel: 'admin',
          features: ['user_management', 'system_config'],
        },
        {
          portalId: 'analytics',
          portalName: 'Analytics Portal',
          accessLevel: 'admin',
          features: ['advanced_analytics', 'reporting'],
        },
        {
          portalId: 'financials',
          portalName: 'Financials Portal',
          accessLevel: 'admin',
          features: ['billing', 'invoicing'],
        },
      ],
      domainAccess: [
        {
          domainType: 'subdomain',
          domainPattern: '*.transbot.ai',
          allowedPortals: ['admin', 'analytics', 'financials'],
          customBranding: true,
          sslRequired: true,
        },
      ],
      userCount: 12,
      status: 'active',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T09:15:00Z',
    },
    {
      id: 'broker-manager',
      name: 'Broker Manager',
      description: 'Brokerage management with load and carrier oversight',
      level: 7,
      permissions: [
        {
          id: 'load_management',
          name: 'Load Management',
          description: 'Manage loads and shipments',
          category: 'portal',
          level: 'admin',
        },
        {
          id: 'carrier_management',
          name: 'Carrier Management',
          description: 'Manage carrier relationships',
          category: 'portal',
          level: 'write',
        },
        {
          id: 'rate_management',
          name: 'Rate Management',
          description: 'Set and manage rates',
          category: 'portal',
          level: 'write',
        },
      ],
      portalAccess: [
        {
          portalId: 'broker',
          portalName: 'Broker Portal',
          accessLevel: 'admin',
          features: ['load_management', 'carrier_matching', 'rate_optimization'],
        },
        {
          portalId: 'analytics',
          portalName: 'Analytics Portal',
          accessLevel: 'write',
          features: ['broker_analytics', 'performance_reports'],
        },
        {
          portalId: 'marketplace',
          portalName: 'Marketplace Portal',
          accessLevel: 'write',
          features: ['load_posting', 'bidding'],
        },
      ],
      domainAccess: [
        {
          domainType: 'subdomain',
          domainPattern: 'broker-*.transbot.ai',
          allowedPortals: ['broker', 'analytics', 'marketplace'],
          customBranding: true,
          sslRequired: true,
        },
        {
          domainType: 'custom',
          domainPattern: '*.logistics',
          allowedPortals: ['broker'],
          customBranding: true,
          sslRequired: true,
        },
      ],
      userCount: 45,
      status: 'active',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T08:45:00Z',
    },
    {
      id: 'carrier-manager',
      name: 'Carrier Manager',
      description: 'Fleet management with driver and route oversight',
      level: 7,
      permissions: [
        {
          id: 'fleet_management',
          name: 'Fleet Management',
          description: 'Manage fleet operations',
          category: 'portal',
          level: 'admin',
        },
        {
          id: 'driver_management',
          name: 'Driver Management',
          description: 'Manage drivers and schedules',
          category: 'portal',
          level: 'write',
        },
        {
          id: 'route_optimization',
          name: 'Route Optimization',
          description: 'Optimize routes and schedules',
          category: 'portal',
          level: 'write',
        },
      ],
      portalAccess: [
        {
          portalId: 'carrier',
          portalName: 'Carrier Portal',
          accessLevel: 'admin',
          features: ['fleet_management', 'driver_dispatch', 'route_planning'],
        },
        {
          portalId: 'driver',
          portalName: 'Driver Portal',
          accessLevel: 'write',
          features: ['driver_management'],
        },
        {
          portalId: 'analytics',
          portalName: 'Analytics Portal',
          accessLevel: 'write',
          features: ['fleet_analytics', 'performance_tracking'],
        },
      ],
      domainAccess: [
        {
          domainType: 'subdomain',
          domainPattern: 'carrier-*.transbot.ai',
          allowedPortals: ['carrier', 'driver', 'analytics'],
          customBranding: true,
          sslRequired: true,
        },
        {
          domainType: 'custom',
          domainPattern: '*.fleet',
          allowedPortals: ['carrier'],
          customBranding: true,
          sslRequired: true,
        },
      ],
      userCount: 38,
      status: 'active',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T07:30:00Z',
    },
    {
      id: 'driver',
      name: 'Driver',
      description: 'Mobile driver with load and route access',
      level: 3,
      permissions: [
        {
          id: 'load_viewing',
          name: 'Load Viewing',
          description: 'View assigned loads',
          category: 'portal',
          level: 'read',
        },
        {
          id: 'route_navigation',
          name: 'Route Navigation',
          description: 'Access route information',
          category: 'portal',
          level: 'read',
        },
        {
          id: 'document_upload',
          name: 'Document Upload',
          description: 'Upload delivery documents',
          category: 'portal',
          level: 'write',
        },
      ],
      portalAccess: [
        {
          portalId: 'driver',
          portalName: 'Driver Portal',
          accessLevel: 'write',
          features: ['load_details', 'route_maps', 'documentation'],
        },
      ],
      domainAccess: [
        {
          domainType: 'subdomain',
          domainPattern: 'driver-*.transbot.ai',
          allowedPortals: ['driver'],
          customBranding: false,
          sslRequired: true,
        },
      ],
      userCount: 1250,
      status: 'active',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T06:15:00Z',
    },
    {
      id: 'shipper-user',
      name: 'Shipper User',
      description: 'Shipper with booking and tracking access',
      level: 4,
      permissions: [
        {
          id: 'shipment_booking',
          name: 'Shipment Booking',
          description: 'Book shipments',
          category: 'portal',
          level: 'write',
        },
        {
          id: 'tracking',
          name: 'Tracking',
          description: 'Track shipments',
          category: 'portal',
          level: 'read',
        },
        {
          id: 'documentation',
          name: 'Documentation',
          description: 'Manage shipping documents',
          category: 'portal',
          level: 'write',
        },
      ],
      portalAccess: [
        {
          portalId: 'shipper',
          portalName: 'Shipper Portal',
          accessLevel: 'write',
          features: ['shipment_booking', 'carrier_search', 'tracking'],
        },
      ],
      domainAccess: [
        {
          domainType: 'subdomain',
          domainPattern: 'shipper-*.transbot.ai',
          allowedPortals: ['shipper'],
          customBranding: false,
          sslRequired: true,
        },
      ],
      userCount: 890,
      status: 'active',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T05:30:00Z',
    },
  ]);

  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@acmelogistics.com',
      role: 'broker-manager',
      status: 'active',
      lastLogin: '2024-01-15T10:30:00Z',
      domain: 'acme.transbot.ai',
      portalAccess: ['broker', 'analytics', 'marketplace'],
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@fleetmasters.com',
      role: 'carrier-manager',
      status: 'active',
      lastLogin: '2024-01-15T09:15:00Z',
      domain: 'fleetmasters.com',
      portalAccess: ['carrier', 'driver', 'analytics'],
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike.wilson@driverapp.com',
      role: 'driver',
      status: 'active',
      lastLogin: '2024-01-15T08:45:00Z',
      domain: 'driver-123.transbot.ai',
      portalAccess: ['driver'],
    },
  ]);

  const [permissions] = useState<Permission[]>([
    // System Permissions
    {
      id: 'system_admin',
      name: 'System Administration',
      description: 'Full system access',
      category: 'system',
      level: 'owner',
    },
    {
      id: 'user_management',
      name: 'User Management',
      description: 'Manage users and roles',
      category: 'user',
      level: 'admin',
    },
    {
      id: 'billing_management',
      name: 'Billing Management',
      description: 'Manage billing and subscriptions',
      category: 'system',
      level: 'admin',
    },

    // Portal Permissions
    {
      id: 'load_management',
      name: 'Load Management',
      description: 'Manage loads and shipments',
      category: 'portal',
      level: 'admin',
    },
    {
      id: 'carrier_management',
      name: 'Carrier Management',
      description: 'Manage carrier relationships',
      category: 'portal',
      level: 'write',
    },
    {
      id: 'fleet_management',
      name: 'Fleet Management',
      description: 'Manage fleet operations',
      category: 'portal',
      level: 'admin',
    },
    {
      id: 'driver_management',
      name: 'Driver Management',
      description: 'Manage drivers and schedules',
      category: 'portal',
      level: 'write',
    },
    {
      id: 'shipment_booking',
      name: 'Shipment Booking',
      description: 'Book shipments',
      category: 'portal',
      level: 'write',
    },
    {
      id: 'tracking',
      name: 'Tracking',
      description: 'Track shipments',
      category: 'portal',
      level: 'read',
    },

    // Domain Permissions
    {
      id: 'domain_management',
      name: 'Domain Management',
      description: 'Manage custom domains',
      category: 'domain',
      level: 'admin',
    },
    {
      id: 'ssl_management',
      name: 'SSL Management',
      description: 'Manage SSL certificates',
      category: 'domain',
      level: 'admin',
    },
    {
      id: 'branding_management',
      name: 'Branding Management',
      description: 'Manage custom branding',
      category: 'domain',
      level: 'write',
    },
  ]);

  const handleSaveRole = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsEditing(false);
      setSelectedRole(null);
    } catch (error) {
      console.error('Failed to save role:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 responsive-container sm:flex-col md:flex-row lg:grid">
      <div className="max-w-7xl mx-auto responsive-container sm:flex-col md:flex-row lg:grid">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 responsive-container sm:flex-col md:flex-row lg:grid"
        >
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Role-Based Access Control</h1>
              <p className="text-gray-300 text-lg responsive-container sm:flex-col md:flex-row lg:grid">
                Manage user roles, permissions, and portal access across all domains
              </p>
            </div>
            <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
              <button
                onClick={() => setIsEditing(!isEditing)}
            aria-label="Button"
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                  isEditing
                    ? 'bg-green-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                <Edit className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                <span>{isEditing ? 'Cancel' : 'Edit Mode'}</span>
              </button>
              {isEditing && (
                <button
                  onClick={handleSaveRole}
                  disabled={isSaving}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                 aria-label="Button">
                  {isSaving ? (
                    <RefreshCw className="w-4 h-4 animate-spin responsive-container sm:flex-col md:flex-row lg:grid" />
                  ) : (
                    <Save className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                  )}
                  <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 responsive-container sm:flex-col md:flex-row lg:grid">
              <h3 className="text-white font-semibold mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Navigation</h3>
              <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                {[
                  { id: 'roles', label: 'Roles', icon: Shield, count: roles.length },
                  { id: 'users', label: 'Users', icon: Users, count: users.length },
                  { id: 'permissions', label: 'Permissions', icon: Key, count: permissions.length },
                  { id: 'domains', label: 'Domains', icon: Globe, count: 0 },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as 'roles' | 'users' | 'permissions')}
            aria-label="Button"
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center justify-between ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                      <tab.icon className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                      <span>{tab.label}</span>
                    </div>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full responsive-container sm:flex-col md:flex-row lg:grid">{tab.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden responsive-container sm:flex-col md:flex-row lg:grid">
              <AnimatePresence mode="wait">
                {activeTab === 'roles' && (
                  <motion.div
                    key="roles"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-6 responsive-container sm:flex-col md:flex-row lg:grid"
                  >
                    <RolesTab
                      roles={roles}
                      selectedRole={selectedRole}
                      onSelectRole={setSelectedRole}
                    />
                  </motion.div>
                )}

                {activeTab === 'users' && (
                  <motion.div
                    key="users"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-6 responsive-container sm:flex-col md:flex-row lg:grid"
                  >
                    <UsersTab users={users} roles={roles} />
                  </motion.div>
                )}

                {activeTab === 'permissions' && (
                  <motion.div
                    key="permissions"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-6 responsive-container sm:flex-col md:flex-row lg:grid"
                  >
                    <PermissionsTab permissions={permissions} />
                  </motion.div>
                )}

                {activeTab === 'domains' && (
                  <motion.div
                    key="domains"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-6 responsive-container sm:flex-col md:flex-row lg:grid"
                  >
                    <DomainsTab roles={roles} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Roles Tab Component
function RolesTab({
  roles,
  selectedRole,
  onSelectRole,
}: {
  roles: UserRole[];
  selectedRole: string | null;
  onSelectRole: (roleId: string) => void;
}) {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
      <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
        <h3 className="text-xl font-semibold text-white responsive-container sm:flex-col md:flex-row lg:grid">User Roles</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
          <Plus className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
          <span>Add Role</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
        {roles.map((role: UserRole) => (
          <div
            key={role.id}
            onClick={() => onSelectRole(role.id)}
            className={`p-6 rounded-lg border-2 transition-all cursor-pointer ${
              selectedRole === role.id
                ? 'border-blue-500 bg-blue-500/20'
                : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center justify-between mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
              <div>
                <h4 className="text-white font-semibold responsive-container sm:flex-col md:flex-row lg:grid">{role.name}</h4>
                <p className="text-gray-400 text-sm responsive-container sm:flex-col md:flex-row lg:grid">{role.description}</p>
              </div>
              <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <div
                  className={`w-3 h-3 rounded-full ${
                    role.status === 'active' ? 'bg-green-400' : 'bg-red-400'
                  }`}
                />
                <span className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Level {role.level}</span>
              </div>
            </div>

            <div className="space-y-3 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="flex items-center justify-between text-sm responsive-container sm:flex-col md:flex-row lg:grid">
                <span className="text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Users</span>
                <span className="text-white font-medium responsive-container sm:flex-col md:flex-row lg:grid">{role.userCount}</span>
              </div>
              <div className="flex items-center justify-between text-sm responsive-container sm:flex-col md:flex-row lg:grid">
                <span className="text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Portals</span>
                <span className="text-white font-medium responsive-container sm:flex-col md:flex-row lg:grid">{role.portalAccess.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm responsive-container sm:flex-col md:flex-row lg:grid">
                <span className="text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Permissions</span>
                <span className="text-white font-medium responsive-container sm:flex-col md:flex-row lg:grid">{role.permissions.length}</span>
              </div>
            </div>

            {selectedRole === role.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 pt-4 border-t border-white/20 responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <div className="space-y-3 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div>
                    <h5 className="text-white font-medium mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Portal Access</h5>
                    <div className="space-y-1 responsive-container sm:flex-col md:flex-row lg:grid">
                      {role.portalAccess.map((access: PortalAccess, index: number) => (
                        <div key={index} className="flex items-center justify-between text-sm responsive-container sm:flex-col md:flex-row lg:grid">
                          <span className="text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">{access.portalName}</span>
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              access.accessLevel === 'owner'
                                ? 'bg-red-500/20 text-red-400'
                                : access.accessLevel === 'admin'
                                  ? 'bg-orange-500/20 text-orange-400'
                                  : access.accessLevel === 'write'
                                    ? 'bg-blue-500/20 text-blue-400'
                                    : 'bg-gray-500/20 text-gray-400'
                            }`}
                          >
                            {access.accessLevel}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-white font-medium mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Domain Access</h5>
                    <div className="space-y-1 responsive-container sm:flex-col md:flex-row lg:grid">
                      {role.domainAccess.map((access: DomainAccess, index: number) => (
                        <div key={index} className="text-sm responsive-container sm:flex-col md:flex-row lg:grid">
                          <div className="text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">{access.domainPattern}</div>
                          <div className="text-gray-400 text-xs responsive-container sm:flex-col md:flex-row lg:grid">
                            {access.domainType} • {access.allowedPortals.length} portals
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Users Tab Component
function UsersTab({ users, roles }: { users: User[]; roles: UserRole[] }) {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
      <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
        <h3 className="text-xl font-semibold text-white responsive-container sm:flex-col md:flex-row lg:grid">Users</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
          <UserPlus className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
          <span>Add User</span>
        </button>
      </div>

      <div className="overflow-x-auto responsive-container sm:flex-col md:flex-row lg:grid">
        <table className="w-full responsive-container sm:flex-col md:flex-row lg:grid">
          <thead>
            <tr className="border-b border-white/20 responsive-container sm:flex-col md:flex-row lg:grid">
              <th className="text-left py-3 px-4 text-white font-medium responsive-container sm:flex-col md:flex-row lg:grid">User</th>
              <th className="text-left py-3 px-4 text-white font-medium responsive-container sm:flex-col md:flex-row lg:grid">Role</th>
              <th className="text-left py-3 px-4 text-white font-medium responsive-container sm:flex-col md:flex-row lg:grid">Domain</th>
              <th className="text-left py-3 px-4 text-white font-medium responsive-container sm:flex-col md:flex-row lg:grid">Status</th>
              <th className="text-left py-3 px-4 text-white font-medium responsive-container sm:flex-col md:flex-row lg:grid">Last Login</th>
              <th className="text-left py-3 px-4 text-white font-medium responsive-container sm:flex-col md:flex-row lg:grid">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => {
              const role = roles.find((r: UserRole) => r.id === user.role);
              return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
                <tr key={user.id} className="border-b border-white/10 responsive-container sm:flex-col md:flex-row lg:grid">
                  <td className="py-3 px-4 responsive-container sm:flex-col md:flex-row lg:grid">
                    <div>
                      <div className="text-white font-medium responsive-container sm:flex-col md:flex-row lg:grid">{user.name}</div>
                      <div className="text-gray-400 text-sm responsive-container sm:flex-col md:flex-row lg:grid">{user.email}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4 responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                      <span className="text-white responsive-container sm:flex-col md:flex-row lg:grid">{role?.name || user.role}</span>
                      <span className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Level {role?.level || 0}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">{user.domain}</div>
                  </td>
                  <td className="py-3 px-4 responsive-container sm:flex-col md:flex-row lg:grid">
                    <div
                      className={`flex items-center space-x-2 ${
                        user.status === 'active' ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          user.status === 'active' ? 'bg-green-400' : 'bg-red-400'
                        }`}
                      />
                      <span className="text-sm capitalize responsive-container sm:flex-col md:flex-row lg:grid">{user.status}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="text-gray-400 text-sm responsive-container sm:flex-col md:flex-row lg:grid">
                      {new Date(user.lastLogin).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="py-3 px-4 responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                      <button className="text-blue-400 hover:text-blue-300 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                        <Edit className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                      </button>
                      <button className="text-red-400 hover:text-red-300 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                        <Trash2 className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Permissions Tab Component
function PermissionsTab({ permissions }: { permissions: Permission[] }) {
  const groupedPermissions = permissions.reduce(
    (acc: Record<string, Permission[]>, permission: Permission) => {
      if (!acc[permission.category]) {
        acc[permission.category] = [];
      }
      acc[permission.category].push(permission);
      return acc;
    },
    {}
  );

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
      <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
        <h3 className="text-xl font-semibold text-white responsive-container sm:flex-col md:flex-row lg:grid">Permissions</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
          <Plus className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
          <span>Add Permission</span>
        </button>
      </div>

      <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
        {Object.entries(groupedPermissions).map(([category, perms]: [string, Permission[]]) => (
          <div key={category}>
            <h4 className="text-lg font-semibold text-white mb-4 capitalize responsive-container sm:flex-col md:flex-row lg:grid">
              {category} Permissions
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
              {perms.map((permission: Permission) => (
                <div
                  key={permission.id}
                  className="bg-white/5 rounded-lg p-4 border border-white/10 responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  <div className="flex items-center justify-between mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    <h5 className="text-white font-medium responsive-container sm:flex-col md:flex-row lg:grid">{permission.name}</h5>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        permission.level === 'owner'
                          ? 'bg-red-500/20 text-red-400'
                          : permission.level === 'admin'
                            ? 'bg-orange-500/20 text-orange-400'
                            : permission.level === 'write'
                              ? 'bg-blue-500/20 text-blue-400'
                              : 'bg-gray-500/20 text-gray-400'
                      }`}
                    >
                      {permission.level}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm responsive-container sm:flex-col md:flex-row lg:grid">{permission.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Domains Tab Component
function DomainsTab({ roles }: { roles: UserRole[] }) {
  const domainStats = {
    totalDomains: 156,
    customDomains: 89,
    subdomains: 67,
    sslEnabled: 145,
    cdnEnabled: 134,
  };

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
      <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
        <h3 className="text-xl font-semibold text-white responsive-container sm:flex-col md:flex-row lg:grid">Domain Management</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
          <Plus className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
          <span>Add Domain</span>
        </button>
      </div>

      {/* Domain Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
        {[
          { label: 'Total Domains', value: domainStats.totalDomains, color: 'blue' },
          { label: 'Custom Domains', value: domainStats.customDomains, color: 'green' },
          { label: 'Subdomains', value: domainStats.subdomains, color: 'purple' },
          { label: 'SSL Enabled', value: domainStats.sslEnabled, color: 'orange' },
          { label: 'CDN Enabled', value: domainStats.cdnEnabled, color: 'cyan' },
        ].map((stat, index) => (
          <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="text-2xl font-bold text-white mb-1 responsive-container sm:flex-col md:flex-row lg:grid">{stat.value}</div>
            <div className="text-gray-400 text-sm responsive-container sm:flex-col md:flex-row lg:grid">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Domain Access by Role */}
      <div>
        <h4 className="text-lg font-semibold text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Domain Access by Role</h4>
        <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
          {roles.map((role: UserRole) => (
            <div key={role.id} className="bg-white/5 rounded-lg p-4 border border-white/10 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="flex items-center justify-between mb-3 responsive-container sm:flex-col md:flex-row lg:grid">
                <h5 className="text-white font-medium responsive-container sm:flex-col md:flex-row lg:grid">{role.name}</h5>
                <span className="text-gray-400 text-sm responsive-container sm:flex-col md:flex-row lg:grid">{role.domainAccess.length} domains</span>
              </div>
              <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                {role.domainAccess.map((access: DomainAccess, index: number) => (
                  <div key={index} className="flex items-center justify-between text-sm responsive-container sm:flex-col md:flex-row lg:grid">
                    <div>
                      <div className="text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">{access.domainPattern}</div>
                      <div className="text-gray-400 text-xs responsive-container sm:flex-col md:flex-row lg:grid">
                        {access.domainType} • {access.allowedPortals.length} portals
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                      {access.customBranding && (
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs responsive-container sm:flex-col md:flex-row lg:grid">
                          Custom Branding
                        </span>
                      )}
                      {access.sslRequired && (
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs responsive-container sm:flex-col md:flex-row lg:grid">
                          SSL Required
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}