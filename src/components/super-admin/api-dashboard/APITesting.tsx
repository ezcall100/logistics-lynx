import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  Square,
  Save,
  Download,
  Upload,
  Settings,
  CheckCircle,
  AlertTriangle,
  Clock,
  Code,
  Globe,
  Key,
  FileText,
  Plus,
  Trash2,
  Copy,
  RefreshCw,
} from 'lucide-react';

/**
 * API Testing Page - Comprehensive API testing and validation
 * Created by MCP 302 Agents
 * Features: Test execution, validation, reporting, and automation
 */

const APITesting: React.FC = () => {
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<any[]>([]);

  const testSuites = [
    {
      id: '1',
      name: 'Authentication Tests',
      description: 'Test user authentication and authorization',
      status: 'passed',
      tests: 15,
      passed: 15,
      failed: 0,
      duration: '2.3s',
    },
    {
      id: '2',
      name: 'User Management Tests',
      description: 'Test user CRUD operations',
      status: 'passed',
      tests: 12,
      passed: 12,
      failed: 0,
      duration: '1.8s',
    },
    {
      id: '3',
      name: 'Payment Processing Tests',
      description: 'Test payment and transaction APIs',
      status: 'failed',
      tests: 8,
      passed: 6,
      failed: 2,
      duration: '3.1s',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <Play className="w-8 h-8 text-cyan-500 mr-3" />
            API Testing
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Test, validate, and ensure API reliability and performance
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            New Test Suite
          </button>
        </div>
      </div>

      {/* Test Suites */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testSuites.map((suite) => (
          <div key={suite.id} className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{suite.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{suite.description}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                suite.status === 'passed' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                {suite.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Tests</span>
                <span className="text-gray-900 dark:text-white">{suite.tests}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Passed</span>
                <span className="text-green-600 dark:text-green-400">{suite.passed}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Failed</span>
                <span className="text-red-600 dark:text-red-400">{suite.failed}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Duration</span>
                <span className="text-gray-900 dark:text-white">{suite.duration}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-slate-700 mt-4">
              <button className="text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300">
                <Play className="w-4 h-4" />
              </button>
              <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                <Settings className="w-4 h-4" />
              </button>
              <button className="text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <Copy className="w-4 h-4" />
              </button>
              <button className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Test Results */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Test Results</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">POST /api/v1/users</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">User creation test</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">245ms</span>
              <span className="text-sm text-green-600 dark:text-green-400">PASSED</span>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">GET /api/v1/payments/{id}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Payment retrieval test</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">1.2s</span>
              <span className="text-sm text-red-600 dark:text-red-400">FAILED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APITesting;
