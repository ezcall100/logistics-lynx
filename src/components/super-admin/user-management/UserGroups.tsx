import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Plus,
  Edit,
  Trash2,
  X,
  Search,
  RefreshCw,
  Download,
  Eye,
  Lock,
  Unlock,
  Building,
} from 'lucide-react';

interface UserGroup {
  id: string;
  name: string;
  description: string;
  company: string;
  permissions: string[];
  members: string[];
  memberCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface GroupMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  joinedAt: string;
}

const UserGroups: React.FC = () => {
  const [groups, setGroups] = useState<UserGroup[]>([]);
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCompany, setFilterCompany] = useState('');

  const [newGroup, setNewGroup] = useState<Partial<UserGroup>>({
    name: '',
    description: '',
    company: '',
    permissions: [],
    members: [],
    isActive: true,
  });

  // Mock groups data
    const mockGroups: UserGroup[] = [
      {
        id: '1',
      name: 'Development Team',
      description: 'Software development and engineering team',
      company: 'TechCorp',
      permissions: ['users:read', 'projects:manage', 'code:access'],
      members: ['user1', 'user2', 'user3'],
      memberCount: 8,
        isActive: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
      },
      {
        id: '2',
      name: 'Marketing Team',
        description: 'Marketing and communications team',
      company: 'TechCorp',
      permissions: ['analytics:read', 'content:manage', 'campaigns:create'],
      members: ['user4', 'user5'],
      memberCount: 5,
        isActive: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
      },
      {
        id: '3',
      name: 'Sales Team',
      description: 'Sales and customer relations team',
      company: 'TechCorp',
      permissions: ['customers:manage', 'sales:track', 'reports:view'],
      members: ['user6', 'user7', 'user8'],
      memberCount: 12,
        isActive: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
      },
      {
        id: '4',
      name: 'Support Team',
      description: 'Customer support and help desk team',
      company: 'TechCorp',
      permissions: ['tickets:manage', 'customers:view', 'knowledge:access'],
      members: ['user9', 'user10'],
      memberCount: 6,
        isActive: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
    },
  ];

  // Mock members data
  const mockMembers: GroupMember[] = [
    { id: 'user1', name: 'John Smith', email: 'john@techcorp.com', role: 'Developer', status: 'active', joinedAt: '2024-01-01T00:00:00Z' },
    { id: 'user2', name: 'Sarah Johnson', email: 'sarah@techcorp.com', role: 'Senior Developer', status: 'active', joinedAt: '2024-01-01T00:00:00Z' },
    { id: 'user3', name: 'Mike Wilson', email: 'mike@techcorp.com', role: 'Tech Lead', status: 'active', joinedAt: '2024-01-01T00:00:00Z' },
    { id: 'user4', name: 'Emily Davis', email: 'emily@techcorp.com', role: 'Marketing Manager', status: 'active', joinedAt: '2024-01-01T00:00:00Z' },
    { id: 'user5', name: 'David Brown', email: 'david@techcorp.com', role: 'Content Creator', status: 'active', joinedAt: '2024-01-01T00:00:00Z' },
  ];

  // Fetch groups and members
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setRefreshing(true);
    
    try {
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
    setGroups(mockGroups);
      setMembers(mockMembers);
    } catch (error) {
      console.error('Failed to fetch groups and members:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreateGroup = async () => {
    if (!newGroup.name || !newGroup.description || !newGroup.company) return;

    try {
      const group: UserGroup = {
        id: Date.now().toString(),
        name: newGroup.name,
        description: newGroup.description,
        company: newGroup.company,
        permissions: newGroup.permissions || [],
        members: newGroup.members || [],
        memberCount: newGroup.members?.length || 0,
        isActive: newGroup.isActive || true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setGroups(prev => [...prev, group]);
      setShowCreateGroup(false);
      setNewGroup({ name: '', description: '', company: '', permissions: [], members: [], isActive: true });
    } catch (error) {
      console.error('Failed to create group:', error);
    }
  };


  const handleDeleteGroup = async (id: string) => {
    if (!confirm('Are you sure you want to delete this group?')) return;

    try {
      setGroups(prev => prev.filter(group => group.id !== id));
    } catch (error) {
      console.error('Failed to delete group:', error);
    }
  };

  const handleToggleGroupStatus = async (id: string) => {
    try {
      setGroups(prev => prev.map(group => 
        group.id === id 
          ? { ...group, isActive: !group.isActive, updatedAt: new Date().toISOString() }
          : group
      ));
    } catch (error) {
      console.error('Failed to toggle group status:', error);
    }
  };

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCompany = !filterCompany || group.company === filterCompany;
    return matchesSearch && matchesCompany;
  });

  const getGroupMembers = (group: UserGroup) => {
    return members.filter(member => group.members.includes(member.id));
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
        {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            User Groups
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage user groups and team memberships
              </p>
            </div>
        <div className="flex items-center space-x-4">
                <button
            onClick={fetchData}
            disabled={refreshing}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
                </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
              <button
            onClick={() => setShowCreateGroup(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
            <Plus className="h-4 w-4" />
            <span>Add Group</span>
              </button>
          </div>
        </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
              placeholder="Search groups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <select
            value={filterCompany}
            onChange={(e) => setFilterCompany(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">All Companies</option>
            <option value="TechCorp">TechCorp</option>
            <option value="LogisticsCorp">LogisticsCorp</option>
            <option value="FinanceCorp">FinanceCorp</option>
            </select>
          </div>
        </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map((group, index) => {
          const groupMembers = getGroupMembers(group);
              return (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
                >
              <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${group.isActive ? 'bg-green-50 dark:bg-green-900/20' : 'bg-gray-50 dark:bg-gray-900/20'}`}>
                    <Users className={`h-6 w-6 ${group.isActive ? 'text-green-600' : 'text-gray-600'}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {group.name}
                          </h3>
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {group.company}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button
                    onClick={() => console.log('View group:', group.id)}
                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => console.log('Edit group:', group.id)}
                    className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleToggleGroupStatus(group.id)}
                    className={`p-1 transition-colors ${
                      group.isActive 
                        ? 'text-green-600 hover:text-red-600' 
                        : 'text-gray-400 hover:text-green-600'
                    }`}
                    title={group.isActive ? 'Deactivate' : 'Activate'}
                  >
                    {group.isActive ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                        </button>
                        <button
                          onClick={() => handleDeleteGroup(group.id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete"
                        >
                    <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {group.description}
                    </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Members ({group.memberCount})
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    group.isActive 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                  }`}>
                    {group.isActive ? 'Active' : 'Inactive'}
                  </span>
                        </div>
                
                <div className="space-y-2">
                  {groupMembers.slice(0, 3).map(member => (
                    <div key={member.id} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {member.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-500 truncate">
                          {member.role}
                    </div>
                      </div>
                          </div>
                        ))}
                  {groupMembers.length > 3 && (
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      +{groupMembers.length - 3} more members
                          </div>
                        )}
                    </div>

                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-xs text-gray-500 dark:text-gray-500">
                    Permissions: {group.permissions.length}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        {/* Create Group Modal */}
        <AnimatePresence>
        {showCreateGroup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md mx-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Create New Group
                </h3>
                    <button
                  onClick={() => setShowCreateGroup(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                  <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Group Name
                      </label>
                      <input
                        type="text"
                    value={newGroup.name || ''}
                    onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Enter group name"
                      />
                    </div>

                    <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Description
                      </label>
                      <textarea
                    value={newGroup.description || ''}
                    onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        rows={3}
                        placeholder="Enter group description"
                      />
                    </div>

                    <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Company
                      </label>
                  <select
                    value={newGroup.company || ''}
                    onChange={(e) => setNewGroup({ ...newGroup, company: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Select Company</option>
                    <option value="TechCorp">TechCorp</option>
                    <option value="LogisticsCorp">LogisticsCorp</option>
                    <option value="FinanceCorp">FinanceCorp</option>
                      </select>
                    </div>

                <div className="flex items-center space-x-2">
                      <input
                    type="checkbox"
                    checked={newGroup.isActive || false}
                    onChange={(e) => setNewGroup({ ...newGroup, isActive: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label className="text-sm text-gray-700 dark:text-gray-300">
                    Active Group
                  </label>
                    </div>
                  </div>

              <div className="flex items-center justify-end space-x-3 mt-6">
                    <button
                  onClick={() => setShowCreateGroup(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                <button
                  onClick={handleCreateGroup}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                      Create Group
                    </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
    </div>
  );
};

export default UserGroups;