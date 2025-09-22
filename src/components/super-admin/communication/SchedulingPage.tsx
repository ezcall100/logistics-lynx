import React, { useState } from 'react';
import {
  Calendar,
  Plus,
  Search,
  Settings,
  User,
  Users,
  Video,
  Phone,
  MapPin,
  Bell,
  Repeat,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  X,
  List,
} from 'lucide-react';

interface Appointment {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  type: 'meeting' | 'call' | 'video' | 'appointment' | 'reminder';
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled';
  attendees: Attendee[];
  location?: string;
  meetingUrl?: string;
  phoneNumber?: string;
  isRecurring: boolean;
  recurrencePattern?: string;
  reminder: number; // minutes before
  tags: string[];
  priority: 'low' | 'normal' | 'high' | 'urgent';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Attendee {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: 'pending' | 'accepted' | 'declined' | 'tentative';
  responseTime?: Date;
}


const SchedulingPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month' | 'agenda'>('week');
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [newAppointment, setNewAppointment] = useState<Partial<Appointment>>({
    title: '',
    startTime: new Date(),
    endTime: new Date(Date.now() + 60 * 60 * 1000),
    type: 'meeting',
    status: 'scheduled',
    attendees: [],
    reminder: 15,
    tags: [],
    priority: 'normal',
    isRecurring: false
  });

