# Resumen de contexto – San Valentín Sanborns (handoff para otro agente/chat)

## Qué es el proyecto

- **Nombre:** Gift Finder / Wishlist San Valentín Sanborns.
- **Uso:** Creativo HTML5 para campaña en **Mediasmart/DCM** (Display & Video 360).
- **Deploy en producción:** wishlist.potenttial.site (funciona correctamente con el último push).
- **Entorno problemático:** El **validador HTML5 de Google** (h5validator.appspot.com/dcm) donde el cliente sube el ZIP para validar el creative.

---

## Stack y estructura actual

- **Una sola página:** Todo el front es un único `index.html` con **CSS y JS inlined** (sin `<link href="styles.css">` ni `<script src="main.js">`). No hay dependencias externas de código.
- **Datos de productos:** El array de productos está **dentro del mismo index.html** (objeto `productosDatabase` en script inline). También existe `products-data.js` en el repo (referencia/legacy); el creative “final” usa solo lo inyectado en `index.html`.
- **Imágenes:** Carpeta **`images/`** en la raíz con fotos de productos (p. ej. `producto-614484.jpg`, `producto-303224.jpg`) y **`placeholder.svg`** para categorías sin foto.
- **Rutas en el HTML:** Se usan rutas **sin `./`**: `images/producto-XXX.jpg`, `images/placeholder.svg` (cambio aplicado para intentar que el validador resolviera; no solucionó el problema).
- **ClickTags / compliance:** En el `<head>` hay macros Mediasmart (`%target_url_unesc%`, `%click_url_unesc%`) y meta `ad.size` (p. ej. 320x480). No hay Unsplash ni URLs externas de imágenes; fallbacks apuntan a `images/placeholder.svg` o a data URIs en la versión base64.

---

## Qué se hizo en esta conversación

1. **IAB/AdTech:** Se ajustó meta `ad.size`, se eliminaron referencias fantasma a CSS/JS externos y se generaron ZIPs “limpios” (sin `.DS_Store`, `__MACOSX`, `.git`, etc.).
2. **Problema de imágenes en el validador:** En local y en producción las imágenes se ven bien. En el **validador DCM** (ZIP subido) todas las imágenes fallaban y se veían iconos rotos o placeholders genéricos.
3. **Diagnóstico:** Se comprobó con fetch que el validador **no sirve** la carpeta `images/` en ninguna URL (p. ej. `h5validator.appspot.com/dcm/asset/images/placeholder.svg` → 404). El creative se sirve solo como HTML; los assets del ZIP no se exponen en rutas propias. Por eso las rutas `images/...` dan 404 en ese entorno.
4. **Intentos de solución:**
   - Cambio de `./images/` a `images/` en todo el HTML y en `products-data.js` (Opción A): no solucionó el 404 en el validador.
   - **Solución aplicada:** Crear una variante del creative con **imágenes críticas incrustadas en base64** (data URIs) para que el validador no dependa de pedir `/images/`.
5. **Versión base64 generada:**
   - **Archivo:** `index_dcm_base64.html` (no se modifica el `index.html` original).
   - **Contenido inline:** `placeholder.svg` + **40 imágenes de producto** (todas las referenciadas en el HTML: mujer, hombres, celulares, gadgets, fotografía, regalos, perfumes, etc.).
   - **ZIP para validador:** `Sanborns_SanValentin_DCM_BASE64.zip` — contiene **solo** `index.html` (copia de `index_dcm_base64.html`) en la raíz; no incluye carpeta `images/`.
   - **Scripts de apoyo:** `scripts/embed-base64-dcm.js` (Node) y `scripts/embed-base64.ps1` (PowerShell). El script **detecta automáticamente** todas las rutas `images/` en el HTML y embebe cada archivo. Usar: `powershell -ExecutionPolicy Bypass -File scripts/embed-base64.ps1`

---

## Estado actual (para otro agente)

- **Repositorio / local:**  
  - `index.html` + carpeta `images/` con rutas `images/...` → correctos para **local y producción**.
  - `index_dcm_base64.html` existe y tiene las 41 imágenes (1 SVG + 40 productos) en data URI.
- **ZIPs disponibles:**
  - **Sanborns_SanValentin_DCM_BASE64.zip:** Solo `index.html` (versión base64). Pensado para subir al **validador DCM**; las imágenes deberían verse ahí porque van inline.
  - Otros ZIPs generados en la conversación (p. ej. Sanborns_SanValentin_FINAL_V4, DCM_FIXED) usan rutas `images/...` y en el validador siguen dando 404.
- **Límites comentados en la conversación:**  
  Se mencionó “ZIP < 200 KB” e “index.html < 150 KB”. La versión base64 **no cumple** esos límites: `index_dcm_base64.html` ~4,1 MB y el ZIP ~3 MB (comprimido). Cumplir 200 KB exigiría menos imágenes o versiones muy reducidas (thumbnails).
- **Git:** En algún momento se hizo `git reset --hard 85ac0a8` y `git clean -fd` para recuperar el estado con “imágenes reales”. El commit 85ac0a8 (“Fix: Final hybrid mailto logic”) es la base que funciona bien en local/deploy.

---

## Archivos clave para seguir trabajando

| Archivo / carpeta | Rol |
|-------------------|-----|
| `index.html` | Creative principal; rutas `images/...`; uso local y producción. |
| `index_dcm_base64.html` | Variante con 41 imágenes (placeholder + todos los productos) en base64; base del ZIP para validador. |
| `images/` | Fotos de producto (`producto-*.jpg`) y `placeholder.svg`. |
| `products-data.js` | Datos de productos (referencia); el creative real usa el objeto inyectado en `index.html`. |
| `scripts/embed-base64.ps1` | Genera `index_dcm_base64.html` a partir de `index.html` + archivos en `images/`. |
| `PRUEBA_VALIDATOR_404.md` | Documenta el 404 del validador en `/dcm/asset/images/...`. |
| `DIAGNOSTICO_ZIP_VALIDATOR.md` | Diagnóstico de rutas y opciones (A/B/C) para el problema del validador. |

---

## Posibles siguientes pasos (si otro agente sigue)

- Probar en el validador el **Sanborns_SanValentin_DCM_BASE64.zip** y confirmar si las imágenes se ven.
- Si el validador impone **límite estricto de peso** (p. ej. 200 KB): reducir número de imágenes en base64 o generar miniaturas y volver a ejecutar `embed-base64.ps1` (o adaptar el script para elegir qué imágenes incluir).
- Mantener **un solo origen de verdad** para datos de productos (p. ej. `products-data.js` o un JSON) y un build que inyecte en `index.html` e opcionalmente genere `index_dcm_base64.html`, para no duplicar ediciones manuales.

---

## Resumen en una frase

Creative HTML5 Sanborns San Valentín (un solo `index.html` con todo inlined) funciona en local y en producción; en el validador DCM las imágenes daban 404 porque el validador no sirve la carpeta `images/`. Se generó una variante con imágenes críticas en base64 (`index_dcm_base64.html`) y el ZIP `Sanborns_SanValentin_DCM_BASE64.zip` para subir al validador; el peso supera los 200 KB comentados y cualquier reducción futura pasa por menos imágenes o thumbnails.
