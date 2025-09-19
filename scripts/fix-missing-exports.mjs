#!/usr/bin/env node

/**
 * Fix Missing Default Exports
 * Adds missing default exports to all affected files
 */

import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';
import path from 'path';

class MissingExportsFixer {
  constructor() {
    this.fixedFiles = 0;
    this.totalFixes = 0;
    this.errors = [];
  }

  log(message) {
    console.log(`[${new Date().toISOString()}] ${message}`);
  }

  fixFile(filePath) {
    try {
      const content = readFileSync(filePath, 'utf8');
      let fixedContent = content;
      let fileFixes = 0;

      // Get the component name from the file path
      const fileName = path.basename(filePath, path.extname(filePath));
      const componentName = fileName;

      // Check if file already has a default export
      const hasDefaultExport = /export\s+default\s+\w+/.test(content);
      
      if (!hasDefaultExport) {
        // Check if there's a component declaration
        const componentMatch = content.match(/(?:function|const)\s+(\w+)\s*[=\(]/);
        
        if (componentMatch) {
          const componentName = componentMatch[1];
          
          // Add default export at the end of the file
          if (!content.trim().endsWith('}')) {
            // Fix missing closing brace first
            fixedContent = content.replace(/(\s+)(\n\s*$)/g, '$1}');
          }
          
          // Add default export
          fixedContent += `\n\nexport default ${componentName};`;
          fileFixes++;
        } else {
          // If no component found, create a simple default export
          fixedContent += `\n\nexport default function ${componentName}() {\n  return <div>${componentName}</div>;\n}`;
          fileFixes++;
        }
      }

      // Fix malformed export statements
      fixedContent = fixedContent.replace(/export default (\w+)\}/g, 'export default $1');
      fixedContent = fixedContent.replace(/export\s+default\s+(\w+)\s*\}\s*$/, 'export default $1;');

      // Count additional fixes
      if (fixedContent !== content) {
        writeFileSync(filePath, fixedContent, 'utf8');
        this.fixedFiles++;
        this.totalFixes += fileFixes;
        this.log(`Fixed ${fileFixes} issues in ${filePath}`);
      }

    } catch (error) {
      this.errors.push({ file: filePath, error: error.message });
    }
  }

  async findTypeScriptFiles(dir) {
    const files = await glob('**/*.{ts,tsx}', { 
      cwd: dir,
      ignore: ['node_modules/**', 'dist/**', 'build/**']
    });
    return files.map(file => path.join(dir, file));
  }

  async run() {
    this.log('Starting missing exports fix...');
    this.log('='.repeat(50));

    try {
      const projectRoot = process.cwd();
      const srcDir = path.join(projectRoot, 'src');
      const files = await this.findTypeScriptFiles(srcDir);

      this.log(`Found ${files.length} TypeScript files to check`);

      // Process files in batches
      const batchSize = 10;
      for (let i = 0; i < files.length; i += batchSize) {
        const batch = files.slice(i, i + batchSize);
        await Promise.all(batch.map(file => this.fixFile(file)));
        
        if (i % 50 === 0) {
          this.log(`Processed ${i + batch.length} files...`);
        }
      }

      this.log('='.repeat(50));
      this.log(`Fixed ${this.totalFixes} issues in ${this.fixedFiles} files`);
      
      if (this.errors.length > 0) {
        this.log(`Encountered ${this.errors.length} errors:`);
        this.errors.forEach(error => {
          this.log(`  - ${error.file}: ${error.error}`);
        });
      }

      this.log('Missing exports fix completed!');
    } catch (error) {
      this.log(`Error during fixing process: ${error.message}`);
      process.exit(1);
    }
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const fixer = new MissingExportsFixer();
  fixer.run();
}

export default MissingExportsFixer;
