import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
  MapPin,
  Bell,
  Edit,
  Trash2,
  Eye,
  Video,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
  Star,
  Filter,
  Search,
} from 'lucide-react';

const CrmCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month');
  const [selectedEvent, setSelectedEvent] = useState<{ id: string; title: string; date: string; time: string; type: string; attendees: string[] } | null>(null);

  const events = [
    {
      id: '1',
      title: 'Client Meeting - Acme Corp',
      date: '2024-01-20',
      time: '10:00 AM',
      duration: 60,
      type: 'meeting',
      status: 'scheduled',
      attendees: ['John Doe', 'Sarah Smith'],
      location: 'Conference Room A',
      description: 'Discuss TMS implementation progress',
    },
    {
      id: '2',
      title: 'Demo Call - TechStart',
      date: '2024-01-21',
      time: '2:00 PM',
      duration: 30,
      type: 'demo',
      status: 'scheduled',
      attendees: ['Mike Johnson'],
      location: 'Online',
      description: 'Product demonstration for new client',
    },
    {
      id: '3',
      title: 'Follow-up Call - Global Logistics',
      date: '2024-01-22',
      time: '11:00 AM',
      duration: 45,
      type: 'call',
      status: 'scheduled',
      attendees: ['Emily Chen'],
      location: 'Phone',
      description: 'Follow-up on contract renewal',
    },
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'demo': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'call': return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'meeting': return Users;
      case 'demo': return Video;
      case 'call': return Phone;
      default: return Calendar;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">CRM Calendar</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your appointments and meetings</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={view}
            onChange={(e) => setView(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="month">Month</option>
            <option value="week">Week</option>
            <option value="day">Day</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Event
          </button>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h2>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
              {day}
            </div>
          ))}
          {Array.from({ length: 35 }, (_, i) => {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i - 6);
            const dayEvents = events.filter(event => event.date === date.toISOString().split('T')[0]);
            const isCurrentMonth = date.getMonth() === currentDate.getMonth();
            const isToday = date.toDateString() === new Date().toDateString();

            return (
              <div
                key={i}
                className={`min-h-[80px] p-1 border border-gray-100 dark:border-gray-700 ${
                  isCurrentMonth ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'
                } ${isToday ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
              >
                <div className={`text-sm ${isCurrentMonth ? 'text-gray-900 dark:text-white' : 'text-gray-400'} ${
                  isToday ? 'font-bold text-blue-600 dark:text-blue-400' : ''
                }`}>
                  {date.getDate()}
                </div>
                <div className="space-y-1">
                  {dayEvents.slice(0, 2).map(event => {
                    const Icon = getEventIcon(event.type);
                    return (
                      <div
                        key={event.id}
                        className={`text-xs p-1 rounded truncate ${getEventTypeColor(event.type)} cursor-pointer hover:opacity-80`}
                        onClick={() => setSelectedEvent(event)}
                      >
                        <div className="flex items-center gap-1">
                          <Icon className="w-3 h-3" />
                          <span>{event.title}</span>
                        </div>
                      </div>
                    );
                  })}
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      +{dayEvents.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Events</h3>
        <div className="space-y-4">
          {events.map((event, index) => {
            const Icon = getEventIcon(event.type);
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className={`p-3 rounded-lg ${getEventTypeColor(event.type)}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">{event.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-green-600 dark:hover:text-green-400">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CrmCalendar;
