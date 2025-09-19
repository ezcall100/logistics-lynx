#!/usr/bin/env node

/**
 * Fix Export Statement Typos
 * Fixes common typos in export statements and syntax errors
 */

import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';
import path from 'path';

class ExportTyposFixer {
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

      // Get the expected component name from the file path
      const fileName = path.basename(filePath, path.extname(filePath));
      const expectedName = fileName;

      // Fix 1: Fix common typos in export statements
      const exportMatches = content.match(/export\s+default\s+(\w+);?$/gm);
      if (exportMatches) {
        exportMatches.forEach(match => {
          const currentName = match.match(/export\s+default\s+(\w+);?$/)[1];
          if (currentName !== expectedName) {
            fixedContent = fixedContent.replace(
              new RegExp(`export\\s+default\\s+${currentName};?$`, 'gm'),
              `export default ${expectedName};`
            );
            fileFixes++;
          }
        });
      }

      // Fix 2: Fix missing semicolons in export statements
      fixedContent = fixedContent.replace(/export\s+default\s+(\w+)(?!;)$/gm, 'export default $1;');

      // Fix 3: Fix malformed export statements
      fixedContent = fixedContent.replace(/export\s+default\s+(\w+)\}/g, 'export default $1;');
      fixedContent = fixedContent.replace(/export\s+default\s+(\w+)\s*\}\s*$/gm, 'export default $1;');

      // Fix 4: Fix missing closing braces before export
      fixedContent = fixedContent.replace(/(\s+)(\n\s*export\s+default)/g, '$1}\n$2');

      // Fix 5: Fix JSX syntax errors
      fixedContent = fixedContent.replace(/aria-label="Button" else \{/g, 'aria-label="Button"');
      fixedContent = fixedContent.replace(/(\s+)(<\/div>\s*\);\s*)(\s*\)\}\s*)(\s*<\/nav>\s*<\/div>\s*<\/div>\s*<div)/g, '$1$2$3$4');

      // Count fixes
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
    this.log('Starting export typos fix...');
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

      this.log('Export typos fix completed!');
    } catch (error) {
      this.log(`Error during fixing process: ${error.message}`);
      process.exit(1);
    }
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const fixer = new ExportTyposFixer();
  fixer.run();
}

export default ExportTyposFixer;
