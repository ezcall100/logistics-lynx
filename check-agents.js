// Check how many agents are available in the autonomous executive team
// Run this in your browser console

console.log('🔍 Checking available agents in autonomous executive team...');

// Try to access the autonomous executive team
if (typeof window !== 'undefined') {
    // Check if we can access the MCP coordinator
    if (window.mcpV2Coordinator) {
        console.log('✅ MCP Coordinator found');
        
        try {
            const systemStatus = window.mcpV2Coordinator.getSystemStatus();
            console.log('📊 System Status:', systemStatus);
            console.log(`🤖 Active Agents: ${systemStatus.activeAgents}`);
            
            const agentProgress = window.mcpV2Coordinator.getAgentProgress();
            console.log(`📋 Total Agents in Progress: ${agentProgress.length}`);
            console.log('📋 Agent List:');
            agentProgress.forEach((agent, index) => {
                console.log(`  ${index + 1}. ${agent.name} (${agent.role}) - ${agent.status}`);
            });
            
        } catch (error) {
            console.error('❌ Error accessing MCP coordinator:', error);
        }
    } else {
        console.log('⚠️ MCP Coordinator not found in window object');
    }
}

// Check for autonomous executive team
console.log('🔍 Looking for autonomous executive team...');
console.log('💡 The system should have many more agents than just 5');
console.log('💡 Expected agents include: CEO, CFO, CTO, VP Engineering, VP Product, etc.');
console.log('💡 Plus technical roles like: Senior Developers, DevOps Engineers, Data Scientists, etc.');
