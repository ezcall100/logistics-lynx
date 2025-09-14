import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building, Settings, Users, CreditCard, Shield, Bell,
  BarChart3, FileText, Key, Globe, CheckCircle, AlertTriangle,
  Edit, Save, X, Plus, Search, Filter, Download, Upload
} from 'lucide-react';

/**
 * Company Settings Main Page - Super Admin
 * Created by MCP 301 Agents - PlanBot & FormBot
 * Timestamp: 2025-09-14T18:58:00.000Z
 * Features: Complete Company Settings management with all sections
 */

interface CompanySettingsTab {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  description: string;
  status: 'active' | 'pending' | 'completed';
  component: React.ComponentType<any>;
}

const CompanySettingsMain: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('profile');
  const [companies, setCompanies] = useState<any[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock company data - MCP 301 Agents created this
  useEffect(() => {
    const mockCompanies = [
      {
        id: '1',
        name: 'Demo Logistics Inc',
        domain: 'demologistics.com',
        industry: 'Transportation',
        size: 'Large',
        status: 'active',
        users: 1250,
        plan: 'Enterprise',
        lastUpdated: '2025-09-14T10:30:00Z',
        settings: {
          profile: { completed: true, lastUpdated: '2025-09-14T09:00:00Z' },
          billing: { completed: true, lastUpdated: '2025-09-14T08:30:00Z' },
          users: { completed: true, lastUpdated: '2025-09-14T10:00:00Z' },
          api: { completed: false, lastUpdated: '2025-09-13T15:00:00Z' },
          security: { completed: true, lastUpdated: '2025-09-14T07:00:00Z' },
          notifications: { completed: true, lastUpdated: '2025-09-14T06:00:00Z' },
          compliance: { completed: false, lastUpdated: '2025-09-12T12:00:00Z' },
          analytics: { completed: true, lastUpdated: '2025-09-14T05:00:00Z' }
        }
      },
      {
        id: '2',
        name: 'Demo Transport Co',
        domain: 'demotransport.com',
        industry: 'Shipping',
        size: 'Medium',
        status: 'active',
        users: 890,
        plan: 'Professional',
        lastUpdated: '2025-09-14T09:15:00Z',
        settings: {
          profile: { completed: true, lastUpdated: '2025-09-14T08:00:00Z' },
          billing: { completed: true, lastUpdated: '2025-09-14T07:30:00Z' },
          users: { completed: false, lastUpdated: '2025-09-13T16:00:00Z' },
          api: { completed: true, lastUpdated: '2025-09-14T06:30:00Z' },
          security: { completed: true, lastUpdated: '2025-09-14T05:30:00Z' },
          notifications: { completed: false, lastUpdated: '2025-09-12T14:00:00Z' },
          compliance: { completed: true, lastUpdated: '2025-09-14T04:30:00Z' },
          analytics: { completed: true, lastUpdated: '2025-09-14T03:30:00Z' }
        }
      }
    ];
    
    setCompanies(mockCompanies);
    setSelectedCompany(mockCompanies[0]);
  }, []);

  const tabs: CompanySettingsTab[] = [
    {
      id: 'profile',
      name: 'Company Profile',
      icon: Building,
      description: 'Basic company information and branding',
      status: 'completed',
      component: () => <CompanyProfileSettings company={selectedCompany} />
    },
    {
      id: 'billing',
      name: 'Billing & Subscription',
      icon: CreditCard,
      description: 'Payment methods and subscription management',
      status: 'completed',
      component: () => <CompanyBillingSettings company={selectedCompany} />
    },
    {
      id: 'users',
      name: 'User Management',
      icon: Users,
      description: 'Company users and role management',
      status: 'active',
      component: () => <CompanyUserSettings company={selectedCompany} />
    },
    {
      id: 'api',
      name: 'API & Integrations',
      icon: Key,
      description: 'API keys and third-party integrations',
      status: 'pending',
      component: () => <CompanyAPISettings company={selectedCompany} />
    },
    {
      id: 'security',
      name: 'Security Settings',
      icon: Shield,
      description: 'Security policies and access controls',
      status: 'completed',
      component: () => <CompanySecuritySettings company={selectedCompany} />
    },
    {
      id: 'notifications',
      name: 'Notifications',
      icon: Bell,
      description: 'Email and system notification preferences',
      status: 'completed',
      component: () => <CompanyNotificationSettings company={selectedCompany} />
    },
    {
      id: 'compliance',
      name: 'Compliance & Legal',
      icon: FileText,
      description: 'Legal compliance and data protection',
      status: 'pending',
      component: () => <CompanyComplianceSettings company={selectedCompany} />
    },
    {
      id: 'analytics',
      name: 'Analytics & Reports',
      icon: BarChart3,
      description: 'Data analytics and reporting settings',
      status: 'completed',
      component: () => <CompanyAnalyticsSettings company={selectedCompany} />
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-400/20';
      case 'active': return 'text-blue-400 bg-blue-400/20';
      case 'pending': return 'text-yellow-400 bg-yellow-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'active': return <Settings className="w-4 h-4" />;
      case 'pending': return <AlertTriangle className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Settings className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Company Settings</h1>
              <p className="text-gray-400">Manage company configurations and preferences • MCP 301 Agents</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-400">Live Updates</span>
            </div>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2">
              <Save className="w-4 h-4" />
              <span>Save All</span>
            </button>
          </div>
        </div>
      </div>

      {/* Company Selector */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Select Company</h2>
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Company</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {companies.map((company) => (
            <div
              key={company.id}
              onClick={() => setSelectedCompany(company)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedCompany?.id === company.id
                  ? 'bg-blue-500/20 border-blue-500/50'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-white">{company.name}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(company.status)}`}>
                  {company.status}
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-2">{company.domain}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">{company.users} users</span>
                <span className="text-blue-400">{company.plan}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings Tabs */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden">
        <div className="border-b border-white/10">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                  <div className={`p-1 rounded-full ${getStatusColor(tab.status)}`}>
                    {getStatusIcon(tab.status)}
                  </div>
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {tabs.map((tab) => (
              activeTab === tab.id && (
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white">{tab.name}</h3>
                    <p className="text-gray-400">{tab.description}</p>
                  </div>
                  
                  <tab.component />
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// Placeholder components for each settings section
const CompanyProfileSettings: React.FC<{ company: any }> = ({ company }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white/5 border border-white/10 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Company Information</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Company Name</label>
            <input
              type="text"
              defaultValue={company?.name || ''}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Domain</label>
            <input
              type="text"
              defaultValue={company?.domain || ''}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>
      
      <div className="bg-white/5 border border-white/10 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Company Details</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Industry</label>
            <select className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500">
              <option value="transportation">Transportation</option>
              <option value="shipping">Shipping</option>
              <option value="logistics">Logistics</option>
              <option value="maritime">Maritime</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Company Size</label>
            <select className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500">
              <option value="startup">Startup</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CompanyBillingSettings: React.FC<{ company: any }> = ({ company }) => (
  <div className="space-y-6">
    <div className="bg-white/5 border border-white/10 rounded-lg p-6">
      <h4 className="text-lg font-semibold text-white mb-4">Subscription Details</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Current Plan</label>
          <div className="p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg">
            <span className="text-blue-400 font-semibold">{company?.plan || 'Professional'}</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Billing Cycle</label>
          <select className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500">
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Next Billing Date</label>
          <div className="p-3 bg-white/10 border border-white/20 rounded-lg text-white">
            October 14, 2025
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CompanyUserSettings: React.FC<{ company: any }> = ({ company }) => (
  <div className="space-y-6">
    <div className="bg-white/5 border border-white/10 rounded-lg p-6">
      <h4 className="text-lg font-semibold text-white mb-4">User Management</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Total Users</label>
          <div className="p-3 bg-white/10 border border-white/20 rounded-lg text-white">
            {company?.users || 0} users
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">User Limit</label>
          <input
            type="number"
            defaultValue={company?.users || 0}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  </div>
);

const CompanyAPISettings: React.FC<{ company: any }> = ({ company }) => (
  <div className="space-y-6">
    <div className="bg-white/5 border border-white/10 rounded-lg p-6">
      <h4 className="text-lg font-semibold text-white mb-4">API Configuration</h4>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">API Key</label>
          <div className="flex space-x-2">
            <input
              type="password"
              defaultValue="sk-1234567890abcdef"
              className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              Regenerate
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CompanySecuritySettings: React.FC<{ company: any }> = ({ company }) => (
  <div className="space-y-6">
    <div className="bg-white/5 border border-white/10 rounded-lg p-6">
      <h4 className="text-lg font-semibold text-white mb-4">Security Policies</h4>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h5 className="text-white font-medium">Two-Factor Authentication</h5>
            <p className="text-sm text-gray-400">Require 2FA for all users</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultChecked className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  </div>
);

const CompanyNotificationSettings: React.FC<{ company: any }> = ({ company }) => (
  <div className="space-y-6">
    <div className="bg-white/5 border border-white/10 rounded-lg p-6">
      <h4 className="text-lg font-semibold text-white mb-4">Notification Preferences</h4>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h5 className="text-white font-medium">Email Notifications</h5>
            <p className="text-sm text-gray-400">Receive email updates</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultChecked className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  </div>
);

const CompanyComplianceSettings: React.FC<{ company: any }> = ({ company }) => (
  <div className="space-y-6">
    <div className="bg-white/5 border border-white/10 rounded-lg p-6">
      <h4 className="text-lg font-semibold text-white mb-4">Compliance & Legal</h4>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Data Retention Policy</label>
          <select className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500">
            <option value="1year">1 Year</option>
            <option value="2years">2 Years</option>
            <option value="5years">5 Years</option>
            <option value="indefinite">Indefinite</option>
          </select>
        </div>
      </div>
    </div>
  </div>
);

const CompanyAnalyticsSettings: React.FC<{ company: any }> = ({ company }) => (
  <div className="space-y-6">
    <div className="bg-white/5 border border-white/10 rounded-lg p-6">
      <h4 className="text-lg font-semibold text-white mb-4">Analytics & Reporting</h4>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h5 className="text-white font-medium">Usage Analytics</h5>
            <p className="text-sm text-gray-400">Track user activity and system usage</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultChecked className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  </div>
);

export default CompanySettingsMain;
