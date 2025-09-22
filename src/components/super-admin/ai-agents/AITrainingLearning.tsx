import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, BookOpen, Target, TrendingUp, Play, Pause, RefreshCw, CheckCircle,
  AlertTriangle, Clock, Users, BarChart3, Zap, Award, Star, Download,
  Upload, Settings, Eye, Edit, Trash2, Plus, X, Save, Bell
} from 'lucide-react';

/**
 * AI Training & Learning - Advanced AI Model Training and Learning Management
 * Comprehensive AI training pipeline with model performance tracking
 * Created by MCP 302 Agents
 * Timestamp: 2025-01-20T18:15:00.000Z
 * Features: Model Training, Dataset Management, Performance Metrics, Learning Analytics
 */

interface TrainingModel {
  id: string;
  name: string;
  type: 'classification' | 'regression' | 'nlp' | 'computer_vision' | 'reinforcement';
  status: 'training' | 'completed' | 'failed' | 'paused' | 'pending';
  accuracy: number;
  dataset: string;
  epochs: number;
  currentEpoch: number;
  progress: number;
  createdAt: string;
  updatedAt: string;
  performance: {
    precision: number;
    recall: number;
    f1Score: number;
    loss: number;
  };
}

interface Dataset {
  id: string;
  name: string;
  type: string;
  size: number;
  records: number;
  quality: 'excellent' | 'good' | 'fair' | 'poor';
  lastUpdated: string;
  tags: string[];
}

interface TrainingStats {
  totalModels: number;
  trainingModels: number;
  completedModels: number;
  averageAccuracy: number;
  totalDatasets: number;
  activeTraining: number;
}

