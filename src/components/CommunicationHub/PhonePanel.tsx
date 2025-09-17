import React from 'react';
import { Phone, Video } from 'lucide-react';
import type { PhoneCall } from './types';

interface PhonePanelProps {
  calls: PhoneCall[];
  onStartCall: () => void;
}

export const PhonePanel: React.FC<PhonePanelProps> = ({
  calls,
  onStartCall,
}) => {
  const getCallTypeColor = (type: string) => {
    switch (type) {
      case 'incoming':
        return 'bg-green-400';
      case 'outgoing':
        return 'bg-blue-400';
      case 'missed':
        return 'bg-blue-400';
      default:
        return 'bg-blue-400';
    }
  };

  return (
    <div className="space-y-3 responsive-container sm:flex-col md:flex-row lg:grid">
      <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">
          Phone
        </h3>
        <div className="flex space-x-1 responsive-container sm:flex-col md:flex-row lg:grid">
          <button 
            onClick={onStartCall}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
           aria-label="Button">
            <Phone className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
          </button>
          <button 
            onClick={onStartCall}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
           aria-label="Button">
            <Video className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
          </button>
        </div>
      </div>

      {/* Recent Calls */}
      <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
        {calls.map(call => (
          <div
            key={call.id}
            className="p-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/50 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <div className="flex items-center justify-between mb-1 responsive-container sm:flex-col md:flex-row lg:grid">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">
                {call.contact}
              </span>
              <span className="text-xs text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">{call.time}</span>
            </div>
            <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className={`h-2 w-2 rounded-full ${getCallTypeColor(call.type)}`}></div>
                <span className="text-xs text-gray-600 dark:text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">
                  {call.type}
                </span>
              </div>
              <span className="text-xs text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">{call.duration}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
