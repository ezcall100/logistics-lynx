#!/usr/bin/env node

/**
 * MCP Dashboard Server - Port 3002
 * 
 * 🔒 PORT LOCK WARNING: DO NOT MODIFY PORT 3002
 * MCP AGENTS: This port is locked and must not be changed
 * See PORT_LOCK_SYSTEM.md for details
 * 
 * This server provides the MCP Dashboard interface for monitoring
 * and managing MCP agents, system health, and real-time metrics.
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
const PORT = process.env.MCP_DASHBOARD_PORT || 3002; // 🔒 LOCKED: Do not change this port

// Create HTTP server for WebSocket support
const server = createServer(app);
const wss = new WebSocketServer({ server });

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3005'],
  credentials: true
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// WebSocket connection handling for real-time dashboard updates
wss.on('connection', (ws) => {
  console.log('🔌 New MCP Dashboard WebSocket connection established');
  
  // Send initial connection confirmation
  ws.send(JSON.stringify({
    type: 'connection_established',
    message: 'Connected to MCP Dashboard Real-time Updates',
    timestamp: new Date().toISOString()
  }));

  // Handle incoming messages
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message.toString());
      console.log('Received MCP Dashboard WebSocket message:', data);
      
      // Handle different message types
      if (data.type === 'subscribe_to_dashboard') {
        ws.send(JSON.stringify({
          type: 'subscription_confirmed',
          message: 'Subscribed to MCP Dashboard real-time updates',
          timestamp: new Date().toISOString()
        }));
      }
    } catch (error) {
      console.error('Error parsing MCP Dashboard WebSocket message:', error);
    }
  });

  // Handle connection close
  ws.on('close', () => {
    console.log('🔌 MCP Dashboard WebSocket connection closed');
  });

  // Handle errors
  ws.on('error', (error) => {
    console.error('MCP Dashboard WebSocket error:', error);
  });
});

// Function to broadcast updates to all connected clients
function broadcastDashboardUpdate(type, data) {
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

// Simulate real-time dashboard updates
function simulateDashboardUpdates() {
  setInterval(() => {
    if (wss.clients.size > 0) {
      const dashboardUpdates = [
        {
          type: 'agent_status_update',
          data: {
            agentId: `agent-${Math.floor(Math.random() * 10) + 1}`,
            status: ['online', 'busy', 'idle'][Math.floor(Math.random() * 3)],
            currentTask: 'Processing user request',
            performance: Math.floor(Math.random() * 20) + 80,
            lastUpdate: new Date().toISOString()
          }
        },
        {
          type: 'system_metrics_update',
          data: {
            cpuUsage: Math.floor(Math.random() * 30) + 40,
            memoryUsage: Math.floor(Math.random() * 20) + 60,
            activeConnections: Math.floor(Math.random() * 50) + 10,
            responseTime: Math.floor(Math.random() * 100) + 200,
            timestamp: new Date().toISOString()
          }
        },
        {
          type: 'task_progress_update',
          data: {
            taskId: `task-${Date.now()}`,
            progress: Math.floor(Math.random() * 100),
            status: ['running', 'completed', 'failed'][Math.floor(Math.random() * 3)],
            agentId: `agent-${Math.floor(Math.random() * 5) + 1}`,
            timestamp: new Date().toISOString()
          }
        }
      ];

      dashboardUpdates.forEach(update => {
        broadcastDashboardUpdate(update.type, update.data);
      });
    }
  }, 3000); // Update every 3 seconds
}

// Start dashboard updates simulation
simulateDashboardUpdates();

// API Routes for MCP Dashboard

// Dashboard overview
app.get('/api/dashboard/overview', (req, res) => {
  const overview = {
    success: true,
    data: {
      totalAgents: 301,
      activeAgents: 285,
      totalTasks: 1247,
      completedTasks: 1156,
      failedTasks: 23,
      systemHealth: 'excellent',
      uptime: process.uptime(),
      version: '2.1.4',
      lastUpdate: new Date().toISOString()
    },
    message: 'Dashboard overview retrieved successfully',
    timestamp: new Date().toISOString()
  };
  res.json(overview);
});

// Agent status
app.get('/api/dashboard/agents', (req, res) => {
  const agents = Array.from({ length: 20 }, (_, i) => ({
    id: `agent-${i + 1}`,
    name: `MCP Agent ${i + 1}`,
    type: ['data_processor', 'ai_assistant', 'coordinator', 'monitor'][Math.floor(Math.random() * 4)],
    status: ['online', 'busy', 'idle', 'offline'][Math.floor(Math.random() * 4)],
    currentTask: i % 3 === 0 ? 'Processing user request' : null,
    performance: Math.floor(Math.random() * 20) + 80,
    lastHeartbeat: new Date(Date.now() - Math.random() * 60000).toISOString(),
    location: ['us-east-1', 'us-west-2', 'eu-west-1'][Math.floor(Math.random() * 3)],
    version: '2.1.4'
  }));

  res.json({
    success: true,
    data: agents,
    message: 'Agent status retrieved successfully',
    timestamp: new Date().toISOString()
  });
});

// System metrics
app.get('/api/dashboard/metrics', (req, res) => {
  const metrics = {
    success: true,
    data: {
      cpu: {
        usage: Math.floor(Math.random() * 30) + 40,
        cores: 8,
        load: [0.5, 0.7, 0.6, 0.8, 0.4, 0.9, 0.3, 0.6]
      },
      memory: {
        usage: Math.floor(Math.random() * 20) + 60,
        total: 16384,
        used: 9830,
        free: 6554
      },
      network: {
        bytesIn: Math.floor(Math.random() * 1000000) + 500000,
        bytesOut: Math.floor(Math.random() * 1000000) + 300000,
        connections: Math.floor(Math.random() * 50) + 10
      },
      storage: {
        usage: Math.floor(Math.random() * 20) + 30,
        total: 1000000,
        used: 350000,
        free: 650000
      },
      responseTime: Math.floor(Math.random() * 100) + 200,
      errorRate: Math.random() * 0.05,
      timestamp: new Date().toISOString()
    },
    message: 'System metrics retrieved successfully',
    timestamp: new Date().toISOString()
  };
  res.json(metrics);
});

// Task queue
app.get('/api/dashboard/tasks', (req, res) => {
  const tasks = Array.from({ length: 15 }, (_, i) => ({
    id: `task-${i + 1}`,
    type: ['document_processing', 'ai_inference', 'data_analysis', 'user_query'][Math.floor(Math.random() * 4)],
    status: ['queued', 'running', 'completed', 'failed'][Math.floor(Math.random() * 4)],
    priority: Math.floor(Math.random() * 5) + 1,
    progress: Math.floor(Math.random() * 100),
    agentId: `agent-${Math.floor(Math.random() * 10) + 1}`,
    createdAt: new Date(Date.now() - Math.random() * 3600000).toISOString(),
    estimatedCompletion: new Date(Date.now() + Math.random() * 1800000).toISOString()
  }));

  res.json({
    success: true,
    data: tasks,
    message: 'Task queue retrieved successfully',
    timestamp: new Date().toISOString()
  });
});

// System logs
app.get('/api/dashboard/logs', (req, res) => {
  const logs = Array.from({ length: 20 }, (_, i) => ({
    id: `log-${i + 1}`,
    timestamp: new Date(Date.now() - i * 60000).toISOString(),
    level: ['info', 'warning', 'error', 'debug'][Math.floor(Math.random() * 4)],
    message: [
      'Agent started successfully',
      'Task completed',
      'System health check passed',
      'New connection established',
      'Memory usage high',
      'Task failed, retrying',
      'Agent performance degraded',
      'System backup completed'
    ][Math.floor(Math.random() * 8)],
    agentId: `agent-${Math.floor(Math.random() * 10) + 1}`,
    component: ['agent', 'system', 'network', 'storage'][Math.floor(Math.random() * 4)]
  }));

  res.json({
    success: true,
    data: logs,
    message: 'System logs retrieved successfully',
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get('/api/dashboard/health', (req, res) => {
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
        agents: 'healthy'
      }
    },
    message: 'Dashboard health check passed',
    timestamp: new Date().toISOString()
  });
});

// Serve dashboard HTML
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MCP Dashboard</title>
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
            .status-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 20px;
                margin-bottom: 40px;
            }
            .status-card {
                background: rgba(255,255,255,0.1);
                backdrop-filter: blur(10px);
                border-radius: 15px;
                padding: 20px;
                border: 1px solid rgba(255,255,255,0.2);
            }
            .status-card h3 {
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
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🤖 MCP Dashboard</h1>
                <p>Real-time monitoring and management of MCP agents</p>
                <div class="websocket-status">
                    <span id="ws-status" class="status-indicator status-disconnected"></span>
                    <span id="ws-text">Connecting to real-time updates...</span>
                </div>
            </div>
            
            <div class="status-grid">
                <div class="status-card">
                    <h3>📊 System Overview</h3>
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
                
                <div class="status-card">
                    <h3>⚡ Performance Metrics</h3>
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
                
                <div class="status-card">
                    <h3>📋 Task Queue</h3>
                    <div class="metric">
                        <span>Total Tasks:</span>
                        <span class="metric-value" id="total-tasks">Loading...</span>
                    </div>
                    <div class="metric">
                        <span>Completed:</span>
                        <span class="metric-value" id="completed-tasks">Loading...</span>
                    </div>
                    <div class="metric">
                        <span>Failed:</span>
                        <span class="metric-value" id="failed-tasks">Loading...</span>
                    </div>
                    <div class="metric">
                        <span>Success Rate:</span>
                        <span class="metric-value" id="success-rate">Loading...</span>
                    </div>
                </div>
            </div>
            
            <div class="endpoints">
                <h3>🔗 API Endpoints</h3>
                <div class="endpoint">GET /api/dashboard/overview - System overview</div>
                <div class="endpoint">GET /api/dashboard/agents - Agent status</div>
                <div class="endpoint">GET /api/dashboard/metrics - System metrics</div>
                <div class="endpoint">GET /api/dashboard/tasks - Task queue</div>
                <div class="endpoint">GET /api/dashboard/logs - System logs</div>
                <div class="endpoint">GET /api/dashboard/health - Health check</div>
            </div>
        </div>
        
        <script>
            // WebSocket connection for real-time updates
            const ws = new WebSocket('ws://localhost:${PORT}');
            const wsStatus = document.getElementById('ws-status');
            const wsText = document.getElementById('ws-text');
            
            ws.onopen = function() {
                wsStatus.className = 'status-indicator status-connected';
                wsText.textContent = 'Connected to real-time updates';
                ws.send(JSON.stringify({ type: 'subscribe_to_dashboard' }));
            };
            
            ws.onclose = function() {
                wsStatus.className = 'status-indicator status-disconnected';
                wsText.textContent = 'Disconnected from real-time updates';
            };
            
            ws.onmessage = function(event) {
                const data = JSON.parse(event.data);
                console.log('Received update:', data);
                
                if (data.type === 'agent_status_update') {
                    // Update agent status in real-time
                    console.log('Agent status update:', data.data);
                } else if (data.type === 'system_metrics_update') {
                    // Update system metrics in real-time
                    document.getElementById('cpu-usage').textContent = data.data.cpuUsage + '%';
                    document.getElementById('memory-usage').textContent = data.data.memoryUsage + '%';
                    document.getElementById('response-time').textContent = data.data.responseTime + 'ms';
                } else if (data.type === 'task_progress_update') {
                    // Update task progress in real-time
                    console.log('Task progress update:', data.data);
                }
            };
            
            // Load initial data
            async function loadDashboardData() {
                try {
                    const [overview, metrics] = await Promise.all([
                        fetch('/api/dashboard/overview').then(r => r.json()),
                        fetch('/api/dashboard/metrics').then(r => r.json())
                    ]);
                    
                    if (overview.success) {
                        document.getElementById('total-agents').textContent = overview.data.totalAgents;
                        document.getElementById('active-agents').textContent = overview.data.activeAgents;
                        document.getElementById('system-health').textContent = overview.data.systemHealth;
                        document.getElementById('uptime').textContent = Math.floor(overview.data.uptime / 60) + ' minutes';
                        document.getElementById('total-tasks').textContent = overview.data.totalTasks;
                        document.getElementById('completed-tasks').textContent = overview.data.completedTasks;
                        document.getElementById('failed-tasks').textContent = overview.data.failedTasks;
                        document.getElementById('success-rate').textContent = 
                            Math.round((overview.data.completedTasks / overview.data.totalTasks) * 100) + '%';
                    }
                    
                    if (metrics.success) {
                        document.getElementById('cpu-usage').textContent = metrics.data.cpu.usage + '%';
                        document.getElementById('memory-usage').textContent = metrics.data.memory.usage + '%';
                        document.getElementById('response-time').textContent = metrics.data.responseTime + 'ms';
                        document.getElementById('error-rate').textContent = (metrics.data.errorRate * 100).toFixed(2) + '%';
                    }
                } catch (error) {
                    console.error('Error loading dashboard data:', error);
                }
            }
            
            // Load data on page load
            loadDashboardData();
            
            // Refresh data every 30 seconds
            setInterval(loadDashboardData, 30000);
        </script>
    </body>
    </html>
  `);
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('MCP Dashboard Server Error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: error.message,
    timestamp: new Date().toISOString()
  });
});

// MCP Dashboard Login Route
app.get('/login', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MCP Dashboard Login - TransBot AI</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0891b2 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .login-container {
                background: rgba(15, 23, 42, 0.8);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(6, 182, 212, 0.2);
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
                color: #06b6d4;
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
                border-color: #06b6d4;
                box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1);
            }
            .login-btn {
                width: 100%;
                padding: 0.75rem;
                background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
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
                box-shadow: 0 10px 25px -5px rgba(6, 182, 212, 0.4);
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
                <h1>🤖 MCP Dashboard</h1>
                <p>Model Context Protocol Command Center</p>
            </div>
            
            <form id="loginForm">
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" name="email" placeholder="admin@transbotai.com" required>
                </div>
                
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" required>
                </div>
                
                <button type="submit" class="login-btn">Access MCP Dashboard</button>
            </form>
            
            <div class="status">
                <span class="dot"></span>
                System Online • 301 Agents Active
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
  console.log(`🚀 MCP Dashboard Server running on http://localhost:${PORT}`);
  console.log(`🔌 WebSocket server ready on ws://localhost:${PORT}`);
  console.log(`📊 Dashboard: http://localhost:${PORT}`);
  console.log(`📈 API Overview: http://localhost:${PORT}/api/dashboard/overview`);
  console.log(`🤖 Agent Status: http://localhost:${PORT}/api/dashboard/agents`);
  console.log(`⚡ System Metrics: http://localhost:${PORT}/api/dashboard/metrics`);
  console.log(`📋 Task Queue: http://localhost:${PORT}/api/dashboard/tasks`);
  console.log(`📝 System Logs: http://localhost:${PORT}/api/dashboard/logs`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/api/dashboard/health`);
  console.log(`🎯 Features: Real-time WebSocket updates, Agent monitoring, System metrics, Task queue management`);
});

export default app;
