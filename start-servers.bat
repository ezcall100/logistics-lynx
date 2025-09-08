@echo off
echo Starting servers...

echo Starting MCP API on port 3001...
start "MCP API" cmd /k "npm run dev:mcp"

timeout /t 3 /nobreak > nul

echo Starting Portal App on port 3006...
start "Portal App" cmd /k "npm run dev:portal"

timeout /t 3 /nobreak > nul

echo Starting Main Website on port 3000...
start "Main Website" cmd /k "npm run dev"

echo All servers started!
echo Port 3000: Main Website
echo Port 3001: MCP API
echo Port 3006: Portal App
pause
