const fs = require('fs');

// Files with remaining TypeScript errors
const filesToFix = [
  'src/pages/driver/DriverAnalytics.tsx',
  'src/pages/owner-operator/OwnerOperatorAnalytics.tsx',
  'src/pages/shipper/ShipperAnalytics.tsx'
];

console.log('🔧 Final TypeScript fix...');

filesToFix.forEach(file => {
  try {
    let content = fs.readFileSync(file, 'utf8');
    
    // Fix missing commas in useState declarations
    content = content.replace(
      /const \[([^,]+) = useState\(/g,
      'const [$1, set$1] = useState('
    );
    
    // Add missing imports if needed
    if (content.includes('MapPin') && !content.includes('MapPin')) {
      content = content.replace(
        /import \{ ([^}]+) \} from 'lucide-react';/,
        (match, imports) => {
          if (!imports.includes('MapPin')) {
            return `import { ${imports}, MapPin } from 'lucide-react';`;
          }
          return match;
        }
      );
    }
    
    fs.writeFileSync(file, content, 'utf8');
    console.log(`✅ Fixed: ${file}`);
  } catch (error) {
    console.error(`❌ Error fixing ${file}:`, error.message);
  }
});

console.log('🎉 Final TypeScript fix completed!');
