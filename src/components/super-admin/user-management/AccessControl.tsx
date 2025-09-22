import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, Users, Building, MapPin, Globe, Lock, Key, Eye, Edit,
  Plus, CheckCircle, X, RefreshCw, Bell, Search, MoreVertical,
  AlertTriangle, Star, Target, Network, Server, Smartphone, Monitor, Laptop, Tablet,
  Save, Trash2, User, Mail, Phone, Calendar, Activity, Settings
} from 'lucide-react';

/**
 * Access Control Page - Advanced Organizational Security Management
 * Comprehensive access control with organizational hierarchy and security zones
 * Created by MCP 302 Agents
 * Timestamp: 2025-01-20T18:00:00.000Z
 * Features: Organizational Structure, Security Zones, Device Management, Access Policies
 */

interface Organization {
  id: string;
  name: string;
  type: 'company' | 'division' | 'department' | 'team';
  parentId?: string;
  level: number;
  location: string;
  manager: string;
  userCount: number;
  isActive: boolean;
  securityLevel: 'public' | 'internal' | 'confidential' | 'restricted';
  createdAt: string;
  updatedAt: string;
}

interface SecurityZone {
  id: string;
  name: string;
  description: string;
  level: 'low' | 'medium' | 'high' | 'critical';
  organizations: string[];
  policies: string[];
  isActive: boolean;
  color: string;
  icon: string;
}

interface AccessPolicy {
  id: string;
  name: string;
  description: string;
  rules: PolicyRule[];
  appliesTo: string[];
  isActive: boolean;
  priority: number;
  createdAt: string;
}

interface PolicyRule {
  id: string;
  type: 'time' | 'location' | 'device' | 'user' | 'resource';
  condition: string;
  action: 'allow' | 'deny' | 'require_approval';
}

interface Device {
  id: string;
  name: string;
  type: 'desktop' | 'laptop' | 'mobile' | 'tablet' | 'server';
  owner: string;
  organization: string;
  status: 'active' | 'inactive' | 'blocked' | 'pending';
  lastSeen: string;
  location: string;
  isTrusted: boolean;
}

interface AccessStats {
  totalOrganizations: number;
  totalUsers: number;
  activeDevices: number;
  securityZones: number;
  accessPolicies: number;
  blockedAccess: number;
  pendingApprovals: number;
}

