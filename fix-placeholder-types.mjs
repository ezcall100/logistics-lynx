import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

// Function to fix placeholder types in isolated files
function fixPlaceholderTypes(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️ File not found: ${filePath}`);
      return false;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    
    // Fix the corrupted placeholder type
    const fixedContent = content.replace(
      /export type PlaceholderStatus = 'active \| 'inactive';/g,
      "export type PlaceholderStatus = 'active' | 'inactive';"
    );
    
    if (content !== fixedContent) {
      fs.writeFileSync(filePath, fixedContent, 'utf8');
      console.log(`✅ Fixed placeholder types in: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

// Main function to fix all placeholder types
async function fixAllPlaceholderTypes() {
  console.log('🚨 MCP PLACEHOLDER TYPE FIX — ACTIVATED');
  console.log('🎯 Fixing corrupted placeholder types in isolated type files...\n');
  
  try {
    // Find all isolated type files
    const typeFiles = await glob('src/types/*.ts', { 
      ignore: ['node_modules/**', 'dist/**', '**/*.d.ts'] 
    });
    
    console.log(`📁 Found ${typeFiles.length} type definition files to fix`);
    
    let totalFixed = 0;
    
    for (const filePath of typeFiles) {
      if (fixPlaceholderTypes(filePath)) {
        totalFixed++;
      }
    }
    
    console.log(`\n🎉 PLACEHOLDER TYPE FIX COMPLETED`);
    console.log(`✅ Files fixed: ${totalFixed}/${typeFiles.length}`);
    
    if (totalFixed > 0) {
      console.log('\n🧪 NEXT STEPS:');
      console.log('1. Run type checking to verify placeholder fix');
      console.log('2. Check remaining error count');
      console.log('3. Address any remaining service file corruption');
    }
    
  } catch (error) {
    console.error('❌ Critical error during placeholder type fix:', error);
  }
}

// Run the placeholder type fix operation
fixAllPlaceholderTypes();
