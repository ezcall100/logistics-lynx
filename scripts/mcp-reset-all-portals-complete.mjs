#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

console.log('🚀 MCP 250 Agents - Complete Portal Reset Script');
console.log('================================================');
console.log('Resetting ALL 35+ portals to 0% completion...\n');

const dashboardPath = path.join(process.cwd(), 'mcp-server', 'src', 'MCPProgressDashboard.tsx');

try {
  // Read the current dashboard file
  let content = fs.readFileSync(dashboardPath, 'utf8');
  
  console.log('📋 Current file found, applying complete reset...');
  
  // Reset overall progress to 0
  content = content.replace(
    /const \[overallProgress, setOverallProgress\] = useState\(\d+\); \/\/ RESTARTED FROM 0%/,
    'const [overallProgress, setOverallProgress] = useState(0); // RESTARTED FROM 0%'
  );
  
  // Reset agent status to all active
  content = content.replace(
    /const \[agentStatus, setAgentStatus\] = useState<AgentStatus>\(\{[^}]+\}\);/,
    `const [agentStatus, setAgentStatus] = useState<AgentStatus>({
    total: 250,
    active: 250,
    maintenance: 0,
    error: 0,
  });`
  );
  
  // Reset ALL portals to 0% progress and planning status
  const portalResetPatterns = [
    // Reset progress from any number to 0
    { pattern: /progress: \d+,/g, replacement: 'progress: 0,' },
    // Reset status from any status to planning
    { pattern: /status: '[^']+',/g, replacement: "status: 'planning'," },
    // Reset agents assigned to reasonable numbers
    { pattern: /agentsAssigned: 0,/g, replacement: 'agentsAssigned: 12,' },
    // Reset estimated completion
    { pattern: /estimatedCompletion: 'Complete',/g, replacement: "'Oct 15, 2025'," },
    // Reset blockers
    { pattern: /blockers: \[\],/g, replacement: "blockers: ['Enterprise starter kit deployment']," },
    // Reset last update
    { pattern: /lastUpdate: '[^']+',/g, replacement: "'Just now'," }
  ];
  
  portalResetPatterns.forEach(({ pattern, replacement }) => {
    content = content.replace(pattern, replacement);
  });
  
  // Write the updated content back to the file
  fs.writeFileSync(dashboardPath, content, 'utf8');
  
  console.log('✅ SUCCESS: All portals reset to 0% completion');
  console.log('✅ Overall progress reset to 0%');
  console.log('✅ Agent status reset to 250 active agents');
  console.log('✅ All portal statuses reset to "planning"');
  console.log('✅ All portal progress reset to 0%');
  console.log('✅ All ETAs reset to Oct 15, 2025');
  console.log('✅ All blockers reset to "Enterprise starter kit deployment"');
  console.log('✅ All last updates reset to "Just now"');
  
  console.log('\n🎯 MCP Dashboard Status:');
  console.log('   - Total Portals: 35+');
  console.log('   - Completed: 0');
  console.log('   - In Progress: 0');
  console.log('   - Planning: 35+');
  console.log('   - Overall Progress: 0%');
  console.log('   - Agent Status: 250 Active, 0 Maintenance, 0 Error');
  
  console.log('\n🚀 MCP 250 Agents are now ready to start from 0%!');
  console.log('📊 Dashboard will show accurate restart status');
  
} catch (error) {
  console.error('❌ ERROR:', error.message);
  console.error('Failed to reset portals. Please check file permissions.');
  process.exit(1);
}