const AccessControl: React.FC = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [securityZones, setSecurityZones] = useState<SecurityZone[]>([]);
  const [accessPolicies, setAccessPolicies] = useState<AccessPolicy[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [filteredOrganizations, setFilteredOrganizations] = useState<Organization[]>([]);
  const [selectedTab, setSelectedTab] = useState<'organizations' | 'zones' | 'policies' | 'devices'>('organizations');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // CRUD Modal States
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [viewingItem, setViewingItem] = useState<any>(null);
  const [deletingItemId, setDeletingItemId] = useState<string | null>(null);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const [stats, setStats] = useState<AccessStats>({
    totalOrganizations: 0,
    totalUsers: 0,
    activeDevices: 0,
    securityZones: 0,
    accessPolicies: 0,
    blockedAccess: 0,
    pendingApprovals: 0
  });
  const [notifications, setNotifications] = useState<{ id: string; type: string; title: string; message: string; timestamp: string }[]>([]);

  // Notification system
  const addNotification = useCallback((type: 'success' | 'error' | 'warning' | 'info', title: string, message: string): void => {
    const notification = {
      id: Date.now().toString(), type, title, message, timestamp: new Date().toISOString()
    };
    setNotifications(prev => [notification, ...prev.slice(0, 4)]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== notification.id)), 5000);
  }, []);

  // CRUD Functions for Organizations
  const handleCreateOrganization = (data: Partial<Organization>) => {
    const newOrganization: Organization = {
      id: `org-${Date.now()}`,
      name: data.name || '',
      type: data.type || 'department',
      level: data.level || 1,
      location: data.location || '',
      manager: data.manager || '',
      userCount: 0,
      isActive: true,
      securityLevel: data.securityLevel || 'internal',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      parentId: data.parentId
    };
    setOrganizations(prev => [...prev, newOrganization]);
    addNotification('success', 'Organization Created', `${newOrganization.name} has been successfully created`);
    setShowCreateModal(false);
  };

  const handleEditOrganization = (organization: Organization) => {
    setEditingItem(organization);
    setShowEditModal(true);
  };

  const handleUpdateOrganization = (data: Partial<Organization>) => {
    if (!editingItem) return;
    const updatedOrganization = {
      ...editingItem,
      ...data,
      updatedAt: new Date().toISOString()
    };
    setOrganizations(prev => prev.map(org => org.id === editingItem.id ? updatedOrganization : org));
    addNotification('success', 'Organization Updated', `${updatedOrganization.name} has been successfully updated`);
    setShowEditModal(false);
    setEditingItem(null);
  };

  const handleDeleteOrganization = (organizationId: string) => {
    const organization = organizations.find(org => org.id === organizationId);
    if (!organization) return;
    
    setDeletingItemId(organizationId);
    setShowDeleteModal(true);
  };

  const confirmDeleteOrganization = () => {
    if (!deletingItemId) return;
    const organization = organizations.find(org => org.id === deletingItemId);
    if (organization) {
      setOrganizations(prev => prev.filter(org => org.id !== deletingItemId));
      addNotification('success', 'Organization Deleted', `${organization.name} has been successfully deleted`);
    }
    setShowDeleteModal(false);
    setDeletingItemId(null);
  };

  const handleViewOrganization = (organization: Organization) => {
    setViewingItem(organization);
    setShowViewModal(true);
  };

  // CRUD Functions for Security Zones
  const handleCreateZone = (data: Partial<SecurityZone>) => {
    const newZone: SecurityZone = {
      id: `zone-${Date.now()}`,
      name: data.name || '',
      description: data.description || '',
      level: data.level || 'medium',
      organizations: data.organizations || [],
      policies: data.policies || [],
      isActive: true,
      color: data.color || 'bg-blue-500',
      icon: data.icon || 'Shield'
    };
    setSecurityZones(prev => [...prev, newZone]);
    addNotification('success', 'Security Zone Created', `${newZone.name} has been successfully created`);
    setShowCreateModal(false);
  };

  const handleEditZone = (zone: SecurityZone) => {
    setEditingItem(zone);
    setShowEditModal(true);
  };

  const handleUpdateZone = (data: Partial<SecurityZone>) => {
    if (!editingItem) return;
    const updatedZone = { ...editingItem, ...data };
    setSecurityZones(prev => prev.map(zone => zone.id === editingItem.id ? updatedZone : zone));
    addNotification('success', 'Security Zone Updated', `${updatedZone.name} has been successfully updated`);
    setShowEditModal(false);
    setEditingItem(null);
  };

  const handleDeleteZone = (zoneId: string) => {
    const zone = securityZones.find(z => z.id === zoneId);
    if (!zone) return;
    setDeletingItemId(zoneId);
    setShowDeleteModal(true);
  };

  const confirmDeleteZone = () => {
    if (!deletingItemId) return;
    const zone = securityZones.find(z => z.id === deletingItemId);
    if (zone) {
      setSecurityZones(prev => prev.filter(z => z.id !== deletingItemId));
      addNotification('success', 'Security Zone Deleted', `${zone.name} has been successfully deleted`);
    }
    setShowDeleteModal(false);
    setDeletingItemId(null);
  };

  const handleViewZone = (zone: SecurityZone) => {
    setViewingItem(zone);
    setShowViewModal(true);
  };

  // CRUD Functions for Access Policies
  const handleCreatePolicy = (data: Partial<AccessPolicy>) => {
    const newPolicy: AccessPolicy = {
      id: `policy-${Date.now()}`,
      name: data.name || '',
      description: data.description || '',
      rules: data.rules || [],
      appliesTo: data.appliesTo || [],
      isActive: true,
      priority: data.priority || 1,
      createdAt: new Date().toISOString()
    };
    setAccessPolicies(prev => [...prev, newPolicy]);
    addNotification('success', 'Access Policy Created', `${newPolicy.name} has been successfully created`);
    setShowCreateModal(false);
  };

  const handleEditPolicy = (policy: AccessPolicy) => {
    setEditingItem(policy);
    setShowEditModal(true);
  };

  const handleUpdatePolicy = (data: Partial<AccessPolicy>) => {
    if (!editingItem) return;
    const updatedPolicy = { ...editingItem, ...data };
    setAccessPolicies(prev => prev.map(policy => policy.id === editingItem.id ? updatedPolicy : policy));
    addNotification('success', 'Access Policy Updated', `${updatedPolicy.name} has been successfully updated`);
    setShowEditModal(false);
    setEditingItem(null);
  };

  const handleDeletePolicy = (policyId: string) => {
    const policy = accessPolicies.find(p => p.id === policyId);
    if (!policy) return;
    setDeletingItemId(policyId);
    setShowDeleteModal(true);
  };

  const confirmDeletePolicy = () => {
    if (!deletingItemId) return;
    const policy = accessPolicies.find(p => p.id === deletingItemId);
    if (policy) {
      setAccessPolicies(prev => prev.filter(p => p.id !== deletingItemId));
      addNotification('success', 'Access Policy Deleted', `${policy.name} has been successfully deleted`);
    }
    setShowDeleteModal(false);
    setDeletingItemId(null);
  };

  const handleViewPolicy = (policy: AccessPolicy) => {
    setViewingItem(policy);
    setShowViewModal(true);
  };

  // CRUD Functions for Devices
  const handleCreateDevice = (data: Partial<Device>) => {
    const newDevice: Device = {
      id: `device-${Date.now()}`,
      name: data.name || '',
      type: data.type || 'desktop',
      owner: data.owner || '',
      organization: data.organization || '',
      status: 'active',
      lastSeen: new Date().toISOString(),
      location: data.location || '',
      isTrusted: data.isTrusted || false
    };
    setDevices(prev => [...prev, newDevice]);
    addNotification('success', 'Device Added', `${newDevice.name} has been successfully added`);
    setShowCreateModal(false);
  };

  const handleEditDevice = (device: Device) => {
    setEditingItem(device);
    setShowEditModal(true);
  };

  const handleUpdateDevice = (data: Partial<Device>) => {
    if (!editingItem) return;
    const updatedDevice = { ...editingItem, ...data };
    setDevices(prev => prev.map(device => device.id === editingItem.id ? updatedDevice : device));
    addNotification('success', 'Device Updated', `${updatedDevice.name} has been successfully updated`);
    setShowEditModal(false);
    setEditingItem(null);
  };

  const handleDeleteDevice = (deviceId: string) => {
    const device = devices.find(d => d.id === deviceId);
    if (!device) return;
    setDeletingItemId(deviceId);
    setShowDeleteModal(true);
  };

  const confirmDeleteDevice = () => {
    if (!deletingItemId) return;
    const device = devices.find(d => d.id === deletingItemId);
    if (device) {
      setDevices(prev => prev.filter(d => d.id !== deletingItemId));
      addNotification('success', 'Device Removed', `${device.name} has been successfully removed`);
    }
    setShowDeleteModal(false);
    setDeletingItemId(null);
  };

  const handleViewDevice = (device: Device) => {
    setViewingItem(device);
    setShowViewModal(true);
  };

  // Action Menu Functions
  const toggleActionMenu = (itemId: string) => {
    setShowActionMenu(showActionMenu === itemId ? null : itemId);
  };

  const handleCreateClick = () => {
    setEditingItem(null);
    setShowCreateModal(true);
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.action-menu')) {
        setShowActionMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Mock data - Comprehensive access control system
  useEffect(() => {
    const mockOrganizations: Organization[] = [
      {
        id: 'company',
        name: 'TransBot Logistics',
        type: 'company',
        level: 0,
        location: 'San Francisco, CA',
        manager: 'Sarah Johnson',
        userCount: 98,
        isActive: true,
        securityLevel: 'internal',
        createdAt: '2023-01-01',
        updatedAt: '2024-12-15'
      },
      {
        id: 'operations',
        name: 'Operations Division',
        type: 'division',
        parentId: 'company',
        level: 1,
        location: 'Los Angeles, CA',
        manager: 'Michael Chen',
        userCount: 35,
        isActive: true,
        securityLevel: 'internal',
        createdAt: '2023-02-01',
        updatedAt: '2024-11-20'
      },
      {
        id: 'fleet-management',
        name: 'Fleet Management',
        type: 'department',
        parentId: 'operations',
        level: 2,
        location: 'Chicago, IL',
        manager: 'Emily Rodriguez',
        userCount: 18,
        isActive: true,
        securityLevel: 'confidential',
        createdAt: '2023-03-01',
        updatedAt: '2024-10-15'
      },
      {
        id: 'driver-team',
        name: 'Driver Operations Team',
        type: 'team',
        parentId: 'fleet-management',
        level: 3,
        location: 'Houston, TX',
        manager: 'James Wilson',
        userCount: 45,
        isActive: true,
        securityLevel: 'restricted',
        createdAt: '2023-04-01',
        updatedAt: '2024-09-10'
      },
      {
        id: 'finance',
        name: 'Finance Division',
        type: 'division',
        parentId: 'company',
        level: 1,
        location: 'New York, NY',
        manager: 'Maria Garcia',
        userCount: 12,
        isActive: true,
        securityLevel: 'restricted',
        createdAt: '2023-02-15',
        updatedAt: '2024-08-25'
      },
      {
        id: 'hr',
        name: 'Human Resources',
        type: 'department',
        parentId: 'company',
        level: 1,
        location: 'Denver, CO',
        manager: 'Jennifer Brown',
        userCount: 8,
        isActive: true,
        securityLevel: 'confidential',
        createdAt: '2023-03-15',
        updatedAt: '2024-07-20'
      },
      {
        id: 'it',
        name: 'IT Department',
        type: 'department',
        parentId: 'company',
        level: 1,
        location: 'Austin, TX',
        manager: 'Robert Taylor',
        userCount: 15,
        isActive: true,
        securityLevel: 'restricted',
        createdAt: '2023-02-28',
        updatedAt: '2024-06-30'
      }
    ];

    const mockSecurityZones: SecurityZone[] = [
      {
        id: 'public-zone',
        name: 'Public Zone',
        description: 'Public-facing resources and information',
        level: 'low',
        organizations: ['company'],
        policies: ['public-access'],
        isActive: true,
        color: 'bg-green-500',
        icon: 'Globe'
      },
      {
        id: 'internal-zone',
        name: 'Internal Zone',
        description: 'Internal business operations and data',
        level: 'medium',
        organizations: ['operations', 'hr'],
        policies: ['internal-access', 'business-hours'],
        isActive: true,
        color: 'bg-blue-500',
        icon: 'Building'
      },
      {
        id: 'confidential-zone',
        name: 'Confidential Zone',
        description: 'Sensitive business information and processes',
        level: 'high',
        organizations: ['fleet-management', 'finance'],
        policies: ['confidential-access', 'multi-factor', 'audit-log'],
        isActive: true,
        color: 'bg-orange-500',
        icon: 'Shield'
      },
      {
        id: 'restricted-zone',
        name: 'Restricted Zone',
        description: 'Highly sensitive data requiring special clearance',
        level: 'critical',
        organizations: ['driver-team', 'it'],
        policies: ['restricted-access', 'biometric', 'continuous-monitoring'],
        isActive: true,
        color: 'bg-red-500',
        icon: 'Lock'
      }
    ];

    const mockAccessPolicies: AccessPolicy[] = [
      {
        id: 'public-access',
        name: 'Public Access Policy',
        description: 'Standard access for public information',
        rules: [
          { id: '1', type: 'time', condition: 'business_hours', action: 'allow' },
          { id: '2', type: 'device', condition: 'trusted_device', action: 'allow' }
        ],
        appliesTo: ['public-zone'],
        isActive: true,
        priority: 1,
        createdAt: '2023-01-01'
      },
      {
        id: 'internal-access',
        name: 'Internal Access Policy',
        description: 'Access control for internal operations',
        rules: [
          { id: '3', type: 'user', condition: 'authenticated_user', action: 'allow' },
          { id: '4', type: 'location', condition: 'office_location', action: 'allow' },
          { id: '5', type: 'time', condition: 'business_hours', action: 'allow' }
        ],
        appliesTo: ['internal-zone'],
        isActive: true,
        priority: 2,
        createdAt: '2023-01-15'
      },
      {
        id: 'confidential-access',
        name: 'Confidential Access Policy',
        description: 'Enhanced security for sensitive data',
        rules: [
          { id: '6', type: 'user', condition: 'authorized_user', action: 'allow' },
          { id: '7', type: 'device', condition: 'managed_device', action: 'allow' },
          { id: '8', type: 'time', condition: 'extended_hours', action: 'require_approval' }
        ],
        appliesTo: ['confidential-zone'],
        isActive: true,
        priority: 3,
        createdAt: '2023-02-01'
      },
      {
        id: 'restricted-access',
        name: 'Restricted Access Policy',
        description: 'Maximum security for critical systems',
        rules: [
          { id: '9', type: 'user', condition: 'high_clearance_user', action: 'allow' },
          { id: '10', type: 'device', condition: 'secured_device', action: 'allow' },
          { id: '11', type: 'location', condition: 'secure_location', action: 'allow' },
          { id: '12', type: 'time', condition: 'any_time', action: 'require_approval' }
        ],
        appliesTo: ['restricted-zone'],
        isActive: true,
        priority: 4,
        createdAt: '2023-02-15'
      }
    ];

    const mockDevices: Device[] = [
      {
        id: 'dev-1',
        name: 'Sarah-Johnson-MacBook',
        type: 'laptop',
        owner: 'Sarah Johnson',
        organization: 'company',
        status: 'active',
        lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        location: 'San Francisco, CA',
        isTrusted: true
      },
      {
        id: 'dev-2',
        name: 'Michael-Chen-iPhone',
        type: 'mobile',
        owner: 'Michael Chen',
        organization: 'operations',
        status: 'active',
        lastSeen: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        location: 'Los Angeles, CA',
        isTrusted: true
      },
      {
        id: 'dev-3',
        name: 'Emily-Rodriguez-Desktop',
        type: 'desktop',
        owner: 'Emily Rodriguez',
        organization: 'fleet-management',
        status: 'active',
        lastSeen: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        location: 'Chicago, IL',
        isTrusted: true
      },
      {
        id: 'dev-4',
        name: 'James-Wilson-Tablet',
        type: 'tablet',
        owner: 'James Wilson',
        organization: 'driver-team',
        status: 'blocked',
        lastSeen: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        location: 'Houston, TX',
        isTrusted: false
      },
      {
        id: 'dev-5',
        name: 'Maria-Garcia-Laptop',
        type: 'laptop',
        owner: 'Maria Garcia',
        organization: 'finance',
        status: 'active',
        lastSeen: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        location: 'New York, NY',
        isTrusted: true
      }
    ];

    setOrganizations(mockOrganizations);
    setSecurityZones(mockSecurityZones);
    setAccessPolicies(mockAccessPolicies);
    setDevices(mockDevices);
    setFilteredOrganizations(mockOrganizations);
    
    // Calculate stats
    const accessStats: AccessStats = {
      totalOrganizations: mockOrganizations.length,
      totalUsers: mockOrganizations.reduce((sum, org) => sum + org.userCount, 0),
      activeDevices: mockDevices.filter(d => d.status === 'active').length,
      securityZones: mockSecurityZones.length,
      accessPolicies: mockAccessPolicies.length,
      blockedAccess: mockDevices.filter(d => d.status === 'blocked').length,
      pendingApprovals: 3
    };
    setStats(accessStats);
  }, []);

  // Filter organizations
  useEffect(() => {
    let filtered = organizations;

    if (searchQuery) {
      filtered = filtered.filter(org =>
        org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        org.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        org.manager.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredOrganizations(filtered);
  }, [organizations, searchQuery]);

  const getSecurityLevelColor = (level: Organization['securityLevel']) => {
    switch (level) {
      case 'public': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'internal': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'confidential': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'restricted': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };


  const getZoneIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return Globe;
      case 'Building': return Building;
      case 'Shield': return Shield;
      case 'Lock': return Lock;
      default: return Shield;
    }
  };

  const getDeviceIcon = (type: Device['type']) => {
    switch (type) {
      case 'desktop': return Monitor;
      case 'laptop': return Laptop;
      case 'mobile': return Smartphone;
      case 'tablet': return Tablet;
      case 'server': return Server;
      default: return Monitor;
    }
  };

  const getDeviceStatusColor = (status: Device['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'blocked': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getOrganizationIcon = (type: Organization['type']) => {
    switch (type) {
      case 'company': return Building;
      case 'division': return Network;
      case 'department': return Users;
      case 'team': return Target;
      default: return Building;
    }
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    addNotification('success', 'Data Refreshed', 'Access control data has been updated');
  };

  const formatLastSeen = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const getIndentLevel = (level: number) => {
    return level * 20;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-50 dark:bg-slate-900 min-h-screen"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                <Shield className="w-8 h-8 text-blue-500 mr-3" />
                Access Control
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage organizational hierarchy, security zones, and access policies
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="p-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
              >
                <RefreshCw className={`w-5 h-5 text-gray-600 dark:text-gray-400 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={handleCreateClick}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create New
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Organizations</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalOrganizations}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Security Zones</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.securityZones}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Devices</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.activeDevices}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <Monitor className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Access Policies</p>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.accessPolicies}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                <Key className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 mb-6">
          <div className="border-b border-gray-200 dark:border-slate-700">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'organizations', label: 'Organizations', count: organizations.length, icon: Building },
                { id: 'zones', label: 'Security Zones', count: securityZones.length, icon: Shield },
                { id: 'policies', label: 'Access Policies', count: accessPolicies.length, icon: Key },
                { id: 'devices', label: 'Devices', count: devices.length, icon: Monitor }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id as any)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      selectedTab === tab.id
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full text-xs">
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </nav>
        </div>

          {/* Search Bar */}
          <div className="p-6 border-b border-gray-200 dark:border-slate-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={`Search ${selectedTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
          </div>
        </div>

        {/* Content */}
          <div className="p-6">
            {selectedTab === 'organizations' && (
              <div className="space-y-4">
                {filteredOrganizations.map((org) => {
                  const OrgIcon = getOrganizationIcon(org.type);
                  return (
                    <motion.div
                      key={org.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                      style={{ marginLeft: `${getIndentLevel(org.level)}px` }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                            <OrgIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                              <span>{org.name}</span>
                              {!org.isActive && (
                                <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 text-xs rounded-full">
                                  Inactive
                                </span>
                              )}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                              <span className="flex items-center space-x-1">
                                <MapPin className="w-4 h-4" />
                                <span>{org.location}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Users className="w-4 h-4" />
                                <span>{org.userCount} users</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Star className="w-4 h-4" />
                                <span>{org.manager}</span>
                              </span>
                          </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSecurityLevelColor(org.securityLevel)}`}>
                            {org.securityLevel}
                        </span>
                          <div className="flex items-center space-x-1">
                            <button 
                              onClick={() => handleViewOrganization(org)}
                              className="p-1 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                              title="View Organization"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleEditOrganization(org)}
                              className="p-1 text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors"
                              title="Edit Organization"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <div className="relative action-menu">
                              <button 
                                onClick={() => toggleActionMenu(org.id)}
                                className="p-1 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                                title="More Actions"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </button>
                              {showActionMenu === org.id && (
                                <div className="absolute right-0 top-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 z-10 min-w-32">
                                  <button
                                    onClick={() => {
                                      handleViewOrganization(org);
                                      setShowActionMenu(null);
                                    }}
                                    className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                                  >
                                    <Eye className="w-4 h-4" />
                                    <span>View Details</span>
                                  </button>
                                  <button
                                    onClick={() => {
                                      handleEditOrganization(org);
                                      setShowActionMenu(null);
                                    }}
                                    className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                                  >
                                    <Edit className="w-4 h-4" />
                                    <span>Edit Organization</span>
                                  </button>
                                  <button
                                    onClick={() => {
                                      handleDeleteOrganization(org.id);
                                      setShowActionMenu(null);
                                    }}
                                    className="w-full px-3 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center space-x-2"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                    <span>Delete</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        </div>
                    </motion.div>
                  );
                })}
            </div>
          )}

            {selectedTab === 'zones' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {securityZones.map((zone) => {
                  const ZoneIcon = getZoneIcon(zone.icon);
                  return (
                  <motion.div
                      key={zone.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-50 dark:bg-slate-700 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 ${zone.color} rounded-lg flex items-center justify-center`}>
                            <ZoneIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">{zone.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                              {zone.level} security level
                            </p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          zone.isActive ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                        }`}>
                          {zone.isActive ? 'Active' : 'Inactive'}
                        </span>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {zone.description}
                      </p>

                      <div className="space-y-2">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Organizations</p>
                          <p className="text-sm text-gray-900 dark:text-white">
                            {zone.organizations.length} assigned
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Policies</p>
                          <p className="text-sm text-gray-900 dark:text-white">
                            {zone.policies.length} active policies
                          </p>
                      </div>
                        </div>
                    </motion.div>
                  );
                })}
                      </div>
            )}

            {selectedTab === 'policies' && (
              <div className="space-y-4">
                {accessPolicies.map((policy) => (
                  <motion.div
                    key={policy.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-50 dark:bg-slate-700 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                          <span>{policy.name}</span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 text-xs rounded-full">
                            Priority {policy.priority}
                          </span>
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {policy.description}
                        </p>
                        </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        policy.isActive ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                      }`}>
                        {policy.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Rules</p>
                        <div className="space-y-1">
                          {policy.rules.map((rule) => (
                            <div key={rule.id} className="flex items-center justify-between text-sm">
                              <span className="text-gray-700 dark:text-gray-300">
                                {rule.type}: {rule.condition}
                              </span>
                              <span className={`px-2 py-0.5 rounded text-xs ${
                                rule.action === 'allow' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                                rule.action === 'deny' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                              }`}>
                                {rule.action}
                          </span>
                            </div>
                        ))}
                      </div>
                    </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Applies To</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {policy.appliesTo.length} security zones
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          )}

            {selectedTab === 'devices' && (
              <div className="space-y-4">
                {devices.map((device) => {
                  const DeviceIcon = getDeviceIcon(device.type);
                  return (
                    <motion.div
                      key={device.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                            <DeviceIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                          </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                              <span>{device.name}</span>
                              {device.isTrusted && (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              )}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                              <span>{device.owner}</span>
                              <span>•</span>
                              <span>{device.location}</span>
                              <span>•</span>
                              <span>Last seen: {formatLastSeen(device.lastSeen)}</span>
                          </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDeviceStatusColor(device.status)}`}>
                            {device.status}
                        </span>
                          <div className="flex space-x-1">
                            <button className="p-1 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                            <button className="p-1 text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
            </div>
              </div>
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          )}
        </div>
      </div>

        {/* Create Modal */}
        <AnimatePresence>
          {showCreateModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl mx-4"
              >
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Create New {selectedTab === 'organizations' ? 'Organization' : 
                                  selectedTab === 'zones' ? 'Security Zone' : 
                                  selectedTab === 'policies' ? 'Access Policy' : 'Device'}
                    </h3>
                    <button
                      onClick={() => setShowCreateModal(false)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                </div>
                
                <CreateForm 
                  type={selectedTab}
                  onSubmit={
                    selectedTab === 'organizations' ? handleCreateOrganization :
                    selectedTab === 'zones' ? handleCreateZone :
                    selectedTab === 'policies' ? handleCreatePolicy :
                    handleCreateDevice
                  }
                  onCancel={() => setShowCreateModal(false)}
                  organizations={organizations}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit Modal */}
        <AnimatePresence>
          {showEditModal && editingItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl mx-4"
              >
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Edit {selectedTab === 'organizations' ? 'Organization' : 
                             selectedTab === 'zones' ? 'Security Zone' : 
                             selectedTab === 'policies' ? 'Access Policy' : 'Device'}
                    </h3>
                    <button
                      onClick={() => setShowEditModal(false)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                </div>
                
                <EditForm 
                  type={selectedTab}
                  item={editingItem}
                  onSubmit={
                    selectedTab === 'organizations' ? handleUpdateOrganization :
                    selectedTab === 'zones' ? handleUpdateZone :
                    selectedTab === 'policies' ? handleUpdatePolicy :
                    handleUpdateDevice
                  }
                  onCancel={() => setShowEditModal(false)}
                  organizations={organizations}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View Modal */}
        <AnimatePresence>
          {showViewModal && viewingItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl mx-4"
              >
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      View {selectedTab === 'organizations' ? 'Organization' : 
                             selectedTab === 'zones' ? 'Security Zone' : 
                             selectedTab === 'policies' ? 'Access Policy' : 'Device'} Details
                    </h3>
                    <button
                      onClick={() => setShowViewModal(false)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                </div>
                
                <ViewForm 
                  type={selectedTab}
                  item={viewingItem}
                  onClose={() => setShowViewModal(false)}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteModal && deletingItemId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md mx-4"
              >
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Confirm Deletion</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete this {selectedTab.slice(0, -1)}? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={
                        selectedTab === 'organizations' ? confirmDeleteOrganization :
                        selectedTab === 'zones' ? confirmDeleteZone :
                        selectedTab === 'policies' ? confirmDeletePolicy :
                        confirmDeleteDevice
                      }
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notifications */}
        <div className="fixed bottom-6 right-6 z-50 space-y-2">
          <AnimatePresence>
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                className={`p-4 rounded-lg shadow-lg flex items-center space-x-3 ${
                  notification.type === 'success' ? 'bg-green-500 text-white' :
                  notification.type === 'error' ? 'bg-red-500 text-white' :
                  notification.type === 'info' ? 'bg-blue-500 text-white' :
                  'bg-yellow-500 text-white'
                }`}
              >
                {notification.type === 'success' && <CheckCircle className="w-5 h-5" />}
                {notification.type === 'error' && <AlertTriangle className="w-5 h-5" />}
                {notification.type === 'info' && <Bell className="w-5 h-5" />}
                {notification.type === 'warning' && <AlertTriangle className="w-5 h-5" />}
                <div>
                  <h4 className="font-semibold">{notification.title}</h4>
                  <p className="text-sm">{notification.message}</p>
                </div>
                <button onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}>
                  <X className="w-5 h-5" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
    </div>
    </motion.div>
  );
};

// Form Components
const CreateForm: React.FC<{
  type: string;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  organizations: Organization[];
}> = ({ type, onSubmit, onCancel, organizations }) => {
  const [formData, setFormData] = useState<any>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (type === 'organizations') {
    return (
      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
            <input
              type="text"
              required
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type</label>
            <select
              value={formData.type || 'department'}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="department">Department</option>
              <option value="team">Team</option>
              <option value="division">Division</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
            <input
              type="text"
              value={formData.location || ''}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Manager</label>
            <input
              type="text"
              value={formData.manager || ''}
              onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Security Level</label>
          <select
            value={formData.securityLevel || 'internal'}
            onChange={(e) => setFormData({ ...formData, securityLevel: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="public">Public</option>
            <option value="internal">Internal</option>
            <option value="confidential">Confidential</option>
            <option value="restricted">Restricted</option>
          </select>
        </div>
        <div className="flex justify-end space-x-3">
          <button type="button" onClick={onCancel} className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Save className="w-4 h-4 mr-2" />
            Create
          </button>
        </div>
      </form>
    );
  }

  if (type === 'zones') {
    return (
      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Zone Name</label>
            <input
              type="text"
              required
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Security Level</label>
            <select
              value={formData.level || 'medium'}
              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
          <textarea
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button type="button" onClick={onCancel} className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Save className="w-4 h-4 mr-2" />
            Create
          </button>
        </div>
      </form>
    );
  }

  if (type === 'policies') {
    return (
      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Policy Name</label>
            <input
              type="text"
              required
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</label>
            <input
              type="number"
              min="1"
              max="10"
              value={formData.priority || 1}
              onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
          <textarea
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button type="button" onClick={onCancel} className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Save className="w-4 h-4 mr-2" />
            Create
          </button>
        </div>
      </form>
    );
  }

  if (type === 'devices') {
    return (
      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Device Name</label>
            <input
              type="text"
              required
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Device Type</label>
            <select
              value={formData.type || 'desktop'}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="desktop">Desktop</option>
              <option value="laptop">Laptop</option>
              <option value="mobile">Mobile</option>
              <option value="tablet">Tablet</option>
              <option value="server">Server</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Owner</label>
            <input
              type="text"
              value={formData.owner || ''}
              onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Organization</label>
            <select
              value={formData.organization || ''}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Organization</option>
              {organizations.map(org => (
                <option key={org.id} value={org.name}>{org.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
          <input
            type="text"
            value={formData.location || ''}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="isTrusted"
            checked={formData.isTrusted || false}
            onChange={(e) => setFormData({ ...formData, isTrusted: e.target.checked })}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="isTrusted" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            Trusted Device
          </label>
        </div>
        <div className="flex justify-end space-x-3">
          <button type="button" onClick={onCancel} className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Save className="w-4 h-4 mr-2" />
            Add Device
          </button>
        </div>
      </form>
    );
  }

  return null;
};

const EditForm: React.FC<{
  type: string;
  item: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  organizations: Organization[];
}> = ({ type, item, onSubmit, onCancel, organizations }) => {
  const [formData, setFormData] = useState<any>(item || {});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Similar to CreateForm but with pre-filled data
  return <CreateForm type={type} onSubmit={onSubmit} onCancel={onCancel} organizations={organizations} />;
};

const ViewForm: React.FC<{
  type: string;
  item: any;
  onClose: () => void;
}> = ({ type, item, onClose }) => {
  if (!item) return null;

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
            <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{item.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">{item.description || 'No description available'}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
            <p className="text-gray-900 dark:text-white">{item.type || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
            <p className="text-gray-900 dark:text-white">{item.location || 'N/A'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              item.isActive ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
            }`}>
              {item.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Created</label>
            <p className="text-gray-900 dark:text-white">{new Date(item.createdAt).toLocaleDateString()}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Updated</label>
            <p className="text-gray-900 dark:text-white">{new Date(item.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AccessControl;
