import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Code,
  TestTube,
  Rocket,
  Bug} from 'lucide-react';
import PortalUpdateSystem, { PortalUpdate, AgentActivity } from '../utils/PortalUpdateSystem';

interface RealTimePortalStatusProps {
  portalId: string;
  className?: string;
}

const RealTimePortalStatus: React.FC<RealTimePortalStatusProps> = ({
  portalId,
  className = ''}) => {
  const [portalUpdate, setPortalUpdate] = useState<PortalUpdate | null>(null);
  const [agentActivities, setAgentActivities] = useState<AgentActivity[]>([]);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const updateSystem = PortalUpdateSystem.getInstance();

    // Subscribe to portal updates
    const unsubscribe = updateSystem.subscribe(portalId, update => {
      setPortalUpdate(update);
    });

    // Get initial data
    const initialUpdate = updateSystem.getPortalUpdate(portalId);
    if (initialUpdate) {
      setPortalUpdate(initialUpdate);
    }

    // Update agent activities
    const updateActivities = () => {
      const activities = updateSystem.getAgentActivities();
      setAgentActivities(activities.filter(activity => activity.portalId === portalId));
    };

    updateActivities();
    const activityInterval = setInterval(updateActivities, 3000);

    return (
    ) => {
      unsubscribe();
      clearInterval(activityInterval);
    };
  }, [portalId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete':
        return 'text-green-400';
      case 'testing':
        return 'text-blue-400';
      case 'development':
        return 'text-yellow-400';
      case 'deployment':
        return 'text-purple-400';
      case 'planning':
        return 'text-gray-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return <CheckCircle className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'testing':
        return <TestTube className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'development':
        return <Code className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'deployment':
        return <Rocket className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'planning':
        return <Clock className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
      default:
        return <Clock className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent':
        return 'text-green-400';
      case 'good':
        return 'text-blue-400';
      case 'warning':
        return 'text-yellow-400';
      case 'critical':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getHealthIcon = (health: string) => {
    switch (health) {
      case 'excellent':
        return <CheckCircle className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'good':
        return <CheckCircle className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'critical':
        return <XCircle className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
      default:
        return <AlertCircle className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />;
    }
  };

  if (!portalUpdate) {
    return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
      <div
        className={`bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20 ${className}`}
      >
        <div className="flex items-center gap-3 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="w-3 h-3 bg-gray-400 rounded-full animate-pulse responsive-container sm:flex-col md:flex-row lg:grid"></div>
          <span className="text-white/70 responsive-container sm:flex-col md:flex-row lg:grid">Connecting to MCP agents...</span>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className={`bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-white/20 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center gap-3 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse responsive-container sm:flex-col md:flex-row lg:grid"></div>
            <h3 className="text-lg font-semibold text-white responsive-container sm:flex-col md:flex-row lg:grid">MCP Agent Status</h3>
          </div>
          <button
            onClick={() => setShowDetails(!showDetails)}
            aria-label="Button"
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <Activity className="w-4 h-4 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
          </button>
        </div>
      </div>

      {/* Main Status */}
      <div className="p-4 space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-sm text-white/70 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
            <span>Development Progress</span>
            <span>{portalUpdate.progress}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2 responsive-container sm:flex-col md:flex-row lg:grid">
            <motion.div
              className="bg-gradient-to-r from-orange-500 to-red-600 h-2 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"
              initial={{ width: 0 }}
              animate={{ width: `${portalUpdate.progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Status Info */}
        <div className="grid grid-cols-2 gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
            {getStatusIcon(portalUpdate.status)}
            <span className={`text-sm font-medium ${getStatusColor(portalUpdate.status)}`}>
              {portalUpdate.status.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
            {getHealthIcon(portalUpdate.health)}
            <span className={`text-sm font-medium ${getHealthColor(portalUpdate.health)}`}>
              {portalUpdate.health.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Agent Count */}
        <div className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
          <Users className="w-4 h-4 text-white/70 responsive-container sm:flex-col md:flex-row lg:grid" />
          <span className="text-sm text-white/70 responsive-container sm:flex-col md:flex-row lg:grid">
            {portalUpdate.agentsAssigned} MCP agents assigned
          </span>
        </div>

        {/* Last Update */}
        <div className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
          <Clock className="w-4 h-4 text-white/70 responsive-container sm:flex-col md:flex-row lg:grid" />
          <span className="text-sm text-white/70 responsive-container sm:flex-col md:flex-row lg:grid">
            Last update: {portalUpdate.lastUpdate.toLocaleTimeString()}
          </span>
        </div>

        {/* Blockers */}
        {portalUpdate.blockers.length > 0 && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center gap-2 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
              <AlertCircle className="w-4 h-4 text-red-400 responsive-container sm:flex-col md:flex-row lg:grid" />
              <span className="text-sm font-medium text-red-400 responsive-container sm:flex-col md:flex-row lg:grid">Active Blockers</span>
            </div>
            <ul className="text-xs text-red-300 space-y-1 responsive-container sm:flex-col md:flex-row lg:grid">
              {portalUpdate.blockers.map((blocker, index) => (
                <li key={index}>• {blocker}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Detailed View */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-white/20 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <div className="p-4 space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
              {/* Recent Changes */}
              <div>
                <h4 className="text-sm font-medium text-white/70 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Recent Changes</h4>
                <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  {portalUpdate.changes.slice(0, 3).map(change => (
                    <div key={change.id} className="flex items-center gap-2 text-xs responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="w-2 h-2 bg-green-400 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"></div>
                      <span className="text-white/70 responsive-container sm:flex-col md:flex-row lg:grid">{change.description}</span>
                      <span className="text-white/50 ml-auto responsive-container sm:flex-col md:flex-row lg:grid">
                        {change.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Agent Activities */}
              <div>
                <h4 className="text-sm font-medium text-white/70 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Live Agent Activities</h4>
                <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  {agentActivities.slice(0, 3).map((activity, index) => (
                    <motion.div
                      key={`${activity.agentId}-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2 text-xs responsive-container sm:flex-col md:flex-row lg:grid"
                    >
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse responsive-container sm:flex-col md:flex-row lg:grid"></div>
                      <span className="text-white/70 responsive-container sm:flex-col md:flex-row lg:grid">{activity.activity}</span>
                      <span className="text-white/50 ml-auto responsive-container sm:flex-col md:flex-row lg:grid">
                        {activity.efficiency.toFixed(0)}% efficiency
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* 360-Degree Integration Controls */}
              <div className="pt-2 border-t border-white/20 responsive-container sm:flex-col md:flex-row lg:grid">
                <h4 className="text-sm font-medium text-white/70 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  360° Integration Controls
                </h4>
                <div className="grid grid-cols-2 gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <button className="flex items-center gap-2 p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-colors text-xs responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                    <TestTube className="w-3 h-3 responsive-container sm:flex-col md:flex-row lg:grid" />
                    Test Portal
                  </button>
                  <button className="flex items-center gap-2 p-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg transition-colors text-xs responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                    <Rocket className="w-3 h-3 responsive-container sm:flex-col md:flex-row lg:grid" />
                    Deploy
                  </button>
                  <button className="flex items-center gap-2 p-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg transition-colors text-xs responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                    <Code className="w-3 h-3 responsive-container sm:flex-col md:flex-row lg:grid" />
                    Redesign
                  </button>
                  <button className="flex items-center gap-2 p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors text-xs responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                    <Bug className="w-3 h-3 responsive-container sm:flex-col md:flex-row lg:grid" />
                    Fix Bugs
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RealTimePortalStatus;
}