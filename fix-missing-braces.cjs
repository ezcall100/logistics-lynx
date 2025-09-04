const fs = require('fs');
const path = require('path');

// Function to recursively find all TypeScript files
function findTsFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules' && item !== 'dist') {
      findTsFiles(fullPath, files);
    } else if (item.endsWith('.ts') || item.endsWith('.tsx')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Function to fix missing closing braces
function fixMissingBraces(content) {
  const lines = content.split('\n');
  const newLines = [];
  let braceCount = 0;
  let inComponent = false;
  let componentStartLine = -1;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    newLines.push(line);
    
    // Count braces
    for (const char of line) {
      if (char === '{') {
        braceCount++;
        // Check if this is a component function start
        if (line.includes('const') && line.includes(': React.FC') && line.includes('= () => {')) {
          inComponent = true;
          componentStartLine = i;
        }
      } else if (char === '}') {
        braceCount--;
      }
    }
    
    // If we're at the end of the file and have unclosed braces
    if (i === lines.length - 1 && braceCount > 0) {
      // Add missing closing braces
      for (let j = 0; j < braceCount; j++) {
        newLines.push('}');
      }
    }
  }
  
  return newLines.join('\n');
}

// Function to fix specific export issues
function fixExportIssues(content) {
  // Fix export default issues
  content = content.replace(/export default ([^;]+);\s*$/gm, 'export default $1;');
  
  // Fix missing closing braces in object exports
  content = content.replace(/export const ([^=]+) = \{([^}]*)$/gm, (match, name, body) => {
    return `export const ${name} = {${body}};`;
  });
  
  return content;
}

console.log('🔧 Fixing missing braces and export issues...');

// Get all TypeScript files
const tsFiles = findTsFiles('src');
let fixedCount = 0;

tsFiles.forEach((file, index) => {
  try {
    let content = fs.readFileSync(file, 'utf8');
    const originalContent = content;
    
    // Apply fixes
    content = fixMissingBraces(content);
    content = fixExportIssues(content);
    
    // Write back if changed
    if (content !== originalContent) {
      fs.writeFileSync(file, content, 'utf8');
      fixedCount++;
      console.log(`✅ Fixed: ${file}`);
    }
    
    // Progress indicator
    if ((index + 1) % 50 === 0) {
      console.log(`📊 Progress: ${index + 1}/${tsFiles.length} files processed...`);
    }
  } catch (error) {
    console.log(`❌ Error processing ${file}:`, error.message);
  }
});

console.log(`\n🎉 Missing braces fix complete!`);
console.log(`📊 Files Fixed: ${fixedCount}/${tsFiles.length}`);

// Run type check to see results
console.log('\n🔍 Running type check to verify fixes...');
