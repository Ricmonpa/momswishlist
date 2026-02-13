# Genera Sanborns_SanValentin_v2.zip: compresion v2 + index.html (GA4 + Meta Pixel) + manifest
# Uso: powershell -ExecutionPolicy Bypass -File scripts/create-zip-v2.ps1
$root = "c:\Users\maryp\San-Valentin-Sanborns"
$zipV2 = "$root\Sanborns_SanValentin_v2_FIXED.zip"

# 1) Comprimir imagenes con perfil v2 (calidad 50, max 360px)
Write-Host "Paso 1: Compresion v2 de imagenes..."
& "$root\scripts\compress-images-v2.ps1"

# 2) Crear ZIP v2
Write-Host "Paso 2: Creando ZIP v2..."
Add-Type -AssemblyName System.IO.Compression.FileSystem
if (Test-Path $zipV2) { Remove-Item $zipV2 -Force }
$z = [System.IO.Compression.ZipFile]::Open($zipV2, 'Create')
[System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($z, "$root\index.html", "index.html", 'Optimal') | Out-Null
if (Test-Path "$root\manifest.json") {
  [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($z, "$root\manifest.json", "manifest.json", 'Optimal') | Out-Null
}
if (Test-Path "$root\images_compressed") {
  Get-ChildItem "$root\images_compressed" -File | ForEach-Object {
    [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($z, $_.FullName, "images/$($_.Name)", 'Optimal') | Out-Null
  }
}
$z.Dispose()
$sizeKb = [math]::Round((Get-Item $zipV2).Length / 1024, 1)
Write-Host "--- Sanborns_SanValentin_v2_FIXED.zip: $sizeKb KB (objetivo < 250 KB)"
Write-Host "Done. Reemplazar en index.html: G-XXXXXXXXXX (GA4) y REPLACE_WITH_META_PIXEL_ID (Meta Pixel)."
