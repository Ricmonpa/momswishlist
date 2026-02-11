/**
 * parseProducts.js – Utilidad AdTech para banner DV360
 * Lee CSVs Big ticket y Moda, construye catálogo unificado con imagePath para polite load.
 *
 * Uso: node scripts/parseProducts.js
 * Salida: products-catalog.js en la RAÍZ del repo (path absoluto desde __dirname para CI/CD Cloudflare).
 */

const fs = require('fs');
const path = require('path');

/** Raíz del proyecto = carpeta de despliegue (mismo nivel que index.html). */
const ROOT = path.resolve(path.join(__dirname, '..'));
const IMAGES_DIR = path.join(ROOT, 'images');
const BIG_TICKET_CSV = path.join(ROOT, 'excel', 'Productos a impulsar Sanborns - Big ticket.csv');
const MODA_CSV = path.join(ROOT, 'excel', 'Productos a impulsar Sanborns - Moda.csv');
/** Salida en raíz para que el build de Cloudflare sobrescriba el archivo sin rutas relativas. */
const OUTPUT_JS = path.join(ROOT, 'products-catalog.js');

/** Ruta relativa a imágenes (evita CSP; mismo origen = 'self'). */
const IMAGE_BASE_URL = './images';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DCO-lite: normalización de category + gender para UI
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** Big ticket: categoría cruda del CSV → category normalizada. Todos gender: "ambos". */
const BIG_TICKET_CATEGORY_MAP = {
  'Telefonía': 'Celulares',
  'Tablets': 'Tablets',
  'Gadgets': 'Gadgets',
  'Audio portátil': 'Audio',
  'Fotografía': 'Fotografía',
  'Juguetería': 'Regalos'
};

/** Moda: categoría cruda → { category, gender }. */
const MODA_CATEGORY_GENDER_MAP = {
  'cosmeticos': { category: 'Maquillaje', gender: 'mujer' },
  'derma': { category: 'Skincare', gender: 'mujer' },
  'estilismo': { category: 'Estilismo', gender: 'mujer' },
  'perfumeria': { category: 'Perfumería', gender: 'ambos' },
  'relojes': { category: 'Relojes', gender: 'ambos' }
};

/** Nombres reales Sanborns para Moda (Maquillaje, Skincare, Perfumería). No afecta Big Ticket. */
const MODA_NAMES = {
  // MAQUILLAJE (Cosméticos)
  '614484': 'Set Yuya Gel de ceja + polvo + tinta',
  '614483': 'Set Yuya Gel + polvo traslúcido + tinta',
  '574428': 'Cosmético Sanborns (ID 574428)',
  '553342': 'Labial Líquido Mate Yuya Bruma',
  '615405': 'Esmalte Chico Matizador Bissú',
  // SKINCARE (Derma)
  '515019': 'Eucerin Epigenetic Serum 30ml',
  '59701': 'Anti-Pigment Dual Serum Eucerin',
  '437851': 'Avene Agua Termal Piel Sensible 300ml',
  '274804': 'Cetaphil Crema Hidratante 453g',
  '11370': 'Ducray Squanorm Shampoo Anticaspa',
  // PERFUMERÍA
  '608266': 'Rabanne Fame Couture Edition EDP 80ml',
  '813851': 'Versace Dylan Blush Pink EDP 100ml',
  '303224': 'Moschino Toy 2 Bubblegum EDT 100ml',
  '813852': 'Montblanc Signature Elixir EDP 90ml',
  '310467': 'Carolina Herrera Good Girl Blush EDP 80ml'
};

function normalizeBigTicketCategory(raw) {
  const key = (raw || '').trim();
  return BIG_TICKET_CATEGORY_MAP[key] || raw || 'Big ticket';
}

