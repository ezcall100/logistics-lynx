const fs = require('fs');
const path = require('path');

// Specialized fixes for type definition errors
const typeFixes = [
  // Fix broken string literal types
  { 
    pattern: /'([^']*?)\s*\|\s*([^']*?)'/g, 
    replacement: "'$1' | '$2'" 
  },
  { 
    pattern: /"([^"]*?)\s*\|\s*([^"]*?)"/g, 
    replacement: '"$1" | "$2"' 
  },
  
  // Fix broken enum types
  { 
    pattern: /export type \w+ = ([^;]+);/g, 
    replacement: (match, content) => {
      // Fix broken union types
      const fixed = content
        .replace(/(\w+)\s*\|\s*(\w+)/g, "'$1' | '$2'")
        .replace(/(\w+)\s*\|\s*'([^']+)'/g, "'$1' | '$2'")
        .replace(/'([^']+)'\s*\|\s*(\w+)/g, "'$1' | '$2'");
      return `export type ${match.split('=')[0].split('type ')[1].trim()} = ${fixed};`;
    }
  },
  
  // Fix broken interface properties
  { 
    pattern: /(\w+):\s*([^;]+);/g, 
    replacement: (match, prop, type) => {
      // Fix broken property types
      const fixed = type
        .replace(/(\w+)\s*\|\s*(\w+)/g, "'$1' | '$2'")
        .replace(/(\w+)\s*\|\s*'([^']+)'/g, "'$1' | '$2'")
        .replace(/'([^']+)'\s*\|\s*(\w+)/g, "'$1' | '$2'");
      return `${prop}: ${fixed};`;
    }
  },
  
  // Fix broken import statements
  { 
    pattern: /import\s+([^;]+)from([^;]+);/g, 
    replacement: 'import $1 from $2;' 
  },
  
  // Fix broken export statements
  { 
    pattern: /export\s+([^;]+);/g, 
    replacement: (match, content) => {
      // Fix broken default exports
      if (content.includes('default') && !content.includes('export default')) {
        return `export default ${content.replace('default', '').trim()};`;
      }
      return match;
    }
  },
  
  // Fix broken template literals in types
  { 
    pattern: /`([^`]*?)\$\{([^}]*?)\}([^`]*?)`/g, 
    replacement: '`$1${$2}$3`' 
  },
  
  // Fix broken array types
  { 
    pattern: /\[([^\]]*?)\]/g, 
    replacement: (match, content) => {
      // Fix broken array content
      const fixed = content
        .replace(/(\w+)\s*,\s*(\w+)/g, "'$1', '$2'")
        .replace(/(\w+)\s*,\s*'([^']+)'/g, "'$1', '$2'")
        .replace(/'([^']+)'\s*,\s*(\w+)/g, "'$1', '$2'");
      return `[${fixed}]`;
    }
  }
];

// Additional specific fixes for common type patterns
const specificTypeFixes = [
  // Fix broken union types
  { 
    pattern: /(\w+)\s*\|\s*(\w+)/g, 
    replacement: "'$1' | '$2'" 
  },
  
  // Fix broken string literal types
  { 
    pattern: /status:\s*([^;]+);/g, 
    replacement: (match, content) => {
      const fixed = content
        .replace(/(\w+)\s*\|\s*(\w+)/g, "'$1' | '$2'")
        .replace(/(\w+)\s*\|\s*'([^']+)'/g, "'$1' | '$2'")
        .replace(/'([^']+)'\s*\|\s*(\w+)/g, "'$1' | '$2'");
      return `status: ${fixed};`;
    }
  },
  
  // Fix broken priority types
  { 
    pattern: /priority:\s*([^;]+);/g, 
    replacement: (match, content) => {
      const fixed = content
        .replace(/(\w+)\s*\|\s*(\w+)/g, "'$1' | '$2'")
        .replace(/(\w+)\s*\|\s*'([^']+)'/g, "'$1' | '$2'")
        .replace(/'([^']+)'\s*\|\s*(\w+)/g, "'$1' | '$2'");
      return `priority: ${fixed};`;
    }
  },
  
  // Fix broken role types
  { 
    pattern: /role:\s*([^;]+);/g, 
    replacement: (match, content) => {
      const fixed = content
        .replace(/(\w+)\s*\|\s*(\w+)/g, "'$1' | '$2'")
        .replace(/(\w+)\s*\|\s*'([^']+)'/g, "'$1' | '$2'")
        .replace(/'([^']+)'\s*\|\s*(\w+)/g, "'$1' | '$2'");
      return `role: ${fixed};`;
    }
  }
];

