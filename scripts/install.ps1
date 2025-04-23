# AppTemplate Repository Installation Script

Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process

$CurrentDir = Get-Location

$logDir = Join-Path $CurrentDir "logs\setup"
if (!(Test-Path $logDir)) {
    New-Item -Path $logDir -ItemType Directory -Force
}

. "$CurrentDir\scripts\util\log.ps1" -ScriptID "AppTemplate Install"

Log-Info "Performing AppTemplate Environment installation, this may take a moment..."

# API setup job with output redirection to api_setup.log
Start-Job -ScriptBlock {
    $CurrentDir = $using:CurrentDir
    $apiLog = Join-Path $CurrentDir "logs\setup\api_setup.log"
    
    Push-Location (Join-Path $CurrentDir "api")
    
    python -m venv .venv >> $apiLog 2>&1
    .venv\Scripts\activate >> $apiLog 2>&1
    pip install -r requirements.txt >> $apiLog 2>&1
    deactivate >> $apiLog 2>&1

    Pop-Location
}

# UI setup job with output redirection to ui_setup.log
Start-Job -ScriptBlock {
    $CurrentDir = $using:CurrentDir
    $uiLog = Join-Path $CurrentDir "logs\setup\ui_setup.log"
    
    Push-Location (Join-Path $CurrentDir "ui")
    
    npm install >> $uiLog 2>&1

    Pop-Location
}

Get-Job | Wait-Job

Get-Job | Receive-Job

Get-Job | Remove-Job

Log-Success "AppTemplate Environment Installation was successful"