  // Mock appointments
  const appointments: Appointment[] = [
    {
      id: '1',
      title: 'Team Standup Meeting',
      description: 'Daily team sync and progress update',
      startTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
      endTime: new Date(Date.now() + 3 * 60 * 60 * 1000),
      type: 'video',
      status: 'confirmed',
      attendees: [
        {
          id: 'a1',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'JD',
          status: 'accepted',
          responseTime: new Date(Date.now() - 1 * 60 * 60 * 1000)
        },
        {
          id: 'a2',
          name: 'Sarah Wilson',
          email: 'sarah@example.com',
          avatar: 'SW',
          status: 'pending'
        }
      ],
      meetingUrl: 'https://meet.transbot.com/standup-123',
      isRecurring: true,
      recurrencePattern: 'daily',
      reminder: 15,
      tags: ['team', 'standup', 'daily'],
      priority: 'high',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      title: 'Client Presentation',
      description: 'Q4 Results and 2024 Strategy presentation',
      startTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
      endTime: new Date(Date.now() + 25 * 60 * 60 * 1000),
      type: 'meeting',
      status: 'scheduled',
      attendees: [
        {
          id: 'a3',
          name: 'Mike Johnson',
          email: 'mike@client.com',
          avatar: 'MJ',
          status: 'tentative'
        }
      ],
      location: 'Conference Room A',
      reminder: 30,
      tags: ['client', 'presentation', 'q4'],
      priority: 'urgent',
      isRecurring: false,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    {
      id: '3',
      title: 'Doctor Appointment',
      description: 'Annual health checkup',
      startTime: new Date(Date.now() + 48 * 60 * 60 * 1000),
      endTime: new Date(Date.now() + 49 * 60 * 60 * 1000),
      type: 'appointment',
      status: 'confirmed',
      attendees: [
        {
          id: 'a4',
          name: 'Dr. Smith',
          email: 'dr.smith@clinic.com',
          avatar: 'DS',
          status: 'accepted'
        }
      ],
      location: 'Medical Center, Room 205',
      reminder: 60,
      tags: ['health', 'annual'],
      priority: 'normal',
      isRecurring: true,
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    }
  ];


  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'meeting': return <Users className="w-4 h-4" />;
      case 'call': return <Phone className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'appointment': return <User className="w-4 h-4" />;
      case 'reminder': return <Bell className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-500';
      case 'call': return 'bg-green-500';
      case 'video': return 'bg-purple-500';
      case 'appointment': return 'bg-orange-500';
      case 'reminder': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'rescheduled': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'border-red-500';
      case 'high': return 'border-orange-500';
      case 'normal': return 'border-blue-500';
      case 'low': return 'border-gray-500';
      default: return 'border-gray-500';
    }
  };

  const handleCreateAppointment = () => {
    console.log('Creating appointment:', newAppointment);
    setShowCreateModal(false);
    setNewAppointment({
      title: '',
      startTime: new Date(),
      endTime: new Date(Date.now() + 60 * 60 * 1000),
      type: 'meeting',
      status: 'scheduled',
      attendees: [],
      reminder: 15,
      tags: [],
      priority: 'normal',
      isRecurring: false
    });
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    switch (viewMode) {
      case 'day':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
        break;
      case 'week':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
        break;
      case 'month':
        newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
        break;
    }
    setCurrentDate(newDate);
  };

  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      return day;
    });
  };

  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter(apt => {
      const aptDate = new Date(apt.startTime);
      return aptDate.toDateString() === date.toDateString();
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
                  <Calendar className="w-6 h-6 text-purple-500" />
                  <span>Scheduling</span>
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Calendar & appointment management</p>
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

        {/* Quick Actions */}
        {!sidebarCollapsed && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setShowCreateModal(true)}
              className="w-full flex items-center justify-center space-x-2 p-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors mb-2"
            >
              <Plus className="w-4 h-4" />
              <span className="font-medium">New Appointment</span>
            </button>
            <button className="w-full flex items-center justify-center space-x-2 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              <Calendar className="w-4 h-4" />
              <span className="font-medium">Import Calendar</span>
            </button>
          </div>
        )}

        {/* View Mode Tabs */}
        {!sidebarCollapsed && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'day', label: 'Day', icon: Calendar },
                { id: 'week', label: 'Week', icon: Calendar },
                { id: 'month', label: 'Month', icon: Calendar },
                { id: 'agenda', label: 'Agenda', icon: List },
              ].map((view) => (
                <button
                  key={view.id}
                  onClick={() => setViewMode(view.id as 'day' | 'week' | 'month' | 'agenda')}
                  className={`flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    viewMode === view.id
                      ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <view.icon className="w-4 h-4" />
                  <span>{view.label}</span>
                </button>
              ))}
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
                placeholder="Search appointments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Upcoming Appointments */}
        {!sidebarCollapsed && (
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Upcoming</h3>
              <div className="space-y-2">
                {appointments
                  .filter(apt => apt.startTime > new Date())
                  .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
                  .slice(0, 5)
                  .map((appointment) => (
                    <div
                      key={appointment.id}
                      onClick={() => setSelectedAppointment(appointment.id)}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedAppointment === appointment.id
                          ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800'
                          : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${getTypeColor(appointment.type)}`}></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {appointment.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(appointment.startTime)} at {formatTime(appointment.startTime)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Sidebar Footer */}
        {!sidebarCollapsed && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Scheduler</p>
                  <p className="text-xs text-green-600">Active</p>
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
        {/* Calendar Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {viewMode === 'day' && currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                {viewMode === 'week' && `Week of ${formatDate(getWeekDays()[0])}`}
                {viewMode === 'month' && currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                {viewMode === 'agenda' && 'Agenda View'}
              </h3>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigateDate('prev')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Today
              </button>
              <button
                onClick={() => navigateDate('next')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
              <button
                onClick={() => setShowCreateModal(true)}
                className="ml-4 flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>New</span>
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {viewMode === 'week' && (
            <div className="space-y-4">
              {/* Week Header */}
              <div className="grid grid-cols-8 gap-4">
                <div className="text-center font-medium text-gray-500 dark:text-gray-400">Time</div>
                {getWeekDays().map((day) => (
                  <div key={day.toDateString()} className="text-center">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {day.toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                    <div className={`text-lg font-bold ${
                      day.toDateString() === new Date().toDateString() 
                        ? 'text-purple-600 dark:text-purple-400' 
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {day.getDate()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Week Grid */}
              <div className="grid grid-cols-8 gap-4">
                {/* Time Column */}
                <div className="space-y-2">
                  {Array.from({ length: 24 }, (_, i) => (
                    <div key={i} className="h-12 flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                      {i === 0 ? '12 AM' : i < 12 ? `${i} AM` : i === 12 ? '12 PM' : `${i - 12} PM`}
                    </div>
                  ))}
                </div>

                {/* Day Columns */}
                {getWeekDays().map((day) => (
                  <div key={day.toDateString()} className="space-y-2">
                    {Array.from({ length: 24 }, (_, i) => (
                      <div key={i} className="h-12 border border-gray-200 dark:border-gray-700 rounded">
                        {getAppointmentsForDate(day).map((apt) => {
                          const aptHour = apt.startTime.getHours();
                          if (aptHour === i) {
                            return (
                              <div
                                key={apt.id}
                                onClick={() => setSelectedAppointment(apt.id)}
                                className={`h-full p-1 rounded text-xs cursor-pointer transition-colors ${getPriorityColor(apt.priority)} border-l-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700`}
                              >
                                <div className="font-medium text-gray-900 dark:text-white truncate">
                                  {apt.title}
                                </div>
                                <div className="text-gray-500 dark:text-gray-400 truncate">
                                  {formatTime(apt.startTime)}
                                </div>
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {viewMode === 'agenda' && (
            <div className="space-y-4">
              {appointments
                .filter(apt => 
                  searchQuery === '' || 
                  apt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  apt.description?.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
                .map((appointment) => (
                  <div
                    key={appointment.id}
                    onClick={() => setSelectedAppointment(appointment.id)}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedAppointment === appointment.id
                        ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white ${getTypeColor(appointment.type)}`}>
                        {getTypeIcon(appointment.type)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900 dark:text-white">{appointment.title}</h4>
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {formatDateTime(appointment.startTime)}
                        </p>
                        
                        {appointment.description && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                            {appointment.description}
                          </p>
                        )}
                        
                        <div className="flex items-center space-x-4">
                          {appointment.location && (
                            <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                              <MapPin className="w-4 h-4" />
                              <span>{appointment.location}</span>
                            </div>
                          )}
                          
                          {appointment.attendees.length > 0 && (
                            <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                              <Users className="w-4 h-4" />
                              <span>{appointment.attendees.length} attendees</span>
                            </div>
                          )}
                          
                          {appointment.isRecurring && (
                            <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                              <Repeat className="w-4 h-4" />
                              <span>Recurring</span>
                            </div>
                          )}
                        </div>
                        
                        {appointment.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {appointment.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Appointment Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-2xl">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create Appointment</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                  <input
                    type="text"
                    value={newAppointment.title || ''}
                    onChange={(e) => setNewAppointment(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Appointment title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
                  <select
                    value={newAppointment.type || 'meeting'}
                    onChange={(e) => setNewAppointment(prev => ({ ...prev, type: e.target.value as 'meeting' | 'call' | 'video' | 'appointment' }))}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="meeting">Meeting</option>
                    <option value="call">Call</option>
                    <option value="video">Video Call</option>
                    <option value="appointment">Appointment</option>
                    <option value="reminder">Reminder</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Time</label>
                  <input
                    type="datetime-local"
                    value={newAppointment.startTime ? newAppointment.startTime.toISOString().slice(0, 16) : ''}
                    onChange={(e) => setNewAppointment(prev => ({ ...prev, startTime: new Date(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Time</label>
                  <input
                    type="datetime-local"
                    value={newAppointment.endTime ? newAppointment.endTime.toISOString().slice(0, 16) : ''}
                    onChange={(e) => setNewAppointment(prev => ({ ...prev, endTime: new Date(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea
                  value={newAppointment.description || ''}
                  onChange={(e) => setNewAppointment(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  rows={3}
                  placeholder="Appointment description"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={newAppointment.location || ''}
                    onChange={(e) => setNewAppointment(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Meeting location"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
                  <select
                    value={newAppointment.priority || 'normal'}
                    onChange={(e) => setNewAppointment(prev => ({ ...prev, priority: e.target.value as 'low' | 'normal' | 'high' }))}
                    className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateAppointment}
                  className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Create Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchedulingPage;
