const { MCPAgent } = require('../base/mcp-agent-base.cjs');

class FormBot extends MCPAgent {
  constructor() {
    super({
      name: 'FormBot',
      role: 'Form Validator',
      id: 'formbot-004',
      group: 'Core UI Testing',
      description: 'Tests field validations, errors, and submissions',
      port: 3001,
      endpoints: ['/api/forms/validate'],
      capabilities: ['form_validation', 'error_testing']
    });
  }
}

module.exports = FormBot;