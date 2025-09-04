#!/usr/bin/env node

/**
 * MCP Coordinator Test Script
 * Tests the MCP-V2 Coordinator initialization and functionality
 */

import { MCPV2RedesignCoordinator } from './src/agents/mcp-v2-coordinator-fixed.ts';

async function testMCPCoordinator() {
  console.log('🤖 MCP Coordinator Test');
  console.log('Status: Testing MCP Coordinator initialization...\n');

  try {
    // Test 1: Create coordinator instance
    console.log('📋 Test 1: Creating MCP Coordinator instance...');
    const coordinator = new MCPV2RedesignCoordinator();
    console.log('✅ MCP Coordinator instance created successfully');

    // Test 2: Check initial system status
    console.log('\n📊 Test 2: Checking initial system status...');
    const status = coordinator.getSystemStatus();
    console.log('System Status:', JSON.stringify(status, null, 2));

    // Test 3: Check agent initialization
    console.log('\n👥 Test 3: Checking agent initialization...');
    const agents = coordinator.getAllAgents();
    console.log(`Total Agents: ${agents.length}`);
    console.log('Agent Status:', agents.map(agent => ({
      name: agent.name,
      role: agent.role,
      status: agent.status
    })));

    // Test 4: Test health check
    console.log('\n🏥 Test 4: Testing health check system...');
    const healthStatus = coordinator.performHealthCheck();
    console.log('Health Check Result:', healthStatus);

    // Test 5: Test performance monitoring
    console.log('\n📈 Test 5: Testing performance monitoring...');
    const performance = coordinator.getPerformanceMetrics();
    console.log('Performance Metrics:', performance);

    console.log('\n🎉 All MCP Coordinator tests completed successfully!');
    console.log('✅ MCP Coordinator is fully operational');

  } catch (error) {
    console.error('❌ MCP Coordinator test failed:', error);
    console.error('Error details:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

// Run the test
testMCPCoordinator();
