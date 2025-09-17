import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  UserPlus,
  Search,
  Download,
  RefreshCw,
  Trash2,
  Clock,
  Mail,
  Building,
  Calendar,
  UserCheck,
  UserX,
  AlertTriangle,
  X,
  SortAsc,
  SortDesc,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Shield,
  Crown,
  Star,
  Zap,
  TrendingUp,
  Activity,
  Globe,
  Smartphone,
  Monitor
} from 'lucide-react';

// Enhanced UI Components with Glassmorphism
const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 ${className}`}>
    {children}
  </div>
);

const GlassButton: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}> = ({ children, className = '', variant = 'primary', size = 'md', onClick }) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl',
    secondary: 'bg-white/20 dark:bg-gray-700/20 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-700/30 border border-white/30 dark:border-gray-600/30',
    danger: 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 shadow-lg hover:shadow-xl',
    ghost: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-white/10 dark:hover:bg-gray-700/10'
  };
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };
  return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
     aria-label="Button">
      {children}
    </button>
  );
};

const GlassInput: React.FC<{ 
  placeholder?: string; 
  value?: string; 
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}> = ({ placeholder, value, onChange, className = '' }) => (
  <input 
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`w-full px-4 py-3 bg-white/20 dark:bg-gray-700/20 border border-white/30 dark:border-gray-600/30 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-sm ${className}`}
  />
);

const GlassSelect: React.FC<{ 
  value?: string; 
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
  className?: string;
}> = ({ value, onChange, children, className = '' }) => (
  <select 
    value={value}
    onChange={onChange}
    className={`px-4 py-3 bg-white/20 dark:bg-gray-700/20 border border-white/30 dark:border-gray-600/30 rounded-xl text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-sm ${className}`}
  >
    {children}
  </select>
);

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  company: string;
  lastLogin: string;
  createdAt: string;
  avatar?: string;
  phone?: string;
  department?: string;
  location?: string;
  permissions: string[];
  loginCount: number;
  isOnline: boolean;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  ipAddress: string;
  timezone: string;
}

const EnhancedAllUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState<keyof User>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Mock data for demonstration
  const mockUsers: User[] = [
    {
      id: '1',
      email: 'john.doe@company.com',
      firstName: 'John',
      lastName: 'Doe',
      role: 'admin',
      status: 'active',
      company: 'Acme Corp',
      lastLogin: '2024-01-15T10:30:00Z',
      createdAt: '2023-06-15T09:00:00Z',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      phone: '+1 (555) 123-4567',
      department: 'Engineering',
      location: 'New York, NY',
      permissions: ['read', 'write', 'admin'],
      loginCount: 245,
      isOnline: true,
      deviceType: 'desktop',
      ipAddress: '192.168.1.100',
      timezone: 'America/New_York'
    },
    {
      id: '2',
      email: 'jane.smith@company.com',
      firstName: 'Jane',
      lastName: 'Smith',
      role: 'manager',
      status: 'active',
      company: 'Tech Solutions',
      lastLogin: '2024-01-15T09:15:00Z',
      createdAt: '2023-08-20T14:30:00Z',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      phone: '+1 (555) 987-6543',
      department: 'Marketing',
      location: 'San Francisco, CA',
      permissions: ['read', 'write'],
      loginCount: 189,
      isOnline: false,
      deviceType: 'mobile',
      ipAddress: '192.168.1.101',
      timezone: 'America/Los_Angeles'
    },
    {
      id: '3',
      email: 'mike.wilson@company.com',
      firstName: 'Mike',
      lastName: 'Wilson',
      role: 'user',
      status: 'pending',
      company: 'Global Inc',
      lastLogin: '2024-01-14T16:45:00Z',
      createdAt: '2024-01-10T11:20:00Z',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      phone: '+1 (555) 456-7890',
      department: 'Sales',
      location: 'Chicago, IL',
      permissions: ['read'],
      loginCount: 12,
      isOnline: true,
      deviceType: 'tablet',
      ipAddress: '192.168.1.102',
      timezone: 'America/Chicago'
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = users;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(user => 
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredUsers(filtered);
  }, [users, searchQuery, roleFilter, statusFilter, sortField, sortDirection]);

  const handleSort = (field: keyof User) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    setSelectedUsers(
      selectedUsers.length === filteredUsers.length 
        ? [] 
        : filteredUsers.map(user => user.id)
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'suspended': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Crown className="h-4 w-4 text-purple-600 responsive-container" />;
      case 'manager': return <Shield className="h-4 w-4 text-blue-600 responsive-container" />;
      case 'user': return <Users className="h-4 w-4 text-gray-600 responsive-container" />;
      default: return <Users className="h-4 w-4 text-gray-600 responsive-container" />;
    }
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'desktop': return <Monitor className="h-4 w-4 responsive-container" />;
      case 'mobile': return <Smartphone className="h-4 w-4 responsive-container" />;
      case 'tablet': return <Monitor className="h-4 w-4 responsive-container" />;
      default: return <Monitor className="h-4 w-4 responsive-container" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
      <div className="flex items-center justify-center h-96 responsive-container">
        <div className="flex items-center space-x-2 responsive-container">
          <RefreshCw className="h-6 w-6 animate-spin text-blue-500 responsive-container" />
          <span className="text-gray-600 dark:text-gray-300 responsive-container">Loading users...</span>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="space-y-6 responsive-container">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between responsive-container">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent responsive-container">
            User Management
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1 responsive-container">
            Manage and monitor all system users with advanced controls
          </p>
        </div>
        <div className="flex items-center space-x-3 responsive-container">
          <GlassButton 
            variant="secondary" 
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            {viewMode === 'grid' ? <Users className="h-4 w-4 mr-2 responsive-container" /> : <Activity className="h-4 w-4 mr-2 responsive-container" />}
            {viewMode === 'grid' ? 'List View' : 'Grid View'}
          </GlassButton>
          <GlassButton variant="primary" onClick={() => setShowCreateUser(true)}>
            <UserPlus className="h-4 w-4 mr-2 responsive-container" />
            Add User
          </GlassButton>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 responsive-container">
        <GlassCard className="p-6 responsive-container">
          <div className="flex items-center justify-between responsive-container">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 responsive-container">Total Users</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 responsive-container">{users.length}</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl responsive-container">
              <Users className="h-6 w-6 text-blue-600 responsive-container" />
            </div>
          </div>
          <div className="mt-4 flex items-center responsive-container">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1 responsive-container" />
            <span className="text-sm text-green-600 responsive-container">+12.5%</span>
            <span className="text-sm text-gray-500 ml-2 responsive-container">from last month</span>
          </div>
        </GlassCard>

        <GlassCard className="p-6 responsive-container">
          <div className="flex items-center justify-between responsive-container">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 responsive-container">Active Users</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 responsive-container">
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-xl responsive-container">
              <UserCheck className="h-6 w-6 text-green-600 responsive-container" />
            </div>
          </div>
          <div className="mt-4 flex items-center responsive-container">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2 responsive-container"></div>
            <span className="text-sm text-green-600 responsive-container">Online now</span>
          </div>
        </GlassCard>

        <GlassCard className="p-6 responsive-container">
          <div className="flex items-center justify-between responsive-container">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 responsive-container">Pending</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 responsive-container">
                {users.filter(u => u.status === 'pending').length}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-xl responsive-container">
              <Clock className="h-6 w-6 text-yellow-600 responsive-container" />
            </div>
          </div>
          <div className="mt-4 flex items-center responsive-container">
            <AlertTriangle className="h-4 w-4 text-yellow-500 mr-1 responsive-container" />
            <span className="text-sm text-yellow-600 responsive-container">Requires attention</span>
          </div>
        </GlassCard>

        <GlassCard className="p-6 responsive-container">
          <div className="flex items-center justify-between responsive-container">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 responsive-container">Online Now</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 responsive-container">
                {users.filter(u => u.isOnline).length}
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-xl responsive-container">
              <Zap className="h-6 w-6 text-purple-600 responsive-container" />
            </div>
          </div>
          <div className="mt-4 flex items-center responsive-container">
            <Globe className="h-4 w-4 text-purple-500 mr-1 responsive-container" />
            <span className="text-sm text-purple-600 responsive-container">Real-time</span>
          </div>
        </GlassCard>
      </div>

      {/* Enhanced Search and Filters */}
      <GlassCard className="p-6 responsive-container">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4 responsive-container">
          <div className="flex-1 relative responsive-container">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 responsive-container" />
            <GlassInput
              placeholder="Search users by name, email, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 responsive-container"
            />
          </div>
          <div className="flex items-center space-x-3 responsive-container">
            <GlassSelect value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="user">User</option>
            </GlassSelect>
            <GlassSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </GlassSelect>
            <GlassButton variant="secondary" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-4 w-4 mr-2 responsive-container" />
              Filters
            </GlassButton>
          </div>
        </div>
      </GlassCard>

      {/* Enhanced User Grid/List */}
      <GlassCard className="p-6 responsive-container">
        <div className="flex items-center justify-between mb-6 responsive-container">
          <div className="flex items-center space-x-4 responsive-container">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 responsive-container">
              Users ({filteredUsers.length})
            </h3>
            {selectedUsers.length > 0 && (
              <div className="flex items-center space-x-2 responsive-container">
                <span className="text-sm text-gray-600 dark:text-gray-400 responsive-container">
                  {selectedUsers.length} selected
                </span>
                <GlassButton variant="danger" size="sm">
                  <Trash2 className="h-4 w-4 mr-1 responsive-container" />
                  Delete
                </GlassButton>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2 responsive-container">
            <GlassButton variant="ghost" size="sm">
              <Download className="h-4 w-4 mr-1 responsive-container" />
              Export
            </GlassButton>
            <GlassButton variant="ghost" size="sm">
              <RefreshCw className="h-4 w-4 responsive-container" />
            </GlassButton>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 responsive-container">
            {filteredUsers.map((user) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-600/30 hover:shadow-lg transition-all duration-300 group responsive-container"
              >
                <div className="flex items-start justify-between mb-4 responsive-container">
                  <div className="flex items-center space-x-3 responsive-container">
                    <div className="relative responsive-container">
                      <img
                        src={user.avatar}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="w-12 h-12 rounded-full object-cover responsive-container"
                      / alt="Image">
                      {user.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full responsive-container"></div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 responsive-container">
                        {user.firstName} {user.lastName}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 responsive-container">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 responsive-container">
                    {getRoleIcon(user.role)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 responsive-container">
                  <div className="flex items-center justify-between text-sm responsive-container">
                    <span className="text-gray-600 dark:text-gray-400 responsive-container">Company</span>
                    <span className="font-medium responsive-container">{user.company}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm responsive-container">
                    <span className="text-gray-600 dark:text-gray-400 responsive-container">Department</span>
                    <span className="font-medium responsive-container">{user.department}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm responsive-container">
                    <span className="text-gray-600 dark:text-gray-400 responsive-container">Last Login</span>
                    <span className="font-medium responsive-container">{formatDate(user.lastLogin)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm responsive-container">
                    <span className="text-gray-600 dark:text-gray-400 responsive-container">Device</span>
                    <div className="flex items-center space-x-1 responsive-container">
                      {getDeviceIcon(user.deviceType)}
                      <span className="font-medium capitalize responsive-container">{user.deviceType}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between responsive-container">
                  <div className="flex items-center space-x-2 responsive-container">
                    <GlassButton variant="ghost" size="sm">
                      <Eye className="h-4 w-4 responsive-container" />
                    </GlassButton>
                    <GlassButton variant="ghost" size="sm">
                      <Edit className="h-4 w-4 responsive-container" />
                    </GlassButton>
                    <GlassButton variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4 responsive-container" />
                    </GlassButton>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 responsive-container">
                    {user.loginCount} logins
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto responsive-container">
            <table className="w-full responsive-container">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 responsive-container">
                  <th className="text-left py-3 px-4 responsive-container">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === filteredUsers.length}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 responsive-container"
                    />
                  </th>
                  <th className="text-left py-3 px-4 responsive-container">
                    <button
                      onClick={() = aria-label="Button"> handleSort('firstName')}
                      className="flex items-center space-x-1 font-medium text-gray-900 dark:text-gray-100 responsive-container"
                    >
                      <span>User</span>
                      {sortField === 'firstName' && (
                        sortDirection === 'asc' ? <SortAsc className="h-4 w-4 responsive-container" /> : <SortDesc className="h-4 w-4 responsive-container" />
                      )}
                    </button>
                  </th>
                  <th className="text-left py-3 px-4 responsive-container">
                    <button
                      onClick={() = aria-label="Button"> handleSort('role')}
                      className="flex items-center space-x-1 font-medium text-gray-900 dark:text-gray-100 responsive-container"
                    >
                      <span>Role</span>
                      {sortField === 'role' && (
                        sortDirection === 'asc' ? <SortAsc className="h-4 w-4 responsive-container" /> : <SortDesc className="h-4 w-4 responsive-container" />
                      )}
                    </button>
                  </th>
                  <th className="text-left py-3 px-4 responsive-container">
                    <button
                      onClick={() = aria-label="Button"> handleSort('status')}
                      className="flex items-center space-x-1 font-medium text-gray-900 dark:text-gray-100 responsive-container"
                    >
                      <span>Status</span>
                      {sortField === 'status' && (
                        sortDirection === 'asc' ? <SortAsc className="h-4 w-4 responsive-container" /> : <SortDesc className="h-4 w-4 responsive-container" />
                      )}
                    </button>
                  </th>
                  <th className="text-left py-3 px-4 responsive-container">
                    <button
                      onClick={() = aria-label="Button"> handleSort('company')}
                      className="flex items-center space-x-1 font-medium text-gray-900 dark:text-gray-100 responsive-container"
                    >
                      <span>Company</span>
                      {sortField === 'company' && (
                        sortDirection === 'asc' ? <SortAsc className="h-4 w-4 responsive-container" /> : <SortDesc className="h-4 w-4 responsive-container" />
                      )}
                    </button>
                  </th>
                  <th className="text-left py-3 px-4 responsive-container">
                    <button
                      onClick={() = aria-label="Button"> handleSort('lastLogin')}
                      className="flex items-center space-x-1 font-medium text-gray-900 dark:text-gray-100 responsive-container"
                    >
                      <span>Last Login</span>
                      {sortField === 'lastLogin' && (
                        sortDirection === 'asc' ? <SortAsc className="h-4 w-4 responsive-container" /> : <SortDesc className="h-4 w-4 responsive-container" />
                      )}
                    </button>
                  </th>
                  <th className="text-left py-3 px-4 responsive-container">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors responsive-container"
                  >
                    <td className="py-3 px-4 responsive-container">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                        className="rounded border-gray-300 responsive-container"
                      />
                    </td>
                    <td className="py-3 px-4 responsive-container">
                      <div className="flex items-center space-x-3 responsive-container">
                        <div className="relative responsive-container">
                          <img
                            src={user.avatar}
                            alt={`${user.firstName} ${user.lastName}`}
                            className="w-10 h-10 rounded-full object-cover responsive-container"
                          / alt="Image">
                          {user.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full responsive-container"></div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100 responsive-container">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 responsive-container">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 responsive-container">
                      <div className="flex items-center space-x-2 responsive-container">
                        {getRoleIcon(user.role)}
                        <span className="capitalize responsive-container">{user.role}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 responsive-container">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 responsive-container">
                      <div className="flex items-center space-x-2 responsive-container">
                        <Building className="h-4 w-4 text-gray-400 responsive-container" />
                        <span>{user.company}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 responsive-container">
                      <div className="flex items-center space-x-2 responsive-container">
                        <Clock className="h-4 w-4 text-gray-400 responsive-container" />
                        <span className="text-sm responsive-container">{formatDate(user.lastLogin)}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 responsive-container">
                      <div className="flex items-center space-x-2 responsive-container">
                        <GlassButton variant="ghost" size="sm">
                          <Eye className="h-4 w-4 responsive-container" />
                        </GlassButton>
                        <GlassButton variant="ghost" size="sm">
                          <Edit className="h-4 w-4 responsive-container" />
                        </GlassButton>
                        <GlassButton variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4 responsive-container" />
                        </GlassButton>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredUsers.length === 0 && (
          <div className="text-center py-12 responsive-container">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4 responsive-container" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2 responsive-container">No users found</h3>
            <p className="text-gray-600 dark:text-gray-400 responsive-container">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </GlassCard>
    </div>
  );
};

export default EnhancedAllUsers;