const AITrainingLearning: React.FC = () => {
  const [trainingModels, setTrainingModels] = useState<TrainingModel[]>([]);
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [selectedModel, setSelectedModel] = useState<TrainingModel | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<TrainingStats>({
    totalModels: 0,
    trainingModels: 0,
    completedModels: 0,
    averageAccuracy: 0,
    totalDatasets: 0,
    activeTraining: 0
  });
  const [notifications, setNotifications] = useState<{ id: string; type: string; title: string; message: string; timestamp: string }[]>([]);

  // Notification system
  const addNotification = useCallback((type: 'success' | 'error' | 'warning' | 'info', title: string, message: string): void => {
    const notification = {
      id: Date.now().toString(), type, title, message, timestamp: new Date().toISOString()
    };
    setNotifications(prev => [notification, ...prev.slice(0, 4)]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== notification.id)), 5000);
  }, []);

  // Mock data
  useEffect(() => {
    const mockModels: TrainingModel[] = [
      {
        id: 'model-1',
        name: 'Customer Intent Classification',
        type: 'nlp',
        status: 'training',
        accuracy: 94.2,
        dataset: 'customer-interactions-v2',
        epochs: 100,
        currentEpoch: 67,
        progress: 67,
        createdAt: '2024-12-10',
        updatedAt: '2024-12-20',
        performance: {
          precision: 0.94,
          recall: 0.92,
          f1Score: 0.93,
          loss: 0.15
        }
      },
      {
        id: 'model-2',
        name: 'Route Optimization ML',
        type: 'reinforcement',
        status: 'completed',
        accuracy: 89.7,
        dataset: 'logistics-routes-2024',
        epochs: 50,
        currentEpoch: 50,
        progress: 100,
        createdAt: '2024-11-15',
        updatedAt: '2024-12-18',
        performance: {
          precision: 0.89,
          recall: 0.91,
          f1Score: 0.90,
          loss: 0.08
        }
      },
      {
        id: 'model-3',
        name: 'Fraud Detection System',
        type: 'classification',
        status: 'completed',
        accuracy: 96.8,
        dataset: 'transaction-data-clean',
        epochs: 200,
        currentEpoch: 200,
        progress: 100,
        createdAt: '2024-10-20',
        updatedAt: '2024-12-15',
        performance: {
          precision: 0.97,
          recall: 0.95,
          f1Score: 0.96,
          loss: 0.03
        }
      },
      {
        id: 'model-4',
        name: 'Demand Forecasting',
        type: 'regression',
        status: 'failed',
        accuracy: 72.1,
        dataset: 'historical-demand',
        epochs: 75,
        currentEpoch: 45,
        progress: 60,
        createdAt: '2024-12-05',
        updatedAt: '2024-12-19',
        performance: {
          precision: 0.72,
          recall: 0.71,
          f1Score: 0.72,
          loss: 0.45
        }
      }
    ];

    const mockDatasets: Dataset[] = [
      {
        id: 'dataset-1',
        name: 'Customer Interactions v2',
        type: 'NLP',
        size: 2.4,
        records: 150000,
        quality: 'excellent',
        lastUpdated: '2024-12-15',
        tags: ['customer-service', 'nlp', 'classification']
      },
      {
        id: 'dataset-2',
        name: 'Logistics Routes 2024',
        type: 'Reinforcement Learning',
        size: 5.8,
        records: 89000,
        quality: 'good',
        lastUpdated: '2024-12-10',
        tags: ['logistics', 'routes', 'optimization']
      },
      {
        id: 'dataset-3',
        name: 'Transaction Data Clean',
        type: 'Classification',
        size: 1.2,
        records: 250000,
        quality: 'excellent',
        lastUpdated: '2024-12-12',
        tags: ['finance', 'fraud', 'transactions']
      },
      {
        id: 'dataset-4',
        name: 'Historical Demand',
        type: 'Time Series',
        size: 3.1,
        records: 75000,
        quality: 'fair',
        lastUpdated: '2024-11-28',
        tags: ['demand', 'forecasting', 'time-series']
      }
    ];

    setTrainingModels(mockModels);
    setDatasets(mockDatasets);
    
    // Calculate stats
    const trainingStats: TrainingStats = {
      totalModels: mockModels.length,
      trainingModels: mockModels.filter(m => m.status === 'training').length,
      completedModels: mockModels.filter(m => m.status === 'completed').length,
      averageAccuracy: mockModels.reduce((sum, model) => sum + model.accuracy, 0) / mockModels.length,
      totalDatasets: mockDatasets.length,
      activeTraining: mockModels.filter(m => m.status === 'training').length
    };
    setStats(trainingStats);
  }, []);

  const getStatusColor = (status: TrainingModel['status']) => {
    switch (status) {
      case 'training': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'paused': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'pending': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getTypeIcon = (type: TrainingModel['type']) => {
    switch (type) {
      case 'classification': return Target;
      case 'regression': return TrendingUp;
      case 'nlp': return BookOpen;
      case 'computer_vision': return Eye;
      case 'reinforcement': return Zap;
      default: return Brain;
    }
  };

  const getQualityColor = (quality: Dataset['quality']) => {
    switch (quality) {
      case 'excellent': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'good': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'fair': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'poor': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const handleStartTraining = (modelId: string) => {
    setTrainingModels(prev => prev.map(model => 
      model.id === modelId 
        ? { ...model, status: 'training' as const, progress: 0, currentEpoch: 0 }
        : model
    ));
    addNotification('success', 'Training Started', 'Model training has been initiated');
  };

  const handlePauseTraining = (modelId: string) => {
    setTrainingModels(prev => prev.map(model => 
      model.id === modelId 
        ? { ...model, status: 'paused' as const }
        : model
    ));
    addNotification('warning', 'Training Paused', 'Model training has been paused');
  };

  const handleStopTraining = (modelId: string) => {
    setTrainingModels(prev => prev.map(model => 
      model.id === modelId 
        ? { ...model, status: 'failed' as const }
        : model
    ));
    addNotification('error', 'Training Stopped', 'Model training has been stopped');
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    addNotification('success', 'Data Refreshed', 'Training data has been updated');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-50 dark:bg-slate-900 min-h-screen"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
                <Brain className="w-8 h-8 text-purple-500 mr-3" />
                AI Training & Learning
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage AI model training, datasets, and learning analytics
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="p-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
              >
                <RefreshCw className={`w-5 h-5 text-gray-600 dark:text-gray-400 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                New Training
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Models</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalModels}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Training Models</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.trainingModels}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Play className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.completedModels}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Accuracy</p>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.averageAccuracy.toFixed(1)}%</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Training Models */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Training Models</h2>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">
                Start All
              </button>
              <button className="px-3 py-1 bg-yellow-600 text-white text-sm rounded-lg hover:bg-yellow-700 transition-colors">
                Pause All
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {trainingModels.map((model) => {
              const TypeIcon = getTypeIcon(model.type);
              return (
                <motion.div
                  key={model.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-50 dark:bg-slate-700 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                        <TypeIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{model.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{model.type}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(model.status)}`}>
                      {model.status}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">Progress</span>
                        <span className="text-gray-900 dark:text-white">{model.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${model.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Accuracy</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{model.accuracy}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Epoch</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{model.currentEpoch}/{model.epochs}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Precision</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{model.performance.precision.toFixed(3)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">F1 Score</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{model.performance.f1Score.toFixed(3)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex space-x-2">
                      {model.status === 'training' ? (
                        <button
                          onClick={() => handlePauseTraining(model.id)}
                          className="p-2 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg transition-colors"
                        >
                          <Pause className="w-4 h-4" />
                        </button>
                      ) : model.status === 'paused' || model.status === 'failed' ? (
                        <button
                          onClick={() => handleStartTraining(model.id)}
                          className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                        >
                          <Play className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStartTraining(model.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        >
                          <Play className="w-4 h-4" />
                        </button>
                      )}
                      <button className="p-2 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg transition-colors">
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Updated {new Date(model.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Datasets */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Datasets</h2>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              <Upload className="w-4 h-4 mr-2" />
              Upload Dataset
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {datasets.map((dataset) => (
              <motion.div
                key={dataset.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{dataset.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{dataset.type}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getQualityColor(dataset.quality)}`}>
                    {dataset.quality}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 dark:text-gray-400">Size</span>
                    <span className="text-gray-900 dark:text-white">{dataset.size} GB</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 dark:text-gray-400">Records</span>
                    <span className="text-gray-900 dark:text-white">{dataset.records.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex flex-wrap gap-1">
                    {dataset.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                    {dataset.tags.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded">
                        +{dataset.tags.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex space-x-1">
                    <button className="p-1 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                      <Eye className="w-3 h-3" />
                    </button>
                    <button className="p-1 text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors">
                      <Download className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(dataset.lastUpdated).toLocaleDateString()}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="fixed bottom-6 right-6 z-50 space-y-2">
          <AnimatePresence>
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                className={`p-4 rounded-lg shadow-lg flex items-center space-x-3 ${
                  notification.type === 'success' ? 'bg-green-500 text-white' :
                  notification.type === 'error' ? 'bg-red-500 text-white' :
                  notification.type === 'info' ? 'bg-blue-500 text-white' :
                  'bg-yellow-500 text-white'
                }`}
              >
                {notification.type === 'success' && <CheckCircle className="w-5 h-5" />}
                {notification.type === 'error' && <AlertTriangle className="w-5 h-5" />}
                {notification.type === 'info' && <Bell className="w-5 h-5" />}
                {notification.type === 'warning' && <AlertTriangle className="w-5 h-5" />}
                <div>
                  <h4 className="font-semibold">{notification.title}</h4>
                  <p className="text-sm">{notification.message}</p>
                </div>
                <button onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}>
                  <X className="w-5 h-5" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default AITrainingLearning;
