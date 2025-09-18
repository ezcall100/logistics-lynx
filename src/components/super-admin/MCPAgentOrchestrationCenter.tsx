import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Activity,
  Shield,
  Brain,
  Network,
  Play,
  Pause,
  RotateCcw,
  AlertTriangle,
  Terminal,
  BarChart3,
  X} from 'lucide-react';

interface MCPAgent {
  id: string;
  name: string;
  type: 'core' | 'portal' | 'security' | 'analytics' | 'automation' | 'integration';
  status: 'active' | 'idle' | 'error' | 'maintenance';
  cpu: number;
  memory: number;
  uptime: number;
  tasksCompleted: number;
  lastActivity: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  location: string;
  capabilities: string[];
  health: number;
}

interface AgentCluster {
  id: string;
  name: string;
  agents: MCPAgent[];
  totalCapacity: number;
  utilization: number;
  status: 'healthy' | 'warning' | 'critical';
}

const MCPAgentOrchestrationCenter: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<MCPAgent | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'cluster'>('cluster');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [realTimeData, setRealTimeData] = useState(true);

  // Mock data for 302 MCP agents (251 existing + 51 new testing agents) organized by clusters
  const agentClusters: AgentCluster[] = [
    {
      id: 'core-systems',
      name: 'Core Systems',
      totalCapacity: 100,
      utilization: 78,
      status: 'healthy',
      agents: Array.from({ length: 50 }, (_, i) => ({
        id: `core-${i + 1}`,
        name: `Core Agent ${i + 1}`,
        type: 'core' as const,
        status: ['active', 'idle', 'error', 'maintenance'][Math.floor(Math.random() * 4)] as
          | 'active'
          | 'idle'
          | 'error'
          | 'maintenance',
        cpu: Math.floor(Math.random() * 100),
        memory: Math.floor(Math.random() * 100),
        uptime: Math.floor(Math.random() * 100),
        tasksCompleted: Math.floor(Math.random() * 1000),
        lastActivity: '2 minutes ago',
        priority: ['critical', 'high', 'medium', 'low'][Math.floor(Math.random() * 4)] as
          | 'critical'
          | 'high'
          | 'medium'
          | 'low',
        location: 'US-East-1',
        capabilities: ['System Management', 'Database Operations', 'API Management'],
        health: Math.floor(Math.random() * 100)}))},
    {
      id: 'portal-management',
      name: 'Portal Management',
      totalCapacity: 100,
      utilization: 65,
      status: 'healthy',
      agents: Array.from({ length: 40 }, (_, i) => ({
        id: `portal-${i + 1}`,
        name: `Portal Agent ${i + 1}`,
        type: 'portal' as const,
        status: ['active', 'idle', 'error', 'maintenance'][Math.floor(Math.random() * 4)] as
          | 'active'
          | 'idle'
          | 'error'
          | 'maintenance',
        cpu: Math.floor(Math.random() * 100),
        memory: Math.floor(Math.random() * 100),
        uptime: Math.floor(Math.random() * 100),
        tasksCompleted: Math.floor(Math.random() * 1000),
        lastActivity: '1 minute ago',
        priority: ['critical', 'high', 'medium', 'low'][Math.floor(Math.random() * 4)] as
          | 'critical'
          | 'high'
          | 'medium'
          | 'low',
        location: 'US-West-2',
        capabilities: ['Portal Control', 'User Management', 'Feature Toggles'],
        health: Math.floor(Math.random() * 100)}))},
    {
      id: 'security-monitoring',
      name: 'Security & Monitoring',
      totalCapacity: 100,
      utilization: 45,
      status: 'healthy',
      agents: Array.from({ length: 35 }, (_, i) => ({
        id: `security-${i + 1}`,
        name: `Security Agent ${i + 1}`,
        type: 'security' as const,
        status: ['active', 'idle', 'error', 'maintenance'][Math.floor(Math.random() * 4)] as
          | 'active'
          | 'idle'
          | 'error'
          | 'maintenance',
        cpu: Math.floor(Math.random() * 100),
        memory: Math.floor(Math.random() * 100),
        uptime: Math.floor(Math.random() * 100),
        tasksCompleted: Math.floor(Math.random() * 1000),
        lastActivity: '30 seconds ago',
        priority: ['critical', 'high', 'medium', 'low'][Math.floor(Math.random() * 4)] as
          | 'critical'
          | 'high'
          | 'medium'
          | 'low',
        location: 'EU-Central-1',
        capabilities: ['Threat Detection', 'Access Control', 'Audit Logging'],
        health: Math.floor(Math.random() * 100)}))},
    {
      id: 'analytics-intelligence',
      name: 'Analytics & Intelligence',
      totalCapacity: 100,
      utilization: 82,
      status: 'warning',
      agents: Array.from({ length: 30 }, (_, i) => ({
        id: `analytics-${i + 1}`,
        name: `Analytics Agent ${i + 1}`,
        type: 'analytics' as const,
        status: ['active', 'idle', 'error', 'maintenance'][Math.floor(Math.random() * 4)] as
          | 'active'
          | 'idle'
          | 'error'
          | 'maintenance',
        cpu: Math.floor(Math.random() * 100),
        memory: Math.floor(Math.random() * 100),
        uptime: Math.floor(Math.random() * 100),
        tasksCompleted: Math.floor(Math.random() * 1000),
        lastActivity: '5 minutes ago',
        priority: ['critical', 'high', 'medium', 'low'][Math.floor(Math.random() * 4)] as
          | 'critical'
          | 'high'
          | 'medium'
          | 'low',
        location: 'AP-Southeast-1',
        capabilities: ['Data Processing', 'ML Models', 'Predictive Analytics'],
        health: Math.floor(Math.random() * 100)}))},
    {
      id: 'automation-workflows',
      name: 'Automation & Workflows',
      totalCapacity: 100,
      utilization: 71,
      status: 'healthy',
      agents: Array.from({ length: 45 }, (_, i) => ({
        id: `automation-${i + 1}`,
        name: `Automation Agent ${i + 1}`,
        type: 'automation' as const,
        status: ['active', 'idle', 'error', 'maintenance'][Math.floor(Math.random() * 4)] as
          | 'active'
          | 'idle'
          | 'error'
          | 'maintenance',
        cpu: Math.floor(Math.random() * 100),
        memory: Math.floor(Math.random() * 100),
        uptime: Math.floor(Math.random() * 100),
        tasksCompleted: Math.floor(Math.random() * 1000),
        lastActivity: '3 minutes ago',
        priority: ['critical', 'high', 'medium', 'low'][Math.floor(Math.random() * 4)] as
          | 'critical'
          | 'high'
          | 'medium'
          | 'low',
        location: 'US-Central-1',
        capabilities: ['Workflow Automation', 'Task Scheduling', 'Process Optimization'],
        health: Math.floor(Math.random() * 100)}))},
    {
      id: 'integration-services',
      name: 'Integration Services',
      totalCapacity: 100,
      utilization: 58,
      status: 'healthy',
      agents: Array.from({ length: 50 }, (_, i) => ({
        id: `integration-${i + 1}`,
        name: `Integration Agent ${i + 1}`,
        type: 'integration' as const,
        status: ['active', 'idle', 'error', 'maintenance'][Math.floor(Math.random() * 4)] as
          | 'active'
          | 'idle'
          | 'error'
          | 'maintenance',
        cpu: Math.floor(Math.random() * 100),
        memory: Math.floor(Math.random() * 100),
        uptime: Math.floor(Math.random() * 100),
        tasksCompleted: Math.floor(Math.random() * 1000),
        lastActivity: '4 minutes ago',
        priority: ['critical', 'high', 'medium', 'low'][Math.floor(Math.random() * 4)] as
          | 'critical'
          | 'high'
          | 'medium'
          | 'low',
        location: 'Global',
        capabilities: ['API Integration', 'Data Sync', 'Third-party Services'],
        health: Math.floor(Math.random() * 100)}))},
    {
      id: 'testing-framework',
      name: 'A-Z Testing Framework',
      totalCapacity: 100,
      utilization: 95,
      status: 'healthy',
      agents: [
        // Planning & Setup Agents (Group A)
        {
          id: 'planbot',
          name: 'PlanBot',
          type: 'automation' as const,
          status: 'active' as const,
          cpu: 45,
          memory: 60,
          uptime: 99,
          tasksCompleted: 1250,
          lastActivity: '1 minute ago',
          priority: 'high' as const,
          location: 'US-East-1',
          capabilities: ['Strategy Planning', 'Test Coverage Mapping', 'Resource Allocation'],
          health: 98},
        {
          id: 'casebot',
          name: 'CaseBot',
          type: 'automation' as const,
          status: 'active' as const,
          cpu: 52,
          memory: 55,
          uptime: 99,
          tasksCompleted: 1180,
          lastActivity: '2 minutes ago',
          priority: 'high' as const,
          location: 'US-East-1',
          capabilities: ['Test Case Generation', 'Form Testing', 'Table Testing'],
          health: 97},
        {
          id: 'databot',
          name: 'DataBot',
          type: 'automation' as const,
          status: 'active' as const,
          cpu: 38,
          memory: 70,
          uptime: 99,
          tasksCompleted: 980,
          lastActivity: '1 minute ago',
          priority: 'high' as const,
          location: 'US-East-1',
          capabilities: ['Mock Data Generation', 'API Test Data', 'Table Population'],
          health: 96},

        // Core UI Testing Agents (Group B)
        {
          id: 'formbot',
          name: 'FormBot',
          type: 'automation' as const,
          status: 'active' as const,
          cpu: 48,
          memory: 45,
          uptime: 99,
          tasksCompleted: 1100,
          lastActivity: '1 minute ago',
          priority: 'critical' as const,
          location: 'US-East-1',
          capabilities: ['Form Validation', 'Error Handling', 'Submission Testing'],
          health: 99},
        {
          id: 'tablebot',
          name: 'TableBot',
          type: 'automation' as const,
          status: 'active' as const,
          cpu: 55,
          memory: 50,
          uptime: 99,
          tasksCompleted: 1200,
          lastActivity: '2 minutes ago',
          priority: 'critical' as const,
          location: 'US-East-1',
          capabilities: ['Table Operations', 'Sorting', 'Filtering', 'Pagination'],
          health: 98},
        {
          id: 'buttonbot',
          name: 'ButtonBot',
          type: 'automation' as const,
          status: 'active' as const,
          cpu: 42,
          memory: 40,
          uptime: 99,
          tasksCompleted: 1050,
          lastActivity: '1 minute ago',
          priority: 'critical' as const,
          location: 'US-East-1',
          capabilities: ['CRUD Operations', 'State Validation', 'Action Testing'],
          health: 97},
        {
          id: 'menubot',
          name: 'MenuBot',
          type: 'automation' as const,
          status: 'active' as const,
          cpu: 35,
          memory: 35,
          uptime: 99,
          tasksCompleted: 950,
          lastActivity: '2 minutes ago',
          priority: 'high' as const,
          location: 'US-East-1',
          capabilities: ['Menu Navigation', 'State Management', 'Accessibility'],
          health: 96},
        {
          id: 'searchbot',
          name: 'SearchBot',
          type: 'automation' as const,
          status: 'active' as const,
          cpu: 60,
          memory: 55,
          uptime: 99,
          tasksCompleted: 1300,
          lastActivity: '1 minute ago',
          priority: 'high' as const,
          location: 'US-East-1',
          capabilities: ['Search Functionality', 'Filter Validation', 'Result Accuracy'],
          health: 98},
        {
          id: 'threedotbot',
          name: 'ThreeDotBot',
          type: 'automation' as const,
          status: 'active' as const,
          cpu: 30,
          memory: 30,
          uptime: 99,
          tasksCompleted: 800,
          lastActivity: '2 minutes ago',
          priority: 'medium' as const,
          location: 'US-East-1',
          capabilities: ['Action Menu Testing', 'Modal Testing'],
          health: 95},
        {
          id: 'modalbot',
          name: 'ModalBot',
          type: 'automation' as const,
          status: 'active' as const,
          cpu: 40,
          memory: 45,
          uptime: 99,
          tasksCompleted: 900,
          lastActivity: '1 minute ago',
          priority: 'high' as const,
          location: 'US-East-1',
          capabilities: ['Modal Workflow', 'Form Modals', 'State Management'],
          health: 97},
        {
          id: 'filterbot',
          name: 'FilterBot',
          type: 'automation' as const,
          status: 'active' as const,
          cpu: 50,
          memory: 50,
          uptime: 99,
          tasksCompleted: 1000,
          lastActivity: '2 minutes ago',
          priority: 'high' as const,
          location: 'US-East-1',
          capabilities: ['Advanced Filters', 'Filter Logic', 'Performance'],
          health: 96},
        {
          id: 'sortbot',
          name: 'SortBot',
          type: 'automation' as const,
          status: 'active' as const,
          cpu: 45,
          memory: 40,
          uptime: 99,
          tasksCompleted: 950,
          lastActivity: '1 minute ago',
          priority: 'high' as const,
          location: 'US-East-1',
          capabilities: ['Sorting Validation', 'Multi-column', 'Performance'],
          health: 97},

        // Header & Hub Validation Agents (Group C)
        {
          id: 'headerbot',
          name: 'HeaderBot',
          type: 'automation' as const,
          status: 'active' as const,
          cpu: 35,
          memory: 35,
          uptime: 99,
          tasksCompleted: 850,
          lastActivity: '2 minutes ago',
          priority: 'high' as const,
          location: 'US-East-1',
          capabilities: ['Header Functionality', 'Profile Testing', 'Settings Validation'],
          health: 96},
        {
          id: 'hubbot',
          name: 'HubBot',
          type: 'automation' as const,
          status: 'active' as const,
          cpu: 55,
          memory: 60,
          uptime: 99,
          tasksCompleted: 1150,
          lastActivity: '1 minute ago',
          priority: 'critical' as const,
          location: 'US-East-1',
          capabilities: ['Communication Hub', 'Real-time Chat', 'Alert System'],
          health: 98},
        {
          id: 'toastbot',
          name: 'ToastBot',
          type: 'automation' as const,
          status: 'active' as const,
          cpu: 30,
          memory: 30,
          uptime: 99,
          tasksCompleted: 750,
          lastActivity: '2 minutes ago',
          priority: 'medium' as const,
          location: 'US-East-1',
          capabilities: ['Notifications', 'Toast Messages', 'Alert Testing'],
          health: 95},
        {
          id: 'alertbot',
          name: 'AlertBot',
          type: 'automation' as const,
          status: 'active' as const,
          cpu: 40,
          memory: 45,
          uptime: 99,
          tasksCompleted: 900,
          lastActivity: '1 minute ago',
          priority: 'high' as const,
          location: 'US-East-1',
          capabilities: ['System Alerts', 'Warning Detection', 'Message Validation'],
          health: 97},

        // Workflow & API Agents (Group D)
        {
          id: 'apibot',
          name: 'APIbot',
          type: 'automation' as const,
          status: 'active' as const,
          cpu: 70,
          memory: 65,
          uptime: 99,
          tasksCompleted: 1500,
          lastActivity: '1 minute ago',
          priority: 'critical' as const,
          location: 'US-East-1',
          capabilities: ['API Testing', 'Endpoint Validation', 'Error Handling'],
          health: 99},
        {
          id: 'flowbot',
          name: 'FlowBot',
          type: 'automation' as const,
          status: 'active' as const,
          cpu: 65,
          memory: 70,
          uptime: 99,
          tasksCompleted: 1400,
          lastActivity: '2 minutes ago',
          priority: 'critical' as const,
          location: 'US-East-1',
          capabilities: ['Workflow Testing', 'Process Validation', 'Integration'],
          health: 98},
        {
          id: 'exportbot',
          name: 'ExportBot',
          type: 'automation' as const,
          status: 'active' as const,
          cpu: 50,
          memory: 55,
          uptime: 99,
          tasksCompleted: 1000,
          lastActivity: '1 minute ago',
          priority: 'high' as const,
          location: 'US-East-1',
          capabilities: ['Data Export', 'File Format Validation', 'Download Testing'],
          health: 97},
        {
          id: 'importbot',
          name: 'ImportBot',
          type: 'automation' as const,
          status: 'active' as const,
          cpu: 55,
          memory: 60,
          uptime: 99,
          tasksCompleted: 1100,
          lastActivity: '2 minutes ago',
          priority: 'high' as const,
          location: 'US-East-1',
          capabilities: ['Data Import', 'Bulk Operations', 'Upload Validation'],
          health: 96},

        // Performance & Scale Agents (Group E)
        {
          id: 'perfbot',
          name: 'PerfBot',
          type: 'automation' as const,
          status: 'active' as const,
          cpu: 80,
          memory: 75,
          uptime: 99,
          tasksCompleted: 1800,
          lastActivity: '1 minute ago',
          priority: 'critical' as const,
          location: 'US-East-1',
          capabilities: ['Load Testing', 'Stress Testing', 'Performance Benchmarking'],
          health: 99},
        {
          id: 'scalebot',
          name: 'ScaleBot',
          type: 'automation' as const,
          status: 'active' as const,
          cpu: 75,
          memory: 70,
          uptime: 99,
          tasksCompleted: 1600,
          lastActivity: '2 minutes ago',
          priority: 'high' as const,
          location: 'US-East-1',
          capabilities: ['Scalability Analysis', 'Growth Testing', 'Capacity Planning'],
          health: 98},
        {
          id: 'speedbot',
          name: 'SpeedBot',
          type: 'automation' as const,
          status: 'active' as const,
          cpu: 60,
          memory: 55,
          uptime: 99,
          tasksCompleted: 1200,
          lastActivity: '1 minute ago',
          priority: 'high' as const,
          location: 'US-East-1',
          capabilities: ['Performance Monitoring', 'Latency Detection', 'Optimization'],
          health: 97},
        {
          id: 'cleanbot',
          name: 'CleanBot',
          type: 'automation' as const,
          status: 'active' as const,
          cpu: 45,
          memory: 50,
          uptime: 99,
          tasksCompleted: 900,
          lastActivity: '2 minutes ago',
          priority: 'medium' as const,
          location: 'US-East-1',
          capabilities: ['Performance Optimization', 'Code Cleanup', 'Resource Management'],
          health: 96},
        {
          id: 'statebot',
          name: 'StateBot',
          type: 'automation' as const,
          status: 'active' as const,
          cpu: 50,
          memory: 45,
          uptime: 99,
          tasksCompleted: 1000,
          lastActivity: '1 minute ago',
          priority: 'high' as const,
          location: 'US-East-1',
          capabilities: ['State Management', 'Consistency Validation', 'Error Detection'],
          health: 97},

        // Security & Compliance Agents (Group F)
        {
          id: 'vulnbot',
          name: 'VulnBot',
          type: 'security' as const,
          status: 'active' as const,
          cpu: 70,
          memory: 65,
          uptime: 99,
          tasksCompleted: 1500,
          lastActivity: '1 minute ago',
          priority: 'critical' as const,
          location: 'US-East-1',
          capabilities: ['Vulnerability Scanning', 'Security Testing', 'Threat Detection'],
          health: 99},
        {
          id: 'penbot',
          name: 'PenBot',
          type: 'security' as const,
          status: 'active' as const,
          cpu: 75,
          memory: 70,
          uptime: 99,
          tasksCompleted: 1600,
          lastActivity: '2 minutes ago',
          priority: 'critical' as const,
          location: 'US-East-1',
          capabilities: ['Penetration Testing', 'Attack Simulation', 'Defense Validation'],
          health: 98},
        {
          id: 'securebot',
          name: 'SecureBot',
          type: 'security' as const,
          status: 'active' as const,
          cpu: 65,
          memory: 60,
          uptime: 99,
          tasksCompleted: 1400,
          lastActivity: '1 minute ago',
          priority: 'critical' as const,
          location: 'US-East-1',
          capabilities: ['Compliance Checking', 'Standard Validation', 'Regulatory Testing'],
          health: 97},
        {
          id: 'dataguard',
          name: 'DataGuard',
          type: 'security' as const,
          status: 'active' as const,
          cpu: 60,
          memory: 55,
          uptime: 99,
          tasksCompleted: 1200,
          lastActivity: '2 minutes ago',
          priority: 'critical' as const,
          location: 'US-East-1',
          capabilities: ['Data Leak Detection', 'Privacy Validation', 'Exposure Prevention'],
          health: 98},
        {
          id: 'rolebot',
          name: 'RoleBot',
          type: 'security' as const,
          status: 'active' as const,
          cpu: 55,
          memory: 50,
          uptime: 99,
          tasksCompleted: 1100,
          lastActivity: '1 minute ago',
          priority: 'high' as const,
          location: 'US-East-1',
          capabilities: ['Access Control Testing', 'Permission Validation', 'Security Policy'],
          health: 97},
        {
          id: 'historybot',
          name: 'HistoryBot',
          type: 'security' as const,
          status: 'active' as const,
          cpu: 50,
          memory: 45,
          uptime: 99,
          tasksCompleted: 1000,
          lastActivity: '2 minutes ago',
          priority: 'high' as const,
          location: 'US-East-1',
          capabilities: ['Audit Trail Testing', 'Change Tracking', 'Log Integrity'],
          health: 96},

        // UI/UX & Visuals Agents (Group G)
        {
          id: 'visbot',
          name: 'VisBot',
          type: 'automation' as const,
          status: 'active' as const,
          cpu: 60,
          memory: 55,
          uptime: 99,
          tasksCompleted: 1200,
          lastActivity: '1 minute ago',
          priority: 'high' as const,
          location: 'US-East-1',
          capabilities: ['Visual Regression', 'Layout Comparison', 'UI Consistency'],
          health: 98},
        {
          id: 'themebot',
          name: 'ThemeBot',
          type: 'automation' as const,
          status: 'active' as const,
          cpu: 45,
          memory: 40,
          uptime: 99,
          tasksCompleted: 900,
          lastActivity: '2 minutes ago',
          priority: 'medium' as const,
          location: 'US-East-1',
          capabilities: ['Theme Validation', 'Mode Testing', 'Effect Validation'],
          health: 96},
        {
          id: 'responbot',
          name: 'ResponBot',
          type: 'automation' as const,
          status: 'active' as const,
          cpu: 55,
          memory: 50,
          uptime: 99,
          tasksCompleted: 1100,
          lastActivity: '1 minute ago',
          priority: 'high' as const,
          location: 'US-East-1',
          capabilities: ['Responsive Testing', 'Device Validation', 'Layout Adaptation'],
          health: 97},
        {
          id: 'a11ybot',
          name: 'A11yBot',
          type: 'automation' as const,
          status: 'active' as const,
          cpu: 50,
          memory: 45,
          uptime: 99,
          tasksCompleted: 1000,
          lastActivity: '2 minutes ago',
          priority: 'high' as const,
          location: 'US-East-1',
          capabilities: ['Accessibility Testing', 'WCAG Compliance', 'Screen Reader'],
          health: 96},
        {
          id: 'stylebot',
          name: 'StyleBot',
          type: 'automation' as const,
          status: 'active' as const,
          cpu: 40,
          memory: 35,
          uptime: 99,
          tasksCompleted: 800,
          lastActivity: '1 minute ago',
          priority: 'medium' as const,
          location: 'US-East-1',
          capabilities: ['CSS Validation', 'Token Enforcement', 'Consistency Checking'],
          health: 95},
        {
          id: 'tokenbot',
          name: 'TokenBot',
          type: 'automation' as const,
          status: 'active' as const,
          cpu: 35,
          memory: 30,
          uptime: 99,
          tasksCompleted: 750,
          lastActivity: '2 minutes ago',
          priority: 'medium' as const,
          location: 'US-East-1',
          capabilities: ['Design Token Validation', 'Brand Consistency', 'Identity Enforcement'],
          health: 94},

        // CI/CD Automation Agents (Group H)
        {
          id: 'buildbot',
          name: 'BuildBot',
          type: 'automation' as const,
          status: 'active' as const,
          cpu: 70,
          memory: 65,
          uptime: 99,
          tasksCompleted: 1500,
          lastActivity: '1 minute ago',
          priority: 'critical' as const,
          location: 'US-East-1',
          capabilities: ['CI Validation', 'Build Testing', 'Deployment Readiness'],
          health: 99},
        {
          id: 'deploybot',
          name: 'DeployBot',
          type: 'automation' as const,
          status: 'active' as const,
          cpu: 65,
          memory: 60,
          uptime: 99,
          tasksCompleted: 1400,
          lastActivity: '2 minutes ago',
          priority: 'critical' as const,
          location: 'US-East-1',
          capabilities: ['Deployment Validation', 'Environment Testing', 'Staging Verification'],
          health: 98},
        {
          id: 'rollbot',
          name: 'RollBot',
          type: 'automation' as const,
          status: 'active' as const,
          cpu: 55,
          memory: 50,
          uptime: 99,
          tasksCompleted: 1100,
          lastActivity: '1 minute ago',
          priority: 'high' as const,
          location: 'US-East-1',
          capabilities: ['Rollback Testing', 'Recovery Validation', 'Version Management'],
          health: 97},
        {
          id: 'watchbot',
          name: 'WatchBot',
          type: 'automation' as const,
          status: 'active' as const,
          cpu: 60,
          memory: 55,
          uptime: 99,
          tasksCompleted: 1200,
          lastActivity: '2 minutes ago',
          priority: 'critical' as const,
          location: 'US-East-1',
          capabilities: ['Real-time Monitoring', 'Crash Detection', 'Error Tracking'],
          health: 98},

        // Analytics, Insights & AI Agents (Group I)
        {
          id: 'explorebot',
          name: 'ExploreBot',
          type: 'analytics' as const,
          status: 'active' as const,
          cpu: 50,
          memory: 45,
          uptime: 99,
          tasksCompleted: 1000,
          lastActivity: '1 minute ago',
          priority: 'medium' as const,
          location: 'US-East-1',
          capabilities: ['Exploratory Testing', 'Random Testing', 'Edge Case Discovery'],
          health: 96},
        {
          id: 'bugbot',
          name: 'BugBot',
          type: 'analytics' as const,
          status: 'active' as const,
          cpu: 55,
          memory: 50,
          uptime: 99,
          tasksCompleted: 1100,
          lastActivity: '2 minutes ago',
          priority: 'high' as const,
          location: 'US-East-1',
          capabilities: ['Bug Detection', 'Priority Assignment', 'Issue Tracking'],
          health: 97},
        {
          id: 'simbot',
          name: 'SimBot',
          type: 'analytics' as const,
          status: 'active' as const,
          cpu: 60,
          memory: 55,
          uptime: 99,
          tasksCompleted: 1200,
          lastActivity: '1 minute ago',
          priority: 'high' as const,
          location: 'US-East-1',
          capabilities: ['User Behavior Simulation', 'Workflow Testing', 'User Journey'],
          health: 98},
        {
          id: 'metricbot',
          name: 'MetricBot',
          type: 'analytics' as const,
          status: 'active' as const,
          cpu: 65,
          memory: 60,
          uptime: 99,
          tasksCompleted: 1300,
          lastActivity: '2 minutes ago',
          priority: 'high' as const,
          location: 'US-East-1',
          capabilities: ['QA Metrics Collection', 'Dashboard Generation', 'Performance Tracking'],
          health: 98},
        {
          id: 'trendbot',
          name: 'TrendBot',
          type: 'analytics' as const,
          status: 'active' as const,
          cpu: 55,
          memory: 50,
          uptime: 99,
          tasksCompleted: 1100,
          lastActivity: '1 minute ago',
          priority: 'medium' as const,
          location: 'US-East-1',
          capabilities: ['Trend Analysis', 'Pattern Recognition', 'Predictive Analytics'],
          health: 97},
        {
          id: 'predictbot',
          name: 'PredictBot',
          type: 'analytics' as const,
          status: 'active' as const,
          cpu: 70,
          memory: 65,
          uptime: 99,
          tasksCompleted: 1400,
          lastActivity: '2 minutes ago',
          priority: 'high' as const,
          location: 'US-East-1',
          capabilities: ['Risk Prediction', 'Failure Forecasting', 'Health Assessment'],
          health: 98},
        {
          id: 'realbot',
          name: 'RealBot',
          type: 'automation' as const,
          status: 'active' as const,
          cpu: 60,
          memory: 55,
          uptime: 99,
          tasksCompleted: 1200,
          lastActivity: '1 minute ago',
          priority: 'high' as const,
          location: 'US-East-1',
          capabilities: ['Real-time Sync Testing', 'Supabase Validation', 'Live Updates'],
          health: 97},
        {
          id: 'reportbot',
          name: 'ReportBot',
          type: 'analytics' as const,
          status: 'active' as const,
          cpu: 50,
          memory: 45,
          uptime: 99,
          tasksCompleted: 1000,
          lastActivity: '2 minutes ago',
          priority: 'medium' as const,
          location: 'US-East-1',
          capabilities: [
            'Test Report Generation',
            'Documentation Creation',
            'Compliance Reporting'],
          health: 96},
        {
          id: 'searchaibot',
          name: 'SearchAIBot',
          type: 'analytics' as const,
          status: 'active' as const,
          cpu: 65,
          memory: 60,
          uptime: 99,
          tasksCompleted: 1300,
          lastActivity: '1 minute ago',
          priority: 'high' as const,
          location: 'US-East-1',
          capabilities: ['AI Search Testing', 'Prediction Validation', 'ML Integration'],
          health: 98}]}];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-400 bg-green-400/20';
      case 'idle':
        return 'text-yellow-400 bg-yellow-400/20';
      case 'error':
        return 'text-red-400 bg-red-400/20';
      case 'maintenance':
        return 'text-blue-400 bg-blue-400/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'text-red-500';
      case 'high':
        return 'text-orange-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const getClusterStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'border-green-500 bg-green-500/10';
      case 'warning':
        return 'border-yellow-500 bg-yellow-500/10';
      case 'critical':
        return 'border-red-500 bg-red-500/10';
      default:
        return 'border-gray-500 bg-gray-500/10';
    }
  };

  const totalAgents = agentClusters.reduce((sum, cluster) => sum + cluster.agents.length, 0);
  const activeAgents = agentClusters.reduce(
    (sum, cluster) => sum + cluster.agents.filter(agent => agent.status === 'active').length,
    0
  );
  const errorAgents = agentClusters.reduce(
    (sum, cluster) => sum + cluster.agents.filter(agent => agent.status === 'error').length,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Header */}
      <div className="mb-8 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
              🤖 MCP Agent Orchestration Center
            </h1>
            <p className="text-gray-300 text-lg responsive-container sm:flex-col md:flex-row lg:grid">
              Real-time monitoring and control of all 302 MCP agents (251 existing + 51 new testing
              agents)
            </p>
          </div>
          <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse responsive-container sm:flex-col md:flex-row lg:grid"></div>
              <span className="text-white font-medium responsive-container sm:flex-col md:flex-row lg:grid">Live</span>
            </div>
            <button
              onClick={() => setRealTimeData(!realTimeData)}
            aria-label="Button"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
            >
              {realTimeData ? 'Pause Updates' : 'Resume Updates'}
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 responsive-container sm:flex-col md:flex-row lg:grid">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
              <div>
                <p className="text-gray-300 text-sm responsive-container sm:flex-col md:flex-row lg:grid">Total Agents</p>
                <p className="text-3xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">{totalAgents}</p>
              </div>
              <Bot className="w-8 h-8 text-purple-400 responsive-container sm:flex-col md:flex-row lg:grid" />
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
                <p className="text-gray-300 text-sm responsive-container sm:flex-col md:flex-row lg:grid">Active Agents</p>
                <p className="text-3xl font-bold text-green-400 responsive-container sm:flex-col md:flex-row lg:grid">{activeAgents}</p>
              </div>
              <Activity className="w-8 h-8 text-green-400 responsive-container sm:flex-col md:flex-row lg:grid" />
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
                <p className="text-gray-300 text-sm responsive-container sm:flex-col md:flex-row lg:grid">Error Agents</p>
                <p className="text-3xl font-bold text-red-400 responsive-container sm:flex-col md:flex-row lg:grid">{errorAgents}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-400 responsive-container sm:flex-col md:flex-row lg:grid" />
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
                <p className="text-gray-300 text-sm responsive-container sm:flex-col md:flex-row lg:grid">System Health</p>
                <p className="text-3xl font-bold text-blue-400 responsive-container sm:flex-col md:flex-row lg:grid">99.7%</p>
              </div>
              <Shield className="w-8 h-8 text-blue-400 responsive-container sm:flex-col md:flex-row lg:grid" />
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
              placeholder="Search agents..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 responsive-container sm:flex-col md:flex-row lg:grid"
            />
          </div>
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <option value="all">All Types</option>
            <option value="core">Core Systems</option>
            <option value="portal">Portal Management</option>
            <option value="security">Security & Monitoring</option>
            <option value="analytics">Analytics & Intelligence</option>
            <option value="automation">Automation & Workflows</option>
            <option value="integration">Integration Services</option>
          </select>
        </div>

        <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
          <button
            onClick={() => setViewMode('cluster')}
            aria-label="Button"
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'cluster'
                ? 'bg-purple-600 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <Network className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            aria-label="Button"
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'grid'
                ? 'bg-purple-600 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <BarChart3 className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            aria-label="Button"
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'list'
                ? 'bg-purple-600 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <Terminal className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
          </button>
        </div>
      </div>

      {/* Agent Clusters */}
      <div className="space-y-8 responsive-container sm:flex-col md:flex-row lg:grid">
        {agentClusters.map((cluster, clusterIndex) => (
          <motion.div
            key={cluster.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: clusterIndex * 0.1 }}
            className={`rounded-xl border-2 ${getClusterStatusColor(cluster.status)} p-6`}
          >
            <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                  <Brain className="w-6 h-6 text-purple-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">{cluster.name}</h3>
                  <p className="text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">
                    {cluster.agents.length} agents • {cluster.utilization}% utilization
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="text-right responsive-container sm:flex-col md:flex-row lg:grid">
                  <p className="text-sm text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">Capacity</p>
                  <p className="text-lg font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">{cluster.totalCapacity}%</p>
                </div>
                <div className="w-16 h-16 relative responsive-container sm:flex-col md:flex-row lg:grid">
                  <svg className="w-16 h-16 transform -rotate-90 responsive-container sm:flex-col md:flex-row lg:grid">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      className="text-white/20 responsive-container sm:flex-col md:flex-row lg:grid"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={`${cluster.utilization * 1.76} 176`}
                      className="text-purple-400 responsive-container sm:flex-col md:flex-row lg:grid"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                    <span className="text-sm font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">{cluster.utilization}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Agent Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
              {cluster.agents.slice(0, 8).map((agent, agentIndex) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: agentIndex * 0.05 }}
                  onClick={() => setSelectedAgent(agent)}
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all cursor-pointer group responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  <div className="flex items-center justify-between mb-3 responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                      <Bot className="w-4 h-4 text-purple-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                      <span className="text-sm font-medium text-white truncate responsive-container sm:flex-col md:flex-row lg:grid">{agent.name}</span>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs ${getStatusColor(agent.status)}`}
                    >
                      {agent.status}
                    </div>
                  </div>

                  <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="flex justify-between text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
                      <span>CPU</span>
                      <span>{agent.cpu}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div
                        className="bg-purple-400 h-1 rounded-full transition-all duration-300 responsive-container sm:flex-col md:flex-row lg:grid"
                        style={{ width: `${agent.cpu}%` }}
                      ></div>
                    </div>

                    <div className="flex justify-between text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
                      <span>Memory</span>
                      <span>{agent.memory}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div
                        className="bg-blue-400 h-1 rounded-full transition-all duration-300 responsive-container sm:flex-col md:flex-row lg:grid"
                        style={{ width: `${agent.memory}%` }}
                      ></div>
                    </div>

                    <div className="flex justify-between text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
                      <span>Health</span>
                      <span className={getPriorityColor(agent.priority)}>{agent.health}%</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-white/10 responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="flex justify-between text-xs text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
                      <span>Tasks</span>
                      <span>{agent.tasksCompleted}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">
                      <span>Location</span>
                      <span>{agent.location}</span>
                    </div>
                  </div>
                </motion.div>
              ))}

              {cluster.agents.length > 8 && (
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
                      <span className="text-white font-bold text-sm responsive-container sm:flex-col md:flex-row lg:grid">+</span>
                    </div>
                    <p className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">
                      +{cluster.agents.length - 8} more agents
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Agent Detail Modal */}
      <AnimatePresence>
        {selectedAgent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50 responsive-container sm:flex-col md:flex-row lg:grid"
            onClick={() => setSelectedAgent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-2xl w-full border border-white/20 responsive-container sm:flex-col md:flex-row lg:grid"
            >
              <div className="flex items-center justify-between mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center responsive-container sm:flex-col md:flex-row lg:grid">
                    <Bot className="w-6 h-6 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white responsive-container sm:flex-col md:flex-row lg:grid">{selectedAgent.name}</h3>
                    <p className="text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">Agent ID: {selectedAgent.id}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAgent(null)}
            aria-label="Button"
                  className="text-gray-400 hover:text-white transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  <X className="w-6 h-6 responsive-container sm:flex-col md:flex-row lg:grid" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div>
                    <label className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Status</label>
                    <div
                      className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(selectedAgent.status)}`}
                    >
                      {selectedAgent.status}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Priority</label>
                    <p
                      className={`text-sm font-medium ${getPriorityColor(selectedAgent.priority)}`}
                    >
                      {selectedAgent.priority}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Location</label>
                    <p className="text-sm text-white responsive-container sm:flex-col md:flex-row lg:grid">{selectedAgent.location}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Last Activity</label>
                    <p className="text-sm text-white responsive-container sm:flex-col md:flex-row lg:grid">{selectedAgent.lastActivity}</p>
                  </div>
                </div>

                <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div>
                    <label className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">CPU Usage</label>
                    <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="flex-1 bg-gray-700 rounded-full h-2 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div
                          className="bg-purple-400 h-2 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"
                          style={{ width: `${selectedAgent.cpu}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-white responsive-container sm:flex-col md:flex-row lg:grid">{selectedAgent.cpu}%</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Memory Usage</label>
                    <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="flex-1 bg-gray-700 rounded-full h-2 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div
                          className="bg-blue-400 h-2 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"
                          style={{ width: `${selectedAgent.memory}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-white responsive-container sm:flex-col md:flex-row lg:grid">{selectedAgent.memory}%</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Health Score</label>
                    <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="flex-1 bg-gray-700 rounded-full h-2 responsive-container sm:flex-col md:flex-row lg:grid">
                        <div
                          className="bg-green-400 h-2 rounded-full responsive-container sm:flex-col md:flex-row lg:grid"
                          style={{ width: `${selectedAgent.health}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-white responsive-container sm:flex-col md:flex-row lg:grid">{selectedAgent.health}%</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid">Tasks Completed</label>
                    <p className="text-sm text-white responsive-container sm:flex-col md:flex-row lg:grid">
                      {selectedAgent.tasksCompleted.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6 responsive-container sm:flex-col md:flex-row lg:grid">
                <label className="text-sm text-gray-400 mb-2 block responsive-container sm:flex-col md:flex-row lg:grid">Capabilities</label>
                <div className="flex flex-wrap gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  {selectedAgent.capabilities.map((capability, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm responsive-container sm:flex-col md:flex-row lg:grid"
                    >
                      {capability}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                  <Play className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                  <span>Start Agent</span>
                </button>
                <button className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                  <Pause className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                  <span>Pause Agent</span>
                </button>
                <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                  <RotateCcw className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                  <span>Restart Agent</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MCPAgentOrchestrationCenter;
}