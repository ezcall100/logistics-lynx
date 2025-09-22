import React, { useState, useRef } from 'react';
import {
  Mail,
  Send,
  Reply,
  ReplyAll,
  Forward,
  Archive,
  Trash2,
  Star,
  Flag,
  MoreVertical,
  Search,
  Plus,
  Paperclip,
  Download,
  Settings,
  Maximize2,
  Minimize2,
  X,
  Edit,
  AlertTriangle,
} from 'lucide-react';

interface Email {
  id: string;
  subject: string;
  sender: {
    name: string;
    email: string;
    avatar: string;
  };
  recipients: Array<{
    name: string;
    email: string;
    type: 'to' | 'cc' | 'bcc';
  }>;
  content: string;
  timestamp: Date;
  isRead: boolean;
  isStarred: boolean;
  isFlagged: boolean;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  attachments?: Array<{
    id: string;
    name: string;
    type: string;
    size: string;
    url: string;
  }>;
  tags: string[];
  folder: 'inbox' | 'sent' | 'drafts' | 'trash' | 'spam' | 'archive';
  replyTo?: string;
  threadId?: string;
}

interface EmailFolder {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  count: number;
  unreadCount: number;
  color: string;
}

interface ComposeEmail {
  to: string;
  cc: string;
  bcc: string;
  subject: string;
  content: string;
  attachments: File[];
  priority: 'low' | 'normal' | 'high' | 'urgent';
  isDraft: boolean;
}

