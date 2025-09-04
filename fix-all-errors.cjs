const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Comprehensive syntax error fixes
const syntaxFixes = [
  // Fix corrupted destructuring patterns
  {
    pattern: /const\s*\[\s*'([^']+)',\s*',\s*([^']+)',\s*([^']+)',\s*([^']+)'\s*\]\s*=\s*useState/g,
    replacement: (match, var1, var2, var3, var4) => {
      return `const [${var1}, set${var1.charAt(0).toUpperCase() + var1.slice(1)}] = useState`;
    }
  },
  
  // Fix corrupted variable references
  {
    pattern: /\{([^}]+):\s*string,([^}]+):\s*string,([^}]+):\s*string\}/g,
    replacement: (match, var1, var2, var3) => {
      return `{${var1}}`;
    }
  },
  
  // Fix corrupted template literals
  {
    pattern: /\$\{([^}]+):\s*string,([^}]+):\s*string,([^}]+):\s*string\}/g,
    replacement: (match, var1, var2, var3) => {
      return `\${${var1}}`;
    }
  },
  
  // Fix corrupted array access
  {
    pattern: /\[\s*'([^']+)',\s*([^']+)',\s*([^']+)',\s*([^']+)'\s*\]/g,
    replacement: (match, var1, var2, var3, var4) => {
      return `[${var1}]`;
    }
  },
  
  // Fix corrupted function calls
  {
    pattern: /onClick=\{([^}]+):\s*string,([^}]+):\s*string,([^}]+):\s*string\}/g,
    replacement: (match, var1, var2, var3) => {
      return `onClick={${var1}}`;
    }
  },
  
  // Fix corrupted props
  {
    pattern: /roleId=\{([^}]+):\s*string,([^}]+):\s*string,([^}]+):\s*string\}/g,
    replacement: (match, var1, var2, var3) => {
      return `roleId={${var1}}`;
    }
  },
  
  // Fix corrupted imports
  {
    pattern: /import\s*\{\s*([^}]+):\s*string,([^}]+):\s*string,([^}]+):\s*string\}/g,
    replacement: (match, var1, var2, var3) => {
      return `import { ${var1} }`;
    }
  },
  
  // Fix corrupted JSX attributes
  {
    pattern: /className=\{`([^`]+)\$\{([^}]+):\s*string,([^}]+):\s*string,([^}]+):\s*string\}/g,
    replacement: (match, prefix, var1, var2, var3) => {
      return `className={\`${prefix}\${${var1}}`;
    }
  }
];

function fixFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let fixedContent = content;
    let hasChanges = false;
    
    syntaxFixes.forEach(fix => {
      const newContent = fixedContent.replace(fix.pattern, fix.replacement);
      if (newContent !== fixedContent) {
        hasChanges = true;
        fixedContent = newContent;
      }
    });
    
    if (hasChanges) {
      fs.writeFileSync(filePath, fixedContent, 'utf8');
      console.log(`✅ Fixed: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

function main() {
  console.log('🔧 Starting comprehensive syntax error fixes...');
  
  const files = glob.sync('src/**/*.{ts,tsx}');
  console.log(`📁 Found ${files.length} files to process`);
  
  let fixedCount = 0;
  
  files.forEach(file => {
    if (fixFile(file)) {
      fixedCount++;
    }
  });
  
  console.log(`\n🎉 Fixed ${fixedCount} files automatically`);
}

if (require.main === module) {
  main();
}

module.exports = { fixFile, syntaxFixes };
