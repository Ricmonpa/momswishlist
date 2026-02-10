# Métricas y reporting – Gift Finder San Valentín Sanborns

Este documento explica **qué métricas puede reportar la pieza**, **qué ofrece Cloudflare por sí solo** y **cómo obtener reportes por género, categoría y producto** para Sanborns.

---

## 1. Qué métricas reporta ya la pieza (eventos implementados)

En el código está implementada una capa de tracking que envía estos eventos:

| Evento | Cuándo se dispara | Datos que lleva |
|--------|--------------------|-----------------|
| `gift_finder_genero_seleccionado` | Usuario elige "Para una Mujer" o "Para un Hombre" | `gender`: `"mujer"` o `"hombre"` |
| `gift_finder_categoria_seleccionada` | Usuario elige una categoría (Maquillaje, Relojes, etc.) | `gender`, `category` (ej. `"maquillaje"`, `"relojes"`) |
| `gift_finder_producto_click` | Usuario hace clic en una tarjeta de producto (va a Sanborns) | `product_id`, `product_name`, `gender`, `category` |
| `gift_finder_producto_agregado_wishlist` | Usuario agrega un producto a la wishlist | `product_id`, `product_name`, `gender`, `category`, `wishlist_count` |
| `gift_finder_modal_wishlist_abierto` | Usuario abre el modal "Enviar Wishlist" | `wishlist_count` |
| `gift_finder_wishlist_enviada` | Usuario envía la wishlist por email | `wishlist_count`, `gender`, `category` |

Con esto se puede responder:

- Cuánta gente eligió **hombre** vs **mujer**.
- Qué **categorías** se eligieron más (por género o en total).
- Qué **productos** recibieron más clics o se agregaron más a la wishlist.
- Cuántas wishlists se **enviaron** y con cuántos productos.

Esos eventos **no se ven solos en el dashboard de Cloudflare**; hace falta enviarlos a una herramienta de analytics (GTM + GA4, Zaraz, etc.) como se explica abajo.

---

## 2. Qué ofrece Cloudflare (métricas nativas) y qué no

### Cloudflare Web Analytics (métricas por defecto)

- **Sí da:** visitas, páginas vistas, países, dispositivos, referrers, etc., a nivel de **URL** (por ejemplo la URL del banner en wishlist.potential.site).
- **No da por defecto:** desglose “cuántos clic en mujer”, “cuántos en hombre”, “qué categoría eligieron”. Son métricas de tráfico a la página, no de interacción dentro del Gift Finder.

Conclusión: en la sección **Métricas** de Cloudflare (Pages o Web Analytics) verás **cuánta gente llegó al banner**, pero **no** género, categoría ni producto. Para eso hay que usar eventos (GTM, Zaraz o backend).

### Cloudflare Zaraz (eventos custom)

- **Zaraz** es el tag manager / herramienta de eventos de Cloudflare.
- Si el sitio está en **Cloudflare Pages** y tienes **dominio custom** (ej. wishlist.potential.site), puedes activar Zaraz para ese dominio.
- La pieza ya llama a `zaraz.track(nombreEvento, datos)` cuando existe `window.zaraz.track`.
- En **Zaraz** configuras:
  - **Triggers** por nombre de evento (ej. `gift_finder_genero_seleccionado`).
  - **Actions** que envían esos eventos a Google Analytics 4 (GA4), Floodlight (CM360/DV360), etc., usando las propiedades del evento (ej. `{{ client.gender }}`, `{{ client.category }}`).

Documentación útil:

