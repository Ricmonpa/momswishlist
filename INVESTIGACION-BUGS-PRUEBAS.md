# Investigación bugs – Pruebas y causa raíz

## 1. SKINCARE (y Maquillaje) – Imágenes incorrectas (audífonos)

### Prueba
- En `products-data.js`, **mujer.maquillaje** y **mujer.cuidado** (Skincare) tienen:
  - `img: "./images/producto-565250.jpeg"`
- El archivo **producto-565250.jpeg** corresponde al producto ID 565250 = **Audífonos Soundcore Aero Fit Pro** (audífonos over-ear negros).
- Referencia en código: mismo ID en URL `https://www.sanborns.com.mx/producto/565250/audifonos-soundcore-aero-fit-pro`.

### Conclusión
Se usó esa imagen “para quitar placeholders azules”, pero el **contenido** es de audífonos, no de skincare/maquillaje. Por eso en Skincare se ven audífonos negros.

### Corrección
Usar imágenes de perfumes/belleza que ya existen y son coherentes con la categoría:
- `./images/producto-193432.jpg` (perfume)
- `./images/producto-20780.jpg` (perfume)
- `./images/producto-305145.jpg` (perfume)
Rotar estas tres para maquillaje y skincare. No usar producto-565250 (audífonos).

---

## 2. BOTÓN “ENVIAR WISHLIST” – No responde

### Prueba del flujo actual
1. **HTML** (`index.html`): El botón dentro del modal es:
   - `<button type="submit" class="btn-send" id="btnEnviar">… Enviar Wishlist</button>`
   - No tiene `onclick`. Solo depende de JS.

2. **JS** (`main.js` / inlined):
   - `window.sendWishlistByMail` se asigna **dentro** de `attachModalAndWishlistSend()`, al final de esa función.
   - `attachModalAndWishlistSend()` se llama **solo** en `DOMContentLoaded`.
   - El handler del botón se une con `btnEnviar.addEventListener('click', ...)` en esa misma función.

3. **Riesgo**
   - Si hay **cualquier error de JavaScript** antes de que se ejecute `attachModalAndWishlistSend()` (p. ej. en `productosDatabase`, `render()`, `trackEvent`, o al leer el DOM), el script puede cortarse y:
     - Nunca se ejecuta `attachModalAndWishlistSend()`
     - Nunca se asigna `window.sendWishlistByMail`
     - Nunca se hace `addEventListener` en `btnEnviar`
   - Entonces el botón no hace nada: no hay fallback (no hay `onclick` en el HTML).

### Conclusión
El botón “Enviar Wishlist” **solo** funciona si el listener se une en `DOMContentLoaded`. Si algo falla antes, no hay alternativa y el botón queda “muerto”.

### Corrección
1. Añadir **onclick en el HTML** al botón para que, aunque falle el listener, el clic llame a la función:
   - `onclick="if(window.sendWishlistByMail){window.sendWishlistByMail();} return false;"`
2. Asegurar que **window.sendWishlistByMail** exista lo antes posible: asignarla justo después de definir la función (en el mismo flujo que ya usa `attachModalAndWishlistSend`), sin depender de más lógica que pueda fallar antes.
