// Simple MCP Coordinator Test
// Run this in your browser console after the app loads

console.log('🔍 Testing MCP Coordinator...');

// Wait a moment for the app to load
setTimeout(() => {
    if (typeof window !== 'undefined' && window.mcpV2Coordinator) {
        console.log('✅ MCP Coordinator found!');
        
        const coordinator = window.mcpV2Coordinator;
        
        try {
            // Test system status
            const systemStatus = coordinator.getSystemStatus();
            console.log('📊 System Status:', systemStatus);
            console.log(`Active Agents: ${systemStatus.activeAgents}`);
            
            // Test agent progress
            const agentProgress = coordinator.getAgentProgress();
            console.log(`🤖 Total Agents: ${agentProgress.length}`);
            
            if (agentProgress.length > 5) {
                console.log('🎉 SUCCESS: Many agents detected!');
                console.log('📋 First 10 agents:');
                agentProgress.slice(0, 10).forEach((agent, index) => {
                    console.log(`  ${index + 1}. ${agent.name} (${agent.role})`);
                });
            } else {
                console.log('⚠️ Only', agentProgress.length, 'agents detected');
            }
            
            // Test progress summary
            const progressSummary = coordinator.getProgressSummary();
            console.log('📈 Progress:', progressSummary.progressPercentage + '%');
            console.log('📋 Tasks:', progressSummary.completedTasks + '/' + progressSummary.totalTasks);
            
            console.log('✅ All tests passed! MCP Coordinator is working correctly.');
            
        } catch (error) {
            console.error('❌ Error testing MCP coordinator:', error);
        }
        
    } else {
        console.log('❌ MCP Coordinator not found in window object');
        console.log('💡 Make sure the app is running and loaded');
    }
}, 2000);
