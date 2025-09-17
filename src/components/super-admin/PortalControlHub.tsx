import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  Users, 
  Settings, 
  Shield, 
  Activity, 
  Zap, 
  Database, 
  AlertTriangle, 
  BarChart3, 
  PieChart, 
  LineChart,
  Play,
  Pause,
  RotateCcw,
  RefreshCw,
  Eye,
  Star,
  X
} from 'lucide-react';

interface Portal {
  id: string;
  name: string;
  description: string;
  category: 'core' | 'business' | 'logistics' | 'analytics' | 'integration' | 'operations';
  status: 'online' | 'offline' | 'maintenance' | 'error' | 'development';
  users: number;
  activeUsers: number;
  rating: number;
  uptime: number;
  responseTime: number;
  cpu: number;
  memory: number;
  storage: number;
  bandwidth: number;
  lastUpdate: string;
  version: string;
  features: string[];
  integrations: string[];
  health: number;
  priority: 'critical' | 'high' | 'medium' | 'low';
  location: string;
  cost: number;
  revenue: number;
  growth: number;
  alerts: number;
  errors: number;
  performance: number;
  security: number;
  compliance: number;
  tags: string[];
}

interface PortalMetrics {
  totalPortals: number;
  activePortals: number;
  totalUsers: number;
  totalRevenue: number;
  averageUptime: number;
  averageResponseTime: number;
  systemHealth: number;
  criticalAlerts: number;
}

interface PortalAction {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  description: string;
  action: () => void;
}

