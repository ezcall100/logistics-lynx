import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Targeted TypeScript Fix System
class TargetedTSFixer {
  constructor() {
    this.fixedFiles = new Set();
  }

  async fixAllErrors() {
    console.log('🚀 Starting targeted TypeScript fix system...');
    
    // Get all TypeScript files
    const files = this.getAllFiles('./src', ['.ts', '.tsx']);
    console.log(`📁 Found ${files.length} TypeScript files to process`);
    
    let totalFixed = 0;
    
    for (const file of files) {
      try {
        const fixed = await this.fixFile(file);
        if (fixed) {
          totalFixed++;
          console.log(`✅ Fixed: ${file}`);
        }
      } catch (error) {
        console.error(`❌ Error fixing ${file}:`, error.message);
      }
    }
    
    console.log(`🎉 Targeted TS fix completed! Fixed ${totalFixed} files`);
    
    // Run build to check remaining errors
    console.log('🔍 Running build to check remaining errors...');
    try {
      execSync('npm run build', { stdio: 'inherit' });
    } catch (error) {
      console.log('⚠️ Some errors may remain, continuing with final fixes...');
    }
  }

  getAllFiles(dir, extensions) {
    const files = [];
    
    function traverse(currentDir) {
      const items = fs.readdirSync(currentDir);
      
      for (const item of items) {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          traverse(fullPath);
        } else if (extensions.some(ext => item.endsWith(ext))) {
          files.push(fullPath);
        }
      }
    }
    
