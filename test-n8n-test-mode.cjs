#!/usr/bin/env node

/**
 * Test N8N Test Mode Behavior
 * Demonstrates the one-request-per-execute behavior
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

// Webhook configuration
const webhookUrl = 'https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook';
const credentials = { user: 'cursor-ai', password: 'cursor_webhook_2024_secure' };

// HTTP request function with Basic Auth
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
        'User-Agent': 'N8N-Test-Mode-Demo/1.0',
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

// Test single request
async function testSingleRequest(requestNumber) {
  log(`\n📡 Request ${requestNumber}:`, 'blue');
  
  // Create Basic Auth header
  const auth = Buffer.from(`${credentials.user}:${credentials.password}`).toString('base64');
  
  const result = await makeRequest(webhookUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`
    },
    body: JSON.stringify({ test: true, requestNumber })
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
    requestNumber,
    success: result.success,
    status: result.status,
    response: result.data,
    error: result.error
  };
}

// Main test execution
async function demonstrateTestMode() {
  logHeader('N8N Test Mode Behavior Demonstration');
  log(`URL: ${webhookUrl}`, 'dim');
  log(`Started at: ${new Date().toISOString()}`, 'dim');
  
  log(`\n🔍 This test demonstrates why external tests get 404 errors:`, 'bold');
  log(`   1. N8N webhook is in "test mode"`, 'cyan');
  log(`   2. It only works for ONE request after clicking "Execute workflow"`, 'cyan');
  log(`   3. After that one request, it deactivates and returns 404`, 'cyan');
  log(`   4. You need to click "Execute workflow" again for the next request`, 'cyan');
  
  const results = [];
  
  // Make 3 consecutive requests to show the pattern
  for (let i = 1; i <= 3; i++) {
    const result = await testSingleRequest(i);
    results.push(result);
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  // Analyze results
  logHeader('Test Mode Analysis');
  
  const successfulRequests = results.filter(r => r.success);
  const failedRequests = results.filter(r => !r.success);
  
  log(`\n📊 Results:`, 'bold');
  log(`   ✅ Successful: ${successfulRequests.length}/${results.length}`, 'green');
  log(`   ❌ Failed: ${failedRequests.length}/${results.length}`, 'red');
  
  if (successfulRequests.length > 0) {
    log(`\n✅ Working Requests:`, 'green');
    for (const result of successfulRequests) {
      log(`   • Request ${result.requestNumber} (Status: ${result.status})`, 'green');
    }
  }
  
  if (failedRequests.length > 0) {
    log(`\n❌ Failed Requests:`, 'red');
    for (const result of failedRequests) {
      log(`   • Request ${result.requestNumber} (Status: ${result.status})`, 'red');
    }
  }
  
  // Explain the pattern
  log(`\n🔍 Pattern Analysis:`, 'bold');
  
  if (successfulRequests.length === 1 && failedRequests.length > 0) {
    log(`   🎯 CONFIRMED: Test mode behavior detected!`, 'yellow');
    log(`   📝 Only the first request worked, subsequent requests failed`, 'cyan');
    log(`   💡 This explains why external tests get 404 errors`, 'cyan');
  } else if (successfulRequests.length === 0) {
    log(`   ❌ All requests failed - webhook is completely inactive`, 'red');
    log(`   💡 You need to click "Execute workflow" in N8N dashboard`, 'cyan');
  } else if (successfulRequests.length > 1) {
    log(`   ✅ Multiple requests worked - webhook may be in production mode!`, 'green');
  }
  
  // Recommendations
  log(`\n💡 Why External Tests Get 404:`, 'bold');
  log(`   1. 🔄 N8N webhook is in "test mode"`, 'cyan');
  log(`   2. 📡 It only accepts ONE request after clicking "Execute workflow"`, 'cyan');
  log(`   3. ⏰ After that request, it deactivates until you click again`, 'cyan');
  log(`   4. 🧪 External tests are "subsequent requests" so they get 404`, 'cyan');
  log(`   5. 📊 Your N8N logs show the FIRST request (which worked)`, 'cyan');
  
  log(`\n🔧 Solution:`, 'bold');
  log(`   • Go to N8N dashboard`, 'cyan');
  log(`   • Activate the workflow (not just test mode)`, 'cyan');
  log(`   • Move from "test" to "production" mode`, 'cyan');
  log(`   • Then external tests will work consistently`, 'cyan');
  
  logHeader('Demonstration Complete');
  log(`Completed at: ${new Date().toISOString()}`, 'dim');
  
  return {
    totalRequests: results.length,
    successfulRequests: successfulRequests.length,
    failedRequests: failedRequests.length,
    testModeDetected: successfulRequests.length === 1 && failedRequests.length > 0,
    results: results
  };
}

// Run the demonstration
if (require.main === module) {
  demonstrateTestMode()
    .then(report => {
      log(`\n🎯 Conclusion:`, 'bold');
      if (report.testModeDetected) {
        log(`   🔄 Test mode behavior confirmed - this explains the 404 errors!`, 'yellow');
      } else if (report.successfulRequests === 0) {
        log(`   ❌ Webhook is inactive - click "Execute workflow" in N8N`, 'red');
      } else {
        log(`   ✅ Webhook is working - test mode may be resolved!`, 'green');
      }
      
      process.exit(0);
    })
    .catch(error => {
      log(`\n💥 Fatal error: ${error.message}`, 'red');
      process.exit(1);
    });
}

module.exports = {
  demonstrateTestMode,
  testSingleRequest
};
