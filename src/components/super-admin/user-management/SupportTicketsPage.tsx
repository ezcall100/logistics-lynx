import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Plus,
  Edit,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  User,
  Calendar,
  Tag,
  Search,
  Download,
  Flag,
  MessageCircle,
  Paperclip,
  Send,
  Archive,
} from 'lucide-react';

/**
 * Support Tickets Page - Help Desk & Priority Management
 * Created by MCP 301 Agents
 * Timestamp: 2025-09-14T18:10:00.000Z
 */

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  assignee?: string;
  requester: string;
  createdAt: string;
  updatedAt: string;
  lastActivity: string;
  attachments: number;
  messages: number;
  tags: string[];
}

interface TicketMessage {
  id: string;
  ticketId: string;
  sender: string;
  message: string;
  timestamp: string;
  isInternal: boolean;
  attachments?: string[];
}

export const SupportTicketsPage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [messages, setMessages] = useState<TicketMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  useEffect(() => {
    const mockTickets: Ticket[] = [
      {
        id: '1',
        title: 'Login Issues with Mobile App',
        description: 'User cannot log in to the mobile application. Getting authentication error.',
        status: 'open',
        priority: 'high',
        category: 'Authentication',
        assignee: 'John Smith',
        requester: 'sarah.johnson@example.com',
        createdAt: '2025-09-14T10:30:00Z',
        updatedAt: '2025-09-14T12:15:00Z',
        lastActivity: '2025-09-14T12:15:00Z',
        attachments: 2,
        messages: 5,
        tags: ['mobile', 'login', 'urgent'],
      },
      {
        id: '2',
        title: 'Feature Request: Dark Mode',
        description: 'Would like to request a dark mode option for the web interface.',
        status: 'in_progress',
        priority: 'medium',
        category: 'Feature Request',
        assignee: 'Mike Wilson',
        requester: 'user@example.com',
        createdAt: '2025-09-13T14:20:00Z',
        updatedAt: '2025-09-14T11:30:00Z',
        lastActivity: '2025-09-14T11:30:00Z',
        attachments: 0,
        messages: 3,
        tags: ['ui', 'feature', 'enhancement'],
      },
      {
        id: '3',
        title: 'Payment Processing Error',
        description: 'Payment is not being processed correctly. Getting error message.',
        status: 'resolved',
        priority: 'urgent',
        category: 'Billing',
        assignee: 'Emily Davis',
        requester: 'customer@example.com',
        createdAt: '2025-09-12T09:15:00Z',
        updatedAt: '2025-09-14T10:45:00Z',
        lastActivity: '2025-09-14T10:45:00Z',
        attachments: 1,
        messages: 8,
        tags: ['payment', 'billing', 'resolved'],
      },
      {
        id: '4',
        title: 'Account Deactivation Request',
        description: 'User wants to deactivate their account permanently.',
        status: 'closed',
        priority: 'low',
        category: 'Account Management',
        assignee: 'David Brown',
        requester: 'olduser@example.com',
        createdAt: '2025-09-11T16:30:00Z',
        updatedAt: '2025-09-13T14:20:00Z',
        lastActivity: '2025-09-13T14:20:00Z',
        attachments: 0,
        messages: 2,
        tags: ['account', 'deactivation', 'closed'],
      },
    ];

    const mockMessages: TicketMessage[] = [
      {
        id: '1',
        ticketId: '1',
        sender: 'sarah.johnson@example.com',
        message: 'I am unable to log in to the mobile app. I keep getting an authentication error.',
        timestamp: '2025-09-14T10:30:00Z',
        isInternal: false,
      },
      {
        id: '2',
        ticketId: '1',
        sender: 'John Smith',
        message: 'Thank you for reporting this issue. I am looking into the authentication problem.',
        timestamp: '2025-09-14T11:00:00Z',
        isInternal: true,
      },
    ];

    setTickets(mockTickets);
    setMessages(mockMessages);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
      case 'in_progress': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'resolved': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'closed': return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400';
      case 'high': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400';
      case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <AlertCircle className="w-4 h-4" />;
      case 'in_progress': return <Clock className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      case 'closed': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return <Flag className="w-4 h-4" />;
      case 'high': return <AlertCircle className="w-4 h-4" />;
      case 'medium': return <Clock className="w-4 h-4" />;
      case 'low': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.requester.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const openTickets = tickets.filter(ticket => ticket.status === 'open').length;
  const inProgressTickets = tickets.filter(ticket => ticket.status === 'in_progress').length;
  const resolvedTickets = tickets.filter(ticket => ticket.status === 'resolved').length;
  const urgentTickets = tickets.filter(ticket => ticket.priority === 'urgent').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Open Tickets</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{openTickets}</p>
                <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center mt-1">
                  <AlertCircle className="w-3 h-3 mr-1" />Awaiting
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">In Progress</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{inProgressTickets}</p>
                <p className="text-xs text-yellow-600 dark:text-yellow-400 flex items-center mt-1">
                  <Clock className="w-3 h-3 mr-1" />Working
                </p>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
                <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Resolved</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{resolvedTickets}</p>
                <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
                  <CheckCircle className="w-3 h-3 mr-1" />Fixed
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Urgent</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{urgentTickets}</p>
                <p className="text-xs text-red-600 dark:text-red-400 flex items-center mt-1">
                  <Flag className="w-3 h-3 mr-1" />Critical
                </p>
              </div>
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
                <Flag className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl"
            />
          </div>
          
          <div className="flex gap-3">
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
            
            <select
              value={filterPriority}
              onChange={e => setFilterPriority(e.target.value)}
              className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl"
            >
              <option value="all">All Priority</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            
            <button className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2 shadow-lg">
              <Plus className="w-4 h-4" />
              <span>New Ticket</span>
            </button>
          </div>
        </div>

        {/* Tickets List */}
        <div className="space-y-4 mb-8">
          {filteredTickets.map((ticket, index) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer ${
                selectedTicket?.id === ticket.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedTicket(ticket)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                    <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{ticket.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">#{ticket.id} • {ticket.requester}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                    {getStatusIcon(ticket.status)}
                    <span className="ml-1 capitalize">{ticket.status.replace('_', ' ')}</span>
                  </span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                    {getPriorityIcon(ticket.priority)}
                    <span className="ml-1 capitalize">{ticket.priority}</span>
                  </span>
                </div>
              </div>

              <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">{ticket.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Tag className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-500 dark:text-slate-400">{ticket.category}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-500 dark:text-slate-400">{ticket.assignee || 'Unassigned'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-500 dark:text-slate-400">{ticket.messages}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Paperclip className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-500 dark:text-slate-400">{ticket.attachments}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {new Date(ticket.lastActivity).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {ticket.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Ticket Details Panel */}
        {selectedTicket && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedTicket.title}</h2>
                  <p className="text-slate-600 dark:text-slate-400">#{selectedTicket.id} • {selectedTicket.requester}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 flex items-center space-x-2">
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 flex items-center space-x-2">
                  <Archive className="w-4 h-4" />
                  <span>Archive</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Ticket Information */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Ticket Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Status</span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTicket.status)}`}>
                      {getStatusIcon(selectedTicket.status)}
                      <span className="ml-1 capitalize">{selectedTicket.status.replace('_', ' ')}</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Priority</span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedTicket.priority)}`}>
                      {getPriorityIcon(selectedTicket.priority)}
                      <span className="ml-1 capitalize">{selectedTicket.priority}</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Category</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">{selectedTicket.category}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Assignee</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">{selectedTicket.assignee || 'Unassigned'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Created</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">{new Date(selectedTicket.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Last Updated</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">{new Date(selectedTicket.updatedAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Messages</h3>
                <div className="space-y-4">
                  {messages.filter(msg => msg.ticketId === selectedTicket.id).map((message) => (
                    <div key={message.id} className={`p-4 rounded-lg ${message.isInternal ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-slate-50 dark:bg-slate-700/50'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-900 dark:text-white">{message.sender}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">{new Date(message.timestamp).toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{message.message}</p>
                    </div>
                  ))}
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl"
                    />
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SupportTicketsPage;
