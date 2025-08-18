import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import existing UI components that we know exist
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const DashboardPage: React.FC = () => {
  // Theme state with localStorage persistence
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const [systemStats] = useState({
    users: 2847,
    portals: 7,
    health: 99.9,
    security: 'A+',
    uptime: '99.9%',
    responseTime: '45ms',
    activeSessions: 1247,
    pendingApprovals: 23,
    systemAlerts: 3,
    apiRequests: 15420
  });

  const [performanceMetrics, setPerformanceMetrics] = useState({
    cpuUsage: 45,
    memoryUsage: 67,
    diskUsage: 23,
    networkUsage: 89,
    databaseConnections: 156,
    cacheHitRate: 94.2
  });

  const [securityMetrics, setSecurityMetrics] = useState({
    failedLogins: 12,
    blockedIPs: 8,
    securityScans: 156,
    vulnerabilities: 2,
    lastBackup: '2 hours ago',
    encryptionStatus: 'AES-256'
  });

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, action: 'New user registered', user: 'john.doe@company.com', time: '2 min ago', type: 'user', priority: 'low' },
    { id: 2, action: 'Security scan completed', user: 'System', time: '5 min ago', type: 'security', priority: 'medium' },
    { id: 3, action: 'Database backup completed', user: 'System', time: '15 min ago', type: 'system', priority: 'high' },
    { id: 4, action: 'Portal access granted', user: 'admin@company.com', time: '1 hour ago', type: 'access', priority: 'low' },
    { id: 5, action: 'System update deployed', user: 'System', time: '2 hours ago', type: 'update', priority: 'high' },
    { id: 6, action: 'API rate limit exceeded', user: 'api-client-3', time: '3 hours ago', type: 'warning', priority: 'medium' }
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, type: 'info', message: 'System backup completed successfully', time: '2 min ago', read: false },
    { id: 2, type: 'warning', message: 'High memory usage detected', time: '5 min ago', read: false },
    { id: 3, type: 'success', message: 'New user registration approved', time: '10 min ago', read: true },
    { id: 4, type: 'error', message: 'Database connection timeout', time: '1 hour ago', read: false }
  ]);

  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Quick actions
  const handleQuickAction = (action: string) => {
    console.log(`Quick action: ${action}`);
  };

  const dismissNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium': return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low': return 'text-green-500 bg-green-50 dark:bg-green-900/20';
      default: return 'text-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'user': return '👤';
      case 'security': return '🔒';
      case 'system': return '⚙️';
      case 'access': return '🚪';
      case 'update': return '🔄';
      case 'warning': return '⚠️';
      default: return '📋';
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-slate-100 transition-colors duration-300">
        <div className="space-y-6 p-6">
          {/* Enterprise Header with Enhanced Design */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 dark:from-blue-800 dark:via-blue-900 dark:to-indigo-900 text-white shadow-xl"
          >
            <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:20px_20px]" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-indigo-600/20" />
            
            <div className="relative p-8">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-6">
                    <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                      <span className="text-3xl">🚀</span>
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold mb-3 tracking-tight">Super Admin Command Center</h1>
                      <p className="text-xl text-blue-100 dark:text-blue-200 max-w-2xl">
                        Complete system control with real-time monitoring and advanced analytics
                      </p>
                    </div>
                  </div>
                  
                  {/* System Status with Enhanced Badges */}
                  <div className="flex flex-wrap gap-4 mt-6">
                    {[
                      { label: 'System Online', value: 'Operational', color: 'green', icon: '🟢' },
                      { label: 'Security', value: systemStats.security, color: 'yellow', icon: '🟡' },
                      { label: 'Uptime', value: systemStats.uptime, color: 'green', icon: '🟢' },
                      { label: 'Response', value: systemStats.responseTime, color: 'blue', icon: '🔵' }
                    ].map((status) => (
                      <div key={status.label} className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                        <span className="text-lg">{status.icon}</span>
                        <div>
                          <p className="text-sm text-blue-200">{status.label}</p>
                          <p className="font-semibold">{status.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enhanced Controls */}
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="text-white hover:bg-white/20 backdrop-blur-sm"
                  >
                    {isDarkMode ? '☀️' : '🌙'}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={refreshData}
                    className={`text-white hover:bg-white/20 backdrop-blur-sm ${isRefreshing ? 'animate-spin' : ''}`}
                  >
                    🔄
                  </Button>
                  
                  <div className="flex bg-white/10 backdrop-blur-sm rounded-lg p-1 border border-white/20">
                    {['1h', '24h', '7d', '30d'].map((range) => (
                      <Button
                        key={range}
                        variant={selectedTimeRange === range ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setSelectedTimeRange(range)}
                        className="text-sm text-white hover:bg-white/20"
                      >
                        {range}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions with Enhanced Tooltips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {[
              { icon: '👥', label: 'Add User', action: 'add-user', description: 'Create new user account' },
              { icon: '🔒', label: 'Security Scan', action: 'security-scan', description: 'Run security audit' },
              { icon: '💾', label: 'Backup Now', action: 'backup', description: 'Create system backup' },
              { icon: '📊', label: 'Generate Report', action: 'report', description: 'Export system report' },
              { icon: '⚙️', label: 'System Config', action: 'config', description: 'Configure system settings' },
              { icon: '🚨', label: 'Emergency Mode', action: 'emergency', description: 'Activate emergency protocols' }
            ].map((action) => (
              <Tooltip key={action.action}>
                <TooltipTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      variant="outline"
                      onClick={() => handleQuickAction(action.action)}
                      className="h-24 flex flex-col gap-3 border-2 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
                    >
                      <span className="text-3xl">{action.icon}</span>
                      <span className="text-sm font-medium">{action.label}</span>
                    </Button>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{action.description}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </motion.div>

          {/* Enhanced Tabs with Pure Tailwind Styling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="sticky top-0 z-10 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700"
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5 h-14 bg-transparent">
                {[
                  { value: 'overview', label: '📊 Overview', icon: '📊' },
                  { value: 'performance', label: '⚡ Performance', icon: '⚡' },
                  { value: 'security', label: '🔒 Security', icon: '🔒' },
                  { value: 'analytics', label: '📈 Analytics', icon: '📈' },
                  { value: 'activity', label: '🕒 Activity', icon: '🕒' }
                ].map((tab) => (
                  <TabsTrigger 
                    key={tab.value}
                    value={tab.value}
                    className="data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200 px-4 py-2 rounded-lg"
                  >
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.icon}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6 mt-6">
                {/* System Health Grid with Enhanced Progress */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { icon: '👥', label: 'Total Users', value: systemStats.users.toLocaleString(), trend: '+12.5%', color: 'purple', progress: 85 },
                    { icon: '🌐', label: 'Active Portals', value: `${systemStats.portals}/${systemStats.portals}`, trend: 'All Operational', color: 'blue', progress: 100 },
                    { icon: '💚', label: 'System Health', value: `${systemStats.health}%`, trend: 'Optimal', color: 'green', progress: 99 },
                    { icon: '🔒', label: 'Security Score', value: systemStats.security, trend: 'Excellent', color: 'orange', progress: 95 }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ y: -4 }}
                    >
                      <Card className="h-full transition-all duration-300 hover:shadow-xl border-2 hover:border-blue-200 dark:hover:border-blue-800 cursor-pointer">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4">
                            <div className={`p-4 rounded-xl bg-${stat.color}-100 dark:bg-${stat.color}-900/30`}>
                              <span className="text-3xl">{stat.icon}</span>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</p>
                              <p className={`text-3xl font-bold text-${stat.color}-600 dark:text-${stat.color}-400`}>{stat.value}</p>
                              <p className="text-xs text-green-600 dark:text-green-400 font-medium">{stat.trend}</p>
                            </div>
                          </div>
                          
                          {/* Enhanced Progress Bar */}
                          <div className="mt-4">
                            <Progress value={stat.progress} className="w-full h-2" />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Stats and Notifications */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Quick Stats with Enhanced Badges */}
                  <Card className="border-2 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">📊</span>
                        Real-Time Statistics
                        <Badge variant="secondary" className="ml-auto bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                          Live
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { label: 'Active Sessions', value: systemStats.activeSessions.toLocaleString(), color: 'blue', icon: '👥' },
                          { label: 'Pending Approvals', value: systemStats.pendingApprovals, color: 'orange', icon: '⏳' },
                          { label: 'System Alerts', value: systemStats.systemAlerts, color: 'red', icon: '🚨' },
                          { label: 'API Requests', value: systemStats.apiRequests.toLocaleString(), color: 'green', icon: '🔌' }
                        ].map((stat) => (
                          <div key={stat.label} className="text-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                            <div className="text-2xl mb-2">{stat.icon}</div>
                            <p className={`text-2xl font-bold text-${stat.color}-600 dark:text-${stat.color}-400`}>{stat.value}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Notifications with Enhanced Avatars */}
                  <Card className="border-2 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">🔔</span>
                        System Notifications
                        <Badge variant="secondary" className="ml-auto bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                          {notifications.filter(n => !n.read).length} new
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {notifications.slice(0, 4).map((notification) => (
                          <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 ${
                              notification.type === 'info' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' :
                              notification.type === 'warning' ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800' :
                              notification.type === 'success' ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' :
                              'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                            } ${!notification.read ? 'ring-2 ring-blue-500/20 shadow-lg' : ''}`}
                          >
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="text-xs font-medium">
                                {notification.type.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{notification.message}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</p>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => dismissNotification(notification.id)}
                              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                              ×
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="performance" className="space-y-6 mt-6">
                {/* Performance with Enhanced Switches */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="border-2 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">⚡</span>
                        System Performance
                      </CardTitle>
                      <CardDescription>Real-time performance metrics with trend analysis</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {[
                        { label: 'CPU Usage', value: performanceMetrics.cpuUsage, color: 'blue', trend: 'stable' },
                        { label: 'Memory Usage', value: performanceMetrics.memoryUsage, color: 'green', trend: 'increasing' },
                        { label: 'Disk Usage', value: performanceMetrics.diskUsage, color: 'orange', trend: 'stable' },
                        { label: 'Network Usage', value: performanceMetrics.networkUsage, color: 'purple', trend: 'high' }
                      ].map((metric) => (
                        <div key={metric.label}>
                          <div className="flex justify-between mb-2">
                            <Label className="font-medium">{metric.label}</Label>
                            <div className="flex items-center gap-2">
                              <span className={`text-sm font-semibold text-${metric.color}-600 dark:text-${metric.color}-400`}>
                                {metric.value}%
                              </span>
                              <Badge variant="secondary" className={`${
                                metric.trend === 'increasing' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' :
                                metric.trend === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                                'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                              }`}>
                                {metric.trend}
                              </Badge>
                            </div>
                          </div>
                          <Progress value={metric.value} className="w-full h-3" />
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="border-2 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <span className="text-2xl">🎛️</span>
                        Performance Controls
                      </CardTitle>
                      <CardDescription>System optimization and monitoring settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                          <Label htmlFor="auto-optimize" className="font-medium">Auto Optimization</Label>
                          <Switch id="auto-optimize" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                          <Label htmlFor="performance-mode" className="font-medium">Performance Mode</Label>
                          <Switch id="performance-mode" />
                        </div>
                        
                        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                          <Label htmlFor="resource-monitoring" className="font-medium">Resource Monitoring</Label>
                          <Switch id="resource-monitoring" defaultChecked />
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <Label className="font-medium mb-3 block">Optimization Level</Label>
                          <div className="space-y-3">
                            {['Conservative', 'Balanced', 'Aggressive'].map((level) => (
                              <div key={level} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                                <input 
                                  type="radio" 
                                  id={level.toLowerCase()} 
                                  name="optimization" 
                                  value={level.toLowerCase()} 
                                  defaultChecked={level === 'Balanced'}
                                  className="text-blue-600 focus:ring-blue-500"
                                />
                                <Label htmlFor={level.toLowerCase()} className="font-medium cursor-pointer">{level}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Additional tabs content would continue here... */}
            </Tabs>
          </motion.div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default DashboardPage;
