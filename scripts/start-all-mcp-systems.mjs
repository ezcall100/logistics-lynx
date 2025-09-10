#!/usr/bin/env node

/**
 * 🚀 START ALL MCP SYSTEMS
 * 
 * Launches all 250 agents and supporting systems
 * - 24/7 Autonomous System
 * - Zero-Downtime Deployment
 * - Master Control Panel
 * - Agent Supervisor
 * - Notification System
 */

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

class MCPSystemLauncher {
  constructor() {
    this.systems = new Map();
    this.isRunning = false;
    this.startTime = new Date();
  }

  /**
   * Initialize all MCP systems
   */
  initializeSystems() {
    console.log('🚀 INITIALIZING ALL MCP SYSTEMS...');
    console.log('==================================');
    console.log(`📅 Started: ${this.startTime.toLocaleString()}`);
    console.log(`🎯 Mission: Launch all 250 agents autonomously`);
    console.log('');

    // Define all systems to launch
    this.systemConfigs = [
      {
        id: 'autonomous-system',
        name: '24/7 Autonomous System',
        script: 'scripts/mcp-24-7-autonomous-system.mjs',
        description: 'Runs all 250 agents continuously without human intervention',
        priority: 'CRITICAL'
      },
      {
        id: 'zero-downtime-deployment',
        name: 'Zero-Downtime Deployment',
        script: 'scripts/mcp-zero-downtime-deployment.mjs',
        description: 'Ensures continuous operation with rolling deployments',
        priority: 'HIGH'
      },
      {
        id: 'master-control-panel',
        name: 'Master Control Panel',
        script: 'scripts/mcp-master-control-panel.mjs',
        description: 'Central command center for all agents',
        priority: 'CRITICAL'
      },
      {
        id: 'agent-supervisor',
        name: 'Agent Supervisor (#250)',
        script: 'scripts/mcp-agent-supervisor.mjs',
        description: 'Monitors all 249 other agents and sends corrections',
        priority: 'HIGH'
      },
      {
        id: 'notification-system',
        name: 'Notification System',
        script: 'scripts/mcp-agent-notification-system.mjs',
        description: 'Broadcasts alerts and corrections to all agents',
        priority: 'MEDIUM'
      }
    ];

    console.log(`✅ Initialized ${this.systemConfigs.length} MCP systems`);
    console.log('🎛️ All systems ready for launch');
    console.log('');
  }

  /**
   * Start all MCP systems
   */
  startAllSystems() {
    console.log('🚀 LAUNCHING ALL MCP SYSTEMS...');
    console.log('===============================');
    console.log(`📅 Launch Time: ${new Date().toLocaleString()}`);
    console.log(`🎯 Total Systems: ${this.systemConfigs.length}`);
    console.log('');

    this.isRunning = true;

    // Launch each system
    this.systemConfigs.forEach((config, index) => {
      setTimeout(() => {
        this.launchSystem(config);
      }, index * 2000); // Launch each system 2 seconds apart
    });

    // Start monitoring
    this.startMonitoring();
  }

  /**
   * Launch individual system
   */
  launchSystem(config) {
    console.log(`🚀 LAUNCHING: ${config.name}`);
    console.log(`   Priority: ${config.priority}`);
    console.log(`   Description: ${config.description}`);
    console.log(`   Script: ${config.script}`);
    console.log('');

    try {
      // Check if script exists
      if (!fs.existsSync(config.script)) {
        console.log(`❌ Script not found: ${config.script}`);
        return;
      }

      // Launch the system
      const process = spawn('node', [config.script], {
        stdio: 'pipe',
        detached: false
      });

      // Store process reference
      this.systems.set(config.id, {
        config,
        process,
        startTime: new Date(),
        status: 'running',
        output: []
      });

      // Handle process output
      process.stdout.on('data', (data) => {
        const output = data.toString();
        const system = this.systems.get(config.id);
        if (system) {
          system.output.push(output);
        }
      });

      // Handle process errors
      process.stderr.on('data', (data) => {
        console.log(`❌ ${config.name} Error: ${data.toString()}`);
      });

      // Handle process exit
      process.on('exit', (code) => {
        const system = this.systems.get(config.id);
        if (system) {
          system.status = 'stopped';
          system.endTime = new Date();
        }
        console.log(`🛑 ${config.name} stopped with code: ${code}`);
      });

      console.log(`✅ ${config.name} launched successfully`);
      console.log('');

    } catch (error) {
      console.log(`❌ Failed to launch ${config.name}: ${error.message}`);
    }
  }

