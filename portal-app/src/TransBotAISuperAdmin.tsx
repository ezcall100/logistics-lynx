import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, Bell, User, LogOut, Settings, Search, Plus, 
  Building2, Users, DollarSign, BarChart3, 
  Shield, Activity, ChevronDown, Menu, X, Home, FileText, Database,
  Globe, Building, UserPlus, CreditCard, AlertTriangle, CheckCircle,
  Eye, Edit, Download, Filter, MoreHorizontal,
  Grid3X3, List, Palette, Moon, Sun, TrendingUp, TrendingDown,
  Zap, Target, Award, Star, Clock, MapPin, Phone, Mail,
  ArrowUpRight, ArrowDownRight, RefreshCw, Play, Pause,
  ChevronRight, ChevronLeft, Calendar, Flag, ShoppingBag,
  Maximize2, Minimize2, Layout, Monitor, Smartphone, LogIn, Key,
  Cpu, Network, HardDrive, Wifi, Battery, Thermometer,
  Rocket, Brain, CircuitBoard, Database2, Cloud, Server
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
  aiScore?: number;
  automation?: number;
}

interface TransBotAISuperAdminProps {
  user: User;
  onLogout: () => void;
}

const TransBotAISuperAdmin: React.FC<TransBotAISuperAdminProps> = ({ user, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('ai-dashboard');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeRange, setSelectedTimeRange] = useState('7D');
  const [aiMode, setAiMode] = useState<'autonomous' | 'assisted' | 'manual'>('autonomous');

  // Enhanced mock data with AI features
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
      health: 'excellent',
      aiScore: 94,
      automation: 87
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
      health: 'good',
      aiScore: 78,
      automation: 65
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
      health: 'warning',
      aiScore: 45,
      automation: 23
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
      health: 'excellent',
      aiScore: 96,
      automation: 92
    }
  ];

  const aiMenuItems = [
    { 
      id: 'ai-dashboard', 
      label: 'AI Command Center', 
      icon: Brain, 
      color: 'text-cyan-600',
      gradient: 'from-cyan-500 to-blue-500',
      description: 'Central AI operations hub'
    },
    { 
      id: 'autonomous-agents', 
      label: 'Autonomous Agents', 
      icon: Bot, 
      color: 'text-purple-600',
      gradient: 'from-purple-500 to-pink-500',
      description: 'Manage AI agents'
    },
    { 
      id: 'companies', 
      label: 'Company Network', 
      icon: Building2, 
      color: 'text-green-600',
      gradient: 'from-green-500 to-emerald-500',
      description: 'Client company management'
    },
    { 
      id: 'portal-ecosystem', 
      label: 'Portal Ecosystem', 
      icon: Globe, 
      color: 'text-orange-600',
      gradient: 'from-orange-500 to-red-500',
      description: 'Multi-portal architecture'
    },
    { 
      id: 'ai-analytics', 
      label: 'AI Analytics', 
      icon: BarChart3, 
      color: 'text-indigo-600',
      gradient: 'from-indigo-500 to-purple-500',
      description: 'Intelligent insights'
    },
    { 
      id: 'automation-engine', 
      label: 'Automation Engine', 
      icon: Zap, 
      color: 'text-yellow-600',
      gradient: 'from-yellow-500 to-orange-500',
      description: 'Workflow automation'
    },
    { 
      id: 'neural-network', 
      label: 'Neural Network', 
      icon: CircuitBoard, 
      color: 'text-pink-600',
      gradient: 'from-pink-500 to-rose-500',
      description: 'AI model management'
    },
    { 
      id: 'system-health', 
      label: 'System Health', 
      icon: Activity, 
      color: 'text-emerald-600',
      gradient: 'from-emerald-500 to-teal-500',
      description: 'Platform monitoring'
    }
  ];

  const aiQuickActions = [
    { 
      label: 'Deploy AI Agent', 
      icon: Rocket, 
      color: 'bg-gradient-to-r from-cyan-500 to-blue-500',
      action: () => console.log('Deploy AI Agent')
    },
    { 
      label: 'Train Model', 
      icon: Brain, 
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      action: () => console.log('Train Model')
    },
    { 
      label: 'Optimize Network', 
      icon: Network, 
      color: 'bg-gradient-to-r from-green-500 to-emerald-500',
      action: () => console.log('Optimize Network')
    },
    { 
      label: 'Backup AI Data', 
      icon: Database2, 
      color: 'bg-gradient-to-r from-orange-500 to-red-500',
      action: () => console.log('Backup AI Data')
    },
  ];

  const aiNotifications = [
    { 
      id: 1, 
      title: 'AI Agent Deployed', 
      message: 'Route optimization agent activated for ABC Logistics', 
      time: '2 min ago', 
      type: 'success',
      icon: Bot
    },
    { 
      id: 2, 
      title: 'Neural Network Training', 
      message: 'Model accuracy improved to 96.7%', 
      time: '15 min ago', 
      type: 'info',
      icon: Brain
    },
    { 
      id: 3, 
      title: 'Automation Alert', 
      message: 'Premium Shipping Co achieved 92% automation', 
      time: '1 hour ago', 
      type: 'warning',
      icon: Zap
    },
    { 
      id: 4, 
      title: 'System Optimization', 
      message: 'AI processing speed increased by 34%', 
      time: '2 hours ago', 
      type: 'success',
      icon: Cpu
    },
  ];

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.subdomain.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.industry?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderAIDashboard = () => (
    <div className="space-y-8">
      {/* AI Command Center Header */}
      <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Brain className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold">AI Command Center</h2>
                  <p className="text-cyan-100 text-lg">Welcome back, {user.name}! Your AI ecosystem is running optimally.</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">All Systems Operational</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Cpu className="w-4 h-4" />
                  <span className="text-sm">24 AI Agents Active</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm">87% Automation Rate</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-white/20 rounded-2xl p-4 mb-4">
                <p className="text-sm text-cyan-100">Current Time</p>
                <p className="text-2xl font-bold">{new Date().toLocaleTimeString()}</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  aiMode === 'autonomous' ? 'bg-green-400' :
                  aiMode === 'assisted' ? 'bg-yellow-400' : 'bg-red-400'
                }`}></div>
                <span className="text-sm capitalize">{aiMode} Mode</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'AI Processing Power',
            value: '2.4 PetaFLOPS',
            change: '+15% efficiency',
            changeType: 'positive',
            icon: Cpu,
            gradient: 'from-cyan-500 to-blue-500',
            bgGradient: 'from-cyan-50 to-blue-50'
          },
          {
            title: 'Neural Networks',
            value: '47 Active',
            change: '+3 new models',
            changeType: 'positive',
            icon: Brain,
            gradient: 'from-purple-500 to-pink-500',
            bgGradient: 'from-purple-50 to-pink-50'
          },
          {
            title: 'Automation Rate',
            value: '87.3%',
            change: '+5.2% this week',
            changeType: 'positive',
            icon: Zap,
            gradient: 'from-yellow-500 to-orange-500',
            bgGradient: 'from-yellow-50 to-orange-50'
          },
          {
            title: 'Data Processed',
            value: '847 TB',
            change: '+23% volume',
            changeType: 'positive',
            icon: Database2,
            gradient: 'from-green-500 to-emerald-500',
            bgGradient: 'from-green-50 to-emerald-50'
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
                <p className="text-sm text-green-600">{metric.change}</p>
              </div>
              <div className={`bg-gradient-to-r ${metric.gradient} p-4 rounded-xl shadow-lg`}>
                <metric.icon className="w-8 h-8 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI Company Network */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white">AI-Powered Company Network</h3>
              <p className="text-indigo-100 mt-1">Companies leveraging Trans Bot AI technology</p>
            </div>
            <div className="flex items-center space-x-2">
              {['7D', '1M', '3M', '1Y'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedTimeRange(period)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedTimeRange === period
                      ? 'bg-white text-indigo-600'
                      : 'text-indigo-100 hover:bg-white/20'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{companies.length}</p>
              <p className="text-sm text-gray-600">Active Companies</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{companies.reduce((sum, c) => sum + c.users, 0)}</p>
              <p className="text-sm text-gray-600">Total Users</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{Math.round(companies.reduce((sum, c) => sum + c.aiScore, 0) / companies.length)}%</p>
              <p className="text-sm text-gray-600">Avg AI Score</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{Math.round(companies.reduce((sum, c) => sum + c.automation, 0) / companies.length)}%</p>
              <p className="text-sm text-gray-600">Avg Automation</p>
            </div>
          </div>

          {/* Company Cards with AI Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCompanies.map((company, index) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{company.name}</h4>
                      <p className="text-sm text-gray-500">{company.industry}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 text-xs rounded-full ${
                    company.health === 'excellent' ? 'bg-green-100 text-green-800' :
                    company.health === 'good' ? 'bg-blue-100 text-blue-800' :
                    company.health === 'warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {company.health}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-cyan-600">{company.aiScore}%</p>
                    <p className="text-xs text-gray-600">AI Score</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{company.automation}%</p>
                    <p className="text-xs text-gray-600">Automation</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">AI Performance</span>
                    <span className="text-gray-900">{company.aiScore}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${company.aiScore}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Revenue</span>
                    <span className="font-semibold text-gray-900">${company.revenue.toLocaleString()}/mo</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-gray-600">Users</span>
                    <span className="font-semibold text-gray-900">{company.users}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Activity Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
      >
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6">
          <h3 className="text-2xl font-bold text-white">AI Activity Stream</h3>
          <p className="text-emerald-100 mt-1">Real-time AI operations and insights</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {aiNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className={`p-3 rounded-xl ${
                  notification.type === 'success' ? 'bg-green-100 text-green-600' :
                  notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600' : 
                  'bg-blue-100 text-blue-600'
                }`}>
                  <notification.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{notification.title}</p>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{notification.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderContent = () => {
    switch (activeMenu) {
      case 'ai-dashboard':
        return renderAIDashboard();
      case 'autonomous-agents':
        return <div className="p-6"><h2 className="text-2xl font-bold">Autonomous Agents</h2></div>;
      case 'companies':
        return <div className="p-6"><h2 className="text-2xl font-bold">Company Network</h2></div>;
      case 'portal-ecosystem':
        return <div className="p-6"><h2 className="text-2xl font-bold">Portal Ecosystem</h2></div>;
      case 'ai-analytics':
        return <div className="p-6"><h2 className="text-2xl font-bold">AI Analytics</h2></div>;
      case 'automation-engine':
        return <div className="p-6"><h2 className="text-2xl font-bold">Automation Engine</h2></div>;
      case 'neural-network':
        return <div className="p-6"><h2 className="text-2xl font-bold">Neural Network</h2></div>;
      case 'system-health':
        return <div className="p-6"><h2 className="text-2xl font-bold">System Health</h2></div>;
      default:
        return renderAIDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Futuristic Header */}
      <header className="bg-black/20 backdrop-blur-md border-b border-cyan-500/20 fixed top-0 left-0 right-0 z-50 h-16">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left side - AI Toggle and Search */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-lg transition-colors border border-cyan-500/20"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search AI systems, companies, agents..."
                className="w-80 pl-10 pr-4 py-2 bg-black/20 border border-cyan-500/30 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-cyan-300"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyan-400" />
            </div>
          </div>

          {/* Right side - AI Controls and Profile */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-black/20 rounded-lg p-1 border border-cyan-500/20">
              {['autonomous', 'assisted', 'manual'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setAiMode(mode as any)}
                  className={`px-3 py-1 text-xs rounded-md transition-colors ${
                    aiMode === mode
                      ? 'bg-cyan-500 text-white'
                      : 'text-cyan-300 hover:bg-cyan-500/20'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-lg transition-colors"
            >
              <Moon className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-500 text-black text-xs rounded-full flex items-center justify-center">4</span>
            </button>
            
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center space-x-2 text-cyan-300 hover:text-white px-3 py-2 rounded-lg hover:bg-cyan-500/10 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-white">{user.name}</div>
                  <div className="text-xs text-cyan-300">AI Administrator</div>
                </div>
              </button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {showProfileDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-black/80 backdrop-blur-md rounded-lg shadow-xl border border-cyan-500/20 z-50"
                  >
                    <div className="py-2">
                      <a href="#" className="flex items-center px-4 py-2 text-sm text-cyan-300 hover:bg-cyan-500/10">
                        <User className="w-4 h-4 mr-3" />
                        Profile
                      </a>
                      <a href="#" className="flex items-center px-4 py-2 text-sm text-cyan-300 hover:bg-cyan-500/10">
                        <Settings className="w-4 h-4 mr-3" />
                        AI Settings
                      </a>
                      <hr className="my-2 border-cyan-500/20" />
                      <button
                        onClick={onLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
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

      <div className="flex pt-16">
        {/* Futuristic Sidebar */}
        <motion.aside
          initial={false}
          animate={{ width: sidebarOpen ? 320 : 0 }}
          className="bg-black/20 backdrop-blur-md min-h-screen fixed left-0 top-16 z-40 overflow-hidden border-r border-cyan-500/20"
        >
          <div className="p-6">
            {/* Trans Bot AI Logo */}
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Trans Bot AI</h1>
                <p className="text-cyan-300 text-sm">Super Admin Portal</p>
              </div>
            </div>

            {/* AI Navigation */}
            <nav className="space-y-2">
              {aiMenuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full flex items-center space-x-4 px-4 py-4 rounded-2xl transition-all duration-200 ${
                    activeMenu === item.id
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300'
                  }`}
                >
                  <div className={`p-2 rounded-xl ${
                    activeMenu === item.id 
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500' 
                      : 'bg-cyan-500/20'
                  }`}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold">{item.label}</div>
                    <div className={`text-xs ${
                      activeMenu === item.id ? 'text-cyan-200' : 'text-cyan-500'
                    }`}>
                      {item.description}
                    </div>
                  </div>
                </button>
              ))}
            </nav>

            {/* AI Quick Actions */}
            <div className="mt-8 pt-6 border-t border-cyan-500/20">
              <h3 className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-4">AI QUICK ACTIONS</h3>
              <div className="space-y-2">
                {aiQuickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-cyan-300 hover:bg-cyan-500/10 rounded-xl transition-all duration-200"
                  >
                    <div className={`w-10 h-10 ${action.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* System Status */}
            <div className="mt-8 pt-6 border-t border-cyan-500/20">
              <h3 className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-4">AI SYSTEM STATUS</h3>
              <div className="space-y-3">
                {[
                  { label: 'Neural Networks', status: 'active', color: 'green' },
                  { label: 'AI Agents', status: 'running', color: 'green' },
                  { label: 'Data Pipeline', status: 'optimal', color: 'green' },
                  { label: 'ML Models', status: 'training', color: 'yellow' }
                ].map((system, index) => (
                  <div key={index} className="flex items-center justify-between px-4 py-3 bg-cyan-500/5 rounded-xl border border-cyan-500/10">
                    <span className="text-sm font-medium text-cyan-300">{system.label}</span>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 ${
                        system.color === 'green' ? 'bg-green-400' :
                        system.color === 'yellow' ? 'bg-yellow-400' : 'bg-red-400'
                      } rounded-full animate-pulse`}></div>
                      <span className="text-xs text-cyan-400">{system.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-320' : 'ml-0'}`}>
          <div className="p-8">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Futuristic Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-4 rounded-2xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-200 hover:scale-105 border border-cyan-400/20">
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default TransBotAISuperAdmin;
