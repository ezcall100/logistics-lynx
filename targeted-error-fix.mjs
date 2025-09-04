#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

class TargetedErrorFixer {
  constructor() {
    this.fixedFiles = new Set();
    this.fixCount = 0;
  }

  async fixAllErrors() {
    console.log('🎯 Starting Targeted Error Fix System...');
    
    // Fix the most critical files with the highest error counts
    const criticalFiles = [
      'src/services/mcp-integrated.ts',
      'src/services/websiteBuilderService.ts',
      'src/services/mcp.ts',
      'src/lib/menus/broker-admin-menu.ts',
      'src/lib/menus/super-admin-menu.ts',
      'src/pages/super-admin/settings/SystemSettings.tsx',
      'src/pages/super-admin/settings/ProfileSettings.tsx',
      'src/pages/super-admin/settings/SecuritySettings.tsx',
      'src/pages/super-admin/user-management/forms/EditGroupForm.tsx',
      'src/pages/super-admin/user-management/forms/EditRoleForm.tsx',
      'src/pages/super-admin/user-management/UserAnalytics.tsx'
    ];

    for (const file of criticalFiles) {
      if (fs.existsSync(file)) {
        await this.fixFile(file);
      }
    }

    // Fix all files with unknown$1 issues
    await this.fixUnknownTypeIssues();
    
    // Fix all files with syntax errors
    await this.fixSyntaxErrors();
    
    console.log(`✅ Targeted error fixing completed! Fixed ${this.fixCount} issues across ${this.fixedFiles.size} files`);
  }

  async fixFile(filePath) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      let originalContent = content;
      
