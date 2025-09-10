@echo off
echo 🌐 Setting up transbotai.com domain for local development...
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
echo 📝 Adding transbotai.com domains to Windows hosts file...

REM Backup original hosts file
copy C:\Windows\System32\drivers\etc\hosts C:\Windows\System32\drivers\etc\hosts.backup

REM Add domain entries
echo 127.0.0.1 transbotai.com >> C:\Windows\System32\drivers\etc\hosts
echo 127.0.0.1 www.transbotai.com >> C:\Windows\System32\drivers\etc\hosts
echo 127.0.0.1 customer.transbotai.com >> C:\Windows\System32\drivers\etc\hosts
echo 127.0.0.1 broker.transbotai.com >> C:\Windows\System32\drivers\etc\hosts
echo 127.0.0.1 carrier.transbotai.com >> C:\Windows\System32\drivers\etc\hosts
echo 127.0.0.1 driver.transbotai.com >> C:\Windows\System32\drivers\etc\hosts
echo 127.0.0.1 shipper.transbotai.com >> C:\Windows\System32\drivers\etc\hosts
echo 127.0.0.1 admin.transbotai.com >> C:\Windows\System32\drivers\etc\hosts
echo 127.0.0.1 mcp.transbotai.com >> C:\Windows\System32\drivers\etc\hosts
echo 127.0.0.1 analytics.transbotai.com >> C:\Windows\System32\drivers\etc\hosts
echo 127.0.0.1 marketplace.transbotai.com >> C:\Windows\System32\drivers\etc\hosts
echo 127.0.0.1 financial.transbotai.com >> C:\Windows\System32\drivers\etc\hosts
echo 127.0.0.1 fleet.transbotai.com >> C:\Windows\System32\drivers\etc\hosts
echo 127.0.0.1 crm.transbotai.com >> C:\Windows\System32\drivers\etc\hosts
echo 127.0.0.1 loadboard.transbotai.com >> C:\Windows\System32\drivers\etc\hosts

echo.
echo ✅ Domain setup complete!
echo.
echo 🌐 You can now access your portals using:
echo    Main Website: http://transbotai.com:3000
echo    Customer Portal: http://customer.transbotai.com:3000
echo    Broker Portal: http://broker.transbotai.com:3000
echo    Carrier Portal: http://carrier.transbotai.com:3000
echo    Driver Portal: http://driver.transbotai.com:3000
echo    Shipper Portal: http://shipper.transbotai.com:3000
echo    Admin Portal: http://admin.transbotai.com:3005
echo    MCP Dashboard: http://mcp.transbotai.com:3002
echo.
echo 🔧 To remove domains later, run: remove-local-domain.bat
echo.
pause
