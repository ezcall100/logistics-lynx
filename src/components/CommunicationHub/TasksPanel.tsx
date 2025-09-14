import React from 'react';
import { CheckSquare, Square, Plus } from 'lucide-react';
import type { Task, NewTask } from './types';

interface TasksPanelProps {
  tasks: Task[];
  newTask: NewTask;
  setNewTask: React.Dispatch<React.SetStateAction<NewTask>>;
  showAddTask: boolean;
  setShowAddTask: (show: boolean) => void;
  onAddTask: () => void;
  onToggleTaskCompletion: (taskId: number) => void;
}

export const TasksPanel: React.FC<TasksPanelProps> = ({
  tasks,
  newTask,
  setNewTask,
  showAddTask,
  setShowAddTask,
  onAddTask,
  onToggleTaskCompletion,
}) => {
  const handleInputChange = (field: keyof NewTask, value: string) => {
    setNewTask(prev => ({ ...prev, [field]: value } as NewTask));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600';
      case 'medium':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-blue-100 text-blue-600';
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          Tasks
        </h3>
        <button 
          onClick={() => setShowAddTask(!showAddTask)}
          className="px-3 py-1 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-3 w-3 inline mr-1" />
          Add Task
        </button>
      </div>

      {/* Tasks List */}
      <div className="space-y-2">
        {tasks.map(task => (
          <div
            key={task.id}
            className="p-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/50"
          >
            <div className="flex items-center space-x-2 mb-2">
              <button
                onClick={() => onToggleTaskCompletion(task.id)}
                className={`p-1 rounded transition-colors ${
                  task.completed 
                    ? 'text-green-600' 
                    : 'text-gray-400 hover:text-green-600'
                }`}
              >
                {task.completed ? (
                  <CheckSquare className="h-4 w-4" />
                ) : (
                  <Square className="h-4 w-4" />
                )}
              </button>
              <span
                className={`text-sm font-medium ${
                  task.completed 
                    ? 'line-through text-gray-500' 
                    : 'text-gray-900 dark:text-gray-100'
                }`}
              >
                {task.title}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
              <span className="text-xs text-gray-500">{task.due}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Task Form */}
      {showAddTask && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
            Add New Task
          </h4>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Task title"
              value={newTask.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-300 bg-slate-50 dark:bg-slate-600"
            />
            <div className="grid grid-cols-2 gap-3">
              <select
                value={newTask.priority}
                onChange={(e) => handleInputChange('priority', e.target.value)}
                className="px-3 py-2 text-sm border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-300 bg-white dark:bg-slate-600"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              <input
                type="text"
                placeholder="Due date"
                value={newTask.due}
                onChange={(e) => handleInputChange('due', e.target.value)}
                className="px-3 py-2 text-sm border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-300 bg-white dark:bg-slate-600"
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={onAddTask}
                disabled={!newTask.title.trim()}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Add Task
              </button>
              <button
                onClick={() => setShowAddTask(false)}
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
