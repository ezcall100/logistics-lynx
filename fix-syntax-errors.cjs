const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Common syntax error patterns and their fixes
const syntaxFixes = [
  // Fix missing quotes in arrays
  {
    pattern: /(\[.*?)([a-zA-Z0-9_-]+)(,?\s*[a-zA-Z0-9_-]+)(,?\s*[a-zA-Z0-9_-]+)(,?\s*[a-zA-Z0-9_-]+)(\])/g,
    replacement: (match, start, item1, item2, item3, item4, end) => {
      const items = [item1, item2, item3, item4].filter(Boolean);
      return start + items.map(item => `'${item.trim()}'`).join(', ') + end;
    }
  },
  
  // Fix missing quotes in single array items
  {
    pattern: /(\[.*?)([a-zA-Z0-9_-]+)(\])/g,
    replacement: (match, start, item, end) => {
      return start + `'${item}'` + end;
    }
  },
  
  // Fix missing commas in function parameters
  {
    pattern: /(\{\s*)([a-zA-Z0-9_]+)(\s*)([a-zA-Z0-9_]+)(\s*)([a-zA-Z0-9_]+)(\s*\})/g,
    replacement: (match, start, param1, space1, param2, space2, param3, end) => {
      return start + param1 + ':' + ' string,' + space1 + param2 + ':' + ' string,' + space2 + param3 + ':' + ' string' + end;
    }
  },
  
  // Fix missing commas in destructuring
  {
    pattern: /(\{\s*)([a-zA-Z0-9_]+)(\s*)([a-zA-Z0-9_]+)(\s*)([a-zA-Z0-9_]+)(\s*\})/g,
    replacement: (match, start, item1, space1, item2, space2, item3, end) => {
      return start + item1 + ',' + space1 + item2 + ',' + space2 + item3 + end;
    }
  },
  
  // Fix unterminated strings
  {
    pattern: /(\w+\s*=\s*')([^']*)$/gm,
    replacement: (match, start, content) => {
      return start + content + "'";
    }
  },
  
  // Fix missing semicolons after useEffect
  {
    pattern: /useEffect\(\(\)\s*=>\s*\{/g,
    replacement: 'useEffect(() => {'
  },
  
  // Fix missing closing tags in JSX
  {
    pattern: /<>\s*\{([^}]+)\s*$/gm,
    replacement: '<>{$1}</>'
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
  console.log('🔧 Starting automatic syntax error fixes...');
  
  // Find all TypeScript/React files
  const files = glob.sync('src/**/*.{ts,tsx}');
  console.log(`📁 Found ${files.length} files to process`);
  
  let fixedCount = 0;
  
  files.forEach(file => {
    if (fixFile(file)) {
      fixedCount++;
    }
  });
  
  console.log(`\n🎉 Fixed ${fixedCount} files automatically`);
  console.log('⚠️  Some files may still have complex errors that require manual fixing');
}

if (require.main === module) {
  main();
}

module.exports = { fixFile, syntaxFixes };
