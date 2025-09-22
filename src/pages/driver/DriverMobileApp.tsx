/**
 * Driver Mobile Application - Web-Responsive Driver Interface
 * Supports both Driver and Owner Operator roles
 * Created by MCP 301 Agents
 * Timestamp: 2025-01-15T10:00:00.000Z
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Search,
  Bell,
  Settings,
  Plus,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  FileText,
  Calendar,
  MessageSquare,
  Phone,
  MessageCircle,
  Video,
  CheckSquare,
  User,
  Mail,
  LogOut,
  Activity,
  CheckCircle,
  Home,
  BarChart3,
  UserPlus,
  CreditCard,
  Server,
  RefreshCw,
  Download,
  Upload,
  Share2,
  Bookmark,
  History,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Minimize2,
  Maximize2,
  HelpCircle,
  Lock,
  Globe,
  Wifi,
  Star,
  Heart,
  Flag,
  Truck,
  Package,
  MapPin,
  Clock,
  Zap,
  Shield,
  Building,
  Car,
  Route,
  Fuel,
  Wrench,
  FileCheck,
  Calculator,
  PieChart,
  LineChart,
  TrendingDown,
  Eye,
  Edit,
  Trash2,
  Filter,
  SortAsc,
  SortDesc,
  MoreHorizontal,
  ExternalLink,
  Copy,
  Send,
  Archive,
  Tag,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  Map as MapIcon,
  Navigation,
  Target,
  Award,
  Gift,
  Coffee,
  Camera,
  Mic,
  MicOff,
  Headphones,
  Volume1,
  Volume2 as Volume2Icon,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Heart as HeartIcon,
  ThumbsUp,
  ThumbsDown,
  Smile,
  Frown,
  Meh,
  Angry,
  Laugh,
  Cry,
  Surprised,
  Confused,
  Wink,
  Kiss,
  Tongue,
  Disgusted,
  Sleepy,
  Dizzy,
  Sick,
  Hot,
  Cold,
  Happy,
  Sad,
  Excited,
  Bored,
  Tired,
  Hungry,
  Thirsty,
  Sleepy as SleepyIcon,
  Dizzy as DizzyIcon,
  Sick as SickIcon,
  Hot as HotIcon,
  Cold as ColdIcon,
  Happy as HappyIcon,
  Sad as SadIcon,
  Excited as ExcitedIcon,
  Bored as BoredIcon,
  Tired as TiredIcon,
} from 'lucide-react';

// Driver Role Types
type DriverRole = 'driver' | 'owner_operator';

// Driver User Interface
interface DriverUser {
  id: number;
  name: string;
  email: string;
  role: DriverRole;
  company: string;
  avatar: string;
  licenseNumber: string;
  phone: string;
  currentLocation: string;
  status: 'available' | 'on_duty' | 'off_duty' | 'break';
}

// Load Interface
interface Load {
  id: string;
  pickupLocation: string;
  deliveryLocation: string;
  pickupDate: string;
  deliveryDate: string;
  distance: number;
  rate: number;
  status: 'assigned' | 'picked_up' | 'in_transit' | 'delivered';
  description: string;
  weight: number;
  commodity: string;
}

// Driver Application State
interface DriverState {
  user: DriverUser | null;
  currentTab: string;
  assignedLoads: Load[];
  earnings: {
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
  notifications: Array<{
    id: string;
    title: string;
    message: string;
    timestamp: string;
    type: 'info' | 'warning' | 'error' | 'success';
    read: boolean;
  }>;
  isOnline: boolean;
}

function DriverMobileApp() {
  // State Management
  const [state, setState] = useState<DriverState>({
    user: {
      id: 1,
      name: 'John Driver',
      email: 'john.driver@transbotai.com',
      role: 'driver',
      company: 'Demo Carrier',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      licenseNumber: 'CDL-123456',
      phone: '+1 (555) 123-4567',
      currentLocation: 'Chicago, IL',
      status: 'available',
    },
    currentTab: 'dashboard',
    assignedLoads: [
      {
        id: 'LOAD-001',
        pickupLocation: 'Chicago, IL',
        deliveryLocation: 'Atlanta, GA',
        pickupDate: '2025-01-15T08:00:00Z',
        deliveryDate: '2025-01-16T14:00:00Z',
        distance: 715,
        rate: 1250,
        status: 'assigned',
        description: 'Electronics - Fragile',
        weight: 15000,
        commodity: 'Electronics',
      },
      {
        id: 'LOAD-002',
        pickupLocation: 'Atlanta, GA',
        deliveryLocation: 'Miami, FL',
        pickupDate: '2025-01-17T10:00:00Z',
        deliveryDate: '2025-01-18T16:00:00Z',
        distance: 660,
        rate: 1100,
        status: 'assigned',
        description: 'Furniture',
        weight: 12000,
        commodity: 'Furniture',
      },
    ],
    earnings: {
      today: 450,
      thisWeek: 2850,
      thisMonth: 11200,
    },
    notifications: [],
    isOnline: true,
  });

  // Tab configuration
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'loads', label: 'My Loads', icon: Package },
    { id: 'earnings', label: 'Earnings', icon: DollarSign },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  // Owner Operator specific tabs
  const ownerOperatorTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'loads', label: 'My Loads', icon: Package },
    { id: 'fleet', label: 'My Fleet', icon: Truck },
    { id: 'earnings', label: 'Earnings', icon: DollarSign },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const currentTabs = state.user?.role === 'owner_operator' ? ownerOperatorTabs : tabs;

  // Event Handlers
  const handleTabChange = (tabId: string) => {
    setState(prev => ({ ...prev, currentTab: tabId }));
  };

  const handleStatusChange = (status: DriverUser['status']) => {
    setState(prev => ({
      ...prev,
      user: prev.user ? { ...prev.user, status } : null,
    }));
  };

  const handleLoadStatusUpdate = (loadId: string, status: Load['status']) => {
    setState(prev => ({
      ...prev,
      assignedLoads: prev.assignedLoads.map(load =>
        load.id === loadId ? { ...load, status } : load
      ),
    }));
  };

  // Status color helper
  const getStatusColor = (status: DriverUser['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'on_duty':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'off_duty':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'break':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getLoadStatusColor = (status: Load['status']) => {
    switch (status) {
      case 'assigned':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'picked_up':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'in_transit':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  // Render Dashboard Content
  const renderDashboardContent = () => (
    <div className="space-y-6">
      {/* Status Card */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Driver Status</h3>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(state.user?.status || 'off_duty')}`}
          >
            {state.user?.status?.replace('_', ' ').toUpperCase()}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Current Location</p>
            <p className="font-medium text-gray-900 dark:text-white">
              {state.user?.currentLocation}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">License Number</p>
            <p className="font-medium text-gray-900 dark:text-white">{state.user?.licenseNumber}</p>
          </div>
        </div>
        <div className="mt-4 flex space-x-2">
          <button
            onClick={() => handleStatusChange('available')}
            className={`px-3 py-1 rounded text-sm ${
              state.user?.status === 'available'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            Available
          </button>
          <button
            onClick={() => handleStatusChange('on_duty')}
            className={`px-3 py-1 rounded text-sm ${
              state.user?.status === 'on_duty'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            On Duty
          </button>
          <button
            onClick={() => handleStatusChange('off_duty')}
            className={`px-3 py-1 rounded text-sm ${
              state.user?.status === 'off_duty'
                ? 'bg-gray-600 text-white'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            Off Duty
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Today's Earnings</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                ${state.earnings.today}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Loads</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {state.assignedLoads.length}
              </p>
            </div>
            <Package className="w-8 h-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900 dark:text-white">Load LOAD-001 assigned</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900 dark:text-white">Status updated to Available</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">4 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900 dark:text-white">Payment received: $1,250</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Loads Content
  const renderLoadsContent = () => (
    <div className="space-y-4">
      {state.assignedLoads.map(load => (
        <div key={load.id} className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{load.id}</h3>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getLoadStatusColor(load.status)}`}
            >
              {load.status.replace('_', ' ').toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pickup</p>
              <p className="font-medium text-gray-900 dark:text-white">{load.pickupLocation}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(load.pickupDate).toLocaleDateString()} at{' '}
                {new Date(load.pickupDate).toLocaleTimeString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Delivery</p>
              <p className="font-medium text-gray-900 dark:text-white">{load.deliveryLocation}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(load.deliveryDate).toLocaleDateString()} at{' '}
                {new Date(load.deliveryDate).toLocaleTimeString()}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Distance</p>
              <p className="font-medium text-gray-900 dark:text-white">{load.distance} miles</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Rate</p>
              <p className="font-medium text-gray-900 dark:text-white">${load.rate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Weight</p>
              <p className="font-medium text-gray-900 dark:text-white">{load.weight} lbs</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Description</p>
            <p className="text-gray-900 dark:text-white">{load.description}</p>
          </div>

          <div className="flex space-x-2">
            {load.status === 'assigned' && (
              <button
                onClick={() => handleLoadStatusUpdate(load.id, 'picked_up')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Mark as Picked Up
              </button>
            )}
            {load.status === 'picked_up' && (
              <button
                onClick={() => handleLoadStatusUpdate(load.id, 'in_transit')}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Start Transit
              </button>
            )}
            {load.status === 'in_transit' && (
              <button
                onClick={() => handleLoadStatusUpdate(load.id, 'delivered')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Mark as Delivered
              </button>
            )}
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  // Render Earnings Content
  const renderEarningsContent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Today</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${state.earnings.today}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">This Week</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${state.earnings.thisWeek}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">This Month</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${state.earnings.thisMonth}
              </p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Payments
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">LOAD-001</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Chicago, IL → Atlanta, GA</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900 dark:text-white">$1,250</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Jan 14, 2025</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">LOAD-002</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Atlanta, GA → Miami, FL</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900 dark:text-white">$1,100</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Jan 12, 2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Fleet Content (Owner Operator only)
  const renderFleetContent = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">My Fleet</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900 dark:text-white">Truck #001</h4>
              <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded text-sm">
                Active
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">2020 Freightliner Cascadia</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Driver: John Driver</p>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900 dark:text-white">Truck #002</h4>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 rounded text-sm">
                Maintenance
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">2019 Peterbilt 579</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Driver: Mike Smith</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Messages Content
  const renderMessagesContent = () => (
    <div className="space-y-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Messages</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">D</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900 dark:text-white">Dispatch</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                New load assignment available
              </p>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">2 min ago</span>
          </div>
          <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">S</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900 dark:text-white">Support</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your payment has been processed
              </p>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">1 hour ago</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Profile Content
  const renderProfileContent = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
        <div className="flex items-center space-x-4 mb-6">
          <img src={state.user?.avatar} alt={state.user?.name} className="w-16 h-16 rounded-full" />
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {state.user?.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{state.user?.email}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
              {state.user?.role?.replace('_', ' ')} • {state.user?.company}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">License Number</p>
            <p className="font-medium text-gray-900 dark:text-white">{state.user?.licenseNumber}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
            <p className="font-medium text-gray-900 dark:text-white">{state.user?.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Current Location</p>
            <p className="font-medium text-gray-900 dark:text-white">
              {state.user?.currentLocation}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(state.user?.status || 'off_duty')}`}
            >
              {state.user?.status?.replace('_', ' ').toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  // Render content based on current tab
  const renderContent = () => {
    switch (state.currentTab) {
      case 'dashboard':
        return renderDashboardContent();
      case 'loads':
        return renderLoadsContent();
      case 'fleet':
        return renderFleetContent();
      case 'earnings':
        return renderEarningsContent();
      case 'messages':
        return renderMessagesContent();
      case 'profile':
        return renderProfileContent();
      default:
        return renderDashboardContent();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-gray-200 dark:border-slate-700">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">Driver App</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {state.user?.role?.replace('_', ' ')} Portal
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={state.currentTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700">
        <div className="flex">
          {currentTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex-1 flex flex-col items-center py-2 px-1 ${
                state.currentTab === tab.id
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <tab.icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default DriverMobileApp;
