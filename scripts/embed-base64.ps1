# Genera index_dcm_base64.html con TODAS las imagenes en base64
# Lee index.html, extrae rutas images/* y embebe cada archivo existente
$root = "c:\Users\maryp\San-Valentin-Sanborns"
$imgDir = "$root\images"
$htmlSrc = "$root\index.html"
$htmlDst = "$root\index_dcm_base64.html"

$html = [System.IO.File]::ReadAllText($htmlSrc, [System.Text.Encoding]::UTF8)

# Extraer todas las rutas images/... referenciadas
$matches = [regex]::Matches($html, 'images/(producto-\d+\.(?:jpg|jpeg)|placeholder\.svg)')
$unique = $matches | ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique

$count = 0
foreach ($relPath in $unique) {
  $file = $relPath -replace '^images/', ''
  $path = Join-Path $imgDir $file
  if (-not (Test-Path $path)) {
    Write-Host "Skip (not found): $file"
    continue
  }
  $ext = [System.IO.Path]::GetExtension($file).ToLower()
  $mime = if ($ext -eq '.svg') { 'image/svg+xml' } else { 'image/jpeg' }
  $bytes = [System.IO.File]::ReadAllBytes($path)
  $b64 = [Convert]::ToBase64String($bytes)
  $dataUri = "data:$mime;base64,$b64"
  $html = $html.Replace("images/$file", $dataUri)
  $kb = [math]::Round($bytes.Length / 1024, 1)
  Write-Host "Embedded: $file ($kb KB)"
  $count++
}

[System.IO.File]::WriteAllText($htmlDst, $html, [System.Text.Encoding]::UTF8)
$sizeKB = [math]::Round((Get-Item $htmlDst).Length / 1024, 1)
Write-Host "---"
Write-Host "Embedded $count images. Written: $htmlDst ($sizeKB KB)"
