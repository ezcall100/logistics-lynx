import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, Lock, Eye, AlertTriangle, CheckCircle, X, RefreshCw,
  Settings, FileText, Users, Database, Cloud, Bell, TrendingUp,
  BarChart3, Clock, Key, Globe, Server, Activity, Zap
} from 'lucide-react';

/**
 * AI Security & Compliance - AI System Security and Regulatory Compliance
 * Comprehensive security monitoring and compliance management for AI systems
 * Created by MCP 302 Agents
 * Timestamp: 2025-01-20T18:30:00.000Z
 * Features: Security Monitoring, Compliance Tracking, Audit Logs, Risk Assessment
 */

interface SecurityMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  lastChecked: string;
}

interface ComplianceFramework {
  id: string;
  name: string;
  type: 'gdpr' | 'ccpa' | 'sox' | 'hipaa' | 'iso27001' | 'custom';
  status: 'compliant' | 'partial' | 'non-compliant' | 'pending';
  score: number;
  lastAudit: string;
  nextAudit: string;
  requirements: number;
  met: number;
}

interface SecurityAlert {
  id: string;
  type: 'data_breach' | 'unauthorized_access' | 'model_bias' | 'privacy_violation' | 'system_compromise';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  timestamp: string;
  resolved: boolean;
  affectedSystem: string;
}

interface AuditLog {
  id: string;
  action: string;
  user: string;
  resource: string;
  timestamp: string;
  ipAddress: string;
  result: 'success' | 'failure' | 'blocked';
  details: string;
}

interface SecurityStats {
  totalAlerts: number;
  criticalAlerts: number;
  complianceScore: number;
  securityScore: number;
  auditEvents: number;
  dataProtectionLevel: number;
}

