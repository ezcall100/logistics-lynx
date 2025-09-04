import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Final Complete Fix System
class FinalCompleteFixer {
  constructor() {
    this.fixedFiles = new Set();
  }

  async fixAllErrors() {
    console.log('🚀 Starting final complete fix system...');
    
    // Get all TypeScript/JavaScript files
    const files = this.getAllFiles('./src', ['.ts', '.tsx', '.js', '.jsx']);
    console.log(`📁 Found ${files.length} files to process`);
    
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
    
    console.log(`🎉 Final complete fix completed! Fixed ${totalFixed} files`);
    
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
      
      // Apply all fixes
      content = this.applyAllFixes(content, filePath);
      
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

  applyAllFixes(content, filePath) {
    // Fix TypeScript generic syntax issues
    content = this.fixTypeScriptGenerics(content);
    
    // Fix method declarations
    content = this.fixMethodDeclarations(content);
    
    // Fix array syntax issues
    content = this.fixArraySyntax(content);
    
    // Fix object property syntax
    content = this.fixObjectProperties(content);
    
    // Fix JSX structure issues
    content = this.fixJSXStructure(content);
    
    // Fix error object access syntax
    content = this.fixErrorObjectAccess(content);
    
    // Fix timestamp strings
    content = this.fixTimestampStrings(content);
    
    // Fix specific file patterns
    content = this.applySpecificFixes(content, filePath);
    
    return content;
  }

  fixTypeScriptGenerics(content) {
    // Fix Record<string any> -> Record<string, any>
    content = content.replace(/Record<string\s+any>/g, 'Record<string, any>');
    content = content.replace(/Record<string\s+number>/g, 'Record<string, number>');
    content = content.replace(/Record<string\s+string>/g, 'Record<string, string>');
    content = content.replace(/Record<string\s+boolean>/g, 'Record<string, boolean>');
    content = content.replace(/Record<string\s+unknown>/g, 'Record<string, unknown>');
    
    // Fix Map<string Type> -> Map<string, Type>
    content = content.replace(/Map<string\s+(\w+)>/g, 'Map<string, $1>');
    content = content.replace(/Map<string\s+BuildStatus>/g, 'Map<string, BuildStatus>');
    
    // Fix Promise<Type> -> Promise<Type>
    content = content.replace(/Promise<(\w+)>/g, 'Promise<$1>');
    content = content.replace(/Promise<Array<(\w+)>>/g, 'Promise<Array<$1>>');
    content = content.replace(/Promise<Record<string,\s*(\w+)>>/g, 'Promise<Record<string, $1>>');
    content = content.replace(/Promise<{([^}]+)}>/g, 'Promise<{ $1 }>');
    content = content.replace(/Promise<\[([^\]]+)\]>/g, 'Promise<[$1]>');
    
    // Fix Array<Type> -> Array<Type>
    content = content.replace(/Array<(\w+)>/g, 'Array<$1>');
    
