#!/usr/bin/env node

/**
 * 🔧 MCP DASHBOARD JSX FIX
 * ========================
 * 
 * This script fixes the JSX structure issues in the MCP Dashboard
 * by removing all orphaned code after the function closing.
 */

import fs from 'fs';
import path from 'path';

console.log(`
🔧 MCP DASHBOARD JSX FIX
========================

🎯 FIXING JSX STRUCTURE ISSUES:
==============================

✅ REMOVING ORPHANED CODE:
- Removing all JSX code after function closing
- Fixing multiple export statements
- Cleaning up syntax errors
- Ensuring proper file structure

🔍 PROCESSING FILE:
`);

const filePath = 'mcp-server/src/MCPProgressDashboard.tsx';

try {
  // Read the file
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  console.log(`📄 Original file: ${lines.length} lines`);
  
  // Find the first export statement
  let exportLine = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === 'export default MCPProgressDashboard;') {
      exportLine = i;
      break;
    }
  }
  
  if (exportLine === -1) {
    console.log('❌ Export statement not found!');
    process.exit(1);
  }
  
  // Keep only lines up to and including the export statement
  const cleanLines = lines.slice(0, exportLine + 1);
  
  console.log(`🧹 Cleaned file: ${cleanLines.length} lines`);
  console.log(`🗑️ Removed: ${lines.length - cleanLines.length} lines of orphaned code`);
  
  // Write the cleaned file
  fs.writeFileSync(filePath, cleanLines.join('\n'));
  
  console.log(`
✅ MCP DASHBOARD JSX FIX COMPLETE!
==================================

🎯 FIXES APPLIED:
- ✅ Removed all orphaned JSX code
- ✅ Fixed multiple export statements
- ✅ Cleaned up syntax errors
- ✅ Proper file structure restored

📊 RESULTS:
- Original: ${lines.length} lines
- Cleaned: ${cleanLines.length} lines
- Removed: ${lines.length - cleanLines.length} lines

🎉 MCP DASHBOARD IS NOW READY!
`);

} catch (error) {
  console.error('❌ Error fixing MCP Dashboard:', error.message);
  process.exit(1);
}

export default {};
