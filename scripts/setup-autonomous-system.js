#!/usr/bin/env node

/**
 * Autonomous Error System Setup Script
 * Sets up the complete autonomous error detection and fixing system
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class AutonomousSystemSetup {
  constructor() {
    this.projectRoot = process.cwd();
    this.scriptsDir = path.join(this.projectRoot, 'scripts');
  }

  /**
   * Main setup method
   */
  async setup() {
    console.log('🚀 Setting up Autonomous Error System...');
    console.log(`📁 Project Root: ${this.projectRoot}`);

    try {
      // Step 1: Create configuration
      await this.createConfiguration();
      
      // Step 2: Install dependencies
      await this.installDependencies();
      
      // Step 3: Create directories
      await this.createDirectories();
      
      // Step 4: Create Vite configuration
      await this.updateViteConfig();
      
      // Step 5: Create Git hooks
      await this.setupGitHooks();
      
      // Step 6: Create documentation
      await this.createDocumentation();
      
      // Step 7: Test the system
      await this.testSystem();
      
      console.log('\n✅ Autonomous Error System setup complete!');
      console.log('\n📋 Next Steps:');
      console.log('1. Run: npm run error:system');
      console.log('2. Or run: npm run dev:autonomous (for watch mode)');
      console.log('3. Check error-reports/ directory for reports');
      
    } catch (error) {
      console.error('❌ Setup failed:', error.message);
      process.exit(1);
    }
  }

  /**
   * Create configuration file
   */
  async createConfiguration() {
    console.log('⚙️  Creating configuration...');
    
    const configPath = path.join(this.projectRoot, 'autonomous-error-config.json');
    
    const config = {
      autoFix: true,
      autoFormat: true,
      createBackups: true,
      maxIterations: 3,
      fixTypes: ['syntax', 'linting', 'console-log'],
      skipTypes: ['todo', 'info'],
      watchMode: false,
      reportPath: 'error-reports',
      description: 'Autonomous Error System Configuration',
      rules: {
        syntax: {
          enabled: true,
          severity: 'error',
          autoFix: true
        },
        typescript: {
          enabled: true,
          severity: 'error',
          autoFix: true
        },
        react: {
          enabled: true,
          severity: 'warning',
          autoFix: true
        },
        linting: {
          enabled: true,
          severity: 'warning',
          autoFix: true
        },
        console: {
          enabled: true,
          severity: 'warning',
          autoFix: true
        }
      }
    };

    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log(`✅ Configuration created: ${configPath}`);
  }

  /**
   * Install required dependencies
   */
  async installDependencies() {
    console.log('📦 Installing dependencies...');
    
    const dependencies = [
      'chokidar', // for file watching
      'prettier', // for code formatting
      'eslint'    // for linting
    ];

    try {
      // Check if dependencies are already installed
      const packageJsonPath = path.join(this.projectRoot, 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      
      const missingDeps = dependencies.filter(dep => 
        !packageJson.devDependencies?.[dep] && !packageJson.dependencies?.[dep]
      );

      if (missingDeps.length > 0) {
        console.log(`Installing missing dependencies: ${missingDeps.join(', ')}`);
        execSync(`npm install --save-dev ${missingDeps.join(' ')}`, {
          cwd: this.projectRoot,
          stdio: 'inherit'
        });
      } else {
        console.log('✅ All dependencies already installed');
      }
    } catch (error) {
      console.log('⚠️  Dependency installation failed:', error.message);
    }
  }

  /**
   * Create necessary directories
   */
  async createDirectories() {
    console.log('📁 Creating directories...');
    
    const directories = [
      'error-reports',
      'error-reports/backups',
      'error-reports/history'
    ];

    for (const dir of directories) {
      const dirPath = path.join(this.projectRoot, dir);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`✅ Created directory: ${dir}`);
      }
    }
  }

  /**
   * Update Vite configuration to include the autonomous error plugin
   */
  async updateViteConfig() {
    console.log('🔧 Updating Vite configuration...');
    
    const viteConfigPath = path.join(this.projectRoot, 'vite.config.ts');
    
    if (fs.existsSync(viteConfigPath)) {
      let config = fs.readFileSync(viteConfigPath, 'utf8');
      
      // Check if plugin is already imported
      if (!config.includes('autonomousErrorPlugin')) {
        // Add import
        const importLine = "import autonomousErrorPlugin from './scripts/vite-autonomous-error-plugin.js';";
        config = config.replace(
          /import.*from.*vite.*\n/,
          `$&${importLine}\n`
        );
        
        // Add plugin to plugins array
        config = config.replace(
          /plugins:\s*\[([\s\S]*?)\]/,
          `plugins: [$1,\n    autonomousErrorPlugin({\n      autoFix: true,\n      autoFormat: true,\n      watchMode: true\n    })`
        );
        
        fs.writeFileSync(viteConfigPath, config);
        console.log('✅ Vite configuration updated');
      } else {
        console.log('✅ Vite configuration already includes autonomous error plugin');
      }
    } else {
      console.log('⚠️  Vite config not found, skipping Vite integration');
    }
  }

  /**
   * Setup Git hooks
   */
  async setupGitHooks() {
    console.log('🪝 Setting up Git hooks...');
    
    const gitHooksDir = path.join(this.projectRoot, '.git', 'hooks');
    
    if (fs.existsSync(gitHooksDir)) {
      // Pre-commit hook
      const preCommitHook = `#!/bin/sh
# Autonomous Error System Pre-commit Hook
echo "🔍 Running autonomous error system before commit..."

# Run error detection
npm run error:detect

# Run error fixing if errors found
if [ $? -ne 0 ]; then
  echo "🔧 Running autonomous error fixing..."
  npm run error:system
fi

echo "✅ Pre-commit checks complete"
`;

      const preCommitPath = path.join(gitHooksDir, 'pre-commit');
      fs.writeFileSync(preCommitPath, preCommitHook);
      
      // Make executable
      execSync(`chmod +x "${preCommitPath}"`, { cwd: this.projectRoot });
      
      console.log('✅ Git hooks configured');
    } else {
      console.log('⚠️  Git repository not found, skipping Git hooks');
    }
  }

  /**
   * Create comprehensive documentation
   */
  async createDocumentation() {
    console.log('📚 Creating documentation...');
    
    const docsDir = path.join(this.projectRoot, 'docs');
    if (!fs.existsSync(docsDir)) {
      fs.mkdirSync(docsDir, { recursive: true });
    }

    // Main README for autonomous system
    const readmeContent = `# Autonomous Error System

An intelligent system that automatically detects and fixes errors in your codebase.

## Features

- 🔍 **Automatic Error Detection**: Scans for syntax, TypeScript, React, and linting errors
- 🔧 **Automatic Error Fixing**: Fixes common errors automatically
- 🎨 **Code Formatting**: Integrates with Prettier and ESLint
- 👀 **Watch Mode**: Continuously monitors files for changes
- 📊 **Detailed Reports**: Generates comprehensive error and fix reports
- 🪝 **Git Integration**: Pre-commit hooks for automatic error checking

## Quick Start

### Setup
\`\`\`bash
npm run error:setup
\`\`\`

### Run Once
\`\`\`bash
npm run error:system
\`\`\`

### Watch Mode
\`\`\`bash
npm run error:watch
\`\`\`

### Development with Auto-fixing
\`\`\`bash
npm run dev:autonomous
\`\`\`

## Available Commands

| Command | Description |
|---------|-------------|
| \`npm run error:detect\` | Detect errors only |
| \`npm run error:fix\` | Fix errors from report |
| \`npm run error:system\` | Full autonomous system |
| \`npm run error:setup\` | Setup the system |
| \`npm run error:watch\` | Watch mode |
| \`npm run error:clear\` | Clear reports |
| \`npm run dev:autonomous\` | Dev server with auto-fixing |

## Configuration

Edit \`autonomous-error-config.json\` to customize behavior:

\`\`\`json
{
  "autoFix": true,
  "autoFormat": true,
  "createBackups": true,
  "maxIterations": 3,
  "fixTypes": ["syntax", "linting", "console-log"],
  "skipTypes": ["todo", "info"],
  "watchMode": false,
  "reportPath": "error-reports"
}
\`\`\`

## Error Types

### Syntax Errors
- Extra closing braces
- Missing semicolons
- Unclosed brackets
- Invalid syntax

### TypeScript Errors
- Missing imports
- Type mismatches
- Property access errors

### React Errors
- Missing key props
- Hook dependency issues
- Invalid component usage

### Linting Errors
- Console.log statements
- Unused imports
- Code style issues

## Reports

All reports are saved in the \`error-reports/\` directory:

- \`error-report-*.json\` - Error detection reports
- \`fix-report-*.json\` - Error fixing reports
- \`final-report-*.json\` - Complete system reports

## Integration

### Vite Plugin
The system includes a Vite plugin that automatically runs during development.

### Git Hooks
Pre-commit hooks ensure code quality before commits.

### CI/CD
Can be integrated into CI/CD pipelines for automated error checking.

## Troubleshooting

### Common Issues

1. **Permission Errors**: Ensure scripts have execute permissions
2. **Missing Dependencies**: Run \`npm run error:setup\` to install dependencies
3. **Configuration Issues**: Check \`autonomous-error-config.json\` syntax

### Debug Mode

Set \`DEBUG=true\` environment variable for verbose output:

\`\`\`bash
DEBUG=true npm run error:system
\`\`\`

## Contributing

To add new error detection patterns or fixes, edit the respective files in the \`scripts/\` directory.

## License

MIT License - See LICENSE file for details.
`;

    fs.writeFileSync(path.join(docsDir, 'autonomous-error-system.md'), readmeContent);

    // API Documentation
    const apiDocContent = `# Autonomous Error System API

## Classes

### AutonomousErrorDetector

Main error detection class.

#### Methods

- \`detectAllErrors()\` - Run complete error detection
- \`detectTypeScriptErrors()\` - Detect TypeScript errors
- \`detectLintingErrors()\` - Detect linting errors
- \`detectBuildErrors()\` - Detect build errors
- \`scanSourceFiles()\` - Scan source files for patterns
- \`generateReport()\` - Generate error report
- \`saveReport(filename)\` - Save report to file

### AutonomousErrorFixer

Main error fixing class.

#### Methods

- \`fixAllErrors(errorReport)\` - Fix all errors in report
- \`fixFileErrors(filePath, errors)\` - Fix errors in specific file
- \`applyFix(content, error)\` - Apply specific fix
- \`runFormatting()\` - Run code formatting
- \`generateFixReport()\` - Generate fix report
- \`saveFixReport(filename)\` - Save fix report

### AutonomousErrorSystem

Main orchestrator class.

#### Methods

- \`runAutonomousSystem()\` - Run complete system
- \`runWatchMode()\` - Run in watch mode
- \`setup()\` - Setup the system
- \`createConfig()\` - Create configuration
- \`installDependencies()\` - Install dependencies

## Error Object Structure

\`\`\`typescript
interface Error {
  type: string;           // Error type (syntax, typescript, react, etc.)
  file?: string;          // File path
  line?: number;          // Line number
  column?: number;        // Column number
  message: string;        // Error message
  severity: string;       // Error severity (error, warning, info)
  code?: string;          // Error code
  rule?: string;          // ESLint rule
  source: string;         // Detection source
}
\`\`\`

## Fix Object Structure

\`\`\`typescript
interface Fix {
  name: string;           // Fix name
  description: string;    // Fix description
  pattern: RegExp;        // Pattern to match
  fix: Function;          // Fix function
}
\`\`\`

## Report Structure

\`\`\`typescript
interface Report {
  timestamp: string;      // Report timestamp
  totalErrors: number;    // Total error count
  errorsByType: object;   // Errors grouped by type
  errorsBySeverity: object; // Errors grouped by severity
  files: string[];        // Affected files
  errors: Error[];        // Detailed error list
}
\`\`\`
`;

    fs.writeFileSync(path.join(docsDir, 'api.md'), apiDocContent);

    console.log('✅ Documentation created in docs/ directory');
  }

  /**
   * Test the system
   */
  async testSystem() {
    console.log('🧪 Testing the system...');
    
    try {
      // Test error detection
      console.log('Testing error detection...');
      execSync('node scripts/autonomous-error-detector.js', {
        cwd: this.projectRoot,
        stdio: 'pipe'
      });
      
      console.log('✅ Error detection test passed');
      
      // Test configuration loading
      const configPath = path.join(this.projectRoot, 'autonomous-error-config.json');
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      
      if (config.autoFix && config.autoFormat) {
        console.log('✅ Configuration test passed');
      }
      
      console.log('✅ System test completed successfully');
      
    } catch (error) {
      console.log('⚠️  System test failed:', error.message);
    }
  }

  /**
   * Create example usage script
   */
  async createExampleScript() {
    console.log('📝 Creating example script...');
    
    const exampleContent = `#!/usr/bin/env node

/**
 * Example usage of Autonomous Error System
 */

import AutonomousErrorSystem from './autonomous-error-system.js';

async function example() {
  const system = new AutonomousErrorSystem();
  
  console.log('🚀 Running autonomous error system example...');
  
  // Run the complete system
  const result = await system.runAutonomousSystem();
  
  console.log('📊 Results:');
  console.log(\`Total Errors: \${result.totalErrors}\`);
  console.log(\`Total Fixes: \${result.totalFixes}\`);
  console.log(\`Iterations: \${result.iterations}\`);
  
  // Run in watch mode (uncomment to test)
  // await system.runWatchMode();
}

example().catch(console.error);
`;

    fs.writeFileSync(path.join(this.scriptsDir, 'example-usage.js'), exampleContent);
    
    // Make executable
    execSync(`chmod +x "${path.join(this.scriptsDir, 'example-usage.js')}"`, { cwd: this.projectRoot });
    
    console.log('✅ Example script created');
  }
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const setup = new AutonomousSystemSetup();
  setup.setup().catch(console.error);
}

export default AutonomousSystemSetup;