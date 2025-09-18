import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Package, 
  Truck, 
  Users, 
  FileText, 
  MessageSquare, 
  X,
  Loader
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FloatingActionButtonProps {
  variant?: 'primary' | 'secondary' | 'minimal';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ 
  variant = 'primary',
  position = 'bottom-right'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'create-load',
      label: 'Create Load',
      icon: Package,
      color: 'from-blue-500 to-indigo-500',
      action: () => {
        setIsLoading(true);
        setTimeout(() => {
          navigate('/operations/loads/create');
          setIsLoading(false);
          setIsOpen(false);
        }, 1000);
      }
    },
    {
      id: 'add-vehicle',
      label: 'Add Vehicle',
      icon: Truck,
      color: 'from-green-500 to-emerald-500',
      action: () => {
        setIsLoading(true);
        setTimeout(() => {
          navigate('/operations/fleet/add');
          setIsLoading(false);
          setIsOpen(false);
        }, 1000);
      }
    },
    {
      id: 'add-driver',
      label: 'Add Driver',
      icon: Users,
      color: 'from-purple-500 to-violet-500',
      action: () => {
        setIsLoading(true);
        setTimeout(() => {
          navigate('/team/members/add');
          setIsLoading(false);
          setIsOpen(false);
        }, 1000);
      }
    },
    {
      id: 'create-report',
      label: 'Create Report',
      icon: FileText,
      color: 'from-yellow-500 to-orange-500',
      action: () => {
        setIsLoading(true);
        setTimeout(() => {
          navigate('/dashboard/reports/create');
          setIsLoading(false);
          setIsOpen(false);
        }, 1000);
      }
    },
    {
      id: 'send-message',
      label: 'Send Message',
      icon: MessageSquare,
      color: 'from-pink-500 to-rose-500',
      action: () => {
        setIsLoading(true);
        setTimeout(() => {
          navigate('/messages/compose');
          setIsLoading(false);
          setIsOpen(false);
        }, 1000);
      }
    }
  ];

  const getPositionStyles = () => {
    switch (position) {
      case 'bottom-right':
        return 'bottom-6 right-6';
      case 'bottom-left':
        return 'bottom-6 left-6';
      case 'top-right':
        return 'top-6 right-6';
      case 'top-left':
        return 'top-6 left-6';
      default:
        return 'bottom-6 right-6';
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700';
      case 'secondary':
        return 'bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50';
      case 'minimal':
        return 'bg-gray-800 hover:bg-gray-700';
      default:
        return 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700';
    }
  };

  return (
    <div className={`fixed ${getPositionStyles()} z-50`}>
      {/* Quick Actions Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="mb-4 space-y-3 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            {quickActions.map((action, index) => (
              <motion.button
                key={action.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={action.action}
                disabled={isLoading}
                className="flex items-center space-x-3 bg-white rounded-lg shadow-lg border border-gray-200 p-3 hover:shadow-xl transition-all duration-200 min-w-[200px] responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <div className={`w-10 h-10 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center`}>
                  <action.icon className="w-5 h-5 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
                </div>
                <div className="text-left responsive-container sm:flex-col md:flex-row lg:grid">
                  <p className="text-sm font-medium text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{action.label}</p>
                  <p className="text-xs text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">Quick action</p>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 ${getVariantStyles()} ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, rotate: -180 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 180 }}
              transition={{ duration: 0.2 }}
            >
              <Loader className="w-6 h-6 text-white animate-spin responsive-container sm:flex-col md:flex-row lg:grid" />
            </motion.div>
          ) : isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -180 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 180 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
            </motion.div>
          ) : (
            <motion.div
              key="plus"
              initial={{ opacity: 0, rotate: -180 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 180 }}
              transition={{ duration: 0.2 }}
            >
              <Plus className="w-6 h-6 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Success/Error Notifications */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border border-gray-200 p-3 min-w-[200px] responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
              <Loader className="w-4 h-4 text-blue-600 animate-spin responsive-container sm:flex-col md:flex-row lg:grid" />
              <span className="text-sm text-gray-700 responsive-container sm:flex-col md:flex-row lg:grid">Processing...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingActionButton;
}