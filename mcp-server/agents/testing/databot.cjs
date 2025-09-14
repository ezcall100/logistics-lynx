const { MCPAgent } = require('../base/mcp-agent-base.cjs');

class DataBot extends MCPAgent {
  constructor() {
    super({
      name: 'DataBot',
      role: 'Test Data Manager',
      id: 'databot-003',
      group: 'Planning & Setup',
      description: 'Creates mock data for tables & APIs',
      port: 3001,
      endpoints: ['/api/data/mock'],
      capabilities: ['data_generation', 'mock_creation']
    });
  }
}

module.exports = DataBot;
