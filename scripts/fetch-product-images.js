/**
 * Extrae las URLs de imagen real de cada página de producto de Sanborns.
 * Lee products-data.js, visita cada URL /producto/XXX y obtiene og:image.
 * Genera product-images.js para el frontend.
 *
 * Uso: node scripts/fetch-product-images.js
 * Requiere: Node 18+ (fetch nativo)
 */
const fs = require('fs');
const path = require('path');

const PRODUCTS_PATH = path.join(__dirname, '..', 'products-data.js');
const OUTPUT_PATH = path.join(__dirname, '..', 'product-images.js');

// Extraer todas las URLs de producto del source
function extractProductUrls(content) {
  const urls = new Set();
  const re = /url:\s*["'](https?:\/\/[^"']*\/producto\/\d+[^"']*)["']/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    urls.add(m[1].trim());
  }
  return [...urls];
}

function extractProductId(url) {
  const m = url.match(/\/producto\/(\d+)/);
  return m ? m[1] : null;
}

async function fetchImageUrl(productUrl) {
  try {
    const res = await fetch(productUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
      redirect: 'follow'
    });
    const html = await res.text();
    // og:image
    const ogMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i);
    if (ogMatch && ogMatch[1]) {
      return ogMatch[1].trim();
    }
    // Alternativa: primera imagen grande de producto (común en ecommerce)
    const imgMatch = html.match(/<img[^>]+src=["'](https?:\/\/[^"']+\.(?:jpg|jpeg|png|webp)[^"']*)["']/i);
    if (imgMatch && imgMatch[1]) {
      return imgMatch[1].trim();
    }
  } catch (e) {
    console.warn('  Error:', e.message);
  }
  return null;
}

async function main() {
  console.log('Leyendo products-data.js...');
  const content = fs.readFileSync(PRODUCTS_PATH, 'utf8');
  const urls = extractProductUrls(content);
  const uniqueById = new Map();
  urls.forEach(u => {
    const id = extractProductId(u);
    if (id && !uniqueById.has(id)) uniqueById.set(id, u);
  });

  console.log('Encontradas', uniqueById.size, 'URLs de producto. Obteniendo imágenes...\n');
  const images = {};
  let i = 0;
  for (const [id, url] of uniqueById) {
    i++;
    process.stdout.write(`[${i}/${uniqueById.size}] ${id} ... `);
    const imgUrl = await fetchImageUrl(url);
    if (imgUrl) {
      images[id] = imgUrl;
      console.log('OK');
    } else {
      console.log('(sin imagen)');
    }
    await new Promise(r => setTimeout(r, 400)); // respetar el sitio
  }

  const out = `/**
 * Imágenes reales de productos Sanborns (generado por scripts/fetch-product-images.js)
 * Mapeo: ID producto Sanborns -> URL de imagen
 */
window.PRODUCT_IMAGES = ${JSON.stringify(images, null, 2)};
`;
  fs.writeFileSync(OUTPUT_PATH, out, 'utf8');
  console.log('\nEscrito', OUTPUT_PATH);
  console.log('Total imágenes:', Object.keys(images).length);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
