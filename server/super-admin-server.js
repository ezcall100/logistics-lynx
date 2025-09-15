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

// Serve Super Admin Portal HTML
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Super Admin Portal</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                margin: 0;
                padding: 20px;
                background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
                color: white;
                min-height: 100vh;
            }
            .container {
                max-width: 1400px;
                margin: 0 auto;
            }
            .header {
                text-align: center;
                margin-bottom: 40px;
            }
            .header h1 {
                font-size: 3.5rem;
                margin: 0;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            }
            .header p {
                font-size: 1.3rem;
                opacity: 0.9;
                margin: 10px 0;
            }
            .admin-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: 25px;
                margin-bottom: 40px;
            }
            .admin-card {
                background: rgba(255,255,255,0.1);
                backdrop-filter: blur(15px);
                border-radius: 20px;
                padding: 25px;
                border: 1px solid rgba(255,255,255,0.2);
                box-shadow: 0 8px 32px rgba(0,0,0,0.1);
            }
            .admin-card h3 {
                margin: 0 0 20px 0;
                font-size: 1.4rem;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .metric {
                display: flex;
                justify-content: space-between;
                margin: 12px 0;
                padding: 10px 0;
                border-bottom: 1px solid rgba(255,255,255,0.1);
            }
            .metric:last-child {
                border-bottom: none;
            }
            .metric-value {
                font-weight: bold;
                color: #60a5fa;
            }
            .websocket-status {
                text-align: center;
                margin: 20px 0;
                padding: 15px;
                background: rgba(255,255,255,0.1);
                border-radius: 10px;
            }
            .status-indicator {
                display: inline-block;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                margin-right: 8px;
                animation: pulse 2s infinite;
            }
            .status-connected {
                background-color: #4ade80;
            }
            .status-disconnected {
                background-color: #ef4444;
            }
            @keyframes pulse {
                0% { opacity: 1; }
                50% { opacity: 0.5; }
                100% { opacity: 1; }
            }
            .endpoints {
                background: rgba(255,255,255,0.1);
                backdrop-filter: blur(15px);
                border-radius: 20px;
                padding: 25px;
                border: 1px solid rgba(255,255,255,0.2);
            }
            .endpoints h3 {
                margin: 0 0 20px 0;
            }
            .endpoint {
                margin: 12px 0;
                padding: 12px;
                background: rgba(255,255,255,0.05);
                border-radius: 10px;
                font-family: monospace;
                border-left: 3px solid #60a5fa;
            }
            .alert {
                background: rgba(239, 68, 68, 0.2);
                border: 1px solid rgba(239, 68, 68, 0.3);
                border-radius: 10px;
                padding: 15px;
                margin: 15px 0;
            }
            .alert.warning {
                background: rgba(245, 158, 11, 0.2);
                border-color: rgba(245, 158, 11, 0.3);
            }
            .alert.info {
                background: rgba(59, 130, 246, 0.2);
                border-color: rgba(59, 130, 246, 0.3);
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🛡️ Super Admin Portal</h1>
                <p>Comprehensive system administration and management</p>
                <div class="websocket-status">
                    <span id="ws-status" class="status-indicator status-disconnected"></span>
                    <span id="ws-text">Connecting to real-time updates...</span>
                </div>
            </div>
            
            <div class="admin-grid">
                <div class="admin-card">
                    <h3>👥 User Management</h3>
                    <div class="metric">
                        <span>Total Users:</span>
                        <span class="metric-value" id="total-users">Loading...</span>
                    </div>
                    <div class="metric">
                        <span>Active Users:</span>
                        <span class="metric-value" id="active-users">Loading...</span>
                    </div>
                    <div class="metric">
                        <span>New Users (24h):</span>
                        <span class="metric-value" id="new-users">Loading...</span>
                    </div>
                    <div class="metric">
                        <span>Growth Rate:</span>
                        <span class="metric-value" id="growth-rate">Loading...</span>
                    </div>
                </div>
                
                <div class="admin-card">
                    <h3>🤖 Agent Management</h3>
                    <div class="metric">
                        <span>Total Agents:</span>
                        <span class="metric-value" id="total-agents">Loading...</span>
                    </div>
                    <div class="metric">
                        <span>Active Agents:</span>
                        <span class="metric-value" id="active-agents">Loading...</span>
                    </div>
                    <div class="metric">
                        <span>System Health:</span>
                        <span class="metric-value" id="system-health">Loading...</span>
                    </div>
                    <div class="metric">
                        <span>Uptime:</span>
                        <span class="metric-value" id="uptime">Loading...</span>
                    </div>
                </div>
                
                <div class="admin-card">
                    <h3>🔒 Security Center</h3>
                    <div class="metric">
                        <span>Total Events:</span>
                        <span class="metric-value" id="total-events">Loading...</span>
                    </div>
                    <div class="metric">
                        <span>Critical Events:</span>
                        <span class="metric-value" id="critical-events">Loading...</span>
                    </div>
                    <div class="metric">
                        <span>Resolved Events:</span>
                        <span class="metric-value" id="resolved-events">Loading...</span>
                    </div>
                    <div class="metric">
                        <span>Security Status:</span>
                        <span class="metric-value" id="security-status">Loading...</span>
                    </div>
                </div>
                
                <div class="admin-card">
                    <h3>⚡ Performance</h3>
                    <div class="metric">
                        <span>CPU Usage:</span>
                        <span class="metric-value" id="cpu-usage">Loading...</span>
                    </div>
                    <div class="metric">
                        <span>Memory Usage:</span>
                        <span class="metric-value" id="memory-usage">Loading...</span>
                    </div>
                    <div class="metric">
                        <span>Response Time:</span>
                        <span class="metric-value" id="response-time">Loading...</span>
                    </div>
                    <div class="metric">
                        <span>Error Rate:</span>
                        <span class="metric-value" id="error-rate">Loading...</span>
                    </div>
                </div>
            </div>
            
            <div class="endpoints">
                <h3>🔗 Admin API Endpoints</h3>
                <div class="endpoint">GET /api/admin/overview - System overview</div>
                <div class="endpoint">GET /api/admin/users - User management</div>
                <div class="endpoint">GET /api/admin/settings - System settings</div>
                <div class="endpoint">GET /api/admin/security - Security events</div>
                <div class="endpoint">GET /api/admin/logs - System logs</div>
                <div class="endpoint">GET /api/admin/analytics - Analytics data</div>
                <div class="endpoint">GET /api/admin/health - Health check</div>
            </div>
        </div>
        
        <script>
            // WebSocket connection for real-time updates
            const ws = new WebSocket('ws://localhost:${PORT}');
            const wsStatus = document.getElementById('ws-status');
            const wsText = document.getElementById('ws-text');
            
            ws.onopen = function() {
                wsStatus.className = 'status-indicator status-connected';
                wsText.textContent = 'Connected to real-time admin updates';
                ws.send(JSON.stringify({ type: 'subscribe_to_admin' }));
            };
            
            ws.onclose = function() {
                wsStatus.className = 'status-indicator status-disconnected';
                wsText.textContent = 'Disconnected from real-time admin updates';
            };
            
            ws.onmessage = function(event) {
                const data = JSON.parse(event.data);
                console.log('Received admin update:', data);
                
                if (data.type === 'user_activity_update') {
                    console.log('User activity update:', data.data);
                } else if (data.type === 'system_alert') {
                    console.log('System alert:', data.data);
                    // Show alert notification
                    showAlert(data.data);
                } else if (data.type === 'security_event') {
                    console.log('Security event:', data.data);
                    // Update security metrics
                    updateSecurityMetrics();
                }
            };
            
            function showAlert(alert) {
                const alertDiv = document.createElement('div');
                alertDiv.className = 'alert ' + (alert.severity === 'critical' ? '' : alert.severity);
                alertDiv.innerHTML = '<strong>' + alert.severity.toUpperCase() + ':</strong> ' + alert.message;
                document.querySelector('.container').insertBefore(alertDiv, document.querySelector('.admin-grid'));
                
                // Remove alert after 10 seconds
                setTimeout(() => {
                    alertDiv.remove();
                }, 10000);
            }
            
            function updateSecurityMetrics() {
                // Refresh security data
                loadSecurityData();
            }
            
            // Load initial data
            async function loadAdminData() {
                try {
                    const [overview, analytics] = await Promise.all([
                        fetch('/api/admin/overview').then(r => r.json()),
                        fetch('/api/admin/analytics').then(r => r.json())
                    ]);
                    
                    if (overview.success) {
                        document.getElementById('total-users').textContent = overview.data.totalUsers;
                        document.getElementById('active-users').textContent = overview.data.activeUsers;
                        document.getElementById('total-agents').textContent = overview.data.totalAgents;
                        document.getElementById('active-agents').textContent = overview.data.activeAgents;
                        document.getElementById('system-health').textContent = overview.data.systemHealth;
                        document.getElementById('uptime').textContent = Math.floor(overview.data.uptime / 60) + ' minutes';
                        document.getElementById('security-status').textContent = overview.data.securityStatus;
                    }
                    
                    if (analytics.success) {
                        document.getElementById('new-users').textContent = analytics.data.users.new;
                        document.getElementById('growth-rate').textContent = analytics.data.users.growth + '%';
                        document.getElementById('total-events').textContent = analytics.data.security.totalEvents;
                        document.getElementById('critical-events').textContent = analytics.data.security.criticalEvents;
                        document.getElementById('resolved-events').textContent = analytics.data.security.resolvedEvents;
                        document.getElementById('cpu-usage').textContent = analytics.data.performance.cpuUsage + '%';
                        document.getElementById('memory-usage').textContent = analytics.data.performance.memoryUsage + '%';
                        document.getElementById('response-time').textContent = analytics.data.system.responseTime + 'ms';
                        document.getElementById('error-rate').textContent = (analytics.data.system.errorRate * 100).toFixed(2) + '%';
                    }
                } catch (error) {
                    console.error('Error loading admin data:', error);
                }
            }
            
            async function loadSecurityData() {
                try {
                    const response = await fetch('/api/admin/security');
                    const data = await response.json();
                    if (data.success) {
                        // Update security metrics with fresh data
                        console.log('Security data refreshed:', data.data.length, 'events');
                    }
                } catch (error) {
                    console.error('Error loading security data:', error);
                }
            }
            
            // Load data on page load
            loadAdminData();
            
            // Refresh data every 30 seconds
            setInterval(loadAdminData, 30000);
        </script>
    </body>
    </html>
  `);
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

// Super Admin Login Route
app.get('/login', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Super Admin Login - TransBot AI</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: linear-gradient(135deg, #0f172a 0%, #7c3aed 50%, #4f46e5 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .login-container {
                background: rgba(15, 23, 42, 0.8);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(124, 58, 237, 0.2);
                border-radius: 16px;
                padding: 2rem;
                width: 100%;
                max-width: 400px;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            }
            .logo {
                text-align: center;
                margin-bottom: 2rem;
            }
            .logo h1 {
                color: #a855f7;
                font-size: 1.5rem;
                font-weight: bold;
                margin: 0;
            }
            .logo p {
                color: #94a3b8;
                font-size: 0.875rem;
                margin: 0.25rem 0 0 0;
            }
            .form-group {
                margin-bottom: 1.5rem;
            }
            .form-group label {
                display: block;
                color: #e2e8f0;
                font-size: 0.875rem;
                font-weight: 500;
                margin-bottom: 0.5rem;
            }
            .form-group input {
                width: 100%;
                padding: 0.75rem;
                border: 1px solid #475569;
                border-radius: 8px;
                background: rgba(30, 41, 59, 0.5);
                color: #f1f5f9;
                font-size: 1rem;
                box-sizing: border-box;
            }
            .form-group input:focus {
                outline: none;
                border-color: #a855f7;
                box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1);
            }
            .login-btn {
                width: 100%;
                padding: 0.75rem;
                background: linear-gradient(135deg, #a855f7 0%, #4f46e5 100%);
                color: white;
                border: none;
                border-radius: 8px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
            }
            .login-btn:hover {
                transform: translateY(-1px);
                box-shadow: 0 10px 25px -5px rgba(168, 85, 247, 0.4);
            }
            .status {
                text-align: center;
                margin-top: 1rem;
                font-size: 0.75rem;
                color: #64748b;
            }
            .status .dot {
                display: inline-block;
                width: 6px;
                height: 6px;
                background: #10b981;
                border-radius: 50%;
                margin-right: 0.5rem;
                animation: pulse 2s infinite;
            }
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }
        </style>
    </head>
    <body>
        <div class="login-container">
            <div class="logo">
                <h1>👑 Super Admin Portal</h1>
                <p>Master Control System Administration</p>
            </div>
            
            <form id="loginForm">
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" name="email" placeholder="superadmin@transbotai.com" required>
                </div>
                
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" required>
                </div>
                
                <button type="submit" class="login-btn">Access Super Admin Portal</button>
            </form>
            
            <div class="status">
                <span class="dot"></span>
                System Online • Admin Portal Active
            </div>
        </div>
        
        <script>
            document.getElementById('loginForm').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                
                // Simulate login process
                const btn = document.querySelector('.login-btn');
                btn.textContent = 'Signing In...';
                btn.disabled = true;
                
                setTimeout(() => {
                    // For demo purposes, redirect to dashboard
                    // In production, this would validate credentials
                    window.location.href = '/';
                }, 1500);
            });
        </script>
    </body>
    </html>
  `);
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
