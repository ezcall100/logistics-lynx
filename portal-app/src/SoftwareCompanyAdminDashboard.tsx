import React, { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, Bell, User, LogOut, Settings, Search, Plus, 
  Building2, Users, DollarSign, BarChart3, Calendar, 
  Shield, Zap, TrendingUp, Activity, MapPin, Clock,
  ChevronDown, Menu, X, Home, FileText, Database,
  Globe, Mail, Phone, Star, Award, Target, Building,
  UserPlus, CreditCard, PieChart, AlertTriangle, CheckCircle,
  XCircle, Eye, Edit, Trash2, Download, Upload, Filter
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  company?: string;
  avatar?: string;
  permissions?: string[];
  subdomain?: string;
  isActive?: boolean;
  lastLogin?: string;
  createdAt?: string;
}

interface Company {
  id: string;
  name: string;
  subdomain: string;
  plan: 'basic' | 'professional' | 'enterprise';
  status: 'active' | 'suspended' | 'trial';
  users: number;
  portals: string[];
  revenue: number;
  createdAt: string;
  lastActivity: string;
}

interface SoftwareCompanyAdminDashboardProps {
  user: User;
  onLogout: () => void;
}

const SoftwareCompanyAdminDashboard: React.FC<SoftwareCompanyAdminDashboardProps> = ({ user, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('overview');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  // Mock data for companies
  const companies: Company[] = [
    {
      id: '1',
      name: 'ABC Logistics',
      subdomain: 'abc-logistics',
      plan: 'enterprise',
      status: 'active',
      users: 45,
      portals: ['broker', 'carrier', 'shipper', 'analytics', 'crm'],
      revenue: 12500,
      createdAt: '2024-01-15',
      lastActivity: '2 hours ago'
    },
    {
      id: '2',
      name: 'XYZ Transport',
      subdomain: 'xyz-transport',
      plan: 'professional',
      status: 'active',
      users: 23,
      portals: ['carrier', 'driver', 'factoring'],
      revenue: 8500,
      createdAt: '2024-02-20',
      lastActivity: '1 day ago'
    },
    {
      id: '3',
      name: 'Global Freight Solutions',
      subdomain: 'global-freight',
      plan: 'basic',
      status: 'trial',
      users: 8,
      portals: ['broker', 'load-board'],
      revenue: 0,
      createdAt: '2024-03-10',
      lastActivity: '3 days ago'
    }
  ];

  const menuItems = [
    { id: 'overview', label: 'Platform Overview', icon: Home, color: 'text-blue-600' },
    { id: 'companies', label: 'Companies', icon: Building2, color: 'text-green-600' },
    { id: 'portals', label: 'Portal Management', icon: Globe, color: 'text-purple-600' },
    { id: 'users', label: 'User Management', icon: Users, color: 'text-orange-600' },
    { id: 'billing', label: 'Billing & Plans', icon: CreditCard, color: 'text-emerald-600' },
    { id: 'analytics', label: 'Platform Analytics', icon: BarChart3, color: 'text-indigo-600' },
    { id: 'reports', label: 'Reports', icon: FileText, color: 'text-cyan-600' },
    { id: 'settings', label: 'System Settings', icon: Settings, color: 'text-gray-600' },
  ];

  const quickActions = [
    { label: 'Add Company', icon: Building, color: 'bg-blue-500' },
    { label: 'Create User', icon: UserPlus, color: 'bg-green-500' },
    { label: 'Generate Report', icon: FileText, color: 'bg-purple-500' },
    { label: 'System Backup', icon: Database, color: 'bg-orange-500' },
  ];

  const notifications = [
    { id: 1, title: 'New company registered', message: 'Global Freight Solutions signed up for trial', time: '5 min ago', type: 'info' },
    { id: 2, title: 'Payment overdue', message: 'XYZ Transport payment is 3 days overdue', time: '1 hour ago', type: 'warning' },
    { id: 3, title: 'System maintenance', message: 'Scheduled maintenance completed successfully', time: '2 hours ago', type: 'success' },
  ];

  const renderOverview = () => (
    <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Platform KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow responsive-container sm:flex-col md:flex-row lg:grid"
        >
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <p className="text-sm font-medium text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Total Companies</p>
              <p className="text-3xl font-bold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{companies.length}</p>
              <p className="text-sm text-green-600 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">+2 this month</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-xl responsive-container sm:flex-col md:flex-row lg:grid">
              <Building2 className="w-8 h-8 text-blue-600 responsive-container sm:flex-col md:flex-row lg:grid" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow responsive-container sm:flex-col md:flex-row lg:grid"
        >
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <p className="text-sm font-medium text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Total Users</p>
              <p className="text-3xl font-bold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{companies.reduce((sum, c) => sum + c.users, 0)}</p>
              <p className="text-sm text-green-600 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">+15 this month</p>
            </div>
            <div className="bg-green-100 p-4 rounded-xl responsive-container sm:flex-col md:flex-row lg:grid">
              <Users className="w-8 h-8 text-green-600 responsive-container sm:flex-col md:flex-row lg:grid" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow responsive-container sm:flex-col md:flex-row lg:grid"
        >
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <p className="text-sm font-medium text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Monthly Revenue</p>
              <p className="text-3xl font-bold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">${companies.reduce((sum, c) => sum + c.revenue, 0).toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">+12% from last month</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-xl responsive-container sm:flex-col md:flex-row lg:grid">
              <DollarSign className="w-8 h-8 text-purple-600 responsive-container sm:flex-col md:flex-row lg:grid" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow responsive-container sm:flex-col md:flex-row lg:grid"
        >
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <p className="text-sm font-medium text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Active Portals</p>
              <p className="text-3xl font-bold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">24</p>
              <p className="text-sm text-green-600 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">All systems operational</p>
            </div>
            <div className="bg-orange-100 p-4 rounded-xl responsive-container sm:flex-col md:flex-row lg:grid">
              <Globe className="w-8 h-8 text-orange-600 responsive-container sm:flex-col md:flex-row lg:grid" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Companies */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 responsive-container sm:flex-col md:flex-row lg:grid"
      >
        <div className="p-6 border-b border-gray-200 responsive-container sm:flex-col md:flex-row lg:grid">
          <h3 className="text-xl font-semibold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">Recent Companies</h3>
        </div>
        <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
            {companies.map((company) => (
              <div key={company.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
                    <Building2 className="w-6 h-6 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{company.name}</h4>
                    <p className="text-sm text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">{company.subdomain}.transbotai.com</p>
                    <div className="flex items-center space-x-4 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        company.status === 'active' ? 'bg-green-100 text-green-800' :
                        company.status === 'trial' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {company.status}
                      </span>
                      <span className="text-xs text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">{company.plan} plan</span>
                      <span className="text-xs text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">{company.users} users</span>
                    </div>
                  </div>
                </div>
                <div className="text-right responsive-container sm:flex-col md:flex-row lg:grid">
                  <p className="text-sm font-medium text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">${company.revenue.toLocaleString()}/mo</p>
                  <p className="text-xs text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">{company.lastActivity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderCompanies = () => (
    <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Companies Header */}
      <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">Company Management</h2>
          <p className="text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Manage all companies using the Trans Bot AI platform</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
          <Plus className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
          <span>Add Company</span>
        </button>
      </div>

      {/* Companies Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="p-6 border-b border-gray-200 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <h3 className="text-lg font-semibold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">All Companies</h3>
            <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="relative responsive-container sm:flex-col md:flex-row lg:grid">
                <input
                  type="text"
                  placeholder="Search companies..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container sm:flex-col md:flex-row lg:grid"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
              </div>
              <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                <Filter className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto responsive-container sm:flex-col md:flex-row lg:grid">
          <table className="w-full responsive-container sm:flex-col md:flex-row lg:grid">
            <thead className="bg-gray-50 responsive-container sm:flex-col md:flex-row lg:grid">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">Plan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">Users</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">Last Activity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider responsive-container sm:flex-col md:flex-row lg:grid">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 responsive-container sm:flex-col md:flex-row lg:grid">
              {companies.map((company) => (
                <tr key={company.id} className="hover:bg-gray-50 responsive-container sm:flex-col md:flex-row lg:grid">
                  <td className="px-6 py-4 whitespace-nowrap responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="flex items-center responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg mr-3 responsive-container sm:flex-col md:flex-row lg:grid">
                        <Building2 className="w-5 h-5 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{company.name}</div>
                        <div className="text-sm text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">{company.subdomain}.transbotai.com</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap responsive-container sm:flex-col md:flex-row lg:grid">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      company.plan === 'enterprise' ? 'bg-purple-100 text-purple-800' :
                      company.plan === 'professional' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {company.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap responsive-container sm:flex-col md:flex-row lg:grid">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      company.status === 'active' ? 'bg-green-100 text-green-800' :
                      company.status === 'trial' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {company.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{company.users}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">${company.revenue.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">{company.lastActivity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                      <button className="text-blue-600 hover:text-blue-900 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                        <Eye className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                        <Edit className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                      </button>
                      <button className="text-red-600 hover:text-red-900 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                        <Trash2 className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeMenu) {
      case 'overview':
        return renderOverview();
      case 'companies':
        return renderCompanies();
      case 'portals':
        return <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid"><h2 className="text-2xl font-bold responsive-container sm:flex-col md:flex-row lg:grid">Portal Management</h2></div>;
      case 'users':
        return <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid"><h2 className="text-2xl font-bold responsive-container sm:flex-col md:flex-row lg:grid">User Management</h2></div>;
      case 'billing':
        return <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid"><h2 className="text-2xl font-bold responsive-container sm:flex-col md:flex-row lg:grid">Billing & Plans</h2></div>;
      case 'analytics':
        return <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid"><h2 className="text-2xl font-bold responsive-container sm:flex-col md:flex-row lg:grid">Platform Analytics</h2></div>;
      case 'reports':
        return <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid"><h2 className="text-2xl font-bold responsive-container sm:flex-col md:flex-row lg:grid">Reports</h2></div>;
      case 'settings':
        return <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid"><h2 className="text-2xl font-bold responsive-container sm:flex-col md:flex-row lg:grid">System Settings</h2></div>;
      default:
        return renderOverview();
    }
  };

  return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="min-h-screen bg-gray-50 responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Top Header */}
      <header className="bg-white shadow-lg border-b border-gray-200 fixed top-0 left-0 right-0 z-50 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="flex items-center justify-between px-6 py-4 responsive-container sm:flex-col md:flex-row lg:grid">
          {/* Left side - Logo and Menu Toggle */}
          <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <button
              onClick={() = aria-label="Button"> setSidebarOpen(!sidebarOpen)}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
            >
              {sidebarOpen ? <X className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" /> : <Menu className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />}
            </button>
            
            <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl shadow-lg responsive-container sm:flex-col md:flex-row lg:grid">
                <Bot className="w-7 h-7 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">Trans Bot AI</h1>
                <p className="text-sm text-gray-500 font-medium responsive-container sm:flex-col md:flex-row lg:grid">Software Company Admin</p>
              </div>
            </div>
          </div>

          {/* Center - Search Bar */}
          <div className="flex-1 max-w-2xl mx-8 hidden md:block responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="relative responsive-container sm:flex-col md:flex-row lg:grid">
              <input
                type="text"
                placeholder="Search companies, users, portals..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container sm:flex-col md:flex-row lg:grid"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
            </div>
          </div>

          {/* Right side - Actions and Profile */}
          <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
            {/* Notifications */}
            <div className="relative responsive-container sm:flex-col md:flex-row lg:grid">
              <button
                onClick={() = aria-label="Button"> setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <Bell className="w-6 h-6 responsive-container sm:flex-col md:flex-row lg:grid" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                  {notifications.length}
                </span>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="p-4 border-b border-gray-200 responsive-container sm:flex-col md:flex-row lg:grid">
                    <h3 className="text-lg font-semibold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">Platform Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto responsive-container sm:flex-col md:flex-row lg:grid">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div className="flex items-start space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notification.type === 'success' ? 'bg-green-500' :
                            notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                          }`} />
                          <div className="flex-1 responsive-container sm:flex-col md:flex-row lg:grid">
                            <p className="text-sm font-medium text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{notification.title}</p>
                            <p className="text-sm text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative responsive-container sm:flex-col md:flex-row lg:grid">
              <button
                onClick={() = aria-label="Button"> setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <div className="text-right responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="text-sm font-medium text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{user.name}</div>
                  <div className="text-xs text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">Super Admin</div>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg responsive-container sm:flex-col md:flex-row lg:grid">
                  <span className="text-white text-sm font-bold responsive-container sm:flex-col md:flex-row lg:grid">
                    {user.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
              </button>

              {/* Profile Dropdown Menu */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="py-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">
                      <User className="w-4 h-4 mr-3 responsive-container sm:flex-col md:flex-row lg:grid" />
                      Profile
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">
                      <Settings className="w-4 h-4 mr-3 responsive-container sm:flex-col md:flex-row lg:grid" />
                      Settings
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">
                      <Shield className="w-4 h-4 mr-3 responsive-container sm:flex-col md:flex-row lg:grid" />
                      Security
                    </a>
                    <hr className="my-2 responsive-container sm:flex-col md:flex-row lg:grid" />
                    <button
                      onClick={onLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 responsive-container sm:flex-col md:flex-row lg:grid"
                     aria-label="Button">
                      <LogOut className="w-4 h-4 mr-3 responsive-container sm:flex-col md:flex-row lg:grid" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-20 responsive-container sm:flex-col md:flex-row lg:grid">
        {/* Sidebar */}
        <motion.aside
          initial={false}
          animate={{ width: sidebarOpen ? 280 : 0 }}
          className="bg-white shadow-lg min-h-screen fixed left-0 top-20 z-40 overflow-hidden responsive-container sm:flex-col md:flex-row lg:grid"
        >
          <div className="p-4 responsive-container sm:flex-col md:flex-row lg:grid">
            {/* Main Navigation */}
            <nav className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() = aria-label="Button"> setActiveMenu(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeMenu === item.id
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${activeMenu === item.id ? 'text-blue-600' : item.color}`} />
                  <span className="font-medium responsive-container sm:flex-col md:flex-row lg:grid">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Quick Actions */}
            <div className="mt-8 pt-4 border-t border-gray-200 responsive-container sm:flex-col md:flex-row lg:grid">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 responsive-container sm:flex-col md:flex-row lg:grid">Quick Actions</h3>
              <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                   aria-label="Button">
                    <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center`}>
                      <action.icon className="w-4 h-4 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
                    </div>
                    <span className="text-sm responsive-container sm:flex-col md:flex-row lg:grid">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* System Status */}
            <div className="mt-8 pt-4 border-t border-gray-200 responsive-container sm:flex-col md:flex-row lg:grid">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 responsive-container sm:flex-col md:flex-row lg:grid">Platform Status</h3>
              <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="flex items-center justify-between px-4 py-2 bg-green-50 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
                  <span className="text-sm text-green-700 responsive-container sm:flex-col md:flex-row lg:grid">All Systems</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"></div>
                </div>
                <div className="flex items-center justify-between px-4 py-2 bg-green-50 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
                  <span className="text-sm text-green-700 responsive-container sm:flex-col md:flex-row lg:grid">Database</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"></div>
                </div>
                <div className="flex items-center justify-between px-4 py-2 bg-green-50 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
                  <span className="text-sm text-green-700 responsive-container sm:flex-col md:flex-row lg:grid">API Services</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-280' : 'ml-0'}`}>
          <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Floating Action Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6 }}
        className="fixed bottom-6 right-6 z-50 responsive-container sm:flex-col md:flex-row lg:grid"
      >
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
          <Plus className="w-6 h-6 responsive-container sm:flex-col md:flex-row lg:grid" />
        </button>
      </motion.div>
    </div>
  );
};

export default SoftwareCompanyAdminDashboard;
