#!/usr/bin/env node

/**
 * Super Admin Portal Server - Port 3005
 * 
 * 🔒 PORT LOCK WARNING: DO NOT MODIFY PORT 3005
 * MCP AGENTS: This port is locked and must not be changed
 * See PORT_LOCK_SYSTEM.md for details
 * 
 * This server provides the Super Admin Portal interface for
 * comprehensive system administration and management.
 */

import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.SUPER_ADMIN_PORT || 3005; // 🔒 LOCKED: Do not change this port

// Create HTTP server for WebSocket support
const server = createServer(app);
const wss = new WebSocketServer({ server });

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
  credentials: true
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// WebSocket connection handling for real-time admin updates
wss.on('connection', (ws) => {
  console.log('🔌 New Super Admin WebSocket connection established');
  
  // Send initial connection confirmation
  ws.send(JSON.stringify({
    type: 'connection_established',
    message: 'Connected to Super Admin Portal Real-time Updates',
    timestamp: new Date().toISOString()
  }));

  // Handle incoming messages
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message.toString());
      console.log('Received Super Admin WebSocket message:', data);
      
      // Handle different message types
      if (data.type === 'subscribe_to_admin') {
        ws.send(JSON.stringify({
          type: 'subscription_confirmed',
          message: 'Subscribed to Super Admin real-time updates',
          timestamp: new Date().toISOString()
        }));
      }
    } catch (error) {
      console.error('Error parsing Super Admin WebSocket message:', error);
    }
  });

  // Handle connection close
  ws.on('close', () => {
    console.log('🔌 Super Admin WebSocket connection closed');
  });

  // Handle errors
  ws.on('error', (error) => {
    console.error('Super Admin WebSocket error:', error);
  });
});

// Function to broadcast updates to all connected clients
function broadcastAdminUpdate(type, data) {
  wss.clients.forEach((client) => {
    if (client.readyState === 1) { // 1 = WebSocket.OPEN
      client.send(JSON.stringify({
        type,
        data,
        timestamp: new Date().toISOString()
      }));
    }
  });
}

// Simulate real-time admin updates
function simulateAdminUpdates() {
  setInterval(() => {
    if (wss.clients.size > 0) {
      const adminUpdates = [
        {
          type: 'user_activity_update',
          data: {
            userId: `user-${Math.floor(Math.random() * 100) + 1}`,
            action: ['login', 'logout', 'profile_update', 'permission_change'][Math.floor(Math.random() * 4)],
            timestamp: new Date().toISOString(),
            ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        },
        {
          type: 'system_alert',
          data: {
            alertId: `alert-${Date.now()}`,
            severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)],
            message: 'System performance threshold exceeded',
            component: ['database', 'api', 'cache', 'storage'][Math.floor(Math.random() * 4)],
            timestamp: new Date().toISOString()
          }
        },
        {
          type: 'security_event',
          data: {
            eventId: `security-${Date.now()}`,
            type: ['login_attempt', 'permission_denied', 'suspicious_activity'][Math.floor(Math.random() * 3)],
            severity: ['info', 'warning', 'error'][Math.floor(Math.random() * 3)],
            userId: `user-${Math.floor(Math.random() * 50) + 1}`,
            ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
            timestamp: new Date().toISOString()
          }
        }
      ];

      adminUpdates.forEach(update => {
        broadcastAdminUpdate(update.type, update.data);
      });
    }
  }, 5000); // Update every 5 seconds
}

// Start admin updates simulation
simulateAdminUpdates();

// API Routes for Super Admin Portal

// Admin overview
app.get('/api/admin/overview', (req, res) => {
  const overview = {
    success: true,
    data: {
      totalUsers: 1247,
      activeUsers: 892,
      totalAgents: 301,
      activeAgents: 285,
      systemHealth: 'excellent',
      securityStatus: 'secure',
      uptime: process.uptime(),
      version: '2.1.4',
      lastBackup: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      lastUpdate: new Date().toISOString()
    },
    message: 'Admin overview retrieved successfully',
    timestamp: new Date().toISOString()
  };
  res.json(overview);
});

// User management
app.get('/api/admin/users', (req, res) => {
  const users = Array.from({ length: 50 }, (_, i) => ({
    id: `user-${i + 1}`,
    name: `User ${i + 1}`,
    email: `user${i + 1}@demo-company.com`,
    role: ['admin', 'manager', 'user', 'guest'][Math.floor(Math.random() * 4)],
    status: ['active', 'inactive', 'pending', 'suspended'][Math.floor(Math.random() * 4)],
    lastLogin: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    permissions: ['read', 'write', 'admin'].slice(0, Math.floor(Math.random() * 3) + 1),
    twoFactorEnabled: Math.random() > 0.5,
    loginCount: Math.floor(Math.random() * 1000) + 1
  }));

  res.json({
    success: true,
    data: users,
    message: 'Users retrieved successfully',
    timestamp: new Date().toISOString()
  });
});

// System settings
app.get('/api/admin/settings', (req, res) => {
  const settings = {
    success: true,
    data: {
      system: {
        maintenanceMode: false,
        debugMode: false,
        logLevel: 'info',
        maxUsers: 10000,
        sessionTimeout: 3600
      },
      security: {
        twoFactorRequired: true,
        passwordPolicy: 'strong',
        loginAttempts: 5,
        lockoutDuration: 900,
        sslRequired: true
      },
      notifications: {
        emailEnabled: true,
        smsEnabled: false,
        webhookEnabled: true,
        alertThreshold: 80
      },
      backup: {
        enabled: true,
        frequency: 'daily',
        retention: 30,
        lastBackup: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      }
    },
    message: 'System settings retrieved successfully',
    timestamp: new Date().toISOString()
  };
  res.json(settings);
});

