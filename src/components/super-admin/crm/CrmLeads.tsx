import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Star,
  StarOff,
  MoreVertical,
  RefreshCw,
  Download,
  Upload,
  Target,
  UserCheck,
  UserX,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Building,
  Globe,
  Tag,
  BarChart3,
  PieChart,
  Activity,
  X,
} from 'lucide-react';

const CrmLeads: React.FC = () => {
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSource, setSelectedSource] = useState('all');
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [selectedLead, setSelectedLead] = useState<{ id: string; name: string; email: string; phone: string; company: string; status: string; source: string; value: number } | null>(null);

  const leadStatuses = [
    { id: 'new', name: 'New', count: 45, color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' },
    { id: 'contacted', name: 'Contacted', count: 23, color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' },
    { id: 'qualified', name: 'Qualified', count: 18, color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' },
    { id: 'proposal', name: 'Proposal', count: 12, color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' },
    { id: 'negotiation', name: 'Negotiation', count: 8, color: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300' },
    { id: 'closed-won', name: 'Closed Won', count: 15, color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' },
    { id: 'closed-lost', name: 'Closed Lost', count: 7, color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' },
  ];

  const leadSources = [
    { id: 'website', name: 'Website', count: 32, percentage: 35 },
    { id: 'referral', name: 'Referral', count: 18, percentage: 20 },
    { id: 'social', name: 'Social Media', count: 15, percentage: 16 },
    { id: 'email', name: 'Email Campaign', count: 12, percentage: 13 },
    { id: 'events', name: 'Events', count: 8, percentage: 9 },
    { id: 'cold-call', name: 'Cold Call', count: 7, percentage: 7 },
  ];

  const leads = [
    {
      id: '1',
      name: 'John Smith',
      company: 'Acme Corporation',
      email: 'john.smith@acme.com',
      phone: '+1 (555) 123-4567',
      title: 'CTO',
      status: 'qualified',
      source: 'website',
      value: 75000,
      priority: 'high',
      lastContact: '2024-01-15',
      nextFollowUp: '2024-01-20',
      tags: ['enterprise', 'tms'],
      notes: 'Interested in enterprise TMS solution. Budget approved.',
      location: 'New York, NY',
      website: 'acme.com',
      isStarred: true,
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      company: 'TechStart Inc',
      email: 'sarah.j@techstart.com',
      phone: '+1 (555) 234-5678',
      title: 'Operations Manager',
      status: 'contacted',
      source: 'referral',
      value: 45000,
      priority: 'medium',
      lastContact: '2024-01-14',
      nextFollowUp: '2024-01-18',
      tags: ['startup', 'logistics'],
      notes: 'Referred by existing client. Looking for cost-effective solution.',
      location: 'San Francisco, CA',
      website: 'techstart.com',
      isStarred: false,
    },
    {
      id: '3',
      name: 'Mike Chen',
      company: 'Global Logistics Ltd',
      email: 'mike.chen@globallogistics.com',
      phone: '+1 (555) 345-6789',
      title: 'IT Director',
      status: 'proposal',
      source: 'email',
      value: 125000,
      priority: 'high',
      lastContact: '2024-01-13',
      nextFollowUp: '2024-01-17',
      tags: ['enterprise', 'integration'],
      notes: 'Sent proposal yesterday. Waiting for feedback from board.',
      location: 'Chicago, IL',
      website: 'globallogistics.com',
      isStarred: true,
    },
    {
      id: '4',
      name: 'Emily Rodriguez',
      company: 'StartupHub Ventures',
      email: 'emily@startuphub.com',
      phone: '+1 (555) 456-7890',
      title: 'CEO',
      status: 'new',
      source: 'social',
      value: 25000,
      priority: 'low',
      lastContact: '2024-01-12',
      nextFollowUp: '2024-01-16',
      tags: ['startup', 'vc'],
      notes: 'Early stage startup. Need basic TMS features.',
      location: 'Austin, TX',
      website: 'startuphub.com',
      isStarred: false,
    },
    {
      id: '5',
      name: 'David Kim',
      company: 'MegaFreight Solutions',
      email: 'david.kim@megafreight.com',
      phone: '+1 (555) 567-8901',
      title: 'VP Operations',
      status: 'negotiation',
      source: 'events',
      value: 95000,
      priority: 'high',
      lastContact: '2024-01-11',
      nextFollowUp: '2024-01-15',
      tags: ['enterprise', 'freight'],
      notes: 'In final negotiation phase. Price sensitive.',
      location: 'Dallas, TX',
      website: 'megafreight.com',
      isStarred: true,
    },
  ];

  const leadStats = [
    { label: 'Total Leads', value: '128', icon: Users, color: 'text-blue-600', change: '+12%' },
    { label: 'New This Week', value: '23', icon: Plus, color: 'text-green-600', change: '+8%' },
    { label: 'Qualified', value: '45', icon: Target, color: 'text-purple-600', change: '+15%' },
    { label: 'Conversion Rate', value: '18.5%', icon: TrendingUp, color: 'text-orange-600', change: '+3%' },
  ];

  const handleLeadSelect = (leadId: string) => {
    setSelectedLeads(prev =>
      prev.includes(leadId)
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
    );
  };

  const handleSelectAll = () => {
    if (selectedLeads.length === leads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(leads.map(lead => lead.id));
    }
  };

  const getStatusColor = (status: string) => {
    const statusObj = leadStatuses.find(s => s.id === status);
    return statusObj?.color || 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900';
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900';
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || lead.status === selectedStatus;
    const matchesSource = selectedSource === 'all' || lead.source === selectedSource;
    return matchesSearch && matchesStatus && matchesSource;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Lead Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Track and manage your sales leads</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Import
          </button>
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button
            onClick={() => setShowLeadForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Lead
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {leadStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-sm text-green-600 dark:text-green-400">{stat.change}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search leads by name, company, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Statuses</option>
              {leadStatuses.map(status => (
                <option key={status.id} value={status.id}>{status.name} ({status.count})</option>
              ))}
            </select>
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Sources</option>
              {leadSources.map(source => (
                <option key={source.id} value={source.id}>{source.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Lead Status Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {leadStatuses.map((status) => (
          <motion.div
            key={status.id}
            whileHover={{ scale: 1.05 }}
            className={`p-4 rounded-xl border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-600 transition-all cursor-pointer ${
              selectedStatus === status.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'bg-white dark:bg-gray-800'
            }`}
            onClick={() => setSelectedStatus(status.id)}
          >
            <div className="text-center">
              <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${status.color.split(' ')[0]}`}></div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{status.name}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{status.count}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Leads Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Leads ({filteredLeads.length})
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={handleSelectAll}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <CheckCircle className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={selectedLeads.length === leads.length}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Lead
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Last Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredLeads.map((lead, index) => (
                <motion.tr
                  key={lead.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedLeads.includes(lead.id)}
                      onChange={() => handleLeadSelect(lead.id)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {lead.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{lead.name}</p>
                          {lead.isStarred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{lead.company}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{lead.title}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(lead.status)}`}>
                        {lead.status.replace('-', ' ')}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(lead.priority)}`}>
                        {lead.priority}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      ${lead.value.toLocaleString()}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                      {lead.source.replace('-', ' ')}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{lead.lastContact}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="p-1 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-green-600 dark:hover:text-green-400">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-red-600 dark:hover:text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail Modal */}
      <AnimatePresence>
        {selectedLead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedLead(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Lead Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center text-xl font-medium">
                      {selectedLead.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{selectedLead.name}</h2>
                      <p className="text-gray-600 dark:text-gray-400">{selectedLead.title} at {selectedLead.company}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedLead(null)}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(selectedLead.status)}`}>
                    {selectedLead.status.replace('-', ' ')}
                  </span>
                  <span className={`px-3 py-1 text-sm rounded-full ${getPriorityColor(selectedLead.priority)}`}>
                    {selectedLead.priority} Priority
                  </span>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    ${selectedLead.value.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Lead Details */}
              <div className="p-6 flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-400">{selectedLead.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-400">{selectedLead.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-400">{selectedLead.location}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Globe className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-400">{selectedLead.website}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Lead Information</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Source</label>
                        <p className="text-gray-600 dark:text-gray-400 capitalize">{selectedLead.source.replace('-', ' ')}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Contact</label>
                        <p className="text-gray-600 dark:text-gray-400">{selectedLead.lastContact}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Next Follow-up</label>
                        <p className="text-gray-600 dark:text-gray-400">{selectedLead.nextFollowUp}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedLead.tags.map((tag: string) => (
                      <span key={tag} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notes</h3>
                  <p className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    {selectedLead.notes}
                  </p>
                </div>
              </div>

              {/* Lead Actions */}
              <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Call
                  </button>
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </button>
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Schedule
                  </button>
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CrmLeads;
