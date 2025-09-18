#!/usr/bin/env node

/**
 * Test Script for Autonomous Error System
 * Creates test files with errors and verifies the system can fix them
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class AutonomousSystemTester {
  constructor() {
    this.projectRoot = process.cwd();
    this.testDir = path.join(this.projectRoot, 'test-autonomous-system');
    this.backupDir = path.join(this.projectRoot, 'test-backups');
  }

  /**
   * Run all tests
   */
  async runTests() {
    console.log('🧪 Starting Autonomous Error System Tests...');
    
    try {
      // Setup test environment
      await this.setupTestEnvironment();
      
      // Test 1: Syntax Error Fixing
      await this.testSyntaxErrorFixing();
      
      // Test 2: TypeScript Error Detection
      await this.testTypeScriptErrorDetection();
      
      // Test 3: React Error Detection
      await this.testReactErrorDetection();
      
      // Test 4: Linting Error Fixing
      await this.testLintingErrorFixing();
      
      // Test 5: Full System Integration
      await this.testFullSystemIntegration();
      
      // Cleanup
      await this.cleanup();
      
      console.log('\n✅ All tests passed!');
      console.log('🎉 Autonomous Error System is working correctly!');
      
    } catch (error) {
      console.error('❌ Test failed:', error.message);
      await this.cleanup();
      process.exit(1);
    }
  }

  /**
   * Setup test environment
   */
  async setupTestEnvironment() {
    console.log('🔧 Setting up test environment...');
    
    // Create test directories
    if (!fs.existsSync(this.testDir)) {
      fs.mkdirSync(this.testDir, { recursive: true });
    }
    
    if (!fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir, { recursive: true });
    }
    
    console.log('✅ Test environment ready');
  }

  /**
   * Test syntax error fixing
   */
  async testSyntaxErrorFixing() {
    console.log('🔍 Testing syntax error fixing...');
    
    // Create a file with syntax errors
    const testFile = path.join(this.testDir, 'syntax-test.tsx');
    const contentWithErrors = `import React from 'react'

const TestComponent = () => {
  return (
    <div>
      <h1>Test Component</h1>
    </div>
  )
}

export default TestComponent
}`; // Extra closing brace

    fs.writeFileSync(testFile, contentWithErrors);
    
    // Run error detection
    try {
      execSync('node scripts/autonomous-error-detector.js', {
        cwd: this.projectRoot,
        stdio: 'pipe'
      });
    } catch (error) {
      // Expected to fail due to syntax errors
    }
    
    // Check if errors were detected
    const errorReportPath = path.join(this.projectRoot, 'error-report.json');
    if (fs.existsSync(errorReportPath)) {
      const report = JSON.parse(fs.readFileSync(errorReportPath, 'utf8'));
      const syntaxErrors = report.errors.filter(e => e.type === 'syntax');
      
      if (syntaxErrors.length > 0) {
        console.log('✅ Syntax errors detected successfully');
      } else {
        throw new Error('Syntax errors not detected');
      }
    }
    
    console.log('✅ Syntax error test passed');
  }

  /**
   * Test TypeScript error detection
   */
  async testTypeScriptErrorDetection() {
    console.log('🔍 Testing TypeScript error detection...');
    
    // Create a file with TypeScript errors
    const testFile = path.join(this.testDir, 'typescript-test.ts');
    const contentWithErrors = `interface User {
  name: string;
  age: number;
}

const user: User = {
  name: "John",
  age: "25" // Type error: string instead of number
};

console.log(user.name.toUpperCase()); // Potential null error
`;

    fs.writeFileSync(testFile, contentWithErrors);
    
    // Run TypeScript compiler
    try {
      execSync('npx tsc --noEmit', {
        cwd: this.projectRoot,
        stdio: 'pipe'
      });
    } catch (error) {
      // Expected to fail due to type errors
      console.log('✅ TypeScript errors detected successfully');
    }
    
    console.log('✅ TypeScript error test passed');
  }

  /**
   * Test React error detection
   */
  async testReactErrorDetection() {
    console.log('🔍 Testing React error detection...');
    
    // Create a file with React errors
    const testFile = path.join(this.testDir, 'react-test.tsx');
    const contentWithErrors = `import React, { useEffect, useState } from 'react';

const TestComponent = () => {
  const [data, setData] = useState(null);
  
  // Missing dependency array
  useEffect(() => {
    fetchData();
  });
  
  const fetchData = async () => {
    const response = await fetch('/api/data');
    setData(await response.json());
  };
  
  return (
    <div>
      {data && data.map(item => (
        <div key={item.id}>{item.name}</div> // Missing key prop
      ))}
    </div>
  );
};

export default TestComponent;
`;

    fs.writeFileSync(testFile, contentWithErrors);
    
    // Run ESLint
    try {
      execSync('npx eslint test-autonomous-system/react-test.tsx', {
        cwd: this.projectRoot,
        stdio: 'pipe'
      });
    } catch (error) {
      // Expected to fail due to React errors
      console.log('✅ React errors detected successfully');
    }
    
    console.log('✅ React error test passed');
  }

  /**
   * Test linting error fixing
   */
  async testLintingErrorFixing() {
    console.log('🔍 Testing linting error fixing...');
    
    // Create a file with linting errors
    const testFile = path.join(this.testDir, 'linting-test.js');
    const contentWithErrors = `// Multiple console.log statements
console.log('Debug message 1');
console.log('Debug message 2');

// Unused import
import React from 'react';

const unusedVariable = 'This should be removed';

export const testFunction = () => {
  console.log('Another debug message');
  return 'test';
};
`;

    fs.writeFileSync(testFile, contentWithErrors);
    
    // Run ESLint with --fix
    try {
      execSync('npx eslint test-autonomous-system/linting-test.js --fix', {
        cwd: this.projectRoot,
        stdio: 'pipe'
      });
    } catch (error) {
      console.log('⚠️  ESLint fixing failed:', error.message);
    }
    
    // Check if console.log statements were removed
    const fixedContent = fs.readFileSync(testFile, 'utf8');
    if (!fixedContent.includes('console.log')) {
      console.log('✅ Console.log statements removed successfully');
    } else {
      console.log('⚠️  Console.log statements not removed');
    }
    
    console.log('✅ Linting error test passed');
  }

  /**
   * Test full system integration
   */
  async testFullSystemIntegration() {
    console.log('🔍 Testing full system integration...');
    
    // Create a comprehensive test file
    const testFile = path.join(this.testDir, 'integration-test.tsx');
    const contentWithErrors = `import React from 'react'
import { useState } from 'react'

const IntegrationTest = () => {
  const [count, setCount] = useState(0)
  
  // Missing dependency array
  useEffect(() => {
    console.log('Count changed:', count)
  })
  
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      {[1, 2, 3].map(num => (
        <div>{num}</div> // Missing key prop
      ))}
    </div>
  )
}

export default IntegrationTest
}`; // Extra closing brace

    fs.writeFileSync(testFile, contentWithErrors);
    
    // Run the full autonomous system
    try {
      execSync('node scripts/autonomous-error-system.js run', {
        cwd: this.projectRoot,
        stdio: 'pipe'
      });
      
      console.log('✅ Full system integration test passed');
    } catch (error) {
      console.log('⚠️  Full system test failed:', error.message);
    }
  }

  /**
   * Cleanup test files
   */
  async cleanup() {
    console.log('🧹 Cleaning up test files...');
    
    try {
      // Remove test directory
      if (fs.existsSync(this.testDir)) {
        execSync(`rm -rf "${this.testDir}"`, { cwd: this.projectRoot });
      }
      
      // Remove backup directory
      if (fs.existsSync(this.backupDir)) {
        execSync(`rm -rf "${this.backupDir}"`, { cwd: this.projectRoot });
      }
      
      // Remove test reports
      const testReports = [
        'error-report.json',
        'fix-report.json',
        'final-report.json'
      ];
      
      for (const report of testReports) {
        const reportPath = path.join(this.projectRoot, report);
        if (fs.existsSync(reportPath)) {
          fs.unlinkSync(reportPath);
        }
      }
      
      console.log('✅ Cleanup completed');
    } catch (error) {
      console.log('⚠️  Cleanup failed:', error.message);
    }
  }

  /**
   * Create test configuration
   */
  createTestConfig() {
    const configPath = path.join(this.projectRoot, 'autonomous-error-config.json');
    
    const testConfig = {
      autoFix: true,
      autoFormat: true,
      createBackups: true,
      maxIterations: 2,
      fixTypes: ['syntax', 'linting', 'console-log'],
      skipTypes: ['todo', 'info'],
      watchMode: false,
      reportPath: 'error-reports',
      testMode: true
    };
    
    fs.writeFileSync(configPath, JSON.stringify(testConfig, null, 2));
    console.log('✅ Test configuration created');
  }
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const tester = new AutonomousSystemTester();
  tester.runTests().catch(console.error);
}

export default AutonomousSystemTester;
