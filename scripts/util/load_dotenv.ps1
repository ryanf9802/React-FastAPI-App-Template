# Load .env file into environment variables
$envFilePath = ".\.env"

if (Test-Path $envFilePath) {
    Get-Content "$envFilePath" | ForEach-Object {
      $_ = $_.Trim()
      if (-not $_ -or $_.StartsWith("#")) {
          return
      }
      if ($_ -match "^\s*([^#=]+?)\s*=\s*(.*)$") {
          $key = $matches[1].Trim(" `"`t")
          $value = $matches[2].Trim(" `"`t")
          Set-Item -Path "Env:$key" -Value $value
      }
  }

} else {
    Write-Warning ".env file not found at $envFilePath"
}

