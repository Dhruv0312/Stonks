Write-Host "Starting Google Sheets Server..." -ForegroundColor Green
Write-Host ""

# Get the directory where this script is located
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

Write-Host "Current directory: $(Get-Location)" -ForegroundColor Yellow
Write-Host ""
Write-Host "Server will start on http://localhost:3001" -ForegroundColor Cyan
Write-Host "Keep this window open to keep the server running" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Red
Write-Host ""

try {
    node server.js
}
catch {
    Write-Host "Error starting server: $_" -ForegroundColor Red
    Read-Host "Press Enter to exit"
} 