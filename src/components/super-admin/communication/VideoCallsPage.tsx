import React, { useState, useRef, useEffect } from 'react';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  Volume2,
  Settings,
  Users,
  UserPlus,
  MessageCircle,
  Maximize2,
  Minimize2,
  Monitor,
  CameraOff,
  Wifi,
  Signal,
  Battery,
  Clock,
  Star,
  Bookmark,
  Search,
  RotateCw,
  Square,
} from 'lucide-react';

interface VideoCall {
  id: string;
  title: string;
  participants: Participant[];
  startTime: Date;
  duration: number;
  isRecording: boolean;
  isScreenSharing: boolean;
  isActive: boolean;
  meetingId: string;
  passcode?: string;
  type: 'instant' | 'scheduled' | 'recurring';
  quality: 'HD' | 'SD' | '4K';
  maxParticipants: number;
}

interface Participant {
  id: string;
  name: string;
  avatar: string;
  email: string;
  isVideoOn: boolean;
  isAudioOn: boolean;
  isScreenSharing: boolean;
  isHost: boolean;
  isModerator: boolean;
  joinTime: Date;
  connectionQuality: 'excellent' | 'good' | 'fair' | 'poor';
  device: 'desktop' | 'mobile' | 'tablet';
  location?: string;
}

interface ScheduledMeeting {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  participants: string[];
  meetingId: string;
  passcode?: string;
  isRecurring: boolean;
  recurrencePattern?: string;
  status: 'upcoming' | 'live' | 'ended' | 'cancelled';
  hostId: string;
  hostName: string;
}

