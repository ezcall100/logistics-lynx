#!/usr/bin/env node

/**
 * N8N Webhook Verification Test
 * Tests specific scenarios mentioned in the results
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

// Test scenarios
const testScenarios = {
  // Test other credential combinations
  otherCredentials: [
    { user: 'webhook', password: 'test123', description: 'webhook/test123' },
    { user: 'cursor-integration', password: 'cursor_webhook_2024_secure', description: 'cursor-integration/cursor_webhook_2024_secure' },
    { user: 'logistics-lynx', password: 'lynx_webhook_2024', description: 'logistics-lynx/lynx_webhook_2024' }
  ],
  
  // Test additional payloads with working credentials
  additionalPayloads: [
    { name: 'simple', payload: { message: 'Hello N8N', timestamp: new Date().toISOString() } },
    { name: 'basic', payload: { test: true, message: 'Basic test', timestamp: new Date().toISOString(), source: 'test' } },
    { name: 'task', payload: { task_type: 'test_task', task_name: 'Test Task', description: 'Testing webhook' } }
  ],
  
  // Working credentials
  workingCredentials: { user: 'cursor-ai', password: 'cursor_webhook_2024_secure' }
};

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
        'User-Agent': 'N8N-Verification-Test/1.0',
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

// Test with specific credentials
async function testCredentials(credentials, description, payload) {
  log(`\n🔐 Testing credentials: ${description}`, 'blue');
  
  // Create Basic Auth header
  const auth = Buffer.from(`${credentials.user}:${credentials.password}`).toString('base64');
  
  const result = await makeRequest(webhookUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`
    },
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
    credentials: description,
    success: result.success,
    status: result.status,
    response: result.data,
    error: result.error
  };
}

// Test other credential combinations
async function testOtherCredentials() {
  logHeader('Testing Other Credential Combinations');
  
  const results = [];
  const testPayload = { test: true };
  
  for (const credentials of testScenarios.otherCredentials) {
    const result = await testCredentials(credentials, credentials.description, testPayload);
    results.push(result);
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 1500));
  }
  
  return results;
}

// Test additional payloads with working credentials
async function testAdditionalPayloads() {
  logHeader('Testing Additional Payloads with Working Credentials');
  
  const results = [];
  
  for (const payloadTest of testScenarios.additionalPayloads) {
    const result = await testCredentials(
      testScenarios.workingCredentials, 
      `cursor-ai (${payloadTest.name})`, 
      payloadTest.payload
    );
    results.push(result);
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 1500));
  }
  
  return results;
}

// Test if webhook is still in test mode
async function testModeVerification() {
  logHeader('Testing Mode Verification');
  
  log(`\n🔄 Testing multiple requests with working credentials to check if still in test mode...`, 'cyan');
  
  const results = [];
  const testPayload = { test: true };
  
  // Make 3 consecutive requests with working credentials
  for (let i = 1; i <= 3; i++) {
    log(`\n📡 Request ${i}/3:`, 'blue');
    
    const result = await testCredentials(
      testScenarios.workingCredentials, 
      `cursor-ai (attempt ${i})`, 
      testPayload
    );
    results.push(result);
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  return results;
}

// Main test execution
async function runVerificationTests() {
  logHeader('N8N Webhook Verification Tests');
  log(`URL: ${webhookUrl}`, 'dim');
  log(`Started at: ${new Date().toISOString()}`, 'dim');
  
  const allResults = [];
  
  // Test 1: Other credential combinations
  log(`\n🧪 Test 1: Other Credential Combinations`, 'bold');
  const credentialResults = await testOtherCredentials();
  allResults.push(...credentialResults);
  
  // Test 2: Additional payloads with working credentials
  log(`\n🧪 Test 2: Additional Payloads with Working Credentials`, 'bold');
  const payloadResults = await testAdditionalPayloads();
  allResults.push(...payloadResults);
  
  // Test 3: Test mode verification
  log(`\n🧪 Test 3: Test Mode Verification`, 'bold');
  const modeResults = await testModeVerification();
  allResults.push(...modeResults);
  
  // Generate comprehensive analysis
  logHeader('Verification Test Results');
  
  const successfulTests = allResults.filter(r => r.success);
  const failedTests = allResults.filter(r => !r.success);
  
  log(`\n📊 Overall Results:`, 'bold');
  log(`   ✅ Successful: ${successfulTests.length}/${allResults.length}`, 'green');
  log(`   ❌ Failed: ${failedTests.length}/${allResults.length}`, 'red');
  
  // Analyze by test type
  log(`\n🔍 Analysis by Test Type:`, 'bold');
  
  // Other credentials analysis
  const otherCredResults = allResults.filter(r => r.credentials.includes('webhook') || r.credentials.includes('cursor-integration') || r.credentials.includes('logistics-lynx'));
  const otherCredSuccess = otherCredResults.filter(r => r.success).length;
  log(`   🔐 Other Credentials: ${otherCredSuccess}/${otherCredResults.length} working`, otherCredSuccess > 0 ? 'green' : 'red');
  
  // Additional payloads analysis
  const payloadResults_filtered = allResults.filter(r => r.credentials.includes('cursor-ai') && (r.credentials.includes('simple') || r.credentials.includes('basic') || r.credentials.includes('task')));
  const payloadSuccess = payloadResults_filtered.filter(r => r.success).length;
  log(`   📦 Additional Payloads: ${payloadSuccess}/${payloadResults_filtered.length} working`, payloadSuccess > 0 ? 'green' : 'red');
  
  // Test mode analysis
  const modeResults_filtered = allResults.filter(r => r.credentials.includes('attempt'));
  const modeSuccess = modeResults_filtered.filter(r => r.success).length;
  log(`   🔄 Test Mode: ${modeSuccess}/${modeResults_filtered.length} requests successful`, modeSuccess > 0 ? 'green' : 'red');
  
  // Detailed results
  if (successfulTests.length > 0) {
    log(`\n✅ Working Tests:`, 'green');
    for (const result of successfulTests) {
      log(`   • ${result.credentials} (Status: ${result.status})`, 'green');
    }
  }
  
  if (failedTests.length > 0) {
    log(`\n❌ Failed Tests:`, 'red');
    for (const result of failedTests) {
      log(`   • ${result.credentials} (Status: ${result.status})`, 'red');
    }
  }
  
  // Conclusions and recommendations
  log(`\n💡 Conclusions:`, 'bold');
  
  if (otherCredSuccess === 0) {
    log(`   ❌ Other credential combinations are not working`, 'red');
    log(`   ✅ Only 'cursor-ai' credentials work`, 'green');
  }
  
  if (payloadSuccess === 0) {
    log(`   ❌ Additional payloads are not working`, 'red');
    log(`   💡 Webhook may be in test mode or have payload restrictions`, 'yellow');
  }
  
  if (modeSuccess === 1 && modeResults_filtered.length > 1) {
    log(`   🔄 Webhook is in TEST MODE - only first request works`, 'yellow');
    log(`   💡 Need to activate workflow in N8N dashboard`, 'cyan');
  } else if (modeSuccess > 1) {
    log(`   ✅ Webhook is working for multiple requests`, 'green');
    log(`   💡 Test mode may have been resolved`, 'cyan');
  }
  
  logHeader('Verification Complete');
  log(`Completed at: ${new Date().toISOString()}`, 'dim');
  
  return {
    totalTests: allResults.length,
    successfulTests: successfulTests.length,
    failedTests: failedTests.length,
    otherCredentialsWorking: otherCredSuccess > 0,
    additionalPayloadsWorking: payloadSuccess > 0,
    testModeActive: modeSuccess === 1 && modeResults_filtered.length > 1,
    results: allResults
  };
}

// Run the verification tests
if (require.main === module) {
  runVerificationTests()
    .then(report => {
      log(`\n🎯 Final Status:`, 'bold');
      log(`   🔐 Other Credentials: ${report.otherCredentialsWorking ? 'Working' : 'Not Working'}`, report.otherCredentialsWorking ? 'green' : 'red');
      log(`   📦 Additional Payloads: ${report.additionalPayloadsWorking ? 'Working' : 'Not Working'}`, report.additionalPayloadsWorking ? 'green' : 'red');
      log(`   🔄 Test Mode: ${report.testModeActive ? 'Active' : 'Resolved'}`, report.testModeActive ? 'yellow' : 'green');
      
      process.exit(0);
    })
    .catch(error => {
      log(`\n💥 Fatal error: ${error.message}`, 'red');
      process.exit(1);
    });
}

module.exports = {
  runVerificationTests,
  testOtherCredentials,
  testAdditionalPayloads,
  testModeVerification
};
