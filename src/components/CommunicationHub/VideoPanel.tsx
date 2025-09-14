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
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          Video Calls
        </h3>
        <button 
          onClick={onStartVideoCall}
          className="px-3 py-1 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Video className="h-3 w-3 inline mr-1" />
          Start Call
        </button>
      </div>

      {/* Video Meetings */}
      <div className="space-y-2">
        {meetings.map(meeting => (
          <div
            key={meeting.id}
            className="p-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/50"
          >
            <div className="flex items-center space-x-2 mb-2">
              <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <Video className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {meeting.title}
                </p>
                <p className="text-xs text-gray-500">
                  {meeting.participants} participants • {meeting.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Meeting */}
      <div className="p-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/50">
        <div className="flex items-center space-x-2 mb-2">
          <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
            <Video className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Team Meeting
            </p>
            <p className="text-xs text-gray-500">Starting in 5 minutes</p>
          </div>
        </div>
      </div>
    </div>
  );
};
