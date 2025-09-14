const { MCPAgent } = require('../base/mcp-agent-base.cjs');

class ButtonBot extends MCPAgent {
  constructor() {
    super({
      name: 'ButtonBot',
      role: 'CRUD Action Tester',
      id: 'buttonbot-006',
      group: 'Core UI Testing',
      description: 'Add, Edit, Delete, View, state changes',
      port: 3001,
      endpoints: ['/api/buttons/crud'],
      capabilities: ['crud_testing', 'button_validation']
    });
  }
}

module.exports = ButtonBot;