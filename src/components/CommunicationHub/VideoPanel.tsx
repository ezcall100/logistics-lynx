import React from 'react';
import { Video } from 'lucide-react';
import type { VideoMeeting } from './types';

interface VideoPanelProps {
  meetings: VideoMeeting[];
  onStartVideoCall: () => void;
}

export const VideoPanel: React.FC<VideoPanelProps> = ({
  meetings,
  onStartVideoCall,
}) => {
  return (
    <div className="space-y-3 responsive-container sm:flex-col md:flex-row lg:grid">
      <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">
          Video Calls
        </h3>
        <button 
          onClick={onStartVideoCall}
          className="px-3 py-1 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
         aria-label="Button">
          <Video className="h-3 w-3 inline mr-1 responsive-container sm:flex-col md:flex-row lg:grid" />
          Start Call
        </button>
      </div>

      {/* Video Meetings */}
      <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
        {meetings.map(meeting => (
          <div
            key={meeting.id}
            className="p-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/50 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <div className="flex items-center space-x-2 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                <Video className="h-4 w-4 text-blue-600 responsive-container sm:flex-col md:flex-row lg:grid" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">
                  {meeting.title}
                </p>
                <p className="text-xs text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
                  {meeting.participants} participants • {meeting.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Meeting */}
      <div className="p-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/50 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="flex items-center space-x-2 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
            <Video className="h-4 w-4 text-blue-600 responsive-container sm:flex-col md:flex-row lg:grid" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">
              Team Meeting
            </p>
            <p className="text-xs text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">Starting in 5 minutes</p>
          </div>
        </div>
      </div>
    </div>
  );
};
