$CurrentDir = Get-Location

Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process

. "$CurrentDir\scripts\util\log.ps1" -ScriptID "AppTemplate Stop"

$pidsDir = "$CurrentDir\logs\pids"

function Stop-ProcessByPidFile($pidFile) {
    if (Test-Path $pidFile) {
        $procID = Get-Content $pidFile
        if ($procID) {
            # Check if process exists
            $proc = Get-Process -Id $procID -ErrorAction SilentlyContinue
            if ($proc) {
                try {
                    taskkill /PID $procID /T /F | Out-Null
                    Log-Success "Stopped process tree (PID $procID) from file $pidFile"
                } catch {
                    Log-Error "Failed to stop process tree (PID $procID) from file $pidFile"
                }
            } else {
                Log-Info "Process (PID $procID) not found; it may have already been stopped."
            }
        }
        Remove-Item $pidFile -Force
    }
}

Stop-ProcessByPidFile (Join-Path $pidsDir "api.pid")
Stop-ProcessByPidFile (Join-Path $pidsDir "ui.pid")

