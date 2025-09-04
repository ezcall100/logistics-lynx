#!/usr/bin/env node

import { ALL_250_AGENTS_COMPLETE } from '../autonomous-system/agent-registry-250.js';

console.log('🔍 QUICK AGENT COUNT DEBUG');
console.log('=' .repeat(50));

const totalAgents = ALL_250_AGENTS_COMPLETE.length;
console.log(`Total agents: ${totalAgents}`);

const agentSummary = ALL_250_AGENTS_COMPLETE.reduce((acc, agent) => {
  acc[agent.category] = (acc[agent.category] || 0) + 1;
  return acc;
}, {});

Object.entries(agentSummary).forEach(([category, count]) => {
  console.log(`${category.toUpperCase()}: ${count} agents`);
});

console.log('\nExpected distribution:');
console.log('Frontend: 80');
console.log('Backend: 60');
console.log('Database: 30');
console.log('Research: 50');
console.log('Testing: 20');
console.log('Deployment: 10');
console.log('Logistics: 1');
console.log('Total: 251');
