import React from 'react';
import { Plus } from 'lucide-react';
import type { CalendarEvent, NewEvent } from './types';

interface CalendarPanelProps {
  events: CalendarEvent[];
  newEvent: NewEvent;
  setNewEvent: React.Dispatch<React.SetStateAction<NewEvent>>;
  showAddEvent: boolean;
  setShowAddEvent: (show: boolean) => void;
  onAddEvent: () => void;
}

export const CalendarPanel: React.FC<CalendarPanelProps> = ({
  events,
  newEvent,
  setNewEvent,
  showAddEvent,
  setShowAddEvent,
  onAddEvent,
}) => {
  const handleInputChange = (field: keyof NewEvent, value: string) => {
    setNewEvent(prev => ({ ...prev, [field]: value } as NewEvent));
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting':
        return 'bg-blue-100 text-blue-600';
      case 'call':
        return 'bg-green-100 text-green-600';
      case 'event':
        return 'bg-purple-100 text-purple-600';
      default:
        return 'bg-blue-100 text-blue-600';
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          Calendar
        </h3>
        <button 
          onClick={() => setShowAddEvent(!showAddEvent)}
          className="px-3 py-1 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-3 w-3 inline mr-1" />
          Add Event
        </button>
      </div>

      {/* Calendar Events */}
      <div className="space-y-2">
        {events.map(event => (
          <div
            key={event.id}
            className="p-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/50"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {event.title}
              </span>
              <span className="text-xs text-gray-500">{event.time}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600 dark:text-gray-300">
                {event.date}
              </span>
              <span className={`text-xs px-2 py-1 rounded ${getEventTypeColor(event.type)}`}>
                {event.type}
              </span>
            </div>
            <div className="mt-1 text-xs text-gray-500">
              {event.attendees} attendees
            </div>
          </div>
        ))}
      </div>

      {/* Add Event Form */}
      {showAddEvent && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
            Add New Event
          </h4>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Event title"
              value={newEvent.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-300 bg-slate-50 dark:bg-slate-600"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Date"
                value={newEvent.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="px-3 py-2 text-sm border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-300 bg-white dark:bg-slate-600"
              />
              <input
                type="text"
                placeholder="Time"
                value={newEvent.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                className="px-3 py-2 text-sm border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-300 bg-white dark:bg-slate-600"
              />
            </div>
            <select
              value={newEvent.type}
              onChange={(e) => handleInputChange('type', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-300 bg-white dark:bg-slate-600"
            >
              <option value="meeting">Meeting</option>
              <option value="call">Call</option>
              <option value="event">Event</option>
            </select>
            <div className="flex space-x-2">
              <button
                onClick={onAddEvent}
                disabled={!newEvent.title || !newEvent.date || !newEvent.time}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Add Event
              </button>
              <button
                onClick={() => setShowAddEvent(false)}
                className="px-4 py-2 bg-gray-500 text-white text-sm rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
