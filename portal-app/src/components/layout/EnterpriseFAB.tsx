import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Plus, 
  Building2, 
  Users, 
  Globe, 
  Activity, 
  Lock, 
  X
} from 'lucide-react';

interface FABAction {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  action: () => void;
  shortcut?: string;
}

interface EnterpriseFABProps {
  onAction: (actionId: string) => void;
  isMobile?: boolean;
}

const EnterpriseFAB: React.FC<EnterpriseFABProps> = ({ onAction, isMobile = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);
  const fabRef = useRef<HTMLDivElement>(null);

  const actions: FABAction[] = [
    {
      id: 'add-company',
      label: 'Add Company',
      icon: Building2,
      color: 'from-blue-500 to-blue-600',
      action: () => onAction('add-company'),
      shortcut: 'C',
    },
    {
      id: 'add-user',
      label: 'Add User',
      icon: Users,
      color: 'from-green-500 to-green-600',
      action: () => onAction('add-user'),
      shortcut: 'U',
    },
    {
      id: 'create-portal',
      label: 'Create Portal',
      icon: Globe,
      color: 'from-purple-500 to-purple-600',
      action: () => onAction('create-portal'),
      shortcut: 'P',
    },
    {
      id: 'system-check',
      label: 'System Check',
      icon: Activity,
      color: 'from-orange-500 to-orange-600',
      action: () => onAction('system-check'),
      shortcut: 'S',
    },
    {
      id: 'maintenance-mode',
      label: 'Maintenance Mode',
      icon: Lock,
      color: 'from-red-500 to-red-600',
      action: () => onAction('maintenance-mode'),
      shortcut: 'M',
    },
  ];

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (fabRef.current && !fabRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      ) => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      ) => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleActionClick = (action: FABAction) => {
    action.action();
    setIsOpen(false);
  };

  const toggleFAB = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div
      ref={fabRef}
      className={`fixed z-50 ${isMobile ? 'bottom-20 right-4' : 'bottom-6 right-6'}`}
    >
      {/* Action Items */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 space-y-3 responsive-container sm:flex-col md:flex-row lg:grid">
          {actions.map((action, index) => (
            <div
              key={action.id}
              className="flex items-center space-x-3 animate-fade-in responsive-container sm:flex-col md:flex-row lg:grid"
              style={{
                animationDelay: `${index * 50}ms`,
                animationFillMode: 'both',
              }}
            >
              {/* Label */}
              <div
                className={`
                  px-3 py-2 glass rounded-lg border border-border/50 shadow-lg
                  transition-all duration-200 transform
                  ${hoveredAction === action.id ? 'scale-105 opacity-100' : 'opacity-0 scale-95'}
                `}
              >
                <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <span className="text-sm font-medium text-text-primary whitespace-nowrap responsive-container sm:flex-col md:flex-row lg:grid">
                    {action.label}
                  </span>
                  {action.shortcut && (
                    <kbd className="px-1.5 py-0.5 text-xs bg-surface border border-border/50 rounded text-text-tertiary responsive-container sm:flex-col md:flex-row lg:grid">
                      {action.shortcut}
                    </kbd>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() = aria-label="Button"> handleActionClick(action)}
                onMouseEnter={() => setHoveredAction(action.id)}
                onMouseLeave={() => setHoveredAction(null)}
                className={`
                  w-12 h-12 bg-gradient-to-r ${action.color} text-white rounded-full
                  shadow-lg hover:shadow-xl transition-all duration-200 transform
                  hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50
                  flex items-center justify-center
                `}
                aria-label={action.label}
              >
                <action.icon className="w-5 h-5 responsive-container sm:flex-col md:flex-row lg:grid" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Main FAB Button */}
      <button
        onClick={toggleFAB}
        className={`
          w-14 h-14 bg-gradient-to-r from-primary-500 via-accent-500 to-info-500
          text-white rounded-full shadow-lg hover:shadow-xl
          transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-white/50
          flex items-center justify-center
          ${isOpen ? 'rotate-45 scale-110' : 'hover:scale-105'}
        `}
        aria-label={isOpen ? 'Close actions' : 'Open actions'}
       aria-label="Button">
        {isOpen ? (
          <X className="w-6 h-6 responsive-container sm:flex-col md:flex-row lg:grid" />
        ) : (
          <Plus className="w-6 h-6 responsive-container sm:flex-col md:flex-row lg:grid" />
        )}
      </button>

      {/* Pulse Animation */}
      {!isOpen && (
        <div className="absolute inset-0 w-14 h-14 bg-gradient-to-r from-primary-500 via-accent-500 to-info-500 rounded-full animate-ping opacity-20 responsive-container sm:flex-col md:flex-row lg:grid"></div>
      )}
    </div>
  );
};

export default EnterpriseFAB;
