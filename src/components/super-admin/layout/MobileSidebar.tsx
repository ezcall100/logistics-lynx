import React from 'react';
import { ChevronRight, X } from 'lucide-react';

/**
 * MobileSidebar - Modular Mobile Sidebar Component
 * Created by MCP 301 Agents - Design Logic Refactoring
 * Timestamp: 2025-09-14T17:28:33.000Z
 *
 * This component provides the mobile sidebar navigation for the Super Admin portal
 * with proper responsive design and touch interactions.
 */
interface MobileSidebarProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
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
  setActiveTab: (tab: string) => void;
  expandedMenus: string[];
  handleMenuToggle: (menuId: string) => void;
}

export const MobileSidebar: React.FC<MobileSidebarProps> = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  navigationItems,
  activeTab,
  setActiveTab,
  expandedMenus,
  handleMenuToggle,
}) => {
  if (!mobileMenuOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={() => setMobileMenuOpen(false)}
      />
      <div className="fixed top-0 left-0 w-64 h-full bg-white dark:bg-gray-800 shadow-lg">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Navigation</h2>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        <nav className="p-4">
          <div className="space-y-2">
            {navigationItems.map(item => {
              const isActive = activeTab === item.id;
              const isExpanded = expandedMenus.includes(item.id);

              return (
                <div key={item.id} className="space-y-1">
                  {/* Main Menu Item */}
                  <button
                    onClick={() => {
                      if (item.subMenus && item.subMenus.length > 0) {
                        handleMenuToggle(item.id);
                      } else {
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                      }
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'hover:bg-gray-100 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:text-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className={`h-5 w-5 ${isActive ? 'text-white' : item.color}`} />
                      <div className="flex-1 text-left">
                        <div className="font-medium">{item.label}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {item.description}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {item.count && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                          {item.count}
                        </span>
                      )}
                      {item.subMenus && item.subMenus.length > 0 && (
                        <ChevronRight
                          className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''} ${isActive ? 'text-white' : 'text-gray-400'}`}
                        />
                      )}
                    </div>
                  </button>

                  {/* Sub-menus */}
                  {isExpanded && item.subMenus && (
                    <div className="ml-4 space-y-1">
                      {item.subMenus.map((subMenu: { id: string; label: string; path: string }) => {
                        const isSubActive = activeTab === subMenu.id;

                        return (
                          <button
                            key={subMenu.id}
                            onClick={() => {
                              setActiveTab(subMenu.id);
                              setMobileMenuOpen(false);
                            }}
                            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
                              isSubActive
                                ? 'bg-gradient-to-r from-blue-400 to-purple-500 text-white shadow-md'
                                : 'hover:bg-gray-50 dark:hover:bg-slate-700/50 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:text-gray-200'
                            }`}
                          >
                            <div className="w-2 h-2 rounded-full bg-gray-400 group-hover:bg-gray-600" />
                            <span className="text-sm font-medium">{subMenu.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MobileSidebar;
