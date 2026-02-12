# Run inline JS into index.html and create INLINED zip. No Node required.
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
if (-not $root) { $root = (Get-Location).Path }

$files = @('products-data.js','product-images.js','products-catalog.js','main.js')
$combined = ""
foreach ($f in $files) {
    $combined += [System.IO.File]::ReadAllText((Join-Path $root $f), [System.Text.Encoding]::UTF8) + "`n"
}
$combined = $combined -replace '</script>','<\/script>'

$indexPath = Join-Path $root 'index.html'
$html = [System.IO.File]::ReadAllText($indexPath, [System.Text.Encoding]::UTF8)
$html = $html -replace "`r`n", "`n"

$oldBlockWithComment = (@'
    <!-- PRODUCCIÓN (wishlist.potenttial.site): ejecutar "npm run build:inline" para incrustar todo el JS y evitar MIME type errors cuando el servidor devuelve HTML para /js/* -->
    <script src="js/products-data.js"></script>
    <script src="js/product-images.js"></script>
    <script src="js/products-catalog.js"></script>
    <script src="js/main.js"></script>
'@).TrimStart("`r`n") -replace "`r`n", "`n"
$oldBlockNoComment = (@'
    <script src="js/products-data.js"></script>
    <script src="js/product-images.js"></script>
    <script src="js/products-catalog.js"></script>
    <script src="js/main.js"></script>
'@).TrimStart("`r`n") -replace "`r`n", "`n"

$oldBlock = $null
if ($html.IndexOf($oldBlockWithComment) -ge 0) { $oldBlock = $oldBlockWithComment }
elseif ($html.IndexOf($oldBlockNoComment) -ge 0) { $oldBlock = $oldBlockNoComment }
if (-not $oldBlock) { Write-Error "Script block not found in index.html"; exit 1 }

$newBlock = '    <script>' + "`n" + $combined + "`n" + '    </script>'
$html = $html.Replace($oldBlock, $newBlock)
[System.IO.File]::WriteAllText($indexPath, $html, [System.Text.Encoding]::UTF8)
Write-Host "OK: Inlined all JS into index.html"

# Create ZIP: index.html, styles.css, manifest.json, logos/SVGs from root (no js/)
$zipPath = Join-Path $root 'sanborns-gift-finder-dsp-v6-INLINED.zip'
$tempDir = Join-Path $env:TEMP "sanborns-inlined-$(Get-Random)"
New-Item -ItemType Directory -Path $tempDir -Force | Out-Null
Copy-Item (Join-Path $root 'index.html') $tempDir
Copy-Item (Join-Path $root 'styles.css') $tempDir
Copy-Item (Join-Path $root 'manifest.json') $tempDir
@('Logo_sanborns_bco.png','reyes-magos.svg','san-valentin.svg') | ForEach-Object {
    $p = Join-Path $root $_
    if (Test-Path $p) { Copy-Item $p $tempDir }
}
if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
Compress-Archive -Path "$tempDir\*" -DestinationPath $zipPath
Remove-Item $tempDir -Recurse -Force
Write-Host "OK: Created $zipPath"
