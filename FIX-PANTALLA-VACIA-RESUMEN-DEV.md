# Resumen para devs: pantalla vacía al elegir Celulares / Skincare / Gadgets (DCO)

## 1. Raíz del problema

Hay **dos fuentes de datos** para la pantalla de productos:

| Fuente | Origen | Cuándo se usa |
|--------|--------|----------------|
| **`window.PRODUCTS_CATALOG`** | `products-catalog.js` (generado por `scripts/parseProducts.js`) | Si `catalog.length > 0` y hay `matchCategories`. |
| **`window.productosDatabase`** | `products-data.js` (estático en repo) | Si el catálogo no se usa (vacío o sin match). |

**Qué está pasando:**

1. **`products-catalog.js` está vacío en producción.**  
   En repo tiene `window.PRODUCTS_CATALOG = [];`.  
   → La rama que filtra por `matchCategories` + `gender` **nunca se ejecuta**.

2. **Siempre se usa el fallback**  
   `productosDatabase[gender][category]`  
   con los **ids de categoría de la UI DCO**: `celulares`, `skincare`, `gadgets`, `tablets`, `audio`, `fotografia`, `regalos`, `estilismo`, etc.

3. **`products-data.js` sigue con el esquema antiguo**, no con los ids DCO:

   - **Mujer:** `maquillaje`, `cuidado`, `bolsas`, `joyeria`, `perfumeria`, `libros`, `tecnologia`, `hogar`  
     → No existen keys `skincare`, `estilismo`, `celulares`, `gadgets`, `fotografia`, `regalos`.
   - **Hombre:** `accesorios`, `moda`, `tecnologia`, `cuidado`, `relojes`, `gaming`, `libros`, `deportes`  
     → No existen keys `celulares`, `tablets`, `gadgets`, `audio`, `fotografia`, `perfumeria`, `regalos`.

4. **Resultado:**  
   Para la mayoría de categorías DCO, `productosDatabase[gender][category]` es **`undefined`** → lista de productos vacía.  
   Solo coincide **Mujer > Perfumería** porque en `products-data.js` sí existe `mujer.perfumeria` → por eso ahí sí se ven productos.

**Resumen en una frase:**  
La UI DCO pide productos por ids nuevos (`celulares`, `skincare`, etc.), pero el catálogo generado no está desplegado (array vacío) y el fallback usa un objeto con ids viejos (`tecnologia`, `cuidado`, etc.), por eso casi todas las categorías devuelven `undefined` y la pantalla queda vacía.

---

## 2. Pruebas que lo demuestran

- Consola en el caso que falla:
  - `📦 Productos encontrados: undefined`
  - `⚠️ No hay productos para hombre > celulares` (o mujer > skincare / mujer > gadgets).
- Consola en el caso que funciona:
  - Mujer > Perfumería → `📦 Productos encontrados: Array(5)`.
- En el código:
  - `products-catalog.js` en repo: `window.PRODUCTS_CATALOG = [];`.
  - `main.js` usa `productosDatabase[gender][category]` cuando el catálogo no aplica.
  - `products-data.js`: keys de hombre no incluyen `celulares`; keys de mujer no incluyen `skincare` ni `gadgets`.

---

## 3. Propuesta de solución (sin romper otros flujos)

**Objetivo:** Que las categorías DCO (Celulares, Skincare, Gadgets, etc.) muestren productos tanto si se usa el catálogo generado como si no.

**Opción A – Recomendada (arreglo principal):**

1. **Generar y desplegar el catálogo real.**  
   En local (con Node):  
   `npm run parse-products`  
   (o `node scripts/parseProducts.js`).  
   Eso genera `products-catalog.js` con el array lleno a partir del CSV Big ticket (y Moda si existe), con `category`, `gender` e `imagePath` ya normalizados.
2. **Hacer commit y push** del `products-catalog.js` generado (o incluirlo en el build que sube a Cloudflare).  
   Así, en producción `PRODUCTS_CATALOG.length > 0` y la rama que filtra por `matchCategories` + `gender` se usará; Celulares, Tablets, Gadgets, etc. mostrarán los productos del CSV.

**Opción B – Fallback alineado (por si el catálogo sigue vacío):**

3. **Mapeo DCO → legacy** en `main.js` solo cuando `PRODUCTS_CATALOG` está vacío o no da resultados:  
   - Hombre: `celulares` → `tecnologia`, `tablets` → `tecnologia`, `gadgets` → `tecnologia`, `relojes` → `relojes`, `audio` → `tecnologia`, `fotografia` → `tecnologia`, `perfumeria` → (no existe en hombre en legacy; se puede dejar sin fallback o reusar `relojes`/uno existente), `regalos` → `libros` o `deportes`.  
   - Mujer: `maquillaje` → `maquillaje`, `skincare` → `cuidado`, `perfumeria` → `perfumeria`, `estilismo` → `cuidado` o `maquillaje`, `celulares` → `tecnologia`, `gadgets` → `tecnologia`, `fotografia` → `tecnologia`, `regalos` → `hogar`.  
   Así, al hacer `productosDatabase[gender][legacyKey]` se obtiene un array existente y se evita pantalla vacía cuando el catálogo aún no está generado o desplegado.

**Orden sugerido:**  
Implementar **A** (generar y desplegar `products-catalog.js`) como solución principal. Opcionalmente añadir **B** como red de seguridad para que, si el catálogo falta o está vacío, el fallback siga mostrando algo en lugar de `undefined`.

---

## 4. Riesgos si no se hace bien

- **Solo hacer B:** Seguirías mostrando productos “legacy” (por ejemplo Celulares mostrando lo mismo que Tecnología), no necesariamente alineados al CSV DCO. Aceptable como fallback, no como única fuente.
- **Solo hacer A sin desplegar el JS generado:** El array en producción seguiría vacío y el problema continuaría hasta que el `products-catalog.js` generado esté en el deploy.
- **Cambiar keys dentro de `products-data.js`** para que coincidan con DCO sin mapeo: Rompería cualquier referencia antigua (URLs, analytics, etc.) que espere los ids viejos; el mapeo en `main.js` (B) evita tocar la estructura actual de `products-data.js`.

---

## 5. Resumen ejecutivo

| Qué | Detalle |
|-----|--------|
| **Causa raíz** | `PRODUCTS_CATALOG` vacío en producción + fallback a `productosDatabase` con ids de categoría que no existen en el objeto (DCO vs legacy). |
| **Pruebas** | Console: `Productos encontrados: undefined` para celulares/skincare/gadgets; Array(5) solo para mujer > perfumeria. Código: `products-catalog.js` con `[]`; `products-data.js` sin keys `celulares`, `skincare`, `gadgets`, etc. |
| **Solución propuesta** | (A) Generar `products-catalog.js` con `parseProducts.js` y desplegarlo. (B) Opcional: mapeo DCO → legacy en `main.js` cuando el catálogo no tenga datos. |
| **Efecto** | Con A: pantalla de productos llena desde el catálogo CSV. Con B: sin pantalla vacía incluso si el catálogo no está o está vacío. |

Si das luz verde, el siguiente paso sería: aplicar A (instrucciones/script de generación + commit del `products-catalog.js` generado) y, si lo apruebas, implementar B (mapeo en `main.js`) como fallback.
