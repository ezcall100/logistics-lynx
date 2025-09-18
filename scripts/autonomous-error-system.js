#!/usr/bin/env node

/**
 * Autonomous Error System - Main Orchestrator
 * Combines error detection and fixing into a single autonomous system
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

import AutonomousErrorDetector from './autonomous-error-detector.js';
import AutonomousErrorFixer from './autonomous-error-fixer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class AutonomousErrorSystem {
  constructor() {
    this.detector = new AutonomousErrorDetector();
    this.fixer = new AutonomousErrorFixer();
    this.projectRoot = process.cwd();
    this.config = this.loadConfig();
  }

  /**
   * Load configuration
   */
  loadConfig() {
    const configPath = path.join(this.projectRoot, 'autonomous-error-config.json');
    
    const defaultConfig = {
      autoFix: true,
      autoFormat: true,
      createBackups: true,
      maxIterations: 3,
      fixTypes: ['syntax', 'linting', 'console-log'],
      skipTypes: ['todo', 'info'],
      watchMode: false,
      reportPath: 'error-reports'
    };

    if (fs.existsSync(configPath)) {
      try {
        const userConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        return { ...defaultConfig, ...userConfig };
      } catch (error) {
        console.log('⚠️  Invalid config file, using defaults');
      }
    }

    return defaultConfig;
  }

  /**
   * Main autonomous error handling method
   */
  async runAutonomousSystem() {
    console.log('🚀 Starting Autonomous Error System...');
    console.log(`📁 Project Root: ${this.projectRoot}`);
    console.log(`⚙️  Config: ${JSON.stringify(this.config, null, 2)}`);

    let iteration = 0;
    let totalFixes = 0;
    let totalErrors = 0;

    while (iteration < this.config.maxIterations) {
      iteration++;
      console.log(`\n🔄 Iteration ${iteration}/${this.config.maxIterations}`);

      // Step 1: Detect errors
      console.log('🔍 Phase 1: Error Detection');
      const errors = await this.detector.detectAllErrors();
      totalErrors = errors.length;

      if (errors.length === 0) {
        console.log('✅ No errors found! System is clean.');
        break;
      }

      console.log(`📊 Found ${errors.length} errors`);

      // Step 2: Generate error report
      const errorReport = this.detector.generateReport();
      this.saveErrorReport(errorReport, iteration);

      // Step 3: Fix errors (if enabled)
      if (this.config.autoFix) {
        console.log('🔧 Phase 2: Error Fixing');
        const fixResult = await this.fixer.fixAllErrors(errorReport);
        totalFixes += fixResult.fixesApplied;

        if (fixResult.fixesApplied === 0) {
          console.log('⚠️  No fixes could be applied. Stopping iterations.');
          break;
        }

        console.log(`✅ Applied ${fixResult.fixesApplied} fixes`);
      }

      // Step 4: Auto-format (if enabled)
      if (this.config.autoFormat) {
        console.log('🎨 Phase 3: Auto-formatting');
        await this.fixer.runFormatting();
      }

      // Step 5: Wait a moment for file system to settle
      await this.sleep(1000);
    }

    // Final report
    await this.generateFinalReport(totalErrors, totalFixes, iteration);
    
    console.log('\n🎉 Autonomous Error System Complete!');
    return {
      totalErrors,
      totalFixes,
      iterations: iteration
    };
  }

  /**
   * Watch mode - continuously monitor for errors
   */
  async runWatchMode() {
    console.log('👀 Starting Watch Mode...');
    
    if (!this.config.watchMode) {
      console.log('⚠️  Watch mode not enabled in config');
      return;
    }

    const chokidar = require('chokidar');
    
    const watcher = chokidar.watch('src/**/*.{ts,tsx,js,jsx}', {
      ignored: /(^|[\/\\])\../, // ignore dotfiles
      persistent: true
    });

    watcher.on('change', async (path) => {
      console.log(`📝 File changed: ${path}`);
      await this.runAutonomousSystem();
    });

    watcher.on('error', error => {
      console.error('❌ Watch error:', error);
    });

    console.log('👀 Watching for file changes...');
  }

  /**
   * Save error report
   */
  saveErrorReport(report, iteration) {
    const reportsDir = path.join(this.projectRoot, this.config.reportPath);
    
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `error-report-iteration-${iteration}-${timestamp}.json`;
    const filepath = path.join(reportsDir, filename);
    
    fs.writeFileSync(filepath, JSON.stringify(report, null, 2));
    console.log(`📊 Error report saved: ${filepath}`);
  }

  /**
   * Generate final report
   */
  async generateFinalReport(totalErrors, totalFixes, iterations) {
    const finalReport = {
      timestamp: new Date().toISOString(),
      summary: {
        totalErrors,
        totalFixes,
        iterations,
        success: totalErrors === 0
      },
      config: this.config,
      systemInfo: {
        nodeVersion: process.version,
        platform: process.platform,
        projectRoot: this.projectRoot
      }
    };

    const reportsDir = path.join(this.projectRoot, this.config.reportPath);
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `final-report-${timestamp}.json`;
    const filepath = path.join(reportsDir, filename);
    
    fs.writeFileSync(filepath, JSON.stringify(finalReport, null, 2));
    console.log(`📊 Final report saved: ${filepath}`);

    // Also save fix report
    this.fixer.saveFixReport(path.join(reportsDir, `fix-report-${timestamp}.json`));
  }

  /**
   * Create configuration file
   */
  createConfig() {
    const configPath = path.join(this.projectRoot, 'autonomous-error-config.json');
    
    if (fs.existsSync(configPath)) {
      console.log('⚠️  Config file already exists');
      return;
    }

    const config = {
      autoFix: true,
      autoFormat: true,
      createBackups: true,
      maxIterations: 3,
      fixTypes: ['syntax', 'linting', 'console-log'],
      skipTypes: ['todo', 'info'],
      watchMode: false,
      reportPath: 'error-reports',
      description: 'Autonomous Error System Configuration'
    };

    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log(`✅ Configuration file created: ${configPath}`);
  }

  /**
   * Install required dependencies
   */
  installDependencies() {
    console.log('📦 Installing required dependencies...');
    
    const dependencies = [
      'chokidar', // for file watching
      'prettier', // for code formatting
      'eslint'    // for linting
    ];

    try {
      execSync(`npm install --save-dev ${dependencies.join(' ')}`, {
        cwd: this.projectRoot,
        stdio: 'inherit'
      });
      console.log('✅ Dependencies installed successfully');
    } catch (error) {
      console.error('❌ Failed to install dependencies:', error.message);
    }
  }

  /**
   * Setup the autonomous system
   */
  async setup() {
    console.log('🛠️  Setting up Autonomous Error System...');
    
    // Create config file
    this.createConfig();
    
    // Install dependencies
    this.installDependencies();
    
    // Create reports directory
    const reportsDir = path.join(this.projectRoot, this.config.reportPath);
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }
    
    console.log('✅ Setup complete!');
    console.log('📝 Edit autonomous-error-config.json to customize behavior');
    console.log('🚀 Run: node scripts/autonomous-error-system.js');
  }

  /**
   * Utility: Sleep function
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Utility: Clear reports
   */
  clearReports() {
    const reportsDir = path.join(this.projectRoot, this.config.reportPath);
    
    if (fs.existsSync(reportsDir)) {
      const files = fs.readdirSync(reportsDir);
      for (const file of files) {
        fs.unlinkSync(path.join(reportsDir, file));
      }
      console.log('🧹 Reports cleared');
    }
  }
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const system = new AutonomousErrorSystem();
  const command = process.argv[2];

  switch (command) {
    case 'setup':
      system.setup();
      break;
    case 'watch':
      system.runWatchMode();
      break;
    case 'clear':
      system.clearReports();
      break;
    case 'run':
    default:
      system.runAutonomousSystem()
        .then(result => {
          console.log('\n📊 Final Results:');
          console.log(`Total Errors: ${result.totalErrors}`);
          console.log(`Total Fixes: ${result.totalFixes}`);
          console.log(`Iterations: ${result.iterations}`);
        })
        .catch(console.error);
      break;
  }
}

export default AutonomousErrorSystem;

