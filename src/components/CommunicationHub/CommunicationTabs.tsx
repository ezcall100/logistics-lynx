import React from 'react';
import type { CommunicationTab } from './types';

interface CommunicationTabsProps {
  tabs: CommunicationTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const CommunicationTabs: React.FC<CommunicationTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 dark:from-slate-800 dark:via-blue-900/20 dark:to-indigo-900/20 responsive-container">
      {/* Communication Groups */}
      <div className="space-y-3 responsive-container">
        {/* Primary Communication */}
        <div>
          <h4 className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 px-1 responsive-container">Primary</h4>
          <div className="grid grid-cols-3 gap-2 responsive-container">
            {tabs.slice(0, 3).map((tab) => renderTab(tab))}
          </div>
        </div>
        
        {/* Secondary Communication */}
        <div>
          <h4 className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 px-1 responsive-container">Secondary</h4>
          <div className="grid grid-cols-3 gap-2 responsive-container">
            {tabs.slice(3, 6).map((tab) => renderTab(tab))}
          </div>
        </div>
        
        {/* Productivity Tools */}
        <div>
          <h4 className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 px-1 responsive-container">Productivity</h4>
          <div className="grid grid-cols-3 gap-2 responsive-container">
            {tabs.slice(6, 9).map((tab) => renderTab(tab))}
          </div>
        </div>
      </div>
    </div>
  );
  
  function renderTab(tab: unknown) {
    const Icon = tab.icon;
    const isActive = activeTab === tab.id;
    
    return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
      <button
        key={tab.id}
        onClick={() => onTabChange(tab.id)}
            aria-label="Button"
        className={`group relative flex flex-col items-center space-y-1 p-2 sm:p-2.5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg min-h-[50px] ${
          isActive
            ? 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/40 border-2 border-blue-300 dark:border-blue-600 shadow-md ring-1 ring-blue-200 dark:ring-blue-800'
            : 'bg-white dark:bg-slate-600 border border-gray-200 dark:border-gray-600 hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-100 dark:hover:from-slate-500 dark:hover:to-slate-400 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-500'
        }`}
        aria-label={`${tab.label} communication`}
      >
              <div className={`relative p-1.5 sm:p-2 rounded-lg transition-all duration-300 group-hover:scale-110 ${
                isActive
                  ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg ring-2 ring-blue-300 dark:ring-blue-700'
                  : tab.isAI
                  ? 'bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-md hover:shadow-lg'
                  : tab.id === 'chat'
                  ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-sm hover:shadow-md'
                  : tab.id === 'email'
                  ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-sm hover:shadow-md'
                  : tab.id === 'tasks'
                  ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-sm hover:shadow-md'
                  : tab.id === 'phone'
                  ? 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-sm hover:shadow-md'
                  : tab.id === 'text'
                  ? 'bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-sm hover:shadow-md'
                  : tab.id === 'video'
                  ? 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-sm hover:shadow-md'
                  : tab.id === 'calendar'
                  ? 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-sm hover:shadow-md'
                  : tab.id === 'notes'
                  ? 'bg-gradient-to-br from-slate-500 to-slate-600 text-white shadow-sm hover:shadow-md'
                  : 'bg-gradient-to-br from-gray-500 to-gray-600 text-white shadow-sm hover:shadow-md'
              }`}>
                <Icon className="h-3 w-3 sm:h-4 sm:w-4 responsive-container" />
                
                {/* Badge */}
                {tab.badge > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-3 w-3 sm:h-3.5 sm:w-3.5 bg-gradient-to-br from-red-500 to-red-600 text-white text-[10px] sm:text-xs rounded-full flex items-center justify-center font-bold shadow-md ring-1 ring-white dark:ring-gray-800 animate-pulse responsive-container">
                    {tab.badge > 9 ? '9+' : tab.badge}
                  </span>
                )}
                
                {/* AI Status Indicator */}
                {tab.isAI && (
                  <div className="absolute -top-0.5 -left-0.5 h-2 w-2 sm:h-2.5 sm:w-2.5 bg-gradient-to-br from-green-400 to-green-500 rounded-full border border-white dark:border-gray-800 animate-pulse shadow-md responsive-container">
                    <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75 responsive-container"></div>
                  </div>
                )}
                
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 responsive-container"></div>
                
                {/* Status Indicator */}
                <div className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full ${
                  tab.id === 'ai-assistant' ? 'bg-green-400 animate-pulse' :
                  tab.id === 'chat' ? 'bg-blue-400' :
                  tab.id === 'email' ? 'bg-orange-400' :
                  'bg-gray-400'
                }`}></div>
                
                {/* Quick Action Button */}
                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 responsive-container">
                  <button 
                    className="w-4 h-4 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center shadow-sm hover:bg-white dark:hover:bg-gray-700 transition-colors responsive-container"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Quick action logic here
                    }}
                    aria-label="Button"
                  >
                    <div className="w-1.5 h-1.5 bg-gray-600 dark:bg-gray-300 rounded-full responsive-container"></div>
                  </button>
                </div>
                
                {/* Enhanced Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-slate-800 dark:to-slate-700 text-white text-[10px] sm:text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-50 pointer-events-none border border-gray-700 dark:border-slate-600 responsive-container">
                  <div className="font-medium text-center responsive-container">{tab.label}</div>
                  <div className="text-[9px] text-gray-300 text-center responsive-container">
                    {tab.badge > 0 ? `${tab.badge} new` : 'Ready'}
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900 dark:border-t-slate-800 responsive-container"></div>
                </div>
              </div>
            </button>
    );
  }
};
