import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import FloatingActionButton from './components/layout/FloatingActionButton';
import DashboardPage from './pages/DashboardPage';
import { User, Notification } from './types';
import { mockNotifications } from './data/mockData';
import { useTheme } from './contexts/ThemeContext';

interface EnterpriseSuperAdminPortalProps {
  user: User;
  onLogout: () => void;
}

const EnterpriseSuperAdminPortal: React.FC<EnterpriseSuperAdminPortalProps> = ({
  user,
  onLogout
}) => {
  // Debug: Log that new design is loading
  console.log('🎨 Loading Enhanced Super Admin Portal Design v2.0');
  const { darkMode, toggleDarkMode } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPath, setCurrentPath] = useState('/dashboard');
  const [notifications] = useState<Notification[]>(mockNotifications);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };


  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    setSidebarOpen(false); // Close sidebar on mobile after navigation
  };

  const handleAddCompany = () => {
    console.log('Add Company clicked');
    // Implement add company logic
  };

  const handleAddUser = () => {
    console.log('Add User clicked');
    // Implement add user logic
  };

  const handleOpenSettings = () => {
    console.log('Open Settings clicked');
    handleNavigate('/settings');
  };

  const handleRunSystemCheck = () => {
    console.log('Run System Check clicked');
    // Implement system check logic
  };

  const handleCreatePortalPlan = () => {
    console.log('Create Portal Plan clicked');
    // Implement create portal plan logic
  };

  const renderContent = () => {
    switch (currentPath) {
      case '/dashboard':
        return <DashboardPage onNavigate={handleNavigate} />;
      case '/companies':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Company Management</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200/50 p-8 text-center">
              <p className="text-gray-500">Company management page will be implemented here</p>
            </div>
          </div>
        );
      case '/portals':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Portal Management</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200/50 p-8 text-center">
              <p className="text-gray-500">Portal management page will be implemented here</p>
            </div>
          </div>
        );
      case '/users':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">User Management</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200/50 p-8 text-center">
              <p className="text-gray-500">User management page will be implemented here</p>
            </div>
          </div>
        );
      case '/billing':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Billing & Subscriptions</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200/50 p-8 text-center">
              <p className="text-gray-500">Billing & subscriptions page will be implemented here</p>
            </div>
          </div>
        );
      case '/analytics':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">System Analytics</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200/50 p-8 text-center">
              <p className="text-gray-500">System analytics page will be implemented here</p>
            </div>
          </div>
        );
      case '/settings':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Global Settings</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200/50 p-8 text-center">
              <p className="text-gray-500">Global settings page will be implemented here</p>
            </div>
          </div>
        );
      default:
        return <DashboardPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-blue-900/30 dark:to-purple-900/30 transition-all duration-300">
      {/* Header */}
      <Header
        user={user}
        onLogout={onLogout}
        onToggleSidebar={handleToggleSidebar}
        sidebarOpen={sidebarOpen}
        notifications={notifications}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentPath={currentPath}
        onNavigate={handleNavigate}
      />

      {/* Main Content */}
      <main className={`transition-all duration-300 ${
        sidebarOpen ? 'ml-80' : 'ml-0'
      } pt-16`}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </main>

      {/* Floating Action Button */}
      <FloatingActionButton
        onAddCompany={handleAddCompany}
        onAddUser={handleAddUser}
        onOpenSettings={handleOpenSettings}
        onRunSystemCheck={handleRunSystemCheck}
        onCreatePortalPlan={handleCreatePortalPlan}
      />
    </div>
  );
};

export default EnterpriseSuperAdminPortal;
