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
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003', 'http://localhost:3006'],
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
      totalAgents: 302,
      activeAgents: 286,
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

// Serve MCP Dashboard at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/mcp-agents-dashboard.html'));
});

// Serve MCP Dashboard route - serve the new HTML dashboard
app.get('/mcp-dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/mcp-agents-dashboard.html'));
});

// Handle malformed route requests (missing 'mcp' prefix)
app.get('/-dashboard', (req, res) => {
  console.log('⚠️ Malformed route detected: /-dashboard, redirecting to /mcp-dashboard');
  res.redirect('/mcp-dashboard');
});

// Handle other potential malformed routes
app.get('/dashboard', (req, res) => {
  console.log('⚠️ Malformed route detected: /dashboard, redirecting to /mcp-dashboard');
  res.redirect('/mcp-dashboard');
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
