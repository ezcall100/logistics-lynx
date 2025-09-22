#!/usr/bin/env node

/**
 * Webhook Service Test
 * Tests the webhook service integration locally
 */

const https = require('https');
const http = require('http');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Mock webhook service for testing
class MockWebhookService {
  constructor() {
    this.webhookUrl = 'https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook';
    this.timeout = 10000;
  }

  async sendToWebhook(payload) {
    try {
      log(`📡 Sending to webhook: ${this.webhookUrl}`, 'cyan');
      log(`📦 Payload: ${JSON.stringify(payload, null, 2)}`, 'dim');
      
      const response = await this.makeRequest(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      return {
        success: true,
        message: result.message || 'Webhook triggered successfully',
        workflowId: result.workflowId,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      log(`❌ Webhook error: ${error.message}`, 'red');
      return {
        success: false,
        message: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  }

  makeRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
      const isHttps = url.startsWith('https');
      const client = isHttps ? https : http;
      
      const urlObj = new URL(url);
      const requestOptions = {
        hostname: urlObj.hostname,
        port: urlObj.port || (isHttps ? 443 : 80),
        path: urlObj.pathname + urlObj.search,
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Webhook-Service-Test/1.0',
          ...options.headers
        },
        timeout: this.timeout
      };

      const req = client.request(requestOptions, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          resolve({
            ok: res.statusCode >= 200 && res.statusCode < 300,
            status: res.statusCode,
            headers: res.headers,
            json: () => Promise.resolve(JSON.parse(data))
          });
        });
      });

      req.on('error', reject);
      req.on('timeout', () => reject(new Error('Request timeout')));
      
      if (options.body) {
        req.write(options.body);
      }
      req.end();
    });
  }

  async trackUserInteraction(event, data, userId) {
    const payload = {
      event,
      data,
      timestamp: new Date().toISOString(),
      source: 'webhook_service_test',
      userId,
      sessionId: `test-session-${Date.now()}`,
      metadata: {
        test: true,
        source: 'mock_service'
      }
    };

    return await this.sendToWebhook(payload);
  }

  async trackSystemEvent(event, data) {
    const payload = {
      event,
      data,
      timestamp: new Date().toISOString(),
      source: 'system_monitor',
      metadata: {
        test: true,
        source: 'mock_service'
      }
    };

    return await this.sendToWebhook(payload);
  }
}

// Test scenarios
const testScenarios = [
  {
    name: 'Basic Webhook Test',
    test: async (service) => {
      const payload = {
        test: true,
        message: 'Basic webhook test from service',
        timestamp: new Date().toISOString(),
        source: 'webhook_service_test'
      };
      return await service.sendToWebhook(payload);
    }
  },
  {
    name: 'User Interaction Tracking',
    test: async (service) => {
      return await service.trackUserInteraction('button_click', {
        component: 'test_button',
        page: 'webhook_test_page'
      }, 'test-user-123');
    }
  },
  {
    name: 'System Event Tracking',
    test: async (service) => {
      return await service.trackSystemEvent('health_check', {
        status: 'healthy',
        services: ['webhook', 'database', 'api']
      });
    }
  },
  {
    name: 'Autonomous Task Webhook',
    test: async (service) => {
      const payload = {
        test: true,
        task_type: 'autonomous_task',
        agent_type: 'mcp_agent',
        task_name: 'Webhook Service Test',
        description: 'Testing webhook service integration',
        priority: 5,
        workflow_id: 'test-workflow-' + Date.now(),
        execution_id: 'test-execution-' + Date.now(),
        trigger_type: 'service_test',
        goal: 'Verify webhook service functionality',
        prompt: 'Test webhook service with comprehensive payload',
        action: 'Webhook service test execution',
        confidence: 0.95,
        success: true,
        metadata: {
          test_suite: 'webhook_service',
          version: '1.0.0',
          environment: 'test'
        },
        timestamp: new Date().toISOString()
      };
      return await service.sendToWebhook(payload);
    }
  }
];

// Run tests
async function runWebhookServiceTests() {
  log('🚀 Starting Webhook Service Tests', 'bold');
  log('='.repeat(50), 'cyan');
  
  const service = new MockWebhookService();
  const results = [];
  
  for (const scenario of testScenarios) {
    log(`\n🧪 Testing: ${scenario.name}`, 'blue');
    log('-'.repeat(scenario.name.length + 10), 'dim');
    
    try {
      const result = await scenario.test(service);
      results.push({
        scenario: scenario.name,
        success: result.success,
        message: result.message,
        timestamp: result.timestamp
      });
      
      if (result.success) {
        log(`✅ ${scenario.name}: SUCCESS`, 'green');
        log(`   Message: ${result.message}`, 'cyan');
      } else {
        log(`❌ ${scenario.name}: FAILED`, 'red');
        log(`   Error: ${result.message}`, 'yellow');
      }
    } catch (error) {
      log(`💥 ${scenario.name}: ERROR`, 'red');
      log(`   Error: ${error.message}`, 'yellow');
      results.push({
        scenario: scenario.name,
        success: false,
        error: error.message
      });
    }
    
    // Small delay between tests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Generate summary
  log('\n📊 Test Summary', 'bold');
  log('='.repeat(50), 'cyan');
  
  const totalTests = results.length;
  const passedTests = results.filter(r => r.success).length;
  const failedTests = totalTests - passedTests;
  
  log(`\nOverall Results: ${passedTests}/${totalTests} tests passed`, 
      passedTests === totalTests ? 'green' : 'yellow');
  
  for (const result of results) {
    const status = result.success ? '✅' : '❌';
    const color = result.success ? 'green' : 'red';
    log(`  ${status} ${result.scenario}`, color);
    if (!result.success && result.error) {
      log(`    Error: ${result.error}`, 'yellow');
    }
  }
  
  if (failedTests > 0) {
    log('\n💡 Recommendations:', 'yellow');
    log('  1. Check if N8N webhook is properly configured', 'cyan');
    log('  2. Verify webhook URL is correct', 'cyan');
    log('  3. Check N8N workflow is active', 'cyan');
    log('  4. Test with a simple webhook.site endpoint first', 'cyan');
  } else {
    log('\n🎉 All webhook service tests passed!', 'green');
  }
  
  return {
    totalTests,
    passedTests,
    failedTests,
    results
  };
}

// Run the tests
if (require.main === module) {
  runWebhookServiceTests()
    .then(report => {
      process.exit(report.passedTests === report.totalTests ? 0 : 1);
    })
    .catch(error => {
      log(`\n💥 Fatal error: ${error.message}`, 'red');
      process.exit(1);
    });
}

module.exports = {
  MockWebhookService,
  runWebhookServiceTests
};
