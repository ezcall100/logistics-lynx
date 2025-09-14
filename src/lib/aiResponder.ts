/**
 * AI Response Generator for TransBot AI Assistant
 * Handles intelligent responses based on user queries
 */

export const generateAiResponse = (userMessage: string): string => {
  const message = userMessage.toLowerCase();
  
  if (message.includes('performance') || message.includes('metrics')) {
    return 'Here are your current system performance metrics:\n\n• CPU Usage: 45%\n• Memory Usage: 62%\n• Disk Usage: 38%\n• Network Latency: 12ms\n\nAll systems are running optimally. Would you like me to analyze any specific metrics?';
  } 
  
  if (message.includes('user') || message.includes('activity')) {
    return 'User activity analysis shows:\n\n• 1,247 active users\n• 98.5% user satisfaction\n• Peak usage: 2:00 PM - 4:00 PM\n• Most active portal: Analytics\n\nI can provide detailed user behavior insights if needed.';
  } 
  
  if (message.includes('automation') || message.includes('workflow')) {
    return 'I can help you create automation workflows for:\n\n• User onboarding processes\n• Data backup schedules\n• Report generation\n• System monitoring alerts\n\nWhat type of automation would you like to set up?';
  } 
  
  if (message.includes('data') || message.includes('insights')) {
    return 'Here are key data insights:\n\n• Revenue growth: +15% this quarter\n• User engagement: +23% increase\n• System efficiency: 99.2% uptime\n• Cost optimization: $12K saved\n\nWould you like me to dive deeper into any specific area?';
  } 
  
  if (message.includes('help') || message.includes('support')) {
    return 'I\'m here to help! I can assist you with:\n\n• System performance monitoring\n• User activity analysis\n• Automation workflow creation\n• Data insights and reporting\n• General system management\n\nWhat would you like to know more about?';
  }
  
  if (message.includes('status') || message.includes('health')) {
    return 'System Health Status:\n\n✅ All services operational\n✅ Database connections stable\n✅ API endpoints responding\n✅ Security systems active\n\nEverything is running smoothly!';
  }
  
  if (message.includes('security') || message.includes('threat')) {
    return 'Security Overview:\n\n• No active threats detected\n• Firewall status: Active\n• SSL certificates: Valid\n• Access logs: Normal\n• Last security scan: 2 hours ago\n\nYour system is secure and protected.';
  }
  
  if (message.includes('backup') || message.includes('recovery')) {
    return 'Backup Status:\n\n• Last backup: 1 hour ago\n• Backup size: 2.3 GB\n• Recovery time: < 5 minutes\n• Storage used: 45% of allocated\n\nAll backups are up to date and verified.';
  }
  
  // Default response for unrecognized queries
  return `I understand you're asking about: "${userMessage}". I can help you with system management, data analysis, automation, user insights, security monitoring, and more. Could you be more specific about what you'd like to know?`;
};

export const getAiSuggestions = (userMessage: string): string[] => {
  const message = userMessage.toLowerCase();
  
  if (message.includes('performance')) {
    return [
      'Show detailed CPU metrics',
      'Analyze memory usage trends', 
      'Check network performance',
      'View disk usage statistics'
    ];
  } 
  
  if (message.includes('user')) {
    return [
      'View user engagement report',
      'Analyze user behavior patterns',
      'Generate user activity summary',
      'Show user demographics'
    ];
  } 
  
  if (message.includes('automation')) {
    return [
      'Create backup automation',
      'Set up monitoring alerts',
      'Design user workflow',
      'Schedule maintenance tasks'
    ];
  }
  
  if (message.includes('security')) {
    return [
      'Run security scan',
      'Check access logs',
      'Review firewall status',
      'Update security policies'
    ];
  }
  
  if (message.includes('data')) {
    return [
      'Generate insights report',
      'Export user data',
      'Create analytics dashboard',
      'Schedule data backup'
    ];
  }
  
  // Default suggestions
  return [
    'Show system overview',
    'Analyze performance data', 
    'Generate insights report',
    'Check system health'
  ];
};

export const getWelcomeMessage = () => {
  return {
    message: 'Hello! I\'m TransBot AI, your intelligent assistant. I can help you with system management, data analysis, automation, and much more. What would you like to know?',
    suggestions: [
      'Show system performance metrics',
      'Analyze user activity patterns',
      'Generate automation workflows',
      'Help with data insights'
    ]
  };
};
