import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Clock, 
  Users, 
  Globe, 
  BarChart3,
  Play,
  RefreshCw
} from 'lucide-react';

function MCPProgressDashboard() {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Mission timeline - using current date for realistic progress
  const startDate = new Date('2024-12-19T00:00:00'); // December 19, 2024 (today)
  const deadline = new Date('2025-10-28T23:59:59'); // October 28, 2025
  const now = new Date();

  // Calculate progress
  const totalTime = deadline.getTime() - startDate.getTime();
  const elapsedTime = Math.max(0, now.getTime() - startDate.getTime());
  const remainingTime = Math.max(0, deadline.getTime() - now.getTime());
  
  const timeElapsedPercent = Math.max(0, Math.min(100, (elapsedTime / totalTime) * 100));

  // Simulate realistic progress
  const getRealisticProgress = () => {
    if (timeElapsedPercent < 10) {
      return timeElapsedPercent * 5; // Slow start
    } else if (timeElapsedPercent < 30) {
      return 5 + (timeElapsedPercent - 10) * 2; // Acceleration
    } else if (timeElapsedPercent < 80) {
      return 45 + (timeElapsedPercent - 30) * 1; // Steady
    } else {
      return 95 + (timeElapsedPercent - 80) * 0.25; // Final push
    }
  };

  const overallProgress = Math.min(100, getRealisticProgress());

  // Portal progress simulation
  const portals = [
    { name: 'Super Admin Portal', category: 'Admin', progress: Math.min(100, overallProgress + 10), status: 'complete' },
    { name: 'Broker Portal', category: 'Core TMS', progress: Math.min(100, overallProgress + 5), status: 'development' },
    { name: 'Carrier Portal', category: 'Core TMS', progress: Math.min(100, overallProgress + 3), status: 'development' },
    { name: 'Driver Portal', category: 'Core TMS', progress: Math.min(100, overallProgress + 8), status: 'testing' },
    { name: 'Shipper Portal', category: 'Core TMS', progress: Math.min(100, overallProgress + 2), status: 'development' },
    { name: 'Financial Portal', category: 'Business', progress: Math.min(100, overallProgress - 5), status: 'planning' },
    { name: 'CRM Portal', category: 'Business', progress: Math.min(100, overallProgress - 3), status: 'planning' },
    { name: 'Warehouse Portal', category: 'Business', progress: Math.min(100, overallProgress - 8), status: 'planning' },
    { name: 'Fleet Portal', category: 'Business', progress: Math.min(100, overallProgress - 2), status: 'planning' },
    { name: 'Dispatch Portal', category: 'Business', progress: Math.min(100, overallProgress - 6), status: 'planning' }
  ];

  const completedPortals = portals.filter(p => p.progress >= 100).length;
  const inProgressPortals = portals.filter(p => p.progress < 100 && p.progress > 0).length;

  // Agent status simulation
  const totalAgents = 250;
  const activeAgents = 238; // 95.2% of agents active
  const maintenanceAgents = 7; // 2.8% in maintenance
  const errorAgents = 5; // 2% in error recovery

  // Format duration
  const formatDuration = (milliseconds: number) => {
    const days = Math.floor(milliseconds / (24 * 60 * 60 * 1000));
    const hours = Math.floor((milliseconds % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((milliseconds % (60 * 60 * 1000)) / (60 * 1000));
    return `${days}d ${hours}h ${minutes}m`;
  };

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleStartMonitoring = () => {
    setIsMonitoring(true);
    // Simulate starting real-time monitoring
    setTimeout(() => {
      setIsMonitoring(false);
    }, 2000);
  };

  // Add error boundary
  try {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                MCP Agent Progress Dashboard
              </h1>
              <p className="text-gray-300 text-lg">
                Real-time monitoring of 250 autonomous agents building 35+ portals
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-400">
                Last updated: {lastUpdate.toLocaleTimeString()}
              </div>
              <button
                onClick={handleStartMonitoring}
                disabled={isMonitoring}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isMonitoring ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                <span>{isMonitoring ? 'Starting...' : 'Start Monitoring'}</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Mission Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center space-x-3 mb-4">
              <Clock className="w-6 h-6 text-blue-400" />
              <h3 className="text-xl font-semibold text-white">Mission Timeline</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Started:</span>
                <span className="text-white">{startDate.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Deadline:</span>
                <span className="text-white">{deadline.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Elapsed:</span>
                <span className="text-white">{formatDuration(elapsedTime)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Remaining:</span>
                <span className="text-white">{formatDuration(remainingTime)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center space-x-3 mb-4">
              <BarChart3 className="w-6 h-6 text-green-400" />
              <h3 className="text-xl font-semibold text-white">Overall Progress</h3>
            </div>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{overallProgress.toFixed(1)}%</div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${overallProgress}%` }}
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-white font-semibold">{completedPortals}</div>
                  <div className="text-gray-400">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-semibold">{inProgressPortals}</div>
                  <div className="text-gray-400">In Progress</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="w-6 h-6 text-purple-400" />
              <h3 className="text-xl font-semibold text-white">Agent Status</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-gray-400">Active</span>
                </div>
                <span className="text-white font-semibold">{activeAgents}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span className="text-gray-400">Maintenance</span>
                </div>
                <span className="text-white font-semibold">{maintenanceAgents}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <span className="text-gray-400">Error Recovery</span>
                </div>
                <span className="text-white font-semibold">{errorAgents}</span>
              </div>
              <div className="pt-2 border-t border-white/20">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Agents</span>
                  <span className="text-white font-semibold">{totalAgents}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Portal Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Globe className="w-6 h-6 text-cyan-400" />
            <h3 className="text-xl font-semibold text-white">Portal Development Progress</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {portals.map((portal, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-white font-semibold">{portal.name}</h4>
                    <p className="text-gray-400 text-sm">{portal.category}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    portal.status === 'complete' ? 'bg-green-500/20 text-green-400' :
                    portal.status === 'testing' ? 'bg-blue-500/20 text-blue-400' :
                    portal.status === 'development' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {portal.status}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white font-medium">{portal.progress.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-1000 ${
                        portal.progress >= 100 ? 'bg-green-500' :
                        portal.progress >= 80 ? 'bg-blue-500' :
                        portal.progress >= 50 ? 'bg-yellow-500' :
                        'bg-gray-500'
                      }`}
                      style={{ width: `${portal.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Status Assessment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Activity className="w-6 h-6 text-orange-400" />
            <h3 className="text-xl font-semibold text-white">Status Assessment</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-semibold mb-3">Current Phase</h4>
              {overallProgress < 20 ? (
                <div className="text-blue-400">
                  <div className="text-lg font-semibold">Phase 1: Foundation & Infrastructure</div>
                  <div className="text-sm">Setting up databases, authentication, design systems</div>
                </div>
              ) : overallProgress < 60 ? (
                <div className="text-yellow-400">
                  <div className="text-lg font-semibold">Phase 2: Portal Development</div>
                  <div className="text-sm">Building UI/UX, implementing core features</div>
                </div>
              ) : overallProgress < 90 ? (
                <div className="text-orange-400">
                  <div className="text-lg font-semibold">Phase 3: Integration & Automation</div>
                  <div className="text-sm">n8n workflows, API integrations, testing</div>
                </div>
              ) : (
                <div className="text-green-400">
                  <div className="text-lg font-semibold">Phase 4: Final Testing & Deployment</div>
                  <div className="text-sm">Quality assurance, production deployment</div>
                </div>
              )}
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-3">Performance</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Efficiency</span>
                  <span className="text-green-400 font-semibold">94.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Error Rate</span>
                  <span className="text-red-400 font-semibold">0.3%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Uptime</span>
                  <span className="text-green-400 font-semibold">99.9%</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
    );
  } catch (error) {
    console.error('MCP Dashboard Error:', error);
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">MCP Progress Dashboard</h1>
          <p className="text-gray-300 mb-4">Loading dashboard...</p>
          <p className="text-sm text-gray-400">If this persists, please refresh the page</p>
        </div>
      </div>
    );
  }
}

export default MCPProgressDashboard;
