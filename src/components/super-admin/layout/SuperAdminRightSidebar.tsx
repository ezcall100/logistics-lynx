import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { CommunicationHub } from '../../CommunicationHub';

/**
 * SuperAdminRightSidebar - Modular Right Sidebar Component
 * Created by MCP 301 Agents - Design Logic Refactoring
 * Timestamp: 2025-09-14T17:28:33.000Z
 * 
 * This component provides the right sidebar (Communication Hub) for the Super Admin portal
 * with proper responsive design and glass-morphism styling.
 */
interface SuperAdminRightSidebarProps {
  rightSidebarCollapsed: boolean;
  setRightSidebarCollapsed: (collapsed: boolean) => void;
}

export const SuperAdminRightSidebar: React.FC<SuperAdminRightSidebarProps> = ({
  rightSidebarCollapsed,
  setRightSidebarCollapsed
}) => {
  return (
    <motion.aside
      initial={{ width: '20rem' }}
      animate={{ width: rightSidebarCollapsed ? '4rem' : '20rem' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-l border-gray-200 dark:border-gray-700 shadow-xl relative z-20"
    >
      <div className="h-full flex flex-col">
        {/* Communication Hub Header */}
        {!rightSidebarCollapsed && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <MessageCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Hub</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Communication center</p>
                </div>
              </div>
              <button
                onClick={() => setRightSidebarCollapsed(!rightSidebarCollapsed)}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200 transition-all duration-200"
                title="Collapse Hub"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
        
        {/* Collapsed Header - Only Toggle Button */}
        {rightSidebarCollapsed && (
          <div className="p-2 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-center">
              <button
                onClick={() => setRightSidebarCollapsed(!rightSidebarCollapsed)}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200 transition-all duration-200"
                title="Expand Hub"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Communication Hub Content */}
        <div className="flex-1 overflow-hidden">
          {rightSidebarCollapsed ? (
            <div className="flex flex-col items-center py-6 space-y-4">
              <button
                onClick={() => setRightSidebarCollapsed(false)}
                className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all duration-200 hover:scale-105"
                title="Expand Hub"
              >
                <MessageCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </button>
              <div className="w-8 h-0.5 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="text-xs text-gray-500 dark:text-gray-400 text-center leading-tight font-medium">
                Hub
              </div>
              <div className="flex flex-col space-y-2 mt-4">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          ) : (
            <div className="h-full overflow-y-auto">
              <CommunicationHub />
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
};

export default SuperAdminRightSidebar;
