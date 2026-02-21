# Crea los dos ZIPs: COMPRESSED (Mediasmart) y FULL (DCM)
$root = "c:\Users\maryp\San-Valentin-Sanborns"
$zipA = "$root\Sanborns_SanValentin_IMAGES_COMPRESSED.zip"
$zipB = "$root\Sanborns_SanValentin_IMAGES_FULL.zip"

# A) COMPRESSED: index.html + images_compressed como images/
if (Test-Path $zipA) { Remove-Item $zipA -Force }
Add-Type -AssemblyName System.IO.Compression.FileSystem
$za = [System.IO.Compression.ZipFile]::Open($zipA, 'Create')
[System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($za, "$root\index.html", "index.html", 'Optimal') | Out-Null
if (Test-Path "$root\manifest.json") { [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($za, "$root\manifest.json", "manifest.json", 'Optimal') | Out-Null }
Get-ChildItem "$root\images_compressed" -File | ForEach-Object {
  [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($za, $_.FullName, "images/$($_.Name)", 'Optimal') | Out-Null
}
$za.Dispose()
$sizeA = [math]::Round((Get-Item $zipA).Length / 1024, 1)
Write-Host "A) Sanborns_SanValentin_IMAGES_COMPRESSED.zip: $sizeA KB"

# B) FULL: index.html + images (original) - crear en temp para evitar bloqueo
$zipBTemp = "$root\_temp_full.zip"
if (Test-Path $zipBTemp) { Remove-Item $zipBTemp -Force }
$zb = [System.IO.Compression.ZipFile]::Open($zipBTemp, 'Create')
[System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zb, "$root\index.html", "index.html", 'Optimal') | Out-Null
if (Test-Path "$root\manifest.json") { [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zb, "$root\manifest.json", "manifest.json", 'Optimal') | Out-Null }
Get-ChildItem "$root\images" -File | Where-Object { $_.Name -ne "README.md" } | ForEach-Object {
  [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zb, $_.FullName, "images/$($_.Name)", 'Optimal') | Out-Null
}
$zb.Dispose()
if (Test-Path $zipB) { Remove-Item $zipB -Force -ErrorAction SilentlyContinue }
Move-Item $zipBTemp $zipB -Force
$sizeB = [math]::Round((Get-Item $zipB).Length / 1024, 1)
Write-Host "B) Sanborns_SanValentin_IMAGES_FULL.zip: $sizeB KB"
Write-Host "Done."