- [Zaraz en Cloudflare Pages](https://developers.cloudflare.com/pages/how-to/enable-zaraz/)
- [zaraz.track() – eventos custom](https://developers.cloudflare.com/zaraz/web-api/track/)

Conclusión: **Sí se puede** ver “mujer vs hombre” y “qué categoría” usando Cloudflare, **pero** hay que tener Zaraz habilitado y configurar triggers/actions que envíen los eventos a GA4 o a DV360/CM360 (Floodlight).

---

## 3. Cómo ver género, categoría y más (recomendación para Sanborns)

Hay dos caminos que encajan con DV360/CM360 y con lo que ya está implementado.

### Opción A: Google Tag Manager (GTM) + GA4 (recomendada)

- La pieza ya hace **dataLayer.push** con el mismo nombre de evento y los mismos datos que usa Zaraz.
- Si en la **página del banner** (o en el contenedor donde se sirve) se carga **GTM** con un contenedor de Sanborns:
  1. En GTM creas **Triggers** por nombre de evento (Custom Event), por ejemplo:
     - `gift_finder_genero_seleccionado`
     - `gift_finder_categoria_seleccionada`
     - `gift_finder_producto_click`
     - `gift_finder_producto_agregado_wishlist`
     - `gift_finder_wishlist_enviada`
  2. Creas **Variables** de Data Layer para los parámetros: `gender`, `category`, `product_id`, `product_name`, `wishlist_count`, etc.
  3. Creas un **Tag GA4 (Event)** por cada evento (o un tag genérico que lea el nombre del evento y los parámetros del dataLayer) y lo asocias al trigger correspondiente.
- En **GA4** verás en **Informes > Compromiso > Eventos** todos los eventos y sus parámetros. Ahí puedes:
  - Ver cantidad de eventos `gift_finder_genero_seleccionado` y desglosar por `gender` (mujer / hombre).
  - Ver `gift_finder_categoria_seleccionada` desglosado por `category` y por `gender`.
  - Ver clics por producto (`gift_finder_producto_click` por `product_id` / `product_name`) y agregaciones a wishlist (`gift_finder_producto_agregado_wishlist`).
- Si Sanborns usa **Floodlight (CM360/DV360)**, en el mismo GTM pueden añadir un **Tag de Floodlight** que se dispare con los mismos triggers y envíe variables custom (u1 = género, u2 = categoría, etc.) para reportar y optimizar en DV360.

Ventaja: un solo lugar (GTM) para GA4 y para conversiones/Floodlight de DV360/CM360, y los datos ya están en el dataLayer.

### Opción B: Solo Cloudflare Zaraz

- Sin GTM en la página: se usan solo las llamadas **zaraz.track** que ya hace la pieza.
- En el dashboard de **Cloudflare > Zaraz**:
  1. Creas **Triggers** por evento (Event name equals `gift_finder_genero_seleccionado`, etc.).
  2. Añades **Actions** a herramientas (Tool):
     - Si tienes **GA4** configurado en Zaraz: envías el evento con propiedades como `gender`, `category` (usando `{{ client.gender }}`, `{{ client.category }}`, etc.).
     - Si tienes **Floodlight** u otra herramienta: configuras la acción para que envíe ahí los mismos datos.
- Los reportes de “mujer vs hombre” y “qué categoría” los ves entonces en GA4 (o en CM360/DV360 si configuraste Floodlight), no en el dashboard de Cloudflare.

Resumen: **Cloudflare (solo métricas nativas) no desglosa por género/categoría; Zaraz sí permite enviar esos eventos a GA4/DV360 para reportar.**

---

## 4. Resumen: qué hacer para reportar performance de la pieza

1. **Definir dónde quieren ver el reporte:** GA4, DV360/CM360 (Floodlight), o ambos.
2. **Elegir canal de envío:**
   - Si ya usan **GTM** en el sitio/banner: usar **dataLayer** (ya implementado) y configurar en GTM los eventos y tags a GA4 y/o Floodlight.
   - Si no usan GTM pero sí **Cloudflare**: activar **Zaraz** en el dominio del banner y configurar triggers/actions hacia GA4 y/o Floodlight.
3. **En GA4:** usar los eventos `gift_finder_*` y sus parámetros para reportes y exploraciones (género, categoría, product_id, etc.).
4. **En DV360/CM360:** usar las mismas señales vía Floodlight (variables custom u1, u2, etc.) para conversiones y optimización.

La pieza ya está preparada: envía **dataLayer** y **zaraz.track** con los mismos eventos y datos. Solo falta que Sanborns (o el equipo de AdTech) configure GTM o Zaraz para enviar esos eventos a GA4 y/o Floodlight y arme los reportes que necesiten.

---

## 5. Referencia técnica rápida (eventos y dataLayer)

Ejemplo de lo que se envía en cada caso (tanto en `dataLayer` como en `zaraz.track`):

```js
// Género
{ event: 'gift_finder_genero_seleccionado', gender: 'mujer' }

// Categoría
{ event: 'gift_finder_categoria_seleccionada', gender: 'mujer', category: 'maquillaje' }

// Clic en producto
{ event: 'gift_finder_producto_click', product_id: '1', product_name: 'Set Maquillaje...', gender: 'mujer', category: 'maquillaje' }

// Agregado a wishlist
{ event: 'gift_finder_producto_agregado_wishlist', product_id: '1', product_name: '...', gender: 'mujer', category: 'maquillaje', wishlist_count: 1 }

// Wishlist enviada
{ event: 'gift_finder_wishlist_enviada', wishlist_count: 3, gender: 'mujer', category: 'maquillaje' }
```

Con esto se puede construir cualquier reporte de performance de la pieza (género, categoría, productos más clicados, wishlists enviadas, etc.) en la herramienta que elijan (GA4, DV360/CM360).
