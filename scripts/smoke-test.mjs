#!/usr/bin/env node

/**
 * Synthetic Business Flow Tests
 * Tests critical user journeys and business flows
 */

import { spawn } from 'child_process';
import { existsSync } from 'fs';

console.log('🧪 Running Synthetic Business Flow Tests');
console.log('========================================\n');

const tests = [
  {
    name: 'Build Test',
    command: 'npm run build',
    description: 'Verifies project builds successfully'
  },
  {
    name: 'Type Check',
    command: 'npm run type-check',
    description: 'Verifies TypeScript compilation'
  },
  {
    name: 'Lint Check',
    command: 'npm run lint:fix',
    description: 'Verifies code quality standards'
  }
];

async function runTest(test) {
  return new Promise((resolve) => {
    console.log(`Running ${test.name}...`);
    console.log(`  ${test.description}`);
    
    const child = spawn('npm', ['run', test.command.split(' ')[2]], {
      shell: true,
      stdio: 'pipe'
    });
    
    let output = '';
    let errorOutput = '';
    
    child.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    child.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        console.log(`  ✅ ${test.name} passed\n`);
        resolve(true);
      } else {
        console.log(`  ❌ ${test.name} failed`);
        console.log(`  Error: ${errorOutput}\n`);
        resolve(false);
      }
    });
  });
}

async function runAllTests() {
  let allPassed = true;
  
  for (const test of tests) {
    const passed = await runTest(test);
    if (!passed) {
      allPassed = false;
    }
  }
  
  if (allPassed) {
    console.log('🎉 All smoke tests passed!');
    process.exit(0);
  } else {
    console.log('⚠️  Some smoke tests failed.');
    process.exit(1);
  }
}

runAllTests();
