$ErrorActionPreference = 'Stop'
$PackRoot = Split-Path -Parent $PSScriptRoot
$Required = @(
  'README.md','master-brief.md','original-plan-audit.md','post-mortem.md',
  'brand/edit-style.md','production/seven-day-sprint.md','production/publishing-and-measurement.md',
  'research/source-ledger.md','next-agent-handoff.md'
)
$Videos = @('01-parking-no-signal','02-jobfilter-honest-empty','03-scrap-finance-workflow','04-trade-quoting-after-hours')
$VideoFiles = @('brief.md','script.md','shot-list.md','edit-map.csv','captions.txt','publish-copy.md','claims.md')
$Missing = [System.Collections.Generic.List[string]]::new()
foreach ($Path in $Required) {
  if (-not (Test-Path -LiteralPath (Join-Path $PackRoot $Path))) { $Missing.Add($Path) }
}
foreach ($Video in $Videos) {
  foreach ($Name in $VideoFiles) {
    $Relative = Join-Path "videos/$Video" $Name
    if (-not (Test-Path -LiteralPath (Join-Path $PackRoot $Relative))) { $Missing.Add($Relative) }
  }
}
if ($Missing.Count -gt 0) {
  $Missing | ForEach-Object { Write-Error "Missing: $_" }
  exit 1
}
Write-Host "Pack complete: $($Videos.Count) video packets and $($Required.Count) core files found."
