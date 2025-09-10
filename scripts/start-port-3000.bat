@echo off
REM ========================================
REM START TRANSBOT ON PORT 3000
REM ========================================
REM This script ensures TransBot always starts on port 3000

echo.
echo ========================================
echo STARTING TRANSBOT ON PORT 3000
echo ========================================
echo.

REM Change to project directory
cd /d "C:\Users\reply\OneDrive\Desktop\TransBot\New-TMS-software\logistics-lynx"

REM Kill any existing Node.js processes
echo Stopping existing processes...
taskkill /f /im node.exe >nul 2>&1

REM Wait a moment
timeout /t 2 /nobreak >nul

REM Start TransBot on port 3000
echo Starting TransBot on port 3000...
npm run dev -- --port 3000 --host 0.0.0.0

REM Keep window open
pause
