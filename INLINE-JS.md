# JS incrustado en index.html (producción wishlist.potenttial.site)

## Problema
En `wishlist.potenttial.site` el servidor devuelve **HTML** (p. ej. 404 o fallback SPA) para las URLs `/js/*.js`. El navegador rechaza ese contenido como script por el MIME type (`text/html`), por eso aparecen:

- `Refused to execute script from '.../js/products-data.js' because its MIME type ('text/html') is not executable`
- Pantalla vacía (solo logo y "0 en tu wishlist").

## Solución
Incrustar **todo** el JavaScript dentro de `index.html` para que el artefacto no dependa de que se sirvan archivos `.js` en `/js/`.

## Cómo generar el index listo para producción

Con **Node.js** instalado y en el PATH:

```bash
cd c:\Users\maryp\San-Valentin-Sanborns
npm run build:inline
```

O directamente:

```bash
node scripts/inline-js-into-html.js
```

Eso:

1. Concatena en este orden: `products-data.js` → `product-images.js` → `products-catalog.js` → `main.js`
2. Escapa `</script>` como `<\/script>` dentro del JS
3. Sustituye en `index.html` los cuatro `<script src="js/...">` por un único `<script>...</script>` con ese contenido

Después de ejecutarlo, **sube el `index.html` modificado** (y el resto del proyecto) a `wishlist.potenttial.site`. El ZIP para el cliente puede seguir incluyendo la carpeta `js/`; lo importante es que el `index.html` desplegado sea el que tiene el JS ya incrustado.

## Estructura del ZIP
La estructura (assets/, css/, js/, fonts/, index.html) se mantiene; el `index.html` debe ser el generado con `build:inline` para que funcione aunque el host no sirva bien `/js/*.js`.
