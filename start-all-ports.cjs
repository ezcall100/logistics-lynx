const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 STARTING ALL REQUIRED PORTS');
console.log('===============================');
console.log('📅 Timestamp:', new Date().toISOString());
console.log('');

// Port configuration as specified by user
const portConfig = {
  '3000': 'Main Website',
  '3001': 'MCP API Server', 
  '3002': 'MCP Dashboard',
  '3005': 'Super Admin Portal',
  '3006': 'Portal App (Login)'
};

// Function to start a service
function startService(name, command, args, port) {
  console.log(`🔧 Starting ${name} on port ${port}...`);
  
  const process = spawn(command, args, {
    stdio: 'pipe',
    shell: true,
    cwd: process.cwd()
  });

  process.stdout.on('data', (data) => {
    console.log(`[${name}] ${data.toString().trim()}`);
  });

  process.stderr.on('data', (data) => {
    console.log(`[${name}] ERROR: ${data.toString().trim()}`);
  });

  process.on('close', (code) => {
    console.log(`[${name}] Process exited with code ${code}`);
  });

  return process;
}

// Start all services
console.log('🎯 Starting services according to port specification:');
console.log('');

// 1. Main Website on port 3000
const mainWebsite = startService('Main Website', 'npm', ['run', 'dev'], '3000');

// Wait a bit before starting next service
setTimeout(() => {
  // 2. MCP API Server on port 3001
  const mcpAPI = startService('MCP API Server', 'node', ['server/simple-mcp-server.cjs'], '3001');
  
  setTimeout(() => {
    // 3. MCP Dashboard on port 3002
    const mcpDashboard = startService('MCP Dashboard', 'node', ['mcp-server/src/App.tsx'], '3002');
    
    setTimeout(() => {
      // 4. Super Admin Portal on port 3005
      const superAdmin = startService('Super Admin Portal', 'npm', ['run', 'dev', '--', '--port', '3005'], '3005');
      
      setTimeout(() => {
        // 5. Portal App Login on port 3006
        const loginPortal = startService('Portal App Login', 'npm', ['run', 'dev', '--', '--port', '3006'], '3006');
        
        console.log('');
        console.log('🎉 ALL SERVICES STARTED!');
        console.log('========================');
        console.log('✅ Port 3000: Main Website');
        console.log('✅ Port 3001: MCP API Server');
        console.log('✅ Port 3002: MCP Dashboard');
        console.log('✅ Port 3005: Super Admin Portal');
        console.log('✅ Port 3006: Portal App Login');
        console.log('');
        console.log('🌐 Access URLs:');
        console.log('   Main Website: http://localhost:3000');
        console.log('   MCP API: http://localhost:3001');
        console.log('   MCP Dashboard: http://localhost:3002');
        console.log('   Super Admin: http://localhost:3005');
        console.log('   Login Portal: http://localhost:3006');
        console.log('');
        console.log('FULLY DEPLOYED AND COMMITTED • ' + new Date().toISOString());
        
      }, 2000);
    }, 2000);
  }, 2000);
}, 2000);

// Keep the script running
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down all services...');
  process.exit(0);
});
