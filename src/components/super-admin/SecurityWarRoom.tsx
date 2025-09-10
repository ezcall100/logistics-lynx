import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Lock, 
  Unlock, 
  Eye, 
  EyeOff, 
  Activity, 
  Users, 
  Globe, 
  Database, 
  Server, 
  Cpu, 
  MemoryStick, 
  Network, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  Target, 
  Search, 
  Filter, 
  Download, 
  Settings, 
  Bell, 
  BellOff, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  RefreshCw, 
  Play, 
  Pause, 
  RotateCcw, 
  Power, 
  PowerOff, 
  ExternalLink, 
  Copy, 
  Share, 
  Star, 
  StarOff, 
  Heart, 
  HeartOff, 
  Wifi, 
  WifiOff, 
  Signal, 
  SignalZero, 
  SignalLow, 
  SignalMedium, 
  SignalHigh
} from 'lucide-react';

interface SecurityThreat {
  id: string;
  type: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  source: string;
  target: string;
  timestamp: string;
  status: 'active' | 'investigating' | 'contained' | 'resolved';
  severity: number;
  impact: string;
  affectedSystems: string[];
  recommendedActions: string[];
  autoResponse: boolean;
}

interface SecurityMetrics {
  totalThreats: number;
  activeThreats: number;
  criticalThreats: number;
  resolvedThreats: number;
  averageResponseTime: number;
  systemSecurityScore: number;
  complianceScore: number;
  lastScanTime: string;
}

interface SecurityEvent {
  id: string;
  type: 'login' | 'access' | 'data' | 'network' | 'system';
  action: string;
  user: string;
  ip: string;
  location: string;
  timestamp: string;
  status: 'success' | 'failed' | 'blocked' | 'suspicious';
  details: string;
}

