import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  UserPlus,
  UserMinus,
  Plus,
  Edit,
  Trash2,
  Search,
  Download,
  Upload,
  Eye,
  Settings,
  Mail,
  Calendar,
  Building,
  MapPin,
  Shield,
  Crown,
  UserCheck,
  UserX,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Activity,
  BarChart3,
  PieChart,
  TrendingUp,
  Users2,
  UserCog,
  Globe,
  Lock,
  Unlock,
  X,
} from 'lucide-react';

/**
 * User Groups Page - Redesigned
 * Comprehensive user group management and organization
 * Created by MCP 301 Agents
 * Timestamp: 2025-09-14T23:15:00.000Z
 */

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  avatar?: string;
  department: string;
  joinDate: string;
}

interface UserGroup {
  id: string;
  name: string;
  description: string;
  type: 'department' | 'project' | 'custom' | 'system';
  members: User[];
  memberCount: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  color: string;
  icon: string;
  permissions: string[];
  isActive: boolean;
  tags: string[];
  settings: {
    allowSelfJoin: boolean;
    requireApproval: boolean;
    maxMembers: number;
    autoArchive: boolean;
  };
}

interface GroupTemplate {
  id: string;
  name: string;
  description: string;
  type: string;
  icon: string;
  color: string;
  defaultPermissions: string[];
  settings: Record<string, unknown>;
}

