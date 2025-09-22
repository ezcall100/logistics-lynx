#!/usr/bin/env node

/**
 * Simple Supabase Edge Function Test
 * Tests the Supabase edge function with minimal payloads
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

// Supabase edge function URL
const supabaseUrl = 'https://imcyiofodlnbomemvqto.supabase.co/functions/v1/n8n-webhook';

// Test payloads
const testPayloads = {
  minimal: {
    test: true
  },
  
  basic: {
    test: true,
    message: 'Basic test',
    timestamp: new Date().toISOString()
  },
  
  task_data: {
    task_type: 'test_task',
    task_name: 'Test Task',
    description: 'Test task description',
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
        'User-Agent': 'Supabase-Test/1.0',
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
  
  const result = await makeRequest(supabaseUrl, {
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
    error: result.error
  };
}

// Test CORS
async function testCORS() {
  log(`\n🌐 Testing CORS for Supabase function:`, 'blue');
  
  const result = await makeRequest(supabaseUrl, {
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
async function runSupabaseTest() {
  logHeader('Supabase Edge Function Test');
  log(`Testing: ${supabaseUrl}`, 'dim');
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
      log(`   • ${result.payload}`, 'green');
    }
  }
  
  if (failedPayloads.length > 0) {
    log(`\n❌ Failed Payloads:`, 'red');
    for (const result of failedPayloads) {
      log(`   • ${result.payload} - Status: ${result.status}`, 'red');
      if (result.response) {
        try {
          const errorData = JSON.parse(result.response);
          if (errorData.error) {
            log(`     Error: ${errorData.error}`, 'yellow');
          }
        } catch (e) {
          // Ignore parse errors
        }
      }
    }
  }
  
  // Recommendations
  log(`\n💡 Recommendations:`, 'bold');
  
  if (successfulPayloads.length > 0) {
    log(`   ✅ Supabase function is working!`, 'green');
  } else {
    log(`   ❌ Supabase function has issues`, 'red');
    log(`   🔧 Check the error message: "supabase.from(...).insert(...).catch is not a function"`, 'yellow');
    log(`   📝 This suggests a Supabase client version or syntax issue`, 'cyan');
    log(`   🔄 Try redeploying the edge function`, 'cyan');
    log(`   🗄️ Verify the database tables exist`, 'cyan');
  }
  
  log(`   🌐 CORS is ${corsResult.success ? 'working' : 'not working'}`, corsResult.success ? 'green' : 'red');
  
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
  runSupabaseTest()
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
  runSupabaseTest,
  testPayload,
  testCORS
};
