#!/usr/bin/env node

/**
 * MCP Auto Error Fixer System
 * Provides automatic error detection and fixing functionality for MCP agents
 * Operates with full authority - no human intervention required
 */

import fs from 'fs';
import path from 'path';
import { spawn, execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class MCPAutoErrorFixer {
  constructor() {
    this.config = this.loadConfig();
    this.errorLog = [];
    this.fixLog = [];
    this.lastScanTime = null;
    this.isRunning = false;
  }

  loadConfig() {
    try {
      const configPath = path.join(__dirname, 'mcp-auto-run-config.json');
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      return config.mcpAutoRunConfig.globalSettings.fullAuthority;
    } catch (error) {
      console.error('❌ Error loading MCP config:', error.message);
      return this.getDefaultConfig();
    }
  }

  getDefaultConfig() {
    return {
      autoFixErrors: true,
      autoFixWarnings: true,
      autoFixProblems: true,
      errorRecovery: true,
      problemResolution: true
    };
  }

  logActivity(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      type,
      message
    };

    if (type === 'error' || type === 'fix') {
      this.errorLog.push(logEntry);
    }
    this.fixLog.push(logEntry);

    // Keep only last 1000 entries
    if (this.errorLog.length > 1000) {
      this.errorLog = this.errorLog.slice(-1000);
    }
    if (this.fixLog.length > 1000) {
      this.fixLog = this.fixLog.slice(-1000);
    }

    // Console output with emojis
    const emoji = {
      info: 'ℹ️',
      success: '✅',
      warning: '⚠️',
      error: '❌',
      fix: '🔧',
      scan: '🔍'
    };

    console.log(`${emoji[type]} [${timestamp}] ${message}`);
  }

  async executeCommand(command, options = {}) {
    return new Promise((resolve, reject) => {
      const child = spawn(command, [], {
        shell: true,
        stdio: 'pipe',
        ...options
      });

      let stdout = '';
      let stderr = '';

      child.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      child.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      child.on('close', (code) => {
        if (code === 0) {
          resolve({ success: true, stdout, stderr });
        } else {
          reject({ success: false, stdout, stderr, code });
        }
      });

      child.on('error', (error) => {
        reject({ success: false, error: error.message });
      });
    });
  }

  async scanForErrors() {
    this.logActivity('Starting comprehensive error scan', 'scan');
    const errors = [];

    try {
      // 1. ESLint errors
      try {
        const eslintResult = await this.executeCommand('npm run lint');
        this.logActivity('ESLint scan completed - no errors found', 'success');
      } catch (eslintError) {
        const eslintErrors = this.parseESLintOutput(eslintError.stdout);
        errors.push(...eslintErrors);
        this.logActivity(`Found ${eslintErrors.length} ESLint errors`, 'warning');
      }

      // 2. TypeScript errors
      try {
        const tsResult = await this.executeCommand('npm run typecheck');
        this.logActivity('TypeScript scan completed - no errors found', 'success');
      } catch (tsError) {
        const tsErrors = this.parseTypeScriptOutput(tsError.stdout);
        errors.push(...tsErrors);
        this.logActivity(`Found ${tsErrors.length} TypeScript errors`, 'warning');
      }

      // 3. Build errors
      try {
        const buildResult = await this.executeCommand('npm run build');
        this.logActivity('Build scan completed - no errors found', 'success');
      } catch (buildError) {
        const buildErrors = this.parseBuildOutput(buildError.stdout);
        errors.push(...buildErrors);
        this.logActivity(`Found ${buildErrors.length} build errors`, 'warning');
      }

      // 4. Import errors
      const importErrors = await this.scanImportErrors();
      errors.push(...importErrors);

      // 5. Syntax errors
      const syntaxErrors = await this.scanSyntaxErrors();
      errors.push(...syntaxErrors);

      // 6. Dependency errors
      const dependencyErrors = await this.scanDependencyErrors();
      errors.push(...dependencyErrors);

      this.lastScanTime = new Date();
      this.logActivity(`Error scan completed - Found ${errors.length} total issues`, 'info');

      return errors;
    } catch (error) {
      this.logActivity(`Error during scan: ${error.message}`, 'error');
      return [];
    }
  }

  parseESLintOutput(output) {
    const errors = [];
    const lines = output.split('\n');
    
    for (const line of lines) {
      if (line.includes('error') && line.includes(':')) {
        const match = line.match(/(.+):(\d+):(\d+):\s*(.+)/);
        if (match) {
          errors.push({
            type: 'eslint',
            file: match[1],
            line: parseInt(match[2]),
            column: parseInt(match[3]),
            message: match[4],
            severity: 'error'
          });
        }
      }
    }
    
    return errors;
  }

  parseTypeScriptOutput(output) {
    const errors = [];
    const lines = output.split('\n');
    
    for (const line of lines) {
      if (line.includes('error TS') && line.includes(':')) {
        const match = line.match(/(.+):(\d+):(\d+):\s*(.+)/);
        if (match) {
          errors.push({
            type: 'typescript',
            file: match[1],
            line: parseInt(match[2]),
            column: parseInt(match[3]),
            message: match[4],
            severity: 'error'
          });
        }
      }
    }
    
    return errors;
  }

  parseBuildOutput(output) {
    const errors = [];
    const lines = output.split('\n');
    
    for (const line of lines) {
      if (line.includes('error') && (line.includes('.ts') || line.includes('.tsx') || line.includes('.js'))) {
        errors.push({
          type: 'build',
          file: 'build',
          line: 0,
          column: 0,
          message: line.trim(),
          severity: 'error'
        });
      }
    }
    
    return errors;
  }

  async scanImportErrors() {
    const errors = [];
    const srcDir = path.join(__dirname, 'src');
    
    if (fs.existsSync(srcDir)) {
      const files = this.getAllFiles(srcDir, ['.ts', '.tsx', '.js', '.jsx']);
      
      for (const file of files) {
        try {
          const content = fs.readFileSync(file, 'utf8');
          const lines = content.split('\n');
          
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (line.includes('import') && line.includes('from')) {
              const importMatch = line.match(/from\s+['"]([^'"]+)['"]/);
              if (importMatch) {
                const importPath = importMatch[1];
                if (!this.isValidImport(importPath, file)) {
                  errors.push({
                    type: 'import',
                    file: file,
                    line: i + 1,
                    column: 0,
                    message: `Invalid import: ${importPath}`,
                    severity: 'error'
                  });
                }
              }
            }
          }
        } catch (error) {
          // File read error - skip
        }
      }
    }
    
    return errors;
  }

  async scanSyntaxErrors() {
    const errors = [];
    const srcDir = path.join(__dirname, 'src');
    
    if (fs.existsSync(srcDir)) {
      const files = this.getAllFiles(srcDir, ['.ts', '.tsx', '.js', '.jsx']);
      
      for (const file of files) {
        try {
          const content = fs.readFileSync(file, 'utf8');
          const lines = content.split('\n');
          
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
            // Check for common syntax errors
            if (this.hasSyntaxError(line)) {
              errors.push({
                type: 'syntax',
                file: file,
                line: i + 1,
                column: 0,
                message: `Syntax error detected: ${line.trim()}`,
                severity: 'error'
              });
            }
          }
        } catch (error) {
          // File read error - skip
        }
      }
    }
    
    return errors;
  }

  async scanDependencyErrors() {
    const errors = [];
    
    try {
      // Check for missing dependencies
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
      
      for (const [dep, version] of Object.entries(dependencies)) {
        try {
          require.resolve(dep);
        } catch (error) {
          errors.push({
            type: 'dependency',
            file: 'package.json',
            line: 0,
            column: 0,
            message: `Missing dependency: ${dep}`,
            severity: 'error'
          });
        }
      }
    } catch (error) {
      this.logActivity(`Error scanning dependencies: ${error.message}`, 'error');
    }
    
    return errors;
  }

  getAllFiles(dir, extensions) {
    const files = [];
    
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        files.push(...this.getAllFiles(fullPath, extensions));
      } else if (extensions.some(ext => item.endsWith(ext))) {
        files.push(fullPath);
      }
    }
    
    return files;
  }

  isValidImport(importPath, currentFile) {
    // Basic import validation
    if (importPath.startsWith('.') || importPath.startsWith('/')) {
      const resolvedPath = path.resolve(path.dirname(currentFile), importPath);
      return fs.existsSync(resolvedPath) || fs.existsSync(resolvedPath + '.ts') || fs.existsSync(resolvedPath + '.js');
    }
    return true; // Assume external packages are valid
  }

  hasSyntaxError(line) {
    // Basic syntax error detection
    const trimmed = line.trim();
    
    // Check for unmatched brackets/parentheses
    const openBrackets = (trimmed.match(/[\(\[\{]/g) || []).length;
    const closeBrackets = (trimmed.match(/[\)\]\}]/g) || []).length;
    
    if (openBrackets !== closeBrackets) {
      return true;
    }
    
    // Check for missing semicolons in certain contexts
    if (trimmed.includes('const') || trimmed.includes('let') || trimmed.includes('var')) {
      if (!trimmed.endsWith(';') && !trimmed.endsWith('{') && !trimmed.includes('=')) {
        return true;
      }
    }
    
    return false;
  }

  async autoFixErrors(errors) {
    if (!this.config.autoFixErrors) {
      this.logActivity('Auto-fix disabled in configuration', 'warning');
      return [];
    }

    this.logActivity(`Starting auto-fix for ${errors.length} errors`, 'fix');
    const fixedErrors = [];

    for (const error of errors) {
      try {
        const fixed = await this.fixError(error);
        if (fixed) {
          fixedErrors.push(error);
          this.logActivity(`Fixed error in ${error.file}:${error.line}`, 'success');
        }
      } catch (fixError) {
        this.logActivity(`Failed to fix error in ${error.file}: ${fixError.message}`, 'error');
      }
    }

    this.logActivity(`Auto-fix completed - Fixed ${fixedErrors.length}/${errors.length} errors`, 'fix');
    return fixedErrors;
  }

  async fixError(error) {
    try {
      switch (error.type) {
        case 'eslint':
          return await this.fixESLintError(error);
        case 'typescript':
          return await this.fixTypeScriptError(error);
        case 'import':
          return await this.fixImportError(error);
        case 'syntax':
          return await this.fixSyntaxError(error);
        case 'dependency':
          return await this.fixDependencyError(error);
        default:
          return false;
      }
    } catch (error) {
      this.logActivity(`Error fixing ${error.type} error: ${error.message}`, 'error');
      return false;
    }
  }

  async fixESLintError(error) {
    try {
      // Try to auto-fix with ESLint
      await this.executeCommand(`npx eslint --fix "${error.file}"`);
      return true;
    } catch (fixError) {
      // If auto-fix fails, try manual fixes
      return await this.manualESLintFix(error);
    }
  }

  async fixTypeScriptError(error) {
    try {
      const content = fs.readFileSync(error.file, 'utf8');
      const lines = content.split('\n');
      
      // Apply common TypeScript fixes
      const fixed = this.applyTypeScriptFixes(lines, error);
      
      if (fixed) {
        fs.writeFileSync(error.file, lines.join('\n'));
        return true;
      }
      
      return false;
    } catch (error) {
      return false;
    }
  }

  async fixImportError(error) {
    try {
      const content = fs.readFileSync(error.file, 'utf8');
      const lines = content.split('\n');
      
      // Try to fix import path
      const fixed = this.fixImportPath(lines, error);
      
      if (fixed) {
        fs.writeFileSync(error.file, lines.join('\n'));
        return true;
      }
      
      return false;
    } catch (error) {
      return false;
    }
  }

  async fixSyntaxError(error) {
    try {
      const content = fs.readFileSync(error.file, 'utf8');
      const lines = content.split('\n');
      
      // Apply syntax fixes
      const fixed = this.applySyntaxFixes(lines, error);
      
      if (fixed) {
        fs.writeFileSync(error.file, lines.join('\n'));
        return true;
      }
      
      return false;
    } catch (error) {
      return false;
    }
  }

  async fixDependencyError(error) {
    try {
      // Install missing dependency
      const depName = error.message.match(/Missing dependency: (.+)/)?.[1];
      if (depName) {
        await this.executeCommand(`npm install ${depName}`);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  applyTypeScriptFixes(lines, error) {
    const lineIndex = error.line - 1;
    const line = lines[lineIndex];
    
    // Common TypeScript fixes
    if (error.message.includes('implicitly has an \'any\' type')) {
      // Add type annotation
      const fixedLine = line.replace(/(\w+)\s*=\s*([^;]+)/, '$1: any = $2');
      lines[lineIndex] = fixedLine;
      return true;
    }
    
    if (error.message.includes('Cannot find module')) {
      // Try to fix import
      const moduleMatch = error.message.match(/Cannot find module '([^']+)'/);
      if (moduleMatch) {
        const moduleName = moduleMatch[1];
        // Try common alternatives
        const alternatives = [
          moduleName.replace(/^\.\//, '../'),
          moduleName.replace(/\.ts$/, ''),
          moduleName.replace(/\.js$/, '')
        ];
        
        for (const alt of alternatives) {
          if (this.isValidImport(alt, error.file)) {
            lines[lineIndex] = line.replace(moduleName, alt);
            return true;
          }
        }
      }
    }
    
    return false;
  }

  fixImportPath(lines, error) {
    const lineIndex = error.line - 1;
    const line = lines[lineIndex];
    
    const importMatch = line.match(/from\s+['"]([^'"]+)['"]/);
    if (importMatch) {
      const currentPath = importMatch[1];
      const dir = path.dirname(error.file);
      
      // Try common import path fixes
      const alternatives = [
        currentPath.replace(/^\.\//, '../'),
        currentPath.replace(/\.ts$/, ''),
        currentPath.replace(/\.js$/, ''),
        currentPath + '.ts',
        currentPath + '.js'
      ];
      
      for (const alt of alternatives) {
        const resolvedPath = path.resolve(dir, alt);
        if (fs.existsSync(resolvedPath) || fs.existsSync(resolvedPath + '.ts') || fs.existsSync(resolvedPath + '.js')) {
          lines[lineIndex] = line.replace(currentPath, alt);
          return true;
        }
      }
    }
    
    return false;
  }

  applySyntaxFixes(lines, error) {
    const lineIndex = error.line - 1;
    const line = lines[lineIndex];
    
    // Fix missing semicolons
    if (line.includes('const') || line.includes('let') || line.includes('var')) {
      if (!line.endsWith(';') && !line.endsWith('{') && line.includes('=')) {
        lines[lineIndex] = line + ';';
        return true;
      }
    }
    
    // Fix unmatched brackets
    const openBrackets = (line.match(/[\(\[\{]/g) || []).length;
    const closeBrackets = (line.match(/[\)\]\}]/g) || []).length;
    
    if (openBrackets > closeBrackets) {
      const missing = openBrackets - closeBrackets;
      const closing = ['}', ']', ')'].slice(0, missing).join('');
      lines[lineIndex] = line + closing;
      return true;
    }
    
    return false;
  }

  async manualESLintFix(error) {
    try {
      const content = fs.readFileSync(error.file, 'utf8');
      const lines = content.split('\n');
      
      // Apply common ESLint fixes
      const fixed = this.applyESLintFixes(lines, error);
      
      if (fixed) {
        fs.writeFileSync(error.file, lines.join('\n'));
        return true;
      }
      
      return false;
    } catch (error) {
      return false;
    }
  }

  applyESLintFixes(lines, error) {
    const lineIndex = error.line - 1;
    const line = lines[lineIndex];
    
    // Fix common ESLint issues
    if (error.message.includes('Unexpected var')) {
      lines[lineIndex] = line.replace(/var\s+/, 'const ');
      return true;
    }
    
    if (error.message.includes('Missing semicolon')) {
      if (!line.endsWith(';')) {
        lines[lineIndex] = line + ';';
        return true;
      }
    }
    
    if (error.message.includes('Unexpected console')) {
      lines[lineIndex] = line.replace(/console\.(log|warn|error)/, '// console.$1');
      return true;
    }
    
    return false;
  }

  async startErrorMonitoring() {
    if (this.isRunning) {
      this.logActivity('Error monitoring already running', 'warning');
      return;
    }

    this.isRunning = true;
    this.logActivity('🔧 Starting MCP Auto Error Fixer - Full Authority Mode', 'info');
    this.logActivity('System will automatically detect and fix errors 24/7', 'info');

    // Initial scan
    await this.runErrorFixCycle();

    // Set up continuous monitoring
    const monitorInterval = setInterval(async () => {
      if (!this.isRunning) {
        clearInterval(monitorInterval);
        return;
      }

      try {
        await this.runErrorFixCycle();
      } catch (error) {
        this.logActivity(`Error in monitoring cycle: ${error.message}`, 'error');
      }
    }, 300000); // Check every 5 minutes

    // Handle graceful shutdown
    process.on('SIGINT', async () => {
      this.logActivity('Received shutdown signal, stopping error monitoring', 'warning');
      await this.stopErrorMonitoring();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      this.logActivity('Received termination signal, stopping error monitoring', 'warning');
      await this.stopErrorMonitoring();
      process.exit(0);
    });
  }

  async runErrorFixCycle() {
    try {
      this.logActivity('Starting error fix cycle', 'scan');
      
      // Scan for errors
      const errors = await this.scanForErrors();
      
      if (errors.length > 0) {
        this.logActivity(`Found ${errors.length} errors, starting auto-fix`, 'fix');
        
        // Auto-fix errors
        const fixedErrors = await this.autoFixErrors(errors);
        
        // Re-scan to verify fixes
        const remainingErrors = await this.scanForErrors();
        
        this.logActivity(`Error fix cycle completed - Fixed: ${fixedErrors.length}, Remaining: ${remainingErrors.length}`, 'success');
      } else {
        this.logActivity('No errors found in current cycle', 'success');
      }
      
    } catch (error) {
      this.logActivity(`Error in fix cycle: ${error.message}`, 'error');
    }
  }

  async stopErrorMonitoring() {
    this.isRunning = false;
    this.logActivity('🛑 Stopping MCP Auto Error Fixer', 'info');
    
    // Final error fix cycle
    await this.runErrorFixCycle();
    
    this.logActivity('Error monitoring stopped', 'info');
  }

  getStatus() {
    return {
      isRunning: this.isRunning,
      lastScanTime: this.lastScanTime,
      errorLogCount: this.errorLog.length,
      fixLogCount: this.fixLog.length,
      recentErrors: this.errorLog.slice(-5),
      recentFixes: this.fixLog.slice(-5)
    };
  }
}

// CLI Interface
async function main() {
  const errorFixer = new MCPAutoErrorFixer();
  
  const command = process.argv[2];

  switch (command) {
    case 'start':
      await errorFixer.startErrorMonitoring();
      break;
    case 'stop':
      await errorFixer.stopErrorMonitoring();
      break;
    case 'status':
      const status = errorFixer.getStatus();
      console.log('📊 MCP Auto Error Fixer Status:');
      console.log(JSON.stringify(status, null, 2));
      break;
    case 'scan':
      const errors = await errorFixer.scanForErrors();
      console.log(`Found ${errors.length} errors`);
      break;
    case 'fix':
      const scanErrors = await errorFixer.scanForErrors();
      const fixed = await errorFixer.autoFixErrors(scanErrors);
      console.log(`Fixed ${fixed.length} errors`);
      break;
    default:
      console.log('🔧 MCP Auto Error Fixer System');
      console.log('================================');
      console.log('Usage:');
      console.log('  node mcp-auto-error-fixer.js start    # Start error monitoring');
      console.log('  node mcp-auto-error-fixer.js stop     # Stop error monitoring');
      console.log('  node mcp-auto-error-fixer.js status   # Show status');
      console.log('  node mcp-auto-error-fixer.js scan     # Scan for errors');
      console.log('  node mcp-auto-error-fixer.js fix      # Fix found errors');
      console.log('');
      console.log('⚠️  WARNING: Full authority mode - No human intervention required');
      console.log('   System will automatically fix errors 24/7');
      break;
  }
}

// Export for use as module
export default MCPAutoErrorFixer;

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}
