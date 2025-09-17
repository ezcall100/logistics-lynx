#!/usr/bin/env pwsh

Write-Host "🌐 FINAL SERVICE STATUS CHECK" -ForegroundColor Cyan
Write-Host "=============================" -ForegroundColor Cyan
Write-Host ""

$services = @(
    @{ Name = "Main Website"; Port = 3000; URL = "http://localhost:3000" },
    @{ Name = "MCP API Server"; Port = 3001; URL = "http://localhost:3001" },
    @{ Name = "MCP Dashboard"; Port = 3002; URL = "http://localhost:3002" },
    @{ Name = "Super Admin Portal"; Port = 3005; URL = "http://localhost:3005" },
    @{ Name = "Portal App (Login)"; Port = 3006; URL = "http://localhost:3006" }
)

$allRunning = $true

foreach ($service in $services) {
    try {
        $response = Invoke-WebRequest -Uri $service.URL -TimeoutSec 3 -ErrorAction Stop
        Write-Host "✅ Port $($service.Port): $($service.Name) - Status: $($response.StatusCode)" -ForegroundColor Green
    }
    catch {
        if ($_.Exception.Response.StatusCode -eq 404) {
            Write-Host "✅ Port $($service.Port): $($service.Name) - Running (404 is normal)" -ForegroundColor Green
        } else {
            Write-Host "❌ Port $($service.Port): $($service.Name) - Not accessible: $($_.Exception.Message)" -ForegroundColor Red
            $allRunning = $false
        }
    }
}

Write-Host ""
Write-Host "📊 PORT CONNECTIVITY CHECK" -ForegroundColor Yellow
Write-Host "===========================" -ForegroundColor Yellow

foreach ($service in $services) {
    $connection = Test-NetConnection -ComputerName localhost -Port $service.Port -InformationLevel Quiet -WarningAction SilentlyContinue
    if ($connection) {
        Write-Host "✅ Port $($service.Port): $($service.Name) - Port is open" -ForegroundColor Green
    } else {
        Write-Host "❌ Port $($service.Port): $($service.Name) - Port is closed" -ForegroundColor Red
        $allRunning = $false
    }
}

Write-Host ""
if ($allRunning) {
    Write-Host "🎉 ALL SERVICES ARE RUNNING SUCCESSFULLY!" -ForegroundColor Green
} else {
    Write-Host "⚠️  Some services may need attention" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🔗 ACCESS URLS" -ForegroundColor Magenta
Write-Host "==============" -ForegroundColor Magenta
Write-Host "Main Website: http://localhost:3000" -ForegroundColor White
Write-Host "MCP API: http://localhost:3001" -ForegroundColor White
Write-Host "MCP Dashboard: http://localhost:3002" -ForegroundColor White
Write-Host "Super Admin: http://localhost:3005" -ForegroundColor White
Write-Host "Portal Login: http://localhost:3006" -ForegroundColor White
