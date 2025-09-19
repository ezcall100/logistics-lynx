#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

console.log('🧹 CLEANUP UNNECESSARY PORTALS');
console.log('🎯 MISSION: Keep only website, Super Admin, and MCP Dashboard');
console.log('⚡ STRATEGY: Remove all other portals to focus on core functionality');

// Files and directories to remove
const filesToRemove = [
  // Individual portal pages
  'src/pages/portals/broker',
  'src/pages/portals/carrier', 
  'src/pages/portals/shipper',
  'src/pages/portals/driver',
  'src/pages/portals/owner-operator',
  'src/pages/portals/analytics',
  'src/pages/portals/yms',
  'src/pages/portals/directory',
  'src/pages/portals/rates',
  'src/pages/portals/marketplace',
  'src/pages/portals/financials',
  'src/pages/portals/load-board',
  'src/pages/portals/crm',
  'src/pages/portals/edi',
  'src/pages/portals/workers',
  'src/pages/portals/factoring',
  'src/pages/portals/warehouse',
  'src/pages/portals/fleet',
  'src/pages/portals/dispatch',
  'src/pages/portals/maintenance',
  'src/pages/portals/fuel',
  'src/pages/portals/insurance',
  'src/pages/portals/compliance',
  'src/pages/portals/customer',
  'src/pages/portals/partner',
  'src/pages/portals/developer',
  'src/pages/portals/admin',
  'src/pages/portals/autonomous',
  'src/pages/portals/mcp-agents',
  
  // Problematic solution files
  'src/pages/solutions/CRMSolution.tsx',
  'src/pages/solutions/YardManagementSolution.tsx',
  'src/pages/solutions/LoadBoardSolution.tsx',
  'src/pages/solutions/FinancialManagementSolution.tsx',
  'src/pages/solutions/ShipperSolutions.tsx',
  'src/pages/solutions/CarrierSolutions.tsx',
  'src/pages/solutions/BrokerSolutions.tsx',
  'src/pages/solutions/OwnerOperatorSolutions.tsx',
  'src/pages/solutions/DriverSolutions.tsx',
  'src/pages/solutions/PredictiveAnalytics.tsx',
  
  // AI Agent pages that are causing issues
  'src/pages/ai-agents',
  
  // Technology pages that might be causing issues
  'src/pages/technology',
  
  // Unnecessary admin pages
  'src/pages/portals/admin',
  'src/pages/admin',
];

// Routes to remove from App.tsx
const routesToRemove = [
  // Portal routes
  '/portals/broker',
  '/portals/carrier',
  '/portals/shipper', 
  '/portals/driver',
  '/portals/owner-operator',
  '/portals/analytics',
  '/portals/yms',
  '/portals/directory',
  '/portals/rates',
  '/portals/marketplace',
  '/portals/financials',
  '/portals/load-board',
  '/portals/crm',
  '/portals/edi',
  '/portals/workers',
  '/portals/factoring',
  '/portals/warehouse',
  '/portals/fleet',
  '/portals/dispatch',
  '/portals/maintenance',
  '/portals/fuel',
  '/portals/insurance',
  '/portals/compliance',
  '/portals/customer',
  '/portals/partner',
  '/portals/developer',
  '/portals/admin',
  '/portals/autonomous',
  '/portals/mcp-agents',
  
  // Solution routes
  '/solutions/transportation',
  '/solutions/warehouse',
  '/solutions/route-optimization',
  '/solutions/load-matching',
  '/solutions/predictive-analytics',
  '/solutions/fleet-management',
  '/solutions/last-mile',
  '/solutions/yard-management',
  '/solutions/financial-management',
  '/solutions/load-board',
  '/solutions/crm',
  '/solutions/shipper',
  '/solutions/carrier',
  '/solutions/broker',
  '/solutions/owner-operator',
  '/solutions/driver',
  
  // AI Agent routes
  '/agents/route-optimizer',
  '/agents/load-matcher',
  '/agents/predictive-analytics',
  '/agents/fleet-manager',
  '/agents/fuel-optimizer',
  '/agents/demand-forecaster',
  '/agents/price-optimizer',
  '/agents/maintenance-predictor',
  '/agents/carbon-optimizer',
  '/agents/smart-warehouse',
  '/agents/customer-experience',
  '/agents/risk-assessment',
  
  // Technology routes
  '/technology/ai',
  '/technology/blockchain',
  '/technology/cloud',
  '/technology/api',
  '/technology/analytics',
  '/technology/security',
  '/technology/integration',
  '/technology/automation',
  '/technology/mobile',
  '/technology/iot',
  '/technology/edge',
  '/technology/microservices',
  
  // Direct portal routes
  '/broker',
  '/carrier',
  '/driver',
  '/shipper',
  '/analytics',
  '/autonomous',
  '/yms',
  '/directory',
  '/rates',
  '/marketplace',
  '/financials',
  '/load-board',
  '/crm',
  '/edi',
  '/owner-operator',
  '/workers',
  '/factoring',
];

