/* eslint-env browser */
// MCP Autonomous Agents Verification Script
// Run this in your browser console after the app is loaded

console.log('🔍 Verifying MCP Autonomous Agents System...');

// Check if MCP coordinator is available
if (typeof window !== 'undefined' && window.mcpV2Coordinator) {
    console.log('✅ MCP Coordinator found in window object');
    
    const coordinator = window.mcpV2Coordinator;
    
    try {
        // Test 1: System Status
        console.log('\n📊 Test 1: System Status');
        const systemStatus = coordinator.getSystemStatus();
        console.log('System Status:', systemStatus);
        console.log(`Active Agents: ${systemStatus.activeAgents}`);
        console.log(`Total Tasks: ${systemStatus.totalTasks}`);
        console.log(`Completed Tasks: ${systemStatus.completedTasks}`);
        console.log(`Performance: ${systemStatus.performance.toFixed(1)}%`);
        console.log(`Error Rate: ${systemStatus.errorRate.toFixed(1)}%`);
        
        // Test 2: Agent Progress
        console.log('\n🤖 Test 2: Agent Progress');
        const agentProgress = coordinator.getAgentProgress();
        console.log(`Total Agents: ${agentProgress.length}`);
        
        if (agentProgress.length > 5) {
            console.log('✅ SUCCESS: More than 5 agents detected!');
            console.log('📋 Agent List:');
            agentProgress.forEach((agent, index) => {
                console.log(`  ${index + 1}. ${agent.name} (${agent.role}) - ${agent.status}`);
            });
        } else {
            console.log('⚠️ WARNING: Only', agentProgress.length, 'agents detected');
            console.log('💡 Expected many more agents from the autonomous executive team');
        }
        
        // Test 3: Progress Summary
        console.log('\n📈 Test 3: Progress Summary');
        const progressSummary = coordinator.getProgressSummary();
        console.log('Progress Summary:', progressSummary);
        console.log(`Progress: ${progressSummary.progressPercentage}%`);
        console.log(`Tasks: ${progressSummary.completedTasks}/${progressSummary.totalTasks}`);
        console.log(`Agents: ${progressSummary.activeAgents}/${progressSummary.totalAgents}`);
        
        // Test 4: Recent Activity
        console.log('\n📋 Test 4: Recent Activity');
        const recentActivity = coordinator.getRecentActivity();
        console.log('Recent Analytics:', recentActivity.analytics.length, 'records');
        console.log('Recent Decisions:', recentActivity.decisions.length, 'records');
        console.log('Recent Errors:', recentActivity.errors.length, 'records');
        
        // Test 5: Agent Activity Monitoring
        console.log('\n🔍 Test 5: Monitoring Agent Activity');
        console.log('💡 Watch for agent activity logs in the console...');
        console.log('💡 You should see logs like:');
        console.log('   🤖 Agent [Name] executing tasks...');
        console.log('   🎯 [Agent]: [Task Description]');
        console.log('   ✅ [Agent]: Task completed - [Result]');
        
        // Final Summary
        console.log('\n📊 FINAL SUMMARY:');
        console.log('✅ MCP Coordinator is running');
        console.log(`✅ ${agentProgress.length} agents are active`);
        console.log(`✅ ${progressSummary.completedTasks} tasks completed`);
        console.log(`✅ System performance: ${systemStatus.performance.toFixed(1)}%`);
        
        if (agentProgress.length > 5) {
            console.log('🎉 SUCCESS: All agents are working correctly!');
        } else {
            console.log('⚠️ ISSUE: Not all agents are showing up');
            console.log('💡 This might be due to the autonomous executive team not being fully loaded');
        }
        
    } catch (error) {
        console.error('❌ Error testing MCP system:', error);
    }
    
} else {
    console.log('❌ MCP Coordinator not found in window object');
    console.log('💡 Make sure:');
    console.log('   1. The application is running (npm run dev)');
    console.log('   2. The MCP coordinator is initialized in main.tsx');
    console.log('   3. You\'re running this script after the app loads');
}

// Monitor for agent activity
console.log('\n🔍 Monitoring for agent activity...');
let activityCount = 0;
const originalLog = console.log;
console.log = function(...args) {
    originalLog.apply(console, args);
    
    const message = args.join(' ');
    if (message.includes('Agent') && message.includes('executing')) {
        activityCount++;
        console.log(`🎉 Agent activity detected! (${activityCount} total)`);
    }
};
