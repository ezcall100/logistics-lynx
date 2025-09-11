import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package,
  DollarSign,
  Plus,
  BarChart3,
  FileText,
  Bell,
  ArrowRight,
  Navigation,
  Fuel,
  Route,
  Camera,
  MessageSquare,
  Menu,
  X,
  Settings,
  User,
  LogOut,
  Home,
  Search,
  Filter,
  Download,
  Upload,
  ChevronRight,
  ChevronDown,
  Star,
  Clock,
  AlertCircle,
} from 'lucide-react';
import RealTimePortalStatus from '../../components/RealTimePortalStatus';
import PortalUpdateSystem from '../../utils/PortalUpdateSystem';

const AnalyticsPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);
  const [notifications, setNotifications] = useState([1, 2, 3]);
  const [realTimeData, setRealTimeData] = useState({
    lastUpdate: new Date(),
    status: 'active',
    progress: 65,
  });

  // Initialize 360-degree integration system
  useEffect(() => {
    const updateSystem = PortalUpdateSystem.getInstance();
    updateSystem.start();

    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        lastUpdate: new Date(),
        progress: Math.min(100, prev.progress + Math.random() * 2),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'Active Loads', value: '12', change: '+3', icon: Package, color: 'text-blue-500' },
    {
      label: 'Revenue Today',
      value: '$2,450',
      change: '+$180',
      icon: DollarSign,
      color: 'text-green-500',
    },
    { label: 'Efficiency', value: '94%', change: '+2%', icon: BarChart3, color: 'text-purple-500' },
    { label: 'Documents', value: '8', change: '2 new', icon: FileText, color: 'text-orange-500' },
  ];

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, badge: null },
    { id: 'loads', label: 'Loads', icon: Package, badge: '12' },
    { id: 'earnings', label: 'Earnings', icon: DollarSign, badge: null },
    { id: 'documents', label: 'Documents', icon: FileText, badge: '3' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, badge: 'New' },
  ];

  const fabActions = [
    { id: 'create', label: 'Create New', icon: Plus, color: 'bg-blue-500' },
    { id: 'upload', label: 'Upload File', icon: Upload, color: 'bg-green-500' },
    { id: 'search', label: 'Search', icon: Search, color: 'bg-purple-500' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'bg-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10"></div>
      </div>

      {/* Layout Container */}
      <div className="relative z-10 flex h-screen">
        {/* Mobile Backdrop */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-40"
            />
          )}
        </AnimatePresence>

        {/* Glassmorphism Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ x: -320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-80 flex-shrink-0 fixed lg:relative lg:translate-x-0 z-50"
            >
              <div className="h-full bg-white/10 backdrop-blur-xl border-r border-white/20 shadow-2xl">
                {/* Sidebar Header */}
                <div className="p-6 border-b border-white/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <Package className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white">Analytics Portal</h2>
                        <p className="text-sm text-white/70">Enterprise Dashboard</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSidebarOpen(false)}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>

                {/* Navigation Items */}
                <div className="p-4 space-y-2">
                  {sidebarItems.map(item => (
                    <motion.button
                      key={item.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                        activeTab === item.id
                          ? 'bg-white/20 text-white shadow-lg'
                          : 'text-white/70 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto px-2 py-1 text-xs bg-blue-500 text-white rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </motion.button>
                  ))}
                </div>

                {/* Real-time Status */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm text-white/70">Live Status</span>
                    </div>
                    <div className="text-xs text-white/50">
                      Last update: {realTimeData.lastUpdate.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <div className="bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-0 z-40">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setSidebarOpen(true)}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <Menu className="w-6 h-6 text-white" />
                  </button>
                  <div>
                    <h1 className="text-2xl font-bold text-white">Analytics Portal</h1>
                    <p className="text-white/70">Enterprise-grade portal with 360° integration</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="relative p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                    <Bell className="w-6 h-6 text-white" />
                    {notifications.length > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {notifications.length}
                      </span>
                    )}
                  </button>
                  <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                    <Settings className="w-6 h-6 text-white" />
                  </button>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-white/10">
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <span className="text-sm text-green-400 font-medium">{stat.change}</span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-white/70">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* MCP Agent Real-Time Status */}
              <div className="mb-8">
                <RealTimePortalStatus portalId="analytics" />
              </div>

              {/* Main Content Card */}
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-white/70">Real-time updates</span>
                  </div>
                </div>

                <div className="p-6">
                  {activeTab === 'dashboard' && (
                    <div className="space-y-8">
                      {/* Quick Actions */}
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200">
                            <Plus className="w-5 h-5" />
                            <span className="font-medium">Create New</span>
                          </button>
                          <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200">
                            <Upload className="w-5 h-5" />
                            <span className="font-medium">Upload File</span>
                          </button>
                          <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-200">
                            <Search className="w-5 h-5" />
                            <span className="font-medium">Search</span>
                          </button>
                          <button className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-xl hover:from-purple-600 hover:to-violet-700 transition-all duration-200">
                            <Settings className="w-5 h-5" />
                            <span className="font-medium">Settings</span>
                          </button>
                        </div>
                      </div>

                      {/* Enterprise Features Info */}
                      <div className="mt-8 p-6 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10">
                        <div className="text-white/70">
                          <p className="mb-4">
                            Welcome to the Analytics Portal with enterprise-grade features:
                          </p>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-yellow-400" />
                              Glassmorphism UI with backdrop blur effects
                            </li>
                            <li className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-yellow-400" />
                              Floating Action Button (FAB) for quick actions
                            </li>
                            <li className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-yellow-400" />
                              Multi-level sidebar navigation
                            </li>
                            <li className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-yellow-400" />
                              Mobile-first responsive design
                            </li>
                            <li className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-yellow-400" />
                              Real-time MCP agent integration
                            </li>
                            <li className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-yellow-400" />
                              360-degree autonomous development
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'earnings' && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Earnings Overview</h3>
                      <div className="text-white/70">
                        <p>Real-time earnings data with MCP agent monitoring...</p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'documents' && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Document Management</h3>
                      <div className="text-white/70">
                        <p>Enterprise document management with 360° integration...</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          <AnimatePresence>
            {fabOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute bottom-16 right-0 space-y-3"
              >
                {fabActions.map((action, index) => (
                  <motion.button
                    key={action.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`${action.color} text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-3`}
                  >
                    <action.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{action.label}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setFabOpen(!fabOpen)}
            className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
          >
            <motion.div animate={{ rotate: fabOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
              <Plus className="w-6 h-6" />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPortal;