const AISecurityCompliance: React.FC = () => {
  const [securityMetrics, setSecurityMetrics] = useState<SecurityMetric[]>([]);
  const [complianceFrameworks, setComplianceFrameworks] = useState<ComplianceFramework[]>([]);
  const [securityAlerts, setSecurityAlerts] = useState<SecurityAlert[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'compliance' | 'alerts' | 'audit'>('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<SecurityStats>({
    totalAlerts: 0,
    criticalAlerts: 0,
    complianceScore: 0,
    securityScore: 0,
    auditEvents: 0,
    dataProtectionLevel: 0
  });
  const [notifications, setNotifications] = useState<{ id: string; type: string; title: string; message: string; timestamp: string }[]>([]);

  // Notification system
  const addNotification = useCallback((type: 'success' | 'error' | 'warning' | 'info', title: string, message: string): void => {
    const notification = {
      id: Date.now().toString(), type, title, message, timestamp: new Date().toISOString()
    };
    setNotifications(prev => [notification, ...prev.slice(0, 4)]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== notification.id)), 5000);
  }, []);

  // Mock data
  useEffect(() => {
    const mockSecurityMetrics: SecurityMetric[] = [
      {
        id: 'metric-1',
        name: 'Data Encryption',
        value: 98.5,
        unit: '%',
        status: 'good',
        trend: 'stable',
        lastChecked: new Date().toISOString()
      },
      {
        id: 'metric-2',
        name: 'Access Control',
        value: 94.2,
        unit: '%',
        status: 'good',
        trend: 'up',
        lastChecked: new Date().toISOString()
      },
      {
        id: 'metric-3',
        name: 'Model Bias Detection',
        value: 87.3,
        unit: '%',
        status: 'warning',
        trend: 'down',
        lastChecked: new Date().toISOString()
      },
      {
        id: 'metric-4',
        name: 'Privacy Protection',
        value: 96.8,
        unit: '%',
        status: 'good',
        trend: 'up',
        lastChecked: new Date().toISOString()
      },
      {
        id: 'metric-5',
        name: 'System Integrity',
        value: 99.1,
        unit: '%',
        status: 'good',
        trend: 'stable',
        lastChecked: new Date().toISOString()
      },
      {
        id: 'metric-6',
        name: 'Threat Detection',
        value: 91.7,
        unit: '%',
        status: 'good',
        trend: 'up',
        lastChecked: new Date().toISOString()
      }
    ];

    const mockComplianceFrameworks: ComplianceFramework[] = [
      {
        id: 'framework-1',
        name: 'GDPR',
        type: 'gdpr',
        status: 'compliant',
        score: 94,
        lastAudit: '2024-11-15',
        nextAudit: '2025-02-15',
        requirements: 25,
        met: 24
      },
      {
        id: 'framework-2',
        name: 'CCPA',
        type: 'ccpa',
        status: 'compliant',
        score: 96,
        lastAudit: '2024-10-20',
        nextAudit: '2025-01-20',
        requirements: 18,
        met: 18
      },
      {
        id: 'framework-3',
        name: 'ISO 27001',
        type: 'iso27001',
        status: 'partial',
        score: 78,
        lastAudit: '2024-09-10',
        nextAudit: '2025-03-10',
        requirements: 42,
        met: 33
      },
      {
        id: 'framework-4',
        name: 'SOX Compliance',
        type: 'sox',
        status: 'compliant',
        score: 92,
        lastAudit: '2024-12-01',
        nextAudit: '2025-06-01',
        requirements: 15,
        met: 15
      }
    ];

    const mockSecurityAlerts: SecurityAlert[] = [
      {
        id: 'alert-1',
        type: 'model_bias',
        severity: 'medium',
        title: 'Potential Bias Detected in Customer Service Model',
        description: 'Model showing 15% higher rejection rate for certain demographic groups',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        resolved: false,
        affectedSystem: 'Customer Service Bot'
      },
      {
        id: 'alert-2',
        type: 'unauthorized_access',
        severity: 'high',
        title: 'Suspicious API Access Pattern',
        description: 'Multiple failed authentication attempts from unusual IP range',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        resolved: false,
        affectedSystem: 'OpenAI Integration'
      },
      {
        id: 'alert-3',
        type: 'privacy_violation',
        severity: 'critical',
        title: 'PII Data Exposure Risk',
        description: 'Model output potentially contains personally identifiable information',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        resolved: true,
        affectedSystem: 'Document Processor'
      },
      {
        id: 'alert-4',
        type: 'system_compromise',
        severity: 'low',
        title: 'Outdated Security Patch',
        description: 'AI model container running on outdated base image',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        resolved: false,
        affectedSystem: 'Route Optimizer'
      }
    ];

    const mockAuditLogs: AuditLog[] = [
      {
        id: 'audit-1',
        action: 'Model Training Data Access',
        user: 'data-scientist@company.com',
        resource: 'Customer Dataset v2',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        ipAddress: '192.168.1.45',
        result: 'success',
        details: 'Accessed training dataset for model retraining'
      },
      {
        id: 'audit-2',
        action: 'API Key Rotation',
        user: 'admin@company.com',
        resource: 'OpenAI Integration',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        ipAddress: '10.0.0.12',
        result: 'success',
        details: 'Successfully rotated API key for enhanced security'
      },
      {
        id: 'audit-3',
        action: 'Model Deployment',
        user: 'ml-engineer@company.com',
        resource: 'Fraud Detection Model',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        ipAddress: '172.16.0.8',
        result: 'success',
        details: 'Deployed new fraud detection model to production'
      },
      {
        id: 'audit-4',
        action: 'Unauthorized Access Attempt',
        user: 'unknown@external.com',
        resource: 'Admin Panel',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        ipAddress: '203.0.113.42',
        result: 'blocked',
        details: 'Failed login attempt with invalid credentials'
      }
    ];

    setSecurityMetrics(mockSecurityMetrics);
    setComplianceFrameworks(mockComplianceFrameworks);
    setSecurityAlerts(mockSecurityAlerts);
    setAuditLogs(mockAuditLogs);
    
    // Calculate stats
    const securityStats: SecurityStats = {
      totalAlerts: mockSecurityAlerts.length,
      criticalAlerts: mockSecurityAlerts.filter(a => a.severity === 'critical' && !a.resolved).length,
      complianceScore: mockComplianceFrameworks.reduce((sum, f) => sum + f.score, 0) / mockComplianceFrameworks.length,
      securityScore: mockSecurityMetrics.reduce((sum, m) => sum + m.value, 0) / mockSecurityMetrics.length,
      auditEvents: mockAuditLogs.length,
      dataProtectionLevel: 95.2
    };
    setStats(securityStats);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
      case 'good':
      case 'success': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'partial':
      case 'warning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'non-compliant':
      case 'critical':
      case 'failure':
      case 'blocked': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'pending': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getSeverityColor = (severity: SecurityAlert['severity']) => {
    switch (severity) {
      case 'low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getFrameworkIcon = (type: ComplianceFramework['type']) => {
    switch (type) {
      case 'gdpr': return Shield;
      case 'ccpa': return Lock;
      case 'sox': return FileText;
      case 'hipaa': return Users;
      case 'iso27001': return Database;
      case 'custom': return Settings;
      default: return Shield;
    }
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    addNotification('success', 'Data Refreshed', 'Security data has been updated');
  };

  const handleResolveAlert = (alertId: string) => {
    setSecurityAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, resolved: true }
        : alert
    ));
    addNotification('success', 'Alert Resolved', 'Security alert has been resolved');
  };

  const formatTimestamp = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-50 dark:bg-slate-900 min-h-screen"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                <Shield className="w-8 h-8 text-red-500 mr-3" />
                AI Security & Compliance
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Monitor AI system security and ensure regulatory compliance
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="p-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
              >
                <RefreshCw className={`w-5 h-5 text-gray-600 dark:text-gray-400 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Security Settings
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Security Score</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.securityScore.toFixed(1)}%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Compliance Score</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.complianceScore.toFixed(1)}%</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Critical Alerts</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.criticalAlerts}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Data Protection</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.dataProtectionLevel}%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <Lock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 mb-6">
          <div className="border-b border-gray-200 dark:border-slate-700">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Security Overview', icon: Shield },
                { id: 'compliance', label: 'Compliance', icon: CheckCircle },
                { id: 'alerts', label: 'Security Alerts', icon: AlertTriangle },
                { id: 'audit', label: 'Audit Logs', icon: FileText }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id as any)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      selectedTab === tab.id
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {selectedTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {securityMetrics.map((metric) => (
                  <motion.div
                    key={metric.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-50 dark:bg-slate-700 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{metric.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                        {metric.status}
                      </span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {metric.value}{metric.unit}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Last checked: {formatTimestamp(metric.lastChecked)}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {selectedTab === 'compliance' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {complianceFrameworks.map((framework) => {
                  const FrameworkIcon = getFrameworkIcon(framework.type);
                  return (
                    <motion.div
                      key={framework.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-50 dark:bg-slate-700 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                            <FrameworkIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">{framework.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{framework.type}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(framework.status)}`}>
                          {framework.status}
                        </span>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-600 dark:text-gray-400">Compliance Score</span>
                            <span className="text-gray-900 dark:text-white">{framework.score}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${
                                framework.score >= 90 ? 'bg-green-500' :
                                framework.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${framework.score}%` }}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Requirements</p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {framework.met}/{framework.requirements}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Next Audit</p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {new Date(framework.nextAudit).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {selectedTab === 'alerts' && (
              <div className="space-y-4">
                {securityAlerts.filter(alert => !alert.resolved).map((alert) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gray-50 dark:bg-slate-700 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                            {alert.severity}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                            {alert.type.replace('_', ' ')}
                          </span>
                          <span className="text-xs text-gray-400">
                            {formatTimestamp(alert.timestamp)}
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{alert.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{alert.description}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Affected System: {alert.affectedSystem}
                        </p>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => handleResolveAlert(alert.id)}
                          className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Resolve
                        </button>
                        <button className="p-1 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {selectedTab === 'audit' && (
              <div className="space-y-4">
                {auditLogs.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(log.result)}`}>
                            {log.result}
                          </span>
                          <span className="text-sm text-gray-900 dark:text-white font-medium">
                            {log.action}
                          </span>
                          <span className="text-xs text-gray-400">
                            {formatTimestamp(log.timestamp)}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">User: </span>
                            <span className="text-gray-900 dark:text-white">{log.user}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">Resource: </span>
                            <span className="text-gray-900 dark:text-white">{log.resource}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">IP: </span>
                            <span className="text-gray-900 dark:text-white">{log.ipAddress}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{log.details}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Notifications */}
        <div className="fixed bottom-6 right-6 z-50 space-y-2">
          <AnimatePresence>
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                className={`p-4 rounded-lg shadow-lg flex items-center space-x-3 ${
                  notification.type === 'success' ? 'bg-green-500 text-white' :
                  notification.type === 'error' ? 'bg-red-500 text-white' :
                  notification.type === 'info' ? 'bg-blue-500 text-white' :
                  'bg-yellow-500 text-white'
                }`}
              >
                {notification.type === 'success' && <CheckCircle className="w-5 h-5" />}
                {notification.type === 'error' && <AlertTriangle className="w-5 h-5" />}
                {notification.type === 'info' && <Bell className="w-5 h-5" />}
                {notification.type === 'warning' && <AlertTriangle className="w-5 h-5" />}
                <div>
                  <h4 className="font-semibold">{notification.title}</h4>
                  <p className="text-sm">{notification.message}</p>
                </div>
                <button onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}>
                  <X className="w-5 h-5" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default AISecurityCompliance;
