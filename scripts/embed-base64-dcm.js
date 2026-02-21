/**
 * Genera index_dcm_base64.html con TODAS las imágenes referenciadas en base64.
 * Lee index.html, extrae rutas images/* y embebe cada archivo existente.
 * Uso: node scripts/embed-base64-dcm.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const IMAGES_DIR = path.join(ROOT, 'images');
const INDEX_SRC = path.join(ROOT, 'index.html');
const INDEX_DST = path.join(ROOT, 'index_dcm_base64.html');

const html = fs.readFileSync(INDEX_SRC, 'utf8');

// Extraer todas las rutas images/... referenciadas en el HTML
const imgRegex = /images\/(producto-\d+\.(?:jpg|jpeg)|placeholder\.svg)/g;
const uniquePaths = [...new Set(html.match(imgRegex) || [])];

const mimeMap = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

const replacements = {};
for (const relPath of uniquePaths) {
  const file = relPath.replace('images/', '');
  const ext = path.extname(file).toLowerCase();
  const mime = mimeMap[ext] || 'image/jpeg';
  const filePath = path.join(IMAGES_DIR, file);

  if (!fs.existsSync(filePath)) {
    console.warn('Skip (not found):', file);
    continue;
  }

  const buf = fs.readFileSync(filePath);
  const b64 = buf.toString('base64');
  const dataUri = `data:${mime};base64,${b64}`;
  replacements[relPath] = dataUri;
  console.log(file, (buf.length / 1024).toFixed(1) + ' KB');
}

let outHtml = html;
for (const [pathStr, dataUri] of Object.entries(replacements)) {
  outHtml = outHtml.split(pathStr).join(dataUri);
}

fs.writeFileSync(INDEX_DST, outHtml, 'utf8');
const size = fs.statSync(INDEX_DST).size;
console.log('---');
console.log('Embedded', Object.keys(replacements).length, 'images');
console.log('Written:', INDEX_DST, 'Size:', (size / 1024).toFixed(1), 'KB');
