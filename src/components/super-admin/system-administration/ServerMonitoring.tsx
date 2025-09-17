import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Server,
  Cpu, 
  HardDrive, 
  Wifi, 
  Activity,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

const ServerMonitoring: React.FC = () => {
  const [serverStats, setServerStats] = useState({
    cpu: {
      usage: 45,
      cores: 8,
      temperature: 65,
      load: [0.8, 1.2, 0.9]
    },
    memory: {
      used: 6.2,
      total: 16,
      percentage: 38.75
    },
    disk: {
      used: 120,
      total: 500,
      percentage: 24,
      readSpeed: 150,
      writeSpeed: 200
    },
    network: {
      incoming: 45.2,
      outgoing: 32.1,
      connections: 1247
    },
    uptime: '15 days, 3 hours',
    status: 'healthy'
  });

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'warning',
      message: 'CPU usage above 80%',
      timestamp: '2 minutes ago',
      resolved: false
    },
    {
      id: 2,
      type: 'info',
      message: 'Scheduled maintenance completed',
      timestamp: '1 hour ago',
      resolved: true
    }
  ]);

  const [services, setServices] = useState([
    { name: 'Web Server', status: 'running', uptime: '15d 3h', port: 80 },
    { name: 'Database', status: 'running', uptime: '15d 3h', port: 5432 },
    { name: 'Redis Cache', status: 'running', uptime: '15d 3h', port: 6379 },
    { name: 'Message Queue', status: 'stopped', uptime: '0d 0h', port: 5672 }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      setServerStats(prev => ({
        ...prev,
        cpu: {
          ...prev.cpu,
          usage: Math.max(0, Math.min(100, prev.cpu.usage + (Math.random() - 0.5) * 10))
        },
        memory: {
          ...prev.memory,
          percentage: Math.max(0, Math.min(100, prev.memory.percentage + (Math.random() - 0.5) * 5))
        }
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'running':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'error':
      case 'stopped':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'running':
        return <Badge className="bg-green-100 text-green-800">Healthy</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      case 'error':
      case 'stopped':
        return <Badge className="bg-red-100 text-red-800">Error</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'info':
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
          <h1 className="text-3xl font-bold">Server Monitoring</h1>
          <p className="text-muted-foreground">
            Monitor server performance and health metrics
                </p>
              </div>
        <Button variant="outline" className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
            </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{serverStats.cpu.usage.toFixed(1)}%</div>
            <Progress value={serverStats.cpu.usage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {serverStats.cpu.cores} cores • {serverStats.cpu.temperature}°C
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Memory</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{serverStats.memory.percentage.toFixed(1)}%</div>
            <Progress value={serverStats.memory.percentage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {serverStats.memory.used}GB / {serverStats.memory.total}GB
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disk Usage</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{serverStats.disk.percentage}%</div>
            <Progress value={serverStats.disk.percentage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {serverStats.disk.used}GB / {serverStats.disk.total}GB
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network</CardTitle>
            <Wifi className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{serverStats.network.connections}</div>
            <p className="text-xs text-muted-foreground">
              {serverStats.network.incoming} MB/s in
            </p>
            <p className="text-xs text-muted-foreground">
              {serverStats.network.outgoing} MB/s out
            </p>
          </CardContent>
        </Card>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {services.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(service.status)}`} />
                              <div>
                    <h4 className="font-medium">{service.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Port {service.port} • {service.uptime}
                    </p>
                              </div>
                            </div>
                {getStatusBadge(service.status)}
                          </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {getAlertIcon(alert.type)}
                            <div>
                    <h4 className="font-medium">{alert.message}</h4>
                    <p className="text-sm text-muted-foreground">{alert.timestamp}</p>
                            </div>
                          </div>
                <Badge 
                  className={
                    alert.resolved 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }
                >
                  {alert.resolved ? 'Resolved' : 'Active'}
                </Badge>
                          </div>
                      ))}
          </CardContent>
        </Card>
                  </div>

      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
              <h4 className="font-medium mb-2">Server Status</h4>
                        <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(serverStats.status)}`} />
                <span className="capitalize">{serverStats.status}</span>
                        </div>
                          </div>
                          <div>
              <h4 className="font-medium mb-2">Uptime</h4>
              <p className="text-sm text-muted-foreground">{serverStats.uptime}</p>
                          </div>
                          <div>
              <h4 className="font-medium mb-2">Load Average</h4>
              <p className="text-sm text-muted-foreground">
                {serverStats.cpu.load.map((load, index) => 
                  `${load.toFixed(2)}${index < serverStats.cpu.load.length - 1 ? ', ' : ''}`
                ).join('')}
                            </p>
                          </div>
                        </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServerMonitoring;
