import React, { useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Workflow, 
  Play, 
  Pause, 
  Square, 
  Plus, 
  Edit, 
  Trash2,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const AgentWorkflows: React.FC = () => {
  const [workflows, setWorkflows] = useState([
    {
      id: 1,
      name: 'Customer Onboarding',
      description: 'Automated customer onboarding process',
      status: 'running',
      steps: [
        { id: 1, name: 'Validate Email', status: 'completed', duration: '2s' },
        { id: 2, name: 'Create Account', status: 'completed', duration: '5s' },
        { id: 3, name: 'Send Welcome Email', status: 'running', duration: '1s' },
        { id: 4, name: 'Setup Preferences', status: 'pending', duration: '-' }
      ],
      lastRun: '2 minutes ago',
      nextRun: 'In 5 minutes',
      successRate: 95.2
    },
    {
      id: 2,
      name: 'Order Processing',
      description: 'Process and fulfill customer orders',
      status: 'paused',
      steps: [
        { id: 1, name: 'Validate Order', status: 'completed', duration: '3s' },
        { id: 2, name: 'Check Inventory', status: 'completed', duration: '8s' },
        { id: 3, name: 'Process Payment', status: 'error', duration: '2s' },
        { id: 4, name: 'Send Confirmation', status: 'pending', duration: '-' }
      ],
      lastRun: '1 hour ago',
      nextRun: 'Paused',
      successRate: 87.5
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newWorkflow, setNewWorkflow] = useState({
    name: '',
    description: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'text-green-600';
      case 'paused':
        return 'text-yellow-600';
      case 'error':
        return 'text-red-600';
      case 'completed':
        return 'text-green-600';
      case 'pending':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Play className="h-4 w-4 text-green-600 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'paused':
        return <Pause className="h-4 w-4 text-yellow-600 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600 responsive-container sm:flex-col md:flex-row lg:grid" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid" />;
    }
  };

  const handleCreateWorkflow = () => {
    if (newWorkflow.name && newWorkflow.description) {
      const workflow = {
        id: workflows.length + 1,
        ...newWorkflow,
        status: 'paused',
        steps: [],
        lastRun: 'Never',
        nextRun: 'Paused',
        successRate: 0
      };
      setWorkflows([...workflows, workflow]);
      setNewWorkflow({ name: '', description: '' });
      setShowCreateForm(false);
    }
  };

  const handleWorkflowAction = (id: number, action: string) => {
    setWorkflows(workflows.map(workflow => {
      if (workflow.id === id) {
        return { ...workflow, status: action };
      }
      return workflow;
    }));
  };

  return (
    <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
      <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
        <div>
          <h1 className="text-3xl font-bold responsive-container sm:flex-col md:flex-row lg:grid">Agent Workflows</h1>
          <p className="text-muted-foreground responsive-container sm:flex-col md:flex-row lg:grid">
            Create and manage automated workflows for your agents
          </p>
        </div>
        <Button 
          onClick={() => setShowCreateForm(true)}
          className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid"
        >
          <Plus className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
          Create Workflow
        </Button>
      </div>

      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Workflow</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
              <Label htmlFor="workflowName">Workflow Name</Label>
              <Input
                id="workflowName"
                value={newWorkflow.name}
                onChange={(e) => setNewWorkflow(prev => ({
                  ...prev,
                  name: e.target.value
                }))}
                placeholder="Enter workflow name"
              />
            </div>
            <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
              <Label htmlFor="workflowDescription">Description</Label>
              <Textarea
                id="workflowDescription"
                value={newWorkflow.description}
                onChange={(e) => setNewWorkflow(prev => ({
                  ...prev,
                  description: e.target.value
                }))}
                placeholder="Describe what this workflow does"
                rows={3}
              />
            </div>
            <div className="flex gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
              <Button onClick={handleCreateWorkflow}>
                Create Workflow
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowCreateForm(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
        {workflows.map((workflow) => (
          <Card key={workflow.id}>
            <CardHeader>
              <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                  <Workflow className="h-5 w-5 responsive-container sm:flex-col md:flex-row lg:grid" />
                  <div>
                    <CardTitle className="text-lg responsive-container sm:flex-col md:flex-row lg:grid">{workflow.name}</CardTitle>
                    <p className="text-sm text-muted-foreground responsive-container sm:flex-col md:flex-row lg:grid">
                      {workflow.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <Badge 
                    className={
                      workflow.status === 'running' 
                        ? 'bg-green-100 text-green-800'
                        : workflow.status === 'paused'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }
                  >
                    {workflow.status}
                  </Badge>
                  <div className="flex space-x-1 responsive-container sm:flex-col md:flex-row lg:grid">
                    {workflow.status === 'running' ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleWorkflowAction(workflow.id, 'paused')}
                      >
                        <Pause className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleWorkflowAction(workflow.id, 'running')}
                      >
                        <Play className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <div>
                  <p className="text-sm text-muted-foreground responsive-container sm:flex-col md:flex-row lg:grid">Last Run</p>
                  <p className="font-medium responsive-container sm:flex-col md:flex-row lg:grid">{workflow.lastRun}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground responsive-container sm:flex-col md:flex-row lg:grid">Next Run</p>
                  <p className="font-medium responsive-container sm:flex-col md:flex-row lg:grid">{workflow.nextRun}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground responsive-container sm:flex-col md:flex-row lg:grid">Success Rate</p>
                  <p className="font-medium responsive-container sm:flex-col md:flex-row lg:grid">{workflow.successRate}%</p>
                </div>
              </div>
              
              <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <h4 className="font-medium responsive-container sm:flex-col md:flex-row lg:grid">Workflow Steps</h4>
                <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  {workflow.steps.map((step) => (
                    <div key={step.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid">
                      <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                        {getStatusIcon(step.status)}
                        <span className="font-medium responsive-container sm:flex-col md:flex-row lg:grid">{step.name}</span>
                      </div>
                      <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                        <span className={`text-sm ${getStatusColor(step.status)}`}>
                          {step.status}
                        </span>
                        <span className="text-sm text-muted-foreground responsive-container sm:flex-col md:flex-row lg:grid">
                          {step.duration}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AgentWorkflows;
