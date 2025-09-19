import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Settings,
  BarChart3,
  Shield,
  Database,
  Server,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  Home,
  Activity,
  Globe,
  Key,
  FileText,
  Zap,
  Phone,
  MessageSquare,
  Mail,
  MessageCircle,
  UserPlus,
  ChevronDown,
  ChevronRight,
  Plus,
  Filter,
  Download,
  DollarSign,
  Bot
} from 'lucide-react';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  link?: string;
  submenu?: SidebarItem[];
  badge?: number;
}

interface CommunicationItem {
  id: string;
  avatar: string;
  title: string;
  subtitle: string;
  time: string;
  unreadCount?: number;
  status: 'online' | 'away' | 'busy' | 'offline';
}

interface SystemStat {
  label: string;
  value: string;
  icon: React.ComponentType<any>;
  color: string;
}

interface CommunicationStat {
  label: string;
  value: string;
  icon: React.ComponentType<any>;
  color: string;
}

interface ActivityLogItem {
  id: string;
  icon: React.ComponentType<any>;
  color: string;
  message: string;
  timestamp: string;
}

const SuperAdminPortal: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState<string | null>('dashboard');
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [activeCommunicationTab, setActiveCommunicationTab] = useState<'all' | 'phone' | 'chat' | 'email' | 'sms' | 'crm'>('all');

  const sidebarItems: SidebarItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, link: '/super-admin' },
    {
      id: 'user-management',
      label: 'User Management',
      icon: Users,
      submenu: [
        { id: 'all-users', label: 'All Users', icon: Users, link: '/super-admin/users' },
        { id: 'roles-permissions', label: 'Roles & Permissions', icon: Shield, link: '/super-admin/roles' },
        { id: 'user-activity', label: 'User Activity', icon: Activity, link: '/super-admin/activity' },
        { id: 'user-groups', label: 'User Groups', icon: Users, link: '/super-admin/groups' },
      ],
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      submenu: [
        { id: 'overview', label: 'Overview', icon: BarChart3, link: '/super-admin/analytics/overview' },
        { id: 'reports', label: 'Reports', icon: FileText, link: '/super-admin/analytics/reports' },
        { id: 'performance', label: 'Performance', icon: Zap, link: '/super-admin/analytics/performance' },
        { id: 'revenue', label: 'Revenue', icon: DollarSign, link: '/super-admin/analytics/revenue' },
      ],
    },
    {
      id: 'system',
      label: 'System',
      icon: Settings,
      submenu: [
        { id: 'settings', label: 'Settings', icon: Settings, link: '/super-admin/system/settings' },
        { id: 'database', label: 'Database', icon: Database, link: '/super-admin/system/database' },
        { id: 'security', label: 'Security', icon: Shield, link: '/super-admin/system/security' },
        { id: 'domains', label: 'Domains', icon: Globe, link: '/super-admin/system/domains' },
        { id: 'monitoring', label: 'Monitoring', icon: Server, link: '/super-admin/system/monitoring' },
      ],
    },
    {
      id: 'communication',
      label: 'Communication',
      icon: MessageSquare,
      submenu: [
        { id: 'phone-system', label: 'Phone System', icon: Phone, link: '/super-admin/communication/phone' },
        { id: 'ai-chat', label: 'AI Chat', icon: MessageCircle, link: '/super-admin/communication/ai-chat' },
        { id: 'email-center', label: 'Email Center', icon: Mail, link: '/super-admin/communication/email' },
        { id: 'sms-gateway', label: 'SMS Gateway', icon: MessageSquare, link: '/super-admin/communication/sms' },
        { id: 'crm-functions', label: 'CRM Functions', icon: UserPlus, link: '/super-admin/communication/crm' },
      ],
    },
    { id: 'notifications', label: 'Notifications', icon: Bell, link: '/super-admin/notifications', badge: 5 },
  ];

  const communicationItems: CommunicationItem[] = [
    { id: '1', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=JD', title: 'John Doe', subtitle: 'New message', time: '10:30 AM', unreadCount: 2, status: 'online' },
    { id: '2', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=AJ', title: 'Alice Johnson', subtitle: 'Missed call', time: 'Yesterday', status: 'away' },
    { id: '3', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=BS', title: 'Bob Smith', subtitle: 'Email received', time: '2 days ago', status: 'offline' },
    { id: '4', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=CW', title: 'Carol White', subtitle: 'New lead assigned', time: '3 days ago', status: 'online' },
    { id: '5', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=DP', title: 'David P', subtitle: 'Follow up reminder', time: 'Last week', status: 'busy' },
  ];

  const systemStats: SystemStat[] = [
    { label: 'Total Users', value: '2,450', icon: Users, color: 'text-blue-500' },
    { label: 'Active Agents', value: '302', icon: Bot, color: 'text-green-500' },
    { label: 'System Health', value: '98%', icon: Server, color: 'text-purple-500' },
    { label: 'Revenue (MTD)', value: '$1.2M', icon: DollarSign, color: 'text-yellow-500' },
  ];

  const communicationStats: CommunicationStat[] = [
    { label: 'Active Calls', value: '3', icon: Phone, color: 'text-green-500' },
    { label: 'Unread Messages', value: '12', icon: MessageSquare, color: 'text-blue-500' },
    { label: 'Pending Emails', value: '8', icon: Mail, color: 'text-orange-500' },
    { label: 'New Leads', value: '5', icon: UserPlus, color: 'text-red-500' },
  ];

  const activityLog: ActivityLogItem[] = [
    { id: '1', icon: UserPlus, color: 'text-green-500', message: 'New user registered: Jane Doe', timestamp: '2 min ago' },
    { id: '2', icon: Server, color: 'text-yellow-500', message: 'Server load high: 85%', timestamp: '15 min ago' },
    { id: '3', icon: Shield, color: 'text-red-500', message: 'Security alert: Unauthorized access attempt', timestamp: '30 min ago' },
    { id: '4', icon: BarChart3, color: 'text-blue-500', message: 'Monthly revenue report generated', timestamp: '1 hour ago' },
    { id: '5', icon: MessageSquare, color: 'text-purple-500', message: 'New AI chat initiated', timestamp: '2 hours ago' },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMenuClick = (id: string, hasSubmenu: boolean) => {
    if (hasSubmenu) {
      setActiveSubMenu(activeSubMenu === id ? null : id);
    } else {
      setActiveMenu(id);
      setActiveSubMenu(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* Left Sidebar */}
      <motion.div
        initial={{ x: isSidebarOpen ? 0 : -280 }}
        animate={{ x: isSidebarOpen ? 0 : -280 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 left-0 w-72 bg-gray-800 shadow-lg z-50 flex flex-col"
      >
        <div className="p-6 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-lg font-bold">
              SA
            </div>
            <span className="text-xl font-bold">Super Admin</span>
          </div>
          <button onClick={toggleSidebar} className="lg:hidden text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {sidebarItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => handleMenuClick(item.id, !!item.submenu)}
                className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${
                  activeMenu === item.id ? 'bg-purple-700 text-white' : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5" />
                  <span className="text-lg">{item.label}</span>
                </div>
                {item.submenu && (
                  <motion.div
                    initial={false}
                    animate={{ rotate: activeSubMenu === item.id ? 90 : 0 }}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.div>
                )}
                {item.badge && (
                  <span className="ml-auto bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
              <AnimatePresence>
                {item.submenu && activeSubMenu === item.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="ml-6 mt-2 space-y-1"
                  >
                    {item.submenu.map((subItem) => (
                      <a
                        key={subItem.id}
                        href={subItem.link}
                        className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                          activeMenu === subItem.id ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-gray-700'
                        }`}
                      >
                        <subItem.icon className="w-4 h-4" />
                        <span>{subItem.label}</span>
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button className="flex items-center space-x-3 w-full p-3 rounded-lg text-red-400 hover:bg-gray-700 transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="text-lg">Logout</span>
          </button>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-72' : 'ml-0'}`}>
        {/* Header */}
        <header className="flex items-center justify-between p-6 bg-gray-800 shadow-md border-b border-gray-700">
          <div className="flex items-center space-x-4">
            <button onClick={toggleSidebar} className="text-gray-400 hover:text-white">
              <Menu className="w-6 h-6" />
            </button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-700 transition-colors">
              <Plus className="w-6 h-6 text-gray-300" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-700 transition-colors">
              <Filter className="w-6 h-6 text-gray-300" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-700 transition-colors">
              <Download className="w-6 h-6 text-gray-300" />
            </button>
            <div className="relative">
              <Bell className="w-6 h-6 text-gray-300" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </div>
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
              JS
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-4xl font-extrabold text-white mb-8">Super Admin Dashboard</h1>

          {/* System Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {systemStats.map((stat) => (
              <div key={stat.label} className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 flex items-center space-x-4">
                <div className={`p-3 rounded-full ${stat.color.replace('text-', 'bg-')} bg-opacity-20`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <h2 className="text-2xl font-bold text-white">{stat.value}</h2>
                </div>
              </div>
            ))}
          </div>

          {/* Communication Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {communicationStats.map((stat) => (
              <div key={stat.label} className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 flex items-center space-x-4">
                <div className={`p-3 rounded-full ${stat.color.replace('text-', 'bg-')} bg-opacity-20`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <h2 className="text-2xl font-bold text-white">{stat.value}</h2>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 mb-8">
            <h3 className="text-xl font-semibold text-white mb-6">Recent System Activity</h3>
            <div className="space-y-4">
              {activityLog.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4">
                  <div className={`p-2 rounded-full ${activity.color.replace('text-', 'bg-')} bg-opacity-20`}>
                    <activity.icon className={`w-5 h-5 ${activity.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-white">{activity.message}</p>
                    <p className="text-gray-400 text-sm">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Right Sidebar - Communication Hub */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 right-0 w-80 bg-gray-800 shadow-lg z-40 flex flex-col border-l border-gray-700"
      >
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">Communication Hub</h3>
          <div className="flex space-x-2">
            {['all', 'phone', 'chat', 'email', 'sms', 'crm'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveCommunicationTab(tab as any)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                  activeCommunicationTab === tab
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {communicationItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer">
              <div className="relative">
                <img src={item.avatar} alt={item.title} className="w-10 h-10 rounded-full" />
                <span
                  className={`absolute bottom-0 right-0 block w-3 h-3 rounded-full ring-2 ring-gray-700 ${
                    item.status === 'online' ? 'bg-green-500' : item.status === 'away' ? 'bg-yellow-500' : item.status === 'busy' ? 'bg-red-500' : 'bg-gray-500'
                  }`}
                ></span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-white font-medium">{item.title}</h4>
                  <span className="text-gray-400 text-xs">{item.time}</span>
                </div>
                <p className="text-gray-300 text-sm">{item.subtitle}</p>
              </div>
              {item.unreadCount && (
                <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                  {item.unreadCount}
                </span>
              )}
              <div className="flex space-x-2">
                <button className="p-1 rounded-full hover:bg-gray-600 text-gray-300 hover:text-white">
                  <Phone className="w-4 h-4" />
                </button>
                <button className="p-1 rounded-full hover:bg-gray-600 text-gray-300 hover:text-white">
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SuperAdminPortal;
