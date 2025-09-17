import React, { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';

/**
 * ResponsiveSidebar - Enhanced Super Admin Component
 * Created by MCP 301 Agents - Design Logic Refactoring
 * Timestamp: 2025-09-14T17:28:33.000Z
 *
 * This component provides responsive sidebar functionality with proper
 * mobile navigation, glass-morphism design, and smooth animations.
 */
interface ResponsiveSidebarProps {
  children?: React.ReactNode;
  className?: string;
  navigationItems?: Array<{
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    path?: string;
    color?: string;
    description?: string;
    count?: number;
    subMenus?: Array<{
      id: string;
      label: string;
      path: string;
    }>;
  }>;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
  expandedMenus?: string[];
  setExpandedMenus?: (menus: string[]) => void;
}

export const ResponsiveSidebar: React.FC<ResponsiveSidebarProps> = ({
  children,
  className = '',
  navigationItems = [],
  activeTab = '',
  setActiveTab = () => {},
  expandedMenus = [],
  setExpandedMenus = () => {},
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMenuToggle = (menuId: string) => {
    const newMenus = expandedMenus.includes(menuId)
      ? expandedMenus.filter((id: string) => id !== menuId)
      : [...expandedMenus, menuId];
    setExpandedMenus(newMenus);
  };

  const handleMenuItemClick = (menuId: string) => {
    setActiveTab(menuId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className={`responsive-sidebar-container ${className}`}>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:block bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border-r border-gray-200 dark:border-slate-700/50 transition-all duration-300 ${
          sidebarCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        <div className="h-full flex flex-col responsive-container sm:flex-col md:flex-row lg:grid">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200 dark:border-slate-700/50 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
              {!sidebarCollapsed && (
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">
                  Navigation
                </h2>
              )}
              <button
                onClick={() = aria-label="Button"> setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
              >
                {sidebarCollapsed ? (
                  <ChevronRight className="h-5 w-5 responsive-container sm:flex-col md:flex-row lg:grid" />
                ) : (
                  <ChevronLeft className="h-5 w-5 responsive-container sm:flex-col md:flex-row lg:grid" />
                )}
              </button>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto responsive-container sm:flex-col md:flex-row lg:grid">
            {navigationItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const isExpanded = expandedMenus.includes(item.id);

              return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
                <div key={item.id} className="space-y-1 responsive-container sm:flex-col md:flex-row lg:grid">
                  <button
                    onClick={() = aria-label="Button"> {
                      if (item.subMenus && item.subMenus.length > 0) {
                        handleMenuToggle(item.id);
                      } else {
                        handleMenuItemClick(item.id);
                      }
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 shadow-sm'
                        : 'hover:bg-gray-50 dark:hover:bg-slate-700/50 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                      <Icon
                        className={`h-5 w-5 ${isActive ? item.color : 'text-gray-500 group-hover:text-gray-700 dark:text-gray-300'}`}
                      />
                      {!sidebarCollapsed && (
                        <div className="flex-1 text-left responsive-container sm:flex-col md:flex-row lg:grid">
                          <div className="font-medium text-sm responsive-container sm:flex-col md:flex-row lg:grid">{item.label}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 truncate responsive-container sm:flex-col md:flex-row lg:grid">
                            {item.description}
                          </div>
                        </div>
                      )}
                    </div>
                    {!sidebarCollapsed && item.subMenus && item.subMenus.length > 0 && (
                      <ChevronRight
                        className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                      />
                    )}
                  </button>

                  {/* Sub-Menus */}
                  {!sidebarCollapsed && isExpanded && item.subMenus && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-4 space-y-1 border-l border-gray-200 dark:border-slate-700 pl-4 responsive-container sm:flex-col md:flex-row lg:grid"
                    >
                      {item.subMenus.map((subMenu: { id: string; label: string; path: string }) => {
                        const isSubActive = activeTab === subMenu.id;

                        return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
                          <button
                            key={subMenu.id}
                            onClick={() = aria-label="Button"> handleMenuItemClick(subMenu.id)}
                            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
                              isSubActive
                                ? 'bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-800/30 dark:to-indigo-800/30 text-blue-700 dark:text-blue-300'
                                : 'hover:bg-gray-50 dark:hover:bg-slate-700/50 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:text-gray-200'
                            }`}
                          >
                            <div className="w-2 h-2 rounded-full bg-gray-400 group-hover:bg-gray-600 responsive-container sm:flex-col md:flex-row lg:grid" />
                            <span className="text-sm font-medium responsive-container sm:flex-col md:flex-row lg:grid">{subMenu.label}</span>
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() = aria-label="Button"> setMobileMenuOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 responsive-container sm:flex-col md:flex-row lg:grid"
      >
        <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid" />
      </button>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden responsive-container sm:flex-col md:flex-row lg:grid">
          <div
            className="fixed inset-0 bg-black bg-opacity-50 responsive-container sm:flex-col md:flex-row lg:grid"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-0 left-0 w-64 h-full bg-white dark:bg-gray-800 shadow-lg responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">
                  Navigation
                </h2>
                <button
                  onClick={() = aria-label="Button"> setMobileMenuOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  <X className="h-5 w-5 responsive-container sm:flex-col md:flex-row lg:grid" />
                </button>
              </div>
            </div>
            <nav className="p-4 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                {navigationItems.map(item => {
                  const isActive = activeTab === item.id;
                  const isExpanded = expandedMenus.includes(item.id);

                  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
                    <div key={item.id} className="space-y-1 responsive-container sm:flex-col md:flex-row lg:grid">
                      <button
                        onClick={() = aria-label="Button"> {
                          if (item.subMenus && item.subMenus.length > 0) {
                            handleMenuToggle(item.id);
                          } else {
                            handleMenuItemClick(item.id);
                          }
                        }}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                            : 'hover:bg-gray-100 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:text-gray-100'
                        }`}
                      >
                        <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                          <item.icon
                            className={`h-5 w-5 ${isActive ? 'text-white' : item.color}`}
                          />
                          <div className="flex-1 text-left responsive-container sm:flex-col md:flex-row lg:grid">
                            <div className="font-medium responsive-container sm:flex-col md:flex-row lg:grid">{item.label}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 truncate responsive-container sm:flex-col md:flex-row lg:grid">
                              {item.description}
                            </div>
                          </div>
                        </div>
                        {item.subMenus && item.subMenus.length > 0 && (
                          <ChevronRight
                            className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''} ${isActive ? 'text-white' : 'text-gray-400'}`}
                          />
                        )}
                      </button>

                      {/* Sub-menus */}
                      {isExpanded && item.subMenus && (
                        <div className="ml-4 space-y-1 responsive-container sm:flex-col md:flex-row lg:grid">
                          {item.subMenus.map(
                            (subMenu: { id: string; label: string; path: string }) => {
                              const isSubActive = activeTab === subMenu.id;

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
                                <button
                                  key={subMenu.id}
                                  onClick={() = aria-label="Button"> handleMenuItemClick(subMenu.id)}
                                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
                                    isSubActive
                                      ? 'bg-gradient-to-r from-blue-400 to-purple-500 text-white shadow-md'
                                      : 'hover:bg-gray-50 dark:hover:bg-slate-700/50 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:text-gray-200'
                                  }`}
                                >
                                  <div className="w-2 h-2 rounded-full bg-gray-400 group-hover:bg-gray-600 responsive-container sm:flex-col md:flex-row lg:grid" />
                                  <span className="text-sm font-medium responsive-container sm:flex-col md:flex-row lg:grid">{subMenu.label}</span>
                                </button>
                              );
                            }
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Content */}
      {children}

      <div className="mcp-agent-indicator responsive-container sm:flex-col md:flex-row lg:grid">
        <span className="text-xs text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
          🤖 Enhanced by MCP 301 Agents - 2025-09-14T17:28:33.000Z
        </span>
      </div>
    </div>
  );
};

export default ResponsiveSidebar;
