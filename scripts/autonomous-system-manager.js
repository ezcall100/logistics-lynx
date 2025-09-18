#!/usr/bin/env node

/**
 * Autonomous System Manager
 * Central management interface for the autonomous error system
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class AutonomousSystemManager {
  constructor() {
    this.projectRoot = process.cwd();
    this.configPath = path.join(this.projectRoot, 'autonomous-error-config.json');
    this.reportsDir = path.join(this.projectRoot, 'error-reports');
  }

  /**
   * Main management interface
   */
  async manage() {
    const command = process.argv[2];
    
    switch (command) {
      case 'status':
        await this.showStatus();
        break;
      case 'start':
        await this.startSystem();
        break;
      case 'stop':
        await this.stopSystem();
        break;
      case 'restart':
        await this.restartSystem();
        break;
      case 'logs':
        await this.showLogs();
        break;
      case 'health':
        await this.checkHealth();
        break;
      case 'stats':
        await this.showStats();
        break;
      case 'help':
        this.showHelp();
        break;
      default:
        console.log('❌ Unknown command. Use "help" for available commands.');
        break;
    }
  }

  /**
   * Show system status
   */
  async showStatus() {
    console.log('📊 Autonomous Error System Status');
    console.log('================================');
    
    // Check if system is configured
    const isConfigured = fs.existsSync(this.configPath);
    console.log(`Configuration: ${isConfigured ? '✅ Configured' : '❌ Not configured'}`);
    
    // Check if reports directory exists
    const reportsExist = fs.existsSync(this.reportsDir);
    console.log(`Reports Directory: ${reportsExist ? '✅ Exists' : '❌ Missing'}`);
    
    // Check recent reports
    if (reportsExist) {
      const reports = fs.readdirSync(this.reportsDir);
      const recentReports = reports.filter(r => r.includes('final-report'));
      console.log(`Recent Reports: ${recentReports.length}`);
      
      if (recentReports.length > 0) {
        const latestReport = recentReports.sort().pop();
        const reportPath = path.join(this.reportsDir, latestReport);
        const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
        
        console.log(`Latest Run: ${new Date(report.timestamp).toLocaleString()}`);
        console.log(`Total Errors: ${report.summary.totalErrors}`);
        console.log(`Total Fixes: ${report.summary.totalFixes}`);
        console.log(`Success: ${report.summary.success ? '✅' : '❌'}`);
      }
    }
    
    // Check if processes are running
    try {
      execSync('pgrep -f "autonomous-error"', { stdio: 'pipe' });
      console.log('Processes: ✅ Running');
    } catch (error) {
      console.log('Processes: ❌ Not running');
    }
  }

  /**
   * Start the system
   */
  async startSystem() {
    console.log('🚀 Starting Autonomous Error System...');
    
    try {
      // Check if already running
      try {
        execSync('pgrep -f "autonomous-error"', { stdio: 'pipe' });
        console.log('⚠️  System is already running');
        return;
      } catch (error) {
        // Not running, continue
      }
      
      // Start in background
      const command = 'node scripts/autonomous-error-system.js watch';
      execSync(`nohup ${command} > autonomous-system.log 2>&1 &`, {
        cwd: this.projectRoot,
        stdio: 'pipe'
      });
      
      console.log('✅ System started successfully');
      console.log('📝 Logs: autonomous-system.log');
      
    } catch (error) {
      console.error('❌ Failed to start system:', error.message);
    }
  }

  /**
   * Stop the system
   */
  async stopSystem() {
    console.log('🛑 Stopping Autonomous Error System...');
    
    try {
      execSync('pkill -f "autonomous-error"', { stdio: 'pipe' });
      console.log('✅ System stopped successfully');
    } catch (error) {
      console.log('⚠️  No running processes found');
    }
  }

  /**
   * Restart the system
   */
  async restartSystem() {
    console.log('🔄 Restarting Autonomous Error System...');
    await this.stopSystem();
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
    await this.startSystem();
  }

  /**
   * Show system logs
   */
  async showLogs() {
    console.log('📝 Autonomous Error System Logs');
    console.log('===============================');
    
    const logFile = path.join(this.projectRoot, 'autonomous-system.log');
    
    if (fs.existsSync(logFile)) {
      const logs = fs.readFileSync(logFile, 'utf8');
      const lines = logs.split('\n').slice(-50); // Last 50 lines
      console.log(lines.join('\n'));
    } else {
      console.log('No logs found');
    }
  }

  /**
   * Check system health
   */
  async checkHealth() {
    console.log('🏥 Autonomous Error System Health Check');
    console.log('======================================');
    
    const checks = [
      { name: 'Configuration File', check: () => fs.existsSync(this.configPath) },
      { name: 'Reports Directory', check: () => fs.existsSync(this.reportsDir) },
      { name: 'Error Detector', check: () => fs.existsSync(path.join(this.projectRoot, 'scripts/autonomous-error-detector.js')) },
      { name: 'Error Fixer', check: () => fs.existsSync(path.join(this.projectRoot, 'scripts/autonomous-error-fixer.js')) },
      { name: 'System Script', check: () => fs.existsSync(path.join(this.projectRoot, 'scripts/autonomous-error-system.js')) },
      { name: 'Dependencies', check: () => this.checkDependencies() }
    ];
    
    let allHealthy = true;
    
    for (const check of checks) {
      try {
        const result = await check.check();
        console.log(`${result ? '✅' : '❌'} ${check.name}`);
        if (!result) allHealthy = false;
      } catch (error) {
        console.log(`❌ ${check.name}: ${error.message}`);
        allHealthy = false;
      }
    }
    
    console.log(`\nOverall Health: ${allHealthy ? '✅ Healthy' : '❌ Issues Found'}`);
  }

  /**
   * Check dependencies
   */
  checkDependencies() {
    try {
      const packageJsonPath = path.join(this.projectRoot, 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      
      const requiredDeps = ['prettier', 'eslint'];
      const missingDeps = requiredDeps.filter(dep => 
        !packageJson.devDependencies?.[dep] && !packageJson.dependencies?.[dep]
      );
      
      return missingDeps.length === 0;
    } catch (error) {
      return false;
    }
  }

  /**
   * Show system statistics
   */
  async showStats() {
    console.log('📈 Autonomous Error System Statistics');
    console.log('====================================');
    
    if (!fs.existsSync(this.reportsDir)) {
      console.log('No reports found');
      return;
    }
    
    const reports = fs.readdirSync(this.reportsDir);
    const finalReports = reports.filter(r => r.includes('final-report'));
    
    if (finalReports.length === 0) {
      console.log('No final reports found');
      return;
    }
    
    let totalErrors = 0;
    let totalFixes = 0;
    let successfulRuns = 0;
    const errorTypes = {};
    const severityCounts = {};
    
    for (const reportFile of finalReports) {
      try {
        const reportPath = path.join(this.reportsDir, reportFile);
        const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
        
        totalErrors += report.summary.totalErrors;
        totalFixes += report.summary.totalFixes;
        if (report.summary.success) successfulRuns++;
        
        // Aggregate error types and severities
        if (report.errors) {
          for (const error of report.errors) {
            errorTypes[error.type] = (errorTypes[error.type] || 0) + 1;
            severityCounts[error.severity] = (severityCounts[error.severity] || 0) + 1;
          }
        }
      } catch (error) {
        console.log(`⚠️  Error reading report ${reportFile}: ${error.message}`);
      }
    }
    
    console.log(`Total Reports: ${finalReports.length}`);
    console.log(`Total Errors Found: ${totalErrors}`);
    console.log(`Total Fixes Applied: ${totalFixes}`);
    console.log(`Successful Runs: ${successfulRuns}`);
    console.log(`Success Rate: ${((successfulRuns / finalReports.length) * 100).toFixed(1)}%`);
    
    console.log('\nError Types:');
    for (const [type, count] of Object.entries(errorTypes)) {
      console.log(`  ${type}: ${count}`);
    }
    
    console.log('\nSeverity Distribution:');
    for (const [severity, count] of Object.entries(severityCounts)) {
      console.log(`  ${severity}: ${count}`);
    }
  }

  /**
   * Show help
   */
  showHelp() {
    console.log('🤖 Autonomous Error System Manager');
    console.log('==================================');
    console.log('');
    console.log('Available Commands:');
    console.log('  status    - Show system status');
    console.log('  start     - Start the system');
    console.log('  stop      - Stop the system');
    console.log('  restart   - Restart the system');
    console.log('  logs      - Show system logs');
    console.log('  health    - Check system health');
    console.log('  stats     - Show system statistics');
    console.log('  help      - Show this help');
    console.log('');
    console.log('Usage:');
    console.log('  node scripts/autonomous-system-manager.js <command>');
    console.log('');
    console.log('Examples:');
    console.log('  node scripts/autonomous-system-manager.js status');
    console.log('  node scripts/autonomous-system-manager.js start');
    console.log('  node scripts/autonomous-system-manager.js health');
  }
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const manager = new AutonomousSystemManager();
  manager.manage().catch(console.error);
}

export default AutonomousSystemManager;
