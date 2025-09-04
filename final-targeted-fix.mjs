import fs from 'fs';
import path from 'path';

// Targeted Fix System for Critical Issues
class TargetedFixer {
  constructor() {
    this.fixedFiles = new Set();
  }

  async fixAllErrors() {
    console.log('🚀 Starting targeted fix system...');
    
    const files = this.getAllFiles('./src', ['.ts', '.tsx']);
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
    
    console.log(`🎉 Targeted fix completed! Fixed ${totalFixed} files`);
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
      
      content = this.applyFixes(content, filePath);
      
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

  applyFixes(content, filePath) {
    // Fix TypeScript generics
    content = content.replace(/Record<string\s+string>/g, 'Record<string, string>');
    content = content.replace(/Record<string\s+any>/g, 'Record<string, any>');
    content = content.replace(/Record<string\s+number>/g, 'Record<string, number>');
    
    // Fix object properties with missing commas
    content = content.replace(/(\w+):\s*'([^']+)'\s*(\w+):/g, "$1: '$2',\n    $3:");
    content = content.replace(/(\w+):\s*(\w+)\s*(\w+):/g, '$1: $2,\n    $3:');
    
    // Fix specific file patterns
    if (filePath.includes('EditUserForm.tsx')) {
      content = this.fixEditUserForm(content);
    }
    
    if (filePath.includes('EditRoleForm.tsx')) {
      content = this.fixEditRoleForm(content);
    }
    
    if (filePath.includes('ViewGroupForm.tsx')) {
      content = this.fixViewGroupForm(content);
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
    // Fix TypeScript generics
    content = content.replace(/Record<string\s+string>/g, 'Record<string, string>');
    
    // Fix error object access syntax
    content = content.replace(/errors\['([^']+)',\s*'\]/g, "errors['$1']");
    content = content.replace(/errors\[',\s*'([^']+)'\]/g, "errors['$1']");
    
    // Fix specific error patterns
    content = content.replace(/errors\['field\]/g, "errors['field']");
    content = content.replace(/\[field'\]/g, "[field]");
    
    return content;
  }

  fixEditRoleForm(content) {
    // Fix TypeScript generics
    content = content.replace(/Record<string\s+typeof\s+permissions>/g, 'Record<string, typeof permissions>');
    
    // Fix JSX structure
    content = content.replace(/<(\w+)>\s*<\/div>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/form>/g, '<$1></$1>');
    
    return content;
  }

  fixViewGroupForm(content) {
    // Fix TypeScript generics
    content = content.replace(/Record<string\s+string>/g, 'Record<string, string>');
    
    // Fix object properties with missing commas
    content = content.replace(/(\w+):\s*'([^']+)'\s*(\w+):/g, "$1: '$2',\n    $3:");
    content = content.replace(/(\w+):\s*(\w+)\s*(\w+):/g, '$1: $2,\n    $3:');
    
    return content;
  }

  fixUserAnalytics(content) {
    // Fix object properties with missing commas
    content = content.replace(/(\w+):\s*(\w+)\s*(\w+):/g, '$1: $2,\n    $3:');
    content = content.replace(/(\w+):\s*(\w+)\s*(\w+):\s*(\w+)/g, '$1: $2,\n    $3: $4');
    
    // Fix JSX structure
    content = content.replace(/<(\w+)>\s*<\/div>/g, '<$1></$1>');
    content = content.replace(/<(\w+)>\s*<\/ResponsiveCard>/g, '<$1></$1>');
    
    return content;
  }

  fixErrorHandler(content) {
    // Fix spread operator syntax
    content = content.replace(/\.\.\.\(([^)]+)\s*&&\s*\{([^}]+)\}\)/g, '...($1 && { $2 })');
    
    return content;
  }

  fixDashboardService(content) {
    // Fix ISO timestamp strings
    content = content.replace(/'([^']+)T(\d+):\s*(\d+):\s*(\d+)Z'/g, "'$1T$2:$3:$4Z'");
    content = content.replace(/'([^']+)T(\d+):\s*(\d+):\s*(\d+):\s*(\d+)Z'/g, "'$1T$2:$3:$4:$5Z'");
    
    return content;
  }
}

// Run the targeted fix
const fixer = new TargetedFixer();
fixer.fixAllErrors().then(() => {
  console.log('🎯 Targeted fix completed!');
}).catch(error => {
  console.error('💥 Error in targeted fix:', error);
});
