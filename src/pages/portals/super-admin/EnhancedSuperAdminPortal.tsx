/**
 * MCP Agents - Enhanced Enterprise Super Admin Portal
 * Complete rebuild with modern design, glassmorphism, and advanced features
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Settings,
  Globe,
  CreditCard,
  Home,
  Building2,
  Brain,
  ShieldCheck,
  BarChart,
} from 'lucide-react';

import EnhancedHeader from '../../../design-system/components/EnhancedHeader';
import EnhancedSidebar, { NavigationItem } from '../../../design-system/components/EnhancedSidebar';
import EnhancedFAB from '../../../design-system/components/EnhancedFAB';
import { cn } from '../../../lib/utils';

// Import enhanced components
import EnhancedDashboard from '../../../components/super-admin/EnhancedDashboard';
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
  mcpAgents: number;
  responseTime: number;
  errorRate: number;
}

const EnhancedSuperAdminPortal: React.FC = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'System Update Available',
      message: 'New version 2.1.5 is ready for deployment',
      time: '5 minutes ago',
      type: 'info' as const,
      unread: true,
    },
    {
      id: '2',
      title: 'High API Usage Detected',
      message: 'API calls are 20% above normal levels',
      time: '1 hour ago',
      type: 'warning' as const,
      unread: true,
    },
    {
      id: '3',
      title: 'Security Scan Completed',
      message: 'No threats detected in latest security scan',
      time: '2 hours ago',
      type: 'success' as const,
      unread: false,
    },
  ]);

  const [systemMetrics] = useState<SystemMetrics>({
    totalCompanies: 1247,
    totalUsers: 15689,
    monthlyRevenue: 425000,
    systemUptime: 99.97,
    apiCalls: 1250000,
    databaseQueries: 890000,
    storageUsed: 2.4,
    bandwidth: 15.8,
    mcpAgents: 250,
    responseTime: 45,
    errorRate: 0.03,
  });

  // Enhanced navigation items with multi-level structure
  const navigationItems: NavigationItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      description: 'System overview and metrics',
      status: 'active',
      url: '/dashboard',
    },
    {
      id: 'platform-management',
      label: 'Platform Management',
      icon: Building2,
      description: 'Manage platform components',
      children: [
        {
          id: 'companies',
          label: 'Companies',
          icon: Building2,
          description: 'Manage client companies',
          count: 1247,
          status: 'active',
          url: '/companies',
        },
        {
          id: 'users',
          label: 'Users',
          icon: Users,
          description: 'User accounts & permissions',
          count: 15689,
          status: 'active',
          url: '/users',
        },
        {
          id: 'portals',
          label: 'Portal Management',
          icon: Globe,
          description: 'Configure portal access',
          count: 24,
          status: 'active',
          url: '/portals',
        },
      ],
    },
    {
      id: 'ai-command-center',
      label: 'AI Command Center',
      icon: Brain,
      description: 'Monitor autonomous agents',
      status: 'live',
      badge: 'LIVE',
      badgeColor: 'bg-red-100 text-red-700 border-red-200',
      url: '/ai-command-center',
    },
    {
      id: 'security-compliance',
      label: 'Security & Compliance',
      icon: ShieldCheck,
      description: 'Security monitoring',
      status: 'secure',
      badge: 'SECURE',
      badgeColor: 'bg-blue-100 text-blue-700 border-blue-200',
      url: '/security-compliance',
    },
    {
      id: 'analytics',
      label: 'System Analytics',
      icon: BarChart,
      description: 'Platform performance metrics',
      url: '/analytics',
    },
    {
      id: 'billing',
      label: 'Billing & Subscriptions',
      icon: CreditCard,
      description: 'Revenue & subscriptions',
      url: '/billing',
    },
    {
      id: 'settings',
      label: 'Global Settings',
      icon: Settings,
      description: 'System configuration',
      url: '/settings',
    },
    {
      id: 'profile',
      label: 'Profile & Settings',
      icon: Users,
      description: 'Account preferences',
      url: '/profile',
    },
  ];

  // Handle mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle navigation
  const handleNavigation = (item: NavigationItem) => {
    setActivePage(item.id);
    if (isMobile) {
      setSidebarCollapsed(true);
    }
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search logic here
  };

  // Handle notifications
  const handleNotificationClick = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, unread: false } : notification
      )
    );
  };

  // Render active page
  const renderActivePage = () => {
    switch (activePage) {
      case 'dashboard':
        return <EnhancedDashboard />;
      case 'companies':
        return <CompanyManagement />;
      case 'users':
        return <UserManagement />;
      case 'portals':
        return <PortalManagement />;
      case 'billing':
        return <BillingManagement />;
      case 'settings':
        return <GlobalSettings />;
      case 'ai-command-center':
        return <AICommandCenter />;
      case 'security-compliance':
        return <SecurityCompliance />;
      case 'profile':
        return <ProfileSettings />;
      default:
        return <EnhancedDashboard />;
    }
  };

  return (
    <div
      className={cn(
        'min-h-screen transition-colors duration-300',
        darkMode ? 'dark bg-gray-900' : 'bg-gray-50'
      )}
    >
      {/* Enhanced Header */}
      <EnhancedHeader
        user={{
          name: 'Super Administrator',
          email: 'superadmin@transbotai.com',
          role: 'Super Admin',
          permissions: ['all'],
        }}
        notifications={notifications}
        systemStatus={{
          status: 'operational',
          uptime: systemMetrics.systemUptime,
          responseTime: systemMetrics.responseTime,
          activeAgents: systemMetrics.mcpAgents,
          lastUpdate: '2 minutes ago',
        }}
        onSearch={handleSearch}
        onNotificationClick={handleNotificationClick}
        onProfileClick={() => setActivePage('profile')}
        onSettingsClick={() => setActivePage('settings')}
        onLogout={() => console.log('Logout')}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      <div className="flex">
        {/* Enhanced Sidebar */}
        <EnhancedSidebar
          items={navigationItems}
          activeItem={activePage}
          onItemClick={handleNavigation}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          userPermissions={['all']}
        />

        {/* Main Content */}
        <main
          className={cn(
            'flex-1 transition-all duration-300',
            sidebarCollapsed ? 'ml-16' : 'ml-72',
            isMobile && 'ml-0'
          )}
        >
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderActivePage()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Enhanced Floating Action Button */}
      <EnhancedFAB
        position="bottom-right"
        size="md"
        userPermissions={['all']}
        isMobile={isMobile}
      />

      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-400/20 to-blue-600/20 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default EnhancedSuperAdminPortal;