const VideoCallsPage: React.FC = () => {
  const [activeCall, setActiveCall] = useState<VideoCall | null>(null);
  const [selectedMeeting, setSelectedMeeting] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'live' | 'scheduled' | 'history'>('live');
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const callTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Mock data
  const liveCalls: VideoCall[] = [
    {
      id: '1',
      title: 'Team Standup Meeting',
      participants: [
        {
          id: 'p1',
          name: 'John Doe',
          avatar: 'JD',
          email: 'john@example.com',
          isVideoOn: true,
          isAudioOn: true,
          isScreenSharing: false,
          isHost: true,
          isModerator: true,
          joinTime: new Date(Date.now() - 15 * 60 * 1000),
          connectionQuality: 'excellent',
          device: 'desktop',
          location: 'New York, NY'
        },
        {
          id: 'p2',
          name: 'Sarah Wilson',
          avatar: 'SW',
          email: 'sarah@example.com',
          isVideoOn: true,
          isAudioOn: true,
          isScreenSharing: false,
          isHost: false,
          isModerator: false,
          joinTime: new Date(Date.now() - 10 * 60 * 1000),
          connectionQuality: 'good',
          device: 'mobile',
          location: 'San Francisco, CA'
        },
        {
          id: 'p3',
          name: 'Mike Johnson',
          avatar: 'MJ',
          email: 'mike@example.com',
          isVideoOn: false,
          isAudioOn: true,
          isScreenSharing: false,
          isHost: false,
          isModerator: false,
          joinTime: new Date(Date.now() - 5 * 60 * 1000),
          connectionQuality: 'fair',
          device: 'tablet',
          location: 'Chicago, IL'
        }
      ],
      startTime: new Date(Date.now() - 20 * 60 * 1000),
      duration: 1200,
      isRecording: true,
      isScreenSharing: false,
      isActive: true,
      meetingId: '123-456-789',
      quality: 'HD',
      maxParticipants: 100,
      type: 'scheduled'
    }
  ];

  const scheduledMeetings: ScheduledMeeting[] = [
    {
      id: 'm1',
      title: 'Client Presentation',
      description: 'Q4 Results and 2024 Strategy',
      startTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
      endTime: new Date(Date.now() + 3 * 60 * 60 * 1000),
      participants: ['client1@company.com', 'client2@company.com', 'team@ourcompany.com'],
      meetingId: '987-654-321',
      passcode: '123456',
      isRecurring: false,
      status: 'upcoming',
      hostId: 'h1',
      hostName: 'You'
    },
    {
      id: 'm2',
      title: 'Weekly Team Sync',
      description: 'Regular team alignment meeting',
      startTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
      endTime: new Date(Date.now() + 25 * 60 * 60 * 1000),
      participants: ['team@ourcompany.com'],
      meetingId: '456-789-123',
      isRecurring: true,
      recurrencePattern: 'weekly',
      status: 'upcoming',
      hostId: 'h1',
      hostName: 'You'
    }
  ];

  const currentCall = liveCalls.find(call => call.id === selectedMeeting);

  useEffect(() => {
    if (currentCall && currentCall.isActive) {
      callTimerRef.current = setInterval(() => {
        // Update call duration
      }, 1000);
    } else {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
    }

    return () => {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
    };
  }, [currentCall]);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 0) return 'Started';
    if (minutes < 60) return `in ${minutes}m`;
    if (hours < 24) return `in ${hours}h`;
    if (days < 7) return `in ${days}d`;
    return date.toLocaleDateString();
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'fair': return 'bg-yellow-500';
      case 'poor': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handleJoinCall = (call: VideoCall) => {
    setSelectedMeeting(call.id);
    setActiveCall(call);
  };

  const handleStartMeeting = () => {
    const newCall: VideoCall = {
      id: `call-${Date.now()}`,
      title: 'Instant Meeting',
      participants: [
        {
          id: 'me',
          name: 'You',
          avatar: 'YO',
          email: 'you@company.com',
          isVideoOn: true,
          isAudioOn: true,
          isScreenSharing: false,
          isHost: true,
          isModerator: true,
          joinTime: new Date(),
          connectionQuality: 'excellent',
          device: 'desktop'
        }
      ],
      startTime: new Date(),
      duration: 0,
      isRecording: false,
      isScreenSharing: false,
      isActive: true,
      meetingId: Math.random().toString().substr(2, 9),
      quality: 'HD',
      maxParticipants: 100,
      type: 'instant'
    };
    setActiveCall(newCall);
  };

  const handleEndCall = () => {
    setActiveCall(null);
    setSelectedMeeting(null);
  };

  const handleToggleVideo = () => {
    setActiveCall(prev => {
      if (!prev) return null;
      return {
        ...prev,
        participants: prev.participants.map(p => 
          p.id === 'me' ? { ...p, isVideoOn: !p.isVideoOn } : p
        )
      };
    });
  };

  const handleToggleAudio = () => {
    setActiveCall(prev => {
      if (!prev) return null;
      return {
        ...prev,
        participants: prev.participants.map(p => 
          p.id === 'me' ? { ...p, isAudioOn: !p.isAudioOn } : p
        )
      };
    });
  };

  const handleToggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    setActiveCall(prev => {
      if (!prev) return null;
      return {
        ...prev,
        isScreenSharing: !prev.isScreenSharing,
        participants: prev.participants.map(p => 
          p.id === 'me' ? { ...p, isScreenSharing: !prev.isScreenSharing } : p
        )
      };
    });
  };

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    setActiveCall(prev => {
      if (!prev) return null;
      return { ...prev, isRecording: !prev.isRecording };
    });
  };

  return (
    <div className="h-full flex bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
        sidebarCollapsed ? 'w-16' : 'w-80'
      } flex flex-col`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                  <Video className="w-6 h-6 text-blue-500" />
                  <span>Video Calls</span>
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Video conferencing & meetings</p>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              {sidebarCollapsed ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* View Mode Tabs */}
        {!sidebarCollapsed && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              {[
                { id: 'live', label: 'Live', icon: Video },
                { id: 'scheduled', label: 'Scheduled', icon: Clock },
                { id: 'history', label: 'History', icon: Bookmark },
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setViewMode(mode.id as 'grid' | 'list' | 'timeline')}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    viewMode === mode.id
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <mode.icon className="w-4 h-4" />
                  <span>{mode.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        {!sidebarCollapsed && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="space-y-2">
              <button
                onClick={handleStartMeeting}
                className="w-full flex items-center justify-center space-x-2 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Video className="w-4 h-4" />
                <span className="font-medium">Start Meeting</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                <UserPlus className="w-4 h-4" />
                <span className="font-medium">Schedule Meeting</span>
              </button>
            </div>
          </div>
        )}

        {/* Search */}
        {!sidebarCollapsed && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search meetings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Content List */}
        <div className="flex-1 overflow-y-auto">
          {viewMode === 'live' && (
            <div className="space-y-1">
              {liveCalls.map((call) => (
                <div
                  key={call.id}
                  onClick={() => handleJoinCall(call)}
                  className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer transition-colors ${
                    selectedMeeting === call.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-500'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {sidebarCollapsed ? (
                    <div className="flex flex-col items-center space-y-2">
                      <div className="relative">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          <Video className="w-4 h-4" />
                        </div>
                        {call.isRecording && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{call.participants.length}</span>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 dark:text-white text-sm">{call.title}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {call.participants.length} participants
                            </span>
                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{formatDuration(call.duration)}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {call.isRecording && (
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          )}
                          {call.isScreenSharing && (
                            <Monitor className="w-4 h-4 text-blue-500" />
                          )}
                          <div className={`w-2 h-2 rounded-full ${
                            call.quality === '4K' ? 'bg-purple-500' :
                            call.quality === 'HD' ? 'bg-green-500' :
                            'bg-yellow-500'
                          }`}></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        {call.participants.slice(0, 3).map((participant) => (
                          <div key={participant.id} className="relative">
                            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-green-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                              {participant.avatar}
                            </div>
                            <div className={`absolute -bottom-1 -right-1 w-2 h-2 rounded-full border border-white dark:border-gray-800 ${
                              participant.isVideoOn ? 'bg-green-400' : 'bg-gray-400'
                            }`}></div>
                          </div>
                        ))}
                        {call.participants.length > 3 && (
                          <div className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 text-xs font-medium">
                            +{call.participants.length - 3}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {viewMode === 'scheduled' && (
            <div className="space-y-1">
              {scheduledMeetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white text-sm">{meeting.title}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{meeting.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatTime(meeting.startTime)} - {formatTime(meeting.endTime)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-blue-600 bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded-full">
                        {formatDate(meeting.startTime)}
                      </span>
                      {meeting.isRecurring && (
                        <RotateCw className="w-3 h-3 text-gray-400" />
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {meeting.participants.length} participants
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        ID: {meeting.meetingId}
                      </span>
                      <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors">
                        <Video className="w-3 h-3 text-blue-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar Footer */}
        {!sidebarCollapsed && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  <Video className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Video System</p>
                  <p className="text-xs text-green-600">HD Ready</p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Settings className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {activeCall ? (
          /* Active Call Interface */
          <div className="flex-1 bg-black relative">
            {/* Video Grid */}
            <div className="absolute inset-0 p-4">
              <div className="grid grid-cols-2 gap-4 h-full">
                {/* Main Video (Screen Share or Primary Participant) */}
                <div className="bg-gray-800 rounded-lg relative overflow-hidden">
                  {isScreenSharing ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center text-white">
                        <Monitor className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium">Screen Sharing</p>
                        <p className="text-sm opacity-75">Your screen is being shared</p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-medium mx-auto mb-4">
                          {activeCall.participants[0]?.avatar}
                        </div>
                        <p className="text-lg font-medium">{activeCall.participants[0]?.name}</p>
                        <p className="text-sm opacity-75">{activeCall.participants[0]?.location}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Call Info Overlay */}
                  <div className="absolute top-4 left-4 bg-black/50 rounded-lg px-3 py-2 text-white">
                    <p className="text-sm font-medium">{activeCall.title}</p>
                    <p className="text-xs opacity-75">{formatDuration(activeCall.duration)}</p>
                  </div>
                  
                  {/* Recording Indicator */}
                  {activeCall.isRecording && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-lg flex items-center space-x-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">REC</span>
                    </div>
                  )}
                </div>

                {/* Participant Grid */}
                <div className="grid grid-rows-2 gap-4">
                  {activeCall.participants.slice(1).map((participant) => (
                    <div key={participant.id} className="bg-gray-800 rounded-lg relative overflow-hidden">
                      {participant.isVideoOn ? (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800">
                          <div className="text-center text-white">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-600 rounded-full flex items-center justify-center text-white text-lg font-medium mx-auto mb-2">
                              {participant.avatar}
                            </div>
                            <p className="text-sm font-medium">{participant.name}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800">
                          <div className="text-center text-white">
                            <div className="w-16 h-16 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full flex items-center justify-center text-white text-lg font-medium mx-auto mb-2">
                              <CameraOff className="w-6 h-6" />
                            </div>
                            <p className="text-sm font-medium">{participant.name}</p>
                          </div>
                        </div>
                      )}
                      
                      {/* Participant Status */}
                      <div className="absolute bottom-2 left-2 flex items-center space-x-1">
                        <div className={`w-2 h-2 rounded-full ${getQualityColor(participant.connectionQuality)}`}></div>
                        {!participant.isAudioOn && <MicOff className="w-3 h-3 text-red-400" />}
                      </div>
                      
                      {/* Participant Name */}
                      <div className="absolute bottom-2 right-2 bg-black/50 rounded px-2 py-1">
                        <span className="text-xs text-white">{participant.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Call Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={handleToggleAudio}
                  className={`p-4 rounded-full transition-colors ${
                    activeCall.participants.find(p => p.id === 'me')?.isAudioOn
                      ? 'bg-white/20 hover:bg-white/30' 
                      : 'bg-red-500 hover:bg-red-600'
                  }`}
                >
                  {activeCall.participants.find(p => p.id === 'me')?.isAudioOn ? 
                    <Mic className="w-6 h-6 text-white" /> : 
                    <MicOff className="w-6 h-6 text-white" />
                  }
                </button>
                
                <button
                  onClick={handleToggleVideo}
                  className={`p-4 rounded-full transition-colors ${
                    activeCall.participants.find(p => p.id === 'me')?.isVideoOn
                      ? 'bg-white/20 hover:bg-white/30' 
                      : 'bg-red-500 hover:bg-red-600'
                  }`}
                >
                  {activeCall.participants.find(p => p.id === 'me')?.isVideoOn ? 
                    <Video className="w-6 h-6 text-white" /> : 
                    <VideoOff className="w-6 h-6 text-white" />
                  }
                </button>
                
                <button
                  onClick={handleToggleScreenShare}
                  className={`p-4 rounded-full transition-colors ${
                    isScreenSharing ? 'bg-blue-500 hover:bg-blue-600' : 'bg-white/20 hover:bg-white/30'
                  }`}
                >
                  <Monitor className="w-6 h-6 text-white" />
                </button>
                
                <button
                  onClick={handleToggleRecording}
                  className={`p-4 rounded-full transition-colors ${
                    isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-white/20 hover:bg-white/30'
                  }`}
                >
                  <Square className="w-6 h-6 text-white" />
                </button>
                
                <button className="p-4 bg-white/20 hover:bg-white/30 rounded-full transition-colors">
                  <Volume2 className="w-6 h-6 text-white" />
                </button>
                
                <button className="p-4 bg-white/20 hover:bg-white/30 rounded-full transition-colors">
                  <Users className="w-6 h-6 text-white" />
                </button>
                
                <button className="p-4 bg-white/20 hover:bg-white/30 rounded-full transition-colors">
                  <MessageCircle className="w-6 h-6 text-white" />
                </button>
                
                <button
                  onClick={handleEndCall}
                  className="p-4 bg-red-500 hover:bg-red-600 rounded-full transition-colors"
                >
                  <PhoneOff className="w-6 h-6 text-white" />
                </button>
              </div>
              
              {/* Call Status */}
              <div className="flex items-center justify-center space-x-6 mt-4 text-white text-sm">
                <div className="flex items-center space-x-2">
                  <Signal className="w-4 h-4" />
                  <span>Excellent</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Wifi className="w-4 h-4" />
                  <span>WiFi</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Battery className="w-4 h-4" />
                  <span>85%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>HD Quality</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* No Active Call */
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Video className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Video Calls Ready
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">
                Start instant meetings, join scheduled calls, or create video conferences with HD quality and advanced features.
              </p>
              <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <Video className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Live Calls</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{liveCalls.length} active</p>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <Clock className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Scheduled</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{scheduledMeetings.length} meetings</p>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">HD Quality</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">4K support</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCallsPage;
