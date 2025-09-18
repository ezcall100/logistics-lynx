#!/usr/bin/env node

/**
 * Comprehensive Portal Fix Script
 * Fixes common structural issues in portal files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ComprehensivePortalFixer {
  constructor() {
    this.projectRoot = process.cwd();
    this.fixesApplied = 0;
    this.filesProcessed = 0;
  }

  /**
   * Fix all portal files
   */
  async fixAllPortals() {
    console.log('🔧 Starting comprehensive portal fixes...');
    
    const portalDir = path.join(this.projectRoot, 'src/pages/portals');
    const portalFiles = this.getAllPortalFiles(portalDir);
    
    for (const file of portalFiles) {
      await this.fixPortalFile(file);
    }
    
    console.log(`✅ Portal fixes complete. Processed ${this.filesProcessed} files, applied ${this.fixesApplied} fixes.`);
  }

  /**
   * Get all portal files
   */
  getAllPortalFiles(dir) {
    let files = [];
    
    if (!fs.existsSync(dir)) {
      return files;
    }
    
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        files = files.concat(this.getAllPortalFiles(fullPath));
      } else if (item.endsWith('.tsx') && item.includes('Portal')) {
        files.push(fullPath);
      }
    }
    
    return files;
  }

  /**
   * Fix a single portal file
   */
  async fixPortalFile(filePath) {
    try {
      console.log(`🔧 Fixing ${path.relative(this.projectRoot, filePath)}`);
      
      let content = fs.readFileSync(filePath, 'utf8');
      let modified = false;
      
      // Fix 1: aria-label placement in onClick handlers
      const ariaLabelFix = this.fixAriaLabelPlacement(content);
      if (ariaLabelFix.fixed) {
        content = ariaLabelFix.content;
        modified = true;
        this.fixesApplied++;
      }
      
      // Fix 2: Missing ErrorBoundary closing tags
      const errorBoundaryFix = this.fixErrorBoundaryTags(content);
      if (errorBoundaryFix.fixed) {
        content = errorBoundaryFix.content;
        modified = true;
        this.fixesApplied++;
      }
      
      // Fix 3: Missing React imports
      const reactImportFix = this.fixReactImports(content);
      if (reactImportFix.fixed) {
        content = reactImportFix.content;
        modified = true;
        this.fixesApplied++;
      }
      
      // Fix 4: Export syntax issues
      const exportFix = this.fixExportSyntax(content);
      if (exportFix.fixed) {
        content = exportFix.content;
        modified = true;
        this.fixesApplied++;
      }
      
      if (modified) {
        // Create backup
        const backupPath = filePath + '.backup';
        fs.writeFileSync(backupPath, fs.readFileSync(filePath));
        
        // Write fixed content
        fs.writeFileSync(filePath, content);
        console.log(`  ✅ Fixed ${path.relative(this.projectRoot, filePath)}`);
      }
      
      this.filesProcessed++;
      
    } catch (error) {
      console.error(`❌ Error fixing ${filePath}:`, error.message);
    }
  }

  /**
   * Fix aria-label placement in onClick handlers
   */
  fixAriaLabelPlacement(content) {
    // Pattern: aria-label="Button" in the middle of onClick function
    const pattern = /onClick=\{\(\) => \{\s*if \([^}]+\) \{\s*[^}]+\s*\}\s*aria-label="Button"\s*else \{/g;
    
    if (pattern.test(content)) {
      const fixed = content.replace(pattern, (match) => {
        return match.replace(/\s*aria-label="Button"\s*/, ' } else {');
      });
      return { fixed: true, content: fixed };
    }
    
    return { fixed: false, content };
  }

  /**
   * Fix ErrorBoundary closing tags
   */
  fixErrorBoundaryTags(content) {
    // Look for unclosed ErrorBoundary tags
    const errorBoundaryPattern = /<ErrorBoundary[^>]*>/g;
    const closingPattern = /<\/ErrorBoundary>/g;
    
    const openingMatches = content.match(errorBoundaryPattern) || [];
    const closingMatches = content.match(closingPattern) || [];
    
    if (openingMatches.length > closingMatches.length) {
      // Add missing closing tags
      const missingTags = openingMatches.length - closingMatches.length;
      let fixed = content;
      
      for (let i = 0; i < missingTags; i++) {
        fixed += '\n    </ErrorBoundary>';
      }
      
      return { fixed: true, content: fixed };
    }
    
    return { fixed: false, content };
  }

  /**
   * Fix React imports
   */
  fixReactImports(content) {
    // Check if React is used but not imported
    const usesReact = /React\.memo|React\.FC|React\.ReactNode/.test(content);
    const hasReactImport = /import.*React.*from.*['"]react['"]/.test(content);
    
    if (usesReact && !hasReactImport) {
      // Add React import at the top
      const importLine = "import * as React from 'react';\n";
      const lines = content.split('\n');
      
      // Find the first import line
      let insertIndex = 0;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('import ')) {
          insertIndex = i;
          break;
        }
      }
      
      lines.splice(insertIndex, 0, importLine);
      return { fixed: true, content: lines.join('\n') };
    }
    
    return { fixed: false, content };
  }

  /**
   * Fix export syntax issues
   */
  fixExportSyntax(content) {
    // Check for React.memo without proper closing
    const memoPattern = /const \w+ = React\.memo\(function \w+\(\) \{/;
    const closingPattern = /^\s*\}\);\s*$/m;
    
    if (memoPattern.test(content) && !closingPattern.test(content)) {
      // Fix the closing syntax
      const fixed = content.replace(/^\s*\}\s*$/, '  );');
      return { fixed: true, content: fixed };
    }
    
    return { fixed: false, content };
  }

  /**
   * Clean up backup files
   */
  cleanupBackups() {
    console.log('🧹 Cleaning up backup files...');
    
    const portalDir = path.join(this.projectRoot, 'src/pages/portals');
    const backupFiles = this.getAllBackupFiles(portalDir);
    
    for (const backupFile of backupFiles) {
      fs.unlinkSync(backupFile);
      console.log(`🗑️  Removed backup: ${path.relative(this.projectRoot, backupFile)}`);
    }
  }

  /**
   * Get all backup files
   */
  getAllBackupFiles(dir) {
    let files = [];
    
    if (!fs.existsSync(dir)) {
      return files;
    }
    
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        files = files.concat(this.getAllBackupFiles(fullPath));
      } else if (item.endsWith('.backup')) {
        files.push(fullPath);
      }
    }
    
    return files;
  }
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const fixer = new ComprehensivePortalFixer();
  
  fixer.fixAllPortals()
    .then(() => {
      // Clean up backups after successful fixes
      fixer.cleanupBackups();
    })
    .catch(console.error);
}

export default ComprehensivePortalFixer;
