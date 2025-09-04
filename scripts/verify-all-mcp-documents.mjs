#!/usr/bin/env node

/**
 * TransBot AI - Complete MCP Document Verification
 * Verifies all MCP-v2 related documents and system components
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// All required documents from user specification
const REQUIRED_DOCUMENTS = [
    // Core MCP-v2 Plans
    'MCP-v2-COMPLETE-PLAN.md',
    'AUTONOMOUS-AGENTS-WEBSITE-MISSION.md',
    'MCP-V2-WEBSITE-REDESIGN-PLAN-REWRITE.md',
    
    // Integration Summaries
    'RATES_INTEGRATION_SUMMARY.md',
    'LOADBOARD_INTEGRATION_SUMMARY.md',
    'LOB-IMPLEMENTATION-SUMMARY.md',
    'DOCUMENTATION_SYSTEM_IMPLEMENTATION_COMPLETE.md',
    'MCP-V2-COMPLETE-INTEGRATION-SUMMARY.md',
    'V2-WEBSITE-DESIGN-PLAN-INTEGRATION.md',
    
    // Status Reports
    'AUTONOMOUS-SYSTEM-STATUS-REPORT.md',
    'QUANTUM-ENHANCED-IMPLEMENTATION-COMPLETE.md',
    'QUANTUM-ENHANCED-MCP-AGENT-MANAGEMENT-STATUS.md',
    'QUANTUM-ENHANCED-SYSTEM-STATUS-FINAL.md',
    'FINAL-QUANTUM-ENHANCED-IMPLEMENTATION-STATUS.md',
    'QUANTUM-ENHANCED-MCP-v2-IMPLEMENTATION-SUMMARY.md',
    
    // Guides and Manuals
    'QUICK-START-GUIDE.md',
    'COMPLETE-PORTAL-COVERAGE-SUMMARY.md',
    'AUTONOMOUS-AGENTS-USER-MANUAL-GUIDE.md',
    'AUTONOMOUS-AGENTS-MCP-V2-REDESIGN-BRIEFING.md',
    
    // Credentials and Configuration
    'PORTAL_CREDENTIALS.md',
    
    // Execution Plans
    'mcp-v2-super-admin-execution-plan.json',
    'mcp-v2-super-admin-redesign-executor.json',
    'MCP-V2-SUPER-ADMIN-REDESIGN-PLAN.md',
    'quantum-enhanced-mcp-v2-execution-plan.json',
    'enhanced-mcp-v2-quantum-executor.json',
    'mcp-v2-redesign-executor.json',
    'mcp-v2-execution-plan.json',
    
    // System Documentation
    'AUTONOMOUS_AGENT_SYSTEM_DOCUMENTATION.md'
];

// Required agent files
const REQUIRED_AGENT_FILES = [
    'src/agents/master-autonomous-orchestrator.ts',
    'src/agents/mcp-v2-coordinator.ts',
    'src/agents/autonomous-executive-team.ts',
    'src/agents/autonomous-agent-executor.ts',
    'src/agents/business-strategy-system.ts',
    'src/agents/autonomous-system-controller.ts',
    'src/agents/24-7-autonomous-system-activator.ts'
];

// Required system files
const REQUIRED_SYSTEM_FILES = [
    'server/mcp-server.js',
    'src/components/ProgressMonitoringDashboard.tsx',
    'src/components/DailyProgressReport.tsx',
    'scripts/real-time-progress-monitor.js'
];

class MCPDocumentVerifier {
    constructor() {
        this.projectRoot = path.join(__dirname, '..');
        this.results = {
            documents: [],
            agents: [],
            system: [],
            mcpApi: null
        };
    }

    // Check if file exists and get its size
    checkFile(filePath) {
        const fullPath = path.join(this.projectRoot, filePath);
        try {
            if (fs.existsSync(fullPath)) {
                const stats = fs.statSync(fullPath);
                const sizeKB = (stats.size / 1024).toFixed(1);
                return { exists: true, size: sizeKB, path: fullPath };
            }
            return { exists: false, size: 0, path: fullPath };
        } catch (error) {
            return { exists: false, size: 0, path: fullPath, error: error.message };
        }
    }

    // Verify all documents
    verifyDocuments() {
        console.log('📋 Verifying MCP-v2 Documents...');
        console.log('='.repeat(60));
        
        REQUIRED_DOCUMENTS.forEach(doc => {
            const result = this.checkFile(doc);
            this.results.documents.push({ name: doc, ...result });
            
            if (result.exists) {
                console.log(`✅ ${doc} - EXISTS (${result.size} KB)`);
            } else {
                console.log(`❌ ${doc} - MISSING`);
            }
        });
        
        const existingDocs = this.results.documents.filter(d => d.exists).length;
        console.log(`\n📊 Documents: ${existingDocs}/${REQUIRED_DOCUMENTS.length}`);
    }

    // Verify agent files
    verifyAgents() {
        console.log('\n🤖 Verifying Autonomous Agent Files...');
        console.log('='.repeat(60));
        
        REQUIRED_AGENT_FILES.forEach(agent => {
            const result = this.checkFile(agent);
            this.results.agents.push({ name: agent, ...result });
            
            if (result.exists) {
                console.log(`✅ ${agent} - EXISTS (${result.size} KB)`);
            } else {
                console.log(`❌ ${agent} - MISSING`);
            }
        });
        
        const existingAgents = this.results.agents.filter(a => a.exists).length;
        console.log(`\n📊 Agents: ${existingAgents}/${REQUIRED_AGENT_FILES.length}`);
    }

    // Verify system files
    verifySystemFiles() {
        console.log('\n⚙️ Verifying System Files...');
        console.log('='.repeat(60));
        
        REQUIRED_SYSTEM_FILES.forEach(file => {
            const result = this.checkFile(file);
            this.results.system.push({ name: file, ...result });
            
            if (result.exists) {
                console.log(`✅ ${file} - EXISTS (${result.size} KB)`);
            } else {
                console.log(`❌ ${file} - MISSING`);
            }
        });
        
        const existingSystem = this.results.system.filter(s => s.exists).length;
        console.log(`\n📊 System Files: ${existingSystem}/${REQUIRED_SYSTEM_FILES.length}`);
    }

    // Test MCP API
    async testMCPAPI() {
        console.log('\n🌐 Testing MCP API (Port 3001)...');
        console.log('='.repeat(60));
        
        try {
            const response = await fetch('http://localhost:3001/api/mcp/system/health');
            if (response.ok) {
                const data = await response.json();
                this.results.mcpApi = { status: 'success', data };
                console.log('✅ MCP API Health Check: SUCCESS');
                console.log(`   Status: ${data.data.status}`);
                console.log(`   Uptime: ${(data.data.uptime / 60).toFixed(1)} minutes`);
                console.log(`   Version: ${data.data.version}`);
            } else {
                this.results.mcpApi = { status: 'error', error: `HTTP ${response.status}` };
                console.log(`❌ MCP API Health Check: FAILED (HTTP ${response.status})`);
            }
        } catch (error) {
            this.results.mcpApi = { status: 'error', error: error.message };
            console.log(`❌ MCP API Health Check: FAILED - ${error.message}`);
        }
    }

    // Generate summary report
    generateSummary() {
        console.log('\n📊 COMPLETE VERIFICATION SUMMARY');
        console.log('='.repeat(60));
        
        const totalDocs = REQUIRED_DOCUMENTS.length;
        const existingDocs = this.results.documents.filter(d => d.exists).length;
        const totalAgents = REQUIRED_AGENT_FILES.length;
        const existingAgents = this.results.agents.filter(a => a.exists).length;
        const totalSystem = REQUIRED_SYSTEM_FILES.length;
        const existingSystem = this.results.system.filter(s => s.exists).length;
        
        console.log(`📋 Documents: ${existingDocs}/${totalDocs} (${((existingDocs/totalDocs)*100).toFixed(1)}%)`);
        console.log(`🤖 Agents: ${existingAgents}/${totalAgents} (${((existingAgents/totalAgents)*100).toFixed(1)}%)`);
        console.log(`⚙️ System Files: ${existingSystem}/${totalSystem} (${((existingSystem/totalSystem)*100).toFixed(1)}%)`);
        console.log(`🌐 MCP API: ${this.results.mcpApi?.status === 'success' ? '✅ ONLINE' : '❌ OFFLINE'}`);
        
        // Show missing files
        const missingDocs = this.results.documents.filter(d => !d.exists);
        const missingAgents = this.results.agents.filter(a => !a.exists);
        const missingSystem = this.results.system.filter(s => !s.exists);
        
        if (missingDocs.length > 0) {
            console.log('\n❌ Missing Documents:');
            missingDocs.forEach(doc => console.log(`   - ${doc.name}`));
        }
        
        if (missingAgents.length > 0) {
            console.log('\n❌ Missing Agent Files:');
            missingAgents.forEach(agent => console.log(`   - ${agent.name}`));
        }
        
        if (missingSystem.length > 0) {
            console.log('\n❌ Missing System Files:');
            missingSystem.forEach(file => console.log(`   - ${file.name}`));
        }
        
        // Overall status
        const overallScore = ((existingDocs + existingAgents + existingSystem) / (totalDocs + totalAgents + totalSystem)) * 100;
        console.log(`\n🎯 Overall System Completeness: ${overallScore.toFixed(1)}%`);
        
        if (overallScore >= 90) {
            console.log('🚀 EXCELLENT: System is highly complete and ready for operation!');
        } else if (overallScore >= 75) {
            console.log('✅ GOOD: System is mostly complete with minor gaps.');
        } else if (overallScore >= 50) {
            console.log('⚠️ FAIR: System has significant gaps that need attention.');
        } else {
            console.log('❌ POOR: System has major gaps requiring immediate attention.');
        }
    }

    // Run complete verification
    async runCompleteVerification() {
        console.log('🤖 TransBot AI - Complete MCP Document Verification');
        console.log('='.repeat(60));
        console.log(`📁 Project Root: ${this.projectRoot}\n`);
        
        this.verifyDocuments();
        this.verifyAgents();
        this.verifySystemFiles();
        await this.testMCPAPI();
        this.generateSummary();
        
        return this.results;
    }
}

// Run verification if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    const verifier = new MCPDocumentVerifier();
    verifier.runCompleteVerification().catch(console.error);
}

export default MCPDocumentVerifier;
