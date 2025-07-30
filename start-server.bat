@echo off
echo Starting Google Sheets Server...
echo.
cd /d "%~dp0"
echo Current directory: %CD%
echo.
echo Server will start on http://localhost:3001
echo Keep this window open to keep the server running
echo.
echo Press Ctrl+C to stop the server
echo.
node server.js
pause 