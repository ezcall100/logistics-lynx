#!/usr/bin/env pwsh

# 🚀 Quick Pre-Commit Check
# Simple version for daily use

Write-Host "🔍 Quick Pre-Commit Check" -ForegroundColor Cyan
Write-Host "=========================" -ForegroundColor Cyan
Write-Host ""

# Check ESLint
Write-Host "Running ESLint..." -ForegroundColor Yellow
$eslintExit = 0
try {
    npx eslint src/ --max-warnings 0 | Out-Null
    $eslintExit = $LASTEXITCODE
} catch {
    $eslintExit = 1
}

if ($eslintExit -eq 0) {
    Write-Host "✅ ESLint: PASSED" -ForegroundColor Green
} else {
    Write-Host "❌ ESLint: FAILED - Run 'npx eslint src/' to see errors" -ForegroundColor Red
}

# Check TypeScript
Write-Host "Running TypeScript check..." -ForegroundColor Yellow
$tsExit = 0
try {
    npx tsc --noEmit | Out-Null
    $tsExit = $LASTEXITCODE
} catch {
    $tsExit = 1
}

if ($tsExit -eq 0) {
    Write-Host "✅ TypeScript: PASSED" -ForegroundColor Green
} else {
    Write-Host "❌ TypeScript: FAILED - Run 'npx tsc --noEmit' to see errors" -ForegroundColor Red
}

Write-Host ""

# Summary
if ($eslintExit -eq 0 -and $tsExit -eq 0) {
    Write-Host "🎉 ALL CHECKS PASSED! Safe to commit." -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "  git add ." -ForegroundColor White
    Write-Host "  git commit -m 'Your commit message'" -ForegroundColor White
} else {
    Write-Host "❌ CHECKS FAILED! Fix issues before committing." -ForegroundColor Red
    Write-Host ""
    Write-Host "Common fixes:" -ForegroundColor Yellow
    Write-Host "  - Remove any types" -ForegroundColor White
    Write-Host "  - Add missing imports" -ForegroundColor White
    Write-Host "  - Remove unused imports" -ForegroundColor White
}