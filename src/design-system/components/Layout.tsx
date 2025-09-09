/**
 * MCP Agents - Redesigned Layout Components
 * Modern header, sidebar, and main layout with glassmorphism and animations
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useTheme } from '../theme';
import {
  Menu,
  X,
  Search,
  Bell,
  Settings,
  User,
  ChevronDown,
  ChevronRight,
  Building2,
  Users,
  DollarSign,
  Shield,
  Globe,
  Brain,
  BarChart3,
  Moon,
  Sun,
} from 'lucide-react';

// ===== NAVIGATION ITEM TYPE =====
export interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href?: string;
  badge?: string | number;
  children?: NavigationItem[];
  permission?: string;
}

// ===== HEADER COMPONENT =====
export const Header: React.FC<{
  title?: string;
  subtitle?: string;
  onMenuClick?: () => void;
  onSearch?: (query: string) => void;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  notifications?: number;
  user?: {
    name: string;
    email: string;
    avatar?: string;
    role: string;
  };
  className?: string;
}> = ({
  title = 'Super Admin Portal',
  subtitle,
  onMenuClick,
  onSearch,
  onNotificationClick,
  onProfileClick,
  onSettingsClick,
  notifications = 0,
  user,
  className,
}) => {
  const { toggleTheme, isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  return (
    <motion.header
      className={cn(
        'sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md',
        'dark:border-gray-800 dark:bg-gray-900/80',
        className
      )}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Menu Button */}
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Title */}
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h1>
            {subtitle && <p className="text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>}
          </div>
        </div>

        {/* Center Section - Search */}
        {onSearch && (
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={e => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>
        )}

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {/* Notifications */}
          {onNotificationClick && (
            <button
              onClick={onNotificationClick}
              className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications > 9 ? '9+' : notifications}
                </span>
              )}
            </button>
          )}

          {/* Settings */}
          {onSettingsClick && (
            <button
              onClick={onSettingsClick}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
          )}

          {/* User Menu */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                ) : (
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{user.role}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {/* User Dropdown */}
              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{user.email}</p>
                    </div>
                    <button
                      onClick={onProfileClick}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </button>
                    <button
                      onClick={onSettingsClick}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                    <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
                      <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
};

// ===== SIDEBAR COMPONENT =====
export const Sidebar: React.FC<{
  items: NavigationItem[];
  collapsed?: boolean;
  onToggle?: () => void;
  onItemClick?: (item: NavigationItem) => void;
  activeItem?: string;
  className?: string;
}> = ({ items, collapsed = false, onToggle, onItemClick, activeItem, className }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  const renderItem = (item: NavigationItem, level = 0) => {
    const isActive = activeItem === item.id;
    const isExpanded = expandedItems.includes(item.id);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.id}>
        <motion.button
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id);
            } else {
              onItemClick?.(item);
            }
          }}
          className={cn(
            'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors',
            'hover:bg-gray-100 dark:hover:bg-gray-800',
            {
              'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300': isActive,
              'text-gray-700 dark:text-gray-300': !isActive,
              'pl-6': level > 0,
            }
          )}
          whileHover={{ x: 4 }}
          transition={{ duration: 0.1 }}
        >
          <item.icon className="w-5 h-5 flex-shrink-0" />
          {!collapsed && (
            <>
              <span className="flex-1 truncate">{item.label}</span>
              {item.badge && (
                <span className="px-2 py-1 text-xs bg-primary-100 text-primary-700 rounded-full">
                  {item.badge}
                </span>
              )}
              {hasChildren && (
                <motion.div
                  animate={{ rotate: isExpanded ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="w-4 h-4" />
                </motion.div>
              )}
            </>
          )}
        </motion.button>

        {/* Children */}
        <AnimatePresence>
          {hasChildren && isExpanded && !collapsed && (
            <motion.div
              className="ml-4 mt-1 space-y-1"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {item.children?.map(child => renderItem(child, level + 1))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <motion.aside
      className={cn(
        'flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        {!collapsed && (
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Navigation</h2>
        )}
        {onToggle && (
          <button
            onClick={onToggle}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <X className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {items.map(item => renderItem(item))}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        {!collapsed && (
          <div className="text-xs text-gray-500 dark:text-gray-400">
            <p>Super Admin Portal</p>
            <p>v2.0.0</p>
          </div>
        )}
      </div>
    </motion.aside>
  );
};

// ===== MAIN LAYOUT COMPONENT =====
export const MainLayout: React.FC<{
  children: React.ReactNode;
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  className?: string;
}> = ({ children, header, sidebar, className }) => {
  return (
    <div className={cn('flex h-screen bg-gray-50 dark:bg-gray-900', className)}>
      {/* Sidebar */}
      {sidebar && <div className="flex-shrink-0">{sidebar}</div>}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        {header && <div className="flex-shrink-0">{header}</div>}

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

// ===== PAGE HEADER COMPONENT =====
export const PageHeader: React.FC<{
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  className?: string;
}> = ({ title, subtitle, actions, breadcrumbs, className }) => {
  return (
    <motion.div
      className={cn('mb-8', className)}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Breadcrumbs */}
      {breadcrumbs && (
        <nav className="flex mb-4" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                {crumb.href ? (
                  <a
                    href={crumb.href}
                    className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-sm text-gray-900 dark:text-white">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      {/* Header Content */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </motion.div>
  );
};

// ===== DEFAULT NAVIGATION ITEMS =====
export const defaultNavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: BarChart3,
    href: '/dashboard',
  },
  {
    id: 'companies',
    label: 'Companies',
    icon: Building2,
    href: '/companies',
    badge: '12',
    children: [
      {
        id: 'companies-list',
        label: 'All Companies',
        icon: Building2,
        href: '/companies',
      },
      {
        id: 'companies-add',
        label: 'Add Company',
        icon: Building2,
        href: '/companies/add',
      },
    ],
  },
  {
    id: 'users',
    label: 'Users',
    icon: Users,
    href: '/users',
    badge: '3',
  },
  {
    id: 'portals',
    label: 'Portals',
    icon: Globe,
    href: '/portals',
  },
  {
    id: 'billing',
    label: 'Billing',
    icon: DollarSign,
    href: '/billing',
  },
  {
    id: 'security',
    label: 'Security',
    icon: Shield,
    href: '/security',
  },
  {
    id: 'ai-agents',
    label: 'AI Agents',
    icon: Brain,
    href: '/ai-agents',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    href: '/settings',
  },
];

export default MainLayout;
