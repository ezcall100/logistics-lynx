import React from 'react';
import { Plus } from 'lucide-react';
import type { Note, NewNote } from './types';

interface NotesPanelProps {
  notes: Note[];
  newNote: NewNote;
  setNewNote: React.Dispatch<React.SetStateAction<NewNote>>;
  showAddNote: boolean;
  setShowAddNote: (show: boolean) => void;
  onAddNote: () => void;
}

export const NotesPanel: React.FC<NotesPanelProps> = ({
  notes,
  newNote,
  setNewNote,
  showAddNote,
  setShowAddNote,
  onAddNote,
}) => {
  const handleInputChange = (field: keyof NewNote, value: string) => {
    setNewNote(prev => ({ ...prev, [field]: value } as NewNote));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          Notes
        </h3>
        <button 
          onClick={() => setShowAddNote(!showAddNote)}
          className="px-3 py-1 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-3 w-3 inline mr-1" />
          New Note
        </button>
      </div>

      {/* Notes List */}
      <div className="space-y-2">
        {notes.map(note => (
          <div
            key={note.id}
            className="p-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/50"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {note.title}
              </span>
              <span className="text-xs text-gray-500">{note.updated}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              {note.content}
            </p>
            {note.tags && note.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {note.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Note Form */}
      {showAddNote && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
            Add New Note
          </h4>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Note title"
              value={newNote.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-300 bg-slate-50 dark:bg-slate-600"
            />
            <textarea
              placeholder="Note content"
              value={newNote.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-300 bg-slate-50 dark:bg-slate-600"
            />
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={newNote.tags.join(', ')}
              onChange={(e) => handleInputChange('tags', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-300 bg-slate-50 dark:bg-slate-600"
            />
            <div className="flex space-x-2">
              <button
                onClick={onAddNote}
                disabled={!newNote.title || !newNote.content}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Add Note
              </button>
              <button
                onClick={() => setShowAddNote(false)}
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
