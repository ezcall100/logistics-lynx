import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Truck, 
  Package, 
  Users, 
  DollarSign, 
  AlertTriangle,
  BarChart3,
  Calendar,
  ArrowRight,
  Plus,
  Filter,
  Download,
  Settings,
  Menu,
  X,
  Bell,
  Search,
  LogOut,
  User,
  Home,
  Shield,
  Globe,
  Zap,
  TrendingUp,
  Database,
  Banknote,
  Code,
  MessageSquare,
  HelpCircle
} from 'lucide-react';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  company: string;
  permissions: string[];
  isActive: boolean;
  lastLogin: string;
}

const StandaloneDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get user from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
        // Redirect to login if no valid user
        window.location.href = '/';
      }
    } else {
      // Redirect to login if no user
      window.location.href = '/';
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const kpiData = [
    {
      title: 'Active Loads',
      value: '247',
      change: '+12%',
      changeType: 'positive',
      icon: Package,
      color: 'from-blue-500 to-indigo-500'
    },
    {
      title: 'Fleet Vehicles',
      value: '89',
      change: '+3%',
      changeType: 'positive',
      icon: Truck,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Active Drivers',
      value: '156',
      change: '+8%',
      changeType: 'positive',
      icon: Users,
      color: 'from-purple-500 to-violet-500'
    },
    {
      title: 'Revenue (MTD)',
      value: '$2.4M',
      change: '+15%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'load',
      title: 'New load posted',
      description: 'Load #LD-2024-001 from DEMO / PLACEHOLDER City A to DEMO / PLACEHOLDER City B',
      time: '2 minutes ago',
      icon: Package,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      id: 2,
      type: 'driver',
      title: 'Driver check-in',
      description: 'DEMO / PLACEHOLDER Driver completed delivery at DEMO / PLACEHOLDER City C',
      time: '15 minutes ago',
      icon: Users,
      color: 'text-green-600 bg-green-100'
    },
    {
      id: 3,
      type: 'alert',
      title: 'Maintenance due',
      description: 'Vehicle DEMO-001 requires scheduled maintenance in 500 miles',
      time: '1 hour ago',
      icon: AlertTriangle,
      color: 'text-yellow-600 bg-yellow-100'
    },
    {
      id: 4,
      type: 'payment',
      title: 'Payment received',
      description: 'Payment of $2,450 received for Load #LD-2024-089',
      time: '2 hours ago',
      icon: DollarSign,
      color: 'text-green-600 bg-green-100'
    }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Not Authenticated</h1>
          <p className="text-gray-600">Please log in to access the dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-xl lg:translate-x-0 lg:static lg:inset-0 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Logistics Lynx</h1>
                <p className="text-xs text-gray-500">Portal Dashboard</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* User info */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.company}</p>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                  {user.role}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto p-6">
            <nav className="space-y-2">
              <a href="/dashboard" className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-lg">
                <Home className="w-4 h-4" />
                <span>Dashboard</span>
              </a>
              <a href="/portals/shipper" className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">
                <Package className="w-4 h-4" />
                <span>Shipper Portal</span>
              </a>
              <a href="/portals/carrier" className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">
                <Truck className="w-4 h-4" />
                <span>Carrier Portal</span>
              </a>
              <a href="/portals/broker" className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">
                <Users className="w-4 h-4" />
                <span>Broker Portal</span>
              </a>
              <a href="/portals/analytics" className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">
                <BarChart3 className="w-4 h-4" />
                <span>Analytics Portal</span>
              </a>
              <a href="/portals/admin" className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">
                <Shield className="w-4 h-4" />
                <span>Admin Portal</span>
              </a>
            </nav>
          </div>

          {/* Sidebar footer */}
          <div className="p-6 border-t border-gray-200">
            <div className="space-y-2">
              <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <HelpCircle className="w-4 h-4" />
                <span>Help & Support</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-80">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu className="w-5 h-5 text-gray-500" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-500">Manage your logistics operations</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
                <Bell className="w-5 h-5 text-gray-500" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <MessageSquare className="w-5 h-5 text-gray-500" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          <div className="space-y-6">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2">
                    Welcome back, {user.name.split(' ')[0]}!
                  </h1>
                  <p className="text-blue-100 text-lg">
                    Here's what's happening with your logistics operations today.
                  </p>
                </div>
                <div className="hidden md:block">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                    <Truck className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {kpiData.map((kpi, index) => (
                <motion.div
                  key={kpi.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">{kpi.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                      <div className="flex items-center mt-2">
                        <span className={`text-sm font-medium ${
                          kpi.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {kpi.change}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">vs last month</span>
                      </div>
                    </div>
                    <div className={`w-12 h-12 bg-gradient-to-br ${kpi.color} rounded-lg flex items-center justify-center`}>
                      <kpi.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recent Activities */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
                <button className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700 transition-colors">
                  <span>View All</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`w-10 h-10 ${activity.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <activity.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-2">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[
                  { icon: Plus, label: 'Create Load', color: 'from-blue-500 to-indigo-500' },
                  { icon: Users, label: 'Add Driver', color: 'from-green-500 to-emerald-500' },
                  { icon: Truck, label: 'Add Vehicle', color: 'from-purple-500 to-violet-500' },
                  { icon: BarChart3, label: 'View Reports', color: 'from-yellow-500 to-orange-500' },
                  { icon: Calendar, label: 'Schedule', color: 'from-pink-500 to-rose-500' },
                  { icon: Settings, label: 'Settings', color: 'from-gray-500 to-slate-500' }
                ].map((action) => (
                  <motion.button
                    key={action.label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center mb-3`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 text-center">{action.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StandaloneDashboard;
