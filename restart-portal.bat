@echo off
echo Stopping all servers...

taskkill /F /IM node.exe >nul 2>&1

echo Waiting 3 seconds...
timeout /t 3 /nobreak >nul

echo Starting Portal App on port 3006...
start "Portal App" cmd /k "npm run dev:portal"

echo Portal app started on port 3006
echo This should show ONLY login/signup page with NO header and NO FAB
pause
