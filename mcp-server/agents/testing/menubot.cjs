const { MCPAgent } = require('../base/mcp-agent-base.cjs');

class MenuBot extends MCPAgent {
  constructor() {
    super({
      name: 'MenuBot',
      role: 'Sidebar Menu Tester',
      id: 'menubot-007',
      group: 'Core UI Testing',
      description: 'Menus, sub-menus, sub-sub menu navigation',
      port: 3001,
      endpoints: ['/api/menus/navigation'],
      capabilities: ['menu_testing', 'navigation_validation']
    });
  }
}

module.exports = MenuBot;