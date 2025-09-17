import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Activity, Server, Database, Globe, Cpu, HardDrive, Wifi } from 'lucide-react';

interface SystemStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SystemStatusModal: React.FC<SystemStatusModalProps> = ({ isOpen, onClose }) => {
  const systemMetrics = [
    { name: 'API Response Time', value: '145ms', status: 'excellent', icon: Activity },
    { name: 'Database Performance', value: '99.9%', status: 'excellent', icon: Database },
    { name: 'Server Uptime', value: '99.9%', status: 'excellent', icon: Server },
    { name: 'CDN Performance', value: '98.5%', status: 'good', icon: Globe },
    { name: 'CPU Usage', value: '23%', status: 'excellent', icon: Cpu },
    { name: 'Memory Usage', value: '67%', status: 'good', icon: HardDrive },
    { name: 'Network Latency', value: '12ms', status: 'excellent', icon: Wifi },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 responsive-container sm:flex-col md:flex-row lg:grid"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-slate-700/50 w-full max-w-4xl max-h-[90vh] overflow-hidden responsive-container sm:flex-col md:flex-row lg:grid"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-slate-700/50 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                  <Activity className="w-5 h-5 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 responsive-container sm:flex-col md:flex-row lg:grid">System Status</h2>
                  <p className="text-sm text-gray-600 dark:text-slate-400 responsive-container sm:flex-col md:flex-row lg:grid">Real-time system metrics and performance</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
               aria-label="Button">
                <X className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
                {systemMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/70 dark:bg-slate-700/70 backdrop-blur-sm rounded-xl p-4 border border-gray-200/30 dark:border-slate-600/30 hover:shadow-lg transition-all duration-200 responsive-container sm:flex-col md:flex-row lg:grid"
                  >
                    <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="p-2 bg-gray-100 dark:bg-slate-600 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
                        <metric.icon className="w-5 h-5 text-gray-600 dark:text-slate-300 responsive-container sm:flex-col md:flex-row lg:grid" />
                      </div>
                      <div className="flex-1 responsive-container sm:flex-col md:flex-row lg:grid">
                        <p className="text-sm font-medium text-gray-900 dark:text-slate-100 responsive-container sm:flex-col md:flex-row lg:grid">{metric.name}</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-slate-100 responsive-container sm:flex-col md:flex-row lg:grid">{metric.value}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                        {metric.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Recent Incidents */}
              <div className="mt-8 responsive-container sm:flex-col md:flex-row lg:grid">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Recent Activity</h3>
                <div className="space-y-3 responsive-container sm:flex-col md:flex-row lg:grid">
                  {[
                    { time: '2 hours ago', message: 'Database optimization completed', type: 'success' },
                    { time: '5 hours ago', message: 'CDN cache cleared successfully', type: 'info' },
                    { time: '1 day ago', message: 'Server maintenance completed', type: 'info' },
                  ].map((incident, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50/50 dark:bg-slate-700/50 rounded-xl responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className={`w-2 h-2 rounded-full ${
                        incident.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                      }`}></div>
                      <div className="flex-1 responsive-container sm:flex-col md:flex-row lg:grid">
                        <p className="text-sm text-gray-900 dark:text-slate-100 responsive-container sm:flex-col md:flex-row lg:grid">{incident.message}</p>
                        <p className="text-xs text-gray-500 dark:text-slate-400 responsive-container sm:flex-col md:flex-row lg:grid">{incident.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SystemStatusModal;
