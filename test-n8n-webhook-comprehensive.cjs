#!/usr/bin/env node

/**
 * Comprehensive N8N Webhook Test Suite
 * Tests all webhook endpoints and integration scenarios
 */

require('dotenv').config();
const https = require('https');
const http = require('http');

// Configuration
const config = {
  webhookUrls: [
    {
      name: 'N8N Cloud Webhook (Main)',
      url: 'https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook',
      type: 'n8n_cloud'
    },
    {
      name: 'N8N Cloud Webhook (Root)',
      url: 'https://pixx100.app.n8n.cloud/webhook-test/',
      type: 'n8n_cloud'
    },
    {
      name: 'Supabase Edge Function',
      url: 'https://imcyiofodlnbomemvqto.supabase.co/functions/v1/n8n-webhook',
      type: 'supabase'
    }
  ],
  timeout: 15000,
  retryAttempts: 3
};

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m'
};

// Utility functions
function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logHeader(title) {
  log('\n' + '='.repeat(60), 'cyan');
  log(`  ${title}`, 'bold');
  log('='.repeat(60), 'cyan');
}

function logSubHeader(title) {
  log(`\n${title}`, 'blue');
  log('-'.repeat(title.length), 'dim');
}

// Test payloads
const testPayloads = {
  basic: {
    test: true,
    message: 'Basic webhook test',
    timestamp: new Date().toISOString(),
    source: 'webhook_test_suite'
  },
  
  autonomous_task: {
    test: true,
    task_type: 'autonomous_task',
    agent_type: 'mcp_agent',
    task_name: 'Webhook Integration Test',
    description: 'Testing webhook connectivity and data processing',
    priority: 5,
    workflow_id: 'test-workflow-' + Date.now(),
    execution_id: 'test-execution-' + Date.now(),
    trigger_type: 'manual_test',
    goal: 'Verify webhook functionality',
    prompt: 'Test webhook with comprehensive payload',
    action: 'Webhook test execution',
    confidence: 0.95,
    success: true,
    metadata: {
      test_suite: 'comprehensive',
      version: '1.0.0',
      environment: 'test'
    },
    timestamp: new Date().toISOString()
  },
  
  user_interaction: {
    test: true,
    event: 'user_interaction',
    data: {
      action: 'button_click',
      component: 'test_button',
      page: 'webhook_test_page'
    },
    timestamp: new Date().toISOString(),
    source: 'webhook_test_suite',
    userId: 'test-user-123',
    sessionId: 'test-session-' + Date.now(),
    metadata: {
      userAgent: 'TestSuite/1.0',
      ip: '127.0.0.1'
    }
  },
  
  system_event: {
    test: true,
    event: 'system_event',
    data: {
      type: 'health_check',
      status: 'healthy',
      services: ['webhook', 'database', 'api']
    },
    timestamp: new Date().toISOString(),
    source: 'system_monitor',
    metadata: {
      version: '1.0.0',
      uptime: 3600
    }
  }
};

// HTTP request function
function makeRequest(url, options = {}) {
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
        'User-Agent': 'N8N-Webhook-Test-Suite/1.0',
        ...options.headers
      },
      timeout: config.timeout
    };

    const req = client.request(requestOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          data: data,
          success: res.statusCode >= 200 && res.statusCode < 300
        });
      });
    });

    req.on('error', (err) => {
      resolve({
        status: 'ERROR',
        error: err.message,
        success: false
      });
    });

    req.on('timeout', () => {
      resolve({
        status: 'TIMEOUT',
        error: 'Request timeout',
        success: false
      });
    });

    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

// Test individual webhook endpoint
async function testWebhookEndpoint(webhookConfig, payload, payloadName) {
  log(`  📡 Testing ${payloadName} payload...`, 'cyan');
  
  const result = await makeRequest(webhookConfig.url, {
    method: 'POST',
    body: JSON.stringify(payload)
  });

  const status = result.success ? '✅' : '❌';
  const statusColor = result.success ? 'green' : 'red';
  
  log(`    ${status} Status: ${result.status}`, statusColor);
  
  if (result.data && result.data.length > 0) {
    try {
      const responseData = JSON.parse(result.data);
      log(`    📄 Response: ${JSON.stringify(responseData, null, 2).substring(0, 200)}...`, 'dim');
    } catch (e) {
      log(`    📄 Response: ${result.data.substring(0, 200)}...`, 'dim');
    }
  }
  
  if (result.error) {
    log(`    ⚠️ Error: ${result.error}`, 'yellow');
  }

  return {
    webhook: webhookConfig.name,
    payload: payloadName,
    success: result.success,
    status: result.status,
    response: result.data,
    error: result.error
  };
}

