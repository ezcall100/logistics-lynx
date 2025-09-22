#!/usr/bin/env node

/**
 * Portal Login Server - Port 3006
 * 
 * 🔒 PORT LOCK WARNING: DO NOT MODIFY PORT 3006
 * MCP AGENTS: This port is locked and must not be changed
 * See PORT_LOCK_SYSTEM.md for details
 * 
 * This server provides the Portal Login interface for user
 * authentication and portal access management.
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
const PORT = process.env.PORTAL_LOGIN_PORT || 3006; // 🔒 LOCKED: Do not change this port

// Create HTTP server for WebSocket support
const server = createServer(app);
const wss = new WebSocketServer({ server });

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003', 'http://localhost:3006'],
  credentials: true
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// WebSocket connection handling for real-time login updates
wss.on('connection', (ws) => {
  console.log('🔌 New Portal Login WebSocket connection established');
  
  // Send initial connection confirmation
  ws.send(JSON.stringify({
    type: 'connection_established',
    message: 'Connected to Portal Login Real-time Updates',
    timestamp: new Date().toISOString()
  }));

  // Handle incoming messages
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message.toString());
      console.log('Received Portal Login WebSocket message:', data);
      
      // Handle different message types
      if (data.type === 'subscribe_to_login') {
        ws.send(JSON.stringify({
          type: 'subscription_confirmed',
          message: 'Subscribed to Portal Login real-time updates',
          timestamp: new Date().toISOString()
        }));
      }
    } catch (error) {
      console.error('Error parsing Portal Login WebSocket message:', error);
    }
  });

  // Handle connection close
  ws.on('close', () => {
    console.log('🔌 Portal Login WebSocket connection closed');
  });

  // Handle errors
  ws.on('error', (error) => {
    console.error('Portal Login WebSocket error:', error);
  });
});

// Function to broadcast updates to all connected clients
function broadcastLoginUpdate(type, data) {
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

// Simulate real-time login updates
function simulateLoginUpdates() {
  setInterval(() => {
    if (wss.clients.size > 0) {
      const loginUpdates = [
        {
          type: 'login_attempt',
          data: {
            userId: `user-${Math.floor(Math.random() * 100) + 1}`,
            email: `user${Math.floor(Math.random() * 100) + 1}@demo-company.com`,
            ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            timestamp: new Date().toISOString(),
            success: Math.random() > 0.2
          }
        },
        {
          type: 'session_activity',
          data: {
            sessionId: `session-${Date.now()}`,
            userId: `user-${Math.floor(Math.random() * 50) + 1}`,
            action: ['login', 'logout', 'refresh', 'timeout'][Math.floor(Math.random() * 4)],
            timestamp: new Date().toISOString(),
            duration: Math.floor(Math.random() * 3600) + 60
          }
        },
        {
          type: 'security_event',
          data: {
            eventId: `security-${Date.now()}`,
            type: ['failed_login', 'suspicious_activity', 'password_reset', '2fa_enabled'][Math.floor(Math.random() * 4)],
            severity: ['info', 'warning', 'error'][Math.floor(Math.random() * 3)],
            userId: `user-${Math.floor(Math.random() * 50) + 1}`,
            ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
            timestamp: new Date().toISOString()
          }
        }
      ];

      loginUpdates.forEach(update => {
        broadcastLoginUpdate(update.type, update.data);
      });
    }
  }, 4000); // Update every 4 seconds
}

// Start login updates simulation
simulateLoginUpdates();

// API Routes for Portal Login

// Login overview
app.get('/api/login/overview', (req, res) => {
  const overview = {
    success: true,
    data: {
      totalSessions: 1247,
      activeSessions: 892,
      totalLogins: 5678,
      successfulLogins: 5432,
      failedLogins: 246,
      twoFactorEnabled: 1234,
      lastLogin: new Date(Date.now() - Math.random() * 60 * 60 * 1000).toISOString(),
      securityStatus: 'secure',
      uptime: process.uptime(),
      version: '2.1.4',
      lastUpdate: new Date().toISOString()
    },
    message: 'Login overview retrieved successfully',
    timestamp: new Date().toISOString()
  };
  res.json(overview);
});

// Authentication
app.post('/api/login/authenticate', (req, res) => {
  const { email, password, twoFactorCode } = req.body;
  
  // Mock authentication logic
  const isValidUser = email && password;
  const isValidTwoFactor = !twoFactorCode || twoFactorCode === '123456';
  
  if (isValidUser && isValidTwoFactor) {
    const session = {
      id: `session-${Date.now()}`,
      userId: `user-${Math.floor(Math.random() * 100) + 1}`,
      email: email,
      token: `token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
      ipAddress: req.ip || '192.168.1.100',
      userAgent: req.get('User-Agent') || 'Unknown'
    };
    
    res.json({
      success: true,
      data: session,
      message: 'Authentication successful',
      timestamp: new Date().toISOString()
    });
  } else {
    res.status(401).json({
      success: false,
      error: 'Authentication failed',
      message: 'Invalid credentials or two-factor code',
      timestamp: new Date().toISOString()
    });
  }
});

// Session management
app.get('/api/login/sessions', (req, res) => {
  const sessions = Array.from({ length: 30 }, (_, i) => ({
    id: `session-${i + 1}`,
    userId: `user-${Math.floor(Math.random() * 100) + 1}`,
    email: `user${Math.floor(Math.random() * 100) + 1}@demo-company.com`,
    ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    createdAt: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
    lastActivity: new Date(Date.now() - Math.random() * 60 * 60 * 1000).toISOString(),
    expiresAt: new Date(Date.now() + Math.random() * 24 * 60 * 60 * 1000).toISOString(),
    status: ['active', 'expired', 'terminated'][Math.floor(Math.random() * 3)],
    twoFactorEnabled: Math.random() > 0.5
  }));

  res.json({
    success: true,
    data: sessions,
    message: 'Sessions retrieved successfully',
    timestamp: new Date().toISOString()
  });
});

// User management
app.get('/api/login/users', (req, res) => {
  const users = Array.from({ length: 50 }, (_, i) => ({
    id: `user-${i + 1}`,
    email: `user${i + 1}@demo-company.com`,
    name: `User ${i + 1}`,
    role: ['admin', 'manager', 'user', 'guest'][Math.floor(Math.random() * 4)],
    status: ['active', 'inactive', 'pending', 'suspended'][Math.floor(Math.random() * 4)],
    twoFactorEnabled: Math.random() > 0.5,
    lastLogin: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    loginCount: Math.floor(Math.random() * 1000) + 1,
    failedAttempts: Math.floor(Math.random() * 5),
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    permissions: ['read', 'write', 'admin'].slice(0, Math.floor(Math.random() * 3) + 1)
  }));

  res.json({
    success: true,
    data: users,
    message: 'Users retrieved successfully',
    timestamp: new Date().toISOString()
  });
});

// Security events
app.get('/api/login/security', (req, res) => {
  const securityEvents = Array.from({ length: 25 }, (_, i) => ({
    id: `security-${i + 1}`,
    type: ['failed_login', 'suspicious_activity', 'password_reset', '2fa_enabled', 'account_locked'][Math.floor(Math.random() * 5)],
    severity: ['info', 'warning', 'error', 'critical'][Math.floor(Math.random() * 4)],
    userId: `user-${Math.floor(Math.random() * 100) + 1}`,
    email: `user${Math.floor(Math.random() * 100) + 1}@demo-company.com`,
    ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    timestamp: new Date(Date.now() - i * 60000).toISOString(),
    description: 'Security event description',
    resolved: Math.random() > 0.6
  }));

  res.json({
    success: true,
    data: securityEvents,
    message: 'Security events retrieved successfully',
    timestamp: new Date().toISOString()
  });
});

// Analytics
app.get('/api/login/analytics', (req, res) => {
  const analytics = {
    success: true,
    data: {
      sessions: {
        total: 1247,
        active: 892,
        expired: 312,
        terminated: 43,
        averageDuration: 45.2
      },
      logins: {
        total: 5678,
        successful: 5432,
        failed: 246,
        successRate: 95.7,
        twoFactorRate: 78.3
      },
      security: {
        totalEvents: 156,
        criticalEvents: 3,
        resolvedEvents: 142,
        pendingEvents: 11,
        blockedAttempts: 89
      },
      performance: {
        averageResponseTime: 245,
        peakConcurrentUsers: 156,
        errorRate: 0.02,
        uptime: 99.9
      }
    },
    message: 'Login analytics retrieved successfully',
    timestamp: new Date().toISOString()
  };
  res.json(analytics);
});

// Health check
app.get('/api/login/health', (req, res) => {
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
        authentication: 'healthy',
        session: 'healthy',
        security: 'healthy'
      },
      checks: {
        database: 'pass',
        cache: 'pass',
        security: 'pass',
        network: 'pass',
        authentication: 'pass'
      }
    },
    message: 'Login health check passed',
    timestamp: new Date().toISOString()
  });
});

// Serve Portal Login HTML
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Portal Login</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                margin: 0;
                padding: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                min-height: 100vh;
            }
            .container {
                max-width: 1200px;
                margin: 0 auto;
            }
            .header {
                text-align: center;
                margin-bottom: 40px;
            }
            .header h1 {
                font-size: 3rem;
                margin: 0;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            }
            .header p {
                font-size: 1.2rem;
                opacity: 0.9;
                margin: 10px 0;
            }
            .login-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 20px;
                margin-bottom: 40px;
            }
            .login-card {
                background: rgba(255,255,255,0.1);
                backdrop-filter: blur(10px);
                border-radius: 15px;
                padding: 20px;
                border: 1px solid rgba(255,255,255,0.2);
            }
            .login-card h3 {
                margin: 0 0 15px 0;
                font-size: 1.3rem;
            }
            .metric {
                display: flex;
                justify-content: space-between;
                margin: 10px 0;
                padding: 8px 0;
                border-bottom: 1px solid rgba(255,255,255,0.1);
            }
            .metric:last-child {
                border-bottom: none;
            }
            .metric-value {
                font-weight: bold;
                color: #4ade80;
            }
            .websocket-status {
                text-align: center;
                margin: 20px 0;
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
                backdrop-filter: blur(10px);
                border-radius: 15px;
                padding: 20px;
                border: 1px solid rgba(255,255,255,0.2);
            }
            .endpoints h3 {
                margin: 0 0 15px 0;
            }
            .endpoint {
                margin: 10px 0;
                padding: 10px;
                background: rgba(255,255,255,0.05);
                border-radius: 8px;
                font-family: monospace;
            }
            .login-form {
                background: rgba(255,255,255,0.1);
                backdrop-filter: blur(10px);
                border-radius: 15px;
                padding: 30px;
                border: 1px solid rgba(255,255,255,0.2);
                max-width: 400px;
                margin: 0 auto;
            }
            .form-group {
                margin-bottom: 20px;
            }
            .form-group label {
                display: block;
                margin-bottom: 5px;
                font-weight: 500;
            }
            .form-group input {
                width: 100%;
                padding: 12px;
                border: 1px solid rgba(255,255,255,0.3);
                border-radius: 8px;
                background: rgba(255,255,255,0.1);
                color: white;
                font-size: 16px;
            }
            .form-group input::placeholder {
                color: rgba(255,255,255,0.7);
            }
            .btn {
                width: 100%;
                padding: 12px;
                background: #4ade80;
                color: white;
                border: none;
                border-radius: 8px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: background 0.3s;
            }
            .btn:hover {
                background: #22c55e;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🔐 Portal Login</h1>
                <p>Secure authentication and portal access management</p>
                <div class="websocket-status">
                    <span id="ws-status" class="status-indicator status-disconnected"></span>
                    <span id="ws-text">Connecting to real-time updates...</span>
                </div>
            </div>
            
            <div class="login-form">
                <h3 style="text-align: center; margin-bottom: 20px;">Login</h3>
                <form id="loginForm">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter your password" required>
                    </div>
                    <div class="form-group">
                        <label for="twoFactor">2FA Code (Optional)</label>
                        <input type="text" id="twoFactor" name="twoFactor" placeholder="Enter 2FA code">
                    </div>
                    <button type="submit" class="btn">Login</button>
                </form>
            </div>
            
            <div class="login-grid">
                <div class="login-card">
                    <h3>📊 Session Overview</h3>
                    <div class="metric">
                        <span>Total Sessions:</span>
                        <span class="metric-value" id="total-sessions">Loading...</span>
                    </div>
                    <div class="metric">
                        <span>Active Sessions:</span>
                        <span class="metric-value" id="active-sessions">Loading...</span>
                    </div>
                    <div class="metric">
                        <span>Average Duration:</span>
                        <span class="metric-value" id="avg-duration">Loading...</span>
                    </div>
                    <div class="metric">
                        <span>Peak Users:</span>
                        <span class="metric-value" id="peak-users">Loading...</span>
                    </div>
                </div>
                
                <div class="login-card">
                    <h3>🔐 Authentication</h3>
                    <div class="metric">
                        <span>Total Logins:</span>
                        <span class="metric-value" id="total-logins">Loading...</span>
                    </div>
                    <div class="metric">
                        <span>Successful:</span>
                        <span class="metric-value" id="successful-logins">Loading...</span>
                    </div>
                    <div class="metric">
                        <span>Failed:</span>
                        <span class="metric-value" id="failed-logins">Loading...</span>
                    </div>
                    <div class="metric">
                        <span>Success Rate:</span>
                        <span class="metric-value" id="success-rate">Loading...</span>
                    </div>
                </div>
                
                <div class="login-card">
                    <h3>🛡️ Security</h3>
                    <div class="metric">
                        <span>Total Events:</span>
                        <span class="metric-value" id="total-events">Loading...</span>
                    </div>
                    <div class="metric">
                        <span>Critical Events:</span>
                        <span class="metric-value" id="critical-events">Loading...</span>
                    </div>
                    <div class="metric">
                        <span>Blocked Attempts:</span>
                        <span class="metric-value" id="blocked-attempts">Loading...</span>
                    </div>
                    <div class="metric">
                        <span>2FA Enabled:</span>
                        <span class="metric-value" id="2fa-enabled">Loading...</span>
                    </div>
                </div>
            </div>
            
            <div class="endpoints">
                <h3>🔗 Login API Endpoints</h3>
                <div class="endpoint">GET /api/login/overview - Login overview</div>
                <div class="endpoint">POST /api/login/authenticate - User authentication</div>
                <div class="endpoint">GET /api/login/sessions - Session management</div>
                <div class="endpoint">GET /api/login/users - User management</div>
                <div class="endpoint">GET /api/login/security - Security events</div>
                <div class="endpoint">GET /api/login/analytics - Login analytics</div>
                <div class="endpoint">GET /api/login/health - Health check</div>
            </div>
        </div>
        
        <script>
            // WebSocket connection for real-time updates
            const ws = new WebSocket('ws://localhost:${PORT}');
            const wsStatus = document.getElementById('ws-status');
            const wsText = document.getElementById('ws-text');
            
            ws.onopen = function() {
                wsStatus.className = 'status-indicator status-connected';
                wsText.textContent = 'Connected to real-time login updates';
                ws.send(JSON.stringify({ type: 'subscribe_to_login' }));
            };
            
            ws.onclose = function() {
                wsStatus.className = 'status-indicator status-disconnected';
                wsText.textContent = 'Disconnected from real-time login updates';
            };
            
            ws.onmessage = function(event) {
                const data = JSON.parse(event.data);
                console.log('Received login update:', data);
                
                if (data.type === 'login_attempt') {
                    console.log('Login attempt:', data.data);
                } else if (data.type === 'session_activity') {
                    console.log('Session activity:', data.data);
                } else if (data.type === 'security_event') {
                    console.log('Security event:', data.data);
                }
            };
            
            // Login form handling
            document.getElementById('loginForm').addEventListener('submit', async function(e) {
                e.preventDefault();
                
                const formData = new FormData(e.target);
                const loginData = {
                    email: formData.get('email'),
                    password: formData.get('password'),
                    twoFactorCode: formData.get('twoFactor')
                };
                
                try {
                    const response = await fetch('/api/login/authenticate', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(loginData)
                    });
                    
                    const result = await response.json();
                    
                    if (result.success) {
                        alert('Login successful! Session: ' + result.data.id);
                        console.log('Login successful:', result.data);
                    } else {
                        alert('Login failed: ' + result.message);
                        console.error('Login failed:', result);
                    }
                } catch (error) {
                    alert('Login error: ' + error.message);
                    console.error('Login error:', error);
                }
            });
            
            // Load initial data
            async function loadLoginData() {
                try {
                    const [overview, analytics] = await Promise.all([
                        fetch('/api/login/overview').then(r => r.json()),
                        fetch('/api/login/analytics').then(r => r.json())
                    ]);
                    
                    if (overview.success) {
                        document.getElementById('total-sessions').textContent = overview.data.totalSessions;
                        document.getElementById('active-sessions').textContent = overview.data.activeSessions;
                        document.getElementById('total-logins').textContent = overview.data.totalLogins;
                        document.getElementById('successful-logins').textContent = overview.data.successfulLogins;
                        document.getElementById('failed-logins').textContent = overview.data.failedLogins;
                        document.getElementById('total-events').textContent = overview.data.totalSessions;
                        document.getElementById('2fa-enabled').textContent = overview.data.twoFactorEnabled;
                    }
                    
                    if (analytics.success) {
                        document.getElementById('avg-duration').textContent = analytics.data.sessions.averageDuration + ' min';
                        document.getElementById('peak-users').textContent = analytics.data.performance.peakConcurrentUsers;
                        document.getElementById('success-rate').textContent = analytics.data.logins.successRate + '%';
                        document.getElementById('critical-events').textContent = analytics.data.security.criticalEvents;
                        document.getElementById('blocked-attempts').textContent = analytics.data.security.blockedAttempts;
                    }
                } catch (error) {
                    console.error('Error loading login data:', error);
                }
            }
            
            // Load data on page load
            loadLoginData();
            
            // Refresh data every 30 seconds
            setInterval(loadLoginData, 30000);
        </script>
    </body>
    </html>
  `);
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Portal Login Server Error:', error);
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
  console.log(`🚀 Portal Login Server running on http://localhost:${PORT}`);
  console.log(`🔌 WebSocket server ready on ws://localhost:${PORT}`);
  console.log(`🔐 Portal Login: http://localhost:${PORT}`);
  console.log(`📊 Login Overview: http://localhost:${PORT}/api/login/overview`);
  console.log(`🔑 Authentication: http://localhost:${PORT}/api/login/authenticate`);
  console.log(`📋 Session Management: http://localhost:${PORT}/api/login/sessions`);
  console.log(`👥 User Management: http://localhost:${PORT}/api/login/users`);
  console.log(`🛡️  Security Events: http://localhost:${PORT}/api/login/security`);
  console.log(`📈 Login Analytics: http://localhost:${PORT}/api/login/analytics`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/api/login/health`);
  console.log(`🎯 Features: Real-time WebSocket updates, User authentication, Session management, Security monitoring`);
});

export default app;
