import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  Plus,
  Trash2,
  Edit3,
  Save,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Shield,
  Lock,
  Unlock,
  Copy,
  Download,
  Server
} from 'lucide-react';

const DomainConfiguration: React.FC = () => {
  const [activeTab, setActiveTab] = useState('domains');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Domain Configuration State
  const [domains, setDomains] = useState([
    {
      id: 1,
      domain: 'transbotai.com',
      type: 'primary',
      status: 'active',
      ssl: true,
      redirect: false,
      lastChecked: '2024-01-15 14:30',
      expires: '2025-01-15'
    },
    {
      id: 2,
      domain: 'admin.transbotai.com',
      type: 'subdomain',
      status: 'active',
      ssl: true,
      redirect: false,
      lastChecked: '2024-01-15 14:25',
      expires: '2025-01-15'
    },
    {
      id: 3,
      domain: 'api.transbotai.com',
      type: 'subdomain',
      status: 'active',
      ssl: true,
      redirect: false,
      lastChecked: '2024-01-15 14:20',
      expires: '2025-01-15'
    },
    {
      id: 4,
      domain: 'old-site.com',
      type: 'redirect',
      status: 'redirecting',
      ssl: false,
      redirect: true,
      lastChecked: '2024-01-15 14:15',
      expires: '2024-06-15'
    }
  ]);

  const [dnsRecords] = useState([
    { id: 1, type: 'A', name: '@', value: '192.168.1.100', ttl: 3600, status: 'active' },
    { id: 2, type: 'CNAME', name: 'www', value: 'transbotai.com', ttl: 3600, status: 'active' },
    { id: 3, type: 'MX', name: '@', value: 'mail.transbotai.com', ttl: 3600, status: 'active' },
    { id: 4, type: 'TXT', name: '@', value: 'v=spf1 include:_spf.google.com ~all', ttl: 3600, status: 'active' },
    { id: 5, type: 'CNAME', name: 'admin', value: 'transbotai.com', ttl: 3600, status: 'active' },
    { id: 6, type: 'CNAME', name: 'api', value: 'transbotai.com', ttl: 3600, status: 'active' }
  ]);

  const [sslCertificates] = useState([
    {
      id: 1,
      domain: 'transbotai.com',
      issuer: 'Let\'s Encrypt',
      type: 'Wildcard',
      status: 'valid',
      issued: '2024-01-01',
      expires: '2024-04-01',
      autoRenew: true
    },
    {
      id: 2,
      domain: 'admin.transbotai.com',
      issuer: 'Let\'s Encrypt',
      type: 'Standard',
      status: 'valid',
      issued: '2024-01-01',
      expires: '2024-04-01',
      autoRenew: true
    }
  ]);

  const [newDomain, setNewDomain] = useState({
    domain: '',
    type: 'subdomain',
    redirectTo: ''
  });

  const [showAddDomain, setShowAddDomain] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSaveStatus('success');
    } catch (error) {
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddDomain = () => {
    if (newDomain.domain) {
      const domain = {
        id: domains.length + 1,
        domain: newDomain.domain,
        type: newDomain.type,
        status: 'pending',
        ssl: false,
        redirect: newDomain.type === 'redirect',
        lastChecked: new Date().toISOString().slice(0, 16).replace('T', ' '),
        expires: '2025-01-15'
      };
      setDomains([...domains, domain]);
      setNewDomain({ domain: '', type: 'subdomain', redirectTo: '' });
      setShowAddDomain(false);
    }
  };

  const handleDeleteDomain = (id: number) => {
    setDomains(domains.filter(domain => domain.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
      case 'pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200';
      case 'error': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200';
      case 'redirecting': return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-200';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <RefreshCw className="w-4 h-4" />;
      case 'error': return <AlertTriangle className="w-4 h-4" />;
      case 'redirecting': return <ExternalLink className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  const TabButton = ({ id, label, icon: Icon, isActive }: { id: string; label: string; icon: React.ComponentType<{ className?: string }>; isActive: boolean }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
        isActive
          ? 'bg-blue-600 text-white'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );

  const renderDomainsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Domain Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage your domains and subdomains</p>
        </div>
        <button
          onClick={() => setShowAddDomain(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Domain</span>
        </button>
      </div>

      {/* Add Domain Modal */}
      {showAddDomain && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add New Domain</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Domain Name</label>
              <input
                type="text"
                value={newDomain.domain}
                onChange={(e) => setNewDomain({ ...newDomain, domain: e.target.value })}
                placeholder="example.com"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Domain Type</label>
              <select
                value={newDomain.type}
                onChange={(e) => setNewDomain({ ...newDomain, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="subdomain">Subdomain</option>
                <option value="redirect">Redirect</option>
                <option value="primary">Primary</option>
              </select>
            </div>
            {newDomain.type === 'redirect' && (
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Redirect To</label>
                <input
                  type="text"
                  value={newDomain.redirectTo}
                  onChange={(e) => setNewDomain({ ...newDomain, redirectTo: e.target.value })}
                  placeholder="https://transbotai.com"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}
            <div className="flex space-x-3">
              <button
                onClick={handleAddDomain}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Domain
              </button>
              <button
                onClick={() => setShowAddDomain(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Domains Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Domain</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">SSL</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Checked</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {domains.map((domain) => (
                <tr key={domain.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{domain.domain}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      domain.type === 'primary' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                      domain.type === 'subdomain' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                    }`}>
                      {domain.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(domain.status)}`}>
                      {getStatusIcon(domain.status)}
                      <span className="ml-1">{domain.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {domain.ssl ? (
                      <div className="flex items-center space-x-1 text-green-600">
                        <Lock className="w-4 h-4" />
                        <span className="text-sm">Enabled</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1 text-gray-400">
                        <Unlock className="w-4 h-4" />
                        <span className="text-sm">Disabled</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {domain.lastChecked}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteDomain(domain.id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
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

  const renderDNSTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">DNS Records</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage your DNS configuration</p>
        </div>
        <div className="flex space-x-2">
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Record</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">TTL</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {dnsRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {record.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {record.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {record.value}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {record.ttl}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}>
                      {getStatusIcon(record.status)}
                      <span className="ml-1">{record.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                        <Copy className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                        <Trash2 className="w-4 h-4" />
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

  const renderSSLTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">SSL Certificates</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage SSL certificates and security</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Request Certificate</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sslCertificates.map((cert) => (
          <div key={cert.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{cert.domain}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{cert.issuer}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(cert.status)}`}>
                {getStatusIcon(cert.status)}
                <span className="ml-1">{cert.status}</span>
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Type:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{cert.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Issued:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{cert.issued}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Expires:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{cert.expires}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Auto Renew:</span>
                <span className={`text-sm font-medium ${cert.autoRenew ? 'text-green-600' : 'text-red-600'}`}>
                  {cert.autoRenew ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>

            <div className="flex space-x-2 mt-4">
              <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                Renew
              </button>
              <button className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm">
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Domain Configuration</h1>
                <p className="text-gray-600 dark:text-gray-400">Manage domains, DNS records, and SSL certificates</p>
              </div>
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                isSaving
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : saveStatus === 'success'
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : saveStatus === 'error'
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : saveStatus === 'success' ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Saved</span>
                </>
              ) : saveStatus === 'error' ? (
                <>
                  <AlertTriangle className="w-4 h-4" />
                  <span>Error</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div className="flex space-x-2 mb-6">
            <TabButton id="domains" label="Domains" icon={Globe} isActive={activeTab === 'domains'} />
            <TabButton id="dns" label="DNS Records" icon={Server} isActive={activeTab === 'dns'} />
            <TabButton id="ssl" label="SSL Certificates" icon={Shield} isActive={activeTab === 'ssl'} />
          </div>

          {/* Tab Content */}
          {activeTab === 'domains' && renderDomainsTab()}
          {activeTab === 'dns' && renderDNSTab()}
          {activeTab === 'ssl' && renderSSLTab()}
        </div>

        {/* Status Messages */}
        {saveStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4"
          >
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              <p className="text-green-800 dark:text-green-200 font-medium">Domain configuration saved successfully!</p>
            </div>
          </motion.div>
        )}

        {saveStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
          >
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
              <p className="text-red-800 dark:text-red-200 font-medium">Failed to save domain configuration. Please try again.</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DomainConfiguration;
