# Create Sanborns_SanValentin_FIXED_EMOJIS.zip
# Structure: index.html, js/main.js, js/manifest.json, css/styles.css, assets/*
$root = "c:\Users\maryp\San-Valentin-Sanborns"
$zipPath = Join-Path $root "Sanborns_SanValentin_FIXED_EMOJIS.zip"

Add-Type -AssemblyName System.IO.Compression.FileSystem
if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
$zip = [System.IO.Compression.ZipFile]::Open($zipPath, 'Create')

[System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, (Join-Path $root "index.html"), "index.html", 'Optimal') | Out-Null
[System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, (Join-Path $root "js\main.js"), "js\main.js", 'Optimal') | Out-Null
[System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, (Join-Path $root "js\manifest.json"), "js\manifest.json", 'Optimal') | Out-Null
[System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, (Join-Path $root "css\styles.css"), "css\styles.css", 'Optimal') | Out-Null
Get-ChildItem (Join-Path $root "assets") -File | ForEach-Object {
    [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $_.FullName, "assets\$($_.Name)", 'Optimal') | Out-Null
}

$zip.Dispose()
$sizeKb = [math]::Round((Get-Item $zipPath).Length / 1024, 1)
Write-Host "Created: Sanborns_SanValentin_FIXED_EMOJIS.zip ($sizeKb KB)"