export const UserGroups: React.FC = () => {
  const [groups, setGroups] = useState<UserGroup[]>([]);
  // const [users, setUsers] = useState<User[]>([]);
  // const [selectedGroup, setSelectedGroup] = useState<UserGroup | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  // const [showEditModal, setShowEditModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [groupTemplates] = useState<GroupTemplate[]>([
    {
      id: 'department',
      name: 'Department Group',
      description: 'Organize users by department or team',
      type: 'department',
      icon: 'Building',
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      defaultPermissions: ['read', 'write'],
      settings: {
        allowSelfJoin: false,
        requireApproval: true,
        maxMembers: 100,
        autoArchive: false,
      },
    },
    {
      id: 'project',
      name: 'Project Group',
      description: 'Collaborative group for specific projects',
      type: 'project',
      icon: 'Users2',
      color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      defaultPermissions: ['read', 'write', 'admin'],
      settings: { allowSelfJoin: true, requireApproval: false, maxMembers: 50, autoArchive: true },
    },
    {
      id: 'custom',
      name: 'Custom Group',
      description: 'Flexible group with custom settings',
      type: 'custom',
      icon: 'UserCog',
      color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
      defaultPermissions: ['read'],
      settings: {
        allowSelfJoin: true,
        requireApproval: false,
        maxMembers: 200,
        autoArchive: false,
      },
    },
  ]);

  // Mock data
  useEffect(() => {
    const mockUsers: User[] = Array.from({ length: 50 }, (_, i) => ({
      id: `${i + 1}`,
      name: `User ${i + 1}`,
      email: `user${i + 1}@demo-company.com`,
      role: ['Admin', 'Manager', 'User', 'Guest'][Math.floor(Math.random() * 4)],
      status: ['active', 'inactive', 'pending'][Math.floor(Math.random() * 3)] as
        | 'active'
        | 'inactive'
        | 'pending',
      avatar: `https://images.unsplash.com/photo-${1472099645785 + i}?w=40&h=40&fit=crop&crop=face`,
      department: ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'][
        Math.floor(Math.random() * 5)
      ],
      joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    }));

    const mockGroups: UserGroup[] = [
      {
        id: '1',
        name: 'Engineering Team',
        description: 'Software development and engineering team members',
        type: 'department',
        members: mockUsers.slice(0, 15),
        memberCount: 15,
        createdBy: 'John Smith',
        createdAt: '2024-01-15T00:00:00Z',
        updatedAt: '2024-03-20T00:00:00Z',
        color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
        icon: 'Building',
        permissions: ['read', 'write', 'admin'],
        isActive: true,
        tags: ['development', 'engineering', 'tech'],
        settings: {
          allowSelfJoin: false,
          requireApproval: true,
          maxMembers: 50,
          autoArchive: false,
        },
      },
      {
        id: '2',
        name: 'Marketing Department',
        description: 'Marketing and communications team',
        type: 'department',
        members: mockUsers.slice(15, 25),
        memberCount: 10,
        createdBy: 'Sarah Johnson',
        createdAt: '2024-02-01T00:00:00Z',
        updatedAt: '2024-03-15T00:00:00Z',
        color: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
        icon: 'Users2',
        permissions: ['read', 'write'],
        isActive: true,
        tags: ['marketing', 'communications', 'branding'],
        settings: {
          allowSelfJoin: false,
          requireApproval: true,
          maxMembers: 30,
          autoArchive: false,
        },
      },
      {
        id: '3',
        name: 'Project Alpha',
        description: 'Cross-functional team for Project Alpha development',
        type: 'project',
        members: mockUsers.slice(25, 35),
        memberCount: 10,
        createdBy: 'Mike Wilson',
        createdAt: '2024-03-01T00:00:00Z',
        updatedAt: '2024-03-25T00:00:00Z',
        color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
        icon: 'UserCog',
        permissions: ['read', 'write', 'admin'],
        isActive: true,
        tags: ['project', 'alpha', 'development'],
        settings: {
          allowSelfJoin: true,
          requireApproval: false,
          maxMembers: 20,
          autoArchive: true,
        },
      },
      {
        id: '4',
        name: 'Sales Team',
        description: 'Sales and business development team',
        type: 'department',
        members: mockUsers.slice(35, 45),
        memberCount: 10,
        createdBy: 'Alice Brown',
        createdAt: '2024-02-15T00:00:00Z',
        updatedAt: '2024-03-10T00:00:00Z',
        color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
        icon: 'TrendingUp',
        permissions: ['read', 'write'],
        isActive: true,
        tags: ['sales', 'business', 'revenue'],
        settings: {
          allowSelfJoin: false,
          requireApproval: true,
          maxMembers: 40,
          autoArchive: false,
        },
      },
      {
        id: '5',
        name: 'HR & Admin',
        description: 'Human resources and administrative staff',
        type: 'department',
        members: mockUsers.slice(45, 50),
        memberCount: 5,
        createdBy: 'Bob Davis',
        createdAt: '2024-01-20T00:00:00Z',
        updatedAt: '2024-03-05T00:00:00Z',
        color: 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400',
        icon: 'Shield',
        permissions: ['read', 'write', 'admin'],
        isActive: true,
        tags: ['hr', 'admin', 'management'],
        settings: {
          allowSelfJoin: false,
          requireApproval: true,
          maxMembers: 15,
          autoArchive: false,
        },
      },
    ];

    // setUsers(mockUsers);
    setGroups(mockGroups);
  }, []);

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType<{ className?: string }> } = {
      Building,
      Users2,
      UserCog,
      TrendingUp,
      Shield,
      Users,
      UserPlus,
      UserMinus,
      Settings,
      Mail,
      Calendar,
      MapPin,
      Crown,
      UserCheck,
      UserX,
      Clock,
      CheckCircle,
      AlertCircle,
      Star,
      Activity,
      BarChart3,
      PieChart,
      Globe,
      Lock,
      Unlock,
    };
    return icons[iconName] || Users;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'department':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'project':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'custom':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'system':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const filteredGroups = groups.filter(group => {
    const matchesSearch =
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = filterType === 'all' || group.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleCreateGroup = (template?: GroupTemplate) => {
    console.log('Creating group from template:', template);
    setShowCreateModal(true);
  };

  const handleEditGroup = (group: UserGroup) => {
    // setSelectedGroup(group);
    // setShowEditModal(true);
    console.log('Edit group:', group);
  };

  const handleDeleteGroup = (groupId: string) => {
    if (window.confirm('Are you sure you want to delete this group?')) {
      setGroups(prev => prev.filter(group => group.id !== groupId));
    }
  };

  const handleAddMember = (groupId: string) => {
    console.log('Adding member to group:', groupId);
  };

  // const handleRemoveMember = (groupId: string, userId: string) => {
  //   console.log('Removing member from group:', groupId, userId);
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">User Groups</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Organize and manage user groups for better collaboration and access control
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/10 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <PieChart className="w-4 h-4" />
                </button>
              </div>
              <button className="px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <button className="px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors flex items-center space-x-2">
                <Upload className="w-4 h-4" />
                <span>Import</span>
              </button>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create Group</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search groups by name, description, or tags..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm"
              />
            </div>
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="px-4 py-3 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-700"
            >
              <option value="all">All Types</option>
              <option value="department">Department</option>
              <option value="project">Project</option>
              <option value="custom">Custom</option>
              <option value="system">System</option>
            </select>
          </div>
        </div>

        {/* Group Templates */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Start Templates
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {groupTemplates.map(template => {
              const Icon = getIcon(template.icon);
              return (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/10 rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => handleCreateGroup(template)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${template.color}`}
                    >
                      {template.type}
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {template.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {template.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {template.defaultPermissions.length} permissions
                    </span>
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
                      Use Template
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Groups Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredGroups.map(group => {
              const Icon = getIcon(group.icon);
              return (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="p-6">
                    {/* Group Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                          <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {group.name}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(group.type)}`}
                            >
                              {group.type}
                            </span>
                            {group.isActive ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-yellow-500" />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleEditGroup(group)}
                          className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          title="Edit Group"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteGroup(group.id)}
                          className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                          title="Delete Group"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Group Description */}
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {group.description}
                    </p>

                    {/* Group Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {group.memberCount}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Members</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {group.permissions.length}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Permissions</div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {group.tags.map(tag => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Recent Members */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                        Recent Members
                      </h4>
                      <div className="flex -space-x-2">
                        {group.members.slice(0, 5).map(member => (
                          <div key={member.id} className="relative">
                            <img
                              className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800"
                              src={member.avatar}
                              alt={member.name}
                              title={member.name}
                            />
                          </div>
                        ))}
                        {group.memberCount > 5 && (
                          <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                              +{group.memberCount - 5}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-slate-700">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleAddMember(group.id)}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium flex items-center space-x-1"
                        >
                          <UserPlus className="w-4 h-4" />
                          <span>Add Member</span>
                        </button>
                        <button className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 text-sm font-medium">
                          View All
                        </button>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <Settings className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-slate-700/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Group
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Members
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                  {filteredGroups.map(group => {
                    const Icon = getIcon(group.icon);
                    return (
                      <motion.tr
                        key={group.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {group.name}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {group.description}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(group.type)}`}
                          >
                            {group.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {group.memberCount} members
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Max: {group.settings.maxMembers}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              group.isActive
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                            }`}
                          >
                            {group.isActive ? (
                              <>
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Active
                              </>
                            ) : (
                              <>
                                <AlertCircle className="w-4 h-4 mr-1" />
                                Inactive
                              </>
                            )}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          <div>{new Date(group.createdAt).toLocaleDateString()}</div>
                          <div className="text-xs">by {group.createdBy}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleAddMember(group.id)}
                              className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                              title="Add Member"
                            >
                              <UserPlus className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleEditGroup(group)}
                              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                              title="Edit Group"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteGroup(group.id)}
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                              title="Delete Group"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Create Group Modal */}
        <AnimatePresence>
          {showCreateModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Create New Group
                    </h2>
                    <button
                      onClick={() => setShowCreateModal(false)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Group Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700"
                        placeholder="Enter group name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700"
                        placeholder="Enter group description"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Group Type
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700">
                        <option value="department">Department</option>
                        <option value="project">Project</option>
                        <option value="custom">Custom</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Tags
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700"
                        placeholder="Enter tags separated by commas"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200 dark:border-slate-700">
                    <button
                      onClick={() => setShowCreateModal(false)}
                      className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Create Group
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserGroups;
