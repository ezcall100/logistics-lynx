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
  Building,
  Calendar,
  Star,
  StarOff,
  MoreVertical,
  RefreshCw,
  Download,
  Upload,
  UserCheck,
  UserX,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Globe,
  Tag,
  BarChart3,
  PieChart,
  Activity,
  X,
  User,
  MessageSquare,
  FileText,
  Link,
} from 'lucide-react';

const CrmContacts: React.FC = () => {
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showContactForm, setShowContactForm] = useState(false);
  const [selectedContact, setSelectedContact] = useState<{ id: string; name: string; email: string; phone: string; company: string; category: string } | null>(null);

  const contactCategories = [
    { id: 'customers', name: 'Customers', count: 156, color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' },
    { id: 'leads', name: 'Leads', count: 89, color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' },
    { id: 'prospects', name: 'Prospects', count: 45, color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' },
    { id: 'partners', name: 'Partners', count: 23, color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' },
    { id: 'vendors', name: 'Vendors', count: 34, color: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300' },
  ];

  const contacts = [
    {
      id: '1',
      name: 'John Smith',
      company: 'Acme Corporation',
      email: 'john.smith@acme.com',
      phone: '+1 (555) 123-4567',
      title: 'CTO',
      category: 'customers',
      status: 'active',
      lastContact: '2024-01-15',
      nextFollowUp: '2024-01-20',
      tags: ['enterprise', 'tms', 'priority'],
      notes: 'Key decision maker for TMS implementation. Very satisfied with current solution.',
      location: 'New York, NY',
      website: 'acme.com',
      isStarred: true,
      dealValue: 75000,
      dealStage: 'closed-won',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      company: 'TechStart Inc',
      email: 'sarah.j@techstart.com',
      phone: '+1 (555) 234-5678',
      title: 'Operations Manager',
      category: 'leads',
      status: 'active',
      lastContact: '2024-01-14',
      nextFollowUp: '2024-01-18',
      tags: ['startup', 'logistics', 'demo'],
      notes: 'Interested in cost-effective TMS solution. Budget constraints.',
      location: 'San Francisco, CA',
      website: 'techstart.com',
      isStarred: false,
      dealValue: 25000,
      dealStage: 'proposal',
    },
    {
      id: '3',
      name: 'Mike Chen',
      company: 'Global Logistics Ltd',
      email: 'mike.chen@globallogistics.com',
      phone: '+1 (555) 345-6789',
      title: 'IT Director',
      category: 'customers',
      status: 'active',
      lastContact: '2024-01-13',
      nextFollowUp: '2024-01-17',
      tags: ['enterprise', 'integration', 'renewal'],
      notes: 'Long-term customer. Happy with service. Discussing renewal.',
      location: 'Chicago, IL',
      website: 'globallogistics.com',
      isStarred: true,
      dealValue: 125000,
      dealStage: 'negotiation',
    },
    {
      id: '4',
      name: 'Emily Rodriguez',
      company: 'StartupHub Ventures',
      email: 'emily@startuphub.com',
      phone: '+1 (555) 456-7890',
      title: 'CEO',
      category: 'prospects',
      status: 'active',
      lastContact: '2024-01-12',
      nextFollowUp: '2024-01-16',
      tags: ['startup', 'vc', 'early-stage'],
      notes: 'Early stage startup. Needs basic TMS features.',
      location: 'Austin, TX',
      website: 'startuphub.com',
      isStarred: false,
      dealValue: 15000,
      dealStage: 'qualified',
    },
    {
      id: '5',
      name: 'David Kim',
      company: 'MegaFreight Solutions',
      email: 'david.kim@megafreight.com',
      phone: '+1 (555) 567-8901',
      title: 'VP Operations',
      category: 'customers',
      status: 'active',
      lastContact: '2024-01-11',
      nextFollowUp: '2024-01-15',
      tags: ['enterprise', 'freight', 'expansion'],
      notes: 'Looking to expand TMS usage to additional facilities.',
      location: 'Dallas, TX',
      website: 'megafreight.com',
      isStarred: true,
      dealValue: 95000,
      dealStage: 'proposal',
    },
  ];

  const contactStats = [
    { label: 'Total Contacts', value: '347', icon: Users, color: 'text-blue-600', change: '+8%' },
    { label: 'Active Customers', value: '156', icon: UserCheck, color: 'text-green-600', change: '+12%' },
    { label: 'New This Month', value: '23', icon: Plus, color: 'text-purple-600', change: '+15%' },
    { label: 'Follow-ups Due', value: '12', icon: Clock, color: 'text-orange-600', change: '-5%' },
  ];

  const handleContactSelect = (contactId: string) => {
    setSelectedContacts(prev =>
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleSelectAll = () => {
    if (selectedContacts.length === contacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(contacts.map(contact => contact.id));
    }
  };

  const getCategoryColor = (category: string) => {
    const categoryObj = contactCategories.find(c => c.id === category);
    return categoryObj?.color || 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100 dark:bg-green-900';
      case 'inactive': return 'text-gray-600 bg-gray-100 dark:bg-gray-900';
      case 'blocked': return 'text-red-600 bg-red-100 dark:bg-red-900';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900';
    }
  };

  const getDealStageColor = (stage: string) => {
    switch (stage) {
      case 'closed-won': return 'text-green-600 bg-green-100 dark:bg-green-900';
      case 'proposal': return 'text-blue-600 bg-blue-100 dark:bg-blue-900';
      case 'negotiation': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900';
      case 'qualified': return 'text-purple-600 bg-purple-100 dark:bg-purple-900';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900';
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || contact.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your business contacts and relationships</p>
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
            onClick={() => setShowContactForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Contact
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {contactStats.map((stat, index) => (
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
                placeholder="Search contacts by name, company, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Categories</option>
              {contactCategories.map(category => (
                <option key={category.id} value={category.id}>{category.name} ({category.count})</option>
              ))}
            </select>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
              <Filter className="w-4 h-4" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Contact Categories */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {contactCategories.map((category) => (
          <motion.div
            key={category.id}
            whileHover={{ scale: 1.05 }}
            className={`p-4 rounded-xl border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-600 transition-all cursor-pointer ${
              selectedCategory === category.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'bg-white dark:bg-gray-800'
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <div className="text-center">
              <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${category.color.split(' ')[0]}`}></div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{category.name}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{category.count}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContacts.map((contact, index) => (
          <motion.div
            key={contact.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedContacts.includes(contact.id)}
                  onChange={() => handleContactSelect(contact.id)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center text-lg font-medium">
                  {contact.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{contact.name}</h3>
                    {contact.isStarred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{contact.company}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{contact.title}</p>
                </div>
              </div>
              <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-400 truncate">{contact.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-400">{contact.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-400">{contact.location}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(contact.category)}`}>
                {contact.category}
              </span>
              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(contact.status)}`}>
                {contact.status}
              </span>
              <span className={`px-2 py-1 text-xs rounded-full ${getDealStageColor(contact.dealStage)}`}>
                {contact.dealStage.replace('-', ' ')}
              </span>
            </div>

            {contact.dealValue && (
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Deal Value</span>
                  <span className="font-semibold text-gray-900 dark:text-white">${contact.dealValue.toLocaleString()}</span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedContact(contact)}
                className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View
              </button>
              <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Edit className="w-4 h-4" />
              </button>
              <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Contact Detail Modal */}
      <AnimatePresence>
        {selectedContact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedContact(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Contact Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-medium">
                      {selectedContact.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{selectedContact.name}</h2>
                      <p className="text-gray-600 dark:text-gray-400">{selectedContact.title} at {selectedContact.company}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedContact(null)}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 text-sm rounded-full ${getCategoryColor(selectedContact.category)}`}>
                    {selectedContact.category}
                  </span>
                  <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(selectedContact.status)}`}>
                    {selectedContact.status}
                  </span>
                  <span className={`px-3 py-1 text-sm rounded-full ${getDealStageColor(selectedContact.dealStage)}`}>
                    {selectedContact.dealStage.replace('-', ' ')}
                  </span>
                  {selectedContact.dealValue && (
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      ${selectedContact.dealValue.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              {/* Contact Details */}
              <div className="p-6 flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Email</p>
                          <p className="text-gray-600 dark:text-gray-400">{selectedContact.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Phone</p>
                          <p className="text-gray-600 dark:text-gray-400">{selectedContact.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Location</p>
                          <p className="text-gray-600 dark:text-gray-400">{selectedContact.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-gray-500" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Website</p>
                          <p className="text-gray-600 dark:text-gray-400">{selectedContact.website}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Business Information</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Last Contact</p>
                        <p className="text-gray-600 dark:text-gray-400">{selectedContact.lastContact}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Next Follow-up</p>
                        <p className="text-gray-600 dark:text-gray-400">{selectedContact.nextFollowUp}</p>
                      </div>
                      {selectedContact.dealValue && (
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Deal Value</p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">${selectedContact.dealValue.toLocaleString()}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedContact.tags.map((tag: string) => (
                      <span key={tag} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notes</h3>
                  <p className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    {selectedContact.notes}
                  </p>
                </div>
              </div>

              {/* Contact Actions */}
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
                    <MessageSquare className="w-4 h-4" />
                    Message
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

export default CrmContacts;
