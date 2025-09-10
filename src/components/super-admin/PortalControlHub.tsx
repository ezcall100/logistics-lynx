import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  Users, 
  Settings, 
  Shield, 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  Database, 
  Server, 
  Cpu, 
  MemoryStick, 
  Network, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  BarChart3, 
  PieChart, 
  LineChart,
  Play,
  Pause,
  RotateCcw,
  Power,
  PowerOff,
  RefreshCw,
  Eye,
  EyeOff,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Lock,
  Unlock,
  Maximize2,
  Minimize2,
  ExternalLink,
  Copy,
  Share,
  Star,
  StarOff,
  Heart,
  HeartOff,
  Bell,
  BellOff,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  Signal,
  SignalZero,
  SignalLow,
  SignalMedium,
  SignalHigh
} from 'lucide-react';

interface Portal {
  id: string;
  name: string;
  description: string;
  category: 'core' | 'business' | 'logistics' | 'analytics' | 'integration';
  status: 'online' | 'offline' | 'maintenance' | 'error' | 'development';
  users: number;
  activeUsers: number;
  uptime: number;
  responseTime: number;
  cpu: number;
  memory: number;
  storage: number;
  bandwidth: number;
  lastUpdate: string;
  version: string;
  features: string[];
  integrations: string[];
  health: number;
  priority: 'critical' | 'high' | 'medium' | 'low';
  location: string;
  cost: number;
  revenue: number;
  growth: number;
  alerts: number;
  errors: number;
  performance: number;
  security: number;
  compliance: number;
}

interface PortalMetrics {
  totalPortals: number;
  activePortals: number;
  totalUsers: number;
  totalRevenue: number;
  averageUptime: number;
  averageResponseTime: number;
  systemHealth: number;
  criticalAlerts: number;
}

interface PortalAction {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  description: string;
  action: () => void;
}

