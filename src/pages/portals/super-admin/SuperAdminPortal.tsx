/**
 * MCP Agents - Modern Super Admin Portal
 * Clean, professional design with sophisticated color palette
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Users,
  Settings,
  Globe,
  Brain,
  CreditCard,
  Home,
  ShieldCheck,
  BarChart,
  User,
} from 'lucide-react';

import Header from '../../../design-system/components/Header';
import Sidebar, { NavigationItem } from '../../../design-system/components/Sidebar';
import FloatingActionButton from '../../../design-system/components/FloatingActionButton';
import { getDefaultSuperAdminActions } from '../../../design-system/utils/fabActions';
import { cn } from '../../../lib/utils';

// Import our custom components
import Dashboard from '../../../components/super-admin/Dashboard';
import CompanyManagement from '../../../components/super-admin/CompanyManagement';
import UserManagement from '../../../components/super-admin/UserManagement';
import PortalManagement from '../../../components/super-admin/PortalManagement';
import BillingManagement from '../../../components/super-admin/BillingManagement';
import GlobalSettings from '../../../components/super-admin/GlobalSettings';
import AICommandCenter from '../../../components/super-admin/AICommandCenter';
import SecurityCompliance from '../../../components/super-admin/SecurityCompliance';
import ProfileSettings from '../../../components/super-admin/ProfileSettings';

interface SystemMetrics {
  totalCompanies: number;
  totalUsers: number;
  monthlyRevenue: number;
  systemUptime: number;
  apiCalls: number;
  databaseQueries: number;
  storageUsed: number;
  bandwidth: number;
}

interface RecentEvent {
  id: number;
  type: string;
  message: string;
  time: string;
  status: string;
  severity: string;
}

const SuperAdminPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
    totalCompanies: 0,
    totalUsers: 0,
    monthlyRevenue: 0,
    systemUptime: 99.97,
    apiCalls: 0,
    databaseQueries: 0,
    storageUsed: 0,
    bandwidth: 0,
  });
  const [, setRecentEvents] = useState<RecentEvent[]>([]);
  const [, setLoading] = useState(true);

  const navigationItems: NavigationItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      description: 'System overview and metrics',
      color: 'text-slate-600',
      bgColor: 'bg-slate-50',
    },
    {
      id: 'companies',
      label: 'Companies',
      icon: Building2,
      description: 'Manage client companies',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      count: systemMetrics.totalCompanies,
    },
    {
      id: 'users',
      label: 'Users',
      icon: Users,
      description: 'User accounts & permissions',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      count: systemMetrics.totalUsers,
    },
    {
      id: 'portals',
      label: 'Portal Management',
      icon: Globe,
      description: 'Configure portal access',
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      count: 24,
    },
    {
      id: 'billing',
      label: 'Billing & Subscriptions',
      icon: CreditCard,
      description: 'Revenue & subscriptions',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      status: 'active',
    },
    {
      id: 'analytics',
      label: 'System Analytics',
      icon: BarChart,
      description: 'Platform performance metrics',
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
    },
    {
      id: 'settings',
      label: 'Global Settings',
      icon: Settings,
      description: 'System configuration',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
    },
    {
      id: 'ai-agents',
      label: 'AI Command Center',
      icon: Brain,
      description: 'Monitor autonomous agents',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      status: 'active',
      badge: 'LIVE',
      badgeColor: 'bg-pink-100 text-pink-700',
    },
    {
      id: 'security',
      label: 'Security & Compliance',
      icon: ShieldCheck,
      description: 'Security monitoring',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      status: 'active',
      badge: 'SECURE',
      badgeColor: 'bg-red-100 text-red-700',
    },
    {
      id: 'profile',
      label: 'Profile & Settings',
      icon: User,
      description: 'Account preferences',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
    },
  ];

  const fabActions = getDefaultSuperAdminActions();

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);

        // Mock data for now - replace with real API calls
        setSystemMetrics({
          totalCompanies: 1247,
          totalUsers: 15689,
          monthlyRevenue: 425000,
          systemUptime: 99.97,
          apiCalls: 2450000,
          databaseQueries: 890000,
          storageUsed: 2.4,
          bandwidth: 156,
        });

        // Mock recent events
        setRecentEvents([
          {
            id: 1,
            type: 'system',
            message: 'System backup completed',
            time: '2 minutes ago',
            status: 'success',
            severity: 'info',
          },
        ]);
      } catch (error) {
        console.error('Failed to load initial data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const handleNavigation = (item: NavigationItem) => {
    setActiveTab(item.id);
  };

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
  };

  const handleNotificationClick = (id: string) => {
    console.log('Notification clicked:', id);
  };

  const handleProfileClick = () => {
    setActiveTab('profile');
  };

  const handleSettingsClick = () => {
    setActiveTab('settings');
  };

  const handleLogout = () => {
    console.log('Logout');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'companies':
        return <CompanyManagement />;
      case 'users':
        return <UserManagement />;
      case 'portals':
        return <PortalManagement />;
      case 'billing':
        return <BillingManagement />;
      case 'analytics':
        return <div className="p-6 text-center text-gray-500">Analytics component coming soon</div>;
      case 'settings':
        return <GlobalSettings />;
      case 'ai-agents':
        return <AICommandCenter />;
      case 'security':
        return <SecurityCompliance />;
      case 'profile':
        return <ProfileSettings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div
      className={cn(
        'min-h-screen bg-gray-50 transition-colors duration-300',
        darkMode ? 'dark bg-gray-900' : ''
      )}
    >
      {/* Header */}
      <Header
        user={{
          name: 'Super Administrator',
          email: 'superadmin@transbotai.com',
          role: 'Super Admin',
        }}
        notifications={[
          {
            id: '1',
            title: 'New Company Registered',
            message: 'Acme Corp has been added to the platform',
            time: '2 minutes ago',
            unread: true,
          },
          {
            id: '2',
            title: 'System Backup Complete',
            message: 'Daily backup completed successfully',
            time: '1 hour ago',
            unread: false,
          },
        ]}
        onSearch={handleSearch}
        onNotificationClick={handleNotificationClick}
        onProfileClick={handleProfileClick}
        onSettingsClick={handleSettingsClick}
        onLogout={handleLogout}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          items={navigationItems}
          activeItem={activeTab}
          onItemClick={handleNavigation}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="p-6"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton actions={fabActions} position="bottom-right" size="md" />
    </div>
  );
};

export default SuperAdminPortal;
