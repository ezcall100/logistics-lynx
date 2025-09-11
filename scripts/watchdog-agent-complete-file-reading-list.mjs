#!/usr/bin/env node

/**
 * 🐕 WATCHDOG AGENT - COMPLETE PROJECT FILE READING LIST
 * =====================================================
 * 
 * This script provides a comprehensive list of all files that the Watchdog Agent
 * should read and then explain to all MCP 250 agents for complete project understanding.
 */

import fs from 'fs';
import path from 'path';

console.log(`
🐕 WATCHDOG AGENT - COMPLETE PROJECT FILE READING LIST
=====================================================

📋 INSTRUCTIONS FOR WATCHDOG AGENT:
1. Read ALL files listed below
2. Analyze and understand the complete project structure
3. Create a comprehensive briefing for all MCP 250 agents
4. Ensure all agents understand the 360-degree integration system
5. Verify all portals have proper MCP agent access

🌐 COMPLETE PROJECT FILE LIST FOR WATCHDOG AGENT:
`);

// Function to get all relevant files
function getAllProjectFiles() {
  const files = [];
  const extensions = ['.tsx', '.ts', '.js', '.mjs', '.json', '.md', '.css', '.html'];
  const excludeDirs = ['node_modules', '.git', 'dist', 'build', '.next'];
  
  function scanDirectory(dir, relativePath = '') {
    try {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const relativeItemPath = path.join(relativePath, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          if (!excludeDirs.includes(item)) {
            scanDirectory(fullPath, relativeItemPath);
          }
        } else if (stat.isFile()) {
          const ext = path.extname(item);
          if (extensions.includes(ext)) {
            files.push(relativeItemPath);
          }
        }
      }
    } catch (error) {
      console.log(`⚠️  Could not scan directory: ${dir}`);
    }
  }
  
  scanDirectory('.');
  return files.sort();
}

// Get all project files
const allFiles = getAllProjectFiles();

