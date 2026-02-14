Add-Type -AssemblyName System.IO.Compression.FileSystem
$zipPath = "c:\Users\maryp\San-Valentin-Sanborns\Sanborns_SanValentin_IMAGES_FIXED.zip"
$z = [System.IO.Compression.ZipFile]::OpenRead($zipPath)
$z.Entries | ForEach-Object { $_.FullName }
$z.Dispose()
