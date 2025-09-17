import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, ChevronDown, ChevronRight, Building2, Users, Settings, 
  Shield, BarChart3, CreditCard, FileText, HelpCircle, 
  LogOut, Activity, Database, Globe, Cpu, HardDrive, Wifi,
  Layers, Zap, Target, Filter, BookOpen, Award, Lightbulb,
  Menu, X, Home, Bell, Star, Clock, TrendingUp,
  Plus, Minus, ChevronUp, ArrowRight, ArrowLeft
} from 'lucide-react';
import { MenuItem } from '../../types';

interface EnhancedSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
  onNavigate: (path: string) => void;
}

const EnhancedSidebar: React.FC<EnhancedSidebarProps> = ({ 
  isOpen, 
  onClose, 
  currentPath, 
  onNavigate 
}) => {
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['platform']);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'Home',
      path: '/dashboard',
      badge: null,
      shortcut: '⌘D'
    },
    {
      id: 'companies', 
      label: 'Company Management', 
      icon: 'Building2', 
      path: '/companies',
      badge: '8',
      description: 'Manage client companies'
    },
    { 
      id: 'portals', 
      label: 'Portal Management', 
      icon: 'Layers', 
      path: '/portals',
      badge: '24',
      description: 'Configure portal access'
    },
    { 
      id: 'users', 
      label: 'User Management', 
      icon: 'Users', 
      path: '/users',
      badge: '156',
      description: 'User accounts & permissions'
    },
    { 
      id: 'billing', 
      label: 'Billing & Subscriptions', 
      icon: 'CreditCard', 
      path: '/billing',
      badge: 'Active',
      description: 'Revenue & subscriptions'
    },
    { 
      id: 'analytics', 
      label: 'System Analytics', 
      icon: 'BarChart3', 
      path: '/analytics',
      description: 'Platform performance metrics'
    },
    { 
      id: 'settings', 
      label: 'Global Settings', 
      icon: 'Settings', 
      path: '/settings',
      description: 'System configuration'
    },
    {
      id: 'ai',
      label: 'AI Command Center',
      icon: 'Zap',
      badge: 'Live',
      children: [
        { 
          id: 'agents', 
          label: 'Autonomous Agents', 
          icon: 'Bot', 
          path: '/ai/agents',
          badge: '3',
          description: 'AI agent management'
        },
        { 
          id: 'network', 
          label: 'Company Network', 
          icon: 'Globe', 
          path: '/ai/network',
          description: 'Network topology'
        },
        { 
          id: 'ecosystem', 
          label: 'Portal Ecosystem', 
          icon: 'Database', 
          path: '/ai/ecosystem',
          description: 'Ecosystem analytics'
        },
        { 
          id: 'analytics', 
          label: 'AI Analytics', 
          icon: 'TrendingUp', 
          path: '/ai/analytics',
          description: 'AI performance metrics'
        }
      ]
    },
    {
      id: 'security',
      label: 'Security & Compliance',
      icon: 'Shield',
      badge: 'Secure',
      children: [
        { 
          id: 'audit', 
          label: 'Audit Logs', 
          icon: 'FileText', 
          path: '/security/audit',
          description: 'System audit trails'
        },
        { 
          id: 'compliance', 
          label: 'Compliance', 
          icon: 'Award', 
          path: '/security/compliance',
          description: 'Regulatory compliance'
        },
        { 
          id: 'monitoring', 
          label: 'Security Monitoring', 
          icon: 'Activity', 
          path: '/security/monitoring',
          badge: 'Alert',
          description: 'Real-time security monitoring'
        }
      ]
    }
  ];

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType<any> } = {
      Home, Bot, Building2, Users, Settings, Shield, BarChart3, CreditCard,
      FileText, HelpCircle, LogOut, Activity, Database, Globe, Cpu, HardDrive,
      Wifi, Layers, Zap, Target, Filter, BookOpen, Award, Lightbulb,
      Menu, X, Bell, Star, Clock, TrendingUp, Plus, Minus
    };
    const IconComponent = icons[iconName] || HelpCircle;
    return <IconComponent className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />;
  };

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const isExpanded = (menuId: string) => expandedMenus.includes(menuId);

  const filteredMenuItems = menuItems;

  const handleItemClick = (item: MenuItem) => {
    if (item.children) {
      toggleMenu(item.id);
    } else {
      onNavigate(item.path);
      onClose();
    }
  };

  const handleSubItemClick = (subItem: MenuItem) => {
    onNavigate(subItem.path);
    onClose();
  };

  return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden responsive-container sm:flex-col md:flex-row lg:grid"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : -320,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`portal-sidebar fixed left-0 top-16 bottom-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border-r border-gray-200/30 dark:border-slate-700/30 shadow-2xl z-50 lg:translate-x-0 lg:opacity-100 transition-all duration-300 ${
          isCollapsed ? 'w-16' : 'w-80'
        }`}
      >
        <div className="flex flex-col h-full responsive-container sm:flex-col md:flex-row lg:grid">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200/30 dark:border-slate-700/30 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
              {!isCollapsed && (
                <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-2 rounded-xl shadow-lg responsive-container sm:flex-col md:flex-row lg:grid">
                    <Bot className="w-6 h-6 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-slate-100 responsive-container sm:flex-col md:flex-row lg:grid">Navigation</h2>
                    <p className="text-xs text-gray-600 dark:text-slate-400 responsive-container sm:flex-col md:flex-row lg:grid">Platform Management</p>
                  </div>
                </div>
              )}
              
              {/* Collapse Toggle */}
              <button
                onClick={() = aria-label="Button"> setIsCollapsed(!isCollapsed)}
                className="p-2 text-gray-600 dark:text-slate-400 hover:text-gray-800 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              >
                {isCollapsed ? <ArrowRight className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" /> : <ArrowLeft className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />}
              </button>
            </div>

          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1 responsive-container sm:flex-col md:flex-row lg:grid">
            {filteredMenuItems.map((item) => (
              <div key={item.id}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() = aria-label="Button"> handleItemClick(item)}
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className={`w-full flex items-center justify-between px-3 py-3 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-all duration-200 group hover:scale-[1.02] ${
                        isExpanded(item.id) ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div className={`p-2 rounded-lg transition-colors ${
                          isExpanded(item.id) 
                            ? 'bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-400' 
                            : 'bg-gray-100 dark:bg-slate-600 text-gray-600 dark:text-slate-300'
                        }`}>
                          {getIcon(item.icon)}
                        </div>
                        {!isCollapsed && (
                          <div className="flex-1 text-left responsive-container sm:flex-col md:flex-row lg:grid">
                            <span className="font-medium responsive-container sm:flex-col md:flex-row lg:grid">{item.label}</span>
                            {item.badge && (
                              <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                                item.badge === 'Live' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                item.badge === 'Secure' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                                item.badge === 'Alert' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                'bg-gray-100 text-gray-700 dark:bg-slate-600 dark:text-slate-300'
                              }`}>
                                {item.badge}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      {!isCollapsed && (
                        <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                          {item.shortcut && (
                            <span className="text-xs text-gray-400 dark:text-slate-500 font-mono responsive-container sm:flex-col md:flex-row lg:grid">
                              {item.shortcut}
                            </span>
                          )}
                          {isExpanded(item.id) ? (
                            <ChevronUp className="w-4 h-4 text-gray-500 dark:text-slate-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-gray-500 dark:text-slate-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                          )}
                        </div>
                      )}
                    </button>

                    {/* Submenu */}
                    <AnimatePresence>
                      {isExpanded(item.id) && !isCollapsed && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-4 mt-1 space-y-1 border-l border-gray-200 dark:border-slate-600 pl-4 responsive-container sm:flex-col md:flex-row lg:grid"
                        >
                          {item.children.map((subItem) => (
                            <button
                              key={subItem.id}
                              onClick={() = aria-label="Button"> handleSubItemClick(subItem)}
                              className={`w-full flex items-center justify-between px-3 py-2 text-sm text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg transition-all duration-200 group ${
                                currentPath === subItem.path ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : ''
                              }`}
                            >
                              <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                                <div className={`p-1.5 rounded-md transition-colors ${
                                  currentPath === subItem.path 
                                    ? 'bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-400' 
                                    : 'bg-gray-100 dark:bg-slate-600 text-gray-500 dark:text-slate-400'
                                }`}>
                                  {getIcon(subItem.icon)}
                                </div>
                                <div className="flex-1 text-left responsive-container sm:flex-col md:flex-row lg:grid">
                                  <span className="font-medium responsive-container sm:flex-col md:flex-row lg:grid">{subItem.label}</span>
                                  {subItem.badge && (
                                    <span className={`ml-2 px-1.5 py-0.5 text-xs rounded-full ${
                                      subItem.badge === 'Alert' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                      'bg-gray-100 text-gray-600 dark:bg-slate-600 dark:text-slate-400'
                                    }`}>
                                      {subItem.badge}
                                    </span>
                                  )}
                                  {subItem.description && (
                                    <p className="text-xs text-gray-500 dark:text-slate-500 mt-0.5 responsive-container sm:flex-col md:flex-row lg:grid">
                                      {subItem.description}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <button
                    onClick={() = aria-label="Button"> handleItemClick(item)}
                    className={`w-full flex items-center space-x-3 px-3 py-3 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-all duration-200 group hover:scale-[1.02] ${
                      currentPath === item.path ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : ''
                    }`}
                  >
                    <div className={`p-2 rounded-lg transition-colors ${
                      currentPath === item.path 
                        ? 'bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-400' 
                        : 'bg-gray-100 dark:bg-slate-600 text-gray-600 dark:text-slate-300'
                    }`}>
                      {getIcon(item.icon)}
                    </div>
                    {!isCollapsed && (
                      <div className="flex-1 text-left responsive-container sm:flex-col md:flex-row lg:grid">
                        <span className="font-medium responsive-container sm:flex-col md:flex-row lg:grid">{item.label}</span>
                        {item.badge && (
                          <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                            item.badge === 'Live' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                            item.badge === 'Secure' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                            item.badge === 'Alert' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                            'bg-gray-100 text-gray-700 dark:bg-slate-600 dark:text-slate-300'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                        {item.shortcut && (
                          <span className="ml-2 text-xs text-gray-400 dark:text-slate-500 font-mono responsive-container sm:flex-col md:flex-row lg:grid">
                            {item.shortcut}
                          </span>
                        )}
                        {item.description && (
                          <p className="text-xs text-gray-500 dark:text-slate-500 mt-0.5 responsive-container sm:flex-col md:flex-row lg:grid">
                            {item.description}
                          </p>
                        )}
                      </div>
                    )}
                  </button>
                )}
              </div>
            ))}
          </nav>

          {/* Sidebar Footer */}
          {!isCollapsed && (
            <div className="p-4 border-t border-gray-200/30 dark:border-slate-700/30 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-3 text-white responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse responsive-container sm:flex-col md:flex-row lg:grid"></div>
                  <span className="text-sm font-medium responsive-container sm:flex-col md:flex-row lg:grid">All Systems Operational</span>
                </div>
                <p className="text-xs text-green-100 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">Last updated 2 minutes ago</p>
              </div>
            </div>
          )}
        </div>
      </motion.aside>
    </>
  );
};

export default EnhancedSidebar;
