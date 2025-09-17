import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  Activity, 
  Settings, 
  Play, 
  Pause, 
  RefreshCw,
  Plus,
  Eye
} from 'lucide-react';

const MCPOverview: React.FC = () => {
  const [agents, setAgents] = useState([
    {
      id: 1,
      name: 'Customer Support Bot',
      status: 'active',
      type: 'chatbot',
      lastActivity: '2 minutes ago',
      tasksCompleted: 45,
      successRate: 98.5
    },
    {
      id: 2,
      name: 'Data Processing Agent',
      status: 'idle',
      type: 'automation',
      lastActivity: '1 hour ago',
      tasksCompleted: 123,
      successRate: 99.2
    },
    {
      id: 3,
      name: 'Email Notification Bot',
      status: 'active',
      type: 'notification',
      lastActivity: '5 minutes ago',
      tasksCompleted: 78,
      successRate: 97.8
    }
  ]);

  const [workflows, setWorkflows] = useState([
    {
      id: 1,
      name: 'Order Processing Workflow',
      status: 'running',
      steps: 8,
      lastRun: '10 minutes ago',
      successRate: 96.5
    },
    {
      id: 2,
      name: 'User Onboarding Flow',
      status: 'paused',
      steps: 5,
      lastRun: '2 hours ago',
      successRate: 94.2
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'running':
        return 'bg-green-500';
      case 'idle':
      case 'paused':
        return 'bg-yellow-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
      case 'running':
        return <Badge className="bg-green-100 text-green-800 responsive-container sm:flex-col md:flex-row lg:grid">Active</Badge>;
      case 'idle':
      case 'paused':
        return <Badge className="bg-yellow-100 text-yellow-800 responsive-container sm:flex-col md:flex-row lg:grid">Paused</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800 responsive-container sm:flex-col md:flex-row lg:grid">Error</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 responsive-container sm:flex-col md:flex-row lg:grid">Unknown</Badge>;
    }
  };

  return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
      <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
        <div>
          <h1 className="text-3xl font-bold responsive-container sm:flex-col md:flex-row lg:grid">MCP Overview</h1>
          <p className="text-muted-foreground responsive-container sm:flex-col md:flex-row lg:grid">
            Monitor and manage your Model Context Protocol agents and workflows
          </p>
        </div>
        <div className="flex gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
          <Button variant="outline" className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
            <RefreshCw className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
            Refresh
          </Button>
          <Button className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
            <Plus className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
            Add Agent
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 responsive-container sm:flex-col md:flex-row lg:grid">
            <CardTitle className="text-sm font-medium responsive-container sm:flex-col md:flex-row lg:grid">Total Agents</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground responsive-container sm:flex-col md:flex-row lg:grid" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold responsive-container sm:flex-col md:flex-row lg:grid">{agents.length}</div>
            <p className="text-xs text-muted-foreground responsive-container sm:flex-col md:flex-row lg:grid">
              {agents.filter(a => a.status === 'active').length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 responsive-container sm:flex-col md:flex-row lg:grid">
            <CardTitle className="text-sm font-medium responsive-container sm:flex-col md:flex-row lg:grid">Active Workflows</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground responsive-container sm:flex-col md:flex-row lg:grid" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold responsive-container sm:flex-col md:flex-row lg:grid">
              {workflows.filter(w => w.status === 'running').length}
            </div>
            <p className="text-xs text-muted-foreground responsive-container sm:flex-col md:flex-row lg:grid">
              {workflows.length} total workflows
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 responsive-container sm:flex-col md:flex-row lg:grid">
            <CardTitle className="text-sm font-medium responsive-container sm:flex-col md:flex-row lg:grid">Success Rate</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground responsive-container sm:flex-col md:flex-row lg:grid" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold responsive-container sm:flex-col md:flex-row lg:grid">97.8%</div>
            <p className="text-xs text-muted-foreground responsive-container sm:flex-col md:flex-row lg:grid">
              Average across all agents
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
        <Card>
          <CardHeader>
            <CardTitle>Active Agents</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
            {agents.map((agent) => (
              <div key={agent.id} className="flex items-center justify-between p-4 border rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(agent.status)}`} />
                  <div>
                    <h4 className="font-medium responsive-container sm:flex-col md:flex-row lg:grid">{agent.name}</h4>
                    <p className="text-sm text-muted-foreground responsive-container sm:flex-col md:flex-row lg:grid">
                      {agent.type} • {agent.lastActivity}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  {getStatusBadge(agent.status)}
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Workflows</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
            {workflows.map((workflow) => (
              <div key={workflow.id} className="flex items-center justify-between p-4 border rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(workflow.status)}`} />
                  <div>
                    <h4 className="font-medium responsive-container sm:flex-col md:flex-row lg:grid">{workflow.name}</h4>
                    <p className="text-sm text-muted-foreground responsive-container sm:flex-col md:flex-row lg:grid">
                      {workflow.steps} steps • {workflow.lastRun}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  {getStatusBadge(workflow.status)}
                  <Button variant="ghost" size="sm">
                    {workflow.status === 'running' ? (
                      <Pause className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                    ) : (
                      <Play className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MCPOverview;