const PortalControlHub: React.FC = () => {
  const [selectedPortal, setSelectedPortal] = useState<Portal | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'analytics'>('grid');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<string>('name');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [expandedPortals, setExpandedPortals] = useState<Set<string>>(new Set());

  // Mock data for all TMS portals
  const [portals, setPortals] = useState<Portal[]>([
    {
      id: 'broker',
      name: 'Broker Portal',
      description: 'Freight broker management and load matching',
      category: 'logistics',
      status: 'online',
      users: 3247,
      activeUsers: 2156,
      uptime: 99.9,
      responseTime: 145,
      cpu: 78,
      memory: 65,
      storage: 42,
      bandwidth: 89,
      lastUpdate: '1 min ago',
      version: 'v2.4.1',
      features: ['Load Management', 'Carrier Matching', 'Rate Negotiation', 'Document Management'],
      integrations: ['EDI', 'TMS', 'ERP', 'CRM'],
      health: 98,
      priority: 'critical',
      location: 'US-East-1',
      cost: 15000,
      revenue: 45000,
      growth: 12.5,
      alerts: 2,
      errors: 0,
      performance: 95,
      security: 98,
      compliance: 96
    },
    {
      id: 'carrier',
      name: 'Carrier Portal',
      description: 'Carrier operations and fleet management',
      category: 'logistics',
      status: 'online',
      users: 2156,
      activeUsers: 1893,
      uptime: 99.8,
      responseTime: 167,
      cpu: 82,
      memory: 71,
      storage: 58,
      bandwidth: 76,
      lastUpdate: '2 min ago',
      version: 'v2.3.8',
      features: ['Fleet Management', 'Driver Management', 'Route Planning', 'Maintenance Tracking'],
      integrations: ['GPS', 'ELD', 'TMS', 'Fuel Cards'],
      health: 96,
      priority: 'high',
      location: 'US-West-2',
      cost: 12000,
      revenue: 38000,
      growth: 8.3,
      alerts: 1,
      errors: 0,
      performance: 92,
      security: 97,
      compliance: 94
    },
    {
      id: 'shipper',
      name: 'Shipper Portal',
      description: 'Shipper booking and shipment management',
      category: 'logistics',
      status: 'online',
      users: 1893,
      activeUsers: 1456,
      uptime: 99.7,
      responseTime: 123,
      cpu: 65,
      memory: 58,
      storage: 35,
      bandwidth: 67,
      lastUpdate: '1 min ago',
      version: 'v2.4.0',
      features: ['Shipment Booking', 'Carrier Search', 'Tracking', 'Documentation'],
      integrations: ['ERP', 'WMS', 'CRM', 'EDI'],
      health: 97,
      priority: 'high',
      location: 'EU-Central-1',
      cost: 10000,
      revenue: 32000,
      growth: 15.2,
      alerts: 0,
      errors: 0,
      performance: 94,
      security: 96,
      compliance: 95
    },
    {
      id: 'driver',
      name: 'Driver Portal',
      description: 'Driver interface and mobile app',
      category: 'logistics',
      status: 'online',
      users: 4567,
      activeUsers: 3892,
      uptime: 99.6,
      responseTime: 189,
      cpu: 45,
      memory: 38,
      storage: 28,
      bandwidth: 92,
      lastUpdate: '3 min ago',
      version: 'v2.5.2',
      features: ['Load Viewing', 'Route Maps', 'Document Upload', 'Communication'],
      integrations: ['Mobile App', 'GPS', 'ELD', 'Messaging'],
      health: 95,
      priority: 'critical',
      location: 'Global',
      cost: 8000,
      revenue: 28000,
      growth: 18.7,
      alerts: 3,
      errors: 1,
      performance: 89,
      security: 94,
      compliance: 92
    },
    {
      id: 'financials',
      name: 'Financials Portal',
      description: 'Financial management and accounting',
      category: 'business',
      status: 'maintenance',
      users: 892,
      activeUsers: 567,
      uptime: 99.5,
      responseTime: 234,
      cpu: 89,
      memory: 76,
      storage: 68,
      bandwidth: 45,
      lastUpdate: '5 min ago',
      version: 'v2.2.5',
      features: ['Accounting', 'Invoicing', 'Payments', 'Reporting'],
      integrations: ['Banking', 'ERP', 'Tax Software', 'Payroll'],
      health: 88,
      priority: 'medium',
      location: 'US-Central-1',
      cost: 18000,
      revenue: 52000,
      growth: 6.8,
      alerts: 5,
      errors: 2,
      performance: 85,
      security: 99,
      compliance: 98
    },
    {
      id: 'analytics',
      name: 'Analytics Portal',
      description: 'Business intelligence and reporting',
      category: 'analytics',
      status: 'online',
      users: 1567,
      activeUsers: 1234,
      uptime: 99.8,
      responseTime: 156,
      cpu: 72,
      memory: 68,
      storage: 85,
      bandwidth: 78,
      lastUpdate: '2 min ago',
      version: 'v2.6.1',
      features: ['Dashboards', 'Reports', 'Predictive Analytics', 'Data Visualization'],
      integrations: ['BI Tools', 'Data Warehouse', 'ML Models', 'APIs'],
      health: 94,
      priority: 'medium',
      location: 'AP-Southeast-1',
      cost: 22000,
      revenue: 65000,
      growth: 22.1,
      alerts: 1,
      errors: 0,
      performance: 91,
      security: 97,
      compliance: 93
    },
    {
      id: 'crm',
      name: 'CRM Portal',
      description: 'Customer relationship management',
      category: 'business',
      status: 'online',
      users: 1234,
      activeUsers: 987,
      uptime: 99.9,
      responseTime: 134,
      cpu: 58,
      memory: 52,
      storage: 38,
      bandwidth: 62,
      lastUpdate: '1 min ago',
      version: 'v2.3.9',
      features: ['Lead Management', 'Customer Profiles', 'Communication', 'Sales Pipeline'],
      integrations: ['Email', 'Phone', 'Social Media', 'Marketing Tools'],
      health: 98,
      priority: 'medium',
      location: 'US-East-1',
      cost: 14000,
      revenue: 42000,
      growth: 9.4,
      alerts: 0,
      errors: 0,
      performance: 96,
      security: 98,
      compliance: 97
    },
    {
      id: 'marketplace',
      name: 'Marketplace Portal',
      description: 'Load and capacity marketplace',
      category: 'business',
      status: 'online',
      users: 3456,
      activeUsers: 2789,
      uptime: 99.7,
      responseTime: 178,
      cpu: 85,
      memory: 79,
      storage: 72,
      bandwidth: 94,
      lastUpdate: '4 min ago',
      version: 'v2.4.3',
      features: ['Load Board', 'Capacity Marketplace', 'Bidding', 'Matching'],
      integrations: ['Payment Gateway', 'Notification Service', 'Search Engine', 'AI Matching'],
      health: 93,
      priority: 'high',
      location: 'Global',
      cost: 25000,
      revenue: 78000,
      growth: 25.6,
      alerts: 2,
      errors: 0,
      performance: 88,
      security: 95,
      compliance: 91
    },
    {
      id: 'edi',
      name: 'EDI Portal',
      description: 'Electronic data interchange',
      category: 'integration',
      status: 'online',
      users: 567,
      activeUsers: 456,
      uptime: 99.6,
      responseTime: 198,
      cpu: 67,
      memory: 61,
      storage: 45,
      bandwidth: 83,
      lastUpdate: '3 min ago',
      version: 'v2.1.7',
      features: ['Data Exchange', 'Format Conversion', 'Validation', 'Monitoring'],
      integrations: ['Trading Partners', 'ERP Systems', 'Legacy Systems', 'APIs'],
      health: 92,
      priority: 'medium',
      location: 'US-West-1',
      cost: 16000,
      revenue: 48000,
      growth: 7.2,
      alerts: 1,
      errors: 0,
      performance: 87,
      security: 99,
      compliance: 98
    },
    {
      id: 'workers',
      name: 'Workers Portal',
      description: 'Workforce management and HR',
      category: 'business',
      status: 'development',
      users: 234,
      activeUsers: 156,
      uptime: 98.5,
      responseTime: 267,
      cpu: 45,
      memory: 38,
      storage: 25,
      bandwidth: 56,
      lastUpdate: '10 min ago',
      version: 'v2.0.3',
      features: ['Employee Management', 'Scheduling', 'Payroll', 'Performance'],
      integrations: ['HRIS', 'Payroll Systems', 'Time Tracking', 'Benefits'],
      health: 85,
      priority: 'low',
      location: 'US-Central-1',
      cost: 12000,
      revenue: 35000,
      growth: 4.1,
      alerts: 8,
      errors: 3,
      performance: 82,
      security: 93,
      compliance: 89
    }
  ]);

  const [metrics, setMetrics] = useState<PortalMetrics>({
    totalPortals: 10,
    activePortals: 8,
    totalUsers: 21547,
    totalRevenue: 456000,
    averageUptime: 99.6,
    averageResponseTime: 167,
    systemHealth: 94,
    criticalAlerts: 12
  });

  // Simulate real-time updates
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setPortals(prevPortals => 
        prevPortals.map(portal => ({
          ...portal,
          activeUsers: Math.max(0, portal.activeUsers + Math.floor((Math.random() - 0.5) * 20)),
          responseTime: Math.max(50, portal.responseTime + Math.floor((Math.random() - 0.5) * 50)),
          cpu: Math.max(0, Math.min(100, portal.cpu + Math.floor((Math.random() - 0.5) * 10))),
          memory: Math.max(0, Math.min(100, portal.memory + Math.floor((Math.random() - 0.5) * 10))),
          lastUpdate: 'Just now'
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-400 bg-green-400/20';
      case 'offline': return 'text-red-400 bg-red-400/20';
      case 'maintenance': return 'text-yellow-400 bg-yellow-400/20';
      case 'error': return 'text-red-500 bg-red-500/20';
      case 'development': return 'text-blue-400 bg-blue-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'core': return 'text-purple-400 bg-purple-400/20';
      case 'business': return 'text-blue-400 bg-blue-400/20';
      case 'logistics': return 'text-green-400 bg-green-400/20';
      case 'analytics': return 'text-orange-400 bg-orange-400/20';
      case 'integration': return 'text-cyan-400 bg-cyan-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-500';
      case 'high': return 'text-orange-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 95) return 'text-green-400';
    if (health >= 85) return 'text-yellow-400';
    if (health >= 70) return 'text-orange-400';
    return 'text-red-400';
  };

  const filteredPortals = portals.filter(portal => {
    const matchesCategory = filterCategory === 'all' || portal.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || portal.status === filterStatus;
    const matchesSearch = searchQuery === '' || 
      portal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      portal.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const sortedPortals = [...filteredPortals].sort((a, b) => {
    switch (sortBy) {
      case 'name': return a.name.localeCompare(b.name);
      case 'users': return b.users - a.users;
      case 'uptime': return b.uptime - a.uptime;
      case 'health': return b.health - a.health;
      case 'revenue': return b.revenue - a.revenue;
      default: return 0;
    }
  });

  const togglePortalExpansion = (portalId: string) => {
    setExpandedPortals(prev => {
      const newSet = new Set(prev);
      if (newSet.has(portalId)) {
        newSet.delete(portalId);
      } else {
        newSet.add(portalId);
      }
      return newSet;
    });
  };

  const quickActions: PortalAction[] = [
    {
      id: 'deploy-all',
      name: 'Deploy All',
      icon: Zap,
      color: 'green',
      description: 'Deploy updates to all portals',
      action: () => console.log('Deploy all portals')
    },
    {
      id: 'backup-all',
      name: 'Backup All',
      icon: Database,
      color: 'blue',
      description: 'Create backup of all portal data',
      action: () => console.log('Backup all portals')
    },
    {
      id: 'security-scan',
      name: 'Security Scan',
      icon: Shield,
      color: 'purple',
      description: 'Run security scan on all portals',
      action: () => console.log('Security scan all portals')
    },
    {
      id: 'performance-test',
      name: 'Performance Test',
      icon: Activity,
      color: 'orange',
      description: 'Run performance tests on all portals',
      action: () => console.log('Performance test all portals')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              🌐 Portal Control Hub
            </h1>
            <p className="text-gray-300 text-lg">
              Centralized management of all TMS portals and services
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white font-medium">
                {autoRefresh ? 'Live Updates' : 'Paused'}
              </span>
            </div>
            <button 
              onClick={() => setAutoRefresh(!autoRefresh)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
              <span>{autoRefresh ? 'Pause' : 'Resume'}</span>
            </button>
          </div>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Portals</p>
                <p className="text-3xl font-bold text-white">{metrics.totalPortals}</p>
                <p className="text-xs text-gray-400">{metrics.activePortals} active</p>
              </div>
              <Globe className="w-8 h-8 text-emerald-400" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Users</p>
                <p className="text-3xl font-bold text-white">{metrics.totalUsers.toLocaleString()}</p>
                <p className="text-xs text-gray-400">Across all portals</p>
              </div>
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">System Health</p>
                <p className="text-3xl font-bold text-white">{metrics.systemHealth}%</p>
                <p className="text-xs text-gray-400">Average uptime</p>
              </div>
              <Shield className="w-8 h-8 text-purple-400" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Critical Alerts</p>
                <p className="text-3xl font-bold text-red-400">{metrics.criticalAlerts}</p>
                <p className="text-xs text-gray-400">Require attention</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search portals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Categories</option>
            <option value="core">Core</option>
            <option value="business">Business</option>
            <option value="logistics">Logistics</option>
            <option value="analytics">Analytics</option>
            <option value="integration">Integration</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Status</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="maintenance">Maintenance</option>
            <option value="error">Error</option>
            <option value="development">Development</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="name">Sort by Name</option>
            <option value="users">Sort by Users</option>
            <option value="uptime">Sort by Uptime</option>
            <option value="health">Sort by Health</option>
            <option value="revenue">Sort by Revenue</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'grid' 
                ? 'bg-emerald-600 text-white' 
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'list' 
                ? 'bg-emerald-600 text-white' 
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <PieChart className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('analytics')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'analytics' 
                ? 'bg-emerald-600 text-white' 
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <LineChart className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={action.action}
                className={`bg-gradient-to-r ${action.color === 'green' ? 'from-green-500/20 to-green-600/20' : 
                  action.color === 'blue' ? 'from-blue-500/20 to-blue-600/20' :
                  action.color === 'purple' ? 'from-purple-500/20 to-purple-600/20' :
                  'from-orange-500/20 to-orange-600/20'} backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:scale-105 transition-transform`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 bg-${action.color}-600 rounded-lg flex items-center justify-center`}>
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-white font-medium">{action.name}</h4>
                    <p className="text-xs text-gray-400">{action.description}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Portals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedPortals.map((portal, index) => (
          <motion.div
            key={portal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:scale-105 transition-transform cursor-pointer"
            onClick={() => setSelectedPortal(portal)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold">{portal.name}</h3>
                  <p className="text-xs text-gray-400">{portal.category}</p>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-1">
                <div className={`px-2 py-1 rounded-full text-xs ${getStatusColor(portal.status)}`}>
                  {portal.status}
                </div>
                <div className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(portal.category)}`}>
                  {portal.category}
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-300 mb-4">{portal.description}</p>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Users</span>
                <span className="text-white">{portal.users.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Active Users</span>
                <span className="text-white">{portal.activeUsers.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Uptime</span>
                <span className="text-white">{portal.uptime}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Response Time</span>
                <span className="text-white">{portal.responseTime}ms</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Health</span>
                <span className={`font-medium ${getHealthColor(portal.health)}`}>{portal.health}%</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <p className="text-xs text-gray-400">CPU</p>
                    <p className="text-sm text-white">{portal.cpu}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400">Memory</p>
                    <p className="text-sm text-white">{portal.memory}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400">Alerts</p>
                    <p className="text-sm text-white">{portal.alerts}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <button className="p-1 hover:bg-white/20 rounded transition-colors">
                    <Eye className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="p-1 hover:bg-white/20 rounded transition-colors">
                    <Settings className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Expanded View */}
            <AnimatePresence>
              {expandedPortals.has(portal.id) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-white/20"
                >
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-400">Features</label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {portal.features.slice(0, 3).map((feature, idx) => (
                          <span key={idx} className="px-2 py-1 bg-emerald-600/20 text-emerald-300 rounded text-xs">
                            {feature}
                          </span>
                        ))}
                        {portal.features.length > 3 && (
                          <span className="px-2 py-1 bg-gray-600/20 text-gray-300 rounded text-xs">
                            +{portal.features.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-gray-400">Revenue</span>
                        <p className="text-white font-medium">${portal.revenue.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Growth</span>
                        <p className="text-green-400 font-medium">+{portal.growth}%</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Portal Detail Modal */}
      <AnimatePresence>
        {selectedPortal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50"
            onClick={() => setSelectedPortal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-4xl w-full border border-white/20 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedPortal.name}</h3>
                    <p className="text-gray-300">{selectedPortal.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPortal(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Basic Info */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-4">Portal Information</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status</span>
                        <div className={`px-3 py-1 rounded-full text-sm ${getStatusColor(selectedPortal.status)}`}>
                          {selectedPortal.status}
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Category</span>
                        <div className={`px-3 py-1 rounded-full text-sm ${getCategoryColor(selectedPortal.category)}`}>
                          {selectedPortal.category}
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Version</span>
                        <span className="text-white">{selectedPortal.version}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Location</span>
                        <span className="text-white">{selectedPortal.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Priority</span>
                        <span className={`font-medium ${getPriorityColor(selectedPortal.priority)}`}>
                          {selectedPortal.priority}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-white mb-4">Performance Metrics</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">CPU Usage</span>
                          <span className="text-white">{selectedPortal.cpu}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-blue-400 h-2 rounded-full"
                            style={{ width: `${selectedPortal.cpu}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Memory Usage</span>
                          <span className="text-white">{selectedPortal.memory}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-green-400 h-2 rounded-full"
                            style={{ width: `${selectedPortal.memory}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Storage Usage</span>
                          <span className="text-white">{selectedPortal.storage}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-purple-400 h-2 rounded-full"
                            style={{ width: `${selectedPortal.storage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Bandwidth Usage</span>
                          <span className="text-white">{selectedPortal.bandwidth}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-orange-400 h-2 rounded-full"
                            style={{ width: `${selectedPortal.bandwidth}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Features & Actions */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-4">Features</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPortal.features.map((feature, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-emerald-600/20 text-emerald-300 rounded-full text-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-white mb-4">Integrations</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPortal.integrations.map((integration, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm"
                        >
                          {integration}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-white mb-4">Business Metrics</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 rounded-lg p-3">
                        <p className="text-xs text-gray-400">Monthly Revenue</p>
                        <p className="text-lg font-bold text-white">${selectedPortal.revenue.toLocaleString()}</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <p className="text-xs text-gray-400">Growth Rate</p>
                        <p className="text-lg font-bold text-green-400">+{selectedPortal.growth}%</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <p className="text-xs text-gray-400">Monthly Cost</p>
                        <p className="text-lg font-bold text-white">${selectedPortal.cost.toLocaleString()}</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <p className="text-xs text-gray-400">ROI</p>
                        <p className="text-lg font-bold text-green-400">
                          {Math.round((selectedPortal.revenue / selectedPortal.cost) * 100)}%
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-white mb-4">Portal Actions</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2">
                        <Play className="w-4 h-4" />
                        <span>Start Portal</span>
                      </button>
                      <button className="bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2">
                        <Pause className="w-4 h-4" />
                        <span>Pause Portal</span>
                      </button>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2">
                        <RotateCcw className="w-4 h-4" />
                        <span>Restart Portal</span>
                      </button>
                      <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2">
                        <Settings className="w-4 h-4" />
                        <span>Configure</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortalControlHub;
