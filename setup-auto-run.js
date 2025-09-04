#!/usr/bin/env node

/**
 * MCP Auto-Run Configuration Setup Script
 * This script helps configure auto-run settings for AI agents in your development environment
 */

import fs from 'fs';
import path from 'path';

console.log('🚀 MCP Auto-Run Configuration Setup');
console.log('=====================================\n');

// Check if we're in the right directory
if (!fs.existsSync('mcp.portals.json')) {
  console.error('❌ Error: mcp.portals.json not found. Please run this script from your project root.');
  process.exit(1);
}

// Load existing MCP configuration
const mcpConfig = JSON.parse(fs.readFileSync('mcp.portals.json', 'utf8'));
const autoRunConfig = JSON.parse(fs.readFileSync('mcp-auto-run-config.json', 'utf8'));

console.log('✅ Found existing MCP configuration:');
console.log(`   - Portals: ${mcpConfig.portals.length}`);
mcpConfig.portals.forEach(portal => {
  console.log(`     • ${portal.id} (${portal.root})`);
});

console.log('\n📋 Auto-Run Configuration Summary:');
console.log('=====================================');

// Display current auto-run settings
const globalSettings = autoRunConfig.mcpAutoRunConfig.globalSettings;

console.log('\n🔧 Global Auto-Run Modes:');
Object.entries(globalSettings.autoRunModes).forEach(([mode, config]) => {
  const status = config.enabled ? '✅ Enabled' : '❌ Disabled';
  console.log(`   ${mode.toUpperCase()}: ${status} - ${config.description}`);
});

console.log('\n🛡️ Security Settings:');
console.log(`   • Keep All Behavior: ${globalSettings.keepAllBehavior.enabled ? '✅ Enabled' : '❌ Disabled'}`);
console.log(`   • Auto Preview: ${globalSettings.keepAllBehavior.autoPreview ? '✅ Enabled' : '❌ Disabled'}`);
console.log(`   • Require Confirmation: ${globalSettings.keepAllBehavior.requireConfirmation ? '✅ Enabled' : '❌ Disabled'}`);

console.log('\n🤖 Autonomous Agents Integration:');
const autonomousConfig = autoRunConfig.mcpAutoRunConfig.workflowIntegration.autonomousAgents;
console.log(`   • Auto-Run: ${autonomousConfig.enabled ? '✅ Enabled' : '❌ Disabled'}`);
console.log(`   • Auto-Run Tools: ${autonomousConfig.autoRunTools.length} tools`);
console.log(`   • Require Confirmation: ${autonomousConfig.requireConfirmation.length} tools`);

console.log('\n📝 Next Steps:');
console.log('===============');
console.log('1. In your IDE (Cursor/VS Code):');
console.log('   • Open Command Palette: Ctrl+Shift+P (Windows) or Cmd+Shift+P (Mac)');
console.log('   • Search for "AI Agent Settings" or "MCP Configuration"');
console.log('   • Enable "Auto-run" mode');
console.log('   • Select "Agent mode" from the AI chat dropdown');

console.log('\n2. For Chat Interface:');
console.log('   • Open AI chat: Ctrl+Alt+I (common shortcut)');
console.log('   • Select "Agent mode" from dropdown');
console.log('   • Click "Tools" button');
console.log('   • Enable "Auto-run" toggle');

console.log('\n3. Test Configuration:');
console.log('   • Try a simple search: "Find all React components"');
console.log('   • Check if tools run automatically');
console.log('   • Verify "Keep All" button appears for multiple changes');

console.log('\n4. Customize Settings:');
console.log('   • Edit mcp-auto-run-config.json for custom rules');
console.log('   • Adjust tool permissions per portal');
console.log('   • Configure security restrictions');

console.log('\n🔍 Available Tools for Auto-Run:');
console.log('================================');
const tools = [
  'file_search',
  'codebase_search', 
  'read_file',
  'list_dir',
  'grep_search',
  'edit_file',
  'delete_file',
  'run_terminal_cmd',
  'search_replace'
];

tools.forEach(tool => {
  const isAutoRun = globalSettings.autoRunModes.development.tools.includes(tool);
  const status = isAutoRun ? '✅ Auto-run' : '⚠️  Confirmation required';
  console.log(`   • ${tool}: ${status}`);
});

console.log('\n⚠️  Security Notes:');
console.log('==================');
console.log('• File modifications require confirmation by default');
console.log('• Terminal commands are restricted for safety');
console.log('• Production mode has stricter auto-run limitations');
console.log('• Always review changes before accepting');

console.log('\n✅ Setup complete! Your MCP auto-run configuration is ready.');
console.log('   Refer to AI_AGENT_CONFIGURATION_GUIDE.md for detailed instructions.');

// Create a quick reference file
const quickRef = `# Quick Reference: MCP Auto-Run

## Enable Auto-Run
1. Open AI chat (Ctrl+Alt+I)
2. Select "Agent mode" 
3. Enable "Auto-run" toggle

## Use "Keep All"
- Appears when AI suggests multiple changes
- Click "Save All" to apply all changes
- Always review diff view first

## Current Configuration
- Development Mode: ✅ Enabled
- Production Mode: ❌ Disabled (safety)
- Keep All: ✅ Enabled with confirmation
- Autonomous Agents: ✅ Enabled

## Security
- File edits require confirmation
- Terminal commands restricted
- Critical files protected
`;

fs.writeFileSync('MCP_AUTO_RUN_QUICK_REF.md', quickRef);
console.log('\n📄 Created MCP_AUTO_RUN_QUICK_REF.md for quick reference');
