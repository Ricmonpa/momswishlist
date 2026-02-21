# Imágenes de productos (DV360 – polite load)

Sube aquí las imágenes de productos en **formato `.webp`** para cumplir con el polite load de DV360.

## Convención de nombres

- **Big ticket / Moda:** `producto-{ID}.webp`
- Ejemplos:
  - `producto-613747.webp` (Smartband Huawei Band 10)
  - `producto-608266.webp` (Fragancia)

El ID se obtiene de:
- **Big ticket:** de la URL Sanborns (`.../producto/613747/...` → `613747`)
- **Moda:** de la columna **ID** del CSV.

El script `scripts/parseProducts.js` genera el catálogo con `imagePath: "./images/producto-{ID}.webp"` para cada producto.
