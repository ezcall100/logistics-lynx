import fs from 'fs';

const portalFiles = [
  'src/pages/portals/customer/CustomerPortal.tsx',
  'src/pages/portals/super-admin/SuperAdminPortal.tsx',
  'src/pages/portals/mcp-agents/MCPAgentsPortal.tsx'
];

function cleanupRemovedIconCode(content) {
  let updatedContent = content;
  
  // Remove state variables
  updatedContent = updatedContent.replace(
    /const \[soundEnabled, setSoundEnabled\] = useState\(true\);\s*\n?/g,
    ''
  );
  updatedContent = updatedContent.replace(
    /const \[fullscreen, setFullscreen\] = useState\(false\);\s*\n?/g,
    ''
  );
  
  return updatedContent;
}

async function updatePortalFile(filePath) {
  try {
    console.log(`Cleaning ${filePath}...`);
    
    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${filePath}`);
      return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    content = cleanupRemovedIconCode(content);
    fs.writeFileSync(filePath, content, 'utf8');
    
    console.log(`✅ Cleaned ${filePath}`);
  } catch (error) {
    console.error(`❌ Error:`, error.message);
  }
}

async function main() {
  console.log('Cleaning up removed icon code...\n');
  
  for (const filePath of portalFiles) {
    await updatePortalFile(filePath);
  }
  
  console.log('\n🎉 Cleanup complete!');
}

main().catch(console.error);
