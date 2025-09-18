/**
 * Vite Plugin for Autonomous Error System
 * Integrates error detection and fixing into the Vite development server
 */

const { execSync } = require('child_process');
const path = require('path');

function autonomousErrorPlugin(options = {}) {
  const {
    autoFix = true,
    autoFormat = true,
    maxIterations = 3,
    watchMode = true,
    reportPath = 'error-reports'
  } = options;

  let isProcessing = false;
  let errorCount = 0;
  let fixCount = 0;

  return {
    name: 'autonomous-error-system',
    configureServer(server) {
      console.log('🚀 Autonomous Error System Plugin Loaded');
      
      // Run initial error check
      this.runErrorSystem();
      
      // Watch for file changes
      if (watchMode) {
        server.ws.on('connection', (client) => {
          client.on('message', (data) => {
            if (data.type === 'update' && !isProcessing) {
              // Debounce error checking
              setTimeout(() => {
                this.runErrorSystem();
              }, 1000);
            }
          });
        });
      }
    },

    async runErrorSystem() {
      if (isProcessing) return;
      
      isProcessing = true;
      
      try {
        console.log('🔍 Running autonomous error system...');
        
        // Run the autonomous error system
        const result = execSync('node scripts/autonomous-error-system.js run', {
          encoding: 'utf8',
          cwd: process.cwd(),
          stdio: 'pipe'
        });
        
        console.log('✅ Autonomous error system completed');
        
        // Parse results from output
        const lines = result.split('\n');
        for (const line of lines) {
          if (line.includes('Total Errors:')) {
            errorCount = parseInt(line.split(':')[1].trim());
          }
          if (line.includes('Total Fixes:')) {
            fixCount = parseInt(line.split(':')[1].trim());
          }
        }
        
        // Send update to client
        if (this.server) {
          this.server.ws.send({
            type: 'autonomous-error-update',
            data: {
              errorCount,
              fixCount,
              timestamp: new Date().toISOString()
            }
          });
        }
        
      } catch (error) {
        console.error('❌ Autonomous error system failed:', error.message);
      } finally {
        isProcessing = false;
      }
    },

    buildStart() {
      console.log('🔍 Running pre-build error check...');
      this.runErrorSystem();
    },

    buildEnd() {
      console.log('🔍 Running post-build error check...');
      this.runErrorSystem();
    }
  };
}

module.exports = autonomousErrorPlugin;

