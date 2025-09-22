#!/usr/bin/env node

/**
 * Focused N8N Webhook Test
 * Tests the N8N webhook with different payload types to understand what works
 */

const https = require('https');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logHeader(title) {
  log('\n' + '='.repeat(60), 'cyan');
  log(`  ${title}`, 'bold');
  log('='.repeat(60), 'cyan');
}

// N8N webhook URL
const n8nWebhookUrl = 'https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook';

// Test different payload types
const testPayloads = {
  minimal: {
    test: true
  },
  
  basic: {
    test: true,
    message: 'Basic webhook test',
    timestamp: new Date().toISOString(),
    source: 'webhook_test_suite'
  },
  
  simple_task: {
    task_type: 'test_task',
    task_name: 'Simple Test Task',
    timestamp: new Date().toISOString()
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
    const urlObj = new URL(url);
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || 443,
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'N8N-Focused-Test/1.0',
        ...options.headers
      },
      timeout: 10000
    };

    const req = https.request(requestOptions, (res) => {
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

// Test individual payload
async function testPayload(payloadName, payload) {
  log(`\n🧪 Testing ${payloadName} payload:`, 'blue');
  log(`   Size: ${JSON.stringify(payload).length} bytes`, 'dim');
  log(`   Fields: ${Object.keys(payload).join(', ')}`, 'dim');
  
  const result = await makeRequest(n8nWebhookUrl, {
    method: 'POST',
    body: JSON.stringify(payload)
  });

  const status = result.success ? '✅' : '❌';
  const statusColor = result.success ? 'green' : 'red';
  
  log(`   ${status} Status: ${result.status}`, statusColor);
  
  if (result.data && result.data.length > 0) {
    try {
      const responseData = JSON.parse(result.data);
      log(`   📄 Response: ${JSON.stringify(responseData, null, 2)}`, 'dim');
    } catch (e) {
      log(`   📄 Response: ${result.data}`, 'dim');
    }
  }
  
  if (result.error) {
    log(`   ⚠️ Error: ${result.error}`, 'yellow');
  }

  return {
    payload: payloadName,
    success: result.success,
    status: result.status,
    response: result.data,
    error: result.error,
    payloadSize: JSON.stringify(payload).length,
    fieldCount: Object.keys(payload).length
  };
}

// Test CORS
async function testCORS() {
  log(`\n🌐 Testing CORS for N8N webhook:`, 'blue');
  
  const result = await makeRequest(n8nWebhookUrl, {
    method: 'OPTIONS',
    headers: {
      'Origin': 'http://localhost:3000',
      'Access-Control-Request-Method': 'POST',
      'Access-Control-Request-Headers': 'Content-Type'
    }
  });

  const status = result.success ? '✅' : '❌';
  const statusColor = result.success ? 'green' : 'red';
  
  log(`   ${status} CORS OPTIONS: ${result.status}`, statusColor);
  
  if (result.headers['access-control-allow-origin']) {
    log(`   🌐 CORS Origin: ${result.headers['access-control-allow-origin']}`, 'cyan');
  }
  
  return result;
}

// Main test execution
async function runFocusedTest() {
  logHeader('Focused N8N Webhook Test');
  log(`Testing: ${n8nWebhookUrl}`, 'dim');
  log(`Started at: ${new Date().toISOString()}`, 'dim');
  
  const results = [];
  
  // Test each payload type
  for (const [payloadName, payload] of Object.entries(testPayloads)) {
    const result = await testPayload(payloadName, payload);
    results.push(result);
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  // Test CORS
  const corsResult = await testCORS();
  
  // Generate analysis
  logHeader('Test Analysis');
  
  const successfulPayloads = results.filter(r => r.success);
  const failedPayloads = results.filter(r => !r.success);
  
  log(`\n📊 Results Summary:`, 'bold');
  log(`   ✅ Successful: ${successfulPayloads.length}/${results.length}`, 'green');
  log(`   ❌ Failed: ${failedPayloads.length}/${results.length}`, 'red');
  
  if (successfulPayloads.length > 0) {
    log(`\n✅ Working Payloads:`, 'green');
    for (const result of successfulPayloads) {
      log(`   • ${result.payload} (${result.payloadSize} bytes, ${result.fieldCount} fields)`, 'green');
    }
  }
  
  if (failedPayloads.length > 0) {
    log(`\n❌ Failed Payloads:`, 'red');
    for (const result of failedPayloads) {
      log(`   • ${result.payload} (${result.payloadSize} bytes, ${result.fieldCount} fields) - Status: ${result.status}`, 'red');
    }
  }
  
  // Analyze patterns
  log(`\n🔍 Pattern Analysis:`, 'bold');
  
  if (successfulPayloads.length > 0 && failedPayloads.length > 0) {
    const avgSuccessfulSize = successfulPayloads.reduce((sum, r) => sum + r.payloadSize, 0) / successfulPayloads.length;
    const avgFailedSize = failedPayloads.reduce((sum, r) => sum + r.payloadSize, 0) / failedPayloads.length;
    
    log(`   📏 Average successful payload size: ${Math.round(avgSuccessfulSize)} bytes`, 'cyan');
    log(`   📏 Average failed payload size: ${Math.round(avgFailedSize)} bytes`, 'cyan');
    
    if (avgFailedSize > avgSuccessfulSize) {
      log(`   💡 Larger payloads tend to fail - possible size limit`, 'yellow');
    }
    
    const avgSuccessfulFields = successfulPayloads.reduce((sum, r) => sum + r.fieldCount, 0) / successfulPayloads.length;
    const avgFailedFields = failedPayloads.reduce((sum, r) => sum + r.fieldCount, 0) / failedPayloads.length;
    
    log(`   📋 Average successful field count: ${Math.round(avgSuccessfulFields)}`, 'cyan');
    log(`   📋 Average failed field count: ${Math.round(avgFailedFields)}`, 'cyan');
    
    if (avgFailedFields > avgSuccessfulFields) {
      log(`   💡 More complex payloads tend to fail - possible field limit`, 'yellow');
    }
  }
  
  // Recommendations
  log(`\n💡 Recommendations:`, 'bold');
  
  if (successfulPayloads.length > 0) {
    log(`   ✅ N8N webhook is partially working!`, 'green');
    log(`   🔧 Use the working payload format as a template`, 'cyan');
    log(`   📝 Check N8N workflow configuration for payload requirements`, 'cyan');
  } else {
    log(`   ❌ N8N webhook is not responding to any payloads`, 'red');
    log(`   🔧 Check N8N workflow is active and webhook is registered`, 'cyan');
  }
  
  if (failedPayloads.length > 0) {
    log(`   🔍 Investigate why complex payloads fail`, 'yellow');
    log(`   📝 Check N8N workflow input schema requirements`, 'cyan');
  }
  
  logHeader('Test Complete');
  log(`Completed at: ${new Date().toISOString()}`, 'dim');
  
  return {
    totalTests: results.length,
    successfulTests: successfulPayloads.length,
    failedTests: failedPayloads.length,
    results: results,
    corsWorking: corsResult.success
  };
}

// Run the test
if (require.main === module) {
  runFocusedTest()
    .then(report => {
      const hasWorkingPayloads = report.successfulTests > 0;
      process.exit(hasWorkingPayloads ? 0 : 1);
    })
    .catch(error => {
      log(`\n💥 Fatal error: ${error.message}`, 'red');
      process.exit(1);
    });
}

module.exports = {
  runFocusedTest,
  testPayload,
  testCORS
};
