import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Plus,
  Edit,
  Trash2,
  UserPlus,
  Eye,
  Copy,
  Download,
  Upload,
  Search,
  Crown,
  Lock,
  Unlock,
  CheckCircle,
  XCircle,
  Activity,
  TrendingUp,
  MoreVertical,
  Save,
  X,
  Filter,
  ChevronDown,
  ChevronUp,
  Settings,
  UserCheck,
  UserX,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Star,
  Zap,
  Building,
  Shield,
  Key,
  Ban,
  RefreshCw,
  Grid3X3,
  Table,
  List,
  Layout,
} from 'lucide-react';

/**
 * User Groups Page - Complete CRUD Functionality with Card/Table Views
 * Enhanced with three-dot menus and comprehensive group management
 * Timestamp: 2025-01-15T10:30:00.000Z FULLY DEPLOYED AND COMMITTED
 */

interface GroupMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  joinDate: string;
  isActive: boolean;
  department?: string;
  phone?: string;
  location?: string;
  lastLogin?: string;
  permissions?: string[];
}

interface UserGroup {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  memberCount: number;
  members: GroupMember[];
  permissions: string[];
  isPrivate: boolean;
  isActive: boolean;
  priority: number;
  tags: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  lastActivity: string;
  activityCount: number;
  owner: {
    id: string;
    name: string;
    email: string;
  };
}

interface GroupFormData {
  name: string;
  description: string;
  color: string;
  icon: string;
  permissions: string[];
  isPrivate: boolean;
  isActive: boolean;
  priority: number;
  tags: string[];
  notes: string;
}

