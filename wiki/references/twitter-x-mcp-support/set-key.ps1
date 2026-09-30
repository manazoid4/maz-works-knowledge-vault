$ErrorActionPreference = 'Stop'
$secret = Read-Host 'Paste the Twitter154 RapidAPI key (hidden)' -AsSecureString
$ptr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secret)
try {
  $value = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr)
  if ([string]::IsNullOrWhiteSpace($value) -or $value -match '[\r\n]') { throw 'A non-empty, single-line key is required.' }
  $value = $value.Replace('\', '\\').Replace('"', '\"')
  [IO.File]::WriteAllText((Join-Path $PSScriptRoot '.env'), ('RAPIDAPI_KEY="' + $value + '"' + [Environment]::NewLine))
  Write-Host 'Key saved locally. Restart the agent session, then test searchTwitter.'
} finally {
  [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr)
  $value = $null
}
