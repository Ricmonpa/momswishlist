/**
 * Re-inline JS into index.html when the file already has inlined content (no script src tags).
 * Run: node scripts/reinline-into-html.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const files = [
  path.join(ROOT, 'products-data.js'),
  path.join(ROOT, 'product-images.js'),
  path.join(ROOT, 'products-catalog.js'),
  path.join(ROOT, 'main.js')
];

let combined = '';
for (const f of files) {
  combined += fs.readFileSync(f, 'utf8') + '\n';
}
combined = combined.replace(/<\/script>/gi, '<\\/script>');

const indexPath = path.join(ROOT, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

const pin = html.indexOf('const productosDatabase');
if (pin < 0) {
  console.error('productosDatabase not found in index.html');
  process.exit(1);
}

const scriptStart = html.lastIndexOf('    <script>', pin);
const scriptEndTag = '\n    </script>';
const scriptEnd = html.indexOf(scriptEndTag, pin);
if (scriptStart < 0 || scriptEnd < 0) {
  console.error('Script block boundaries not found');
  process.exit(1);
}

const endIndex = scriptEnd + scriptEndTag.length;
const before = html.slice(0, scriptStart);
const after = html.slice(endIndex);
const newBlock = '    <script>\n' + combined + '\n    </script>';
html = before + newBlock + after;

fs.writeFileSync(indexPath, html, 'utf8');
console.log('OK: Re-inlined all JS into index.html');