// Categorize files by importance and type
const fileCategories = {
  // CRITICAL - Core System Files
  critical: [
    'package.json',
    'vite.config.ts',
    'tsconfig.json',
    'tailwind.config.js',
    'src/App.tsx',
    'src/main.tsx',
    'src/index.css',
    'mcp-server/package.json',
    'mcp-server/vite.config.ts',
    'mcp-server/src/MCPProgressDashboard.tsx',
    'server/mcp-server.js',
    'portal-app/package.json',
    'portal-app/vite.config.ts'
  ],
  
  // ESSENTIAL - Portal Components
  portals: allFiles.filter(file => 
    file.includes('src/pages/portals/') && 
    (file.endsWith('.tsx') || file.endsWith('.ts'))
  ),
  
  // ESSENTIAL - Core Components
  components: allFiles.filter(file => 
    file.includes('src/components/') && 
    (file.endsWith('.tsx') || file.endsWith('.ts'))
  ),
  
  // ESSENTIAL - Utilities and Systems
  utilities: allFiles.filter(file => 
    file.includes('src/utils/') && 
    (file.endsWith('.tsx') || file.endsWith('.ts'))
  ),
  
  // ESSENTIAL - MCP System Files
  mcpSystem: allFiles.filter(file => 
    file.includes('mcp-server/') && 
    (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.js'))
  ),
  
  // ESSENTIAL - Scripts and Automation
  scripts: allFiles.filter(file => 
    file.includes('scripts/') && 
    (file.endsWith('.mjs') || file.endsWith('.js'))
  ),
  
  // IMPORTANT - Documentation
  documentation: allFiles.filter(file => 
    file.endsWith('.md') && 
    !file.includes('node_modules')
  ),
  
  // IMPORTANT - Configuration Files
  config: allFiles.filter(file => 
    (file.endsWith('.json') || file.endsWith('.js') || file.endsWith('.ts')) &&
    (file.includes('config') || file.includes('vite') || file.includes('tailwind') || file.includes('eslint'))
  ),
  
  // SUPPORTING - Other Files
  supporting: allFiles.filter(file => 
    !file.includes('src/pages/portals/') &&
    !file.includes('src/components/') &&
    !file.includes('src/utils/') &&
    !file.includes('mcp-server/') &&
    !file.includes('scripts/') &&
    !file.endsWith('.md') &&
    !file.includes('config') &&
    !file.includes('vite') &&
    !file.includes('tailwind') &&
    !file.includes('eslint') &&
    !file.includes('package.json') &&
    !file.includes('tsconfig.json') &&
    !file.includes('src/App.tsx') &&
    !file.includes('src/main.tsx') &&
    !file.includes('src/index.css') &&
    !file.includes('server/mcp-server.js')
  )
};

// Display categorized file list
console.log(`
🔥 CRITICAL FILES (Must Read First):
====================================
${fileCategories.critical.map(file => `📄 ${file}`).join('\n')}

🌐 PORTAL COMPONENTS (34 Portals):
==================================
${fileCategories.portals.map(file => `📄 ${file}`).join('\n')}

🧩 CORE COMPONENTS:
==================
${fileCategories.components.map(file => `📄 ${file}`).join('\n')}

⚙️ UTILITIES & SYSTEMS:
=======================
${fileCategories.utilities.map(file => `📄 ${file}`).join('\n')}

🤖 MCP SYSTEM FILES:
====================
${fileCategories.mcpSystem.map(file => `📄 ${file}`).join('\n')}

🔧 SCRIPTS & AUTOMATION:
========================
${fileCategories.scripts.map(file => `📄 ${file}`).join('\n')}

📚 DOCUMENTATION:
=================
${fileCategories.documentation.map(file => `📄 ${file}`).join('\n')}

⚙️ CONFIGURATION FILES:
=======================
${fileCategories.config.map(file => `📄 ${file}`).join('\n')}

🔧 SUPPORTING FILES:
====================
${fileCategories.supporting.map(file => `📄 ${file}`).join('\n')}

📊 FILE STATISTICS:
===================
🔥 Critical Files: ${fileCategories.critical.length}
🌐 Portal Components: ${fileCategories.portals.length}
🧩 Core Components: ${fileCategories.components.length}
⚙️ Utilities & Systems: ${fileCategories.utilities.length}
🤖 MCP System Files: ${fileCategories.mcpSystem.length}
🔧 Scripts & Automation: ${fileCategories.scripts.length}
📚 Documentation: ${fileCategories.documentation.length}
⚙️ Configuration Files: ${fileCategories.config.length}
🔧 Supporting Files: ${fileCategories.supporting.length}
📊 TOTAL FILES: ${allFiles.length}

🐕 WATCHDOG AGENT BRIEFING INSTRUCTIONS:
========================================

1. **READING PRIORITY ORDER:**
   ✅ Start with CRITICAL files (system configuration)
   ✅ Then read PORTAL COMPONENTS (all 34 portals)
   ✅ Then read CORE COMPONENTS (shared UI components)
   ✅ Then read UTILITIES & SYSTEMS (360-degree integration)
   ✅ Then read MCP SYSTEM FILES (dashboard and monitoring)
   ✅ Then read SCRIPTS & AUTOMATION (deployment scripts)
   ✅ Then read DOCUMENTATION (project understanding)
   ✅ Finally read CONFIGURATION and SUPPORTING files

2. **KEY FOCUS AREAS:**
   🎯 360-degree integration system implementation
   🎯 Portal component structure and functionality
   🎯 MCP agent communication and monitoring
   🎯 Real-time updates and data flow
   🎯 Enterprise design patterns and UI components
   🎯 Authentication and security implementations
   🎯 Mobile responsiveness and accessibility
   🎯 Performance optimization techniques

3. **BRIEFING REQUIREMENTS:**
   📋 Create comprehensive summary of project architecture
   📋 Explain 360-degree integration system to all agents
   📋 Detail portal-specific implementations and features
   📋 Document MCP agent capabilities and limitations
   📋 Provide guidelines for future development
   📋 Ensure all agents understand enterprise standards

4. **VERIFICATION CHECKLIST:**
   ✅ All 34 portals have 360-degree integration
   ✅ MCP agents can access all portal components
   ✅ Real-time monitoring is functional
   ✅ Enterprise design standards are implemented
   ✅ Mobile responsiveness is maintained
   ✅ Security and authentication are properly configured

🐕 WATCHDOG AGENT: READ ALL FILES AND BRIEF ALL MCP 250 AGENTS!
`);

// Create a detailed file list for the Watchdog Agent
const watchdogFileList = `
# WATCHDOG AGENT - COMPLETE FILE READING LIST

## CRITICAL FILES (Read First)
${fileCategories.critical.map(file => `- ${file}`).join('\n')}

## PORTAL COMPONENTS (34 Portals)
${fileCategories.portals.map(file => `- ${file}`).join('\n')}

## CORE COMPONENTS
${fileCategories.components.map(file => `- ${file}`).join('\n')}

## UTILITIES & SYSTEMS
${fileCategories.utilities.map(file => `- ${file}`).join('\n')}

## MCP SYSTEM FILES
${fileCategories.mcpSystem.map(file => `- ${file}`).join('\n')}

## SCRIPTS & AUTOMATION
${fileCategories.scripts.map(file => `- ${file}`).join('\n')}

## DOCUMENTATION
${fileCategories.documentation.map(file => `- ${file}`).join('\n')}

## CONFIGURATION FILES
${fileCategories.config.map(file => `- ${file}`).join('\n')}

## SUPPORTING FILES
${fileCategories.supporting.map(file => `- ${file}`).join('\n')}

## TOTAL FILES: ${allFiles.length}
`;

// Write the file list to a markdown file
fs.writeFileSync('WATCHDOG_AGENT_FILE_LIST.md', watchdogFileList);

console.log(`
✅ WATCHDOG AGENT FILE LIST CREATED: WATCHDOG_AGENT_FILE_LIST.md
📊 Total files to read: ${allFiles.length}
🎯 Priority: Start with critical files, then portals, then components
🤖 Mission: Brief all MCP 250 agents on complete project understanding
`);

export default { fileCategories, allFiles };
