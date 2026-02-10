/**
 * Productos Gift Finder San Valentín - Sanborns
 * IDs oficiales del cliente (Google Sheet):
 * https://docs.google.com/spreadsheets/d/1HiW5YDiqZnQRqR5Jm_En46Eiuzhe5pTA4k4_1HkAhdU/edit
 * Estructura URL producto: https://www.sanborns.com.mx/producto/[ID]
 * v20250129-1730
 */
const productosDatabase = {
  mujer: {
    maquillaje: [
      { id: 1, nombre: "Set Maquillaje Premium", precio: "$899", precioOriginal: "$1,299", img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop&q=80", descuento: "30% OFF", url: "https://www.sanborns.com.mx/producto/614484" },
      { id: 2, nombre: "Paleta de Sombras", precio: "$799", precioOriginal: "$1,199", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop&q=80", descuento: "33% OFF", url: "https://www.sanborns.com.mx/producto/614483" },
      { id: 3, nombre: "Kit de Maquillaje", precio: "$1,199", precioOriginal: "$1,699", img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop&q=80", descuento: "29% OFF", url: "https://www.sanborns.com.mx/producto/574428" },
      { id: 4, nombre: "Set Brochas Profesionales", precio: "$699", precioOriginal: "$999", img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop&q=80", descuento: "30% OFF", url: "https://www.sanborns.com.mx/producto/553342" },
      { id: 5, nombre: "Paleta Nude Premium", precio: "$999", precioOriginal: "$1,499", img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop&q=80", descuento: "33% OFF", url: "https://www.sanborns.com.mx/producto/615405" }
    ],
    cuidado: [
      { id: 6, nombre: "Kit Cuidado Facial Premium", precio: "$1,299", precioOriginal: "$1,799", img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop&q=80", descuento: "28% OFF", url: "https://www.sanborns.com.mx/producto/515019" },
      { id: 7, nombre: "Crema Anti-Edad", precio: "$999", precioOriginal: "$1,499", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop&q=80", descuento: "33% OFF", url: "https://www.sanborns.com.mx/producto/59701" },
      { id: 8, nombre: "Sérum Facial", precio: "$799", precioOriginal: "$1,199", img: "https://images.unsplash.com/photo-1556229010-aa92083e2a83?w=400&h=400&fit=crop&q=80", descuento: "33% OFF", url: "https://www.sanborns.com.mx/producto/437851" },
      { id: 9, nombre: "Set Dermatológico", precio: "$1,499", precioOriginal: "$1,999", img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop&q=80", descuento: "25% OFF", url: "https://www.sanborns.com.mx/producto/274804" },
      { id: 10, nombre: "Kit Limpieza Facial", precio: "$699", precioOriginal: "$999", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop&q=80", descuento: "30% OFF", url: "https://www.sanborns.com.mx/producto/11370" }
    ],
    perfumeria: [
      { id: 11, nombre: "Fragancia Premium Mujer", precio: "$2,499", precioOriginal: "$3,299", img: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop&q=80", descuento: "25% OFF", url: "https://www.sanborns.com.mx/producto/608266" },
      { id: 12, nombre: "Perfume Floral", precio: "$2,199", precioOriginal: "$2,999", img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop&q=80", descuento: "27% OFF", url: "https://www.sanborns.com.mx/producto/813851" },
      { id: 13, nombre: "Eau de Parfum", precio: "$1,999", precioOriginal: "$2,699", img: "https://images.unsplash.com/photo-1588405748880-12d1d2a59cfc?w=400&h=400&fit=crop&q=80", descuento: "26% OFF", url: "https://www.sanborns.com.mx/producto/303224" },
      { id: 14, nombre: "Set Perfume + Loción", precio: "$2,799", precioOriginal: "$3,499", img: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400&h=400&fit=crop&q=80", descuento: "20% OFF", url: "https://www.sanborns.com.mx/producto/813852" },
      { id: 15, nombre: "Fragancia Romántica", precio: "$2,299", precioOriginal: "$2,999", img: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop&q=80", descuento: "23% OFF", url: "https://www.sanborns.com.mx/producto/310467" }
    ],
    bolsas: [
      { id: 26, nombre: "Bolsas de Mano", precio: "Desde $999", precioOriginal: "", img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop&q=80", descuento: "Ofertas", url: "https://www.sanborns.com.mx/c/bolsas/" },
      { id: 27, nombre: "Bolsas Fashion", precio: "Variedad", precioOriginal: "", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop&q=80", descuento: "San Valentín", url: "https://www.sanborns.com.mx/c/bolsas/" },
      { id: 28, nombre: "Clutch y Carteras", precio: "Ofertas", precioOriginal: "", img: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&h=400&fit=crop&q=80", descuento: "Regalos", url: "https://www.sanborns.com.mx/c/bolsas/" }
    ],
    joyeria: [
      { id: 29, nombre: "Joyería y Aretes", precio: "Desde $599", precioOriginal: "", img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&q=80", descuento: "Ofertas", url: "https://www.sanborns.com.mx/c/joyeria/" },
      { id: 30, nombre: "Collares y Pulseras", precio: "Variedad", precioOriginal: "", img: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=400&h=400&fit=crop&q=80", descuento: "San Valentín", url: "https://www.sanborns.com.mx/c/joyeria/" },
      { id: 31, nombre: "Accesorios Elegantes", precio: "Regalos", precioOriginal: "", img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop&q=80", descuento: "25% OFF", url: "https://www.sanborns.com.mx/c/joyeria/" }
    ],
    libros: [
      { id: 32, nombre: "Best Sellers Románticos", precio: "$399", precioOriginal: "$599", img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop&q=80", descuento: "33% OFF", url: "https://www.sanborns.com.mx/c/libros/" },
      { id: 33, nombre: "Box Set Clásicos", precio: "$599", precioOriginal: "$899", img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop&q=80", descuento: "33% OFF", url: "https://www.sanborns.com.mx/c/libros/" },
      { id: 34, nombre: "Libros y Regalos", precio: "$299", precioOriginal: "$499", img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop&q=80", descuento: "40% OFF", url: "https://www.sanborns.com.mx/c/libros/" }
    ],
    tecnologia: [
      { id: 35, nombre: "Tecnología y Gadgets", precio: "Ofertas", precioOriginal: "", img: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400&h=400&fit=crop&q=80", descuento: "San Valentín", url: "https://www.sanborns.com.mx/c/tecnologia/" },
      { id: 36, nombre: "Audio y Wearables", precio: "Variedad", precioOriginal: "", img: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop&q=80", descuento: "Regalos", url: "https://www.sanborns.com.mx/c/tecnologia/" },
      { id: 37, nombre: "Accesorios Tech", precio: "Desde $499", precioOriginal: "", img: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop&q=80", descuento: "Ofertas", url: "https://www.sanborns.com.mx/c/tecnologia/" }
    ],
    hogar: [
      { id: 38, nombre: "Hogar y Cocina", precio: "Desde $699", precioOriginal: "", img: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop&q=80", descuento: "Ofertas", url: "https://www.sanborns.com.mx/c/hogar/" },
      { id: 39, nombre: "Difusores y Aromas", precio: "Regalos", precioOriginal: "", img: "https://images.unsplash.com/photo-1602874801006-e24a9ea5f45a?w=400&h=400&fit=crop&q=80", descuento: "San Valentín", url: "https://www.sanborns.com.mx/c/hogar/" },
      { id: 40, nombre: "Decoración", precio: "Variedad", precioOriginal: "", img: "https://images.unsplash.com/photo-1502301103665-0b95cc738daf?w=400&h=400&fit=crop&q=80", descuento: "25% OFF", url: "https://www.sanborns.com.mx/c/hogar/" }
    ]
  },
  hombre: {
    relojes: [
      { id: 16, nombre: "Reloj Elegante", precio: "$3,299", precioOriginal: "$4,499", img: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&h=400&fit=crop&q=80", descuento: "27% OFF", url: "https://www.sanborns.com.mx/producto/379802" },
      { id: 17, nombre: "Reloj Deportivo", precio: "$2,499", precioOriginal: "$3,299", img: "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=400&h=400&fit=crop&q=80", descuento: "24% OFF", url: "https://www.sanborns.com.mx/producto/604930" },
      { id: 18, nombre: "Reloj Casual", precio: "$1,999", precioOriginal: "$2,699", img: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=400&h=400&fit=crop&q=80", descuento: "26% OFF", url: "https://www.sanborns.com.mx/producto/540572" },
      { id: 19, nombre: "Smartwatch", precio: "$4,999", precioOriginal: "$6,499", img: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop&q=80", descuento: "23% OFF", url: "https://www.sanborns.com.mx/producto/542018" },
      { id: 20, nombre: "Reloj Cronógrafo", precio: "$3,799", precioOriginal: "$4,999", img: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&h=400&fit=crop&q=80", descuento: "24% OFF", url: "https://www.sanborns.com.mx/producto/557865" }
    ],
    cuidado: [
      { id: 21, nombre: "Kit Afeitado Premium", precio: "$799", precioOriginal: "$1,099", img: "https://images.unsplash.com/photo-1621607512214-68297480165e?w=400&h=400&fit=crop&q=80", descuento: "27% OFF", url: "https://www.sanborns.com.mx/producto/117488" },
      { id: 22, nombre: "Set Grooming", precio: "$1,499", precioOriginal: "$1,999", img: "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?w=400&h=400&fit=crop&q=80", descuento: "25% OFF", url: "https://www.sanborns.com.mx/producto/469399" },
      { id: 23, nombre: "Recortadora Profesional", precio: "$1,299", precioOriginal: "$1,799", img: "https://images.unsplash.com/photo-1621607512214-68297480165e?w=400&h=400&fit=crop&q=80", descuento: "28% OFF", url: "https://www.sanborns.com.mx/producto/492378" },
      { id: 24, nombre: "Kit Barbería", precio: "$999", precioOriginal: "$1,499", img: "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?w=400&h=400&fit=crop&q=80", descuento: "33% OFF", url: "https://www.sanborns.com.mx/producto/617456" },
      { id: 25, nombre: "Set Cuidado Facial Hombre", precio: "$899", precioOriginal: "$1,299", img: "https://images.unsplash.com/photo-1621607512214-68297480165e?w=400&h=400&fit=crop&q=80", descuento: "31% OFF", url: "https://www.sanborns.com.mx/producto/408718" }
    ],
    accesorios: [
      { id: 41, nombre: "Accesorios Hombre", precio: "Desde $699", precioOriginal: "", img: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop&q=80", descuento: "Ofertas", url: "https://www.sanborns.com.mx/c/accesorios-hombre/" },
      { id: 42, nombre: "Carteras y Cinturones", precio: "Variedad", precioOriginal: "", img: "https://images.unsplash.com/photo-1624222247344-550fb60583bb?w=400&h=400&fit=crop&q=80", descuento: "San Valentín", url: "https://www.sanborns.com.mx/c/accesorios-hombre/" },
      { id: 43, nombre: "Mancuernillas y Más", precio: "Regalos", precioOriginal: "", img: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop&q=80", descuento: "25% OFF", url: "https://www.sanborns.com.mx/c/accesorios-hombre/" }
    ],
    moda: [
      { id: 44, nombre: "Ropa Hombre", precio: "Ofertas", precioOriginal: "", img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop&q=80", descuento: "San Valentín", url: "https://www.sanborns.com.mx/c/ropa-hombre/" },
      { id: 45, nombre: "Camisas y Polos", precio: "Variedad", precioOriginal: "", img: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop&q=80", descuento: "Regalos", url: "https://www.sanborns.com.mx/c/ropa-hombre/" },
      { id: 46, nombre: "Moda Casual", precio: "Desde $899", precioOriginal: "", img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=400&fit=crop&q=80", descuento: "30% OFF", url: "https://www.sanborns.com.mx/c/ropa-hombre/" }
    ],
    tecnologia: [
      { id: 47, nombre: "Tecnología Hombre", precio: "Ofertas", precioOriginal: "", img: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop&q=80", descuento: "San Valentín", url: "https://www.sanborns.com.mx/c/tecnologia/" },
      { id: 48, nombre: "Watches y Gadgets", precio: "Variedad", precioOriginal: "", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&q=80", descuento: "Regalos", url: "https://www.sanborns.com.mx/c/tecnologia/" },
      { id: 49, nombre: "Smart Devices", precio: "Desde $1,999", precioOriginal: "", img: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=400&fit=crop&q=80", descuento: "20% OFF", url: "https://www.sanborns.com.mx/c/tecnologia/" }
    ],
    gaming: [
      { id: 50, nombre: "Videojuegos", precio: "Ofertas", precioOriginal: "", img: "https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=400&h=400&fit=crop&q=80", descuento: "San Valentín", url: "https://www.sanborns.com.mx/c/videojuegos/" },
      { id: 51, nombre: "Consolas y Controles", precio: "Variedad", precioOriginal: "", img: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=400&fit=crop&q=80", descuento: "Regalos", url: "https://www.sanborns.com.mx/c/videojuegos/" },
      { id: 52, nombre: "Gaming Gear", precio: "Desde $1,199", precioOriginal: "", img: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop&q=80", descuento: "26% OFF", url: "https://www.sanborns.com.mx/c/videojuegos/" }
    ],
    libros: [
      { id: 53, nombre: "Bestsellers", precio: "$399", precioOriginal: "$599", img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop&q=80", descuento: "33% OFF", url: "https://www.sanborns.com.mx/c/libros/" },
      { id: 54, nombre: "Libros de Negocios", precio: "$499", precioOriginal: "$799", img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop&q=80", descuento: "38% OFF", url: "https://www.sanborns.com.mx/c/libros/" },
      { id: 55, nombre: "Ciencia Ficción y Más", precio: "$699", precioOriginal: "$999", img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop&q=80", descuento: "30% OFF", url: "https://www.sanborns.com.mx/c/libros/" }
    ],
    deportes: [
      { id: 56, nombre: "Deportes", precio: "Desde $1,199", precioOriginal: "", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&q=80", descuento: "Ofertas", url: "https://www.sanborns.com.mx/c/deportes/" },
      { id: 57, nombre: "Fitness y Running", precio: "Variedad", precioOriginal: "", img: "https://images.unsplash.com/photo-1557935728-e6d1eaa296ea?w=400&h=400&fit=crop&q=80", descuento: "San Valentín", url: "https://www.sanborns.com.mx/c/deportes/" },
      { id: 58, nombre: "Accesorios Deportivos", precio: "Regalos", precioOriginal: "", img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=400&fit=crop&q=80", descuento: "25% OFF", url: "https://www.sanborns.com.mx/c/deportes/" }
    ]
  }
};

window.productosDatabase = productosDatabase;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// UTM / DV360-CM360 TRACKING - buildProductUrl
// Usar en main.js para todos los links de productos
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function buildProductUrl(product) {
  if (!product || !product.url) return 'https://www.sanborns.com.mx';
  const baseUrl = product.url;
  const params = new URLSearchParams({
    utm_source: 'dv360',
    utm_medium: 'display',
    utm_campaign: 'sanborns_san_valentin_2025',
    utm_content: 'producto_' + (product.id || ''),
    utm_term: 'gift_finder'
  });
  const separator = baseUrl.indexOf('?') !== -1 ? '&' : '?';
  return baseUrl + separator + params.toString();
}
window.buildProductUrl = buildProductUrl;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// VALIDACIÓN DE URLs - Ejecuta en DOMContentLoaded
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function validarURLsProductos() {
  const errores = [];
  const warnings = [];
  const products = window.productosDatabase || productosDatabase;

  Object.keys(products).forEach(function (gender) {
    Object.keys(products[gender]).forEach(function (category) {
      products[gender][category].forEach(function (product) {
        const url = product.url;

        if (!url.startsWith('https://')) {
          errores.push({ id: product.id, nombre: product.nombre, error: 'URL debe comenzar con https://', url: url });
        }
        if (!url.includes('sanborns.com.mx')) {
          errores.push({ id: product.id, nombre: product.nombre, error: 'URL no apunta a sanborns.com.mx', url: url });
        }
        if (url.includes('/producto/') && !/\/producto\/\d+/.test(url)) {
          warnings.push({ id: product.id, nombre: product.nombre, warning: 'URL de producto sin ID numérico', url: url });
        }
        if (url.startsWith('/') || (!url.startsWith('http') && url.indexOf('sanborns') === -1)) {
          errores.push({ id: product.id, nombre: product.nombre, error: 'URL es ruta relativa, debe ser absoluta', url: url });
        }
      });
    });
  });

  var totalProductos = 0;
  Object.keys(products).forEach(function (g) {
    Object.keys(products[g]).forEach(function (c) {
      totalProductos += products[g][c].length;
    });
  });

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 VALIDACIÓN DE URLs - GIFT FINDER');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  if (errores.length === 0) {
    console.log('✅ TODAS LAS URLs SON VÁLIDAS');
    console.log('✅ Total productos: ' + totalProductos);
  } else {
    console.error('❌ ' + errores.length + ' ERRORES CRÍTICOS ENCONTRADOS:');
    console.table(errores);
  }
  if (warnings.length > 0) {
    console.warn('⚠️ ' + warnings.length + ' WARNINGS:');
    console.table(warnings);
  }
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  return { errores: errores, warnings: warnings };
}
window.validarURLsProductos = validarURLsProductos;

if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', function () {
    validarURLsProductos();
  });
}
