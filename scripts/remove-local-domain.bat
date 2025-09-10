@echo off
echo 🌐 Removing transbotai.com domain from local development...
echo.

REM Check if running as administrator
net session >nul 2>&1
if %errorLevel% == 0 (
    echo ✅ Running as Administrator - Good!
) else (
    echo ❌ Please run this script as Administrator
    echo Right-click and select "Run as administrator"
    pause
    exit /b 1
)

echo.
echo 📝 Restoring original hosts file...

REM Restore backup hosts file
if exist C:\Windows\System32\drivers\etc\hosts.backup (
    copy C:\Windows\System32\drivers\etc\hosts.backup C:\Windows\System32\drivers\etc\hosts
    echo ✅ Hosts file restored from backup
) else (
    echo ❌ No backup found. Please manually remove transbotai.com entries from hosts file
)

echo.
echo ✅ Domain removal complete!
echo.
echo 🌐 You can now access your portals using localhost:
echo    Main Website: http://localhost:3000
echo    Customer Portal: http://localhost:3000/customer
echo    Broker Portal: http://localhost:3000/broker
echo    Carrier Portal: http://localhost:3000/carrier
echo    Driver Portal: http://localhost:3000/driver
echo    Shipper Portal: http://localhost:3000/shipper
echo    Admin Portal: http://localhost:3005
echo    MCP Dashboard: http://localhost:3002
echo.
pause
