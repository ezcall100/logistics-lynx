import React from 'react';
import { Plus } from 'lucide-react';
import type { Email, NewEmail } from './types';

interface EmailPanelProps {
  emails: Email[];
  newEmail: NewEmail;
  setNewEmail: React.Dispatch<React.SetStateAction<NewEmail>>;
  showComposeEmail: boolean;
  setShowComposeEmail: (show: boolean) => void;
  onSendEmail: () => void;
  onMarkAsRead: (id: number) => void;
}

export const EmailPanel: React.FC<EmailPanelProps> = ({
  emails,
  newEmail,
  setNewEmail,
  showComposeEmail,
  setShowComposeEmail,
  onSendEmail,
  onMarkAsRead,
}) => {
  const handleInputChange = (field: keyof NewEmail, value: string) => {
    setNewEmail(prev => ({ ...prev, [field]: value } as NewEmail));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          Email
        </h3>
        <button 
          onClick={() => setShowComposeEmail(!showComposeEmail)}
          className="px-3 py-1 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-3 w-3 inline mr-1" />
          Compose
        </button>
      </div>

      {/* Email List */}
      <div className="space-y-2">
        {emails.map(email => (
          <div
            key={email.id}
            className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-sm ${
              email.unread 
                ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' 
                : 'bg-gray-50 dark:bg-slate-700/50 border-gray-200 dark:border-slate-700'
            }`}
            onClick={() => onMarkAsRead(email.id)}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {email.from}
                </span>
                {email.priority === 'high' && (
                  <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-600 rounded-full">
                    High
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-500">{email.time}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {email.subject}
            </p>
            {email.unread && (
              <div className="h-2 w-2 bg-blue-500 rounded-full mt-2"></div>
            )}
          </div>
        ))}
      </div>

      {/* Compose Email Form */}
      {showComposeEmail && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
            Compose Email
          </h4>
          <div className="space-y-3">
            <input
              type="email"
              placeholder="To"
              value={newEmail.to}
              onChange={(e) => handleInputChange('to', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-300 bg-slate-50 dark:bg-slate-600"
            />
            <input
              type="text"
              placeholder="Subject"
              value={newEmail.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-300 bg-slate-50 dark:bg-slate-600"
            />
            <textarea
              placeholder="Message"
              value={newEmail.body}
              onChange={(e) => handleInputChange('body', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-300 bg-slate-50 dark:bg-slate-600"
            />
            <div className="flex space-x-2">
              <button
                onClick={onSendEmail}
                disabled={!newEmail.to || !newEmail.subject || !newEmail.body}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Send
              </button>
              <button
                onClick={() => setShowComposeEmail(false)}
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
