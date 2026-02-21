# Prompt: Mejoras visuales pantalla campaña Día de las Madres

**Copia todo lo de abajo en un chat/agente nuevo de Cursor.** Opcional: adjunta la imagen de referencia que tienes (banner con flores, texto “¡MAMÁ SE MERECE EL CIELO!”, ramos y pétalos).

---

## Rol que debes asumir

Eres un **desarrollador front-end** con buen ojo para diseño y conversión. Trabajas con HTML5, CSS3 y, si hace falta, pequeños ajustes de estructura. Priorizas que el mensaje principal se lea bien y que la pantalla se sienta premium sin romper la funcionalidad ni el responsive.

---

## Contexto del proyecto

- **Qué es:** Landing de campaña **Día de las Madres** para Sanborns (México). La pantalla principal es la **campaña** (cuenta regresiva + CTA “¡ESCOGER EL REGALO PERFECTO!” que lleva a `giftfinder.html#categorias`).
- **Archivos clave:**
  - **`index2.html`** — **Este es el archivo que importa.** Es la pantalla de campaña Día de las Madres: fondo en degradado radial (crema rosado → fucsia), pétalos flotantes en CSS, logo Sanborns, título “¡MAMÁ SE MERECE LO MEJOR!”, subtítulo, reloj de cuenta regresiva (Días/Horas/Min/Seg) y botón CTA que lleva a `giftfinder.html#categorias`. Todo en un solo HTML con `<style>` y `<script>` inline. **Toda la tarea se hace solo en este archivo.**
  - **`index.html`** — **NO TOCAR.** No modificar, no trabajar en él, no sincronizar. Ignorar para esta tarea.
  - **`giftfinder.html`** — Gift Finder (categorías, productos, wishlist). No modificar en esta tarea.
- **Stack:** HTML5 semántico, CSS3 (variables, flexbox, animaciones), JavaScript vanilla para la cuenta regresiva. Sin frameworks. Diseño **mobile-first** y responsive.
- **Assets:** Logo en `assets/logo.png`. No hay imágenes de flores/ramos en el repo; se pueden usar elementos decorativos en CSS, SVG inline o placeholders/URLs temporales que luego se sustituyan por assets reales.

---

## Objetivo de esta tarea

1. **Adornar visualmente la pantalla principal** con flores o un ramo (esquina superior, inferior o ambos), de forma que la campaña se sienta más “Día de las Madres” y más premium, sin tapar el mensaje ni el CTA.
2. **Hacer que el mensaje “¡MAMÁ SE MERECE LO MEJOR!” se note más** porque actualmente se pierde con el fondo (contraste o peso visual insuficiente).

---

## Referencia visual (imagen adjunta)

Tengo una **imagen de referencia** de un banner similar: fondo en degradado rosa/fucsia, ramos florales (rosas, peonías, orquídeas, tulipanes) en esquina superior y borde inferior, pétalos y hojas doradas, y un título principal muy visible (“¡MAMÁ SE MERECE EL CIELO!”) en fucsia con borde/sombra dorada sobre un fondo más claro. Usa esta referencia solo como **inspiración** para:
- Tipo de decoración floral (ramos, pétalos sueltos, hojas).
- Cómo hacer que el título destaque: tamaño, color (p. ej. fucsia fuerte), contorno o sombra dorada, y/o zona de fondo más clara detrás del texto para mejorar contraste.

No hace falta replicar el diseño al pie de la letra; el copy debe seguir siendo **“¡MAMÁ SE MERECE LO MEJOR!”**.

---

## Requisitos concretos

1. **Flores/ramo**
   - Añadir elementos decorativos tipo flores o ramo en la pantalla de campaña, en posiciones que no oculten el título, el reloj ni el botón (p. ej. esquina superior izquierda y/o borde inferior). **Solo en `index2.html`.**
   - Opciones: SVG inline (flores/pétalos), divs con formas CSS, o `<img>` con placeholders (p. ej. `https://placehold.co/...` o similar) en rutas tipo `assets/bouquet.png` / `assets/flores-inferior.png`, dejando comentarios para reemplazar luego por assets finales.
   - Si usas imágenes externas o placeholders, que la estructura quede lista para cambiar solo el `src` cuando existan los PNG/SVG reales.

2. **Mensaje “¡MAMÁ SE MERECE LO MEJOR!”**
   - Mejorar contraste y legibilidad frente al fondo actual (degradado crema/fucsia). Posibles enfoques (elegir o combinar):
     - Texto en un **fucsia más oscuro** o con **sombra/contorno dorado** (o blanco) para que “salga” del fondo.
     - Pequeña **zona de fondo** detrás del título (semi-transparente o un poco más clara) para crear contraste.
     - Aumentar un poco **tamaño o peso** del título si hace falta.
   - Mantener el copy exacto: **“¡MAMÁ SE MERECE LO MEJOR!”** (con o sin salto de línea, según encaje en el layout actual).

3. **Restricciones**
   - Trabajar **únicamente en `index2.html`**. No tocar `index.html` ni `giftfinder.html`.
   - No cambiar la lógica del reloj (JavaScript) ni el `href` del botón (`giftfinder.html#categorias`).
   - Mantener la página usable y responsive en móvil y escritorio.
   - Estilos en `<style>`, script en `<script>` al final del `body` (todo dentro de index2.html).

---

## Entregable esperado

- **`index2.html`** (y solo este archivo) actualizado con:
  - Decoración floral/ramo (CSS/SVG o placeholders de imagen) en las posiciones acordadas.
  - Título “¡MAMÁ SE MERECE LO MEJOR!” con mejor contraste y mayor protagonismo visual.
- Breve comentario en el código o en la respuesta indicando qué se añadió (flores/ramo) y qué se cambió para el título (color, sombra, fondo, etc.). **No modificar index.html.**

---

## Resumen en una frase

“Solo en index2.html: adornar la pantalla de campaña con flores/ramo inspirado en la referencia y hacer que el mensaje ‘¡MAMÁ SE MERECE LO MEJOR!’ destaque más sobre el fondo. No tocar index.html ni giftfinder.html; no cambiar la funcionalidad del reloj o del CTA.”