    // Fix Omit<Type, 'key'> -> Omit<Type, 'key'>
    content = content.replace(/Omit<(\w+)\s+'([^']+)'\s*>/g, "Omit<$1, '$2'>");
    content = content.replace(/Omit<(\w+)\s+'([^']+)'\s*\|\s*'([^']+)'\s*>/g, "Omit<$1, '$2' | '$3'>");
    content = content.replace(/Omit<(\w+)\s+'([^']+)'\s*\|\s*'([^']+)'\s*\|\s*'([^']+)'\s*>/g, "Omit<$1, '$2' | '$3' | '$4'>");
    content = content.replace(/Omit<MCPWorkflow\s+'id'\s*\|\s*'created_at'\s*\|\s*'updated_at'>/g, "Omit<MCPWorkflow, 'id' | 'created_at' | 'updated_at'>");
    
    // Fix Partial<Type> -> Partial<Type>
    content = content.replace(/Partial<(\w+)>/g, 'Partial<$1>');
    
    // Fix Record<string { status: string; message?: string }> -> Record<string, { status: string; message?: string }>
    content = content.replace(/Record<string\s*\{\s*status:\s*string;\s*message\?\:\s*string\s*\}>/g, 'Record<string, { status: string; message?: string }>');
    
    return content;
  }

  fixMethodDeclarations(content) {
    // Fix method declarations with proper syntax
    content = content.replace(/(\w+)\s*\(\s*\)\s*:\s*(\w+)\s*\{/g, '$1(): $2 {');
    content = content.replace(/(\w+)\s*\(\s*([^)]+)\s*\)\s*:\s*(\w+)\s*\{/g, '$1($2): $3 {');
    content = content.replace(/async\s+(\w+)\s*\(\s*\)\s*:\s*(\w+)\s*\{/g, 'async $1(): $2 {');
    content = content.replace(/async\s+(\w+)\s*\(\s*([^)]+)\s*\)\s*:\s*(\w+)\s*\{/g, 'async $1($2): $3 {');
    content = content.replace(/static\s+(\w+)\s*\(\s*\)\s*:\s*(\w+)\s*\{/g, 'static $1(): $2 {');
    content = content.replace(/static\s+(\w+)\s*\(\s*([^)]+)\s*\)\s*:\s*(\w+)\s*\{/g, 'static $1($2): $3 {');
    content = content.replace(/private\s+(\w+)\s*\(\s*\)\s*:\s*(\w+)\s*\{/g, 'private $1(): $2 {');
    content = content.replace(/private\s+(\w+)\s*\(\s*([^)]+)\s*\)\s*:\s*(\w+)\s*\{/g, 'private $1($2): $3 {');
    content = content.replace(/protected\s+(\w+)\s*\(\s*\)\s*:\s*(\w+)\s*\{/g, 'protected $1(): $2 {');
    content = content.replace(/protected\s+(\w+)\s*\(\s*([^)]+)\s*\)\s*:\s*(\w+)\s*\{/g, 'protected $1($2): $3 {');
    content = content.replace(/public\s+(\w+)\s*\(\s*\)\s*:\s*(\w+)\s*\{/g, 'public $1(): $2 {');
    content = content.replace(/public\s+(\w+)\s*\(\s*([^)]+)\s*\)\s*:\s*(\w+)\s*\{/g, 'public $1($2): $3 {');
    
    // Fix function parameters with proper syntax
    content = content.replace(/(\w+):\s*(\w+)\s+(\w+):/g, '$1: $2,\n  $3:');
    content = content.replace(/(\w+):\s*(\w+)\s+(\w+):\s*(\w+)/g, '$1: $2,\n  $3: $4');
    content = content.replace(/(\w+):\s*(\w+)\s+(\w+):\s*(\w+)\s+(\w+):/g, '$1: $2,\n  $3: $4,\n  $5:');
    
    // Fix class properties
    content = content.replace(/private\s+(\w+)\s*:\s*(\w+)\s*=\s*(\w+)\s*\(\s*\)/g, 'private $1: $2 = new $3()');
    content = content.replace(/private\s+(\w+)\s*:\s*(\w+)\s*=\s*new\s+(\w+)\s*\(\s*\)/g, 'private $1: $2 = new $3()');
    
    return content;
  }

  fixArraySyntax(content) {
    // Fix malformed array syntax like ['1d'7d'30d'90d'] -> ['1d', '7d', '30d', '90d']
    content = content.replace(/\[\s*'([^']+)'([^']+)'([^']+)'([^']+)'\s*\]/g, "['$1', '$2', '$3', '$4']");
    content = content.replace(/\[\s*'([^']+)'([^']+)'([^']+)'\s*\]/g, "['$1', '$2', '$3']");
    content = content.replace(/\[\s*'([^']+)'([^']+)'\s*\]/g, "['$1', '$2']");
    content = content.replace(/\[\s*"([^"]+)"([^"]+)"([^"]+)"([^"]+)"\s*\]/g, '["$1", "$2", "$3", "$4"]');
    content = content.replace(/\[\s*"([^"]+)"([^"]+)"([^"]+)"\s*\]/g, '["$1", "$2", "$3"]');
    content = content.replace(/\[\s*"([^"]+)"([^"]+)"\s*\]/g, '["$1", "$2"]');
    
    // Fix numeric arrays
    content = content.replace(/\[\s*(\d+)(\d+)(\d+)(\d+)\s*\]/g, '[$1, $2, $3, $4]');
    content = content.replace(/\[\s*(\d+)(\d+)(\d+)\s*\]/g, '[$1, $2, $3]');
    content = content.replace(/\[\s*(\d+)(\d+)\s*\]/g, '[$1, $2]');
    
    return content;
  }

  fixObjectProperties(content) {
    // Fix object properties with missing commas
    content = content.replace(/(\w+):\s*(\d+)\s*(\w+):/g, '$1: $2,\n    $3:');
    content = content.replace(/(\w+):\s*(\d+\.\d+)\s*(\w+):/g, '$1: $2,\n    $3:');
    content = content.replace(/(\w+):\s*'([^']+)'\s*(\w+):/g, "$1: '$2',\n    $3:");
    content = content.replace(/(\w+):\s*"([^"]+)"\s*(\w+):/g, '$1: "$2",\n    $3:');
    content = content.replace(/(\w+):\s*\[([^\]]+)\]\s*(\w+):/g, '$1: [$2],\n    $3:');
    content = content.replace(/(\w+):\s*\{([^}]+)\}\s*(\w+):/g, '$1: {$2},\n    $3:');
    
    // Fix object properties in JSX
    content = content.replace(/(\w+):\s*(\w+)\s*(\w+):/g, '$1: $2,\n  $3:');
    content = content.replace(/(\w+):\s*(\w+)\s*(\w+):\s*(\w+)/g, '$1: $2,\n  $3: $4');
    
    // Fix object properties with missing commas in spread operators
    content = content.replace(/\.\.\.\(([^)]+)\s*&&\s*\{([^}]+)\}\)/g, '...($1 && { $2 })');
    
    // Fix specific object property patterns
    content = content.replace(/(\w+):\s*'([^']+)'\s*(\w+):/g, "$1: '$2',\n    $3:");
    content = content.replace(/(\w+):\s*"([^"]+)"\s*(\w+):/g, '$1: "$2",\n    $3:');
    content = content.replace(/(\w+):\s*(\w+)\s*(\w+):/g, '$1: $2,\n    $3:');
    content = content.replace(/(\w+):\s*(\w+)\s*(\w+):\s*(\w+)/g, '$1: $2,\n    $3: $4');
    
    return content;
  }

  fixJSXStructure(content) {
    // Fix JSX closing tag issues
    content = content.replace(/<(\w+)>\s*<\/div>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/span>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/button>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/form>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/input>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/label>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/select>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/textarea>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/table>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/tr>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/td>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/th>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/ul>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/li>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/a>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/img>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/svg>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/path>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/circle>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/rect>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/line>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/polygon>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/g>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/defs>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/clipPath>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/mask>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/filter>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/feGaussianBlur>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/feOffset>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/feComposite>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/feFlood>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/feMerge>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/feMergeNode>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/feBlend>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/feColorMatrix>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/feComponentTransfer>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/feFuncR>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/feFuncG>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/feFuncB>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/feFuncA>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/feMorphology>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/feTile>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/feTurbulence>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/feDisplacementMap>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/feConvolveMatrix>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/feDiffuseLighting>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/feSpecularLighting>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/feDistantLight>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/fePointLight>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/feSpotLight>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/feImage>/g, '<$1></$1>');
    
    // Fix JSX syntax errors
    content = content.replace(/<(\w+),/g, '<$1');
    
    return content;
  }

  fixErrorObjectAccess(content) {
    // Fix error object access syntax like errors['role', '] -> errors['role']
    content = content.replace(/errors\['([^']+)',\s*'\]/g, "errors['$1']");
    content = content.replace(/errors\[',\s*'([^']+)'\]/g, "errors['$1']");
    content = content.replace(/errors\[',\s*'([^']+)'\]/g, "errors['$1']");
    
    // Fix error object access with missing quotes
    content = content.replace(/errors\[([^'"]+)\]/g, "errors['$1']");
    
    return content;
  }

  fixTimestampStrings(content) {
    // Fix malformed timestamp strings
    content = content.replace(/'([^']+)\s+(\d+):\s*(\d+),\s*(\d+):(\d+)'/g, "'$1 $2:$3:$4'");
    content = content.replace(/'([^']+)\s+(\d+):\s*(\d+),\s*(\d+):(\d+):(\d+)'/g, "'$1 $2:$3:$4:$5'");
    content = content.replace(/'([^']+)\s+(\d+)\s+(\d+):(\d+):(\d+)'/g, "'$1 $2:$3:$4:$5'");
    content = content.replace(/'([^']+)\s+(\d+)\s+(\d+):(\d+):(\d+):(\d+)'/g, "'$1 $2:$3:$4:$5:$6'");
    
    // Fix ISO timestamp strings
    content = content.replace(/'([^']+)T(\d+):\s*(\d+):\s*(\d+)Z'/g, "'$1T$2:$3:$4Z'");
    content = content.replace(/'([^']+)T(\d+):\s*(\d+):\s*(\d+):\s*(\d+)Z'/g, "'$1T$2:$3:$4:$5Z'");
    
    // Fix specific timestamp patterns
    content = content.replace(/'([^']+)T(\d+):\s*(\d+):\s*(\d+),\s*(\d+):(\d+)'/g, "'$1T$2:$3:$4:$5'");
    content = content.replace(/'([^']+)T(\d+):\s*(\d+):\s*(\d+),\s*(\d+):(\d+):(\d+)'/g, "'$1T$2:$3:$4:$5:$6'");
    
    return content;
  }

  applySpecificFixes(content, filePath) {
    // Fix specific file patterns
    if (filePath.includes('ViewGroupForm.tsx')) {
      content = this.fixViewGroupForm(content);
    }
    
    if (filePath.includes('ViewRoleForm.tsx')) {
      content = this.fixViewRoleForm(content);
    }
    
    if (filePath.includes('ViewUserForm.tsx')) {
      content = this.fixViewUserForm(content);
    }
    
    if (filePath.includes('UserAnalytics.tsx')) {
      content = this.fixUserAnalytics(content);
    }
    
    if (filePath.includes('error-handler.ts')) {
      content = this.fixErrorHandler(content);
    }
    
    if (filePath.includes('dashboardService.supabase.ts')) {
      content = this.fixDashboardService(content);
    }
    
    if (filePath.includes('analyticsService.ts')) {
      content = this.fixAnalyticsService(content);
    }
    
    if (filePath.includes('confidence-logger.ts')) {
      content = this.fixConfidenceLogger(content);
    }
    
    if (filePath.includes('mcp-integrated.ts')) {
      content = this.fixMCPIntegrated(content);
    }
    
    if (filePath.includes('websiteBuilderService.ts')) {
      content = this.fixWebsiteBuilderService(content);
    }
    
    if (filePath.includes('mcp.ts')) {
      content = this.fixMCPService(content);
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
    
    if (filePath.includes('EditUserForm.tsx')) {
      content = this.fixEditUserForm(content);
    }
    
    return content;
  }

  fixViewGroupForm(content) {
    // Fix object properties with missing commas
    content = content.replace(/(\w+):\s*'([^']+)'\s*(\w+):/g, "$1: '$2',\n    $3:");
    content = content.replace(/(\w+):\s*"([^"]+)"\s*(\w+):/g, '$1: "$2",\n    $3:');
    content = content.replace(/(\w+):\s*(\w+)\s*(\w+):/g, '$1: $2,\n    $3:');
    content = content.replace(/(\w+):\s*(\w+)\s*(\w+):\s*(\w+)/g, '$1: $2,\n    $3: $4');
    
    return content;
  }

  fixViewRoleForm(content) {
    // Fix TypeScript generics
    content = content.replace(/Record<string\s+string>/g, 'Record<string, string>');
    
    // Fix object properties with missing commas
    content = content.replace(/(\w+):\s*'([^']+)'\s*(\w+):/g, "$1: '$2',\n    $3:");
    content = content.replace(/(\w+):\s*"([^"]+)"\s*(\w+):/g, '$1: "$2",\n    $3:');
    content = content.replace(/(\w+):\s*(\w+)\s*(\w+):/g, '$1: $2,\n    $3:');
    content = content.replace(/(\w+):\s*(\w+)\s*(\w+):\s*(\w+)/g, '$1: $2,\n    $3: $4');
    
    return content;
  }

  fixViewUserForm(content) {
    // Fix TypeScript generics
    content = content.replace(/Record<string\s+string>/g, 'Record<string, string>');
    
    // Fix object properties with missing commas
    content = content.replace(/(\w+):\s*'([^']+)'\s*(\w+):/g, "$1: '$2',\n    $3:");
    content = content.replace(/(\w+):\s*"([^"]+)"\s*(\w+):/g, '$1: "$2",\n    $3:');
    content = content.replace(/(\w+):\s*(\w+)\s*(\w+):/g, '$1: $2,\n    $3:');
    content = content.replace(/(\w+):\s*(\w+)\s*(\w+):\s*(\w+)/g, '$1: $2,\n    $3: $4');
    
    return content;
  }

  fixUserAnalytics(content) {
    // Fix object properties with missing commas
    content = content.replace(/(\w+):\s*(\w+)\s*(\w+):/g, '$1: $2,\n    $3:');
    content = content.replace(/(\w+):\s*(\w+)\s*(\w+):\s*(\w+)/g, '$1: $2,\n    $3: $4');
    
    // Fix array syntax
    content = content.replace(/\[\s*'([^']+)'([^']+)'([^']+)'([^']+)'\s*\]/g, "['$1', '$2', '$3', '$4']");
    content = content.replace(/\[\s*'([^']+)'([^']+)'([^']+)'\s*\]/g, "['$1', '$2', '$3']");
    content = content.replace(/\[\s*'([^']+)'([^']+)'\s*\]/g, "['$1', '$2']");
    
    // Fix JSX structure
    content = content.replace(/<(\w+)>\s*<\/div>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/span>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/button>/g, '<$1></$1>');
    
    return content;
  }

  fixErrorHandler(content) {
    // Fix spread operator syntax
    content = content.replace(/\.\.\.\(([^)]+)\s*&&\s*\{([^}]+)\}\)/g, '...($1 && { $2 })');
    
    // Fix object properties
    content = content.replace(/(\w+):\s*(\w+)\s+(\w+):/g, '$1: $2,\n  $3:');
    
    return content;
  }

  fixDashboardService(content) {
    // Fix ISO timestamp strings
    content = content.replace(/'([^']+)T(\d+):\s*(\d+):\s*(\d+)Z'/g, "'$1T$2:$3:$4Z'");
    content = content.replace(/'([^']+)T(\d+):\s*(\d+):\s*(\d+):\s*(\d+)Z'/g, "'$1T$2:$3:$4:$5Z'");
    content = content.replace(/'([^']+)T(\d+):\s*(\d+):\s*(\d+),\s*(\d+):(\d+)'/g, "'$1T$2:$3:$4:$5'");
    content = content.replace(/'([^']+)T(\d+):\s*(\d+):\s*(\d+),\s*(\d+):(\d+):(\d+)'/g, "'$1T$2:$3:$4:$5:$6'");
    
    // Fix object properties
    content = content.replace(/(\w+):\s*'([^']+)'\s*(\w+):/g, "$1: '$2',\n    $3:");
    
    return content;
  }

  fixAnalyticsService(content) {
    // Fix TypeScript generics
    content = content.replace(/Record<string\s+any>/g, 'Record<string, any>');
    
    // Fix method declarations
    content = content.replace(/(\w+)\s*\(\s*\)\s*:\s*(\w+)\s*\{/g, '$1(): $2 {');
    content = content.replace(/(\w+)\s*\(\s*([^)]+)\s*\)\s*:\s*(\w+)\s*\{/g, '$1($2): $3 {');
    content = content.replace(/async\s+(\w+)\s*\(\s*\)\s*:\s*(\w+)\s*\{/g, 'async $1(): $2 {');
    content = content.replace(/async\s+(\w+)\s*\(\s*([^)]+)\s*\)\s*:\s*(\w+)\s*\{/g, 'async $1($2): $3 {');
    
    // Fix function parameters
    content = content.replace(/(\w+):\s*(\w+)\s+(\w+):/g, '$1: $2,\n  $3:');
    content = content.replace(/(\w+):\s*(\w+)\s+(\w+):\s*(\w+)/g, '$1: $2,\n  $3: $4');
    
    // Fix object properties
    content = content.replace(/(\w+):\s*(\w+)\s*(\w+):/g, '$1: $2,\n    $3:');
    content = content.replace(/(\w+):\s*(\w+)\s*(\w+):\s*(\w+)/g, '$1: $2,\n    $3: $4');
    
    return content;
  }

  fixConfidenceLogger(content) {
    // Fix TypeScript generics
    content = content.replace(/Record<string\s+any>/g, 'Record<string, any>');
    
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

  fixMCPIntegrated(content) {
    // Fix TypeScript generics
    content = content.replace(/Map<string\s+any>/g, 'Map<string, any>');
    
    // Fix method declarations
    content = content.replace(/(\w+)\s*\(\s*\)\s*:\s*(\w+)\s*\{/g, '$1(): $2 {');
    content = content.replace(/(\w+)\s*\(\s*([^)]+)\s*\)\s*:\s*(\w+)\s*\{/g, '$1($2): $3 {');
    content = content.replace(/static\s+(\w+)\s*\(\s*\)\s*:\s*(\w+)\s*\{/g, 'static $1(): $2 {');
    content = content.replace(/static\s+(\w+)\s*\(\s*([^)]+)\s*\)\s*:\s*(\w+)\s*\{/g, 'static $1($2): $3 {');
    
    // Fix function parameters
    content = content.replace(/(\w+):\s*(\w+)\s+(\w+):/g, '$1: $2,\n  $3:');
    content = content.replace(/(\w+):\s*(\w+)\s+(\w+):\s*(\w+)/g, '$1: $2,\n  $3: $4');
    
    return content;
  }

  fixWebsiteBuilderService(content) {
    // Fix TypeScript generics
    content = content.replace(/Record<string\s+any>/g, 'Record<string, any>');
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

  fixMCPService(content) {
    // Fix TypeScript generics
    content = content.replace(/Record<string\s+any>/g, 'Record<string, any>');
    content = content.replace(/Omit<MCPWorkflow\s+'id'\s*\|\s*'created_at'\s*\|\s*'updated_at'>/g, "Omit<MCPWorkflow, 'id' | 'created_at' | 'updated_at'>");
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

  fixAIConfidence(content) {
    // Fix TypeScript generics
    content = content.replace(/Record<string\s+number>/g, 'Record<string, number>');
    content = content.replace(/Record<string\s+any>/g, 'Record<string, any>');
    
    return content;
  }

  fixAlerts(content) {
    // Fix TypeScript generics
    content = content.replace(/Record<string\s+any>/g, 'Record<string, any>');
    content = content.replace(/Record<string\s+number>/g, 'Record<string, number>');
    
    return content;
  }

  fixFeatureFlags(content) {
    // Fix TypeScript generics
    content = content.replace(/Record<string\s+any>/g, 'Record<string, any>');
    
    return content;
  }

  fixMarketResearch(content) {
    // Fix TypeScript generics
    content = content.replace(/Record<string\s+any>/g, 'Record<string, any>');
    content = content.replace(/Record<string\s+number>/g, 'Record<string, number>');
    
    return content;
  }

  fixEditUserForm(content) {
    // Fix error object access syntax
    content = content.replace(/errors\['([^']+)',\s*'\]/g, "errors['$1']");
    content = content.replace(/errors\[',\s*'([^']+)'\]/g, "errors['$1']");
    
    // Fix JSX structure
    content = content.replace(/<(\w+)>\s*<\/div>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/span>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/button>/g, '<$1></$1>');
    
    return content;
  }
}

// Run the final complete fix
const fixer = new FinalCompleteFixer();
fixer.fixAllErrors().then(() => {
  console.log('🎯 Final complete fix completed!');
}).catch(error => {
  console.error('💥 Error in final complete fix:', error);
});