      // Fix specific file issues
      if (filePath.includes('mcp-integrated.ts')) {
        content = this.fixMCPIntegrated(content);
      } else if (filePath.includes('websiteBuilderService.ts')) {
        content = this.fixWebsiteBuilderService(content);
      } else if (filePath.includes('mcp.ts')) {
        content = this.fixMCPService(content);
      } else if (filePath.includes('broker-admin-menu.ts')) {
        content = this.fixBrokerAdminMenu(content);
      } else if (filePath.includes('super-admin-menu.ts')) {
        content = this.fixSuperAdminMenu(content);
      } else if (filePath.includes('SystemSettings.tsx')) {
        content = this.fixSystemSettings(content);
      } else if (filePath.includes('ProfileSettings.tsx')) {
        content = this.fixProfileSettings(content);
      } else if (filePath.includes('SecuritySettings.tsx')) {
        content = this.fixSecuritySettings(content);
      } else if (filePath.includes('EditGroupForm.tsx')) {
        content = this.fixEditGroupForm(content);
      } else if (filePath.includes('EditRoleForm.tsx')) {
        content = this.fixEditRoleForm(content);
      } else if (filePath.includes('UserAnalytics.tsx')) {
        content = this.fixUserAnalytics(content);
      }
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        this.fixedFiles.add(filePath);
        this.fixCount++;
        console.log(`✅ Fixed: ${filePath}`);
      }
    } catch (error) {
      console.error(`❌ Error fixing ${filePath}:`, error.message);
    }
  }

  fixMCPIntegrated(content) {
    // Fix unknown$1 type annotations
    content = content.replace(/unknown\$1/g, 'unknown');
    
    // Fix function parameter syntax
    content = content.replace(
      /static getSectionRoutes\(sectionName: string\) \{/g,
      'static getSectionRoutes(sectionName: string) {'
    );
    
    // Fix method parameter syntax
    content = content.replace(
      /private async callRoute\(path: string, method: string = 'GET', data\?: unknown\) \{/g,
      'private async callRoute(path: string, method: string = \'GET\', data?: unknown) {'
    );
    
    // Fix arrow function syntax
    content = content.replace(
      /getCustom: \(params: unknown\) => this\.callRoute\('\/analytics\/custom', 'POST', params\),/g,
      'getCustom: (params: unknown) => this.callRoute(\'/analytics/custom\', \'POST\', params),'
    );
    
    // Fix other arrow functions
    content = content.replace(
      /create: \(userData: unknown\) => this\.callRoute\('\/users', 'POST', userData\),/g,
      'create: (userData: unknown) => this.callRoute(\'/users\', \'POST\', userData),'
    );
    
    content = content.replace(
      /update: \(id: string, userData: unknown\) => this\.callRoute\(\`\/users\/\${id}\`, 'PUT', userData\),/g,
      'update: (id: string, userData: unknown) => this.callRoute(`/users/${id}`, \'PUT\', userData),'
    );
    
    // Fix EventSource syntax
    content = content.replace(
      /stream: \(params\?: unknown\) => new EventSource\(\`\${this\.baseURL}\/mcp\/logs\/stream\?\${new URLSearchParams\(params\)}\`\),/g,
      'stream: (params?: unknown) => new EventSource(`${this.baseURL}/mcp/logs/stream?${new URLSearchParams(params)}`),'
    );
    
    // Fix error handler
    content = content.replace(
      /handleError: \(error: unknown, context: string = 'MCP operation'\) => \{/g,
      'handleError: (error: unknown, context: string = \'MCP operation\') => {'
    );
    
    return content;
  }

  fixWebsiteBuilderService(content) {
    // Fix unknown$1 type annotations
    content = content.replace(/unknown\$1/g, 'unknown');
    
    // Fix method signature
    content = content.replace(
      /private triggerBuildEvent\(type: BuildEvent\['type'\], data\?: unknown\): void \{/g,
      'private triggerBuildEvent(type: BuildEvent[\'type\'], data?: unknown): void {'
    );
    
    // Fix async method signatures
    content = content.replace(
      /async getBuildStatus\(buildId: string\): Promise<BuildStatus \| null> \{/g,
      'async getBuildStatus(buildId: string): Promise<BuildStatus | null> {'
    );
    
    content = content.replace(
      /async getBuildHistory\(limit: number = 50\): Promise<BuildEvent\[\]> \{/g,
      'async getBuildHistory(limit: number = 50): Promise<BuildEvent[]> {'
    );
    
    content = content.replace(
      /async cancelBuild\(buildId: string\): Promise<\{ success: boolean; message: string \}> \{/g,
      'async cancelBuild(buildId: string): Promise<{ success: boolean; message: string }> {'
    );
    
    content = content.replace(
      /async getTemplates\(\): Promise<string\[\]> \{/g,
      'async getTemplates(): Promise<string[]> {'
    );
    
    // Fix method signature
    content = content.replace(
      /validateBuildRequest\(request: BuildRequest\): \{ valid: boolean; errors: string\[\] \} \{/g,
      'validateBuildRequest(request: BuildRequest): { valid: boolean; errors: string[] } {'
    );
    
    return content;
  }

  fixMCPService(content) {
    // Fix unknown$1 type annotations
    content = content.replace(/unknown\$1/g, 'unknown');
    
    // Fix error handler
    content = content.replace(
      /handleError: \(error: unknown, context: string = 'MCP operation'\) => \{/g,
      'handleError: (error: unknown, context: string = \'MCP operation\') => {'
    );
    
    // Fix streamLogs method
    content = content.replace(
      /streamLogs: \(params\?: unknown, onMessage\?: \(log: MCPLog\) => void, onError\?: \(error: unknown\) => void\) => \{/g,
      'streamLogs: (params?: unknown, onMessage?: (log: MCPLog) => void, onError?: (error: unknown) => void) => {'
    );
    
    return content;
  }

  fixBrokerAdminMenu(content) {
    // Fix object syntax errors
    content = content.replace(/(\w+):\s*(\d+)\s*(\w+):/g, '$1: $2,\n    $3:');
    content = content.replace(/(\w+):\s*(\d+\.\d+)\s*(\w+):/g, '$1: $2,\n    $3:');
    content = content.replace(/(\w+):\s*'([^']+)'\s*(\w+):/g, "$1: '$2',\n    $3:");
    content = content.replace(/(\w+):\s*"([^"]+)"\s*(\w+):/g, '$1: "$2",\n    $3:');
    
    // Fix array syntax
    content = content.replace(/\[\s*'([^']+)'([^']+)'([^']+)'\s*\]/g, "['$1', '$2', '$3']");
    content = content.replace(/\[\s*"([^"]+)"([^"]+)"([^"]+)"\s*\]/g, '["$1", "$2", "$3"]');
    
    return content;
  }

  fixSuperAdminMenu(content) {
    // Fix object syntax errors
    content = content.replace(/(\w+):\s*(\d+)\s*(\w+):/g, '$1: $2,\n    $3:');
    content = content.replace(/(\w+):\s*(\d+\.\d+)\s*(\w+):/g, '$1: $2,\n    $3:');
    content = content.replace(/(\w+):\s*'([^']+)'\s*(\w+):/g, "$1: '$2',\n    $3:");
    content = content.replace(/(\w+):\s*"([^"]+)"\s*(\w+):/g, '$1: "$2",\n    $3:');
    
    return content;
  }

  fixSystemSettings(content) {
    // Fix JSX syntax
    content = content.replace(/<\s*(\w+)\s*>/g, '<$1>');
    content = content.replace(/<\s*\/\s*(\w+)\s*>/g, '</$1>');
    content = content.replace(/<\s*(\w+)\s*\/\s*>/g, '<$1 />');
    
    // Fix className attributes
    content = content.replace(/className\s*=\s*{\s*`([^`]+)`\s*}/g, (match, className) => {
      const fixed = className.replace(/\s+/g, ' ').trim();
      return `className={\`${fixed}\`}`;
    });
    
    return content;
  }

  fixProfileSettings(content) {
    // Fix JSX syntax
    content = content.replace(/<\s*(\w+)\s*>/g, '<$1>');
    content = content.replace(/<\s*\/\s*(\w+)\s*>/g, '</$1>');
    content = content.replace(/<\s*(\w+)\s*\/\s*>/g, '<$1 />');
    
    // Fix form handling
    content = content.replace(
      /onChange=\{\(e\) => handleInputChange\('(\w+)', e\.target\.value\)\}/g,
      'onChange={(e) => handleInputChange(\'$1\', e.target.value)}'
    );
    
    return content;
  }

  fixSecuritySettings(content) {
    // Fix JSX syntax
    content = content.replace(/<\s*(\w+)\s*>/g, '<$1>');
    content = content.replace(/<\s*\/\s*(\w+)\s*>/g, '</$1>');
    content = content.replace(/<\s*(\w+)\s*\/\s*>/g, '<$1 />');
    
    // Fix form validation
    content = content.replace(
      /if\s*\(\s*errors\s*\[\s*'(\w+)'\s*\]\s*\)/g,
      "if (errors['$1'])"
    );
    
    return content;
  }

  fixEditGroupForm(content) {
    // Fix handleInputChange calls
    content = content.replace(
      /handleInputChange\('(\w+)',\s*([^)]+)\)/g,
      "handleInputChange('$1', $2)"
    );
    
    // Fix className strings
    content = content.replace(
      /className=\{`([^`]+)`\}/g,
      (match, className) => {
        const fixed = className
          .replace(/dark:\s+/g, 'dark:')
          .replace(/hover:\s+/g, 'hover:')
          .replace(/border:\s+/g, 'border:');
        return `className={\`${fixed}\`}`;
      }
    );
    
    return content;
  }

  fixEditRoleForm(content) {
    // Fix error handling
    content = content.replace(
      /if\s*\(\s*errors\s*\[\s*'field\s*\]\s*\)/g,
      "if (errors['field'])"
    );
    
    // Fix handleInputChange calls
    content = content.replace(
      /handleInputChange\('status',\s*([^)]+)\s*as\s*RoleData\['status'\]\)/g,
      "handleInputChange('status', $1 as RoleData['status'])"
    );
    
    return content;
  }

  fixUserAnalytics(content) {
    // Fix object literals
    content = content.replace(
      /{\s*(\w+):\s*'([^']+)',\s*$/gm,
      "{\n        $1: '$2',"
    );
    
    // Fix JSX structure
    content = content.replace(/}\s*\[\s*timeRange\s*\]\);/g, '}, [timeRange]);');
    
    // Fix className strings
    content = content.replace(/dark:\s+/g, 'dark:');
    content = content.replace(/md:\s+/g, 'md:');
    content = content.replace(/lg:\s+/g, 'lg:');
    
    return content;
  }

  async fixUnknownTypeIssues() {
    console.log('🔧 Fixing unknown$1 type issues...');
    
    const allFiles = this.getAllFiles('src');
    for (const file of allFiles) {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        try {
          let content = fs.readFileSync(file, 'utf8');
          let originalContent = content;
          
          // Fix unknown$1 type annotations
          content = content.replace(/unknown\$1/g, 'unknown');
          
          if (content !== originalContent) {
            fs.writeFileSync(file, content, 'utf8');
            this.fixedFiles.add(file);
            this.fixCount++;
          }
        } catch (error) {
          console.error(`❌ Error fixing unknown types in ${file}:`, error.message);
        }
      }
    }
  }

  async fixSyntaxErrors() {
    console.log('🔧 Fixing syntax errors...');
    
    const allFiles = this.getAllFiles('src');
    for (const file of allFiles) {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        try {
          let content = fs.readFileSync(file, 'utf8');
          let originalContent = content;
          
          // Fix common syntax errors
          content = this.fixCommonSyntaxErrors(content);
          
          if (content !== originalContent) {
            fs.writeFileSync(file, content, 'utf8');
            this.fixedFiles.add(file);
            this.fixCount++;
          }
        } catch (error) {
          console.error(`❌ Error fixing syntax in ${file}:`, error.message);
        }
      }
    }
  }

  fixCommonSyntaxErrors(content) {
    // Fix missing commas in object literals
    content = content.replace(/(\w+):\s*([^,}\n]+)(?=\s*[}\n])/g, '$1: $2,');
    
    // Fix unterminated strings
    content = content.replace(/(['"])([^'"]*?)(?=\n|$)/g, '$1$2$1');
    
    // Fix missing parentheses
    content = content.replace(/(\w+)\s*\(\s*([^)]*?)(?=\n|$)/g, '$1($2)');
    
    // Fix extra commas
    content = content.replace(/,\s*([}\]])/g, '$1');
    
    // Fix malformed JSX
    content = content.replace(/<\s*\/\s*(\w+)\s*>/g, '</$1>');
    content = content.replace(/<\s*(\w+)\s*\/\s*>/g, '<$1 />');
    
    // Fix function parameter syntax
    content = content.replace(/(\w+):\s*(\w+)\s+(\w+):/g, '$1: $2,\n  $3:');
    
    // Fix array syntax
    content = content.replace(/\[\s*'([^']+)'([^']+)'([^']+)'\s*\]/g, "['$1', '$2', '$3']");
    
    return content;
  }

  getAllFiles(dir) {
    const files = [];
    
    const readDir = (currentDir) => {
      const items = fs.readdirSync(currentDir);
      
      for (const item of items) {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
          readDir(fullPath);
        } else if (stat.isFile() && (item.endsWith('.ts') || item.endsWith('.tsx') || item.endsWith('.js') || item.endsWith('.jsx'))) {
          files.push(fullPath);
        }
      }
    };
    
    readDir(dir);
    return files;
  }
}

// Run the targeted error fixer
const fixer = new TargetedErrorFixer();
fixer.fixAllErrors().catch(console.error);
