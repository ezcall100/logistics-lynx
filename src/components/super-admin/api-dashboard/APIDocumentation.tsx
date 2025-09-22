import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Plus,
  Search,
  Edit,
  Trash2,
  Copy,
  Eye,
  Globe,
  Book,
  Code,
  Settings,
  Download,
  Upload,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Clock,
  User,
  Tag,
} from 'lucide-react';

/**
 * API Documentation Page - Comprehensive API documentation management
 * Created by MCP 302 Agents
 * Features: Documentation creation, editing, versioning, and publishing
 */

interface APIDoc {
  id: string;
  title: string;
  description: string;
  version: string;
  status: 'draft' | 'published' | 'archived';
  category: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date | null;
  tags: string[];
  endpoints: string[];
  examples: Array<{
    language: string;
    code: string;
    description: string;
  }>;
}

const APIDocumentation: React.FC = () => {
  const [docs, setDocs] = useState<APIDoc[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<APIDoc | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Mock data initialization
  useEffect(() => {
    const mockDocs: APIDoc[] = [
      {
        id: '1',
        title: 'User Authentication API',
        description: 'Complete guide for user authentication and authorization',
        version: 'v1.2.0',
        status: 'published',
        category: 'Authentication',
        content: '# User Authentication API\n\nThis API provides secure user authentication...',
        author: 'admin@company.com',
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        tags: ['authentication', 'security', 'jwt'],
        endpoints: ['/api/v1/auth/login', '/api/v1/auth/register', '/api/v1/auth/refresh'],
        examples: [
          {
            language: 'JavaScript',
            code: 'const response = await fetch("/api/v1/auth/login", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({ email, password })\n});',
            description: 'Login request example'
          },
          {
            language: 'Python',
            code: 'import requests\n\nresponse = requests.post("/api/v1/auth/login", json={"email": email, "password": password})',
            description: 'Python login example'
          }
        ],
      },
      {
        id: '2',
        title: 'User Management API',
        description: 'API endpoints for managing user accounts and profiles',
        version: 'v1.1.0',
        status: 'published',
        category: 'Users',
        content: '# User Management API\n\nManage user accounts, profiles, and settings...',
        author: 'dev@company.com',
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        tags: ['users', 'profiles', 'management'],
        endpoints: ['/api/v1/users', '/api/v1/users/{id}', '/api/v1/users/{id}/profile'],
        examples: [
          {
            language: 'cURL',
            code: 'curl -X GET "https://api.example.com/api/v1/users/123" \\\n  -H "Authorization: Bearer YOUR_TOKEN"',
            description: 'Get user by ID'
          }
        ],
      },
      {
        id: '3',
        title: 'Payment Processing API',
        description: 'Secure payment processing and transaction management',
        version: 'v2.0.0',
        status: 'draft',
        category: 'Payments',
        content: '# Payment Processing API\n\nProcess payments securely with our payment API...',
        author: 'finance@company.com',
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        publishedAt: null,
        tags: ['payments', 'transactions', 'security'],
        endpoints: ['/api/v2/payments', '/api/v2/payments/{id}', '/api/v2/transactions'],
        examples: [
          {
            language: 'JavaScript',
            code: 'const payment = await fetch("/api/v2/payments", {\n  method: "POST",\n  headers: { "Authorization": "Bearer " + token },\n  body: JSON.stringify(paymentData)\n});',
            description: 'Create payment'
          }
        ],
      },
      {
        id: '4',
        title: 'Legacy API Reference',
        description: 'Deprecated API endpoints and migration guide',
        version: 'v0.9.0',
        status: 'archived',
        category: 'Legacy',
        content: '# Legacy API Reference\n\nThis API version is deprecated. Please migrate to v1.0+...',
        author: 'admin@company.com',
        createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
        publishedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
        tags: ['legacy', 'deprecated', 'migration'],
        endpoints: ['/api/v0/users', '/api/v0/auth'],
        examples: [],
      },
    ];

    setDocs(mockDocs);
  }, []);

  const filteredDocs = docs.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || doc.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'draft': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'archived': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const handleSelectDoc = (docId: string) => {
    setSelectedDocs(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const handleSelectAll = () => {
    if (selectedDocs.length === filteredDocs.length) {
      setSelectedDocs([]);
    } else {
      setSelectedDocs(filteredDocs.map(doc => doc.id));
    }
  };

  const handleEditDoc = (doc: APIDoc) => {
    setSelectedDoc(doc);
    setShowEditModal(true);
  };

  const handlePublishDoc = (docId: string) => {
    setDocs(prev => prev.map(doc => 
      doc.id === docId 
        ? { ...doc, status: 'published' as const, publishedAt: new Date() }
        : doc
    ));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <FileText className="w-8 h-8 text-cyan-500 mr-3" />
            API Documentation
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Create, manage, and publish comprehensive API documentation
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Documentation
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Docs</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{docs.length}</p>
            </div>
            <div className="p-3 bg-cyan-100 dark:bg-cyan-900 rounded-lg">
              <FileText className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Published</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {docs.filter(doc => doc.status === 'published').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Drafts</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {docs.filter(doc => doc.status === 'draft').length}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <Edit className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Endpoints</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {docs.reduce((acc, doc) => acc + doc.endpoints.length, 0)}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="Authentication">Authentication</option>
              <option value="Users">Users</option>
              <option value="Payments">Payments</option>
              <option value="Legacy">Legacy</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-cyan-100 text-cyan-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Book className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-cyan-100 text-cyan-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Globe className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Documentation List/Grid */}
        {viewMode === 'list' ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedDocs.length === filteredDocs.length && filteredDocs.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                    />
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Documentation</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Version</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Author</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Updated</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocs.map((doc) => (
                  <tr key={doc.id} className="border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={selectedDocs.includes(doc.id)}
                        onChange={() => handleSelectDoc(doc.id)}
                        className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{doc.title}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{doc.description}</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {doc.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 dark:bg-slate-600 text-gray-600 dark:text-gray-300 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                          {doc.tags.length > 3 && (
                            <span className="text-xs text-gray-400">+{doc.tags.length - 3} more</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white">{doc.category}</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white font-mono">{doc.version}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white">{doc.author}</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-white">
                      {doc.updatedAt.toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <button
                          className="text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"
                          title="View Documentation"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditDoc(doc)}
                          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                          title="Edit Documentation"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        {doc.status === 'draft' && (
                          <button
                            onClick={() => handlePublishDoc(doc.id)}
                            className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                            title="Publish Documentation"
                          >
                            <Globe className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                          title="Delete Documentation"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocs.map((doc) => (
              <div key={doc.id} className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedDocs.includes(doc.id)}
                      onChange={() => handleSelectDoc(doc.id)}
                      className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{doc.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{doc.description}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                    {doc.status}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Version</span>
                    <span className="text-gray-900 dark:text-white font-mono">{doc.version}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Category</span>
                    <span className="text-gray-900 dark:text-white">{doc.category}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Endpoints</span>
                    <span className="text-gray-900 dark:text-white">{doc.endpoints.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Author</span>
                    <span className="text-gray-900 dark:text-white">{doc.author}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {doc.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 dark:bg-slate-600 text-gray-600 dark:text-gray-300 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    {doc.tags.length > 3 && (
                      <span className="text-xs text-gray-400">+{doc.tags.length - 3}</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        className="text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditDoc(doc)}
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      {doc.status === 'draft' && (
                        <button
                          onClick={() => handlePublishDoc(doc.id)}
                          className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                          title="Publish"
                        >
                          <Globe className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <button
                      className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default APIDocumentation;
