# DEBUG: Imágenes faltantes en Mujer – Maquillaje, Skincare, Perfumería

## Síntoma
En las tarjetas de productos de **Mujer → Maquillaje**, **Mujer → Skincare** (categoría interna `cuidado`) y **Mujer → Perfumería**, no se veía ninguna imagen en las tarjetas.

## Causa (verificada en código)
- Esos productos en `productosDatabase` (y en el bloque inlined de `index.html`) tenían **`img: "./Logo_sanborns_bco.png"`**.
- Ese path apunta al logo en la raíz del proyecto. En deploy (p. ej. wishlist.potenttial.site) ese archivo puede no servirse o no cargar, y el `onerror` del `<img>` puede no mostrar un fallback visible.
- En la carpeta **`images/`** no existen archivos `producto-1.jpg` … `producto-15.jpg` para esos IDs (maquillaje 1–5, cuidado 6–10, perfumería 11–15).

## Solución aplicada
- Se reemplazó **`img: "./Logo_sanborns_bco.png"`** por **`img: "./images/placeholder.svg"`** en:
  - **Mujer – maquillaje** (ids 1–5)
  - **Mujer – cuidado** (Skincare, ids 6–10)
  - **Mujer – perfumería** (ids 11–15)
- Cambios hechos en:
  - `products-data.js`
  - Bloque inlined de `index.html` (mismo objeto `productosDatabase`), para que el sitio actual use la corrección sin re-inline.

## Archivos tocados
- `products-data.js`: 15 entradas (maquillaje, cuidado, perfumeria).
- `index.html`: mismas 15 entradas dentro del `<script>` inlined.

## Comportamiento actual
- Las tarjetas de Maquillaje, Skincare y Perfumería muestran **`./images/placeholder.svg`** (icono/placeholder de la carpeta `images/`).
- El resto de categorías y productos no se modificó.
- Si más adelante se añaden imágenes reales (p. ej. `images/producto-614484.jpg`), se puede actualizar la propiedad `img` de cada producto en `products-data.js` y volver a inlinear si aplica.

## No roto
- Solo se cambió la propiedad `img` de esos 15 productos. Nombres, precios, URLs y lógica de render (incl. `onerror` del `<img>`) se mantienen igual.