    traverse(dir);
    return files;
  }

  async fixFile(filePath) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      let originalContent = content;
      
      // Apply targeted TypeScript fixes
      content = this.applyTSFixes(content, filePath);
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error.message);
      return false;
    }
  }

  applyTSFixes(content, filePath) {
    // Fix Record<string any> -> Record<string, any>
    content = content.replace(/Record<string\s+any>/g, 'Record<string, any>');
    content = content.replace(/Record<string\s+number>/g, 'Record<string, number>');
    content = content.replace(/Record<string\s+string>/g, 'Record<string, string>');
    content = content.replace(/Record<string\s+boolean>/g, 'Record<string, boolean>');
    content = content.replace(/Record<string\s+unknown>/g, 'Record<string, unknown>');
    
    // Fix Map<string Type> -> Map<string, Type>
    content = content.replace(/Map<string\s+(\w+)>/g, 'Map<string, $1>');
    
    // Fix Promise<Type> -> Promise<Type> (ensure proper spacing)
    content = content.replace(/Promise<(\w+)>/g, 'Promise<$1>');
    content = content.replace(/Promise<Array<(\w+)>>/g, 'Promise<Array<$1>>');
    content = content.replace(/Promise<Record<string,\s*(\w+)>>/g, 'Promise<Record<string, $1>>');
    
    // Fix Omit<Type, 'key'> -> Omit<Type, 'key'>
    content = content.replace(/Omit<(\w+)\s+'([^']+)'\s*>/g, "Omit<$1, '$2'>");
    content = content.replace(/Omit<(\w+)\s+'([^']+)'\s*\|\s*'([^']+)'\s*>/g, "Omit<$1, '$2' | '$3'>");
    content = content.replace(/Omit<(\w+)\s+'([^']+)'\s*\|\s*'([^']+)'\s*\|\s*'([^']+)'\s*>/g, "Omit<$1, '$2' | '$3' | '$4'>");
    
    // Fix Partial<Type> -> Partial<Type>
    content = content.replace(/Partial<(\w+)>/g, 'Partial<$1>');
    
    // Fix Array<Type> -> Array<Type>
    content = content.replace(/Array<(\w+)>/g, 'Array<$1>');
    
    // Fix specific file patterns
    if (filePath.includes('mcp.ts')) {
      content = this.fixMCPService(content);
    }
    
    if (filePath.includes('websiteBuilderService.ts')) {
      content = this.fixWebsiteBuilderService(content);
    }
    
    if (filePath.includes('ai-confidence.ts')) {
      content = this.fixAIConfidence(content);
    }
    
    if (filePath.includes('alerts.ts')) {
      content = this.fixAlerts(content);
    }
    
    if (filePath.includes('feature-flags.ts')) {
      content = this.fixFeatureFlags(content);
    }
    
    if (filePath.includes('market-research.ts')) {
      content = this.fixMarketResearch(content);
    }
    
    return content;
  }

  fixMCPService(content) {
    // Fix Record<string any> -> Record<string, any>
    content = content.replace(/Record<string\s+any>/g, 'Record<string, any>');
    
    // Fix Omit<MCPWorkflow 'id' | 'created_at' | 'updated_at'> -> Omit<MCPWorkflow, 'id' | 'created_at' | 'updated_at'>
    content = content.replace(/Omit<MCPWorkflow\s+'id'\s*\|\s*'created_at'\s*\|\s*'updated_at'>/g, "Omit<MCPWorkflow, 'id' | 'created_at' | 'updated_at'>");
    
    // Fix Record<string { status: string; message?: string }> -> Record<string, { status: string; message?: string }>
    content = content.replace(/Record<string\s*\{\s*status:\s*string;\s*message\?\:\s*string\s*\}>/g, 'Record<string, { status: string; message?: string }>');
    
    // Fix method declarations
    content = content.replace(/(\w+)\s*\(\s*\)\s*:\s*(\w+)\s*\{/g, '$1(): $2 {');
    content = content.replace(/(\w+)\s*\(\s*([^)]+)\s*\)\s*:\s*(\w+)\s*\{/g, '$1($2): $3 {');
    content = content.replace(/async\s+(\w+)\s*\(\s*\)\s*:\s*(\w+)\s*\{/g, 'async $1(): $2 {');
    content = content.replace(/async\s+(\w+)\s*\(\s*([^)]+)\s*\)\s*:\s*(\w+)\s*\{/g, 'async $1($2): $3 {');
    
    // Fix function parameters
    content = content.replace(/(\w+):\s*(\w+)\s+(\w+):/g, '$1: $2,\n  $3:');
    content = content.replace(/(\w+):\s*(\w+)\s+(\w+):\s*(\w+)/g, '$1: $2,\n  $3: $4');
    
    return content;
  }

  fixWebsiteBuilderService(content) {
    // Fix Record<string any> -> Record<string, any>
    content = content.replace(/Record<string\s+any>/g, 'Record<string, any>');
    
    // Fix Map<string BuildStatus> -> Map<string, BuildStatus>
    content = content.replace(/Map<string\s+BuildStatus>/g, 'Map<string, BuildStatus>');
    
    // Fix method declarations
    content = content.replace(/(\w+)\s*\(\s*\)\s*:\s*(\w+)\s*\{/g, '$1(): $2 {');
    content = content.replace(/(\w+)\s*\(\s*([^)]+)\s*\)\s*:\s*(\w+)\s*\{/g, '$1($2): $3 {');
    content = content.replace(/async\s+(\w+)\s*\(\s*\)\s*:\s*(\w+)\s*\{/g, 'async $1(): $2 {');
    content = content.replace(/async\s+(\w+)\s*\(\s*([^)]+)\s*\)\s*:\s*(\w+)\s*\{/g, 'async $1($2): $3 {');
    
    // Fix class properties
    content = content.replace(/private\s+(\w+)\s*:\s*(\w+)\s*=\s*(\w+)\s*\(\s*\)/g, 'private $1: $2 = new $3()');
    
    return content;
  }

  fixAIConfidence(content) {
    // Fix Record<string number> -> Record<string, number>
    content = content.replace(/Record<string\s+number>/g, 'Record<string, number>');
    content = content.replace(/Record<string\s+any>/g, 'Record<string, any>');
    
    return content;
  }

  fixAlerts(content) {
    // Fix Record<string any> -> Record<string, any>
    content = content.replace(/Record<string\s+any>/g, 'Record<string, any>');
    content = content.replace(/Record<string\s+number>/g, 'Record<string, number>');
    
    return content;
  }

  fixFeatureFlags(content) {
    // Fix Record<string any> -> Record<string, any>
    content = content.replace(/Record<string\s+any>/g, 'Record<string, any>');
    
    return content;
  }

  fixMarketResearch(content) {
    // Fix Record<string any> -> Record<string, any>
    content = content.replace(/Record<string\s+any>/g, 'Record<string, any>');
    content = content.replace(/Record<string\s+number>/g, 'Record<string, number>');
    
    return content;
  }
}

// Run the targeted fix
const fixer = new TargetedTSFixer();
fixer.fixAllErrors().then(() => {
  console.log('🎯 Targeted TypeScript fix completed!');
}).catch(error => {
  console.error('💥 Error in targeted fix:', error);
});
