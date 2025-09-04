const fs = require('fs');
const path = require('path');

// Specific patterns to fix import corruption
const importFixPatterns = [
  // Fix icon imports with ": string;" corruption
  { search: /(\w+): string;/g, replace: '$1' },
  
  // Fix import statements with multiple quotes
  { search: /from '[^']*''/g, replace: (match) => match.replace(/''$/, "'") },
  { search: /from "[^"]*""/g, replace: (match) => match.replace(/""$/, '"') },
  { search: /from '[^']*'''/g, replace: (match) => match.replace(/'''$/, "'") },
  
  // Fix corrupted React import
  { search: /^React, \{$/gm, replace: 'import React, {' },
  { search: /^\} from 'react''$/gm, replace: "} from 'react';" },
  
  // Fix function declarations with commas
  { search: /(\w+) = \([^)]*\) => \{,/g, replace: '$1 = ($2) => {' },
  
  // Fix object properties with trailing commas in wrong places
  { search: /\} => \{,$/gm, replace: '} => {' },
  
  // Fix switch statement cases
  { search: /case '([^']+)': return '([^']+)';,$/gm, replace: "case '$1': return '$2';" },
  
  // Fix malformed import statements
  { search: /import \{([^}]+)\} from @([^'";]+)'';/g, replace: "import { $1 } from '@$2';" },
  { search: /import \{([^}]+)\} from '([^']+)''';/g, replace: "import { $1 } from '$2';" }
];

// Function to recursively find all .tsx files
function findTsxFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      findTsxFiles(filePath, fileList);
    } else if (file.endsWith('.tsx')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Function to fix a single file
function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    let fixed = false;
    
    // Apply all import fix patterns
    importFixPatterns.forEach(pattern => {
      const beforeReplace = content;
      content = content.replace(pattern.search, pattern.replace);
      if (content !== beforeReplace) {
        fixed = true;
      }
    });
    
    // Fix specific import corruption patterns line by line
    const lines = content.split('\n');
    let modifiedLines = false;
    
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      
      // Fix import statements with ": string;" corruption
      if (line.includes(': string;') && line.includes('import')) {
        line = line.replace(/(\w+): string;/g, '$1');
        lines[i] = line;
        modifiedLines = true;
      }
      
      // Fix function parameters with trailing commas
      if (line.includes(' = (') && line.endsWith(',')) {
        lines[i] = line.slice(0, -1);
        modifiedLines = true;
      }
      
      // Fix corrupted object/array syntax
      if (line.includes("', '") || line.includes('", "')) {
        line = line.replace(/', '/g, "', ");
        line = line.replace(/", "/g, '", ');
        lines[i] = line;
        modifiedLines = true;
      }
    }
    
    if (modifiedLines) {
      content = lines.join('\n');
      fixed = true;
    }
    
    // Additional comprehensive fixes
    
    // Fix severely corrupted files by rebuilding basic structure
    if (content.includes("React, {") && !content.includes("import React")) {
      content = content.replace(/^React, \{$/gm, 'import React, {');
      fixed = true;
    }
    
    // Fix malformed JSX and object literals
    if (content.includes("'") && content.includes("''")) {
      content = content.replace(/''+/g, "'");
      fixed = true;
    }
    
    if (content.includes('"') && content.includes('""')) {
      content = content.replace(/"+/g, '"');
      fixed = true;
    }
    
    // Fix malformed function declarations
    content = content.replace(/const (\w+): React\.FC = \(\) => \{,/g, 'const $1: React.FC = () => {');
    
    if (fixed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Fixed: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error fixing file ${filePath}:`, error.message);
    return false;
  }
}

// Main execution
function main() {
  const srcDir = path.join(__dirname, 'src');
  
  if (!fs.existsSync(srcDir)) {
    console.error('src directory not found');
    return;
  }
  
  console.log('Finding all .tsx files...');
  const tsxFiles = findTsxFiles(srcDir);
  console.log(`Found ${tsxFiles.length} .tsx files`);
  
  let fixedCount = 0;
  
  tsxFiles.forEach(filePath => {
    if (fixFile(filePath)) {
      fixedCount++;
    }
  });
  
  console.log(`\nFixed ${fixedCount} files out of ${tsxFiles.length} total files`);
}

main();
