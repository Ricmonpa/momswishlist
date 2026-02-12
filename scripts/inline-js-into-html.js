/**
 * Inline products-data, product-images, products-catalog, main.js into index.html
 * so the artifact works when the server returns HTML for /js/* (MIME issue).
 * Run from repo root: node scripts/inline-js-into-html.js
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
// Prevent breaking out of script tag if any JS ever contains </script>
combined = combined.replace(/<\/script>/gi, '<\\/script>');

const indexPath = path.join(ROOT, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// Match with or without the production comment line
const oldBlockA = `    <!-- PRODUCCIÓN (wishlist.potenttial.site): ejecutar "npm run build:inline" para incrustar todo el JS y evitar MIME type errors cuando el servidor devuelve HTML para /js/* -->
    <script src="js/products-data.js"></script>
    <script src="js/product-images.js"></script>
    <script src="js/products-catalog.js"></script>
    <script src="js/main.js"></script>`;
const oldBlockB = `    <script src="js/products-data.js"></script>
    <script src="js/product-images.js"></script>
    <script src="js/products-catalog.js"></script>
    <script src="js/main.js"></script>`;
const oldBlock = html.includes(oldBlockA) ? oldBlockA : oldBlockB;

const newBlock = '    <script>\n' + combined + '\n    </script>';

if (!html.includes(oldBlock)) {
  console.error('index.html does not contain the expected script block.');
  process.exit(1);
}

html = html.replace(oldBlock, newBlock);
fs.writeFileSync(indexPath, html, 'utf8');
console.log('OK: Inlined all JS into index.html');
