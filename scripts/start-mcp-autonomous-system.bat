@echo off
echo 🚀 Starting MCP Autonomous System...
echo 🎯 250 agents will work autonomously and complete jobs ASAP
echo ⚡ Auto-assignment: Agents move to next job when finished
echo.

echo Starting MCP Autonomous Master Control...
start "MCP Master Control" cmd /k "node scripts/mcp-autonomous-master-control.mjs"

timeout /t 3 /nobreak >nul

echo Starting MCP Real-Time Agent Monitor...
start "MCP Agent Monitor" cmd /k "node scripts/mcp-real-time-agent-monitor.mjs"

timeout /t 3 /nobreak >nul

echo Starting MCP Autonomous Job Queue...
start "MCP Job Queue" cmd /k "node scripts/mcp-autonomous-job-queue.mjs"

echo.
echo ✅ MCP Autonomous System Started!
echo 🎯 All 250 agents are now working autonomously
echo ⚡ Check the opened windows for real-time progress
echo 🔄 Agents will automatically move to next jobs when finished
echo.
echo Press any key to exit...
pause >nul
