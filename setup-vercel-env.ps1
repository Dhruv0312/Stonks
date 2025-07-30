# PowerShell script to set up Vercel environment variable
Write-Host "Setting up Vercel environment variable..." -ForegroundColor Green
Write-Host ""

# Read the credentials file
$credentialsPath = "stocksprediction-5fbb91ce5bb2.json"
if (Test-Path $credentialsPath) {
    $credentials = Get-Content $credentialsPath -Raw
    Write-Host "Credentials file found!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Now run the following command:" -ForegroundColor Yellow
    Write-Host "vercel env add GOOGLE_SHEETS_CREDENTIALS" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "When prompted for the value, copy and paste this entire JSON:" -ForegroundColor Yellow
    Write-Host "----------------------------------------" -ForegroundColor Gray
    Write-Host $credentials -ForegroundColor White
    Write-Host "----------------------------------------" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Make sure to select ALL environments (Production, Preview, Development)" -ForegroundColor Yellow
} else {
    Write-Host "Error: Credentials file not found!" -ForegroundColor Red
    Write-Host "Make sure stocksprediction-5fbb91ce5bb2.json exists in the current directory." -ForegroundColor Red
} 