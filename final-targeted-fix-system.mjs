import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Final Targeted Fix System
class FinalTargetedFixer {
  constructor() {
    this.fixedFiles = new Set();
  }

  async fixAllErrors() {
    console.log('🚀 Starting final targeted fix system...');
    
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
    
    console.log(`🎉 Final targeted fix completed! Fixed ${totalFixed} files`);
    
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
    
    return content;
  }

  applySpecificFixes(content, filePath) {
    // Fix specific file patterns
    if (filePath.includes('EditUserForm.tsx')) {
      content = this.fixEditUserForm(content);
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

  fixUserAnalytics(content) {
    // Fix object properties
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
    
    // Fix object properties
    content = content.replace(/(\w+):\s*'([^']+)'\s*(\w+):/g, "$1: '$2',\n    $3:");
    
    return content;
  }
}

// Run the final targeted fix
const fixer = new FinalTargetedFixer();
fixer.fixAllErrors().then(() => {
  console.log('🎯 Final targeted fix completed!');
}).catch(error => {
  console.error('💥 Error in final targeted fix:', error);
});
