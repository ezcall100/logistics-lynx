@echo off
REM ========================================
REM CREATE WINDOWS STARTUP TASK
REM ========================================
REM This script creates a Windows Task Scheduler entry
REM to automatically start port locking on system boot

echo.
echo ========================================
echo CREATING WINDOWS STARTUP TASK
echo ========================================
echo.

REM Create the task scheduler entry
schtasks /create /tn "TransBot Port Locker" /tr "C:\Users\reply\OneDrive\Desktop\TransBot\New-TMS-software\logistics-lynx\scripts\startup-port-locker.bat" /sc onstart /ru "SYSTEM" /f

if %errorlevel% equ 0 (
    echo ✅ Windows startup task created successfully!
    echo.
    echo The TransBot Port Locker will now start automatically
    echo when Windows boots up.
    echo.
    echo Ports 3000, 3001, 3005, 3006 will be permanently locked.
    echo.
) else (
    echo ❌ Failed to create startup task.
    echo Please run this script as Administrator.
    echo.
)

echo Press any key to continue...
pause >nul
