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
else {
    # Already inlined: restore 4 script tags so we can re-inline from current products-data.js
    $pin = $html.IndexOf('const productosDatabase')
    if ($pin -lt 0) { $pin = $html.IndexOf('/**' + "`n" + ' * Productos') }
    if ($pin -ge 0) {
        $scriptStart = $html.LastIndexOf('    <script>', $pin)
        $scriptEndTag = "`n    </script>"
        $scriptEnd = $html.IndexOf($scriptEndTag, $pin)
        if ($scriptStart -ge 0 -and $scriptEnd -ge 0) {
            $scriptEnd = $scriptEnd + $scriptEndTag.Length
            $commentStart = $html.LastIndexOf('    <!-- PRODUCCI', $scriptStart)
            if ($commentStart -lt 0) { $commentStart = $scriptStart }
            $toRemove = $html.Substring($commentStart, $scriptEnd - $commentStart)
            $html = $html.Replace($toRemove, $oldBlockWithComment.TrimStart("`r`n"))
            [System.IO.File]::WriteAllText($indexPath, $html, [System.Text.Encoding]::UTF8)
            $html = [System.IO.File]::ReadAllText($indexPath, [System.Text.Encoding]::UTF8)
            $html = $html -replace "`r`n", "`n"
            $oldBlock = $oldBlockWithComment
        }
    }
}
if (-not $oldBlock) { Write-Error "Script block not found in index.html"; exit 1 }

$newBlock = '    <script>' + "`n" + $combined + "`n" + '    </script>'
$html = $html.Replace($oldBlock, $newBlock)
[System.IO.File]::WriteAllText($indexPath, $html, [System.Text.Encoding]::UTF8)
Write-Host "OK: Inlined all JS into index.html"

# Create ZIP V7: index.html, styles.css, manifest.json, logos/SVGs, images/ (no js/)
$zipPath = Join-Path $root 'sanborns-gift-finder-dsp-v7-CORREGIDO.zip'
$tempDir = Join-Path $env:TEMP "sanborns-inlined-$(Get-Random)"
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
Write-Host "OK: Created $zipPath"
