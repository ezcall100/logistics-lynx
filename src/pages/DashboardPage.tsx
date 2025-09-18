import React, { useState, useEffect, useRef } from 'react';
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
  Settings
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import UnifiedPortalLayout from '../components/portals/UnifiedPortalLayout';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return (
    ) => clearTimeout(timer);
  }, []);

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

  const upcomingTasks = [
    {
      id: 1,
      title: 'Weekly fleet inspection',
      dueDate: 'Today, 2:00 PM',
      priority: 'high',
      assignedTo: 'DEMO / PLACEHOLDER Technician'
    },
    {
      id: 2,
      title: 'Driver safety training',
      dueDate: 'Tomorrow, 9:00 AM',
      priority: 'medium',
      assignedTo: 'DEMO / PLACEHOLDER Safety Manager'
    },
    {
      id: 3,
      title: 'Monthly financial report',
      dueDate: 'Jan 31, 2024',
      priority: 'low',
      assignedTo: 'DEMO / PLACEHOLDER Accountant'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (isLoading) {
    return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
      <UnifiedPortalLayout>
        <div className="flex items-center justify-center h-64 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin responsive-container sm:flex-col md:flex-row lg:grid"></div>
            <span className="text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Loading dashboard...</span>
          </div>
        </div>
      </UnifiedPortalLayout>
    );
  }

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <UnifiedPortalLayout>
      <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white responsive-container sm:flex-col md:flex-row lg:grid"
        >
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <h1 className="text-3xl font-bold mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
                Welcome back, {user?.name?.split(' ')[0]}!
              </h1>
              <p className="text-blue-100 text-lg responsive-container sm:flex-col md:flex-row lg:grid">
                Here's what's happening with your logistics operations today.
              </p>
            </div>
            <div className="hidden md:block responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                <Truck className="w-12 h-12 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
          {kpiData.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1 responsive-container sm:flex-col md:flex-row lg:grid">{kpi.title}</p>
                  <p className="text-2xl font-bold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{kpi.value}</p>
                  <div className="flex items-center mt-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    <span className={`text-sm font-medium ${
                      kpi.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {kpi.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1 responsive-container sm:flex-col md:flex-row lg:grid">vs last month</span>
                  </div>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-br ${kpi.color} rounded-lg flex items-center justify-center`}>
                  <kpi.icon className="w-6 h-6 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-200 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
              <h2 className="text-lg font-semibold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">Recent Activities</h2>
              <button className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700 transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                <span>View All</span>
                <ArrowRight className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
              </button>
            </div>
            <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className={`w-10 h-10 ${activity.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <activity.icon className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
                  </div>
                  <div className="flex-1 min-w-0 responsive-container sm:flex-col md:flex-row lg:grid">
                    <p className="text-sm font-medium text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{activity.title}</p>
                    <p className="text-sm text-gray-600 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-2 responsive-container sm:flex-col md:flex-row lg:grid">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Upcoming Tasks */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
              <h2 className="text-lg font-semibold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">Upcoming Tasks</h2>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                <Plus className="w-4 h-4 text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid" />
              </button>
            </div>
            <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="flex items-start justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="flex-1 responsive-container sm:flex-col md:flex-row lg:grid">
                      <p className="text-sm font-medium text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{task.title}</p>
                      <p className="text-xs text-gray-500 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">{task.assignedTo}</p>
                      <p className="text-xs text-gray-500 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">{task.dueDate}</p>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 responsive-container sm:flex-col md:flex-row lg:grid"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-6 responsive-container sm:flex-col md:flex-row lg:grid">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
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
                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center mb-3`}>
                  <action.icon className="w-6 h-6 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
                </div>
                <span className="text-sm font-medium text-gray-700 text-center responsive-container sm:flex-col md:flex-row lg:grid">{action.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Performance Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 responsive-container sm:flex-col md:flex-row lg:grid"
        >
          <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
            <h2 className="text-lg font-semibold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">Performance Overview</h2>
            <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
              <button className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-700 transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                <Filter className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                <span>Filter</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-700 transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                <Download className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                <span>Export</span>
              </button>
            </div>
          </div>
          <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
              <BarChart3 className="w-16 h-16 text-blue-400 mx-auto mb-4 responsive-container sm:flex-col md:flex-row lg:grid" />
              <p className="text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Performance charts will be displayed here</p>
              <p className="text-sm text-gray-500 mt-2 responsive-container sm:flex-col md:flex-row lg:grid">Real-time data visualization coming soon</p>
            </div>
          </div>
        </motion.div>
      </div>
    </UnifiedPortalLayout>
  );
};

export default DashboardPage;
}