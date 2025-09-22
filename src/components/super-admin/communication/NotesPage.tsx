import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Search,
  Settings,
  MoreVertical,
  Share,
  Download,
  Upload,
  Maximize2,
  Minimize2,
  Star,
  Tag,
  Lock,
  RefreshCw,
  X,
  Paperclip,
  Archive,
  List,
  Grid3X3,
} from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  isFavorite: boolean;
  isArchived: boolean;
  isShared: boolean;
  visibility: 'private' | 'shared' | 'public';
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  collaborators: Array<{
    id: string;
    name: string;
    avatar: string;
    role: 'viewer' | 'editor' | 'admin';
  }>;
  createdAt: Date;
  updatedAt: Date;
  lastEditedBy?: {
    id: string;
    name: string;
    avatar: string;
  };
  attachments: Array<{
    id: string;
    name: string;
    type: string;
    size: string;
    url: string;
  }>;
  wordCount: number;
  characterCount: number;
  readingTime: number; // minutes
}

interface NoteTemplate {
  id: string;
  name: string;
  description: string;
  content: string;
  category: string;
  isPublic: boolean;
  usageCount: number;
  createdAt: Date;
}

const NotesPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'notes' | 'templates' | 'shared' | 'archived'>('notes');
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTag, setFilterTag] = useState<string>('all');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [sortBy, setSortBy] = useState<'updated' | 'created' | 'title' | 'author'>('updated');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [newNote, setNewNote] = useState<Partial<Note>>({
    title: '',
    content: '',
    tags: [],
    isFavorite: false,
    isArchived: false,
    isShared: false,
    visibility: 'private',
    author: {
      id: 'me',
      name: 'You',
      avatar: 'YO'
    },
    collaborators: [],
    attachments: [],
    wordCount: 0,
    characterCount: 0,
    readingTime: 0
  });

  // Mock data
  const notes: Note[] = [
    {
      id: '1',
      title: 'Meeting Notes - Q4 Planning',
      content: `# Q4 Planning Meeting

## Attendees
- John Doe (Sales Manager)
- Sarah Wilson (CTO)
- Mike Johnson (Marketing Director)

## Agenda Items

### 1. Revenue Targets
- Q4 goal: $2.5M
- Current pipeline: $1.8M
- Gap to close: $700K

### 2. Product Roadmap
- AI integration features
- Mobile app improvements
- API enhancements

### 3. Marketing Initiatives
- Holiday campaign
- Customer testimonials
- Case studies

## Action Items
- [ ] John to finalize sales projections by Friday
- [ ] Sarah to provide technical feasibility report
- [ ] Mike to create marketing timeline

## Next Meeting
**Date:** December 15, 2024
**Time:** 2:00 PM
**Location:** Conference Room A`,
      tags: ['meeting', 'q4', 'planning', 'revenue'],
      isFavorite: true,
      isArchived: false,
      isShared: true,
      visibility: 'shared',
      author: {
        id: 'me',
        name: 'You',
        avatar: 'YO'
      },
      collaborators: [
        {
          id: 'john',
          name: 'John Doe',
          avatar: 'JD',
          role: 'editor'
        },
        {
          id: 'sarah',
          name: 'Sarah Wilson',
          avatar: 'SW',
          role: 'viewer'
        }
      ],
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      lastEditedBy: {
        id: 'john',
        name: 'John Doe',
        avatar: 'JD'
      },
      attachments: [
        {
          id: 'att1',
          name: 'Q4_Budget_Projections.xlsx',
          type: 'xlsx',
          size: '1.2 MB',
          url: '#'
        }
      ],
      wordCount: 156,
      characterCount: 892,
      readingTime: 1
    },
    {
      id: '2',
      title: 'Product Ideas & Brainstorming',
      content: `# Product Innovation Ideas

## Mobile App Features
- Offline mode for drivers
- Real-time GPS tracking
- Push notifications for updates
- Biometric authentication

## AI Integration
- Predictive maintenance alerts
- Route optimization
- Customer service chatbot
- Fraud detection

## User Experience Improvements
- Dark mode theme
- Customizable dashboard
- Advanced filtering options
- Export functionality

## Technical Considerations
- Performance optimization
- Security enhancements
- Scalability planning
- API rate limiting`,
      tags: ['product', 'innovation', 'ideas', 'mobile', 'ai'],
      isFavorite: false,
      isArchived: false,
      isShared: false,
      visibility: 'private',
      author: {
        id: 'me',
        name: 'You',
        avatar: 'YO'
      },
      collaborators: [],
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      attachments: [],
      wordCount: 89,
      characterCount: 512,
      readingTime: 1
    },
    {
      id: '3',
      title: 'Customer Feedback Summary',
      content: `# Customer Feedback Analysis

## Overall Satisfaction
- **Rating:** 4.2/5.0
- **Response Rate:** 78%
- **Total Responses:** 342

## Key Feedback Themes

### Positive Feedback
- Easy to use interface
- Fast response times
- Excellent customer support
- Reliable service

### Areas for Improvement
- Mobile app performance
- Documentation quality
- Feature requests
- Pricing transparency

## Action Items
1. Optimize mobile app loading times
2. Update user documentation
3. Prioritize feature requests
4. Review pricing structure

## Next Steps
- Schedule customer interviews
- Create improvement roadmap
- Implement quick wins
- Plan major updates`,
      tags: ['feedback', 'customers', 'satisfaction', 'improvements'],
      isFavorite: true,
      isArchived: false,
      isShared: true,
      visibility: 'shared',
      author: {
        id: 'me',
        name: 'You',
        avatar: 'YO'
      },
      collaborators: [
        {
          id: 'mike',
          name: 'Mike Johnson',
          avatar: 'MJ',
          role: 'editor'
        }
      ],
      createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      attachments: [
        {
          id: 'att2',
          name: 'Customer_Survey_Results.pdf',
          type: 'pdf',
          size: '3.4 MB',
          url: '#'
        }
      ],
      wordCount: 134,
      characterCount: 756,
      readingTime: 1
    }
  ];

  const templates: NoteTemplate[] = [
    {
      id: 't1',
      name: 'Meeting Notes',
      description: 'Standard template for meeting notes and minutes',
      content: `# Meeting Notes

## Date: [Date]
## Attendees: [List attendees]

## Agenda
1. [Item 1]
2. [Item 2]
3. [Item 3]

## Discussion Points
- [Point 1]
- [Point 2]

## Action Items
- [ ] [Action 1] - [Owner] - [Due Date]
- [ ] [Action 2] - [Owner] - [Due Date]

## Next Meeting
**Date:** [Date]
**Time:** [Time]
**Location:** [Location]`,
      category: 'Business',
      isPublic: true,
      usageCount: 45,
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    },
    {
      id: 't2',
      name: 'Project Planning',
      description: 'Template for project planning and task breakdown',
      content: `# Project: [Project Name]

## Overview
[Brief project description]

## Objectives
- [Objective 1]
- [Objective 2]
- [Objective 3]

## Timeline
- **Start Date:** [Date]
- **End Date:** [Date]
- **Milestones:**
  - [Milestone 1] - [Date]
  - [Milestone 2] - [Date]

## Resources
- **Team Members:** [List]
- **Budget:** [Amount]
- **Tools:** [List]

## Risks & Mitigation
- [Risk 1]: [Mitigation strategy]
- [Risk 2]: [Mitigation strategy]`,
      category: 'Project Management',
      isPublic: true,
      usageCount: 23,
      createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000)
    }
  ];

  const currentNote = notes.find(n => n.id === selectedNote);
  const allTags = Array.from(new Set(notes.flatMap(note => note.tags)));

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

  const handleCreateNote = () => {
    console.log('Creating note:', newNote);
    setShowCreateModal(false);
    setNewNote({
      title: '',
      content: '',
      tags: [],
      isFavorite: false,
      isArchived: false,
      isShared: false,
      visibility: 'private',
      author: {
        id: 'me',
        name: 'You',
        avatar: 'YO'
      },
      collaborators: [],
      attachments: [],
      wordCount: 0,
      characterCount: 0,
      readingTime: 0
    });
  };

  const toggleFavorite = (noteId: string) => {
    console.log('Toggle favorite for note:', noteId);
  };


  const shareNote = (noteId: string) => {
    console.log('Share note:', noteId);
  };

  const filteredNotes = notes
    .filter(note => {
      const matchesSearch = searchQuery === '' || 
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesTab = 
        (selectedTab === 'notes' && !note.isArchived) ||
        (selectedTab === 'shared' && note.isShared) ||
        (selectedTab === 'archived' && note.isArchived);
      
      const matchesTag = filterTag === 'all' || note.tags.includes(filterTag);
      
      return matchesSearch && matchesTab && matchesTag;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'created':
          comparison = a.createdAt.getTime() - b.createdAt.getTime();
          break;
        case 'author':
          comparison = a.author.name.localeCompare(b.author.name);
          break;
        case 'updated':
        default:
          comparison = a.updatedAt.getTime() - b.updatedAt.getTime();
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

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
                  <FileText className="w-6 h-6 text-orange-500" />
                  <span>Notes</span>
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Note-taking & collaboration</p>
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
              className="w-full flex items-center justify-center space-x-2 p-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors mb-2"
            >
              <Plus className="w-4 h-4" />
              <span className="font-medium">New Note</span>
            </button>
            <button className="w-full flex items-center justify-center space-x-2 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              <Upload className="w-4 h-4" />
              <span className="font-medium">Import Notes</span>
            </button>
          </div>
        )}

        {/* Navigation Tabs */}
        {!sidebarCollapsed && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="space-y-1">
              {[
                { id: 'notes', label: 'My Notes', icon: FileText, count: notes.filter(n => !n.isArchived).length },
                { id: 'templates', label: 'Templates', icon: Tag, count: templates.length },
                { id: 'shared', label: 'Shared', icon: Share, count: notes.filter(n => n.isShared).length },
                { id: 'archived', label: 'Archived', icon: Archive, count: notes.filter(n => n.isArchived).length },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id as 'notes' | 'templates' | 'shared' | 'archived')}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                    selectedTab === tab.id
                      ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </div>
                  <span className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tags Filter */}
        {!sidebarCollapsed && selectedTab === 'notes' && allTags.length > 0 && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Tags</h3>
            <div className="space-y-2">
              <button
                onClick={() => setFilterTag('all')}
                className={`w-full text-left p-2 rounded-lg transition-colors ${
                  filterTag === 'all'
                    ? 'bg-orange-50 dark:bg-orange-900/20'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <span className="text-sm text-gray-700 dark:text-gray-300">All Tags</span>
              </button>
              {allTags.slice(0, 10).map((tag) => (
                <button
                  key={tag}
                  onClick={() => setFilterTag(tag)}
                  className={`w-full text-left p-2 rounded-lg transition-colors ${
                    filterTag === tag
                      ? 'bg-orange-50 dark:bg-orange-900/20'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="text-sm text-gray-700 dark:text-gray-300">#{tag}</span>
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
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Sidebar Footer */}
        {!sidebarCollapsed && (
          <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Notes</p>
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
        {/* Notes List */}
        <div className="w-1/2 border-r border-gray-200 dark:border-gray-700 flex flex-col">
          {/* Content Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                  {selectedTab}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedTab === 'notes' && `${filteredNotes.length} notes`}
                  {selectedTab === 'templates' && `${templates.length} templates`}
                  {selectedTab === 'shared' && `${notes.filter(n => n.isShared).length} shared notes`}
                  {selectedTab === 'archived' && `${notes.filter(n => n.isArchived).length} archived notes`}
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                {selectedTab === 'notes' && (
                  <>
                    <select
                      value={`${sortBy}-${sortOrder}`}
                      onChange={(e) => {
                        const [sort, order] = e.target.value.split('-');
                        setSortBy(sort as 'created' | 'updated' | 'title');
                        setSortOrder(order as 'asc' | 'desc');
                      }}
                      className="px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                    >
                      <option value="updated-desc">Recently Updated</option>
                      <option value="updated-asc">Oldest Updated</option>
                      <option value="created-desc">Recently Created</option>
                      <option value="created-asc">Oldest Created</option>
                      <option value="title-asc">Title A-Z</option>
                      <option value="title-desc">Title Z-A</option>
                    </select>
                    <button
                      onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      {viewMode === 'list' ? <Grid3X3 className="w-4 h-4" /> : <List className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => setShowCreateModal(true)}
                      className="flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>New Note</span>
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
            {selectedTab === 'notes' && (
              <div className="space-y-1">
                {filteredNotes.map((note) => (
                  <div
                    key={note.id}
                    onClick={() => setSelectedNote(note.id)}
                    className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer transition-colors ${
                      selectedNote === note.id
                        ? 'bg-orange-50 dark:bg-orange-900/20 border-l-4 border-l-orange-500'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-1">{note.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                          {note.content.replace(/#+\s*/g, '').substring(0, 100)}...
                        </p>
                      </div>
                      <div className="flex items-center space-x-1">
                        {note.isFavorite && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                        {note.isShared && (
                          <Share className="w-4 h-4 text-blue-500" />
                        )}
                        {note.visibility === 'private' && (
                          <Lock className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-4">
                        <span>{note.wordCount} words</span>
                        <span>{note.readingTime} min read</span>
                        <span>{formatDate(note.updatedAt)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {note.collaborators.length > 0 && (
                          <div className="flex -space-x-1">
                            {note.collaborators.slice(0, 2).map((collaborator) => (
                              <div
                                key={collaborator.id}
                                className="w-5 h-5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-medium border border-white dark:border-gray-800"
                              >
                                {collaborator.avatar}
                              </div>
                            ))}
                            {note.collaborators.length > 2 && (
                              <div className="w-5 h-5 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 text-xs font-medium border border-white dark:border-gray-800">
                                +{note.collaborators.length - 2}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {note.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {note.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                        {note.tags.length > 3 && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            +{note.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {selectedTab === 'templates' && (
              <div className="space-y-1">
                {templates.map((template) => (
                  <div key={template.id} className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-1">{template.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{template.description}</p>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                        {template.category}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>{template.usageCount} uses</span>
                      <span>Created: {formatDate(template.createdAt)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Note Content */}
        <div className="w-1/2 flex flex-col">
          {currentNote ? (
            <>
              {/* Note Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {currentNote.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>Created: {formatDate(currentNote.createdAt)}</span>
                      <span>Updated: {formatDate(currentNote.updatedAt)}</span>
                      <span>{currentNote.wordCount} words</span>
                      <span>{currentNote.readingTime} min read</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleFavorite(currentNote.id)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      {currentNote.isFavorite ? 
                        <Star className="w-5 h-5 text-yellow-500 fill-current" /> : 
                        <Star className="w-5 h-5 text-gray-400" />
                      }
                    </button>
                    <button
                      onClick={() => shareNote(currentNote.id)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <Share className="w-5 h-5 text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {currentNote.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      currentNote.visibility === 'private' ? 'bg-gray-100 text-gray-800' :
                      currentNote.visibility === 'shared' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {currentNote.visibility}
                    </span>
                    {currentNote.isShared && (
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                        {currentNote.collaborators.length} collaborators
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Note Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="prose dark:prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-gray-900 dark:text-white">
                    {currentNote.content}
                  </div>
                </div>
                
                {currentNote.attachments.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Attachments</h4>
                    <div className="space-y-2">
                      {currentNote.attachments.map((attachment) => (
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

                {currentNote.collaborators.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Collaborators</h4>
                    <div className="space-y-2">
                      {currentNote.collaborators.map((collaborator) => (
                        <div key={collaborator.id} className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                              {collaborator.avatar}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{collaborator.name}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{collaborator.role}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* No Note Selected */
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Select a Note
                </h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md">
                  Choose a note from the list to view its content, or create a new note to get started with your ideas and thoughts.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Note Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create New Note</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                <input
                  type="text"
                  value={newNote.title || ''}
                  onChange={(e) => setNewNote(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Note title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content</label>
                <textarea
                  value={newNote.content || ''}
                  onChange={(e) => setNewNote(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  rows={12}
                  placeholder="Start writing your note..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags</label>
                <input
                  type="text"
                  value={newNote.tags?.join(', ') || ''}
                  onChange={(e) => setNewNote(prev => ({ ...prev, tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean) }))}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter tags separated by commas"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Visibility</label>
                  <select
                    value={newNote.visibility || 'private'}
                    onChange={(e) => setNewNote(prev => ({ ...prev, visibility: e.target.value as 'private' | 'shared' }))}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="private">Private</option>
                    <option value="shared">Shared</option>
                    <option value="public">Public</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={newNote.isFavorite || false}
                      onChange={(e) => setNewNote(prev => ({ ...prev, isFavorite: e.target.checked }))}
                      className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Favorite</span>
                  </label>
                </div>
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
                  onClick={handleCreateNote}
                  className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Create Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesPage;