const PortalControlHub: React.FC = () => {
  const [selectedPortal, setSelectedPortal] = useState<Portal | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'analytics'>('grid');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<string>('name');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [expandedPortals] = useState<Set<string>>(new Set());

  // Mock data for all TMS portals - Complete list from App.tsx
  const [portals, setPortals] = useState<Portal[]>([
    // Core Role-Based Portals
    {
      id: 'admin',
      name: 'Admin Portal',
      description: 'System administration and user management dashboard',
      category: 'core',
      status: 'online',
      users: 150,
      activeUsers: 150,
      rating: 4.9,
      uptime: 99.9,
      responseTime: 89,
      cpu: 45,
      memory: 52,
      storage: 38,
      bandwidth: 67,
      lastUpdate: '1 min ago',
      version: 'v2.4.1',
      features: ['User Management', 'System Configuration', 'Security Settings', 'Monitoring'],
      integrations: ['LDAP', 'SSO', 'Audit Logs', 'Notifications'],
      health: 98,
      priority: 'critical',
      location: 'US-East-1',
      cost: 15000,
      revenue: 45000,
      growth: 12.5,
      alerts: 0,
      errors: 0,
      performance: 97,
      security: 99,
      compliance: 98,
      tags: ['System Admin']
    },
    {
      id: 'super-admin',
      name: 'Super Admin Portal',
      description: 'Enterprise-level administration and multi-tenant control',
      category: 'core',
      status: 'online',
      users: 25,
      activeUsers: 25,
      rating: 5.0,
      uptime: 99.95,
      responseTime: 67,
      cpu: 35,
      memory: 42,
      storage: 28,
      bandwidth: 45,
      lastUpdate: '30 sec ago',
      version: 'v2.5.0',
      features: ['Multi-tenant Management', 'Global Settings', 'Advanced Security', 'Master Control'],
      integrations: ['All Systems', 'MCP Agents', 'Monitoring', 'Automation'],
      health: 99,
      priority: 'critical',
      location: 'Global',
      cost: 50000,
      revenue: 0,
      growth: 0,
      alerts: 0,
      errors: 0,
      performance: 99,
      security: 100,
      compliance: 100,
      tags: ['Enterprise']
    },
    {
      id: 'customer',
      name: 'Customer Portal',
      description: 'Customer relationship and service management platform',
      category: 'core',
      status: 'online',
      users: 1500,
      activeUsers: 1500,
      rating: 4.7,
      uptime: 99.8,
      responseTime: 123,
      cpu: 58,
      memory: 65,
      storage: 42,
      bandwidth: 78,
      lastUpdate: '2 min ago',
      version: 'v2.3.8',
      features: ['Account Management', 'Service Requests', 'Billing History', 'Support'],
      integrations: ['CRM', 'Support System', 'Payment Gateway', 'Knowledge Base'],
      health: 96,
      priority: 'high',
      location: 'US-West-2',
      cost: 12000,
      revenue: 38000,
      growth: 8.3,
      alerts: 1,
      errors: 0,
      performance: 94,
      security: 97,
      compliance: 95,
      tags: ['CRM Ready']
    },
    {
      id: 'partner',
      name: 'Partner Portal',
      description: 'Strategic partner collaboration and management system',
      category: 'core',
      status: 'online',
      users: 650,
      activeUsers: 650,
      rating: 4.6,
      uptime: 99.7,
      responseTime: 145,
      cpu: 42,
      memory: 48,
      storage: 35,
      bandwidth: 62,
      lastUpdate: '3 min ago',
      version: 'v2.2.5',
      features: ['Partner Directory', 'Collaboration Tools', 'Performance Tracking', 'Analytics'],
      integrations: ['CRM', 'Payment Systems', 'Communication Tools', 'Analytics'],
      health: 94,
      priority: 'medium',
      location: 'EU-Central-1',
      cost: 10000,
      revenue: 32000,
      growth: 15.2,
      alerts: 0,
      errors: 0,
      performance: 92,
      security: 96,
      compliance: 94,
      tags: ['Collaboration']
    },
    {
      id: 'developer',
      name: 'Developer Portal',
      description: 'Comprehensive API access and integration development tools',
      category: 'core',
      status: 'online',
      users: 420,
      activeUsers: 420,
      rating: 4.9,
      uptime: 99.6,
      responseTime: 156,
      cpu: 38,
      memory: 45,
      storage: 58,
      bandwidth: 89,
      lastUpdate: '4 min ago',
      version: 'v2.4.0',
      features: ['API Documentation', 'SDKs', 'Sandbox Environment', 'Analytics'],
      integrations: ['GitHub', 'CI/CD', 'Monitoring', 'Documentation'],
      health: 93,
      priority: 'medium',
      location: 'US-Central-1',
      cost: 18000,
      revenue: 52000,
      growth: 6.8,
      alerts: 2,
      errors: 0,
      performance: 91,
      security: 98,
      compliance: 97,
      tags: ['Developer']
    },
    {
      id: 'autonomous',
      name: 'Autonomous Portal',
      description: 'AI-powered autonomous operations and decision making',
      category: 'core',
      status: 'online',
      users: 180,
      activeUsers: 180,
      rating: 4.8,
      uptime: 99.9,
      responseTime: 78,
      cpu: 25,
      memory: 32,
      storage: 45,
      bandwidth: 56,
      lastUpdate: '1 min ago',
      version: 'v2.6.1',
      features: ['AI Agents', 'Automated Decisions', 'Machine Learning', 'Monitoring'],
      integrations: ['MCP Agents', 'AI Models', 'Automation Engine', 'Monitoring'],
      health: 97,
      priority: 'high',
      location: 'Global',
      cost: 22000,
      revenue: 65000,
      growth: 22.1,
      alerts: 0,
      errors: 0,
      performance: 95,
      security: 99,
      compliance: 98,
      tags: ['AI Powered']
    },
    {
      id: 'mcp-agent-admin',
      name: 'MCP Agent Admin',
      description: 'Manage and monitor AI development agents',
      category: 'core',
      status: 'online',
      users: 85,
      activeUsers: 85,
      rating: 4.9,
      uptime: 99.95,
      responseTime: 45,
      cpu: 15,
      memory: 25,
      storage: 35,
      bandwidth: 30,
      lastUpdate: '30 sec ago',
      version: 'v2.7.0',
      features: ['Agent Management', 'AI Monitoring', 'Performance Analytics', 'Agent Control'],
      integrations: ['MCP Protocol', 'AI Models', 'Monitoring Systems', 'Development Tools'],
      health: 99,
      priority: 'critical',
      location: 'Global',
      cost: 30000,
      revenue: 0,
      growth: 0,
      alerts: 0,
      errors: 0,
      performance: 98,
      security: 100,
      compliance: 100,
      tags: ['AI Admin']
    },
    {
      id: 'human-developer-admin',
      name: 'Human Developer Admin',
      description: 'Manage and coordinate human development teams',
      category: 'core',
      status: 'online',
      users: 120,
      activeUsers: 120,
      rating: 4.7,
      uptime: 99.8,
      responseTime: 67,
      cpu: 35,
      memory: 42,
      storage: 28,
      bandwidth: 45,
      lastUpdate: '1 min ago',
      version: 'v2.6.2',
      features: ['Team Management', 'Project Coordination', 'Performance Tracking', 'Resource Allocation'],
      integrations: ['Project Management', 'Git Systems', 'CI/CD', 'Communication Tools'],
      health: 96,
      priority: 'high',
      location: 'Global',
      cost: 25000,
      revenue: 0,
      growth: 0,
      alerts: 1,
      errors: 0,
      performance: 94,
      security: 98,
      compliance: 97,
      tags: ['Team Admin']
    },

    // Logistics Portals
    {
      id: 'broker',
      name: 'Broker Portal',
      description: 'Advanced load brokerage and relationship management platform',
      category: 'logistics',
      status: 'online',
      users: 1200,
      activeUsers: 1200,
      rating: 4.7,
      uptime: 99.9,
      responseTime: 145,
      cpu: 78,
      memory: 65,
      storage: 42,
      bandwidth: 89,
      lastUpdate: '1 min ago',
      version: 'v2.4.1',
      features: ['Load Board', 'Carrier Network', 'Rate Management', 'Document Management'],
      integrations: ['EDI', 'TMS', 'ERP', 'CRM'],
      health: 98,
      priority: 'critical',
      location: 'US-East-1',
      cost: 15000,
      revenue: 45000,
      growth: 12.5,
      alerts: 2,
      errors: 0,
      performance: 95,
      security: 98,
      compliance: 96,
      tags: ['Enterprise']
    },
    {
      id: 'carrier',
      name: 'Carrier Portal',
      description: 'Comprehensive fleet management and load optimization system',
      category: 'logistics',
      status: 'online',
      users: 1800,
      activeUsers: 1800,
      rating: 4.8,
      uptime: 99.8,
      responseTime: 167,
      cpu: 82,
      memory: 71,
      storage: 58,
      bandwidth: 76,
      lastUpdate: '2 min ago',
      version: 'v2.3.8',
      features: ['Fleet Management', 'Load Matching', 'Route Optimization', 'Maintenance Tracking'],
      integrations: ['GPS', 'ELD', 'TMS', 'Fuel Cards'],
      health: 96,
      priority: 'high',
      location: 'US-West-2',
      cost: 12000,
      revenue: 38000,
      growth: 8.3,
      alerts: 1,
      errors: 0,
      performance: 92,
      security: 97,
      compliance: 94,
      tags: ['Enterprise']
    },
    {
      id: 'shipper',
      name: 'Shipper Portal',
      description: 'Complete shipping management platform for businesses of all sizes',
      category: 'logistics',
      status: 'online',
      users: 2500,
      activeUsers: 2500,
      rating: 4.9,
      uptime: 99.7,
      responseTime: 123,
      cpu: 65,
      memory: 58,
      storage: 35,
      bandwidth: 67,
      lastUpdate: '1 min ago',
      version: 'v2.4.0',
      features: ['Load Planning', 'Carrier Selection', 'Real-time Tracking', 'Documentation'],
      integrations: ['ERP', 'WMS', 'CRM', 'EDI'],
      health: 97,
      priority: 'high',
      location: 'EU-Central-1',
      cost: 10000,
      revenue: 32000,
      growth: 15.2,
      alerts: 0,
      errors: 0,
      performance: 94,
      security: 96,
      compliance: 95,
      tags: ['AI-Powered', 'Most Popular']
    },
    {
      id: 'driver',
      name: 'Driver Portal',
      description: 'Mobile-first driver experience with comprehensive tools',
      category: 'logistics',
      status: 'online',
      users: 5200,
      activeUsers: 5200,
      rating: 4.9,
      uptime: 99.6,
      responseTime: 189,
      cpu: 45,
      memory: 38,
      storage: 28,
      bandwidth: 92,
      lastUpdate: '3 min ago',
      version: 'v2.5.2',
      features: ['Load Details', 'Route Navigation', 'Documentation', 'Communication'],
      integrations: ['Mobile App', 'GPS', 'ELD', 'Messaging'],
      health: 95,
      priority: 'critical',
      location: 'Global',
      cost: 8000,
      revenue: 28000,
      growth: 18.7,
      alerts: 3,
      errors: 1,
      performance: 89,
      security: 94,
      compliance: 92,
      tags: ['Mobile Ready']
    },
    {
      id: 'owner-operator',
      name: 'Owner Operator Portal',
      description: 'Independent owner-operator business management suite',
      category: 'logistics',
      status: 'online',
      users: 850,
      activeUsers: 850,
      rating: 4.6,
      uptime: 99.5,
      responseTime: 156,
      cpu: 52,
      memory: 48,
      storage: 38,
      bandwidth: 67,
      lastUpdate: '2 min ago',
      version: 'v2.3.9',
      features: ['Load Management', 'Expense Tracking', 'Tax Tools', 'Maintenance'],
      integrations: ['Accounting', 'Load Boards', 'Fuel Cards', 'Insurance'],
      health: 93,
      priority: 'medium',
      location: 'US-East-1',
      cost: 14000,
      revenue: 42000,
      growth: 9.4,
      alerts: 1,
      errors: 0,
      performance: 91,
      security: 95,
      compliance: 93,
      tags: ['New']
    },

    // Business Portals
    {
      id: 'analytics',
      name: 'Analytics Portal',
      description: 'Advanced analytics and business intelligence dashboard',
      category: 'analytics',
      status: 'online',
      users: 980,
      activeUsers: 980,
      rating: 4.8,
      uptime: 99.8,
      responseTime: 156,
      cpu: 72,
      memory: 68,
      storage: 85,
      bandwidth: 78,
      lastUpdate: '2 min ago',
      version: 'v2.6.1',
      features: ['Performance Metrics', 'Predictive Analytics', 'Custom Reports', 'Data Visualization'],
      integrations: ['BI Tools', 'Data Warehouse', 'ML Models', 'APIs'],
      health: 94,
      priority: 'medium',
      location: 'AP-Southeast-1',
      cost: 22000,
      revenue: 65000,
      growth: 22.1,
      alerts: 1,
      errors: 0,
      performance: 91,
      security: 97,
      compliance: 93,
      tags: ['AI Analytics']
    },
    {
      id: 'crm',
      name: 'CRM Portal',
      description: 'Customer relationship management with sales automation',
      category: 'business',
      status: 'online',
      users: 1300,
      activeUsers: 1300,
      rating: 4.6,
      uptime: 99.9,
      responseTime: 134,
      cpu: 58,
      memory: 52,
      storage: 38,
      bandwidth: 62,
      lastUpdate: '1 min ago',
      version: 'v2.3.9',
      features: ['Lead Management', 'Customer Profiles', 'Sales Pipeline', 'Communication'],
      integrations: ['Email', 'Phone', 'Social Media', 'Marketing Tools'],
      health: 98,
      priority: 'medium',
      location: 'US-East-1',
      cost: 14000,
      revenue: 42000,
      growth: 9.4,
      alerts: 0,
      errors: 0,
      performance: 96,
      security: 98,
      compliance: 97,
      tags: ['Sales Focus']
    },
    {
      id: 'marketplace',
      name: 'Marketplace Portal',
      description: 'Load and capacity marketplace with advanced matching',
      category: 'business',
      status: 'online',
      users: 2100,
      activeUsers: 2100,
      rating: 4.6,
      uptime: 99.7,
      responseTime: 178,
      cpu: 85,
      memory: 79,
      storage: 72,
      bandwidth: 94,
      lastUpdate: '4 min ago',
      version: 'v2.4.3',
      features: ['Load Posting', 'Capacity Matching', 'Bidding System', 'Matching'],
      integrations: ['Payment Gateway', 'Notification Service', 'Search Engine', 'AI Matching'],
      health: 93,
      priority: 'high',
      location: 'Global',
      cost: 25000,
      revenue: 78000,
      growth: 25.6,
      alerts: 2,
      errors: 0,
      performance: 88,
      security: 95,
      compliance: 91,
      tags: ['Marketplace']
    },
    {
      id: 'financials',
      name: 'Financials Portal',
      description: 'Comprehensive financial management and accounting suite',
      category: 'business',
      status: 'online',
      users: 890,
      activeUsers: 890,
      rating: 4.8,
      uptime: 99.5,
      responseTime: 234,
      cpu: 89,
      memory: 76,
      storage: 68,
      bandwidth: 45,
      lastUpdate: '5 min ago',
      version: 'v2.2.5',
      features: ['Invoice Management', 'Payment Processing', 'Financial Reporting', 'Accounting'],
      integrations: ['Banking', 'ERP', 'Tax Software', 'Payroll'],
      health: 88,
      priority: 'medium',
      location: 'US-Central-1',
      cost: 18000,
      revenue: 52000,
      growth: 6.8,
      alerts: 5,
      errors: 2,
      performance: 85,
      security: 99,
      compliance: 98,
      tags: ['Finance']
    },
    {
      id: 'directory',
      name: 'Directory Portal',
      description: 'Comprehensive business directory and networking platform',
      category: 'business',
      status: 'online',
      users: 1800,
      activeUsers: 1800,
      rating: 4.4,
      uptime: 99.6,
      responseTime: 145,
      cpu: 48,
      memory: 52,
      storage: 65,
      bandwidth: 72,
      lastUpdate: '3 min ago',
      version: 'v2.3.7',
      features: ['Business Listings', 'Contact Management', 'Network Building', 'Lead Generation'],
      integrations: ['CRM', 'Social Media', 'Email Marketing', 'Analytics'],
      health: 92,
      priority: 'medium',
      location: 'US-West-1',
      cost: 16000,
      revenue: 48000,
      growth: 7.2,
      alerts: 1,
      errors: 0,
      performance: 89,
      security: 96,
      compliance: 94,
      tags: ['Networking']
    },
    {
      id: 'rates',
      name: 'Rates Portal',
      description: 'Dynamic pricing and rate management optimization',
      category: 'business',
      status: 'online',
      users: 750,
      activeUsers: 750,
      rating: 4.7,
      uptime: 99.7,
      responseTime: 123,
      cpu: 42,
      memory: 48,
      storage: 35,
      bandwidth: 58,
      lastUpdate: '2 min ago',
      version: 'v2.4.2',
      features: ['Rate Optimization', 'Market Analysis', 'Pricing Strategies', 'Negotiation Tools'],
      integrations: ['Market Data', 'AI Pricing', 'CRM', 'Analytics'],
      health: 95,
      priority: 'high',
      location: 'EU-Central-1',
      cost: 14000,
      revenue: 42000,
      growth: 12.8,
      alerts: 0,
      errors: 0,
      performance: 93,
      security: 97,
      compliance: 95,
      tags: ['AI Pricing']
    },
    {
      id: 'workers',
      name: 'Workers Portal',
      description: 'Comprehensive workforce management and scheduling system',
      category: 'business',
      status: 'online',
      users: 1100,
      activeUsers: 1100,
      rating: 4.5,
      uptime: 98.5,
      responseTime: 267,
      cpu: 45,
      memory: 38,
      storage: 25,
      bandwidth: 56,
      lastUpdate: '10 min ago',
      version: 'v2.0.3',
      features: ['Schedule Management', 'Time Tracking', 'Payroll Integration', 'Performance'],
      integrations: ['HRIS', 'Payroll Systems', 'Time Tracking', 'Benefits'],
      health: 85,
      priority: 'low',
      location: 'US-Central-1',
      cost: 12000,
      revenue: 35000,
      growth: 4.1,
      alerts: 8,
      errors: 3,
      performance: 82,
      security: 93,
      compliance: 89,
      tags: ['HR Focused']
    },
    {
      id: 'factoring',
      name: 'Factoring Portal',
      description: 'Invoice factoring and cash flow management solution',
      category: 'business',
      status: 'online',
      users: 450,
      activeUsers: 450,
      rating: 4.4,
      uptime: 99.6,
      responseTime: 198,
      cpu: 67,
      memory: 61,
      storage: 45,
      bandwidth: 83,
      lastUpdate: '3 min ago',
      version: 'v2.1.7',
      features: ['Invoice Factoring', 'Cash Flow Management', 'Credit Analysis', 'Reporting'],
      integrations: ['Banking', 'Accounting', 'Credit Bureaus', 'Payment Gateways'],
      health: 92,
      priority: 'medium',
      location: 'US-West-1',
      cost: 16000,
      revenue: 48000,
      growth: 7.2,
      alerts: 1,
      errors: 0,
      performance: 87,
      security: 99,
      compliance: 98,
      tags: ['Cash Flow']
    },
    {
      id: 'track-trace',
      name: 'Track & Trace Portal',
      description: 'Comprehensive tracking system for trucks, trailers, containers, chassis and equipment',
      category: 'business',
      status: 'online',
      users: 1850,
      activeUsers: 1850,
      rating: 4.8,
      uptime: 99.9,
      responseTime: 89,
      cpu: 72,
      memory: 68,
      storage: 85,
      bandwidth: 94,
      lastUpdate: '1 min ago',
      version: 'v2.5.1',
      features: ['Real-time Tracking', 'Equipment Monitoring', 'Location History', 'Status Alerts'],
      integrations: ['GPS', 'IoT Sensors', 'Fleet Management', 'Container Systems'],
      health: 97,
      priority: 'high',
      location: 'Global',
      cost: 22000,
      revenue: 68000,
      growth: 18.5,
      alerts: 2,
      errors: 0,
      performance: 95,
      security: 98,
      compliance: 96,
      tags: ['Real-time', 'IoT']
    },

    // Integration Portals
    {
      id: 'edi',
      name: 'EDI Portal',
      description: 'Electronic data interchange management and automation',
      category: 'integration',
      status: 'online',
      users: 280,
      activeUsers: 280,
      rating: 4.5,
      uptime: 99.6,
      responseTime: 198,
      cpu: 67,
      memory: 61,
      storage: 45,
      bandwidth: 83,
      lastUpdate: '3 min ago',
      version: 'v2.1.7',
      features: ['Data Mapping', 'Transaction Processing', 'Integration Management', 'Monitoring'],
      integrations: ['Trading Partners', 'ERP Systems', 'Legacy Systems', 'APIs'],
      health: 92,
      priority: 'medium',
      location: 'US-West-1',
      cost: 16000,
      revenue: 48000,
      growth: 7.2,
      alerts: 1,
      errors: 0,
      performance: 87,
      security: 99,
      compliance: 98,
      tags: ['Integration']
    },
    {
      id: 'load-board',
      name: 'Load Board Portal',
      description: 'Advanced load board with intelligent matching algorithms',
      category: 'integration',
      status: 'online',
      users: 3200,
      activeUsers: 3200,
      rating: 4.7,
      uptime: 99.8,
      responseTime: 134,
      cpu: 72,
      memory: 68,
      storage: 58,
      bandwidth: 89,
      lastUpdate: '2 min ago',
      version: 'v2.4.5',
      features: ['Load Posting', 'Carrier Matching', 'Real-time Updates', 'Communication'],
      integrations: ['Carrier Networks', 'Broker Systems', 'Payment Gateways', 'Tracking'],
      health: 96,
      priority: 'high',
      location: 'Global',
      cost: 20000,
      revenue: 60000,
      growth: 18.5,
      alerts: 1,
      errors: 0,
      performance: 94,
      security: 97,
      compliance: 95,
      tags: ['Smart Matching']
    },

    // Operations Portals
    {
      id: 'warehouse',
      name: 'Warehouse Portal',
      description: 'Comprehensive warehouse management and inventory control',
      category: 'operations',
      status: 'online',
      users: 680,
      activeUsers: 680,
      rating: 4.6,
      uptime: 99.7,
      responseTime: 145,
      cpu: 58,
      memory: 65,
      storage: 72,
      bandwidth: 67,
      lastUpdate: '3 min ago',
      version: 'v2.3.8',
      features: ['Inventory Management', 'Order Processing', 'Shipping Coordination', 'Receiving'],
      integrations: ['WMS', 'ERP', 'Shipping Carriers', 'Barcode Scanners'],
      health: 94,
      priority: 'high',
      location: 'US-East-1',
      cost: 18000,
      revenue: 54000,
      growth: 11.2,
      alerts: 2,
      errors: 0,
      performance: 92,
      security: 96,
      compliance: 94,
      tags: ['Inventory']
    },
    {
      id: 'fleet',
      name: 'Fleet Portal',
      description: 'Complete fleet management and vehicle tracking system',
      category: 'operations',
      status: 'online',
      users: 1400,
      activeUsers: 1400,
      rating: 4.7,
      uptime: 99.6,
      responseTime: 156,
      cpu: 65,
      memory: 72,
      storage: 48,
      bandwidth: 78,
      lastUpdate: '4 min ago',
      version: 'v2.4.2',
      features: ['Vehicle Tracking', 'Driver Management', 'Route Optimization', 'Fuel Management'],
      integrations: ['GPS', 'ELD', 'Maintenance Systems', 'Fuel Cards'],
      health: 93,
      priority: 'high',
      location: 'US-West-2',
      cost: 16000,
      revenue: 48000,
      growth: 9.8,
      alerts: 1,
      errors: 0,
      performance: 91,
      security: 97,
      compliance: 95,
      tags: ['Fleet Focus']
    },
    {
      id: 'dispatch',
      name: 'Dispatch Portal',
      description: 'Real-time load dispatch and driver coordination system',
      category: 'operations',
      status: 'online',
      users: 920,
      activeUsers: 920,
      rating: 4.8,
      uptime: 99.8,
      responseTime: 123,
      cpu: 48,
      memory: 52,
      storage: 35,
      bandwidth: 62,
      lastUpdate: '2 min ago',
      version: 'v2.3.6',
      features: ['Load Assignment', 'Driver Coordination', 'Real-time Tracking', 'Communication'],
      integrations: ['GPS', 'Communication Systems', 'Load Boards', 'Analytics'],
      health: 95,
      priority: 'medium',
      location: 'US-Central-1',
      cost: 14000,
      revenue: 42000,
      growth: 8.5,
      alerts: 0,
      errors: 0,
      performance: 93,
      security: 96,
      compliance: 94,
      tags: ['Real-time']
    },
    {
      id: 'maintenance',
      name: 'Maintenance Portal',
      description: 'Comprehensive vehicle maintenance and service management',
      category: 'operations',
      status: 'online',
      users: 560,
      activeUsers: 560,
      rating: 4.5,
      uptime: 99.5,
      responseTime: 167,
      cpu: 52,
      memory: 58,
      storage: 42,
      bandwidth: 67,
      lastUpdate: '3 min ago',
      version: 'v2.2.8',
      features: ['Service Scheduling', 'Parts Management', 'Technician Coordination', 'Warranty Tracking'],
      integrations: ['Fleet Management', 'Parts Suppliers', 'Service Centers', 'Warranty Systems'],
      health: 91,
      priority: 'medium',
      location: 'US-East-1',
      cost: 12000,
      revenue: 36000,
      growth: 6.2,
      alerts: 2,
      errors: 0,
      performance: 89,
      security: 95,
      compliance: 92,
      tags: ['Maintenance']
    },
    {
      id: 'fuel',
      name: 'Fuel Portal',
      description: 'Fuel management and efficiency optimization system',
      category: 'operations',
      status: 'online',
      users: 780,
      activeUsers: 780,
      rating: 4.6,
      uptime: 99.7,
      responseTime: 134,
      cpu: 38,
      memory: 42,
      storage: 28,
      bandwidth: 45,
      lastUpdate: '2 min ago',
      version: 'v2.1.9',
      features: ['Fuel Tracking', 'Efficiency Analytics', 'Cost Management', 'Reporting'],
      integrations: ['Fuel Cards', 'GPS', 'Fleet Management', 'Accounting'],
      health: 94,
      priority: 'medium',
      location: 'US-West-1',
      cost: 10000,
      revenue: 30000,
      growth: 5.8,
      alerts: 1,
      errors: 0,
      performance: 92,
      security: 96,
      compliance: 93,
      tags: ['Efficiency']
    },
    {
      id: 'insurance',
      name: 'Insurance Portal',
      description: 'Comprehensive insurance management and claims processing',
      category: 'operations',
      status: 'online',
      users: 420,
      activeUsers: 420,
      rating: 4.4,
      uptime: 99.6,
      responseTime: 145,
      cpu: 35,
      memory: 38,
      storage: 25,
      bandwidth: 42,
      lastUpdate: '3 min ago',
      version: 'v2.0.7',
      features: ['Policy Management', 'Claims Processing', 'Coverage Tracking', 'Compliance'],
      integrations: ['Insurance Providers', 'Fleet Management', 'Claims Systems', 'Compliance Tools'],
      health: 92,
      priority: 'low',
      location: 'US-Central-1',
      cost: 8000,
      revenue: 24000,
      growth: 4.5,
      alerts: 1,
      errors: 0,
      performance: 90,
      security: 97,
      compliance: 98,
      tags: ['Insurance']
    },
    {
      id: 'compliance',
      name: 'Compliance Portal',
      description: 'Regulatory compliance monitoring and management system',
      category: 'operations',
      status: 'online',
      users: 340,
      activeUsers: 340,
      rating: 4.7,
      uptime: 99.8,
      responseTime: 156,
      cpu: 28,
      memory: 32,
      storage: 45,
      bandwidth: 38,
      lastUpdate: '4 min ago',
      version: 'v2.1.5',
      features: ['Regulatory Tracking', 'Audit Management', 'Violation Monitoring', 'Documentation'],
      integrations: ['Regulatory Systems', 'Audit Tools', 'Document Management', 'Reporting Systems'],
      health: 96,
      priority: 'high',
      location: 'US-East-1',
      cost: 15000,
      revenue: 45000,
      growth: 8.2,
      alerts: 0,
      errors: 0,
      performance: 94,
      security: 99,
      compliance: 100,
      tags: ['Compliance']
    },
    {
      id: 'yms',
      name: 'YMS Portal',
      description: 'Yard management system for efficient terminal operations',
      category: 'operations',
      status: 'online',
      users: 320,
      activeUsers: 320,
      rating: 4.5,
      uptime: 99.6,
      responseTime: 123,
      cpu: 42,
      memory: 48,
      storage: 35,
      bandwidth: 58,
      lastUpdate: '3 min ago',
      version: 'v2.2.6',
      features: ['Yard Planning', 'Gate Management', 'Trailer Tracking', 'Scheduling'],
      integrations: ['Gate Systems', 'Fleet Management', 'Scheduling Systems', 'Tracking'],
      health: 93,
      priority: 'medium',
      location: 'US-West-2',
      cost: 12000,
      revenue: 36000,
      growth: 7.8,
      alerts: 1,
      errors: 0,
      performance: 91,
      security: 95,
      compliance: 93,
      tags: ['Terminal Focus']
    }
  ]);

  const [metrics] = useState<PortalMetrics>({
    totalPortals: 28,
    activePortals: 26,
    totalUsers: 47528,
    totalRevenue: 524000,
    averageUptime: 99.6,
    averageResponseTime: 167,
    systemHealth: 94,
    criticalAlerts: 12
  });

  // Simulate real-time updates
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setPortals(prevPortals => 
        prevPortals.map(portal => ({
          ...portal,
          activeUsers: Math.max(0, portal.activeUsers + Math.floor((Math.random() - 0.5) * 20)),
          responseTime: Math.max(50, portal.responseTime + Math.floor((Math.random() - 0.5) * 50)),
          cpu: Math.max(0, Math.min(100, portal.cpu + Math.floor((Math.random() - 0.5) * 10))),
          memory: Math.max(0, Math.min(100, portal.memory + Math.floor((Math.random() - 0.5) * 10))),
          lastUpdate: 'Just now'
        }))
      );
    }, 3000);

    return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      ) => clearInterval(interval);
  }, [autoRefresh]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-400 bg-green-400/20';
      case 'offline': return 'text-red-400 bg-red-400/20';
      case 'maintenance': return 'text-yellow-400 bg-yellow-400/20';
      case 'error': return 'text-red-500 bg-red-500/20';
      case 'development': return 'text-blue-400 bg-blue-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'core': return 'text-purple-400 bg-purple-400/20';
      case 'business': return 'text-blue-400 bg-blue-400/20';
      case 'logistics': return 'text-green-400 bg-green-400/20';
      case 'analytics': return 'text-orange-400 bg-orange-400/20';
      case 'integration': return 'text-cyan-400 bg-cyan-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-500';
      case 'high': return 'text-orange-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 95) return 'text-green-400';
    if (health >= 85) return 'text-yellow-400';
    if (health >= 70) return 'text-orange-400';
    return 'text-red-400';
  };

  const filteredPortals = portals.filter(portal => {
    const matchesCategory = filterCategory === 'all' || portal.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || portal.status === filterStatus;
    const matchesSearch = searchQuery === '' || 
      portal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      portal.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const sortedPortals = [...filteredPortals].sort((a, b) => {
    switch (sortBy) {
      case 'name': return a.name.localeCompare(b.name);
      case 'users': return b.users - a.users;
      case 'uptime': return b.uptime - a.uptime;
      case 'health': return b.health - a.health;
      case 'revenue': return b.revenue - a.revenue;
      default: return 0;
    }
  });


  const quickActions: PortalAction[] = [
    {
      id: 'deploy-all',
      name: 'Deploy All',
      icon: Zap,
      color: 'green',
      description: 'Deploy updates to all portals',
      action: () => console.log('Deploy all portals')
    },
    {
      id: 'backup-all',
      name: 'Backup All',
      icon: Database,
      color: 'blue',
      description: 'Create backup of all portal data',
      action: () => console.log('Backup all portals')
    },
    {
      id: 'security-scan',
      name: 'Security Scan',
      icon: Shield,
      color: 'purple',
      description: 'Run security scan on all portals',
      action: () => console.log('Security scan all portals')
    },
    {
      id: 'performance-test',
      name: 'Performance Test',
      icon: Activity,
      color: 'orange',
      description: 'Run performance tests on all portals',
      action: () => console.log('Performance test all portals')
    }
  ];

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 p-6 responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Header */}
      <div className="mb-8 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
              🌐 Portal Control Hub
            </h1>
            <p className="text-gray-300 text-lg responsive-container sm:flex-col md:flex-row lg:grid">
              Centralized management of all TMS portals and services
            </p>
          </div>
          <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse responsive-container sm:flex-col md:flex-row lg:grid"></div>
              <span className="text-white font-medium responsive-container sm:flex-col md:flex-row lg:grid">
                {autoRefresh ? 'Live Updates' : 'Paused'}
              </span>
            </div>
            <button 
              onClick={() = aria-label="Button"> setAutoRefresh(!autoRefresh)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
              <span>{autoRefresh ? 'Pause' : 'Resume'}</span>
            </button>
          </div>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 responsive-container sm:flex-col md:flex-row lg:grid">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
              <div>
                <p className="text-gray-300 text-sm responsive-container sm:flex-col md:flex-row lg:grid">Total Portals</p>
                <p className="text-3xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">{metrics.totalPortals}</p>
                <p className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">{metrics.activePortals} active</p>
              </div>
              <Globe className="w-8 h-8 text-emerald-400 responsive-container sm:flex-col md:flex-row lg:grid" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
              <div>
                <p className="text-gray-300 text-sm responsive-container sm:flex-col md:flex-row lg:grid">Total Users</p>
                <p className="text-3xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">{metrics.totalUsers.toLocaleString()}</p>
                <p className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Across all portals</p>
              </div>
              <Users className="w-8 h-8 text-blue-400 responsive-container sm:flex-col md:flex-row lg:grid" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
              <div>
                <p className="text-gray-300 text-sm responsive-container sm:flex-col md:flex-row lg:grid">System Health</p>
                <p className="text-3xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">{metrics.systemHealth}%</p>
                <p className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Average uptime</p>
              </div>
              <Shield className="w-8 h-8 text-purple-400 responsive-container sm:flex-col md:flex-row lg:grid" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
              <div>
                <p className="text-gray-300 text-sm responsive-container sm:flex-col md:flex-row lg:grid">Critical Alerts</p>
                <p className="text-3xl font-bold text-red-400 responsive-container sm:flex-col md:flex-row lg:grid">{metrics.criticalAlerts}</p>
                <p className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Require attention</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-400 responsive-container sm:flex-col md:flex-row lg:grid" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between mb-8 gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="relative responsive-container sm:flex-col md:flex-row lg:grid">
            <input
              type="text"
              placeholder="Search portals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 responsive-container sm:flex-col md:flex-row lg:grid"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <option value="all">All Categories</option>
            <option value="core">Core</option>
            <option value="business">Business</option>
            <option value="logistics">Logistics</option>
            <option value="analytics">Analytics</option>
            <option value="integration">Integration</option>
            <option value="operations">Operations</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <option value="all">All Status</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="maintenance">Maintenance</option>
            <option value="error">Error</option>
            <option value="development">Development</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <option value="name">Sort by Name</option>
            <option value="users">Sort by Users</option>
            <option value="uptime">Sort by Uptime</option>
            <option value="health">Sort by Health</option>
            <option value="revenue">Sort by Revenue</option>
          </select>
        </div>

        <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
          <button
            onClick={() = aria-label="Button"> setViewMode('grid')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'grid' 
                ? 'bg-emerald-600 text-white' 
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <BarChart3 className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
          </button>
          <button
            onClick={() = aria-label="Button"> setViewMode('list')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'list' 
                ? 'bg-emerald-600 text-white' 
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <PieChart className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
          </button>
          <button
            onClick={() = aria-label="Button"> setViewMode('analytics')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'analytics' 
                ? 'bg-emerald-600 text-white' 
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <LineChart className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 responsive-container sm:flex-col md:flex-row lg:grid">
          <h3 className="text-lg font-bold text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={action.action}
                className={`bg-gradient-to-r ${action.color === 'green' ? 'from-green-500/20 to-green-600/20' : 
                  action.color === 'blue' ? 'from-blue-500/20 to-blue-600/20' :
                  action.color === 'purple' ? 'from-purple-500/20 to-purple-600/20' :
                  'from-orange-500/20 to-orange-600/20'} backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:scale-105 transition-transform`}
              >
                <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className={`w-10 h-10 bg-${action.color}-600 rounded-lg flex items-center justify-center`}>
                    <action.icon className="w-5 h-5 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
                  </div>
                  <div className="text-left responsive-container sm:flex-col md:flex-row lg:grid">
                    <h4 className="text-white font-medium responsive-container sm:flex-col md:flex-row lg:grid">{action.name}</h4>
                    <p className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">{action.description}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Portals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
        {sortedPortals.map((portal, index) => (
          <motion.div
            key={portal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:scale-105 transition-transform cursor-pointer responsive-container sm:flex-col md:flex-row lg:grid"
            onClick={() => setSelectedPortal(portal)}
          >
            <div className="flex items-center justify-between mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                  <Globe className="w-5 h-5 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
                </div>
                <div>
                  <h3 className="text-white font-bold responsive-container sm:flex-col md:flex-row lg:grid">{portal.name}</h3>
                  <p className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">{portal.category}</p>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-1 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className={`px-2 py-1 rounded-full text-xs ${getStatusColor(portal.status)}`}>
                  {portal.status}
                </div>
                <div className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(portal.category)}`}>
                  {portal.category}
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-300 mb-4 responsive-container sm:flex-col md:flex-row lg:grid">{portal.description}</p>

            {/* Rating and Tags */}
            <div className="flex items-center justify-between mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="flex items-center space-x-1 responsive-container sm:flex-col md:flex-row lg:grid">
                  <Star className="w-4 h-4 text-yellow-400 fill-current responsive-container sm:flex-col md:flex-row lg:grid" />
                  <span className="text-sm text-white font-medium responsive-container sm:flex-col md:flex-row lg:grid">{portal.rating}</span>
                </div>
                <span className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">({portal.activeUsers.toLocaleString()} users)</span>
              </div>
              <div className="flex space-x-1 responsive-container sm:flex-col md:flex-row lg:grid">
                {portal.tags?.slice(0, 2).map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full responsive-container sm:flex-col md:flex-row lg:grid">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="flex justify-between text-sm responsive-container sm:flex-col md:flex-row lg:grid">
                <span className="text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Users</span>
                <span className="text-white responsive-container sm:flex-col md:flex-row lg:grid">{portal.users.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm responsive-container sm:flex-col md:flex-row lg:grid">
                <span className="text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Active Users</span>
                <span className="text-white responsive-container sm:flex-col md:flex-row lg:grid">{portal.activeUsers.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm responsive-container sm:flex-col md:flex-row lg:grid">
                <span className="text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Uptime</span>
                <span className="text-white responsive-container sm:flex-col md:flex-row lg:grid">{portal.uptime}%</span>
              </div>
              <div className="flex justify-between text-sm responsive-container sm:flex-col md:flex-row lg:grid">
                <span className="text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Response Time</span>
                <span className="text-white responsive-container sm:flex-col md:flex-row lg:grid">{portal.responseTime}ms</span>
              </div>
              <div className="flex justify-between text-sm responsive-container sm:flex-col md:flex-row lg:grid">
                <span className="text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Health</span>
                <span className={`font-medium ${getHealthColor(portal.health)}`}>{portal.health}%</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
                    <p className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">CPU</p>
                    <p className="text-sm text-white responsive-container sm:flex-col md:flex-row lg:grid">{portal.cpu}%</p>
                  </div>
                  <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
                    <p className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Memory</p>
                    <p className="text-sm text-white responsive-container sm:flex-col md:flex-row lg:grid">{portal.memory}%</p>
                  </div>
                  <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
                    <p className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Alerts</p>
                    <p className="text-sm text-white responsive-container sm:flex-col md:flex-row lg:grid">{portal.alerts}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 responsive-container sm:flex-col md:flex-row lg:grid">
                  <button className="p-1 hover:bg-white/20 rounded transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                    <Eye className="w-4 h-4 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                  </button>
                  <button className="p-1 hover:bg-white/20 rounded transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                    <Settings className="w-4 h-4 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                  </button>
                </div>
              </div>
            </div>

            {/* Expanded View */}
            <AnimatePresence>
              {expandedPortals.has(portal.id) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-white/20 responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  <div className="space-y-3 responsive-container sm:flex-col md:flex-row lg:grid">
                    <div>
                      <label className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Features</label>
                      <div className="flex flex-wrap gap-1 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">
                        {portal.features.slice(0, 3).map((feature, idx) => (
                          <span key={idx} className="px-2 py-1 bg-emerald-600/20 text-emerald-300 rounded text-xs responsive-container sm:flex-col md:flex-row lg:grid">
                            {feature}
                          </span>
                        ))}
                        {portal.features.length > 3 && (
                          <span className="px-2 py-1 bg-gray-600/20 text-gray-300 rounded text-xs responsive-container sm:flex-col md:flex-row lg:grid">
                            +{portal.features.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-xs responsive-container sm:flex-col md:flex-row lg:grid">
                      <div>
                        <span className="text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Revenue</span>
                        <p className="text-white font-medium responsive-container sm:flex-col md:flex-row lg:grid">${portal.revenue.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Growth</span>
                        <p className="text-green-400 font-medium responsive-container sm:flex-col md:flex-row lg:grid">+{portal.growth}%</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Portal Detail Modal */}
      <AnimatePresence>
        {selectedPortal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50 responsive-container sm:flex-col md:flex-row lg:grid"
            onClick={() => setSelectedPortal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-4xl w-full border border-white/20 max-h-[90vh] overflow-y-auto responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                    <Globe className="w-6 h-6 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">{selectedPortal.name}</h3>
                    <p className="text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">{selectedPortal.description}</p>
                  </div>
                </div>
                <button
                  onClick={() = aria-label="Button"> setSelectedPortal(null)}
                  className="text-gray-400 hover:text-white transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  <X className="w-6 h-6 responsive-container sm:flex-col md:flex-row lg:grid" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 responsive-container sm:flex-col md:flex-row lg:grid">
                {/* Left Column - Basic Info */}
                <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Portal Information</h4>
                    <div className="space-y-3 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="flex justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                        <span className="text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Status</span>
                        <div className={`px-3 py-1 rounded-full text-sm ${getStatusColor(selectedPortal.status)}`}>
                          {selectedPortal.status}
                        </div>
                      </div>
                      <div className="flex justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                        <span className="text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Category</span>
                        <div className={`px-3 py-1 rounded-full text-sm ${getCategoryColor(selectedPortal.category)}`}>
                          {selectedPortal.category}
                        </div>
                      </div>
                      <div className="flex justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                        <span className="text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Version</span>
                        <span className="text-white responsive-container sm:flex-col md:flex-row lg:grid">{selectedPortal.version}</span>
                      </div>
                      <div className="flex justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                        <span className="text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Location</span>
                        <span className="text-white responsive-container sm:flex-col md:flex-row lg:grid">{selectedPortal.location}</span>
                      </div>
                      <div className="flex justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                        <span className="text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Priority</span>
                        <span className={`font-medium ${getPriorityColor(selectedPortal.priority)}`}>
                          {selectedPortal.priority}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Performance Metrics</h4>
                    <div className="space-y-3 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div>
                        <div className="flex justify-between text-sm mb-1 responsive-container sm:flex-col md:flex-row lg:grid">
                          <span className="text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">CPU Usage</span>
                          <span className="text-white responsive-container sm:flex-col md:flex-row lg:grid">{selectedPortal.cpu}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 responsive-container sm:flex-col md:flex-row lg:grid">
                          <div 
                            className="bg-blue-400 h-2 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"
                            style={{ width: `${selectedPortal.cpu}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1 responsive-container sm:flex-col md:flex-row lg:grid">
                          <span className="text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Memory Usage</span>
                          <span className="text-white responsive-container sm:flex-col md:flex-row lg:grid">{selectedPortal.memory}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 responsive-container sm:flex-col md:flex-row lg:grid">
                          <div 
                            className="bg-green-400 h-2 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"
                            style={{ width: `${selectedPortal.memory}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1 responsive-container sm:flex-col md:flex-row lg:grid">
                          <span className="text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Storage Usage</span>
                          <span className="text-white responsive-container sm:flex-col md:flex-row lg:grid">{selectedPortal.storage}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 responsive-container sm:flex-col md:flex-row lg:grid">
                          <div 
                            className="bg-purple-400 h-2 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"
                            style={{ width: `${selectedPortal.storage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1 responsive-container sm:flex-col md:flex-row lg:grid">
                          <span className="text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Bandwidth Usage</span>
                          <span className="text-white responsive-container sm:flex-col md:flex-row lg:grid">{selectedPortal.bandwidth}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 responsive-container sm:flex-col md:flex-row lg:grid">
                          <div 
                            className="bg-orange-400 h-2 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"
                            style={{ width: `${selectedPortal.bandwidth}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Features & Actions */}
                <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Features</h4>
                    <div className="flex flex-wrap gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                      {selectedPortal.features.map((feature, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-emerald-600/20 text-emerald-300 rounded-full text-sm responsive-container sm:flex-col md:flex-row lg:grid"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Integrations</h4>
                    <div className="flex flex-wrap gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                      {selectedPortal.integrations.map((integration, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm responsive-container sm:flex-col md:flex-row lg:grid"
                        >
                          {integration}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Business Metrics</h4>
                    <div className="grid grid-cols-2 gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="bg-white/5 rounded-lg p-3 responsive-container sm:flex-col md:flex-row lg:grid">
                        <p className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Monthly Revenue</p>
                        <p className="text-lg font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">${selectedPortal.revenue.toLocaleString()}</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3 responsive-container sm:flex-col md:flex-row lg:grid">
                        <p className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Growth Rate</p>
                        <p className="text-lg font-bold text-green-400 responsive-container sm:flex-col md:flex-row lg:grid">+{selectedPortal.growth}%</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3 responsive-container sm:flex-col md:flex-row lg:grid">
                        <p className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Monthly Cost</p>
                        <p className="text-lg font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">${selectedPortal.cost.toLocaleString()}</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3 responsive-container sm:flex-col md:flex-row lg:grid">
                        <p className="text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">ROI</p>
                        <p className="text-lg font-bold text-green-400 responsive-container sm:flex-col md:flex-row lg:grid">
                          {Math.round((selectedPortal.revenue / selectedPortal.cost) * 100)}%
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Portal Actions</h4>
                    <div className="grid grid-cols-2 gap-3 responsive-container sm:flex-col md:flex-row lg:grid">
                      <button className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                        <Play className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                        <span>Start Portal</span>
                      </button>
                      <button className="bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                        <Pause className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                        <span>Pause Portal</span>
                      </button>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                        <RotateCcw className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                        <span>Restart Portal</span>
                      </button>
                      <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                        <Settings className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                        <span>Configure</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortalControlHub;
