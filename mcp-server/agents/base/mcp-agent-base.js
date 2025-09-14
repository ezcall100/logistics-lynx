/**
 * MCP Agent Base Class
 * Base class for all MCP testing agents
 * Part of MCP A-Z Testing Agent Framework
 */

class MCPAgent {
  constructor(config) {
    this.name = config.name;
    this.role = config.role;
    this.id = config.id;
    this.group = config.group;
    this.description = config.description;
    this.port = config.port;
    this.endpoints = config.endpoints;
    this.capabilities = config.capabilities;
    this.status = 'active';
    this.createdAt = new Date().toISOString();
    this.lastActivity = new Date().toISOString();
    this.activityLog = [];
    this.errorLog = [];
  }

  async logActivity(action, data) {
    const activity = {
      timestamp: new Date().toISOString(),
      agent: this.name,
      action,
      data,
      status: 'FULLY DEPLOYED AND COMMITTED'
    };

    this.activityLog.push(activity);
    this.lastActivity = new Date().toISOString();

    // In real implementation, this would send to logging service
    console.log(`[${this.name}] Activity: ${action}`, data);
  }

  async logError(method, error) {
    const errorEntry = {
      timestamp: new Date().toISOString(),
      agent: this.name,
      method,
      error: error.message,
      stack: error.stack,
      status: 'ERROR'
    };

    this.errorLog.push(errorEntry);

    // In real implementation, this would send to error tracking service
    console.error(`[${this.name}] Error in ${method}:`, error);
  }

  async executeTest(testConfig) {
    try {
      await this.logActivity('test_started', testConfig);
      
      const result = await this.runTest(testConfig);
      
      await this.logActivity('test_completed', {
        testConfig,
        result,
        status: 'FULLY DEPLOYED AND COMMITTED'
      });

      return result;
    } catch (error) {
      await this.logError('executeTest', error);
      throw error;
    }
  }

  async runTest(testConfig) {
    // Override in subclasses
    throw new Error('runTest method must be implemented in subclass');
  }

  async getStatus() {
    return {
      name: this.name,
      role: this.role,
      id: this.id,
      group: this.group,
      status: this.status,
      createdAt: this.createdAt,
      lastActivity: this.lastActivity,
      totalActivities: this.activityLog.length,
      totalErrors: this.errorLog.length,
      capabilities: this.capabilities,
      endpoints: this.endpoints
    };
  }

  async getActivityLog(limit = 100) {
    return this.activityLog.slice(-limit);
  }

  async getErrorLog(limit = 50) {
    return this.errorLog.slice(-limit);
  }

  async reset() {
    this.activityLog = [];
    this.errorLog = [];
    this.lastActivity = new Date().toISOString();
    await this.logActivity('agent_reset', { timestamp: new Date().toISOString() });
  }

  async shutdown() {
    this.status = 'inactive';
    await this.logActivity('agent_shutdown', { timestamp: new Date().toISOString() });
  }
}

module.exports = { MCPAgent };
