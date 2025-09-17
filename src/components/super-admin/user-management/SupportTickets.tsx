import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Plus,
  Search,
  Download,
  RefreshCw,
  Eye,
  Edit,
  Mail,
  Phone,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Star,
  MessageCircle,
  Paperclip,
  Send,
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart3,
  PieChart,
  Globe,
} from 'lucide-react';

/**
 * Support Tickets Page - Redesigned
 * Comprehensive support ticket management and customer service
 * Created by MCP 301 Agents
 * Timestamp: 2025-09-15T15:30:00.000Z
 */

interface SupportTicket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed' | 'pending';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  userId: string;
  userName: string;
  userEmail: string;
  assignedTo?: string;
  assignedToName?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  tags: string[];
  attachments: number;
  messages: number;
  satisfaction?: number;
  lastActivity: string;
  source: 'email' | 'chat' | 'phone' | 'web' | 'api';
}

interface TicketMetric {
  id: string;
  title: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  period: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

// interface TicketCategory {
//   id: string;
//   name: string;
//   description: string;
//   color: string;
// }

export const SupportTickets: React.FC = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  // const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  // const [showCreateModal, setShowCreateModal] = useState(false);
  // const [showTicketModal, setShowTicketModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'tickets' | 'analytics'>('overview');

  // Mock ticket metrics
  const ticketMetrics: TicketMetric[] = [
    {
      id: 'total-tickets',
      title: 'Total Tickets',
      value: 1247,
      change: 12.5,
      changeType: 'increase',
      period: 'vs last month',
      icon: MessageSquare,
      color: 'bg-blue-500',
    },
    {
      id: 'open-tickets',
      title: 'Open Tickets',
      value: 89,
      change: -8.3,
      changeType: 'decrease',
      period: 'vs last month',
      icon: AlertCircle,
      color: 'bg-red-500',
    },
    {
      id: 'resolved-tickets',
      title: 'Resolved Tickets',
      value: 1158,
      change: 15.2,
      changeType: 'increase',
      period: 'vs last month',
      icon: CheckCircle,
      color: 'bg-green-500',
    },
    {
      id: 'avg-resolution',
      title: 'Avg Resolution Time',
      value: 4.2,
      change: -12.1,
      changeType: 'decrease',
      period: 'vs last month',
      icon: Clock,
      color: 'bg-purple-500',
    },
    {
      id: 'satisfaction',
      title: 'Satisfaction Score',
      value: 4.6,
      change: 0.3,
      changeType: 'increase',
      period: 'vs last month',
      icon: Star,
      color: 'bg-yellow-500',
    },
    {
      id: 'response-time',
      title: 'Avg Response Time',
      value: 2.1,
      change: -5.7,
      changeType: 'decrease',
      period: 'vs last month',
      icon: MessageCircle,
      color: 'bg-indigo-500',
    },
  ];