  /**
   * Start monitoring all systems
   */
  startMonitoring() {
    console.log('📊 STARTING SYSTEM MONITORING...');
    console.log('=================================');
    console.log('');

    // Monitor every 10 seconds
    setInterval(() => {
      this.displaySystemStatus();
    }, 10000);
  }

  /**
   * Display system status
   */
  displaySystemStatus() {
    console.clear();
    console.log('🚀 MCP SYSTEMS STATUS DASHBOARD');
    console.log('===============================');
    console.log(`📅 Current Time: ${new Date().toLocaleString()}`);
    console.log(`⏰ Systems Running Since: ${this.startTime.toLocaleString()}`);
    console.log(`🎯 Total Systems: ${this.systems.size}`);
    console.log('');

    // System status
    const runningSystems = Array.from(this.systems.values()).filter(s => s.status === 'running').length;
    const stoppedSystems = Array.from(this.systems.values()).filter(s => s.status === 'stopped').length;

    console.log('📊 SYSTEM STATUS:');
    console.log(`  ✅ Running: ${runningSystems}`);
    console.log(`  🛑 Stopped: ${stoppedSystems}`);
    console.log('');

    // Individual system status
    console.log('🎛️ INDIVIDUAL SYSTEM STATUS:');
    this.systems.forEach((system, systemId) => {
      const emoji = system.status === 'running' ? '🟢' : '🔴';
      const uptime = system.status === 'running' ? 
        Math.floor((Date.now() - system.startTime.getTime()) / 1000) : 0;
      
      console.log(`  ${emoji} ${system.config.name}: ${system.status.toUpperCase()}`);
      console.log(`     Priority: ${system.config.priority}`);
      console.log(`     Uptime: ${uptime}s`);
      console.log(`     Output Lines: ${system.output.length}`);
      console.log('');
    });

    // System health summary
    const healthScore = (runningSystems / this.systems.size) * 100;
    console.log('🏥 SYSTEM HEALTH SUMMARY:');
    console.log(`  📈 Overall Health: ${healthScore.toFixed(1)}%`);
    console.log(`  🎯 Systems Operational: ${runningSystems}/${this.systems.size}`);
    console.log('');

    // Recent activity
    console.log('📡 RECENT ACTIVITY:');
    this.systems.forEach((system, systemId) => {
      if (system.output.length > 0) {
        const recentOutput = system.output.slice(-2); // Last 2 lines
        recentOutput.forEach(output => {
          console.log(`  ${system.config.name}: ${output.trim()}`);
        });
      }
    });
    console.log('');

    console.log('Press Ctrl+C to stop all systems...');
  }

  /**
   * Stop all systems
   */
  stopAllSystems() {
    console.log('\n🛑 STOPPING ALL MCP SYSTEMS...');
    console.log('==============================');

    this.systems.forEach((system, systemId) => {
      if (system.status === 'running') {
        console.log(`🛑 Stopping ${system.config.name}...`);
        system.process.kill();
        system.status = 'stopped';
        system.endTime = new Date();
      }
    });

    this.isRunning = false;
    console.log('✅ All MCP systems stopped.');
  }

  /**
   * Generate launch report
   */
  generateLaunchReport() {
    const report = {
      launchTime: this.startTime.toISOString(),
      endTime: new Date().toISOString(),
      totalSystems: this.systems.size,
      systemStatus: Array.from(this.systems.values()).map(system => ({
        id: system.config.id,
        name: system.config.name,
        priority: system.config.priority,
        status: system.status,
        startTime: system.startTime.toISOString(),
        endTime: system.endTime ? system.endTime.toISOString() : null,
        outputLines: system.output.length
      })),
      summary: {
        runningSystems: Array.from(this.systems.values()).filter(s => s.status === 'running').length,
        stoppedSystems: Array.from(this.systems.values()).filter(s => s.status === 'stopped').length,
        totalUptime: Date.now() - this.startTime.getTime()
      }
    };

    fs.writeFileSync('mcp-systems-launch-report.json', JSON.stringify(report, null, 2));
    console.log('📄 Systems launch report saved to: mcp-systems-launch-report.json');
  }
}

// Main execution
async function main() {
  const launcher = new MCPSystemLauncher();
  
  // Handle Ctrl+C gracefully
  process.on('SIGINT', () => {
    console.log('\n🛑 Stopping all MCP systems...');
    launcher.stopAllSystems();
    launcher.generateLaunchReport();
    process.exit(0);
  });
  
  try {
    launcher.initializeSystems();
    launcher.startAllSystems();
  } catch (error) {
    console.error('❌ System Launcher Error:', error.message);
    process.exit(1);
  }
}

// Run the system launcher
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { MCPSystemLauncher };
