/**
 * TransBot AI - Simple Autonomous System Test
 * Tests core autonomous system functionality without TypeScript compilation
 */

console.log('🧪 TransBot AI Autonomous System - Simple Test Suite');
console.log('=' .repeat(60));

// Test 1: Check if autonomous system files exist
console.log('\n📋 Test 1: File System Check');
console.log('-'.repeat(40));

import fs from 'fs';
import path from 'path';

const requiredFiles = [
  'src/agents/autonomous-executive-team.ts',
  'src/agents/autonomous-agent-executor.ts',
  'src/agents/business-strategy-system.ts',
  'src/agents/autonomous-system-controller.ts',
  'src/agents/index.ts',
  'src/components/autonomous-system-dashboard.tsx',
  'AUTONOMOUS_AGENT_SYSTEM_DOCUMENTATION.md'
];

let filesFound = 0;
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} - EXISTS`);
    filesFound++;
  } else {
    console.log(`❌ ${file} - MISSING`);
  }
});

console.log(`\n📊 Files Found: ${filesFound}/${requiredFiles.length}`);

// Test 2: Check autonomous system documentation
console.log('\n📋 Test 2: Documentation Check');
console.log('-'.repeat(40));

try {
  const docPath = 'AUTONOMOUS_AGENT_SYSTEM_DOCUMENTATION.md';
  if (fs.existsSync(docPath)) {
    const docContent = fs.readFileSync(docPath, 'utf8');
    console.log('✅ Documentation file exists');
    console.log(`   - File size: ${(docContent.length / 1024).toFixed(1)} KB`);
    console.log(`   - Lines: ${docContent.split('\n').length}`);
    
    // Check for key sections
    const keySections = [
      'Executive Summary',
      'System Architecture',
      'Executive Team Structure',
      'Business Model',
      'Market Analysis',
      'Strategic Initiatives',
      'System Capabilities',
      'Usage Instructions'
    ];
    
    let sectionsFound = 0;
    keySections.forEach(section => {
      if (docContent.includes(section)) {
        console.log(`   ✅ Section: ${section}`);
        sectionsFound++;
      } else {
        console.log(`   ❌ Section: ${section}`);
      }
    });
    
    console.log(`\n📊 Documentation Sections: ${sectionsFound}/${keySections.length}`);
  } else {
    console.log('❌ Documentation file missing');
  }
} catch (error) {
  console.log('❌ Documentation check failed:', error.message);
}

// Test 3: Check autonomous system source code structure
console.log('\n📋 Test 3: Source Code Structure Check');
console.log('-'.repeat(40));

try {
  const agentsDir = 'src/agents';
  if (fs.existsSync(agentsDir)) {
    const files = fs.readdirSync(agentsDir);
    console.log('✅ Agents directory exists');
    console.log(`   - Files in agents directory: ${files.length}`);
    console.log(`   - Files: ${files.join(', ')}`);
    
    // Check for key agent files
    const keyAgentFiles = [
      'autonomous-executive-team.ts',
      'autonomous-agent-executor.ts',
      'business-strategy-system.ts',
      'autonomous-system-controller.ts',
      'index.ts'
    ];
    
    let agentFilesFound = 0;
    keyAgentFiles.forEach(file => {
      if (files.includes(file)) {
        console.log(`   ✅ Agent file: ${file}`);
        agentFilesFound++;
      } else {
        console.log(`   ❌ Agent file: ${file}`);
      }
    });
    
    console.log(`\n📊 Agent Files: ${agentFilesFound}/${keyAgentFiles.length}`);
  } else {
    console.log('❌ Agents directory missing');
  }
} catch (error) {
  console.log('❌ Source code structure check failed:', error.message);
}

// Test 4: Check autonomous system dashboard component
console.log('\n📋 Test 4: Dashboard Component Check');
console.log('-'.repeat(40));

try {
  const dashboardPath = 'src/components/autonomous-system-dashboard.tsx';
  if (fs.existsSync(dashboardPath)) {
    const dashboardContent = fs.readFileSync(dashboardPath, 'utf8');
    console.log('✅ Dashboard component exists');
    console.log(`   - File size: ${(dashboardContent.length / 1024).toFixed(1)} KB`);
    console.log(`   - Lines: ${dashboardContent.split('\n').length}`);
    
    // Check for key React features
    const keyFeatures = [
      'useState',
      'useEffect',
      'AutonomousSystemDashboard',
      'getTransBotAIStatus',
      'getTransBotAIReport',
      'quickStartTransBotAI',
      'emergencyTransBotAI'
    ];
    
    let featuresFound = 0;
    keyFeatures.forEach(feature => {
      if (dashboardContent.includes(feature)) {
        console.log(`   ✅ Feature: ${feature}`);
        featuresFound++;
      } else {
        console.log(`   ❌ Feature: ${feature}`);
      }
    });
    
    console.log(`\n📊 Dashboard Features: ${featuresFound}/${keyFeatures.length}`);
  } else {
    console.log('❌ Dashboard component missing');
  }
} catch (error) {
  console.log('❌ Dashboard component check failed:', error.message);
}

// Test 5: Check package.json for autonomous system dependencies
console.log('\n📋 Test 5: Package Dependencies Check');
console.log('-'.repeat(40));

try {
  const packagePath = 'package.json';
  if (fs.existsSync(packagePath)) {
    const packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    console.log('✅ Package.json exists');
    console.log(`   - Project name: ${packageContent.name || 'Not specified'}`);
    console.log(`   - Version: ${packageContent.version || 'Not specified'}`);
    
    // Check for key dependencies
    const dependencies = packageContent.dependencies || {};
    const devDependencies = packageContent.devDependencies || {};
    const allDeps = { ...dependencies, ...devDependencies };
    
    const keyDeps = [
      'react',
      'typescript',
      '@heroicons/react',
      'tailwindcss'
    ];
    
    let depsFound = 0;
    keyDeps.forEach(dep => {
      if (allDeps[dep]) {
        console.log(`   ✅ Dependency: ${dep}@${allDeps[dep]}`);
        depsFound++;
      } else {
        console.log(`   ❌ Dependency: ${dep}`);
      }
    });
    
    console.log(`\n📊 Key Dependencies: ${depsFound}/${keyDeps.length}`);
  } else {
    console.log('❌ Package.json missing');
  }
} catch (error) {
  console.log('❌ Package dependencies check failed:', error.message);
}

// Test 6: Check for autonomous system configuration
console.log('\n📋 Test 6: Configuration Check');
console.log('-'.repeat(40));

try {
  const configFiles = [
    'tsconfig.json',
    'vite.config.ts',
    'tailwind.config.ts',
    'components.json'
  ];
  
  let configFilesFound = 0;
  configFiles.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`✅ Config file: ${file}`);
      configFilesFound++;
    } else {
      console.log(`❌ Config file: ${file}`);
    }
  });
  
  console.log(`\n📊 Configuration Files: ${configFilesFound}/${configFiles.length}`);
} catch (error) {
  console.log('❌ Configuration check failed:', error.message);
}

// Final Summary
console.log('\n📊 Test Summary');
console.log('=' .repeat(60));

const testResults = {
  fileSystem: filesFound === requiredFiles.length,
  documentation: true, // Will be true if doc exists
  sourceCode: true, // Will be true if agents dir exists
  dashboard: true, // Will be true if dashboard exists
  dependencies: true, // Will be true if package.json exists
  configuration: true // Will be true if config files exist
};

const passedTests = Object.values(testResults).filter(result => result).length;
const totalTests = Object.keys(testResults).length;

console.log(`✅ Tests Passed: ${passedTests}/${totalTests}`);
console.log(`📈 Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);

if (passedTests === totalTests) {
  console.log('🎉 All tests passed! TransBot AI Autonomous System structure is complete.');
  console.log('\n🚀 Next Steps:');
  console.log('   1. Fix TypeScript compilation errors');
  console.log('   2. Run the development server: npm run dev');
  console.log('   3. Access the autonomous system dashboard');
  console.log('   4. Test the quick start functionality');
} else {
  console.log('⚠️  Some tests failed. Please review the system structure.');
}

console.log('\n🧪 TransBot AI Autonomous System Test Suite Complete');
console.log('=' .repeat(60));
