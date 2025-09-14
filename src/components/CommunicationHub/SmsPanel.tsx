import React from 'react';
import { Plus } from 'lucide-react';
import type { SMSMessage, NewSMS } from './types';

interface SmsPanelProps {
  messages: SMSMessage[];
  newSms: NewSMS;
  setNewSms: React.Dispatch<React.SetStateAction<NewSMS>>;
  showComposeSms: boolean;
  setShowComposeSms: (show: boolean) => void;
  onSendSms: () => void;
  onMarkAsRead: (id: number) => void;
}

export const SmsPanel: React.FC<SmsPanelProps> = ({
  messages,
  newSms,
  setNewSms,
  showComposeSms,
  setShowComposeSms,
  onSendSms,
  onMarkAsRead,
}) => {
  const handleInputChange = (field: keyof NewSMS, value: string) => {
    setNewSms(prev => ({ ...prev, [field]: value } as NewSMS));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          SMS
        </h3>
        <button 
          onClick={() => setShowComposeSms(!showComposeSms)}
          className="px-3 py-1 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-3 w-3 inline mr-1" />
          New SMS
        </button>
      </div>

      {/* SMS Messages */}
      <div className="space-y-2">
        {messages.map(sms => (
          <div
            key={sms.id}
            className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-sm ${
              sms.unread 
                ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' 
                : 'bg-gray-50 dark:bg-slate-700/50 border-gray-200 dark:border-slate-700'
            }`}
            onClick={() => onMarkAsRead(sms.id)}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {sms.contact}
              </span>
              <span className="text-xs text-gray-500">{sms.time}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">{sms.message}</p>
            {sms.unread && (
              <div className="h-2 w-2 bg-blue-500 rounded-full mt-2"></div>
            )}
          </div>
        ))}
      </div>

      {/* Compose SMS Form */}
      {showComposeSms && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
            Compose SMS
          </h4>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Contact name or number"
              value={newSms.contact}
              onChange={(e) => handleInputChange('contact', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-300 bg-slate-50 dark:bg-slate-600"
            />
            <textarea
              placeholder="Message"
              value={newSms.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-300 bg-slate-50 dark:bg-slate-600"
            />
            <div className="flex space-x-2">
              <button
                onClick={onSendSms}
                disabled={!newSms.contact || !newSms.message}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Send SMS
              </button>
              <button
                onClick={() => setShowComposeSms(false)}
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
