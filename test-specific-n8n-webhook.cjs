#!/usr/bin/env node

/**
 * Test Specific N8N Webhook
 * Tests the exact webhook URL provided by the user
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

// The specific webhook URL to test
const webhookUrl = 'https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook';

// Test payloads - starting with minimal and increasing complexity
const testPayloads = {
  minimal: {
    test: true
  },
  
  simple: {
    message: 'Hello N8N',
    timestamp: new Date().toISOString()
  },
  
  basic: {
    test: true,
    message: 'Basic webhook test',
    timestamp: new Date().toISOString(),
    source: 'webhook_test'
  },
  
  task: {
    task_type: 'test_task',
    task_name: 'Test Task',
    description: 'Testing webhook functionality',
    timestamp: new Date().toISOString()
  },
  
  autonomous: {
    task_type: 'autonomous_task',
    agent_type: 'mcp_agent',
    task_name: 'Webhook Test Task',
    description: 'Testing autonomous task webhook',
    priority: 5,
    workflow_id: 'test-workflow-' + Date.now(),
    execution_id: 'test-execution-' + Date.now(),
    trigger_type: 'manual_test',
    goal: 'Test webhook functionality',
    action: 'Webhook test execution',
    confidence: 0.95,
    success: true,
    timestamp: new Date().toISOString()
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
        'User-Agent': 'N8N-Webhook-Test/1.0',
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
  
  const result = await makeRequest(webhookUrl, {
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
  log(`\n🌐 Testing CORS:`, 'blue');
  
  const result = await makeRequest(webhookUrl, {
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

// Test GET request (should fail)
async function testGET() {
  log(`\n🔍 Testing GET request:`, 'blue');
  
  const result = await makeRequest(webhookUrl, {
    method: 'GET'
  });

  const status = result.success ? '✅' : '❌';
  const statusColor = result.success ? 'green' : 'red';
  
  log(`   ${status} GET Status: ${result.status}`, statusColor);
  
  if (result.data && result.data.length > 0) {
    log(`   📄 Response: ${result.data.substring(0, 200)}...`, 'dim');
  }
  
  return result;
}

// Main test execution
async function testSpecificWebhook() {
  logHeader('Testing Specific N8N Webhook');
  log(`URL: ${webhookUrl}`, 'dim');
  log(`Started at: ${new Date().toISOString()}`, 'dim');
  
  const results = [];
  
  // Test GET request first
  const getResult = await testGET();
  
  // Test each payload type
  for (const [payloadName, payload] of Object.entries(testPayloads)) {
    const result = await testPayload(payloadName, payload);
    results.push(result);
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 1500));
  }
  
  // Test CORS
  const corsResult = await testCORS();
  
  // Generate analysis
  logHeader('Test Results Analysis');
  
  const successfulPayloads = results.filter(r => r.success);
  const failedPayloads = results.filter(r => !r.success);
  
  log(`\n📊 Results Summary:`, 'bold');
  log(`   ✅ Successful: ${successfulPayloads.length}/${results.length}`, 'green');
  log(`   ❌ Failed: ${failedPayloads.length}/${results.length}`, 'red');
  log(`   🔍 GET Request: ${getResult.success ? 'Success' : 'Failed'} (${getResult.status})`, getResult.success ? 'green' : 'red');
  log(`   🌐 CORS: ${corsResult.success ? 'Working' : 'Not Working'} (${corsResult.status})`, corsResult.success ? 'green' : 'red');
  
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
  
  // Analyze the error pattern
  if (failedPayloads.length > 0) {
    log(`\n🔍 Error Analysis:`, 'bold');
    const firstError = failedPayloads[0];
    if (firstError.response) {
      try {
        const errorData = JSON.parse(firstError.response);
        if (errorData.message) {
          log(`   📝 Error Message: ${errorData.message}`, 'yellow');
        }
        if (errorData.hint) {
          log(`   💡 Hint: ${errorData.hint}`, 'cyan');
        }
      } catch (e) {
        log(`   📝 Raw Error: ${firstError.response.substring(0, 200)}...`, 'yellow');
      }
    }
  }
  
  // Recommendations
  log(`\n💡 Recommendations:`, 'bold');
  
  if (successfulPayloads.length > 0) {
    log(`   ✅ Webhook is working for some payloads!`, 'green');
    log(`   🔧 Use the working payload format as a template`, 'cyan');
    log(`   📝 Check N8N workflow configuration for payload requirements`, 'cyan');
  } else {
    log(`   ❌ Webhook is not responding to any payloads`, 'red');
    log(`   🔧 Check N8N workflow is active and webhook is registered`, 'cyan');
    log(`   📝 Go to N8N dashboard and activate the workflow`, 'cyan');
    log(`   🔄 Try clicking "Execute workflow" button in N8N canvas`, 'cyan');
  }
  
  if (failedPayloads.length > 0) {
    log(`   🔍 Investigate why payloads are failing`, 'yellow');
    log(`   📝 Check N8N workflow input schema requirements`, 'cyan');
    log(`   📏 Consider payload size and field count limits`, 'cyan');
  }
  
  logHeader('Test Complete');
  log(`Completed at: ${new Date().toISOString()}`, 'dim');
  
  return {
    totalTests: results.length,
    successfulTests: successfulPayloads.length,
    failedTests: failedPayloads.length,
    results: results,
    getRequest: getResult,
    corsWorking: corsResult.success
  };
}

// Run the test
if (require.main === module) {
  testSpecificWebhook()
    .then(report => {
      const hasWorkingPayloads = report.successfulTests > 0;
      log(`\n🎯 Final Status: ${hasWorkingPayloads ? 'Webhook is working!' : 'Webhook needs configuration'}`, hasWorkingPayloads ? 'green' : 'yellow');
      process.exit(hasWorkingPayloads ? 0 : 1);
    })
    .catch(error => {
      log(`\n💥 Fatal error: ${error.message}`, 'red');
      process.exit(1);
    });
}

module.exports = {
  testSpecificWebhook,
  testPayload,
  testCORS,
  testGET
};
