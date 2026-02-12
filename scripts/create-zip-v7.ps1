$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$zipPath = Join-Path $root 'sanborns-gift-finder-dsp-v7-CORREGIDO.zip'
$tempDir = Join-Path $env:TEMP "sanborns-v7-$(Get-Random)"
New-Item -ItemType Directory -Path $tempDir -Force | Out-Null
Copy-Item (Join-Path $root 'index.html') $tempDir
Copy-Item (Join-Path $root 'styles.css') $tempDir
Copy-Item (Join-Path $root 'manifest.json') $tempDir
@('Logo_sanborns_bco.png','reyes-magos.svg','san-valentin.svg') | ForEach-Object {
    $p = Join-Path $root $_
    if (Test-Path $p) { Copy-Item $p $tempDir }
}
$imagesSrc = Join-Path $root 'images'
$imagesDest = Join-Path $tempDir 'images'
if (Test-Path $imagesSrc) {
    New-Item -ItemType Directory -Path $imagesDest -Force | Out-Null
    Copy-Item (Join-Path $imagesSrc '*') $imagesDest -Force
}
if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
Compress-Archive -Path "$tempDir\*" -DestinationPath $zipPath
Remove-Item $tempDir -Recurse -Force
Write-Host "OK: $zipPath"
