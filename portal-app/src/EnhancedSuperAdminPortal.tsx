import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, Bell, User, LogOut, Settings, Search, Plus, 
  Building2, Users, DollarSign, BarChart3, 
  Shield, Activity, ChevronDown, Menu, X, Home, FileText, Database,
  Globe, Building, UserPlus, CreditCard, AlertTriangle, CheckCircle,
  Eye, Edit, Download, Filter, MoreHorizontal,
  Grid3X3, List, Palette, Moon, Sun, TrendingUp, TrendingDown,
  Zap, Target, Award, Star, Clock, MapPin, Phone, Mail,
  ArrowUpRight, ArrowDownRight, RefreshCw, Play, Pause
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
  growth?: number;
  health?: 'excellent' | 'good' | 'warning' | 'critical';
}

interface EnhancedSuperAdminPortalProps {
  user: User;
  onLogout: () => void;
}

const EnhancedSuperAdminPortal: React.FC<EnhancedSuperAdminPortalProps> = ({ user, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('overview');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeRange, setSelectedTimeRange] = useState('1Y');

  // Enhanced mock data
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
      location: 'New York, NY',
      growth: 12.5,
      health: 'excellent'
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
      location: 'Los Angeles, CA',
      growth: 8.2,
      health: 'good'
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
      location: 'Chicago, IL',
      growth: 0,
      health: 'warning'
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
      location: 'Miami, FL',
      growth: 15.8,
      health: 'excellent'
    }
  ];

  const menuItems = [
    { 
      id: 'overview', 
      label: 'Dashboard', 
      icon: Home, 
      color: 'text-blue-600',
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Platform overview & analytics'
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
      label: 'Portals', 
      icon: Globe, 
      color: 'text-purple-600',
      gradient: 'from-purple-500 to-pink-500',
      description: 'Portal configuration'
    },
    { 
      id: 'users', 
      label: 'Users', 
      icon: Users, 
      color: 'text-orange-600',
      gradient: 'from-orange-500 to-red-500',
      description: 'User management'
    },
    { 
      id: 'billing', 
      label: 'Billing', 
      icon: CreditCard, 
      color: 'text-emerald-600',
      gradient: 'from-emerald-500 to-teal-500',
      description: 'Revenue & subscriptions'
    },
    { 
      id: 'analytics', 
      label: 'Analytics', 
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
      description: 'Generate reports'
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: Settings, 
      color: 'text-gray-600',
      gradient: 'from-gray-500 to-slate-500',
      description: 'System configuration'
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
    <div className="space-y-8 responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
          <div>
            <h2 className="text-3xl font-bold mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Good Morning, {user.name}!</h2>
            <p className="text-blue-100 text-lg responsive-container sm:flex-col md:flex-row lg:grid">Here's what's happening with your platform today.</p>
          </div>
          <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="text-right responsive-container sm:flex-col md:flex-row lg:grid">
              <p className="text-sm text-blue-100 responsive-container sm:flex-col md:flex-row lg:grid">Current Date</p>
              <p className="text-lg font-semibold responsive-container sm:flex-col md:flex-row lg:grid">{new Date().toLocaleDateString()}</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
              <Bot className="w-8 h-8 responsive-container sm:flex-col md:flex-row lg:grid" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
        {[
          {
            title: 'Total Companies',
            value: companies.length,
            change: '+2 this month',
            changeType: 'positive',
            icon: Building2,
            gradient: 'from-blue-500 to-cyan-500',
            bgGradient: 'from-blue-50 to-cyan-50',
            link: 'View all companies'
          },
          {
            title: 'Total Users',
            value: companies.reduce((sum, c) => sum + c.users, 0),
            change: '+15 this month',
            changeType: 'positive',
            icon: Users,
            gradient: 'from-green-500 to-emerald-500',
            bgGradient: 'from-green-50 to-emerald-50',
            link: 'See details'
          },
          {
            title: 'Monthly Revenue',
            value: `$${companies.reduce((sum, c) => sum + c.revenue, 0).toLocaleString()}`,
            change: '+12% from last month',
            changeType: 'positive',
            icon: DollarSign,
            gradient: 'from-purple-500 to-pink-500',
            bgGradient: 'from-purple-50 to-pink-50',
            link: 'View net earnings'
          },
          {
            title: 'Active Portals',
            value: '24',
            change: 'All systems operational',
            changeType: 'neutral',
            icon: Globe,
            gradient: 'from-orange-500 to-red-500',
            bgGradient: 'from-orange-50 to-red-50',
            link: 'Monitor status'
          }
        ].map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gradient-to-br ${metric.bgGradient} p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer`}
          >
            <div className="flex items-center justify-between mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="flex-1 responsive-container sm:flex-col md:flex-row lg:grid">
                <p className="text-sm font-medium text-gray-600 mb-1 responsive-container sm:flex-col md:flex-row lg:grid">{metric.title}</p>
                <p className="text-3xl font-bold text-gray-900 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">{metric.value}</p>
                <p className={`text-sm ${
                  metric.changeType === 'positive' ? 'text-green-600' :
                  metric.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {metric.change}
                </p>
              </div>
              <div className={`bg-gradient-to-r ${metric.gradient} p-4 rounded-xl shadow-lg`}>
                <metric.icon className="w-8 h-8 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
              </div>
            </div>
            <div className="pt-4 border-t border-white/20 responsive-container sm:flex-col md:flex-row lg:grid">
              <a href="#" className="text-sm text-blue-600 hover:text-blue-800 font-medium responsive-container sm:flex-col md:flex-row lg:grid">
                {metric.link} →
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Revenue Chart Section */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <h3 className="text-2xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">Platform Revenue</h3>
              <p className="text-blue-100 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">Monthly revenue breakdown and trends</p>
            </div>
            <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
              {['ALL', '1M', '6M', '1Y'].map((period) => (
                <button
                  key={period}
                  onClick={() = aria-label="Button"> setSelectedTimeRange(period)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedTimeRange === period
                      ? 'bg-white text-blue-600'
                      : 'text-blue-100 hover:bg-white/20'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid">
          {/* Mock Chart Data */}
          <div className="grid grid-cols-4 gap-6 mb-8 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
              <p className="text-2xl font-bold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">7,585</p>
              <p className="text-sm text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Orders</p>
            </div>
            <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
              <p className="text-2xl font-bold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">$22.89k</p>
              <p className="text-sm text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Earnings</p>
            </div>
            <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
              <p className="text-2xl font-bold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">367</p>
              <p className="text-sm text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Refunds</p>
            </div>
            <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
              <p className="text-2xl font-bold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">18.92%</p>
              <p className="text-sm text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Conversion</p>
            </div>
          </div>

          {/* Mock Chart */}
          <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
              <BarChart3 className="w-16 h-16 text-blue-400 mx-auto mb-4 responsive-container sm:flex-col md:flex-row lg:grid" />
              <p className="text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Interactive Revenue Chart</p>
              <p className="text-sm text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">Chart visualization would be here</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden responsive-container sm:flex-col md:flex-row lg:grid"
      >
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <h3 className="text-2xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">Recent Platform Activity</h3>
          <p className="text-green-100 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">Latest updates across all companies</p>
        </div>
        <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
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
                className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <div className={`p-3 rounded-xl ${activity.color}`}>
                  <activity.icon className="w-6 h-6 responsive-container sm:flex-col md:flex-row lg:grid" />
                </div>
                <div className="flex-1 responsive-container sm:flex-col md:flex-row lg:grid">
                  <p className="font-semibold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{activity.title}</p>
                  <p className="text-sm text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">{activity.description}</p>
                </div>
                <div className="text-right responsive-container sm:flex-col md:flex-row lg:grid">
                  <p className="text-sm text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderCompanies = () => (
    <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Enhanced Companies Header */}
      <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">Company Management</h2>
          <p className="text-gray-600 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">Manage all companies using the Trans Bot AI platform</p>
        </div>
        <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
          <button
            onClick={() = aria-label="Button"> setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
          >
            {viewMode === 'grid' ? <List className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" /> : <Grid3X3 className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />}
          </button>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
            <Plus className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
            <span>Add Company</span>
          </button>
        </div>
      </div>

      {/* Enhanced Search and Filters */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex-1 relative responsive-container sm:flex-col md:flex-row lg:grid">
            <input
              type="text"
              placeholder="Search companies, subdomains, industries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 responsive-container sm:flex-col md:flex-row lg:grid"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
          </div>
          <button className="p-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
            <Filter className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
          </button>
          <button className="p-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
            <Download className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
          </button>
        </div>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
        {filteredCompanies.map((company, index) => (
          <motion.div
            key={company.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                    <Building2 className="w-6 h-6 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">{company.name}</h3>
                    <p className="text-blue-100 text-sm responsive-container sm:flex-col md:flex-row lg:grid">{company.subdomain}.transbotai.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <span className={`px-3 py-1 text-xs rounded-full ${
                    company.status === 'active' ? 'bg-green-500 text-white' :
                    company.status === 'trial' ? 'bg-yellow-500 text-white' :
                    'bg-red-500 text-white'
                  }`}>
                    {company.status}
                  </span>
                  <div className={`w-3 h-3 rounded-full ${
                    company.health === 'excellent' ? 'bg-green-400' :
                    company.health === 'good' ? 'bg-blue-400' :
                    company.health === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
                  }`}></div>
                </div>
              </div>
            </div>
            
            <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                  <span className="text-sm text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Plan</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    company.plan === 'enterprise' ? 'bg-purple-100 text-purple-800' :
                    company.plan === 'professional' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {company.plan}
                  </span>
                </div>
                
                <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                  <span className="text-sm text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Users</span>
                  <span className="font-semibold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{company.users}</span>
                </div>
                
                <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                  <span className="text-sm text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Revenue</span>
                  <span className="font-semibold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">${company.revenue.toLocaleString()}/mo</span>
                </div>
                
                <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                  <span className="text-sm text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Growth</span>
                  <span className={`font-semibold ${company.growth > 0 ? 'text-green-600' : 'text-gray-600'}`}>
                    {company.growth > 0 ? '+' : ''}{company.growth}%
                  </span>
                </div>
                
                <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                  <span className="text-sm text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Industry</span>
                  <span className="text-sm text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{company.industry}</span>
                </div>
                
                <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                  <span className="text-sm text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Location</span>
                  <span className="text-sm text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{company.location}</span>
                </div>
                
                <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                  <span className="text-sm text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Last Activity</span>
                  <span className="text-sm text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">{company.lastActivity}</span>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                  <span className="text-sm text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Active Portals</span>
                  <span className="text-sm font-medium text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{company.portals.length}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  {company.portals.slice(0, 3).map((portal) => (
                    <span key={portal} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded responsive-container sm:flex-col md:flex-row lg:grid">
                      {portal}
                    </span>
                  ))}
                  {company.portals.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded responsive-container sm:flex-col md:flex-row lg:grid">
                      +{company.portals.length - 3}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="mt-6 flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <button className="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                  <Eye className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                  <span>View</span>
                </button>
                <button className="flex-1 bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors flex items-center justify-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                  <Edit className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                  <span>Edit</span>
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                  <MoreHorizontal className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeMenu) {
      case 'overview':
        return renderOverview();
      case 'companies':
        return renderCompanies();
      case 'portals':
        return <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid"><h2 className="text-2xl font-bold responsive-container sm:flex-col md:flex-row lg:grid">Portal Management</h2></div>;
      case 'users':
        return <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid"><h2 className="text-2xl font-bold responsive-container sm:flex-col md:flex-row lg:grid">User Management</h2></div>;
      case 'billing':
        return <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid"><h2 className="text-2xl font-bold responsive-container sm:flex-col md:flex-row lg:grid">Billing & Plans</h2></div>;
      case 'analytics':
        return <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid"><h2 className="text-2xl font-bold responsive-container sm:flex-col md:flex-row lg:grid">Platform Analytics</h2></div>;
      case 'reports':
        return <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid"><h2 className="text-2xl font-bold responsive-container sm:flex-col md:flex-row lg:grid">Reports</h2></div>;
      case 'settings':
        return <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid"><h2 className="text-2xl font-bold responsive-container sm:flex-col md:flex-row lg:grid">System Settings</h2></div>;
      default:
        return renderOverview();
    }
  };

  return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'}`}>
      {/* Enhanced Top Header */}
      <header className="bg-white shadow-xl border-b border-gray-200 fixed top-0 left-0 right-0 z-50 h-20 responsive-container sm:flex-col md:flex-row lg:grid" style={{ display: 'block', visibility: 'visible', opacity: 1, backgroundColor: '#ffffff' }}>
        <div className="flex items-center justify-between px-6 py-4 responsive-container sm:flex-col md:flex-row lg:grid">
          {/* Left side - Logo and Menu Toggle */}
          <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <button
              onClick={() = aria-label="Button"> setSidebarOpen(!sidebarOpen)}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-200 border border-gray-200 responsive-container sm:flex-col md:flex-row lg:grid"
              style={{ backgroundColor: '#f9fafb', color: '#374151' }}
            >
              {sidebarOpen ? <X className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" /> : <Menu className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />}
            </button>
            
            <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-2xl shadow-lg responsive-container sm:flex-col md:flex-row lg:grid">
                <Bot className="w-7 h-7 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid" style={{ color: '#1f2937' }}>Trans Bot AI</h1>
                <p className="text-sm text-gray-500 font-medium responsive-container sm:flex-col md:flex-row lg:grid" style={{ color: '#6b7280' }}>Super Admin Portal</p>
              </div>
            </div>
          </div>

          {/* Center - Enhanced Search Bar */}
          <div className="flex-1 max-w-2xl mx-8 hidden md:block responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="relative responsive-container sm:flex-col md:flex-row lg:grid">
              <input
                type="text"
                placeholder="Search companies, users, portals, analytics..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 shadow-lg responsive-container sm:flex-col md:flex-row lg:grid"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 responsive-container sm:flex-col md:flex-row lg:grid">
                <kbd className="px-2 py-1 text-xs bg-gray-100 text-gray-500 rounded responsive-container sm:flex-col md:flex-row lg:grid">⌘K</kbd>
              </div>
            </div>
          </div>

          {/* Right side - Actions and Profile */}
          <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
            {/* Theme Toggle */}
            <button
              onClick={() = aria-label="Button"> setDarkMode(!darkMode)}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-200 responsive-container sm:flex-col md:flex-row lg:grid"
            >
              {darkMode ? <Sun className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" /> : <Moon className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />}
            </button>

            {/* Quick Sign Out Button */}
            <button
              onClick={onLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition-colors flex items-center space-x-2 shadow-lg responsive-container sm:flex-col md:flex-row lg:grid"
             aria-label="Button">
              <LogOut className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
              <span>Sign Out</span>
            </button>

            {/* Notifications */}
            <div className="relative responsive-container sm:flex-col md:flex-row lg:grid">
              <button
                onClick={() = aria-label="Button"> setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-200 responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <Bell className="w-6 h-6 responsive-container sm:flex-col md:flex-row lg:grid" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center shadow-lg responsive-container sm:flex-col md:flex-row lg:grid">
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
                    className="absolute right-0 mt-2 w-96 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 z-50 responsive-container sm:flex-col md:flex-row lg:grid"
                  >
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-t-2xl responsive-container sm:flex-col md:flex-row lg:grid">
                      <h3 className="text-lg font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">Platform Notifications</h3>
                      <p className="text-blue-100 text-sm responsive-container sm:flex-col md:flex-row lg:grid">Latest updates and alerts</p>
                    </div>
                    <div className="max-h-80 overflow-y-auto responsive-container sm:flex-col md:flex-row lg:grid">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors responsive-container sm:flex-col md:flex-row lg:grid">
                          <div className="flex items-start space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                            <div className={`p-2 rounded-xl ${
                              notification.type === 'success' ? 'bg-green-100 text-green-600' :
                              notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600' : 
                              'bg-blue-100 text-blue-600'
                            }`}>
                              <notification.icon className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                            </div>
                            <div className="flex-1 responsive-container sm:flex-col md:flex-row lg:grid">
                              <p className="text-sm font-semibold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{notification.title}</p>
                              <p className="text-sm text-gray-600 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-2 responsive-container sm:flex-col md:flex-row lg:grid">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 bg-gray-50 rounded-b-2xl responsive-container sm:flex-col md:flex-row lg:grid">
                      <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                        View All Notifications
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Enhanced Profile Dropdown */}
            <div className="relative responsive-container sm:flex-col md:flex-row lg:grid">
              <button
                onClick={() = aria-label="Button"> setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 px-4 py-2 rounded-xl hover:bg-gray-100 transition-all duration-200 responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <div className="text-right responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="text-sm font-semibold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{user.name}</div>
                  <div className="text-xs text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">Super Admin</div>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg responsive-container sm:flex-col md:flex-row lg:grid">
                  <span className="text-white text-sm font-bold responsive-container sm:flex-col md:flex-row lg:grid">
                    {user.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
              </button>

              {/* Enhanced Profile Dropdown Menu */}
              <AnimatePresence>
                {showProfileDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 z-50 responsive-container sm:flex-col md:flex-row lg:grid"
                  >
                    <div className="p-4 border-b border-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                          <span className="text-white font-bold responsive-container sm:flex-col md:flex-row lg:grid">
                            {user.name?.charAt(0) || 'U'}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{user.name}</p>
                          <p className="text-sm text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">Super Administrator</p>
                        </div>
                      </div>
                    </div>
                    <div className="py-2 responsive-container sm:flex-col md:flex-row lg:grid">
                      <a href="#" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors responsive-container sm:flex-col md:flex-row lg:grid">
                        <User className="w-4 h-4 mr-3 responsive-container sm:flex-col md:flex-row lg:grid" />
                        Profile Settings
                      </a>
                      <a href="#" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors responsive-container sm:flex-col md:flex-row lg:grid">
                        <Settings className="w-4 h-4 mr-3 responsive-container sm:flex-col md:flex-row lg:grid" />
                        System Settings
                      </a>
                      <a href="#" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors responsive-container sm:flex-col md:flex-row lg:grid">
                        <Shield className="w-4 h-4 mr-3 responsive-container sm:flex-col md:flex-row lg:grid" />
                        Security & Access
                      </a>
                      <a href="#" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors responsive-container sm:flex-col md:flex-row lg:grid">
                        <Palette className="w-4 h-4 mr-3 responsive-container sm:flex-col md:flex-row lg:grid" />
                        Appearance
                      </a>
                      <hr className="my-2 responsive-container sm:flex-col md:flex-row lg:grid" />
                      <button
                        onClick={onLogout}
                        className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                       aria-label="Button">
                        <LogOut className="w-4 h-4 mr-3 responsive-container sm:flex-col md:flex-row lg:grid" />
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

      <div className="flex pt-20 responsive-container sm:flex-col md:flex-row lg:grid">
        {/* Enhanced Sidebar */}
        <motion.aside
          initial={false}
          animate={{ width: sidebarOpen ? 280 : 0 }}
          className={`${darkMode ? 'bg-gray-800' : 'bg-white/90 backdrop-blur-md'} shadow-2xl min-h-screen fixed left-0 top-20 z-40 overflow-hidden border-r border-white/20`}
        >
          <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid">
            {/* Enhanced Main Navigation */}
            <nav className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
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
                  <div className="flex-1 text-left responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="font-semibold responsive-container sm:flex-col md:flex-row lg:grid">{item.label}</div>
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
            <div className="mt-8 pt-6 border-t border-gray-200 responsive-container sm:flex-col md:flex-row lg:grid">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Quick Actions</h3>
              <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={index}
                    onClick={action.action}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200 responsive-container sm:flex-col md:flex-row lg:grid"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`w-10 h-10 ${action.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <action.icon className="w-5 h-5 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
                    </div>
                    <span className="font-medium responsive-container sm:flex-col md:flex-row lg:grid">{action.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Enhanced System Status */}
            <div className="mt-8 pt-6 border-t border-gray-200 responsive-container sm:flex-col md:flex-row lg:grid">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Platform Status</h3>
              <div className="space-y-3 responsive-container sm:flex-col md:flex-row lg:grid">
                {[
                  { label: 'All Systems', status: 'operational', color: 'green' },
                  { label: 'Database', status: 'healthy', color: 'green' },
                  { label: 'API Services', status: 'running', color: 'green' },
                  { label: 'CDN', status: 'optimal', color: 'green' }
                ].map((system, index) => (
                  <div key={index} className="flex items-center justify-between px-4 py-3 bg-green-50 rounded-xl responsive-container sm:flex-col md:flex-row lg:grid">
                    <span className="text-sm font-medium text-green-700 responsive-container sm:flex-col md:flex-row lg:grid">{system.label}</span>
                    <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse responsive-container sm:flex-col md:flex-row lg:grid"></div>
                      <span className="text-xs text-green-600 responsive-container sm:flex-col md:flex-row lg:grid">{system.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.aside>

        {/* Enhanced Main Content */}
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-70' : 'ml-0'}`}>
          <div className="p-8 responsive-container sm:flex-col md:flex-row lg:grid">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Enhanced Floating Action Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6 }}
        className="fixed bottom-8 right-8 z-50 responsive-container sm:flex-col md:flex-row lg:grid"
      >
        <motion.button
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-200 responsive-container sm:flex-col md:flex-row lg:grid"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <Plus className="w-6 h-6 responsive-container sm:flex-col md:flex-row lg:grid" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default EnhancedSuperAdminPortal;
