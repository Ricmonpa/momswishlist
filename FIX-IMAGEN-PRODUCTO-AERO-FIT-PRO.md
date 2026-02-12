# Fix: imagen incorrecta en "Audífonos Soundcore Aero Fit Pro"

**Resumen para otro dev**

---

## 1. Qué pasa

En la categoría **Celulares** (Gift Finder), el producto **"Audífonos Soundcore Aero Fit Pro"** muestra la **imagen de un smartwatch** (muñeca con reloj) en lugar de la imagen de los audífonos.

- **Dónde se ve:** Categoría Celulares → primera tarjeta "Audífonos Soundcore Aero Fit Pro" muestra smartwatch; la siguiente "Audífonos Soundcore Space One Azul" muestra audífonos correctamente.

---

## 2. Pruebas / causa raíz

| Dato | Ubicación | Valor actual |
|------|-----------|--------------|
| Producto | `products-data.js` (y `index.html` inlined) | `nombre: "Audífonos Soundcore Aero Fit Pro"`, `id: 35` (mujer) / `id: 68` (hombre) |
| URL producto Sanborns | mismo objeto | `url: "https://www.sanborns.com.mx/producto/565250/audifonos-soundcore-aero-fit-pro"` → ID Sanborns = **565250** |
| Imagen actual | campo `img` | `https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop&q=80` |

- Esa URL de Unsplash (**photo-1434493789847**) corresponde a una **imagen de smartwatch** (no de audífonos). Por eso la tarjeta muestra reloj en lugar de audífonos.
- En el repo existe la imagen correcta del producto y **no se está usando**:
  - **Archivo:** `images/producto-565250.jpeg` (565250 = ID Sanborns del Aero Fit Pro).

**Evidencia en código:**

- `products-data.js` líneas 53 y 89: entradas de "Audífonos Soundcore Aero Fit Pro" con `img: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d..."`.
- `images/producto-565250.jpeg` presente en el proyecto; otras entradas (p. ej. perfumería, estilismo) ya usan `./images/producto-XXXXX.jpg`.

---

## 3. Propuesta de fix

1. **En `products-data.js`:**
   - En **mujer.tecnologia**: entrada con `id: 35`, nombre "Audífonos Soundcore Aero Fit Pro" → cambiar `img` de la URL Unsplash a `"./images/producto-565250.jpeg"`.
   - En **hombre.tecnologia**: entrada con `id: 68`, mismo nombre → mismo cambio de `img` a `"./images/producto-565250.jpeg"`.

2. **Después:**
   - Re-ejecutar el script de inlining para que `index.html` vuelva a tener la data actualizada (p. ej. `scripts/run-inline-and-zip.ps1` o el flujo que inyecte `products-data.js` en el HTML).
   - Regenerar el ZIP de entrega (v7 o el que corresponda) para que incluya `images/producto-565250.jpeg` y el `index.html` ya corregido.

Con esto, la tarjeta de "Audífonos Soundcore Aero Fit Pro" en Celulares mostrará la imagen correcta de audífonos (local) y se elimina el uso de la imagen de smartwatch de Unsplash.

---

## 4. Resumen en una línea

**Problema:** Aero Fit Pro usa URL Unsplash de smartwatch. **Solución:** Usar `./images/producto-565250.jpeg` en las dos entradas (mujer y hombre) en `products-data.js`, re-inlinear y regenerar ZIP.
