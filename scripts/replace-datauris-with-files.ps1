# Reemplaza data URIs por rutas images/ en index.html
$root = "c:\Users\maryp\San-Valentin-Sanborns"
$htmlPath = "$root\index.html"
$html = [System.IO.File]::ReadAllText($htmlPath, [System.Text.Encoding]::UTF8)

# Logo: reemplazar data:image/png;base64,... por images/logo.png
$html = $html -replace 'src="data:image/png;base64,[^"]+"', 'src="images/logo.png"'

# Heart: reemplazar data:image/svg+xml;base64,... por images/heart.svg (double quotes)
$html = $html -replace 'src="data:image/svg\+xml;base64,[^"]+"', 'src="images/heart.svg"'

# Heart onerror fallback: src='data:image/svg+xml;base64,...'
$html = $html -replace "src='data:image/svg\+xml;base64,[^']+'", "src='images/heart.svg'"

[System.IO.File]::WriteAllText($htmlPath, $html, [System.Text.Encoding]::UTF8)
Write-Host "Replaced data URIs with images/logo.png and images/heart.svg"
