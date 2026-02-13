# Auditoría producción – Mediasmart/DSP

**Fecha:** 2025-02-10  
**Estado:** Listo para despliegue

## 1. Sanitización de código
- Eliminados todos los `console.log`, `console.error` y comentarios `// DEBUG`, `// TODO`, `// FIXME` del código de producción (main.js e index.html inlined).
- Eliminados `alert()` de depuración ("CLICK FUNCIONÓ - Ver consola"). Se mantienen solo alerts de validación de usuario (selecciona regalo, escribe correo, error correo, agrega producto).
- `window.onerror` sustituido por no-op (`return false`) para evitar fugas a consola.
- No hay `debugger` ni variables globales expuestas innecesarias; solo las requeridas para DSP (`clickTag`, `clickTracker`, `dataLayer`, `handleProductClick`, `openProductPage`, `sendWishlistByMail`, `openEmailModal`).

## 2. Compliance Mediasmart
- **ClickTags:** `%target_url_unesc%` y `%click_url_unesc%` en head; fallback a `landingPage` cuando el macro no está resuelto (preview).
- **Clics en producto:** `window.open(tracker + url, '_blank')` con `tracker = window.clickTracker` para que el macro de seguimiento envuelva la URL de destino.
- **Salida general:** `background-exit` y `exitClickHandler` usan `clickTag`/landing.
- No se envían PII en parámetros de URLs externas (solo URLs de producto Sanborns).

## 3. Tags y eventos
- `window.dataLayer` inicializado en head; eventos enviados vía `trackEvent()`: `banner_loaded`, `product_clicked`, `wishlist_sent`, `wishlist_modal_opened`, `product_added_to_wishlist`.
- No hay IDs de GTM/GA4 hardcodeados en el creative; el contenedor se inyecta por la plataforma.

## 4. Assets
- Todas las rutas de imagen en products-data usan formato relativo `./images/...` (producto-XXX.jpg/jpeg, placeholder.svg).
- Imágenes referenciadas existen en `/images/` para los productos del catálogo Mujer (maquillaje, cuidado, perfumería) y resto de categorías con imagen específica.
