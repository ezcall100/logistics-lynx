import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Search,
  Filter,
  Plus,
  Send,
  Archive,
  Trash2,
  Star,
  StarOff,
  Reply,
  Forward,
  Download,
  Paperclip,
  Eye,
  EyeOff,
  Clock,
  Check,
  CheckCheck,
  AlertCircle,
  User,
  Users,
  Calendar,
  Tag,
  MoreVertical,
  RefreshCw,
  Settings,
  BarChart3,
  TrendingUp,
  MailCheck,
  MailOpen,
  MailX,
  X,
  FileText,
} from 'lucide-react';

const CrmEmail: React.FC = () => {
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [showCompose, setShowCompose] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<{ id: string; subject: string; from: string; to: string; date: string; body: string; isRead: boolean } | null>(null);

  const folders = [
    { id: 'inbox', name: 'Inbox', count: 24, icon: Mail },
    { id: 'sent', name: 'Sent', count: 156, icon: Send },
    { id: 'drafts', name: 'Drafts', count: 8, icon: FileText },
    { id: 'starred', name: 'Starred', count: 12, icon: Star },
    { id: 'archive', name: 'Archive', count: 342, icon: Archive },
    { id: 'trash', name: 'Trash', count: 45, icon: Trash2 },
  ];

  const emails = [
    {
      id: '1',
      from: 'john.doe@acmecorp.com',
      fromName: 'John Doe',
      subject: 'Proposal for TMS Integration',
      preview: 'Thank you for your interest in our TMS solution. I\'ve attached the proposal document...',
      time: '2 minutes ago',
      isRead: false,
      isStarred: true,
      priority: 'high',
      tags: ['proposal', 'tms'],
      attachments: 2,
    },
    {
      id: '2',
      from: 'sarah.johnson@techstart.com',
      fromName: 'Sarah Johnson',
      subject: 'Follow-up on Demo Meeting',
      preview: 'Hi, I wanted to follow up on our demo meeting from yesterday. The team was impressed...',
      time: '15 minutes ago',
      isRead: true,
      isStarred: false,
      priority: 'medium',
      tags: ['follow-up', 'demo'],
      attachments: 0,
    },
    {
      id: '3',
      from: 'mike.chen@globalogistics.com',
      fromName: 'Mike Chen',
      subject: 'Contract Renewal Discussion',
      preview: 'We need to discuss the contract renewal for next year. Can we schedule a call...',
      time: '1 hour ago',
      isRead: true,
      isStarred: true,
      priority: 'high',
      tags: ['contract', 'renewal'],
      attachments: 1,
    },
    {
      id: '4',
      from: 'emily.rodriguez@startupventures.com',
      fromName: 'Emily Rodriguez',
      subject: 'New Feature Request',
      preview: 'Our team would like to request a new feature for the reporting module...',
      time: '2 hours ago',
      isRead: false,
      isStarred: false,
      priority: 'low',
      tags: ['feature', 'request'],
      attachments: 0,
    },
    {
      id: '5',
      from: 'david.kim@megafreight.com',
      fromName: 'David Kim',
      subject: 'Implementation Timeline',
      preview: 'Could you provide an updated timeline for the implementation project?',
      time: '3 hours ago',
      isRead: true,
      isStarred: false,
      priority: 'medium',
      tags: ['timeline', 'implementation'],
      attachments: 0,
    },
  ];

  const emailStats = [
    { label: 'Total Emails', value: '1,247', icon: Mail, color: 'text-blue-600' },
    { label: 'Unread', value: '24', icon: MailOpen, color: 'text-orange-600' },
    { label: 'Sent Today', value: '156', icon: Send, color: 'text-green-600' },
    { label: 'Open Rate', value: '87.3%', icon: TrendingUp, color: 'text-purple-600' },
  ];

  const handleEmailSelect = (emailId: string) => {
    setSelectedEmails(prev =>
      prev.includes(emailId)
        ? prev.filter(id => id !== emailId)
        : [...prev, emailId]
    );
  };

  const handleSelectAll = () => {
    if (selectedEmails.length === emails.length) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(emails.map(email => email.id));
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900';
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        {/* Compose Button */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setShowCompose(true)}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Compose
          </button>
        </div>

        {/* Folders */}
        <div className="flex-1 overflow-y-auto">
          <nav className="p-2">
            {folders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => setSelectedFolder(folder.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                  selectedFolder === folder.id
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <folder.icon className="w-4 h-4" />
                  <span className="font-medium">{folder.name}</span>
                </div>
                <span className="text-sm bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                  {folder.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Email Stats */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Email Stats</h3>
          <div className="space-y-2">
            {emailStats.map((stat, index) => (
              <div key={stat.label} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  <span className="text-gray-600 dark:text-gray-400">{stat.label}</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">CRM Email</h1>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSelectAll}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <CheckCheck className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                  <Archive className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search emails..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-64"
                />
              </div>
              <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <Filter className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Email List */}
        <div className="flex-1 overflow-y-auto">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {emails.map((email) => (
              <motion.div
                key={email.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
                  selectedEmails.includes(email.id) ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                } ${!email.isRead ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}
                onClick={() => setSelectedEmail(email)}
              >
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={selectedEmails.includes(email.id)}
                    onChange={() => handleEmailSelect(email.id)}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <button className="mt-1 text-gray-400 hover:text-yellow-500">
                    {email.isStarred ? <Star className="w-4 h-4 fill-current" /> : <StarOff className="w-4 h-4" />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-sm font-medium ${!email.isRead ? 'text-gray-900 dark:text-white font-semibold' : 'text-gray-700 dark:text-gray-300'}`}>
                        {email.fromName}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{email.from}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(email.priority)}`}>
                        {email.priority}
                      </span>
                      {email.attachments > 0 && (
                        <Paperclip className="w-3 h-3 text-gray-400" />
                      )}
                    </div>
                    <h3 className={`text-sm mb-1 ${!email.isRead ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                      {email.subject}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {email.preview}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">{email.time}</span>
                      <div className="flex items-center gap-1">
                        {email.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Email Detail Modal */}
      <AnimatePresence>
        {selectedEmail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedEmail(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Email Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{selectedEmail.subject}</h2>
                  <button
                    onClick={() => setSelectedEmail(null)}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="font-medium text-gray-900 dark:text-white">{selectedEmail.fromName}</span>
                  <span className="text-gray-500 dark:text-gray-400">{selectedEmail.from}</span>
                  <span className="text-gray-500 dark:text-gray-400">{selectedEmail.time}</span>
                </div>
              </div>

              {/* Email Body */}
              <div className="p-6 flex-1 overflow-y-auto">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {selectedEmail.preview}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </div>
              </div>

              {/* Email Actions */}
              <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <Reply className="w-4 h-4" />
                    Reply
                  </button>
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
                    <Forward className="w-4 h-4" />
                    Forward
                  </button>
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
                    <Archive className="w-4 h-4" />
                    Archive
                  </button>
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
                    <Trash2 className="w-4 h-4" />
                    Delete
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

export default CrmEmail;
