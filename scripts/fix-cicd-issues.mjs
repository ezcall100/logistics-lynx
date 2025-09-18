#!/usr/bin/env node

/**
 * 🔧 CI/CD Issues Resolution Script
 * Fixes dependency lock file issues and port conflicts
 */

import { spawn, exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(step, message) {
  log(`\n🔧 Step ${step}: ${message}`, 'cyan');
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

// Check if a port is in use
async function isPortInUse(port) {
  try {
    const { stdout } = await execAsync(`netstat -an | findstr ":${port}"`);
    return stdout.trim().length > 0;
  } catch (error) {
    return false;
  }
}

// Kill processes on specific ports
async function killPortProcesses(port) {
  try {
    log(`🔍 Checking processes on port ${port}...`, 'blue');
    
    // Find processes using the port
    const { stdout } = await execAsync(`netstat -ano | findstr ":${port}"`);
    
    if (stdout.trim()) {
      const lines = stdout.trim().split('\n');
      const pids = new Set();
      
      for (const line of lines) {
        const parts = line.trim().split(/\s+/);
        if (parts.length >= 5) {
          const pid = parts[parts.length - 1];
          if (pid && pid !== '0') {
            pids.add(pid);
          }
        }
      }
      
      // Kill processes
      for (const pid of pids) {
        try {
          log(`🔪 Killing process ${pid} on port ${port}...`, 'yellow');
          await execAsync(`taskkill /PID ${pid} /F`);
          logSuccess(`Process ${pid} killed`);
        } catch (error) {
          logWarning(`Could not kill process ${pid}: ${error.message}`);
        }
      }
    } else {
      logSuccess(`No processes found on port ${port}`);
    }
  } catch (error) {
    logWarning(`Error checking port ${port}: ${error.message}`);
  }
}

// Verify package-lock.json exists
async function verifyPackageLock() {
  try {
    await fs.access('package-lock.json');
    logSuccess('package-lock.json exists');
    return true;
  } catch (error) {
    logError('package-lock.json not found');
    return false;
  }
}

// Install dependencies
async function installDependencies() {
  try {
    log('📦 Installing dependencies...', 'blue');
    await execAsync('npm install');
    logSuccess('Dependencies installed successfully');
    return true;
  } catch (error) {
    logError(`Failed to install dependencies: ${error.message}`);
    return false;
  }
}

// Run security audit
async function runSecurityAudit() {
  try {
    log('🔒 Running security audit...', 'blue');
    const { stdout, stderr } = await execAsync('npm audit --audit-level=moderate');
    
    if (stderr && stderr.includes('vulnerabilities')) {
      logWarning('Security vulnerabilities found. Consider running npm audit fix');
    } else {
      logSuccess('Security audit passed');
    }
    
    return true;
  } catch (error) {
    logWarning(`Security audit completed with warnings: ${error.message}`);
    return true; // Don't fail the build for audit warnings
  }
}

// Check port status
async function checkPortStatus() {
  const ports = [3000, 3001, 3002, 3005, 3006];
  const portNames = {
    3000: 'Main Website',
    3001: 'MCP API Server',
    3002: 'MCP Dashboard',
    3005: 'Super Admin Portal',
    3006: 'Portal App (Login)'
  };
  
  log('\n🔍 Checking port status...', 'cyan');
  
  for (const port of ports) {
    const inUse = await isPortInUse(port);
    const status = inUse ? 'IN USE' : 'FREE';
    const icon = inUse ? '❌' : '✅';
    
    log(`${icon} Port ${port}: ${portNames[port]} - ${status}`, inUse ? 'red' : 'green');
  }
}

// Fix port conflicts
async function fixPortConflicts() {
  const ports = [3000, 3001, 3002, 3005, 3006];
  
  log('\n🔧 Fixing port conflicts...', 'cyan');
  
  for (const port of ports) {
    const inUse = await isPortInUse(port);
    if (inUse) {
      log(`🔧 Port ${port} is in use, attempting to free it...`, 'yellow');
      await killPortProcesses(port);
      
      // Wait a moment and check again
      await new Promise(resolve => setTimeout(resolve, 2000));
      const stillInUse = await isPortInUse(port);
      
      if (stillInUse) {
        logWarning(`Port ${port} is still in use after cleanup attempt`);
      } else {
        logSuccess(`Port ${port} is now free`);
      }
    }
  }
}

// Verify CI/CD configuration
async function verifyCICDConfig() {
  log('\n🔍 Verifying CI/CD configuration...', 'cyan');
  
  try {
    // Check if .github/workflows directory exists
    await fs.access('.github/workflows');
    logSuccess('.github/workflows directory exists');
    
    // List workflow files
    const files = await fs.readdir('.github/workflows');
    const workflowFiles = files.filter(file => file.endsWith('.yml') || file.endsWith('.yaml'));
    
    log(`📄 Found ${workflowFiles.length} workflow files:`, 'blue');
    for (const file of workflowFiles) {
      log(`   - ${file}`, 'blue');
    }
    
    return true;
  } catch (error) {
    logError(`CI/CD configuration issue: ${error.message}`);
    return false;
  }
}

// Main function
async function main() {
  log('🔧 CI/CD Issues Resolution Script', 'bright');
  log('=====================================', 'bright');
  
  const startTime = Date.now();
  
  try {
    // Step 1: Verify package-lock.json
    logStep(1, 'Verifying dependency lock file');
    const hasPackageLock = await verifyPackageLock();
    
    if (!hasPackageLock) {
      logStep(1.1, 'Installing dependencies to create package-lock.json');
      await installDependencies();
    }
    
    // Step 2: Run security audit
    logStep(2, 'Running security audit');
    await runSecurityAudit();
    
    // Step 3: Check port status
    logStep(3, 'Checking port status');
    await checkPortStatus();
    
    // Step 4: Fix port conflicts
    logStep(4, 'Fixing port conflicts');
    await fixPortConflicts();
    
    // Step 5: Verify CI/CD configuration
    logStep(5, 'Verifying CI/CD configuration');
    await verifyCICDConfig();
    
    // Final status check
    log('\n🔍 Final port status check...', 'cyan');
    await checkPortStatus();
    
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    
    log('\n🎉 CI/CD Issues Resolution Complete!', 'green');
    log(`⏱️  Total time: ${duration} seconds`, 'blue');
    log('\n📋 Next steps:', 'cyan');
    log('   1. Run: npm run dev (to start main website on port 3000)', 'blue');
    log('   2. Run: npm run dev:mcp (to start MCP API on port 3001)', 'blue');
    log('   3. Run: npm run dev:dashboard (to start MCP Dashboard on port 3002)', 'blue');
    log('   4. Run: npm run dev:super-admin (to start Super Admin on port 3005)', 'blue');
    log('   5. Run: npm run dev:portal (to start Portal App on port 3006)', 'blue');
    log('   6. Or run: npm run start:all (to start all services)', 'blue');
    
  } catch (error) {
    logError(`Script failed: ${error.message}`);
    process.exit(1);
  }
}

// Run the script
main().catch(console.error);
