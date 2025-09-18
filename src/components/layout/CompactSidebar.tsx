import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Home, 
  BarChart3, 
  Truck, 
  Package, 
  Users, 
  Settings, 
  Bell, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  ChevronDown,
  User,
  Building,
  Shield,
  CreditCard,
  Globe,
  Database,
  FileText,
  MapPin,
  TrendingUp,
  Banknote,
  Code,
  Lock
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

interface CompactSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  variant?: 'compact' | 'expanded';
}

const CompactSidebar: React.FC<CompactSidebarProps> = ({ 
  isOpen, 
  onToggle, 
  variant = 'compact' 
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<string[]>(['dashboard']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const menuSections = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: Home,
      items: [
        { name: 'Overview', path: '/dashboard', icon: BarChart3 },
        { name: 'Analytics', path: '/dashboard/analytics', icon: TrendingUp },
        { name: 'Reports', path: '/dashboard/reports', icon: FileText }
      ]
    },
    {
      id: 'operations',
      title: 'Operations',
      icon: Truck,
      items: [
        { name: 'Load Management', path: '/operations/loads', icon: Package },
        { name: 'Fleet Management', path: '/operations/fleet', icon: Truck },
        { name: 'Dispatch', path: '/operations/dispatch', icon: MapPin },
        { name: 'Maintenance', path: '/operations/maintenance', icon: Settings }
      ]
    },
    {
      id: 'business',
      title: 'Business',
      icon: Building,
      items: [
        { name: 'Customers', path: '/business/customers', icon: Users },
        { name: 'Partners', path: '/business/partners', icon: Globe },
        { name: 'Financials', path: '/business/financials', icon: Banknote },
        { name: 'Compliance', path: '/business/compliance', icon: Shield }
      ]
    },
    {
      id: 'team',
      title: 'Team',
      icon: Users,
      items: [
        { name: 'Team Members', path: '/team/members', icon: Users },
        { name: 'Roles & Permissions', path: '/team/roles', icon: Shield },
        { name: 'Team Settings', path: '/team/settings', icon: Settings }
      ]
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: Settings,
      items: [
        { name: 'Account Settings', path: '/settings/account', icon: User },
        { name: 'Company Profile', path: '/settings/company', icon: Building },
        { name: 'Billing', path: '/settings/billing', icon: CreditCard },
        { name: 'Security', path: '/settings/security', icon: Lock },
        { name: 'Integrations', path: '/settings/integrations', icon: Code },
        { name: 'API Settings', path: '/settings/api', icon: Database },
        { name: 'Notifications', path: '/settings/notifications', icon: Bell }
      ]
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden responsive-container sm:flex-col md:flex-row lg:grid"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`fixed inset-y-0 left-0 z-50 bg-white shadow-xl lg:translate-x-0 lg:static lg:inset-0 ${
          variant === 'compact' ? 'w-16' : 'w-80'
        }`}
      >
        <div className="flex flex-col h-full responsive-container sm:flex-col md:flex-row lg:grid">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 responsive-container sm:flex-col md:flex-row lg:grid">
            {variant === 'expanded' && (
              <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                  <Truck className="w-5 h-5 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">Logistics Lynx</h1>
                  <p className="text-xs text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">Portal Dashboard</p>
                </div>
              </div>
            )}
            {variant === 'compact' && (
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                <Truck className="w-5 h-5 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
              </div>
            )}
            <button
              onClick={onToggle}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
             aria-label="Button">
              <X className="w-5 h-5 text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid" />
            </button>
          </div>

          {/* User Profile */}
          {variant === 'expanded' && (
            <div className="p-4 border-b border-gray-200 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full responsive-container sm:flex-col md:flex-row lg:grid" / alt="Image">
                  ) : (
                    <User className="w-5 h-5 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
                  )}
                </div>
                <div className="flex-1 min-w-0 responsive-container sm:flex-col md:flex-row lg:grid">
                  <p className="text-sm font-medium text-gray-900 truncate responsive-container sm:flex-col md:flex-row lg:grid">{user?.name}</p>
                  <p className="text-xs text-gray-500 truncate responsive-container sm:flex-col md:flex-row lg:grid">{user?.company}</p>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">
                    {user?.role}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto responsive-container sm:flex-col md:flex-row lg:grid">
            <nav className="p-4 space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
              {menuSections.map((section) => (
                <div key={section.id}>
                  {variant === 'expanded' ? (
                    <div>
                      <button
                        onClick={() => toggleSection(section.id)}
            aria-label="Button"
                        className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                      >
                        <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                          <section.icon className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
                          <span>{section.title}</span>
                        </div>
                        {expandedSections.includes(section.id) ? (
                          <ChevronDown className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                        ) : (
                          <ChevronRight className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                        )}
                      </button>
                      <AnimatePresence>
                        {expandedSections.includes(section.id) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="ml-8 mt-1 space-y-1 responsive-container sm:flex-col md:flex-row lg:grid"
                          >
                            {section.items.map((item) => (
                              <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
            aria-label="Button"
                                className={`w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                                  isActive(item.path)
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                              >
                                <item.icon className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                                <span>{item.name}</span>
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <div className="space-y-1 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="flex items-center justify-center p-2 responsive-container sm:flex-col md:flex-row lg:grid">
                        <section.icon className="w-5 h-5 text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid" />
                      </div>
                      {section.items.map((item) => (
                        <button
                          key={item.path}
                          onClick={() => navigate(item.path)}
            aria-label="Button"
                          className={`w-full flex items-center justify-center p-2 rounded-lg transition-colors ${
                            isActive(item.path)
                              ? 'bg-blue-100 text-blue-700'
                              : 'text-gray-500 hover:bg-gray-100'
                          }`}
                          title={item.name}
                        >
                          <item.icon className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-gray-200 space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
            {variant === 'expanded' ? (
              <>
                <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                  <Settings className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                  <span>Settings</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                  <HelpCircle className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                  <span>Help</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                 aria-label="Button">
                  <LogOut className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <button className="w-full flex items-center justify-center p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid" title="Settings" aria-label="Button">
                  <Settings className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                </button>
                <button className="w-full flex items-center justify-center p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid" title="Help" aria-label="Button">
                  <HelpCircle className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                  title="Sign Out"
                 aria-label="Button">
                  <LogOut className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default CompactSidebar;
