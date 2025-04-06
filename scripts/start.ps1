$CurrentDir = Get-Location

Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process

# Load logging script
. "$CurrentDir\scripts\util\log.ps1" -ScriptID "AppTemplate Start"

. "$CurrentDir\scripts\util\load_dotenv.ps1"

. "$CurrentDir\scripts\stop.ps1"

# Git check: Show commits behind origin/main
git fetch origin *> $null
$currentBranch = git rev-parse --abbrev-ref HEAD
$commitsBehind = [int](git rev-list --count HEAD..origin/main)

if ($commitsBehind -gt 0) {
    Write-Host ""
    Write-Host "`e[91;1mBEHIND ($commitsBehind commits behind origin/main)`e[0m"
    Write-Host "`e[31m`e[3mTo merge the latest changes from 'main' into your branch:`e[0m"
    Write-Host "`e[31m`e[3m  git merge origin/main`e[0m"
}

# Set up log directories
$logDir = "$CurrentDir\logs\server"
if (Test-Path $logDir) {
    Remove-Item $logDir -Recurse -Force
}
New-Item -ItemType Directory -Path $logDir -Force

# Create directory for PID files
$pidsDir = "$CurrentDir\logs\pids"
if (-not (Test-Path $pidsDir)) {
    New-Item -ItemType Directory -Path $pidsDir -Force
}

$env:PYTHONIOENCODING = "utf-8"

# Start API server in new terminal and capture its process
$apiOut = Join-Path $logDir "api_out.log"
$apiErr = Join-Path $logDir "api_err.log"
$apiProc = Start-Process -FilePath "powershell.exe" `
    -ArgumentList "-NoExit", "-Command", "cd '$CurrentDir\api'; .venv\Scripts\Activate.ps1; fastapi dev root.py" `
    -WorkingDirectory "$CurrentDir\api" `
    -NoNewWindow `
    -RedirectStandardOutput $apiOut `
    -RedirectStandardError $apiErr `
    -PassThru

# Save API process ID
$apiProc.Id | Out-File (Join-Path $pidsDir "api.pid")

# Start UI server in new terminal and capture its process
$uiOut = Join-Path $logDir "ui_out.log"
$uiErr = Join-Path $logDir "ui_err.log"
$uiProc = Start-Process -FilePath "powershell.exe" `
    -ArgumentList "-NoExit", "-Command", "cd '$CurrentDir\ui'; npm run dev" `
    -WorkingDirectory "$CurrentDir\ui" `
    -NoNewWindow `
    -RedirectStandardOutput $uiOut `
    -RedirectStandardError $uiErr `
    -PassThru

# Save UI process ID
$uiProc.Id | Out-File (Join-Path $pidsDir "ui.pid")
# clear

Write-Host ""
Write-Host "`e[1;34m========== AppTemplate Started ==========`e[0m"
Write-Host ""
Write-Host "Both the UI and API servers will run as long as this terminal window is alive, or until the stop script is run."
Write-Host ""
Write-Host "`e[1;32mUI Server:`e[0m    `e[4;36mhttp://${env:HOST_IP}:${env:UI_HOST_PORT}`e[0m"
Write-Host "`e[1;32mAPI Docs:`e[0m     `e[4;36mhttp://${env:HOST_IP}:${env:API_HOST_PORT}/docs`e[0m"

Write-Host ""
Write-Host "`e[1;33mLog Files:`e[0m"
Write-Host ""
Write-Host "  `e[33mPython Runtime Logs:`e[0m   $CurrentDir\logs\API_log.log"
Write-Host "  `e[33mAPI stdout:`e[0m            $apiOut"
Write-Host "  `e[33mAPI stderr:`e[0m            $apiErr"
Write-Host "  `e[33mUI stdout:`e[0m             $uiOut"
Write-Host "  `e[33mUI stderr:`e[0m             $uiErr"
Write-Host ""
Write-Host "`e[1;34m========================================`e[0m"
Write-Host ""

Start-Sleep -Milliseconds 3000
Write-Host "`e]0;AppTemplate`a"
