#!/usr/bin/env node

/**
 * Autonomous Error Detection System
 * Automatically detects and categorizes errors in the codebase
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class AutonomousErrorDetector {
  constructor() {
    this.errors = [];
    this.projectRoot = process.cwd();
    this.errorPatterns = {
      syntax: [
        /Unexpected token/,
        /Expected/,
        /Missing/,
        /Unterminated/,
        /Invalid/,
        /Parse error/,
        /Syntax error/
      ],
      typeScript: [
        /Type.*is not assignable/,
        /Property.*does not exist/,
        /Cannot find module/,
        /Argument of type.*is not assignable/,
        /Type.*is missing/,
        /Object is possibly.*null/
      ],
      react: [
        /React Hook.*is called/,
        /Cannot read property.*of undefined/,
        /Element type is invalid/,
        /Objects are not valid as a React child/,
        /Warning:.*is not a valid DOM property/
      ],
      import: [
        /Module not found/,
        /Cannot resolve module/,
        /Failed to resolve import/,
        /Import.*cannot be found/
      ],
      linting: [
        /ESLint error/,
        /Prettier error/,
        /Stylelint error/
      ]
    };
  }

  /**
   * Main detection method
   */
  async detectAllErrors() {
    console.log('🔍 Starting autonomous error detection...');
    
    try {
      // Run TypeScript compiler to catch type errors
      await this.detectTypeScriptErrors();
      
      // Run ESLint to catch linting errors
      await this.detectLintingErrors();
      
      // Run build process to catch compilation errors
      await this.detectBuildErrors();
      
      // Scan source files for common patterns
      await this.scanSourceFiles();
      
      // Analyze package.json for dependency issues
      await this.analyzeDependencies();
      
      console.log(`✅ Error detection complete. Found ${this.errors.length} errors.`);
      return this.errors;
      
    } catch (error) {
      console.error('❌ Error during detection:', error.message);
      return this.errors;
    }
  }

  /**
   * Detect TypeScript compilation errors
   */
  async detectTypeScriptErrors() {
    try {
      console.log('🔍 Checking TypeScript errors...');
      const result = execSync('npx tsc --noEmit --pretty false', { 
        encoding: 'utf8',
        cwd: this.projectRoot,
        stdio: 'pipe'
      });
    } catch (error) {
      const output = error.stdout || error.stderr || '';
      this.parseErrorOutput(output, 'typescript');
    }
  }

  /**
   * Detect linting errors
   */
  async detectLintingErrors() {
    try {
      console.log('🔍 Checking ESLint errors...');
      const result = execSync('npx eslint src --format=compact', { 
        encoding: 'utf8',
        cwd: this.projectRoot,
        stdio: 'pipe'
      });
    } catch (error) {
      const output = error.stdout || error.stderr || '';
      this.parseErrorOutput(output, 'linting');
    }
  }

  /**
   * Detect build errors
   */
  async detectBuildErrors() {
    try {
      console.log('🔍 Checking build errors...');
      const result = execSync('npm run build', { 
        encoding: 'utf8',
        cwd: this.projectRoot,
        stdio: 'pipe'
      });
    } catch (error) {
      const output = error.stdout || error.stderr || '';
      this.parseErrorOutput(output, 'build');
    }
  }

  /**
   * Scan source files for common error patterns
   */
  async scanSourceFiles() {
    console.log('🔍 Scanning source files...');
    const srcDir = path.join(this.projectRoot, 'src');
    
    if (!fs.existsSync(srcDir)) {
      return;
    }

    const files = this.getAllFiles(srcDir, ['.ts', '.tsx', '.js', '.jsx']);
    
    for (const file of files) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        this.analyzeFileContent(file, content);
      } catch (error) {
        this.errors.push({
          type: 'file-read',
          file: file,
          message: `Cannot read file: ${error.message}`,
          severity: 'error'
        });
      }
    }
  }

  /**
   * Analyze dependencies for potential issues
   */
  async analyzeDependencies() {
    console.log('🔍 Analyzing dependencies...');
    const packageJsonPath = path.join(this.projectRoot, 'package.json');
    
    if (!fs.existsSync(packageJsonPath)) {
      return;
    }

    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      
      // Check for missing dependencies
      if (packageJson.dependencies) {
        for (const [dep, version] of Object.entries(packageJson.dependencies)) {
          try {
            require.resolve(dep);
          } catch (error) {
            this.errors.push({
              type: 'dependency',
              file: 'package.json',
              message: `Missing dependency: ${dep}`,
              severity: 'error'
            });
          }
        }
      }
    } catch (error) {
      this.errors.push({
        type: 'package-json',
        file: 'package.json',
        message: `Invalid package.json: ${error.message}`,
        severity: 'error'
      });
    }
  }

  /**
   * Parse error output from various tools
   */
  parseErrorOutput(output, source) {
    const lines = output.split('\n');
    
    for (const line of lines) {
      if (!line.trim()) continue;
      
      const error = this.parseErrorLine(line, source);
      if (error) {
        this.errors.push(error);
      }
    }
  }

  /**
   * Parse individual error line
   */
  parseErrorLine(line, source) {
    // TypeScript error format: file(line,col): error TS1234: message
    const tsMatch = line.match(/^(.+?)\((\d+),(\d+)\):\s*(error|warning)\s+(TS\d+):\s*(.+)$/);
    if (tsMatch) {
      return {
        type: 'typescript',
        file: tsMatch[1],
        line: parseInt(tsMatch[2]),
        column: parseInt(tsMatch[3]),
        severity: tsMatch[4],
        code: tsMatch[5],
        message: tsMatch[6],
        source: source
      };
    }

    // ESLint error format: file:line:col: message (rule)
    const eslintMatch = line.match(/^(.+?):(\d+):(\d+):\s*(.+?)\s*\((.+?)\)$/);
    if (eslintMatch) {
      return {
        type: 'linting',
        file: eslintMatch[1],
        line: parseInt(eslintMatch[2]),
        column: parseInt(eslintMatch[3]),
        message: eslintMatch[4],
        rule: eslintMatch[5],
        source: source
      };
    }

    // Generic error format
    const genericMatch = line.match(/^(.+?):(\d+):(\d+):\s*(.+)$/);
    if (genericMatch) {
      return {
        type: 'generic',
        file: genericMatch[1],
        line: parseInt(genericMatch[2]),
        column: parseInt(genericMatch[3]),
        message: genericMatch[4],
        source: source
      };
    }

    return null;
  }

  /**
   * Analyze file content for common patterns
   */
  analyzeFileContent(filePath, content) {
    const lines = content.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNumber = i + 1;
      
      // Check for common React patterns
      if (line.includes('useEffect') && !line.includes('[]') && !line.includes('dependencies')) {
        this.errors.push({
          type: 'react-hook',
          file: filePath,
          line: lineNumber,
          message: 'useEffect missing dependency array',
          severity: 'warning'
        });
      }
      
      // Check for console.log statements
      if (line.includes('console.log') && !filePath.includes('.test.')) {
        this.errors.push({
          type: 'console-log',
          file: filePath,
          line: lineNumber,
          message: 'console.log statement found in production code',
          severity: 'warning'
        });
      }
      
      // Check for TODO comments
      if (line.includes('TODO') || line.includes('FIXME')) {
        this.errors.push({
          type: 'todo',
          file: filePath,
          line: lineNumber,
          message: 'TODO/FIXME comment found',
          severity: 'info'
        });
      }
    }
  }

  /**
   * Get all files with specific extensions
   */
  getAllFiles(dir, extensions) {
    let files = [];
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        files = files.concat(this.getAllFiles(fullPath, extensions));
      } else if (extensions.some(ext => item.endsWith(ext))) {
        files.push(fullPath);
      }
    }
    
    return files;
  }

  /**
   * Generate error report
   */
  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      totalErrors: this.errors.length,
      errorsByType: {},
      errorsBySeverity: {},
      files: new Set()
    };

    for (const error of this.errors) {
      // Count by type
      report.errorsByType[error.type] = (report.errorsByType[error.type] || 0) + 1;
      
      // Count by severity
      report.errorsBySeverity[error.severity] = (report.errorsBySeverity[error.severity] || 0) + 1;
      
      // Track files
      if (error.file) {
        report.files.add(error.file);
      }
    }

    report.files = Array.from(report.files);
    
    return {
      summary: report,
      errors: this.errors
    };
  }

  /**
   * Save error report to file
   */
  saveReport(filename = 'error-report.json') {
    const report = this.generateReport();
    const reportPath = path.join(this.projectRoot, filename);
    
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`📊 Error report saved to: ${reportPath}`);
    
    return reportPath;
  }
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const detector = new AutonomousErrorDetector();
  
  detector.detectAllErrors()
    .then(() => {
      const report = detector.generateReport();
      console.log('\n📊 Error Detection Summary:');
      console.log(`Total Errors: ${report.summary.totalErrors}`);
      console.log('Errors by Type:', report.summary.errorsByType);
      console.log('Errors by Severity:', report.summary.errorsBySeverity);
      
      detector.saveReport();
    })
    .catch(console.error);
}

export default AutonomousErrorDetector;

