import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  BarChart3, 
  Truck, 
  Package, 
  Users, 
  Settings, 
  Bell, 
  MessageSquare, 
  Search, 
  User, 
  ChevronDown,
  Globe,
  Building,
  Shield,
  CreditCard,
  Database,
  FileText,
  MapPin,
  TrendingUp,
  Banknote,
  Code,
  Lock,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

interface HorizontalMenuProps {
  variant?: 'primary' | 'secondary' | 'minimal';
}

const HorizontalMenu: React.FC<HorizontalMenuProps> = ({ variant = 'primary' }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      path: '/dashboard',
      children: [
        { label: 'Overview', path: '/dashboard', icon: BarChart3 },
        { label: 'Analytics', path: '/dashboard/analytics', icon: TrendingUp },
        { label: 'Reports', path: '/dashboard/reports', icon: FileText }
      ]
    },
    {
      id: 'operations',
      label: 'Operations',
      icon: Truck,
      children: [
        { label: 'Load Management', path: '/operations/loads', icon: Package },
        { label: 'Fleet Management', path: '/operations/fleet', icon: Truck },
        { label: 'Dispatch', path: '/operations/dispatch', icon: MapPin },
        { label: 'Maintenance', path: '/operations/maintenance', icon: Settings }
      ]
    },
    {
      id: 'business',
      label: 'Business',
      icon: Building,
      children: [
        { label: 'Customers', path: '/business/customers', icon: Users },
        { label: 'Partners', path: '/business/partners', icon: Globe },
        { label: 'Financials', path: '/business/financials', icon: Banknote },
        { label: 'Compliance', path: '/business/compliance', icon: Shield }
      ]
    },
    {
      id: 'team',
      label: 'Team',
      icon: Users,
      children: [
        { label: 'Team Members', path: '/team/members', icon: Users },
        { label: 'Roles & Permissions', path: '/team/roles', icon: Shield },
        { label: 'Team Settings', path: '/team/settings', icon: Settings }
      ]
    }
  ];

  const userMenuItems = [
    { label: 'Profile', path: '/profile', icon: User },
    { label: 'Account Settings', path: '/settings/account', icon: Settings },
    { label: 'Company Profile', path: '/settings/company', icon: Building },
    { label: 'Billing', path: '/settings/billing', icon: CreditCard },
    { label: 'Security', path: '/settings/security', icon: Lock },
    { label: 'Integrations', path: '/settings/integrations', icon: Code },
    { label: 'API Settings', path: '/settings/api', icon: Database },
    { label: 'Notifications', path: '/settings/notifications', icon: Bell },
    { label: 'Help & Support', path: '/help', icon: HelpCircle }
  ];

  const isActive = (path: string) => location.pathname === path;

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-white shadow-sm border-b border-gray-200';
      case 'secondary':
        return 'bg-gray-50 border-b border-gray-200';
      case 'minimal':
        return 'bg-transparent';
      default:
        return 'bg-white shadow-sm border-b border-gray-200';
    }
  };

  return (
    <header className={`${getVariantStyles()} sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Truck className="w-5 h-5 text-white" />
            </div>
            {variant !== 'minimal' && (
              <div>
                <h1 className="text-lg font-bold text-gray-900">Logistics Lynx</h1>
                <p className="text-xs text-gray-500">Portal Dashboard</p>
              </div>
            )}
          </div>

          {/* Main Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <div key={item.id} className="relative">
                <button
                  onClick={() => {
                    if (item.path) {
                      navigate(item.path);
                    } else {
                      setActiveDropdown(activeDropdown === item.id ? null : item.id);
                    }
                  }}
                  className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive(item.path || '') || activeDropdown === item.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.children && <ChevronDown className="w-4 h-4" />}
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {activeDropdown === item.id && item.children && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                    >
                      {item.children.map((child) => (
                        <button
                          key={child.path}
                          onClick={() => {
                            navigate(child.path);
                            setActiveDropdown(null);
                          }}
                          className={`w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                            isActive(child.path) ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                          }`}
                        >
                          <child.icon className="w-4 h-4" />
                          <span>{child.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            {variant !== 'minimal' && (
              <div className="hidden lg:block relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-64"
                />
              </div>
            )}

            {/* Notifications */}
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
              <Bell className="w-5 h-5 text-gray-500" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Messages */}
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <MessageSquare className="w-5 h-5 text-gray-500" />
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                  ) : (
                    <User className="w-4 h-4 text-white" />
                  )}
                </div>
                {variant !== 'minimal' && (
                  <>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.role}</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </>
                )}
              </button>

              {/* User Dropdown */}
              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                  >
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          {user?.avatar ? (
                            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                          ) : (
                            <User className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                          <p className="text-xs text-gray-500">{user?.company}</p>
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                            {user?.role}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      {userMenuItems.map((item) => (
                        <button
                          key={item.path}
                          onClick={() => {
                            navigate(item.path);
                            setShowUserMenu(false);
                          }}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                        >
                          <item.icon className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700">{item.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Logout */}
                    <div className="border-t border-gray-200 py-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden border-t border-gray-200">
        <div className="px-4 py-2 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.path) {
                  navigate(item.path);
                } else {
                  setActiveDropdown(activeDropdown === item.id ? null : item.id);
                }
              }}
              className={`w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive(item.path || '') || activeDropdown === item.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
              {item.children && <ChevronDown className="w-4 h-4 ml-auto" />}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default HorizontalMenu;
