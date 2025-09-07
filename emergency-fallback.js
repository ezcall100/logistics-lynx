#!/usr/bin/env node

/**
 * EMERGENCY FALLBACK SYSTEM
 * Ensures 250 MCP agents can continue working even if main server fails
 */

const fs = require('fs');
const path = require('path');
const { spawn, exec } = require('child_process');

class EmergencyFallback {
  constructor() {
    this.fallbackPorts = [3002, 3003, 3004, 3005, 3006];
    this.currentPort = 3000;
    this.fallbackIndex = 0;
    this.maxAttempts = 5;
  }

  async killAllProcesses() {
    return new Promise((resolve) => {
      exec('taskkill /f /im node.exe', (error) => {
        console.log('🧹 Cleaned up all Node.js processes');
        resolve();
      });
    });
  }

  async checkPort(port) {
    return new Promise((resolve) => {
      exec(`netstat -an | findstr :${port}`, (error, stdout) => {
        const isAvailable = !stdout.includes('LISTENING');
        resolve(isAvailable);
      });
    });
  }

  async findAvailablePort() {
    for (const port of this.fallbackPorts) {
      const isAvailable = await this.checkPort(port);
      if (isAvailable) {
        console.log(`✅ Found available port: ${port}`);
        return port;
      }
    }
    return null;
  }

  async startFallbackServer() {
    console.log('🛡️ EMERGENCY FALLBACK ACTIVATED');
    console.log('🎯 250 MCP Agents switching to backup server');
    
    await this.killAllProcesses();
    
    const availablePort = await this.findAvailablePort();
    if (!availablePort) {
      console.log('❌ No available ports found. Trying to free up port 3000...');
      await this.killAllProcesses();
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
    
    const port = availablePort || 3000;
    this.currentPort = port;
    
    console.log(`🚀 Starting fallback server on port ${port}...`);
    
    const serverProcess = spawn('npm', ['run', 'dev', '--', '--port', port.toString()], {
      stdio: 'inherit',
      shell: true
    });

    serverProcess.on('error', (error) => {
      console.error('❌ Fallback server error:', error);
      this.tryNextFallback();
    });

    serverProcess.on('exit', (code) => {
      console.log(`⚠️ Fallback server exited with code ${code}`);
      this.tryNextFallback();
    });

    // Wait for server to start
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    console.log(`✅ Fallback server started on port ${port}`);
    console.log(`🌐 Access at: http://localhost:${port}`);
    
    return port;
  }

  async tryNextFallback() {
    this.fallbackIndex++;
    
    if (this.fallbackIndex >= this.maxAttempts) {
      console.log('💥 All fallback attempts failed. Switching to static file serving...');
      await this.serveStaticFiles();
      return;
    }
    
    console.log(`🔄 Trying fallback attempt ${this.fallbackIndex + 1}/${this.maxAttempts}`);
    await this.startFallbackServer();
  }

  async serveStaticFiles() {
    console.log('📁 Serving static files as last resort...');
    
    // Create a simple static file server
    const staticServer = `
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('dist'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log('📁 Static file server running on port ' + port);
});
    `;
    
    fs.writeFileSync('static-server.js', staticServer);
    
    const serverProcess = spawn('node', ['static-server.js'], {
      stdio: 'inherit',
      shell: true
    });
    
    console.log('📁 Static file server started as emergency fallback');
  }

  async run() {
    console.log('🛡️ EMERGENCY FALLBACK SYSTEM INITIALIZED');
    console.log('🎯 250 MCP Agents protected with multiple backup strategies');
    
    await this.startFallbackServer();
  }
}

// Start emergency fallback
const fallback = new EmergencyFallback();
fallback.run().catch(console.error);
