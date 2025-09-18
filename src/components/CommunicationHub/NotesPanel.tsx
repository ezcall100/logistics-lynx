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
    <div className="space-y-3 responsive-container sm:flex-col md:flex-row lg:grid">
      <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">
          Notes
        </h3>
        <button 
          onClick={() => setShowAddNote(!showAddNote)}
            aria-label="Button"
          className="px-3 py-1 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
        >
          <Plus className="h-3 w-3 inline mr-1 responsive-container sm:flex-col md:flex-row lg:grid" />
          New Note
        </button>
      </div>

      {/* Notes List */}
      <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
        {notes.map(note => (
          <div
            key={note.id}
            className="p-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/50 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <div className="flex items-center justify-between mb-1 responsive-container sm:flex-col md:flex-row lg:grid">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100 responsive-container sm:flex-col md:flex-row lg:grid">
                {note.title}
              </span>
              <span className="text-xs text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">{note.updated}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
              {note.content}
            </p>
            {note.tags && note.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 responsive-container sm:flex-col md:flex-row lg:grid">
                {note.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"
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
        <div className="mt-4 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600 responsive-container sm:flex-col md:flex-row lg:grid">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 responsive-container sm:flex-col md:flex-row lg:grid">
            Add New Note
          </h4>
          <div className="space-y-3 responsive-container sm:flex-col md:flex-row lg:grid">
            <input
              type="text"
              placeholder="Note title"
              value={newNote.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-300 bg-slate-50 dark:bg-slate-600 responsive-container sm:flex-col md:flex-row lg:grid"
            />
            <textarea
              placeholder="Note content"
              value={newNote.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-300 bg-slate-50 dark:bg-slate-600 responsive-container sm:flex-col md:flex-row lg:grid"
            />
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={newNote.tags.join(', ')}
              onChange={(e) => handleInputChange('tags', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-300 bg-slate-50 dark:bg-slate-600 responsive-container sm:flex-col md:flex-row lg:grid"
            />
            <div className="flex space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
              <button
                onClick={onAddNote}
                disabled={!newNote.title || !newNote.content}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
               aria-label="Button">
                Add Note
              </button>
              <button
                onClick={() => setShowAddNote(false)}
            aria-label="Button"
                className="px-4 py-2 bg-gray-500 text-white text-sm rounded-lg hover:bg-gray-600 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
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