const SecurityWarRoom: React.FC = () => {
  const [selectedThreat, setSelectedThreat] = useState<SecurityThreat | null>(null);
  const [viewMode, setViewMode] = useState<'threats' | 'events' | 'metrics' | 'response'>('threats');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [alertSound, setAlertSound] = useState(true);

  // Mock data for security threats
  const [threats, setThreats] = useState<SecurityThreat[]>([
    {
      id: 'threat-1',
      type: 'critical',
      title: 'Suspicious Login Attempts',
      description: 'Multiple failed login attempts detected from unusual locations',
      source: '192.168.1.100',
      target: 'Admin Portal',
      timestamp: '2 minutes ago',
      status: 'active',
      severity: 95,
      impact: 'Potential unauthorized access',
      affectedSystems: ['Admin Portal', 'Database Server'],
      recommendedActions: ['Block IP address', 'Enable 2FA', 'Review access logs'],
      autoResponse: true
    },
    {
      id: 'threat-2',
      type: 'high',
      title: 'Data Exfiltration Attempt',
      description: 'Unusual data access patterns detected',
      source: 'Internal User',
      target: 'Customer Database',
      timestamp: '15 minutes ago',
      status: 'investigating',
      severity: 85,
      impact: 'Data breach risk',
      affectedSystems: ['Customer Database', 'API Gateway'],
      recommendedActions: ['Suspend user account', 'Audit data access', 'Notify compliance team'],
      autoResponse: false
    },
    {
      id: 'threat-3',
      type: 'medium',
      title: 'Network Anomaly',
      description: 'Unusual network traffic patterns detected',
      source: 'External IP',
      target: 'Load Balancer',
      timestamp: '1 hour ago',
      status: 'contained',
      severity: 65,
      impact: 'Service disruption risk',
      affectedSystems: ['Load Balancer', 'Web Servers'],
      recommendedActions: ['Monitor traffic', 'Update firewall rules', 'Review network config'],
      autoResponse: true
    }
  ]);

  const [metrics, setMetrics] = useState<SecurityMetrics>({
    totalThreats: 127,
    activeThreats: 3,
    criticalThreats: 1,
    resolvedThreats: 124,
    averageResponseTime: 4.2,
    systemSecurityScore: 94,
    complianceScore: 98,
    lastScanTime: '5 minutes ago'
  });

  const [events, setEvents] = useState<SecurityEvent[]>([
    {
      id: 'event-1',
      type: 'login',
      action: 'Failed Login',
      user: 'admin@company.com',
      ip: '192.168.1.100',
      location: 'New York, US',
      timestamp: '2 minutes ago',
      status: 'failed',
      details: 'Invalid password attempt'
    },
    {
      id: 'event-2',
      type: 'access',
      action: 'Data Access',
      user: 'user@company.com',
      ip: '10.0.0.50',
      location: 'California, US',
      timestamp: '5 minutes ago',
      status: 'success',
      details: 'Accessed customer records'
    },
    {
      id: 'event-3',
      type: 'network',
      action: 'Connection Attempt',
      user: 'Unknown',
      ip: '203.0.113.1',
      location: 'Unknown',
      timestamp: '10 minutes ago',
      status: 'blocked',
      details: 'Blocked by firewall'
    }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setThreats(prevThreats => 
        prevThreats.map(threat => ({
          ...threat,
          severity: Math.max(0, Math.min(100, threat.severity + (Math.random() - 0.5) * 10)),
          timestamp: 'Just now'
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const getThreatColor = (type: string) => {
    switch (type) {
      case 'critical': return 'text-red-500 bg-red-500/20 border-red-500/50';
      case 'high': return 'text-orange-500 bg-orange-500/20 border-orange-500/50';
      case 'medium': return 'text-yellow-500 bg-yellow-500/20 border-yellow-500/50';
      case 'low': return 'text-green-500 bg-green-500/20 border-green-500/50';
      default: return 'text-gray-500 bg-gray-500/20 border-gray-500/50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-red-400 bg-red-400/20';
      case 'investigating': return 'text-yellow-400 bg-yellow-400/20';
      case 'contained': return 'text-blue-400 bg-blue-400/20';
      case 'resolved': return 'text-green-400 bg-green-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getEventStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-400 bg-green-400/20';
      case 'failed': return 'text-red-400 bg-red-400/20';
      case 'blocked': return 'text-orange-400 bg-orange-400/20';
      case 'suspicious': return 'text-yellow-400 bg-yellow-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const filteredThreats = threats.filter(threat => {
    const matchesType = filterType === 'all' || threat.type === filterType;
    const matchesStatus = filterStatus === 'all' || threat.status === filterStatus;
    const matchesSearch = searchQuery === '' || 
      threat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      threat.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesType && matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              🛡️ Security War Room
            </h1>
            <p className="text-gray-300 text-lg">
              Real-time threat detection and security response center
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
              <span className="text-white font-medium">
                {autoRefresh ? 'Live Monitoring' : 'Paused'}
              </span>
            </div>
            <button 
              onClick={() => setAlertSound(!alertSound)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                alertSound ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'
              } text-white`}
            >
              {alertSound ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button 
              onClick={() => setAutoRefresh(!autoRefresh)}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
              <span>{autoRefresh ? 'Pause' : 'Resume'}</span>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex space-x-2 mb-8">
          {[
            { id: 'threats', label: 'Threats', icon: AlertTriangle },
            { id: 'events', label: 'Events', icon: Activity },
            { id: 'metrics', label: 'Metrics', icon: TrendingUp },
            { id: 'response', label: 'Response', icon: Shield }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setViewMode(id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                viewMode === id 
                  ? 'bg-red-600 text-white' 
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Security Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Active Threats</p>
                <p className="text-3xl font-bold text-red-400">{metrics.activeThreats}</p>
                <p className="text-xs text-gray-400">{metrics.criticalThreats} critical</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Security Score</p>
                <p className="text-3xl font-bold text-green-400">{metrics.systemSecurityScore}%</p>
                <p className="text-xs text-gray-400">System health</p>
              </div>
              <Shield className="w-8 h-8 text-green-400" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Response Time</p>
                <p className="text-3xl font-bold text-blue-400">{metrics.averageResponseTime}m</p>
                <p className="text-xs text-gray-400">Average</p>
              </div>
              <Clock className="w-8 h-8 text-blue-400" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Compliance</p>
                <p className="text-3xl font-bold text-purple-400">{metrics.complianceScore}%</p>
                <p className="text-xs text-gray-400">Regulatory</p>
              </div>
              <CheckCircle className="w-8 h-8 text-purple-400" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search threats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">All Types</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="investigating">Investigating</option>
            <option value="contained">Contained</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center space-x-2">
            <Zap className="w-4 h-4" />
            <span>Auto Response</span>
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>Run Scan</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      {viewMode === 'threats' && (
        <div className="space-y-6">
          {filteredThreats.map((threat, index) => (
            <motion.div
              key={threat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedThreat(threat)}
              className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 border ${getThreatColor(threat.type)} hover:scale-105 transition-transform cursor-pointer`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">{threat.title}</h3>
                    <p className="text-sm text-gray-300">{threat.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`px-3 py-1 rounded-full text-xs ${getStatusColor(threat.status)}`}>
                    {threat.status}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white">Severity: {threat.severity}%</p>
                    <p className="text-xs text-gray-400">{threat.timestamp}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-400">Source</p>
                  <p className="text-sm text-white">{threat.source}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Target</p>
                  <p className="text-sm text-white">{threat.target}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Impact</p>
                  <p className="text-sm text-white">{threat.impact}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Affected Systems</p>
                      <p className="text-sm text-white">{threat.affectedSystems.length}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Auto Response</p>
                      <p className="text-sm text-white">{threat.autoResponse ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm">
                      Investigate
                    </button>
                    <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm">
                      Contain
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {viewMode === 'events' && (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-6">Security Events</h3>
          <div className="space-y-3">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                      <Activity className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{event.action}</h4>
                      <p className="text-xs text-gray-400">{event.user} • {event.ip}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className={`px-3 py-1 rounded-full text-xs ${getEventStatusColor(event.status)}`}>
                      {event.status}
                    </div>
                    <span className="text-xs text-gray-400">{event.timestamp}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Threat Detail Modal */}
      <AnimatePresence>
        {selectedThreat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50"
            onClick={() => setSelectedThreat(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-2xl w-full border border-white/20"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedThreat.title}</h3>
                    <p className="text-gray-300">{selectedThreat.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedThreat(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-400">Severity</label>
                    <p className="text-lg font-bold text-red-400">{selectedThreat.severity}%</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Status</label>
                    <div className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(selectedThreat.status)}`}>
                      {selectedThreat.status}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Affected Systems</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedThreat.affectedSystems.map((system, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-red-600/20 text-red-300 rounded-full text-sm"
                      >
                        {system}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Recommended Actions</label>
                  <div className="space-y-2">
                    {selectedThreat.recommendedActions.map((action, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-white">{action}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span>Contain Threat</span>
                  </button>
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>Investigate</span>
                  </button>
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Resolve</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SecurityWarRoom;