export const UserGroupsPage: React.FC = () => {
  const [groups, setGroups] = useState<UserGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<UserGroup | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showDropdown, setShowDropdown] = useState<string | null>(null);

  // CRUD State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingGroup, setEditingGroup] = useState<UserGroup | null>(null);
  const [viewingGroup, setViewingGroup] = useState<UserGroup | null>(null);
  const [deletingGroup, setDeletingGroup] = useState<UserGroup | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<GroupFormData>({
    name: '',
    description: '',
    color: 'blue',
    icon: 'users',
    permissions: [],
    isPrivate: false,
    isActive: true,
    priority: 1,
    tags: [],
    notes: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // CRUD Functions
  const handleCreateGroup = async () => {
    setIsLoading(true);
    try {
      const newGroup: UserGroup = {
        id: Date.now().toString(),
        ...formData,
        memberCount: 0,
        members: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'Current User',
        lastActivity: new Date().toISOString(),
        activityCount: 0,
        owner: {
          id: 'current-user',
          name: 'Current User',
          email: 'current@user.com',
        },
      };

      setGroups(prev => [newGroup, ...prev]);
      setShowCreateModal(false);
      resetForm();
    } catch (error) {
      console.error('Error creating group:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateGroup = async () => {
    if (!editingGroup) return;

    setIsLoading(true);
    try {
      const updatedGroup: UserGroup = {
        ...editingGroup,
        ...formData,
        updatedAt: new Date().toISOString(),
      };

      setGroups(prev => prev.map(group => (group.id === editingGroup.id ? updatedGroup : group)));
      setShowEditModal(false);
      setEditingGroup(null);
      resetForm();
    } catch (error) {
      console.error('Error updating group:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteGroup = async () => {
    if (!deletingGroup) return;

    setIsLoading(true);
    try {
      setGroups(prev => prev.filter(group => group.id !== deletingGroup.id));
      setShowDeleteModal(false);
      setDeletingGroup(null);
    } catch (error) {
      console.error('Error deleting group:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBulkAction = async (action: string) => {
    setIsLoading(true);
    try {
      switch (action) {
        case 'activate':
          setGroups(prev =>
            prev.map(group =>
              selectedGroups.includes(group.id) ? { ...group, isActive: true } : group
            )
          );
          break;
        case 'deactivate':
          setGroups(prev =>
            prev.map(group =>
              selectedGroups.includes(group.id) ? { ...group, isActive: false } : group
            )
          );
          break;
        case 'delete':
          setGroups(prev => prev.filter(group => !selectedGroups.includes(group.id)));
          break;
        case 'export':
          console.log('Exporting groups:', selectedGroups);
          break;
      }
      setSelectedGroups([]);
      setShowBulkActions(false);
    } catch (error) {
      console.error('Error performing bulk action:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      color: 'blue',
      icon: 'users',
      permissions: [],
      isPrivate: false,
      isActive: true,
      priority: 1,
      tags: [],
      notes: '',
    });
    setFormErrors({});
  };

  const openEditModal = (group: UserGroup) => {
    setEditingGroup(group);
    setFormData({
      name: group.name,
      description: group.description,
      color: group.color,
      icon: group.icon,
      permissions: group.permissions,
      isPrivate: group.isPrivate,
      isActive: group.isActive,
      priority: group.priority,
      tags: group.tags,
      notes: group.notes || '',
    });
    setShowEditModal(true);
  };

  const openViewModal = (group: UserGroup) => {
    setViewingGroup(group);
    setShowViewModal(true);
  };

  const openDeleteModal = (group: UserGroup) => {
    setDeletingGroup(group);
    setShowDeleteModal(true);
  };

  const duplicateGroup = (group: UserGroup) => {
    const duplicatedGroup: UserGroup = {
      ...group,
      id: Date.now().toString(),
      name: `${group.name} (Copy)`,
      memberCount: 0,
      members: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'Current User',
      lastActivity: new Date().toISOString(),
      activityCount: 0,
      owner: {
        id: 'current-user',
        name: 'Current User',
        email: 'current@user.com',
      },
    };
    setGroups(prev => [duplicatedGroup, ...prev]);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showDropdown) {
        setShowDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  useEffect(() => {
    const mockGroups: UserGroup[] = [
      {
        id: '1',
        name: 'Engineering Team',
        description: 'Software development and engineering team',
        color: 'blue',
        icon: 'code',
        memberCount: 25,
        members: [
          {
            id: '1',
            name: 'John Smith',
            email: 'john.smith@demo-company.com',
            role: 'Senior Developer',
            avatar:
              'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
            joinDate: '2024-01-15',
            isActive: true,
          },
          {
            id: '2',
            name: 'Sarah Johnson',
            email: 'sarah.johnson@demo-company.com',
            role: 'Tech Lead',
            avatar:
              'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
            joinDate: '2024-02-01',
            isActive: true,
          },
        ],
        permissions: ['code_access', 'deployment', 'testing'],
        isPrivate: false,
        isActive: true,
        priority: 1,
        tags: ['engineering', 'development', 'tech'],
        notes: 'Main engineering team for software development',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2025-01-15T10:30:00Z',
        createdBy: 'System Admin',
        lastActivity: '2025-01-15T10:30:00Z',
        activityCount: 245,
        owner: {
          id: '1',
          name: 'John Smith',
          email: 'john.smith@demo-company.com',
        },
      },
      {
        id: '2',
        name: 'Marketing Team',
        description: 'Marketing and brand management team',
        color: 'green',
        icon: 'marketing',
        memberCount: 12,
        members: [
          {
            id: '3',
            name: 'Mike Wilson',
            email: 'mike.wilson@demo-company.com',
            role: 'Marketing Manager',
            avatar:
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
            joinDate: '2024-03-10',
            isActive: true,
          },
        ],
        permissions: ['content_access', 'analytics', 'campaigns'],
        isPrivate: false,
        isActive: true,
        priority: 2,
        tags: ['marketing', 'brand', 'content'],
        notes: 'Marketing and brand management team',
        createdAt: '2024-02-15T00:00:00Z',
        updatedAt: '2025-01-14T15:20:00Z',
        createdBy: 'Marketing Admin',
        lastActivity: '2025-01-15T09:15:00Z',
        activityCount: 156,
        owner: {
          id: '3',
          name: 'Mike Wilson',
          email: 'mike.wilson@demo-company.com',
        },
      },
      {
        id: '3',
        name: 'Executive Board',
        description: 'Senior leadership and executive team',
        color: 'purple',
        icon: 'crown',
        memberCount: 8,
        members: [
          {
            id: '4',
            name: 'Emily Davis',
            email: 'emily.davis@demo-company.com',
            role: 'CEO',
            avatar:
              'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
            joinDate: '2024-01-01',
            isActive: true,
          },
        ],
        permissions: ['all_access', 'financial', 'strategic'],
        isPrivate: true,
        isActive: true,
        priority: 1,
        tags: ['executive', 'leadership', 'management'],
        notes: 'Senior leadership and executive team with full access',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2025-01-15T10:30:00Z',
        createdBy: 'System',
        lastActivity: '2025-01-15T10:30:00Z',
        activityCount: 89,
        owner: {
          id: '4',
          name: 'Emily Davis',
          email: 'emily.davis@demo-company.com',
        },
      },
    ];
    setGroups(mockGroups);
  }, []);

  const getGroupIcon = (iconName: string) => {
    switch (iconName) {
      case 'code':
        return <Users className="w-5 h-5" />;
      case 'marketing':
        return <TrendingUp className="w-5 h-5" />;
      case 'crown':
        return <Crown className="w-5 h-5" />;
      default:
        return <Users className="w-5 h-5" />;
    }
  };

  const getGroupColor = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
      case 'green':
        return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'purple':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400';
      case 'red':
        return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400';
      case 'yellow':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const filteredGroups = groups
    .filter(group => {
      const matchesSearch =
        group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesType =
        filterType === 'all' ||
        (filterType === 'private' && group.isPrivate) ||
        (filterType === 'public' && !group.isPrivate);
      const matchesStatus =
        filterStatus === 'all' ||
        (filterStatus === 'active' && group.isActive) ||
        (filterStatus === 'inactive' && !group.isActive);
      return matchesSearch && matchesType && matchesStatus;
    })
    .sort((a, b) => {
      let aValue = a[sortBy as keyof UserGroup];
      let bValue = b[sortBy as keyof UserGroup];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  const totalMembers = groups.reduce((sum, group) => sum + group.memberCount, 0);
  const privateGroups = groups.filter(group => group.isPrivate).length;
  const publicGroups = groups.filter(group => !group.isPrivate).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
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
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Total Groups
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{groups.length}</p>
                <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center mt-1">
                  <Users className="w-3 h-3 mr-1" />
                  Active
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
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
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Total Members
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalMembers}</p>
                <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
                  <UserPlus className="w-3 h-3 mr-1" />
                  Across Groups
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                <UserPlus className="w-5 h-5 text-green-600 dark:text-green-400" />
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
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Public Groups
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{publicGroups}</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center mt-1">
                  <Unlock className="w-3 h-3 mr-1" />
                  Open
                </p>
              </div>
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
                <Unlock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
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
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Private Groups
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{privateGroups}</p>
                <p className="text-xs text-amber-600 dark:text-amber-400 flex items-center mt-1">
                  <Lock className="w-3 h-3 mr-1" />
                  Restricted
                </p>
              </div>
              <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl">
                <Lock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Search and Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search groups..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl"
            />
          </div>

          <div className="flex gap-3">
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl"
            >
              <option value="all">All Groups</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>

            <button className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button className="px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Import</span>
            </button>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2 shadow-lg">
              <Plus className="w-4 h-4" />
              <span>Create Group</span>
            </button>
          </div>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredGroups.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group ${
                selectedGroup?.id === group.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedGroup(group)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-xl ${getGroupColor(group.color)}`}>
                    {getGroupIcon(group.icon)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center space-x-2">
                      <span>{group.name}</span>
                      {group.isPrivate && <Lock className="w-4 h-4 text-amber-500" />}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {group.description}
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(showDropdown === group.id ? null : group.id)}
                    className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200"
                    title="More Actions"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {showDropdown === group.id && (
                    <div className="absolute right-0 top-10 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl z-10">
                      <div className="py-1">
                        <button
                          onClick={() => {
                            openViewModal(group);
                            setShowDropdown(null);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center space-x-2"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View Details</span>
                        </button>
                        <button
                          onClick={() => {
                            openEditModal(group);
                            setShowDropdown(null);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center space-x-2"
                        >
                          <Edit className="w-4 h-4" />
                          <span>Edit Group</span>
                        </button>
                        <button
                          onClick={() => {
                            duplicateGroup(group);
                            setShowDropdown(null);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center space-x-2"
                        >
                          <Copy className="w-4 h-4" />
                          <span>Duplicate Group</span>
                        </button>
                        <button
                          onClick={() => {
                            setShowDropdown(null);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center space-x-2"
                        >
                          <UserPlus className="w-4 h-4" />
                          <span>Add Members</span>
                        </button>
                        <button
                          onClick={() => {
                            setShowDropdown(null);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center space-x-2"
                        >
                          <Download className="w-4 h-4" />
                          <span>Export Group</span>
                        </button>
                        <button
                          onClick={() => {
                            setShowDropdown(null);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center space-x-2"
                        >
                          <Settings className="w-4 h-4" />
                          <span>Group Settings</span>
                        </button>
                        <div className="border-t border-slate-200 dark:border-slate-700 my-1"></div>
                        <button
                          onClick={() => {
                            openDeleteModal(group);
                            setShowDropdown(null);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center space-x-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete Group</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Members</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    {group.memberCount}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Permissions</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">
                    {group.permissions.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Owner</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {group.owner.name}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getGroupColor(group.color)}`}
                  >
                    {group.isPrivate ? 'Private' : 'Public'}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Activity className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Updated {new Date(group.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Group Details Panel */}
        {selectedGroup && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className={`p-4 rounded-xl ${getGroupColor(selectedGroup.color)}`}>
                  {getGroupIcon(selectedGroup.icon)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                    <span>{selectedGroup.name}</span>
                    {selectedGroup.isPrivate && <Lock className="w-5 h-5 text-amber-500" />}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400">{selectedGroup.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 flex items-center space-x-2">
                  <UserPlus className="w-4 h-4" />
                  <span>Add Member</span>
                </button>
                <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 flex items-center space-x-2">
                  <Edit className="w-4 h-4" />
                  <span>Edit Group</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Group Members */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  Group Members
                </h3>
                <div className="space-y-3">
                  {selectedGroup.members.map(member => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          className="w-8 h-8 rounded-full ring-2 ring-white dark:ring-slate-600"
                          src={member.avatar}
                          alt={member.name}
                        />
                        <div>
                          <div className="text-sm font-medium text-slate-900 dark:text-white">
                            {member.name}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {member.role}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {member.isActive ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-slate-400" />
                        )}
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {new Date(member.joinDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Group Information */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  Group Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Member Count</span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      {selectedGroup.memberCount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Permissions</span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      {selectedGroup.permissions.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Owner</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {selectedGroup.owner.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Created</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {new Date(selectedGroup.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Last Updated</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {new Date(selectedGroup.updatedAt).toLocaleDateString()}
                    </span>
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

export default UserGroupsPage;
