import React, { useState, useCallback, useRef } from 'react';
import {
  GitBranch,
  CheckCircle,
  AlertCircle,
  Clock,
  RefreshCw,
  GitCommit,
  GitPullRequest,
} from 'lucide-react';

interface GitHubStatus {
  connected: boolean;
  lastCommit: string;
  lastCommitHash: string;
  lastCommitMessage: string;
  totalCommits: number;
  pendingCommits: number;
  webhookStatus: 'active' | 'inactive' | 'error';
  lastWebhookTrigger: string;
}

const GitHubWebhookStatusWidget: React.FC = () => {
  const [status, _setStatus] = useState<GitHubStatus>({
    connected: true,
    lastCommit: '2025-09-17T08:45:00.000Z',
    lastCommitHash: 'a1b2c3d4e5f6',
    lastCommitMessage: 'Fix three-dot menu functions - UIAgent-091',
    totalCommits: 47,
    pendingCommits: 3,
    webhookStatus: 'active',
    lastWebhookTrigger: '2025-09-17T08:44:30.000Z',
  });

  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshStatus = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-500 bg-green-50';
      case 'inactive':
        return 'text-yellow-500 bg-yellow-50';
      case 'error':
        return 'text-red-500 bg-red-50';
      default:
        return 'text-gray-500 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'inactive':
        return <Clock className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
      default:
        return <Clock className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 responsive-container sm:flex-col md:flex-row lg:grid">
      <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="p-2 bg-gray-100 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
            <GitBranch className="w-5 h-5 text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">GitHub Integration</h2>
            <p className="text-sm text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">Real-time commit tracking</p>
          </div>
        </div>
        <button
          onClick={refreshStatus}
          disabled={isRefreshing}
          className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 responsive-container sm:flex-col md:flex-row lg:grid"
         aria-label="Button">
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Connection Status */}
      <div className="flex items-center justify-between mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
        <span className="text-sm font-medium text-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">Connection Status</span>
        <div
          className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status.webhookStatus)}`}
        >
          {getStatusIcon(status.webhookStatus)}
          <span>{status.webhookStatus.toUpperCase()}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="bg-gray-50 rounded-lg p-4 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center space-x-2 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
            <GitCommit className="w-4 h-4 text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid" />
            <span className="text-sm font-medium text-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">Total Commits</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{status.totalCommits}</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center space-x-2 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
            <GitPullRequest className="w-4 h-4 text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid" />
            <span className="text-sm font-medium text-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">Pending</span>
          </div>
          <p className="text-2xl font-bold text-blue-600 responsive-container sm:flex-col md:flex-row lg:grid">{status.pendingCommits}</p>
        </div>
      </div>

      {/* Last Commit */}
      <div className="border-t border-gray-200 pt-4 responsive-container sm:flex-col md:flex-row lg:grid">
        <h3 className="text-sm font-medium text-gray-700 mb-3 responsive-container sm:flex-col md:flex-row lg:grid">Last Commit</h3>
        <div className="bg-gray-50 rounded-lg p-4 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center justify-between mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
            <span className="text-xs font-mono text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">{status.lastCommitHash}</span>
            <span className="text-xs text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
              {new Date(status.lastCommit).toLocaleString()}
            </span>
          </div>
          <p className="text-sm text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{status.lastCommitMessage}</p>
        </div>
      </div>

      {/* Webhook Status */}
      <div className="border-t border-gray-200 pt-4 mt-4 responsive-container sm:flex-col md:flex-row lg:grid">
        <h3 className="text-sm font-medium text-gray-700 mb-3 responsive-container sm:flex-col md:flex-row lg:grid">Webhook Status</h3>
        <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
            <div
              className={`w-2 h-2 rounded-full ${status.webhookStatus === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}
            ></div>
            <span className="text-sm text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Webhook Active</span>
          </div>
          <span className="text-xs text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
            Last trigger: {new Date(status.lastWebhookTrigger).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="border-t border-gray-200 pt-4 mt-4 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="flex space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
          <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
            View Repository
          </button>
          <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
            View Commits
          </button>
        </div>
      </div>
    </div>
  );
};

export default GitHubWebhookStatusWidget;
