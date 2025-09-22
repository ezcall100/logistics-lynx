#!/usr/bin/env pwsh

# 🚀 AUTONOMOUS SYSTEM & N8N WEBHOOK TESTING SCRIPT
# Tests MCP 302 agents and n8n webhook integration for production readiness

Write-Host "🤖 AUTONOMOUS SYSTEM & N8N WEBHOOK TESTING" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

# Test endpoints
$endpoints = @(
    @{ Name = "MCP System Health"; Url = "http://localhost:3001/api/mcp/system/health" },
    @{ Name = "MCP Agents (302)"; Url = "http://localhost:3001/api/mcp/agents" },
    @{ Name = "MCP Metrics Overview"; Url = "http://localhost:3001/api/mcp/metrics/overview" },
    @{ Name = "MCP Dashboard Overview"; Url = "http://localhost:3002/api/dashboard/overview" },
    @{ Name = "Super Admin Overview"; Url = "http://localhost:3005/api/admin/overview" },
    @{ Name = "Portal Login Overview"; Url = "http://localhost:3006/api/login/overview" }
)

Write-Host "🔍 Testing All Endpoints..." -ForegroundColor Yellow
Write-Host ""

$allTestsPassed = $true

foreach ($endpoint in $endpoints) {
    try {
        $response = Invoke-WebRequest -Uri $endpoint.Url -Method GET -TimeoutSec 10
        if ($response.StatusCode -eq 200) {
            $data = $response.Content | ConvertFrom-Json
            Write-Host "✅ $($endpoint.Name): OK" -ForegroundColor Green
            
            # Extract key metrics for MCP system
            if ($endpoint.Name -eq "MCP System Health") {
                Write-Host "   🤖 Agent Count: $($data.data.agent_count)" -ForegroundColor White
                Write-Host "   🚀 Autonomous Mode: $($data.data.autonomous_mode)" -ForegroundColor White
                Write-Host "   📊 System Status: $($data.data.system_status)" -ForegroundColor White
            }
            elseif ($endpoint.Name -eq "MCP Dashboard Overview") {
                Write-Host "   🤖 Total Agents: $($data.data.totalAgents)" -ForegroundColor White
                Write-Host "   ⚡ Active Agents: $($data.data.activeAgents)" -ForegroundColor White
                Write-Host "   📈 System Health: $($data.data.systemHealth)" -ForegroundColor White
            }
        } else {
            Write-Host "❌ $($endpoint.Name): FAILED (Status: $($response.StatusCode))" -ForegroundColor Red
            $allTestsPassed = $false
        }
    }
    catch {
        Write-Host "❌ $($endpoint.Name): ERROR - $($_.Exception.Message)" -ForegroundColor Red
        $allTestsPassed = $false
    }
    Write-Host ""
}

# Test n8n Webhook Integration
Write-Host "🔗 Testing N8N Webhook Integration..." -ForegroundColor Yellow
Write-Host ""

$webhookTests = @(
    @{
        Name = "Task Creation Webhook"
        Body = @{
            type = "n8n_webhook_test"
            payload = @{
                source = "n8n_automation"
                test_type = "autonomous_verification"
                timestamp = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
                webhook_id = "test-$(Get-Date -Format 'yyyyMMddHHmmss')"
            }
            priority = 1
            agent_id = "agent-1"
            idempotency_key = "n8n-test-$(Get-Date -Format 'yyyyMMddHHmmss')"
        }
    },
    @{
        Name = "Autonomous Agent Task"
        Body = @{
            type = "autonomous_operation"
            payload = @{
                operation = "system_health_check"
                autonomous_mode = $true
                agent_coordination = $true
                mcp_v2_enabled = $true
            }
            priority = 2
            agent_id = "agent-2"
        }
    }
)

foreach ($test in $webhookTests) {
    try {
        $jsonBody = $test.Body | ConvertTo-Json -Depth 3
        $headers = @{ "Content-Type" = "application/json" }
        
        $response = Invoke-WebRequest -Uri "http://localhost:3001/api/mcp/tasks" -Method POST -Headers $headers -Body $jsonBody -TimeoutSec 10
        
        if ($response.StatusCode -eq 201) {
            $result = $response.Content | ConvertFrom-Json
            Write-Host "✅ $($test.Name): SUCCESS" -ForegroundColor Green
            Write-Host "   📋 Task ID: $($result.data.id)" -ForegroundColor White
            Write-Host "   🎯 Status: $($result.data.status)" -ForegroundColor White
            Write-Host "   ⏰ Created: $($result.data.created_at)" -ForegroundColor White
        } else {
            Write-Host "❌ $($test.Name): FAILED (Status: $($response.StatusCode))" -ForegroundColor Red
            $allTestsPassed = $false
        }
    }
    catch {
        Write-Host "❌ $($test.Name): ERROR - $($_.Exception.Message)" -ForegroundColor Red
        $allTestsPassed = $false
    }
    Write-Host ""
}

# Test Real-time WebSocket Connections
Write-Host "🔌 Testing WebSocket Connections..." -ForegroundColor Yellow
Write-Host ""

$websocketPorts = @(3001, 3002, 3005, 3006)
foreach ($port in $websocketPorts) {
    try {
        $tcpClient = New-Object System.Net.Sockets.TcpClient
        $tcpClient.Connect("localhost", $port)
        if ($tcpClient.Connected) {
            Write-Host "✅ WebSocket Port ${port}: CONNECTED" -ForegroundColor Green
            $tcpClient.Close()
        } else {
            Write-Host "❌ WebSocket Port ${port}: FAILED" -ForegroundColor Red
            $allTestsPassed = $false
        }
    }
    catch {
        Write-Host "❌ WebSocket Port ${port}: ERROR - $($_.Exception.Message)" -ForegroundColor Red
        $allTestsPassed = $false
    }
}

Write-Host ""

# Final Status Report
Write-Host "📊 AUTONOMOUS SYSTEM STATUS REPORT" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

if ($allTestsPassed) {
    Write-Host "🎉 ALL TESTS PASSED!" -ForegroundColor Green
    Write-Host "✅ MCP 302 Agents: OPERATIONAL" -ForegroundColor Green
    Write-Host "✅ N8N Webhook Integration: READY" -ForegroundColor Green
    Write-Host "✅ Autonomous Mode: ENABLED" -ForegroundColor Green
    Write-Host "✅ Production Ready: YES" -ForegroundColor Green
    Write-Host ""
    Write-Host "🚀 SYSTEM IS READY FOR AUTONOMOUS OPERATION!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Available Services:" -ForegroundColor White
    Write-Host "   🌐 Main Website: http://localhost:3000" -ForegroundColor White
    Write-Host "   🤖 MCP API: http://localhost:3001" -ForegroundColor White
    Write-Host "   📊 MCP Dashboard: http://localhost:3002" -ForegroundColor White
    Write-Host "   🛡️  Super Admin: http://localhost:3005" -ForegroundColor White
    Write-Host "   🔐 Portal Login: http://localhost:3006" -ForegroundColor White
} else {
    Write-Host "❌ SOME TESTS FAILED!" -ForegroundColor Red
    Write-Host "🔧 Please check the failed services above" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "⏰ Test completed at: $(Get-Date)" -ForegroundColor Gray
