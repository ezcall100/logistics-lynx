import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Building2, UserPlus, Settings, TestTube, FileText,
  X, ChevronUp, ChevronDown
} from 'lucide-react';
import { FABAction } from '../../types';

interface FloatingActionButtonProps {
  onAddCompany: () => void;
  onAddUser: () => void;
  onOpenSettings: () => void;
  onRunSystemCheck: () => void;
  onCreatePortalPlan: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onAddCompany,
  onAddUser,
  onOpenSettings,
  onRunSystemCheck,
  onCreatePortalPlan
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const actions: FABAction[] = [
    {
      id: 'add-company',
      label: 'Add Company',
      icon: 'Building2',
      action: onAddCompany,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      id: 'add-user',
      label: 'Add User',
      icon: 'UserPlus',
      action: onAddUser,
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      id: 'open-settings',
      label: 'Open Settings',
      icon: 'Settings',
      action: onOpenSettings,
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      id: 'run-system-check',
      label: 'Run System Check',
      icon: 'TestTube',
      action: onRunSystemCheck,
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      id: 'create-portal-plan',
      label: 'Create Portal Plan',
      icon: 'FileText',
      action: onCreatePortalPlan,
      color: 'bg-indigo-500 hover:bg-indigo-600'
    }
  ];

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType<any> } = {
      Building2, UserPlus, Settings, TestTube, FileText
    };
    const IconComponent = icons[iconName] || Plus;
    return <IconComponent className="w-5 h-5" />;
  };

  const handleActionClick = (action: FABAction) => {
    action.action();
    setIsExpanded(false);
  };

  if (isMobile) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-16 right-0 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-2"
            >
              {actions.map((action, index) => (
                <motion.button
                  key={action.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleActionClick(action)}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className={`p-3 rounded-xl shadow-lg ${action.color} text-white`}>
                    {getIcon(action.icon)}
                  </div>
                  <span className="text-sm font-medium text-gray-900">{action.label}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="portal-fab w-14 h-14 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center hover:scale-110"
        >
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="plus"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Plus className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action Buttons */}
      <AnimatePresence>
        {isExpanded && (
          <div className="absolute bottom-16 right-0 space-y-3">
            {actions.map((action, index) => (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-3"
              >
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.1 }}
                  className="bg-white px-3 py-1 rounded-full shadow-md text-sm font-medium text-gray-700 whitespace-nowrap"
                >
                  {action.label}
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleActionClick(action)}
                  className={`w-12 h-12 ${action.color} text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center hover:scale-110`}
                >
                  {getIcon(action.icon)}
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="portal-fab w-16 h-16 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center relative overflow-hidden hover:scale-110"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 hover:opacity-100 transition-opacity"
        />
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative z-10"
            >
              <X className="w-7 h-7" />
            </motion.div>
          ) : (
            <motion.div
              key="plus"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative z-10"
            >
              <Plus className="w-7 h-7" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default FloatingActionButton;
