import React, { useState } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';

// Import modular components
import { SuperAdminHeader } from './SuperAdminHeader';
import { SuperAdminSidebar } from './SuperAdminSidebar';
import { SuperAdminMainContent } from './SuperAdminMainContent';
import { SuperAdminRightSidebar } from './SuperAdminRightSidebar';
import { MobileSidebar } from './MobileSidebar';

/**
 * SuperAdminLayout - Modular Layout Component
 * Created by MCP 301 Agents - Design Logic Refactoring
 * Timestamp: 2025-09-14T17:28:33.000Z
 *
 * This component provides the main layout structure for the Super Admin portal
 * with proper separation of concerns and modular architecture.
 */
interface SuperAdminLayoutProps {
  children?: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  navigationItems: Array<{
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    path?: string;
    subMenus?: Array<{
      id: string;
      label: string;
      path: string;
    }>;
  }>;
  expandedMenus: string[];
  setExpandedMenus: (menus: string[]) => void;
}

export const SuperAdminLayout: React.FC<SuperAdminLayoutProps> = ({
  children,
  activeTab,
  setActiveTab,
  navigationItems,
  expandedMenus,
  setExpandedMenus,
}) => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [rightSidebarCollapsed, setRightSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationCount] = useState(12);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMenuToggle = (menuId: string) => {
    const newMenus = expandedMenus.includes(menuId)
      ? expandedMenus.filter((id: string) => id !== menuId)
      : [...expandedMenus, menuId];
    setExpandedMenus(newMenus);
  };

  const handleMenuItemClick = (menuId: string, path: string) => {
    setActiveTab(menuId);
    console.log(`Navigating to ${path}`);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}
    >
      {/* Header */}
      <SuperAdminHeader
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        notificationCount={notificationCount}
        setActiveTab={setActiveTab}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <div className="flex">
        {/* Left Sidebar */}
        <SuperAdminSidebar
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          navigationItems={navigationItems}
          activeTab={activeTab}
          expandedMenus={expandedMenus}
          handleMenuToggle={handleMenuToggle}
          handleMenuItemClick={handleMenuItemClick}
        />

        {/* Main Content Area */}
        <SuperAdminMainContent activeTab={activeTab}>{children}</SuperAdminMainContent>

        {/* Right Sidebar - Communication Hub */}
        <SuperAdminRightSidebar
          rightSidebarCollapsed={rightSidebarCollapsed}
          setRightSidebarCollapsed={setRightSidebarCollapsed}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      <MobileSidebar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        navigationItems={navigationItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        expandedMenus={expandedMenus}
        handleMenuToggle={handleMenuToggle}
      />
    </div>
  );
};

export default SuperAdminLayout;
