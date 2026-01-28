// Script de validación de productos
const productosDatabase = require('./products-data.js');

console.log('🔍 VALIDANDO PRODUCTOS...\n');

let totalProducts = 0;
let totalCategories = 0;
let errors = [];

// Validar estructura
for (const gender in productosDatabase) {
    console.log(`\n📊 Género: ${gender.toUpperCase()}`);
    
    for (const category in productosDatabase[gender]) {
        totalCategories++;
        const products = productosDatabase[gender][category];
        const count = products.length;
        totalProducts += count;
        
        console.log(`  ✓ ${category}: ${count} productos`);
        
        // Validar que tenga mínimo 3 productos
        if (count < 3) {
            errors.push(`❌ ${gender}/${category} tiene menos de 3 productos (${count})`);
        }
        
        // Validar cada producto
        products.forEach((p, idx) => {
            if (!p.id) errors.push(`❌ ${gender}/${category}[${idx}] sin ID`);
            if (!p.nombre) errors.push(`❌ ${gender}/${category}[${idx}] sin nombre`);
            if (!p.precio) errors.push(`❌ ${gender}/${category}[${idx}] sin precio`);
            if (!p.img) errors.push(`❌ ${gender}/${category}[${idx}] sin imagen`);
            if (!p.img.includes('unsplash.com')) errors.push(`⚠️  ${gender}/${category}[${idx}] imagen no es de Unsplash`);
            if (!p.img.includes('w=400&h=400')) errors.push(`⚠️  ${gender}/${category}[${idx}] imagen sin optimización`);
        });
    }
}

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📈 RESUMEN:');
console.log(`   Total de productos: ${totalProducts}`);
console.log(`   Total de categorías: ${totalCategories}`);
console.log(`   Promedio por categoría: ${(totalProducts / totalCategories).toFixed(1)}`);

if (errors.length === 0) {
    console.log('\n✅ VALIDACIÓN EXITOSA - Todo está correcto!');
} else {
    console.log(`\n⚠️  Se encontraron ${errors.length} problemas:`);
    errors.forEach(err => console.log(`   ${err}`));
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
