import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, Home, Building2, ToggleLeft, Users, CreditCard, 
  BarChart3, Settings, ChevronRight, ChevronDown,
  Plus, Minus, Shield, Database, Globe, Zap
} from 'lucide-react';
import { MenuItem } from '../../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
  onNavigate: (path: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, currentPath, onNavigate }) => {
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['platform']);

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'Home',
      path: '/dashboard'
    },
    {
      id: 'platform',
      label: 'Platform Management',
      icon: 'Bot',
      children: [
        { id: 'companies', label: 'Company Management', icon: 'Building2', path: '/companies' },
        { id: 'portals', label: 'Portal Management', icon: 'ToggleLeft', path: '/portals' },
        { id: 'users', label: 'User Management', icon: 'Users', path: '/users' },
        { id: 'billing', label: 'Billing & Subscriptions', icon: 'CreditCard', path: '/billing' },
        { id: 'analytics', label: 'System Analytics', icon: 'BarChart3', path: '/analytics' },
        { id: 'settings', label: 'Global Settings', icon: 'Settings', path: '/settings' }
      ]
    },
    {
      id: 'ai',
      label: 'AI Command Center',
      icon: 'Zap',
      children: [
        { id: 'agents', label: 'Autonomous Agents', icon: 'Bot', path: '/ai/agents' },
        { id: 'network', label: 'Company Network', icon: 'Globe', path: '/ai/network' },
        { id: 'ecosystem', label: 'Portal Ecosystem', icon: 'Database', path: '/ai/ecosystem' },
        { id: 'analytics', label: 'AI Analytics', icon: 'BarChart3', path: '/ai/analytics' }
      ]
    },
    {
      id: 'security',
      label: 'Security & Compliance',
      icon: 'Shield',
      children: [
        { id: 'access', label: 'Access Control', icon: 'Users', path: '/security/access' },
        { id: 'audit', label: 'Audit Logs', icon: 'Database', path: '/security/audit' },
        { id: 'compliance', label: 'Compliance', icon: 'Shield', path: '/security/compliance' }
      ]
    }
  ];

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType<any> } = {
      Home, Bot, Building2, ToggleLeft, Users, CreditCard, 
      BarChart3, Settings, Shield, Database, Globe, Zap
    };
    const IconComponent = icons[iconName] || Home;
    return <IconComponent className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />;
  };

  const isActive = (path: string) => currentPath === path;
  const isExpanded = (menuId: string) => expandedMenus.includes(menuId);

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
            className="fixed inset-0 bg-black/50 z-40 lg:hidden responsive-container sm:flex-col md:flex-row lg:grid"
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
        className="portal-sidebar fixed left-0 top-16 bottom-0 w-80 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border-r border-gray-200/30 dark:border-slate-700/30 shadow-2xl z-50 lg:translate-x-0 lg:opacity-100 transition-all duration-300 responsive-container sm:flex-col md:flex-row lg:grid"
      >
        <div className="flex flex-col h-full responsive-container sm:flex-col md:flex-row lg:grid">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-200/30 dark:border-slate-700/30 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-3 rounded-2xl shadow-lg responsive-container sm:flex-col md:flex-row lg:grid">
                <Bot className="w-6 h-6 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-slate-100 responsive-container sm:flex-col md:flex-row lg:grid">Navigation</h2>
                <p className="text-sm text-gray-600 dark:text-slate-400 font-medium responsive-container sm:flex-col md:flex-row lg:grid">Platform Management</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
            {menuItems.map((item) => (
              <div key={item.id}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() = aria-label="Button"> toggleMenu(item.id)}
                      className="w-full flex items-center justify-between px-4 py-3 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-all duration-200 group hover:scale-[1.02] responsive-container sm:flex-col md:flex-row lg:grid"
                    >
                      <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                        {getIcon(item.icon)}
                        <span className="font-medium responsive-container sm:flex-col md:flex-row lg:grid">{item.label}</span>
                      </div>
                      {isExpanded(item.id) ? (
                        <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid" />
                      )}
                    </button>
                    
                    <AnimatePresence>
                      {isExpanded(item.id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-6 mt-1 space-y-1 overflow-hidden responsive-container sm:flex-col md:flex-row lg:grid"
                        >
                          {item.children.map((child) => (
                            <button
                              key={child.id}
                              onClick={() = aria-label="Button"> onNavigate(child.path!)}
                              className={`w-full flex items-center space-x-3 px-4 py-2.5 text-sm rounded-lg transition-all duration-200 hover:scale-[1.02] ${
                                isActive(child.path!)
                                  ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-l-4 border-blue-500 shadow-sm'
                                  : 'text-gray-600 hover:bg-gray-100'
                              }`}
                            >
                              {getIcon(child.icon)}
                              <span>{child.label}</span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <button
                    onClick={() = aria-label="Button"> onNavigate(item.path!)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
                      isActive(item.path!)
                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-l-4 border-blue-500 shadow-sm'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {getIcon(item.icon)}
                    <span className="font-medium responsive-container sm:flex-col md:flex-row lg:grid">{item.label}</span>
                  </button>
                )}
              </div>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-200/30 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4 rounded-2xl shadow-sm border border-gray-200/30 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="flex items-center space-x-3 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse shadow-lg responsive-container sm:flex-col md:flex-row lg:grid"></div>
                <span className="text-sm font-semibold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">System Status</span>
              </div>
              <p className="text-xs text-gray-700 font-medium responsive-container sm:flex-col md:flex-row lg:grid">All systems operational</p>
              <p className="text-xs text-gray-600 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">Uptime: 99.9%</p>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
