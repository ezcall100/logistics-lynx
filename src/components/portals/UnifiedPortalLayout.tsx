import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Bell, 
  Search, 
  Settings, 
  LogOut, 
  User, 
  Home,
  BarChart3,
  Truck,
  Package,
  Users,
  Shield,
  Globe,
  Zap,
  TrendingUp,
  Database,
  Banknote,
  Code,
  MessageSquare,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

interface Portal {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  path: string;
  color: string;
  category: string;
  permissions: string[];
  isActive: boolean;
  badge?: string;
}

interface UnifiedPortalLayoutProps {
  children: React.ReactNode;
}

const UnifiedPortalLayout: React.FC<UnifiedPortalLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const { user, logout, hasPermission } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const allPortals: Portal[] = [
    // Core TMS Portals
    { id: 'shipper', name: 'Shipper Portal', description: 'Load planning and carrier selection', icon: Package, path: '/portals/shipper', color: 'from-green-500 to-emerald-500', category: 'core', permissions: ['shipper:read'], isActive: true },
    { id: 'carrier', name: 'Carrier Portal', description: 'Fleet management and load matching', icon: Truck, path: '/portals/carrier', color: 'from-blue-500 to-indigo-500', category: 'core', permissions: ['carrier:read'], isActive: true },
    { id: 'broker', name: 'Broker Portal', description: 'Load brokerage and relationship management', icon: Users, path: '/portals/broker', color: 'from-purple-500 to-violet-500', category: 'core', permissions: ['broker:read'], isActive: true },
    { id: 'driver', name: 'Driver Portal', description: 'Mobile driver interface and load details', icon: Truck, path: '/portals/driver', color: 'from-orange-500 to-red-500', category: 'core', permissions: ['driver:read'], isActive: true },
    { id: 'owner-operator', name: 'Owner Operator Portal', description: 'Independent business management', icon: Truck, path: '/portals/owner-operator', color: 'from-amber-500 to-orange-500', category: 'core', permissions: ['owner:read'], isActive: true },
    
    // Business Operations
    { id: 'analytics', name: 'Analytics Portal', description: 'Business intelligence and reports', icon: BarChart3, path: '/portals/analytics', color: 'from-indigo-500 to-purple-500', category: 'business', permissions: ['analytics:read'], isActive: true },
    { id: 'customer', name: 'Customer Portal', description: 'Customer self-service platform', icon: Users, path: '/portals/customer', color: 'from-pink-500 to-rose-500', category: 'business', permissions: ['customer:read'], isActive: true },
    { id: 'partner', name: 'Partner Portal', description: 'Partner collaboration system', icon: Globe, path: '/portals/partner', color: 'from-cyan-500 to-blue-500', category: 'business', permissions: ['partner:read'], isActive: true },
    { id: 'developer', name: 'Developer Portal', description: 'API access and integration tools', icon: Code, path: '/portals/developer', color: 'from-gray-500 to-slate-500', category: 'business', permissions: ['developer:read'], isActive: true },
    { id: 'yms', name: 'YMS Portal', description: 'Yard management system', icon: Truck, path: '/portals/yms', color: 'from-emerald-500 to-green-500', category: 'business', permissions: ['yms:read'], isActive: true },
    { id: 'directory', name: 'Directory Portal', description: 'Business directory and networking', icon: Globe, path: '/portals/directory', color: 'from-blue-500 to-indigo-500', category: 'business', permissions: ['directory:read'], isActive: true },
    { id: 'rates', name: 'Rates Portal', description: 'Dynamic pricing and rate management', icon: TrendingUp, path: '/portals/rates', color: 'from-green-500 to-emerald-500', category: 'business', permissions: ['rates:read'], isActive: true },
    { id: 'marketplace', name: 'Marketplace Portal', description: 'Load and capacity marketplace', icon: Globe, path: '/portals/marketplace', color: 'from-purple-500 to-violet-500', category: 'business', permissions: ['marketplace:read'], isActive: true },
    { id: 'financials', name: 'Financials Portal', description: 'Financial management suite', icon: TrendingUp, path: '/portals/financials', color: 'from-emerald-500 to-teal-500', category: 'business', permissions: ['financials:read'], isActive: true },
    { id: 'load-board', name: 'Load Board Portal', description: 'Load board management', icon: Package, path: '/portals/load-board', color: 'from-blue-500 to-cyan-500', category: 'business', permissions: ['loadboard:read'], isActive: true },
    { id: 'crm', name: 'CRM Portal', description: 'Customer relationship management', icon: Users, path: '/portals/crm', color: 'from-pink-500 to-rose-500', category: 'business', permissions: ['crm:read'], isActive: true },
    { id: 'edi', name: 'EDI Portal', description: 'Electronic data interchange', icon: Database, path: '/portals/edi', color: 'from-gray-500 to-slate-500', category: 'business', permissions: ['edi:read'], isActive: true },
    { id: 'workers', name: 'Workers Portal', description: 'Workforce management system', icon: Users, path: '/portals/workers', color: 'from-teal-500 to-cyan-500', category: 'business', permissions: ['workers:read'], isActive: true },
    { id: 'factoring', name: 'Factoring Portal', description: 'Invoice factoring and cash flow', icon: Banknote, path: '/portals/factoring', color: 'from-green-500 to-emerald-500', category: 'business', permissions: ['factoring:read'], isActive: true },
    
    // Advanced Operations
    { id: 'warehouse', name: 'Warehouse Portal', description: 'Warehouse management and inventory', icon: Package, path: '/portals/warehouse', color: 'from-blue-500 to-indigo-500', category: 'advanced', permissions: ['warehouse:read'], isActive: true },
    { id: 'fleet', name: 'Fleet Portal', description: 'Fleet management and tracking', icon: Truck, path: '/portals/fleet', color: 'from-green-500 to-emerald-500', category: 'advanced', permissions: ['fleet:read'], isActive: true },
    { id: 'dispatch', name: 'Dispatch Portal', description: 'Load dispatch and coordination', icon: Truck, path: '/portals/dispatch', color: 'from-purple-500 to-violet-500', category: 'advanced', permissions: ['dispatch:read'], isActive: true },
    { id: 'maintenance', name: 'Maintenance Portal', description: 'Vehicle maintenance management', icon: Settings, path: '/portals/maintenance', color: 'from-orange-500 to-red-500', category: 'advanced', permissions: ['maintenance:read'], isActive: true },
    { id: 'fuel', name: 'Fuel Portal', description: 'Fuel management and optimization', icon: TrendingUp, path: '/portals/fuel', color: 'from-yellow-500 to-orange-500', category: 'advanced', permissions: ['fuel:read'], isActive: true },
    { id: 'insurance', name: 'Insurance Portal', description: 'Insurance management and claims', icon: Shield, path: '/portals/insurance', color: 'from-blue-500 to-indigo-500', category: 'advanced', permissions: ['insurance:read'], isActive: true },
    { id: 'compliance', name: 'Compliance Portal', description: 'Regulatory compliance monitoring', icon: Shield, path: '/portals/compliance', color: 'from-green-500 to-emerald-500', category: 'advanced', permissions: ['compliance:read'], isActive: true },
    
    // Admin & Specialized
    { id: 'admin', name: 'Admin Portal', description: 'System administration', icon: Settings, path: '/portals/admin', color: 'from-slate-500 to-gray-500', category: 'admin', permissions: ['admin:read'], isActive: true },
    { id: 'super-admin', name: 'Super Admin Portal', description: 'Enterprise administration', icon: Shield, path: '/portals/super-admin', color: 'from-red-500 to-orange-500', category: 'admin', permissions: ['superadmin:read'], isActive: true },
    { id: 'mcp-agent-admin', name: 'MCP Agent Admin', description: 'AI agent management', icon: Zap, path: '/admin/mcp-agents', color: 'from-green-500 to-blue-500', category: 'admin', permissions: ['mcp:read'], isActive: true },
    { id: 'human-developer-admin', name: 'Human Developer Admin', description: 'Team management', icon: Users, path: '/admin/human-developers', color: 'from-blue-500 to-purple-500', category: 'admin', permissions: ['developer:read'], isActive: true },
    { id: 'autonomous', name: 'Autonomous Portal', description: 'AI-powered operations', icon: Zap, path: '/portals/autonomous', color: 'from-purple-500 to-pink-500', category: 'admin', permissions: ['autonomous:read'], isActive: true }
  ];

  const categories = [
    { id: 'all', name: 'All Portals', icon: Home },
    { id: 'core', name: 'Core TMS', icon: Truck },
    { id: 'business', name: 'Business Ops', icon: BarChart3 },
    { id: 'advanced', name: 'Advanced Ops', icon: Settings },
    { id: 'admin', name: 'Admin & Specialized', icon: Shield }
  ];

  const filteredPortals = allPortals.filter(portal => {
    const matchesSearch = portal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         portal.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || portal.category === activeCategory;
    const hasAccess = user?.permissions.includes('*') || portal.permissions.some(perm => hasPermission(perm));
    
    return matchesSearch && matchesCategory && hasAccess && portal.isActive;
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handlePortalClick = (portal: Portal) => {
    navigate(portal.path);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden responsive-container sm:flex-col md:flex-row lg:grid"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-xl lg:translate-x-0 lg:static lg:inset-0 responsive-container sm:flex-col md:flex-row lg:grid"
      >
        <div className="flex flex-col h-full responsive-container sm:flex-col md:flex-row lg:grid">
          {/* Sidebar header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                <Truck className="w-5 h-5 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">Logistics Lynx</h1>
                <p className="text-xs text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">Portal Dashboard</p>
              </div>
            </div>
            <button
              onClick={() = aria-label="Button"> setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <X className="w-5 h-5 text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid" />
            </button>
          </div>

          {/* User info */}
          <div className="p-6 border-b border-gray-200 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full responsive-container sm:flex-col md:flex-row lg:grid" / alt="Image">
                ) : (
                  <User className="w-6 h-6 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
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

          {/* Search */}
          <div className="p-6 border-b border-gray-200 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="relative responsive-container sm:flex-col md:flex-row lg:grid">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
              <input
                type="text"
                placeholder="Search portals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm responsive-container sm:flex-col md:flex-row lg:grid"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="p-6 border-b border-gray-200 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="space-y-1 responsive-container sm:flex-col md:flex-row lg:grid">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() = aria-label="Button"> setActiveCategory(category.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeCategory === category.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <category.icon className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                  <span>{category.name}</span>
                  <span className="ml-auto text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
                    {category.id === 'all' 
                      ? filteredPortals.length 
                      : allPortals.filter(p => p.category === category.id).length
                    }
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Portals */}
          <div className="flex-1 overflow-y-auto p-6 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
              {filteredPortals.map((portal) => (
                <motion.button
                  key={portal.id}
                  onClick={() => handlePortalClick(portal)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                    location.pathname === portal.path
                      ? 'bg-blue-50 border-blue-200 shadow-sm'
                      : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className={`w-10 h-10 bg-gradient-to-br ${portal.color} rounded-lg flex items-center justify-center`}>
                      <portal.icon className="w-5 h-5 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
                    </div>
                    <div className="flex-1 min-w-0 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                        <p className="text-sm font-medium text-gray-900 truncate responsive-container sm:flex-col md:flex-row lg:grid">{portal.name}</p>
                        {portal.badge && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 responsive-container sm:flex-col md:flex-row lg:grid">
                            {portal.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 truncate responsive-container sm:flex-col md:flex-row lg:grid">{portal.description}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Sidebar footer */}
          <div className="p-6 border-t border-gray-200 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
              <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                <Settings className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                <span>Settings</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                <HelpCircle className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                <span>Help & Support</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
               aria-label="Button">
                <LogOut className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="lg:pl-80 responsive-container sm:flex-col md:flex-row lg:grid">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b border-gray-200 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center justify-between px-6 py-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
              <button
                onClick={() = aria-label="Button"> setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <Menu className="w-5 h-5 text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">
                  {allPortals.find(p => p.path === location.pathname)?.name || 'Portal Dashboard'}
                </h1>
                <p className="text-sm text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
                  {allPortals.find(p => p.path === location.pathname)?.description || 'Manage your logistics operations'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                <Bell className="w-5 h-5 text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"></span>
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                <MessageSquare className="w-5 h-5 text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full responsive-container sm:flex-col md:flex-row lg:grid" / alt="Image">
                ) : (
                  <User className="w-4 h-4 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6 responsive-container sm:flex-col md:flex-row lg:grid">
          {children}
        </main>
      </div>
    </div>
  );
};

export default UnifiedPortalLayout;
