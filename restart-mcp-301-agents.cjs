/**
 * Restart MCP Server with 301 Agents
 * This script restarts the MCP server to show the new 301 agents
 */

const { exec } = require('child_process');
const path = require('path');

console.log('🚀 Restarting MCP Server with 301 Agents...');
console.log('📊 Updating from 251 to 301 agents (251 existing + 50 new testing agents)');
console.log('🎨 New redesigned command center with better UI/UX');

// Kill any existing MCP server processes
exec('taskkill /f /im node.exe', (error, stdout, stderr) => {
  if (error) {
    console.log('ℹ️ No existing Node processes to kill');
  } else {
    console.log('✅ Killed existing Node processes');
  }
  
  // Wait a moment then start the MCP server
  setTimeout(() => {
    console.log('🔄 Starting MCP server on port 3002...');
    
    // Change to mcp-server directory and start the server
    const mcpServerPath = path.join(__dirname, 'mcp-server');
    
    exec('npm run dev', { cwd: mcpServerPath }, (error, stdout, stderr) => {
      if (error) {
        console.error('❌ Error starting MCP server:', error);
        return;
      }
      
      console.log('✅ MCP Server started successfully!');
      console.log('🌐 Access your NEW MCP Command Center at: http://localhost:3002');
      console.log('📊 You should now see 301 agents (251 existing + 50 new testing agents)');
      console.log('🎨 NEW FEATURES:');
      console.log('   • Modern glass-morphism design');
      console.log('   • 4 different views: Overview, Agents, Portals, Testing');
      console.log('   • Interactive agent groups with testing phases');
      console.log('   • Real-time search and filtering');
      console.log('   • Better visual hierarchy and organization');
      console.log('   • Responsive design for all screen sizes');
      console.log('🤖 New testing agents include: PlanBot, CaseBot, DataBot, FormBot, TableBot, etc.');
      
      if (stdout) {
        console.log('📝 Server output:', stdout);
      }
    });
  }, 2000);
});

console.log('⏳ Please wait while the server restarts...');
console.log('🔄 This may take a few moments...');
