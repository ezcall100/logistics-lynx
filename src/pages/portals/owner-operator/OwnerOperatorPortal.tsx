import React from 'react';
import { useState } from 'react';
import { ThemeToggle } from '../../../components/common/ThemeToggle';
import { motion } from 'framer-motion';
import {
  Users,
  Search,
  Bell,
  Settings,
  Plus,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  FileText,
  Calendar,
  MessageSquare,
  Phone,
  MessageCircle,
  Video,
  CheckSquare,
  User,
  Mail,
  LogOut,
} from 'lucide-react';

function OwnerOperatorPortal() {
  const [user] = useState({
    id: 1,
    name: 'Demo User',
    email: 'demo@transbotai.com',
    role: 'owneroperator',
    permissions: ['read', 'write', 'admin'],
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['overview']);
  const [activeMenuItem, setActiveMenuItem] = useState('overview');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [rightSidebarCollapsed, setRightSidebarCollapsed] = useState(false);
  const [activeCrmTab, setActiveCrmTab] = useState('chat');

  const notifications = [
    {
      id: 1,
      title: 'New owneroperator registered',
      message: 'Acme Corporation has been added',
      time: '5 minutes ago',
      type: 'info',
    },
    {
      id: 2,
      title: 'OwnerOperator status updated',
      message: 'Mark Johnson is now active',
      time: '1 hour ago',
      type: 'success',
    },
    {
      id: 3,
      title: 'Payment overdue',
      message: 'Invoice #INV-2023-001 is 3 days overdue',
      time: '3 days ago',
      type: 'warning',
    },
  ];

  const metrics = [
    {
      title: 'Active Users',
      value: '1,234',
      change: { value: '+12%', type: 'increase' as const },
      icon: Users,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      title: 'Revenue',
      value: '$45,678',
      change: { value: '+8%', type: 'increase' as const },
      icon: DollarSign,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      title: 'Growth Rate',
      value: '15%',
      change: { value: '+3%', type: 'increase' as const },
      icon: TrendingUp,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    },
    {
      title: 'Alerts',
      value: '3',
      change: { value: '-1', type: 'decrease' as const },
      icon: AlertTriangle,
      iconColor: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    },
  ];

  const menuItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'Home',
      subMenus: [
        {
          id: 'dashboard',
          label: 'Dashboard',
          icon: 'BarChart3',
        },
        {
          id: 'analytics',
          label: 'Analytics',
          icon: 'TrendingUp',
        },
      ],
    },
    {
      id: 'management',
      label: 'Management',
      icon: 'Settings',
      subMenus: [
        {
          id: 'settings',
          label: 'Settings',
          icon: 'Settings',
        },
        {
          id: 'reports',
          label: 'Reports',
          icon: 'FileText',
        },
      ],
    },
  ];

  const crmTabs = [
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'phone', label: 'Phone', icon: Phone },
    { id: 'sms', label: 'SMS', icon: MessageSquare },
    { id: 'video', label: 'Video', icon: Video },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'notes', label: 'Notes', icon: FileText },
  ];

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev =>
      prev.includes(menuId) ? prev.filter(id => id !== menuId) : [...prev, menuId]
    );
  };

  const handleCrmTabClick = (tabId: string) => {
    setActiveCrmTab(tabId);
  };

  const toggleRightSidebar = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRightSidebarCollapsed(!rightSidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 responsive-container">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 sticky top-0 z-50 responsive-container">
        <div className="px-4 sm:px-6 lg:px-8 responsive-container">
          <div className="flex items-center justify-between h-16 responsive-container">
            {/* Left side - Logo and Search */}
            <div className="flex items-center space-x-4 responsive-container">
              <div className="flex items-center space-x-3 responsive-container">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center responsive-container">
                  <span className="text-white font-bold text-sm responsive-container">TB</span>
                </div>
                <div className="hidden sm:block responsive-container">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent responsive-container">
                    TransBot AI
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 responsive-container">
                    OwnerOperator Management
                  </p>
                </div>
              </div>
            </div>

            {/* Center - Search */}
            <div className="flex-1 max-w-lg mx-4 responsive-container">
              <div className="relative responsive-container">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 responsive-container" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200/50 dark:border-slate-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-sm responsive-container"
                />
              </div>
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center space-x-2 responsive-container">
              <button className="p-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors responsive-container" aria-label="Button">
                <Bell className="w-5 h-5 responsive-container" />
              </button>

              <ThemeToggle />

              <button
                onClick={() => setShowSettingsMenu(!showSettingsMenu)}
            aria-label="Button"
                className="p-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors responsive-container"
              >
                <Settings className="w-5 h-5 responsive-container" />
              </button>

              {/* User Menu */}
              <div className="relative responsive-container">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
            aria-label="Button"
                  className="flex items-center space-x-2 p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors responsive-container"
                >
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full responsive-container" / alt="Image">
                  <div className="hidden sm:block text-left responsive-container">
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100 responsive-container">
                      {user.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 responsive-container">{user.role}</p>
                  </div>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-50 responsive-container">
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 responsive-container"
                    >
                      <User className="w-4 h-4 mr-3 responsive-container" />
                      Profile
                    </a>
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 responsive-container"
                    >
                      <Settings className="w-4 h-4 mr-3 responsive-container" />
                      Settings
                    </a>
                    <hr className="my-1 border-slate-200 dark:border-slate-700 responsive-container" />
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-700 responsive-container"
                    >
                      <LogOut className="w-4 h-4 mr-3 responsive-container" />
                      Sign out
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex responsive-container">
        {/* Left Sidebar */}
        <aside
          className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-700/50 transition-all duration-300 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto`}
        >
          <div className="p-4 responsive-container">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            aria-label="Button"
              className="w-full flex items-center justify-center p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors mb-4 responsive-container"
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-5 h-5 responsive-container" />
              ) : (
                <ChevronLeft className="w-5 h-5 responsive-container" />
              )}
            </button>

            <nav className="space-y-1 responsive-container">
              {menuItems.map(item => {
                const Icon = eval(item.icon);
                const isExpanded = expandedMenus.includes(item.id);
                const isActive = activeMenuItem === item.id;

                return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
                  <div key={item.id}>
                    <button
                      onClick={() => {
                        if (item.subMenus && item.subMenus.length > 0) {
                          toggleMenu(item.id);
                        }
            aria-label="Button" else {
                          setActiveMenuItem(item.id);
                        }
                      }}
                      className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} p-3 text-left rounded-lg transition-colors ${isActive ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                    >
                      <div className="flex items-center space-x-3 responsive-container">
                        <Icon className="w-5 h-5 flex-shrink-0 responsive-container" />
                        {!sidebarCollapsed && <span className="font-medium responsive-container">{item.label}</span>}
                      </div>
                      {!sidebarCollapsed && item.subMenus && item.subMenus.length > 0 && (
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        />
                      )}
                    </button>

                    {!sidebarCollapsed && isExpanded && item.subMenus && (
                      <div className="ml-4 mt-1 space-y-1 responsive-container">
                        {item.subMenus.map(subItem => {
                          const SubIcon = eval(subItem.icon);
                          return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
                            <button
                              key={subItem.id}
                              onClick={() => setActiveMenuItem(subItem.id)}
            aria-label="Button"
                              className="w-full flex items-center space-x-3 p-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors responsive-container"
                            >
                              <SubIcon className="w-4 h-4 flex-shrink-0 responsive-container" />
                              <span>{subItem.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 responsive-container">
          <div className="max-w-7xl mx-auto responsive-container">
            {/* Dashboard Header */}
            <div className="mb-8 responsive-container">
              <div className="flex items-center justify-between responsive-container">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 responsive-container">
                    Dashboard
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400 mt-1 responsive-container">
                    Welcome back, {user.name}! Here's what's happening with your OwnerOperator
                    Management.
                  </p>
                </div>
                <div className="flex items-center space-x-2 responsive-container">
                  <div className="flex items-center space-x-2 text-green-600 dark:text-green-400 responsive-container">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse responsive-container"></div>
                    <span className="text-sm font-medium responsive-container">Live</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 responsive-container">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300 responsive-container"
                  >
                    <div className="flex items-center justify-between responsive-container">
                      <div>
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 responsive-container">
                          {metric.title}
                        </p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1 responsive-container">
                          {metric.value}
                        </p>
                      </div>
                      <div className={`p-3 rounded-xl ${metric.bgColor}`}>
                        <Icon className={`w-6 h-6 ${metric.iconColor}`} />
                      </div>
                    </div>
                    <div className="mt-4 responsive-container">
                      <span
                        className={`text-sm font-medium ${metric.change.type === 'increase' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
                      >
                        {metric.change.value}
                      </span>
                      <span className="text-sm text-slate-500 dark:text-slate-400 ml-1 responsive-container">
                        from last month
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 responsive-container">
              {/* Recent Activity */}
              <div className="lg:col-span-2 responsive-container">
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 responsive-container">
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4 responsive-container">
                    Recent Activity
                  </h2>
                  <div className="space-y-4 responsive-container">
                    {notifications.map(notification => (
                      <div
                        key={notification.id}
                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors responsive-container"
                      >
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${notification.type === 'info' ? 'bg-blue-500' : notification.type === 'success' ? 'bg-green-500' : 'bg-yellow-500'}`}
                        ></div>
                        <div className="flex-1 responsive-container">
                          <p className="text-sm font-medium text-slate-900 dark:text-slate-100 responsive-container">
                            {notification.title}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400 responsive-container">
                            {notification.message}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-500 mt-1 responsive-container">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 responsive-container">
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4 responsive-container">
                    Quick Actions
                  </h2>
                  <div className="space-y-3 responsive-container">
                    <button className="w-full flex items-center space-x-3 p-3 text-left text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors responsive-container" aria-label="Button">
                      <Plus className="w-5 h-5 responsive-container" />
                      <span>Add New Item</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 p-3 text-left text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors responsive-container" aria-label="Button">
                      <FileText className="w-5 h-5 responsive-container" />
                      <span>Generate Report</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 p-3 text-left text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors responsive-container" aria-label="Button">
                      <Settings className="w-5 h-5 responsive-container" />
                      <span>Settings</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Right CRM Sidebar */}
        <aside
          className={`${rightSidebarCollapsed ? 'w-12' : 'w-80'} bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-l border-slate-200/50 dark:border-slate-700/50 transition-all duration-300 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto`}
        >
          {rightSidebarCollapsed ? (
            <div className="p-2 responsive-container">
              <button
                onClick={toggleRightSidebar}
                className="w-full p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors responsive-container"
               aria-label="Button">
                <ChevronLeft className="w-5 h-5 responsive-container" />
              </button>
            </div>
          ) : (
            <div className="p-4 responsive-container">
              <div className="flex items-center justify-between mb-4 responsive-container">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 responsive-container">
                  CRM Tools
                </h3>
                <button
                  onClick={toggleRightSidebar}
                  className="p-1 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors responsive-container"
                 aria-label="Button">
                  <ChevronRight className="w-4 h-4 responsive-container" />
                </button>
              </div>

              {/* CRM Tabs */}
              <div className="grid grid-cols-2 gap-2 mb-4 responsive-container">
                {crmTabs.map(tab => {
                  const Icon = tab.icon;
                  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
                    <button
                      key={tab.id}
                      onClick={() => handleCrmTabClick(tab.id)}
            aria-label="Button"
                      className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${activeCrmTab === tab.id ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                    >
                      <Icon className="w-4 h-4 responsive-container" />
                      <span className="text-sm responsive-container">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* CRM Content */}
              <div className="space-y-4 responsive-container">
                {activeCrmTab === 'chat' && (
                  <div className="space-y-3 responsive-container">
                    <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg responsive-container">
                      <p className="text-sm text-slate-600 dark:text-slate-400 responsive-container">
                        Recent conversations
                      </p>
                    </div>
                  </div>
                )}
                {activeCrmTab === 'email' && (
                  <div className="space-y-3 responsive-container">
                    <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg responsive-container">
                      <p className="text-sm text-slate-600 dark:text-slate-400 responsive-container">Email campaigns</p>
                    </div>
                  </div>
                )}
                {activeCrmTab === 'tasks' && (
                  <div className="space-y-3 responsive-container">
                    <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg responsive-container">
                      <p className="text-sm text-slate-600 dark:text-slate-400 responsive-container">Task management</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

export default OwnerOperatorPortal;
