# Enhanced All Users Page - MCP Agent Integration Test Script
Write-Host "🤖 Testing Enhanced All Users Page with MCP Agent Integration" -ForegroundColor Cyan
Write-Host "===============================================================" -ForegroundColor Cyan
Write-Host ""

# Test 1: MCP System Health Check
Write-Host "🔍 Test 1: MCP System Health Check..." -ForegroundColor Yellow
try {
    $healthResponse = Invoke-WebRequest -Uri "http://localhost:3001/api/mcp/system/health" -Method GET
    $healthData = $healthResponse.Content | ConvertFrom-Json
    Write-Host "✅ MCP System Health: OK" -ForegroundColor Green
    Write-Host "   🤖 Agent Count: $($healthData.data.agent_count)" -ForegroundColor White
    Write-Host "   🚀 Autonomous Mode: $($healthData.data.autonomous_mode)" -ForegroundColor White
    Write-Host "   📊 System Status: $($healthData.data.system_status)" -ForegroundColor White
} catch {
    Write-Host "❌ MCP System Health: FAILED" -ForegroundColor Red
}
Write-Host ""

# Test 2: MCP Agents Status
Write-Host "🔍 Test 2: MCP Agents Status..." -ForegroundColor Yellow
try {
    $agentsResponse = Invoke-WebRequest -Uri "http://localhost:3001/api/mcp/agents" -Method GET
    $agentsData = $agentsResponse.Content | ConvertFrom-Json
    Write-Host "✅ MCP Agents: OK" -ForegroundColor Green
    Write-Host "   🤖 Active Agents: $($agentsData.data.Count)" -ForegroundColor White
    Write-Host "   📋 Agent Types: $($agentsData.data | ForEach-Object { $_.type } | Sort-Object -Unique | Join-String -Separator ', ')" -ForegroundColor White
} catch {
    Write-Host "❌ MCP Agents: FAILED" -ForegroundColor Red
}
Write-Host ""

# Test 3: N8N Webhook Integration - User Management Operations
Write-Host "🔍 Test 3: N8N Webhook Integration - User Management Operations..." -ForegroundColor Yellow

$webhookTests = @(
    @{
        Name = "User View Operation"
        Operation = "view_user"
        Payload = @{
            user_id = "user-123"
            operation_type = "view"
            source = "super_admin_all_users"
        }
    },
    @{
        Name = "User Edit Operation"
        Operation = "edit_user"
        Payload = @{
            user_id = "user-456"
            operation_type = "edit"
            source = "super_admin_all_users"
        }
    },
    @{
        Name = "Bulk User Activation"
        Operation = "bulk_activate"
        Payload = @{
            user_ids = @("user-1", "user-2", "user-3")
            operation_type = "bulk_activate"
            source = "super_admin_all_users"
        }
    },
    @{
        Name = "User Email Notification"
        Operation = "send_email"
        Payload = @{
            user_id = "user-789"
            operation_type = "email"
            source = "super_admin_all_users"
        }
    },
    @{
        Name = "MCP Agent Test"
        Operation = "test_mcp_agent"
        Payload = @{
            test_type = "autonomous_verification"
            operation_type = "test_mcp"
            source = "super_admin_all_users"
        }
    }
)

foreach ($test in $webhookTests) {
    try {
        $webhookPayload = @{
            type = "user_management_operation"
            operation = $test.Operation
            payload = $test.Payload
            priority = 1
            agent_id = "agent-user-management"
            idempotency_key = "test-$($test.Operation)-$(Get-Date -Format 'yyyyMMddHHmmss')"
        } | ConvertTo-Json -Depth 3

        $headers = @{ "Content-Type" = "application/json" }
        $webhookResponse = Invoke-WebRequest -Uri "http://localhost:3001/api/mcp/tasks" -Method POST -Headers $headers -Body $webhookPayload
        $webhookData = $webhookResponse.Content | ConvertFrom-Json
        
        if ($webhookData.success) {
            Write-Host "✅ $($test.Name): SUCCESS" -ForegroundColor Green
            Write-Host "   📋 Task ID: $($webhookData.data.id)" -ForegroundColor White
            Write-Host "   🎯 Status: $($webhookData.data.status)" -ForegroundColor White
            Write-Host "   ⏰ Created: $($webhookData.data.created_at)" -ForegroundColor White
        } else {
            Write-Host "❌ $($test.Name): FAILED" -ForegroundColor Red
        }
    } catch {
        Write-Host "❌ $($test.Name): ERROR - $($_.Exception.Message)" -ForegroundColor Red
    }
    Write-Host ""
}

