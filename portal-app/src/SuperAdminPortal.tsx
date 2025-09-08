import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, Bell, User, LogOut, Settings, Search, Plus, 
  Building2, Users, DollarSign, BarChart3, 
  Shield, Activity, ChevronDown, Menu, X, Home, FileText, Database,
  Globe, Building, UserPlus, CreditCard, AlertTriangle, CheckCircle,
  Eye, Edit, Download, Filter, MoreHorizontal,
  Grid3X3, List, Palette, Moon, Sun
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  company?: string;
  avatar?: string;
  permissions?: string[];
  subdomain?: string;
  isActive?: boolean;
  lastLogin?: string;
  createdAt?: string;
}

interface Company {
  id: string;
  name: string;
  subdomain: string;
  plan: 'basic' | 'professional' | 'enterprise';
  status: 'active' | 'suspended' | 'trial';
  users: number;
  portals: string[];
  revenue: number;
  createdAt: string;
  lastActivity: string;
  logo?: string;
  industry?: string;
  location?: string;
}

interface SuperAdminPortalProps {
  user: User;
  onLogout: () => void;
}

const SuperAdminPortal: React.FC<SuperAdminPortalProps> = ({ user, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('overview');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for companies
  const companies: Company[] = [
    {
      id: '1',
      name: 'ABC Logistics',
      subdomain: 'abc-logistics',
      plan: 'enterprise',
      status: 'active',
      users: 45,
      portals: ['broker', 'carrier', 'shipper', 'analytics', 'crm'],
      revenue: 12500,
      createdAt: '2024-01-15',
      lastActivity: '2 hours ago',
      industry: 'Logistics',
      location: 'New York, NY'
    },
    {
      id: '2',
      name: 'XYZ Transport',
      subdomain: 'xyz-transport',
      plan: 'professional',
      status: 'active',
      users: 23,
      portals: ['carrier', 'driver', 'factoring'],
      revenue: 8500,
      createdAt: '2024-02-20',
      lastActivity: '1 day ago',
      industry: 'Transportation',
      location: 'Los Angeles, CA'
    },
    {
      id: '3',
      name: 'Global Freight Solutions',
      subdomain: 'global-freight',
      plan: 'basic',
      status: 'trial',
      users: 8,
      portals: ['broker', 'load-board'],
      revenue: 0,
      createdAt: '2024-03-10',
      lastActivity: '3 days ago',
      industry: 'Freight',
      location: 'Chicago, IL'
    },
    {
      id: '4',
      name: 'Premium Shipping Co',
      subdomain: 'premium-shipping',
      plan: 'enterprise',
      status: 'active',
      users: 67,
      portals: ['broker', 'carrier', 'shipper', 'analytics', 'crm', 'financials'],
      revenue: 18900,
      createdAt: '2024-01-05',
      lastActivity: '30 min ago',
      industry: 'Shipping',
      location: 'Miami, FL'
    }
  ];

  const menuItems = [
    { 
      id: 'overview', 
      label: 'Platform Overview', 
      icon: Home, 
      color: 'text-blue-600',
      gradient: 'from-blue-500 to-cyan-500',
      description: 'System-wide metrics and analytics'
    },
    { 
      id: 'companies', 
      label: 'Companies', 
      icon: Building2, 
      color: 'text-green-600',
      gradient: 'from-green-500 to-emerald-500',
      description: 'Manage client companies'
    },
    { 
      id: 'portals', 
      label: 'Portal Management', 
      icon: Globe, 
      color: 'text-purple-600',
      gradient: 'from-purple-500 to-pink-500',
      description: 'Configure portal access'
    },
    { 
      id: 'users', 
      label: 'User Management', 
      icon: Users, 
      color: 'text-orange-600',
      gradient: 'from-orange-500 to-red-500',
      description: 'Cross-company user admin'
    },
    { 
      id: 'billing', 
      label: 'Billing & Plans', 
      icon: CreditCard, 
      color: 'text-emerald-600',
      gradient: 'from-emerald-500 to-teal-500',
      description: 'Subscription management'
    },
    { 
      id: 'analytics', 
      label: 'Platform Analytics', 
      icon: BarChart3, 
      color: 'text-indigo-600',
      gradient: 'from-indigo-500 to-purple-500',
      description: 'Advanced reporting'
    },
    { 
      id: 'reports', 
      label: 'Reports', 
      icon: FileText, 
      color: 'text-cyan-600',
      gradient: 'from-cyan-500 to-blue-500',
      description: 'Generate system reports'
    },
    { 
      id: 'settings', 
      label: 'System Settings', 
      icon: Settings, 
      color: 'text-gray-600',
      gradient: 'from-gray-500 to-slate-500',
      description: 'Global configuration'
    },
  ];

  const quickActions = [
    { 
      label: 'Add Company', 
      icon: Building, 
      color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      action: () => console.log('Add Company')
    },
    { 
      label: 'Create User', 
      icon: UserPlus, 
      color: 'bg-gradient-to-r from-green-500 to-emerald-500',
      action: () => console.log('Create User')
    },
    { 
      label: 'Generate Report', 
      icon: FileText, 
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      action: () => console.log('Generate Report')
    },
    { 
      label: 'System Backup', 
      icon: Database, 
      color: 'bg-gradient-to-r from-orange-500 to-red-500',
      action: () => console.log('System Backup')
    },
  ];

  const notifications = [
    { 
      id: 1, 
      title: 'New company registered', 
      message: 'Global Freight Solutions signed up for trial', 
      time: '5 min ago', 
      type: 'info',
      icon: Building2
    },
    { 
      id: 2, 
      title: 'Payment overdue', 
      message: 'XYZ Transport payment is 3 days overdue', 
      time: '1 hour ago', 
      type: 'warning',
      icon: AlertTriangle
    },
    { 
      id: 3, 
      title: 'System maintenance', 
      message: 'Scheduled maintenance completed successfully', 
      time: '2 hours ago', 
      type: 'success',
      icon: CheckCircle
    },
    { 
      id: 4, 
      title: 'High usage alert', 
      message: 'Premium Shipping Co approaching API limits', 
      time: '3 hours ago', 
      type: 'warning',
      icon: Activity
    },
  ];

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.subdomain.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.industry?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Temporary Sign Out Button - Prominent */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-red-800">Quick Sign Out</h3>
            <p className="text-sm text-red-600">Click here to sign out immediately</p>
          </div>
          <button
            onClick={onLogout}
            className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-colors flex items-center space-x-2 shadow-lg"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Enhanced KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Companies',
            value: companies.length,
            change: '+2 this month',
            changeType: 'positive',
            icon: Building2,
            gradient: 'from-blue-500 to-cyan-500',
            bgGradient: 'from-blue-50 to-cyan-50'
          },
          {
            title: 'Total Users',
            value: companies.reduce((sum, c) => sum + c.users, 0),
            change: '+15 this month',
            changeType: 'positive',
            icon: Users,
            gradient: 'from-green-500 to-emerald-500',
            bgGradient: 'from-green-50 to-emerald-50'
          },
          {
            title: 'Monthly Revenue',
            value: `$${companies.reduce((sum, c) => sum + c.revenue, 0).toLocaleString()}`,
            change: '+12% from last month',
            changeType: 'positive',
            icon: DollarSign,
            gradient: 'from-purple-500 to-pink-500',
            bgGradient: 'from-purple-50 to-pink-50'
          },
          {
            title: 'Active Portals',
            value: '24',
            change: 'All systems operational',
            changeType: 'neutral',
            icon: Globe,
            gradient: 'from-orange-500 to-red-500',
            bgGradient: 'from-orange-50 to-red-50'
          }
        ].map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gradient-to-br ${metric.bgGradient} p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
                <p className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</p>
                <p className={`text-sm ${
                  metric.changeType === 'positive' ? 'text-green-600' :
                  metric.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {metric.change}
                </p>
              </div>
              <div className={`bg-gradient-to-r ${metric.gradient} p-4 rounded-xl shadow-lg`}>
                <metric.icon className="w-8 h-8 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity with Enhanced Design */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden"
      >
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <h3 className="text-xl font-bold text-white">Recent Platform Activity</h3>
          <p className="text-blue-100 mt-1">Latest updates across all companies</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              {
                icon: Building2,
                title: 'New company registered',
                description: 'Global Freight Solutions signed up for trial',
                time: '5 min ago',
                color: 'bg-blue-100 text-blue-600'
              },
              {
                icon: Users,
                title: 'User activity spike',
                description: 'ABC Logistics had 150% increase in user activity',
                time: '1 hour ago',
                color: 'bg-green-100 text-green-600'
              },
              {
                icon: DollarSign,
                title: 'Payment received',
                description: 'Premium Shipping Co paid $18,900 monthly fee',
                time: '2 hours ago',
                color: 'bg-purple-100 text-purple-600'
              },
              {
                icon: Activity,
                title: 'System optimization',
                description: 'Database performance improved by 25%',
                time: '3 hours ago',
                color: 'bg-orange-100 text-orange-600'
              }
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className={`p-3 rounded-xl ${activity.color}`}>
                  <activity.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderCompanies = () => (
    <div className="space-y-6">
      {/* Enhanced Companies Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Company Management</h2>
          <p className="text-gray-600 mt-1">Manage all companies using the Trans Bot AI platform</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {viewMode === 'grid' ? <List className="w-5 h-5" /> : <Grid3X3 className="w-5 h-5" />}
          </button>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Add Company</span>
          </button>
        </div>
      </div>

      {/* Enhanced Search and Filters */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search companies, subdomains, industries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          <button className="p-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors">
            <Filter className="w-5 h-5" />
          </button>
          <button className="p-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Companies Grid/List View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company, index) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{company.name}</h3>
                      <p className="text-blue-100 text-sm">{company.subdomain}.transbotai.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 text-xs rounded-full ${
                      company.status === 'active' ? 'bg-green-500 text-white' :
                      company.status === 'trial' ? 'bg-yellow-500 text-white' :
                      'bg-red-500 text-white'
                    }`}>
                      {company.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Plan</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      company.plan === 'enterprise' ? 'bg-purple-100 text-purple-800' :
                      company.plan === 'professional' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {company.plan}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Users</span>
                    <span className="font-semibold text-gray-900">{company.users}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Revenue</span>
                    <span className="font-semibold text-gray-900">${company.revenue.toLocaleString()}/mo</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Industry</span>
                    <span className="text-sm text-gray-900">{company.industry}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Location</span>
                    <span className="text-sm text-gray-900">{company.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Last Activity</span>
                    <span className="text-sm text-gray-500">{company.lastActivity}</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Active Portals</span>
                    <span className="text-sm font-medium text-gray-900">{company.portals.length}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {company.portals.slice(0, 3).map((portal) => (
                      <span key={portal} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                        {portal}
                      </span>
                    ))}
                    {company.portals.length > 3 && (
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                        +{company.portals.length - 3}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="mt-6 flex items-center space-x-2">
                  <button className="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button>
                  <button className="flex-1 bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors flex items-center justify-center space-x-2">
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        // List view implementation would go here
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
          <div className="p-6">
            <p className="text-gray-600">List view implementation coming soon...</p>
          </div>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeMenu) {
      case 'overview':
        return renderOverview();
      case 'companies':
        return renderCompanies();
      case 'portals':
        return <div className="p-6"><h2 className="text-2xl font-bold">Portal Management</h2></div>;
      case 'users':
        return <div className="p-6"><h2 className="text-2xl font-bold">User Management</h2></div>;
      case 'billing':
        return <div className="p-6"><h2 className="text-2xl font-bold">Billing & Plans</h2></div>;
      case 'analytics':
        return <div className="p-6"><h2 className="text-2xl font-bold">Platform Analytics</h2></div>;
      case 'reports':
        return <div className="p-6"><h2 className="text-2xl font-bold">Reports</h2></div>;
      case 'settings':
        return <div className="p-6"><h2 className="text-2xl font-bold">System Settings</h2></div>;
      default:
        return renderOverview();
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'}`}>
      {/* Enhanced Top Header */}
      <header className={`${darkMode ? 'bg-gray-800' : 'bg-white/80 backdrop-blur-md'} shadow-xl border-b border-white/20 fixed top-0 left-0 right-0 z-50`}>
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left side - Logo and Menu Toggle */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-200"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-2xl shadow-lg">
                <Bot className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Trans Bot AI</h1>
                <p className="text-sm text-gray-500 font-medium">Super Admin Portal</p>
              </div>
            </div>
          </div>

          {/* Center - Enhanced Search Bar */}
          <div className="flex-1 max-w-2xl mx-8 hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search companies, users, portals, analytics..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm shadow-lg"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <kbd className="px-2 py-1 text-xs bg-gray-100 text-gray-500 rounded">⌘K</kbd>
              </div>
            </div>
          </div>

          {/* Right side - Actions and Profile */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-200"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-200"
              >
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center shadow-lg">
                  {notifications.length}
                </span>
              </button>

              {/* Enhanced Notifications Dropdown */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-96 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 z-50"
                  >
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-t-2xl">
                      <h3 className="text-lg font-bold text-white">Platform Notifications</h3>
                      <p className="text-blue-100 text-sm">Latest updates and alerts</p>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-xl ${
                              notification.type === 'success' ? 'bg-green-100 text-green-600' :
                              notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600' : 
                              'bg-blue-100 text-blue-600'
                            }`}>
                              <notification.icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-gray-900">{notification.title}</p>
                              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 bg-gray-50 rounded-b-2xl">
                      <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium">
                        View All Notifications
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Enhanced Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 px-4 py-2 rounded-xl hover:bg-gray-100 transition-all duration-200"
              >
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                  <div className="text-xs text-gray-500">Super Admin</div>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-bold">
                    {user.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {/* Enhanced Profile Dropdown Menu */}
              <AnimatePresence>
                {showProfileDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 z-50"
                  >
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                          <span className="text-white font-bold">
                            {user.name?.charAt(0) || 'U'}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">Super Administrator</p>
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
                      <a href="#" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <User className="w-4 h-4 mr-3" />
                        Profile Settings
                      </a>
                      <a href="#" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <Settings className="w-4 h-4 mr-3" />
                        System Settings
                      </a>
                      <a href="#" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <Shield className="w-4 h-4 mr-3" />
                        Security & Access
                      </a>
                      <a href="#" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                        <Palette className="w-4 h-4 mr-3" />
                        Appearance
                      </a>
                      <hr className="my-2" />
                      <button
                        onClick={onLogout}
                        className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-20">
        {/* Enhanced Sidebar */}
        <motion.aside
          initial={false}
          animate={{ width: sidebarOpen ? 320 : 0 }}
          className={`${darkMode ? 'bg-gray-800' : 'bg-white/80 backdrop-blur-md'} shadow-2xl min-h-screen fixed left-0 top-20 z-40 overflow-hidden border-r border-white/20`}
        >
          <div className="p-6">
            {/* Enhanced Main Navigation */}
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full flex items-center space-x-4 px-4 py-4 rounded-2xl transition-all duration-200 ${
                    activeMenu === item.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100 hover:shadow-md'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`p-2 rounded-xl ${
                    activeMenu === item.id 
                      ? 'bg-white/20' 
                      : `bg-gradient-to-r ${item.gradient}`
                  }`}>
                    <item.icon className={`w-5 h-5 ${
                      activeMenu === item.id ? 'text-white' : 'text-white'
                    }`} />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold">{item.label}</div>
                    <div className={`text-xs ${
                      activeMenu === item.id ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {item.description}
                    </div>
                  </div>
                </motion.button>
              ))}
            </nav>

            {/* Enhanced Quick Actions */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={index}
                    onClick={action.action}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`w-10 h-10 ${action.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium">{action.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Enhanced System Status */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Platform Status</h3>
              <div className="space-y-3">
                {[
                  { label: 'All Systems', status: 'operational', color: 'green' },
                  { label: 'Database', status: 'healthy', color: 'green' },
                  { label: 'API Services', status: 'running', color: 'green' },
                  { label: 'CDN', status: 'optimal', color: 'green' }
                ].map((system, index) => (
                  <div key={index} className="flex items-center justify-between px-4 py-3 bg-green-50 rounded-xl">
                    <span className="text-sm font-medium text-green-700">{system.label}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-600">{system.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.aside>

        {/* Enhanced Main Content */}
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-320' : 'ml-0'}`}>
          <div className="p-8">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Enhanced Floating Action Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <motion.button
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-200"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <Plus className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default SuperAdminPortal;