function removeFileOrDirectory(filePath) {
  const fullPath = path.join(projectRoot, filePath);
  
  try {
    if (fs.existsSync(fullPath)) {
      const stats = fs.statSync(fullPath);
      if (stats.isDirectory()) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`✅ Removed directory: ${filePath}`);
      } else {
        fs.unlinkSync(fullPath);
        console.log(`✅ Removed file: ${filePath}`);
      }
      return true;
    } else {
      console.log(`⚠️ File not found: ${filePath}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Error removing ${filePath}:`, error.message);
    return false;
  }
}

function cleanupAppTsx() {
  const appTsxPath = path.join(projectRoot, 'src/App.tsx');
  
  try {
    let content = fs.readFileSync(appTsxPath, 'utf8');
    
    // Remove imports for deleted components
    const importsToRemove = [
      'import BrokerPortal from',
      'import CarrierPortal from',
      'import ShipperPortal from',
      'import DriverPortal from',
      'import OwnerOperatorPortal from',
      'import AnalyticsPortal from',
      'import YMSPortal from',
      'import DirectoryPortal from',
      'import RatesPortal from',
      'import MarketplacePortal from',
      'import FinancialsPortal from',
      'import LoadBoardPortal from',
      'import CRMPortal from',
      'import EDIPortal from',
      'import WorkersPortal from',
      'import FactoringPortal from',
      'import WarehousePortal from',
      'import FleetPortal from',
      'import DispatchPortal from',
      'import MaintenancePortal from',
      'import FuelPortal from',
      'import InsurancePortal from',
      'import CompliancePortal from',
      'import CustomerPortal from',
      'import PartnerPortal from',
      'import DeveloperPortal from',
      'import AdminPortal from',
      'import AutonomousPortal from',
      'import MCPAgentsPortal from',
      'import TransportationManagement from',
      'import WarehouseManagement from',
      'import RouteOptimization from',
      'import LoadMatching from',
      'import PredictiveAnalyticsSolution from',
      'import FleetManagement from',
      'import LastMileDelivery from',
      'import YardManagementSolution from',
      'import FinancialManagementSolution from',
      'import LoadBoardSolution from',
      'import CRMSolution from',
      'import ShipperSolutions from',
      'import CarrierSolutions from',
      'import BrokerSolutions from',
      'import OwnerOperatorSolutions from',
      'import DriverSolutions from',
      'import RouteOptimizer from',
      'import LoadMatcher from',
      'import PredictiveAnalytics from',
      'import FleetManager from',
      'import FuelOptimizer from',
      'import PriceOptimizer from',
      'import DemandForecaster from',
      'import MaintenancePredictor from',
      'import CarbonOptimizer from',
      'import SmartWarehouse from',
      'import CustomerExperience from',
      'import RiskAssessment from',
      'import AITechnologyPage from',
      'import BlockchainPage from',
      'import CloudInfrastructurePage from',
      'import APIPlatformPage from',
      'import DataAnalyticsPage from',
      'import SecurityPage from',
      'import IntegrationPage from',
      'import AutomationPage from',
      'import MobileTechnologyPage from',
      'import IoTSensorsPage from',
      'import EdgeComputingPage from',
      'import MicroservicesPage from',
    ];
    
    importsToRemove.forEach(importLine => {
      const regex = new RegExp(`.*${importLine.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}.*\\n`, 'g');
      content = content.replace(regex, '');
    });
    
    // Remove route blocks for deleted components
    routesToRemove.forEach(route => {
      const routeRegex = new RegExp(`\\s*<Route\\s+path="${route.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[\\s\\S]*?</Route>\\s*`, 'g');
      content = content.replace(routeRegex, '');
    });
    
    // Clean up any extra whitespace
    content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
    
    fs.writeFileSync(appTsxPath, content);
    console.log('✅ Cleaned up App.tsx - removed unnecessary imports and routes');
    
  } catch (error) {
    console.log('❌ Error cleaning up App.tsx:', error.message);
  }
}

function main() {
  console.log('\n🚀 Starting cleanup process...\n');
  
  let removedCount = 0;
  
  // Remove files and directories
  filesToRemove.forEach(filePath => {
    if (removeFileOrDirectory(filePath)) {
      removedCount++;
    }
  });
  
  // Clean up App.tsx
  cleanupAppTsx();
  
  console.log(`\n✅ CLEANUP COMPLETED!`);
  console.log(`📊 Removed ${removedCount} files/directories`);
  console.log(`🎯 Kept only essential components:`);
  console.log(`   - Main Website (port 3000)`);
  console.log(`   - Super Admin Portal (port 3005)`);
  console.log(`   - MCP Dashboard (port 3002)`);
  console.log(`\n🚀 Your system is now focused and clean!`);
}

main();
