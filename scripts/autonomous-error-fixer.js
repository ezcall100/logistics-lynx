#!/usr/bin/env node

/**
 * Autonomous Error Fixing System
 * Automatically fixes common errors detected by the error detector
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class AutonomousErrorFixer {
  constructor() {
    this.projectRoot = process.cwd();
    this.fixesApplied = [];
    this.fixPatterns = {
      syntax: {
        'extra-closing-brace': {
          pattern: /^export default \w+\s*}\s*$/m,
          fix: (content) => content.replace(/^export default \w+\s*}\s*$/m, (match) => match.replace(/\s*}\s*$/, '')),
          description: 'Remove extra closing brace after export default'
        },
        'missing-semicolon': {
          pattern: /^export default \w+$/m,
          fix: (content) => content.replace(/^export default \w+$/m, (match) => match + ';'),
          description: 'Add missing semicolon after export default'
        },
        'unclosed-brace': {
          pattern: /(\w+)\s*{\s*$/m,
          fix: (content) => {
            const lines = content.split('\n');
            let braceCount = 0;
            let lastOpenBrace = -1;
            
            for (let i = 0; i < lines.length; i++) {
              const line = lines[i];
              const openBraces = (line.match(/{/g) || []).length;
              const closeBraces = (line.match(/}/g) || []).length;
              
              braceCount += openBraces - closeBraces;
              
              if (openBraces > 0) {
                lastOpenBrace = i;
              }
            }
            
            if (braceCount > 0 && lastOpenBrace >= 0) {
              lines.splice(lastOpenBrace + 1, 0, '}');
              return lines.join('\n');
            }
            
            return content;
          },
          description: 'Add missing closing brace'
        }
      },
      typescript: {
        'missing-import': {
          pattern: /Cannot find module ['"]([^'"]+)['"]/,
          fix: (content, error) => {
            const moduleName = error.message.match(/Cannot find module ['"]([^'"]+)['"]/)?.[1];
            if (moduleName) {
              const importLine = `import ${moduleName.split('/').pop()} from '${moduleName}';`;
              return importLine + '\n' + content;
            }
            return content;
          },
          description: 'Add missing import statement'
        },
        'type-annotation': {
          pattern: /Type.*is not assignable/,
          fix: (content, error) => {
            // This is complex and would need more context
            // For now, we'll add a type assertion
            return content;
          },
          description: 'Add type annotation or assertion'
        }
      },
      react: {
        'missing-key-prop': {
          pattern: /Warning: Each child in a list should have a unique "key" prop/,
          fix: (content, error) => {
            // This would need more sophisticated parsing
            return content;
          },
          description: 'Add key prop to list items'
        },
        'missing-dependency': {
          pattern: /React Hook.*is called/,
          fix: (content, error) => {
            // This would need to analyze the useEffect and add missing dependencies
            return content;
          },
          description: 'Add missing dependency to useEffect'
        }
      },
      linting: {
        'console-log': {
          pattern: /console\.log/,
          fix: (content) => {
            return content.replace(/console\.log\([^)]*\);?\s*/g, '');
          },
          description: 'Remove console.log statements'
        },
        'unused-import': {
          pattern: /import.*from.*['"][^'"]+['"];?\s*$/m,
          fix: (content) => {
            // This would need to check if imports are actually used
            return content;
          },
          description: 'Remove unused imports'
        }
      }
    };
  }

  /**
   * Main fixing method
   */
  async fixAllErrors(errorReport) {
    console.log('🔧 Starting autonomous error fixing...');
    
    if (!errorReport || !errorReport.errors) {
      console.log('❌ No error report provided');
      return { fixesApplied: 0, errors: [] };
    }

    const errors = errorReport.errors;
    let fixesApplied = 0;
    const remainingErrors = [];

    // Group errors by file
    const errorsByFile = this.groupErrorsByFile(errors);

    for (const [filePath, fileErrors] of Object.entries(errorsByFile)) {
      try {
        const fixed = await this.fixFileErrors(filePath, fileErrors);
        if (fixed) {
          fixesApplied++;
        }
      } catch (error) {
        console.error(`❌ Error fixing file ${filePath}:`, error.message);
        remainingErrors.push(...fileErrors);
      }
    }

    console.log(`✅ Error fixing complete. Applied ${fixesApplied} fixes.`);
    return { fixesApplied, remainingErrors };
  }

  /**
   * Group errors by file
   */
  groupErrorsByFile(errors) {
    const grouped = {};
    
    for (const error of errors) {
      if (!error.file) continue;
      
      if (!grouped[error.file]) {
        grouped[error.file] = [];
      }
      
      grouped[error.file].push(error);
    }
    
    return grouped;
  }

  /**
   * Fix errors in a specific file
   */
  async fixFileErrors(filePath, errors) {
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File not found: ${filePath}`);
      return false;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    console.log(`🔧 Fixing ${errors.length} errors in ${filePath}`);

    for (const error of errors) {
      const fixResult = this.applyFix(content, error);
      if (fixResult.fixed) {
        content = fixResult.content;
        modified = true;
        this.fixesApplied.push({
          file: filePath,
          error: error,
          fix: fixResult.fix
        });
        console.log(`  ✅ Fixed: ${error.message}`);
      } else {
        console.log(`  ⚠️  Could not fix: ${error.message}`);
      }
    }

    if (modified) {
      // Create backup
      const backupPath = filePath + '.backup';
      fs.writeFileSync(backupPath, fs.readFileSync(filePath));
      
      // Write fixed content
      fs.writeFileSync(filePath, content);
      
      console.log(`💾 Fixed file saved: ${filePath}`);
      return true;
    }

    return false;
  }

  /**
   * Apply a specific fix to content
   */
  applyFix(content, error) {
    const errorType = error.type;
    const fixCategory = this.fixPatterns[errorType];
    
    if (!fixCategory) {
      return { fixed: false, content, fix: null };
    }

    // Try each fix pattern for this error type
    for (const [fixName, fixConfig] of Object.entries(fixCategory)) {
      if (this.canApplyFix(content, error, fixConfig)) {
        const fixedContent = fixConfig.fix(content, error);
        if (fixedContent !== content) {
          return {
            fixed: true,
            content: fixedContent,
            fix: {
              name: fixName,
              description: fixConfig.description
            }
          };
        }
      }
    }

    return { fixed: false, content, fix: null };
  }

  /**
   * Check if a fix can be applied
   */
  canApplyFix(content, error, fixConfig) {
    // Check if the error message matches the fix pattern
    if (fixConfig.pattern && !fixConfig.pattern.test(error.message)) {
      return false;
    }

    // Additional checks based on error type
    switch (error.type) {
      case 'syntax':
        return this.canFixSyntaxError(content, error);
      case 'typescript':
        return this.canFixTypeScriptError(content, error);
      case 'react':
        return this.canFixReactError(content, error);
      case 'linting':
        return this.canFixLintingError(content, error);
      default:
        return true;
    }
  }

  /**
   * Check if syntax error can be fixed
   */
  canFixSyntaxError(content, error) {
    if (error.message.includes('Unexpected token')) {
      // Check for common syntax issues
      const lines = content.split('\n');
      const errorLine = lines[error.line - 1];
      
      if (errorLine && errorLine.includes('}') && errorLine.trim() === '}') {
        // Check if this is an extra closing brace
        const beforeLine = lines[error.line - 2];
        if (beforeLine && beforeLine.includes('export default')) {
          return true;
        }
      }
    }
    
    return false;
  }

  /**
   * Check if TypeScript error can be fixed
   */
  canFixTypeScriptError(content, error) {
    if (error.message.includes('Cannot find module')) {
      return true;
    }
    
    return false;
  }

  /**
   * Check if React error can be fixed
   */
  canFixReactError(content, error) {
    if (error.message.includes('React Hook')) {
      return true;
    }
    
    return false;
  }

  /**
   * Check if linting error can be fixed
   */
  canFixLintingError(content, error) {
    if (error.message.includes('console.log')) {
      return true;
    }
    
    return false;
  }

  /**
   * Run automatic formatting
   */
  async runFormatting() {
    console.log('🎨 Running automatic formatting...');
    
    try {
      // Run Prettier
      execSync('npx prettier --write src/', { 
        cwd: this.projectRoot,
        stdio: 'pipe'
      });
      console.log('✅ Prettier formatting applied');
    } catch (error) {
      console.log('⚠️  Prettier formatting failed:', error.message);
    }

    try {
      // Run ESLint with --fix
      execSync('npx eslint src --fix', { 
        cwd: this.projectRoot,
        stdio: 'pipe'
      });
      console.log('✅ ESLint auto-fixes applied');
    } catch (error) {
      console.log('⚠️  ESLint auto-fixes failed:', error.message);
    }
  }

  /**
   * Generate fix report
   */
  generateFixReport() {
    const report = {
      timestamp: new Date().toISOString(),
      totalFixes: this.fixesApplied.length,
      fixesByType: {},
      fixesByFile: {}
    };

    for (const fix of this.fixesApplied) {
      // Count by type
      const errorType = fix.error.type;
      report.fixesByType[errorType] = (report.fixesByType[errorType] || 0) + 1;
      
      // Count by file
      report.fixesByFile[fix.file] = (report.fixesByFile[fix.file] || 0) + 1;
    }

    return {
      summary: report,
      fixes: this.fixesApplied
    };
  }

  /**
   * Save fix report
   */
  saveFixReport(filename = 'fix-report.json') {
    const report = this.generateFixReport();
    const reportPath = path.join(this.projectRoot, filename);
    
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`📊 Fix report saved to: ${reportPath}`);
    
    return reportPath;
  }

  /**
   * Clean up backup files
   */
  cleanupBackups() {
    console.log('🧹 Cleaning up backup files...');
    
    const files = fs.readdirSync(this.projectRoot);
    const backupFiles = files.filter(file => file.endsWith('.backup'));
    
    for (const backupFile of backupFiles) {
      const backupPath = path.join(this.projectRoot, backupFile);
      fs.unlinkSync(backupPath);
      console.log(`🗑️  Removed backup: ${backupFile}`);
    }
  }
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const fixer = new AutonomousErrorFixer();
  
  // Load error report if provided
  const errorReportPath = process.argv[2];
  let errorReport = null;
  
  if (errorReportPath && fs.existsSync(errorReportPath)) {
    errorReport = JSON.parse(fs.readFileSync(errorReportPath, 'utf8'));
  }
  
  if (!errorReport) {
    console.log('❌ No error report provided. Usage: node autonomous-error-fixer.js <error-report.json>');
    process.exit(1);
  }
  
  fixer.fixAllErrors(errorReport)
    .then(async (result) => {
      console.log('\n📊 Fix Summary:');
      console.log(`Fixes Applied: ${result.fixesApplied}`);
      console.log(`Remaining Errors: ${result.remainingErrors.length}`);
      
      // Run formatting
      await fixer.runFormatting();
      
      // Save fix report
      fixer.saveFixReport();
      
      // Clean up backups
      fixer.cleanupBackups();
    })
    .catch(console.error);
}

export default AutonomousErrorFixer;

