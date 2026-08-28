$ErrorActionPreference = 'Stop'
$PackRoot = Split-Path -Parent $PSScriptRoot
$Forbidden = @('built this in four hours','let that sink in','guaranteed leads','official partner','officially endorsed')
$Files = Get-ChildItem -LiteralPath (Join-Path $PackRoot 'videos') -Recurse -File | Where-Object { $_.Extension -in '.md','.txt','.csv' }
$Hits = @()
foreach ($File in $Files) {
  $Text = Get-Content -LiteralPath $File.FullName -Raw
  foreach ($Phrase in $Forbidden) {
    if ($Text.IndexOf($Phrase,[System.StringComparison]::OrdinalIgnoreCase) -ge 0) {
      $Hits += "$($File.FullName): $Phrase"
    }
  }
}
if ($Hits.Count -gt 0) { $Hits | ForEach-Object { Write-Error $_ }; exit 1 }
Write-Host 'No forbidden campaign claims found.'