function normalizeModaCategoryAndGender(raw) {
  const key = (raw || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  const mapped = MODA_CATEGORY_GENDER_MAP[key];
  if (mapped) return mapped;
  return { category: raw || 'Moda', gender: 'ambos' };
}

/**
 * Detecta la extensión real del archivo de imagen en ./images/ (producto-{id}.jpg o .jpeg).
 * Usa fs.existsSync para comprobar en disco antes de generar el catálogo.
 * @param {string} id - ID del producto
 * @returns {string} - Extensión con punto: '.jpeg', '.jpg' o '.webp' como fallback
 */
function getValidImageExtension(id) {
  const base = `producto-${id}`;
  const jpegPath = path.join(IMAGES_DIR, base + '.jpeg');
  const jpgPath = path.join(IMAGES_DIR, base + '.jpg');
  if (fs.existsSync(jpegPath)) return '.jpeg';
  if (fs.existsSync(jpgPath)) return '.jpg';
  return '.webp';
}

/**
 * Construye el imagePath como ruta relativa (evita bloqueo CSP).
 * @param {string} id - ID del producto
 * @returns {string} - Ej: "./images/producto-613747.jpeg"
 */
function buildImagePath(id) {
  const ext = getValidImageExtension(id);
  return `${IMAGE_BASE_URL}/producto-${id}${ext}`;
}

// Extrae ID numérico de URL Sanborns: .../producto/613747/... o .../producto/613747
const PRODUCTO_ID_REGEX = /(?:^|\s)(?:https?:)?\/\/[^/]*sanborns\.com\.mx\/producto\/(\d+)(?:\/|$|\s)/gi;

/**
 * Extrae todos los IDs de producto de una línea (puede haber varias URLs).
 * @param {string} line
 * @returns {string[]} IDs únicos
 */
function extractProductIdsFromLine(line) {
  const ids = [];
  let m;
  PRODUCTO_ID_REGEX.lastIndex = 0;
  while ((m = PRODUCTO_ID_REGEX.exec(line)) !== null) {
    ids.push(m[1]);
  }
  return [...new Set(ids)];
}

// Regex para encontrar cada URL de producto y su ID en una línea
const URL_AND_ID_REGEX = /(https?:\/\/[^\s,]*sanborns\.com\.mx\/producto\/(\d+)[^\s,]*)/gi;

/**
 * Extrae nombre legible desde la URL de producto (slug después del ID).
 * Ej: .../producto/714971/tablet-samsung-galaxy-s10-lite-128gb-coral-red → "Tablet Samsung Galaxy S10 Lite 128gb Coral Red"
 */
function extractNameFromUrl(url) {
  if (!url || typeof url !== 'string') return '';
  const match = url.match(/\/producto\/\d+\/([^/?&#]+)/i);
  const slug = match ? match[1] : '';
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim() || '';
}

/**
 * Parsea el CSV Big ticket (formato: líneas con categoría o URLs).
 * @returns {{ id: string, url: string, category: string, source: string, imagePath: string }[]}
 */
function parseBigTicketCSV(content) {
  const lines = content.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const products = [];
  let currentCategory = '';

  for (const line of lines) {
    const pairs = [];
    let m;
    URL_AND_ID_REGEX.lastIndex = 0;
    while ((m = URL_AND_ID_REGEX.exec(line)) !== null) {
      pairs.push({ url: m[1].trim(), id: m[2] });
    }
    if (pairs.length > 0) {
      const categoryNormalized = normalizeBigTicketCategory(currentCategory);
      for (const { id, url } of pairs) {
        const fullUrl = url.startsWith('http') ? url : `https://${url}`;
        products.push({
          id,
          url: fullUrl,
          name: extractNameFromUrl(fullUrl) || `Producto ${id}`,
          category: categoryNormalized,
          gender: 'ambos',
          source: 'big_ticket',
          imagePath: buildImagePath(id),
        });
      }
    } else {
      const cell = line.replace(/^,+,?/, '').trim();
      if (cell && !/^https?:\/\//i.test(cell) && !/^\d+$/.test(cell)) {
        currentCategory = cell;
      }
    }
  }

  return products;
}

/**
 * Parsea CSV Moda con columna ID (y opcional URL).
 * Formato esperado: header con "ID" y opcional "URL" o "Url".
 * @returns {{ id: string, url?: string, category?: string, source: string, imagePath: string }[]}
 */
function parseModaCSV(content) {
  const lines = content.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (lines.length < 2) return [];

  const header = lines[0].split(',').map((c) => c.trim().toLowerCase());
  const idIdx = header.findIndex((c) => c === 'id');
  if (idIdx === -1) return [];

  const urlIdx = header.findIndex((c) => c === 'url' || c === 'link');
  const nameIdx = header.findIndex((c) => c === 'name' || c === 'nombre' || c === 'producto');
  const categoryIdx = header.findIndex((c) => c === 'category' || c === 'categoria' || c === 'categoría');

  const products = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',').map((c) => c.trim());
    const id = String(cols[idIdx] || '').trim();
    if (!id) continue;

    const url = urlIdx >= 0 && cols[urlIdx] ? cols[urlIdx] : `https://www.sanborns.com.mx/producto/${id}`;
    const rawCategory = categoryIdx >= 0 ? cols[categoryIdx] : 'Moda';
    const { category, gender } = normalizeModaCategoryAndGender(rawCategory);
    const nameFromCsv = nameIdx >= 0 ? cols[nameIdx] : '';

    products.push({
      id,
      url,
      name: MODA_NAMES[id] || nameFromCsv || `Producto ${id}`,
      category,
      gender,
      source: 'moda',
      imagePath: buildImagePath(id),
    });
  }

  return products;
}

/**
 * Lee un CSV desde ruta. Devuelve contenido o '' si no existe.
 */
function readCSV(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    if (e.code === 'ENOENT') return '';
    throw e;
  }
}

/**
 * Construye el array unificado a partir de ambos CSVs.
 * @returns {Array<{ id: string, url: string, category?: string, source: string, imagePath: string, name?: string }>}
 */
function parseProducts() {
  const bigTicketContent = readCSV(BIG_TICKET_CSV);
  const modaContent = readCSV(MODA_CSV);

  const fromBigTicket = parseBigTicketCSV(bigTicketContent);
  const fromModa = parseModaCSV(modaContent);

  const catalog = [...fromBigTicket, ...fromModa];

  return catalog;
}

/**
 * Escribe products-catalog.js para uso en el banner (variable global).
 */
function writeCatalogJS(catalog) {
  const payload = `/**
 * Catálogo de productos generado por scripts/parseProducts.js
 * Fuente: Big ticket + Moda CSVs. imagePath: URL absoluta Cloudflare (polite load DV360)
 * Regenerar con: node scripts/parseProducts.js
 */
window.PRODUCTS_CATALOG = ${JSON.stringify(catalog, null, 2)};
`;

  fs.writeFileSync(OUTPUT_JS, payload, 'utf8');
  console.log('✅ Escrito:', OUTPUT_JS);
  console.log('   Productos totales:', catalog.length);
  console.log('   Big ticket:', catalog.filter((p) => p.source === 'big_ticket').length);
  console.log('   Moda:', catalog.filter((p) => p.source === 'moda').length);
}

// Ejecución
const catalog = parseProducts();
writeCatalogJS(catalog);

module.exports = { parseProducts, parseBigTicketCSV, parseModaCSV, extractProductIdsFromLine, getValidImageExtension, buildImagePath };
