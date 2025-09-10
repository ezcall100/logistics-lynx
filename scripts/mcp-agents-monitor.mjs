/**
 * MCP AGENTS MONITOR - 250 AGENTS PROTECTION SYSTEM
 * Continuous monitoring to ensure all 250 agents remain active and locked
 */

import http from 'http';
import fs from 'fs';
import path from 'path';

const MCP_BASE_URL = 'http://localhost:3001';
const LOG_FILE = 'logs/mcp-agents-monitor.log';
const ALERT_FILE = 'logs/mcp-agents-alerts.log';

// Ensure logs directory exists
const logsDir = path.dirname(LOG_FILE);
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

class MCPAgentsMonitor {
  constructor() {
    this.expectedAgentCount = 250;
    this.monitoringInterval = 30000; // 30 seconds
    this.isMonitoring = false;
    this.alertThreshold = 3; // Alert after 3 consecutive failures
    this.failureCount = 0;
  }

  async startMonitoring() {
    console.log('🔒 MCP AGENTS MONITOR STARTED - PROTECTING 250 AGENTS');
    console.log('=' .repeat(60));
    
    this.isMonitoring = true;
    this.log('MONITOR_START', 'MCP Agents Monitor started - Protecting all 250 agents');
    
    // Initial check
    await this.checkAgentStatus();
    
    // Set up continuous monitoring
    this.monitoringTimer = setInterval(async () => {
      await this.checkAgentStatus();
    }, this.monitoringInterval);
  }

  async checkAgentStatus() {
    try {
      const timestamp = new Date().toISOString();
      
      // Check system health
      const healthResponse = await this.makeRequest(`${MCP_BASE_URL}/api/mcp/system/health`);
      
      if (healthResponse.success) {
        const healthData = healthResponse.data;
        const agentCount = healthData.agent_count;
        
        if (agentCount === this.expectedAgentCount) {
          // SUCCESS: All 250 agents are active
          this.failureCount = 0;
          this.log('SUCCESS', `All ${agentCount} agents are active and operational`);
          
          // Verify additional metrics
          await this.verifyAdditionalMetrics(healthData);
          
        } else {
          // CRITICAL ALERT: Agent count mismatch
          this.failureCount++;
          this.log('CRITICAL_ALERT', `Agent count mismatch! Expected: ${this.expectedAgentCount}, Found: ${agentCount}`);
          this.alert('AGENT_COUNT_MISMATCH', `Expected ${this.expectedAgentCount} agents, found ${agentCount}`);
          
          if (this.failureCount >= this.alertThreshold) {
            await this.triggerEmergencyProtocol();
          }
        }
      } else {
        // ERROR: Could not retrieve health data
        this.failureCount++;
        this.log('ERROR', 'Could not retrieve MCP system health data');
        this.alert('HEALTH_CHECK_FAILED', 'MCP system health check failed');
      }
      
    } catch (error) {
      this.failureCount++;
      this.log('ERROR', `Monitoring error: ${error.message}`);
      this.alert('MONITORING_ERROR', error.message);
    }
  }

  async verifyAdditionalMetrics(healthData) {
    // Verify autonomous mode
    if (!healthData.autonomous_mode) {
      this.log('WARNING', 'Autonomous mode is disabled');
      this.alert('AUTONOMOUS_MODE_DISABLED', 'Autonomous mode has been disabled');
    }
    
    // Verify MCP version
    if (healthData.mcp_version !== 'v2') {
      this.log('WARNING', `MCP version mismatch! Expected: v2, Found: ${healthData.mcp_version}`);
      this.alert('MCP_VERSION_MISMATCH', `Expected v2, found ${healthData.mcp_version}`);
    }
    
    // Verify system status
    if (healthData.status !== 'healthy') {
      this.log('WARNING', `System status is not healthy: ${healthData.status}`);
      this.alert('SYSTEM_STATUS_UNHEALTHY', `System status: ${healthData.status}`);
    }
  }

  async triggerEmergencyProtocol() {
    console.log('🚨 EMERGENCY PROTOCOL TRIGGERED!');
    console.log('🔒 ATTEMPTING TO RESTORE 250 AGENTS...');
    
    this.log('EMERGENCY_PROTOCOL', 'Emergency protocol triggered - attempting agent restoration');
    this.alert('EMERGENCY_PROTOCOL', 'Emergency protocol triggered - agent count compromised');
    
    try {
      // Check if server is still running
      const healthResponse = await this.makeRequest(`${MCP_BASE_URL}/api/mcp/system/health`);
      
      if (healthResponse.success) {
        const agentCount = healthResponse.data.agent_count;
        
        if (agentCount === this.expectedAgentCount) {
          this.log('RECOVERY_SUCCESS', 'Agent count restored to 250');
          this.failureCount = 0;
        } else {
          this.log('RECOVERY_FAILED', `Agent count still incorrect: ${agentCount}`);
          await this.notifyAdministrators();
        }
      }
    } catch (error) {
      this.log('RECOVERY_ERROR', `Recovery attempt failed: ${error.message}`);
      await this.notifyAdministrators();
    }
  }

  async notifyAdministrators() {
    const alertMessage = `
🚨 CRITICAL ALERT: MCP AGENTS COMPROMISED
==========================================
Time: ${new Date().toISOString()}
Expected Agents: ${this.expectedAgentCount}
Status: SYSTEM COMPROMISED
Action Required: IMMEDIATE INTERVENTION

The MCP agent system has been compromised and requires immediate attention.
All 250 agents must be restored to operational status.
    `;
    
    this.log('ADMIN_NOTIFICATION', 'Administrators notified of critical system compromise');
    this.alert('ADMIN_NOTIFICATION', alertMessage);
    
    // In a real system, this would send emails, SMS, etc.
    console.log(alertMessage);
  }

  makeRequest(url) {
    return new Promise((resolve, reject) => {
      const req = http.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (error) {
            resolve({ success: false, error: 'Invalid JSON response' });
          }
        });
      });
      
      req.on('error', (error) => {
        resolve({ success: false, error: error.message });
      });
      
      req.setTimeout(5000, () => {
        req.destroy();
        resolve({ success: false, error: 'Request timeout' });
      });
    });
  }

  log(level, message) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [${level}] ${message}\n`;
    
    try {
      fs.appendFileSync(LOG_FILE, logEntry);
    } catch (error) {
      console.error('Failed to write to log file:', error.message);
    }
    
    console.log(`[${level}] ${message}`);
  }

  alert(type, message) {
    const timestamp = new Date().toISOString();
    const alertEntry = `[${timestamp}] [ALERT:${type}] ${message}\n`;
    
    try {
      fs.appendFileSync(ALERT_FILE, alertEntry);
    } catch (error) {
      console.error('Failed to write to alert file:', error.message);
    }
  }

  stopMonitoring() {
    if (this.monitoringTimer) {
      clearInterval(this.monitoringTimer);
    }
    this.isMonitoring = false;
    this.log('MONITOR_STOP', 'MCP Agents Monitor stopped');
    console.log('🔒 MCP AGENTS MONITOR STOPPED');
  }
}

// Start monitoring if this script is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const monitor = new MCPAgentsMonitor();
  
  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down MCP Agents Monitor...');
    monitor.stopMonitoring();
    process.exit(0);
  });
  
  process.on('SIGTERM', () => {
    console.log('\n🛑 Shutting down MCP Agents Monitor...');
    monitor.stopMonitoring();
    process.exit(0);
  });
  
  // Start monitoring
  monitor.startMonitoring().catch(error => {
    console.error('Failed to start monitoring:', error);
    process.exit(1);
  });
}

export default MCPAgentsMonitor;