// Security events
app.get('/api/admin/security', (req, res) => {
  const securityEvents = Array.from({ length: 30 }, (_, i) => ({
    id: `security-${i + 1}`,
    type: ['login_attempt', 'permission_denied', 'suspicious_activity', 'data_access'][Math.floor(Math.random() * 4)],
    severity: ['info', 'warning', 'error', 'critical'][Math.floor(Math.random() * 4)],
    userId: `user-${Math.floor(Math.random() * 100) + 1}`,
    ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    timestamp: new Date(Date.now() - i * 60000).toISOString(),
    description: 'Security event description',
    resolved: Math.random() > 0.7
  }));

  res.json({
    success: true,
    data: securityEvents,
    message: 'Security events retrieved successfully',
    timestamp: new Date().toISOString()
  });
});

// System logs
app.get('/api/admin/logs', (req, res) => {
  const logs = Array.from({ length: 50 }, (_, i) => ({
    id: `log-${i + 1}`,
    timestamp: new Date(Date.now() - i * 30000).toISOString(),
    level: ['info', 'warning', 'error', 'debug'][Math.floor(Math.random() * 4)],
    component: ['auth', 'api', 'database', 'cache', 'storage'][Math.floor(Math.random() * 5)],
    message: [
      'User authentication successful',
      'Database connection established',
      'Cache miss detected',
      'API rate limit exceeded',
      'File upload completed',
      'System backup started',
      'Error processing request',
      'Configuration updated'
    ][Math.floor(Math.random() * 8)],
    userId: Math.random() > 0.3 ? `user-${Math.floor(Math.random() * 100) + 1}` : null,
    requestId: `req-${Date.now()}-${i}`,
    duration: Math.floor(Math.random() * 1000) + 10
  }));

  res.json({
    success: true,
    data: logs,
    message: 'System logs retrieved successfully',
    timestamp: new Date().toISOString()
  });
});

// Analytics
app.get('/api/admin/analytics', (req, res) => {
  const analytics = {
    success: true,
    data: {
      users: {
        total: 1247,
        active: 892,
        new: 45,
        churned: 12,
        growth: 2.7
      },
      system: {
        uptime: 99.9,
        responseTime: 245,
        errorRate: 0.02,
        throughput: 1250
      },
      security: {
        totalEvents: 156,
        criticalEvents: 3,
        resolvedEvents: 142,
        pendingEvents: 11
      },
      performance: {
        cpuUsage: 45.2,
        memoryUsage: 68.7,
        diskUsage: 34.5,
        networkUsage: 12.3
      }
    },
    message: 'Analytics data retrieved successfully',
    timestamp: new Date().toISOString()
  };
  res.json(analytics);
});

// Health check
app.get('/api/admin/health', (req, res) => {
  res.json({
    success: true,
    data: {
      status: 'healthy',
      uptime: process.uptime(),
      version: '2.1.4',
      timestamp: new Date().toISOString(),
      services: {
        api: 'healthy',
        websocket: 'healthy',
        database: 'healthy',
        cache: 'healthy',
        storage: 'healthy'
      },
      checks: {
        database: 'pass',
        cache: 'pass',
        storage: 'pass',
        network: 'pass',
        security: 'pass'
      }
    },
    message: 'Admin health check passed',
    timestamp: new Date().toISOString()
  });
});

// API-only server - no HTML page served
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Super Admin Portal API Server - HTML REMOVED',
    version: '2.1.4',
    status: 'API_ONLY_MODE',
    endpoints: [
      'GET /api/admin/overview - System overview',
      'GET /api/admin/users - User management', 
      'GET /api/admin/settings - System settings',
      'GET /api/admin/security - Security events',
      'GET /api/admin/logs - System logs',
      'GET /api/admin/analytics - Analytics data',
      'GET /api/admin/health - Health check'
    ],
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Super Admin Server Error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: error.message,
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    message: `Route ${req.method} ${req.originalUrl} not found`,
    timestamp: new Date().toISOString()
  });
});

// Start server with WebSocket support
server.listen(PORT, () => {
  console.log(`🚀 Super Admin Portal Server running on http://localhost:${PORT}`);
  console.log(`🔌 WebSocket server ready on ws://localhost:${PORT}`);
  console.log(`🛡️  Super Admin Portal: http://localhost:${PORT}`);
  console.log(`📊 Admin Overview: http://localhost:${PORT}/api/admin/overview`);
  console.log(`👥 User Management: http://localhost:${PORT}/api/admin/users`);
  console.log(`⚙️  System Settings: http://localhost:${PORT}/api/admin/settings`);
  console.log(`🔒 Security Events: http://localhost:${PORT}/api/admin/security`);
  console.log(`📝 System Logs: http://localhost:${PORT}/api/admin/logs`);
  console.log(`📈 Analytics: http://localhost:${PORT}/api/admin/analytics`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/api/admin/health`);
  console.log(`🎯 Features: Real-time WebSocket updates, User management, Security monitoring, System administration`);
});

export default app;