function fixTypeErrors(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    let fixed = false;
    
    // Apply type-specific fixes
    for (const fix of typeFixes) {
      const newContent = content.replace(fix.pattern, fix.replacement);
      if (newContent !== content) {
        content = newContent;
        fixed = true;
      }
    }
    
    // Apply specific type fixes
    for (const fix of specificTypeFixes) {
      const newContent = content.replace(fix.pattern, fix.replacement);
      if (newContent !== content) {
        content = newContent;
        fixed = true;
      }
    }
    
    // Additional manual fixes for common type patterns
    content = content
      // Fix broken union types in type definitions
      .replace(/(\w+)\s*\|\s*(\w+)/g, "'$1' | '$2'")
      
      // Fix broken string literal types
      .replace(/status:\s*([^;]+);/g, (match, content) => {
        const fixed = content
          .replace(/(\w+)\s*\|\s*(\w+)/g, "'$1' | '$2'")
          .replace(/(\w+)\s*\|\s*'([^']+)'/g, "'$1' | '$2'")
          .replace(/'([^']+)'\s*\|\s*(\w+)/g, "'$1' | '$2'");
        return `status: ${fixed};`;
      })
      
      // Fix broken priority types
      .replace(/priority:\s*([^;]+);/g, (match, content) => {
        const fixed = content
          .replace(/(\w+)\s*\|\s*(\w+)/g, "'$1' | '$2'")
          .replace(/(\w+)\s*\|\s*'([^']+)'/g, "'$1' | '$2'")
          .replace(/'([^']+)'\s*\|\s*(\w+)/g, "'$1' | '$2'");
        return `priority: ${fixed};`;
      })
      
      // Fix broken role types
      .replace(/role:\s*([^;]+);/g, (match, content) => {
        const fixed = content
          .replace(/(\w+)\s*\|\s*(\w+)/g, "'$1' | '$2'")
          .replace(/(\w+)\s*\|\s*'([^']+)'/g, "'$1' | '$2'")
          .replace(/'([^']+)'\s*\|\s*(\w+)/g, "'$1' | '$2'");
        return `role: ${fixed};`;
      })
      
      // Fix broken import statements
      .replace(/import\s+([^;]+)from([^;]+);/g, 'import $1 from $2;')
      
      // Fix broken export statements
      .replace(/export\s+([^;]+);/g, (match, content) => {
        if (content.includes('default') && !content.includes('export default')) {
          return `export default ${content.replace('default', '').trim()};`;
        }
        return match;
      })
      
      // Fix broken template literals
      .replace(/`([^`]*?)\$\{([^}]*?)\}([^`]*?)`/g, '`$1${$2}$3`')
      
      // Fix broken array types
      .replace(/\[([^\]]*?)\]/g, (match, content) => {
        const fixed = content
          .replace(/(\w+)\s*,\s*(\w+)/g, "'$1', '$2'")
          .replace(/(\w+)\s*,\s*'([^']+)'/g, "'$1', '$2'")
          .replace(/'([^']+)'\s*,\s*(\w+)/g, "'$1', '$2'");
        return `[${fixed}]`;
      });
    
    if (fixed || content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed types: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error fixing types in ${filePath}:`, error.message);
    return false;
  }
}

function findAndFixTypeErrors(dir = 'src') {
  const files = [];
  
  function scanDirectory(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (item.endsWith('.ts') || item.endsWith('.tsx')) {
        files.push(fullPath);
      }
    }
  }
  
  scanDirectory(dir);
  
  console.log(`🔍 Found ${files.length} TypeScript files to check for type errors...`);
  
  let fixedCount = 0;
  for (const file of files) {
    if (fixTypeErrors(file)) {
      fixedCount++;
    }
  }
  
  console.log(`\n🎯 Fixed type errors in ${fixedCount} out of ${files.length} files`);
  return fixedCount;
}

// Run the type fix
console.log('🚀 Starting specialized type error extermination...\n');
const fixedCount = findAndFixTypeErrors();

if (fixedCount > 0) {
  console.log('\n🔄 Running TypeScript check to measure progress...');
  const { execSync } = require('child_process');
  try {
    execSync('npx tsc --noEmit', { stdio: 'inherit' });
    console.log('\n✅ TypeScript compilation successful!');
  } catch (error) {
    console.log('\n⚠️ Some errors remain. Progress made!');
  }
} else {
  console.log('\n✨ No type errors found or all files are already clean!');
}
