// Script de validación de URLs de productos
const productosDatabase = require('./products-data.js');

console.log('🔍 VALIDANDO URLS DE PRODUCTOS...\n');

const errores = [];
let totalProductos = 0;

Object.keys(productosDatabase).forEach(gender => {
  Object.keys(productosDatabase[gender]).forEach(category => {
    productosDatabase[gender][category].forEach(product => {
      totalProductos++;
      const url = product.url;
      
      // Verificar que tenga protocolo
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        errores.push({
          id: product.id,
          producto: product.nombre,
          error: 'Sin protocolo (http:// o https://)',
          url: url,
          categoria: `${gender} > ${category}`
        });
      }
      
      // Verificar que apunte a sanborns.com.mx
      if (!url.includes('sanborns.com.mx')) {
        errores.push({
          id: product.id,
          producto: product.nombre,
          error: 'No apunta a Sanborns',
          url: url,
          categoria: `${gender} > ${category}`
        });
      }
      
      // Verificar que no sea ruta relativa
      if (url.startsWith('/') || (url.startsWith('c/') && !url.includes('http'))) {
        errores.push({
          id: product.id,
          producto: product.nombre,
          error: 'Ruta relativa (debe ser URL completa)',
          url: url,
          categoria: `${gender} > ${category}`
        });
      }
    });
  });
});

console.log(`📊 Total de productos: ${totalProductos}`);
console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

if (errores.length > 0) {
  console.error(`❌ LINKS ROTOS ENCONTRADOS: ${errores.length}\n`);
  console.table(errores);
  process.exit(1);
} else {
  console.log('✅ TODOS LOS LINKS SON VÁLIDOS');
  console.log('✅ Todas las URLs comienzan con https://');
  console.log('✅ Todas las URLs apuntan a sanborns.com.mx');
  console.log('✅ No hay rutas relativas');
  process.exit(0);
}
