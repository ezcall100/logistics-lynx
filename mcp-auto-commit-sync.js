#!/usr/bin/env node

/**
 * MCP Auto Commit and Sync System
 * Provides automatic Git commit and synchronization functionality for MCP agents
 */

import fs from 'fs';
import path from 'path';
import { execSync, spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class MCPAutoCommitSync {
  constructor() {
    this.config = this.loadConfig();
    this.gitStatus = null;
    this.lastCommitTime = null;
  }

  loadConfig() {
    try {
      const configPath = path.join(__dirname, 'mcp-auto-run-config.json');
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      return config.mcpAutoRunConfig.workflowIntegration;
    } catch (error) {
      console.error('❌ Error loading MCP config:', error.message);
      return this.getDefaultConfig();
    }
  }

  getDefaultConfig() {
    return {
      autoCommit: {
        enabled: true,
        settings: {
          commitMessageTemplate: "feat: {description} - {timestamp}",
          autoPush: true,
          autoPull: true,
          commitFrequency: "after_changes",
          maxCommitSize: 10,
          excludedFiles: ["node_modules/**", "dist/**", "build/**", "*.log", "*.lock"],
          includedFileTypes: ["*.ts", "*.tsx", "*.js", "*.jsx", "*.json", "*.md", "*.css", "*.scss"]
        }
      },
      autoSync: {
        enabled: true,
        settings: {
          syncMode: "bidirectional",
          autoPullBeforePush: true,
          conflictResolution: "manual",
          syncFrequency: "on_change",
          remoteTracking: true,
          backupBeforeSync: true,
          syncBranches: ["main", "develop", "feature/*"],
          excludedBranches: ["hotfix/*", "release/*"]
        }
      }
    };
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

  async getGitStatus() {
    try {
      const result = await this.executeCommand('git status --porcelain');
      return result.stdout.split('\n').filter(line => line.trim());
    } catch (error) {
      console.error('❌ Error getting git status:', error);
      return [];
    }
  }

  async getCurrentBranch() {
    try {
      const result = await this.executeCommand('git branch --show-current');
      return result.stdout.trim();
    } catch (error) {
      console.error('❌ Error getting current branch:', error);
      return 'main';
    }
  }

  async shouldAutoCommit() {
    if (!this.config.autoCommit.enabled) {
      return false;
    }

    // Full authority mode - commit on any changes
    if (this.config.autoCommit.fullAuthority) {
      const changes = await this.getGitStatus();
      return changes.length > 0;
    }

    const currentBranch = await this.getCurrentBranch();
    const excludedBranches = this.config.autoSync.settings.excludedBranches;
    
    // Check if current branch is excluded
    for (const pattern of excludedBranches) {
      if (pattern.includes('*')) {
        const regex = new RegExp(pattern.replace('*', '.*'));
        if (regex.test(currentBranch)) {
          return false;
        }
      } else if (currentBranch === pattern) {
        return false;
      }
    }

    const changes = await this.getGitStatus();
    return changes.length > 0 && changes.length <= this.config.autoCommit.settings.maxCommitSize;
  }

  async shouldAutoSync() {
    if (!this.config.autoSync.enabled) {
      return false;
    }

    // Full authority mode - sync on any branch
    if (this.config.autoSync.fullAuthority) {
      return true;
    }

    const currentBranch = await this.getCurrentBranch();
    const syncBranches = this.config.autoSync.settings.syncBranches;
    
    // Check if current branch should be synced
    for (const pattern of syncBranches) {
      if (pattern.includes('*')) {
        const regex = new RegExp(pattern.replace('*', '.*'));
        if (regex.test(currentBranch)) {
          return true;
        }
      } else if (currentBranch === pattern) {
        return true;
      }
    }

    return false;
  }

  async createCommitMessage(description = 'Auto commit by MCP agent') {
    const template = this.config.autoCommit.settings.commitMessageTemplate;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    
    return template
      .replace('{description}', description)
      .replace('{timestamp}', timestamp);
  }

  async autoCommit(description) {
    if (!await this.shouldAutoCommit()) {
      console.log('⏭️  Auto-commit skipped (conditions not met)');
      return false;
    }

    try {
      console.log('🔄 Starting auto-commit process...');

      // Stage changes
      await this.executeCommand('git add .');
      console.log('✅ Changes staged');

      // Create commit message
      const commitMessage = await this.createCommitMessage(description);
      
      // Commit changes
      await this.executeCommand(`git commit -m "${commitMessage}"`);
      console.log(`✅ Committed: ${commitMessage}`);

      // Auto push if enabled
      if (this.config.autoCommit.settings.autoPush) {
        await this.autoPush();
      }

      this.lastCommitTime = new Date();
      return true;
    } catch (error) {
      console.error('❌ Auto-commit failed:', error);
      return false;
    }
  }

  async autoPush() {
    try {
      console.log('🔄 Pushing changes...');
      await this.executeCommand('git push');
      console.log('✅ Changes pushed successfully');
      return true;
    } catch (error) {
      console.error('❌ Auto-push failed:', error);
      return false;
    }
  }

  async autoPull() {
    try {
      console.log('🔄 Pulling latest changes...');
      await this.executeCommand('git pull');
      console.log('✅ Changes pulled successfully');
      return true;
    } catch (error) {
      console.error('❌ Auto-pull failed:', error);
      return false;
    }
  }

  async autoSync() {
    if (!await this.shouldAutoSync()) {
      console.log('⏭️  Auto-sync skipped (branch not in sync list)');
      return false;
    }

    try {
      console.log('🔄 Starting auto-sync process...');

      // Backup before sync if enabled
      if (this.config.autoSync.settings.backupBeforeSync) {
        await this.createBackup();
      }

      // Pull before push if enabled
      if (this.config.autoSync.settings.autoPullBeforePush) {
        await this.autoPull();
      }

      // Push changes
      await this.autoPush();

      console.log('✅ Auto-sync completed successfully');
      return true;
    } catch (error) {
      console.error('❌ Auto-sync failed:', error);
      return false;
    }
  }

  async createBackup() {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupBranch = `backup/${timestamp}`;
      
      console.log(`🔄 Creating backup branch: ${backupBranch}`);
      await this.executeCommand(`git checkout -b ${backupBranch}`);
      await this.executeCommand('git push -u origin ${backupBranch}');
      await this.executeCommand('git checkout -');
      
      console.log('✅ Backup created successfully');
    } catch (error) {
      console.error('❌ Backup creation failed:', error);
    }
  }

  async handleConflict() {
    const resolution = this.config.autoSync.settings.conflictResolution;
    
    if (resolution === 'manual') {
      console.log('⚠️  Git conflict detected - manual resolution required');
      return false;
    } else if (resolution === 'abort') {
      console.log('🔄 Aborting merge due to conflict');
      await this.executeCommand('git merge --abort');
      return false;
    }
    
    return true;
  }

  async monitorChanges() {
    console.log('👀 Starting MCP Auto Commit & Sync Monitor...');
    
    setInterval(async () => {
      try {
        const changes = await this.getGitStatus();
        
        if (changes.length > 0) {
          console.log(`📝 Detected ${changes.length} changes`);
          
          // Auto commit if conditions are met
          if (await this.shouldAutoCommit()) {
            await this.autoCommit('Auto commit from MCP monitor');
          }
          
          // Auto sync if conditions are met
          if (await this.shouldAutoSync()) {
            await this.autoSync();
          }
        }
      } catch (error) {
        console.error('❌ Error in change monitor:', error);
      }
    }, 30000); // Check every 30 seconds
  }

  async getStatus() {
    const currentBranch = await this.getCurrentBranch();
    const changes = await this.getGitStatus();
    
    return {
      currentBranch,
      changesCount: changes.length,
      autoCommitEnabled: this.config.autoCommit.enabled,
      autoSyncEnabled: this.config.autoSync.enabled,
      lastCommitTime: this.lastCommitTime,
      shouldAutoCommit: await this.shouldAutoCommit(),
      shouldAutoSync: await this.shouldAutoSync()
    };
  }
}

// CLI Interface
async function main() {
  const autoCommitSync = new MCPAutoCommitSync();
  
  const command = process.argv[2];
  const description = process.argv[3] || 'Auto commit by MCP agent';

  switch (command) {
    case 'commit':
      await autoCommitSync.autoCommit(description);
      break;
    case 'sync':
      await autoCommitSync.autoSync();
      break;
    case 'push':
      await autoCommitSync.autoPush();
      break;
    case 'pull':
      await autoCommitSync.autoPull();
      break;
    case 'status':
      const status = await autoCommitSync.getStatus();
      console.log('📊 MCP Auto Commit & Sync Status:');
      console.log(JSON.stringify(status, null, 2));
      break;
    case 'monitor':
      await autoCommitSync.monitorChanges();
      break;
    default:
      console.log('🚀 MCP Auto Commit & Sync System');
      console.log('==================================');
      console.log('Usage:');
      console.log('  node mcp-auto-commit-sync.js commit [description]');
      console.log('  node mcp-auto-commit-sync.js sync');
      console.log('  node mcp-auto-commit-sync.js push');
      console.log('  node mcp-auto-commit-sync.js pull');
      console.log('  node mcp-auto-commit-sync.js status');
      console.log('  node mcp-auto-commit-sync.js monitor');
      break;
  }
}

// Export for use as module
export default MCPAutoCommitSync;

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}
