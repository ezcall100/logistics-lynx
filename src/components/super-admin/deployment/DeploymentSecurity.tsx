import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Lock,
  AlertTriangle,
  CheckCircle,
  Eye,
  Settings,
  Filter,
  Search,
  BarChart3,
  Activity,
  Server,
  Database,
  Globe,
  Zap,
  TrendingUp,
  TrendingDown,
  Bell,
  ExternalLink,
  Copy,
  Trash2,
  Edit,
  Plus,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Save,
  X,
  Info,
  Warning,
  Download,
  Upload,
  RefreshCw,
  Target,
  Gauge,
  Timer,
  Users,
  Calendar,
  MapPin,
  Cpu,
  HardDrive,
  Wifi,
  Clock
} from 'lucide-react';

const DeploymentSecurity: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const TabButton = ({ id, label, icon: Icon, isActive }: { id: string; label: string; icon: React.ComponentType<{ className?: string }>; isActive: boolean }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
        isActive
          ? 'bg-blue-600 text-white'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Deployment Security</h1>
                <p className="text-gray-600 dark:text-gray-400">Secure deployment processes and compliance management</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">Security Score</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">98.5%</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Excellent</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div className="flex space-x-2 mb-6">
            <TabButton id="overview" label="Overview" icon={BarChart3} isActive={activeTab === 'overview'} />
            <TabButton id="compliance" label="Compliance" icon={Shield} isActive={activeTab === 'compliance'} />
            <TabButton id="vulnerabilities" label="Vulnerabilities" icon={AlertTriangle} isActive={activeTab === 'vulnerabilities'} />
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Security Score</p>
                      <p className="text-2xl font-bold text-green-600">98.5%</p>
                    </div>
                    <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                      <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Vulnerabilities</p>
                      <p className="text-2xl font-bold text-red-600">2</p>
                    </div>
                    <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                      <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Compliance</p>
                      <p className="text-2xl font-bold text-blue-600">100%</p>
                    </div>
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeploymentSecurity;
