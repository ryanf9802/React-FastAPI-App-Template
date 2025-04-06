param (
    [string]$ScriptID = "Default"
)

function Log-Debug {
    param ([string]$Message)
    Write-Host ""
    Write-Host "[$ScriptID] $Message" -ForegroundColor Gray
}

function Log-Info {
    param ([string]$Message)
    Write-Host ""
    Write-Host "[$ScriptID] $Message" -ForegroundColor Yellow
}

function Log-Warn {
    param([string]$Message)
    Write-Host ""
    Write-Host "`e[33m[$ScriptID]`e[0m $Message"
}

function Log-Success {
    param ([string]$Message)
    Write-Host ""
    Write-Host "[$ScriptID] $Message" -ForegroundColor Green
}

function Log-Error {
    param ([string]$Message)
    Write-Host ""
    Write-Host "[$ScriptID] $Message" -ForegroundColor Red
}
