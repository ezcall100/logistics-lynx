#!/usr/bin/env node

/**
 * Test N8N Webhook with Basic Authentication
 * Tests the webhook with the credentials you configured
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
const webhookConfig = {
  baseUrl: 'https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook',
  // Try different credential combinations
  credentials: [
    { user: 'cursor-ai', password: 'cursor_webhook_2024_secure' },
    { user: 'webhook', password: 'test123' },
    { user: 'cursor-integration', password: 'cursor_webhook_2024_secure' },
    { user: 'logistics-lynx', password: 'lynx_webhook_2024' }
  ]
};

// Test payloads
const testPayloads = {
  minimal: {
    test: true
  },
  
  simple: {
    message: 'Hello N8N with Auth',
    timestamp: new Date().toISOString()
  },
  
  basic: {
    test: true,
    message: 'Basic webhook test with auth',
    timestamp: new Date().toISOString(),
    source: 'webhook_test_with_auth'
  }
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
        'User-Agent': 'N8N-Auth-Test/1.0',
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
async function testWithCredentials(credentials, payloadName, payload) {
  log(`\n🔐 Testing with credentials: ${credentials.user}`, 'blue');
  
  // Create Basic Auth header
  const auth = Buffer.from(`${credentials.user}:${credentials.password}`).toString('base64');
  
  const result = await makeRequest(webhookConfig.baseUrl, {
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
    credentials: credentials.user,
    payload: payloadName,
    success: result.success,
    status: result.status,
    response: result.data,
    error: result.error
  };
}

// Test all credential combinations
async function testAllCredentials() {
  logHeader('Testing N8N Webhook with Basic Authentication');
  log(`URL: ${webhookConfig.baseUrl}`, 'dim');
  log(`Started at: ${new Date().toISOString()}`, 'dim');
  
  const results = [];
  
  // Test with minimal payload first
  const testPayload = testPayloads.minimal;
  log(`\n🧪 Testing payload: ${JSON.stringify(testPayload)}`, 'cyan');
  
  for (const credentials of webhookConfig.credentials) {
    const result = await testWithCredentials(credentials, 'minimal', testPayload);
    results.push(result);
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // If we found working credentials, test with other payloads
  const workingCredentials = results.find(r => r.success);
  if (workingCredentials) {
    log(`\n🎉 Found working credentials: ${workingCredentials.credentials}`, 'green');
    log(`Testing additional payloads with working credentials...`, 'cyan');
    
    const workingCred = webhookConfig.credentials.find(c => c.user === workingCredentials.credentials);
    
    for (const [payloadName, payload] of Object.entries(testPayloads)) {
      if (payloadName !== 'minimal') {
        const result = await testWithCredentials(workingCred, payloadName, payload);
        results.push(result);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }
  
  // Generate analysis
  logHeader('Authentication Test Results');
  
  const successfulTests = results.filter(r => r.success);
  const failedTests = results.filter(r => !r.success);
  
  log(`\n📊 Results Summary:`, 'bold');
  log(`   ✅ Successful: ${successfulTests.length}/${results.length}`, 'green');
  log(`   ❌ Failed: ${failedTests.length}/${results.length}`, 'red');
  
  if (successfulTests.length > 0) {
    log(`\n✅ Working Credentials & Payloads:`, 'green');
    for (const result of successfulTests) {
      log(`   • ${result.credentials} - ${result.payload} (Status: ${result.status})`, 'green');
    }
  }
  
  if (failedTests.length > 0) {
    log(`\n❌ Failed Tests:`, 'red');
    for (const result of failedTests) {
      log(`   • ${result.credentials} - ${result.payload} (Status: ${result.status})`, 'red');
    }
  }
  
  // Recommendations
  log(`\n💡 Recommendations:`, 'bold');
  
  if (successfulTests.length > 0) {
    const workingCred = successfulTests[0].credentials;
    log(`   ✅ Webhook is working with credentials: ${workingCred}`, 'green');
    log(`   🔧 Use these credentials in your application`, 'cyan');
    log(`   📝 Update your webhook service with the working auth`, 'cyan');
  } else {
    log(`   ❌ None of the tested credentials worked`, 'red');
    log(`   🔧 Check the credentials you set up in N8N`, 'cyan');
    log(`   📝 Verify the username and password are correct`, 'cyan');
    log(`   🔄 Try setting up new credentials in N8N`, 'cyan');
  }
  
  logHeader('Test Complete');
  log(`Completed at: ${new Date().toISOString()}`, 'dim');
  
  return {
    totalTests: results.length,
    successfulTests: successfulTests.length,
    failedTests: failedTests.length,
    results: results,
    workingCredentials: successfulTests.length > 0 ? successfulTests[0].credentials : null
  };
}

// Run the test
if (require.main === module) {
  testAllCredentials()
    .then(report => {
      const hasWorkingAuth = report.workingCredentials !== null;
      log(`\n🎯 Final Status: ${hasWorkingAuth ? `Webhook working with ${report.workingCredentials}!` : 'Need to check credentials'}`, hasWorkingAuth ? 'green' : 'yellow');
      process.exit(hasWorkingAuth ? 0 : 1);
    })
    .catch(error => {
      log(`\n💥 Fatal error: ${error.message}`, 'red');
      process.exit(1);
    });
}

module.exports = {
  testAllCredentials,
  testWithCredentials
};