  // Mock data
  useEffect(() => {
    const mockTickets: SupportTicket[] = Array.from({ length: 100 }, (_, i) => ({
      id: `TICKET-${String(i + 1).padStart(4, '0')}`,
      title: [
        'Login issues with two-factor authentication',
        'Payment processing error',
        'Feature request for bulk export',
        'Account access problems',
        'Billing inquiry about charges',
        'API integration support needed',
        'Mobile app crashes on iOS',
        'Data export taking too long',
        'User permission changes not working',
        'Email notifications not being sent',
      ][Math.floor(Math.random() * 10)],
      description: 'Detailed description of the support issue...',
      status: ['open', 'in-progress', 'resolved', 'closed', 'pending'][
        Math.floor(Math.random() * 5)
      ] as 'open' | 'in-progress' | 'resolved' | 'closed' | 'pending',
      priority: ['low', 'medium', 'high', 'urgent'][Math.floor(Math.random() * 4)] as
        | 'low'
        | 'medium'
        | 'high'
        | 'urgent',
      category: ['Technical', 'Billing', 'Feature Request', 'Account', 'General'][
        Math.floor(Math.random() * 5)
      ],
      userId: `user_${i + 1}`,
      userName: `User ${i + 1}`,
      userEmail: `user${i + 1}@demo-company.com`,
      assignedTo: Math.random() > 0.3 ? `agent_${Math.floor(Math.random() * 10) + 1}` : undefined,
      assignedToName:
        Math.random() > 0.3 ? `Agent ${Math.floor(Math.random() * 10) + 1}` : undefined,
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      resolvedAt:
        Math.random() > 0.4
          ? new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000).toISOString()
          : undefined,
      tags: ['bug', 'feature', 'urgent', 'billing', 'technical'].slice(
        0,
        Math.floor(Math.random() * 3) + 1
      ),
      attachments: Math.floor(Math.random() * 5),
      messages: Math.floor(Math.random() * 10) + 1,
      satisfaction: Math.random() > 0.3 ? Math.floor(Math.random() * 2) + 4 : undefined,
      lastActivity: new Date(Date.now() - Math.random() * 3 * 24 * 60 * 60 * 1000).toISOString(),
      source: ['email', 'chat', 'phone', 'web', 'api'][Math.floor(Math.random() * 5)] as
        | 'email'
        | 'chat'
        | 'phone'
        | 'web'
        | 'api',
    }));

    setTickets(mockTickets);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'resolved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'closed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'pending':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <AlertCircle className="w-4 h-4 responsive-container" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 responsive-container" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4 responsive-container" />;
      case 'closed':
        return <XCircle className="w-4 h-4 responsive-container" />;
      case 'pending':
        return <Clock className="w-4 h-4 responsive-container" />;
      default:
        return <AlertCircle className="w-4 h-4 responsive-container" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'email':
        return Mail;
      case 'chat':
        return MessageCircle;
      case 'phone':
        return Phone;
      case 'web':
        return Globe;
      case 'api':
        return Activity;
      default:
        return MessageSquare;
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'email':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'chat':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'phone':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'web':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'api':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || ticket.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'Technical', name: 'Technical' },
    { id: 'Billing', name: 'Billing' },
    { id: 'Feature Request', name: 'Feature Request' },
    { id: 'Account', name: 'Account' },
    { id: 'General', name: 'General' },
  ];

  const statuses = [
    { id: 'all', name: 'All Statuses' },
    { id: 'open', name: 'Open' },
    { id: 'in-progress', name: 'In Progress' },
    { id: 'resolved', name: 'Resolved' },
    { id: 'closed', name: 'Closed' },
    { id: 'pending', name: 'Pending' },
  ];

  const priorities = [
    { id: 'all', name: 'All Priorities' },
    { id: 'urgent', name: 'Urgent' },
    { id: 'high', name: 'High' },
    { id: 'medium', name: 'Medium' },
    { id: 'low', name: 'Low' },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'tickets', label: 'Tickets', icon: MessageSquare, count: tickets.length },
    { id: 'analytics', label: 'Analytics', icon: PieChart },
  ];

  return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 responsive-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 responsive-container">
        {/* Header */}
        <div className="mb-8 responsive-container">
          <div className="flex items-center justify-between responsive-container">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 responsive-container">
                Support Tickets
              </h1>
              <p className="text-gray-600 dark:text-gray-400 responsive-container">
                Manage customer support tickets and provide exceptional service
              </p>
            </div>
            <div className="flex items-center space-x-3 responsive-container">
              <button className="px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center space-x-2 responsive-container" aria-label="Button">
                <RefreshCw className="w-4 h-4 responsive-container" />
                <span>Refresh</span>
              </button>
              <button className="px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center space-x-2 responsive-container" aria-label="Button">
                <Download className="w-4 h-4 responsive-container" />
                <span>Export</span>
              </button>
              <button
                onClick={() = aria-label="Button"> console.log('Create modal clicked')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 responsive-container"
              >
                <Plus className="w-4 h-4 responsive-container" />
                <span>New Ticket</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 responsive-container">
          <div className="border-b border-gray-200 dark:border-slate-700 responsive-container">
            <nav className="-mb-px flex space-x-8 responsive-container">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
                  <button
                    key={tab.id}
                    onClick={() = aria-label="Button"> setSelectedTab(tab.id as 'overview' | 'tickets' | 'analytics')}
                    className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                      selectedTab === tab.id
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <Icon className="w-4 h-4 responsive-container" />
                    <span>{tab.label}</span>
                    {tab.count !== undefined && (
                      <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full text-xs responsive-container">
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 responsive-container">
          <div className="flex flex-col lg:flex-row gap-4 responsive-container">
            <div className="relative flex-1 responsive-container">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 responsive-container" />
              <input
                type="text"
                placeholder="Search tickets by title, user, or ID..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm responsive-container"
              />
            </div>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-700 responsive-container"
            >
              {statuses.map(status => (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              ))}
            </select>
            <select
              value={priorityFilter}
              onChange={e => setPriorityFilter(e.target.value)}
              className="px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-700 responsive-container"
            >
              {priorities.map(priority => (
                <option key={priority.id} value={priority.id}>
                  {priority.name}
                </option>
              ))}
            </select>
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-700 responsive-container"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content */}
        {selectedTab === 'overview' && (
          <>
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8 responsive-container">
              {ticketMetrics.map(metric => {
                const Icon = metric.icon;
                return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
                  <motion.div
                    key={metric.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow responsive-container"
                  >
                    <div className="flex items-center justify-between mb-4 responsive-container">
                      <div className={`p-2 rounded-lg ${metric.color} bg-opacity-10`}>
                        <Icon className={`w-5 h-5 ${metric.color.replace('bg-', 'text-')}`} />
                      </div>
                      <div className="flex items-center space-x-1 responsive-container">
                        {metric.changeType === 'increase' ? (
                          <TrendingUp className="w-4 h-4 text-green-500 responsive-container" />
                        ) : metric.changeType === 'decrease' ? (
                          <TrendingDown className="w-4 h-4 text-red-500 responsive-container" />
                        ) : (
                          <Activity className="w-4 h-4 text-gray-500 responsive-container" />
                        )}
                        <span
                          className={`text-sm font-medium ${
                            metric.changeType === 'increase'
                              ? 'text-green-600 dark:text-green-400'
                              : metric.changeType === 'decrease'
                                ? 'text-red-600 dark:text-red-400'
                                : 'text-gray-600 dark:text-gray-400'
                          }`}
                        >
                          {Math.abs(metric.change)}%
                        </span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1 responsive-container">
                      {metric.value}
                      {metric.id === 'avg-resolution' && 'h'}
                      {metric.id === 'satisfaction' && '/5'}
                      {metric.id === 'response-time' && 'h'}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 responsive-container">{metric.title}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-500 mt-1 responsive-container">
                      {metric.period}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Recent Tickets */}
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg overflow-hidden responsive-container">
              <div className="p-6 border-b border-gray-200 dark:border-slate-700 responsive-container">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white responsive-container">
                  Recent Tickets
                </h3>
              </div>
              <div className="overflow-x-auto responsive-container">
                <table className="w-full responsive-container">
                  <thead className="bg-gray-50 dark:bg-slate-700/50 responsive-container">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                        Ticket
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                        Priority
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                        Source
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                        Created
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-slate-700 responsive-container">
                    {filteredTickets.slice(0, 10).map(ticket => {
                      const SourceIcon = getSourceIcon(ticket.source);
                      return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
                        <motion.tr
                          key={ticket.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer responsive-container"
                          onClick={() => {
                            console.log('Ticket selected:', ticket);
                          }}
                        >
                          <td className="px-6 py-4 whitespace-nowrap responsive-container">
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white responsive-container">
                                {ticket.id}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs responsive-container">
                                {ticket.title}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap responsive-container">
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white responsive-container">
                                {ticket.userName}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400 responsive-container">
                                {ticket.userEmail}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap responsive-container">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}
                            >
                              {getStatusIcon(ticket.status)}
                              <span className="ml-1 capitalize responsive-container">
                                {ticket.status.replace('-', ' ')}
                              </span>
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap responsive-container">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}
                            >
                              {ticket.priority}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap responsive-container">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSourceColor(ticket.source)}`}
                            >
                              <SourceIcon className="w-3 h-3 mr-1 responsive-container" />
                              {ticket.source}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap responsive-container">
                            <div className="text-sm text-gray-900 dark:text-white responsive-container">
                              {new Date(ticket.createdAt).toLocaleDateString()}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 responsive-container">
                              {new Date(ticket.createdAt).toLocaleTimeString()}
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {selectedTab === 'tickets' && (
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg overflow-hidden responsive-container">
            <div className="overflow-x-auto responsive-container">
              <table className="w-full responsive-container">
                <thead className="bg-gray-50 dark:bg-slate-700/50 responsive-container">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                      Ticket
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                      Assigned To
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                      Messages
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider responsive-container">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-slate-700 responsive-container">
                  {filteredTickets.map(ticket => (
                    <motion.tr
                      key={ticket.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors responsive-container"
                    >
                      <td className="px-6 py-4 whitespace-nowrap responsive-container">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white responsive-container">
                            {ticket.id}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs responsive-container">
                            {ticket.title}
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1 responsive-container">
                            {ticket.tags.slice(0, 2).map(tag => (
                              <span
                                key={tag}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 responsive-container"
                              >
                                {tag}
                              </span>
                            ))}
                            {ticket.tags.length > 2 && (
                              <span className="text-xs text-gray-500 dark:text-gray-400 responsive-container">
                                +{ticket.tags.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap responsive-container">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white responsive-container">
                            {ticket.userName}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 responsive-container">
                            {ticket.userEmail}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap responsive-container">
                        <span className="text-sm text-gray-900 dark:text-white responsive-container">
                          {ticket.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap responsive-container">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}
                        >
                          {getStatusIcon(ticket.status)}
                          <span className="ml-1 capitalize responsive-container">{ticket.status.replace('-', ' ')}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap responsive-container">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}
                        >
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap responsive-container">
                        <div className="text-sm text-gray-900 dark:text-white responsive-container">
                          {ticket.assignedToName || 'Unassigned'}
                        </div>
                        {ticket.assignedTo && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 responsive-container">
                            {ticket.assignedTo}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap responsive-container">
                        <div className="flex items-center space-x-2 responsive-container">
                          <MessageCircle className="w-4 h-4 text-gray-400 responsive-container" />
                          <span className="text-sm text-gray-900 dark:text-white responsive-container">
                            {ticket.messages}
                          </span>
                          {ticket.attachments > 0 && (
                            <Paperclip className="w-4 h-4 text-gray-400 responsive-container" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium responsive-container">
                        <div className="flex items-center space-x-2 responsive-container">
                          <button
                            onClick={() = aria-label="Button"> {
                              console.log('Ticket selected:', ticket);
                            }}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 responsive-container"
                            title="View"
                          >
                            <Eye className="w-4 h-4 responsive-container" />
                          </button>
                          <button
                            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 responsive-container"
                            title="Edit"
                           aria-label="Button">
                            <Edit className="w-4 h-4 responsive-container" />
                          </button>
                          <button
                            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 responsive-container"
                            title="Reply"
                           aria-label="Button">
                            <Send className="w-4 h-4 responsive-container" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 responsive-container">
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg p-6 responsive-container">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 responsive-container">
                Ticket Trends
              </h3>
              <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400 responsive-container">
                <div className="text-center responsive-container">
                  <BarChart3 className="w-12 h-12 mx-auto mb-2 responsive-container" />
                  <p>Ticket trends chart will be displayed here</p>
                </div>
              </div>
            </div>
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg p-6 responsive-container">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 responsive-container">
                Category Distribution
              </h3>
              <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400 responsive-container">
                <div className="text-center responsive-container">
                  <PieChart className="w-12 h-12 mx-auto mb-2 responsive-container" />
                  <p>Category distribution chart will be displayed here</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportTickets;
