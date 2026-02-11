# Catálogo de productos para banner DV360 (polite load)

## 1. Carpeta de imágenes

- **Ruta:** `images/` (raíz del proyecto, junto a `index.html`).
- Sube manualmente las imágenes de productos en **formato `.webp`**.
- **Nombre de archivo:** `producto-{ID}.webp`, donde `ID` es:
  - **Big ticket:** el número extraído de la URL (`.../producto/613747/...` → `613747`).
  - **Moda:** el valor de la columna **ID** del CSV.

Ejemplos: `producto-613747.webp`, `producto-608266.webp`.

---

## 2. Función `parseProducts()` – utilidad Node

El script **`scripts/parseProducts.js`**:

1. **Lee los CSVs:**
   - `excel/Productos a impulsar Sanborns - Big ticket.csv`
   - `excel/Productos a impulsar Sanborns - Moda.csv` (opcional; si no existe, solo usa Big ticket)

2. **Extrae el ID del producto:**
   - **Big ticket:** expresión regular sobre la URL: `.../producto/(\d+)/...` (ej. `613747`).
   - **Moda:** usa directamente la columna **ID** del CSV.

3. **Construye un array unificado** de objetos con:
   - `id`, `url`, `category`, `source` (`'big_ticket'` | `'moda'`), **`imagePath`** (`"./images/producto-{ID}.webp"`).

4. **Escribe** `products-catalog.js` en la raíz, definiendo `window.PRODUCTS_CATALOG`.

### Cómo ejecutar

```bash
node scripts/parseProducts.js
```

Salida: `products-catalog.js` actualizado con el catálogo completo.

---

## 3. Cómo usar el catálogo en la lógica del banner

### Cargar el script en el HTML

Incluye el archivo generado **antes** de `main.js` (o de la lógica que pinte productos):

```html
<script src="products-catalog.js"></script>
<script src="main.js"></script>
```

### Usar la data en el banner

Tras cargar el script, `window.PRODUCTS_CATALOG` está disponible: array de objetos con `id`, `url`, `category`, `source`, **`imagePath`**.

**Ejemplo: inyectar productos en el DOM (polite load con .webp)**

```javascript
// Asegurar que el catálogo existe (por si no se ha ejecutado parseProducts)
const catalog = window.PRODUCTS_CATALOG || [];

function renderProductCard(product) {
  const imgSrc = product.imagePath; // "./images/producto-613747.webp"
  return `
    <a href="${product.url}" target="_blank" class="product-card">
      <img src="${imgSrc}" alt="" loading="lazy" />
      <span>${product.name || product.id}</span>
    </a>
  `;
}

// Pintar lista
const container = document.getElementById('productos');
container.innerHTML = catalog.map(renderProductCard).join('');
```

### Integrar con la lógica actual (`products-data.js`)

Si quieres que el Gift Finder use este catálogo para **imágenes .webp** en lugar de Unsplash:

1. En `main.js`, al construir `imgSrc` para cada producto, comprobar si existe en `PRODUCTS_CATALOG` por ID (por ejemplo extraer ID de `p.url` con `/producto\/(\d+)/`) y usar su `imagePath`; si no, mantener `p.img` (Unsplash) como fallback.
2. O bien: ejecutar `parseProducts.js` y luego un script que **fusione** `PRODUCTS_CATALOG` en la estructura de `productosDatabase` (por categoría/género), rellenando `img` con `imagePath` para los IDs que coincidan.

Ejemplo de lookup por ID de producto Sanborns:

```javascript
function getImagePathForProduct(product) {
  const id = (product.url && product.url.match(/\/producto\/(\d+)/)) ? product.url.match(/\/producto\/(\d+)/)[1] : null;
  const fromCatalog = (window.PRODUCTS_CATALOG || []).find(function (p) { return p.id === id; });
  return fromCatalog ? fromCatalog.imagePath : (product.img || '');
}
```

---

## 4. Formato CSV Moda (cuando lo uses)

Para que `parseModaCSV()` funcione, el CSV debe tener al menos una columna **ID**. Opcional: **URL**, **Name**/Nombre, **Category**/Categoría.

Ejemplo:

```csv
ID,Name,URL,Category
12345,Playera Básica,https://www.sanborns.com.mx/producto/12345,Ropa
67890,Short Verano,https://www.sanborns.com.mx/producto/67890,Ropa
```

Guarda el archivo como: `excel/Productos a impulsar Sanborns - Moda.csv`.
