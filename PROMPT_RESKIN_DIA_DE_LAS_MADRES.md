# Prompt para chat: Reskin Día de las Madres (Expert AdTech Dev)

**Copia todo lo de abajo en un chat nuevo.** Asigna al modelo el rol de experto AdTech y pega el bloque "Contexto del proyecto" + "Objetivo" + "Alcance" + "Detalle técnico". Opcionalmente adjunta o referencia el archivo `index.html` del proyecto.

---

## Rol que debes asumir

Eres un **experto desarrollador AdTech** con experiencia en creativos HTML5 para programática (DCM/CM360, Mediasmart, DV360). Conoces restricciones de peso, macros de click, validadores y buenas prácticas para banners que se sirven en DSPs.

---

## Contexto del proyecto

- **Qué es:** Banner HTML5 interactivo tipo Gift Finder / Wishlist para **Sanborns** (México). Una sola página: **`index.html`** con **CSS y JS inlined** (sin `<link>` ni `<script src>` externos de código). Pensado para **Mediasmart / DCM**.
- **Tamaño:** `ad.size` 640×1280. Click macros: `%target_url_unesc%`, `%click_url_unesc%`; fallback a sanborns.com.mx.
- **Flujo actual:** Pantalla de bienvenida → “¿Para quién es el regalo?” (Mujer/Hombre) → categorías → listado de productos → wishlist → modal “Enviar wishlist por email”. Los **productos y categorías no se modifican** en esta tarea.
- **Artefacto actual:** Está **tropicalizado para San Valentín**: paleta rosa, corazón animado, copy romántico (“San Valentín”, “pareja”, “amor”). La carpeta del repo se llama “DIA DE LAS MADRES BANNER GIFTSENDER” pero el contenido visual y textual sigue siendo San Valentín.

---

## Objetivo

**Tropicalizar el banner de San Valentín a Día de las Madres**, con foco prioritario en el **RESKIN VISUAL**. Opcionalmente sugerir adaptaciones de copy, flujo o microcopy para que todo hable de “mamá” / “Día de las Madres” en lugar de “pareja” / “San Valentín”, sin cambiar lógica de productos ni estructura de pantallas.

---

## Alcance

1. **Prioridad 1 – Reskin visual (obligatorio)**  
   - Paleta de color: sustituir rosas/rojos San Valentín por una paleta adecuada para Día de las Madres (sugerir tonos: lavanda, rosa suave, verde menta, crema, etc., manteniendo legibilidad y contraste).  
   - Gradientes de fondo y botones.  
   - Tipografía: mismo stack si cumple accesibilidad; solo cambiar colores/fondos.  
   - Asset principal: reemplazar el **corazón** (`assets/heart.svg`) por un elemento visual de Día de las Madres (flor, lazo, “Mamá”, etc.). Misma zona y animación tipo “float” si aplica.  
   - Iconografía/emojis en UI: donde hoy hay corazones (❤️, 💕, etc.), proponer reemplazos coherentes con Día de las Madres (flor, regalo, etc.) sin romper layout.  
   - Botones, contador de wishlist, cards de producto, modal: aplicar nueva paleta y, si tiene sentido, pequeños ajustes visuales (bordes, sombras) para que se sientan “Día de las Madres”.

2. **Prioridad 2 – Copy y microcopy (sugerido)**  
   - Título del creative: de “Gift Finder San Valentin” a algo como “Gift Finder Día de las Madres”.  
   - Pantalla de bienvenida: de “¿Qué te gustaría regalar este San Valentín?” a mensaje tipo “¿Qué te gustaría regalar este Día de las Madres?” o “Encuentra el regalo perfecto para mamá”.  
   - Modal de email: “Email de destino” puede quedar o cambiar a “Email de quien recibe la lista” (o similar); cuerpo del mailto: de “Hola amor”, “Tu pareja”, “San Valentín” a “Hola”, “Para mamá” / “Día de las Madres”.  
   - Cualquier otra mención a “San Valentín” o “pareja” en labels o textos visibles.

3. **Fuera de alcance (no tocar)**  
   - Estructura de datos `productosDatabase` y listado de productos.  
   - Lógica de categorías, género (mujer/hombre), envío de wishlist por mailto, click tags y macros.  
   - Cambios que exijan archivos externos o build (el creative debe seguir siendo un solo `index.html` con todo inlined).

---

## Detalle técnico para el reskin

- **Archivo a editar:** `index.html` (raíz del proyecto).
- **CSS:** Todo está en un bloque `<style>` en el `<head>`. Las variables de color están en `:root`:
  - `--pink-light`, `--pink-medium`, `--pink-fuchsia`, `--pink-deep`
  - `--gradient-bg`, `--gradient-button`
  - Uso en body, `.banner-container`, `.wishlist-counter`, `.screen-title`, `.add-btn`, `.back-btn`, `.btn-main`, `.btn-send`, `.animated-heart-img` (drop-shadow), `.product-card:hover`, etc.
- **Asset de bienvenida:** `<img src="assets/heart.svg" ... class="animated-heart-img">`. Proponer reemplazo (nuevo SVG en `assets/` o mismo nombre con contenido nuevo, p. ej. flor o “Mamá”).
- **Textos a localizar:**  
  - `<title>Sanborns - Gift Finder San Valentin</title>`  
  - Chat bubble: “¿Qué te gustaría regalar este San Valentín?” y “Encuentra el regalo perfecto”  
  - Modal: “Envia tu Wishlist”, “Email de destino *”, “Enviar Wishlist”  
  - En JS (mailto): “Mi Wishlist Sanborns”, “Hola amor ❤️”, “regalos que me gustarían para San Valentín”, “Tu pareja”, “Sanborns Wishlist de San Valentín”
- **Emojis en HTML:**  
  - Header wishlist: `&#10084;&#65039;` (corazón)  
  - Floating: `&#128157;`, `&#128150;`, `&#128149;` (corazones)  
  - Modal: `&#128140;` (carta con corazón), `&#9993;&#65039;` (sobre)  
  Sustituir por alternativas Día de las Madres donde tenga sentido (flor, regalo, etc.).

---

## Entregable esperado

1. **Cambios concretos en `index.html`:**  
   - Nuevos valores en `:root` y en reglas que usan rosa/rojo.  
   - Reemplazo de `assets/heart.svg` (o nuevo asset y referencia).  
   - Actualización de todos los textos y emojis listados arriba para Día de las Madres.  

2. **Breve resumen:**  
   - Paleta elegida (hex o nombres).  
   - Descripción del asset principal (corazón → qué se puso).  
   - Lista de strings/emojis cambiados.

3. **Opcional:** Si sugieres flujo distinto (ej. un solo “Regalo para mamá” en vez de Mujer/Hombre), indicarlo como recomendación aparte sin implementar cambios estructurales en esta tarea.

---

## Resumen en una frase

“Reskin visual del banner San Valentín a Día de las Madres: nueva paleta, reemplazo del corazón por asset de mamá, y actualización de todos los copy y emojis a Día de las Madres; productos y lógica sin cambios.”
