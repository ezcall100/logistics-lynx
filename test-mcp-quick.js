// Quick MCP Coordinator Test
// Run this in your browser console after the app loads

console.log('🔍 Quick MCP Coordinator Test...');

// Wait for the app to load
setTimeout(() => {
    console.log('Checking for MCP Coordinator...');
    
    if (typeof window !== 'undefined' && window.mcpV2Coordinator) {
        console.log('✅ MCP Coordinator found!');
        
        const coordinator = window.mcpV2Coordinator;
        
        try {
            // Test basic functionality
            const systemStatus = coordinator.getSystemStatus();
            console.log('📊 System Status:', systemStatus);
            
            const agentProgress = coordinator.getAgentProgress();
            console.log(`🤖 Total Agents: ${agentProgress.length}`);
            
            if (agentProgress.length > 5) {
                console.log('🎉 SUCCESS: Many agents detected!');
                console.log('📋 Sample agents:');
                agentProgress.slice(0, 5).forEach((agent, index) => {
                    console.log(`  ${index + 1}. ${agent.name} (${agent.role})`);
                });
            } else {
                console.log('⚠️ Only', agentProgress.length, 'agents detected');
            }
            
            console.log('✅ MCP Coordinator is working correctly!');
            
        } catch (error) {
            console.error('❌ Error testing MCP coordinator:', error);
        }
        
    } else {
        console.log('❌ MCP Coordinator not found in window object');
        console.log('💡 Make sure:');
        console.log('   1. The development server is running (npm run dev)');
        console.log('   2. You\'re on http://localhost:3000');
        console.log('   3. The page has fully loaded');
        console.log('   4. Check browser console for any errors');
    }
}, 3000);
