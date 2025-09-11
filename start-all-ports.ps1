# 🔒 PORT LOCK SYSTEM - START ALL SERVICES
# This script starts all services on their locked ports

Write-Host "🚀 Starting Trans Bot AI Platform - All Services" -ForegroundColor Green
Write-Host "🔒 All ports are LOCKED and will not change" -ForegroundColor Yellow
Write-Host ""

# Function to start service with error handling
function Start-Service {
    param(
        [string]$Name,
        [string]$Command,
        [int]$Port
    )
    
    Write-Host "Starting $Name on port $Port..." -ForegroundColor Cyan
    
    try {
        Start-Process powershell -ArgumentList "-NoExit", "-Command", $Command -WindowStyle Minimized
        Write-Host "✅ $Name started successfully on port $Port" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Failed to start $Name on port $Port" -ForegroundColor Red
    }
}

# Start all services
Write-Host "📊 Service Status:" -ForegroundColor Yellow
Write-Host "Port 3000: Main Website" -ForegroundColor White
Write-Host "Port 3001: MCP API Server" -ForegroundColor White  
Write-Host "Port 3002: MCP Dashboard" -ForegroundColor White
Write-Host "Port 3005: Super Admin Portal" -ForegroundColor White
Write-Host "Port 3006: Portal App (Login)" -ForegroundColor White
Write-Host ""

# Check current port status
Write-Host "🔍 Checking current port status..." -ForegroundColor Yellow
$ports = @(3000, 3001, 3002, 3005, 3006)
foreach ($port in $ports) {
    $listening = netstat -ano | findstr ":$port.*LISTENING"
    if ($listening) {
        Write-Host "✅ Port $port is already running" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Port $port is not running" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "🎯 To start individual services:" -ForegroundColor Yellow
Write-Host "  npm run dev           # Port 3000 - Main Website" -ForegroundColor White
Write-Host "  npm run dev:mcp       # Port 3001 - MCP API Server" -ForegroundColor White
Write-Host "  npm run dev:dashboard # Port 3002 - MCP Dashboard" -ForegroundColor White
Write-Host "  npm run dev:super-admin # Port 3005 - Super Admin Portal" -ForegroundColor White
Write-Host "  npm run dev:portal    # Port 3006 - Portal App (Login)" -ForegroundColor White
Write-Host ""
Write-Host "🚀 To start all services at once:" -ForegroundColor Yellow
Write-Host "  npm run start:all" -ForegroundColor White
Write-Host ""
Write-Host "🔒 All ports are LOCKED with strictPort: true" -ForegroundColor Green
Write-Host "   No port changes will occur when running npm run dev" -ForegroundColor Green
