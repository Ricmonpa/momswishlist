# Extrae logo.png y heart.svg de data URIs en index.html
$root = "c:\Users\maryp\San-Valentin-Sanborns"
$html = [System.IO.File]::ReadAllText("$root\index.html", [System.Text.Encoding]::UTF8)

# Logo: data:image/png;base64,... hasta "
if ($html -match 'src="data:image/png;base64,([^"]+)"') {
  $b64 = $matches[1]
  $bytes = [Convert]::FromBase64String($b64)
  [IO.File]::WriteAllBytes("$root\images\logo.png", $bytes)
  Write-Host "Extracted: images/logo.png"
}

# Heart SVG: data:image/svg+xml;base64,... (primer ocurrencia en renderWelcome)
if ($html -match 'src="data:image/svg\+xml;base64,([^"]+)"') {
  $b64 = $matches[1]
  $bytes = [Convert]::FromBase64String($b64)
  $xml = [System.Text.Encoding]::UTF8.GetString($bytes)
  [IO.File]::WriteAllText("$root\images\heart.svg", $xml, [System.Text.Encoding]::UTF8)
  Write-Host "Extracted: images/heart.svg"
}
