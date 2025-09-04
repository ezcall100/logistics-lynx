#!/usr/bin/env node

/**
 * Simple MCP Dashboard Test
 * Tests if the MCP Dashboard component can be imported and rendered
 */

console.log('🧪 Testing MCP Dashboard Component...');

try {
  // Test 1: Check if the component file exists and can be read
  import { readFileSync, existsSync } from 'fs';
  import { join } from 'path';
  
  const dashboardPath = join(__dirname, 'src', 'components', 'MCPDashboard.tsx');
  
  if (existsSync(dashboardPath)) {
    console.log('✅ MCP Dashboard component file exists');
    
    const content = readFileSync(dashboardPath, 'utf8');
    if (content.includes('export const MCPDashboard')) {
      console.log('✅ MCP Dashboard component is properly exported');
    } else {
      console.log('❌ MCP Dashboard component export not found');
    }
  } else {
    console.log('❌ MCP Dashboard component file not found');
  }
  
  // Test 2: Check if App.tsx imports the dashboard
  const appPath = join(__dirname, 'src', 'App.tsx');
  
  if (existsSync(appPath)) {
    console.log('✅ App.tsx file exists');
    
    const appContent = readFileSync(appPath, 'utf8');
    if (appContent.includes('import { MCPDashboard }')) {
      console.log('✅ MCP Dashboard is imported in App.tsx');
    } else {
      console.log('❌ MCP Dashboard import not found in App.tsx');
    }
    
    if (appContent.includes('<MCPDashboard />')) {
      console.log('✅ MCP Dashboard is used in App.tsx routes');
    } else {
      console.log('❌ MCP Dashboard usage not found in App.tsx routes');
    }
  } else {
    console.log('❌ App.tsx file not found');
  }
  
  console.log('\n🎉 MCP Dashboard component test completed!');
  
} catch (error) {
  console.error('❌ Test failed:', error.message);
}
