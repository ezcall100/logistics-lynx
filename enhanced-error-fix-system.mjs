import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Enhanced Error Fix System
class EnhancedErrorFixer {
  constructor() {
    this.fixedFiles = new Set();
    this.errorPatterns = {
      // String literal fixes
      stringLiterals: [
        { pattern: /'([^']+):\s*(\d+):\s*(\d+):\s*(\d+)'/g, replacement: "'$1:$2:$3:$4'" },
        { pattern: /'([^']+)\s+(\d+):\s*(\d+):\s*(\d+)'/g, replacement: "'$1 $2:$3:$4'" },
        { pattern: /'([^']+)\s+(\d+):\s*(\d+):\s*(\d+):\s*(\d+)'/g, replacement: "'$1 $2:$3:$4:$5'" },
        { pattern: /'([^']+)\s+(\d+):\s*(\d+):\s*(\d+):\s*(\d+):\s*(\d+)'/g, replacement: "'$1 $2:$3:$4:$5:$6'" },
        { pattern: /'([^']+)\s+(\d+):\s*(\d+):\s*(\d+):\s*(\d+):\s*(\d+):\s*(\d+)'/g, replacement: "'$1 $2:$3:$4:$5:$6:$7'" },
        { pattern: /'([^']+)\s+(\d+):\s*(\d+):\s*(\d+):\s*(\d+):\s*(\d+):\s*(\d+):\s*(\d+)'/g, replacement: "'$1 $2:$3:$4:$5:$6:$7:$8'" },
        { pattern: /'([^']+)\s+(\d+):\s*(\d+):\s*(\d+):\s*(\d+):\s*(\d+):\s*(\d+):\s*(\d+):\s*(\d+)'/g, replacement: "'$1 $2:$3:$4:$5:$6:$7:$8:$9'" },
        { pattern: /'([^']+)\s+(\d+):\s*(\d+):\s*(\d+):\s*(\d+):\s*(\d+):\s*(\d+):\s*(\d+):\s*(\d+):\s*(\d+)'/g, replacement: "'$1 $2:$3:$4:$5:$6:$7:$8:$9:$10'" }
      ],
      
      // Object property fixes
      objectProperties: [
        { pattern: /(\w+):\s*(\d+)\s*(\w+):/g, replacement: '$1: $2,\n    $3:' },
        { pattern: /(\w+):\s*(\d+\.\d+)\s*(\w+):/g, replacement: '$1: $2,\n    $3:' },
        { pattern: /(\w+):\s*'([^']+)'\s*(\w+):/g, replacement: "$1: '$2',\n    $3:" },
        { pattern: /(\w+):\s*"([^"]+)"\s*(\w+):/g, replacement: '$1: "$2",\n    $3:' },
        { pattern: /(\w+):\s*\[([^\]]+)\]\s*(\w+):/g, replacement: '$1: [$2],\n    $3:' },
        { pattern: /(\w+):\s*\{([^}]+)\}\s*(\w+):/g, replacement: '$1: {$2},\n    $3:' },
        { pattern: /(\w+):\s*(\w+)\s*(\w+):/g, replacement: '$1: $2,\n    $3:' },
        { pattern: /(\w+):\s*(\w+)\s*(\w+):\s*(\w+)/g, replacement: '$1: $2,\n    $3: $4' },
        { pattern: /(\w+):\s*(\w+)\s*(\w+):\s*(\w+)\s*(\w+)/g, replacement: '$1: $2,\n    $3: $4,\n    $5' }
      ],
      
      // Array fixes
      arrayFixes: [
        { pattern: /\[\s*'([^']+)'([^']+)'([^']+)'\s*\]/g, replacement: "['$1', '$2', '$3']" },
        { pattern: /\[\s*"([^"]+)"([^"]+)"([^"]+)"\s*\]/g, replacement: '["$1", "$2", "$3"]' },
        { pattern: /\[\s*(\d+)(\d+)(\d+)\s*\]/g, replacement: '[$1, $2, $3]' },
        { pattern: /\[\s*(\d+)(\d+)(\d+)(\d+)\s*\]/g, replacement: '[$1, $2, $3, $4]' },
        { pattern: /\[\s*(\d+)(\d+)(\d+)(\d+)(\d+)\s*\]/g, replacement: '[$1, $2, $3, $4, $5]' }
      ],
      
      // Function parameter fixes
      functionParams: [
        { pattern: /(\w+):\s*(\w+)\s+(\w+):/g, replacement: '$1: $2,\n  $3:' },
        { pattern: /(\w+):\s*(\w+)\s+(\w+):\s*(\w+)/g, replacement: '$1: $2,\n  $3: $4' },
        { pattern: /(\w+):\s*(\w+)\s+(\w+):\s*(\w+)\s+(\w+)/g, replacement: '$1: $2,\n  $3: $4,\n  $5' }
      ],
      
      // Console fixes
      consoleFixes: [
        { pattern: /console\.error\('([^']+)'\s+([^,]+),/g, replacement: "console.error('$1', $2," },
        { pattern: /console\.log\('([^']+)'\s+([^,]+),/g, replacement: "console.log('$1', $2," },
        { pattern: /console\.warn\('([^']+)'\s+([^,]+),/g, replacement: "console.warn('$1', $2," },
        { pattern: /console\.info\('([^']+)'\s+([^,]+),/g, replacement: "console.info('$1', $2," },
        { pattern: /console\.debug\('([^']+)'\s+([^,]+),/g, replacement: "console.debug('$1', $2," }
      ],
      
      // Import fixes
      importFixes: [
        { pattern: /import\s+\{\s*([^}]+)\s*\}\s+from\s+['"]([^'"]+)['"]\s*;?\s*import/g, replacement: "import { $1 } from '$2';\nimport" },
        { pattern: /import\s+([^{][^;]+);\s*import/g, replacement: "import $1;\nimport" },
        { pattern: /import\s+([^{][^;]+);\s*export/g, replacement: "import $1;\nexport" },
        { pattern: /export\s+([^{][^;]+);\s*import/g, replacement: "export $1;\nimport" }
      ],
      
      // JSX fixes
      jsxFixes: [
        { pattern: /<(\w+),/g, replacement: '<$1' },
        { pattern: /<(\w+)>\s*<\/div>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/span>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/button>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/form>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/input>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/label>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/select>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/textarea>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/table>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/tr>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/td>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/th>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/ul>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/li>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/a>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/img>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/svg>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/path>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/circle>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/rect>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/line>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/polygon>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/g>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/defs>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/clipPath>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/mask>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/filter>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/feGaussianBlur>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/feOffset>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/feComposite>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/feFlood>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/feMerge>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/feMergeNode>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/feBlend>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/feColorMatrix>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/feComponentTransfer>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/feFuncR>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/feFuncG>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/feFuncB>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/feFuncA>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/feMorphology>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/feTile>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/feTurbulence>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/feDisplacementMap>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/feConvolveMatrix>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/feDiffuseLighting>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/feSpecularLighting>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/feDistantLight>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/fePointLight>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/feSpotLight>/g, replacement: '<$1></$1>' },
        { pattern: /<(\w+)>\s*<\/feImage>/g, replacement: '<$1></$1>' }
      ],
      
      // TypeScript interface fixes
      tsInterfaceFixes: [
        { pattern: /interface\s+(\w+)\s*\{([^}]+)\}\s*\[/g, replacement: 'interface $1 {\n  $2\n}\n\n[' },
        { pattern: /interface\s+(\w+)\s*\{([^}]+)\}\s*;/g, replacement: 'interface $1 {\n  $2\n}' },
        { pattern: /type\s+(\w+)\s*=\s*\{([^}]+)\}\s*\[/g, replacement: 'type $1 = {\n  $2\n}\n\n[' },
        { pattern: /type\s+(\w+)\s*=\s*\{([^}]+)\}\s*;/g, replacement: 'type $1 = {\n  $2\n}' }
      ],
      
      // React hook fixes
      reactHookFixes: [
        { pattern: /useState\s*\(\s*\[\s*\]\s*\)\s*\[/g, replacement: 'useState([])\n  [' },
        { pattern: /useEffect\s*\(\s*\(\s*\)\s*=>\s*\{([^}]+)\}\s*,\s*\[([^\]]+)\]\s*\)\s*\[/g, replacement: 'useEffect(() => {\n    $1\n  }, [$2])\n\n  [' },
        { pattern: /useCallback\s*\(\s*\(\s*\)\s*=>\s*\{([^}]+)\}\s*,\s*\[([^\]]+)\]\s*\)\s*\[/g, replacement: 'useCallback(() => {\n    $1\n  }, [$2])\n\n  [' },
        { pattern: /useMemo\s*\(\s*\(\s*\)\s*=>\s*\{([^}]+)\}\s*,\s*\[([^\]]+)\]\s*\)\s*\[/g, replacement: 'useMemo(() => {\n    $1\n  }, [$2])\n\n  [' }
      ],
      
      // Spread operator fixes
      spreadFixes: [
        { pattern: /\.\.\.\(([^)]+)\s*&&\s*\{([^}]+)\}\)/g, replacement: '...($1 && { $2 })' },
        { pattern: /\.\.\.\(([^)]+)\s*&&\s*\{([^}]+)\}\s*\)/g, replacement: '...($1 && { $2 })' }
      ],
      
      // Template literal fixes
      templateLiteralFixes: [
        { pattern: /`([^`]+)\$\{([^}]+)\}([^`]+)`/g, replacement: '`$1${$2}$3`' },
        { pattern: /`([^`]+)\$\{([^}]+)\}([^`]+)\$\{([^}]+)\}([^`]+)`/g, replacement: '`$1${$2}$3${$4}$5`' }
      ]
    };
  }

  async fixAllErrors() {
    console.log('🚀 Starting enhanced error fix system...');
    
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
    
    console.log(`🎉 Enhanced fix completed! Fixed ${totalFixed} files`);
    
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
      
      // Apply all error patterns
      for (const category of Object.values(this.errorPatterns)) {
        for (const pattern of category) {
          content = content.replace(pattern.pattern, pattern.replacement);
        }
      }
      
      // Additional specific fixes
      content = this.applySpecificFixes(content, filePath);
      
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

  applySpecificFixes(content, filePath) {
    // Fix specific file patterns
    if (filePath.includes('UserOnboarding.tsx')) {
      content = this.fixUserOnboarding(content);
    }
    
    if (filePath.includes('UserRoles.tsx')) {
      content = this.fixUserRoles(content);
    }
    
    if (filePath.includes('authService.ts')) {
      content = this.fixAuthService(content);
    }
    
    if (filePath.includes('dashboardService.supabase.ts')) {
      content = this.fixDashboardService(content);
    }
    
    if (filePath.includes('error-handler.ts')) {
      content = this.fixErrorHandler(content);
    }
    
    return content;
  }

  fixUserOnboarding(content) {
    // Fix timestamp strings
    content = content.replace(/'([^']+):\s*(\d+):\s*(\d+):\s*(\d+)'/g, "'$1:$2:$3:$4'");
    content = content.replace(/'([^']+)\s+(\d+):\s*(\d+):\s*(\d+)'/g, "'$1 $2:$3:$4'");
    content = content.replace(/'([^']+)\s+(\d+):\s*(\d+):\s*(\d+):\s*(\d+)'/g, "'$1 $2:$3:$4:$5'");
    
    // Fix object properties
    content = content.replace(/(\w+):\s*(\d+)\s*(\w+):/g, '$1: $2,\n    $3:');
    content = content.replace(/(\w+):\s*(\d+\.\d+)\s*(\w+):/g, '$1: $2,\n    $3:');
    
    return content;
  }

  fixUserRoles(content) {
    // Fix timestamp strings
    content = content.replace(/'([^']+):\s*(\d+):\s*(\d+):\s*(\d+)'/g, "'$1:$2:$3:$4'");
    content = content.replace(/'([^']+)\s+(\d+):\s*(\d+):\s*(\d+)'/g, "'$1 $2:$3:$4'");
    
    // Fix object properties
    content = content.replace(/(\w+):\s*(\d+\.\d+)\s*(\w+):/g, '$1: $2,\n    $3:');
    content = content.replace(/(\w+):\s*'([^']+)'\s*(\w+):/g, "$1: '$2',\n    $3:");
    
    return content;
  }

  fixAuthService(content) {
    // Fix array syntax
    content = content.replace(/\[\s*'([^']+)'([^']+)'\s*\]/g, "['$1', '$2']");
    content = content.replace(/\[\s*"([^"]+)"([^"]+)"\s*\]/g, '["$1", "$2"]');
    
    // Fix object properties
    content = content.replace(/(\w+):\s*\[([^\]]+)\]\s*(\w+):/g, '$1: [$2],\n  $3:');
    
    return content;
  }

  fixDashboardService(content) {
    // Fix timestamp strings
    content = content.replace(/'([^']+)T(\d+):\s*(\d+):\s*(\d+)Z'/g, "'$1T$2:$3:$4Z'");
    content = content.replace(/'([^']+)T(\d+):\s*(\d+):\s*(\d+):\s*(\d+)Z'/g, "'$1T$2:$3:$4:$5Z'");
    
    // Fix object properties
    content = content.replace(/(\w+):\s*'([^']+)'\s*(\w+):/g, "$1: '$2',\n    $3:");
    
    return content;
  }

  fixErrorHandler(content) {
    // Fix spread operator
    content = content.replace(/\.\.\.\(([^)]+)\s*&&\s*\{([^}]+)\}\)/g, '...($1 && { $2 })');
    
    // Fix function parameters
    content = content.replace(/(\w+):\s*(\w+)\s+(\w+):/g, '$1: $2,\n  $3:');
    
    return content;
  }
}

// Run the enhanced fix
const fixer = new EnhancedErrorFixer();
fixer.fixAllErrors().then(() => {
  console.log('🎯 Enhanced error fix completed!');
}).catch(error => {
  console.error('💥 Error in enhanced fix:', error);
});
