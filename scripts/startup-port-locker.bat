@echo off
REM ========================================
REM TRANSBOT PERMANENT PORT LOCKER
REM ========================================
REM This script runs automatically on Windows startup
REM to lock ports 3000, 3001, 3005, 3006 permanently

echo.
echo ========================================
echo TRANSBOT PERMANENT PORT LOCKER STARTUP
echo ========================================
echo Starting: %date% %time%
echo.

REM Change to project directory
cd /d "C:\Users\reply\OneDrive\Desktop\TransBot\New-TMS-software\logistics-lynx"

REM Start the permanent port locker
echo Starting Permanent Port Locker...
node scripts/permanent-port-locker.mjs

REM Keep window open to see status
pause
