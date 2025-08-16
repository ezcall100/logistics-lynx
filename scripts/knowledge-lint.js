#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Simple front-matter parser
function parseFrontMatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return null;
  
  try {
    const metadata = yaml.load(match[1]);
    return { metadata, content: match[2] };
  } catch (e) {
    return null;
  }
}

// Validate front-matter
function validateFrontMatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const parsed = parseFrontMatter(content);
  
  if (!parsed) {
    console.error(`❌ ${filePath}: Missing or invalid front-matter`);
    return false;
  }
  
  const { metadata } = parsed;
  const required = ['title', 'version', 'owner', 'visibility', 'scope'];
  const missing = required.filter(field => !metadata[field]);
  
  if (missing.length > 0) {
    console.error(`❌ ${filePath}: Missing required fields: ${missing.join(', ')}`);
    return false;
  }
  
  if (!metadata.visibility.includes('agents')) {
    console.error(`❌ ${filePath}: visibility must include 'agents'`);
    return false;
  }
  
  console.log(`✅ ${filePath}`);
  return true;
}

// Validate registry consistency
function validateRegistry() {
  const registryPath = path.join(__dirname, '../knowledge/10-agent-registry/registry.json');
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  
  const portalFiles = fs.readdirSync(path.join(__dirname, '../knowledge/05-portals'))
    .filter(file => file.endsWith('.md') && file !== 'portal-template.md')
    .map(file => file.replace('.md', ''));
  
  const registryPortals = registry.portals.map(p => p.key);
  const missingInRegistry = portalFiles.filter(p => !registryPortals.includes(p));
  const missingInFiles = registryPortals.filter(p => !portalFiles.includes(p));
  
  if (missingInRegistry.length > 0) {
    console.error(`❌ Portals missing from registry: ${missingInRegistry.join(', ')}`);
    return false;
  }
  
  if (missingInFiles.length > 0) {
    console.error(`❌ Registry portals missing files: ${missingInFiles.join(', ')}`);
    return false;
  }
  
  console.log('✅ Registry consistency check passed');
  return true;
}

// Main validation
function main() {
  console.log('🔍 Validating Knowledge Base...\n');
  
  const knowledgeDir = path.join(__dirname, '../knowledge');
  let allValid = true;
  
  // Validate all markdown files with front-matter
  function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        walkDir(filePath);
      } else if (file.endsWith('.md')) {
        if (!validateFrontMatter(filePath)) {
          allValid = false;
        }
      }
    }
  }
  
  walkDir(knowledgeDir);
  
  // Validate registry
  if (!validateRegistry()) {
    allValid = false;
  }
  
  console.log('\n' + (allValid ? '✅ All checks passed!' : '❌ Validation failed!'));
  process.exit(allValid ? 0 : 1);
}

if (require.main === module) {
  main();
}
