// Simple test to check if MCP API is running on port 3001
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/health',
  method: 'GET',
  timeout: 5000
};

const req = http.request(options, (res) => {
  console.log(`✅ MCP API is running! Status: ${res.statusCode}`);
  console.log(`📡 Port 3001 is active and responding`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('📄 Response:', data);
  });
});

req.on('error', (err) => {
  console.log('❌ MCP API is not responding on port 3001');
  console.log('🔧 Error:', err.message);
  console.log('💡 Try running: cd ../logistics-lynx && npm run dev:mcp');
});

req.on('timeout', () => {
  console.log('⏰ Request timed out - MCP API may not be running');
  req.destroy();
});

req.end();
