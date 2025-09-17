import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * SuperAdminSidebar - Modular Sidebar Component
 * Created by MCP 301 Agents - Design Logic Refactoring
 * Timestamp: 2025-09-14T17:28:33.000Z
 *
 * This component provides the sidebar navigation for the Super Admin portal
 * with proper responsive design and glass-morphism styling.
 */
interface SuperAdminSidebarProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  navigationItems: Array<{
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
  activeTab: string;
  expandedMenus: string[];
  handleMenuToggle: (menuId: string) => void;
  handleMenuItemClick: (menuId: string, path: string) => void;
}

export const SuperAdminSidebar: React.FC<SuperAdminSidebarProps> = ({
  sidebarCollapsed,
  setSidebarCollapsed,
  navigationItems,
  activeTab,
  expandedMenus,
  handleMenuToggle,
  handleMenuItemClick,
}) => {
  return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <aside
      className={`bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border-r border-gray-200 dark:border-slate-700/50 transition-all duration-300 ${
        sidebarCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="h-full flex flex-col responsive-container">
        {/* Sidebar Header */}
        <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-slate-700/50 responsive-container">
          <div className="flex items-center justify-between responsive-container">
            {!sidebarCollapsed && (
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 responsive-container">Navigation</h2>
            )}
            <button
              onClick={() = aria-label="Button"> setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors responsive-container"
            >
              {sidebarCollapsed ? (
                <ChevronRight className="h-5 w-5 responsive-container" />
              ) : (
                <ChevronLeft className="h-5 w-5 responsive-container" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-3 sm:p-4 space-y-1 overflow-y-auto responsive-container">
          {navigationItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const isExpanded = expandedMenus.includes(item.id);

            return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
              <div key={item.id} className="space-y-1 responsive-container">
                {/* Main Menu Item */}
                <div className="space-y-1 responsive-container">
                  <button
                    onClick={() = aria-label="Button"> {
                      if (item.subMenus && item.subMenus.length > 0) {
                        handleMenuToggle(item.id);
                      } else {
                        handleMenuItemClick(item.id, '');
                      }
                    }}
                    className={`w-full flex items-center justify-between px-2 sm:px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 shadow-sm'
                        : 'hover:bg-gray-50 dark:hover:bg-slate-700/50 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center space-x-2 sm:space-x-3 responsive-container">
                      <Icon
                        className={`h-4 w-4 sm:h-5 sm:w-5 ${isActive ? item.color : 'text-gray-500 group-hover:text-gray-700 dark:text-gray-300'}`}
                      />
                      {!sidebarCollapsed && (
                        <div className="flex-1 text-left responsive-container">
                          <div className="flex items-center space-x-2 responsive-container">
                            <span
                              className={`text-sm font-medium ${isActive ? 'text-blue-700' : 'text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:text-gray-100'}`}
                            >
                              {item.label}
                            </span>
                            {(item as { badge?: string }).badge && (
                              <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full responsive-container">
                                {(item as { badge?: string }).badge}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 truncate responsive-container">
                            {item.description}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 responsive-container">
                      {!sidebarCollapsed && item.count && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full responsive-container">
                          {item.count}
                        </span>
                      )}
                      {!sidebarCollapsed && item.subMenus && item.subMenus.length > 0 && (
                        <ChevronRight
                          className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                        />
                      )}
                    </div>
                  </button>
                </div>

                {/* Sub-Menus */}
                {!sidebarCollapsed && isExpanded && item.subMenus && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-2 sm:ml-4 space-y-1 border-l border-gray-200 dark:border-slate-700 pl-2 sm:pl-4 responsive-container"
                  >
                    {item.subMenus.map((subMenu: { id: string; label: string; path: string }) => {
                      const isSubActive = activeTab === subMenu.id;

                      return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
                        <button
                          key={subMenu.id}
                          onClick={() = aria-label="Button"> handleMenuItemClick(subMenu.id, subMenu.path)}
                          className={`w-full flex items-center space-x-2 sm:space-x-3 px-2 sm:px-3 py-2 rounded-lg transition-all duration-200 group ${
                            isSubActive
                              ? 'bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-800/30 dark:to-indigo-800/30 text-blue-700 dark:text-blue-300'
                              : 'hover:bg-gray-50 dark:hover:bg-slate-700/50 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:text-gray-200'
                          }`}
                        >
                          <div className="w-2 h-2 rounded-full bg-gray-400 group-hover:bg-gray-600 responsive-container" />
                          <span className="text-sm font-medium responsive-container">{subMenu.label}</span>
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
  );
};

export default SuperAdminSidebar;