const EmailCenterPage: React.FC = () => {
  const [selectedFolder, setSelectedFolder] = useState<string>('inbox');
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [showCompose, setShowCompose] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [composeEmail, setComposeEmail] = useState<ComposeEmail>({
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    content: '',
    attachments: [],
    priority: 'normal',
    isDraft: false,
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock email folders
  const folders: EmailFolder[] = [
    { id: 'inbox', name: 'Inbox', icon: Mail, count: 156, unreadCount: 23, color: 'text-blue-500' },
    { id: 'sent', name: 'Sent', icon: Send, count: 89, unreadCount: 0, color: 'text-green-500' },
    { id: 'drafts', name: 'Drafts', icon: Edit, count: 12, unreadCount: 0, color: 'text-yellow-500' },
    { id: 'trash', name: 'Trash', icon: Trash2, count: 45, unreadCount: 0, color: 'text-red-500' },
    { id: 'spam', name: 'Spam', icon: AlertTriangle, count: 8, unreadCount: 8, color: 'text-orange-500' },
    { id: 'archive', name: 'Archive', icon: Archive, count: 234, unreadCount: 0, color: 'text-purple-500' },
  ];

  // Mock emails
  const emails: Email[] = [
    {
      id: '1',
      subject: 'Q4 Sales Report - Action Required',
      sender: {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@company.com',
        avatar: 'SJ'
      },
      recipients: [
        { name: 'You', email: 'you@company.com', type: 'to' }
      ],
      content: 'Hi there,\n\nI hope this email finds you well. I\'ve attached the Q4 sales report that requires your review and approval before we proceed with the final presentation to the board.\n\nKey highlights:\n• Revenue increased by 15% compared to Q3\n• New customer acquisition up by 23%\n• Regional performance varies significantly\n\nPlease review and provide your feedback by Friday.\n\nBest regards,\nSarah',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      isRead: false,
      isStarred: true,
      isFlagged: true,
      priority: 'high',
      attachments: [
        { id: 'a1', name: 'Q4_Sales_Report.pdf', type: 'pdf', size: '2.4 MB', url: '#' },
        { id: 'a2', name: 'Sales_Analysis.xlsx', type: 'xlsx', size: '1.8 MB', url: '#' }
      ],
      tags: ['sales', 'report', 'urgent'],
      folder: 'inbox',
      threadId: 'thread-1'
    },
    {
      id: '2',
      subject: 'Meeting Reminder: Client Presentation Tomorrow',
      sender: {
        name: 'Mike Chen',
        email: 'mike.chen@company.com',
        avatar: 'MC'
      },
      recipients: [
        { name: 'You', email: 'you@company.com', type: 'to' }
      ],
      content: 'Hello,\n\nThis is a friendly reminder about tomorrow\'s client presentation scheduled for 2:00 PM.\n\nAgenda:\n• Project overview\n• Timeline and deliverables\n• Budget discussion\n• Next steps\n\nPlease ensure you have all materials ready and arrive 15 minutes early for setup.\n\nThanks,\nMike',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: true,
      isStarred: false,
      isFlagged: true,
      priority: 'normal',
      tags: ['meeting', 'reminder', 'client'],
      folder: 'inbox',
      threadId: 'thread-2'
    },
    {
      id: '3',
      subject: 'Welcome to Our Team!',
      sender: {
        name: 'HR Department',
        email: 'hr@company.com',
        avatar: 'HR'
      },
      recipients: [
        { name: 'You', email: 'you@company.com', type: 'to' }
      ],
      content: 'Welcome to the team!\n\nWe\'re excited to have you join us. Please find attached your onboarding materials and employee handbook.\n\nNext steps:\n1. Complete the online training modules\n2. Schedule your equipment pickup\n3. Attend the orientation session on Monday\n\nIf you have any questions, don\'t hesitate to reach out.\n\nWelcome aboard!\nHR Team',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      isRead: true,
      isStarred: false,
      isFlagged: false,
      priority: 'low',
      attachments: [
        { id: 'a3', name: 'Employee_Handbook.pdf', type: 'pdf', size: '5.2 MB', url: '#' }
      ],
      tags: ['onboarding', 'welcome'],
      folder: 'inbox',
      threadId: 'thread-3'
    }
  ];

  const currentEmail = emails.find(e => e.id === selectedEmail);
  const folderEmails = emails.filter(e => e.folder === selectedFolder);


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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'normal': return 'bg-blue-500';
      case 'low': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const handleCompose = () => {
    setShowCompose(true);
  };

  const handleSendEmail = () => {
    // Here you would send the email
    console.log('Sending email:', composeEmail);
    setShowCompose(false);
    setComposeEmail({
      to: '',
      cc: '',
      bcc: '',
      subject: '',
      content: '',
      attachments: [],
      priority: 'normal',
      isDraft: false,
    });
  };

  const handleSaveDraft = () => {
    // Here you would save as draft
    console.log('Saving draft:', composeEmail);
    setComposeEmail(prev => ({ ...prev, isDraft: true }));
  };

  const handleAttachment = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setComposeEmail(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const toggleStar = (emailId: string) => {
    // Here you would update the email star status
    console.log('Toggle star for email:', emailId);
  };

  const toggleFlag = (emailId: string) => {
    // Here you would update the email flag status
    console.log('Toggle flag for email:', emailId);
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
                  <Mail className="w-6 h-6 text-blue-500" />
                  <span>Email Center</span>
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Professional email management</p>
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

        {/* Compose Button */}
        {!sidebarCollapsed && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={handleCompose}
              className="w-full flex items-center justify-center space-x-2 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="font-medium">Compose</span>
            </button>
          </div>
        )}

        {/* Folders */}
        <div className="flex-1 overflow-y-auto">
          {sidebarCollapsed ? (
            <div className="space-y-1">
              {folders.map((folder) => (
                <div
                  key={folder.id}
                  onClick={() => setSelectedFolder(folder.id)}
                  className={`p-4 cursor-pointer transition-colors ${
                    selectedFolder === folder.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-500'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <div className="relative">
                      <folder.icon className={`w-6 h-6 ${folder.color}`} />
                      {folder.unreadCount > 0 && (
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                          {folder.unreadCount}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              {folders.map((folder) => (
                <div
                  key={folder.id}
                  onClick={() => setSelectedFolder(folder.id)}
                  className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer transition-colors ${
                    selectedFolder === folder.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-500'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <folder.icon className={`w-5 h-5 ${folder.color}`} />
                      <span className="font-medium text-gray-900 dark:text-white">{folder.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {folder.unreadCount > 0 && (
                        <div className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                          {folder.unreadCount}
                        </div>
                      )}
                      <span className="text-sm text-gray-500 dark:text-gray-400">{folder.count}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar Footer */}
        {!sidebarCollapsed && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Email System</p>
                  <p className="text-xs text-green-600">Connected</p>
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
        {/* Email List */}
        <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 flex flex-col">
          {/* Search and Filters */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search emails..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex space-x-2">
              {['all', 'urgent', 'high', 'normal', 'low'].map((priority) => (
                <button
                  key={priority}
                  onClick={() => setFilterPriority(priority)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    filterPriority === priority
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Email List */}
          <div className="flex-1 overflow-y-auto">
            {folderEmails
              .filter(email => 
                (searchQuery === '' || 
                  email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  email.sender.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  email.sender.email.toLowerCase().includes(searchQuery.toLowerCase())
                ) &&
                (filterPriority === 'all' || email.priority === filterPriority)
              )
              .map((email) => (
                <div
                  key={email.id}
                  onClick={() => setSelectedEmail(email.id)}
                  className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer transition-colors ${
                    selectedEmail === email.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-500'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  } ${!email.isRead ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''}`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {email.sender.avatar}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <h3 className={`text-sm font-medium truncate ${
                            !email.isRead ? 'text-gray-900 dark:text-white font-semibold' : 'text-gray-900 dark:text-white'
                          }`}>
                            {email.sender.name}
                          </h3>
                          <div className={`w-2 h-2 rounded-full ${getPriorityColor(email.priority)}`}></div>
                        </div>
                        <div className="flex items-center space-x-1">
                          {email.isStarred && <Star className="w-3 h-3 text-yellow-500 fill-current" />}
                          {email.isFlagged && <Flag className="w-3 h-3 text-red-500 fill-current" />}
                          {email.attachments && email.attachments.length > 0 && (
                            <Paperclip className="w-3 h-3 text-gray-400" />
                          )}
                        </div>
                      </div>
                      
                      <p className={`text-sm truncate mb-1 ${
                        !email.isRead ? 'font-medium text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'
                      }`}>
                        {email.subject}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(email.timestamp)}
                        </span>
                        {email.tags.length > 0 && (
                          <div className="flex space-x-1">
                            {email.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Email Content */}
        <div className="flex-1 flex flex-col">
          {currentEmail ? (
            <>
              {/* Email Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {currentEmail.subject}
                    </h2>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-600 rounded-full flex items-center justify-center text-white text-lg font-medium">
                          {currentEmail.sender.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{currentEmail.sender.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{currentEmail.sender.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${getPriorityColor(currentEmail.priority)}`}></div>
                        <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                          {currentEmail.priority} priority
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleStar(currentEmail.id)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      {currentEmail.isStarred ? 
                        <Star className="w-5 h-5 text-yellow-500 fill-current" /> : 
                        <Star className="w-5 h-5 text-gray-400" />
                      }
                    </button>
                    <button
                      onClick={() => toggleFlag(currentEmail.id)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      {currentEmail.isFlagged ? 
                        <Flag className="w-5 h-5 text-red-500 fill-current" /> : 
                        <Flag className="w-5 h-5 text-gray-400" />
                      }
                    </button>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                      <Reply className="w-4 h-4" />
                      <span>Reply</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                      <ReplyAll className="w-4 h-4" />
                      <span>Reply All</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                      <Forward className="w-4 h-4" />
                      <span>Forward</span>
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(currentEmail.timestamp)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Email Body */}
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="prose dark:prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-gray-900 dark:text-white">
                    {currentEmail.content}
                  </div>
                </div>
                
                {currentEmail.attachments && currentEmail.attachments.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Attachments</h3>
                    <div className="space-y-2">
                      {currentEmail.attachments.map((attachment) => (
                        <div key={attachment.id} className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Paperclip className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{attachment.name}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{attachment.size}</p>
                            </div>
                          </div>
                          <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
                            <Download className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* No Email Selected */
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Select an Email
                </h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md">
                  Choose an email from the list to view its contents, or compose a new message to get started.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Compose Modal */}
      {showCompose && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-4xl h-3/4 flex flex-col">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Compose Email</h3>
                <button
                  onClick={() => setShowCompose(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">To</label>
                    <input
                      type="email"
                      value={composeEmail.to}
                      onChange={(e) => setComposeEmail(prev => ({ ...prev, to: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="recipient@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CC</label>
                    <input
                      type="email"
                      value={composeEmail.cc}
                      onChange={(e) => setComposeEmail(prev => ({ ...prev, cc: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="cc@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">BCC</label>
                    <input
                      type="email"
                      value={composeEmail.bcc}
                      onChange={(e) => setComposeEmail(prev => ({ ...prev, bcc: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="bcc@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                  <input
                    type="text"
                    value={composeEmail.subject}
                    onChange={(e) => setComposeEmail(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Email subject"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                  <textarea
                    value={composeEmail.content}
                    onChange={(e) => setComposeEmail(prev => ({ ...prev, content: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={12}
                    placeholder="Type your message here..."
                  />
                </div>
                
                {composeEmail.attachments.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Attachments</label>
                    <div className="space-y-2">
                      {composeEmail.attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                          <span className="text-sm text-gray-700 dark:text-gray-300">{file.name}</span>
                          <button
                            onClick={() => setComposeEmail(prev => ({
                              ...prev,
                              attachments: prev.attachments.filter((_, i) => i !== index)
                            }))}
                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                          >
                            <X className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleAttachment}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <Paperclip className="w-4 h-4 text-gray-400" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <select
                    value={composeEmail.priority}
                    onChange={(e) => setComposeEmail(prev => ({ ...prev, priority: e.target.value as 'low' | 'normal' | 'high' }))}
                    className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">Low Priority</option>
                    <option value="normal">Normal Priority</option>
                    <option value="high">High Priority</option>
                    <option value="urgent">Urgent Priority</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleSaveDraft}
                    className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Save Draft
                  </button>
                  <button
                    onClick={handleSendEmail}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailCenterPage;
