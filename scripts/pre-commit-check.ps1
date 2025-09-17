#!/usr/bin/env pwsh

# 🚀 Pre-Commit Check Script
# Run this before every commit to ensure code quality

Write-Host "🔍 Running Pre-Commit Checks..." -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: Not in project root directory" -ForegroundColor Red
    Write-Host "Please run this script from the project root" -ForegroundColor Yellow
    exit 1
}

$errors = 0

# 1. ESLint Check
Write-Host "1️⃣ Running ESLint..." -ForegroundColor Yellow
try {
    $eslintResult = npx eslint src/ --max-warnings 0 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ ESLint: PASSED" -ForegroundColor Green
    } else {
        Write-Host "❌ ESLint: FAILED" -ForegroundColor Red
        Write-Host $eslintResult -ForegroundColor Red
        $errors++
    }
} catch {
    Write-Host "❌ ESLint: ERROR - $($_.Exception.Message)" -ForegroundColor Red
    $errors++
}

Write-Host ""

# 2. TypeScript Check
Write-Host "2️⃣ Running TypeScript Check..." -ForegroundColor Yellow
try {
    $tsResult = npx tsc --noEmit 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ TypeScript: PASSED" -ForegroundColor Green
    } else {
        Write-Host "❌ TypeScript: FAILED" -ForegroundColor Red
        Write-Host $tsResult -ForegroundColor Red
        $errors++
    }
} catch {
    Write-Host "❌ TypeScript: ERROR - $($_.Exception.Message)" -ForegroundColor Red
    $errors++
}

Write-Host ""

# 3. Check for any types in source files
Write-Host "3️⃣ Checking for 'any' types..." -ForegroundColor Yellow
try {
    $anyTypes = Get-ChildItem -Path "src" -Recurse -Include "*.ts", "*.tsx" | 
                Select-String -Pattern ":\s*any\b" | 
                Where-Object { $_.Line -notmatch "eslint-disable" }
    
    if ($anyTypes.Count -eq 0) {
        Write-Host "✅ No 'any' types found" -ForegroundColor Green
    } else {
        Write-Host "❌ Found $($anyTypes.Count) 'any' types:" -ForegroundColor Red
        $anyTypes | ForEach-Object {
            Write-Host "  $($_.Filename):$($_.LineNumber) - $($_.Line)" -ForegroundColor Red
        }
        $errors++
    }
} catch {
    Write-Host "❌ Error checking for 'any' types: $($_.Exception.Message)" -ForegroundColor Red
    $errors++
}

Write-Host ""

# 4. Check integration status
Write-Host "4️⃣ Checking Integration Status..." -ForegroundColor Yellow

# Check if ports are in use
$ports = @(3000, 3001, 3002, 3005, 3006)
$activePorts = @()

foreach ($port in $ports) {
    $connection = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    if ($connection) {
        $activePorts += $port
    }
}

if ($activePorts.Count -gt 0) {
    Write-Host "✅ Active ports: $($activePorts -join ', ')" -ForegroundColor Green
} else {
    Write-Host "⚠️  No active ports detected (services may not be running)" -ForegroundColor Yellow
}

Write-Host ""

# Summary
Write-Host "📊 PRE-COMMIT CHECK SUMMARY" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan

if ($errors -eq 0) {
    Write-Host "🎉 ALL CHECKS PASSED! Safe to commit." -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "  git add ." -ForegroundColor White
    Write-Host "  git commit -m 'Your commit message'" -ForegroundColor White
    Write-Host "  git push" -ForegroundColor White
    exit 0
} else {
    Write-Host "❌ $errors CHECK(S) FAILED! Fix issues before committing." -ForegroundColor Red
    Write-Host ""
    Write-Host "Common fixes:" -ForegroundColor Yellow
    Write-Host "  - Remove 'any' types and use proper TypeScript types" -ForegroundColor White
    Write-Host "  - Add missing imports" -ForegroundColor White
    Write-Host "  - Remove unused imports" -ForegroundColor White
    Write-Host "  - Fix TypeScript compilation errors" -ForegroundColor White
    Write-Host ""
    Write-Host "Emergency bypass (use sparingly):" -ForegroundColor Yellow
    Write-Host "  git commit --no-verify -m 'Emergency commit'" -ForegroundColor White
    exit 1
}
