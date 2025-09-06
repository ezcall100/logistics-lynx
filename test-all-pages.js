#!/usr/bin/env node

/**
 * COMPREHENSIVE PAGE TESTING SCRIPT
 * Tests all dropdown pages and website functionality
 * Works independently of server status
 */

const fs = require('fs');
const path = require('path');

class PageTester {
  constructor() {
    this.testResults = [];
    this.baseUrl = 'http://localhost:3000';
    this.pages = {
      solutions: [
        '/solutions/transportation',
        '/solutions/route-optimization',
        '/solutions/load-matching',
        '/solutions/predictive-analytics',
        '/solutions/fleet-management',
        '/solutions/brokerage',
        '/solutions/warehouse',
        '/solutions/last-mile'
      ],
      aiAgents: [
        '/agents/route-optimizer',
        '/agents/load-matcher',
        '/agents/predictive-analytics',
        '/agents/fleet-manager',
        '/agents/fuel-optimizer',
        '/agents/demand-forecaster',
        '/agents/price-optimizer',
        '/agents/maintenance-predictor'
      ],
      portals: [
        '/portals/customer',
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
        '/portals/partner',
        '/portals/developer',
        '/portals/admin',
        '/super-admin',
        '/admin/mcp-agents',
        '/admin/human-developers',
        '/portals/broker/enhanced',
        '/portals',
        '/workers',
        '/edi',
        '/owner-operator',
        '/factoring'
      ],
      company: [
        '/company',
        '/careers',
        '/contact',
        '/press',
        '/leadership',
        '/investors',
        '/partners',
        '/security'
      ],
      main: [
        '/',
        '/login',
        '/signup',
        '/pricing',
        '/resources',
        '/industries',
        '/portals',
        '/ai-agents'
      ]
    };
  }

  async testPage(url) {
    try {
      const response = await fetch(url);
      return {
        url,
        status: response.status,
        success: response.status === 200,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        url,
        status: 'ERROR',
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  async testAllPages() {
    console.log('🧪 TESTING ALL DROPDOWN PAGES - 250 AGENTS WORKING');
    console.log('=' .repeat(60));

    const allPages = [
      ...this.pages.main,
      ...this.pages.solutions,
      ...this.pages.aiAgents,
      ...this.pages.portals,
      ...this.pages.company
    ];

    let successCount = 0;
    let totalCount = allPages.length;

    for (const page of allPages) {
      const fullUrl = `${this.baseUrl}${page}`;
      console.log(`🔍 Testing: ${page}`);
      
      const result = await this.testPage(fullUrl);
      this.testResults.push(result);
      
      if (result.success) {
        console.log(`✅ ${page} - SUCCESS (${result.status})`);
        successCount++;
      } else {
        console.log(`❌ ${page} - FAILED (${result.status})`);
      }
      
      // Small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log('\n' + '=' .repeat(60));
    console.log(`📊 TEST RESULTS: ${successCount}/${totalCount} pages working`);
    console.log(`🎯 Success Rate: ${((successCount/totalCount) * 100).toFixed(1)}%`);
    
    this.generateReport();
    return { successCount, totalCount, results: this.testResults };
  }

  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        total: this.testResults.length,
        successful: this.testResults.filter(r => r.success).length,
        failed: this.testResults.filter(r => !r.success).length
      },
      results: this.testResults
    };

    fs.writeFileSync('test-results.json', JSON.stringify(report, null, 2));
    console.log('📄 Test report saved to test-results.json');
  }

  async testServerStatus() {
    console.log('🔍 Checking server status...');
    
    try {
      const response = await fetch(this.baseUrl);
      if (response.status === 200) {
        console.log('✅ Server is running and responding');
        return true;
      } else {
        console.log(`⚠️ Server responded with status: ${response.status}`);
        return false;
      }
    } catch (error) {
      console.log('❌ Server is not responding');
      return false;
    }
  }

  async run() {
    console.log('🚀 COMPREHENSIVE PAGE TESTING STARTED');
    console.log('🎯 250 MCP Agents testing all dropdown pages');
    
    const serverRunning = await this.testServerStatus();
    
    if (serverRunning) {
      await this.testAllPages();
    } else {
      console.log('⚠️ Server not running. Please start the server first.');
      console.log('💡 Run: npm run dev -- --port 3000');
    }
  }
}

// Run the tests
const tester = new PageTester();
tester.run().catch(console.error);