// Test all payloads for a webhook endpoint
async function testWebhookEndpointComprehensive(webhookConfig) {
  logSubHeader(`Testing ${webhookConfig.name}`);
  log(`URL: ${webhookConfig.url}`, 'dim');
  
  const results = [];
  
  for (const [payloadName, payload] of Object.entries(testPayloads)) {
    const result = await testWebhookEndpoint(webhookConfig, payload, payloadName);
    results.push(result);
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  return results;
}

// Test webhook service integration
async function testWebhookServiceIntegration() {
  logSubHeader('Testing Webhook Service Integration');
  
  try {
    // Test if webhook service can be imported (if it exists)
    const webhookServicePath = './src/services/webhookService.ts';
    log(`  📦 Checking webhook service at: ${webhookServicePath}`, 'cyan');
    
    // This would require a TypeScript runner or compilation
    log(`  ⚠️ Webhook service integration test requires TypeScript compilation`, 'yellow');
    log(`  💡 Consider running: npm run build && node dist/test-webhook-service.js`, 'cyan');
    
    return {
      success: false,
      message: 'Webhook service test requires TypeScript compilation'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

// Test CORS and OPTIONS requests
async function testCORS(webhookConfig) {
  logSubHeader(`Testing CORS for ${webhookConfig.name}`);
  
  const result = await makeRequest(webhookConfig.url, {
    method: 'OPTIONS',
    headers: {
      'Origin': 'http://localhost:3000',
      'Access-Control-Request-Method': 'POST',
      'Access-Control-Request-Headers': 'Content-Type'
    }
  });

  const status = result.success ? '✅' : '❌';
  const statusColor = result.success ? 'green' : 'red';
  
  log(`  ${status} CORS OPTIONS: ${result.status}`, statusColor);
  
  if (result.headers['access-control-allow-origin']) {
    log(`  🌐 CORS Origin: ${result.headers['access-control-allow-origin']}`, 'cyan');
  }
  
  return {
    webhook: webhookConfig.name,
    success: result.success,
    status: result.status,
    corsHeaders: result.headers
  };
}

// Generate comprehensive test report
function generateTestReport(allResults) {
  logHeader('Test Results Summary');
  
  const webhookResults = {};
  let totalTests = 0;
  let passedTests = 0;
  
  // Process results by webhook
  allResults.forEach(result => {
    if (!webhookResults[result.webhook]) {
      webhookResults[result.webhook] = {
        total: 0,
        passed: 0,
        payloads: {}
      };
    }
    
    webhookResults[result.webhook].total++;
    webhookResults[result.webhook].payloads[result.payload] = result.success;
    
    if (result.success) {
      webhookResults[result.webhook].passed++;
      passedTests++;
    }
    
    totalTests++;
  });
  
  // Display results by webhook
  for (const [webhookName, results] of Object.entries(webhookResults)) {
    log(`\n${webhookName}:`, 'bold');
    log(`  Overall: ${results.passed}/${results.total} tests passed`, 
        results.passed === results.total ? 'green' : 'yellow');
    
    for (const [payload, success] of Object.entries(results.payloads)) {
      const status = success ? '✅' : '❌';
      const color = success ? 'green' : 'red';
      log(`    ${status} ${payload}`, color);
    }
  }
  
  // Overall summary
  log(`\nOverall Results: ${passedTests}/${totalTests} tests passed`, 
      passedTests === totalTests ? 'green' : 'yellow');
  
  if (passedTests === totalTests) {
    log('\n🎉 All webhook tests passed!', 'green');
  } else {
    log('\n⚠️ Some tests failed. Check the detailed output above.', 'yellow');
  }
  
  return {
    totalTests,
    passedTests,
    webhookResults
  };
}

// Main test execution
async function runComprehensiveTests() {
  logHeader('N8N Webhook Comprehensive Test Suite');
  log(`Starting tests at: ${new Date().toISOString()}`, 'dim');
  
  const allResults = [];
  
  // Test each webhook endpoint
  for (const webhookConfig of config.webhookUrls) {
    try {
      const results = await testWebhookEndpointComprehensive(webhookConfig);
      allResults.push(...results);
      
      // Test CORS for each endpoint
      const corsResult = await testCORS(webhookConfig);
      allResults.push(corsResult);
      
    } catch (error) {
      log(`❌ Error testing ${webhookConfig.name}: ${error.message}`, 'red');
    }
  }
  
  // Test webhook service integration
  const serviceResult = await testWebhookServiceIntegration();
  if (serviceResult) {
    allResults.push({
      webhook: 'Webhook Service',
      payload: 'integration',
      success: serviceResult.success,
      error: serviceResult.error || serviceResult.message
    });
  }
  
  // Generate and display report
  const report = generateTestReport(allResults);
  
  logHeader('Test Complete');
  log(`Completed at: ${new Date().toISOString()}`, 'dim');
  
  return report;
}

// Run the tests
if (require.main === module) {
  runComprehensiveTests()
    .then(report => {
      process.exit(report.passedTests === report.totalTests ? 0 : 1);
    })
    .catch(error => {
      log(`\n💥 Fatal error: ${error.message}`, 'red');
      process.exit(1);
    });
}

module.exports = {
  runComprehensiveTests,
  testWebhookEndpoint,
  testWebhookEndpointComprehensive,
  testCORS,
  generateTestReport
};
