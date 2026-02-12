# Investigación: botón "ENVIAR WISHLIST POR EMAIL" no responde

## Síntoma
Al hacer clic en el botón rosa "💌 ENVIAR WISHLIST POR EMAIL" (al final de la pantalla de productos), no ocurre nada. En consola solo aparecen los logs de carga (`[WISHLIST] main.js ejecutado`, `sendWishlistByMail asignado a window`); no hay log de tap en modal ni de ENVIAR_BTN porque ese botón está **dentro del modal**. El que no responde es el botón **principal** que debe abrir el modal.

## Prueba del problema

1. **Orden en el DOM (index.html)**  
   Dentro de `#banner-container`:
   - `#background-exit` (z-index: 1, pantalla completa)
   - `header` (z-index: 10)
   - `#screen-container` (z-index: 10) ← aquí se pinta el botón "ENVIAR WISHLIST POR EMAIL" por `render()`
   - **`.floating-products`** (sin z-index, `position: absolute; bottom: 20px; width: 100%`)

2. **CSS de `.floating-products`** (aprox. líneas 266-272):
   - `position: absolute; bottom: 20px; width: 100%;`
   - No tiene `pointer-events` → por defecto **`pointer-events: auto`** (captura clics).
   - Opacidad 0.3 (decorativo).

3. **Conclusión**  
   En el mismo contexto de apilamiento, el nodo que viene **después** en el DOM queda encima. Como `.floating-products` va **después** de `#screen-container`, la capa de “corazones flotantes” queda **por encima** del contenido del screen-container en la parte inferior. El botón "ENVIAR WISHLIST POR EMAIL" está abajo del scroll de productos, es decir, justo en la zona que cubre `.floating-products`.  
   Por tanto, el clic lo recibe `.floating-products`, que **no tiene ningún manejador** → no se ejecuta `openEmailModal()` y no pasa nada.

## Solución (sin romper nada)

Hacer que la capa decorativa no intercepte clics:

- En `.floating-products` añadir **`pointer-events: none`**.

Así los clics “atraviesan” los corazones y llegan al botón (y al resto del contenido). No se cambia el diseño ni el comportamiento de ningún otro elemento; solo se corrige qué elemento recibe el clic.

## Cambio aplicado

En `index.html`, en la regla `.floating-products`, añadir:

```css
.floating-products {
    position: absolute;
    bottom: 20px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    opacity: 0.3;
    pointer-events: none;  /* ← añadido: clics pasan al contenido de abajo */
}
```

Después: push (sin zip) para que puedas probar en el artefacto.
