# v2: Compresion mas agresiva para objetivo ZIP < 250 KB (v1 era 323 KB)
# JPG calidad 50%, max 360px. Uso: powershell -ExecutionPolicy Bypass -File scripts/compress-images-v2.ps1
$root = "c:\Users\maryp\San-Valentin-Sanborns"
$srcDir = "$root\images"
$outDir = "$root\images_compressed"
$maxSize = 320
$quality = 45

Add-Type -AssemblyName System.Drawing
$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, $quality)

if (Test-Path $outDir) { Remove-Item $outDir -Recurse -Force }
New-Item -ItemType Directory -Path $outDir -Force | Out-Null

$totalBytes = 0
Get-ChildItem $srcDir -File | Where-Object { $_.Extension -match '\.(jpg|jpeg|png|svg)$' -and $_.Name -ne "README.md" } | ForEach-Object {
  $f = $_
  $outPath = Join-Path $outDir $f.Name
  $ext = $_.Extension.ToLower()
  if ($ext -eq '.svg') {
    Copy-Item $f.FullName $outPath -Force
    $totalBytes += (Get-Item $outPath).Length
    Write-Host "Copied: $($f.Name)"
    return
  }
  try {
    $img = [System.Drawing.Image]::FromFile($f.FullName)
    $w = $img.Width
    $h = $img.Height
    if ($w -gt $maxSize -or $h -gt $maxSize) {
      $r = [Math]::Min($maxSize / $w, $maxSize / $h)
      $nw = [int]($w * $r)
      $nh = [int]($h * $r)
      $thumb = New-Object System.Drawing.Bitmap($nw, $nh)
      $g = [System.Drawing.Graphics]::FromImage($thumb)
      $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $g.DrawImage($img, 0, 0, $nw, $nh)
      $g.Dispose()
      $img.Dispose()
      $img = $thumb
    }
    $base = [System.IO.Path]::GetFileNameWithoutExtension($f.Name)
    $outName = $base + ".jpg"
    if ($f.Extension -eq '.jpeg') { $outName = $base + ".jpeg" }
    if ($f.Name -eq "logo.png") { $outName = "logo.png" }
    $outPath = Join-Path $outDir $outName
    if ($outName -eq "logo.png") {
      $img.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    } else {
      $img.Save($outPath, $jpegCodec, $encoderParams)
    }
    $img.Dispose()
    $totalBytes += (Get-Item $outPath).Length
    Write-Host "Compressed: $($f.Name) -> $outName"
  } catch {
    Write-Host "Skip: $($f.Name) - $_"
  }
}

$kb = [math]::Round($totalBytes / 1024, 1)
Write-Host "--- Total imagenes: $kb KB (objetivo ZIP < 250 KB)"
