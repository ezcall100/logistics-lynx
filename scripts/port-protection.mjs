#!/usr/bin/env node

/**
 * PORT PROTECTION SYSTEM
 * 
 * This script monitors and protects the locked ports from MCP agent interference.
 * DO NOT MODIFY THIS SCRIPT - IT PROTECTS CRITICAL PORT CONFIGURATIONS.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// LOCKED PORTS - DO NOT MODIFY
const LOCKED_PORTS = {
  MAIN_WEBSITE: 3000,
  MCP_API: 3001,
  LOGIN_SYSTEM: 3006
};

// PROTECTED FILES - DO NOT MODIFY
const PROTECTED_FILES = [
  'vite.config.ts',
  'portal-app/vite.config.ts',
  'server/mcp-server.js',
  'package.json',
  'portal-app/package.json'
];

class PortProtectionSystem {
  constructor() {
    this.lockedPorts = LOCKED_PORTS;
    this.protectedFiles = PROTECTED_FILES;
    this.isMonitoring = false;
  }

  /**
   * Check if locked ports are running
   */
  checkPortStatus() {
    console.log('🔍 Checking locked port status...');
    
    try {
      const result = execSync('netstat -ano | findstr ":300"', { encoding: 'utf8' });
      const lines = result.split('\n').filter(line => line.trim());
      
      const portStatus = {
        3000: false,
        3001: false,
        3006: false
      };
      
      lines.forEach(line => {
        if (line.includes(':3000')) portStatus[3000] = true;
        if (line.includes(':3001')) portStatus[3001] = true;
        if (line.includes(':3006')) portStatus[3006] = true;
      });
      
      console.log('📊 Port Status:');
      console.log(`  Port 3000 (Main Website): ${portStatus[3000] ? '✅ RUNNING' : '❌ NOT RUNNING'}`);
      console.log(`  Port 3001 (MCP API): ${portStatus[3001] ? '✅ RUNNING' : '❌ NOT RUNNING'}`);
      console.log(`  Port 3006 (Login System): ${portStatus[3006] ? '✅ RUNNING' : '❌ NOT RUNNING'}`);
      
      return portStatus;
    } catch (error) {
      console.error('❌ Error checking port status:', error.message);
      return null;
    }
  }

  /**
   * Verify protected files haven't been modified
   */
  verifyProtectedFiles() {
    console.log('🔒 Verifying protected files...');
    
    const issues = [];
    
    this.protectedFiles.forEach(file => {
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        
        // Check for port modifications
        if (file.includes('vite.config.ts')) {
          if (content.includes('port: 3000') || content.includes('port: 3006')) {
            console.log(`✅ ${file}: Port configuration intact`);
          } else {
            issues.push(`${file}: Port configuration may have been modified`);
          }
        }
        
        if (file.includes('mcp-server.js')) {
          if (content.includes('PORT = process.env.MCP_PORT || 3001')) {
            console.log(`✅ ${file}: MCP port configuration intact`);
          } else {
            issues.push(`${file}: MCP port configuration may have been modified`);
          }
        }
        
        if (file.includes('package.json')) {
          if (content.includes('"dev:mcp"') || content.includes('"dev"')) {
            console.log(`✅ ${file}: Script configuration intact`);
          } else {
            issues.push(`${file}: Script configuration may have been modified`);
          }
        }
      } else {
        issues.push(`${file}: File not found`);
      }
    });
    
    if (issues.length > 0) {
      console.log('⚠️ Issues detected:');
      issues.forEach(issue => console.log(`  - ${issue}`));
    } else {
      console.log('✅ All protected files are intact');
    }
    
    return issues;
  }

  /**
   * Start port monitoring
   */
  startMonitoring() {
    console.log('🚀 Starting port protection monitoring...');
    this.isMonitoring = true;
    
    const monitor = () => {
      if (!this.isMonitoring) return;
      
      const portStatus = this.checkPortStatus();
      const fileIssues = this.verifyProtectedFiles();
      
      if (portStatus) {
        const allRunning = portStatus[3000] && portStatus[3001] && portStatus[3006];
        
        if (!allRunning) {
          console.log('🚨 ALERT: Not all locked ports are running!');
          console.log('🔧 Attempting to restart services...');
          this.restartServices();
        }
      }
      
      if (fileIssues.length > 0) {
        console.log('🚨 ALERT: Protected files have been modified!');
        console.log('🔒 Port lock system compromised!');
      }
      
      // Check again in 30 seconds
      setTimeout(monitor, 30000);
    };
    
    monitor();
  }

  /**
   * Restart all services
   */
  restartServices() {
    console.log('🔄 Restarting locked port services...');
    
    try {
      // Kill existing processes
      console.log('🛑 Stopping existing services...');
      execSync('npx kill-port 3000', { stdio: 'ignore' });
      execSync('npx kill-port 3001', { stdio: 'ignore' });
      execSync('npx kill-port 3006', { stdio: 'ignore' });
      
      // Wait a moment
      setTimeout(() => {
        console.log('🚀 Starting services...');
        
        // Start main website (port 3000)
        execSync('npm run dev', { stdio: 'pipe', detached: true });
        
        // Start MCP API (port 3001)
        execSync('npm run dev:mcp', { stdio: 'pipe', detached: true });
        
        // Start login system (port 3006)
        execSync('cd portal-app && npm run dev', { stdio: 'pipe', detached: true });
        
        console.log('✅ All services restarted');
      }, 2000);
      
    } catch (error) {
      console.error('❌ Error restarting services:', error.message);
    }
  }

  /**
   * Stop monitoring
   */
  stopMonitoring() {
    console.log('🛑 Stopping port protection monitoring...');
    this.isMonitoring = false;
  }

  /**
   * Display lock status
   */
  displayLockStatus() {
    console.log('🔒 PORT LOCK SYSTEM STATUS');
    console.log('========================');
    console.log('Locked Ports:');
    console.log(`  Port 3000: Main Website - 🔒 LOCKED`);
    console.log(`  Port 3001: MCP API - 🔒 LOCKED`);
    console.log(`  Port 3006: Login System - 🔒 LOCKED`);
    console.log('');
    console.log('Protected Files:');
    this.protectedFiles.forEach(file => {
      console.log(`  ${file} - 🔒 PROTECTED`);
    });
    console.log('');
    console.log('⚠️ MCP AGENTS: DO NOT MODIFY THESE PORTS!');
  }
}

// Main execution
const portProtection = new PortProtectionSystem();

// Handle command line arguments
const command = process.argv[2];

switch (command) {
  case 'status':
    portProtection.displayLockStatus();
    portProtection.checkPortStatus();
    break;
    
  case 'monitor':
    portProtection.startMonitoring();
    break;
    
  case 'restart':
    portProtection.restartServices();
    break;
    
  case 'verify':
    portProtection.verifyProtectedFiles();
    break;
    
  default:
    console.log('🔒 PORT PROTECTION SYSTEM');
    console.log('========================');
    console.log('Usage:');
    console.log('  node scripts/port-protection.mjs status   - Check port status');
    console.log('  node scripts/port-protection.mjs monitor  - Start monitoring');
    console.log('  node scripts/port-protection.mjs restart  - Restart services');
    console.log('  node scripts/port-protection.mjs verify   - Verify protected files');
    console.log('');
    console.log('🔒 LOCKED PORTS: 3000, 3001, 3006');
    console.log('⚠️ MCP AGENTS: DO NOT MODIFY THESE PORTS!');
}

export default PortProtectionSystem;
