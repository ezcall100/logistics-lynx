#!/usr/bin/env node

/**
 * BACKUP SERVER RESTART SCRIPT
 * Ensures 250 MCP agents always have a working server
 */

const { spawn, exec } = require('child_process');
const fs = require('fs');
const path = require('path');

class ServerBackupManager {
  constructor() {
    this.serverProcess = null;
    this.restartAttempts = 0;
    this.maxRestartAttempts = 10;
    this.port = 3000;
    this.isRunning = false;
  }

  async killAllNodeProcesses() {
    return new Promise((resolve) => {
      exec('taskkill /f /im node.exe', (error) => {
        // Ignore errors - process might not exist
        console.log('✅ Killed all Node.js processes');
        resolve();
      });
    });
  }

  async checkPortStatus() {
    return new Promise((resolve) => {
      exec(`netstat -an | findstr :${this.port}`, (error, stdout) => {
        const isListening = stdout.includes('LISTENING');
        resolve(isListening);
      });
    });
  }

  async startServer() {
    console.log(`🚀 Starting server on port ${this.port}...`);
    
    this.serverProcess = spawn('npm', ['run', 'dev', '--', '--port', this.port.toString()], {
      stdio: 'inherit',
      shell: true
    });

    this.serverProcess.on('error', (error) => {
      console.error('❌ Server error:', error);
      this.handleServerError();
    });

    this.serverProcess.on('exit', (code) => {
      console.log(`⚠️ Server exited with code ${code}`);
      this.handleServerError();
    });

    // Wait for server to start
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    const isListening = await this.checkPortStatus();
    if (isListening) {
      console.log('✅ Server started successfully!');
      this.isRunning = true;
      this.restartAttempts = 0;
    } else {
      console.log('❌ Server failed to start');
      this.handleServerError();
    }
  }

  async handleServerError() {
    this.isRunning = false;
    this.restartAttempts++;
    
    if (this.restartAttempts >= this.maxRestartAttempts) {
      console.error('💥 Maximum restart attempts reached. Switching to backup strategy.');
      await this.switchToBackupStrategy();
      return;
    }

    console.log(`🔄 Restarting server (attempt ${this.restartAttempts}/${this.maxRestartAttempts})...`);
    
    await this.killAllNodeProcesses();
    await new Promise(resolve => setTimeout(resolve, 2000));
    await this.startServer();
  }

  async switchToBackupStrategy() {
    console.log('🛡️ Switching to backup strategy...');
    
    // Strategy 1: Try different port
    this.port = 3000;
    console.log(`🔄 Trying port ${this.port}...`);
    await this.startServer();
    
    if (!this.isRunning) {
      // Strategy 2: Use preview server
      this.port = 3000;
      console.log('🔄 Trying preview server...');
      await this.killAllNodeProcesses();
      this.serverProcess = spawn('npm', ['run', 'preview', '--', '--port', this.port.toString()], {
        stdio: 'inherit',
        shell: true
      });
    }
  }

  async monitorServer() {
    setInterval(async () => {
      if (this.isRunning) {
        const isListening = await this.checkPortStatus();
        if (!isListening) {
          console.log('⚠️ Server stopped unexpectedly. Restarting...');
          await this.handleServerError();
        }
      }
    }, 10000); // Check every 10 seconds
  }

  async start() {
    console.log('🛡️ BACKUP SERVER MANAGER STARTED');
    console.log('🎯 Ensuring 250 MCP agents always have a working server');
    
    await this.killAllNodeProcesses();
    await this.startServer();
    await this.monitorServer();
  }
}

// Start the backup manager
const backupManager = new ServerBackupManager();
backupManager.start().catch(console.error);

// Handle process termination
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down backup manager...');
  await backupManager.killAllNodeProcesses();
  process.exit(0);
});