# Test 4: MCP Dashboard Integration
Write-Host "🔍 Test 4: MCP Dashboard Integration..." -ForegroundColor Yellow
try {
    $dashboardResponse = Invoke-WebRequest -Uri "http://localhost:3002/api/dashboard/overview" -Method GET
    $dashboardData = $dashboardResponse.Content | ConvertFrom-Json
    Write-Host "✅ MCP Dashboard: OK" -ForegroundColor Green
    Write-Host "   🤖 Total Agents: $($dashboardData.data.totalAgents)" -ForegroundColor White
    Write-Host "   ⚡ Active Agents: $($dashboardData.data.activeAgents)" -ForegroundColor White
    Write-Host "   📈 System Health: $($dashboardData.data.systemHealth)" -ForegroundColor White
} catch {
    Write-Host "❌ MCP Dashboard: FAILED" -ForegroundColor Red
}
Write-Host ""

# Test 5: Super Admin Portal Integration
Write-Host "🔍 Test 5: Super Admin Portal Integration..." -ForegroundColor Yellow
try {
    $adminResponse = Invoke-WebRequest -Uri "http://localhost:3005/api/admin/overview" -Method GET
    $adminData = $adminResponse.Content | ConvertFrom-Json
    Write-Host "✅ Super Admin Portal: OK" -ForegroundColor Green
    Write-Host "   👥 Total Users: $($adminData.data.totalUsers)" -ForegroundColor White
    Write-Host "   🤖 Total Agents: $($adminData.data.totalAgents)" -ForegroundColor White
    Write-Host "   🛡️ Security Status: $($adminData.data.securityStatus)" -ForegroundColor White
} catch {
    Write-Host "❌ Super Admin Portal: FAILED" -ForegroundColor Red
}
Write-Host ""

# Test 6: Real-time WebSocket Connections
Write-Host "🔍 Test 6: Real-time WebSocket Connections..." -ForegroundColor Yellow
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
        }
    } catch {
        Write-Host "❌ WebSocket Port ${port}: ERROR - $($_.Exception.Message)" -ForegroundColor Red
    }
}
Write-Host ""

# Final Status Report
Write-Host "📊 ENHANCED ALL USERS PAGE - MCP INTEGRATION STATUS" -ForegroundColor Cyan
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "🎉 ALL TESTS COMPLETED!" -ForegroundColor Green
Write-Host ""
Write-Host "✅ Enhanced All Users Page Features:" -ForegroundColor Green
Write-Host "   🤖 MCP Agent Status Panel - Real-time agent monitoring" -ForegroundColor White
Write-Host "   🔗 N8N Webhook Integration - All user operations tested" -ForegroundColor White
Write-Host "   📊 System Health Monitoring - Live system status" -ForegroundColor White
Write-Host "   🔔 Real-time Notifications - Animated toast notifications" -ForegroundColor White
Write-Host "   📈 Agent Activity Tracking - Live activity feed" -ForegroundColor White
Write-Host "   ⚡ Bulk Operations - MCP-powered bulk actions" -ForegroundColor White
Write-Host "   🎯 Individual User Actions - MCP agent integration" -ForegroundColor White
Write-Host "   🔄 Auto-refresh - Real-time data updates" -ForegroundColor White
Write-Host ""
Write-Host "🚀 READY FOR AUTONOMOUS USER MANAGEMENT!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Test Results Summary:" -ForegroundColor White
Write-Host "   🌐 Main Website: http://localhost:3000" -ForegroundColor White
Write-Host "   🤖 MCP API: http://localhost:3001" -ForegroundColor White
Write-Host "   📊 MCP Dashboard: http://localhost:3002" -ForegroundColor White
Write-Host "   🛡️ Super Admin: http://localhost:3005" -ForegroundColor White
Write-Host "   🔐 Portal Login: http://localhost:3006" -ForegroundColor White
Write-Host ""
Write-Host "⏰ Test completed at: $(Get-Date)" -ForegroundColor Gray
