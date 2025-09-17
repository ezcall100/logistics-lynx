/**
 * Super Admin UserData Management - Complete UserData Control System
 * Manage registrations, approvals, and user access
 * Created by MCP 301 Agents
 * Timestamp: 2025-01-15T10:00:00.000Z
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  UserCheck,
  UserX,
  Mail,
  Phone,
  Building,
  MapPin,
  Calendar,
  DollarSign,
  Shield,
  AlertTriangle,
  Info,
  Download,
  Upload,
  RefreshCw,
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
  Star,
  Flag,
  Bookmark,
  Archive,
  Send,
  Copy,
  ExternalLink,
  Lock,
  Unlock,
  Key,
  Settings,
  Bell,
  MessageSquare,
  FileText,
  CreditCard,
  Truck,
  Package,
  Car,
  User,
  Globe,
  Server,
  Database,
  BarChart3,
  PieChart,
  LineChart,
  TrendingUp,
  TrendingDown,
  Activity,
  Zap,
  Target,
  Award,
  Gift,
  Coffee,
  Camera,
  Mic,
  MicOff,
  Headphones,
  Volume1,
  Volume2,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Smile,
  Frown,
  Meh,
  Angry,
  Laugh,
  Hot,
  Cold,
  Happy,
  Sad,
  Excited,
  Bored,
  Tired,
  Hungry,
  Thirsty,
} from 'lucide-react';

// UserData Status Types
type UserDataStatus =
  | 'pending'
  | 'under_review'
  | 'approved'
  | 'rejected'
  | 'active'
  | 'suspended'
  | 'inactive';

// UserData Role Types
type UserDataRole = 'shipper' | 'broker' | 'carrier' | 'owner_operator' | 'driver';

// Subscription Types
type SubscriptionType = 'free' | 'professional' | 'enterprise' | 'custom';

// UserData Interface
interface UserDataData {
  id: string;
  // Company Information
  companyName: string;
  companyType: string;
  industry: string;
  companySize: string;
  website: string;
  companyPhone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;

  // UserData Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle: string;
  department: string;
  avatar: string;

  // Role and Access
  primaryRole: UserDataRole;
  secondaryRoles: UserDataRole[];
  activeFunctions: string[];
  permissions: string[];

  // Subscription
  subscriptionType: SubscriptionType;
  billingCycle: 'monthly' | 'yearly';
  paymentMethod: string;
  subscriptionStatus: 'active' | 'expired' | 'cancelled' | 'pending';

  // Status and Approval
  status: UserDataStatus;
  approvalNotes: string;
  approvedBy: string;
  approvedAt: string;
  registeredAt: string;
  lastLoginAt: string;

  // Verification
  emailVerified: boolean;
  phoneVerified: boolean;
  documentsUploaded: boolean;
  complianceChecked: boolean;

  // MCP Integration
  mcpAgentAssigned: boolean;
  mcpAgentId: string;
  mcpAgentStatus: 'active' | 'idle' | 'maintenance' | 'error';

  // Analytics
  totalLogins: number;
  lastActivity: string;
  usageStats: {
    loadsCreated: number;
    loadsCompleted: number;
    revenue: number;
    activeUserDatas: number;
  };
}

// Filter Options
interface FilterOptions {
  status: UserDataStatus | 'all';
  role: UserDataRole | 'all';
  subscription: SubscriptionType | 'all';
  companySize: string | 'all';
  dateRange: 'all' | 'today' | 'week' | 'month' | 'year';
  search: string;
}

function UserDataManagement() {
  // State Management
  const [users, setUserDatas] = useState<UserData[]>([]);
  const [filteredUserDatas, setFilteredUserDatas] = useState<UserData[]>([]);
  const [selectedUserData, setSelectedUserData] = useState<UserData | null>(null);
  const [showUserDataDetails, setShowUserDataDetails] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [filters, setFilters] = useState<FilterOptions>({
    status: 'all',
    role: 'all',
    subscription: 'all',
    companySize: 'all',
    dateRange: 'all',
    search: '',
  });

  // Mock Data
  useEffect(() => {
    const mockUserDatas: UserData[] = [
      {
        id: '1',
        companyName: 'ABC Logistics',
        companyType: 'shipper',
        industry: 'Manufacturing',
        companySize: '51-200',
        website: 'https://abclogistics.com',
        companyPhone: '+1 (555) 123-4567',
        address: '123 Main Street',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60601',
        country: 'US',
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@abclogistics.com',
        phone: '+1 (555) 123-4567',
        jobTitle: 'Logistics Manager',
        department: 'Operations',
        avatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
        primaryRole: 'shipper',
        secondaryRoles: [],
        activeFunctions: ['loads', 'financial', 'communication', 'analytics'],
        permissions: ['read', 'write'],
        subscriptionType: 'professional',
        billingCycle: 'monthly',
        paymentMethod: 'credit_card',
        subscriptionStatus: 'active',
        status: 'active',
        approvalNotes: 'Approved after verification',
        approvedBy: 'admin@transbotai.com',
        approvedAt: '2025-01-10T10:00:00Z',
        registeredAt: '2025-01-08T10:00:00Z',
        lastLoginAt: '2025-01-15T08:30:00Z',
        emailVerified: true,
        phoneVerified: true,
        documentsUploaded: true,
        complianceChecked: true,
        mcpAgentAssigned: true,
        mcpAgentId: 'MCP-001',
        mcpAgentStatus: 'active',
        totalLogins: 45,
        lastActivity: '2025-01-15T08:30:00Z',
        usageStats: {
          loadsCreated: 23,
          loadsCompleted: 18,
          revenue: 12500,
          activeUserDatas: 5,
        },
      },
      {
        id: '2',
        companyName: 'XYZ Trucking',
        companyType: 'carrier',
        industry: 'Transportation',
        companySize: '11-50',
        website: 'https://xyztrucking.com',
        companyPhone: '+1 (555) 987-6543',
        address: '456 Oak Avenue',
        city: 'Atlanta',
        state: 'GA',
        zipCode: '30309',
        country: 'US',
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@xyztrucking.com',
        phone: '+1 (555) 987-6543',
        jobTitle: 'Fleet Manager',
        department: 'Operations',
        avatar:
          'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
        primaryRole: 'carrier',
        secondaryRoles: [],
        activeFunctions: ['loads', 'fleet', 'financial', 'loadboard', 'marketplace'],
        permissions: ['read', 'write', 'admin'],
        subscriptionType: 'enterprise',
        billingCycle: 'yearly',
        paymentMethod: 'bank_transfer',
        subscriptionStatus: 'active',
        status: 'active',
        approvalNotes: 'Enterprise customer approved',
        approvedBy: 'admin@transbotai.com',
        approvedAt: '2025-01-12T14:00:00Z',
        registeredAt: '2025-01-10T14:00:00Z',
        lastLoginAt: '2025-01-15T09:15:00Z',
        emailVerified: true,
        phoneVerified: true,
        documentsUploaded: true,
        complianceChecked: true,
        mcpAgentAssigned: true,
        mcpAgentId: 'MCP-002',
        mcpAgentStatus: 'active',
        totalLogins: 78,
        lastActivity: '2025-01-15T09:15:00Z',
        usageStats: {
          loadsCreated: 156,
          loadsCompleted: 142,
          revenue: 45000,
          activeUserDatas: 12,
        },
      },
      {
        id: '3',
        companyName: 'Freight Solutions Inc',
        companyType: 'broker',
        industry: 'Logistics',
        companySize: '1-10',
        website: 'https://freightsolutions.com',
        companyPhone: '+1 (555) 456-7890',
        address: '789 Pine Street',
        city: 'Miami',
        state: 'FL',
        zipCode: '33101',
        country: 'US',
        firstName: 'Mike',
        lastName: 'Davis',
        email: 'mike.davis@freightsolutions.com',
        phone: '+1 (555) 456-7890',
        jobTitle: 'Broker',
        department: 'Sales',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
        primaryRole: 'broker',
        secondaryRoles: [],
        activeFunctions: ['loads', 'financial', 'crm', 'loadboard', 'marketplace', 'directory'],
        permissions: ['read', 'write'],
        subscriptionType: 'professional',
        billingCycle: 'monthly',
        paymentMethod: 'credit_card',
        subscriptionStatus: 'active',
        status: 'pending',
        approvalNotes: '',
        approvedBy: '',
        approvedAt: '',
        registeredAt: '2025-01-14T16:00:00Z',
        lastLoginAt: '',
        emailVerified: true,
        phoneVerified: false,
        documentsUploaded: false,
        complianceChecked: false,
        mcpAgentAssigned: false,
        mcpAgentId: '',
        mcpAgentStatus: 'idle',
        totalLogins: 0,
        lastActivity: '',
        usageStats: {
          loadsCreated: 0,
          loadsCompleted: 0,
          revenue: 0,
          activeUserDatas: 1,
        },
      },
    ];

    setUserDatas(mockUserDatas);
    setFilteredUserDatas(mockUserDatas);
  }, []);

  // Filter UserDatas
  useEffect(() => {
    let filtered = users;

    if (filters.status !== 'all') {
      filtered = filtered.filter(user => user.status === filters.status);
    }

    if (filters.role !== 'all') {
      filtered = filtered.filter(user => user.primaryRole === filters.role);
    }

    if (filters.subscription !== 'all') {
      filtered = filtered.filter(user => user.subscriptionType === filters.subscription);
    }

    if (filters.companySize !== 'all') {
      filtered = filtered.filter(user => user.companySize === filters.companySize);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        user =>
          user.companyName.toLowerCase().includes(searchLower) ||
          user.firstName.toLowerCase().includes(searchLower) ||
          user.lastName.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower)
      );
    }

    setFilteredUserDatas(filtered);
  }, [users, filters]);

  // Event Handlers
  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleUserDataAction = async (
    userId: string,
    action: 'approve' | 'reject' | 'suspend' | 'activate'
  ) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setUserDatas(prev =>
        prev.map(user => {
          if (user.id === userId) {
            switch (action) {
              case 'approve':
                return {
                  ...user,
                  status: 'approved',
                  approvedBy: 'admin@transbotai.com',
                  approvedAt: new Date().toISOString(),
                };
              case 'reject':
                return { ...user, status: 'rejected' };
              case 'suspend':
                return { ...user, status: 'suspended' };
              case 'activate':
                return { ...user, status: 'active' };
              default:
                return user;
            }
          }
          return user;
        })
      );
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewUserData = (user: UserData) => {
    setSelectedUserData(user);
    setShowUserDataDetails(true);
  };

  const handleApproveUserData = (user: UserData) => {
    setSelectedUserData(user);
    setShowApprovalModal(true);
  };

  // Status color helper
  const getStatusColor = (status: UserDataStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'under_review':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'active':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400';
      case 'suspended':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  // Render UserData Details Modal
  const renderUserDataDetailsModal = () => {
    if (!selectedUserData) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">UserData Details</h2>
            <button
              onClick={() => setShowUserDataDetails(false)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Company Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Company Information
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Company Name
                  </label>
                  <p className="text-gray-900 dark:text-white">{selectedUserData.companyName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Company Type
                  </label>
                  <p className="text-gray-900 dark:text-white capitalize">
                    {selectedUserData.companyType}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Industry
                  </label>
                  <p className="text-gray-900 dark:text-white">{selectedUserData.industry}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Company Size
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {selectedUserData.companySize} employees
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Website
                  </label>
                  <p className="text-gray-900 dark:text-white">{selectedUserData.website}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Address
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {selectedUserData.address}, {selectedUserData.city}, {selectedUserData.state}{' '}
                    {selectedUserData.zipCode}
                  </p>
                </div>
              </div>
            </div>

            {/* UserData Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                UserData Information
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Name
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {selectedUserData.firstName} {selectedUserData.lastName}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Email
                  </label>
                  <p className="text-gray-900 dark:text-white">{selectedUserData.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Phone
                  </label>
                  <p className="text-gray-900 dark:text-white">{selectedUserData.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Job Title
                  </label>
                  <p className="text-gray-900 dark:text-white">{selectedUserData.jobTitle}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Department
                  </label>
                  <p className="text-gray-900 dark:text-white">{selectedUserData.department}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Primary Role
                  </label>
                  <p className="text-gray-900 dark:text-white capitalize">
                    {selectedUserData.primaryRole.replace('_', ' ')}
                  </p>
                </div>
              </div>
            </div>

            {/* Subscription Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Subscription</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Plan
                  </label>
                  <p className="text-gray-900 dark:text-white capitalize">
                    {selectedUserData.subscriptionType}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Billing Cycle
                  </label>
                  <p className="text-gray-900 dark:text-white capitalize">
                    {selectedUserData.billingCycle}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Payment Method
                  </label>
                  <p className="text-gray-900 dark:text-white capitalize">
                    {selectedUserData.paymentMethod.replace('_', ' ')}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Status
                  </label>
                  <p className="text-gray-900 dark:text-white capitalize">
                    {selectedUserData.subscriptionStatus}
                  </p>
                </div>
              </div>
            </div>

            {/* Usage Statistics */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Usage Statistics
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Logins
                  </label>
                  <p className="text-gray-900 dark:text-white">{selectedUserData.totalLogins}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Loads Created
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {selectedUserData.usageStats.loadsCreated}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Loads Completed
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {selectedUserData.usageStats.loadsCompleted}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Revenue
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    ${selectedUserData.usageStats.revenue.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Active Functions */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Active Functions
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {selectedUserData.activeFunctions.map(func => (
                <span
                  key={func}
                  className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 rounded-full text-sm"
                >
                  {func.replace('_', ' ')}
                </span>
              ))}
            </div>
          </div>

          {/* MCP Agent Information */}
          {selectedUserData.mcpAgentAssigned && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                MCP Agent
              </h3>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-blue-900 dark:text-blue-100">
                      Agent ID: {selectedUserData.mcpAgentId}
                    </p>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Status: <span className="capitalize">{selectedUserData.mcpAgentStatus}</span>
                    </p>
                  </div>
                  <div
                    className={`w-3 h-3 rounded-full ${
                      selectedUserData.mcpAgentStatus === 'active'
                        ? 'bg-green-500'
                        : 'bg-yellow-500'
                    }`}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200 dark:border-slate-700">
            {selectedUserData.status === 'pending' && (
              <>
                <button
                  onClick={() => handleApproveUserData(selectedUserData)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleUserDataAction(selectedUserData.id, 'reject')}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Reject
                </button>
              </>
            )}
            {selectedUserData.status === 'active' && (
              <button
                onClick={() => handleUserDataAction(selectedUserData.id, 'suspend')}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                Suspend
              </button>
            )}
            {selectedUserData.status === 'suspended' && (
              <button
                onClick={() => handleUserDataAction(selectedUserData.id, 'activate')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Activate
              </button>
            )}
            <button
              onClick={() => setShowUserDataDetails(false)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-gray-200 dark:border-slate-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                UserData Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage user registrations and access
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <UserDataPlus className="w-4 h-4 mr-2" />
                Add UserData
              </button>
              <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={filters.search}
                  onChange={e => handleFilterChange('search', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                value={filters.status}
                onChange={e => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="under_review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Role
              </label>
              <select
                value={filters.role}
                onChange={e => handleFilterChange('role', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Roles</option>
                <option value="shipper">Shipper</option>
                <option value="broker">Broker</option>
                <option value="carrier">Carrier</option>
                <option value="owner_operator">Owner Operator</option>
                <option value="driver">Driver</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subscription
              </label>
              <select
                value={filters.subscription}
                onChange={e => handleFilterChange('subscription', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Plans</option>
                <option value="free">Free</option>
                <option value="professional">Professional</option>
                <option value="enterprise">Enterprise</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Company Size
              </label>
              <select
                value={filters.companySize}
                onChange={e => handleFilterChange('companySize', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Sizes</option>
                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
                <option value="51-200">51-200</option>
                <option value="201-1000">201-1000</option>
                <option value="1000+">1000+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date Range
              </label>
              <select
                value={filters.dateRange}
                onChange={e => handleFilterChange('dateRange', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total UserDatas
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{users.length}</p>
              </div>
              <UserDatas className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Pending Approval
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {users.filter(u => u.status === 'pending').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Active UserDatas
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {users.filter(u => u.status === 'active').length}
                </p>
              </div>
              <UserDataCheck className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">MCP Agents</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {users.filter(u => u.mcpAgentAssigned).length}
                </p>
              </div>
              <Shield className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* UserDatas Table */}
      <div className="px-6 py-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
              <thead className="bg-gray-50 dark:bg-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    UserData
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Subscription
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    MCP Agent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Registered
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                {filteredUserDatas.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-slate-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={user.avatar}
                          alt={`${user.firstName} ${user.lastName}`}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {user.companyName}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {user.industry}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900 dark:text-white capitalize">
                        {user.primaryRole.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white capitalize">
                        {user.subscriptionType}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                        {user.billingCycle}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}
                      >
                        {user.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.mcpAgentAssigned ? (
                        <div className="flex items-center">
                          <div
                            className={`w-2 h-2 rounded-full mr-2 ${
                              user.mcpAgentStatus === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                            }`}
                          />
                          <span className="text-sm text-gray-900 dark:text-white">
                            {user.mcpAgentId}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Not Assigned
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(user.registeredAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewUserData(user)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {user.status === 'pending' && (
                          <button
                            onClick={() => handleApproveUserData(user)}
                            className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        {user.status === 'pending' && (
                          <button
                            onClick={() => handleUserDataAction(user.id, 'reject')}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>{showUserDataDetails && renderUserDataDetailsModal()}</AnimatePresence>
    </div>
  );
}

export default UserDataManagement;
