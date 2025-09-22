import React, { useState } from 'react';
import {
  Users,
  User,
  UserPlus,
  Search,
  Settings,
  MoreVertical,
  Phone,
  Mail,
  MapPin,
  Building,
  Star,
  Edit,
  Upload,
  Maximize2,
  Minimize2,
  RefreshCw,
  X,
  CheckCircle,
  Plus,
  Tag,
  MessageSquare,
  Video,
  FileText,
  History,
  Grid3X3,
  List,
} from 'lucide-react';

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  mobile?: string;
  company: string;
  jobTitle: string;
  department: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  website?: string;
  avatar: string;
  tags: string[];
  groups: string[];
  notes: string;
  isFavorite: boolean;
  isActive: boolean;
  lastContact?: Date;
  contactSource: 'manual' | 'import' | 'api' | 'form';
  createdAt: Date;
  updatedAt: Date;
  socialMedia?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  customFields: Array<{
    name: string;
    value: string;
    type: 'text' | 'number' | 'date' | 'email' | 'phone';
  }>;
}

interface ContactGroup {
  id: string;
  name: string;
  description: string;
  color: string;
  contactCount: number;
  isDefault: boolean;
  createdAt: Date;
}

interface ContactActivity {
  id: string;
  contactId: string;
  type: 'call' | 'email' | 'meeting' | 'note' | 'task';
  title: string;
  description: string;
  timestamp: Date;
  userId: string;
  userName: string;
}

const ContactsPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'contacts' | 'groups' | 'import' | 'activities'>('contacts');
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGroup, setFilterGroup] = useState<string>('all');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [newContact, setNewContact] = useState<Partial<Contact>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    department: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    },
    tags: [],
    groups: [],
    notes: '',
    isFavorite: false,
    isActive: true,
    contactSource: 'manual',
    customFields: []
  });

  // Mock data
  const contacts: Contact[] = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@company.com',
      phone: '+1 (555) 123-4567',
      mobile: '+1 (555) 987-6543',
      company: 'ABC Corporation',
      jobTitle: 'Sales Manager',
      department: 'Sales',
      address: {
        street: '123 Main Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      },
      website: 'https://abccorp.com',
      avatar: 'JD',
      tags: ['vip', 'sales', 'decision-maker'],
      groups: ['VIP Customers', 'Sales Team'],
      notes: 'Key client with high potential. Prefers morning calls. Interested in premium solutions.',
      isFavorite: true,
      isActive: true,
      lastContact: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      contactSource: 'manual',
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      socialMedia: {
        linkedin: 'https://linkedin.com/in/johndoe',
        twitter: '@johndoe'
      },
      customFields: [
        { name: 'Lead Score', value: '85', type: 'number' },
        { name: 'Budget', value: '50000', type: 'number' }
      ]
    },
    {
      id: '2',
      firstName: 'Sarah',
      lastName: 'Wilson',
      email: 'sarah.wilson@techcorp.com',
      phone: '+1 (555) 456-7890',
      company: 'TechCorp Solutions',
      jobTitle: 'CTO',
      department: 'Technology',
      address: {
        street: '456 Tech Avenue',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94105',
        country: 'USA'
      },
      avatar: 'SW',
      tags: ['cto', 'technology', 'enterprise'],
      groups: ['Enterprise Clients', 'Technology Leaders'],
      notes: 'Technical decision maker. Very interested in AI solutions. Budget approved for Q1.',
      isFavorite: true,
      isActive: true,
      lastContact: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      contactSource: 'import',
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      customFields: [
        { name: 'Lead Score', value: '92', type: 'number' },
        { name: 'Budget', value: '150000', type: 'number' }
      ]
    },
    {
      id: '3',
      firstName: 'Mike',
      lastName: 'Johnson',
      email: 'mike.johnson@startup.io',
      phone: '+1 (555) 789-0123',
      company: 'Startup.io',
      jobTitle: 'Founder & CEO',
      department: 'Executive',
      address: {
        street: '789 Innovation Drive',
        city: 'Austin',
        state: 'TX',
        zipCode: '78701',
        country: 'USA'
      },
      avatar: 'MJ',
      tags: ['ceo', 'startup', 'entrepreneur'],
      groups: ['Startups', 'Decision Makers'],
      notes: 'Fast-growing startup. Looking for scalable solutions. Very responsive to emails.',
      isFavorite: false,
      isActive: true,
      lastContact: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      contactSource: 'api',
      createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      customFields: [
        { name: 'Lead Score', value: '78', type: 'number' },
        { name: 'Company Size', value: '25', type: 'number' }
      ]
    }
  ];

  const groups: ContactGroup[] = [
    {
      id: '1',
      name: 'VIP Customers',
      description: 'High-value customers with premium support',
      color: 'bg-purple-500',
      contactCount: 12,
      isDefault: false,
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      name: 'Sales Team',
      description: 'Internal sales team members',
      color: 'bg-blue-500',
      contactCount: 8,
      isDefault: false,
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)
    },
    {
      id: '3',
      name: 'Enterprise Clients',
      description: 'Large enterprise customers',
      color: 'bg-green-500',
      contactCount: 25,
      isDefault: false,
      createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
    },
    {
      id: '4',
      name: 'All Contacts',
      description: 'Default group for all contacts',
      color: 'bg-gray-500',
      contactCount: contacts.length,
      isDefault: true,
      createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
    }
  ];

  const activities: ContactActivity[] = [
    {
      id: 'a1',
      contactId: '1',
      type: 'call',
      title: 'Sales Call',
      description: 'Discussed Q4 requirements and pricing options',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      userId: 'u1',
      userName: 'You'
    },
    {
      id: 'a2',
      contactId: '1',
      type: 'email',
      title: 'Follow-up Email',
      description: 'Sent proposal and pricing details',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      userId: 'u1',
      userName: 'You'
    },
    {
      id: 'a3',
      contactId: '2',
      type: 'meeting',
      title: 'Product Demo',
      description: 'Demonstrated AI features and integration capabilities',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      userId: 'u1',
      userName: 'You'
    }
  ];

  const currentContact = contacts.find(c => c.id === selectedContact);
  const currentGroup = groups.find(g => g.id === filterGroup);
  const contactActivities = activities.filter(a => a.contactId === selectedContact);

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const handleCreateContact = () => {
    console.log('Creating contact:', newContact);
    setShowCreateModal(false);
    setNewContact({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      jobTitle: '',
      department: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
      },
      tags: [],
      groups: [],
      notes: '',
      isFavorite: false,
      isActive: true,
      contactSource: 'manual',
      customFields: []
    });
  };

  const toggleFavorite = (contactId: string) => {
    console.log('Toggle favorite for contact:', contactId);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'call': return <Phone className="w-4 h-4 text-blue-500" />;
      case 'email': return <Mail className="w-4 h-4 text-green-500" />;
      case 'meeting': return <Video className="w-4 h-4 text-purple-500" />;
      case 'note': return <FileText className="w-4 h-4 text-yellow-500" />;
      case 'task': return <CheckCircle className="w-4 h-4 text-orange-500" />;
      default: return <MessageSquare className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="h-full flex bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
        sidebarCollapsed ? 'w-16' : 'w-80'
      } flex flex-col`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                  <Users className="w-6 h-6 text-indigo-500" />
                  <span>Contacts</span>
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Contact management & CRM</p>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              {sidebarCollapsed ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        {!sidebarCollapsed && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setShowCreateModal(true)}
              className="w-full flex items-center justify-center space-x-2 p-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors mb-2"
            >
              <UserPlus className="w-4 h-4" />
              <span className="font-medium">Add Contact</span>
            </button>
            <button className="w-full flex items-center justify-center space-x-2 p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              <Upload className="w-4 h-4" />
              <span className="font-medium">Import Contacts</span>
            </button>
          </div>
        )}

        {/* Navigation Tabs */}
        {!sidebarCollapsed && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="space-y-1">
              {[
                { id: 'contacts', label: 'Contacts', icon: Users, count: contacts.length },
                { id: 'groups', label: 'Groups', icon: Tag, count: groups.length },
                { id: 'import', label: 'Import', icon: Upload, count: null },
                { id: 'activities', label: 'Activities', icon: History, count: null },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id as 'contacts' | 'companies' | 'groups' | 'import' | 'activities')}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                    selectedTab === tab.id
                      ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </div>
                  {tab.count !== null && (
                    <span className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Groups Filter */}
        {!sidebarCollapsed && selectedTab === 'contacts' && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Groups</h3>
            <div className="space-y-2">
              {groups.map((group) => (
                <button
                  key={group.id}
                  onClick={() => setFilterGroup(group.id)}
                  className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                    filterGroup === group.id
                      ? 'bg-indigo-50 dark:bg-indigo-900/20'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${group.color}`}></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{group.name}</span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{group.contactCount}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search */}
        {!sidebarCollapsed && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Sidebar Footer */}
        {!sidebarCollapsed && (
          <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Contacts</p>
                  <p className="text-xs text-green-600">Active</p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Settings className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Contact List */}
        <div className="w-1/2 border-r border-gray-200 dark:border-gray-700 flex flex-col">
          {/* Content Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                  {selectedTab}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedTab === 'contacts' && `${contacts.length} contacts`}
                  {selectedTab === 'groups' && `${groups.length} groups`}
                  {selectedTab === 'import' && 'Import contacts from various sources'}
                  {selectedTab === 'activities' && 'Recent contact activities'}
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                {selectedTab === 'contacts' && (
                  <>
                    <button
                      onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      {viewMode === 'list' ? <Grid3X3 className="w-4 h-4" /> : <List className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => setShowCreateModal(true)}
                      className="flex items-center space-x-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Contact</span>
                    </button>
                  </>
                )}
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <RefreshCw className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Content List */}
          <div className="flex-1 overflow-y-auto">
            {selectedTab === 'contacts' && (
              <div className="space-y-1">
                {contacts
                  .filter(contact => 
                    (filterGroup === 'all' || contact.groups.includes(currentGroup?.name || '')) &&
                    (searchQuery === '' || 
                      contact.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      contact.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      contact.company.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                  )
                  .map((contact) => (
                    <div
                      key={contact.id}
                      onClick={() => setSelectedContact(contact.id)}
                      className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer transition-colors ${
                        selectedContact === contact.id
                          ? 'bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-l-indigo-500'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {contact.avatar}
                          </div>
                          {contact.isFavorite && (
                            <div className="absolute -top-1 -right-1">
                              <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {contact.firstName} {contact.lastName}
                            </h4>
                            <div className="flex items-center space-x-1">
                              {contact.isFavorite && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(contact.id);
                                  }}
                                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors"
                                >
                                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                </button>
                              )}
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                            {contact.jobTitle} at {contact.company}
                          </p>
                          
                          <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                            <span className="flex items-center space-x-1">
                              <Mail className="w-3 h-3" />
                              <span>{contact.email}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Phone className="w-3 h-3" />
                              <span>{contact.phone}</span>
                            </span>
                          </div>
                          
                          {contact.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {contact.tags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                              {contact.tags.length > 2 && (
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  +{contact.tags.length - 2}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {selectedTab === 'groups' && (
              <div className="space-y-1">
                {groups.map((group) => (
                  <div key={group.id} className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${group.color} text-white`}>
                        <Tag className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">{group.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{group.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                          <span>{group.contactCount} contacts</span>
                          <span>Created: {formatDate(group.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Contact Details */}
        <div className="w-1/2 flex flex-col">
          {currentContact ? (
            <>
              {/* Contact Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-medium">
                      {currentContact.avatar}
                    </div>
                    {currentContact.isFavorite && (
                      <div className="absolute -top-1 -right-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {currentContact.firstName} {currentContact.lastName}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {currentContact.jobTitle} at {currentContact.company}
                    </p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        currentContact.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {currentContact.isActive ? 'Active' : 'Inactive'}
                      </span>
                      {currentContact.lastContact && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Last contact: {formatDate(currentContact.lastContact)}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <Edit className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Contact Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  {/* Contact Information */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h4>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                          <p className="text-gray-900 dark:text-white">{currentContact.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                          <p className="text-gray-900 dark:text-white">{currentContact.phone}</p>
                        </div>
                      </div>
                      
                      {currentContact.mobile && (
                        <div className="flex items-center space-x-3">
                          <Phone className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Mobile</p>
                            <p className="text-gray-900 dark:text-white">{currentContact.mobile}</p>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-3">
                        <Building className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Company</p>
                          <p className="text-gray-900 dark:text-white">{currentContact.company}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                          <p className="text-gray-900 dark:text-white">
                            {currentContact.address.street}<br />
                            {currentContact.address.city}, {currentContact.address.state} {currentContact.address.zipCode}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tags and Groups */}
                  {(currentContact.tags.length > 0 || currentContact.groups.length > 0) && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tags & Groups</h4>
                      <div className="space-y-3">
                        {currentContact.tags.length > 0 && (
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Tags</p>
                            <div className="flex flex-wrap gap-2">
                              {currentContact.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {currentContact.groups.length > 0 && (
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Groups</p>
                            <div className="flex flex-wrap gap-2">
                              {currentContact.groups.map((group) => (
                                <span
                                  key={group}
                                  className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-sm rounded-full"
                                >
                                  {group}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Custom Fields */}
                  {currentContact.customFields.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Custom Fields</h4>
                      <div className="grid grid-cols-1 gap-3">
                        {currentContact.customFields.map((field, index) => (
                          <div key={index} className="flex justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <span className="text-sm text-gray-500 dark:text-gray-400">{field.name}</span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{field.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  {currentContact.notes && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notes</h4>
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{currentContact.notes}</p>
                      </div>
                    </div>
                  )}

                  {/* Recent Activities */}
                  {contactActivities.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activities</h4>
                      <div className="space-y-3">
                        {contactActivities.map((activity) => (
                          <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="flex-shrink-0">
                              {getActivityIcon(activity.type)}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 dark:text-white">{activity.title}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{activity.description}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {formatDate(activity.timestamp)} • {activity.userName}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            /* No Contact Selected */
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Select a Contact
                </h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md">
                  Choose a contact from the list to view detailed information, activities, and interaction history.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Contact Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Contact</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
                  <input
                    type="text"
                    value={newContact.firstName || ''}
                    onChange={(e) => setNewContact(prev => ({ ...prev, firstName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="First name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={newContact.lastName || ''}
                    onChange={(e) => setNewContact(prev => ({ ...prev, lastName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Last name"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    value={newContact.email || ''}
                    onChange={(e) => setNewContact(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="email@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={newContact.phone || ''}
                    onChange={(e) => setNewContact(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company</label>
                  <input
                    type="text"
                    value={newContact.company || ''}
                    onChange={(e) => setNewContact(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Company name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Job Title</label>
                  <input
                    type="text"
                    value={newContact.jobTitle || ''}
                    onChange={(e) => setNewContact(prev => ({ ...prev, jobTitle: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Job title"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notes</label>
                <textarea
                  value={newContact.notes || ''}
                  onChange={(e) => setNewContact(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  rows={3}
                  placeholder="Additional notes about this contact"
                />
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateContact}
                  className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                >
                  Create Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsPage;
